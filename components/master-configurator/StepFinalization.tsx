import React, { useRef } from "react";
import { Check, UploadCloud, Type, Palette, ArrowRight, ShoppingCart, FileText } from "lucide-react";
import { ConfigState } from "./types";
import { formatMoneyDisplay } from "@/lib/pricing";
import DeliveryEstimation from "@/components/DeliveryEstimation";
import { OptionButton } from "../ui/OptionButton";

interface StepFinalizationProps {
    selectedConfig: any;
    state: ConfigState;
    setState: React.Dispatch<React.SetStateAction<ConfigState>>;
    totalPrice: number;
    handleAddToCart: () => void;
}

export const StepFinalization = ({
    selectedConfig,
    state,
    setState,
    totalPrice,
    handleAddToCart,
}: StepFinalizationProps) => {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleArtworkUpload = async (file: File) => {
        // Mock upload or actual logic would be passed from parent
        console.log("Uploading file:", file.name);
    };

    if (!selectedConfig) return null;

    return (
        <div className="py-6 space-y-8">
            <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Opțiuni Grafică & Design</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <OptionButton 
                        active={state.designOption === 'upload'}
                        onClick={() => setState(prev => ({ ...prev, designOption: 'upload' }))}
                        title="Am Grafică"
                        subtitle="Upload fișier"
                    />
                    <OptionButton 
                        active={state.designOption === 'text_only'}
                        onClick={() => setState(prev => ({ ...prev, designOption: 'text_only' }))}
                        title="Doar Text"
                        subtitle="Scrie mesajul"
                    />
                    <OptionButton 
                        active={state.designOption === 'pro'}
                        onClick={() => setState(prev => ({ ...prev, designOption: 'pro' }))}
                        title="Design Pro"
                        subtitle="Prynt Studio"
                    />
                </div>

                {state.designOption === 'upload' && (
                    <div className="mt-4">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer hover:border-amber-500 transition-colors bg-slate-50 dark:bg-slate-800">
                             <UploadCloud className="text-gray-400 mb-2" size={24} />
                             <span className="text-xs font-bold text-gray-500">Încarcă Macheta (PDF/TIFF)</span>
                             <input 
                                type="file" 
                                className="hidden" 
                                onChange={(e) => e.target.files?.[0] && handleArtworkUpload(e.target.files[0])} 
                             />
                        </label>
                    </div>
                )}

                {state.designOption === 'text_only' && (
                    <textarea
                        value={state.textDesign}
                        onChange={(e) => setState(prev => ({ ...prev, textDesign: e.target.value }))}
                        className="w-full h-24 p-4 rounded-xl border-2 border-slate-100 bg-slate-50 font-bold text-sm outline-none focus:border-amber-600 transition-all placeholder:text-slate-300"
                        placeholder="Introdu textul dorit pentru imprimare..."
                    />
                )}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Total Comandă</span>
                        <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{formatMoneyDisplay(totalPrice)}</span>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Preluare / Livrare</span>
                        <DeliveryEstimation />
                    </div>
                </div>
            </div>

            <button
                onClick={handleAddToCart}
                className="btn-primary w-full py-5 text-lg font-bold flex items-center justify-center gap-3 transition-transform active:scale-[0.98]"
            >
                <ShoppingCart size={24} />
                Confirmă & Adaugă în Coș
            </button>
        </div>
    );
};
