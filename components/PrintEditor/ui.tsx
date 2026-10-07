"use client";
// Componente mici de interfață pentru editor. Culorile vin din variabilele temei (editor.css).
import React, { useEffect, useRef, useState } from "react";
import type { Paint } from "@/lib/editor/types";

export function cx(...c: Array<string | false | null | undefined>) {
    return c.filter(Boolean).join(" ");
}

export const SWATCHES = [
    "#ffffff", "#f6f2eb", "#e9e4da", "#9aa5a0", "#4b5650", "#14211c", "#000000",
    "#075746", "#0a7a62", "#2a9d8f", "#8ecae6", "#219ebc", "#0b3d91", "#5b2bd6",
    "#ffd60a", "#f4a261", "#ff9a3c", "#e76f51", "#d62828", "#ff5f6d", "#ff7eb3",
    "#d8b45a", "#b88a2e", "#6d4c41", "#264653", "#c9d4ff", "#d9efe8", "#fde2e4",
];

export function IconBtn({ title, onClick, active, disabled, children, className }: { title: string; onClick?: () => void; active?: boolean; disabled?: boolean; children: React.ReactNode; className?: string }) {
    return (
        <button type="button" title={title} aria-label={title} aria-pressed={active} disabled={disabled} onClick={onClick} className={cx("pe-icon-btn", className)}>
            {children}
        </button>
    );
}

export function Section({ title, children, right }: { title?: string; children: React.ReactNode; right?: React.ReactNode }) {
    return (
        <div className="border-b border-[var(--pe-border)] px-4 py-3.5 last:border-b-0">
            {title && (
                <div className="mb-2.5 flex items-center justify-between">
                    <span className="pe-section-label">{title}</span>
                    {right}
                </div>
            )}
            {children}
        </div>
    );
}

/**
 * Meniu plutitor legat de un buton (bara contextuală). Poziționat `fixed`, ca să nu fie tăiat de
 * containerele cu scroll; pe ecrane mici se deschide deasupra butonului.
 */
export function Popover({ trigger, children, width = 280, title, align = "start" }: { trigger: (p: { open: boolean; toggle: () => void }) => React.ReactNode; children: React.ReactNode | ((close: () => void) => React.ReactNode); width?: number; title?: string; align?: "start" | "end" }) {
    const [open, setOpen] = useState(false);
    const [pos, setPos] = useState<{ left: number; top?: number; bottom?: number; maxH: number } | null>(null);
    const anchor = useRef<HTMLSpanElement>(null);
    const panel = useRef<HTMLDivElement>(null);
    const place = () => {
        const r = anchor.current?.getBoundingClientRect();
        if (!r) return;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const w = Math.min(width, vw - 16);
        const left = Math.max(8, Math.min(vw - w - 8, align === "end" ? r.right - w : r.left));
        if (r.top > vh * 0.55) setPos({ left, bottom: vh - r.top + 8, maxH: r.top - 16 });
        else setPos({ left, top: r.bottom + 8, maxH: vh - r.bottom - 16 });
    };
    useEffect(() => {
        if (!open) return;
        place();
        const out = (e: PointerEvent) => {
            const t = e.target as Node;
            if (panel.current?.contains(t) || anchor.current?.contains(t)) return;
            setOpen(false);
        };
        const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("pointerdown", out);
        window.addEventListener("keydown", esc);
        window.addEventListener("resize", place);
        return () => {
            window.removeEventListener("pointerdown", out);
            window.removeEventListener("keydown", esc);
            window.removeEventListener("resize", place);
        };
    }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
    const close = () => setOpen(false);
    return (
        <span ref={anchor} className="relative inline-flex">
            {trigger({ open, toggle: () => setOpen((o) => !o) })}
            {open && pos && (
                <div ref={panel} className="pe-pop pe-scroll fixed z-[3000] overflow-y-auto p-3" style={{ left: pos.left, top: pos.top, bottom: pos.bottom, width: Math.min(width, window.innerWidth - 16), maxHeight: pos.maxH }} role="dialog" aria-label={title}>
                    {title && <div className="pe-section-label mb-2.5">{title}</div>}
                    {typeof children === "function" ? children(close) : children}
                </div>
            )}
        </span>
    );
}

/** Pătrățel de culoare (plină sau gradient), folosit ca buton în bara contextuală. */
export function Swatch({ paint, size = 22, letter }: { paint: Paint | null | undefined; size?: number; letter?: string }) {
    if (letter)
        return (
            <span className="flex flex-col items-center leading-none" style={{ width: size }}>
                <span className="text-[15px] font-bold text-[var(--pe-text)]" style={{ fontFamily: "Georgia, serif" }}>
                    {letter}
                </span>
                <span className="mt-0.5 h-[5px] w-full rounded-full border border-black/10" style={{ background: paintCss(paint) }} />
            </span>
        );
    return <span className="inline-block shrink-0 rounded-md border border-black/15 shadow-[inset_0_0_0_1px_rgba(255,255,255,.4)]" style={{ width: size, height: size, background: paint ? paintCss(paint) : "repeating-conic-gradient(#ddd 0 25%, #fff 0 50%) 50%/8px 8px" }} />;
}

export function Slider({ label, value, min, max, step = 1, onChange, unit, commitKey }: { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number, key: string) => void; unit?: string; commitKey: string }) {
    const [text, setText] = useState(String(round(value, step)));
    useEffect(() => setText(String(round(value, step))), [value, step]);
    return (
        <label className="mb-2 block">
            <div className="mb-1 flex items-center justify-between text-[12px] text-[var(--pe-text-2)]">
                <span>{label}</span>
                <span className="flex items-center gap-1">
                    <input
                        className="w-14 rounded-md border border-[var(--pe-border)] bg-[var(--pe-surface)] px-1.5 py-0.5 text-right text-[12px]"
                        value={text}
                        inputMode="decimal"
                        onChange={(e) => setText(e.target.value)}
                        onBlur={() => {
                            const v = parseFloat(text.replace(",", "."));
                            if (Number.isFinite(v)) onChange(Math.max(min, Math.min(max, v)), commitKey);
                            else setText(String(round(value, step)));
                        }}
                        onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
                    />
                    {unit && <span className="text-[11px] text-[var(--pe-subtle)]">{unit}</span>}
                </span>
            </div>
            <input type="range" className="pe-range w-full" min={min} max={max} step={step} value={Math.max(min, Math.min(max, value))} onChange={(e) => onChange(Number(e.target.value), commitKey)} />
        </label>
    );
}

