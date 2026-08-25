"use client";
import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/ToastProvider";
import { ShoppingCart, Info, UploadCloud, Ruler, TrendingUp, MessageCircle, ShieldCheck, Zap, Image as ImageIcon, Check, Layers } from "lucide-react";
import DeliveryEstimation from "./DeliveryEstimation";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from 'next/link';
import FaqAccordion from "./FaqAccordion";
import DynamicBannerPreview from "./DynamicBannerPreview";

import {
  calculateBannerVersoPrice,
  getBannerVersoUpsell,
  BANNER_VERSO_CONSTANTS,
  formatMoneyDisplay,
  roundMoney,
  type PriceInputBannerVerso
} from "@/lib/pricing";
import { QA } from "@/types";
import QuickNav from "@/components/QuickNav";
import RelatedProducts from "@/components/RelatedProducts";

import { AccordionStep } from "./ui/AccordionStep";
import { OptionButton } from "./ui/OptionButton";
import { NumberInput } from "./ui/NumberInput";
import MobilePriceBar from "./MobilePriceBar";

const productFaqs: QA[] = [
  { question: "Ce material este folosit pentru bannerele față-verso?", answer: "Folosim material tip Blockout (650g/mp), special conceput pentru a bloca lumina, asigurând vizibilitate perfectă a graficii pe ambele fețe." },
  { question: "Care este diferența de preț față de cel cu o singură față?", answer: "Bannerele față-verso sunt calculate cu o bază de preț de aproximativ 1.5x față de cele standard, datorită materialului mai scump și procesului de imprimare mai complex." },
  { question: "Finisajele sunt incluse în preț?", answer: "Da, tivul de rezistență perimetral și capsele metalice sunt incluse standard. Puteți opta și pentru găuri de vânt." },
  { question: "Pot avea grafică diferită pe față și pe verso?", answer: "Da. Puteți alege să încărcați două grafici diferite sau să solicitați un design profesional separat pentru fiecare față." },
];

