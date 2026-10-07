"use client";

import Link from "next/link";
import { ChevronRight, PenTool } from "lucide-react";

/** Produsul din configurator -> id-ul produsului din editorul online (lib/editor/products.ts). */
const EDITOR_PRODUCT: Record<string, string> = { flyere: "flayere", flyers: "flayere", forex: "pvc-forex", acrylic: "plexiglass", hanorace: "tricouri" };

export function editorHref(product: string, widthCm?: number, heightCm?: number, size?: string): string {
    const p = new URLSearchParams({ product: EDITOR_PRODUCT[product] ?? product });
    if (size) p.set("size", size);
    else if (widthCm && heightCm) {
        p.set("w", String(Math.round(widthCm * 10) / 10));
        p.set("h", String(Math.round(heightCm * 10) / 10));
    }
    return `/editor?${p.toString()}`;
}

const cm = (v: number) => String(Math.round(v * 10) / 10).replace(".", ",");

/**
 * „Creează design online” — deschide editorul la dimensiunea (sau formatul) din configurator.
 * Culorile vin din tokenii brandului site-ului (--design-accent / --design-soft din app/brand-design.css).
 */
export function EditorOnlineEntry({ product, widthCm, heightCm, size, className = "" }: { product: string; widthCm?: number; heightCm?: number; size?: string; className?: string }) {
    const at = size ? ` — direct pe formatul ${size}` : widthCm && heightCm ? ` — direct la ${cm(widthCm)}×${cm(heightCm)} cm` : "";
    return (
        <Link
            href={editorHref(product, widthCm, heightCm, size)}
            className={`group flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 border-[color:var(--design-line,#dce3e9)] bg-[color:var(--design-soft,#eaf0fa)] px-4 py-3 transition hover:border-[color:var(--design-accent,#254d8b)] hover:shadow-md ${className}`}
        >
            <span className="flex min-w-[13rem] flex-1 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color:var(--design-accent,#254d8b)] text-white shadow-md">
                    <PenTool className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                    <span className="block text-sm font-black tracking-tight text-[color:var(--design-ink,#172534)]">Creează design online</span>
                    <span className="block text-[11px] leading-snug text-[color:var(--design-muted,#586575)]">
                        Șabloane, texte cu fonturi profesionale, forme și pozele tale{at}.
                    </span>
                </span>
            </span>
            <span className="inline-flex w-full shrink-0 items-center justify-center gap-1 rounded-lg sm:w-auto bg-[color:var(--design-accent,#254d8b)] px-3 py-2 text-sm font-bold text-white group-hover:brightness-110">
                Deschide editorul
                <ChevronRight className="h-4 w-4" />
            </span>
        </Link>
    );
}
