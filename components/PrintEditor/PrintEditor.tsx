"use client";
// Editorul online de print (/editor): structura paginii, bara de sus, panouri, scurtături,
// salvare automată, export și trimiterea designului în configurator.
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    AppWindow, Box, ChevronDown, ChevronsLeft, Cloud, CreditCard, Download, Eye, EyeOff, FileText, Flag, Grid3x3, Image as ImageIcon, LayoutTemplate, Layers, Maximize, Minus, PaintBucket, Paintbrush, Plus, Redo2, Save, ScrollText, Shapes, Shirt,
    ShoppingCart, SlidersHorizontal, Sticker, Type, Undo2, Upload, X,
} from "lucide-react";
import { configuratorHref, newDoc, normalizeEl, sizeLabel } from "@/lib/editor/doc";
import { fontByFamily, googleFontsCssUrl, nearestWeight } from "@/lib/editor/fonts";
import { templateById } from "@/lib/editor/templates";
import { invalidateTextMetrics } from "@/lib/editor/textLayout";
import type { EditorDoc, EditorProduct, El, TextEl } from "@/lib/editor/types";
import { addAssetFromFile, clearDraft, listDesigns, loadAssetsForDoc, loadDraft, saveDesign, saveDraft, type SavedDesign } from "./assets";
import { applyTemplate, changeFormat, insertImage, nudge, selectAll } from "./actions";
import { downloadBlob, exportJpeg, exportPdf, exportPng, exportThumb, jpegWithDpi, maxPixels, pickDpi, renderDoc } from "./exporter";
import { BackgroundPanel, ElementsPanel, ImagesPanel, LayersPanel, TemplatesPanel, TextPanel, UploadsPanel } from "./Panels";
import Properties, { preflight } from "./Properties";
import Stage from "./Stage";
import StartScreen, { FormatPicker, type FormatChoice } from "./StartScreen";
import { useEditor, type Panel } from "./store";
import ContextBar, { EffectsPanel } from "./ContextBar";
import { IconBtn, Modal, Toggle, cx } from "./ui";
import "./editor.css";
import "./theme.css";
import { EDITOR_BRAND } from "@/lib/editor/site";

const RAIL: Array<{ id: Exclude<Panel, null>; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: "sabloane", label: "Șabloane", icon: LayoutTemplate },
    { id: "text", label: "Text", icon: Type },
    { id: "elemente", label: "Elemente", icon: Shapes },
    { id: "imagini", label: "Imagini", icon: ImageIcon },
    { id: "incarcari", label: "Încărcări", icon: Upload },
    { id: "fundal", label: "Fundal", icon: PaintBucket },
    { id: "straturi", label: "Straturi", icon: Layers },
];

const PRODUCT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    flag: Flag, grid: Grid3x3, scroll: ScrollText, file: FileText, layers: Layers, card: CreditCard, sticker: Sticker, image: ImageIcon, box: Box, window: AppWindow, brush: Paintbrush, shirt: Shirt,
};

/** Numele și linkul site-ului (editorul se poate copia pe alte site-uri de print). */
export type EditorBrand = { name: string; href: string };
const DEFAULT_BRAND: EditorBrand = { name: EDITOR_BRAND.name, href: EDITOR_BRAND.href };

function useIsMobile() {
    const [m, setM] = useState(false);
    useEffect(() => {
        const f = () => setM(window.innerWidth < 900);
        f();
        window.addEventListener("resize", f);
        return () => window.removeEventListener("resize", f);
    }, []);
    return m;
}

function isTyping(e: Event) {
    const t = e.target as HTMLElement | null;
    return !!t?.closest?.("input,textarea,select,[contenteditable=true]");
}

