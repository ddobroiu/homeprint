
export const revalidate = 0;
import { alerta } from '@/lib/alerts';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { fulfillOrder } from '@/lib/orderService';
import { sendTikTokPurchase } from '@/lib/tiktok-events';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
        return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2025-12-15.clover' as any,
        typescript: true,
    });

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        // Contul Stripe și baza de date sunt comune tuturor site-urilor de print: fiecare site procesează
        // doar plățile făcute pe el (altfel aceeași plată ar da mai multe facturi și emailuri)
        const meta = session.metadata || {};
        const isMine = meta.project ? meta.project === 'homeprint' : meta.source === 'homeprint.ro';
        const source = String(meta.source || 'homeprint.ro').toLowerCase();

        if (!isMine) {
            console.log(`[Webhook] Ignored payment of ${meta.project || meta.source || 'untagged'}`);
            return NextResponse.json({ received: true, ignored: true });
        }

        try {
            console.log(`[HomePrint Webhook] Processing session: ${session.id}`);

            // 1. Check if order already exists to prevent duplicate processing & sequence gaps
            const existingOrder = await prisma.order.findUnique({
                where: { stripeSessionId: session.id }
            });

            if (existingOrder) {
                console.log(`[HomePrint Webhook] Order already exists for session ${session.id}. Skipping.`);
                return NextResponse.json({ received: true, status: 'already_exists' });
            }

            const pendingCheckout = await prisma.pendingCheckout.findUnique({
                where: { sessionId: session.id }
            });

            let checkoutData: any;

            if (!pendingCheckout) {
                console.warn(`[HomePrint Webhook] No pending checkout found for session: ${session.id}`);
                console.warn('[HomePrint Webhook] Falling back to metadata:', JSON.stringify(session.metadata, null, 2));

                if (session.metadata?.address_email) {
                    checkoutData = {
                        cart: session.metadata.cart_items ? JSON.parse(session.metadata.cart_items) : [],
                        address: {
                            email: session.metadata.address_email,
                            nume_prenume: session.metadata.name || 'N/A',
                            telefon: session.metadata.phone || 'N/A',
                            judet: 'N/A',
                            localitate: 'N/A',
                            strada_nr: 'N/A'
                        },
                        billing: {
                            tip_factura: 'persoana_fizica',
                            email: session.metadata.address_email,
                        },
                        userId: session.metadata.userId,
                        marketing: session.metadata.marketing ? JSON.parse(session.metadata.marketing) : undefined,
                    };
                    console.log('[HomePrint Webhook] Constructed fallback checkoutData from metadata');
                } else {
                    console.error('[HomePrint Webhook] CRITICAL: No pending checkout AND no address_email in metadata.');
                    void alerta("error", "stripe-webhook", `plata Stripe primita, dar lipsesc datele comenzii (sesiune ${session.id}) - comanda nu s-a creat`);
                    return NextResponse.json({ error: 'Pending checkout not found and metadata insufficient' }, { status: 404 });
                }
            } else {
                checkoutData = pendingCheckout.checkoutData;
            }

            // Creăm comanda folosind logica centralizată
            const result = await fulfillOrder(
                {
                    ...checkoutData,
                    // Ne asigurăm că userId e transmis corect dacă există în checkoutData
                    userId: checkoutData.userId || null,
                    stripeSessionId: session.id,
                    source: source
                },
                'Card'
            );


            // Actualizăm statusul comenzii la 'active' (sau echivalentul pt plătit)
            // Deoarece fulfillOrder o creează ca 'pending'
            if (result.orderId) {
                await prisma.order.update({
                    where: { id: result.orderId },
                    data: {
                        status: 'active', // Statusul 'active' înseamnă "În lucru" / Plătită
                        // Putem salva și ID-ul tranzacției sau alte detalii dacă avem câmpuri
                    }
                });
            }

            // Ștergem datele temporare doar dacă există
            if (pendingCheckout) {
                await prisma.pendingCheckout.delete({
                    where: { id: pendingCheckout.id }
                });
            }

            console.log(`[HomePrint Webhook] Order fulfilled successfully: ${result.orderNo}`);

            // TikTok CompletePayment (server), o singură dată: ajungem aici doar la prima creare a comenzii
            // (sesiunile deja procesate ies mai sus). Numai cu acordul de marketing salvat în metadata sesiunii.
            // event_id = "order-<nr>", ca pixelul din components/ConversionTracker.tsx (deduplicare).
            if (result.orderNo) {
                const items: any[] = Array.isArray(checkoutData.items) ? checkoutData.items : Array.isArray(checkoutData.cart) ? checkoutData.cart : [];
                void sendTikTokPurchase({
                    eventId: `order-${result.orderNo}`,
                    orderId: String(result.orderNo),
                    value: (session.amount_total ?? 0) / 100,
                    currency: session.currency || 'ron',
                    contents: items.map((it) => ({
                        content_id: String(it.productId || it.id || it.name || 'produs').slice(0, 100),
                        content_name: String(it.name || '').slice(0, 200) || undefined,
                        quantity: Number(it.quantity) || 1,
                        price: Number(it.unitAmount ?? it.price ?? 0) || 0,
                    })),
                    pageUrl: 'https://www.homeprint.ro/checkout/success/stripe',
                    email: session.customer_details?.email || session.customer_email || checkoutData.address?.email,
                    phone: session.customer_details?.phone || checkoutData.address?.telefon || checkoutData.address?.phone,
                    externalId: checkoutData.userId || session.metadata?.userId || null,
                    metadata: session.metadata,
                });
            }

        } catch (error) {
            console.error('[HomePrint Webhook] Error fulfilling order:', error);
            void alerta("error", "stripe-webhook", `plata Stripe primita, dar comanda nu s-a finalizat (sesiune ${session.id}): ${String((error as any)?.message || error).slice(0, 400)}`);
            return NextResponse.json({ error: 'Error fulfilling order' }, { status: 500 });
        }
    }

    return NextResponse.json({ received: true });
}
