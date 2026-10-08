"use client";

// Configuratorul comun pentru produsele noi (calendare, steaguri beachflag, X-banner, panou stradal).
// Opțiunile, prețul și linia din coș vin din lib/produseNoi/definitions.ts (aceleași funcții ca feedul Merchant).

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Check, Info, MessageCircle, ShoppingCart, Truck, UploadCloud, X } from "lucide-react";
import { useCart } from "@/components/CartContext";
import DeliveryEstimation from "./DeliveryEstimation";
import FaqAccordion from "./FaqAccordion";
import { AccordionStep } from "./ui/AccordionStep";
import { NumberInput } from "./ui/NumberInput";
import { formatMoneyDisplay } from "@/lib/pricing";
import { VAT_NOTE } from "@/lib/company";
import { PRODUSE_NOI, type PNState, type ProdusNouId } from "@/lib/produseNoi/definitions";

type Props = { productId: ProdusNouId; showContent?: boolean };

export default function ProdusNouConfigurator({ productId, showContent = true }: Props) {
    const def = PRODUSE_NOI[productId];
    const searchParams = useSearchParams();
    const { addItem } = useCart();

    const [state, setState] = useState<PNState>(() => def.initial(searchParams));
    const [activeStep, setActiveStep] = useState(1);
    const [activeIndex, setActiveIndex] = useState(0);
    const [artworkUrl, setArtworkUrl] = useState<string | null>(null);
    const [artworkName, setArtworkName] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [added, setAdded] = useState(false);
    const [tab, setTab] = useState<"descriere" | "faq">("descriere");
    const [detailsOpen, setDetailsOpen] = useState(false);

    const groups = useMemo(() => def.groups(state), [def, state]);
    const price = useMemo(() => def.price(state), [def, state]);
    const qtyRange = def.qty(state);
    const gallery = useMemo(() => def.gallery(state), [def, state]);
    const hasArtwork = def.hasArtwork(state);
    const artCm = def.artworkCm(state);
    const galleryKey = gallery.join("|");

    useEffect(() => setActiveIndex(0), [galleryKey]);

    const setOption = (id: string, value: string) => {
        setAdded(false);
        setState((prev) => def.normalize({ ...prev, [id]: /^\d+$/.test(value) && id === "afise" ? Number(value) : value }));
    };
    const setQty = (q: number) => {
        setAdded(false);
        setState((prev) => def.normalize({ ...prev, quantity: q }));
    };
    const setDesign = (opt: "upload" | "pro") => {
        setAdded(false);
        setState((prev) => ({ ...prev, designOption: opt }));
    };

    async function handleUpload(file: File | null) {
        setArtworkUrl(null);
        setArtworkName(null);
        setUploadError(null);
        if (!file) return;
        try {
            setUploading(true);
            const form = new FormData();
            form.append("file", file);
            const res = await fetch("/api/upload", { method: "POST", body: form });
            if (!res.ok) throw new Error("Încărcarea a eșuat. Încearcă din nou sau trimite fișierul pe e-mail după comandă.");
            const data = await res.json();
            setArtworkUrl(data.url);
            setArtworkName(file.name);
        } catch (e: any) {
            setUploadError(e?.message ?? "Eroare la încărcare");
        } finally {
            setUploading(false);
        }
    }

    function handleAddToCart() {
        if (!(price.finalPrice > 0)) return;
        const line = def.cart(state);
        const designOption = hasArtwork ? state.designOption : "none";
        const grafica = !hasArtwork ? "Fără grafică" : state.designOption === "pro" ? "Realizată de noi (Design Pro)" : artworkUrl ? "Grafică proprie (încărcată)" : "Grafică proprie (o trimit după comandă)";
        addItem({
            id: `${def.id}-${Date.now()}`,
            productId: def.id,
            slug: def.id,
            title: line.title,
            image: line.image,
            price: Math.round((price.finalPrice / state.quantity) * 100) / 100,
            quantity: state.quantity,
            metadata: {
                ...line.metadata,
                Grafică: grafica,
                ...(hasArtwork && state.designOption === "pro" ? { "Cost grafică": formatMoneyDisplay(def.proFee) } : {}),
                designOption,
                artworkUrl: hasArtwork && state.designOption === "upload" ? artworkUrl : null,
            },
        });
        setAdded(true);
    }

    const contactHref = `https://wa.me/40750473111?text=${encodeURIComponent(`Bună ziua, mă interesează: ${def.name} (${def.summary(state)})`)}`;

    return (
        <main className="bg-slate-50 dark:bg-slate-800 min-h-screen" data-produs-nou={def.id}>
            <div className="container mx-auto px-4 py-6 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* STÂNGA: poze */}
                    <div className="lg:sticky top-24 h-max space-y-4">
                        <div className="bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-gray-200 overflow-hidden">
                            <div className="aspect-square relative flex items-center justify-center p-4 bg-white">
                                <Image
                                    src={gallery[Math.min(activeIndex, gallery.length - 1)]}
                                    alt={`${def.name} – ${def.summary(state)}`}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />
                            </div>
                            {gallery.length > 1 && (
                                <div className="p-2 grid grid-cols-4 gap-2 border-t border-gray-100">
                                    {gallery.slice(0, 4).map((src, i) => (
                                        <button
                                            key={src}
                                            type="button"
                                            onClick={() => setActiveIndex(i)}
                                            aria-label={`Poza ${i + 1}`}
                                            className={`relative rounded-lg aspect-square overflow-hidden border-2 bg-white transition-all ${activeIndex === i ? "border-emerald-600 shadow-md" : "border-transparent opacity-70 hover:opacity-100"}`}
                                        >
                                            <Image src={src} alt="" fill className="object-contain" sizes="120px" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {artCm && hasArtwork && (
                            <p className="text-xs text-slate-500 text-center">
                                Dimensiunea graficii: <strong>{String(Math.round(artCm.w * 10) / 10).replace(".", ",")} × {String(Math.round(artCm.h * 10) / 10).replace(".", ",")} cm</strong> (+3 mm margine de tăiere)
                            </p>
                        )}
                    </div>

                    {/* DREAPTA: configurator */}
                    <div>
                        <header className="mb-5">
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Configurator {def.name}</h2>
                            <div className="flex justify-between items-start gap-3">
                                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{def.subtitle}</p>
                                <button type="button" onClick={() => setDetailsOpen(true)} className="shrink-0 inline-flex items-center text-sm px-3 py-1.5 border border-gray-300 rounded hover:bg-slate-50 text-gray-700 font-medium">
                                    <Info size={16} />
                                    <span className="ml-2">Detalii</span>
                                </button>
                            </div>
                        </header>

                        <div className="bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-gray-200 px-4">
                            <AccordionStep stepNumber={1} title="Alege varianta" summary={def.summary(state)} isOpen={activeStep === 1} onClick={() => setActiveStep(1)}>
                                <div className="space-y-5">
                                    {groups.map((g) => (
                                        <fieldset key={g.id} data-group={g.id}>
                                            <legend className="block text-sm font-bold text-gray-700 mb-2">{g.label}</legend>
                                            <div className={`grid gap-2 ${g.cols === 4 ? "grid-cols-2 sm:grid-cols-4" : g.cols === 3 ? "grid-cols-1 min-[420px]:grid-cols-3" : "grid-cols-2"}`}>
                                                {g.choices.map((c) => {
                                                    const selected = String(state[g.id]) === c.value;
                                                    return (
                                                        <button
                                                            key={c.value}
                                                            type="button"
                                                            aria-pressed={selected}
                                                            data-value={c.value}
                                                            onClick={() => setOption(g.id, c.value)}
                                                            className={`relative p-3 border-2 rounded-lg text-left transition-all ${selected ? "border-emerald-600 bg-emerald-50 text-emerald-800 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300 text-slate-800"}`}
                                                        >
                                                            {selected && <Check size={14} className="absolute top-2 right-2 text-emerald-600" />}
                                                            <span className="block font-bold text-sm leading-tight pr-4">{c.label}</span>
                                                            {c.sub && <span className="block text-[11px] text-gray-500 mt-0.5 leading-snug">{c.sub}</span>}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            {g.help && <p className="text-xs text-gray-500 mt-1.5 italic">{g.help}</p>}
                                        </fieldset>
                                    ))}
                                    <button type="button" onClick={() => setActiveStep(2)} className="text-sm font-bold text-emerald-700 underline underline-offset-2">
                                        Mai departe: cantitatea
                                    </button>
                                </div>
                            </AccordionStep>

                            <AccordionStep stepNumber={2} title="Cantitate" summary={`${state.quantity} buc.`} isOpen={activeStep === 2} onClick={() => setActiveStep(2)} isLast={!hasArtwork}>
                                <div className="space-y-3">
                                    <NumberInput label="Cantitate (buc)" value={state.quantity} onChange={setQty} min={qtyRange.min} />
                                    <div className="flex flex-wrap gap-2">
                                        {qtyRange.presets.map((q) => (
                                            <button
                                                key={q}
                                                type="button"
                                                onClick={() => setQty(q)}
                                                className={`px-3 py-1.5 rounded-full text-xs font-bold border ${state.quantity === q ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-700 border-gray-200 hover:border-gray-300"}`}
                                            >
                                                {q} buc
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        {qtyRange.min > 1 ? `Comanda minimă: ${qtyRange.min} buc. ` : ""}
                                        Maxim {qtyRange.max} buc. pe comandă online; pentru cantități mai mari cere o ofertă. Prețul pe bucată scade la tiraje mai mari.
                                    </p>
                                </div>
                            </AccordionStep>

                            {hasArtwork && (
                                <AccordionStep
                                    stepNumber={3}
                                    title="Grafică"
                                    summary={state.designOption === "pro" ? "Realizată de noi" : artworkName ? `Fișier: ${artworkName}` : "Grafica ta"}
                                    isOpen={activeStep === 3}
                                    onClick={() => setActiveStep(3)}
                                    isLast
                                >
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                type="button"
                                                aria-pressed={state.designOption === "upload"}
                                                onClick={() => setDesign("upload")}
                                                className={`p-3 border-2 rounded-lg text-left ${state.designOption === "upload" ? "border-emerald-600 bg-emerald-50" : "border-gray-200 bg-white"}`}
                                            >
                                                <span className="block font-bold text-sm">Am grafica mea</span>
                                                <span className="block text-[11px] text-gray-500">o încarc acum sau o trimit după comandă</span>
                                            </button>
                                            <button
                                                type="button"
                                                aria-pressed={state.designOption === "pro"}
                                                onClick={() => setDesign("pro")}
                                                className={`p-3 border-2 rounded-lg text-left ${state.designOption === "pro" ? "border-emerald-600 bg-emerald-50" : "border-gray-200 bg-white"}`}
                                            >
                                                <span className="block font-bold text-sm">Grafică realizată de noi</span>
                                                <span className="block text-[11px] text-gray-500">+{formatMoneyDisplay(def.proFee)} o dată pe comandă</span>
                                            </button>
                                        </div>
                                        {state.designOption === "upload" ? (
                                            <label className="flex flex-col items-center justify-center gap-2 p-5 border-2 border-dashed border-gray-300 rounded-xl bg-slate-50 cursor-pointer hover:border-emerald-500">
                                                <UploadCloud className="text-emerald-600" />
                                                <span className="text-sm font-bold text-slate-700">{uploading ? "Se încarcă…" : artworkName ? `Încărcat: ${artworkName}` : "Alege fișierul (PDF, JPG, PNG, TIFF)"}</span>
                                                <span className="text-xs text-gray-500 text-center">
                                                    {artCm ? `La ${String(Math.round(artCm.w * 10) / 10).replace(".", ",")} × ${String(Math.round(artCm.h * 10) / 10).replace(".", ",")} cm, 150–300 dpi. ` : ""}
                                                    Îl verificăm înainte de tipar și te anunțăm dacă trebuie ajustat.
                                                </span>
                                                <input type="file" className="sr-only" accept=".pdf,.jpg,.jpeg,.png,.tif,.tiff,.ai,.eps,.cdr" onChange={(e) => handleUpload(e.target.files?.[0] ?? null)} />
                                            </label>
                                        ) : (
                                            <p className="text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-3">
                                                După comandă, graficianul te contactează pentru texte, logo și fotografii și îți trimite macheta spre aprobare înainte de tipar.
                                            </p>
                                        )}
                                        {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
                                    </div>
                                </AccordionStep>
                            )}
                        </div>

                        {/* TOTAL */}
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] p-4 lg:p-6 mt-6" data-testid="produs-nou-total">
                            <ul className="text-sm text-slate-600 space-y-1 mb-3">
                                {price.lines.map((l) => (
                                    <li key={l.label} className="flex justify-between gap-3">
                                        <span>
                                            {l.label}
                                            {l.qty > 1 ? ` × ${l.qty}` : ""}
                                        </span>
                                        <span className="font-semibold text-slate-800 whitespace-nowrap">{formatMoneyDisplay(l.total)}</span>
                                    </li>
                                ))}
                                {price.designFee > 0 && (
                                    <li className="flex justify-between gap-3">
                                        <span>Grafică realizată de noi</span>
                                        <span className="font-semibold text-slate-800">{formatMoneyDisplay(price.designFee)}</span>
                                    </li>
                                )}
                            </ul>
                            <div className="flex flex-row justify-between items-end gap-2 pt-3 border-t border-gray-100">
                                <div className="flex flex-col items-start leading-none">
                                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Preț total</span>
                                    <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter" data-testid="produs-nou-pret">
                                        {formatMoneyDisplay(price.finalPrice)}
                                    </span>
                                    <span className="text-xs text-gray-500 mt-1">
                                        {formatMoneyDisplay(Math.round((price.finalPrice / state.quantity) * 100) / 100)} / buc · {VAT_NOTE}
                                    </span>
                                </div>
                                <div className="shrink-0">
                                    <DeliveryEstimation />
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-3">{def.includes(state)}</p>
                            {def.notes(state).map((n) => (
                                <p key={n} className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-2 py-1.5 mt-2 flex gap-1.5">
                                    <Truck size={14} className="shrink-0 mt-0.5" />
                                    <span>{n}</span>
                                </p>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                className="w-full mt-4 py-4 text-lg font-bold bg-emerald-600 text-white rounded-xl shadow-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 active:scale-95"
                            >
                                <ShoppingCart size={22} />
                                Adaugă în coș
                            </button>
                            {added && (
                                <p className="text-sm text-emerald-700 font-semibold mt-2 text-center" role="status">
                                    Adăugat în coș. <a href="/cart" className="underline">Vezi coșul</a>
                                </p>
                            )}
                        </div>

                        <div className="mt-4 bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl border border-slate-200 p-4">
                            <p className="text-xs text-gray-600 mb-3 text-center font-medium">Ai nevoie de altă variantă sau de o ofertă pentru cantități mari?</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <a href={contactHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md">
                                    <MessageCircle size={18} />
                                    <span className="text-sm">WhatsApp</span>
                                </a>
                                <a href="/contact" className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md">
                                    <Info size={18} />
                                    <span className="text-sm">Cerere ofertă</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {showContent && (
                    <div className="mt-8 lg:mt-12 bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-gray-200 overflow-hidden">
                        <nav className="border-b border-gray-200 flex">
                            {(["descriere", "faq"] as const).map((t) => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setTab(t)}
                                    className={`px-5 py-3 text-sm font-bold border-b-2 ${tab === t ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-500"}`}
                                >
                                    {t === "descriere" ? "Descriere" : "Întrebări frecvente"}
                                </button>
                            ))}
                        </nav>
                        <div className="p-6 lg:p-8 text-gray-700 text-sm sm:text-base">
                            {tab === "descriere" ? (
                                <div className="space-y-6">
                                    <p className="leading-relaxed">{def.content.intro}</p>
                                    {def.content.sections.map((sec) => (
                                        <section key={sec.h}>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">{sec.h}</h3>
                                            {sec.p?.map((p) => (
                                                <p key={p.slice(0, 40)} className="leading-relaxed mb-2">
                                                    {p}
                                                </p>
                                            ))}
                                            {sec.ul && (
                                                <ul className="list-disc pl-5 space-y-1.5">
                                                    {sec.ul.map((li) => (
                                                        <li key={li.slice(0, 40)}>{li}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </section>
                                    ))}
                                </div>
                            ) : (
                                <FaqAccordion qa={def.content.faqs} />
                            )}
                        </div>
                    </div>
                )}
            </div>

            {detailsOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setDetailsOpen(false)}>
                    <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
                        <button className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100" onClick={() => setDetailsOpen(false)} aria-label="Închide">
                            <X size={20} />
                        </button>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 pr-8">Detalii tehnice: {def.name}</h3>
                        <div className="space-y-4 text-sm text-gray-700">
                            {def.content.sections.map((sec) => (
                                <div key={sec.h}>
                                    <h4 className="font-bold text-slate-900 mb-1">{sec.h}</h4>
                                    {sec.p?.map((p) => (
                                        <p key={p.slice(0, 40)}>{p}</p>
                                    ))}
                                    {sec.ul && (
                                        <ul className="list-disc pl-5 space-y-1">
                                            {sec.ul.map((li) => (
                                                <li key={li.slice(0, 40)}>{li}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
