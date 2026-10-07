import { productSchemaData, type ProductSchemaInput } from "@/lib/seo/productSchemaData";
import Link from "next/link";

export default function ReviewedProductSchema(input: ProductSchemaInput) {
  const { schema, from, facts } = productSchemaData(input);
  const isConfigurator = ["/configurator/", "/materiale/"].some(prefix => new URL(input.url, "https://local.invalid").pathname.startsWith(prefix));
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    {!isConfigurator && from && <div className="mx-auto max-w-7xl px-4 py-3 text-sm text-slate-600">
      <p><strong>Preț de pornire: {from.text}/buc</strong> — {from.basis}.</p>
      <p className="mt-1 text-xs">Dimensiunea, materialul, finisarea și cantitatea alese în configurator modifică prețul final.</p>
    </div>}
    {!isConfigurator && facts && <details className="mx-auto mb-4 max-w-7xl rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
      <summary className="cursor-pointer font-semibold">Material, finisare și fișier pentru print</summary>
      <div className="pt-4"><p>{facts.what}</p><ul className="mt-3 grid gap-2 sm:grid-cols-2">{facts.specs.map(spec=><li key={spec} className="rounded-lg bg-slate-50 p-3">{spec}</li>)}</ul><p className="mt-4">{facts.artwork}</p><Link href="/pregatire-fisiere" className="mt-3 inline-block font-semibold underline">Verifică dimensiunea și rezoluția fișierului</Link></div>
    </details>}
  </>;
}
