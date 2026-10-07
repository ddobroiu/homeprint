"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Crosshair, Info, Maximize2, Minimize2, Move, RotateCcw } from "lucide-react";

// Editor de incadrare: clientul vede grafica exact la proportia comandata (ex. 300×140 cm),
// o muta cu mouse-ul/degetul, face zoom si vede tivul, capsele, zona sigura si daca rezolutia
// ajunge pentru dimensiunea aleasa. Incadrarea aleasa se salveaza in comanda (vezi fitMetadata).

export type ArtworkFit = {
    // cover = umple suprafata (se taie ce iese), contain = intreaga grafica (margini albe)
    mode: "cover" | "contain";
    // 1 = marimea de baza a modului; >1 = marit
    zoom: number;
    // centrul graficii fata de centrul suprafetei, ca fractiune din latime / inaltime
    x: number;
    y: number;
};

export const DEFAULT_FIT: ArtworkFit = { mode: "cover", zoom: 1, x: 0, y: 0 };

type Props = {
    widthCm: number;
    heightCm: number;
    imageUrl: string;
    fit: ArtworkFit;
    onChange?: (fit: ArtworkFit) => void;
    // tiv si capse pe margine (banner), la ~50 cm
    grommets?: boolean;
    // distanta dintre capse (cm), ca in Schita tehnica
    grommetSpacingCm?: number;
    // gauri de vant (semiluni taiate in banner)
    windHoles?: boolean;
    // material microperforat (mesh): se vede textura peste grafica
    mesh?: boolean;
    // distanta de la margine in care nu se pune text important (tivul se indoaie aici)
    safeMarginCm?: number;
    // cat de departe e privit produsul, fata de diagonala lui (banner ~1.5; autocolant/plexi de aproape ~0.7)
    viewingFactor?: number;
    readOnly?: boolean;
    // inaltimea zonei se potriveste proportiei (bannere late nu mai stau intr-un patrat gol);
    // altfel editorul umple inaltimea data de parinte
    autoHeight?: boolean;
    // se apeleaza cand se cunosc pixelii imaginii (pentru metadate)
    onImageSize?: (size: { w: number; h: number } | null) => void;
    // Macheta produsului (ex. tricoul in culoarea aleasa): zona de print se deseneaza pe ea.
    // area: centrul zonei (x) si marginea de sus (y) ca fractiuni din poza, latimea (w) ca fractiune din latimea pozei.
    mockup?: { src: string; area: { x: number; y: number; w: number }; label?: string };
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const fmtCm = (v: number) => v.toLocaleString("ro-RO", { maximumFractionDigits: 1 });

// Spatiul din jurul planșei: stanga si sus pentru cote
const PAD = { l: 30, r: 12, t: 24, b: 12 };

// Capsele pe o latura: in colturi si la distante egale de cel mult ~spacing cm (fractiuni 0..1)
export function eyeletFractions(lengthCm: number, spacingCm = 50) {
    const n = Math.max(1, Math.round(lengthCm / spacingCm));
    return Array.from({ length: n + 1 }, (_, i) => i / n);
}

// Gaurile de vant: o grila rara (~ la 75 cm), departe de margini (fractiuni din latime / inaltime)
export function windHoleFractions(widthCm: number, heightCm: number) {
    const cols = Math.max(1, Math.round(widthCm / 75));
    const rows = Math.max(1, Math.round(heightCm / 75));
    const pts: { x: number; y: number }[] = [];
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) pts.push({ x: (i + 0.5) / cols, y: (j + 0.5) / rows });
    return pts;
}

// Cat de mare iese grafica tiparita si ce rezolutie are, pentru o incadrare data
// Rezolutia de care e nevoie: produsul e privit de la ~viewingFactor × diagonala, iar ochiul
// distinge cam 3438 / distanta (in inch) puncte pe inch. Ex. banner 200×100 cm: privit de la ~3,4 m, ajung ~26 dpi.
export function neededDpi(widthCm: number, heightCm: number, viewingFactor = 1.5) {
    const distanceCm = Math.max(30, viewingFactor * Math.hypot(widthCm, heightCm));
    return { dpi: clamp(3438 / (distanceCm / 2.54), 12, 300), distanceM: distanceCm / 100 };
}

