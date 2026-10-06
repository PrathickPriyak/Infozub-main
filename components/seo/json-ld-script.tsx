import type { JsonLd } from "@/lib/seo/json-ld";
import { serializeJsonLd } from "@/lib/security/json-ld";

type JsonLdScriptProps = {
  data: JsonLd | readonly JsonLd[];
  id?: string;
};

/** Server-safe JSON-LD script tag. Escapes `<` so strings cannot break out. */
export function JsonLdScript({ data, id }: JsonLdScriptProps) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(payload.length === 1 ? payload[0] : payload),
      }}
    />
  );
}
