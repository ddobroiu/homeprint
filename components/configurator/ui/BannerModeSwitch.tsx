"use client";

export type BannerProductMode = "single" | "double" | "mesh";
const options: { value: BannerProductMode; label: string }[] = [
    { value: "single", label: "O față" },
    { value: "double", label: "Față-verso" },
    { value: "mesh", label: "Mesh" },
];
export default function BannerModeSwitch({ value, onChange }: { value: BannerProductMode; onChange: (mode: BannerProductMode) => void }) {
    return <div role="group" aria-label="Tip banner" data-banner-mode-switch className="grid grid-cols-3 gap-1 rounded-lg border border-gray-300 bg-white p-1 shadow-sm">
        {options.map(option => <button key={option.value} type="button" aria-pressed={value === option.value} onClick={() => onChange(option.value)} className={`inline-flex min-h-11 items-center justify-center rounded-md px-3 py-2 text-sm font-semibold transition-colors ${value === option.value ? "bg-emerald-600 text-white shadow-md" : "text-gray-600 hover:bg-slate-50"}`}>{option.label}</button>)}
    </div>;
}
