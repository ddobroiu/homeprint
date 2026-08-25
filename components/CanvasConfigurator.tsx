"use client";
import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/ToastProvider";
import { ShoppingCart, Info, X, UploadCloud, MessageCircle, TrendingUp, Sparkles, Layers, Ruler, Frame, ChevronDown } from "lucide-react";
import DeliveryEstimation from "./DeliveryEstimation";
import FaqAccordion from "./FaqAccordion";
import Reviews from "./Reviews";
import RelatedProducts from "./RelatedProducts";
import QuickNav from "@/components/QuickNav";
import { QA } from "@/types";
import {
  calculateCanvasPrice,
  getCanvasUpsell,
  CANVAS_CONSTANTS,
  formatMoneyDisplay,
  type PriceInputCanvas
} from "@/lib/pricing";
import Link from "next/link";
import { AccordionStep } from "./ui/AccordionStep";
import { NumberInput } from "./ui/NumberInput";
import { OptionButton } from "./ui/OptionButton";
import MobilePriceBar from "./MobilePriceBar";

const GALLERY_BASE = ["/products/canvas/canvas-1.webp", "/products/canvas/canvas-2.webp", "/products/canvas/canvas-3.webp"] as const;

const canvasFaqs: QA[] = [
  { question: "Ce este canvasul Fine Art?", answer: "Este o pânză texturată de calitate superioară, similară celei folosite de pictori. Imprimarea se face cu cerneală eco-solvent rezistentă." },
  { question: "Șasiul este inclus?", answer: "Da, toate tablourile vin montate pe șasiu din lemn masiv, gata de atârnat." },
];

