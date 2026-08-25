"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();

    if (pathname?.startsWith("/admin") || pathname === "/editor") return null;

    return (
        <footer className="bg-slate-950 text-slate-400 py-12 relative isolate border-t border-slate-900 overflow-hidden">
            {/* Ambient Accent Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
            
            <div className="container mx-auto px-6 lg:px-12 !max-w-7xl">
                
                {/* Main Grid: 4 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
                    
                    {/* Brand Info */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <Link href="/" className="inline-block relative group">
                            <div className="relative w-36 h-8 grayscale brightness-200 contrast-100 group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-300">
                                <Image
                                    src="/logo.png"
                                    alt="HomePrint Logo"
                                    width={144}
                                    height={32}
                                    className="object-contain"
                                    loading="lazy"
                                />
                            </div>
                        </Link>
                        
                        <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                            Soluții premium de print digital și producție publicitară la nivel național.
                        </p>
                    </div>

                    {/* Links: Production */}
                     <div className="lg:col-span-2">
                        <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Producție</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/configuratoare" className="hover:text-amber-400 transition-colors">Configuratoare</Link></li>
                            <li><Link href="/shop" className="hover:text-amber-400 transition-colors">Catalog Shop</Link></li>
                            <li><Link href="/seap" className="hover:text-amber-400 transition-colors">Publicitate SEAP</Link></li>
                            <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Comenzi B2B</Link></li>
                        </ul>
                    </div>
                    
                    {/* Links: Info */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Informații</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/despre-noi" className="hover:text-amber-400 transition-colors">Despre Noi</Link></li>
                            <li><Link href="/urmareste-comanda" className="hover:text-amber-400 transition-colors">Status Comandă</Link></li>
                            <li><Link href="/livrare" className="hover:text-amber-400 transition-colors">Livrare</Link></li>
                            <li><Link href="/termeni" className="hover:text-amber-400 transition-colors">Termeni</Link></li>
                            <li><Link href="/confidentialitate" className="hover:text-amber-400 transition-colors">Confidențialitate</Link></li>
                            <li><Link href="/politica-retur" className="hover:text-amber-400 transition-colors">Politica de Retur</Link></li>
                            <li><Link href="/retragere-contract" className="hover:text-amber-400 transition-colors">Retrage-te din Contract</Link></li>
                            <li><Link href="/noutati" className="hover:text-amber-400 transition-colors">Noutăți</Link></li>
                        </ul>
                    </div>

                    {/* Links: Expertiza */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Expertiză</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/material" className="hover:text-amber-400 transition-colors">Materiale</Link></li>
                            <li><Link href="/servicii" className="hover:text-amber-400 transition-colors">Servicii & Finisaje</Link></li>
                            <li><Link href="/norme" className="hover:text-amber-400 transition-colors">Norme & Reglementări</Link></li>
                            <li><Link href="/stil" className="hover:text-amber-400 transition-colors">Stiluri de Design</Link></li>
                            <li><Link href="/industrii" className="hover:text-amber-400 transition-colors">Industrii</Link></li>
                            <li><Link href="/judet" className="hover:text-amber-400 transition-colors">Toate Județele</Link></li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Contact</h4>
                        <div className="space-y-4 text-sm">
                            <div className="flex gap-3">
                                <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" />
                                <span>Com. Topliceni, nr. 214, Jud. Buzău</span>
                            </div>
                            <div className="flex gap-3">
                                <Phone size={16} className="text-amber-400 shrink-0 mt-0.5" />
                                <a href={`tel:${siteConfig.phone.replace(/\s+/g, '').replace(/^0/, '+40')}`} className="hover:text-white transition-colors">{siteConfig.phone}</a>
                            </div>
                            <div className="flex gap-3">
                                <Mail size={16} className="text-amber-400 shrink-0 mt-0.5" />
                                <a href="mailto:contact@HomePrint.ro" className="hover:text-white transition-colors">contact@HomePrint.ro</a>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-4 mt-6">
                            {siteConfig.socialLinks.filter(l => l.title !== "Twitter").map((link) => (
                                <Link
                                    key={link.title}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={link.title}
                                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-amber-500 transition-colors"
                                >
                                    <link.icon size={14} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-600">
                    <p>&copy; {new Date().getFullYear()} {siteConfig.name}. Toate drepturile rezervate.</p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        {/* Official ANPC Badges */}
                        <div className="flex items-center gap-2">
                            <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                <img src="/250x50_icon_ANPC-SAL.webp" alt="Solutionarea Alternativa a Litigiilor" width={200} height={40} className="h-10 w-auto" loading="lazy" />
                            </a>
                            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                <img src="/250x50_icon_ANPC-SOL.webp" alt="Solutionarea Online a Litigiilor" width={200} height={40} className="h-10 w-auto" loading="lazy" />
                            </a>
                        </div>
                        
                        <span className="hidden md:inline mx-2">•</span>
                        
                        {/* Partners */}
                        <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-slate-700">
                            <a href="https://www.prynt.ro" target="_blank" className="hover:text-amber-500 transition-colors">Prynt.ro</a>
                            <a href="https://www.homeprint.ro" target="_blank" className="hover:text-amber-500 transition-colors">HomePrint</a>
                            <a href="https://www.tablou.net" target="_blank" className="hover:text-amber-500 transition-colors">Tablou.net</a>
                            <span className="text-slate-800">|</span>
                            <a href="https://e-web.ro" target="_blank" className="text-slate-500 hover:text-amber-500 transition-colors">Site realizat de e-web.ro</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
