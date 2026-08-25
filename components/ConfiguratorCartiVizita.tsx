"use client";
import React, { useMemo, useState, useEffect } from "react";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/ToastProvider";
import { ShoppingCart, Info, X, UploadCloud, MessageCircle, TrendingUp, Sparkles, Layers, Ruler } from "lucide-react";
import DeliveryEstimation from "./DeliveryEstimation";
import FaqAccordion from "./FaqAccordion";
import { QA } from "@/types";
import Link from "next/link";
import { calculateBusinessCardPrice, getBusinessCardUpsell, formatMoneyDisplay } from "@/lib/pricing";

import { AccordionStep } from "./ui/AccordionStep";
import { NumberInput } from "./ui/NumberInput";
import { OptionButton } from "./ui/OptionButton";
import QuickNav from "@/components/QuickNav";
import RelatedProducts from "@/components/RelatedProducts";

const GALLERY_BASE = [
    "/products/master/carti-de-vizita-premium-personalizate-online-ieftine.png",
    "/products/master/carti-de-vizita-premium-personalizate-online-ieftine.png",
    "/products/master/carti-de-vizita-premium-personalizate-online-ieftine.png"
] as const;

const productFaqs: QA[] = [
    { question: "Ce înseamnă plastifiere Soft Touch?", answer: "Este un finisaj premium mat, foarte fin la atingere, care oferă senzația de catifea. Conferă cărților de vizită o notă luxoasă." },
    { question: "Cum pregătesc fișierul grafic?", answer: "Dimensiunea brută (cu bleed) trebuie să fie 94x54 mm (pentru tăiere la 90x50 mm). Toate fonturile trebuie convertite la curbe, iar culorile în format CMYK." },
    { question: "Cât durează execuția?", answer: "Pentru cărțile din carton standard/premium 24-48h. Pentru materiale speciale (plastic translucid, lemn, metalic) timpul de producție este de 4-7 zile lucrătoare." }
];