export default function CanvasConfigurator({ productSlug, initialWidth: initW, initialHeight: initH, productImage, productTitle, productDescription }: { productSlug?: string; initialWidth?: number; initialHeight?: number; productImage?: string; productTitle?: string; productDescription?: string; }) {
  const { addItem } = useCart();
  const GALLERY = useMemo(() => productImage ? [productImage, ...GALLERY_BASE] : GALLERY_BASE, [productImage]);
  const toast = useToast();

  const [input, setInput] = useState<PriceInputCanvas>({ width_cm: initW ?? 0, height_cm: initH ?? 0, quantity: 1, edge_type: "mirror", designOption: "upload", frameType: "framed", framedSize: "30x40", framedShape: "rectangle" });
  const [lengthText, setLengthText] = useState(initW ? String(initW) : "");
  const [heightText, setHeightText] = useState(initH ? String(initH) : "");
  const [activeImage, setActiveImage] = useState<string>(GALLERY[0]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [artworkUrl, setArtworkUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [activeProductTab, setActiveProductTab] = useState<'descriere' | 'recenzii' | 'faq'>('descriere');

  const priceData = useMemo(() => calculateCanvasPrice(input), [input]);
  const displayedTotal = priceData.finalPrice;
  const upsellOpportunity = useMemo(() => getCanvasUpsell(input), [input]);

  const updateInput = <K extends keyof PriceInputCanvas>(k: K, v: PriceInputCanvas[K]) => setInput((p) => ({ ...p, [k]: v }));

  const handleArtworkFileInput = async (file: File | null) => {
    if (!file) return;
    try {
      setUploading(true);
      const form = new FormData(); form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      setArtworkUrl(data.url);
    } catch (e) { toast.error("Eroare la upload"); } finally { setUploading(false); }
  };

  function handleAddToCart() {
    if (displayedTotal <= 0) return;
    addItem({
      id: `canvas-${Date.now()}`,
      productId: productSlug || "canvas",
      slug: productSlug || "canvas",
      title: productTitle || "Tablou Canvas",
      price: displayedTotal / input.quantity,
      quantity: input.quantity,
      metadata: { "Dimensiune": input.frameType === "framed" ? input.framedSize : `${input.width_cm}x${input.height_cm}cm`, "Tip": input.frameType === "framed" ? "Cu Ramă" : "Fără Ramă", artworkUrl: artworkUrl || productImage }
    });
    toast.success("Adăugat în coș!");
  }

  const summaryStep1 = input.frameType === "framed" ? "Cu Ramă" : "Fără Ramă";
  const summaryStep2 = input.frameType === "framed" ? `${input.framedSize}cm` : `${input.width_cm}x${input.height_cm}cm`;

  return (
    <main className="bg-slate-50 dark:bg-slate-800 min-h-screen">
      <div className="container mx-auto px-4 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="lg:sticky top-24 h-max space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
               <div className="aspect-square relative flex items-center justify-center overflow-hidden">
                  <Image src={artworkUrl || activeImage} alt="Canvas" fill className="object-contain p-4" priority sizes="(max-width: 768px) 100vw, 50vw" />
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0"><Frame size={18} /></div>
                <div><p className="text-[10px] font-bold uppercase text-gray-500 mb-0.5">Suport</p><p className="text-xs font-bold text-gray-800">Pânză Art</p></div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0"><Layers size={18} /></div>
                <div><p className="text-[10px] font-bold uppercase text-gray-500 mb-0.5">Șasiu</p><p className="text-xs font-bold text-gray-800">Lemn Masiv</p></div>
              </div>
            </div>
          </div>

          <div>
            <header className="mb-6">
              <div className="flex justify-between items-center gap-4 mb-3"><h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{productTitle || "Configurator Canvas"}</h1></div>
              <div className="flex justify-between items-center"><p className="text-gray-600 dark:text-gray-400">Transformă pozele în artă.</p><button type="button" onClick={() => setDetailsOpen(true)} className="btn-outline inline-flex items-center text-sm px-3 py-1.5"><Info size={16} /><span className="ml-2">Detalii</span></button></div>
            </header>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 px-4">
               <AccordionStep stepNumber={1} title="Tip Montaj" summary={summaryStep1} isOpen={activeStep === 1} onClick={() => setActiveStep(1)}>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <OptionButton active={input.frameType === "framed"} onClick={() => updateInput("frameType", "framed")} title="Cu Ramă (Șasiu)" subtitle="Gata de pus pe perete" />
                    <OptionButton active={input.frameType === "none"} onClick={() => updateInput("frameType", "none")} title="Fără Ramă" subtitle="Doar pânza" />
                  </div>
               </AccordionStep>

               <AccordionStep stepNumber={2} title="Dimensiuni & Tiraj" summary={summaryStep2} isOpen={activeStep === 2} onClick={() => setActiveStep(2)}>
                  {input.frameType === "framed" ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
                      {Object.keys(CANVAS_CONSTANTS.FRAMED_PRICES_RECTANGLE).map((size) => (
                        <button key={size} onClick={() => updateInput("framedSize", size)} className={`p-3 text-sm font-bold border-2 rounded-lg transition-all ${input.framedSize === size ? "border-amber-600 bg-amber-50 text-amber-700" : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"}`}>{size}cm</button>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <NumberInput 
                        label="Lungime (cm)" 
                        value={input.width_cm} 
                        onChange={v => updateInput("width_cm", v)} 
                      />
                      <NumberInput 
                        label="Înălțime (cm)" 
                        value={input.height_cm} 
                        onChange={v => updateInput("height_cm", v)} 
                      />
                    </div>
                  )}
                  <div className="mt-4"><NumberInput label="Cantitate (buc)" value={input.quantity} onChange={v => updateInput("quantity", v)} /></div>
               </AccordionStep>

               <AccordionStep stepNumber={3} title="Grafică" summary={input.designOption} isOpen={activeStep === 3} onClick={() => setActiveStep(3)} isLast={true}>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button onClick={() => updateInput("designOption", "upload")} className={`p-3 rounded-lg border-2 text-sm ${input.designOption === 'upload' ? 'border-amber-600 bg-amber-50' : 'border-gray-300 bg-white hover:border-gray-400'}`}>Încărcă Poza</button>
                    <button onClick={() => updateInput("designOption", "pro")} className={`p-3 rounded-lg border-2 text-sm ${input.designOption === 'pro' ? 'border-amber-600 bg-amber-50' : 'border-gray-300 bg-white hover:border-gray-400'}`}>Design Pro</button>
                  </div>
                  {input.designOption === 'upload' && (
                    <div className="mt-4">
                      <label className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                         <span className="flex items-center space-x-2"><UploadCloud className="w-6 h-6 text-gray-600" /><span className="font-medium text-gray-600">Apasă pentru upload</span></span>
                         <input type="file" className="hidden" onChange={e => handleArtworkFileInput(e.target.files?.[0] ?? null)} />
                      </label>
                      {artworkUrl && <p className="text-sm text-green-600 font-bold mt-2 text-center">Imagine încărcată!</p>}
                    </div>
                  )}
               </AccordionStep>
            </div>

            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 p-4 lg:static lg:p-8 lg:mt-8 lg:bg-white lg:border lg:rounded-2xl lg:shadow-lg dark:border-slate-800 animate-slide-up">
              <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between items-center w-full gap-4 order-2 lg:order-1">
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider mb-1">Preț Total</span>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{formatMoneyDisplay(displayedTotal)}</span>
                  </div>
                  <div className="flex-shrink-0"><DeliveryEstimation /></div>
                </div>
                <button onClick={handleAddToCart} className="btn-primary w-full py-4 lg:py-5 text-lg lg:text-xl font-black tracking-tight group order-1 lg:order-2">
                   <ShoppingCart size={24} className="inline-block mr-2" /><span className="font-bold">Adaugă în Coș</span>
                </button>
              </div>
            </div>

            <div className="mt-4 lg:mt-6 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <div className="grid grid-cols-2 gap-3">
                <a href="https://wa.me/40750473111" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-amber-600 hover:from-green-700 hover:to-amber-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"><MessageCircle size={18} /><span className="text-sm">WhatsApp</span></a>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"><Info size={18} /><span className="text-sm">Cerere Ofertă</span></Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 lg:mt-12 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800">
           <nav className="border-b border-gray-200 dark:border-slate-800 flex">
              {['descriere', 'recenzii', 'faq'].map(t => (
                <button key={t} onClick={() => setActiveProductTab(t as any)} className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${activeProductTab === t ? 'text-amber-600 border-amber-600 bg-amber-50' : 'text-gray-500 border-transparent hover:bg-slate-50'}`}>{t}</button>
              ))}
           </nav>
           <div className="p-6 lg:p-8">
              {activeProductTab === 'descriere' && <div className="prose dark:prose-invert max-w-none text-sm" dangerouslySetInnerHTML={{ __html: productDescription || "" }} />}
              {activeProductTab === 'recenzii' && <Reviews productSlug={productSlug || 'canvas'} />}
              {activeProductTab === 'faq' && <FaqAccordion qa={canvasFaqs} />}
           </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8"><QuickNav title="Aruncă o privire și la..." /><div className="mt-12"><RelatedProducts category="canvas" /></div></div>
      <MobilePriceBar totalPrice={displayedTotal} onAddToCart={handleAddToCart} isVisible={true} />
    </main>
  );
}
