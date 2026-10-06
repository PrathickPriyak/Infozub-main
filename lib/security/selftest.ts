/**
 * Lightweight sanity checks for sanitizers. Run:
 * npx --yes tsx lib/security/selftest.ts
 */

import assert from "node:assert/strict";
import { sanitizeHtml } from "./html";
import { serializeJsonLd } from "./json-ld";
import { isBlockedIp } from "./webhook-url";

assert.equal(sanitizeHtml("<p>Hello</p>"), "<p>Hello</p>");
assert.equal(sanitizeHtml('<script>alert(1)</script><p>ok</p>'), "<p>ok</p>");
assert.equal(
  sanitizeHtml('<p onclick="alert(1)">x</p>'),
  "<p>x</p>",
);
assert.equal(
  sanitizeHtml('<a href="javascript:alert(1)">x</a>'),
  "<a>x</a>",
);
assert.equal(
  sanitizeHtml('<a href="https://infozub.com" target="_blank">x</a>'),
  '<a href="https://infozub.com" target="_blank" rel="noopener noreferrer">x</a>',
);
assert.equal(
  sanitizeHtml('<img src="https://cdn.example/a.jpg" onerror="alert(1)" alt="a" />'),
  '<img src="https://cdn.example/a.jpg" alt="a" />',
);
assert.equal(sanitizeHtml('<iframe src="https://evil"></iframe>'), "");
assert.equal(
  sanitizeHtml('<a href="&#106;avascript:alert(1)">x</a>'),
  "<a>x</a>",
);

const jsonLd = serializeJsonLd({
  name: "</script><script>alert(1)</script>",
});
assert.equal(jsonLd.includes("<"), false);
assert.equal(jsonLd.includes("</script>"), false);

assert.equal(isBlockedIp("127.0.0.1"), true);
assert.equal(isBlockedIp("10.0.0.8"), true);
assert.equal(isBlockedIp("192.168.1.1"), true);
assert.equal(isBlockedIp("169.254.169.254"), true);
assert.equal(isBlockedIp("8.8.8.8"), false);

console.log("security selftest ok");
