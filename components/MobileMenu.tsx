"use client";

// Meniul mobil (sub xl): butonul de cautare, slotul pentru cos, butonul hamburger -> X si
// panoul pe tot ecranul (pe tableta: sertar in dreapta). Componenta e aceeasi pe toate
// site-urile de print; datele specifice site-ului sunt in lib/mobileMenu.ts.
import Link from "next/link";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { ArrowRight, Calculator, ChevronDown, ChevronRight, Heart, LogIn, LogOut, Mail, MessageCircle, Package, PencilRuler, Phone, Search, User } from "lucide-react";
import SearchBox from "./SearchBox";
import { siteConfig } from "@/lib/siteConfig";
import { brandDesign } from "@/lib/brandDesign";
import { mobileMenu } from "@/lib/mobileMenu";
import styles from "./MobileMenu.module.css";

type NavItem = { label: string; href: string; highlight?: boolean; children?: { label: string; href: string }[] };

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';
const subscribeNoop = () => () => {};
const telHref = `tel:${siteConfig.phone.replace(/\s+/g, "").replace(/^0/, "+40")}`;

export default function MobileMenu({ children }: { children?: ReactNode }) {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const [openGroup, setOpenGroup] = useState<string | null>(null);
    const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const focusSearchRef = useRef(false);
    const titleId = useId();

    // Se inchide la orice schimbare de pagina (link, rezultat din cautare, Inapoi/Inainte).
    const [menuPathname, setMenuPathname] = useState(pathname);
    if (pathname !== menuPathname) {
        setMenuPathname(pathname);
        setOpen(false);
        setOpenGroup(null);
    }

    const close = useCallback((restoreFocus = true) => {
        setOpen(false);
        if (restoreFocus) toggleRef.current?.focus({ preventScroll: true });
    }, []);

    const openMenu = (withSearch: boolean) => {
        // Panoul incepe exact sub header, oricat de inalt ar fi acesta.
        const header = toggleRef.current?.closest("header");
        const top = header ? Math.max(0, Math.round(header.getBoundingClientRect().bottom)) : 64;
        document.documentElement.style.setProperty("--mobile-menu-top", `${top}px`);
        focusSearchRef.current = withSearch;
        setOpen(true);
    };

    // Cat timp e deschis: derularea paginii blocata, Escape inchide, Tab ramane in meniu.
    useEffect(() => {
        const panel = panelRef.current;
        if (panel) panel.inert = !open;
        if (!open || !panel) return;

        const html = document.documentElement;
        const previous = { html: html.style.overflow, body: document.body.style.overflow };
        html.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        const firstTarget = focusSearchRef.current
            ? panel.querySelector<HTMLElement>("input")
            : panel.querySelector<HTMLElement>("[data-autofocus]");
        firstTarget?.focus({ preventScroll: true });

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                close();
                return;
            }
            if (event.key !== "Tab") return;
            const items = [toggleRef.current, ...Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))]
                .filter((el): el is HTMLElement => !!el && el.offsetParent !== null);
            if (items.length === 0) return;
            const first = items[0];
            const last = items[items.length - 1];
            const active = document.activeElement as HTMLElement | null;
            const inside = !!active && (active === toggleRef.current || panel.contains(active));
            if (event.shiftKey && (active === first || !inside)) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && (active === last || !inside)) {
                event.preventDefault();
                first.focus();
            }
        };
        // Pe ecran lat (xl+) meniul mobil nu mai exista: il inchidem daca fereastra se mareste.
        const wide = window.matchMedia("(min-width: 1280px)");
        const onWide = () => { if (wide.matches) setOpen(false); };

        document.addEventListener("keydown", onKeyDown);
        wide.addEventListener("change", onWide);
        return () => {
            html.style.overflow = previous.html;
            document.body.style.overflow = previous.body;
            document.removeEventListener("keydown", onKeyDown);
            wide.removeEventListener("change", onWide);
        };
    }, [open, close, mounted]);

    // Orice link apasat in meniu il inchide (inclusiv cand duce tot pe pagina curenta).
    const onPanelClick = (event: React.MouseEvent) => {
        const link = (event.target as Element).closest("a[href]");
        if (link) close(false);
    };

    const navItems = siteConfig.headerNav as NavItem[];
    const userInitial = (session?.user?.name?.[0] || session?.user?.email?.[0] || "U").toUpperCase();

    const panel = (
        <div
            ref={panelRef}
            id="mobile-menu-panel"
            className={styles.layer}
            data-open={open ? "true" : "false"}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
        >
            <button type="button" className={styles.backdrop} tabIndex={-1} aria-hidden="true" onClick={() => close()} />
            <div className={styles.sheet} onClick={onPanelClick}>
                <div className={styles.scroll} data-scroll>
                    <h2 id={titleId} className={styles.srOnly} tabIndex={-1} data-autofocus>
                        Meniu {brandDesign.name}
                    </h2>

                    <div className={`${styles.search} ${styles.reveal}`} style={{ "--i": 0 } as React.CSSProperties}>
                        <SearchBox placeholder="Caută produse" className={styles.searchBox} />
                    </div>

                    <section className={styles.section} aria-labelledby={`${titleId}-cat`}>
                        <div className={styles.sectionHead}>
                            <h3 id={`${titleId}-cat`} className={styles.kicker}>Categorii</h3>
                            <Link href="/shop" className={styles.sectionLink}>Tot catalogul <ArrowRight size={14} aria-hidden="true" /></Link>
                        </div>
                        <ul className={styles.grid}>
                            {mobileMenu.categories.map(({ label, href, icon: Icon }, index) => (
                                <li key={href} className={styles.reveal} style={{ "--i": index + 1 } as React.CSSProperties}>
                                    <Link href={href} className={styles.tile} aria-current={pathname === href ? "page" : undefined}>
                                        <span className={styles.tileIcon}><Icon size={22} strokeWidth={1.75} aria-hidden="true" /></span>
                                        <span className={styles.tileLabel}>{label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div className={`${styles.ctas} ${styles.reveal}`} style={{ "--i": 6 } as React.CSSProperties}>
                        {mobileMenu.editor && (
                            <Link href={mobileMenu.editor.href} className={`${styles.cta} ${styles.ctaPrimary}`}>
                                <span className={styles.ctaIcon}><PencilRuler size={20} aria-hidden="true" /></span>
                                <span className={styles.ctaText}>
                                    <strong>{mobileMenu.editor.label}</strong>
                                    <small>{mobileMenu.editor.hint}</small>
                                </span>
                                <ArrowRight size={18} className={styles.ctaArrow} aria-hidden="true" />
                            </Link>
                        )}
                        <Link href={mobileMenu.prices.href} className={`${styles.cta} ${styles.ctaSecondary}`}>
                            <span className={styles.ctaIcon}><Calculator size={20} aria-hidden="true" /></span>
                            <span className={styles.ctaText}>
                                <strong>{mobileMenu.prices.label}</strong>
                                <small>{mobileMenu.prices.hint}</small>
                            </span>
                            <ArrowRight size={18} className={styles.ctaArrow} aria-hidden="true" />
                        </Link>
                    </div>

                    <section className={`${styles.section} ${styles.reveal}`} style={{ "--i": 7 } as React.CSSProperties} aria-labelledby={`${titleId}-all`}>
                        <h3 id={`${titleId}-all`} className={styles.kicker}>Toate produsele</h3>
                        <ul className={styles.groups}>
                            {navItems.map((item) => {
                                const expanded = openGroup === item.label;
                                const groupId = `${titleId}-g-${item.label.replace(/[^a-z0-9]+/gi, "-")}`;
                                return (
                                    <li key={item.label} className={styles.group}>
                                        {item.children ? (
                                            <>
                                                <button
                                                    type="button"
                                                    className={styles.groupButton}
                                                    aria-expanded={expanded}
                                                    aria-controls={groupId}
                                                    onClick={() => setOpenGroup(expanded ? null : item.label)}
                                                >
                                                    {item.label}
                                                    <ChevronDown size={18} className={styles.chevron} aria-hidden="true" />
                                                </button>
                                                <div id={groupId} className={styles.groupBody} data-expanded={expanded ? "true" : "false"}>
                                                    <ul className={styles.groupInner}>
                                                        {item.children.map((child) => (
                                                            <li key={child.href}>
                                                                <Link href={child.href} className={styles.groupLink} tabIndex={expanded ? undefined : -1}>
                                                                    {child.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </>
                                        ) : (
                                            <Link href={item.href} className={styles.groupButton}>
                                                {item.label}
                                                <ChevronRight size={18} className={styles.chevron} aria-hidden="true" />
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    <section className={`${styles.section} ${styles.reveal}`} style={{ "--i": 8 } as React.CSSProperties} aria-label="Contul meu">
                        {session?.user ? (
                            <div className={styles.account}>
                                <div className={styles.accountHead}>
                                    <span className={styles.avatar} aria-hidden="true">{userInitial}</span>
                                    <span className={styles.accountName}>
                                        <strong>{session.user.name || "Contul meu"}</strong>
                                        <small>{session.user.email}</small>
                                    </span>
                                </div>
                                <div className={styles.accountLinks}>
                                    <Link href="/account?tab=orders"><Package size={16} aria-hidden="true" /> Comenzile mele</Link>
                                    <Link href="/account?tab=favorites"><Heart size={16} aria-hidden="true" /> Favorite</Link>
                                    <Link href="/account"><User size={16} aria-hidden="true" /> Profil</Link>
                                    <button type="button" onClick={() => { close(false); signOut(); }}><LogOut size={16} aria-hidden="true" /> Delogare</button>
                                </div>
                            </div>
                        ) : (
                            <Link href="/login" className={styles.authCard}>
                                <span className={styles.avatar} aria-hidden="true"><User size={18} /></span>
                                <span className={styles.accountName}>
                                    <strong>Intră în cont</strong>
                                    <small>sau creează unul nou: comenzi, adrese, favorite</small>
                                </span>
                                <LogIn size={18} className={styles.ctaArrow} aria-hidden="true" />
                            </Link>
                        )}
                    </section>

                    <nav className={`${styles.section} ${styles.reveal}`} style={{ "--i": 9 } as React.CSSProperties} aria-label="Informații">
                        <ul className={styles.secondary}>
                            {mobileMenu.secondary.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
                                        {link.label}
                                        <ChevronRight size={16} aria-hidden="true" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className={styles.contact} aria-label="Contact rapid" role="group">
                    <a href={telHref} className={styles.contactItem}>
                        <Phone size={18} aria-hidden="true" />
                        <span>Sună</span>
                    </a>
                    <a href={`https://wa.me/${mobileMenu.whatsapp}`} target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                        <MessageCircle size={18} aria-hidden="true" />
                        <span>WhatsApp</span>
                    </a>
                    <a href={`mailto:${siteConfig.email}`} className={styles.contactItem}>
                        <Mail size={18} aria-hidden="true" />
                        <span>Email</span>
                    </a>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <button
                type="button"
                className={`${styles.iconButton} ${styles.searchButton}`}
                aria-label="Caută produse"
                aria-controls="mobile-menu-panel"
                onClick={() => (open ? close() : openMenu(true))}
            >
                <Search size={20} strokeWidth={2} aria-hidden="true" />
            </button>
            {children ? <div className={styles.cartSlot}>{children}</div> : null}
            <button
                ref={toggleRef}
                type="button"
                className={`${styles.iconButton} ${styles.toggle}`}
                aria-label={open ? "Închide meniul" : "Deschide meniul"}
                aria-expanded={open}
                aria-controls="mobile-menu-panel"
                data-mobile-menu-toggle
                data-open={open ? "true" : "false"}
                onClick={() => (open ? close() : openMenu(false))}
            >
                <span className={styles.burger} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </span>
            </button>
            {mounted ? createPortal(panel, document.body) : null}
        </>
    );
}
