"use client";
// Panourile din stânga: Șabloane, Text, Elemente, Imagini, Încărcări, Fundal, Straturi.
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Eye, EyeOff, GripVertical, Image as ImageIcon, Lock, Search, Shapes, Trash2, Type, Unlock, Upload } from "lucide-react";
import { ELEMENT_LIBRARY, docSvg, esc } from "@/lib/editor/render";
import { instantiate, templatesFor, type Template } from "@/lib/editor/templates";
import { TEXT_PRESETS, placePreset } from "@/lib/editor/textPresets";
import type { Background, EditorDoc, El, PatternKind } from "@/lib/editor/types";
import { addAssetFromFile, deleteAsset, deleteDesign, listAssets, listDesigns, resolveSrc, type AssetRecord, type SavedDesign } from "./assets";
import { applyTemplate, insertEls, insertImage, insertShape, insertSvg, insertText, setBackground } from "./actions";
import { useEditor } from "./store";
import { ColorInput, Section, Slider, cx, paintCss } from "./ui";

const DRAG_TYPE = "application/x-shopprint-editor";

function PanelTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
    return (
        <div className="px-4 pb-3 pt-4">
            <h2 className="pe-panel-title">{children}</h2>
            {sub && <p className="mt-1 pr-6 text-[12px] leading-snug text-[var(--pe-muted)]">{sub}</p>}
        </div>
    );
}

// ---------------- Șabloane ----------------
function TemplateThumb({ t, doc }: { t: Template; doc: EditorDoc }) {
    const html = useMemo(() => {
        const { background, elements } = instantiate(t, doc);
        const preview: EditorDoc = { ...doc, bleedMm: 0, background, elements };
        return docSvg(preview, { resolveSrc, idPrefix: `t${t.id}` }, { widthPx: 300, heightPx: Math.round((300 * doc.hMm) / doc.wMm) });
    }, [t, doc.wMm, doc.hMm, doc.productId, doc.safeMm, doc.bleedMm]); // eslint-disable-line react-hooks/exhaustive-deps
    return <div className="pe-thumb w-full overflow-hidden rounded-[calc(var(--pe-radius)*0.75)] bg-[var(--pe-surface)]" style={{ aspectRatio: `${doc.wMm} / ${doc.hMm}` }} dangerouslySetInnerHTML={{ __html: html }} />;
}

function TemplateGrid({ list, doc, narrow, onApply }: { list: Template[]; doc: EditorDoc; narrow: boolean; onApply: (t: Template) => void }) {
    return (
        <div className={cx("grid gap-3 px-4", narrow ? "grid-cols-3" : "grid-cols-2")}>
            {list.map((t) => (
                <button key={t.id} type="button" onClick={() => onApply(t)} className="pe-card group text-left" title={`Șablon: ${t.name}`}>
                    <div className="pe-card-media relative">
                        <TemplateThumb t={t} doc={doc} />
                        {t.side === "verso" && <span className="absolute left-1.5 top-1.5 rounded-full bg-[var(--pe-text)]/80 px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wide text-white">Verso</span>}
                    </div>
                    <div className="mt-1.5 truncate px-0.5 text-[12px] font-semibold text-[var(--pe-text)]">{t.name}</div>
                </button>
            ))}
        </div>
    );
}

export function TemplatesPanel() {
    const doc = useEditor((s) => s.doc)!;
    const fontEpoch = useEditor((s) => s.fontEpoch);
    const [showOthers, setShowOthers] = useState(false);
    const { primary, others } = useMemo(() => templatesFor(doc.productId, doc.wMm, doc.hMm), [doc.productId, doc.wMm, doc.hMm]);
    const apply = (t: Template) => {
        if (doc.elements.length && !confirm("Înlocuiești designul curent cu acest șablon? (poți reveni cu Ctrl+Z)")) return;
        applyTemplate(t);
    };
    const narrow = doc.wMm / doc.hMm < 0.75;
    return (
        <div key={fontEpoch} className="pb-6">
            <PanelTitle sub={`Gândite pentru acest produs și adaptate la ${Math.round(doc.wMm / 10)}×${Math.round(doc.hMm / 10)} cm. Totul rămâne editabil.`}>Șabloane</PanelTitle>
            {primary.length > 0 && <TemplateGrid list={primary} doc={doc} narrow={narrow} onApply={apply} />}
            <div className="px-4 pt-5">
                <button type="button" onClick={() => setShowOthers((v) => !v)} aria-expanded={showOthers} className="flex w-full items-center justify-between rounded-[var(--pe-radius)] border border-[var(--pe-border)] bg-[var(--pe-surface-2)] px-3 py-2.5 text-left text-[13px] font-semibold text-[var(--pe-text)] transition hover:border-[var(--pe-brand)]">
                    <span>Alte șabloane <span className="font-normal text-[var(--pe-muted)]">({others.length}, generice)</span></span>
                    <ChevronDown className={cx("h-4 w-4 transition-transform", showOthers && "rotate-180")} />
                </button>
            </div>
            {(showOthers || primary.length === 0) && (
                <div className="pt-3">
                    <TemplateGrid list={others} doc={doc} narrow={narrow} onApply={apply} />
                </div>
            )}
        </div>
    );
}

