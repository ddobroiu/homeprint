/** @jsxRuntime classic */
import { join } from 'node:path';
// The PDF reconciler must receive elements from its installed React runtime (node_modules/react),
// rather than Next.js's bundled React. `require` vine prin eval ca bundlerul (webpack / Turbopack) să nu-l
// analizeze: createRequire(...) cu argument dinamic pica „next build --webpack” (TypeError la colectarea paginilor).
// eslint-disable-next-line no-eval
const nodeRequire = eval('require') as NodeRequire;
const React = (nodeRequire('node:module') as typeof import('node:module')).createRequire(join(process.cwd(), 'package.json'))('react') as typeof import('react');
import { Document, Page, Text, View, StyleSheet, renderToBuffer } from '@react-pdf/renderer';
import { COMPANY, CONTACT_EMAIL, VAT_NOTE_ASCII } from './company';
import { siteConfig } from './siteConfig';
import { isFaItem } from './femeia-antreprenor';
import type { StoredOrder } from './orderStore';

export const DOCUMENT_VERSION = '2026-10-07';
export const DOCUMENT_KINDS = ['contract', 'oferta', 'predare-primire'] as const;
export type DocumentKind = typeof DOCUMENT_KINDS[number];
const ascii = (value: unknown) => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ș/g, 's').replace(/ț/g, 't').replace(/Ș/g, 'S').replace(/Ț/g, 'T');
const money = (value: number) => `${Number(value).toFixed(2)} RON`;
const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 10, color: '#152d49', lineHeight: 1.5 },
  title: { fontSize: 21, marginBottom: 8, fontFamily: 'Helvetica-Bold' },
  subtitle: { color: '#526175', marginBottom: 20 },
  box: { padding: 13, backgroundColor: '#eef3f9', marginBottom: 14, borderRadius: 5 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 12, marginBottom: 6, marginTop: 10 },
  paragraph: { marginBottom: 8 },
  row: { paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: '#dce4ee' },
  footer: { position: 'absolute', bottom: 20, left: 40, right: 40, fontSize: 8, color: '#526175' },
});

export function availableOrderDocuments(order: Pick<StoredOrder, 'items' | 'invoiceLink'>): DocumentKind[] {
  return [...(order.invoiceLink ? ['contract' as const] : []), ...(order.items.some(isFaItem) ? ['oferta' as const, 'predare-primire' as const] : [])];
}

