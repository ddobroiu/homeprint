"use client";
import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/ToastProvider";
import { ShoppingCart, Check, UploadCloud, MessageCircle, Ruler, Layers, Sparkles, TrendingUp, Info } from "lucide-react";
import DeliveryEstimation from "./DeliveryEstimation";
import FaqAccordion from "./FaqAccordion";
import { QA } from "@/types";
import Link from "next/link";
import {
    calculateTapetPrice,
    getTapetUpsell,
    TAPET_CONSTANTS,
    formatMoneyDisplay,
    type PriceInputTapet
} from "@/lib/pricing";

import { AccordionStep } from "./ui/AccordionStep";
import { NumberInput } from "./ui/NumberInput";
import { OptionButton } from "./ui/OptionButton";
import QuickNav from "@/components/QuickNav";
import RelatedProducts from "@/components/RelatedProducts";
import MobilePriceBar from "./MobilePriceBar";

const productFaqs: QA[] = [
    { question: "Ce material folosiți pentru tapet?", answer: "Folosim tapet Dreamscape Vinilic, un material premium din țesătură de poliester cu un coating vinilic, cu o grosime de 400 g/mp. Este ideal pentru un decor interior de înaltă calitate." },
    { question: "Care este diferența dintre varianta cu și fără adeziv?", answer: "Varianta standard necesită aplicarea unui adeziv pentru tapet pe perete. Varianta cu adeziv are un strat auto-adeziv pe spate, similar cu un autocolant, facilitând montajul." },
    { question: "Pot comanda o grafică personalizată?", answer: "Da, puteți încărca propria grafică sau puteți opta pentru serviciul nostru de design profesional." },
];

