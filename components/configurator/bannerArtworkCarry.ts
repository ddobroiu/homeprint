// Grafica incarcata trece cu tot cu dimensiuni si incadrare intre O fata / Fata-verso / Mesh
// (sunt pagini diferite). Se tine doar in sesiunea tabului curent.
import type { ArtworkFit } from "./ArtworkFitEditor";

const KEY = "sp-banner-artwork";
const MAX_AGE_MS = 6 * 60 * 60 * 1000;

export type CarriedArtwork = { url: string; fit: ArtworkFit; ts: number };

export function saveCarriedArtwork(url: string | null, fit: ArtworkFit) {
    // previzualizarea locala (blob:) nu supravietuieste navigarii; asteptam adresa urcata
    if (!url || url.startsWith("blob:")) return;
    try {
        sessionStorage.setItem(KEY, JSON.stringify({ url, fit, ts: Date.now() }));
    } catch {
        /* stocare indisponibila */
    }
}

export function loadCarriedArtwork(): CarriedArtwork | null {
    try {
        const raw = sessionStorage.getItem(KEY);
        if (!raw) return null;
        const v = JSON.parse(raw) as CarriedArtwork;
        if (!v?.url || typeof v.url !== "string" || Date.now() - Number(v.ts) > MAX_AGE_MS) return null;
        const f = v.fit;
        const fit: ArtworkFit =
            f && (f.mode === "cover" || f.mode === "contain")
                ? { mode: f.mode, zoom: Number(f.zoom) || 1, x: Number(f.x) || 0, y: Number(f.y) || 0 }
                : { mode: "cover", zoom: 1, x: 0, y: 0 };
        return { url: v.url, fit, ts: Number(v.ts) };
    } catch {
        return null;
    }
}

// Legatura catre alt tip de banner: pastreaza dimensiunile, cantitatea, gaurile de vant si (optional) grafica
export function bannerSwitchHref(base: string, params: URLSearchParams | null, carryArtwork: boolean) {
    const p = new URLSearchParams();
    for (const k of ["w", "h", "q", "wind"]) {
        const v = params?.get(k);
        if (v) p.set(k, v);
    }
    if (carryArtwork) p.set("art", "1");
    const qs = p.toString();
    return qs ? `${base}?${qs}` : base;
}
