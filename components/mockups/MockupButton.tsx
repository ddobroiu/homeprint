"use client";

// "Vezi pe produs": grafica clientului pusa pe produs in scene realiste (randare in browser, fara server).
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Download, Eye, Loader2, X, ZoomIn, ZoomOut } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import type { MockupSceneConfig } from "@/lib/mockups/scenes";
import {
    canMockup,
    loadDesign,
    mockupFamilyFor,
    renderScene,
    scenesFor,
    watermarkedJpeg,
    type MockupFamily,
    type MockupFit,
} from "@/lib/mockups/client";
import availableScenes from "@/lib/mockups/site-scenes.json";

// la textile grafica isi pastreaza proportia ei in zona de tipar (nu proportia unui produs fix)
const FREE_ASPECT = new Set<MockupFamily>(["tricouri", "hanorace", "sepci"]);

type Props = {
    /** id-ul configuratorului / produsului (banner, canvas, pvc-forex, tricouri...) */
    product: string;
    imageUrl?: string | null;
    widthCm?: number;
    heightCm?: number;
    /** incadrarea aleasa in configurator; fara ea grafica se vede intreaga (contain) */
    fit?: MockupFit | null;
    className?: string;
    label?: string;
    /** buton mic (bara editorului) */
    compact?: boolean;
    /** grafica se produce abia la apasare (editorul randeaza planșa) */
    getImageUrl?: () => Promise<string>;
};

