import { pickVariant, pickRotating } from "./contentVariants";

export type TrustFact = { title: string; text: string };

export type LocalityPageVariant = {
    metaTitle: string;
    metaDescription: string;
    h1Prefix: string;
    subtitle: string;
    productsHeading: string;
    productsSubtitle: string;
    trustHeading: string;
    faq: { q: string; a: string }[];
    trustFacts: TrustFact[];
};

/** Pool of "why us" facts for the trust section - 3 are rotated in per page, not always the same 3. */
const TRUST_FACTS_POOL = (locName: string, judetName: string): TrustFact[] => [
    { title: "Livrare DPD", text: `Toate produsele comandate în ${locName} sunt expediate prioritar prin curier rapid.` },
    { title: "Calitate UV", text: "Printăm la rezoluție maximă cu rezistență 5 ani la exterior și intemperii." },
    { title: "Echipa Tehnică", text: "Oferim suport pentru fișierele de print și consultanță în alegerea materialelor." },
    { title: "Producție Proprie", text: `Nu lucrăm prin intermediari — comenzile din ${locName} intră direct în producția noastră.` },
    { title: "Fără Comandă Minimă", text: "Poți comanda o singură bucată pentru test, fără cantitate minimă impusă." },
    { title: "Acoperire Județeană", text: `Livrăm în tot județul ${judetName}, nu doar în ${locName}.` },
    { title: "Preț Transparent", text: "Configuratorul afișează prețul final înainte de comandă, fără costuri ascunse." },
    { title: "Verificare Grafică", text: "Fiecare fișier trimis este verificat manual înainte de a intra la print." },
];

/**
 * 6 structurally different write-ups for a locality landing page, picked
 * deterministically by locality slug - same technique as judetPageVariants.
 */
type LocalityPageVariantBase = Omit<LocalityPageVariant, "trustFacts">;

