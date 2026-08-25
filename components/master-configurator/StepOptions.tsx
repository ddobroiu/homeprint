import React from "react";
import { Layers, Check, ArrowRight } from "lucide-react";
import { ConfigState } from "./types";
import { OptionButton } from "../ui/OptionButton";

interface StepOptionsProps {
    selectedConfig: any;
    state: ConfigState;
    setState: React.Dispatch<React.SetStateAction<ConfigState>>;
    onNext: () => void;
}

export const StepOptions = ({ selectedConfig, state, setState, onNext }: StepOptionsProps) => {
    if (!selectedConfig) return null;

    const availableMaterials = selectedConfig.materials || [];

    return (
        <div className="py-6 space-y-8">
            {availableMaterials.length > 1 && (
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Materialul Produsului</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {availableMaterials.map((mat: any) => (
                            <OptionButton 
                                key={mat.id}
                                active={state.materialId === mat.id}
                                onClick={() => setState(prev => ({ ...prev, materialId: mat.id }))}
                                title={mat.name}
                                subtitle={mat.description}
                            />
                        ))}
                    </div>
                </div>
            )}

            {(state.selectedId === 'banner' || state.selectedId === 'banner-verso') && (
                <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Finisaje & Opțiuni</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                         <OptionButton 
                            active={state.options.want_hem_and_grommets !== false}
                            onClick={() => setState(prev => ({ ...prev, options: { ...prev.options, want_hem_and_grommets: !prev.options.want_hem_and_grommets } }))}
                            title="Tiv + Capse (Standard)"
                            subtitle="Incluse în preț"
                         />
                         <OptionButton 
                            active={state.options.want_wind_holes}
                            onClick={() => setState(prev => ({ ...prev, options: { ...prev.options, want_wind_holes: !prev.options.want_wind_holes } }))}
                            title="Găuri de vânt"
                            subtitle="Perforații pe folie PVC plină"
                         />
                    </div>
                </div>
            )}

            {['autocolante', 'stickers', 'window-graphics'].includes(state.selectedId!) && (
                <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Tip Producție & Finisaj</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                         <OptionButton 
                            active={state.options.print_type === 'print_cut' || !state.options.print_type}
                            onClick={() => setState(prev => ({ ...prev, options: { ...prev.options, print_type: 'print_cut' } }))}
                            title="Print + Cut"
                            subtitle="Tăiere pe contur"
                         />
                         <OptionButton 
                            active={state.options.print_type === 'print_only'}
                            onClick={() => setState(prev => ({ ...prev, options: { ...prev.options, print_type: 'print_only' } }))}
                            title="Doar Print"
                            subtitle="Fără tăiere (-20%)"
                         />
                         <OptionButton 
                            active={state.options.laminated}
                            onClick={() => setState(prev => ({ ...prev, options: { ...prev.options, laminated: !prev.options.laminated } }))}
                            title="Laminare"
                            subtitle="Protecție UV (+10%)"
                         />
                    </div>
                </div>
            )}

            <button onClick={onNext} className="btn-primary w-full py-4 text-base font-bold flex items-center justify-center gap-2">
                Pasul Final <ArrowRight size={20} />
            </button>
        </div>
    );
};
