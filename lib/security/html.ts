/**
 * Conservative HTML sanitizer for blog article bodies.
 *
 * WordPress `content.rendered` (and future CMS HTML) is stored in JSON.
 * Never render that string raw — strip scripts, event handlers, and
 * non-http(s)/mailto/tel/relative URLs before `dangerouslySetInnerHTML`.
 */

const ALLOWED_TAGS = new Set([
  "a",
  "b",
  "blockquote",
  "br",
  "code",
  "div",
  "em",
  "figcaption",
  "figure",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "i",
  "img",
  "li",
  "ol",
  "p",
  "pre",
  "span",
  "strong",
  "table",
  "tbody",
  "td",
  "th",
  "thead",
  "tr",
  "u",
  "ul",
]);

const VOID_TAGS = new Set(["br", "hr", "img"]);

const ALLOWED_ATTRS: Record<string, ReadonlySet<string>> = {
  a: new Set(["href", "title", "target"]),
  img: new Set(["src", "alt", "width", "height", "loading"]),
  td: new Set(["colspan", "rowspan"]),
  th: new Set(["colspan", "rowspan"]),
};

const STRIP_WITH_CONTENTS =
  /<(script|style|iframe|object|embed|form|input|button|textarea|select|link|meta|base|svg|math|noscript)(\s[^>]*)?>[\s\S]*?<\/\1>/gi;

const STRIP_VOID_DANGEROUS =
  /<(script|style|iframe|object|embed|form|input|button|textarea|select|link|meta|base|svg|math|noscript)(\s[^>]*)?\/?>/gi;

function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;/g, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => {
      const code = Number.parseInt(hex, 16);
      return Number.isFinite(code) ? String.fromCodePoint(code) : "";
    })
    .replace(/&#(\d+);/g, (_, n: string) => {
      const code = Number(n);
      return Number.isFinite(code) ? String.fromCodePoint(code) : "";
    });
}

function protocolOf(raw: string): string {
  const compact = decodeEntities(raw)
    .trim()
    .replace(/[\u0000-\u001F\u007F\s]/g, "")
    .toLowerCase();
  const colon = compact.indexOf(":");
  return colon === -1 ? "" : compact.slice(0, colon);
}

function isSafeUrl(raw: string, kind: "href" | "src"): boolean {
  const value = decodeEntities(raw).trim();
  if (!value) return false;

  const protocol = protocolOf(value);
  if (protocol === "javascript" || protocol === "vbscript" || protocol === "data") {
    return false;
  }

  const lower = value.toLowerCase();

  if (kind === "src") {
    return lower.startsWith("https://") || lower.startsWith("/");
  }

  return (
    lower.startsWith("https://") ||
    lower.startsWith("http://") ||
    lower.startsWith("mailto:") ||
    lower.startsWith("tel:") ||
    lower.startsWith("/") ||
    lower.startsWith("#")
  );
}

function parseAttrs(raw: string): Array<[string, string]> {
  const result: Array<[string, string]> = [];
  const re =
    /([:@a-zA-Z_][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let match: RegExpExecArray | null = re.exec(raw);
  while (match) {
    const name = match[1]?.toLowerCase() ?? "";
    const value = match[2] ?? match[3] ?? match[4] ?? "";
    if (name && name !== "/") result.push([name, value]);
    match = re.exec(raw);
  }
  return result;
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function rebuildOpenTag(name: string, attrRaw: string): string {
  const allowed = ALLOWED_ATTRS[name];
  let open = `<${name}`;
  let blankTarget = false;

  if (allowed) {
    for (const [attr, value] of parseAttrs(attrRaw)) {
      if (attr.startsWith("on") || attr.startsWith("xmlns") || attr.includes(":")) {
        continue;
      }
      if (!allowed.has(attr)) continue;

      if (attr === "href" || attr === "src") {
        if (!isSafeUrl(value, attr)) continue;
        open += ` ${attr}="${escapeAttr(decodeEntities(value).trim())}"`;
        continue;
      }

      if (attr === "target") {
        if (value === "_blank") blankTarget = true;
        continue;
      }

      if (attr === "loading" && value !== "lazy" && value !== "eager") continue;

      open += ` ${attr}="${escapeAttr(value)}"`;
    }
  }

  if (name === "a" && blankTarget) {
    open += ` target="_blank" rel="noopener noreferrer"`;
  }

  if (VOID_TAGS.has(name)) return `${open} />`;
  return `${open}>`;
}

/** Strip dangerous markup from article HTML. Safe to pass to React. */
export function sanitizeHtml(input: string): string {
  if (!input) return "";

  let html = input.replace(/<!--[\s\S]*?-->/g, "");
  html = html.replace(STRIP_WITH_CONTENTS, "");
  html = html.replace(STRIP_VOID_DANGEROUS, "");

  return html.replace(
    /<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g,
    (full, tag: string, attrRaw: string) => {
      const name = tag.toLowerCase();
      if (!ALLOWED_TAGS.has(name)) return "";
      if (full.startsWith("</")) return `</${name}>`;
      return rebuildOpenTag(name, attrRaw);
    },
  );
}
