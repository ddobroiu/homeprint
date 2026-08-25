"use client";
import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/ToastProvider";
import { ShoppingCart, Info, UploadCloud, MessageCircle, Layers, Check, ShieldCheck, Zap } from "lucide-react";
import DeliveryEstimation from "./DeliveryEstimation";
import FaqAccordion from "./FaqAccordion";
import { useUserActivityTracking } from "@/hooks/useAbandonedCartCapture";
import QuickNav from "@/components/QuickNav";
import { QA } from "@/types";
import MobilePriceBar from "./MobilePriceBar";
import Link from 'next/link';

import {
  calculateRollupPrice,
  ROLLUP_CONSTANTS,
  formatMoneyDisplay,
  type PriceInputRollup
} from "@/lib/pricing";

import { AccordionStep } from "./ui/AccordionStep";
import { NumberInput } from "./ui/NumberInput";
import { OptionButton } from "./ui/OptionButton";

const GALLERY = [
  "/products/rollup/rollup-1.webp",
  "/products/rollup/rollup-2.webp",
  "/products/rollup/rollup-3.webp",
  "/products/rollup/rollup-4.webp"
] as const;

const productFaqs: QA[] = [
  { question: "Ce este un rollup banner?", answer: "Un sistem de afișaj portabil retractabil, ideal pentru expoziții și evenimente. Printul se rulează în caseta de aluminiu pentru protecție." },
  { question: "Ce include prețul?", answer: "Include caseta de aluminiu, printul polipropilenă/frontlit și geanta de transport premium." },
  { question: "Cât de rezistent este printul?", answer: "Printul este realizat la rezoluție HD și este protejat împotriva zgârieturilor ușoare, fiind ideal pentru utilizări repetate." },
];

