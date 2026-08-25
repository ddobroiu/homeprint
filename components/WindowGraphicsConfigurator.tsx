"use client";
import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/ToastProvider";
import { 
  Ruler, 
  Layers, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Info, 
  ChevronDown, 
  X, 
  UploadCloud, 
  Upload, 
  TrendingUp, 
  Percent, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  Truck,
  Monitor,
  Check,
  Zap
} from "lucide-react";
import DeliveryEstimation from "./DeliveryEstimation";
import FaqAccordion from "./FaqAccordion";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useUserActivityTracking } from "@/hooks/useAbandonedCartCapture";
import QuickNav from "@/components/QuickNav";
import RelatedProducts from "@/components/RelatedProducts";
import { QA } from "@/types";
import {
  calculateWindowGraphicsPrice,
  getWindowGraphicsUpsell,
  WINDOW_GRAPHICS_CONSTANTS,
  formatMoneyDisplay,
  type PriceInputWindowGraphics
} from "@/lib/pricing";

import { AccordionStep } from "./ui/AccordionStep";
import { OptionButton } from "./ui/OptionButton";
import { NumberInput } from "./ui/NumberInput";
import MobilePriceBar from "./MobilePriceBar";

const productFaqs: QA[] = [
  { question: "Ce este folia perforată (Window Graphics)?", answer: "Este o folie PVC specială cu perforații (raport 50/50) care permite vizibilitatea completă din interior către exterior, oferind în același tempo o suprafață excelentă pentru print publicitar la exterior." },
  { question: "Cum se aplică pe geam?", answer: "Aplicarea se realizează exclusiv 'la uscat' pe suprafețe perfect curățate și degresate. Nu se recomandă folosirea apei." },
  { question: "Rezistă la ploaie și soare?", answer: "Da, folia este rezistentă la UV și intemperii. Durabilitatea medie este de 2-3 ani în condiții de expunere directă." },
];