export default function MockupButton({ product, imageUrl, widthCm, heightCm, fit, className, label = "Vezi pe produs", compact, getImageUrl }: Props) {
    const [open, setOpen] = useState(false);
    const [lazyUrl, setLazyUrl] = useState<string | null>(null);
    const [preparing, setPreparing] = useState(false);
    const family = mockupFamilyFor(product);
    const scenes = useMemo(() => (family ? scenesFor(family, 1, availableScenes as string[]) : []), [family]);
    useEffect(() => () => {
        if (lazyUrl?.startsWith("blob:")) URL.revokeObjectURL(lazyUrl);
    }, [lazyUrl]);
    if (!family || !scenes.length || (!getImageUrl && !canMockup(imageUrl))) return null;
    const url = getImageUrl ? lazyUrl : imageUrl;
    const onOpen = async () => {
        if (!getImageUrl) return setOpen(true);
        setPreparing(true);
        try {
            setLazyUrl(await getImageUrl());
            setOpen(true);
        } finally {
            setPreparing(false);
        }
    };
    return (
        <>
            <button
                type="button"
                onClick={onOpen}
                disabled={preparing}
                className={
                    className ??
                    (compact
                        ? "inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-[13px] font-semibold text-slate-800 hover:bg-slate-50"
                        : "inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[var(--color-brand-primary,#16a34a)] bg-white px-4 py-2.5 text-sm font-bold text-[var(--color-brand-primary,#16a34a)] shadow-sm transition hover:bg-[color-mix(in_srgb,var(--color-brand-primary,#16a34a)_8%,white)]")
                }
                title="Vezi grafica pe produs, în scene reale"
            >
                {preparing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
                {label && <span>{label}</span>}
            </button>
            {open && url && (
                <MockupModal
                    family={family}
                    imageUrl={url}
                    widthCm={widthCm}
                    heightCm={heightCm}
                    fit={fit}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
}

type Thumb = { id: string; url: string | null };

function MockupModal({
    family,
    imageUrl,
    widthCm,
    heightCm,
    fit,
    onClose,
}: {
    family: MockupFamily;
    imageUrl: string;
    widthCm?: number;
    heightCm?: number;
    fit?: MockupFit | null;
    onClose: () => void;
}) {
    const [design, setDesign] = useState<HTMLImageElement | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [active, setActive] = useState<string | null>(null);
    const [mainUrl, setMainUrl] = useState<string | null>(null);
    const [busy, setBusy] = useState(true);
    const [zoom, setZoom] = useState(false);
    const [thumbs, setThumbs] = useState<Thumb[]>([]);
    const canvases = useRef(new Map<string, HTMLCanvasElement>());
    const urls = useRef<string[]>([]);

    const productAspect = useMemo(() => {
        if (design && FREE_ASPECT.has(family)) return design.naturalWidth / design.naturalHeight;
        if (widthCm && heightCm && widthCm > 0 && heightCm > 0) return widthCm / heightCm;
        return design ? design.naturalWidth / design.naturalHeight : 1;
    }, [design, family, widthCm, heightCm]);
    const effectiveFit: MockupFit = useMemo(
        () => (FREE_ASPECT.has(family) ? { mode: "contain", zoom: 1, x: 0, y: 0 } : fit ?? { mode: "contain", zoom: 1, x: 0, y: 0 }),
        [family, fit]
    );
    const list: MockupSceneConfig[] = useMemo(() => scenesFor(family, productAspect, availableScenes as string[]), [family, productAspect]);

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [onClose]);

    useEffect(() => {
        let alive = true;
        loadDesign(imageUrl)
            .then((img) => alive && setDesign(img))
            .catch(() => alive && setError("Nu am putut citi grafica. Previzualizarea pe produs merge cu fișiere JPG, PNG sau WebP."));
        return () => {
            alive = false;
        };
    }, [imageUrl]);

    useEffect(
        () => () => {
            urls.current.forEach((u) => URL.revokeObjectURL(u));
        },
        []
    );

    const toUrl = useCallback(async (canvas: HTMLCanvasElement, maxW?: number) => {
        let src = canvas;
        if (maxW && canvas.width > maxW) {
            const t = document.createElement("canvas");
            t.width = maxW;
            t.height = Math.round((canvas.height * maxW) / canvas.width);
            const ctx = t.getContext("2d")!;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(canvas, 0, 0, t.width, t.height);
            src = t;
        }
        const blob: Blob = await new Promise((res, rej) => src.toBlob((b) => (b ? res(b) : rej(new Error("toBlob"))), "image/jpeg", 0.88));
        const u = URL.createObjectURL(blob);
        urls.current.push(u);
        return u;
    }, []);

    // randare: intai scena activa (cea mai potrivita), apoi miniaturile, pe rand
    useEffect(() => {
        if (!design || !list.length) return;
        let alive = true;
        canvases.current.clear();
        const first = list[0].id;
        setActive(first);
        setThumbs(list.map((s) => ({ id: s.id, url: null })));
        (async () => {
            for (const s of list) {
                try {
                    const r = await renderScene(s, design, productAspect, family, effectiveFit);
                    if (!alive) return;
                    canvases.current.set(s.id, r.canvas);
                    const thumb = await toUrl(r.canvas, 220);
                    if (!alive) return;
                    setThumbs((t) => t.map((x) => (x.id === s.id ? { ...x, url: thumb } : x)));
                    if (s.id === first) {
                        setMainUrl(await toUrl(r.canvas));
                        setBusy(false);
                    }
                } catch {
                    if (s.id === first && alive) {
                        setError("Scena nu s-a putut încărca. Reîncearcă.");
                        setBusy(false);
                    }
                }
                await new Promise((r) => setTimeout(r, 0));
            }
        })();
        return () => {
            alive = false;
        };
    }, [design, list, productAspect, family, effectiveFit, toUrl]);

    const pick = async (id: string) => {
        setActive(id);
        setZoom(false);
        const c = canvases.current.get(id);
        if (c) setMainUrl(await toUrl(c));
        else {
            setBusy(true);
            const s = list.find((x) => x.id === id);
            if (!s || !design) return;
            const r = await renderScene(s, design, productAspect, family, effectiveFit);
            canvases.current.set(id, r.canvas);
            setMainUrl(await toUrl(r.canvas));
            setBusy(false);
        }
    };

    const download = async () => {
        const c = active ? canvases.current.get(active) : null;
        if (!c) return;
        const blob = await watermarkedJpeg(c, siteConfig.domain);
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `${siteConfig.domain.replace(/\..*$/, "")}-${active}.jpg`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    };

    const activeLabel = list.find((s) => s.id === active)?.label ?? "";
    const dims = widthCm && heightCm ? `${widthCm} × ${heightCm} cm` : null;

    return createPortal(
        <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-slate-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Vezi pe produs" onClick={onClose}>
            <div className="flex max-h-[100dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-h-[94vh] sm:rounded-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-5">
                    <div className="min-w-0">
                        <p className="text-base font-bold text-slate-900">Vezi pe produs</p>
                        <p className="truncate text-xs text-slate-500">
                            {activeLabel}
                            {dims ? ` · ${dims}` : ""} · previzualizare orientativă
                        </p>
                    </div>
                    <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900" aria-label="Închide">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className={`relative min-h-[240px] flex-1 bg-slate-100 ${zoom ? "overflow-auto" : "overflow-hidden"}`}>
                    {error ? (
                        <p className="p-8 text-center text-sm text-slate-600">{error}</p>
                    ) : (
                        <>
                            {mainUrl && (
                                <img
                                    src={mainUrl}
                                    alt={`Grafica ta: ${activeLabel}`}
                                    onClick={() => setZoom((z) => !z)}
                                    className={zoom ? "max-w-none cursor-zoom-out" : "mx-auto block max-h-[62dvh] w-auto max-w-full cursor-zoom-in object-contain sm:max-h-[66vh]"}
                                    style={zoom ? { width: "200%" } : undefined}
                                    draggable={false}
                                />
                            )}
                            {busy && (
                                <div className="absolute inset-0 flex items-center justify-center bg-slate-100/60">
                                    <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="border-t border-slate-100 px-3 py-3 sm:px-5">
                    <div className="flex gap-2 overflow-x-auto pb-1">
                        {thumbs.map((t) => {
                            const s = list.find((x) => x.id === t.id);
                            const on = t.id === active;
                            return (
                                <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => pick(t.id)}
                                    className={`relative h-[68px] w-[96px] shrink-0 overflow-hidden rounded-lg border-2 bg-slate-100 transition sm:h-[76px] sm:w-[110px] ${on ? "border-[var(--color-brand-primary,#16a34a)]" : "border-transparent hover:border-slate-300"}`}
                                    title={s?.label}
                                    aria-pressed={on}
                                >
                                    {t.url ? <img src={t.url} alt={s?.label ?? ""} className="h-full w-full object-cover" /> : <Loader2 className="absolute inset-0 m-auto h-4 w-4 animate-spin text-slate-400" />}
                                </button>
                            );
                        })}
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <p className="text-[11px] leading-snug text-slate-500">Simulare pe baza graficii tale; culorile și finisajul real pot diferi ușor.</p>
                        <div className="flex gap-2">
                            <button type="button" onClick={() => setZoom((z) => !z)} disabled={!mainUrl} className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">
                                {zoom ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
                                {zoom ? "Micșorează" : "Mărește"}
                            </button>
                            <button type="button" onClick={download} disabled={!mainUrl || busy} className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-[var(--color-brand-primary,#16a34a)] px-4 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50">
                                <Download className="h-4 w-4" />
                                Descarcă imaginea
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
