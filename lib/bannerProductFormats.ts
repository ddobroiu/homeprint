import assets from './bannerProductAssets.json';
export function stockBannerFormat(slug = '') {
 const asset = (assets as Record<string, { aspectRatio?: number; material?: string }>)[slug];
 const ratio = [2, 2.5, 3, 3.5, 4].includes(asset?.aspectRatio ?? 0) ? asset!.aspectRatio! : 2;
 const heights = [50, 75, 100, 125, 150, 200];
 const material = asset?.material === 'mesh' ? 'mesh' as const : 'frontlit_440' as const;
 return { ratio, material, width: ratio * 100, height: 100, sizes: heights.map(h => ({ w: h * ratio, h })) };
}
