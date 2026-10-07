"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { brandDesign } from "@/lib/brandDesign";
import { siteConfig } from "@/lib/siteConfig";
import { CONTACT_EMAIL } from "@/lib/company";
import FooterLegal from "@/components/legal/FooterLegal";

export default function Footer() {
    const pathname = usePathname();
    if (pathname?.startsWith("/admin") || pathname === "/editor") return null;
    return <footer className="brand-footer compact-footer">
        <div className="compact-footer-wrap">
            <div className="compact-footer-main">
                <div className="compact-footer-brand">
                    <Link href="/" aria-label={`${brandDesign.name} - acasă`}><Image src="/logo.png" alt={brandDesign.name} width={180} height={60} className="brand-footer-logo-image" /></Link>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="compact-footer-email"><Mail size={14} />{CONTACT_EMAIL}</a>
                    <div className="compact-footer-social">{siteConfig.socialLinks.filter(l => l.title !== "Twitter" && l.title !== "Email").map(link => <Link key={link.title} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.title}><link.icon size={15} /></Link>)}</div>
                </div>
                <nav aria-label="Produse"><h4>Produse</h4><Link href="/shop">Shop</Link><Link href="/#configuratoare">Toate configuratoarele</Link><Link href="/pregatire-fisiere">Pregătirea fișierelor</Link><Link href="/ghid-print">Ghid de print</Link></nav>
                <nav aria-label="Comanda ta"><h4>Comanda ta</h4><Link href="/contact">Contact</Link><Link href="/livrare">Livrare și termene</Link><Link href="/urmareste-comanda">Urmărește comanda</Link><Link href="/despre-noi">Despre {brandDesign.name}</Link></nav>
            </div>
            <div className="compact-footer-legal"><FooterLegal showLinks /><div className="compact-footer-extra"><Link href="/stergere-date">Ștergere date</Link><Link href="/harta-site">Harta site</Link></div></div>
        </div>
    </footer>;
}
