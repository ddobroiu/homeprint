"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { usePathname } from "next/navigation";

const PRODUCT_LINKS = [
    { href: "/tapet", label: "Fototapet personalizat" },
    { href: "/canvas", label: "Tablouri canvas" },
    { href: "/shop/canvas", label: "Colecția de canvas" },
    { href: "/afise", label: "Postere și afișe" },
    { href: "/autocolante", label: "Autocolante decorative" },
    { href: "/materiale/plexiglass", label: "Plexiglas și panouri rigide" },
    { href: "/banner", label: "Bannere și mesh" },
    { href: "/rollup", label: "Roll-up și window graphics" },
    { href: "/pliante", label: "Pliante, flyere, cărți de vizită" },
    { href: "/tricouri", label: "Tricouri, hanorace, șepci" },
    { href: "/fonduri-pnrr", label: "Kituri fonduri UE" },
];

const GUIDE_LINKS = [
    { href: "/material", label: "Materiale pentru decor și print" },
    { href: "/stil", label: "Stiluri de design" },
    { href: "/servicii", label: "Finisaje și montaj" },
    { href: "/blog", label: "Ghiduri de măsurare și montaj" },
    { href: "/judet", label: "Livrare pe județe" },
    { href: "/dimensiuni", label: "Prețuri pe dimensiuni" },
    { href: "/preturi", label: "Prețuri pe cantități" },
    { href: "/sectoare-bucuresti", label: "Sectoare București" },
];

const COMPANY_LINKS = [
    { href: "/despre-noi", label: "Despre HomePrint" },
    { href: "/industrii", label: "Decor pentru birouri și spații comerciale" },
    { href: "/seap", label: "Achiziții SEAP / SICAP" },
    { href: "/contact", label: "Ofertă pentru designeri și proiecte" },
    { href: "/livrare", label: "Livrare și termene" },
    { href: "/urmareste-comanda", label: "Status comandă" },
    { href: "/noutati", label: "Noutăți" },
];

const LEGAL_LINKS = [
    { href: "/termeni", label: "Termeni" },
    { href: "/confidentialitate", label: "Confidențialitate" },
    { href: "/politica-cookies", label: "Cookies" },
    { href: "/politica-retur", label: "Retur" },
    { href: "/retragere-contract", label: "Retragere din contract" },
    { href: "/harta-site", label: "Harta site" },
];

export default function Footer() {
    const pathname = usePathname();

    if (pathname?.startsWith("/admin") || pathname === "/editor") return null;

    const phoneHref = `tel:${siteConfig.phone.replace(/\s+/g, "").replace(/^0/, "+40")}`;

    return (
        <footer className="bg-[#F3ECE1] text-stone-600 relative isolate border-t border-[#E4D9C8] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#1F4D3A]/50 to-transparent" />

            <div className="container mx-auto px-6 lg:px-12 !max-w-7xl py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 mb-8">
                    {/* Brand */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl text-stone-900 tracking-tight">Home<span className="text-[#1F4D3A]">Print</span></span>
                        </Link>
                        <p className="text-sm text-stone-600 leading-relaxed max-w-sm">
                            Fototapet, canvas, postere și autocolante de perete, produse în atelier propriu și livrate în toată țara.
                        </p>
                        <div className="space-y-3 text-sm">
                            <a href={phoneHref} className="flex items-center gap-3 hover:text-stone-900 transition-colors">
                                <Phone size={16} className="text-[#1F4D3A] shrink-0" />
                                <span>{siteConfig.phone}</span>
                            </a>
                            <a href={`mailto:${siteConfig.email.toLowerCase()}`} className="flex items-center gap-3 hover:text-stone-900 transition-colors">
                                <Mail size={16} className="text-[#1F4D3A] shrink-0" />
                                <span>{siteConfig.email.toLowerCase()}</span>
                            </a>
                            <div className="flex items-center gap-3">
                                <Clock size={16} className="text-[#1F4D3A] shrink-0" />
                                <span>Luni - Vineri 09:00 - 18:00</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin size={16} className="text-[#1F4D3A] shrink-0 mt-0.5" />
                                <span>{siteConfig.business.address.fullAddress}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 pt-1">
                            {siteConfig.socialLinks.filter((l) => l.title !== "Twitter" && l.title !== "Email").map((link) => (
                                <Link
                                    key={link.title}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={link.title}
                                    className="w-8 h-8 rounded-full bg-white border border-[#E4D9C8] flex items-center justify-center text-stone-500 hover:text-white hover:bg-[#1F4D3A] hover:border-[#1F4D3A] transition-colors"
                                >
                                    <link.icon size={14} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <FooterColumn title="Produse" links={PRODUCT_LINKS} />
                    <FooterColumn title="Ghiduri" links={GUIDE_LINKS} />
                    <FooterColumn title="Firme & instituții" links={COMPANY_LINKS} />
                    <FooterColumn title="Legal" links={LEGAL_LINKS} />
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-[#E4D9C8] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
                    <p>
                        &copy; {new Date().getFullYear()} {siteConfig.name}.ro · {siteConfig.business.legalName} · CUI {siteConfig.business.cui}
                    </p>
                    <div className="flex items-center gap-2">
                        <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <img src="/250x50-icon-anpc-sal.webp" alt="Soluționarea Alternativă a Litigiilor" width={200} height={40} className="h-10 w-auto" loading="lazy" />
                        </a>
                        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <img src="/250x50-icon-anpc-sol.webp" alt="Soluționarea Online a Litigiilor" width={200} height={40} className="h-10 w-auto" loading="lazy" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
    return (
        <div className="lg:col-span-2">
            <h4 className="text-stone-900 text-xs font-bold uppercase tracking-widest mb-4">{title}</h4>
            <ul className="space-y-1.5 text-[13px]">
                {[...links.filter((l) => l.href === "/judet" || l.href === "/dimensiuni" || l.href === "/preturi"), ...links.filter((l) => l.href !== "/judet" && l.href !== "/dimensiuni" && l.href !== "/preturi")].slice(0, 6).map((l) => (
                    <li key={l.href}>
                        <Link href={l.href} className="hover:text-[#1F4D3A] transition-colors">
                            {l.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