function round(v: number, step: number) {
    const d = step < 1 ? Math.min(3, Math.ceil(-Math.log10(step))) : 0;
    return Number(v.toFixed(d));
}

export function ColorInput({ value, onChange, commitKey, allowNone }: { value: string | null; onChange: (c: string | null, key: string) => void; commitKey: string; allowNone?: boolean }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!open) return;
        const h = (e: PointerEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        window.addEventListener("pointerdown", h);
        return () => window.removeEventListener("pointerdown", h);
    }, [open]);
    const [hex, setHex] = useState(value ?? "");
    useEffect(() => setHex(value ?? ""), [value]);
    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="flex h-9 w-full items-center gap-2 rounded-lg border border-[var(--pe-border)] bg-[var(--pe-surface)] px-2 text-[12px] text-[var(--pe-text)]"
                title="Alege culoarea"
            >
                <span className="h-5 w-5 shrink-0 rounded border border-black/10" style={{ background: value ?? "repeating-conic-gradient(#ddd 0 25%, #fff 0 50%) 50%/8px 8px" }} />
                <span className="font-mono">{value ?? "fără"}</span>
            </button>
            {open && (
                <div className="absolute left-0 z-50 mt-1 w-[232px] rounded-xl border border-[var(--pe-border)] bg-[var(--pe-surface)] p-3 shadow-xl">
                    <div className="grid grid-cols-7 gap-1.5">
                        {SWATCHES.map((c) => (
                            <button key={c} type="button" title={c} onClick={() => onChange(c, commitKey)} className={cx("h-6 w-6 rounded-md border", c === value ? "border-[var(--pe-brand)] ring-2 ring-[var(--pe-brand)]/30" : "border-black/10")} style={{ background: c }} />
                        ))}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                        <input type="color" value={/^#[0-9a-f]{6}$/i.test(value ?? "") ? value! : "#000000"} onChange={(e) => onChange(e.target.value, commitKey)} className="h-8 w-10 cursor-pointer rounded border border-[var(--pe-border)]" />
                        <input
                            value={hex}
                            onChange={(e) => setHex(e.target.value)}
                            onBlur={() => /^#[0-9a-f]{3,8}$/i.test(hex) && onChange(hex, commitKey)}
                            onKeyDown={(e) => e.key === "Enter" && /^#[0-9a-f]{3,8}$/i.test(hex) && onChange(hex, commitKey)}
                            className="h-8 flex-1 rounded-md border border-[var(--pe-border)] px-2 font-mono text-[12px]"
                        />
                        {allowNone && (
                            <button type="button" className="text-[11px] font-semibold text-[var(--pe-muted)] underline" onClick={() => onChange(null, commitKey)}>
                                fără
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export function paintFirstColor(p: Paint | null | undefined): string {
    if (!p) return "#000000";
    return p.kind === "solid" ? p.color : p.stops[0]?.color ?? "#000000";
}

export function paintCss(p: Paint | null | undefined): string {
    if (!p) return "transparent";
    if (p.kind === "solid") return p.color;
    const stops = p.stops.map((s) => `${s.color} ${Math.round(s.offset * 100)}%`).join(", ");
    return p.kind === "linear" ? `linear-gradient(${p.angle + 90}deg, ${stops})` : `radial-gradient(circle, ${stops})`;
}

/** Culoare plină sau gradient (2–3 culori + unghi). */
export function PaintInput({ value, onChange, commitKey, allowNone }: { value: Paint | null; onChange: (p: Paint | null, key: string) => void; commitKey: string; allowNone?: boolean }) {
    const mode = value?.kind ?? "none";
    return (
        <div>
            <div className="mb-2 flex gap-1 rounded-lg bg-[var(--pe-hover)] p-0.5 text-[12px] font-semibold">
                {allowNone && (
                    <button type="button" className={cx("flex-1 rounded-md py-1", mode === "none" && "bg-white shadow-sm")} onClick={() => onChange(null, commitKey)}>
                        Fără
                    </button>
                )}
                <button type="button" className={cx("flex-1 rounded-md py-1", mode === "solid" && "bg-white shadow-sm")} onClick={() => onChange({ kind: "solid", color: paintFirstColor(value) }, commitKey)}>
                    Culoare
                </button>
                <button
                    type="button"
                    className={cx("flex-1 rounded-md py-1", mode === "linear" && "bg-white shadow-sm")}
                    onClick={() => onChange(value?.kind === "linear" ? value : { kind: "linear", angle: 0, stops: [{ offset: 0, color: paintFirstColor(value) }, { offset: 1, color: "#ff5f6d" }] }, commitKey)}
                >
                    Gradient
                </button>
            </div>
            {value?.kind === "solid" && <ColorInput value={value.color} onChange={(c) => onChange(c ? { kind: "solid", color: c } : null, commitKey)} commitKey={commitKey} />}
            {value && value.kind !== "solid" && (
                <div className="space-y-2">
                    <div className="h-6 rounded-md border border-black/10" style={{ background: paintCss(value) }} />
                    <div className="grid grid-cols-2 gap-2">
                        {value.stops.map((s, i) => (
                            <ColorInput
                                key={i}
                                value={s.color}
                                commitKey={commitKey}
                                onChange={(c) => onChange({ ...value, stops: value.stops.map((x, j) => (j === i ? { ...x, color: c ?? x.color } : x)) }, commitKey)}
                            />
                        ))}
                    </div>
                    {value.kind === "linear" && <Slider label="Unghi" value={value.angle} min={0} max={360} onChange={(v, k) => onChange({ ...value, angle: v }, k)} unit="°" commitKey={`${commitKey}-angle`} />}
                </div>
            )}
        </div>
    );
}

export function Segmented<T extends string>({ value, options, onChange }: { value: T; options: Array<{ value: T; label: React.ReactNode; title?: string }>; onChange: (v: T) => void }) {
    return (
        <div className="flex gap-1 rounded-lg bg-[var(--pe-hover)] p-0.5">
            {options.map((o) => (
                <button key={o.value} type="button" title={o.title} aria-label={o.title} className={cx("flex h-8 flex-1 items-center justify-center rounded-md text-[12px] font-semibold", value === o.value ? "bg-white text-[var(--pe-brand)] shadow-sm" : "text-[var(--pe-text-2)]")} onClick={() => onChange(o.value)}>
                    {o.label}
                </button>
            ))}
        </div>
    );
}

export function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <label className="flex cursor-pointer items-center justify-between py-1 text-[13px] text-[var(--pe-text)]">
            <span>{label}</span>
            <span className={cx("relative h-5 w-9 rounded-full transition", checked ? "bg-[var(--pe-brand)]" : "bg-[var(--pe-border-strong)]")}>
                <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
                <span className={cx("absolute top-0.5 h-4 w-4 rounded-full bg-[var(--pe-surface)] shadow transition", checked ? "left-[18px]" : "left-0.5")} />
            </span>
        </label>
    );
}

export function Modal({ title, onClose, children, wide }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
    useEffect(() => {
        const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, [onClose]);
    return (
        <div className="fixed inset-0 z-[4000] flex items-end justify-center bg-[#0d1a15]/45 p-0 sm:items-center sm:p-6" onPointerDown={(e) => e.target === e.currentTarget && onClose()}>
            <div className={cx("max-h-[92svh] w-full overflow-auto rounded-t-2xl bg-[var(--pe-surface)] shadow-2xl sm:rounded-2xl", wide ? "sm:max-w-3xl" : "sm:max-w-lg")} role="dialog" aria-modal="true" aria-label={title}>
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--pe-border)] bg-[var(--pe-surface)] px-5 py-3.5">
                    <h2 className="text-[17px] font-bold text-[var(--pe-text)]" style={{ fontFamily: "Georgia, serif" }}>
                        {title}
                    </h2>
                    <button type="button" onClick={onClose} className="rounded-lg px-2 py-1 text-[20px] leading-none text-[var(--pe-muted)] hover:bg-[var(--pe-hover)]" aria-label="Închide">
                        ×
                    </button>
                </div>
                <div className="p-5">{children}</div>
            </div>
        </div>
    );
}
