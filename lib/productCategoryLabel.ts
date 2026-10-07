import { CATALOG_CATEGORIES } from "./catalog/types";
const labels: Record<string, string> = { afise: "Afișe", autocolante: "Autocolante", bannere: "Bannere", canvas: "Canvas", configuratoare: "Produse configurabile", "fonduri-europene": "Fonduri europene", "pvc-forex": "PVC Forex", rollup: "Roll-up", semnalistica: "Semnalistică" };
export function productCategoryLabel(category: string) { return labels[category.toLowerCase()] || CATALOG_CATEGORIES.find(c => c.slug === category)?.name || category; }
