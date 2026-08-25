import React from "react";
import { Package, Ruler, UploadCloud, Sparkles } from "lucide-react";

export const Header = () => {
    return (
        <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Simplu. Rapid. <span className="text-amber-600">Online.</span>
            </h2>
            <p className="text-base text-slate-500 max-w-xl mx-auto mb-10">
                Am simplificat procesul de comandă pentru ca tu să economisești timp. Vezi prețul instant și plasezi comanda în câteva secunde.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
                <div className="flex items-start gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
                    <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                        <Package size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">1. Alegi Produsul</h3>
                        <p className="text-xs text-slate-500 leading-normal">Explorează gama completă și selectează materialul de care ai nevoie.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
                    <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                        <Ruler size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">2. Configurezi Online</h3>
                        <p className="text-xs text-slate-500 leading-normal">Introduci dimensiunile și vezi prețul calculat instant.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
                    <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                        <UploadCloud size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">3. Livrare Rapidă</h3>
                        <p className="text-xs text-slate-500 leading-normal">Producem comanda prioritar și o expediem prin curier rapid.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
