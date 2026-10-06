import type { JsonLd } from "@/lib/seo/json-ld";

type JsonLdScriptProps = {
  data: JsonLd | readonly JsonLd[];
  id?: string;
};

/** Server-safe JSON-LD script tag. */
export function JsonLdScript({ data, id }: JsonLdScriptProps) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload.length === 1 ? payload[0] : payload),
      }}
    />
  );
}
