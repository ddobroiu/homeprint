import React from "react";

interface TabButtonSEOProps {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

export const TabButtonSEO = ({ active, onClick, children }: TabButtonSEOProps) => (
    <button
        onClick={onClick}
        className={`flex-1 whitespace-nowrap py-5 px-1 border-b-2 font-black text-[10px] sm:text-xs uppercase tracking-widest italic transition-all ${active
            ? 'border-green-600 dark:border-green-500 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-500/5'
            : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/30'
            }`}
    >
        {children}
    </button>
);
