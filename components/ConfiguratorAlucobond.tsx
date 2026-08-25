"use client";
import React, { useMemo, useState, useEffect } from "react";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/ToastProvider";
import { ShoppingCart, Info, X, UploadCloud, MessageCircle, TrendingUp, Sparkles, Layers, Ruler } from "lucide-react";
import DeliveryEstimation from "./DeliveryEstimation";
import FaqAccordion from "./FaqAccordion";
import QuickNav from "./QuickNav";
import RelatedProducts from "./RelatedProducts";
import { QA } from "@/types";
import Link from "next/link";
import {
    calculateAlucobondPrice,
    getAlucobondUpsell,
    ALUCOBOND_CONSTANTS,
    formatMoneyDisplay,
    type PriceInputAlucobond
} from "@/lib/pricing";

import { AccordionStep } from "./ui/AccordionStep";
import { NumberInput } from "./ui/NumberInput";
import { OptionButton } from "./ui/OptionButton";

const GALLERY_BASE = [
    "/products/materiale/alucobond/alucobond-1.webp",
    "/products/materiale/alucobond/alucobond-2.webp"
] as const;

const productFaqs: QA[] = [
    { question: "Ce este Alucobond-ul?", answer: "Alucobond (sau Bond) este un panou compozit format dintr-un strat de polietilenă între două foi de aluminiu. Este extrem de rigid, perfect plan și foarte rezistent la intemperii." },
    { question: "Se poate folosi la exterior?", answer: "Da, este materialul ideal pentru exterior (fațade, reclame luminoase, totemuri), având o durată de viață de peste 10 ani fără deformare." },
    { question: "Cum se poate monta?", answer: "Se poate prinde mecanic (șuruburi/nituri), prin lipire cu adezivi structurali sau prin casetare (frezare și îndoire)." },
];

