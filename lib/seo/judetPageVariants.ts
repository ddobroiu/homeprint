import { pickVariant } from "./contentVariants";

export type JudetPageVariant = {
    metaTitle: string;
    metaDescription: string;
    h1Prefix: string;
    subtitle: string;
    configuratorsHeading: string;
    faq: { q: string; a: string }[];
};

/**
 * 6 structurally different write-ups for a județ landing page, picked
 * deterministically by județ slug - see lib/seo/contentVariants.ts for why
 * (avoids the single-template-with-name-swap thin-content pattern).
 */
export function getJudetPageVariant(judetName: string, judetSlug: string): JudetPageVariant {
    const n = judetName;
    const variants: JudetPageVariant[] = [
        {
            metaTitle: `Producție Publicitară în Județul ${n}`,
            metaDescription: `Livrăm materiale publicitare, bannere și tablouri canvas în tot județul ${n}. Vezi lista localităților și produsele noastre de top.`,
            h1Prefix: "Producție Publicitară",
            subtitle: "Alege localitatea ta pentru a vedea oferta personalizată și timpul de livrare estimat prin DPD Express.",
            configuratorsHeading: "Sisteme de Configurare în",
            faq: [
                { q: `HomePrint livrează în tot județul ${n}?`, a: `Da, livrăm materiale publicitare și print digital în toate localitățile din județul ${n} prin curierat rapid DPD Express.` },
                { q: `Cum pot comanda bannere sau canvas în ${n}?`, a: "Comanda se face direct online. Alegeți produsul, introduceți dimensiunile dorite în configurator și finalizați comanda. Producția începe imediat după confirmarea graficii." },
            ],
        },
        {
            metaTitle: `Tipografie Online pentru ${n} — Livrare Rapidă`,
            metaDescription: `Comandă online materiale publicitare pentru afacerea ta din ${n}: bannere, autocolante, canvas. Configurator cu preț instant, fără telefoane.`,
            h1Prefix: "Tipografie Online pentru",
            subtitle: "Configurezi online, vezi prețul exact instant și primești comanda prin curier, oriunde ai fi în județ.",
            configuratorsHeading: "Ce Poți Configura Online pentru",
            faq: [
                { q: `Cât durează producția pentru o comandă din ${n}?`, a: "De regulă 2-4 zile lucrătoare, în funcție de produs și cantitate, plus timpul de livrare al curierului." },
                { q: `Pot vedea prețul înainte să plasez comanda?`, a: `Da — configuratorul calculează prețul exact în timp real pentru orice comandă din ${n}, pe măsură ce alegi dimensiunile și materialul.` },
            ],
        },
        {
            metaTitle: `Bannere, Autocolante și Canvas — Comenzi din ${n}`,
            metaDescription: `Afacerile din ${n} comandă bannere, autocolante decupate, canvas și materiale rigide direct online, cu producție proprie și livrare prin curier.`,
            h1Prefix: "Materiale Publicitare pentru",
            subtitle: "De la un singur banner de deschidere până la seturi complete de semnalistică — totul configurabil online.",
            configuratorsHeading: "Produse Disponibile pentru Afaceri din",
            faq: [
                { q: `Ce comandă cel mai des o afacere mică din ${n}?`, a: "Bannere pentru exterior, autocolante pentru vitrină și materiale de interior sunt cele mai frecvente comenzi ale afacerilor locale." },
                { q: `Livrați și în localități mai mici din ${n}, nu doar reședința de județ?`, a: `Da, livrăm în toate localitățile listate mai jos din județul ${n}, nu doar în orașul reședință.` },
            ],
        },
        {
            metaTitle: `Print Digital ${n}: Configurator Online, Fără Intermediari`,
            metaDescription: `Renunți la atelierul local din ${n}? Configurator online cu preț fix, materiale de calitate și livrare rapidă prin curier în tot județul.`,
            h1Prefix: "Print Digital, Direct din Producție, pentru",
            subtitle: "Fără intermediari și fără negocieri la telefon — prețul e fix și vizibil înainte să plasezi comanda.",
            configuratorsHeading: "Configuratoare Disponibile pentru Clienții din",
            faq: [
                { q: `De ce să comand online în loc de un atelier local din ${n}?`, a: "Preț fix și transparent, o gamă mai largă de materiale decât orice atelier fizic, plus configurator disponibil oricând, nu doar în program de lucru." },
                { q: "Ce se întâmplă dacă fișierul meu grafic nu e bun de print?", a: "Echipa noastră verifică fiecare fișier înainte de producție și te contactează dacă sunt probleme, înainte să pornească tiparul." },
            ],
        },
        {
            metaTitle: `${n}: Materiale Publicitare Personalizate, Livrare 24-48h`,
            metaDescription: `Configurezi, plătești online și primești comanda acasă sau la birou, oriunde în județul ${n}. Producție proprie, fără costuri ascunse.`,
            h1Prefix: "Comandă Online, Livrare Rapidă în",
            subtitle: "Producție proprie înseamnă control direct asupra calității și a termenelor de livrare, fără intermediari.",
            configuratorsHeading: "Alege Ce Ai Nevoie pentru Afacerea Ta din",
            faq: [
                { q: `Ce zone din județul ${n} acoperiți cu livrare?`, a: "Livrăm prin curier rapid în toate localitățile din județ, listate mai jos, nu doar în orașul principal." },
                { q: "Pot comanda o singură bucată pentru test?", a: "Da, nu există o comandă minimă — poți testa calitatea cu o singură piesă înainte de a comanda pentru toate punctele de lucru." },
            ],
        },
        {
            metaTitle: `Furnizor de Print și Publicitate pentru Județul ${n}`,
            metaDescription: `Bannere, semnalistică, autocolante și canvas produse local și livrate rapid oriunde în județul ${n}. Configurator online cu preț instant.`,
            h1Prefix: "Furnizor de Print pentru Afaceri din",
            subtitle: "De la un singur produs până la comenzi recurente pentru mai multe puncte de lucru — totul se configurează online.",
            configuratorsHeading: "Sistemele Noastre de Configurare pentru",
            faq: [
                { q: `Puteți produce cantități mari pentru o rețea de magazine din ${n}?`, a: "Da, procesăm și comenzi recurente sau de volum mare pentru rețele cu mai multe puncte de lucru în același județ." },
                { q: "Cum verific calitatea înainte să comand în volum?", a: "Recomandăm o comandă de test la o singură bucată, apoi extindem la volum odată ce ești mulțumit de rezultat." },
            ],
        },
    ];

    return variants[pickVariant(judetSlug, variants.length)];
}
