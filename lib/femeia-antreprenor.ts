import type { Product } from './products';

export const FA_PRODUCT_ID = 'placute-femeia-antreprenor';
export const FA_PRICE = 269;
export const FA_IMAGE = '/products/FA_placute-Brasov.png';
export const FA_ROUTE = '/fonduri-nationale/placute-femeia-antreprenor';
export const FA_AGENCIES = [
  { id: 'brasov', name: 'Brașov', image: '/products/FA_placute-Brasov.png' },
  { id: 'constanta', name: 'Constanța', image: '/products/FA_placute-Constanta.png' },
  { id: 'ploiesti', name: 'Ploiești', image: '/products/FA_placute-Ploiesti.png' },
];
export const FA_PRODUCT: Product = {
  id: FA_PRODUCT_ID, slug: FA_PRODUCT_ID, routeSlug: FA_ROUTE.slice(1),
  title: 'Plăcuțe Femeia Antreprenor — set de 2 bucăți',
  description: 'Două plăcuțe A3 din PVC de 3 mm, rezistente la intemperii. Personalizare pe baza CUI-ului firmei și a agenției alese. Transport gratuit.',
  images: FA_AGENCIES.map(a => a.image), priceBase: FA_PRICE,
  currency: 'RON', tags: ['femeia antreprenor', 'plăcuțe', 'A3', 'PVC 3 mm'],
  metadata: { category: 'fonduri-europene', program: 'Femeia Antreprenor' },
};

export function isFaItem(item: any): boolean {
  return item?.productId === FA_PRODUCT_ID || item?.slug === FA_PRODUCT_ID || item?.metadata?.productType === FA_PRODUCT_ID;
}

/** Other products in a mixed cart keep their normal shipping charge. */
export function onlyFaItems(items: any[]): boolean {
  return items.length > 0 && items.every(isFaItem);
}
