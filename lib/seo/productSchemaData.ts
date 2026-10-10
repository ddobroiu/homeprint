import { siteConfig } from "@/lib/siteConfig";
import { getFromPrice } from "./fromPrice";
import { resolveLocalProductKey } from "./siteSpecialization";
import { getLocalProductFacts } from "./localProductFacts";
import { landingPriceFor } from "@/lib/merchant/landingPrice";

export type ProductSchemaInput = {
  name: string; description: string; image: string; url: string;
  price?: string | number; currency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  ratingValue?: string | number; ratingCount?: number;
};

export function productSchemaData(input: ProductSchemaInput) {
  const origin = new URL(siteConfig.url);
  const url = new URL(input.url, origin);
  const key = url.origin === origin.origin ? resolveLocalProductKey(url.pathname) : undefined;
  const from = key ? getFromPrice([key]) : null;
  const facts = key ? getLocalProductFacts([key])?.facts : undefined;
  const supplied = typeof input.price === "number" ? input.price : Number(input.price?.trim().replace(",", "."));
  // Configuratoarele din Google Merchant: datele structurate dau exact prețul cu care se deschide pagina
  // (același ca în feed), nu „de la X” calculat pe altă variantă (ex. canvas rulat 264 lei vs. 162 lei pe șasiu).
  const landing = url.origin === origin.origin ? landingPriceFor(url.pathname, new URLSearchParams()) : null;
  const landingPrice = landing && landing.price > 0 ? Math.round(landing.price * 100) / 100 : null;
  const price = landingPrice ?? from?.price ?? supplied;
  const aggregate = !landingPrice && !!from;
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org", "@type": "Product",
    name: input.name, description: facts?.what || input.description,
    image: new URL(input.image, origin).href,
    brand: { "@type": "Brand", name: siteConfig.name },
    url: url.href,
  };
  if (Number.isFinite(price) && price > 0) {
    schema.offers = {
      "@type": aggregate ? "AggregateOffer" : "Offer",
      url: url.href, priceCurrency: aggregate || landingPrice ? "RON" : input.currency || "RON",
      ...(aggregate ? { lowPrice: price } : { price }),
      availability: `https://schema.org/${input.availability || "InStock"}`,
      seller: { "@type": "Organization", name: siteConfig.name },
    };
  }
  const rating = Number(input.ratingValue);
  if (Number.isFinite(rating) && rating >= 1 && rating <= 5 && Number.isInteger(input.ratingCount) && (input.ratingCount ?? 0) > 0) {
    schema.aggregateRating = { "@type": "AggregateRating", ratingValue: rating, reviewCount: input.ratingCount };
  }
  return { schema, from, facts };
}