export default function TapetConfigurator({ productSlug, initialWidth: initW, initialHeight: initH, productImage }: { productSlug?: string; initialWidth?: number; initialHeight?: number; productImage?: string }) {
    const { addItem } = useCart();
    const toast = useToast();

    const [input, setInput] = useState<PriceInputTapet>({
        width_cm: initW ?? 300,
        height_cm: initH ?? 250,
        quantity: 1,
        want_adhesive: false,
        designOption: "upload",
    });

    const [artworkUrl, setArtworkUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [activeStep, setActiveStep] = useState(1);
    const [activeTab, setActiveTab] = useState<'descriere' | 'faq'>('descriere');

    const priceData = useMemo(() => calculateTapetPrice(input), [input]);
    const displayedTotal = priceData.finalPrice;
    const upsellOpportunity = useMemo(() => getTapetUpsell(input), [input]);

    const handleArtworkFileInput = async (file: File | null) => {
        if (!file) return;
        try {
            setUploading(true);
            const form = new FormData(); form.append("file", file);
            const res = await fetch("/api/upload", { method: "POST", body: form });
            const data = await res.json();
            setArtworkUrl(data.url);
            toast.success("Grafică încărcată!");
        } catch (e) { toast.error("Eroare la upload"); } finally { setUploading(false); }
    };

    function handleAddToCart() {
        if (!input.width_cm || !input.height_cm) {
            toast.warning("Introduceți dimensiunile peretelui.");
            return;
        }
        const unitPrice = Math.round((displayedTotal / input.quantity) * 100) / 100;
        addItem({
            id: `tapet-${Date.now()}`,
            productId: 'tapet',
            title: `Tapet Personalizat ${input.width_cm}x${input.height_cm}cm`,
            price: unitPrice,
            quantity: input.quantity,
            metadata: {
                "Dimensiune": `${input.width_cm}x${input.height_cm}cm`,
                "Adeziv": input.want_adhesive ? "Auto-adeziv" : "Fără adeziv",
                "Grafică": input.designOption,
                artworkUrl,
            },
        });
        toast.success("Adăugat în coș!");
    }

    const summaryStep1 = input.width_cm && input.height_cm ? `${input.width_cm}x${input.height_cm}cm, ${input.quantity} buc` : "Dimensiuni";
    const summaryStep2 = input.want_adhesive ? "Auto-adeziv" : "Necesită adeziv";
    const summaryStep3 = input.designOption === 'upload' ? 'Am Grafică' : 'Design Pro';

    return (
        <main className="bg-slate-50 dark:bg-slate-800 min-h-screen">
            <div className="container mx-auto px-4 py-10 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                   <div className="lg:sticky top-24 h-max space-y-8 text-slate-900 dark:text-white">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
                           <div className="aspect-square relative flex items-center justify-center overflow-hidden">
                                <Image src={productImage || "/products/tapet/tapet-1.webp"} alt="Tapet Personalizat" fill className="object-contain p-8" priority />
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800">
                            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0"><Layers size={18} /></div>
                            <div><p className="text-[10px] font-bold uppercase text-gray-500 mb-0.5">Material</p><p className="text-xs font-bold text-gray-800 dark:text-gray-200">Vinilic 400g</p></div>
                          </div>
                          <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800">
                             <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0"><Sparkles size={18} /></div>
                             <div><p className="text-[10px] font-bold uppercase text-gray-500 mb-0.5">Impact</p><p className="text-xs font-bold text-gray-800 dark:text-gray-200">Interior Premium</p></div>
                          </div>
                        </div>
                    </div>

                    <div>
                        <header className="mb-6">
                           <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Tapet Personalizat</h1>
                           <p className="text-gray-600 dark:text-gray-400">Transformă orice perete într-o operă de artă cu material Dreamscape certificat.</p>
                        </header>

                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 px-4">
                           <AccordionStep stepNumber={1} title="Dimensiuni Perete" summary={summaryStep1} isOpen={activeStep === 1} onClick={() => setActiveStep(1)}>
                              <div className="py-4 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                   <NumberInput label="Lățime (cm)" value={input.width_cm} onChange={(v) => setInput(p => ({ ...p, width_cm: v }))} />
                                   <NumberInput label="Înălțime (cm)" value={input.height_cm} onChange={(v) => setInput(p => ({ ...p, height_cm: v }))} />
                                </div>
                                <div className="pt-2"><NumberInput label="Număr Pereți (identici)" value={input.quantity} onChange={(v) => setInput(p => ({ ...p, quantity: v }))} /></div>
                                {upsellOpportunity && (
                                    <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-800 flex items-center gap-4 cursor-pointer" onClick={() => setInput(p => ({ ...p, quantity: upsellOpportunity.requiredQty }))}>
                                        <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center text-white shrink-0"><TrendingUp size={20} /></div>
                                        <div>
                                            <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-0.5">Ofertă Specială</p>
                                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Comandă {upsellOpportunity.requiredQty} mp pentru preț redus la {formatMoneyDisplay(upsellOpportunity.newUnitPrice)}/mp.</p>
                                        </div>
                                    </div>
                                )}
                              </div>
                           </AccordionStep>

                           <AccordionStep stepNumber={2} title="Tip Montaj" summary={summaryStep2} isOpen={activeStep === 2} onClick={() => setActiveStep(2)}>
                              <div className="py-4 grid grid-cols-2 gap-2">
                                 <OptionButton active={!input.want_adhesive} onClick={() => setInput(p => ({ ...p, want_adhesive: false }))} title="Material Standard" subtitle="Necesită adeziv" />
                                 <OptionButton active={input.want_adhesive} onClick={() => setInput(p => ({ ...p, want_adhesive: true }))} title="Auto-adeziv" subtitle="Fără adeziv" />
                              </div>
                           </AccordionStep>

                           <AccordionStep stepNumber={3} title="Imagine & Design" summary={summaryStep3} isOpen={activeStep === 3} onClick={() => setActiveStep(3)} isLast={true}>
                              <div className="py-4 space-y-4">
                                <div className="grid grid-cols-2 gap-2">
                                  <OptionButton active={input.designOption === "upload"} onClick={() => setInput(p => ({ ...p, designOption: "upload" }))} title="Am Foto" subtitle="PDF/JPG high-res" />
                                  <OptionButton active={input.designOption === "pro"} onClick={() => setInput(p => ({ ...p, designOption: "pro" }))} title="Design Pro" subtitle={`+${formatMoneyDisplay(TAPET_CONSTANTS.PRO_DESIGN_FEE)}`} />
                                </div>
                                {input.designOption === 'upload' && (
                                  <label className="flex flex-col items-center justify-center w-full h-32 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 border-dashed rounded-xl cursor-pointer hover:border-amber-500 transition-colors">
                                     {uploading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"></div> : artworkUrl ? <Check className="text-amber-600" /> : <UploadCloud className="text-gray-400" />}
                                     <span className="text-xs text-gray-500 mt-2 font-bold">{artworkUrl ? "Imagine Recepționată" : "Încarcă Imaginea (Recomandat 150 DPI)"}</span>
                                     <input type="file" className="hidden" onChange={e => handleArtworkFileInput(e.target.files?.[0] ?? null)} />
                                  </label>
                                )}
                              </div>
                           </AccordionStep>
                        </div>

                        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200 p-4 lg:static lg:p-8 lg:mt-8 lg:bg-white lg:border lg:rounded-2xl lg:shadow-lg dark:bg-slate-900 dark:border-slate-800">
                           <div className="flex flex-col gap-4">
                              <div className="flex flex-row justify-between items-center w-full gap-4 order-2 lg:order-1">
                                 <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-500 uppercase font-black tracking-wider mb-1">Total Investiție</span>
                                    <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{formatMoneyDisplay(displayedTotal)}</span>
                                 </div>
                                 <div className="flex-shrink-0 text-slate-900 dark:text-white"><DeliveryEstimation /></div>
                              </div>
                              <button onClick={handleAddToCart} className="btn-primary w-full py-4 lg:py-5 text-lg font-bold tracking-tight group order-1 lg:order-2">
                                 <ShoppingCart size={24} className="inline-block mr-2" /><span>Adaugă în Coș</span>
                              </button>
                           </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3 pb-8 lg:pb-0">
                           <a href="https://wa.me/40750473111" className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center gap-2 text-xs font-bold text-slate-900 dark:text-white hover:bg-amber-50 transition-all"><MessageCircle size={16} /> WhatsApp</a>
                           <Link href="/contact" className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center gap-2 text-xs font-bold text-slate-900 dark:text-white hover:bg-amber-50 transition-all"><Info size={16} /> Cerere Ofertă</Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
                    <nav className="border-b border-gray-200 dark:border-slate-800 flex">
                       {["descriere", "faq"].map(t => (
                          <button key={t} onClick={() => setActiveTab(t as any)} className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${activeTab === t ? 'text-amber-600 border-amber-600 bg-amber-50' : 'text-gray-500 border-transparent hover:bg-slate-50'}`}>{t}</button>
                       ))}
                    </nav>
                    <div className="p-6 lg:p-8">
                       {activeTab === 'descriere' && (
                         <div className="prose dark:prose-invert max-w-none text-sm">
                           <p>Tapetul Dreamscape™ este standardul de aur pentru decorul interior comercial și rezidențial, oferind durabilitate extremă și o textură tactilă rafinată.</p>
                           <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
                               <li className="flex items-start gap-2"><Check className="text-amber-600 mt-1 shrink-0" size={16} /> <span><strong>Material:</strong> Coating vinilic 400g/mp cu bază poliester.</span></li>
                               <li className="flex items-start gap-2"><Check className="text-amber-600 mt-1 shrink-0" size={16} /> <span><strong>Certificat:</strong> Clasa B1/M1 la foc, sigur pentru spitale și școli.</span></li>
                               <li className="flex items-start gap-2"><Check className="text-amber-600 mt-1 shrink-0" size={16} /> <span><strong>Custom:</strong> Printăm exact la dimensiunile peretelui tău.</span></li>
                               <li className="flex items-start gap-2"><Check className="text-amber-600 mt-1 shrink-0" size={16} /> <span><strong>UV Printing:</strong> Culori care nu se decolorează sub razele soarelui.</span></li>
                           </ul>
                         </div>
                       )}
                       {activeTab === 'faq' && <FaqAccordion qa={productFaqs} />}
                    </div>
                </div>
                <div className="mt-12"><QuickNav title="Reper conformitate?" /><div className="mt-12"><RelatedProducts category="interior" /></div></div>
            </div>
            <MobilePriceBar totalPrice={displayedTotal} onAddToCart={handleAddToCart} isVisible={true} />
        </main>
    );
}
