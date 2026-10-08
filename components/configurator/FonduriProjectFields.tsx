"use client";

// Datele proiectului pentru machetă (cod SMIS, titlu, beneficiar...), afișate în FonduriEUConfigurator.
// Pot veni completate din adresă (ex. din /proiect/[cod]) și ajung în coș la „Date proiect”.

import React from "react";
import { FONDURI_PROJECT_FIELDS, type FonduriProjectData } from "@/lib/fonduriProject";

type Theme = "light" | "dark";
type Accent = "emerald" | "amber";

const STYLES = {
    light: {
        box: "bg-white border border-gray-200",
        title: "text-slate-900",
        text: "text-gray-600",
        muted: "text-gray-500",
        input: "bg-white border-gray-300 text-gray-800",
    },
    dark: {
        box: "bg-slate-950 border border-slate-700",
        title: "text-white",
        text: "text-slate-300",
        muted: "text-slate-400",
        input: "bg-slate-950 border-slate-600 text-slate-200",
    },
} as const;

const RINGS = {
    emerald: "focus:ring-emerald-500",
    amber: "focus:ring-amber-500",
} as const;

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
    const ring = RINGS[accent];
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
                            className={`mt-1 w-full p-2 border rounded-lg outline-none focus:ring-2 text-sm font-normal ${s.input} ${ring}`}
                        />
                    </label>
                ))}
            </div>
        </section>
    );
}

export default FonduriProjectFields;
