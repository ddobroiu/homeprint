import { ALL_CONFIGURATORS as CONFIGURATORS_REGISTRY } from "./configurators-registry";
import { catalogAsProducts } from "./catalog";
import { PRODUCTS, type Product } from "./products";
import { siteConfig } from "./siteConfig";
export function buildAiSiteKnowledge(query: string) {
  const normalize = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const tokens = normalize(query).split(/\W+/).filter(t => t.length > 2);
  const shopProducts: Product[] = [...PRODUCTS, ...catalogAsProducts()];
  const models = shopProducts.filter(p => !p.metadata?.isSeoCampaign).map(p => ({ p, score: tokens.reduce((score, token) => score + (normalize(p.title + " " + p.description).includes(token) ? 1 : 0), 0) })).filter(row => row.score > 0).sort((a, b) => b.score - a.score).slice(0, 12).map(({ p }) => ({ title: p.title, description: p.description?.replace(/<[^>]*>/g, " "), url: p.routeSlug ? (p.routeSlug.startsWith("/") ? p.routeSlug : "/" + p.routeSlug) : "/product/" + p.slug }));
  return JSON.stringify({
    relevantShopModels: models,
    site: { name: siteConfig.name, description: siteConfig.description, phone: siteConfig.phone, email: siteConfig.email, address: siteConfig.address },
    navigation: siteConfig.headerNav,
    catalog: CONFIGURATORS_REGISTRY.map(c => ({ name: c.name, url: c.url, description: c.description, useCases: c.useCases, dimensions: c.dimensions, materials: c.materials.map(m => ({ name: m.name, description: m.description })), options: c.options, technicalSpecs: c.technicalSpecs, faq: c.faq, turnaroundTime: c.turnaroundTime, shippingNotes: c.shippingNotes })),
    order: "Alege produsul din /shop sau configuratorul, configureaza dimensiunile, cantitatea, materialul si grafica, verifica totalul si adauga in cos. Modelele de banner cu telefon personalizat necesita numarul complet; fotografia de referinta nu se actualizeaza automat. Canvasul pe sasiu nu include rama decorativa.",
  });
}