export function getLocalityPageVariant(locName: string, judetName: string, locSlug: string): LocalityPageVariant {
    const loc = locName;
    const jud = judetName;
    const variants: LocalityPageVariantBase[] = [
        {
            metaTitle: `Tipografie & Print în ${loc}`,
            metaDescription: `Comandă bannere, autocolante și materiale publicitare personalizate în ${loc}. Producție directă în 24-48h, prețuri competitive și livrare rapidă în tot județul ${jud}.`,
            h1Prefix: "Print & Publicitate",
            subtitle: `Producție și livrare rapidă materiale publicitare în ${loc}. Alege produsele dorite și configurează-le online.`,
            productsHeading: "Produse Configurabile",
            productsSubtitle: "Sistemele noastre de configurare îți permit să alegi dimensiuni, finisaje și materiale specifice, cu preț calculat instant.",
            trustHeading: "Parteneriat Local fără Intermediari",
            faq: [
                { q: `Ce servicii de print sunt disponibile în ${loc}?`, a: `În ${loc} oferim servicii complete de tipar digital: bannere publicitare, tablouri canvas, autocolante, rollup-uri și materiale rigide, toate cu livrare rapidă direct la adresa ta.` },
                { q: `Cât durează livrarea în ${loc}?`, a: "Comenzile sunt produse în 24-48 de ore și expediate prin DPD Express, ajungând de regulă în ziua următoare finalizării producției." },
                { q: "Cum pot vedea prețurile pentru produsele mele?", a: "Alege orice produs din lista de mai sus și folosește configuratorul online. Prețul se calculează instantaneu pe baza dimensiunilor și opțiunilor tale." },
            ],
        },
        {
            metaTitle: `Comandă Print Online în ${loc} — Configurator cu Preț Instant`,
            metaDescription: `Bannere, canvas și autocolante personalizate pentru clienții din ${loc}. Configurator online, plată securizată, livrare prin curier rapid.`,
            h1Prefix: "Configurator Online pentru",
            subtitle: `Alegi dimensiunile, vezi prețul exact și plasezi comanda din ${loc} fără telefoane sau drumuri la atelier.`,
            productsHeading: "Ce Poți Comanda Online",
            productsSubtitle: "Fiecare produs are propriul configurator, cu previzualizare și preț actualizat instant pe măsură ce alegi opțiunile.",
            trustHeading: "Producție Directă, Fără Intermediari",
            faq: [
                { q: `Livrați direct la adresă în ${loc}?`, a: `Da, livrăm prin curier DPD Express direct la adresa ta din ${loc}, fără să fie nevoie să te deplasezi.` },
                { q: "Ce fac dacă nu am o grafică gata?", a: "Poți comanda opțiunea de design profesional, iar echipa noastră îți pregătește grafica înainte de print." },
                { q: "Pot modifica o comandă după ce am plasat-o?", a: "Da, cât timp comanda nu a intrat încă în producție — contactează-ne cât mai rapid pentru orice modificare." },
            ],
        },
        {
            metaTitle: `${loc}: Bannere, Autocolante și Materiale Publicitare Personalizate`,
            metaDescription: `Afacerile din ${loc} comandă materiale publicitare direct online — configurator, preț fix, producție proprie și livrare rapidă în ${jud}.`,
            h1Prefix: "Materiale Publicitare pentru Afaceri din",
            subtitle: `De la un singur banner de deschidere până la seturi complete de semnalistică pentru afacerea ta din ${loc}.`,
            productsHeading: "Produse Pentru Afaceri Locale",
            productsSubtitle: "Configurează exact ce ai nevoie — dimensiuni, materiale și finisaje adaptate spațiului tău.",
            trustHeading: "De Ce Ne Aleg Afacerile din Zonă",
            faq: [
                { q: `Ce comandă cel mai des o afacere mică din ${loc}?`, a: "Bannere pentru exterior, autocolante pentru vitrină și materiale de interior sunt cele mai frecvente comenzi." },
                { q: "Pot comanda pentru mai multe puncte de lucru odată?", a: "Da, procesăm și comenzi de volum mai mare pentru rețele cu mai multe locații." },
                { q: "Oferiți factură pentru firme?", a: "Da, poți alege facturare pe persoană juridică direct din formularul de comandă." },
            ],
        },
        {
            metaTitle: `Print Digital ${loc} — Fără Atelier, Fără Așteptare`,
            metaDescription: `Renunți la atelierul local din ${loc}? Configurator online, preț vizibil înainte de comandă și livrare rapidă în tot județul ${jud}.`,
            h1Prefix: "Print Digital, Fără Atelier, pentru",
            subtitle: `Totul se configurează online — nu mai e nevoie de un drum până la un atelier fizic din ${loc}.`,
            productsHeading: "Configuratoare Disponibile",
            productsSubtitle: "Alegi produsul, introduci dimensiunile și vezi prețul final înainte să confirmi comanda.",
            trustHeading: "Calitate Verificată, Fără Surprize",
            faq: [
                { q: `De ce să comand online în loc de un atelier din ${loc}?`, a: "Preț fix și transparent, o gamă mai largă de materiale decât un atelier local, disponibil oricând, nu doar în program de lucru." },
                { q: "Cum știu că fișierul meu e bun de print?", a: "Verificăm manual fiecare fișier trimis înainte de a intra la producție și te anunțăm dacă e nevoie de corecții." },
                { q: "Cât costă transportul?", a: "Costul de livrare se calculează automat în funcție de comandă și e afișat clar înainte de finalizare." },
            ],
        },
        {
            metaTitle: `${loc}: Materiale Publicitare, Livrare 24-48h`,
            metaDescription: `Configurezi, plătești online și primești comanda acasă sau la birou în ${loc}. Producție proprie, fără costuri ascunse.`,
            h1Prefix: "Livrare Rapidă de Materiale Publicitare în",
            subtitle: `Producție proprie înseamnă control direct asupra calității pentru fiecare comandă din ${loc}.`,
            productsHeading: "Alege Ce Ai Nevoie",
            productsSubtitle: "Fiecare configurator include previzualizare vizuală, ca să știi exact ce vei primi.",
            trustHeading: "Control Direct, de la Grafică la Livrare",
            faq: [
                { q: `Cât de repede pot primi o comandă în ${loc}?`, a: "De regulă în 24-48 de ore de la confirmarea graficii, plus timpul de curierat." },
                { q: "Pot comanda o singură bucată pentru test?", a: "Da, nu există comandă minimă — poți testa calitatea cu o singură piesă." },
                { q: "Ce se întâmplă dacă produsul ajunge deteriorat?", a: "Refacem gratuit orice comandă care ajunge cu defecte de material sau de print." },
            ],
        },
        {
            metaTitle: `Furnizor Local de Print pentru ${loc} și Împrejurimi`,
            metaDescription: `Bannere, semnalistică, autocolante și canvas produse și livrate rapid în ${loc}. Configurator online cu preț instant, fără intermediari.`,
            h1Prefix: "Furnizor de Print pentru",
            subtitle: `De la un singur produs până la comenzi recurente — totul se configurează online pentru clienții din ${loc}.`,
            productsHeading: "Sistemele Noastre de Configurare",
            productsSubtitle: "Alegi produsul, personalizezi opțiunile și confirmi comanda cu prețul deja calculat.",
            trustHeading: "De Ce Lucrează Clienții cu Noi",
            faq: [
                { q: `Puteți produce cantități mari pentru o rețea din ${loc}?`, a: "Da, procesăm și comenzi recurente sau de volum mare pentru clienți cu nevoi constante." },
                { q: "Cum verific calitatea înainte să comand în volum?", a: "Recomandăm o comandă de test la o singură bucată, apoi extindem la volum după confirmare." },
                { q: "Livrați și în afara programului standard?", a: "Curierul livrează conform programului său standard; producția noastră rulează zilnic, inclusiv pentru comenzi urgente." },
            ],
        },
    ];

    const variant = variants[pickVariant(locSlug, variants.length)];
    const trustFacts = pickRotating(TRUST_FACTS_POOL(loc, jud), locSlug, 3);

    return { ...variant, trustFacts };
}
