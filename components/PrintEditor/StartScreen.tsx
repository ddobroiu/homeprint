"use client";
// Pasul de start: produsul și dimensiunea exactă (din registrele configuratoarelor) sau dimensiune liberă.
import React, { useMemo, useState } from "react";
import { ArrowRight, Box, Check, CreditCard, FileText, Flag, Grid3x3, Image as ImageIcon, Layers, Paintbrush, RotateCcw, ScrollText, Shirt, Sticker, AppWindow } from "lucide-react";
import { sizeLabel } from "@/lib/editor/doc";
import type { EditorProduct, EditorSize } from "@/lib/editor/types";
import type { SavedDesign } from "./assets";
import { cx } from "./ui";
import { EDITOR_BRAND } from "@/lib/editor/site";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    flag: Flag, grid: Grid3x3, scroll: ScrollText, file: FileText, layers: Layers, card: CreditCard, sticker: Sticker, image: ImageIcon, box: Box, window: AppWindow, brush: Paintbrush, shirt: Shirt,
};

function StepLabel({ n, children }: { n: number; children: React.ReactNode }) {
    return (
        <div className="mb-3 flex items-center gap-2 text-[13px] font-bold text-[var(--pe-text)]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--pe-brand)] text-[12px] text-[var(--pe-on-brand)]">{n}</span>
            {children}
        </div>
    );
}

export type FormatChoice = { product: EditorProduct; size: EditorSize | null; wMm: number; hMm: number };