export default function ConfiguratorCartiVizita({ productImage }: { productImage?: string }) {
    const { addItem } = useCart();
    const toast = useToast();

    const MIN_QTY = 100;

    const GALLERY = useMemo(() => {
        const base = productImage && !productImage.includes("placeholder") ? [productImage, ...GALLERY_BASE] : GALLERY_BASE;
        return base;
    }, [productImage]);

    const [input, setInput] = useState<{
        type: "standard" | "plastic" | "transparente" | "lemn" | "metalice",
        quantity: number,
        twoSided: boolean,
        roundedCorners: boolean,
        specialShape: boolean,
        designOption: "upload" | "pro"
    }>({
        type: "standard",
        quantity: 100,
        twoSided: true,
        roundedCorners: false,
        specialShape: false,
        designOption: "upload"
    });

    const [activeImage, setActiveImage] = useState<string>(GALLERY[0]);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const [artworkUrl, setArtworkUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(1);
    const [activeProductTab, setActiveProductTab] = useState<'descriere' | 'faq'>('descriere');

    const updateInput = <K extends keyof typeof input>(k: K, v: typeof input[K]) => setInput((p) => ({ ...p, [k]: v }));
    const setQty = (v: number) => updateInput("quantity", Math.max(MIN_QTY, Math.floor(v)));

    const priceData = useMemo(() => calculateBusinessCardPrice(input), [input]);
    const displayedTotal = priceData.finalPrice;
    const upsellOpportunity = useMemo(() => getBusinessCardUpsell(input), [input]);

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

    function handleAddToCart() {
        if (displayedTotal <= 0) return;

        const unitPrice = Math.round((displayedTotal / input.quantity) * 100) / 100;
        const matLabels = {
            "standard": "Carton Premium 350g",
            "plastic": "Plastic Opac",
            "transparente": "Plastic Transparent",
            "lemn": "Lemn / Furnir Eco",
            "metalice": "Metalic Premium"
        };

        addItem({
            id: `carti-vizita-${Date.now()}`,
            productId: 'carti-vizita',
            title: `Cărți de Vizită - ${matLabels[input.type]}`,
            price: unitPrice,
            quantity: input.quantity,
            metadata: {
                "Material": matLabels[input.type],
                "Print": input.twoSided ? "Față/Verso" : "O singură față",
                "Colțuri rotunjite": input.roundedCorners ? "Da" : "Nu",
                "Decupaj Special": input.specialShape ? "Da" : "Nu",
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

    const summaryStep1 = `${input.quantity} bucăți`;
    const summaryStep2 = input.type.charAt(0).toUpperCase() + input.type.slice(1);
    const summaryStep3 = input.designOption === 'upload' ? 'Grafică proprie' : 'Design Pro';

    return (
        <main className="bg-slate-50 min-h-screen py-24 lg:py-32 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.03)_0%,transparent_70%)] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-[1400px] mx-auto">
                    
                    {/* STÂNGA - VIZUAL */}
                    <div className="lg:sticky top-32 space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-4 lg:p-8 border border-slate-200/60 shadow-premium overflow-hidden group">
                           <div className="aspect-square bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 relative flex items-center justify-center">
                                <img src={activeImage} alt="Cărți de Vizită" className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-1000 p-12 drop-shadow-2xl" />
                           </div>

                          <div className="grid grid-cols-4 gap-3 mt-6">
                            {GALLERY.map((src, i) => (
                              <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`relative rounded-xl aspect-square overflow-hidden border-2 transition-all duration-300 ${activeIndex === i ? "border-indigo-500 scale-95" : "border-transparent opacity-40 hover:opacity-100"}`}
                              >
                                <img src={src} alt="Miniatura" loading="lazy" className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                               <Layers className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Suport</p>
                              <p className="text-sm font-bold text-slate-900 italic leading-none">Premium multi-material</p>
                            </div>
                          </div>
                          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                               <Sparkles className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Finisaj</p>
                              <p className="text-sm font-bold text-slate-900 italic leading-none">Soft Touch / Special</p>
                            </div>
                          </div>
                        </div>
                    </div>

                    {/* DREAPTA - CONFIGURATOR */}
                    <div className="relative">
                        <header className="mb-12">
                           <div className="flex items-center gap-3 mb-6">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse transition-all"></span>
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Identitate Vizuală • Networking de Lux</span>
                           </div>
                           <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-[0.9] mb-8">Cărți de <br/><span className="text-indigo-600">Vizită</span></h1>
                           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-8 border-t border-slate-200">
                              <p className="text-slate-600 font-medium italic leading-relaxed max-w-sm">Prima impresie este irepetabilă. Alege materiale care vorbesc despre succesul tău.</p>
                              <button type="button" onClick={() => setDetailsOpen(true)} className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-b-2 border-indigo-600 pb-1 italic hover:text-indigo-600 transition-colors">Ghid Materiale</button>
                           </div>
                        </header>

                        <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl p-8 sm:p-12 space-y-2 mb-12 relative overflow-hidden">
                           <AccordionStep stepNumber={1} title="Cantitate & Tiraj" summary={summaryStep1} isOpen={activeStep === 1} onClick={() => setActiveStep(1)}>
                              <div className="py-8 space-y-10">
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                                    {[100, 200, 500, 1000, 2500].map(qty => (
                                        <button key={qty} onClick={() => setQty(qty)} className={`h-16 flex flex-col items-center justify-center rounded-2xl border-2 transition-all ${input.quantity === qty ? "border-indigo-600 bg-indigo-600 text-white shadow-lg" : "border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200"}`}>
                                            <span className="text-lg font-black italic leading-none">{qty}</span>
                                            <span className="text-[8px] uppercase tracking-widest font-black mt-1">buc</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="pt-8 border-t border-slate-100">
                                   <NumberInput label="Cantitate Personalizată" value={input.quantity} onChange={setQty} step={50} />
                                </div>
                                {upsellOpportunity && (
                                    <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-[2rem] flex items-center gap-6 group cursor-pointer hover:bg-indigo-100 transition-all shadow-soft" onClick={() => setQty(upsellOpportunity.requiredQty)}>
                                        <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                            <TrendingUp size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black text-indigo-700 uppercase tracking-widest italic mb-1">Ofertă Tiraj Mare</p>
                                            <p className="text-sm font-bold text-slate-800 leading-tight">Comandă <strong>{upsellOpportunity.requiredQty} buc</strong> și prețul scade la <strong>{formatMoneyDisplay(upsellOpportunity.newUnitPrice)}/buc</strong>.</p>
                                        </div>
                                        <div className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-black italic shadow-lg">-{upsellOpportunity.discountPercent}%</div>
                                    </div>
                                )}
                              </div>
                           </AccordionStep>

                           <AccordionStep stepNumber={2} title="Material & Stil" summary={summaryStep2} isOpen={activeStep === 2} onClick={() => setActiveStep(2)}>
                              <div className="py-8 space-y-10">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-6 block text-center">Suport Card</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        <OptionButton active={input.type === "standard"} onClick={() => updateInput("type", "standard")} title="Carton 350g" subtitle="Premiu Mat" />
                                        <OptionButton active={input.type === "plastic"} onClick={() => updateInput("type", "plastic")} title="Plastic" subtitle="Incasabil" />
                                        <OptionButton active={input.type === "transparente"} onClick={() => updateInput("type", "transparente")} title="Efect Sticlă" subtitle="Transparent" />
                                        <OptionButton active={input.type === "lemn"} onClick={() => updateInput("type", "lemn")} title="Lemn Eco" subtitle="Bio-Degradabil" />
                                        <OptionButton active={input.type === "metalice"} onClick={() => updateInput("type", "metalice")} title="Suport Metal" subtitle="Exclusive" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-slate-100">
                                   <label className={`flex items-center gap-4 py-4 px-6 rounded-2xl border-2 transition-all cursor-pointer ${input.twoSided ? "border-indigo-600 bg-indigo-50" : "border-slate-100 bg-slate-50 text-slate-400"}`}>
                                      <input type="checkbox" className="w-5 h-5 rounded-lg text-indigo-600 focus:ring-indigo-500 border-slate-300" checked={input.twoSided} onChange={e => updateInput("twoSided", e.target.checked)} />
                                      <span className="text-[10px] font-black uppercase italic tracking-widest">Față-Verso</span>
                                   </label>
                                   <label className={`flex items-center gap-4 py-4 px-6 rounded-2xl border-2 transition-all cursor-pointer ${input.roundedCorners ? "border-indigo-600 bg-indigo-50" : "border-slate-100 bg-slate-50 text-slate-400"}`}>
                                      <input type="checkbox" className="w-5 h-5 rounded-lg text-indigo-600 focus:ring-indigo-500 border-slate-300" checked={input.roundedCorners} onChange={e => updateInput("roundedCorners", e.target.checked)} />
                                      <span className="text-[10px] font-black uppercase italic tracking-widest">Colțuri Rotunjite</span>
                                   </label>
                                   <label className={`flex items-center gap-4 py-4 px-6 rounded-2xl border-2 transition-all cursor-pointer ${input.specialShape ? "border-indigo-600 bg-indigo-50" : "border-slate-100 bg-slate-50 text-slate-400"} sm:col-span-2`}>
                                      <input type="checkbox" className="w-5 h-5 rounded-lg text-indigo-600 focus:ring-indigo-500 border-slate-300" checked={input.specialShape} onChange={e => updateInput("specialShape", e.target.checked)} />
                                      <span className="text-[10px] font-black uppercase italic tracking-widest">Decupare Formă Specială (Ștanță Custom)</span>
                                   </label>
                                </div>
                              </div>
                           </AccordionStep>

                           <AccordionStep stepNumber={3} title="Grafică & Design" summary={summaryStep3} isOpen={activeStep === 3} onClick={() => setActiveStep(3)} isLast={true}>
                              <div className="py-8 space-y-6">
                                <div className="grid grid-cols-2 gap-3">
                                  <OptionButton active={input.designOption === "upload"} onClick={() => updateInput("designOption", "upload")} title="Am Macheta" subtitle="Încarcă PDF/AI" />
                                  <OptionButton active={input.designOption === "pro"} onClick={() => updateInput("designOption", "pro")} title="Design Pro" subtitle="De la zero" />
                                </div>

                                {input.designOption === 'upload' ? (
                                  <label className="flex flex-col items-center justify-center w-full h-48 bg-slate-50 border-2 border-slate-200 border-dashed rounded-[2rem] cursor-pointer hover:bg-slate-100 hover:border-indigo-500/50 transition-all group overflow-hidden">
                                    {uploading ? (
                                      <p className="text-xs font-black text-indigo-600 uppercase italic animate-pulse">Se încarcă...</p>
                                    ) : artworkUrl ? (
                                      <div className="flex items-center gap-3">
                                         <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                         <p className="text-xs font-black text-green-600 uppercase italic">Grafică Gata!</p>
                                      </div>
                                    ) : (
                                      <>
                                         <UploadCloud className="w-8 h-8 text-slate-300 group-hover:text-indigo-500 mb-3" />
                                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic leading-none text-center">Încarcă Proiectul <br/>(Minim 300 DPI)</span>
                                      </>
                                    )}
                                    <input type="file" className="hidden" onChange={e => handleArtworkFileInput(e.target.files?.[0] ?? null)} />
                                  </label>
                                ) : (
                                  <div className="p-8 rounded-[2rem] bg-indigo-50 border border-indigo-100 relative group overflow-hidden">
                                    <Sparkles className="absolute top-4 right-4 text-indigo-600 opacity-20" />
                                    <p className="text-slate-900 font-black uppercase italic tracking-widest mb-2 text-sm leading-none">Vrei impact vizual?</p>
                                    <p className="text-slate-600 font-medium italic text-xs leading-relaxed">Designerii noștri vor crea o identitate memorabilă pentru business-ul tău.</p>
                                  </div>
                                )}
                              </div>
                           </AccordionStep>
                        </div>

                        {/* TOTAL & ACTIONS BAR */}
                        <div className="bg-white p-10 sm:p-12 rounded-[3.5rem] border border-slate-200/60 shadow-elevated relative overflow-hidden group">
                           <div className="flex flex-col sm:flex-row justify-between items-end gap-10 mb-12 relative z-10">
                              <div className="space-y-3">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic leading-none">Investiție Identitate</p>
                                 <p className="text-5xl sm:text-7xl font-black text-slate-900 italic tracking-tighter leading-none">{formatMoneyDisplay(displayedTotal)}</p>
                                 <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest italic">TVA Inclus • ~{formatMoneyDisplay(displayedTotal/input.quantity)}/buc</p>
                              </div>
                              <div className="text-right">
                                 <DeliveryEstimation />
                              </div>
                           </div>

                           <button onClick={handleAddToCart} className="btn-premium w-full h-24 text-2xl shadow-elevated mb-10 transform active:scale-[0.97] bg-indigo-600 text-white">
                              Adaugă în Coș <ShoppingCart className="ml-5 w-8 h-8" />
                           </button>

                           <div className="grid grid-cols-2 gap-4">
                              <a href="https://wa.me/40750473111" className="h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center gap-3 text-slate-900 font-black uppercase tracking-widest italic text-[10px] hover:bg-white transition-all shadow-soft">
                                <MessageCircle className="w-4 h-4 text-indigo-500" /> WhatsApp
                              </a>
                              <Link href="/contact" className="h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center gap-3 text-slate-900 font-black uppercase tracking-widest italic text-[10px] hover:bg-white transition-all shadow-soft">
                                <Info className="w-4 h-4 text-indigo-500" /> Ofertă Tiraj Mare
                              </Link>
                           </div>
                        </div>
                    </div>
                </div>

                {/* INFO SECTION TABBED */}
                <div className="mt-24 lg:mt-32 max-w-[1400px] mx-auto">
                   <div className="flex gap-4 p-2 bg-white border border-slate-200/60 rounded-3xl w-fit mb-12 shadow-soft overflow-x-auto no-scrollbar">
                      <button onClick={() => setActiveProductTab("descriere")} className={`px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest italic transition-all whitespace-nowrap ${activeProductTab === "descriere" ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-900"}`}>Ghid Materiale</button>
                      <button onClick={() => setActiveProductTab("faq")} className={`px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest italic transition-all whitespace-nowrap ${activeProductTab === "faq" ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-900"}`}>Întrebări</button>
                   </div>

                   <div className="bg-white p-12 lg:p-24 rounded-[4rem] border border-slate-200/60 shadow-premium min-h-[500px]">
                      {activeProductTab === 'descriere' ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                          <div>
                            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 uppercase italic tracking-tighter">Impact <br/><span className="text-indigo-600">Memorabil</span></h2>
                            <p className="text-slate-600 font-medium italic leading-relaxed mb-10 text-lg">Cărțile de vizită nu sunt doar date de contact, ci un instrument de marketing tactil care reflectă standardele afacerii tale.</p>
                            <div className="space-y-6">
                              {[
                                { title: 'Soft-Touch Feeling', desc: 'Finisaj catifelat extrem de plăcut la atingere, care protejează culorile și elimină amprentele.' },
                                { title: 'Suporturi Alternative', desc: 'De la carduri din plastic translucide la furnir de lemn sau aluminiu periat.' },
                                { title: 'Decupare la 0.1mm', desc: 'Precizie absolută prin debitare CNC/Laser pentru colțuri rotunjite sau forme personalizate.' }
                              ].map((item, i) => (
                                <div key={i} className="flex gap-6 p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-indigo-500/30 transition-all">
                                   <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
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
                            <img src={GALLERY[0]} className="w-full h-full object-cover grayscale opacity-20" alt="Cărți Vizită Focus" />
                            <div className="absolute inset-x-8 bottom-8 top-1/2 bg-white/70 backdrop-blur-xl rounded-[3rem] p-12 border border-white flex flex-col justify-end text-center">
                               <TrendingUp className="text-indigo-600 mb-6 mx-auto" size={40} />
                               <h4 className="text-2xl font-black text-slate-900 uppercase italic mb-4 leading-none">B2B Excellence</h4>
                               <p className="text-slate-500 font-bold italic text-sm">Faceți fiecare introducere să conteze.</p>
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
                   <QuickNav title="Vrei design comercial sau signalistică?" />
                   <div className="mt-16">
                      <RelatedProducts category="print" />
                   </div>
                </div>
            </div>
            {detailsOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-xl p-6" onClick={() => setDetailsOpen(false)}>
                    <div className="relative w-full max-w-2xl bg-white rounded-[3rem] p-12 lg:p-16 border-white shadow-3xl animate-in fade-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
                        <button className="absolute right-8 top-8 p-3 rounded-full bg-slate-100 text-slate-400 hover:text-slate-900 transition-all" onClick={() => setDetailsOpen(false)}>
                             <X size={24} />
                        </button>
                        <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-8">Ghid Preparare Grafică</h3>
                        <div className="space-y-8 text-slate-600 font-medium italic leading-relaxed">
                            <div>
                                <h4 className="text-indigo-600 font-black uppercase text-[10px] tracking-widest mb-2">Dimensiuni și Bleed</h4>
                                <p className="text-xs text-slate-500">Format final: 90x50 mm. Fișier de lucru: 94x54 mm (include 2mm bleed pe fiecare latură). Nu puneți elemente importante aproape de margini.</p>
                            </div>
                            <div>
                                <h4 className="text-indigo-600 font-black uppercase text-[10px] tracking-widest mb-2">Culoare și Fonturi</h4>
                                <p className="text-xs text-slate-500">Utilizați profilul de culoare CMYK pentru fidelitate maximă. Convertiți toate textele la curbe (outlines) pentru a evita erorile de font.</p>
                            </div>
                            <div>
                                <h4 className="text-indigo-600 font-black uppercase text-[10px] tracking-widest mb-2">Rezoluție</h4>
                                <p className="text-xs text-slate-500">Minim 300 DPI pentru orice element rasterizat. Recomandăm exportul PDF/X-1a sau PDF/X-3 pentru tiparul digital.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
