import { getEstimatedShippingCost, internationalShippingError } from '@/lib/shippingUtils';

/** Peste acest total (lei) rambursul nu apare în checkout. */
export const MAX_RAMBURS_LIMIT = 300;
/** Sub acest total (lei) plata cu cardul nu apare în checkout (comisioane Stripe pe sume foarte mici). */
export const MIN_CARD_PAYMENT = 5;
export const FREE_SHIPPING_THRESHOLD = 500;

export const BANK_TRANSFER_BENEFICIARY = "CULOAREA DIN VIATA SA SRL";
export const BANK_TRANSFER_IBAN = "RO75BREL0002005430850100";
export const BANK_TRANSFER_BANK_NAME = "LIBRA BANK";

function isRomania(country?: string | null): boolean {
  const c = String(country || 'RO').toUpperCase().trim();
  return c === 'RO' || c === 'ROMANIA' || c === 'ROMÂNIA';
}

/**
 * Transportul comenzii: gratuit peste FREE_SHIPPING_THRESHOLD doar în România;
 * în străinătate se plătește mereu costul DPD real al coletelor + 10% (lib/intlShipping.ts).
 */
export function shippingFeeFor(country: string | null | undefined, items: any[], subtotal: number): number {
  if (isRomania(country) && subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return getEstimatedShippingCost(country || 'RO', items || []);
}

export function computeCheckoutTotal(orderData: {
  items?: Array<{ unitAmount?: number; price?: number; quantity?: number }>;
  address?: { country?: string };
  discountAmount?: number;
}): number {
  const items = orderData.items || [];
  const subtotal = items.reduce(
    (s, it) =>
      s + (Number(it.unitAmount ?? it.price ?? 0) * Number(it.quantity ?? 1)),
    0
  );
  const shipping = shippingFeeFor(orderData.address?.country, items, subtotal);
  const discount = Number(orderData.discountAmount || 0);
  return Math.max(0, subtotal + shipping - discount);
}

/** Textile (tricouri, hanorace, șepci): plata doar cu cardul sau prin ordin de plată. */
export const TEXTILE_TYPES = ["tricouri", "hanorace", "sepci"];

export function hasTextiles(
  items?: Array<{ slug?: string; productId?: string; name?: string; title?: string; metadata?: { productType?: string } }>
): boolean {
  return (items || []).some(
    (it) =>
      TEXTILE_TYPES.includes(String(it.metadata?.productType || "")) ||
      /tricou|hanorac|sepci|șepci|sapca|șapca/i.test(String(it.slug || it.productId || ""))
  );
}

export function validateCheckoutPaymentMethod(
  paymentMethod: string,
  total: number,
  country?: string,
  items?: Parameters<typeof hasTextiles>[0]
): string | null {
  // Livrare internațională: doar țările DPD și coletele în limite (altfel oferta de transport vine pe email)
  const shippingError = internationalShippingError(country, (items || []) as any[]);
  if (shippingError) return shippingError;
  if (paymentMethod === 'cash_on_delivery') {
    if (hasTextiles(items)) {
      return 'Pentru comenzile cu tricouri, hanorace sau șepci plata se face doar cu cardul sau prin ordin de plată.';
    }
    if (total > MAX_RAMBURS_LIMIT) {
      return 'Metoda de plată selectată nu este disponibilă pentru această comandă.';
    }
    if (country && country !== 'RO') {
      return 'Rambursul la curier este disponibil doar în România.';
    }
  }
  return null;
}
