import React from "react";
import { Package, ArrowRightLeft, Flag, Frame, FileImage, StickyNote, Presentation, BookOpen, FileText, Layers, PanelTop, Square, Scan, Wind } from "lucide-react";
import { CONFIGURATORS_REGISTRY } from "@/lib/configurators-registry";
import { ConfigState } from "./types";

interface StepProductSelectionProps {
    state: ConfigState;
    onSelect: (id: string) => void;
}

export const StepProductSelection = ({ state, onSelect }: StepProductSelectionProps) => {

    return (
        <div className="py-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {CONFIGURATORS_REGISTRY.map((config) => {
                    const isSelected = state.selectedId === config.id;
                    
                    // Icon Mapping
                    let IconComponent = Package;
                    if (config.id === 'mesh') IconComponent = Wind;
                    else if (config.id.includes('banner')) IconComponent = Flag;
                    else if (config.id === 'canvas') IconComponent = Frame;
                    else if (['afise', 'posters'].includes(config.id)) IconComponent = FileImage;
                    else if (['autocolante', 'stickers'].includes(config.id)) IconComponent = StickyNote;
                    else if (['rollup', 'pliant'].includes(config.id)) IconComponent = Presentation;
                    else if (['window', 'graphics'].some(k => config.id.includes(k))) IconComponent = Scan;
                    else if (['rigid', 'alucobond', 'plexiglass', 'forex'].some(k => config.category?.includes(k) || config.id.includes(k))) IconComponent = Square;

                    return (
                        <button
                            key={config.id}
                            onClick={() => onSelect(config.id)}
                            className={`group p-4 rounded-xl border-2 transition-all text-left flex flex-col gap-3 h-full
                                ${isSelected
                                    ? 'border-amber-600 bg-amber-50 text-amber-700 shadow-sm'
                                    : 'border-slate-100 bg-white hover:border-amber-200 text-slate-900 group-hover:bg-slate-50 shadow-sm'
                                }
                            `}
                        >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${isSelected ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-600'}`}>
                                <IconComponent size={20} />
                            </div>

                            <div className="flex-1">
                                <h4 className="font-bold text-xs leading-tight mb-1">{config.name}</h4>
                                <p className="text-[10px] text-slate-500 line-clamp-2 leading-tight hidden lg:block opacity-60 group-hover:opacity-100">
                                    {config.description}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
