"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ContactForm() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError(null);
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'A apărut o eroare la trimitere.');
            }

            setSent(true);
            setForm({ name: "", email: "", phone: "", message: "" });
        } catch (err: any) {
            setError(err.message || "Ceva nu a funcționat. Te rugăm să încerci din nou sau să ne suni.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-background py-24 lg:py-32 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.03)_0%,transparent_70%)] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-16 lg:mb-24">
                         <h1 className="text-5xl lg:text-8xl font-black text-white mb-8 tracking-tighter uppercase italic leading-none">
                            Hai să <span className="text-green-500 neon-text-green">Discutăm</span>
                        </h1>
                        <div className="h-2 w-32 bg-green-600 mx-auto rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] mb-10"></div>
                        <p className="text-xl lg:text-2xl text-slate-400 max-w-3xl mx-auto font-medium italic leading-relaxed">
                            Ai un proiect ambițios? Echipa HomePrint este aici să transforme viziunea ta în realitate publicitară de impact.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Information Grid */}
                        <div className="lg:col-span-5 space-y-8">
                            <div className="glass-card p-10 lg:p-12 border-white/5 bg-slate-900/40 relative group overflow-hidden">
                                <div className="absolute inset-0 bg-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                <h2 className="text-2xl font-black text-white mb-10 uppercase tracking-tighter italic flex items-center gap-4">
                                    <span className="text-green-500 font-mono">01.</span> Canale Directe
                                </h2>

                                <div className="space-y-10">
                                    {[
                                        { icon: Phone, label: 'Linie Telefonică', value: siteConfig.business.contact.phoneDisplay, link: `tel:${siteConfig.business.contact.phone}` },
                                        { icon: Mail, label: 'Email Business', value: siteConfig.business.contact.email, link: `mailto:${siteConfig.business.contact.email}` },
                                        { icon: MessageCircle, label: 'WhatsApp Live', value: 'Disponibil 24/7', link: `https://wa.me/${siteConfig.business.contact.whatsapp.replace('+', '')}`, highlight: true }
                                    ].map((item, idx) => (
                                        <a key={idx} href={item.link} className="flex items-center gap-6 group/item">
                                            <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-center group-hover/item:border-green-500/50 group-hover/item:bg-green-500/5 transition-all shadow-premium">
                                                <item.icon className="w-6 h-6 text-green-500" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1 italic">{item.label}</p>
                                                <p className={`text-lg font-bold italic tracking-tight ${item.highlight ? 'text-green-500' : 'text-slate-200'} group-hover/item:text-white transition-colors`}>
                                                    {item.value}
                                                </p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="glass-card p-10 border-white/5 bg-slate-900/40">
                                 <MapPin className="h-6 w-6 text-green-500 mb-6" />
                                 <h3 className="text-xl font-black text-white uppercase tracking-tighter italic mb-4">Adresa Noastră</h3>
                                 <p className="text-slate-400 font-medium italic leading-relaxed">
                                    {siteConfig.business.address.fullAddress}<br />
                                    <span className="text-green-500 font-black uppercase text-xs tracking-widest">{siteConfig.business.address.country}</span>
                                 </p>
                            </div>
                        </div>

                        {/* Form Area */}
                        <div className="lg:col-span-7 h-full">
                            <div className="glass-card p-10 lg:p-16 border-white/5 bg-slate-900/60 relative h-full">
                                {sent ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in zoom-in duration-500">
                                        <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                                            <CheckCircle2 className="w-12 h-12 text-green-500" />
                                        </div>
                                        <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 uppercase italic tracking-tighter">Mesaj Trimis!</h2>
                                        <p className="text-slate-400 text-lg font-medium italic mb-10 max-w-md">
                                            Vă mulțumim pentru încredere. Un consultant HomePrint vă va contacta în cel mai scurt timp posibil.
                                        </p>
                                        <button onClick={() => setSent(false)} className="px-10 py-5 rounded-xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest italic text-xs hover:bg-white hover:text-slate-950 transition-all">
                                            Scrie-ne alt mesaj
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-12">
                                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-4">Descrie Proiectul Tău</h2>
                                            <p className="text-slate-400 font-medium italic">Vom reveni cu o ofertă personalizată în maximum 2 ore lucrătoare.</p>
                                        </div>

                                        {error && (
                                            <div className="mb-8 p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-black italic uppercase tracking-widest">
                                                {error}
                                            </div>
                                        )}

                                        <form onSubmit={handleSubmit} className="space-y-10">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                <div className="space-y-3">
                                                    <label htmlFor="name" className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic ml-1">Nume Complet</label>
                                                    <Input
                                                        id="name" name="name"
                                                        placeholder="ex: Mihai Ionescu"
                                                        required
                                                        value={form.name} onChange={handleChange}
                                                        className="h-16 bg-slate-950/50 border-white/5 text-white placeholder:text-slate-600 italic font-bold focus:border-green-500/50 transition-all rounded-2xl"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label htmlFor="phone" className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic ml-1">Telefon Direct</label>
                                                    <Input
                                                        id="phone" name="phone"
                                                        placeholder="07xx xxx xxx"
                                                        value={form.phone} onChange={handleChange}
                                                        className="h-16 bg-slate-950/50 border-white/5 text-white placeholder:text-slate-600 italic font-bold focus:border-green-500/50 transition-all rounded-2xl"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <label htmlFor="email" className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic ml-1">Adresă Email</label>
                                                <Input
                                                    id="email" name="email" type="email"
                                                    placeholder="contact@firma.ro"
                                                    required
                                                    value={form.email} onChange={handleChange}
                                                    className="h-16 bg-slate-950/50 border-white/5 text-white placeholder:text-slate-600 italic font-bold focus:border-green-500/50 transition-all rounded-2xl"
                                                />
                                            </div>

                                            <div className="space-y-3">
                                                <label htmlFor="message" className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic ml-1">Detalii Proiect</label>
                                                <textarea
                                                    id="message" name="message"
                                                    required
                                                    rows={5}
                                                    placeholder="Doresc o ofertă pentru 10 bannere de dimensiunea..."
                                                    value={form.message} onChange={handleChange}
                                                    className="flex w-full rounded-[1.5rem] border border-white/5 bg-slate-950/50 px-6 py-5 text-white placeholder:text-slate-600 italic font-bold focus:outline-none focus:border-green-500/50 transition-all resize-none"
                                                />
                                            </div>

                                            <button 
                                                type="submit" 
                                                disabled={loading}
                                                className="w-full h-20 bg-green-500 rounded-[1.5rem] flex items-center justify-center gap-4 text-slate-950 font-black uppercase tracking-[0.2em] italic hover:bg-white hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 shadow-premium"
                                            >
                                                {loading ? (
                                                    <div className="w-6 h-6 border-4 border-slate-950/30 border-t-slate-950 animate-spin rounded-full"></div>
                                                ) : (
                                                    <>
                                                        Trimite Mesajul Premium
                                                        <Send className="w-5 h-5 -rotate-45" />
                                                    </>
                                                )}
                                            </button>

                                            <p className="text-[10px] text-center text-slate-500 font-black uppercase tracking-widest italic pt-4">
                                                Garantăm confidențialitatea datelor dvs. conform GDPR.
                                            </p>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