export default function ConfiguratorAlucobond({ initialWidth: initW, initialHeight: initH, productImage }: { initialWidth?: number; initialHeight?: number; productImage?: string }) {
    const { addItem } = useCart();
    const GALLERY = useMemo(() => productImage ? [productImage, ...GALLERY_BASE] : GALLERY_BASE, [productImage]);
    const toast = useToast();

    const [input, setInput] = useState<PriceInputAlucobond>({
        width_cm: initW ?? 100,
        height_cm: initH ?? 50,
        quantity: 1,
        thickness_mm: 3,
        color: "Alb",
        designOption: "upload",
    });

    const [lengthText, setLengthText] = useState(initW ? String(initW) : "100");
    const [heightText, setHeightText] = useState(initH ? String(initH) : "50");

    const [activeImage, setActiveImage] = useState<string>(GALLERY[0]);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const [artworkUrl, setArtworkUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(1);
    const [activeProductTab, setActiveProductTab] = useState<'descriere' | 'faq'>('descriere');

    const updateInput = <K extends keyof PriceInputAlucobond>(k: K, v: PriceInputAlucobond[K]) => setInput((p) => ({ ...p, [k]: v }));

    const handleDimChange = (val: string, setter: (v: string) => void, field: "width_cm" | "height_cm") => {
        let v = val.replace(/,/g, '.');
        if (!/^[0-9]*\.?[0-9]*$/.test(v)) return;
        setter(v);
        const num = parseFloat(v);
        if (!isNaN(num)) {
            updateInput(field, num);
        } else if (v === "") {
            updateInput(field, 0);
        }
    };

    const handleArtworkFileInput = async (file: File | null) => {
        if (!file) return;
        try {
            setUploading(true);
            const form = new FormData(); form.append("file", file);
            const res = await fetch("/api/upload", { method: "POST", body: form });
            const data = await res.json();
            setArtworkUrl(data.url);
            toast.success("Grafică încărcată!");
        } catch (e: any) {
            toast.error("Eroare la upload");
        } finally {
            setUploading(false);
        }
    };

    const priceData = useMemo(() => calculateAlucobondPrice(input), [input]);
    const displayedTotal = priceData.finalPrice;
    const upsellOpportunity = useMemo(() => getAlucobondUpsell(input), [input]);

    function handleAddToCart() {
        if (!input.width_cm || !input.height_cm) {
            toast.warning("Introduceți dimensiunile panoului.");
            return;
        }
        if (displayedTotal <= 0) return;

        const unitPrice = Math.round((displayedTotal / input.quantity) * 100) / 100;
        addItem({
            id: `alucobond-${Date.now()}`,
            productId: 'alucobond',
            title: `Panou Alucobond ${input.thickness_mm}mm - ${input.width_cm}x${input.height_cm} cm`,
            price: unitPrice,
            quantity: input.quantity,
            metadata: {
                "Dimensiune": `${input.width_cm}x${input.height_cm} cm`,
                "Culoare": input.color,
                "Grafică": input.designOption === 'pro' ? 'Design Pro' : 'Grafică proprie',
                artworkUrl,
            },
        });
        toast.success("Adăugat în coș!");
    }

    useEffect(() => {
        const id = setInterval(() => setActiveIndex((i) => (i + 1) % GALLERY.length), 5000);
        return () => clearInterval(id);
    }, [GALLERY.length]);

    useEffect(() => setActiveImage(GALLERY[activeIndex]), [activeIndex, GALLERY]);

    const summaryStep1 = input.width_cm > 0 && input.height_cm > 0 ? `${input.width_cm}x${input.height_cm} cm` : "Alege";
    const summaryStep2 = `${input.color}, ${input.thickness_mm}mm`;
    const summaryStep3 = input.designOption === 'upload' ? 'Grafică proprie' : 'Design Pro';

    return (
        <main className="bg-slate-50 min-h-screen py-24 lg:py-32 relative overflow-hidden selection:bg-green-500 selection:text-white">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.03)_0%,transparent_70%)] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-[1400px] mx-auto">
                    
                    {/* STÂNGA - VIZUAL */}
                    <div className="lg:sticky top-32 space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-4 lg:p-8 border border-slate-200/60 shadow-premium overflow-hidden group">
                           <div className="aspect-square bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 relative flex items-center justify-center">
                                <img src={activeImage} alt="Alucobond" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-1000 p-8" />
                           </div>

                          <div className="grid grid-cols-4 gap-3 mt-6">
                            {GALLERY.map((src, i) => (
                              <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`relative rounded-xl aspect-square overflow-hidden border-2 transition-all duration-300 ${activeIndex === i ? "border-green-500 scale-95" : "border-transparent opacity-40 hover:opacity-100"}`}
                              >
                                <img src={src} alt="Miniatura" loading="lazy" className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                               <Layers className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Compozit</p>
                              <p className="text-sm font-bold text-slate-900 italic leading-none">Aluminiu + PE</p>
                            </div>
                          </div>
                          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                               <Ruler className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Planeitate</p>
                              <p className="text-sm font-bold text-slate-900 italic leading-none">Absolut Perfectă</p>
                            </div>
                          </div>
                        </div>
                    </div>

                    {/* DREAPTA - CONFIGURATOR */}
                    <div className="relative">
                        <header className="mb-12">
                           <div className="flex items-center gap-3 mb-6">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse transition-all"></span>
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Materiale Heavy-Duty • Fațade & Totemuri</span>
                           </div>
                           <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-[0.9] mb-8">Panou <br/><span className="text-green-600">Alucobond</span></h1>
                           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-8 border-t border-slate-200">
                              <p className="text-slate-600 font-medium italic leading-relaxed max-w-sm">Panouri compozite premium, inalterabile în timp, pentru proiecte de lungă durată.</p>
                              <button type="button" onClick={() => setDetailsOpen(true)} className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-b-2 border-green-600 pb-1 italic hover:text-green-600 transition-colors">Detalii Tehnice</button>
                           </div>
                        </header>

                        <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl p-8 sm:p-12 space-y-2 mb-12 relative overflow-hidden">
                           <AccordionStep stepNumber={1} title="Dimensiuni & Volum" summary={summaryStep1} isOpen={activeStep === 1} onClick={() => setActiveStep(1)}>
                              <div className="py-8 space-y-10">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-3">Lungime (cm)</label>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={lengthText}
                                            onChange={(e) => handleDimChange(e.target.value, setLengthText, "width_cm")}
                                            placeholder="100"
                                            className="w-full h-16 bg-slate-50 rounded-2xl px-8 font-black text-slate-900 italic text-2xl focus:ring-2 focus:ring-green-500 outline-none border border-slate-100 transition-all shadow-inner"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-3">Înălțime (cm)</label>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={heightText}
                                            onChange={(e) => handleDimChange(e.target.value, setHeightText, "height_cm")}
                                            placeholder="50"
                                            className="w-full h-16 bg-slate-50 rounded-2xl px-8 font-black text-slate-900 italic text-2xl focus:ring-2 focus:ring-green-500 outline-none border border-slate-100 transition-all shadow-inner"
                                        />
                                    </div>
                                </div>
                                <div className="pt-8 border-t border-slate-100">
                                   <NumberInput label="Cantitate Panouri" value={input.quantity} onChange={(v) => updateInput("quantity", v)} step={1} />
                                </div>
                                {upsellOpportunity && (
                                    <div className="p-8 bg-green-50 border border-green-100 rounded-[2rem] flex items-center gap-6 group cursor-pointer hover:bg-green-100 transition-all shadow-soft" onClick={() => updateInput("quantity", upsellOpportunity.requiredQty)}>
                                        <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                            <TrendingUp size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black text-green-700 uppercase tracking-widest italic mb-1">Ofertă Cantitate</p>
                                            <p className="text-sm font-bold text-slate-800 leading-tight">Comandă <strong>{upsellOpportunity.requiredQty} buc</strong> și prețul scade la <strong>{formatMoneyDisplay(upsellOpportunity.newUnitPrice)}/buc</strong>.</p>
                                        </div>
                                        <div className="bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-black italic shadow-lg">-{upsellOpportunity.discountPercent}%</div>
                                    </div>
                                )}
                              </div>
                           </AccordionStep>

                           <AccordionStep stepNumber={2} title="Material & Culoare" summary={summaryStep2} isOpen={activeStep === 2} onClick={() => setActiveStep(2)}>
                              <div className="py-8 space-y-10">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-3">Culoare Placă</label>
                                        <select className="w-full h-16 bg-slate-50 rounded-2xl px-8 font-black text-slate-900 italic text-lg outline-none border border-slate-100 transition-all" value={input.color} onChange={(e) => updateInput("color", e.target.value)}>
                                            {ALUCOBOND_CONSTANTS.COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-3">Grosime (mm)</label>
                                        <div className="grid grid-cols-2 gap-2 h-16">
                                            {ALUCOBOND_CONSTANTS.AVAILABLE_THICKNESS.map(t => (
                                                <button key={t} onClick={() => updateInput("thickness_mm", t)} className={`rounded-xl border-2 font-black uppercase italic tracking-widest text-[10px] transition-all ${input.thickness_mm === t ? "border-green-600 bg-green-600 text-white shadow-lg" : "border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200"}`}>
                                                    {t} mm
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                              </div>
                           </AccordionStep>

                           <AccordionStep stepNumber={3} title="Grafică & Design" summary={summaryStep3} isOpen={activeStep === 3} onClick={() => setActiveStep(3)} isLast={true}>
                              <div className="py-8 space-y-6">
                                <div className="grid grid-cols-2 gap-3">
                                  <OptionButton active={input.designOption === "upload"} onClick={() => updateInput("designOption", "upload")} title="Am Grafică" subtitle="Încarcă PDF/AI" />
                                  <OptionButton active={input.designOption === "pro"} onClick={() => updateInput("designOption", "pro")} title="Design Pro" subtitle={`+${formatMoneyDisplay(ALUCOBOND_CONSTANTS.PRO_DESIGN_FEE)}`} />
                                </div>

                                {input.designOption === 'upload' ? (
                                  <label className="flex flex-col items-center justify-center w-full h-48 bg-slate-50 border-2 border-slate-200 border-dashed rounded-[2rem] cursor-pointer hover:bg-slate-100 hover:border-green-500/50 transition-all group overflow-hidden">
                                    {uploading ? (
                                      <p className="text-xs font-black text-green-600 uppercase italic animate-pulse">Se încarcă...</p>
                                    ) : artworkUrl ? (
                                      <div className="flex items-center gap-3">
                                         <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                         <p className="text-xs font-black text-green-600 uppercase italic">Fișier Pregătit!</p>
                                      </div>
                                    ) : (
                                      <>
                                         <UploadCloud className="w-8 h-8 text-slate-300 group-hover:text-green-500 mb-3" />
                                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic leading-none text-center">Încarcă Proiectul <br/>(Export PDF Vectorial)</span>
                                      </>
                                    )}
                                    <input type="file" className="hidden" onChange={e => handleArtworkFileInput(e.target.files?.[0] ?? null)} />
                                  </label>
                                ) : (
                                  <div className="p-8 rounded-[2rem] bg-green-50 border border-green-100 relative group overflow-hidden">
                                    <Sparkles className="absolute top-4 right-4 text-green-600 opacity-20" />
                                    <p className="text-slate-900 font-black uppercase italic tracking-widest mb-2 text-sm leading-none">Vrei design rezistent?</p>
                                    <p className="text-slate-600 font-medium italic text-xs leading-relaxed">Cost: <strong>{formatMoneyDisplay(ALUCOBOND_CONSTANTS.PRO_DESIGN_FEE)}</strong>. Un designer se va ocupa de layout-ul panoului.</p>
                                  </div>
                                )}
                              </div>
                           </AccordionStep>
                        </div>

                        {/* TOTAL & ACTIONS BAR */}
                        <div className="bg-white p-10 sm:p-12 rounded-[3.5rem] border border-slate-200/60 shadow-elevated relative overflow-hidden group">
                           <div className="flex flex-col sm:flex-row justify-between items-end gap-10 mb-12 relative z-10">
                              <div className="space-y-3">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic leading-none">Total Proiect</p>
                                 <p className="text-5xl sm:text-7xl font-black text-slate-900 italic tracking-tighter leading-none">{formatMoneyDisplay(displayedTotal)}</p>
                                 <p className="text-[10px] font-black text-green-600 uppercase tracking-widest italic">TVA Inclus • Panel Aluminiu Compozit</p>
                              </div>
                              <div className="text-right">
                                 <DeliveryEstimation />
                              </div>
                           </div>

                           <button onClick={handleAddToCart} className="btn-premium w-full h-24 text-2xl shadow-elevated mb-10 transform active:scale-[0.97] bg-green-600 text-white">
                              Adaugă în Coș <ShoppingCart className="ml-5 w-8 h-8" />
                           </button>

                           <div className="grid grid-cols-2 gap-4">
                              <a href="https://wa.me/40750473111" className="h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center gap-3 text-slate-900 font-black uppercase tracking-widest italic text-[10px] hover:bg-white transition-all shadow-soft">
                                <MessageCircle className="w-4 h-4 text-green-500" /> WhatsApp
                              </a>
                              <Link href="/contact" className="h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center gap-3 text-slate-900 font-black uppercase tracking-widest italic text-[10px] hover:bg-white transition-all shadow-soft">
                                <Info className="w-4 h-4 text-green-500" /> Ofertă Custom
                              </Link>
                           </div>
                        </div>
                    </div>
                </div>

                {/* INFO SECTION TABBED */}
                <div className="mt-24 lg:mt-32 max-w-[1400px] mx-auto">
                   <div className="flex gap-4 p-2 bg-white border border-slate-200/60 rounded-3xl w-fit mb-12 shadow-soft overflow-x-auto no-scrollbar">
                      <button onClick={() => setActiveProductTab("descriere")} className={`px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest italic transition-all whitespace-nowrap ${activeProductTab === "descriere" ? "bg-green-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-900"}`}>Avantaje Alucobond</button>
                      <button onClick={() => setActiveProductTab("faq")} className={`px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest italic transition-all whitespace-nowrap ${activeProductTab === "faq" ? "bg-green-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-900"}`}>Întrebări</button>
                   </div>

                   <div className="bg-white p-12 lg:p-24 rounded-[4rem] border border-slate-200/60 shadow-premium min-h-[500px]">
                      {activeProductTab === 'descriere' ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                          <div>
                            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 uppercase italic tracking-tighter">Maximum de <br/><span className="text-green-600">Durabilitate</span></h2>
                            <p className="text-slate-600 font-medium italic leading-relaxed mb-10 text-lg">Alucobond este soluția supremă pentru signalistica exterioară și placări de fațade datorită structurii sale imposibil de deformat.</p>
                            <div className="space-y-6">
                              {[
                                { title: 'Planeitate Inegalabilă', desc: 'Spre deosebire de o foaie simplă de aluminiu, Bond-ul rămâne perfect drept în orice condiții.' },
                                { title: 'Rezistență Multi-Decenială', desc: 'Finisajele PVDF asigură protecție împotriva coroziunii și decolorării timp de decenii.' },
                                { title: 'Prelucrare Avansată', desc: 'Poate fi casetat, curbat sau decupat pe CNC pentru a crea forme 3D spectaculoase.' }
                              ].map((item, i) => (
                                <div key={i} className="flex gap-6 p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-green-500/30 transition-all">
                                   <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm">
                                      <Sparkles size={20} />
                                   </div>
                                   <div>
                                      <h3 className="font-black text-slate-900 uppercase italic tracking-widest mb-1 text-sm">{item.title}</h3>
                                      <p className="text-slate-600 font-medium italic text-xs leading-relaxed">{item.desc}</p>
                                   </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl bg-slate-100">
                            <img src={GALLERY[0]} className="w-full h-full object-cover grayscale opacity-20" alt="Alucobond Focus" />
                            <div className="absolute inset-x-8 bottom-8 top-1/2 bg-white/70 backdrop-blur-xl rounded-[3rem] p-12 border border-white flex flex-col justify-end text-center">
                               <TrendingUp className="text-green-600 mb-6 mx-auto" size={40} />
                               <h4 className="text-2xl font-black text-slate-900 uppercase italic mb-4 leading-none">Standard Industrial</h4>
                               <p className="text-slate-500 font-bold italic text-sm">Construiește-ți brandul pe un suport inalterabil.</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="max-w-3xl mx-auto">
                           <FaqAccordion qa={productFaqs} />
                        </div>
                      )}
                   </div>
                </div>

                <div className="mt-24 lg:mt-32 border-t border-slate-200 pt-24 text-center">
                   <QuickNav title="Ai nevoie și de alte panouri rigide?" />
                   <div className="mt-16">
                      <RelatedProducts category="rigid" />
                   </div>
                </div>
            </div>
            {detailsOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-xl p-6" onClick={() => setDetailsOpen(false)}>
                    <div className="relative w-full max-w-2xl bg-white rounded-[3rem] p-12 lg:p-16 border-white shadow-3xl animate-in fade-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
                        <button className="absolute right-8 top-8 p-3 rounded-full bg-slate-100 text-slate-400 hover:text-slate-900 transition-all" onClick={() => setDetailsOpen(false)}>
                             <X size={24} />
                        </button>
                        <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-8">Specificații Tehnice Alucobond</h3>
                        <div className="space-y-8 text-slate-600 font-medium italic leading-relaxed">
                            <div>
                                <h4 className="text-green-600 font-black uppercase text-[10px] tracking-widest mb-2">Compoziție Stratificată</h4>
                                <p className="text-xs text-slate-500">Mie de polietilenă densă + 2 foi de aluminiu de 0.2mm - 0.3mm. Grosime totală panel: 3mm sau 4mm.</p>
                            </div>
                            <div>
                                <h4 className="text-green-600 font-black uppercase text-[10px] tracking-widest mb-2">Debitarea & Casatare</h4>
                                <p className="text-xs text-slate-500">Se prelucrează exclusiv prin frezare CNC. Permite îndoirea la 90 de grade prin frezare parțială pe spate (canales V).</p>
                            </div>
                            <div>
                                <h4 className="text-green-600 font-black uppercase text-[10px] tracking-widest mb-2">Rezistență Termică</h4>
                                <p className="text-xs text-slate-500">Coeficient de dilatare termică foarte mic. Rezistă la variații de temperatură extreme (-50°C / +80°C).</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
