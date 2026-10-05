"use client";
import { ShoppingCart } from "lucide-react";
import { formatMoneyDisplay } from "@/lib/pricing";
export function MobileConfiguratorSummary({ total, onAdd, disabled = false }: { total: number; onAdd: () => void; disabled?: boolean }) {
 return <div data-product-mobile-summary className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 pb-safe shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.1)]"><div className="mx-auto flex max-w-md items-center justify-between gap-4"><div className="flex flex-col leading-none"><span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">Total Plată</span><span className="text-xl font-black text-slate-900">{formatMoneyDisplay(total)}</span></div><button type="button" onClick={onAdd} disabled={disabled} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 disabled:opacity-50"><ShoppingCart size={18} /> Adaugă</button></div></div>;
}