export async function renderOrderDocument(order: StoredOrder, kind: DocumentKind): Promise<Buffer> {
  if (!availableOrderDocuments(order).includes(kind)) throw new Error('Document indisponibil pentru aceasta comanda');
  const billing = order.billing;
  const faItems = order.items.filter(isFaItem);
  const items = kind === 'contract' ? order.items : faItems;
  const buyer = billing.denumire_companie || billing.name || order.address.nume_prenume;
  const address = [billing.strada_nr, billing.localitate, billing.judet].filter(Boolean).join(', ') || [order.address.strada_nr, order.address.localitate, order.address.judet].filter(Boolean).join(', ');
  const title = { contract: 'Contract de prestari servicii', oferta: 'Oferta comerciala', 'predare-primire': 'Proces-verbal de predare-primire' }[kind];
  const paragraph = (text: string) => <Text style={styles.paragraph}>{ascii(text)}</Text>;
  const heading = (text: string) => <Text style={styles.heading}>{text}</Text>;
  return renderToBuffer(<Document title={`${title} - comanda ${order.orderNo}`} author={COMPANY.legalNameAscii}>
    <Page size="A4" style={styles.page} wrap>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Comanda #{order.orderNo} | {new Date(order.createdAt).toLocaleDateString('ro-RO', { timeZone: 'Europe/Bucharest' })} | {ascii(order.source || siteConfig.domain)}</Text>
      <View style={styles.box} wrap={false}>
        {heading('Prestator / furnizor')}
        {paragraph(`${COMPANY.legalNameAscii} | CUI ${COMPANY.cui} | ${COMPANY.regCom}\n${COMPANY.address.fullAscii}
Contact: ${CONTACT_EMAIL} | ${siteConfig.url}`)}
        {heading('Beneficiar')}
        {paragraph(`${buyer}${billing.cui ? ` | CUI ${billing.cui}` : ''}${billing.reg_com ? ` | ${billing.reg_com}` : ''}\n${address}\nContact: ${billing.email || order.address.email}`)}
      </View>
      {heading(kind === 'contract' ? '1. Obiectul serviciilor' : 'Produse si specificatii')}
      {kind === 'contract' && paragraph('Prestatorul realizeaza serviciile de personalizare si imprimare pentru produsele de mai jos, conform configuratiei si fisierelor aferente comenzii.')}
      {items.map((item, index) => <View key={index} style={styles.row} wrap={false}>
        <Text>{ascii(item.name)} | {item.qty} buc. | {money(item.unit)} / buc. | {money(item.total)}</Text>
        {!isFaItem(item) && <Text>{ascii(Object.entries(item.metadata || {}).filter(([key, value]) => ['width', 'height', 'material', 'finish', 'finishing', 'format', 'paper', 'lamination'].includes(key) && ['string', 'number'].includes(typeof value)).map(([key, value]) => `${({ width: 'Latime (cm)', height: 'Inaltime (cm)', material: 'Material', finish: 'Finisare', finishing: 'Finisare', format: 'Format', paper: 'Hartie', lamination: 'Laminare' } as Record<string, string>)[key]}: ${value}`).join(' | '))}</Text>}
        {isFaItem(item) && <Text>{ascii(`Set de 2 placute A3 (42 x 29,7 cm), PVC 3 mm, rezistente la intemperii. Agentia: ${item.metadata?.agency?.name || ''}. Beneficiar: ${buyer}${billing.cui ? `. CUI: ${billing.cui}` : ''}. Transport gratuit pentru acest produs.`)}</Text>}
      </View>)}
      {kind === 'contract' && <>
        {heading('2. Pret si plata')}
        {paragraph(`Total comanda: ${money(order.total)}, din care transport: ${money(order.shippingFee)}. ${VAT_NOTE_ASCII} Metoda de plata: ${order.paymentMethod}. Factura aferenta comenzii evidentiaza produsele, transportul si eventualele reduceri.`)}
        {heading('3. Executie si livrare')}
        {paragraph('Configuratia produselor si grafica aprobata de beneficiar constituie specificatiile lucrarii. Beneficiarul furnizeaza datele si fisierele necesare personalizarii. Termenul de executie si livrare este cel comunicat pentru comanda. Modificarile ulterioare se confirma intre parti inaintea executiei.')}
        {heading('4. Documentele comenzii')}
        {paragraph('Prezentul document se refera exclusiv la comanda identificata mai sus si la factura acesteia. Conditiile de livrare, conformitate si reclamatii sunt cele comunicate si acceptate la plasarea comenzii. Documentul generat nu reprezinta o semnatura a partilor.')}
      </>}
      {kind === 'oferta' && paragraph(`Valoare produse din oferta: ${money(items.reduce((sum, item) => sum + item.total, 0))}. Transport gratuit pentru placutele Femeia Antreprenor. ${VAT_NOTE_ASCII} Eventualele reduceri sunt evidentiate in factura comenzii.`)}
      {kind === 'predare-primire' && <>
        {paragraph('Document pregatit pentru receptia produselor. Se completeaza si se semneaza la predarea efectiva; generarea lui nu confirma livrarea sau acceptarea produselor.')}
        {paragraph('Data predarii: ____________________\nCantitatea receptionata: ____________________\nObservatii privind starea produselor: __________________________________\n________________________________________________________________')}
      </>}
      {kind !== 'oferta' && <View style={{ marginTop: 22 }} wrap={false}>{paragraph(`${kind === 'contract' ? 'Prestator' : 'Predat de'}: ____________________\n${kind === 'contract' ? 'Beneficiar' : 'Primit de'}: ____________________\nSemnaturi: ____________________                 ____________________`)}</View>}
      <Text style={styles.footer} fixed render={({ pageNumber, totalPages }) => `Comanda #${order.orderNo} | Model ${DOCUMENT_VERSION} | Pagina ${pageNumber}/${totalPages}`} />
    </Page>
  </Document>);
}

export async function orderDocumentAttachments(order: StoredOrder) {
  return Promise.all(availableOrderDocuments(order).map(async kind => ({ filename: `${kind}-comanda-${order.orderNo}.pdf`, content: await renderOrderDocument(order, kind) })));
}