function BannerModeSwitchInline() {
  const pathname = usePathname() || "";
  const isVerso = !!pathname && (pathname.includes("/banner-verso") || pathname === "/configurator/banner-verso");
  const isMesh = pathname.includes("/mesh");
  const isFace = !isVerso && !isMesh && pathname.includes("/banner");

  return (
    <div className="flex flex-wrap gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
      <Link href="/banner" className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${isFace ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>O față</Link>
      <Link href="/banner-verso" className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${isVerso ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Față-verso</Link>
      <Link href="/configurator/mesh" className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${isMesh ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Mesh</Link>
    </div>
  );
}

export default function BannerVersoConfigurator({ productSlug, initialWidth: initW, initialHeight: initH, productImage }: { productSlug?: string; initialWidth?: number; initialHeight?: number; productImage?: string }) {
  const { addItem } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const toast = useToast();

  const [input, setInput] = useState<PriceInputBannerVerso>(() => ({
    width_cm: searchParams.get("w") ? parseFloat(searchParams.get("w")!) : (initW ?? 200),
    height_cm: searchParams.get("h") ? parseFloat(searchParams.get("h")!) : (initH ?? 100),
    quantity: searchParams.get("q") ? parseInt(searchParams.get("q")!) : 1,
    want_wind_holes: searchParams.get("wind") === '1',
    same_graphic: searchParams.get("same") !== '0',
    designOption: "upload"
  }));

  const [viewMode, setViewMode] = useState<'gallery' | 'shape'>('gallery');
  const galleryImages = useMemo(() => productImage ? [productImage, "/products/banner/banner-1.webp"] : ["/products/fata-verso/banner-verso-1.webp", "/products/banner/banner-1.webp"], [productImage]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeImage, setActiveImage] = useState<string>(galleryImages[0]);
  const [artworkUrl, setArtworkUrl] = useState<string | null>(null);
  const [artworkUrlVerso, setArtworkUrlVerso] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [activeProductTab, setActiveProductTab] = useState<'descriere' | 'faq'>('descriere');

  const priceData = useMemo(() => calculateBannerVersoPrice(input), [input]);
  const displayedTotal = priceData.finalPrice;
  const upsellOpportunity = useMemo(() => getBannerVersoUpsell(input), [input]);

  const updateInput = <K extends keyof PriceInputBannerVerso>(k: K, v: PriceInputBannerVerso[K]) => setInput((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    const params = new URLSearchParams();
    if (input.width_cm) params.set("w", input.width_cm.toString());
    if (input.height_cm) params.set("h", input.height_cm.toString());
    if (input.quantity > 1) params.set("q", input.quantity.toString());
    if (input.want_wind_holes) params.set("wind", "1");
    if (!input.same_graphic) params.set("same", "0");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [input, pathname, router]);

  const handleArtworkFileInput = async (file: File | null, side: 'front' | 'verso' = 'front') => {
    if (!file) return;
    try {
      setUploading(true);
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (side === 'front') setArtworkUrl(data.url); else setArtworkUrlVerso(data.url);
      toast.success(`Fișier ${side} încărcat!`);
    } catch (e) {
      toast.error("Eroare la upload");
    } finally {
      setUploading(false);
    }
  };

  function handleAddToCart() {
    if (displayedTotal <= 0) return;
    addItem({
      id: `banner-verso-${Date.now()}`,
      productId: productSlug || "banner-verso",
      title: `Banner Față-Verso ${input.width_cm}x${input.height_cm}cm`,
      price: roundMoney(displayedTotal / input.quantity),
      quantity: input.quantity,
      metadata: {
        "Dimensiune": `${input.width_cm}x${input.height_cm}cm`,
        "Material": "Blockout 650g",
        "Grafică": input.same_graphic ? "Identică pe ambele fețe" : "Diferită pe față/verso",
        "Artwork": artworkUrl || "La cerere",
        "Artwork Verso": !input.same_graphic ? (artworkUrlVerso || "Lipsă") : "Identic"
      }
    });
    toast.success("Adăugat în coș!");
  }

  const summaryStep1 = `${input.width_cm}x${input.height_cm}cm, ${input.quantity} buc.`;
  const summaryStep2 = `Blockout 650g, ${input.want_wind_holes ? "cu vânt" : "fără vânt"}`;
  const summaryStep3 = input.same_graphic ? "Identică" : "Diferită";

  return (
    <main className="bg-slate-50 dark:bg-slate-800 min-h-screen">
      <div className="container mx-auto px-4 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-slate-900 dark:text-white">
          <div className="lg:sticky top-24 h-max space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
              <div className="flex border-b border-gray-100 dark:border-slate-800">
                <button onClick={() => setViewMode('gallery')} className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2 transition-all ${viewMode === 'gallery' ? 'text-amber-600 bg-amber-50' : 'text-gray-500 hover:bg-slate-50'}`}><ImageIcon size={16} />Galerie</button>
                <button onClick={() => setViewMode('shape')} className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2 transition-all ${viewMode === 'shape' ? 'text-amber-600 bg-amber-50' : 'text-gray-500 hover:bg-slate-50'}`}><Ruler size={16} />Schiță</button>
              </div>
              <div className="aspect-square bg-white relative flex items-center justify-center overflow-hidden">
                {viewMode === 'gallery' ? (
                  <Image src={artworkUrl || activeImage} alt="Banner" fill className="object-contain p-4" priority sizes="(max-width: 768px) 100vw, 50vw" />
                ) : (
                  <DynamicBannerPreview width={input.width_cm} height={input.height_cm} hasGrommets={true} hasWindHoles={input.want_wind_holes} />
                )}
              </div>
              {viewMode === 'gallery' && !artworkUrl && (
                <div className="p-2 grid grid-cols-4 gap-2 border-t border-gray-100 dark:border-slate-800">
                  {galleryImages.map((src, i) => (
                    <button key={src} onClick={() => setActiveIndex(i)} className={`relative rounded-lg aspect-square overflow-hidden transition-all ${activeIndex === i ? "ring-2 ring-amber-500 ring-offset-2" : "hover:opacity-80"}`}><Image src={src} alt="Miniatura" fill className="object-cover" sizes="100px" /></button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800">
                 <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0"><Layers size={18} /></div>
                 <div><p className="text-[10px] font-bold uppercase text-gray-500 mb-0.5">Tehnologie</p><p className="text-xs font-bold">Blockout 100%</p></div>
               </div>
               <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800">
                  <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0"><Zap size={18} /></div>
                  <div><p className="text-[10px] font-bold uppercase text-gray-500 mb-0.5">Rezistență</p><p className="text-xs font-bold">UV & Intemperii</p></div>
                </div>
            </div>
          </div>

          <div>
            <header className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-none">Banner Față-Verso</h1>
                <BannerModeSwitchInline />
              </div>
              <p className="text-gray-600 dark:text-gray-400">Vizibilitate maximă pe ambele sensuri cu material blockout premium.</p>
            </header>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 px-4">
               <AccordionStep stepNumber={1} title="Cote & Cantitate" summary={summaryStep1} isOpen={activeStep === 1} onClick={() => setActiveStep(1)}>
                  <div className="py-4 space-y-6">
                     <div className="grid grid-cols-2 gap-4">
                        <NumberInput label="Lățime (cm)" value={input.width_cm} onChange={(v) => updateInput("width_cm", v)} />
                        <NumberInput label="Înălțime (cm)" value={input.height_cm} onChange={(v) => updateInput("height_cm", v)} />
                     </div>
                     <NumberInput label="Cantitate" value={input.quantity} onChange={(v) => updateInput("quantity", v)} />
                     {upsellOpportunity && (
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-800 flex items-center gap-4 cursor-pointer" onClick={() => updateInput("quantity", upsellOpportunity.requiredQty)}>
                           <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center text-white shrink-0"><TrendingUp size={20} /></div>
                           <div><p className="text-xs font-bold text-slate-900 dark:text-white mb-1">Reducere de Volum</p><p className="text-[10px] text-slate-500 font-medium tracking-tight">Alege {upsellOpportunity.requiredQty} buc. pentru {formatMoneyDisplay(upsellOpportunity.newUnitPrice)}/buc.</p></div>
                           <div className="ml-auto text-amber-600 font-bold text-xs">-{upsellOpportunity.discountPercent}%</div>
                        </div>
                     )}
                  </div>
               </AccordionStep>

               <AccordionStep stepNumber={2} title="Material & Finisaje" summary={summaryStep2} isOpen={activeStep === 2} onClick={() => setActiveStep(2)}>
                  <div className="py-4 space-y-4">
                     <div className="p-4 rounded-xl border-2 border-amber-600 bg-amber-50 flex items-center gap-4">
                        <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center text-white shrink-0"><ShieldCheck size={20} /></div>
                        <div>
                           <p className="text-sm font-bold text-amber-900">Material Blockout 650g</p>
                           <p className="text-[10px] text-amber-700 uppercase font-bold tracking-widest">Inclus Standard</p>
                        </div>
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <OptionButton active={true} onClick={() => {}} title="Tiv și Capse" subtitle="Incluse gratuit" />
                        <OptionButton active={input.want_wind_holes} onClick={() => updateInput("want_wind_holes", !input.want_wind_holes)} title="Găuri Vânt" subtitle="Recomandat la vânt" />
                     </div>
                  </div>
               </AccordionStep>

               <AccordionStep stepNumber={3} title="Grafică & Design" summary={summaryStep3} isOpen={activeStep === 3} onClick={() => setActiveStep(3)} isLast={true}>
                  <div className="py-4 space-y-6">
                     <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Tip Grafică</label>
                        <div className="grid grid-cols-2 gap-2">
                           <OptionButton active={input.same_graphic} onClick={() => updateInput("same_graphic", true)} title="Identică" subtitle="Aceeași pe ambele fețe" />
                           <OptionButton active={!input.same_graphic} onClick={() => updateInput("same_graphic", false)} title="Diferită" subtitle="Machetă separată verso" />
                        </div>
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <OptionButton active={input.designOption === 'upload'} onClick={() => updateInput("designOption", "upload")} title="Am Grafică" subtitle="Upload fișier" />
                        <OptionButton active={input.designOption === 'pro'} onClick={() => updateInput("designOption", "pro")} title="Design Pro" subtitle={`+${formatMoneyDisplay(input.same_graphic ? BANNER_VERSO_CONSTANTS.FEES.PRO_SAME : BANNER_VERSO_CONSTANTS.FEES.PRO_DIFF)}`} />
                     </div>
                     {input.designOption === 'upload' && (
                        <div className={`grid gap-4 ${!input.same_graphic ? 'grid-cols-2' : 'grid-cols-1'}`}>
                           <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-xl cursor-pointer hover:border-amber-500 transition-all bg-slate-50 dark:bg-slate-900">
                              {uploading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"></div> : artworkUrl ? <Check className="text-amber-500" /> : <UploadCloud className="text-gray-400" />}
                              <span className="text-xs font-bold text-gray-500 mt-2">{artworkUrl ? "Față OK" : "Grafică Față"}</span>
                              <input type="file" className="hidden" onChange={e => handleArtworkFileInput(e.target.files?.[0] || null, 'front')} />
                           </label>
                           {!input.same_graphic && (
                              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-xl cursor-pointer hover:border-amber-500 transition-all bg-slate-50 dark:bg-slate-900">
                                 {uploading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"></div> : artworkUrlVerso ? <Check className="text-amber-500" /> : <UploadCloud className="text-gray-400" />}
                                 <span className="text-xs font-bold text-gray-500 mt-2">{artworkUrlVerso ? "Verso OK" : "Grafică Verso"}</span>
                                 <input type="file" className="hidden" onChange={e => handleArtworkFileInput(e.target.files?.[0] || null, 'verso')} />
                              </label>
                           )}
                        </div>
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
                  <button key={t} onClick={() => setActiveProductTab(t as any)} className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${activeProductTab === t ? 'text-amber-600 border-amber-600 bg-amber-50' : 'text-gray-500 border-transparent hover:bg-slate-50'}`}>{t}</button>
               ))}
            </nav>
            <div className="p-6 lg:p-8">
               {activeProductTab === 'descriere' && (
                 <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed">
                   <p>Bannerele față-verso (Blockout) sunt soluția ideală pentru spațiile în care publicul circulă din ambele direcții. Realizate pe un material cu inserție de carbon, acestea sunt 100% opace.</p>
                   <p>Alege dimensiunile dorite în cm. Toate bannerele peste 1mp beneficiază de tiv de rezistență și capse metalice incluse gratuit.</p>
                 </div>
               )}
               {activeProductTab === 'faq' && <FaqAccordion qa={productFaqs} />}
            </div>
        </div>
        <div className="mt-8"><QuickNav title="Vrei alt format?" /></div>
        <RelatedProducts category="bannere" />
      </div>
      <MobilePriceBar totalPrice={displayedTotal} onAddToCart={handleAddToCart} isVisible={true} />
    </main>
  );
}
