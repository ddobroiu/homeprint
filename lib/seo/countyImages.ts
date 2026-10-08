// Ilustrația județului (reperul reședinței, desenat pe produsul tipic al site-ului).
// Sursa: lib/seo/data/countyImages.json, generat de `npm run local:images` din
// public/local/judete/<judet>.webp + alt.json. Doar județele din manifest au imagine,
// așa că pentru restul nu se randează nimic (fără imagini stricate, fără 404).
import manifest from "./data/countyImages.json";

export type CountyImage = {
    src: string;
    width: number;
    height: number;
    /** Textul alternativ pentru pagina județului (din alt.json, cu mici corecturi). */
    alt: string;
    /** Numele reperului („Biserica Neagră și Tâmpa”), dacă poate fi extras din alt. */
    landmark?: string;
};

type Entry = { src: string; width: number; height: number; alt: string };
const IMAGES = (manifest as { images: Record<string, Entry> }).images;

// Corecturi gramaticale pentru textele generate („într-un cafenea” -> „într-o cafenea”).
function tidy(alt: string): string {
    return alt.replace(/(^|\s)într-un (cafenea|vitrină|recepție|sală|cameră|bucătărie)(?=[\s,.]|$)/g, "$1într-o $2").replace(/\s+/g, " ").trim();
}

function landmarkOf(alt: string): string | undefined {
    const m = /ilustrația reperului\s+([^,.]+)/i.exec(alt);
    return m?.[1]?.trim() || undefined;
}

export function getCountyImage(judetSlug: string): CountyImage | null {
    const e = IMAGES[judetSlug];
    if (!e) return null;
    const alt = tidy(e.alt);
    return { src: e.src, width: e.width, height: e.height, alt, landmark: landmarkOf(alt) };
}

export function countyImageSlugs(): string[] {
    return Object.keys(IMAGES);
}

/** „al județului Brașov” / „al Bucureștiului” */
function ofCounty(judetSlug: string, judetName: string): string {
    return judetSlug === "bucuresti" ? "al Bucureștiului" : `al județului ${judetName}`;
}

/** „din județul Brașov” / „din București” */
export function inCounty(judetSlug: string, judetName: string): string {
    return judetSlug === "bucuresti" ? "din București" : `din județul ${judetName}`;
}

const MAX_ALT = 159;

/** Alt pentru paginile localităților: textul județului + legătura cu localitatea, sub 160 de caractere (max. 159). */
export function countyImageAltForLocality(img: CountyImage, judetSlug: string, judetName: string, locName: string): string {
    const base = img.alt.replace(/[.\s]+$/, "");
    const tail = ` — reper ${ofCounty(judetSlug, judetName)}, livrare în ${locName}`;
    if (base.length + tail.length <= MAX_ALT) return base + tail;
    // Fără decor („, într-un living…”), păstrând produsul și reperul.
    const short = base.split(",")[0];
    if (short.length + tail.length <= MAX_ALT) return short + tail;
    const shorter = ` — ${judetSlug === "bucuresti" ? "București" : `județul ${judetName}`}`;
    return (short + shorter).slice(0, MAX_ALT);
}

/** „Reper din județul Brașov: Biserica Neagră și Tâmpa” */
export function countyImageCaption(img: CountyImage, judetSlug: string, judetName: string): string {
    const where = `Reper ${inCounty(judetSlug, judetName)}`;
    return img.landmark ? `${where}: ${img.landmark}` : where;
}

export function countyImageUrl(img: CountyImage, siteUrl: string): string {
    return `${siteUrl.replace(/\/$/, "")}${img.src}`;
}

/** Pentru metadata.openGraph.images (URL absolut). */
export function countyOgImages(judetSlug: string, siteUrl: string, alt?: string) {
    const img = getCountyImage(judetSlug);
    if (!img) return undefined;
    return [{ url: countyImageUrl(img, siteUrl), width: img.width, height: img.height, alt: alt ?? img.alt }];
}
