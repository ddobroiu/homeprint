"use client";
import React from "react";
import { ChevronDown } from "lucide-react";

interface AccordionStepProps {
  stepNumber: number;
  title: string;
  summary: string;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
  isLast?: boolean;
  premium?: boolean;
}

export const AccordionStep = ({
  stepNumber,
  title,
  summary,
  isOpen,
  onClick,
  children,
  isLast = false,
  premium = false
}: AccordionStepProps) => (
  <div className={`relative pl-12 ${premium ? 'premium-step' : ''}`}>
    <div className="absolute top-5 left-0 flex flex-col items-center h-full">
      <span className={`flex items-center justify-center w-8 h-8 rounded-full text-md font-bold transition-all duration-500 ${isOpen ? (premium ? 'bg-amber-600 text-white shadow-[0_0_15px_rgba(217,119,6,0.5)] scale-110' : 'bg-amber-600 text-white shadow-lg') : 'bg-slate-100 text-slate-400'}`}>
        {stepNumber}
      </span>
      {!isLast && <div className={`w-0.5 grow mt-3 rounded-full transition-colors duration-500 ${isOpen ? (premium ? 'bg-amber-600/30' : 'bg-amber-600/20') : 'bg-slate-100'}`}></div>}
    </div>
    <div className="flex-1">
      <button type="button" className="w-full flex items-center justify-between py-6 text-left group outline-none" onClick={onClick}>
        <div className="space-y-1">
          <h2 className={`text-xl font-black uppercase italic tracking-tighter transition-colors duration-300 ${isOpen ? (premium ? 'text-amber-600' : 'text-slate-900') : 'text-slate-400 group-hover:text-slate-600'}`}>{title}</h2>
          {!isOpen && <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 truncate max-w-[200px] sm:max-w-md italic">{summary}</p>}
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${isOpen ? (premium ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-900') : 'bg-transparent text-slate-300 group-hover:bg-slate-50 group-hover:text-slate-900'}`}>
           <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>
      <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 scale-100" : "grid-rows-[0fr] opacity-0 scale-[0.98]"}`}>
        <div className="overflow-hidden border-l-2 border-transparent pr-4">{children}</div>
      </div>
    </div>
  </div>
);