// ---------------- Text ----------------
export function TextPanel() {
    const doc = useEditor((s) => s.doc)!;
    const short = Math.min(doc.wMm, doc.hMm);
    return (
        <div>
            <PanelTitle>Text</PanelTitle>
            <div className="space-y-2 px-4">
                <button type="button" className="w-full rounded-xl bg-[var(--pe-brand)] px-4 py-3 text-left text-[15px] font-bold text-white hover:bg-[var(--pe-brand-strong)]" onClick={() => insertText({ text: "Adaugă un titlu", fontSize: short / 7, fontWeight: 800 })}>
                    <Type className="mr-2 inline h-4 w-4" />
                    Adaugă un titlu
                </button>
                <button type="button" className="w-full rounded-xl border border-[var(--pe-border)] transition hover:-translate-y-0.5 hover:shadow-[var(--pe-shadow)] bg-[var(--pe-surface)] px-4 py-2.5 text-left text-[14px] font-semibold text-[var(--pe-text)] hover:border-[var(--pe-brand)]" onClick={() => insertText({ text: "Adaugă un subtitlu", fontSize: short / 13, fontWeight: 600 })}>
                    Adaugă un subtitlu
                </button>
                <button type="button" className="w-full rounded-xl border border-[var(--pe-border)] transition hover:-translate-y-0.5 hover:shadow-[var(--pe-shadow)] bg-[var(--pe-surface)] px-4 py-2 text-left text-[12px] text-[var(--pe-text)] hover:border-[var(--pe-brand)]" onClick={() => insertText({ text: "Adaugă un paragraf de text", fontSize: short / 24, fontWeight: 400, fontFamily: "Open Sans", lineHeight: 1.45 })}>
                    Adaugă un paragraf de text
                </button>
            </div>
            <div className="px-4 pb-2 pt-5 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--pe-muted)]">Stiluri gata făcute</div>
            <div className="grid grid-cols-2 gap-2 px-4 pb-6">
                {TEXT_PRESETS.filter((p) => !["titlu", "subtitlu", "corp"].includes(p.id)).map((p) => (
                    <button
                        key={p.id}
                        type="button"
                        title={p.label}
                        onClick={() => insertEls(placePreset(p, doc))}
                        className="flex h-[74px] items-center justify-center overflow-hidden rounded-xl border border-[var(--pe-border)] transition hover:-translate-y-0.5 hover:shadow-[var(--pe-shadow)] px-2 hover:border-[var(--pe-brand)] hover:shadow-sm"
                        style={{ background: p.preview.bg && p.id !== "angajam" && p.id !== "de-vanzare" && p.id !== "black" && p.id !== "procent" ? p.preview.bg : "#fffdf9" }}
                    >
                        <span
                            className="block max-w-full truncate"
                            style={{
                                fontFamily: `"${p.preview.family}"`,
                                fontWeight: p.preview.weight,
                                fontStyle: p.preview.italic ? "italic" : "normal",
                                color: p.preview.color,
                                fontSize: p.preview.text.length > 10 ? 16 : 22,
                                letterSpacing: p.preview.spacing ? `${p.preview.spacing / 1000}em` : undefined,
                                WebkitTextStroke: p.preview.stroke ? `1px ${p.preview.stroke}` : undefined,
                                background: p.id === "angajam" || p.id === "de-vanzare" || p.id === "black" || p.id === "procent" ? p.preview.bg : undefined,
                                padding: p.id === "angajam" || p.id === "de-vanzare" || p.id === "black" || p.id === "procent" ? "2px 8px" : undefined,
                                textShadow: p.id === "neon" ? "0 0 6px #00e5ff, 0 0 2px #00e5ff" : p.id === "umbra3d" ? "2px 2px 0 #14211c" : p.id === "retro" ? "2px 2px 0 #264653" : undefined,
                            }}
                        >
                            {p.preview.text}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}

// ---------------- Elemente ----------------
const NATIVE_SHAPES: Array<{ id: string; label: string; svg: string; make: () => void }> = [
    { id: "rect", label: "Dreptunghi", svg: '<rect x="8" y="14" width="84" height="72" fill="#075746"/>', make: () => insertShape("rect") },
    { id: "rrect", label: "Dreptunghi rotunjit", svg: '<rect x="8" y="14" width="84" height="72" rx="16" fill="#075746"/>', make: () => insertShape("rect", { radius: -1 }) },
    { id: "ellipse", label: "Cerc", svg: '<circle cx="50" cy="50" r="42" fill="#075746"/>', make: () => insertShape("ellipse") },
    { id: "triangle", label: "Triunghi", svg: '<polygon points="50,10 92,88 8,88" fill="#075746"/>', make: () => insertShape("triangle") },
    { id: "star", label: "Stea", svg: '<polygon points="50,6 61,38 95,38 67,58 78,92 50,71 22,92 33,58 5,38 39,38" fill="#075746"/>', make: () => insertShape("star", { points: 5 }) },
    { id: "burst", label: "Insignă", svg: '<polygon points="50,4 58,22 77,13 74,33 95,36 80,50 95,64 74,67 77,87 58,78 50,96 42,78 23,87 26,67 5,64 20,50 5,36 26,33 23,13 42,22" fill="#d62828"/>', make: () => insertShape("star", { points: 12, fill: { kind: "solid", color: "#d62828" } }) },
    { id: "hex", label: "Hexagon", svg: '<polygon points="50,6 88,28 88,72 50,94 12,72 12,28" fill="#075746"/>', make: () => insertShape("polygon", { points: 6 }) },
    { id: "frame", label: "Chenar", svg: '<rect x="10" y="16" width="80" height="68" fill="none" stroke="#075746" stroke-width="6"/>', make: () => insertShape("rect", { fill: null, stroke: { color: "#075746", width: -1 } }) },
    { id: "line", label: "Linie", svg: '<line x1="8" y1="50" x2="92" y2="50" stroke="#14211c" stroke-width="6"/>', make: () => insertShape("line") },
    { id: "dash", label: "Linie întreruptă", svg: '<line x1="8" y1="50" x2="92" y2="50" stroke="#14211c" stroke-width="6" stroke-dasharray="14 9"/>', make: () => insertShape("line", {}) },
    { id: "dot", label: "Linie punctată", svg: '<line x1="10" y1="50" x2="90" y2="50" stroke="#14211c" stroke-width="7" stroke-dasharray="0.1 14" stroke-linecap="round"/>', make: () => insertShape("line", {}) },
];

const GROUP_LABELS: Record<string, string> = { forme: "Forme desenate", sageti: "Săgeți", rame: "Rame", linii: "Linii", decor: "Decor", iconite: "Iconițe" };

function libPreview(id: string) {
    const lib = ELEMENT_LIBRARY.find((e) => e.id === id)!;
    const markup = lib.svg.split("{{c}}").join(lib.c === "#ffffff" ? "#14211c" : lib.c).split("{{c2}}").join(esc(lib.c2 ?? "#14211c")).split("{{sw}}").join("2");
    return `<svg viewBox="0 0 ${lib.vw} ${lib.vh}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">${markup}</svg>`;
}

export function ElementsPanel() {
    const [q, setQ] = useState("");
    const groups = useMemo(() => {
        const norm = (s: string) => s.toLocaleLowerCase("ro-RO").normalize("NFD").replace(/[̀-ͯ]/g, "");
        const nq = norm(q.trim());
        const map = new Map<string, typeof ELEMENT_LIBRARY>();
        for (const e of ELEMENT_LIBRARY) {
            if (nq && !norm(e.label).includes(nq) && !e.id.includes(nq)) continue;
            map.set(e.group, [...(map.get(e.group) ?? []), e]);
        }
        return ["forme", "sageti", "rame", "linii", "decor", "iconite"].filter((g) => map.has(g)).map((g) => ({ g, items: map.get(g)! }));
    }, [q]);
    const fixLine = (id: string) => {
        if (id === "dash") {
            insertShape("line");
            const st = useEditor.getState();
            st.updateEls(st.selection, (e) => (e.type === "shape" && e.stroke ? { ...e, stroke: { ...e.stroke, dash: "dash" } } : e), { history: false });
        } else if (id === "dot") {
            insertShape("line");
            const st = useEditor.getState();
            st.updateEls(st.selection, (e) => (e.type === "shape" && e.stroke ? { ...e, stroke: { ...e.stroke, dash: "dot" } } : e), { history: false });
        }
    };
    return (
        <div>
            <PanelTitle>Elemente</PanelTitle>
            <div className="px-4 pb-3">
                <label className="flex items-center gap-2 rounded-xl border border-[var(--pe-border)] transition hover:-translate-y-0.5 hover:shadow-[var(--pe-shadow)] bg-[var(--pe-surface)] px-3 py-2">
                    <Search className="h-4 w-4 text-[var(--pe-subtle)]" />
                    <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Caută: săgeată, telefon, stea…" className="w-full bg-transparent text-[13px] outline-none" />
                </label>
            </div>
            {!q && (
                <Section title="Forme">
                    <div className="grid grid-cols-4 gap-2">
                        {NATIVE_SHAPES.map((s) => (
                            <button key={s.id} type="button" title={s.label} onClick={() => (s.id === "dash" || s.id === "dot" ? fixLine(s.id) : s.make())} className="aspect-square rounded-lg border border-[var(--pe-border)] bg-[var(--pe-surface)] p-2 hover:border-[var(--pe-brand)]">
                                <svg viewBox="0 0 100 100" width="100%" height="100%" dangerouslySetInnerHTML={{ __html: s.svg }} />
                            </button>
                        ))}
                    </div>
                </Section>
            )}
            {groups.map(({ g, items }) => (
                <Section key={g} title={GROUP_LABELS[g] ?? g}>
                    <div className={cx("grid gap-2", g === "iconite" ? "grid-cols-5" : "grid-cols-4")}>
                        {items.map((e) => (
                            <button
                                key={e.id}
                                type="button"
                                title={e.label}
                                draggable
                                onDragStart={(ev) => ev.dataTransfer.setData(DRAG_TYPE, JSON.stringify({ kind: "svg", ref: e.id }))}
                                onClick={() => insertSvg(e.id)}
                                className="aspect-square rounded-lg border border-[var(--pe-border)] bg-[var(--pe-surface)] p-2 hover:border-[var(--pe-brand)]"
                                dangerouslySetInnerHTML={{ __html: libPreview(e.id) }}
                            />
                        ))}
                    </div>
                </Section>
            ))}
            <p className="px-4 pb-6 pt-2 text-[11px] leading-snug text-[var(--pe-subtle)]">Elemente desenate de noi; iconițele: Lucide (licență ISC). Le poți folosi liber în materialele tipărite.</p>
        </div>
    );
}

// ---------------- Imagini (Pixabay prin proxy) ----------------
type Hit = { id: string; url: string; preview: string; tags: string; width?: number; height?: number; author?: string; source?: string };
const SUGGESTIONS = ["afaceri", "mâncare", "cafea", "natură", "flori", "construcții", "mașini", "familie", "copii", "sport", "Crăciun", "texturi"];

function loadNatural(url: string): Promise<{ w: number; h: number }> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
        img.onerror = () => reject(new Error("Imaginea nu s-a putut încărca."));
        img.src = url;
    });
}

export function ImagesPanel() {
    const [q, setQ] = useState("");
    const [type, setType] = useState<"photo" | "illustration">("photo");
    const [hits, setHits] = useState<Hit[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [busyId, setBusyId] = useState<string | null>(null);
    const lastQ = useRef("");
    const search = useCallback(async (query: string, p = 1, t = type) => {
        if (!query.trim()) return;
        lastQ.current = query;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/pixabay?q=${encodeURIComponent(query)}&type=${t}&page=${p}`);
            const data = await res.json();
            if (data.error) setError(data.error);
            else {
                setHits((prev) => (p === 1 ? data.hits : [...prev, ...data.hits]));
                if (p === 1 && !data.hits.length) setError(`Nu am găsit imagini pentru „${query}”.`);
            }
            setPage(p);
        } catch {
            setError("Eroare la căutare. Încearcă din nou.");
        } finally {
            setLoading(false);
        }
    }, [type]);
    const use = async (h: Hit) => {
        setBusyId(h.id);
        try {
            const n = await loadNatural(h.url);
            insertImage(h.url, n.w, n.h, undefined, h.author ? `Pixabay / ${h.author}` : "Pixabay");
        } catch (e) {
            alert(e instanceof Error ? e.message : "Eroare");
        } finally {
            setBusyId(null);
        }
    };
    return (
        <div>
            <PanelTitle>Imagini</PanelTitle>
            <form
                className="px-4 pb-2"
                onSubmit={(e) => {
                    e.preventDefault();
                    search(q, 1);
                }}
            >
                <label className="flex items-center gap-2 rounded-xl border border-[var(--pe-border)] transition hover:-translate-y-0.5 hover:shadow-[var(--pe-shadow)] bg-[var(--pe-surface)] px-3 py-2">
                    <Search className="h-4 w-4 text-[var(--pe-subtle)]" />
                    <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Caută imagini gratuite…" className="w-full bg-transparent text-[13px] outline-none" />
                </label>
            </form>
            <div className="flex gap-1 px-4 pb-2">
                {(["photo", "illustration"] as const).map((t) => (
                    <button
                        key={t}
                        type="button"
                        onClick={() => {
                            setType(t);
                            if (lastQ.current) search(lastQ.current, 1, t);
                        }}
                        className={cx("rounded-full px-3 py-1 text-[12px] font-semibold", type === t ? "bg-[var(--pe-brand)] text-[var(--pe-on-brand)]" : "bg-[var(--pe-hover)] text-[var(--pe-text-2)]")}
                    >
                        {t === "photo" ? "Fotografii" : "Ilustrații"}
                    </button>
                ))}
            </div>
            {!hits.length && (
                <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                    {SUGGESTIONS.map((s) => (
                        <button
                            key={s}
                            type="button"
                            className="rounded-full border border-[var(--pe-border)] bg-[var(--pe-surface)] px-2.5 py-1 text-[12px] text-[var(--pe-text-2)] hover:border-[var(--pe-brand)]"
                            onClick={() => {
                                setQ(s);
                                search(s, 1);
                            }}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            )}
            {error && <p className="px-4 pb-2 text-[12px] text-[var(--pe-danger)]">{error}</p>}
            <div className="columns-2 gap-2 px-4">
                {hits.map((h) => (
                    <button
                        key={h.id}
                        type="button"
                        title={h.tags}
                        draggable
                        onDragStart={(ev) => ev.dataTransfer.setData(DRAG_TYPE, JSON.stringify({ kind: "image", src: h.url, iw: Math.min(h.width ?? 1280, 1280), ih: Math.round(((h.height ?? 853) * Math.min(h.width ?? 1280, 1280)) / (h.width ?? 1280)), credit: "Pixabay" }))}
                        onClick={() => use(h)}
                        className="relative mb-2 block w-full overflow-hidden rounded-lg bg-[var(--pe-hover)]"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={h.preview} alt={h.tags} loading="lazy" className="block w-full" />
                        {busyId === h.id && <span className="absolute inset-0 flex items-center justify-center bg-white/60 text-[12px] font-bold">Se adaugă…</span>}
                    </button>
                ))}
            </div>
            {hits.length > 0 && (
                <div className="px-4 pb-4 pt-1">
                    <button type="button" disabled={loading} onClick={() => search(lastQ.current, page + 1)} className="w-full rounded-lg border border-[var(--pe-border)] bg-[var(--pe-surface)] py-2 text-[13px] font-semibold">
                        {loading ? "Se încarcă…" : "Mai multe"}
                    </button>
                </div>
            )}
            {loading && !hits.length && <p className="px-4 text-[12px] text-[var(--pe-muted)]">Se caută…</p>}
            <p className="px-4 pb-6 pt-2 text-[11px] leading-snug text-[var(--pe-subtle)]">
                Imagini Pixabay (licență gratuită, fără atribuire obligatorie). Au cel mult 1280 px: pentru formate mari folosește pozele tale, la rezoluție mare.
            </p>
        </div>
    );
}

// ---------------- Încărcări + designuri salvate ----------------
export function UploadsPanel({ onOpenDesign }: { onOpenDesign: (d: SavedDesign) => void }) {
    const [assets, setAssets] = useState<AssetRecord[]>([]);
    const [designs, setDesigns] = useState<SavedDesign[]>([]);
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const refresh = useCallback(() => {
        listAssets().then(setAssets);
        listDesigns().then(setDesigns);
    }, []);
    useEffect(() => {
        refresh();
        window.addEventListener("pe-assets-changed", refresh);
        return () => window.removeEventListener("pe-assets-changed", refresh);
    }, [refresh]);
    const onFiles = async (files: FileList | null) => {
        if (!files?.length) return;
        setBusy(true);
        setErr(null);
        try {
            let first: AssetRecord | null = null;
            for (const f of Array.from(files)) {
                const rec = await addAssetFromFile(f);
                first = first ?? rec;
            }
            if (first) insertImage(`asset:${first.id}`, first.w, first.h);
            refresh();
        } catch (e) {
            setErr(e instanceof Error ? e.message : "Eroare la încărcare");
        } finally {
            setBusy(false);
            if (fileRef.current) fileRef.current.value = "";
        }
    };
    return (
        <div>
            <PanelTitle>Încărcări</PanelTitle>
            <div className="px-4">
                <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" multiple className="hidden" onChange={(e) => onFiles(e.target.files)} />
                <button type="button" onClick={() => fileRef.current?.click()} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--pe-brand)] px-4 py-3 text-[14px] font-bold text-white hover:bg-[var(--pe-brand-strong)]">
                    <Upload className="h-4 w-4" />
                    {busy ? "Se încarcă…" : "Încarcă poze sau logo"}
                </button>
                <p className="mt-2 text-[11px] leading-snug text-[var(--pe-muted)]">JPG, PNG, WebP sau SVG. Poți și să tragi fișierul direct pe planșă sau să-l lipești (Ctrl+V). Pozele rămân în acest browser.</p>
                {err && <p className="mt-2 text-[12px] text-[var(--pe-danger)]">{err}</p>}
            </div>
            {assets.length > 0 && (
                <Section title="Pozele tale">
                    <div className="grid grid-cols-3 gap-2">
                        {assets.map((a) => (
                            <div key={a.id} className="group relative">
                                <button
                                    type="button"
                                    draggable
                                    onDragStart={(ev) => ev.dataTransfer.setData(DRAG_TYPE, JSON.stringify({ kind: "image", src: `asset:${a.id}`, iw: a.w, ih: a.h }))}
                                    onClick={() => insertImage(`asset:${a.id}`, a.w, a.h)}
                                    className="block aspect-square w-full overflow-hidden rounded-lg border border-[var(--pe-border)] bg-[var(--pe-hover)]"
                                    title={`${a.name} · ${a.w}×${a.h} px`}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={resolveSrc(`asset:${a.id}`)} alt={a.name} className="h-full w-full object-cover" />
                                </button>
                                <button
                                    type="button"
                                    title="Șterge din listă"
                                    onClick={async () => {
                                        await deleteAsset(a.id);
                                        refresh();
                                    }}
                                    className="absolute right-1 top-1 hidden rounded-md bg-white/90 p-1 text-[var(--pe-danger)] shadow group-hover:block"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </Section>
            )}
            <Section title="Designurile mele">
                {designs.length === 0 ? (
                    <p className="text-[12px] text-[var(--pe-muted)]">Încă nimic salvat. Folosește „Salvează” din bara de sus.</p>
                ) : (
                    <div className="grid grid-cols-2 gap-2">
                        {designs.map((d) => (
                            <div key={d.id} className="group relative">
                                <button type="button" onClick={() => onOpenDesign(d)} className="block w-full text-left">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={d.thumb} alt={d.name} className="w-full rounded-lg border border-[var(--pe-border)]" />
                                    <div className="mt-1 truncate text-[12px] font-semibold">{d.name}</div>
                                    <div className="text-[10px] text-[var(--pe-subtle)]">{new Date(d.savedAt).toLocaleString("ro-RO")}</div>
                                </button>
                                <button
                                    type="button"
                                    title="Șterge designul"
                                    onClick={async () => {
                                        if (!confirm(`Ștergi „${d.name}”?`)) return;
                                        await deleteDesign(d.id);
                                        refresh();
                                    }}
                                    className="absolute right-1 top-1 hidden rounded-md bg-white/90 p-1 text-[var(--pe-danger)] shadow group-hover:block"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </Section>
        </div>
    );
}

// ---------------- Fundal ----------------
const GRADIENTS: Background[] = [
    { kind: "linear", angle: 135, stops: [{ offset: 0, color: "#0a7a62" }, { offset: 1, color: "#06352b" }] },
    { kind: "linear", angle: 90, stops: [{ offset: 0, color: "#f6f2eb" }, { offset: 1, color: "#e4dccb" }] },
    { kind: "linear", angle: 120, stops: [{ offset: 0, color: "#e63946" }, { offset: 1, color: "#a4161a" }] },
    { kind: "linear", angle: 120, stops: [{ offset: 0, color: "#ff7eb3" }, { offset: 1, color: "#7a5cff" }] },
    { kind: "linear", angle: 160, stops: [{ offset: 0, color: "#5b2bd6" }, { offset: 1, color: "#1c3faa" }] },
    { kind: "linear", angle: 90, stops: [{ offset: 0, color: "#ffd60a" }, { offset: 1, color: "#ff9a3c" }] },
    { kind: "linear", angle: 90, stops: [{ offset: 0, color: "#0b3d91" }, { offset: 1, color: "#0a2a66" }] },
    { kind: "radial", stops: [{ offset: 0, color: "#2b2b2b" }, { offset: 1, color: "#0d0d0d" }] },
    { kind: "linear", angle: 45, stops: [{ offset: 0, color: "#8ecae6" }, { offset: 1, color: "#219ebc" }] },
];
const PATTERNS: Array<{ id: PatternKind; label: string }> = [
    { id: "dots", label: "Buline" },
    { id: "stripes", label: "Dungi" },
    { id: "diagonal", label: "Diagonale" },
    { id: "grid", label: "Grilă" },
    { id: "checker", label: "Carouri" },
    { id: "waves", label: "Valuri" },
    { id: "zigzag", label: "Zigzag" },
];

export function BackgroundPanel() {
    const doc = useEditor((s) => s.doc)!;
    const bg = doc.background;
    const short = Math.min(doc.wMm, doc.hMm);
    const [assets, setAssets] = useState<AssetRecord[]>([]);
    useEffect(() => {
        listAssets().then(setAssets);
    }, []);
    const pat = bg.kind === "pattern" ? bg : null;
    return (
        <div>
            <PanelTitle>Fundal</PanelTitle>
            <Section title="Culoare">
                <div className="mb-2 grid grid-cols-7 gap-1.5">
                    {["#ffffff", "#f6f2eb", "#14211c", "#000000", "#075746", "#ffd60a", "#d62828", "#0b3d91", "#ff7eb3", "#2a9d8f", "#f4a261", "#e9e4da", "#5b2bd6", "#8ecae6"].map((c) => (
                        <button key={c} type="button" title={c} onClick={() => setBackground({ kind: "solid", color: c })} className={cx("aspect-square rounded-md border", bg.kind === "solid" && bg.color === c ? "border-[var(--pe-brand)] ring-2 ring-[var(--pe-brand)]/30" : "border-black/10")} style={{ background: c }} />
                    ))}
                </div>
                <ColorInput value={bg.kind === "solid" ? bg.color : null} commitKey="bg-color" onChange={(c, k) => c && setBackground({ kind: "solid", color: c }, k)} />
            </Section>
            <Section title="Gradient">
                <div className="grid grid-cols-3 gap-2">
                    {GRADIENTS.map((g, i) => (
                        <button key={i} type="button" onClick={() => setBackground(g)} className="h-12 rounded-lg border border-black/10" style={{ background: paintCss(g as never) }} title="Gradient" />
                    ))}
                </div>
                {(bg.kind === "linear" || bg.kind === "radial") && (
                    <div className="mt-3 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                            {bg.stops.map((s, i) => (
                                <ColorInput key={i} value={s.color} commitKey="bg-grad" onChange={(c, k) => c && setBackground({ ...bg, stops: bg.stops.map((x, j) => (j === i ? { ...x, color: c } : x)) }, k)} />
                            ))}
                        </div>
                        {bg.kind === "linear" && <Slider label="Unghi" value={bg.angle} min={0} max={360} unit="°" commitKey="bg-angle" onChange={(v, k) => setBackground({ ...bg, angle: v }, k)} />}
                    </div>
                )}
            </Section>
            <Section title="Model">
                <div className="grid grid-cols-4 gap-2">
                    {PATTERNS.map((p) => (
                        <button
                            key={p.id}
                            type="button"
                            title={p.label}
                            onClick={() => setBackground({ kind: "pattern", pattern: p.id, fg: pat?.fg ?? "#075746", bg: pat?.bg ?? "#f6f2eb", sizeMm: pat?.sizeMm ?? short / 12 })}
                            className={cx("overflow-hidden rounded-lg border text-[10px] font-semibold", pat?.pattern === p.id ? "border-[var(--pe-brand)] ring-2 ring-[var(--pe-brand)]/30" : "border-[var(--pe-border)]")}
                        >
                            <svg viewBox="0 0 40 40" className="block h-10 w-full" dangerouslySetInnerHTML={{ __html: patternPreview(p.id) }} />
                            <span className="block py-0.5">{p.label}</span>
                        </button>
                    ))}
                </div>
                {pat && (
                    <div className="mt-3 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                            <ColorInput value={pat.fg} commitKey="pat-fg" onChange={(c, k) => c && setBackground({ ...pat, fg: c }, k)} />
                            <ColorInput value={pat.bg} commitKey="pat-bg" onChange={(c, k) => c && setBackground({ ...pat, bg: c }, k)} />
                        </div>
                        <Slider label="Mărime model" value={pat.sizeMm} min={Math.max(1, short / 100)} max={short / 2} step={0.5} unit="mm" commitKey="pat-size" onChange={(v, k) => setBackground({ ...pat, sizeMm: v }, k)} />
                    </div>
                )}
            </Section>
            <Section title="Poză de fundal">
                {assets.length === 0 ? (
                    <p className="text-[12px] text-[var(--pe-muted)]">Încarcă o poză în „Încărcări”, apoi alege-o aici. Sau selectează o poză de pe planșă și apasă „Fă-o fundal”.</p>
                ) : (
                    <div className="grid grid-cols-3 gap-2">
                        {assets.map((a) => (
                            <button key={a.id} type="button" onClick={() => setBackground({ kind: "image", src: `asset:${a.id}`, iw: a.w, ih: a.h })} className="aspect-square overflow-hidden rounded-lg border border-[var(--pe-border)]" title={a.name}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={resolveSrc(`asset:${a.id}`)} alt={a.name} className="h-full w-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </Section>
        </div>
    );
}

function patternPreview(p: PatternKind): string {
    const fg = "#075746";
    const inner: Record<PatternKind, string> = {
        dots: '<circle cx="5" cy="5" r="1.6" fill="' + fg + '"/>',
        stripes: '<rect width="5" height="10" fill="' + fg + '"/>',
        grid: '<path d="M10 0V10M0 10H10" stroke="' + fg + '" stroke-width="0.8"/>',
        checker: '<rect width="5" height="5" fill="' + fg + '"/><rect x="5" y="5" width="5" height="5" fill="' + fg + '"/>',
        diagonal: '<path d="M-2.5 2.5L2.5 -2.5M0 10L10 0M7.5 12.5L12.5 7.5" stroke="' + fg + '" stroke-width="1.8"/>',
        waves: '<path d="M0 5Q2.5 2 5 5T10 5" stroke="' + fg + '" stroke-width="0.9" fill="none"/>',
        zigzag: '<path d="M0 6.5L2.5 3.5L5 6.5L7.5 3.5L10 6.5" stroke="' + fg + '" stroke-width="0.9" fill="none"/>',
    };
    return `<defs><pattern id="pp-${p}" patternUnits="userSpaceOnUse" width="10" height="10"><rect width="10" height="10" fill="#f6f2eb"/>${inner[p]}</pattern></defs><rect width="40" height="40" fill="url(#pp-${p})"/>`;
}

// ---------------- Straturi ----------------
function elLabel(el: El): string {
    if (el.name) return el.name;
    if (el.type === "text") return el.text.split("\n")[0].slice(0, 32) || "Text";
    if (el.type === "image") return el.placeholder ? "Casetă poză" : "Poză";
    if (el.type === "shape") return { rect: "Dreptunghi", ellipse: "Cerc", triangle: "Triunghi", star: "Stea", polygon: "Poligon", line: "Linie" }[el.shape];
    return "Element";
}

export function LayersPanel() {
    const doc = useEditor((s) => s.doc)!;
    const selection = useEditor((s) => s.selection);
    const select = useEditor((s) => s.select);
    const updateEls = useEditor((s) => s.updateEls);
    const moveTo = useEditor((s) => s.moveTo);
    const [dragId, setDragId] = useState<string | null>(null);
    const rows = [...doc.elements].reverse();
    return (
        <div>
            <PanelTitle>Straturi</PanelTitle>
            <p className="px-4 pb-2 text-[12px] text-[var(--pe-muted)]">Sus = în față. Trage pentru a schimba ordinea.</p>
            {rows.length === 0 && <p className="px-4 text-[12px] text-[var(--pe-muted)]">Nu ai încă elemente.</p>}
            <ul className="px-2 pb-6">
                {rows.map((el) => {
                    const active = selection.includes(el.id);
                    const idx = doc.elements.findIndex((x) => x.id === el.id);
                    return (
                        <li
                            key={el.id}
                            draggable
                            onDragStart={() => setDragId(el.id)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => {
                                if (dragId && dragId !== el.id) moveTo(dragId, idx);
                                setDragId(null);
                            }}
                            className={cx("mb-1 flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px]", active ? "bg-[var(--pe-brand-soft)] text-[var(--pe-brand-strong)]" : "hover:bg-[var(--pe-hover)]")}
                        >
                            <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-[var(--pe-subtle)]" />
                            <span className="shrink-0 text-[var(--pe-muted)]">
                                {el.type === "text" ? <Type className="h-4 w-4" /> : el.type === "image" ? <ImageIcon className="h-4 w-4" /> : <Shapes className="h-4 w-4" />}
                            </span>
                            <button type="button" className={cx("min-w-0 flex-1 truncate text-left", el.hidden && "opacity-40")} onClick={(e) => select([el.id], e.shiftKey || e.ctrlKey || e.metaKey)}>
                                {elLabel(el)}
                                {el.groupId && <span className="ml-1 rounded bg-[var(--pe-hover)] px-1 text-[10px] text-[var(--pe-muted)]">grup</span>}
                            </button>
                            <button type="button" title={el.hidden ? "Arată" : "Ascunde"} onClick={() => updateEls([el.id], { hidden: !el.hidden } as Partial<El>)} className="rounded p-1 text-[var(--pe-muted)] hover:bg-white">
                                {el.hidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                            <button type="button" title={el.locked ? "Deblochează" : "Blochează"} onClick={() => updateEls([el.id], { locked: !el.locked } as Partial<El>)} className="rounded p-1 text-[var(--pe-muted)] hover:bg-white">
                                {el.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4 opacity-50" />}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
