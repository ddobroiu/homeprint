"use client";

import React from "react";
import { ShieldCheck, Truck, Clock, Headphones, Award, CheckCircle } from "lucide-react";

const trustPoints = [
    {
        icon: ShieldCheck,
        title: "Plată Securizată",
        description: "Criptare SSL și procesare sigură a plăților prin parteneri autorizați.",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
    },
    {
        icon: Truck,
        title: "Livrare Rapidă",
        description: "Expediere prin DPD în 1-2 zile lucrătoare de la finalizarea producției.",
        color: "text-green-400",
        bgColor: "bg-green-500/10",
    },
    {
        icon: Clock,
        title: "Producție Rapidă",
        description: "Majoritatea comenzilor sunt gata de livrare în 24-48 de ore.",
        color: "text-amber-400",
        bgColor: "bg-amber-500/10",
    },
    {
        icon: Award,
        title: "Calitate Garantată",
        description: "Folosim materiale premium și cerneluri rezistente la UV și intemperii.",
        color: "text-amber-400",
        bgColor: "bg-amber-500/10",
    },
];

export default function TrustSection() {
    return (
        <section className="py-24 bg-background overflow-hidden relative">
            <div className="container mx-auto px-4 z-10 relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase mb-6 italic">
                        De ce să alegi <span className="text-green-500 neon-text-green">HomePrint.ro</span>?
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium italic">
                        Suntem dedicați calității și transparenței în fiecare etapă a procesului de producție.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {trustPoints.map((point, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-[2.5rem] border border-white/5 bg-slate-900/30 backdrop-blur-sm hover:bg-slate-900/50 hover:border-green-500/30 transition-all duration-500 hover:-translate-y-2 shadow-soft hover:shadow-premium"
                        >
                            <div className={`w-16 h-16 ${point.bgColor} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner border border-white/5`}>
                                <point.icon className={`w-8 h-8 ${point.color}`} />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter italic">{point.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                {point.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Badges Section */}
                <div className="mt-20 pt-16 border-t border-white/5 flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <span className="font-black text-[10px] uppercase tracking-[0.2em] text-white italic">SSL SECURE</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <span className="font-black text-[10px] uppercase tracking-[0.2em] text-white italic">PLATĂ CU CARDUL</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <span className="font-black text-[10px] uppercase tracking-[0.2em] text-white italic">DPD DELIVERY</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <span className="font-black text-[10px] uppercase tracking-[0.2em] text-white italic">GARANȚIE PRINT</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <span className="font-black text-[10px] uppercase tracking-[0.2em] text-white italic">SUPORT DEDICAT</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
