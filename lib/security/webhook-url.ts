/**
 * Guard CONTACT_FORM_WEBHOOK_URL against SSRF (private IPs, metadata,
 * credentials in the URL, non-HTTPS).
 */

import { lookup } from "node:dns/promises";
import { BlockList, isIP } from "node:net";

const blocked = new BlockList();
blocked.addSubnet("0.0.0.0", 8, "ipv4");
blocked.addSubnet("10.0.0.0", 8, "ipv4");
blocked.addSubnet("100.64.0.0", 10, "ipv4");
blocked.addSubnet("127.0.0.0", 8, "ipv4");
blocked.addSubnet("169.254.0.0", 16, "ipv4");
blocked.addSubnet("172.16.0.0", 12, "ipv4");
blocked.addSubnet("192.168.0.0", 16, "ipv4");
blocked.addAddress("::1", "ipv6");
blocked.addSubnet("fc00::", 7, "ipv6");
blocked.addSubnet("fe80::", 10, "ipv6");

const BLOCKED_HOSTS = new Set([
  "localhost",
  "localhost.localdomain",
  "metadata.google.internal",
  "metadata.goog",
]);

function isBlockedHostname(hostname: string): boolean {
  const host = hostname.replace(/^\[|\]$/g, "").toLowerCase();
  if (BLOCKED_HOSTS.has(host)) return true;
  if (host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) {
    return true;
  }
  if (isIP(host) === 4 || isIP(host) === 6) {
    return isBlockedIp(host);
  }
  return false;
}

function mappedIpv4(address: string): string | null {
  const lower = address.toLowerCase();
  if (!lower.startsWith("::ffff:")) return null;
  const v4 = lower.slice(lower.lastIndexOf(":") + 1);
  return isIP(v4) === 4 ? v4 : null;
}

export function isBlockedIp(address: string): boolean {
  const v4 = mappedIpv4(address);
  if (v4) return blocked.check(v4, "ipv4");
  const version = isIP(address);
  if (version === 4) return blocked.check(address, "ipv4");
  if (version === 6) return blocked.check(address, "ipv6");
  return true;
}

export async function assertSafeWebhookUrl(raw: string): Promise<URL> {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error("Webhook URL is invalid.");
  }

  if (url.protocol !== "https:") {
    throw new Error("Webhook URL must use HTTPS.");
  }
  if (url.username || url.password) {
    throw new Error("Webhook URL must not include credentials.");
  }
  if (isBlockedHostname(url.hostname)) {
    throw new Error("Webhook host is not allowed.");
  }

  const records = await lookup(url.hostname, { all: true });
  if (records.length === 0) {
    throw new Error("Webhook host could not be resolved.");
  }
  for (const record of records) {
    if (isBlockedIp(record.address)) {
      throw new Error("Webhook host is not allowed.");
    }
  }

  return url;
}
