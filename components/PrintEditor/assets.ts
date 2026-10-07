"use client";
// Pozele încărcate și designurile salvate stau în browser (IndexedDB): pozele mari nu încap în
// localStorage, iar site-ul nu are (încă) tabel de designuri în baza de date.
import type { EditorDoc } from "@/lib/editor/types";

const DB_NAME = "shopprint-editor";
const DB_VERSION = 1;

function openDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        if (typeof indexedDB === "undefined") return reject(new Error("IndexedDB indisponibil"));
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = () => {
            const db = req.result;
            if (!db.objectStoreNames.contains("assets")) db.createObjectStore("assets");
            if (!db.objectStoreNames.contains("designs")) db.createObjectStore("designs");
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

async function tx<T>(store: string, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
    const db = await openDb();
    return new Promise<T>((resolve, reject) => {
        const t = db.transaction(store, mode);
        const req = fn(t.objectStore(store));
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

export type AssetRecord = { id: string; blob: Blob; name: string; w: number; h: number; addedAt: number };

const urls = new Map<string, string>();
const meta = new Map<string, AssetRecord>();

export function assetIdFromSrc(src: string): string | null {
    return src.startsWith("asset:") ? src.slice(6) : null;
}

/** URL afișabil pentru src (asset:... -> blob: URL din memorie). */
export function resolveSrc(src: string): string {
    const id = assetIdFromSrc(src);
    if (!id) return src;
    return urls.get(id) ?? "";
}

export async function loadAsset(id: string): Promise<AssetRecord | null> {
    if (meta.has(id)) return meta.get(id)!;
    try {
        const rec = await tx<AssetRecord | undefined>("assets", "readonly", (s) => s.get(id) as IDBRequest<AssetRecord | undefined>);
        if (!rec) return null;
        meta.set(id, rec);
        if (!urls.has(id)) urls.set(id, URL.createObjectURL(rec.blob));
        return rec;
    } catch {
        return null;
    }
}

export async function loadAssetsForDoc(doc: EditorDoc): Promise<void> {
    const ids = new Set<string>();
    for (const el of doc.elements) if (el.type === "image") {
        const id = assetIdFromSrc(el.src);
        if (id) ids.add(id);
    }
    if (doc.background.kind === "image") {
        const id = assetIdFromSrc(doc.background.src);
        if (id) ids.add(id);
    }
    await Promise.all([...ids].map(loadAsset));
}

export async function listAssets(): Promise<AssetRecord[]> {
    try {
        const all = await tx<AssetRecord[]>("assets", "readonly", (s) => s.getAll() as IDBRequest<AssetRecord[]>);
        for (const rec of all) {
            meta.set(rec.id, rec);
            if (!urls.has(rec.id)) urls.set(rec.id, URL.createObjectURL(rec.blob));
        }
        return all.sort((a, b) => b.addedAt - a.addedAt);
    } catch {
        return [];
    }
}

export async function deleteAsset(id: string): Promise<void> {
    try {
        await tx("assets", "readwrite", (s) => s.delete(id));
    } catch {
        /* ignorăm */
    }
    meta.delete(id);
}

function imageSize(url: string): Promise<{ w: number; h: number }> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
        img.onerror = () => reject(new Error("Fișierul nu este o imagine validă"));
        img.src = url;
    });
}

export async function addAssetFromFile(file: File): Promise<AssetRecord> {
    if (!/^image\/(png|jpe?g|webp|gif|svg\+xml|avif)$/i.test(file.type)) {
        throw new Error("Format neacceptat. Folosește JPG, PNG, WebP sau SVG.");
    }
    if (file.size > 60 * 1024 * 1024) throw new Error("Fișierul are peste 60 MB.");
    const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
    const url = URL.createObjectURL(file);
    let size: { w: number; h: number };
    try {
        size = await imageSize(url);
    } catch (e) {
        URL.revokeObjectURL(url);
        throw e;
    }
    if (file.type === "image/svg+xml" && (!size.w || !size.h)) size = { w: 2000, h: 2000 };
    const rec: AssetRecord = { id, blob: file, name: file.name, w: size.w, h: size.h, addedAt: Date.now() };
    urls.set(id, url);
    meta.set(id, rec);
    try {
        await tx("assets", "readwrite", (s) => s.put(rec, id));
    } catch {
        /* fără IndexedDB (navigare privată): poza merge doar în sesiunea curentă */
    }
    return rec;
}

/** Conținutul pozei ca data: URL (pentru exportul SVG -> canvas). */
export async function srcToDataUrl(src: string): Promise<string> {
    if (src.startsWith("data:")) return src;
    const id = assetIdFromSrc(src);
    let blob: Blob;
    if (id) {
        const rec = meta.get(id) ?? (await loadAsset(id));
        if (!rec) throw new Error("Poza încărcată nu mai există în browser. Încarc-o din nou.");
        blob = rec.blob;
    } else {
        const res = await fetch(src);
        if (!res.ok) throw new Error("O poză din design nu s-a putut descărca.");
        blob = await res.blob();
    }
    return new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result));
        r.onerror = () => reject(r.error);
        r.readAsDataURL(blob);
    });
}

// ---------- Designuri salvate ----------
export type SavedDesign = { id: string; name: string; doc: EditorDoc; thumb: string; savedAt: number };

export async function saveDesign(d: SavedDesign): Promise<void> {
    await tx("designs", "readwrite", (s) => s.put(d, d.id));
}
export async function listDesigns(): Promise<SavedDesign[]> {
    try {
        const all = await tx<SavedDesign[]>("designs", "readonly", (s) => s.getAll() as IDBRequest<SavedDesign[]>);
        return all.sort((a, b) => b.savedAt - a.savedAt);
    } catch {
        return [];
    }
}
export async function deleteDesign(id: string): Promise<void> {
    await tx("designs", "readwrite", (s) => s.delete(id));
}

// ---------- Ciorna curentă (salvare automată) ----------
const DRAFT_KEY = "shopprint-editor-draft";
export function saveDraft(doc: EditorDoc) {
    try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ doc, at: Date.now() }));
    } catch {
        /* plin sau blocat */
    }
}
export function loadDraft(): { doc: EditorDoc; at: number } | null {
    try {
        const raw = localStorage.getItem(DRAFT_KEY);
        if (!raw) return null;
        const v = JSON.parse(raw);
        return v?.doc?.version === 1 ? v : null;
    } catch {
        return null;
    }
}
export function clearDraft() {
    try {
        localStorage.removeItem(DRAFT_KEY);
    } catch {
        /* nimic */
    }
}