export function fitGeometry(widthCm: number, heightCm: number, img: { w: number; h: number }, fit: ArtworkFit) {
    const base = fit.mode === "cover" ? Math.max(widthCm / img.w, heightCm / img.h) : Math.min(widthCm / img.w, heightCm / img.h);
    const cmPerPx = base * fit.zoom;
    const printW = img.w * cmPerPx;
    const printH = img.h * cmPerPx;
    const dpi = 2.54 / cmPerPx;
    return { printW, printH, dpi };
}

// Limitele deplasarii: in modul „umple” grafica nu are voie sa lase margini goale
function clampFit(fit: ArtworkFit, widthCm: number, heightCm: number, img: { w: number; h: number } | null): ArtworkFit {
    if (!img || !widthCm || !heightCm) return fit;
    const { printW, printH } = fitGeometry(widthCm, heightCm, img, fit);
    const maxX = Math.abs(printW - widthCm) / 2 / widthCm;
    const maxY = Math.abs(printH - heightCm) / 2 / heightCm;
    return { ...fit, x: clamp(fit.x, -maxX, maxX), y: clamp(fit.y, -maxY, maxY) };
}

export default function ArtworkFitEditor({
    widthCm,
    heightCm,
    imageUrl,
    fit,
    onChange,
    grommets = false,
    grommetSpacingCm = 50,
    windHoles = false,
    mesh = false,
    safeMarginCm = 0,
    viewingFactor = 1.5,
    readOnly = false,
    autoHeight = false,
    onImageSize,
    mockup,
}: Props) {
    const boxRef = useRef<HTMLDivElement>(null);
    const [box, setBox] = useState({ w: 0, h: 0 });
    const [img, setImg] = useState<{ w: number; h: number } | null>(null);
    const [failed, setFailed] = useState(false);
    const drag = useRef<{ px: number; py: number; x: number; y: number } | null>(null);
    const [mockupPx, setMockupPx] = useState<{ w: number; h: number } | null>(null);
    // nota scurta dupa schimbarea dimensiunii
    const [resizedNote, setResizedNote] = useState<string | null>(null);
    const prevDims = useRef<{ w: number; h: number } | null>(null);

    useEffect(() => {
        setMockupPx(null);
        if (!mockup?.src) return;
        const el = new window.Image();
        el.onload = () => setMockupPx({ w: el.naturalWidth, h: el.naturalHeight });
        el.src = mockup.src;
    }, [mockup?.src]);

    // Pixelii imaginii (PDF/AI nu se pot previzualiza in browser)
    useEffect(() => {
        setImg(null);
        setFailed(false);
        const el = new window.Image();
        el.onload = () => {
            const size = { w: el.naturalWidth, h: el.naturalHeight };
            setImg(size);
            onImageSize?.(size);
        };
        el.onerror = () => {
            setFailed(true);
            onImageSize?.(null);
        };
        el.src = imageUrl;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageUrl]);

    useEffect(() => {
        const el = boxRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([e]) => {
            const w = Math.round(e.contentRect.width);
            const h = Math.round(e.contentRect.height);
            setBox((b) => (b.w === w && b.h === h ? b : { w, h }));
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, [failed]);

    // Macheta (daca exista): cat ocupa poza produsului in spatiul disponibil
    const mock = useMemo(() => {
        if (!mockup || !mockupPx || !box.w) return null;
        const maxH = Math.max(box.h, 220);
        const k = Math.min(box.w / mockupPx.w, maxH / mockupPx.h);
        const w = mockupPx.w * k;
        const h = mockupPx.h * k;
        return { w, h, left: (box.w - w) / 2, top: (maxH - h) / 2 };
    }, [mockup, mockupPx, box]);

    // Suprafata tiparita, incadrata in spatiul disponibil (cu loc pentru cote), la proportia reala
    const frame = useMemo(() => {
        if (!box.w || !widthCm || !heightCm) return null;
        if (mockup) {
            if (!mock) return null;
            // zona de print pe produs: latimea data de macheta, inaltimea dupa proportia in cm
            const w = mockup.area.w * mock.w;
            const scale = w / widthCm;
            return {
                w, h: heightCm * scale, pxPerCm: scale,
                left: mock.left + mockup.area.x * mock.w - w / 2,
                top: mock.top + mockup.area.y * mock.h,
                boxH: null as number | null,
            };
        }
        const availW = Math.max(40, box.w - PAD.l - PAD.r);
        // autoHeight: cel mult un patrat (si nu mai inalt decat ~640 px); altfel inaltimea data de parinte
        const maxH = autoHeight ? Math.min(Math.max(box.w, 240), 640) : Math.max(box.h, 220);
        const availH = Math.max(40, maxH - PAD.t - PAD.b);
        const scale = Math.min(availW / widthCm, availH / heightCm);
        const w = widthCm * scale;
        const h = heightCm * scale;
        const boxH = autoHeight ? Math.max(180, Math.ceil(h + PAD.t + PAD.b)) : maxH;
        return {
            w, h, pxPerCm: scale,
            left: PAD.l + (availW - w) / 2,
            top: PAD.t + (boxH - PAD.t - PAD.b - h) / 2,
            boxH: autoHeight ? boxH : null,
        };
    }, [box, widthCm, heightCm, mockup, mock, autoHeight]);

    const set = useCallback(
        (next: ArtworkFit) => {
            setResizedNote(null);
            onChange?.(clampFit(next, widthCm, heightCm, img));
        },
        [onChange, widthCm, heightCm, img],
    );

    // Daca se schimba dimensiunea: pastram modul si zoom-ul, deplasarea ramane in limite, anuntam discret
    useEffect(() => {
        if (!img || readOnly || !widthCm || !heightCm) return;
        const prev = prevDims.current;
        prevDims.current = { w: widthCm, h: heightCm };
        const c = clampFit(fit, widthCm, heightCm, img);
        if (c.x !== fit.x || c.y !== fit.y) onChange?.(c);
        if (prev && (prev.w !== widthCm || prev.h !== heightCm)) {
            setResizedNote(
                `Dimensiune nouă: ${fmtCm(widthCm)}×${fmtCm(heightCm)} cm. Grafica s-a reașezat (${fit.mode === "cover" ? "Umple" : "Încadrează"}${fit.zoom > 1.001 ? `, zoom ${Math.round(fit.zoom * 100)}%` : ""}); verifică poziția.`,
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [widthCm, heightCm, img]);

    useEffect(() => {
        if (!resizedNote) return;
        const t = setTimeout(() => setResizedNote(null), 9000);
        return () => clearTimeout(t);
    }, [resizedNote]);

    const geo = img && widthCm && heightCm ? fitGeometry(widthCm, heightCm, img, fit) : null;
    const need = neededDpi(widthCm, heightCm, viewingFactor);
    // bun: cat ochiul distinge de la distanta obisnuita; acceptabil: de la jumatate in sus (usor moale de aproape)
    // Doar informam, discret: majoritatea pozelor arata bine la distanta de la care se vede produsul.
    // Nota apare doar la imaginile cu adevarat mici (sub un sfert din ce distinge ochiul).
    const quality = !geo ? null : geo.dpi >= need.dpi * 0.6 ? "good" : geo.dpi >= need.dpi * 0.25 ? "ok" : "low";
    const sizeLabel = `${fmtCm(widthCm)}×${fmtCm(heightCm)} cm`;

    const onPointerDown = (e: React.PointerEvent) => {
        if (readOnly || !frame) return;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        drag.current = { px: e.clientX, py: e.clientY, x: fit.x, y: fit.y };
    };
    const onPointerMove = (e: React.PointerEvent) => {
        if (!drag.current || !frame) return;
        const d = drag.current;
        set({ ...fit, x: d.x + (e.clientX - d.px) / frame.w, y: d.y + (e.clientY - d.py) / frame.h });
    };
    const onPointerUp = () => {
        drag.current = null;
    };

    // Finisajele desenate pe planșă (in px): tiv, capse, gauri de vant
    const marks = useMemo(() => {
        if (!frame) return null;
        const k = frame.pxPerCm;
        const hem = grommets ? clamp(3 * k, 3, 14) : 0;
        const r = clamp(1.2 * k, 3.5, 7);
        const inset = Math.max(2.5 * k, r + 1.5);
        const eyelets: { x: number; y: number }[] = [];
        if (grommets) {
            for (const t of eyeletFractions(widthCm, grommetSpacingCm)) {
                const x = inset + t * (frame.w - 2 * inset);
                eyelets.push({ x, y: inset }, { x, y: frame.h - inset });
            }
            for (const t of eyeletFractions(heightCm, grommetSpacingCm).slice(1, -1)) {
                const y = inset + t * (frame.h - 2 * inset);
                eyelets.push({ x: inset, y }, { x: frame.w - inset, y });
            }
        }
        const s = clamp(8 * k, 9, 18);
        const holes = windHoles ? windHoleFractions(widthCm, heightCm).map((p) => ({ x: p.x * frame.w, y: p.y * frame.h })) : [];
        return { hem, r, eyelets, holes, s };
    }, [frame, grommets, grommetSpacingCm, windHoles, widthCm, heightCm]);

    if (failed) {
        return (
            <div className="flex h-full min-h-60 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-600">
                <CheckCircle2 className="text-emerald-600" />
                <p className="font-medium text-slate-900">Fișier încărcat</p>
                <p>Fișierele PDF, AI sau PSD nu se pot previzualiza aici. Verificăm noi încadrarea înainte de tipar.</p>
            </div>
        );
    }

    const imgStyle = frame && geo
        ? {
            width: geo.printW * frame.pxPerCm,
            height: geo.printH * frame.pxPerCm,
            left: frame.w / 2 + fit.x * frame.w - (geo.printW * frame.pxPerCm) / 2,
            top: frame.h / 2 + fit.y * frame.h - (geo.printH * frame.pxPerCm) / 2,
        }
        : null;

    const showLegend = !readOnly && !mockup && !!frame && (grommets || windHoles || safeMarginCm > 0);

    return (
        <div className={`flex w-full flex-col gap-3 ${autoHeight ? "" : "h-full"}`}>
            <div
                ref={boxRef}
                className={`relative w-full overflow-hidden rounded-xl ${autoHeight ? "" : "min-h-60 flex-1"} ${mockup ? "bg-white" : "bg-[repeating-conic-gradient(#f1f5f9_0_25%,#fff_0_50%)] bg-[length:16px_16px]"}`}
                style={frame?.boxH ? { height: frame.boxH } : autoHeight ? { minHeight: 180 } : undefined}
                data-artboard-size={`${widthCm}x${heightCm}`}
            >
                {mockup && mock && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={mockup.src} alt="" draggable={false} className="pointer-events-none absolute select-none" style={{ left: mock.left, top: mock.top, width: mock.w, height: mock.h }} />
                )}
                {frame && (
                    <div className="absolute" style={{ width: frame.w, height: frame.h, left: frame.left, top: frame.top }} data-artboard>
                        {/* suprafata tiparita */}
                        <div
                            className={`absolute inset-0 overflow-hidden ${mockup ? "outline-dashed outline-1 outline-offset-0 outline-emerald-500/80" : "bg-white shadow-lg ring-1 ring-slate-300"} ${readOnly ? "" : "cursor-grab active:cursor-grabbing"} touch-none select-none`}
                            onPointerDown={onPointerDown}
                            onPointerMove={onPointerMove}
                            onPointerUp={onPointerUp}
                            onPointerCancel={onPointerUp}
                        >
                            {imgStyle && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={imageUrl} alt="Grafica ta" draggable={false} className="pointer-events-none absolute max-w-none" style={imgStyle} />
                            )}
                            {mesh && (
                                <div
                                    className="pointer-events-none absolute inset-0 opacity-40"
                                    style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 0.9px, transparent 1.1px)", backgroundSize: "4px 4px" }}
                                    title="Mesh microperforat"
                                />
                            )}
                            {/* zona sigura */}
                            {safeMarginCm > 0 && (
                                <div
                                    className="pointer-events-none absolute border border-dashed border-sky-500/80"
                                    style={{ inset: Math.max(safeMarginCm * frame.pxPerCm, (marks?.hem ?? 0) + 2) }}
                                    title="Linia punctată: marginea până la care e bine să stea textul (tivul / tăietura)"
                                />
                            )}
                            {marks && (marks.hem > 0 || marks.eyelets.length > 0 || marks.holes.length > 0) && (
                                <svg className="pointer-events-none absolute inset-0" width={frame.w} height={frame.h} aria-hidden="true">
                                    {marks.hem > 0 && (
                                        <>
                                            {/* tivul: banda indoita pe margine + cusatura */}
                                            <rect x={marks.hem / 2} y={marks.hem / 2} width={frame.w - marks.hem} height={frame.h - marks.hem}
                                                fill="none" stroke="rgba(15,23,42,0.16)" strokeWidth={marks.hem} />
                                            <rect x={marks.hem} y={marks.hem} width={frame.w - 2 * marks.hem} height={frame.h - 2 * marks.hem}
                                                fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={1} strokeDasharray="4 3" />
                                            <rect x={marks.hem + 0.5} y={marks.hem + 0.5} width={frame.w - 2 * marks.hem - 1} height={frame.h - 2 * marks.hem - 1}
                                                fill="none" stroke="rgba(15,23,42,0.45)" strokeWidth={0.75} strokeDasharray="4 3" />
                                        </>
                                    )}
                                    {marks.holes.map((p, i) => (
                                        // gaura de vant: semiluna taiata
                                        <path key={`w${i}`} data-wind-hole
                                            d={`M ${p.x - marks.s / 2} ${p.y - marks.s / 5} A ${marks.s / 2} ${marks.s / 2} 0 0 0 ${p.x + marks.s / 2} ${p.y - marks.s / 5}`}
                                            fill="rgba(255,255,255,0.75)" stroke="#334155" strokeWidth={1.5} strokeLinecap="round" />
                                    ))}
                                    {marks.eyelets.map((p, i) => (
                                        <g key={`e${i}`} data-eyelet>
                                            <circle cx={p.x} cy={p.y} r={marks.r} fill="#e2e8f0" stroke="#334155" strokeWidth={1} />
                                            <circle cx={p.x} cy={p.y} r={marks.r * 0.48} fill="#ffffff" stroke="#64748b" strokeWidth={0.75} />
                                        </g>
                                    ))}
                                </svg>
                            )}
                        </div>
                        {/* cotele */}
                        {!mockup && (
                            <>
                                <span className="pointer-events-none absolute -top-3 left-0 right-0 border-x border-t border-slate-400/70" style={{ height: 6 }} />
                                <span className="pointer-events-none absolute -left-3 top-0 bottom-0 border-y border-l border-slate-400/70" style={{ width: 6 }} />
                            </>
                        )}
                        <span data-dim="w" className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-white/90 px-1 text-[11px] font-medium leading-4 text-slate-600">{mockup?.label ? `${mockup.label}: ` : ""}{fmtCm(widthCm)} cm</span>
                        <span data-dim="h" className="absolute top-1/2 whitespace-nowrap rounded bg-white/90 px-1 text-[11px] font-medium leading-4 text-slate-600"
                            style={{ left: mockup ? -6 : -20, transform: "translate(-50%, -50%) rotate(-90deg)" }}>
                            {fmtCm(heightCm)} cm
                        </span>
                    </div>
                )}
            </div>

            {resizedNote && (
                <p className="flex items-start gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs text-amber-900" role="status">
                    <Info size={14} className="mt-px shrink-0" />
                    <span className="flex-1">{resizedNote}</span>
                    <button type="button" onClick={() => set({ ...fit, zoom: 1, x: 0, y: 0 })} className="inline-flex shrink-0 items-center gap-1 font-semibold underline-offset-2 hover:underline">
                        <RotateCcw size={12} /> Resetează
                    </button>
                </p>
            )}

            {!readOnly && img && (
                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex rounded-lg border border-slate-200 bg-white p-0.5">
                        <button type="button" onClick={() => set({ ...fit, mode: "cover", zoom: 1, x: 0, y: 0 })}
                            aria-pressed={fit.mode === "cover"}
                            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium ${fit.mode === "cover" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
                            title="Grafica umple toată suprafața; ce iese în afară se taie">
                            <Maximize2 size={13} /> Umple
                        </button>
                        <button type="button" onClick={() => set({ ...fit, mode: "contain", zoom: 1, x: 0, y: 0 })}
                            aria-pressed={fit.mode === "contain"}
                            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium ${fit.mode === "contain" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
                            title="Toată grafica se vede; rămân margini albe">
                            <Minimize2 size={13} /> Încadrează
                        </button>
                    </div>
                    <button type="button" onClick={() => set({ ...fit, x: 0, y: 0 })}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
                        <Crosshair size={13} /> Centrează
                    </button>
                    <label className="flex flex-1 items-center gap-2 text-xs text-slate-500">
                        Zoom
                        <input type="range" min={1} max={3} step={0.01} value={fit.zoom}
                            onChange={(e) => set({ ...fit, zoom: Number(e.target.value) })}
                            className="min-w-24 flex-1 accent-emerald-600" />
                        <span className="w-10 text-right tabular-nums">{Math.round(fit.zoom * 100)}%</span>
                    </label>
                </div>
            )}

            {(showLegend || (!readOnly && !!img)) && (
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                    {!readOnly && img && <span className="inline-flex items-center gap-1"><Move size={12} /> Trage imaginea ca s-o poziționezi</span>}
                    {grommets && !mockup && <span className="inline-flex items-center gap-1"><span className="inline-block size-2.5 rounded-full border-2 border-slate-600 bg-white" /> capse la ~{grommetSpacingCm} cm, tiv pe margine</span>}
                    {windHoles && !mockup && <span className="inline-flex items-center gap-1"><span className="inline-block h-1.5 w-2.5 rounded-b-full border-2 border-t-0 border-slate-600" /> găuri de vânt</span>}
                    {safeMarginCm > 0 && !mockup && <span className="inline-flex items-center gap-1"><span className="inline-block w-3 border-t border-dashed border-sky-500" /> zonă sigură {fmtCm(safeMarginCm)} cm</span>}
                </div>
            )}

            {geo && quality && (
                <p className={`flex items-start gap-1.5 text-xs ${quality === "low" ? "text-slate-600" : "text-emerald-700"}`} data-dpi-note>
                    {quality === "low" ? <Info size={14} className="mt-px shrink-0 text-slate-400" /> : <CheckCircle2 size={14} className="mt-px shrink-0" />}
                    <span>
                        {quality === "good" && <>Calitate foarte bună pentru {sizeLabel}.</>}
                        {quality === "ok" && <>Calitate bună pentru {sizeLabel}, privit de la distanță.</>}
                        {quality === "low" && <>Imaginea are rezoluție mică pentru {sizeLabel}. Dacă ai o variantă mai mare, o poți încărca; altfel o verificăm noi înainte de tipar.</>}
                    </span>
                </p>
            )}
        </div>
    );
}

// Ce se salveaza in comanda: descrierea pentru atelier (in cm) + datele exacte pentru admin
export function fitMetadata(widthCm: number, heightCm: number, img: { w: number; h: number } | null, fit: ArtworkFit) {
    if (!img || !widthCm || !heightCm) return {};
    // incadrarea se recalculeaza pentru dimensiunea finala (in limite, ca in editor)
    const f = clampFit(fit, widthCm, heightCm, img);
    const g = fitGeometry(widthCm, heightCm, img, f);
    const dx = Math.round(f.x * widthCm);
    const dy = Math.round(f.y * heightCm);
    const pos = dx === 0 && dy === 0 ? "centrată" : `mutată ${dx > 0 ? `${dx} cm la dreapta` : dx < 0 ? `${-dx} cm la stânga` : ""}${dx && dy ? ", " : ""}${dy > 0 ? `${dy} cm în jos` : dy < 0 ? `${-dy} cm în sus` : ""}`;
    return {
        "Încadrare": `${f.mode === "cover" ? "umple suprafața" : "încadrată cu margini albe"}, grafica ${Math.round(g.printW)}×${Math.round(g.printH)} cm pe ${fmtCm(widthCm)}×${fmtCm(heightCm)} cm, ${pos}`,
        "Rezoluție": `${Math.round(g.dpi)} dpi (${img.w}×${img.h} px)`,
        artworkFit: JSON.stringify({ ...f, imgW: img.w, imgH: img.h, widthCm, heightCm }),
    };
}
