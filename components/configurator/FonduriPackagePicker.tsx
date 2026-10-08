"use client";

// Pachetele de vizibilitate (Start / Complet / Construcții) și datele proiectului pentru machetă,
// afișate în FonduriEUConfigurator. Logica de preț e în lib/fonduriPackages.ts.

import React, { useMemo } from "react";
import { Check } from "lucide-react";
import { formatMoneyDisplay } from "@/lib/pricing";
import {
    FONDURI_PROJECT_FIELDS,
    fonduriPackageOffers,
    type FonduriPackage,
    type FonduriProjectData,
} from "@/lib/fonduriPackages";

type Theme = "light" | "dark";
type Accent = "emerald" | "amber";

const STYLES = {
    light: {
        box: "bg-white border border-gray-200",
        title: "text-slate-900",
        text: "text-gray-600",
        muted: "text-gray-500",
        card: "bg-white border-gray-200 hover:border-gray-400",
        input: "bg-white border-gray-300 text-gray-800",
    },
    dark: {
        box: "bg-slate-950 border border-slate-700",
        title: "text-white",
        text: "text-slate-300",
        muted: "text-slate-400",
        card: "bg-slate-900 border-slate-700 hover:border-slate-500",
        input: "bg-slate-950 border-slate-600 text-slate-200",
    },
} as const;

const ACCENTS = {
    emerald: { active: "border-emerald-600 ring-2 ring-emerald-500/40", badge: "bg-emerald-600 text-white", save: "text-emerald-600", ring: "focus:ring-emerald-500" },
    amber: { active: "border-amber-600 ring-2 ring-amber-500/40", badge: "bg-amber-600 text-white", save: "text-amber-600", ring: "focus:ring-amber-500" },
} as const;

export function FonduriPackagePicker({
    isRegio,
    activeId,
    onPick,
    theme = "light",
    accent = "emerald",
}: {
    isRegio: boolean;
    activeId?: string | null;
    onPick: (pkg: FonduriPackage) => void;
    theme?: Theme;
    accent?: Accent;
}) {
    const offers = useMemo(() => fonduriPackageOffers(isRegio), [isRegio]);
    const s = STYLES[theme];
    const a = ACCENTS[accent];

    return (
        <section className={`rounded-2xl p-4 mb-6 ${s.box}`} aria-label="Pachete de vizibilitate">
            <div className="flex items-baseline justify-between gap-2 mb-3">
                <h3 className={`text-base sm:text-lg font-extrabold ${s.title}`}>Alege un pachet</h3>
                <span className={`text-xs ${s.muted}`}>sau configurează mai jos element cu element</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {offers.map(({ pkg, separate, price, savings }) => {
                    const active = activeId === pkg.id;
                    return (
                        <button
                            key={pkg.id}
                            type="button"
                            onClick={() => onPick(pkg)}
                            aria-pressed={active}
                            className={`text-left rounded-xl border p-3 transition-all ${s.card} ${active ? a.active : ""}`}
                        >
                            <div className="flex items-center justify-between gap-2">
                                <span className={`font-bold text-sm ${s.title}`}>{pkg.name}</span>
                                {active && <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase rounded px-1.5 py-0.5 ${a.badge}`}><Check size={12} />Ales</span>}
                            </div>
                            <p className={`text-xs mt-0.5 ${s.muted}`}>{pkg.tagline}</p>
                            <ul className={`mt-2 space-y-0.5 text-xs ${s.text}`}>
                                {pkg.items.map((it) => <li key={it}>• {it}</li>)}
                            </ul>
                            <div className="mt-3">
                                <div className={`text-xs ${s.muted}`}>separat <s>{formatMoneyDisplay(separate)}</s></div>
                                <div className={`text-xl font-black ${s.title}`}>{formatMoneyDisplay(price)}</div>
                                {savings > 0 && <div className={`text-xs font-bold ${a.save}`}>economisești {formatMoneyDisplay(savings)}</div>}
                            </div>
                        </button>
                    );
                })}
            </div>
            <p className={`text-xs mt-3 ${s.muted}`}>
                {isRegio
                    ? "Prețuri Regio: comunicatul de presă Regio costă 690 lei (cu dovada celor 3.000 de vizitatori), deci pachetele sunt cu 200 lei mai mari pentru fiecare comunicat inclus."
                    : "Pentru Regio, comunicatul costă 690 lei, iar pachetele cresc cu 200 lei pentru fiecare comunicat inclus."}
                {" "}Machetă gratuită cu datele proiectului, verificată de noi după regulile programului.
            </p>
        </section>
    );
}

export function FonduriProjectFields({
    value,
    onChange,
    theme = "light",
    accent = "emerald",
}: {
    value: FonduriProjectData;
    onChange: (next: FonduriProjectData) => void;
    theme?: Theme;
    accent?: Accent;
}) {
    const s = STYLES[theme];
    const a = ACCENTS[accent];
    // Câmpurile principale sunt mereu vizibile; restul apar doar dacă au venit completate (ex. din /proiect/[cod]).
    const main = ["proiectCod", "proiectTitlu", "beneficiar"] as const;
    const extra = FONDURI_PROJECT_FIELDS.filter((f) => !(main as readonly string[]).includes(f.param) && value[f.param]);
    const fields = [...FONDURI_PROJECT_FIELDS.filter((f) => (main as readonly string[]).includes(f.param)), ...extra];

    return (
        <section className={`rounded-2xl p-4 mt-6 ${s.box}`} aria-label="Datele proiectului">
            <h3 className={`text-base font-extrabold ${s.title}`}>Datele proiectului pentru machetă</h3>
            <p className={`text-xs mb-3 ${s.muted}`}>Opțional acum — le putem prelua și după comandă. Macheta e gratuită și o trimitem spre aprobare înainte de tipar.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fields.map((f) => (
                    <label key={f.param} className={`block text-xs font-semibold ${f.param === "proiectTitlu" ? "sm:col-span-2" : ""} ${s.text}`}>
                        {f.label}
                        <input
                            type="text"
                            value={value[f.param] ?? ""}
                            maxLength={400}
                            onChange={(e) => onChange({ ...value, [f.param]: e.target.value })}
                            className={`mt-1 w-full p-2 border rounded-lg outline-none focus:ring-2 text-sm font-normal ${s.input} ${a.ring}`}
                        />
                    </label>
                ))}
            </div>
        </section>
    );
}

export default FonduriPackagePicker;
