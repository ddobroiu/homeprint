import data from "./searchProducts.json";
import { calculateRollupPrice, ROLLUP_CONSTANTS, calculatePosterPrice, calculateAutocolantePrice, calculatePVCForexPrice, AFISE_CONSTANTS, AUTOCOLANTE_CONSTANTS, PVC_FOREX_CONSTANTS, type AutocolantesMaterialKey } from "./pricing";

export type SearchProduct = {
    slug: string; category: "afise" | "autocolante" | "pvc-forex" | "rollup"; title: string; short: string;
    description: string; image: string; size?: string; width: number; height: number;
    quantity: number; material?: AutocolantesMaterialKey; laminated?: boolean;
    keywords: string[]; fields: string[]; notes: string[]; aliases?: string[];
    defaultTexts?: Record<string, string>;
    thickness?: number; contourCut?: boolean; optionalTexts?: boolean;
};
export type SearchProductOptions = {
    width: number; height: number; quantity: number; size: string;
    material: string; laminated: boolean; design: "standard" | "upload" | "pro";
    thickness: number; contourCut: boolean;
};
export const SEARCH_PRODUCTS = data as SearchProduct[];
export function searchProductPath(p: SearchProduct) { return `/shop/${p.category}/${p.slug}`; }
export function findSearchProduct(category: string, slug: string) {
    return SEARCH_PRODUCTS.find(p => p.category === category && (p.slug === slug || p.aliases?.includes(slug)));
}
export function searchProductMinQuantity(p: SearchProduct, width: number, height: number) {
    return p.category === "autocolante" && width > 0 && height > 0 && width <= 10 && height <= 10 ? 50 : 1;
}
export function searchProductDefaults(p: SearchProduct): SearchProductOptions {
    return { width: p.width, height: p.height, quantity: Math.max(p.quantity, searchProductMinQuantity(p, p.width, p.height)), size: p.size || "A3", material: p.material || "paper_150_lucioasa", laminated: p.laminated || false, design: "standard", thickness: p.thickness || 3, contourCut: p.contourCut || false };
}
/** Same live pricing functions as the main configurators; no invented fixed prices. */
export function searchProductPrice(p: SearchProduct, options = searchProductDefaults(p)) {
    if (p.category === "rollup") {
        const result = calculateRollupPrice({ width_cm: options.width, quantity: options.quantity, designOption: options.design === "pro" ? "pro" : "upload" });
        return { print: result.finalPrice-result.designFee, cut: 0, fee: result.designFee, total: result.finalPrice };
    }
    if (p.category === "pvc-forex") {
        const result = calculatePVCForexPrice({ width_cm: options.width, height_cm: options.height, quantity: options.quantity, thickness_mm: options.thickness, contour_cut: options.contourCut, stock_model: true, designOption: options.design === "pro" ? "pro" : "upload" });
        return { print: result.basePrice, cut: result.contourCutPrice, fee: result.designFee, total: result.finalPrice };
    }
    const print = p.category === "afise"
        ? calculatePosterPrice({ size: options.size, material: options.material, quantity: options.quantity, designOption: "upload" }).finalPrice
        : calculateAutocolantePrice({ width_cm: options.width, height_cm: options.height, quantity: options.quantity, material: options.material as AutocolantesMaterialKey, print_type: "print_cut", laminated: options.laminated, transfer_film: false, designOption: "upload" }).finalPrice;
    const fee = options.design === "pro" ? (p.category === "afise" ? AFISE_CONSTANTS.PRO_DESIGN_FEE : AUTOCOLANTE_CONSTANTS.PRO_DESIGN_FEE) : 0;
    return { print, cut: 0, fee, total: Math.round((print + fee) * 100) / 100 };
}
export function searchProductsAsProducts() {
    return SEARCH_PRODUCTS.map(p => {
        const defaults = searchProductDefaults(p);
        const size = p.category === "afise" ? defaults.size : `${defaults.width} × ${defaults.height} cm`;
        const configuration = `${defaults.quantity} ${defaults.quantity === 1 ? "bucată" : "bucăți"}, ${size}`;
        return { id: `model-${p.category}-${p.slug}`, slug: p.slug, routeSlug: searchProductPath(p).slice(1), title: `${p.title} · ${configuration}`, description: `${p.short} Prețul afișat este pentru ${configuration}, cu materialul preselectat și modelul prezentat.`, images: [p.image], priceBase: searchProductPrice(p).total, currency: "RON", tags: p.keywords, metadata: { category: p.category, isSearchProduct: true, initialQuantity: defaults.quantity } };
    });
}
