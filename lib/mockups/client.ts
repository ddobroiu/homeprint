"use client";

// Partea de browser a machetelor: incarca scena (foto + harta), pregateste suprafata produsului
// (grafica la proportia produsului, cu incadrarea aleasa in configurator) si randeaza in canvas.
import geometry from "./scene-geometry.json";
import { MOCKUP_SCENES, type MockupFamily, type MockupSceneConfig } from "./scenes";
import { prepareScene, productRect, renderMockup, sceneAspect, surfaceSize, type PreparedScene, type SceneGeometry } from "./render";

export type { MockupFamily } from "./scenes";

/** incadrarea graficii pe produs (aceeasi forma ca ArtworkFit din ArtworkFitEditor) */
export type MockupFit = { mode: "cover" | "contain"; zoom: number; x: number; y: number };

const GEO = geometry as unknown as Record<string, SceneGeometry>;

/** familii la care zonele fara grafica raman transparente (tesatura, autocolant decupat, geam) */
const TRANSPARENT_FAMILIES = new Set<MockupFamily>(["tricouri", "hanorace", "sepci", "autocolante", "window-graphics"]);

/** produsul (id configurator / produs editor) -> familia de scene */
export function mockupFamilyFor(productId: string | null | undefined): MockupFamily | null {
    if (!productId) return null;
    const id = productId.toLowerCase();
    const map: Record<string, MockupFamily> = {
        banner: "banner",
        "banner-verso": "banner-verso",
        mesh: "mesh",
        rollup: "rollup",
        "roll-up": "rollup",
        tricouri: "tricouri",
        tricou: "tricouri",
        hanorace: "hanorace",
        sepci: "sepci",
        canvas: "canvas",
        "canvas-8-martie": "canvas",
        "canvas-martisor": "canvas",
        afise: "afise",
        autocolante: "autocolante",
        "carti-vizita": "carti-vizita",
        flayere: "flayere",
        flyere: "flayere",
        pliante: "pliante",
        tapet: "tapet",
        "window-graphics": "window-graphics",
        "pvc-forex": "panouri",
        plexiglass: "panouri",
        alucobond: "panouri",
        polipropilena: "panouri",
        carton: "panouri",
        "fonduri-eu": "fonduri-eu",
        "fonduri-pnrr": "fonduri-eu",
        "configurator-fonduri": "fonduri-eu",
    };
    return map[id] ?? null;
}

/** scenele unei familii, cele mai apropiate ca proportie de produs primele */
export function scenesFor(family: MockupFamily, productAspect: number, available?: string[]): MockupSceneConfig[] {
    const list = MOCKUP_SCENES.filter((s) => s.families.includes(family) && GEO[s.id] && (!available || available.includes(s.id)));
    const primary = (s: MockupSceneConfig) => (s.families[0] === family ? 0 : 1);
    const dist = (s: MockupSceneConfig) => Math.abs(Math.log((s.aspect || GEO[s.id].aspect) / (productAspect || 1)));
    return list.sort((a, b) => dist(a) + primary(a) * 0.35 - (dist(b) + primary(b) * 0.35));
}

export function canMockup(url: string | null | undefined): boolean {
    if (!url) return false;
    if (url.startsWith("blob:") || url.startsWith("data:image/")) return true;
    const clean = url.split("?")[0].toLowerCase();
    if (/\.(pdf|ai|psd|eps|zip|rar|tif|tiff|svgz)$/.test(clean)) return false;
    return true;
}

function loadImg(src: string, cors: boolean): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        if (cors) img.crossOrigin = "anonymous";
        img.decoding = "async";
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Imaginea nu s-a putut incarca"));
        img.src = src;
    });
}

/** grafica clientului; daca serverul ei nu permite citirea in canvas, trece prin /api/proxy-image */
export async function loadDesign(url: string): Promise<HTMLImageElement> {
    if (url.startsWith("blob:") || url.startsWith("data:") || url.startsWith("/")) return loadImg(url, false);
    try {
        const img = await loadImg(url, true);
        // verificare: canvasul nu e "murdar"
        const c = document.createElement("canvas");
        c.width = c.height = 1;
        const ctx = c.getContext("2d")!;
        ctx.drawImage(img, 0, 0, 1, 1);
        ctx.getImageData(0, 0, 1, 1);
        return img;
    } catch {
        return loadImg(`/api/proxy-image?url=${encodeURIComponent(url)}`, false);
    }
}

function imageData(img: CanvasImageSource, w: number, h: number): ImageData {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d", { willReadFrequently: true })!;
    ctx.drawImage(img, 0, 0, w, h);
    return ctx.getImageData(0, 0, w, h);
}

