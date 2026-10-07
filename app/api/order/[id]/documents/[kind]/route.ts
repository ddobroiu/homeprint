import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { verifyAdminSession } from '@/lib/adminSession';
import { getOrder } from '@/lib/orderStore';
import { prisma } from '@/lib/prisma';
import { DOCUMENT_KINDS, availableOrderDocuments, renderOrderDocument, type DocumentKind } from '@/lib/orderDocuments';

export const runtime = 'nodejs';
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string; kind: string }> }) {
  const session = await getAuthSession();
  const admin = verifyAdminSession(req.cookies.get('admin_auth')?.value);
  const userId = (session?.user as any)?.id;
  if (!admin && !userId) return NextResponse.json({ error: 'Autentificarea este necesara.' }, { status: 401 });
  const { id, kind } = await params;
  if (!(DOCUMENT_KINDS as readonly string[]).includes(kind)) return NextResponse.json({ error: 'Document indisponibil.' }, { status: 404 });
  const order = await getOrder(id);
  if (!order) return NextResponse.json({ error: 'Document indisponibil.' }, { status: 404 });
  if (!admin && order.userId !== userId) {
    const account = await prisma.user.findUnique({ where: { id: userId }, select: { email: true, emailVerified: true } });
    const verifiedOwner = account?.emailVerified && account.email.toLowerCase() === String(order.address?.email || '').toLowerCase();
    if (!verifiedOwner) return NextResponse.json({ error: 'Document indisponibil.' }, { status: 404 });
  }
  const filename = `${kind}-comanda-${order.orderNo}.pdf`;
  const stored = order.marketing?.orderDocuments?.find((doc: any) => doc.filename === filename);
  if (!stored && !availableOrderDocuments(order).includes(kind as DocumentKind)) return NextResponse.json({ error: 'Document indisponibil.' }, { status: 404 });
  const buffer = stored ? Buffer.from(stored.base64, 'base64') : await renderOrderDocument(order, kind as DocumentKind);
  return new NextResponse(new Uint8Array(buffer), { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename="${filename}"`, 'Cache-Control': 'private, no-store' } });
}
