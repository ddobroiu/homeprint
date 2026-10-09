"use client";

// Evenimentele Meta Pixel legate de navigare (pus o singură dată în app/layout.tsx, în <Providers>):
// - PageView la navigările din aplicație (prima afișare e acoperită de snippetul din CookieConsent);
// - ViewContent pe paginile de produs / configurator (lib/metaPixel.ts -> metaProductIdFromPath);
// - InitiateCheckout la intrarea pe /checkout cu produse în coș (și reține produsele pentru Purchase);
// - Contact la click pe WhatsApp / telefon / e-mail.
// Totul trece prin trackMeta: nimic fără acord pentru marketing, fără pixel sau pe localhost.

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_CHANGE_EVENT } from "@/lib/cookieConsent";
import { useCart } from "@/components/CartContext";
import {
    metaContactChannel,
    metaEventId,
    metaProductIdFromPath,
    rememberMetaCheckout,
    trackMeta,
    type MetaContent,
} from "@/lib/metaPixel";

/** Rulează `send` după efectele din layout și, dacă nu a plecat (fără acord încă), la schimbarea acordului. */
function sendWhenAllowed(send: () => boolean): () => void {
    let done = false;
    const attempt = () => {
        if (done) return;
        done = send();
        if (done) window.removeEventListener(CONSENT_CHANGE_EVENT, attempt);
    };
    const timer = window.setTimeout(attempt, 0);
    window.addEventListener(CONSENT_CHANGE_EVENT, attempt);
    return () => {
        window.clearTimeout(timer);
        window.removeEventListener(CONSENT_CHANGE_EVENT, attempt);
    };
}

export default function MetaPixelEvents() {
    const pathname = usePathname();
    const { items, isLoaded } = useCart();
    const firstPath = useRef(true);
    const checkoutSent = useRef(false);

    // PageView la navigarea în aplicație
    useEffect(() => {
        if (firstPath.current) {
            firstPath.current = false;
            return;
        }
        trackMeta("PageView");
    }, [pathname]);

    // ViewContent pe paginile de produs / configurator
    useEffect(() => {
        const id = metaProductIdFromPath(pathname);
        if (!id) return;
        return sendWhenAllowed(() =>
            trackMeta(
                "ViewContent",
                { content_ids: [id], content_type: "product", content_name: document.title.slice(0, 200), currency: "RON" },
                metaEventId("vc")
            )
        );
    }, [pathname]);

    // InitiateCheckout o dată per intrare pe /checkout, cu produsele din coș
    useEffect(() => {
        if (pathname !== "/checkout") {
            checkoutSent.current = false;
            return;
        }
        if (!isLoaded || items.length === 0) return;
        const contents: MetaContent[] = items.map((it) => ({
            id: String(it.productId || it.slug || it.id).slice(0, 100),
            quantity: it.quantity,
            item_price: Number(it.price) || 0,
        }));
        rememberMetaCheckout(contents);
        if (checkoutSent.current) return;
        const value = Number(items.reduce((s, it) => s + (Number(it.price) || 0) * it.quantity, 0).toFixed(2));
        return sendWhenAllowed(() => {
            if (checkoutSent.current) return true;
            const ok = trackMeta(
                "InitiateCheckout",
                {
                    content_ids: contents.map((c) => c.id),
                    contents,
                    content_type: "product",
                    num_items: contents.reduce((s, c) => s + c.quantity, 0),
                    value,
                    currency: "RON",
                },
                metaEventId("ic")
            );
            if (ok) checkoutSent.current = true;
            return ok;
        });
    }, [pathname, isLoaded, items]);

    // Contact: click pe WhatsApp / telefon / e-mail (delegare, acoperă toate butoanele)
    useEffect(() => {
        let last = 0;
        const onClick = (e: MouseEvent) => {
            const target = e.target as Element | null;
            if (!target || typeof target.closest !== "function") return;
            const link = target.closest("a[href]") as HTMLAnchorElement | null;
            const channel = metaContactChannel(link?.getAttribute("href"));
            if (!channel) return;
            const now = Date.now();
            if (now - last < 1500) return;
            last = now;
            trackMeta("Contact", { content_name: channel, source_page: window.location.pathname }, metaEventId("contact"));
        };
        document.addEventListener("click", onClick, true);
        return () => document.removeEventListener("click", onClick, true);
    }, []);

    return null;
}
