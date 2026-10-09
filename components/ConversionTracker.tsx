"use client";

import { useEffect } from "react";
import { CONSENT_CHANGE_EVENT, readConsent } from "@/lib/cookieConsent";
import { loadTikTok, trackTikTok } from "@/lib/tiktok";
import { readMetaCheckout, trackMeta } from "@/lib/metaPixel";

type TrackingWindow = Window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
};

type ConversionTrackerProps = {
    orderNo: string | number | null;
    value?: number | null;
    currency?: string;
};

/**
 * Evenimentul `purchase` pe pagina de comandă finalizată: GA4 (TRACKING.ga4Ids) și, dacă există,
 * Google Ads / GTM / Meta Pixel. Se trimite doar cu acordul de cookie-uri (statistică sau marketing)
 * și o singură dată per comandă. Fără date personale: doar numărul comenzii, valoarea și moneda.
 */
export default function ConversionTracker({ orderNo, value, currency = "RON" }: ConversionTrackerProps) {
    useEffect(() => {
        if (!orderNo) return;

        // Rulăm după efectul din CookieConsent (layout), care încarcă gtag.js și face `config`
        // pentru ID-urile acceptate; altfel evenimentul ar ajunge în dataLayer înaintea config-ului.
        const timer = window.setTimeout(() => {
            const consent = readConsent();
            if (!consent || (!consent.analytics && !consent.marketing)) return;

            const key = `conv_purchase_${orderNo}`;
            try {
                if (localStorage.getItem(key)) return;
                localStorage.setItem(key, "1");
            } catch {
                const w = window as unknown as Record<string, unknown>;
                if (w[key]) return;
                w[key] = true;
            }

            const w = window as TrackingWindow;
            const params: Record<string, unknown> = { transaction_id: String(orderNo), currency };
            if (typeof value === "number" && value > 0) params.value = Number(value.toFixed(2));

            // pentru GTM (se încarcă doar după acord), dacă are un trigger pe `purchase`
            w.dataLayer = w.dataLayer || [];
            w.dataLayer.push({ event: "purchase", ...params });

            // GA4 + Google Ads, cu transaction_id pentru deduplicare
            if (typeof w.gtag === "function") w.gtag("event", "purchase", params);

            // Meta Pixel: Purchase separat, mai jos (cheie proprie, reîncercare la acord)
        }, 0);

        return () => window.clearTimeout(timer);
    }, [orderNo, value, currency]);

    // TikTok Pixel: CompletePayment, numai cu consimțământ la marketing, o singură dată per comandă.
    // Dacă acordul vine după afișarea paginii (bannerul), trimitem la evenimentul de schimbare a consimțământului.
    useEffect(() => {
        if (!orderNo) return;
        const key = `tt_purchase_${orderNo}`;

        const fire = () => {
            if (!readConsent()?.marketing) return false;
            try {
                if (localStorage.getItem(key)) return true;
            } catch {
                if ((window as unknown as Record<string, unknown>)[key]) return true;
            }
            loadTikTok(); // idempotent; permis pe pagina de mulțumire
            const params: Record<string, unknown> = {
                currency,
                content_type: "product",
                order_id: String(orderNo),
                event_id: `order-${orderNo}`,
            };
            if (typeof value === "number" && value > 0) params.value = Number(value.toFixed(2));
            if (!trackTikTok("CompletePayment", params, { event_id: `order-${orderNo}` })) return false;
            try {
                localStorage.setItem(key, "1");
            } catch {
                (window as unknown as Record<string, unknown>)[key] = true;
            }
            return true;
        };

        const onChange = () => {
            if (fire()) window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
        };
        const timer = window.setTimeout(() => {
            if (!fire()) window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
        }, 0);

        return () => {
            window.clearTimeout(timer);
            window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
        };
    }, [orderNo, value, currency]);

    // Meta Pixel Purchase: numai cu acord pentru marketing (trackMeta), o singură dată per comandă.
    // eventID = "order-<nr>", același ca evenimentul trimis de server prin Conversions API (lib/metaCapi.ts).
    // content_ids = produsele reținute la începerea comenzii (components/MetaPixelEvents.tsx).
    useEffect(() => {
        if (!orderNo) return;
        const key = `fb_purchase_${orderNo}`;
        const fire = () => {
            try {
                if (localStorage.getItem(key)) return true;
            } catch {
                if ((window as unknown as Record<string, unknown>)[key]) return true;
            }
            const contents = readMetaCheckout();
            const params: Record<string, unknown> = { currency, content_type: "product", order_id: String(orderNo) };
            if (typeof value === "number" && value > 0) params.value = Number(value.toFixed(2));
            if (contents.length > 0) {
                params.content_ids = contents.map((c) => c.id);
                params.contents = contents;
                params.num_items = contents.reduce((s, c) => s + c.quantity, 0);
            }
            if (!trackMeta("Purchase", params, `order-${orderNo}`)) return false;
            try {
                localStorage.setItem(key, "1");
            } catch {
                (window as unknown as Record<string, unknown>)[key] = true;
            }
            return true;
        };
        const onChange = () => {
            if (fire()) window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
        };
        const timer = window.setTimeout(onChange, 0);
        window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
        return () => {
            window.clearTimeout(timer);
            window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
        };
    }, [orderNo, value, currency]);

    return null;
}
