"use client";
// Planșa: randarea SVG la scară (mm), rigle, ghidaje bleed / siguranță, selecție, mutare,
// redimensionare, rotire, aliniere magnetică (smart guides), zoom / pan, editare text pe loc.
import React, { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { aabb, corners, normalizeText, unionBox, type Box } from "@/lib/editor/doc";
import { backgroundSvg, elementSvg, imageDpi, libraryElement, type RenderCtx } from "@/lib/editor/render";
import { layoutText } from "@/lib/editor/textLayout";
import type { EditorDoc, El, ImageEl, TextEl } from "@/lib/editor/types";
import { PRODUCT_ZONES, bottomNoGoMm } from "@/lib/editor/zones";
import { resolveSrc } from "./assets";
import { fillPlaceholderAt, insertImage, insertSvg } from "./actions";
import { EDITOR_BRAND } from "@/lib/editor/site";

/** Culoarea selecției pe planșă = culoarea brandului site-ului. */
const SEL = EDITOR_BRAND.color;
import { selectedEls, useEditor } from "./store";

const RULER = 22;
const SCREEN_CTX: RenderCtx = { resolveSrc, idPrefix: "s" };

type Pt = { x: number; y: number };
type Guide = { axis: "x" | "y"; at: number };

type Gesture =
    | { kind: "move"; start: Pt; startDoc: EditorDoc; ids: string[]; moved: boolean }
    | { kind: "resize"; handle: [number, number]; start: Pt; startDoc: EditorDoc; ids: string[]; box: Box & { rotation: number } }
    | { kind: "rotate"; startDoc: EditorDoc; ids: string[]; center: Pt; startAngle: number; rot0: Record<string, number> }
    | { kind: "marquee"; start: Pt; cur: Pt; additive: boolean }
    | { kind: "pan"; startClient: Pt; startPan: Pt }
    | null;

const ElNode = memo(function ElNode({ el, hidden, epoch }: { el: El; hidden: boolean; epoch: number }) {
    // epoch: fonturile s-au încărcat → textul (mai ales cel cu auto-fit) se re-măsoară
    const html = useMemo(() => elementSvg(el, SCREEN_CTX), [el, epoch]); // eslint-disable-line react-hooks/exhaustive-deps
    return <g data-id={el.id} style={hidden ? { visibility: "hidden" } : undefined} dangerouslySetInnerHTML={{ __html: html }} />;
});

function rot(p: Pt, a: number): Pt {
    const c = Math.cos(a);
    const s = Math.sin(a);
    return { x: p.x * c - p.y * s, y: p.x * s + p.y * c };
}

function hitTest(doc: EditorDoc, p: Pt, tol: number): El | null {
    for (let i = doc.elements.length - 1; i >= 0; i--) {
        const el = doc.elements[i];
        if (el.hidden) continue;
        const c = { x: el.x + el.w / 2, y: el.y + el.h / 2 };
        const l = rot({ x: p.x - c.x, y: p.y - c.y }, (-(el.rotation || 0) * Math.PI) / 180);
        const extra = el.type === "shape" && el.shape === "line" ? Math.max(tol, el.h) : tol;
        if (Math.abs(l.x) <= el.w / 2 + tol && Math.abs(l.y) <= el.h / 2 + extra) return el;
    }
    return null;
}

/** Etichetă mică (pastilă) pentru ghidaje. */
function GuideLabel({ x, y, text, color }: { x: number; y: number; text: string; color: string }) {
    const w = text.length * 5.6 + 14;
    return (
        <g transform={`translate(${x} ${y})`}>
            <rect width={w} height={16} rx={8} fill="var(--pe-surface)" stroke={color} strokeOpacity={0.5} />
            <text x={7} y={11.5} fontSize={10} fontWeight={600} fill={color} fontFamily="Inter, sans-serif">
                {text}
            </text>
        </g>
    );
}

function tickStep(zoom: number): number {
    for (const s of [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000]) if (s * zoom >= 7) return s;
    return 5000;
}

function Rulers({ doc, zoom, pan, width, height }: { doc: EditorDoc; zoom: number; pan: Pt; width: number; height: number }) {
    const step = tickStep(zoom);
    const major = step * (step === 1 || step === 10 || step === 100 ? 10 : 5);
    const ticks = (len: number, offset: number) => {
        const out: Array<{ pos: number; v: number; major: boolean }> = [];
        const from = Math.floor(-offset / zoom / step) * step;
        const to = (len - offset) / zoom;
        for (let v = from; v <= to; v += step) out.push({ pos: offset + v * zoom, v, major: Math.abs(v % major) < 1e-6 });
        return out;
    };
    const fmt = (mm: number) => (major >= 10 ? String(Math.round(mm / 10)) : String(mm / 10));
    return (
        <>
            <svg className="pointer-events-none absolute left-0 top-0 z-20" width={width} height={RULER} style={{ background: "var(--pe-surface)", borderBottom: "1px solid var(--pe-border)" }}>
                <rect x={pan.x} y={0} width={doc.wMm * zoom} height={RULER} fill="var(--pe-brand-soft)" />
                {ticks(width, pan.x).map((t) => (
                    <g key={t.v}>
                        <line x1={t.pos} x2={t.pos} y1={t.major ? 6 : 15} y2={RULER} stroke="var(--pe-border-strong)" strokeWidth={1} />
                        {t.major && (
                            <text x={t.pos + 3} y={11} fontSize={9} fill="var(--pe-muted)" fontFamily="Inter, sans-serif">
                                {fmt(t.v)}
                            </text>
                        )}
                    </g>
                ))}
                <text x={width - 4} y={11} fontSize={9} fill="var(--pe-subtle)" textAnchor="end" fontFamily="Inter, sans-serif">
                    cm
                </text>
            </svg>
            <svg className="pointer-events-none absolute left-0 top-0 z-20" width={RULER} height={height} style={{ background: "var(--pe-surface)", borderRight: "1px solid var(--pe-border)" }}>
                <rect x={0} y={pan.y} width={RULER} height={doc.hMm * zoom} fill="var(--pe-brand-soft)" />
                {ticks(height, pan.y).map((t) => (
                    <g key={t.v}>
                        <line y1={t.pos} y2={t.pos} x1={t.major ? 6 : 15} x2={RULER} stroke="var(--pe-border-strong)" strokeWidth={1} />
                        {t.major && (
                            <text x={10} y={t.pos + 3} fontSize={9} fill="var(--pe-muted)" fontFamily="Inter, sans-serif" transform={`rotate(-90 10 ${t.pos + 3})`}>
                                {fmt(t.v)}
                            </text>
                        )}
                    </g>
                ))}
            </svg>
            <div className="absolute left-0 top-0 z-30 border-b border-r border-[var(--pe-border)] bg-[var(--pe-surface)]" style={{ width: RULER, height: RULER }} />
        </>
    );
}

export default function Stage({ isMobile, fitSignal }: { isMobile: boolean; fitSignal: number }) {
    const doc = useEditor((s) => s.doc)!;
    const selection = useEditor((s) => s.selection);
    const zoom = useEditor((s) => s.zoom);
    const setZoom = useEditor((s) => s.setZoom);
    const editingTextId = useEditor((s) => s.editingTextId);
    const showGuides = useEditor((s) => s.showGuides);
    const showRulers = useEditor((s) => s.showRulers) && !isMobile;
    const preview = useEditor((s) => s.preview);
    const fontEpoch = useEditor((s) => s.fontEpoch);
    const noGo = bottomNoGoMm(doc.productId, doc.hMm);

    const wrapRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ w: 800, h: 600 });
    const [pan, setPan] = useState<Pt>({ x: 0, y: 0 });
    const [guides, setGuides] = useState<Guide[]>([]);
    const [hoverId, setHoverId] = useState<string | null>(null);
    const [marquee, setMarquee] = useState<Box | null>(null);
    const gesture = useRef<Gesture>(null);
    const pointers = useRef(new Map<number, Pt>());
    const pinch = useRef<{ dist: number; zoom: number; mid: Pt; pan: Pt } | null>(null);
    const spaceDown = useRef(false);
    const autoFit = useRef(true);
    const viewRef = useRef({ zoom, pan });
    viewRef.current = { zoom, pan };

    // ---------- încadrare ----------
    const fit = useCallback(() => {
        const el = wrapRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const pad = isMobile ? 18 : 56;
        const off = showRulers ? RULER : 0;
        const availW = r.width - off - pad * 2;
        const availH = r.height - off - pad * 2;
        const fw = doc.wMm + 2 * doc.bleedMm;
        const fh = doc.hMm + 2 * doc.bleedMm;
        const z = Math.max(0.02, Math.min(availW / fw, availH / fh));
        autoFit.current = true;
        setZoom(z);
        setPan({ x: off + (r.width - off - doc.wMm * z) / 2, y: off + (r.height - off - doc.hMm * z) / 2 });
    }, [doc.wMm, doc.hMm, doc.bleedMm, isMobile, showRulers, setZoom]);

    useLayoutEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => {
            const r = el.getBoundingClientRect();
            setSize({ w: r.width, h: r.height });
            if (autoFit.current) requestAnimationFrame(() => fitRef.current());
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);
    useLayoutEffect(() => {
        fit();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doc.wMm, doc.hMm, fitSignal, isMobile]);
    // cât timp utilizatorul n-a făcut zoom / pan, planșa rămâne încadrată (panouri care se deschid etc.)
    const fitRef = useRef(fit);
    fitRef.current = fit;

    // zoom din bara de sus / scurtături: în jurul centrului vizibil
    const zoomReq = useEditor((s) => s.zoomReq);
    useEffect(() => {
        if (!zoomReq) return;
        const { zoom: z, pan: p } = viewRef.current;
        const nz = Math.max(0.02, Math.min(64, z * zoomReq.factor));
        const c = { x: size.w / 2, y: size.h / 2 };
        autoFit.current = false;
        setZoom(nz);
        setPan({ x: c.x - ((c.x - p.x) / z) * nz, y: c.y - ((c.y - p.y) / z) * nz });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zoomReq?.n]);

    const toDoc = useCallback((clientX: number, clientY: number): Pt => {
        const r = wrapRef.current!.getBoundingClientRect();
        const { zoom: z, pan: p } = viewRef.current;
        return { x: (clientX - r.left - p.x) / z, y: (clientY - r.top - p.y) / z };
    }, []);

    // ---------- roata: pan, Ctrl + roata: zoom la cursor ----------
    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            autoFit.current = false;
            const { zoom: z, pan: p } = viewRef.current;
            if (e.ctrlKey || e.metaKey) {
                const r = el.getBoundingClientRect();
                const m = { x: e.clientX - r.left, y: e.clientY - r.top };
                const nz = Math.max(0.02, Math.min(64, z * Math.exp(-e.deltaY * 0.0022)));
                setPan({ x: m.x - ((m.x - p.x) / z) * nz, y: m.y - ((m.y - p.y) / z) * nz });
                setZoom(nz);
            } else {
                setPan({ x: p.x - (e.shiftKey ? e.deltaY : e.deltaX), y: p.y - (e.shiftKey ? 0 : e.deltaY) });
            }
        };
        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, [setZoom]);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.code === "Space" && !(e.target as HTMLElement)?.closest?.("input,textarea,[contenteditable]")) spaceDown.current = true;
        };
        const up = (e: KeyboardEvent) => e.code === "Space" && (spaceDown.current = false);
        window.addEventListener("keydown", down);
        window.addEventListener("keyup", up);
        return () => {
            window.removeEventListener("keydown", down);
            window.removeEventListener("keyup", up);
        };
    }, []);

    // ---------- snapping ----------
    const snapTargets = useCallback(
        (exclude: Set<string>) => {
            const xs = [0, doc.wMm / 2, doc.wMm, doc.safeMm, doc.wMm - doc.safeMm];
            const ys = [0, doc.hMm / 2, doc.hMm, doc.safeMm, doc.hMm - doc.safeMm];
            if (doc.bleedMm) {
                xs.push(-doc.bleedMm, doc.wMm + doc.bleedMm);
                ys.push(-doc.bleedMm, doc.hMm + doc.bleedMm);
            }
            for (const el of doc.elements) {
                if (exclude.has(el.id) || el.hidden) continue;
                const b = aabb(el);
                xs.push(b.x, b.x + b.w / 2, b.x + b.w);
                ys.push(b.y, b.y + b.h / 2, b.y + b.h);
            }
            return { xs, ys };
        },
        [doc],
    );

    // ---------- pointer ----------
    const onPointerDown = (e: React.PointerEvent) => {
        if (e.button === 2) return;
        const target = e.target as HTMLElement;
        if (target.closest("[data-ui]")) return;
        wrapRef.current?.setPointerCapture(e.pointerId);
        pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pointers.current.size === 2) {
            // pinch (mobil): anulează gestul curent
            if (gesture.current && gesture.current.kind !== "pan" && gesture.current.kind !== "marquee") useEditor.getState().endGesture();
            gesture.current = null;
            const [a, b] = [...pointers.current.values()];
            pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), zoom: viewRef.current.zoom, mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, pan: viewRef.current.pan };
            return;
        }
        const st = useEditor.getState();
        if (st.editingTextId) {
            st.setEditingText(null);
        }
        const p = toDoc(e.clientX, e.clientY);
        const handle = target.closest("[data-handle]")?.getAttribute("data-handle");
        if (handle) {
            const els = selectedEls(st.doc, st.selection);
            if (!els.length || els.some((x) => x.locked)) return;
            st.beginGesture();
            if (handle === "rot") {
                const b = els.length === 1 ? { x: els[0].x, y: els[0].y, w: els[0].w, h: els[0].h } : unionBox(els.map(aabb))!;
                const center = { x: b.x + b.w / 2, y: b.y + b.h / 2 };
                gesture.current = { kind: "rotate", startDoc: st.doc!, ids: els.map((x) => x.id), center, startAngle: Math.atan2(p.y - center.y, p.x - center.x), rot0: Object.fromEntries(els.map((x) => [x.id, x.rotation || 0])) };
            } else {
                const [hx, hy] = handle.split(",").map(Number) as [number, number];
                const box = els.length === 1 ? { x: els[0].x, y: els[0].y, w: els[0].w, h: els[0].h, rotation: els[0].rotation || 0 } : { ...unionBox(els.map(aabb))!, rotation: 0 };
                gesture.current = { kind: "resize", handle: [hx, hy], start: p, startDoc: st.doc!, ids: els.map((x) => x.id), box };
            }
            return;
        }
        const isTouch = e.pointerType === "touch";
        if (e.button === 1 || spaceDown.current) {
            gesture.current = { kind: "pan", startClient: { x: e.clientX, y: e.clientY }, startPan: viewRef.current.pan };
            return;
        }
        const hit = hitTest(st.doc!, p, 3 / viewRef.current.zoom);
        if (hit) {
            const inSel = st.selection.includes(hit.id);
            if (e.shiftKey || e.ctrlKey || e.metaKey) {
                st.select([hit.id], true);
                return;
            }
            if (!inSel) st.select([hit.id]);
            const ids = useEditor.getState().selection.filter((id) => !st.doc!.elements.find((x) => x.id === id)?.locked);
            if (!ids.length) return;
            st.beginGesture();
            gesture.current = { kind: "move", start: p, startDoc: st.doc!, ids, moved: false };
            return;
        }
        if (isTouch) {
            st.select([]);
            gesture.current = { kind: "pan", startClient: { x: e.clientX, y: e.clientY }, startPan: viewRef.current.pan };
            return;
        }
        if (!e.shiftKey) st.select([]);
        gesture.current = { kind: "marquee", start: p, cur: p, additive: e.shiftKey };
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (pointers.current.has(e.pointerId)) pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pinch.current && pointers.current.size >= 2) {
            const [a, b] = [...pointers.current.values()];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
            const r = wrapRef.current!.getBoundingClientRect();
            const pc = pinch.current;
            const nz = Math.max(0.02, Math.min(64, (pc.zoom * dist) / Math.max(1, pc.dist)));
            const m0 = { x: pc.mid.x - r.left, y: pc.mid.y - r.top };
            const docPt = { x: (m0.x - pc.pan.x) / pc.zoom, y: (m0.y - pc.pan.y) / pc.zoom };
            autoFit.current = false;
            setZoom(nz);
            setPan({ x: mid.x - r.left - docPt.x * nz, y: mid.y - r.top - docPt.y * nz });
            return;
        }
        const g = gesture.current;
        const st = useEditor.getState();
        if (!g) {
            if (e.pointerType === "mouse") {
                const h = hitTest(st.doc!, toDoc(e.clientX, e.clientY), 2 / viewRef.current.zoom);
                setHoverId(h?.id ?? null);
            }
            return;
        }
        const p = toDoc(e.clientX, e.clientY);
        const z = viewRef.current.zoom;
        if (g.kind === "pan") {
            autoFit.current = false;
            setPan({ x: g.startPan.x + e.clientX - g.startClient.x, y: g.startPan.y + e.clientY - g.startClient.y });
            return;
        }
        if (g.kind === "marquee") {
            g.cur = p;
            setMarquee({ x: Math.min(g.start.x, p.x), y: Math.min(g.start.y, p.y), w: Math.abs(p.x - g.start.x), h: Math.abs(p.y - g.start.y) });
            return;
        }
        if (g.kind === "move") {
            let dx = p.x - g.start.x;
            let dy = p.y - g.start.y;
            if (!g.moved && Math.hypot(dx, dy) * z < 3) return;
            g.moved = true;
            if (e.shiftKey) {
                if (Math.abs(dx) > Math.abs(dy)) dy = 0;
                else dx = 0;
            }
            const ids = new Set(g.ids);
            const startEls = g.startDoc.elements.filter((x) => ids.has(x.id));
            const b0 = unionBox(startEls.map(aabb))!;
            const tol = 6 / z;
            const { xs, ys } = snapTargets(ids);
            const found: Guide[] = [];
            const snap1 = (edges: number[], targets: number[], axis: "x" | "y") => {
                let best: { d: number; at: number } | null = null;
                for (const edge of edges) for (const t of targets) {
                    const d = t - edge;
                    if (Math.abs(d) <= tol && (!best || Math.abs(d) < Math.abs(best.d))) best = { d, at: t };
                }
                if (best) found.push({ axis, at: best.at });
                return best?.d ?? 0;
            };
            if (!e.altKey) {
                dx += snap1([b0.x + dx, b0.x + b0.w / 2 + dx, b0.x + b0.w + dx], xs, "x");
                dy += snap1([b0.y + dy, b0.y + b0.h / 2 + dy, b0.y + b0.h + dy], ys, "y");
            }
            setGuides(found);
            const map = new Map(startEls.map((x) => [x.id, x]));
            st.update((d) => ({ ...d, elements: d.elements.map((x) => (map.has(x.id) ? ({ ...x, x: map.get(x.id)!.x + dx, y: map.get(x.id)!.y + dy } as El) : x)) }));
            return;
        }
        if (g.kind === "rotate") {
            const a = Math.atan2(p.y - g.center.y, p.x - g.center.x);
            let delta = ((a - g.startAngle) * 180) / Math.PI;
            const ids = new Set(g.ids);
            const startEls = g.startDoc.elements.filter((x) => ids.has(x.id));
            if (startEls.length === 1) {
                let r = g.rot0[startEls[0].id] + delta;
                if (e.shiftKey) r = Math.round(r / 15) * 15;
                else {
                    const near = Math.round(r / 45) * 45;
                    if (Math.abs(r - near) < 4) r = near;
                }
                delta = r - g.rot0[startEls[0].id];
            } else if (e.shiftKey) delta = Math.round(delta / 15) * 15;
            const rad = (delta * Math.PI) / 180;
            st.update((d) => ({
                ...d,
                elements: d.elements.map((x) => {
                    const s = startEls.find((q) => q.id === x.id);
                    if (!s) return x;
                    const c = { x: s.x + s.w / 2, y: s.y + s.h / 2 };
                    const v = rot({ x: c.x - g.center.x, y: c.y - g.center.y }, rad);
                    const nc = { x: g.center.x + v.x, y: g.center.y + v.y };
                    let r = (g.rot0[s.id] + delta) % 360;
                    if (r > 180) r -= 360;
                    if (r < -180) r += 360;
                    return { ...x, rotation: Math.round(r * 100) / 100, x: nc.x - s.w / 2, y: nc.y - s.h / 2 } as El;
                }),
            }));
            return;
        }
        if (g.kind === "resize") {
            const [hx, hy] = g.handle;
            const { box } = g;
            const a = (box.rotation * Math.PI) / 180;
            const c0 = { x: box.x + box.w / 2, y: box.y + box.h / 2 };
            const anchorLocal = { x: (-hx * box.w) / 2, y: (-hy * box.h) / 2 };
            const ar = rot(anchorLocal, a);
            const A = { x: c0.x + ar.x, y: c0.y + ar.y };
            const v = rot({ x: p.x - A.x, y: p.y - A.y }, -a);
            const ids = new Set(g.ids);
            const startEls = g.startDoc.elements.filter((x) => ids.has(x.id));
            const single = startEls.length === 1 ? startEls[0] : null;
            const corner = hx !== 0 && hy !== 0;
            const minMm = 4 / z;
            let w = hx !== 0 ? Math.max(minMm, v.x * hx) : box.w;
            let h = hy !== 0 ? Math.max(minMm, v.y * hy) : box.h;
            const ratioDefault = !single || single.type === "image" || single.type === "text" || (single.type === "svg" && (libraryElement(single.ref)?.keepRatio ?? true));
            const textScales = single?.type === "text" && !(single as TextEl).autoFit;
            const lockRatio = corner && (textScales || (ratioDefault ? !e.shiftKey || !single : e.shiftKey));
            let s = 1;
            if (lockRatio) {
                s = Math.max(minMm / Math.min(box.w, box.h), Math.max((v.x * hx) / box.w, (v.y * hy) / box.h));
                w = box.w * s;
                h = box.h * s;
            }
            const nc = rot({ x: (hx * w) / 2, y: (hy * h) / 2 }, a);
            const center = { x: A.x + nc.x, y: A.y + nc.y };
            if (single) {
                let next: El = { ...single, x: center.x - w / 2, y: center.y - h / 2, w, h } as El;
                if (next.type === "text") {
                    const t0 = single as TextEl;
                    if (lockRatio && !t0.autoFit) {
                        next = { ...next, fontSize: t0.fontSize * s } as TextEl;
                    }
                    if (!t0.autoFit) {
                        // înălțimea vine din text; ancorăm marginea de sus (sau de jos, la mânerele de sus)
                        const n = normalizeText(next as TextEl);
                        const dh = n.h - h;
                        const shift = rot({ x: 0, y: hy < 0 ? -dh / 2 : dh / 2 }, a);
                        const cx2 = center.x + shift.x;
                        const cy2 = center.y + shift.y;
                        next = { ...n, x: cx2 - n.w / 2, y: cy2 - n.h / 2 };
                    }
                }
                if (next.type === "shape" && next.shape === "line" && single.type === "shape") {
                    next = { ...next, h: single.h, y: center.y - single.h / 2 } as El;
                }
                st.update((d) => ({ ...d, elements: d.elements.map((x) => (x.id === single.id ? next : x)) }));
            } else {
                // grup: scalare uniformă față de colțul opus
                const k = s;
                st.update((d) => ({
                    ...d,
                    elements: d.elements.map((x) => {
                        const s0 = startEls.find((q) => q.id === x.id);
                        if (!s0) return x;
                        const c = { x: s0.x + s0.w / 2, y: s0.y + s0.h / 2 };
                        const nc2 = { x: A.x + (c.x - A.x) * k, y: A.y + (c.y - A.y) * k };
                        const nw = s0.w * k;
                        const nh = s0.h * k;
                        let n: El = { ...s0, x: nc2.x - nw / 2, y: nc2.y - nh / 2, w: nw, h: nh } as El;
                        if (n.type === "text") n = normalizeText({ ...n, fontSize: (s0 as TextEl).fontSize * k });
                        if (n.type === "shape" && n.stroke) n = { ...n, stroke: { ...n.stroke, width: n.stroke.width * k } };
                        return n;
                    }),
                }));
            }
        }
    };

    const onPointerUp = (e: React.PointerEvent) => {
        pointers.current.delete(e.pointerId);
        if (pinch.current) {
            if (pointers.current.size < 2) pinch.current = null;
            return;
        }
        const g = gesture.current;
        gesture.current = null;
        setGuides([]);
        const st = useEditor.getState();
        if (!g) return;
        if (g.kind === "marquee") {
            setMarquee(null);
            const b = { x: Math.min(g.start.x, g.cur.x), y: Math.min(g.start.y, g.cur.y), w: Math.abs(g.cur.x - g.start.x), h: Math.abs(g.cur.y - g.start.y) };
            if (b.w * viewRef.current.zoom < 4 && b.h * viewRef.current.zoom < 4) return;
            const ids = st.doc!.elements.filter((x) => !x.hidden && !x.locked).filter((x) => {
                const a = aabb(x);
                return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
            }).map((x) => x.id);
            st.select(ids, g.additive);
            return;
        }
        if (g.kind === "move" || g.kind === "resize" || g.kind === "rotate") st.endGesture();
    };

    const onDoubleClick = (e: React.MouseEvent) => {
        const st = useEditor.getState();
        const hit = hitTest(st.doc!, toDoc(e.clientX, e.clientY), 3 / viewRef.current.zoom);
        if (hit?.type === "text" && !hit.locked) {
            st.select([hit.id]);
            st.setEditingText(hit.id);
        }
        if (hit?.type === "image" && hit.placeholder) st.setPanel("incarcari");
    };

    // ---------- drag & drop din panouri / din calculator ----------
    const onDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        const p = toDoc(e.clientX, e.clientY);
        const raw = e.dataTransfer.getData("application/x-shopprint-editor");
        if (raw) {
            try {
                const data = JSON.parse(raw) as { kind: "image"; src: string; iw: number; ih: number; credit?: string } | { kind: "svg"; ref: string };
                if (data.kind === "image") {
                    if (!fillPlaceholderAt(p, data.src, data.iw, data.ih)) insertImage(data.src, data.iw, data.ih, p, data.credit);
                } else if (data.kind === "svg") insertSvg(data.ref, p);
            } catch {
                /* nimic */
            }
            return;
        }
        const file = e.dataTransfer.files?.[0];
        if (file) {
            const { addAssetFromFile } = await import("./assets");
            try {
                const rec = await addAssetFromFile(file);
                const src = `asset:${rec.id}`;
                if (!fillPlaceholderAt(p, src, rec.w, rec.h)) insertImage(src, rec.w, rec.h, p);
                window.dispatchEvent(new Event("pe-assets-changed"));
            } catch (err) {
                alert(err instanceof Error ? err.message : "Nu am putut încărca fișierul.");
            }
        }
    };

    // ---------- desen ----------
    const b = doc.bleedMm;
    const pageLeft = pan.x - b * zoom;
    const pageTop = pan.y - b * zoom;
    const pageW = (doc.wMm + 2 * b) * zoom;
    const pageH = (doc.hMm + 2 * b) * zoom;
    const sel = selectedEls(doc, selection);
    const single = sel.length === 1 ? sel[0] : null;
    const sx = (mm: number) => pan.x + mm * zoom;
    const sy = (mm: number) => pan.y + mm * zoom;
    const bgHtml = useMemo(() => backgroundSvg(doc, SCREEN_CTX), [doc.background, doc.wMm, doc.hMm, doc.bleedMm]); // eslint-disable-line react-hooks/exhaustive-deps

    const selBox = sel.length > 1 ? unionBox(sel.map(aabb)) : null;
    const anyLocked = sel.some((x) => x.locked);

    const handlesFor = (bx: { x: number; y: number; w: number; h: number; rotation: number }, el: El | null) => {
        const isText = el?.type === "text";
        const isLine = el?.type === "shape" && el.shape === "line";
        const curved = isText && !!(el as TextEl).curve && Math.abs((el as TextEl).curve!) > 0.5;
        const autoFit = isText && (el as TextEl).autoFit;
        const list: Array<[number, number]> = [];
        for (const hx of [-1, 0, 1]) for (const hy of [-1, 0, 1]) {
            if (hx === 0 && hy === 0) continue;
            if (isLine && hy !== 0) continue;
            if (isLine && hx === 0) continue;
            if (isText && !autoFit && hy !== 0 && hx === 0) continue;
            if (curved && (hx === 0 || hy === 0)) continue;
            if (!el && (hx === 0 || hy === 0)) continue;
            list.push([hx, hy]);
        }
        const c = { x: sx(bx.x + bx.w / 2), y: sy(bx.y + bx.h / 2) };
        const a = (bx.rotation * Math.PI) / 180;
        const W = bx.w * zoom;
        const H = bx.h * zoom;
        return (
            <>
                {list.map(([hx, hy]) => {
                    const pnt = rot({ x: (hx * W) / 2, y: (hy * H) / 2 }, a);
                    const side = hx === 0 || hy === 0;
                    const hs = isMobile ? 20 : 10;
                    const wpx = side ? (hy === 0 ? hs * 0.7 : hs * 1.9) : hs;
                    const hpx = side ? (hx === 0 ? hs * 0.7 : hs * 1.9) : hs;
                    const cursor = side ? (hx === 0 ? "ns-resize" : "ew-resize") : hx === hy ? "nwse-resize" : "nesw-resize";
                    return (
                        <div
                            key={`${hx},${hy}`}
                            data-handle={`${hx},${hy}`}
                            className="absolute z-40 rounded-full border-[1.5px] border-[var(--pe-brand)] bg-[var(--pe-surface)] shadow"
                            style={{ left: c.x + pnt.x - wpx / 2, top: c.y + pnt.y - hpx / 2, width: wpx, height: hpx, cursor, transform: `rotate(${bx.rotation}deg)`, touchAction: "none" }}
                        />
                    );
                })}
                {(() => {
                    const pnt = rot({ x: 0, y: H / 2 + (isMobile ? 34 : 26) }, a);
                    const hs = isMobile ? 30 : 22;
                    return (
                        <div
                            data-handle="rot"
                            title="Rotește (Shift = pași de 15°)"
                            className="absolute z-40 flex items-center justify-center rounded-full border border-[var(--pe-border-strong)] bg-[var(--pe-surface)] text-[var(--pe-brand)] shadow"
                            style={{ left: c.x + pnt.x - hs / 2, top: c.y + pnt.y - hs / 2, width: hs, height: hs, cursor: "grab", touchAction: "none" }}
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: "none" }}>
                                <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
                                <path d="M21 3v5h-5" />
                            </svg>
                        </div>
                    );
                })()}
            </>
        );
    };

    const outline = (el: El, color: string, dashed = false, key?: string) => {
        const pts = corners(el).map(([x, y]) => `${sx(x)},${sy(y)}`).join(" ");
        return <polygon key={key ?? el.id} points={pts} fill="none" stroke={color} strokeWidth={dashed ? 1 : 1.5} strokeDasharray={dashed ? "4 3" : undefined} />;
    };

    // textarea pentru editarea textului pe loc
    const editing = editingTextId ? (doc.elements.find((x) => x.id === editingTextId) as TextEl | undefined) : undefined;

    // avertizare DPI pe poza selectată
    const dpiBadge = single?.type === "image" && !single.placeholder ? Math.round(imageDpi(single as ImageEl)) : null;

    return (
        <div
            ref={wrapRef}
            className="pe-stage relative h-full w-full select-none overflow-hidden"
            style={{ touchAction: "none", cursor: gesture.current?.kind === "pan" ? "grabbing" : undefined }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={() => setHoverId(null)}
            onDoubleClick={onDoubleClick}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            onContextMenu={(e) => e.preventDefault()}
        >
            {/* foaia */}
            <svg
                className="pe-artboard absolute"
                style={{ left: pageLeft, top: pageTop, background: "#fff" }}
                width={pageW}
                height={pageH}
                viewBox={`${-b} ${-b} ${doc.wMm + 2 * b} ${doc.hMm + 2 * b}`}
                data-page="1"
            >
                <g dangerouslySetInnerHTML={{ __html: bgHtml }} />
                {doc.elements.map((el) => (
                    <ElNode key={el.id} el={el} hidden={el.id === editingTextId} epoch={fontEpoch} />
                ))}
            </svg>

            {/* ghidaje: bleed, zona de tăiere, margine de siguranță */}
            <svg className="pointer-events-none absolute left-0 top-0 z-10" width={size.w} height={size.h}>
                {preview ? (
                    b > 0 && (
                        <path
                            d={`M${pageLeft} ${pageTop}h${pageW}v${pageH}h${-pageW}Z M${sx(0)} ${sy(0)}v${doc.hMm * zoom}h${doc.wMm * zoom}v${-doc.hMm * zoom}Z`}
                            fill="#e9e5dc"
                            fillRule="evenodd"
                        />
                    )
                ) : (
                    showGuides && (
                        <>
                            {b > 0 && (
                                <>
                                    <path d={`M${pageLeft} ${pageTop}h${pageW}v${pageH}h${-pageW}Z M${sx(0)} ${sy(0)}v${doc.hMm * zoom}h${doc.wMm * zoom}v${-doc.hMm * zoom}Z`} fill="var(--pe-guide-trim)" fillOpacity={0.09} fillRule="evenodd" />
                                    <rect x={sx(0)} y={sy(0)} width={doc.wMm * zoom} height={doc.hMm * zoom} fill="none" stroke="var(--pe-guide-trim)" strokeOpacity={0.85} strokeWidth={1} strokeDasharray="5 4" />
                                    <GuideLabel x={sx(0)} y={sy(0) - 20} color="var(--pe-guide-trim)" text={`tăiere · bleed ${doc.bleedMm} mm`} />
                                </>
                            )}
                            {noGo > 0 && noGo * zoom > 4 && (
                                <>
                                    <defs>
                                        <pattern id="pe-nogo" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                                            <rect width="8" height="8" fill="var(--pe-guide-nogo)" fillOpacity={0.08} />
                                            <line x1="0" y1="0" x2="0" y2="8" stroke="var(--pe-guide-nogo)" strokeOpacity={0.35} strokeWidth={2} />
                                        </pattern>
                                    </defs>
                                    <rect x={sx(0)} y={sy(doc.hMm - noGo)} width={doc.wMm * zoom} height={noGo * zoom} fill="url(#pe-nogo)" />
                                    <line x1={sx(0)} x2={sx(doc.wMm)} y1={sy(doc.hMm - noGo)} y2={sy(doc.hMm - noGo)} stroke="var(--pe-guide-nogo)" strokeWidth={1.25} strokeDasharray="6 4" />
                                    <GuideLabel x={sx(0) + 6} y={sy(doc.hMm - noGo) + 6} color="var(--pe-guide-nogo)" text={PRODUCT_ZONES[doc.productId]?.label ?? "zonă fără text"} />
                                </>
                            )}
                            {doc.safeMm > 0 && doc.safeMm * zoom > 3 && (
                                <>
                                    <rect x={sx(doc.safeMm)} y={sy(doc.safeMm)} width={(doc.wMm - 2 * doc.safeMm) * zoom} height={(doc.hMm - 2 * doc.safeMm) * zoom} rx={2} fill="none" stroke="var(--pe-guide-safe)" strokeOpacity={0.9} strokeWidth={1} strokeDasharray="2 4" strokeLinecap="round" />
                                    {doc.safeMm * zoom > 14 && <GuideLabel x={sx(doc.safeMm) + 6} y={sy(doc.hMm - Math.max(doc.safeMm, noGo)) - 22} color="var(--pe-guide-safe)" text="zonă sigură pentru text" />}
                                </>
                            )}
                        </>
                    )
                )}
                {/* contururi */}
                {!preview && hoverId && !selection.includes(hoverId) && (() => {
                    const h = doc.elements.find((x) => x.id === hoverId);
                    return h ? outline(h, "var(--pe-brand)", true, "hover") : null;
                })()}
                {!preview && sel.map((el) => outline(el, el.locked ? "#9aa5a0" : SEL, sel.length > 1))}
                {!preview && selBox && <rect x={sx(selBox.x)} y={sy(selBox.y)} width={selBox.w * zoom} height={selBox.h * zoom} fill="none" stroke={SEL} strokeWidth={1.5} />}
                {guides.map((g, i) =>
                    g.axis === "x" ? <line key={i} x1={sx(g.at)} x2={sx(g.at)} y1={0} y2={size.h} stroke="#e0218a" strokeWidth={1} /> : <line key={i} y1={sy(g.at)} y2={sy(g.at)} x1={0} x2={size.w} stroke="#e0218a" strokeWidth={1} />,
                )}
                {marquee && <rect x={sx(marquee.x)} y={sy(marquee.y)} width={marquee.w * zoom} height={marquee.h * zoom} fill={SEL} fillOpacity={0.08} stroke={SEL} strokeDasharray="4 3" />}
            </svg>

            {/* mânere */}
            {!preview && !editing && !anyLocked && single && handlesFor({ x: single.x, y: single.y, w: single.w, h: single.h, rotation: single.rotation || 0 }, single)}
            {!preview && !anyLocked && selBox && handlesFor({ ...selBox, rotation: 0 }, null)}
            {!preview && single && dpiBadge !== null && (
                <div
                    data-ui="1"
                    className="pointer-events-none absolute z-40 rounded-md px-1.5 py-0.5 text-[11px] font-bold text-white shadow"
                    style={{ left: sx(aabb(single).x), top: sy(aabb(single).y) - 24, background: dpiBadge >= 150 ? "#1f8a4c" : dpiBadge >= 100 ? "#d98a00" : "#c62828" }}
                >
                    {dpiBadge} DPI {dpiBadge >= 150 ? "· calitate bună" : dpiBadge >= 100 ? "· acceptabil" : "· prea mică"}
                </div>
            )}

            {editing && <TextEditor el={editing} zoom={zoom} sx={sx} sy={sy} />}

            {showRulers && !preview && <Rulers doc={doc} zoom={zoom} pan={pan} width={size.w} height={size.h} />}
        </div>
    );
}

