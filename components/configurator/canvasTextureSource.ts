export function canvasTextureSource(source: string): string {
    if (source.startsWith("/") || source.startsWith("blob:") || source.startsWith("data:")) return source;
    return `/api/proxy-image?url=${encodeURIComponent(source)}`;
}
