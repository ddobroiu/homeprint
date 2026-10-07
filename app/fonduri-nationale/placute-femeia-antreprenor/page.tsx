import type { Metadata } from 'next';
import FemeiaAntreprenorConfigurator from '@/components/configurator/FemeiaAntreprenorConfigurator';
import { FA_PRICE, FA_PRODUCT, FA_ROUTE } from '@/lib/femeia-antreprenor';
import ProductJsonLd from '@/components/ProductJsonLd';
import { siteConfig } from '@/lib/siteConfig';

// Numele site-ului il adauga sablonul de titlu din app/layout.tsx („%s | <Site>”).
export const metadata: Metadata = {
  title: 'Plăcuțe Femeia Antreprenor — set 2 bucăți A3, PVC 3 mm',
  description: FA_PRODUCT.description,
  alternates: { canonical: FA_ROUTE },
};

export default function Page() {
  return <><ProductJsonLd product={FA_PRODUCT} url={`${siteConfig.url}${FA_ROUTE}`} price={FA_PRICE} currency="RON" sku={FA_PRODUCT.id} image={(FA_PRODUCT.images || []).map(src => `${siteConfig.url}${src}`)} /><FemeiaAntreprenorConfigurator /></>;
}
