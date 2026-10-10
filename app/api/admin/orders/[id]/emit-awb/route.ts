import { alerta } from '@/lib/alerts';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/adminSession';
import { createShipment, getPickupPoints, printExtended, trackingUrlForAwb, validateShipment } from '@/lib/dpdService';
import { intlCountry } from '@/lib/intlShipping';
import { intlShipmentRequests } from '@/lib/dpdIntlLive';
import { sendEmail } from '@/lib/email';
import { awbEmail, orderMailFrom } from '@/lib/order-notify-emails';
import { calculateShippingParams, determinePackingType } from '@/lib/shippingUtils';
import { declaredPackage } from '@/lib/packageInfo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = req.cookies.get('admin_auth')?.value;
    const session = verifyAdminSession(token);
    if (!session) return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const order = await prisma.order.findUnique({ where: { id }, include: { items: true } });
    if (!order) return NextResponse.json({ ok: false, message: 'Order not found' }, { status: 404 });

    const addressRaw = order.shippingAddress;
    const address = typeof addressRaw === 'object' && addressRaw !== null ? (addressRaw as any) : JSON.parse((addressRaw as string) || '{}');
    let serviceId = Number(process.env.DPD_DEFAULT_SERVICE_ID || 2505);

    // Configurare Țări DPD (ISO Numeric)
    const COUNTRY_IDS: Record<string, number> = {
      'RO': 642, 'HU': 348, 'BG': 100, 'GR': 300, 'PL': 616,
      'CZ': 203, 'SK': 703, 'SI': 705, 'IT': 380, 'ES': 724,
      'FR': 250, 'DE': 276, 'AT': 40, 'BE': 56, 'HR': 191,
      'NL': 528, 'PT': 620, 'DK': 208, 'SE': 752, 'FI': 246
    };

    const countryCode = (address.country || 'RO').toUpperCase();
    const countryId = COUNTRY_IDS[countryCode] || intlCountry(countryCode)?.isoNumeric || 642; // default RO

    // Ajustare pentru intern vs internațional
    if (countryCode !== 'RO') {
      // serviciul din contract pentru țara respectivă: 2212 Regional CEE (est) / 2303 International (vest)
      serviceId = intlCountry(countryCode)?.tariff.serviceId || 2303;
    }

    if (!serviceId) return NextResponse.json({ ok: false, message: 'DPD serviceId unavailable' }, { status: 500 });

    // Build shipment
    const contentDesc = (order.items || []).map((it: any) => `${it.name} x${it.qty}`).join(', ').slice(0, 70) || 'Materiale tipar';

    // Ramburs permis doar in RO
    const isRambursValid = (order.paymentMethod === 'Ramburs' || order.paymentMethod === 'cash_on_delivery') && countryCode === 'RO';
    const codAmount = isRambursValid ? Math.max(0, Number(order.totalAmount || 0)) : 0;

    // Punctul de ridicare ales in admin (unul din sediile din contractul DPD); altfel cel implicit
    const body = await req.json().catch(() => ({}));
    const wanted = Number(body?.senderClientId || 0);
    const allowed = wanted ? (await getPickupPoints().catch(() => [])).some((p) => p.clientId === wanted) : false;
    const senderClientId = allowed ? wanted : process.env.DPD_SENDER_CLIENT_ID ? Number(process.env.DPD_SENDER_CLIENT_ID) : undefined;

    const shipment: any = {
      sender: senderClientId ? { clientId: senderClientId } : undefined,
      recipient: {
        clientName: address?.nume_prenume || address?.nume || (order as any).user?.name || 'Client',
        contactName: address?.nume_prenume || address?.nume || (order as any).user?.name || 'Client',
        email: address?.email || (order as any).user?.email || undefined,
        phone1: { number: address?.telefon || (order as any).user?.phone || undefined },
        privatePerson: true,
        // Livrare la locker / punct DPD: DPD livreaza la punct, fara adresa
        ...(address?.dpdOfficeId
            ? { pickupOfficeId: Number(address.dpdOfficeId) }
            : {
                address: {
              countryId: countryId,
                  siteName: address?.localitate,
                  postCode: address?.postCode,
                  addressNote: `${address?.strada_nr || ''}, ${address?.localitate || ''}, ${address?.judet || ''}, ${countryCode}`
                },
            }),
      },
      service: { serviceId, autoAdjustPickupDate: true },
      content: { parcelsCount: 1, totalWeight: 1, contents: contentDesc, package: 'Pachet' },
      payment: { courierServicePayer: 'SENDER' },
    };

    // Calculate dynamic weight...
    // (rest of the weight calculation logic)
    let calculatedWeight = 1;
    if (order.items && order.items.length > 0) {
      let totalW = 0;
      for (const item of order.items) {
        const meta = (item as any).metadata || {};
        const quantity = (item as any).quantity || (item as any).qty || 1;

        const width = parseFloat(meta.width || '0') || 0;
        const height = parseFloat(meta.height || '0') || 0;
        const pkg = declaredPackage(item);

        if (pkg) {
          totalW += pkg.kg;
        } else if (width > 0 && height > 0) {
          const slug = (item as any).slug || (item as any).name || '';
          const packingType = determinePackingType(slug, item);
          const params = calculateShippingParams({
            width, height, quantity, type: packingType
          });
          totalW += params.billingWeight;
        } else {
          totalW += (0.5 * quantity);
        }
      }
      if (totalW > 0) calculatedWeight = parseFloat(totalW.toFixed(2));
    }

    // Update shipment weight
    shipment.content.totalWeight = calculatedWeight;

    if (codAmount > 0) {
      shipment.service.additionalServices = { cod: { amount: codAmount, currencyCode: 'RON' } };
    }

    console.log('[emit-awb] Creating shipment for order:', order.orderNo, 'with weight:', calculatedWeight);

    // Internațional: o expediere pe colet acolo unde DPD nu acceptă mai multe colete (toate țările în afară de HU / BG),
    // cu coletele reale (lib/parcels.ts). Le validăm pe toate înainte să creăm vreuna, ca să nu rămână AWB-uri pe jumătate.
    let shipmentsToCreate: any[] = [shipment];
    if (countryCode !== 'RO') {
      const built = intlShipmentRequests(shipment, countryCode, order.items || [], address?.strada_nr);
      if (built.error) return NextResponse.json({ ok: false, message: built.error }, { status: 400 });
      shipmentsToCreate = built.requests;
      for (const [k, reqShipment] of shipmentsToCreate.entries()) {
        const v = await validateShipment(reqShipment);
        if (!v.valid) {
          const msg = v.error?.message || v.error?.context || 'expediere invalidă';
          return NextResponse.json({ ok: false, message: `DPD (colet ${k + 1}/${shipmentsToCreate.length}): ${msg}` }, { status: 400 });
        }
      }
    }

    // Create shipment(s) via DPD service
    const createdAll: any[] = [];
    for (const reqShipment of shipmentsToCreate) {
    const created = await createShipment(reqShipment);
    if ((created as any)?.error || !created?.id) {
      const dpdError = (created as any)?.error;
      const errorMsg = dpdError?.message || dpdError?.context || 'Eroare creare expediție';
      console.error('[emit-awb] DPD Error:', dpdError);
      void alerta("error", "dpd", `AWB-ul DPD nu s-a generat pentru comanda ${order.orderNo}: ${String(errorMsg).slice(0, 400)}`);
      return NextResponse.json({ 
        ok: false, 
        message: `DPD: ${errorMsg}`, 
        raw: created,
        createdAwbs: createdAll.map((c) => String(c.id)),
      }, { status: 400 });
    }
    createdAll.push(created);
    }

    const shipmentId = String(createdAll[0].id);
    const allAwbs = createdAll.map((c) => String(c.id)).join(', ');
    const parcels = createdAll.flatMap((c) => c.parcels || []);

    // Optional: print label PDF (try to generate label before saving)
    let base64: string | undefined;
    let labelFileName: string | undefined;
    try {
      const r = await printExtended({ paperSize: 'A6', parcels: parcels.map((p: any) => ({ id: p.id })), format: 'pdf' });
      base64 = r.base64;
      if (base64) labelFileName = `DPD_${shipmentId}.pdf`;
    } catch (e) {
      console.warn('[emit-awb] print label failed', (e as any)?.message || e);
    }

    // Save AWB to order, include label if generated
    try {
      const updateData: any = { awbNumber: shipmentId, awbCarrier: 'DPD' };
      // mai multe expedieri (internațional, câte un colet): toate AWB-urile rămân pe adresa comenzii
      if (createdAll.length > 1) updateData.shippingAddress = { ...address, intlAwbs: createdAll.map((c) => String(c.id)) };
      if (base64) {
        updateData.awbLabelBase64 = base64;
        updateData.awbLabelFileName = labelFileName;
      }
      await prisma.order.update({ where: { id: order.id }, data: updateData });
      try {
        const { revalidatePath } = await import('next/cache');
        revalidatePath('/admin/orders');
        revalidatePath('/admin/users');
      } catch (re) {
        console.warn('[revalidate] emit-awb failed', (re as any)?.message || re);
      }
    } catch (e) {
      console.error('DB Error saving AWB', (e as any)?.message || e);
    }

    // Email client with AWB and label
    try {
      if (address?.email || (order as any).user?.email) {
        const { subject, html } = awbEmail({
          carrier: 'DPD',
          awbs: createdAll.map((c) => ({ awb: String(c.id), url: trackingUrlForAwb(String(c.id)) })),
          orderNo: order.orderNo,
          name: address?.nume_prenume || (order as any).user?.name,
          source: order.source,
          marketing: order.marketing,
        });
        await sendEmail({
          from: orderMailFrom(order.source),
          to: address?.email || (order as any).user?.email,
          subject,
          html,
          attachments: base64 ? [{ filename: `DPD_${shipmentId}.pdf`, content: Buffer.from(base64, 'base64') }] : undefined,
        });
      }
    } catch (e) {
      console.warn('[emit-awb] email failed', (e as any)?.message || e);
    }

    const trackingUrl = trackingUrlForAwb(shipmentId);
    return NextResponse.json({ ok: true, shipmentId, awb: String(shipmentId), awbs: createdAll.map((c) => String(c.id)), trackingUrl, hasLabel: !!base64 });
  } catch (e: any) {
    console.error('[API /admin/orders/[id]/emit-awb] Error:', e?.message || e);
    return NextResponse.json({ ok: false, message: 'Eroare internă' }, { status: 500 });
  }
}
