"use client";
// Editorul rulează doar în browser (măsoară textul cu Canvas, folosește IndexedDB).
// Până se încarcă: un schelet cu aceeași structură (bară sus, unelte, planșă).
import dynamic from "next/dynamic";
import type { EditorProduct } from "@/lib/editor/types";
import "./editor.css";
import "./theme.css";

function Skeleton() {
    return (
        <div className="pe-theme fixed inset-0 z-[60] flex flex-col bg-[var(--pe-canvas)]" aria-busy="true" aria-label="Se încarcă editorul">
            <div className="flex h-[60px] items-center gap-3 border-b border-[var(--pe-border)] bg-[var(--pe-surface)] px-3">
                <div className="pe-skeleton h-8 w-8 !rounded-[10px]" />
                <div className="pe-skeleton h-9 w-40 !rounded-full" />
                <div className="flex-1" />
                <div className="pe-skeleton h-9 w-24" />
                <div className="pe-skeleton h-9 w-32" />
            </div>
            <div className="flex min-h-0 flex-1">
                <div className="hidden w-[80px] flex-col items-center gap-4 border-r border-[var(--pe-border)] bg-[var(--pe-surface)] py-4 md:flex">
                    {Array.from({ length: 7 }, (_, i) => (
                        <div key={i} className="pe-skeleton h-10 w-10 !rounded-[var(--pe-radius)]" />
                    ))}
                </div>
                <div className="pe-stage flex flex-1 items-center justify-center">
                    <div className="pe-skeleton aspect-[2/1] w-[min(70%,760px)] !rounded-sm" />
                </div>
            </div>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[13px] font-semibold text-[var(--pe-muted)]">Se încarcă editorul…</p>
        </div>
    );
}

const PrintEditor = dynamic(() => import("./PrintEditor"), { ssr: false, loading: () => <Skeleton /> });

export default function PrintEditorLoader({ products }: { products: EditorProduct[] }) {
    return <PrintEditor products={products} />;
}