export default function WindowGraphicsConfigurator({ productSlug, initialWidth: initW, initialHeight: initH, productImage }: { productSlug?: string; initialWidth?: number; initialHeight?: number; productImage?: string }) {
  const { addItem } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const toast = useToast();

  const [input, setInput] = useState<PriceInputWindowGraphics>(() => ({
    width_cm: searchParams.get("w") ? parseInt(searchParams.get("w")!) : (initW ?? 100),
    height_cm: searchParams.get("h") ? parseInt(searchParams.get("h")!) : (initH ?? 100),
    quantity: searchParams.get("q") ? parseInt(searchParams.get("q")!) : 1,
    designOption: "upload"
  }));

  const [artworkUrl, setArtworkUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [activeTab, setActiveTab] = useState<"descriere" | "faq">("descriere");

  const priceData = useMemo(() => calculateWindowGraphicsPrice(input), [input]);
  const displayedTotal = priceData.finalPrice;
  const upsellOpportunity = useMemo(() => getWindowGraphicsUpsell(input), [input]);

  useUserActivityTracking({
    configuratorId: "window-graphics",
    configuration: input,
    price: displayedTotal,
    quantity: input.quantity
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (input.width_cm) params.set("w", input.width_cm.toString());
    if (input.height_cm) params.set("h", input.height_cm.toString());
    if (input.quantity > 1) params.set("q", input.quantity.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [input, pathname, router]);

  const handleArtworkFileInput = async (file: File | null) => {
    if (!file) return;
    try {
      setUploading(true);
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      setArtworkUrl(data.url);
      toast.success("Grafică încărcată!");
    } catch (e) {
      toast.error("Eroare la upload");
    } finally {
      setUploading(false);
    }
  };

  function handleAddToCart() {
    if (displayedTotal <= 0) return;
    const unitPrice = Math.round((displayedTotal / input.quantity) * 100) / 100;
    addItem({
      id: `wg-${Date.now()}`,
      productId: productSlug || "window-graphics",
      title: `Window Graphics ${input.width_cm}x${input.height_cm}cm`,
      price: unitPrice,
      quantity: input.quantity,
      metadata: {
        "Dimensiuni": `${input.width_cm}x${input.height_cm}cm`,
        "Material": "Folie Perforată Window Graphics",
        "Artwork": artworkUrl || "La cerere"
      }
    });
    toast.success("Adăugat în coș!");
  }

  const summaryStep1 = `${input.width_cm}x${input.height_cm}cm, ${input.quantity} buc`;
  const summaryStep2 = input.designOption === 'upload' ? 'Am Grafică' : 'Vreau Design';

  return (
    <main className="bg-slate-50 dark:bg-slate-800 min-h-screen">
      <div className="container mx-auto px-4 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-slate-900 dark:text-white">
          <div className="lg:sticky top-24 h-max space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
               <div className="aspect-square relative flex items-center justify-center overflow-hidden">
                  <Image 
                    src={productImage || "/products/window-graphics/window-graphics-1.webp"}
                    alt="Window Graphics"
                    fill
                    className="object-contain p-4"
                    priority
                  />
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0"><ShieldCheck size={18} /></div>
                <div><p className="text-[10px] font-bold uppercase text-gray-500 mb-0.5">Certificat</p><p className="text-xs font-bold text-gray-800 dark:text-gray-200">UV Protection</p></div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0"><Monitor size={18} /></div>
                <div><p className="text-[10px] font-bold uppercase text-gray-500 mb-0.5">Vizibilitate</p><p className="text-xs font-bold text-gray-800 dark:text-gray-200">One-Way Vision</p></div>
              </div>
            </div>
          </div>

          <div>
            <header className="mb-6">
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Window Graphics</h1>
              <p className="text-gray-600 dark:text-gray-400">Personalizează vitrinele magazinului tău cu folie perforată de înaltă calitate.</p>
            </header>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 px-4">
              <AccordionStep stepNumber={1} title="Dimensiuni & Cantitate" summary={summaryStep1} isOpen={activeStep === 1} onClick={() => setActiveStep(1)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                   <div className="space-y-4">
                      <NumberInput label="Lățime (cm)" value={input.width_cm} onChange={(v) => setInput(p => ({ ...p, width_cm: v }))} />
                      <NumberInput label="Înălțime (cm)" value={input.height_cm} onChange={(v) => setInput(p => ({ ...p, height_cm: v }))} />
                   </div>
                   <div className="space-y-4">
                      <NumberInput label="Cantitate" value={input.quantity} onChange={(v) => setInput(p => ({ ...p, quantity: v }))} />
                   </div>
                   {upsellOpportunity && (
                    <div className="md:col-span-2 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800 flex items-center gap-4 cursor-pointer" onClick={() => setInput(p => ({ ...p, quantity: upsellOpportunity.requiredQty }))}>
                      <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center text-white shrink-0"><TrendingUp size={20} /></div>
                      <div>
                        <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-0.5">Sfat Reducere</p>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Adaugă încă {upsellOpportunity.requiredQty - input.quantity} buc. pentru a economisi {formatMoneyDisplay(upsellOpportunity.totalSavings)}.</p>
                      </div>
                    </div>
                  )}
                </div>
              </AccordionStep>

              <AccordionStep stepNumber={2} title="Machetă Grafică" summary={summaryStep2} isOpen={activeStep === 2} onClick={() => setActiveStep(2)} isLast={true}>
                <div className="grid grid-cols-2 gap-2 pt-2">
                   <OptionButton active={input.designOption === 'upload'} onClick={() => setInput(p => ({ ...p, designOption: 'upload' }))} title="Am Grafică" subtitle="Încarcă fișier" />
                   <OptionButton active={input.designOption === 'pro'} onClick={() => setInput(p => ({ ...p, designOption: 'pro' }))} title="Vreau Design" subtitle={`+${formatMoneyDisplay(WINDOW_GRAPHICS_CONSTANTS.PRO_DESIGN_FEE)}`} />
                </div>
                {input.designOption === 'upload' && (
                  <div className="mt-4">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer hover:border-amber-400 transition-colors">
                       {uploading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"></div> : artworkUrl ? <Check className="text-amber-600" /> : <UploadCloud className="text-gray-400" />}
                       <span className="text-xs text-gray-500 mt-2 font-bold">{artworkUrl ? "Fișier Încărcat" : "Încarcă Fișier (PDF, TIFF, JPG)"}</span>
                       <input type="file" className="hidden" onChange={e => handleArtworkFileInput(e.target.files?.[0] || null)} />
                    </label>
                  </div>
                )}
              </AccordionStep>
            </div>

            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200 p-4 lg:static lg:p-8 lg:mt-8 lg:bg-white lg:border lg:rounded-2xl lg:shadow-lg dark:bg-slate-900 dark:border-slate-800">
              <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between items-center w-full gap-4 order-2 lg:order-1">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase font-black tracking-wider mb-1">Preț Total</span>
                    <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{formatMoneyDisplay(displayedTotal)}</span>
                  </div>
                  <div className="flex-shrink-0"><DeliveryEstimation /></div>
                </div>
                <button onClick={handleAddToCart} className="btn-primary w-full py-4 lg:py-5 text-lg font-black tracking-tight group order-1 lg:order-2">
                   <ShoppingCart size={24} className="inline-block mr-2" /><span>Adaugă în Coș</span>
                </button>
              </div>
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
                   <p>Folia Window Graphics (sau autocolant perforat) este soluția ideală pentru decorarea geamurilor exterioare ale magazinelor, sediilor sau autovehiculelor.</p>
                   <ul>
                     <li><strong>One-Way Vision:</strong> Permite luminii să treacă și oferă vizibilitate din interior spre exterior, în timp ce la exterior se vede doar grafica printată.</li>
                     <li><strong>Rezistență:</strong> Material rezistent la UV și intemperii, ideal pentru expunere prelungită la exterior.</li>
                     <li><strong>Calitate Print:</strong> Imprimare high-definition cu culori vii care atrag atenția.</li>
                   </ul>
                 </div>
               )}
               {activeTab === 'faq' && <FaqAccordion qa={productFaqs} />}
            </div>
        </div>
        <div className="mt-12"><QuickNav title="Alte tipuri de autocolante" /><div className="mt-12"><RelatedProducts category="autocolante" /></div></div>
      </div>
      <MobilePriceBar totalPrice={displayedTotal} onAddToCart={handleAddToCart} isVisible={true} />
    </main>
  );
}