const sceneCache = new Map<string, Promise<PreparedScene>>();

export function loadScene(cfg: MockupSceneConfig): Promise<PreparedScene> {
    let p = sceneCache.get(cfg.id);
    if (!p) {
        p = (async () => {
            const [base, fx] = await Promise.all([loadImg(`/mockups/${cfg.id}.webp`, false), loadImg(`/mockups/${cfg.id}-fx.webp`, false)]);
            const geo = GEO[cfg.id];
            return prepareScene(geo, cfg, imageData(base, base.naturalWidth, base.naturalHeight), imageData(fx, fx.naturalWidth, fx.naturalHeight));
        })();
        p.catch(() => sceneCache.delete(cfg.id));
        sceneCache.set(cfg.id, p);
    }
    return p;
}

/** suprafata produsului: grafica asezata pe produs ca la tipar (cover/contain + zoom + mutare) */
export function buildSurface(design: HTMLImageElement, w: number, h: number, fit: MockupFit, transparent: boolean): ImageData {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d", { willReadFrequently: true })!;
    if (!transparent) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);
    }
    const iw = design.naturalWidth || design.width;
    const ih = design.naturalHeight || design.height;
    const baseScale = fit.mode === "cover" ? Math.max(w / iw, h / ih) : Math.min(w / iw, h / ih);
    const s = baseScale * (fit.zoom || 1);
    const dw = iw * s, dh = ih * s;
    const cx = w / 2 + (fit.x || 0) * w, cy = h / 2 + (fit.y || 0) * h;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    // micsorare in pasi (fara "zimti" cand grafica e mult mai mare decat suprafata)
    let src: CanvasImageSource = design;
    let sw = iw, sh = ih;
    while (sw / 2 > dw && sh / 2 > dh) {
        const t = document.createElement("canvas");
        t.width = Math.max(1, Math.round(sw / 2));
        t.height = Math.max(1, Math.round(sh / 2));
        const tc = t.getContext("2d")!;
        tc.imageSmoothingQuality = "high";
        tc.drawImage(src, 0, 0, t.width, t.height);
        src = t;
        sw = t.width;
        sh = t.height;
    }
    ctx.drawImage(src, cx - dw / 2, cy - dh / 2, dw, dh);
    return ctx.getImageData(0, 0, w, h);
}

export type MockupRender = { canvas: HTMLCanvasElement; ms: number };

/** randeaza o scena intr-un canvas nou */
export async function renderScene(
    cfg: MockupSceneConfig,
    design: HTMLImageElement,
    productAspect: number,
    family: MockupFamily,
    fit: MockupFit
): Promise<MockupRender> {
    const scene = await loadScene(cfg);
    const t0 = performance.now();
    const rect = productRect(sceneAspect(scene), productAspect, cfg.anchor);
    const size = surfaceSize(scene.geo, rect, productAspect, 1600);
    const surface = buildSurface(design, size.w, size.h, fit, TRANSPARENT_FAMILIES.has(family));
    const out = renderMockup(scene, surface, rect);
    const canvas = document.createElement("canvas");
    canvas.width = out.width;
    canvas.height = out.height;
    canvas.getContext("2d")!.putImageData(new ImageData(new Uint8ClampedArray(out.data), out.width, out.height), 0, 0);
    return { canvas, ms: performance.now() - t0 };
}

/** JPEG pentru descarcare, cu un filigran discret al site-ului */
export function watermarkedJpeg(src: HTMLCanvasElement, label: string): Promise<Blob> {
    const c = document.createElement("canvas");
    c.width = src.width;
    c.height = src.height;
    const ctx = c.getContext("2d")!;
    ctx.drawImage(src, 0, 0);
    const fs = Math.max(14, Math.round(c.width / 52));
    ctx.font = `600 ${fs}px system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
    const tw = ctx.measureText(label).width;
    const pad = fs * 0.55;
    const x = c.width - tw - pad * 3, y = c.height - pad * 2;
    ctx.fillStyle = "rgba(0,0,0,0.38)";
    const bw = tw + pad * 2, bh = fs + pad * 1.2;
    ctx.beginPath();
    if (typeof ctx.roundRect === "function") ctx.roundRect(x - pad, y - fs - pad * 0.4, bw, bh, bh / 2);
    else ctx.rect(x - pad, y - fs - pad * 0.4, bw, bh);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.fillText(label, x, y - pad * 0.1);
    return new Promise((resolve, reject) => c.toBlob((b) => (b ? resolve(b) : reject(new Error("Export esuat"))), "image/jpeg", 0.9));
}
