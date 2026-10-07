import { getOrder } from './orderStore';
import { prisma } from './prisma';
import { DOCUMENT_VERSION, orderDocumentAttachments } from './orderDocuments';

/**
 * Genereaza PDF-urile comenzii (contract / oferta / proces-verbal) si pastreaza o copie in
 * order.marketing.orderDocuments, ca documentul trimis clientului sa ramana acelasi la descarcare.
 */
export async function saveOrderDocuments(id: string) {
  const order = await getOrder(id);
  if (!order) throw new Error('Order not found');
  const attachments = await orderDocumentAttachments(order);
  if (attachments.length) await prisma.order.update({ where: { id }, data: { marketing: {
    ...(order.marketing || {}), documentVersion: DOCUMENT_VERSION,
    orderDocuments: attachments.map(document => ({ filename: document.filename, base64: document.content.toString('base64') })),
  } } });
  return attachments;
}

/** Ca saveOrderDocuments, dar o problema la PDF nu opreste niciodata factura sau e-mailul. */
export async function trySaveOrderDocuments(id: string) {
  try {
    return await saveOrderDocuments(id);
  } catch (error) {
    console.error('[orderDocuments] generarea PDF a esuat pentru comanda', id, error instanceof Error ? error.message : error);
    return [];
  }
}
