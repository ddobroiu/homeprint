/** Presentation filter only: original metadata stays in the cart and order. */
const INTERNAL_PRODUCT_KEYS = new Set([
    "Imagine", "image", "imageUrl", "productImage", "previewUrl", "thumbnail", "src",
    "Model slug", "bannerMode", "contour_cut", "Fisier", "Fișier", "artworkUrl", "artworkUrlVerso",
    "artworkFit", "artworkFitVerso", "routeSlug", "productId", "slug",
]);
export function isCustomerProductMeta(key: string, metadata?: Record<string, unknown>): boolean {
    if (INTERNAL_PRODUCT_KEYS.has(key)) return false;
    const value = metadata?.[key];
    return !(typeof value === "string" && /^(?:https?:\/\/[^/]+)?\/(?:products|r2|produse-img)\//i.test(value));
}