export function FormatPicker({ products, initial, onPick, submitLabel }: { products: EditorProduct[]; initial?: { productId?: string; sizeKey?: string; wMm?: number; hMm?: number }; onPick: (c: FormatChoice) => void; submitLabel: string }) {
    const [pid, setPid] = useState(initial?.productId && products.some((p) => p.id === initial.productId) ? initial.productId : products[0]?.id);
    const product = products.find((p) => p.id === pid) ?? products[0];
    const initialSize = product.sizes.find((s) => s.key === initial?.sizeKey) ?? (initial?.wMm ? null : product.sizes[0]);
    const [sizeKey, setSizeKey] = useState<string | "custom">(initialSize ? initialSize.key : "custom");
    const [cw, setCw] = useState(String(initial?.wMm ? Math.round(initial.wMm / 10) : 100));
    const [ch, setCh] = useState(String(initial?.hMm ? Math.round(initial.hMm / 10) : 50));

    const size = sizeKey === "custom" ? null : product.sizes.find((s) => s.key === sizeKey) ?? null;
    const w = size ? size.wMm : (parseFloat(cw.replace(",", ".")) || 0) * 10;
    const h = size ? size.hMm : (parseFloat(ch.replace(",", ".")) || 0) * 10;
    const custom = product.custom;
    const valid = size ? true : !!custom && w >= custom.minCm * 10 && h >= custom.minCm * 10 && w <= custom.maxCm * 10 && h <= custom.maxCm * 10;

    const pickProduct = (p: EditorProduct) => {
        setPid(p.id);
        setSizeKey(p.sizes[0]?.key ?? "custom");
    };
    const preview = useMemo(() => {
        const max = 120;
        const k = max / Math.max(w || 1, h || 1);
        return { w: Math.max(8, (w || 1) * k), h: Math.max(8, (h || 1) * k) };
    }, [w, h]);

    return (
        <div>
            <StepLabel n={1}>Ce vrei să tipărești?</StepLabel>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
                {products.map((p) => {
                    const Icon = ICONS[p.icon] ?? Box;
                    const on = p.id === pid;
                    return (
                        <button key={p.id} type="button" onClick={() => pickProduct(p)} aria-pressed={on} className="pe-card group text-left">
                            <div className={cx("pe-card-media relative aspect-[4/3] bg-[var(--pe-surface-2)]", on && "!shadow-[0_0_0_2px_var(--pe-brand),var(--pe-shadow)]")}>
                                {p.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]" />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-[var(--pe-brand)]">
                                        <Icon className="h-8 w-8" />
                                    </div>
                                )}
                                {on && (
                                    <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--pe-brand)] text-[var(--pe-on-brand)] shadow">
                                        <Check className="h-3 w-3" strokeWidth={3} />
                                    </span>
                                )}
                            </div>
                            <div className="mt-1.5 flex items-center gap-1.5 px-0.5">
                                <Icon className={cx("h-3.5 w-3.5 shrink-0", on ? "text-[var(--pe-brand)]" : "text-[var(--pe-subtle)]")} />
                                <span className={cx("truncate text-[12.5px] font-semibold", on ? "text-[var(--pe-brand)]" : "text-[var(--pe-text)]")}>{p.label}</span>
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_200px]">
                <div>
                    <StepLabel n={2}>Dimensiunea</StepLabel>
                    <div className="flex flex-wrap gap-2">
                        {product.sizes.map((s) => (
                            <button key={s.key} type="button" onClick={() => setSizeKey(s.key)} className={cx("rounded-full border px-3.5 py-1.5 text-[13px] font-semibold", s.key === sizeKey ? "border-[var(--pe-brand)] bg-[var(--pe-brand)] text-[var(--pe-on-brand)]" : "border-[var(--pe-border)] bg-[var(--pe-surface)] text-[var(--pe-text)] hover:border-[var(--pe-brand)]")}>
                                {s.label}
                            </button>
                        ))}
                        {custom && (
                            <button type="button" onClick={() => setSizeKey("custom")} className={cx("rounded-full border px-3.5 py-1.5 text-[13px] font-semibold", sizeKey === "custom" ? "border-[var(--pe-brand)] bg-[var(--pe-brand)] text-[var(--pe-on-brand)]" : "border-dashed border-[var(--pe-subtle)] bg-[var(--pe-surface)] text-[var(--pe-text)]")}>
                                Dimensiune personalizată
                            </button>
                        )}
                    </div>
                    {sizeKey === "custom" && custom && (
                        <div className="mt-3 flex flex-wrap items-end gap-3">
                            <label className="text-[12px] font-semibold text-[var(--pe-text-2)]">
                                Lățime (cm)
                                <input value={cw} onChange={(e) => setCw(e.target.value.replace(/[^\d.,]/g, ""))} inputMode="decimal" className="mt-1 block h-10 w-28 rounded-lg border border-[var(--pe-border)] bg-[var(--pe-surface)] px-3 text-[15px] font-bold" />
                            </label>
                            <span className="pb-2 text-[var(--pe-subtle)]">×</span>
                            <label className="text-[12px] font-semibold text-[var(--pe-text-2)]">
                                Înălțime (cm)
                                <input value={ch} onChange={(e) => setCh(e.target.value.replace(/[^\d.,]/g, ""))} inputMode="decimal" className="mt-1 block h-10 w-28 rounded-lg border border-[var(--pe-border)] bg-[var(--pe-surface)] px-3 text-[15px] font-bold" />
                            </label>
                            <button
                                type="button"
                                title="Inversează"
                                onClick={() => {
                                    setCw(ch);
                                    setCh(cw);
                                }}
                                className="mb-0.5 rounded-lg border border-[var(--pe-border)] bg-[var(--pe-surface)] p-2.5"
                            >
                                <RotateCcw className="h-4 w-4" />
                            </button>
                            <span className="pb-2 text-[11px] text-[var(--pe-subtle)]">
                                între {custom.minCm} și {custom.maxCm} cm
                            </span>
                        </div>
                    )}
                    <p className="mt-3 text-[12px] leading-snug text-[var(--pe-muted)]">
                        {product.bleedMm ? `Bleed ${product.bleedMm} mm pe fiecare latură (zona care se taie). ` : ""}
                        {product.note ?? `Margine de siguranță ${String(product.safeMm / 10).replace(".", ",")} cm.`}
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--pe-border)] bg-[var(--pe-surface)] p-4">
                    <div className="flex h-[130px] items-center justify-center">
                        <div className="rounded-sm border border-[var(--pe-border-strong)] bg-[var(--pe-bg)] shadow-sm" style={{ width: preview.w, height: preview.h }} />
                    </div>
                    <div className="mt-2 text-[13px] font-bold text-[var(--pe-text)]">{w && h ? sizeLabel(w, h) : "—"}</div>
                </div>
            </div>

            <button
                type="button"
                disabled={!valid}
                onClick={() => onPick({ product, size, wMm: w, hMm: h })}
                className="sticky bottom-3 z-10 mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--pe-brand)] px-6 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-[var(--pe-brand)]/20 transition hover:bg-[var(--pe-brand-strong)] disabled:opacity-40 sm:static sm:w-auto"
            >
                {submitLabel}: {product.label} {w && h ? sizeLabel(w, h) : ""}
                <ArrowRight className="h-4 w-4" />
            </button>
        </div>
    );
}

