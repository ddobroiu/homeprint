import React from "react";
import { Package, Check, ShieldCheck, Truck } from "lucide-react";
import { ConfigState } from "./types";
import { formatMoneyDisplay } from "@/lib/pricing";
import DeliveryEstimation from "@/components/DeliveryEstimation";

interface PreviewPanelProps {
    state: ConfigState;
    selectedConfig: any | null;
    totalPrice: number;
}

export const PreviewPanel = ({ state, selectedConfig, totalPrice }: PreviewPanelProps) => {

    if (!selectedConfig) {
        return (
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
                <Package className="text-slate-200 dark:text-slate-700 mb-4" size={64} />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Configurează Produsul</h3>
                <p className="text-xs text-slate-500 max-w-[200px]">Alege un produs din listă pentru a începe configurarea personalizată.</p>
            </div>
        );
    }

    const selectedMaterial = selectedConfig.materials?.find((m: any) => m.id === state.materialId);

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 p-6">
                <div className="aspect-square bg-slate-50 dark:bg-slate-800 rounded-xl mb-6 flex items-center justify-center p-8 relative overflow-hidden">
                    {state.artworkUrl ? (
                         <img src={state.artworkUrl} alt="Preview" className="w-full h-full object-contain" />
                    ) : (
                         <div className="flex flex-col items-center text-center opacity-30">
                            <Package size={64} />
                            <span className="text-[10px] font-bold uppercase mt-2">{selectedConfig.name}</span>
                         </div>
                    )}
                    <div className="absolute top-4 right-4 bg-amber-600 text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Preview</div>
                </div>

                <div className="space-y-4">
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white leading-tight">{selectedConfig.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">{state.width} x {state.height} cm • {state.quantity} buc</p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-slate-800 space-y-2">
                        {selectedMaterial && (
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-500">Material</span>
                                <span className="font-bold text-slate-900 dark:text-slate-200 text-right">{selectedMaterial.name}</span>
                            </div>
                        )}
                        {Object.entries(state.options).map(([key, value]) => {
                            if (!value || value === false) return null;
                            const labelMap: Record<string, string> = {
                                want_wind_holes: "Găuri Vânt",
                                thickness_mm: "Grosime",
                                color: "Culoare",
                                laminated: "Laminare",
                                print_type: "Tip Print",
                                twoSided: "Față-Verso",
                            };
                            const displayLabel = labelMap[key] || key.replace(/_/g, ' ');
                            let displayValue = String(value);
                            if (value === true) displayValue = "Da";
                            if (key === 'thickness_mm') displayValue += " mm";

                            return (
                                <div key={key} className="flex justify-between text-xs">
                                    <span className="text-slate-500 capitalize">{displayLabel}</span>
                                    <span className="font-bold text-slate-900 dark:text-slate-200 text-right">{displayValue}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Estimativ</span>
                            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{formatMoneyDisplay(totalPrice)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800 p-4 space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center"><Truck size={16} /></div>
                   <div className="flex-1"><DeliveryEstimation /></div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center"><ShieldCheck size={16} /></div>
                   <div className="flex-1"><span className="text-xs font-bold text-slate-800 dark:text-slate-200">Garanție Calitate 100%</span></div>
                </div>
            </div>
        </div>
    );
};
