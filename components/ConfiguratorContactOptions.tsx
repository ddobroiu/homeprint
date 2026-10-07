"use client";
import Link from "next/link";
import { MessageCircle, FileText } from "lucide-react";
import AiChatLauncher from "./AiChatLauncher";
import { whatsappHref } from "./seo/WhatsAppBar";
export default function ConfiguratorContactOptions({ product }: { product: string }) {
  const button = "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors";
  return <section className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="mb-3 text-center text-xs text-slate-600">Ai nevoie de ajutor sau o ofertă personalizată?</p><div className="grid grid-cols-1 gap-2 sm:grid-cols-3"><a href={whatsappHref(`Mă interesează ${product}`)} target="_blank" rel="noopener noreferrer" className={`${button} bg-blue-700 text-white hover:bg-blue-800`}><MessageCircle size={17}/>WhatsApp</a><Link href="/contact" className={`${button} bg-slate-700 text-white hover:bg-slate-800`}><FileText size={17}/>Cere ofertă</Link><AiChatLauncher className={`${button} border border-blue-800/20 bg-white text-[var(--design-ink)] hover:bg-blue-50`} /></div></section>;
}