export default function StartScreen({ products, onPick, draft, onResume, designs, onOpenDesign }: { products: EditorProduct[]; onPick: (c: FormatChoice) => void; draft: { label: string; at: number } | null; onResume: () => void; designs: SavedDesign[]; onOpenDesign: (d: SavedDesign) => void }) {
    return (
        <div className="pe-theme min-h-[100svh] overflow-auto bg-[var(--pe-bg)]">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
                <a href={EDITOR_BRAND.href} className="text-[13px] font-semibold text-[var(--pe-brand)] hover:underline">
                    ← {EDITOR_BRAND.name}
                </a>
                <h1 className="mt-4 text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[var(--pe-text)] sm:text-[46px]" style={{ fontFamily: "var(--pe-font-display)" }}>
                    Creează designul online
                </h1>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[var(--pe-muted)]">
                    Șabloane gata făcute, 44 de fonturi cu diacritice, forme, iconițe și pozele tale. Lucrezi la dimensiunea reală, cu zona de tăiere marcată, iar la final primești fișierul de tipar sau îl trimiți direct în comandă.
                </p>
                {(draft || designs.length > 0) && (
                    <div className="mt-6 flex flex-wrap gap-3">
                        {draft && (
                            <button type="button" onClick={onResume} className="rounded-2xl border border-[var(--pe-brand)] bg-[var(--pe-surface)] px-4 py-3 text-left hover:bg-[var(--pe-brand-soft)]">
                                <div className="text-[14px] font-bold text-[var(--pe-brand-strong)]">Continuă designul început</div>
                                <div className="text-[12px] text-[var(--pe-muted)]">
                                    {draft.label} · {new Date(draft.at).toLocaleString("ro-RO")}
                                </div>
                            </button>
                        )}
                        {designs.slice(0, 4).map((d) => (
                            <button key={d.id} type="button" onClick={() => onOpenDesign(d)} className="flex items-center gap-3 rounded-2xl border border-[var(--pe-border)] bg-[var(--pe-surface)] px-3 py-2 text-left hover:border-[var(--pe-brand)]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={d.thumb} alt="" className="h-10 w-14 rounded object-cover" />
                                <div>
                                    <div className="max-w-[160px] truncate text-[13px] font-bold">{d.name}</div>
                                    <div className="text-[11px] text-[var(--pe-subtle)]">salvat {new Date(d.savedAt).toLocaleDateString("ro-RO")}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
                <div className="mt-8 rounded-[calc(var(--pe-radius)*2)] border border-[var(--pe-border)] bg-[var(--pe-surface)] p-5 shadow-[var(--pe-shadow-lg)] sm:p-8">
                    <FormatPicker products={products} onPick={onPick} submitLabel="Începe designul" />
                </div>
            </div>
        </div>
    );
}