function TextEditor({ el, zoom, sx, sy }: { el: TextEl; zoom: number; sx: (v: number) => number; sy: (v: number) => number }) {
    const ref = useRef<HTMLTextAreaElement>(null);
    const updateEls = useEditor((s) => s.updateEls);
    const setEditing = useEditor((s) => s.setEditingText);
    useEffect(() => {
        const t = ref.current;
        if (!t) return;
        t.focus();
        t.select();
    }, []);
    const l = layoutText(el);
    const fill = el.fill.kind === "solid" ? el.fill.color : el.fill.stops[0]?.color;
    const curved = !!el.curve && Math.abs(el.curve) > 0.5;
    const offY = el.autoFit ? Math.max(0, (el.h - l.height) / 2) : 0;
    return (
        <textarea
            ref={ref}
            data-ui="1"
            value={el.text}
            spellCheck={false}
            onChange={(e) => updateEls([el.id], { text: e.target.value } as Partial<El>, { history: `text-${el.id}` })}
            onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === "Escape") setEditing(null);
            }}
            onBlur={() => setEditing(null)}
            onPointerDown={(e) => e.stopPropagation()}
            className="absolute z-50 resize-none overflow-hidden border-0 bg-transparent p-0 outline outline-2 outline-[var(--pe-brand)]/60"
            style={{
                left: sx(el.x),
                top: sy(el.y + (curved ? el.h / 2 - l.lineHeightMm / 2 : offY)),
                width: el.w * zoom,
                height: (curved ? l.lineHeightMm : Math.max(l.height, l.lineHeightMm)) * zoom + 2,
                transform: `rotate(${el.rotation || 0}deg)`,
                transformOrigin: `${(el.w * zoom) / 2}px ${((curved ? l.lineHeightMm : el.h) * zoom) / 2}px`,
                fontFamily: `"${el.fontFamily}"`,
                fontWeight: el.fontWeight,
                fontStyle: el.italic ? "italic" : "normal",
                fontSize: l.fontSize * zoom,
                lineHeight: el.lineHeight,
                letterSpacing: `${el.letterSpacing / 1000}em`,
                textAlign: curved ? "center" : el.align,
                textTransform: el.uppercase ? "uppercase" : "none",
                textDecoration: [el.underline ? "underline" : "", el.strike ? "line-through" : ""].filter(Boolean).join(" ") || "none",
                color: fill,
                caretColor: SEL,
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                background: curved ? "rgba(255,255,255,.85)" : "transparent",
            }}
        />
    );
}
