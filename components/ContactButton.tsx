"use client";
import { useEffect, useRef, useState } from "react";
import AiChatWidget from "./AiChatWidget";
import AiChatLauncher from "./AiChatLauncher";
import Link from "next/link";
import { MessageCircle, FileText, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function ContactButton() {
    const pathname = usePathname();
    const [chatOpen, setChatOpen] = useState(false);
    const [contactsOpen, setContactsOpen] = useState(false);
    const closeRef = useRef<HTMLButtonElement>(null);
    const triggerRef = useRef<HTMLElement | null>(null);
    useEffect(() => {
        const open = () => { triggerRef.current = document.activeElement as HTMLElement; setChatOpen(true); setContactsOpen(false); };
        window.addEventListener("shopprint:open-chat", open);
        return () => window.removeEventListener("shopprint:open-chat", open);
    }, []);
    useEffect(() => {
        if (!chatOpen) return;
        closeRef.current?.focus();
        const key = (event: KeyboardEvent) => { if (event.key === "Escape") { setChatOpen(false); triggerRef.current?.focus(); } };
        window.addEventListener("keydown", key);
        return () => window.removeEventListener("keydown", key);
    }, [chatOpen]);
    const whatsappUrl = `https://wa.me/40750473111?text=${encodeURIComponent("Bună ziua, vă scriu de pe site-ul Homeprint.ro")}`;

    if (pathname?.includes("/editor")) {
        return null;
    }

    const hasMobileStickyBar =
        pathname != null &&
        /\/(banner|canvas|autocolante|rollup|tapet|hanorace|tricouri|pliante|flyere|afise|materiale|window-graphics|signage|checkout|banner-product)/.test(
            pathname
        );

    const positionClass = hasMobileStickyBar
        ? "bottom-20 max-sm:pb-safe sm:bottom-6"
        : "bottom-6 max-sm:pb-safe sm:bottom-6";

    return (
        <div className={`fixed ${positionClass} right-4 sm:right-6 z-[60] flex flex-col gap-4`}>
            {chatOpen && <div role="dialog" aria-label="Chat AI Homeprint" className="fixed bottom-24 right-4 z-[70] max-h-[80dvh] w-[calc(100vw-2rem)] max-w-md overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-xl sm:bottom-6 sm:right-24"><div className="flex justify-end px-3 pt-3"><button ref={closeRef} type="button" onClick={() => { setChatOpen(false); triggerRef.current?.focus(); }} aria-label="Închide chatul" className="rounded-full p-2 text-slate-500 hover:bg-slate-100"><X size={20} /></button></div><AiChatWidget compact /></div>}
            <div className={`${contactsOpen ? "flex" : "hidden"} flex-col items-end gap-3 sm:flex`}>
            <AiChatLauncher iconOnly className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-800/10 bg-[var(--design-ink)] text-white shadow-lg hover:bg-blue-800 focus-visible:ring-4 focus-visible:ring-blue-200" />

            {/* Quote Request Button */}
            <Link
                href="/contact"
                className="flex items-center justify-center w-14 h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-4 focus:ring-slate-300 group relative"
                aria-label="Cere Ofertă Personalizată"
                title="Cere Ofertă Personalizată"
            >
                <FileText size={28} />
                <span className="absolute right-full mr-4 bg-slate-900 text-white text-xs font-bold py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-slate-700">
                    Cere Ofertă
                </span>
            </Link>

            {/* WhatsApp Button */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300 group relative"
                aria-label="Contactează-ne pe WhatsApp"
                title="Contactează-ne pe WhatsApp"
            >
                <span className="absolute inset-0 rounded-full bg-green-400/30 animate-ping"></span>
                <MessageCircle size={32} className="relative z-10" />
                <span className="absolute right-full mr-4 bg-green-500 text-white text-xs font-bold py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-green-400">
                    Suntem Online
                </span>
            </a>
            </div>
            <button type="button" onClick={() => setContactsOpen(!contactsOpen)} aria-expanded={contactsOpen} aria-label="Ajutor: chat AI, WhatsApp sau ofertă" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--design-accent)] px-4 py-3 text-sm font-medium text-white shadow-md sm:hidden">{contactsOpen ? <X size={18}/> : <MessageCircle size={18}/>}Ajutor</button>
        </div>
    );
}
