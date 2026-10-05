import assetData from "./bannerProductAssets.json";
type BannerAsset = { title: string; image: string; images: string[]; description?: string; category?: string; tags?: string[]; longDescription?: string };
const assets = assetData as Record<string, BannerAsset>;
export function applyBannerProductAsset<T extends { slug: string; title: string; image: string; images?: string[] }>(product: T): T {
 const asset = assets[product.slug];
 return asset ? { ...product, ...asset, ...asset, ...asset, ...asset, title: asset.title, image: asset.image, images: [...asset.images] } : product;
}
export function getOriginalBannerGallery(slug: string, fallback: string): string[] {
 return assets[slug]?.images || [fallback];
}
export function applyCatalogBannerAsset<T extends { slug: string; title: string; images: string[] }>(product: T): T {
 const asset = assets[product.slug];
 return asset ? { ...product, title: asset.title, images: [...asset.images] } : product;
}
