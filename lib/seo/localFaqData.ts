/**
 * Întrebările frecvente ale paginilor /judet/..., construite din date reale (termen, curier,
 * transport, plată din localDelivery.ts) + întrebările editoriale ale orașului, dacă există.
 * Aceleași texte apar vizibil pe pagină și în FAQPage.
 *
 * FIȘIER IDENTIC ÎN TOATE CELE 6 REPO-URI.
 */
import { deliveryFacts, deliveryDaysText, shippingCostText, paymentText } from "./localDelivery";

export type FaqItem = { question: string; answer: string };

export function localDataFaqs({
    locName,
    judetName,
    productTitle,
    productKey,
    editorial,
}: {
    locName: string;
    judetName: string;
    productTitle?: string;
    productKey?: string;
    editorial?: Array<{ q: string; a: string }>;
}): FaqItem[] {
    const f = deliveryFacts();
    const days = deliveryDaysText(f);
    const what = productTitle ? productTitle.toLowerCase() : "comanda";
    const cutoff = f.cutoffHour != null ? ` Comenzile confirmate până la ora ${f.cutoffHour}:00 într-o zi lucrătoare intră în lucru în aceeași zi.` : "";
    const out: FaqItem[] = [
        {
            question: productTitle ? `În cât timp ajung ${what} în ${locName}?` : `În cât timp ajunge o comandă în ${locName}?`,
            answer: `În ${days}, producție inclusă, prin curier ${f.courier}, la adresa ta din ${locName} (județul ${judetName}) sau la un locker / punct ${f.courier}. Termenul curge de la confirmarea comenzii și a graficii.${cutoff}`,
        },
        {
            question: `Cât costă transportul în ${locName}?`,
            answer: `${shippingCostText(f).replace(/^./, (c) => c.toUpperCase())}. Costul exact apare în coș, înainte de plată.`,
        },
        {
            question: `Pot ridica personal comanda în ${locName}?`,
            answer: `Nu avem punct de lucru în ${locName}; comenzile se trimit prin curier. La finalizarea comenzii poți alege un locker sau un punct ${f.courier}: pe hartă apar doar punctele în care încape coletul tău.`,
        },
        {
            question: "Cum pot plăti?",
            answer: paymentText(productKey, f),
        },
        {
            question: productTitle ? `Am nevoie urgent de ${what} în ${locName}. Se poate mai repede?` : `Am o comandă urgentă pentru ${locName}. Se poate mai repede?`,
            answer: `Nu avem un serviciu de urgență separat: termenul standard este ${days}.${f.cutoffHour != null ? ` Ca să câștigi timp, trimite grafica gata de tipar și confirmă comanda până la ora ${f.cutoffHour}:00 într-o zi lucrătoare.` : ""} Dacă ai un termen fix (eveniment, inaugurare), scrie-ne pe WhatsApp înainte de comandă, ca să verificăm dacă îl putem respecta.`,
        },
        {
            question: `Primesc factură pe firmă pentru o comandă livrată în ${locName}?`,
            answer: "Da, emitem factură pentru persoane fizice, firme, PFA și instituții; datele de facturare le completezi la finalizarea comenzii.",
        },
    ];
    for (const e of editorial ?? []) out.push({ question: e.q, answer: e.a });
    return out;
}