export default function PrintEditor({ products, brand = DEFAULT_BRAND }: { products: EditorProduct[]; brand?: EditorBrand }) {
    const router = useRouter();
    const params = useSearchParams();
    const isMobile = useIsMobile();
    const doc = useEditor((s) => s.doc);
    const panel = useEditor((s) => s.panel);
    const setPanel = useEditor((s) => s.setPanel);
    const selection = useEditor((s) => s.selection);
    const zoom = useEditor((s) => s.zoom);
    const preview = useEditor((s) => s.preview);
    const canUndo = useEditor((s) => s.past.length > 0);
    const canRedo = useEditor((s) => s.future.length > 0);
    const showProps = useEditor((s) => s.showProps);
    const dirty = useEditor((s) => s.dirty);

    const [started, setStarted] = useState(false);
    const [designs, setDesigns] = useState<SavedDesign[]>([]);
    const [draft, setDraft] = useState<{ doc: EditorDoc; at: number } | null>(null);
    const [fitSignal, setFitSignal] = useState(0);
    const [dialog, setDialog] = useState<"export" | "format" | "cart" | "save" | null>(null);
    const [mobileProps, setMobileProps] = useState(false);
    const [toast, setToast] = useState<string | null>(null);
    const savedIdRef = useRef<string | null>(null);

    const product = useMemo(() => products.find((p) => p.id === doc?.productId), [products, doc?.productId]);
    const size = useMemo(() => product?.sizes.find((s) => s.key === doc?.sizeKey) ?? null, [product, doc?.sizeKey]);

    const flash = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3200);
    };

    // ---------- fonturi ----------
    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = googleFontsCssUrl();
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);
        let t: ReturnType<typeof setTimeout> | null = null;
        const onLoaded = () => {
            if (t) clearTimeout(t);
            t = setTimeout(() => {
                invalidateTextMetrics();
                const st = useEditor.getState();
                if (st.doc) st.update((d) => ({ ...d, elements: d.elements.map(normalizeEl) }), { history: false });
                st.bumpFonts();
            }, 60);
        };
        document.fonts?.addEventListener("loadingdone", onLoaded);
        return () => {
            document.fonts?.removeEventListener("loadingdone", onLoaded);
            link.remove();
        };
    }, []);

    // fonturile documentului: cere-le explicit (altfel se descarcă abia la primul desen)
    const fontKey = doc ? [...new Set(doc.elements.filter((e) => e.type === "text").map((e) => `${(e as { fontFamily: string }).fontFamily}|${(e as { fontWeight: number }).fontWeight}|${(e as { italic?: boolean }).italic ? 1 : 0}`))].join(",") : "";
    useEffect(() => {
        if (!fontKey || !document.fonts) return;
        for (const k of fontKey.split(",")) {
            const [fam, w, it] = k.split("|");
            document.fonts.load(`${it === "1" ? "italic " : ""}${w} 40px "${fam}"`, "AăÂîȘțĂ").catch(() => undefined);
        }
    }, [fontKey]);

    // ---------- pornire ----------
    const startDoc = useCallback(async (d: EditorDoc) => {
        await loadAssetsForDoc(d);
        invalidateTextMetrics();
        useEditor.getState().setDoc({ ...d, elements: d.elements.map(normalizeEl) }, { resetHistory: true });
        setStarted(true);
        setFitSignal((n) => n + 1);
    }, []);

    useEffect(() => {
        const dr = loadDraft();
        setDraft(dr);
        listDesigns().then(setDesigns);
        const pid = params.get("product");
        const alias: Record<string, string> = { flyers: "flayere", flyere: "flayere", forex: "pvc-forex", acrylic: "plexiglass" };
        const p = products.find((x) => x.id === (alias[pid ?? ""] ?? pid));
        if (p) {
            const sizeParam = params.get("size");
            const w = Math.round(Number(params.get("w")) * 10) / 10;
            const h = Math.round(Number(params.get("h")) * 10) / 10;
            let s = p.sizes.find((x) => x.key === sizeParam) ?? null;
            if (!s && w > 0 && h > 0) s = p.sizes.find((x) => Math.abs(x.wMm - w * 10) < 1 && Math.abs(x.hMm - h * 10) < 1) ?? (p.id === "rollup" ? p.sizes.find((x) => x.wMm === w * 10) ?? null : null);
            const wMm = s ? s.wMm : w > 0 && h > 0 && p.custom ? w * 10 : p.sizes[0]?.wMm;
            const hMm = s ? s.hMm : w > 0 && h > 0 && p.custom ? h * 10 : p.sizes[0]?.hMm;
            if (wMm && hMm) {
                const d = newDoc(p, s ?? (w > 0 && h > 0 && p.custom ? null : p.sizes[0]), wMm, hMm);
                const t = templateById(params.get("template") ?? "");
                startDoc(d).then(() => t && applyTemplate(t));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ---------- salvare automată ----------
    useEffect(() => {
        if (!started) return;
        let t: ReturnType<typeof setTimeout> | null = null;
        const unsub = useEditor.subscribe((s, prev) => {
            if (s.doc && s.doc !== prev.doc) {
                if (t) clearTimeout(t);
                t = setTimeout(() => saveDraft(s.doc!), 700);
            }
        });
        const warn = (e: BeforeUnloadEvent) => {
            if (useEditor.getState().dirty && useEditor.getState().doc?.elements.length) {
                saveDraft(useEditor.getState().doc!);
            }
            void e;
        };
        window.addEventListener("beforeunload", warn);
        return () => {
            unsub();
            window.removeEventListener("beforeunload", warn);
        };
    }, [started]);

    // ---------- scurtături ----------
    useEffect(() => {
        if (!started) return;
        const onKey = (e: KeyboardEvent) => {
            const st = useEditor.getState();
            if (isTyping(e) || st.editingTextId) return;
            if (dialog) return;
            const mod = e.ctrlKey || e.metaKey;
            const k = e.key.toLowerCase();
            if (mod && k === "z" && !e.shiftKey) { e.preventDefault(); st.undo(); return; }
            if (mod && (k === "y" || (k === "z" && e.shiftKey))) { e.preventDefault(); st.redo(); return; }
            if (mod && k === "c") { st.copy(); return; }
            if (mod && k === "x") { st.copy(true); return; }
            if (mod && k === "d") { e.preventDefault(); st.duplicate(); return; }
            if (mod && k === "a") { e.preventDefault(); selectAll(); return; }
            if (mod && k === "g") { e.preventDefault(); if (e.shiftKey) st.ungroup(); else st.group(); return; }
            if (mod && k === "s") { e.preventDefault(); setDialog("save"); return; }
            if (mod && (k === "b" || k === "i" || k === "u")) {
                const t = st.doc?.elements.filter((x) => st.selection.includes(x.id) && x.type === "text") as TextEl[] | undefined;
                if (t?.length) {
                    e.preventDefault();
                    const f = t[0];
                    const patch = k === "b" ? { fontWeight: nearestWeight(fontByFamily(f.fontFamily), f.fontWeight >= 600 ? 400 : 700) } : k === "i" ? { italic: !f.italic } : { underline: !f.underline };
                    st.updateEls(t.map((x) => x.id), patch as Partial<El>);
                }
                return;
            }
            if (mod && (k === "=" || k === "+")) { e.preventDefault(); st.requestZoom(1.2); return; }
            if (mod && k === "-") { e.preventDefault(); st.requestZoom(1 / 1.2); return; }
            if (mod && k === "0") { e.preventDefault(); setFitSignal((n) => n + 1); return; }
            if (mod && e.key === "]") { e.preventDefault(); st.reorder(e.shiftKey ? "top" : "up"); return; }
            if (mod && e.key === "[") { e.preventDefault(); st.reorder(e.shiftKey ? "bottom" : "down"); return; }
            if (e.key === "Delete" || e.key === "Backspace") { if (st.selection.length) { e.preventDefault(); st.removeSelected(); } return; }
            if (e.key === "Escape") { st.select([]); return; }
            if (e.key === "Enter" && st.selection.length === 1) {
                const el = st.doc?.elements.find((x) => x.id === st.selection[0]);
                if (el?.type === "text") { e.preventDefault(); st.setEditingText(el.id); }
                return;
            }
            if (e.key.startsWith("Arrow") && st.selection.length) {
                e.preventDefault();
                const step = e.shiftKey ? 10 : 1;
                nudge(e.key === "ArrowLeft" ? -step : e.key === "ArrowRight" ? step : 0, e.key === "ArrowUp" ? -step : e.key === "ArrowDown" ? step : 0);
                return;
            }
            if (!mod && k === "t") { setPanel("text"); return; }
        };
        const onPaste = async (e: ClipboardEvent) => {
            if (isTyping(e) || useEditor.getState().editingTextId) return;
            const file = Array.from(e.clipboardData?.files ?? []).find((f) => f.type.startsWith("image/"));
            if (file) {
                e.preventDefault();
                try {
                    const rec = await addAssetFromFile(file);
                    insertImage(`asset:${rec.id}`, rec.w, rec.h);
                    window.dispatchEvent(new Event("pe-assets-changed"));
                } catch (err) {
                    alert(err instanceof Error ? err.message : "Nu am putut lipi imaginea.");
                }
                return;
            }
            useEditor.getState().paste();
        };
        window.addEventListener("keydown", onKey);
        window.addEventListener("paste", onPaste);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("paste", onPaste);
        };
    }, [started, dialog, setPanel]);

    // pe mobil: la selecție apare bara contextuală (deasupra uneltelor); foaia cu panoul se închide
    useEffect(() => {
        if (isMobile && selection.length && panel !== "efecte" && panel !== "incarcari") setPanel(null);
        if (!selection.length) setMobileProps(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile, selection.length]);

    const onPickFormat = (c: FormatChoice) => {
        if (!started || !doc) {
            clearDraft();
            startDoc(newDoc(c.product, c.size, c.wMm, c.hMm));
            setPanel("sabloane");
            return;
        }
        changeFormat({ productId: c.product.id, sizeKey: c.size?.key, wMm: c.wMm, hMm: c.hMm, bleedMm: c.product.bleedMm, safeMm: Math.min(c.product.safeMm, Math.min(c.wMm, c.hMm) * 0.12) });
        setDialog(null);
        setFitSignal((n) => n + 1);
    };

    const openDesign = (d: SavedDesign) => {
        savedIdRef.current = d.id;
        startDoc(d.doc);
    };

    if (!started || !doc) {
        return (
            <StartScreen
                products={products}
                onPick={onPickFormat}
                draft={draft ? { label: `${products.find((p) => p.id === draft.doc.productId)?.label ?? "Design"} ${sizeLabel(draft.doc.wMm, draft.doc.hMm)}`, at: draft.at } : null}
                onResume={() => draft && startDoc(draft.doc)}
                designs={designs}
                onOpenDesign={openDesign}
            />
        );
    }

    const panelBody = (
        <>
            {panel === "sabloane" && <TemplatesPanel />}
            {panel === "text" && <TextPanel />}
            {panel === "elemente" && <ElementsPanel />}
            {panel === "imagini" && <ImagesPanel />}
            {panel === "incarcari" && <UploadsPanel onOpenDesign={openDesign} />}
            {panel === "fundal" && <BackgroundPanel />}
            {panel === "straturi" && <LayersPanel />}
            {panel === "efecte" && <EffectsPanel />}
        </>
    );

    const st = useEditor.getState();
    const zoomPct = Math.round((zoom / (96 / 25.4)) * 100);
    const ProductIcon = PRODUCT_ICONS[product?.icon ?? ""] ?? LayoutTemplate;
    return (
        <div className="pe-root fixed inset-0 z-[60] flex flex-col bg-[var(--pe-canvas)]">
            {/* ---------- bara de sus ---------- */}
            <header className="relative z-30 flex h-[60px] shrink-0 items-center gap-1.5 border-b border-[var(--pe-border)] bg-[var(--pe-surface)] px-2 sm:gap-2 sm:px-3">
                <a href={brand.href} className="hidden shrink-0 items-center gap-2 rounded-[var(--pe-radius-sm)] px-1.5 py-1 hover:bg-[var(--pe-hover)] sm:flex" title={`Înapoi pe ${brand.name}`}>
                    <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[var(--pe-brand)] text-[15px] font-extrabold text-[var(--pe-on-brand)] shadow-[var(--pe-shadow-sm)]">{brand.name.slice(0, 1)}</span>
                    <span className="hidden text-[15px] font-bold tracking-tight text-[var(--pe-text)] lg:block">{brand.name}</span>
                </a>
                <span className="mx-0.5 hidden h-6 w-px bg-[var(--pe-border)] sm:block" />
                <button type="button" onClick={() => setDialog("format")} className="pe-chip min-w-0 shrink text-left" title="Schimbă produsul sau dimensiunea">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--pe-brand-soft)] text-[var(--pe-brand)]">
                        <ProductIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="min-w-0">
                        <span className="block truncate text-[12.5px] font-bold leading-tight text-[var(--pe-text)]">{product?.label ?? "Design"}</span>
                        <span className="block truncate text-[11px] leading-tight text-[var(--pe-muted)]">{sizeLabel(doc.wMm, doc.hMm)}</span>
                    </span>
                    <ChevronDown className="hidden h-3.5 w-3.5 shrink-0 text-[var(--pe-subtle)] sm:block" />
                </button>
                <div className="ml-1 flex items-center">
                    <IconBtn title="Anulează (Ctrl+Z)" disabled={!canUndo} onClick={() => st.undo()}>
                        <Undo2 className="h-[18px] w-[18px]" />
                    </IconBtn>
                    <IconBtn title="Refă (Ctrl+Y)" disabled={!canRedo} onClick={() => st.redo()}>
                        <Redo2 className="h-[18px] w-[18px]" />
                    </IconBtn>
                </div>
                <div className="flex-1" />
                <span className="mr-1 hidden items-center gap-1.5 text-[12px] text-[var(--pe-subtle)] xl:flex" title="Designul se salvează automat în acest browser">
                    <Cloud className="h-4 w-4" /> {dirty ? "Se salvează automat" : "Salvat"}
                </span>
                {!isMobile && (
                    <button type="button" onClick={() => setDialog("save")} className="pe-btn pe-btn-ghost px-2.5 lg:px-3" title="Salvează designul (Ctrl+S)">
                        <Save className="h-4 w-4" /> <span className="hidden lg:inline">Salvează</span>
                    </button>
                )}
                <button type="button" onClick={() => setDialog("export")} className={cx("pe-btn pe-btn-secondary", isMobile ? "w-10 px-0" : "px-3")} title="Descarcă fișierul de tipar">
                    <Download className="h-4 w-4" /> {!isMobile && <span className="hidden sm:inline">Descarcă</span>}
                </button>
                <button type="button" onClick={() => setDialog("cart")} className="pe-btn pe-btn-primary px-3.5 sm:px-4" title="Trimite designul în configurator și comandă">
                    <ShoppingCart className="h-4 w-4" /> <span className="hidden sm:inline">Adaugă în coș</span>
                    <span className="sm:hidden">Comandă</span>
                </button>
            </header>

            <div className="relative flex min-h-0 flex-1">
                {/* ---------- bara din stânga (desktop) ---------- */}
                {!isMobile && (
                    <nav className="relative z-20 flex w-[80px] shrink-0 flex-col items-stretch gap-1 border-r border-[var(--pe-border)] bg-[var(--pe-surface)] py-3" aria-label="Unelte">
                        {RAIL.map((r) => {
                            const on = panel === r.id;
                            return (
                                <button key={r.id} type="button" onClick={() => setPanel(on ? null : r.id)} aria-pressed={on} className="group relative mx-2 flex flex-col items-center gap-1 rounded-[var(--pe-radius)] py-1.5 text-[10.5px] font-semibold">
                                    {on && <span className="absolute -left-2 top-2 h-8 w-[3px] rounded-r-full bg-[var(--pe-brand)]" />}
                                    <span className={cx("flex h-10 w-10 items-center justify-center rounded-[var(--pe-radius)] transition", on ? "bg-[var(--pe-brand)] text-[var(--pe-on-brand)] shadow-[var(--pe-shadow)]" : "text-[var(--pe-text-2)] group-hover:bg-[var(--pe-hover)] group-hover:text-[var(--pe-text)]")}>
                                        <r.icon className="h-[20px] w-[20px]" />
                                    </span>
                                    <span className={on ? "text-[var(--pe-brand)]" : "text-[var(--pe-muted)] group-hover:text-[var(--pe-text)]"}>{r.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                )}
                {!isMobile && panel && (
                    <aside key={panel} className="pe-scroll pe-anim-panel relative z-10 w-[328px] shrink-0 overflow-y-auto border-r border-[var(--pe-border)] bg-[var(--pe-surface)] shadow-[8px_0_24px_-18px_rgba(22,34,29,.25)]">
                        <button type="button" onClick={() => setPanel(null)} className="pe-icon-btn absolute right-2 top-3 z-10" title="Închide panoul">
                            <ChevronsLeft className="h-4 w-4" />
                        </button>
                        {panelBody}
                    </aside>
                )}

                {/* ---------- planșa + bara contextuală ---------- */}
                <div className="flex min-w-0 flex-1 flex-col">
                    {!isMobile && <ContextBar product={product} onOpenFormat={() => setDialog("format")} isMobile={false} />}
                    <main className="relative min-h-0 min-w-0 flex-1">
                        <Stage isMobile={isMobile} fitSignal={fitSignal} />
                        {/* zoom + previzualizare */}
                        <div className="pe-glass absolute bottom-3 right-3 z-30 flex items-center gap-0.5 rounded-full border border-[var(--pe-border)] p-1 shadow-[var(--pe-shadow)]">
                            {!isMobile && (
                                <>
                                    <IconBtn title="Micșorează (Ctrl −)" onClick={() => st.requestZoom(1 / 1.25)} className="!h-8 !min-w-8 !rounded-full">
                                        <Minus className="h-4 w-4" />
                                    </IconBtn>
                                    <button type="button" title="Potrivește în ecran (Ctrl+0)" onClick={() => setFitSignal((n) => n + 1)} className="h-8 min-w-[52px] rounded-full px-1 text-[12px] font-bold tabular-nums text-[var(--pe-text-2)] hover:bg-[var(--pe-hover)]">
                                        {zoomPct}%
                                    </button>
                                    <IconBtn title="Mărește (Ctrl +)" onClick={() => st.requestZoom(1.25)} className="!h-8 !min-w-8 !rounded-full">
                                        <Plus className="h-4 w-4" />
                                    </IconBtn>
                                    <span className="mx-0.5 h-5 w-px bg-[var(--pe-border)]" />
                                </>
                            )}
                            <IconBtn title="Potrivește în ecran" onClick={() => setFitSignal((n) => n + 1)} className="!h-8 !min-w-8 !rounded-full">
                                <Maximize className="h-4 w-4" />
                            </IconBtn>
                            <IconBtn title={preview ? "Înapoi la editare" : "Previzualizare (cum iese după tăiere)"} active={preview} onClick={() => { st.toggle("preview"); st.select([]); }} className="!h-8 !min-w-8 !rounded-full">
                                {preview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </IconBtn>
                        </div>
                    </main>
                </div>

                {/* ---------- setări avansate (desktop) ---------- */}
                {!isMobile && showProps && (
                    <aside className="pe-scroll pe-anim-fade relative z-10 w-[300px] shrink-0 overflow-y-auto border-l border-[var(--pe-border)] bg-[var(--pe-surface)]">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--pe-border)] bg-[var(--pe-surface)] px-4 py-3">
                            <span className="pe-panel-title !text-[15px]">{selection.length ? "Setări avansate" : "Document"}</span>
                            <button type="button" onClick={() => st.toggle("showProps")} className="pe-icon-btn" title="Ascunde">
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <Properties product={product} onChangeSize={() => setDialog("format")} />
                    </aside>
                )}

                {/* ---------- mobil: foi de jos ---------- */}
                {isMobile && (panel || mobileProps) && (
                    <div className="pe-scroll pe-anim-sheet absolute inset-x-0 bottom-0 z-[70] max-h-[58%] overflow-y-auto rounded-t-[20px] border-t border-[var(--pe-border)] bg-[var(--pe-surface)] shadow-[0_-16px_40px_rgba(22,34,29,.18)]">
                        <div className="sticky top-0 z-10 flex items-center justify-center bg-[var(--pe-surface)] pb-1 pt-2">
                            <span className="h-1 w-10 rounded-full bg-[var(--pe-border-strong)]" />
                            <button type="button" onClick={() => { setPanel(null); setMobileProps(false); }} className="pe-icon-btn absolute right-2 top-1" title="Închide">
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        {mobileProps && !panel ? <Properties product={product} onChangeSize={() => setDialog("format")} /> : panelBody}
                    </div>
                )}
            </div>

            {isMobile && <ContextBar product={product} onOpenFormat={() => setDialog("format")} isMobile />}
            {isMobile && (
                <nav className="pe-glass flex h-[64px] shrink-0 items-stretch border-t border-[var(--pe-border)] px-1 pb-[env(safe-area-inset-bottom)]" aria-label="Unelte">
                    {RAIL.filter((r) => r.id !== "straturi").map((r) => {
                        const on = panel === r.id;
                        return (
                            <button key={r.id} type="button" onClick={() => { setMobileProps(false); setPanel(on ? null : r.id); }} aria-pressed={on} className="flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-semibold">
                                <span className={cx("flex h-8 w-11 items-center justify-center rounded-full transition", on ? "bg-[var(--pe-brand-soft)] text-[var(--pe-brand)]" : "text-[var(--pe-text-2)]")}>
                                    <r.icon className="h-5 w-5" />
                                </span>
                                <span className={on ? "text-[var(--pe-brand)]" : "text-[var(--pe-muted)]"}>{r.label}</span>
                            </button>
                        );
                    })}
                    <button type="button" onClick={() => { setPanel(null); setMobileProps((v) => !v); }} aria-pressed={mobileProps} className="flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-semibold">
                        <span className={cx("flex h-8 w-11 items-center justify-center rounded-full transition", mobileProps ? "bg-[var(--pe-brand-soft)] text-[var(--pe-brand)]" : "text-[var(--pe-text-2)]")}>
                            <SlidersHorizontal className="h-5 w-5" />
                        </span>
                        <span className={mobileProps ? "text-[var(--pe-brand)]" : "text-[var(--pe-muted)]"}>Setări</span>
                    </button>
                </nav>
            )}

            {dialog === "format" && (
                <Modal title="Produs și dimensiune" onClose={() => setDialog(null)} wide>
                    <p className="mb-4 text-[13px] text-[var(--pe-muted)]">Elementele se adaptează automat la noul format (le poți ajusta după).</p>
                    <FormatPicker products={products} initial={{ productId: doc.productId, sizeKey: doc.sizeKey, wMm: doc.wMm, hMm: doc.hMm }} onPick={onPickFormat} submitLabel="Aplică" />
                </Modal>
            )}
            {dialog === "export" && <ExportDialog doc={doc} product={product} onClose={() => setDialog(null)} />}
            {dialog === "cart" && (
                <CartDialog
                    doc={doc}
                    product={product}
                    onClose={() => setDialog(null)}
                    onDone={(url) => {
                        saveDraft(doc);
                        if (product) router.push(configuratorHref(product, size, doc.wMm, doc.hMm, url));
                    }}
                />
            )}
            {dialog === "save" && (
                <SaveDialog
                    doc={doc}
                    defaultName={`${product?.label ?? "Design"} ${sizeLabel(doc.wMm, doc.hMm)}`}
                    savedId={savedIdRef.current}
                    onClose={() => setDialog(null)}
                    onSaved={(id) => {
                        savedIdRef.current = id;
                        useEditor.getState().markSaved();
                        listDesigns().then(setDesigns);
                        setDialog(null);
                        flash("Design salvat în acest browser (Încărcări → Designurile mele).");
                    }}
                />
            )}
            {toast && <div className="pe-anim-sheet fixed bottom-24 left-1/2 z-[5000] -translate-x-1/2 rounded-full bg-[var(--pe-text)] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[var(--pe-shadow-lg)]">{toast}</div>}
        </div>
    );
}

// ---------------- Dialoguri ----------------
function Issues({ doc }: { doc: EditorDoc }) {
    const issues = preflight(doc);
    if (!issues.length) return <p className="rounded-lg bg-[var(--pe-ok-soft)] px-3 py-2 text-[12px] font-semibold text-[var(--pe-ok)]">Verificare print: totul arată bine.</p>;
    return (
        <ul className="space-y-1">
            {issues.map((i, k) => (
                <li key={k} className={cx("rounded-lg px-3 py-1.5 text-[12px]", i.level === "error" ? "bg-[var(--pe-danger-soft)] text-[var(--pe-danger)]" : "bg-[var(--pe-warn-soft)] text-[var(--pe-warn)]")}>
                    {i.text}
                </li>
            ))}
        </ul>
    );
}

function fileBase(doc: EditorDoc, product?: EditorProduct) {
    return `${EDITOR_BRAND.filePrefix}-${product?.id ?? "design"}-${Math.round(doc.wMm / 10)}x${Math.round(doc.hMm / 10)}cm`;
}

function ExportDialog({ doc, product, onClose }: { doc: EditorDoc; product?: EditorProduct; onClose: () => void }) {
    const maxDpi = pickDpi(doc, maxPixels("download"), 300);
    const options = [300, 240, 200, 150, 120, 100, 72].filter((d) => d <= maxDpi);
    if (!options.includes(maxDpi)) options.unshift(maxDpi);
    const [fmt, setFmt] = useState<"pdf" | "png" | "jpg">("pdf");
    const [dpi, setDpi] = useState(maxDpi);
    const [bleed, setBleed] = useState(true);
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const withBleed = fmt === "pdf" || bleed;
    const wPx = Math.round(((doc.wMm + (withBleed ? 2 * doc.bleedMm : 0)) / 25.4) * dpi);
    const hPx = Math.round(((doc.hMm + (withBleed ? 2 * doc.bleedMm : 0)) / 25.4) * dpi);
    const run = async () => {
        setBusy(true);
        setErr(null);
        try {
            const base = fileBase(doc, product);
            if (fmt === "pdf") downloadBlob(await exportPdf(doc, dpi, `${product?.label ?? "Design"} ${sizeLabel(doc.wMm, doc.hMm)}`), `${base}.pdf`);
            if (fmt === "png") downloadBlob(await exportPng(doc, dpi, bleed), `${base}-${dpi}dpi.png`);
            if (fmt === "jpg") downloadBlob(await exportJpeg(doc, dpi, bleed), `${base}-${dpi}dpi.jpg`);
            onClose();
        } catch (e) {
            setErr(e instanceof Error ? e.message : "Exportul a eșuat.");
        } finally {
            setBusy(false);
        }
    };
    return (
        <Modal title="Descarcă fișierul" onClose={onClose}>
            <div className="grid grid-cols-3 gap-2">
                {([
                    ["pdf", "PDF de tipar", "mărime reală + bleed"],
                    ["png", "PNG", "calitate maximă"],
                    ["jpg", "JPG", "fișier mai mic"],
                ] as const).map(([id, label, sub]) => (
                    <button key={id} type="button" onClick={() => setFmt(id)} className={cx("rounded-xl border px-3 py-2.5 text-left", fmt === id ? "border-[var(--pe-brand)] bg-[var(--pe-brand-soft)]" : "border-[var(--pe-border)] bg-[var(--pe-surface)]")}>
                        <div className="text-[14px] font-bold">{label}</div>
                        <div className="text-[11px] text-[var(--pe-muted)]">{sub}</div>
                    </button>
                ))}
            </div>
            <div className="mt-4">
                <div className="mb-1 text-[12px] font-semibold text-[var(--pe-text-2)]">Rezoluție</div>
                <div className="flex flex-wrap gap-1.5">
                    {options.map((d) => (
                        <button key={d} type="button" onClick={() => setDpi(d)} className={cx("rounded-full border px-3 py-1 text-[12px] font-semibold", dpi === d ? "border-[var(--pe-brand)] bg-[var(--pe-brand)] text-[var(--pe-on-brand)]" : "border-[var(--pe-border)] bg-[var(--pe-surface)]")}>
                            {d} DPI
                        </button>
                    ))}
                </div>
                <p className="mt-1.5 text-[12px] text-[var(--pe-muted)]">
                    {wPx.toLocaleString("ro-RO")} × {hPx.toLocaleString("ro-RO")} px · {sizeLabel(doc.wMm + (withBleed ? 2 * doc.bleedMm : 0), doc.hMm + (withBleed ? 2 * doc.bleedMm : 0))}
                    {maxDpi < 150 && " · formatul e mare, așa că DPI-ul e limitat de memoria browserului (suficient pentru vizionare de la distanță)."}
                </p>
            </div>
            {fmt !== "pdf" && doc.bleedMm > 0 && (
                <div className="mt-2">
                    <Toggle label={`Include bleed (${doc.bleedMm} mm)`} checked={bleed} onChange={setBleed} />
                </div>
            )}
            {fmt === "pdf" && <p className="mt-3 text-[12px] leading-snug text-[var(--pe-muted)]">PDF-ul are mărimea fizică exactă{doc.bleedMm ? `, bleed ${doc.bleedMm} mm și TrimBox` : ""}; textul e încorporat ca imagine la rezoluția aleasă, deci arată identic oriunde.</p>}
            <div className="mt-4">
                <Issues doc={doc} />
            </div>
            {err && <p className="mt-3 text-[13px] text-[var(--pe-danger)]">{err}</p>}
            <button type="button" disabled={busy} onClick={run} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--pe-brand)] px-5 py-3 text-[15px] font-bold text-white disabled:opacity-60">
                <Download className="h-4 w-4" />
                {busy ? "Se generează fișierul…" : `Descarcă ${fmt.toUpperCase()}`}
            </button>
        </Modal>
    );
}

function CartDialog({ doc, product, onClose, onDone }: { doc: EditorDoc; product?: EditorProduct; onClose: () => void; onDone: (url: string) => void }) {
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const issues = preflight(doc);
    const dpi = pickDpi(doc, maxPixels("upload"), 300);
    const run = async () => {
        setBusy(true);
        setErr(null);
        try {
            const r = await renderDoc(doc, dpi, { includeBleed: true });
            const blob: Blob = await new Promise((resolve, reject) => r.canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Exportul a eșuat."))), "image/jpeg", 0.92));
            const bytes = await jpegWithDpi(blob, dpi);
            r.canvas.width = 1;
            const fd = new FormData();
            fd.append("file", new Blob([bytes as BlobPart], { type: "image/jpeg" }), `${fileBase(doc, product)}-${dpi}dpi.jpg`);
            fd.append("type", "editor_design");
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || !data?.url) throw new Error(typeof data?.error === "string" ? data.error : "Încărcarea fișierului a eșuat.");
            onDone(data.url as string);
        } catch (e) {
            setErr(e instanceof Error ? e.message : "Eroare");
            setBusy(false);
        }
    };
    return (
        <Modal title="Trimite designul în comandă" onClose={onClose}>
            <p className="text-[14px] leading-relaxed text-[var(--pe-text-2)]">
                Îți deschidem configuratorul <b>{product?.label}</b> cu dimensiunea <b>{sizeLabel(doc.wMm, doc.hMm)}</b> și cu designul atașat. Acolo alegi cantitatea și finisajele, vezi prețul și adaugi în coș.
            </p>
            <p className="mt-2 text-[12px] text-[var(--pe-muted)]">Fișierul trimis: JPG {dpi} DPI{doc.bleedMm ? `, cu bleed ${doc.bleedMm} mm` : ""}. Designul rămâne salvat în editor.</p>
            <div className="mt-4">
                <Issues doc={doc} />
            </div>
            {err && <p className="mt-3 text-[13px] text-[var(--pe-danger)]">{err}</p>}
            <button type="button" disabled={busy || !product} onClick={run} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--pe-brand)] px-5 py-3 text-[15px] font-bold text-white disabled:opacity-60">
                <ShoppingCart className="h-4 w-4" />
                {busy ? "Se pregătește fișierul…" : issues.some((i) => i.level === "error") ? "Continuă oricum" : "Continuă spre configurator"}
            </button>
        </Modal>
    );
}

function SaveDialog({ doc, defaultName, savedId, onClose, onSaved }: { doc: EditorDoc; defaultName: string; savedId: string | null; onClose: () => void; onSaved: (id: string) => void }) {
    const [name, setName] = useState(doc.name ?? defaultName);
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const save = async (asNew: boolean) => {
        setBusy(true);
        setErr(null);
        try {
            const thumb = await exportThumb(doc);
            const id = !asNew && savedId ? savedId : `d${Date.now().toString(36)}`;
            const named = { ...doc, name };
            useEditor.getState().update((d) => ({ ...d, name }), { history: false });
            await saveDesign({ id, name, doc: named, thumb, savedAt: Date.now() });
            onSaved(id);
        } catch (e) {
            setErr(e instanceof Error ? e.message : "Nu am putut salva.");
            setBusy(false);
        }
    };
    return (
        <Modal title="Salvează designul" onClose={onClose}>
            <label className="block text-[12px] font-semibold text-[var(--pe-text-2)]">
                Nume
                <input autoFocus value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block h-10 w-full rounded-lg border border-[var(--pe-border)] bg-[var(--pe-surface)] px-3 text-[14px]" />
            </label>
            <p className="mt-2 text-[12px] leading-snug text-[var(--pe-muted)]">Designul se păstrează în acest browser, împreună cu pozele încărcate. Îl găsești în „Încărcări → Designurile mele” sau la pornirea editorului.</p>
            {err && <p className="mt-2 text-[13px] text-[var(--pe-danger)]">{err}</p>}
            <div className="mt-4 flex gap-2">
                <button type="button" disabled={busy || !name.trim()} onClick={() => save(false)} className="flex-1 rounded-full bg-[var(--pe-brand)] px-4 py-2.5 text-[14px] font-bold text-white disabled:opacity-60">
                    {busy ? "Se salvează…" : "Salvează"}
                </button>
                {savedId && (
                    <button type="button" disabled={busy} onClick={() => save(true)} className="rounded-full border border-[var(--pe-border)] bg-[var(--pe-surface)] px-4 py-2.5 text-[14px] font-semibold">
                        Salvează ca nou
                    </button>
                )}
            </div>
        </Modal>
    );
}
