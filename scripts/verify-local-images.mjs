#!/usr/bin/env node
/**
 * Ensures every image used by the app is a local `/public` asset.
 * Fails the build if content/components reference remote http(s) images
 * or paths that are missing from `public/`.
 *
 * Usage: node scripts/verify-local-images.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");

const SCAN_DIRS = ["app", "components", "content", "lib"];
const SCAN_EXTS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".css",
  ".mjs",
]);

/** Paths that are allowed to mention http(s) image URLs (tests / docs-like). */
const ALLOW_EXTERNAL_FILE_SUBSTRINGS = [
  `${path.sep}lib${path.sep}security${path.sep}selftest.ts`,
];

const LOCAL_IMAGE_RE =
  /["'`](\/(?:clients|projects|academy|about|brand|og|blog)[^"'`]*\.(?:png|jpe?g|webp|gif|svg|avif))["'`]/gi;
const ANY_LOCAL_SRC_RE =
  /(?:src|thumbSrc|image|icon|coverImage|url)\s*[:=]\s*["'`](\/[^"'`]+\.(?:png|jpe?g|webp|gif|svg|avif))["'`]/gi;
const REMOTE_IMAGE_RE =
  /https?:\/\/[^\s"'`)]+\.(?:png|jpe?g|webp|gif|svg|avif)(?:\?[^\s"'`]*)?/gi;

function walkFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, out);
    else if (SCAN_EXTS.has(path.extname(entry.name).toLowerCase())) {
      out.push(full);
    }
  }
  return out;
}

function allowsExternal(filePath) {
  const normalized = path.normalize(filePath);
  return ALLOW_EXTERNAL_FILE_SUBSTRINGS.some((part) =>
    normalized.includes(part),
  );
}

const refs = new Map(); // path -> Set of files
const remoteHits = [];

for (const dirName of SCAN_DIRS) {
  const dir = path.join(root, dirName);
  for (const file of walkFiles(dir)) {
    const text = fs.readFileSync(file, "utf8");
    const rel = path.relative(root, file);

    if (!allowsExternal(file)) {
      for (const match of text.matchAll(REMOTE_IMAGE_RE)) {
        remoteHits.push({ file: rel, url: match[0] });
      }
    }

    for (const pattern of [LOCAL_IMAGE_RE, ANY_LOCAL_SRC_RE]) {
      pattern.lastIndex = 0;
      for (const match of text.matchAll(pattern)) {
        const asset = match[1];
        if (!refs.has(asset)) refs.set(asset, new Set());
        refs.get(asset).add(rel);
      }
    }
  }
}

// Always require core brand + OG assets used by layout/metadata.
for (const required of [
  "/brand/infozub-logo.png",
  "/brand/infozub-logo-navy.png",
  "/og/default.png",
  "/about/logo-square.jpg",
]) {
  if (!refs.has(required)) refs.set(required, new Set(["(required)"]));
}

const missing = [];
for (const asset of [...refs.keys()].sort()) {
  const disk = path.join(publicDir, asset.replace(/^\//, ""));
  if (!fs.existsSync(disk) || !fs.statSync(disk).isFile()) {
    missing.push({
      asset,
      usedBy: [...refs.get(asset)].slice(0, 5),
    });
  }
}

let failed = false;

if (remoteHits.length > 0) {
  failed = true;
  console.error(
    `\n✗ Found ${remoteHits.length} remote image URL(s) in app source. Production images must be local under /public.\n`,
  );
  for (const hit of remoteHits.slice(0, 30)) {
    console.error(`  ${hit.file}: ${hit.url}`);
  }
}

if (missing.length > 0) {
  failed = true;
  console.error(
    `\n✗ Missing ${missing.length} local image asset(s) under public/:\n`,
  );
  for (const item of missing) {
    console.error(`  ${item.asset}  (from ${item.usedBy.join(", ")})`);
  }
}

if (failed) {
  console.error(
    "\nFix: download assets into public/ and reference only root-relative paths (e.g. /clients/logo.webp).\n",
  );
  process.exit(1);
}

console.log(
  `✓ Local images OK — ${refs.size} referenced assets present under public/; no remote image URLs in app source.`,
);