export default function RollupConfigurator({ productSlug, initialWidth: initW, productImage }: { productSlug?: string; initialWidth?: number; productImage?: string }) {
  const { addItem } = useCart();
  const GALLERY_IMAGES = useMemo(() => productImage ? [productImage, ...GALLERY] : GALLERY, [productImage]);
  const [input, setInput] = useState<PriceInputRollup>({ width_cm: initW ?? 85, quantity: 1, designOption: "upload" });
  const [activeImage, setActiveImage] = useState<string>(GALLERY_IMAGES[0]);
  const [artworkUrl, setArtworkUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [activeTab, setActiveTab] = useState<'descriere' | 'faq'>('descriere');
  const toast = useToast();

  const priceData = useMemo(() => calculateRollupPrice(input), [input]);
  const displayedTotal = priceData.finalPrice;

  useUserActivityTracking({ configuratorId: 'rollup', configuration: input, price: displayedTotal, quantity: input.quantity });

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
    if (displayedTotal <= 0) return;
    addItem({
      id: `rollup-${Date.now()}`,
      productId: productSlug ?? "rollup",
      title: `Rollup Banner ${input.width_cm}cm`,
      price: displayedTotal / input.quantity,
      quantity: input.quantity,
      metadata: { "Lățime": `${input.width_cm} cm`, "Grafică": input.designOption, artworkUrl }
    });
    toast.success("Adăugat în coș!");
  }

  const summaryStep1 = `${input.width_cm}cm, ${input.quantity} buc.`;
  const summaryStep2 = input.designOption === 'upload' ? 'Am Grafică' : 'Design Pro';

  return (
    <main className="bg-slate-50 dark:bg-slate-800 min-h-screen">
      <div className="container mx-auto px-4 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-slate-900 dark:text-white">
          <div className="lg:sticky top-24 h-max space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
               <div className="aspect-[3/4] bg-white relative flex items-center justify-center overflow-hidden">
                  <Image src={artworkUrl || activeImage} alt="Rollup" fill className="object-contain p-8" priority />
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0"><Layers size={18} /></div>
                <div><p className="text-[10px] font-bold uppercase text-gray-500 mb-0.5">Sistem</p><p className="text-xs font-bold">Premium Alu</p></div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800">
                 <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0"><ShieldCheck size={18} /></div>
                 <div><p className="text-[10px] font-bold uppercase text-gray-500 mb-0.5">Garanție</p><p className="text-xs font-bold">12 Luni Sistem</p></div>
              </div>
            </div>
          </div>

          <div>
            <header className="mb-6">
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Rollup Banner</h1>
              <p className="text-gray-600 dark:text-gray-400">Cel mai popular sistem de afișaj portabil pentru evenimentele tale.</p>
            </header>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 px-4">
               <AccordionStep stepNumber={1} title="Format & Cantitate" summary={summaryStep1} isOpen={activeStep === 1} onClick={() => setActiveStep(1)}>
                  <div className="py-4 space-y-6">
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Lățime Sistem</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                           {ROLLUP_CONSTANTS.SIZES.map(s => (
                              <button key={s.width_cm} onClick={() => setInput(p => ({ ...p, width_cm: s.width_cm }))} className={`p-4 border-2 rounded-xl text-center transition-all ${input.width_cm === s.width_cm ? 'border-amber-600 bg-amber-50 text-amber-700' : 'border-slate-100 bg-white hover:border-amber-200 text-slate-600'}`}>
                                 <div className="text-sm font-bold">{s.width_cm} cm</div>
                                 <div className="text-[10px] uppercase opacity-60">{s.label}</div>
                              </button>
                           ))}
                        </div>
                    </div>
                    <NumberInput label="Cantitate" value={input.quantity} onChange={(v) => setInput(p => ({ ...p, quantity: v }))} />
                  </div>
               </AccordionStep>

               <AccordionStep stepNumber={2} title="Grafică & Design" summary={summaryStep2} isOpen={activeStep === 2} onClick={() => setActiveStep(2)} isLast={true}>
                  <div className="py-4 space-y-4">
                     <div className="grid grid-cols-2 gap-2">
                        <OptionButton active={input.designOption === 'upload'} onClick={() => setInput(p => ({ ...p, designOption: 'upload' }))} title="Am Grafică" subtitle="PNG / PDF / JPG" />
                        <OptionButton active={input.designOption === 'pro'} onClick={() => setInput(p => ({ ...p, designOption: 'pro' }))} title="Design Pro" subtitle={`+${formatMoneyDisplay(ROLLUP_CONSTANTS.PRO_DESIGN_FEE)}`} />
                     </div>
                     {input.designOption === 'upload' && (
                       <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-xl cursor-pointer hover:border-amber-500 transition-all bg-slate-50 dark:bg-slate-900">
                          {uploading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"></div> : artworkUrl ? <Check className="text-amber-500" /> : <UploadCloud className="text-gray-400" />}
                          <span className="text-xs font-bold text-gray-500 mt-2">{artworkUrl ? "Fișier Gata" : "Încarcă fișierul"}</span>
                          <input type="file" className="hidden" onChange={e => handleArtworkFileInput(e.target.files?.[0] || null)} />
                       </label>
                     )}
                  </div>
               </AccordionStep>
            </div>

            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200 p-4 lg:static lg:p-8 lg:mt-8 lg:bg-white lg:border lg:rounded-2xl lg:shadow-lg dark:bg-slate-900 dark:border-slate-800">
               <div className="flex flex-col gap-4">
                  <div className="flex flex-row justify-between items-center w-full gap-4 order-2 lg:order-1">
                     <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Preț Total</span>
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
                 <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed">
                   <p>Sistemele Roll-up sunt ideale pentru prezentări rapide, târguri și puncte de vânzare. Ușor de transportat și montat în mai puțin de 60 de secunde.</p>
                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
                      <li className="flex items-start gap-2"><Check className="text-amber-600 mt-1 shrink-0" size={16} /> <span><strong>Material Print:</strong> Polipropilenă sau Frontlit 440g cu spate gri (blockout).</span></li>
                      <li className="flex items-start gap-2"><Check className="text-amber-600 mt-1 shrink-0" size={16} /> <span><strong>Casetă:</strong> Aluminiu rezistent cu picioare de susținere.</span></li>
                      <li className="flex items-start gap-2"><Check className="text-amber-600 mt-1 shrink-0" size={16} /> <span><strong>Transport:</strong> Geantă textilă de protecție inclusă în preț.</span></li>
                   </ul>
                 </div>
               )}
               {activeTab === 'faq' && <FaqAccordion qa={productFaqs} />}
            </div>
        </div>
        <div className="mt-8"><QuickNav title="Vrei alt format?" /></div>
      </div>
      <MobilePriceBar totalPrice={displayedTotal} onAddToCart={handleAddToCart} isVisible={true} />
    </main>
  );
}
