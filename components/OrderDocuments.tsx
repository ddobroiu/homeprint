import { isFaItem } from '@/lib/femeia-antreprenor';

export default function OrderDocuments({ id, invoiceUrl, items }: { id: string; invoiceUrl?: string | null; items: any[] }) {
  const documents = [...(invoiceUrl ? [{ kind: 'contract', name: 'Contract de prestări servicii' }] : []), ...(items.some(isFaItem) ? [{ kind: 'oferta', name: 'Ofertă comercială' }, { kind: 'predare-primire', name: 'Proces-verbal de predare-primire' }] : [])];
  if (!invoiceUrl && !documents.length) return null;
  return <section className="rounded-xl border border-slate-200 bg-white p-5 text-slate-900">
    <h2 className="mb-3 font-semibold">Documentele comenzii</h2>
    <div className="flex flex-wrap gap-3">
      {invoiceUrl && <a href={invoiceUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium">Factura PDF</a>}
      {documents.map(document => <a key={document.kind} href={`/api/order/${encodeURIComponent(id)}/documents/${document.kind}`} download className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium">{document.name} · PDF</a>)}
    </div>
  </section>;
}
