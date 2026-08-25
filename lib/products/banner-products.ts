export interface BannerProduct {
    id: string;
    slug: string;
    title: string;
    description: string;
    image: string;
    price: string | number;
    category: string;
    tags: string[];
    longDescription?: string;
    faqs?: Array<{
        question: string;
        answer: string;
    }>;
    metadata?: {
        type: 'banner-predefinit';
        variants: Array<{
            size: string;
            price: number;
            id: string;
        }>;
    };
}

export const bannerProducts: BannerProduct[] = [
    {
        id: "banner-pers-acces-parcare-6107382",
        slug: "banner-personalizat-acces-parcare-nu-blocati-6107382",
        title: "Banner Personalizat Acces Parcare Nu Blocati 6107382",
        description: "Șablon grafic pentru Banner Personalizat Acces Parcare Nu Blocati 6107382, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-personalizat-acces-parcare-nu-blocati_6107382.jpg",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-spalatorie-haine",
        slug: "banner-spalatorie-haine",
        title: "Banner Banner Spalatorie Haine",
        description: "Șablon grafic pentru Banner Spalatorie Haine, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-spalatorie-haine.jpg",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-spalatorie-haine-1",
        slug: "banner-spalatorie-haine-1",
        title: "Banner Banner Spalatorie Haine 1",
        description: "Șablon grafic pentru Banner Spalatorie Haine 1, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-spalatorie-haine-1.jpg",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-inchiriere-auto",
        slug: "banner-inchiriere-auto",
        title: "Banner Banner închiriere Auto",
        description: "Șablon grafic pentru Banner închiriere Auto, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-inchiriere-auto.jpg",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },

    {
        id: "banner-detailing-auto",
        slug: "detailing-auto",
        title: "Banner Detailing Auto",
        description: "Șablon grafic pentru Detailing Auto, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-spalatorie-auto.jpg",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model", "detailing"],
        longDescription: `
            <h3>Banner Detailing Auto Premium - Atrage Clienți Exigenți</h3>
            <p>Un centru de detailing auto profesional merită o prezentare grafică pe măsură. Afișează serviciile tale de top: <strong>protecție ceramică, polish profesional, curățare tapițerie piele sau cosmetizare motor</strong>. Bannerul nostru este mat sau lucios, prevenind reflexiile soarelui pentru o lizibilitate optimă.</p>
        `,
        faqs: [
            { question: "Folosiți print UV pentru detalii fine?", answer: "Da, tehnologia noastră UV permite reproducerea textelor mici și a logourilor complexe cu o claritate impecabilă, esențială pentru brandurile de detailing." },
            { question: "Rezistă materialul la substanțele chimice din spălătorie?", answer: "Da, stratul de protecție al bannerului este rezistent la majoritatea detergenților auto comuni de exterior." }
        ],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-piese-auto",
        slug: "piese-auto",
        title: "Banner Piese Auto",
        description: "Șablon grafic pentru Piese Auto, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-rent-a-car",
        slug: "rent-a-car",
        title: "Banner Rent A Car",
        description: "Șablon grafic pentru Rent A Car, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/rent-a-car.jpg",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-service-auto",
        slug: "service-auto",
        title: "Banner Service Auto",
        description: "Șablon grafic pentru Service Auto, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/service-auto.jpg",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-spalatorie-haine",
        slug: "spalatorie-haine",
        title: "Banner Spalatorie Haine",
        description: "Șablon grafic pentru Spalatorie Haine, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/spalatorie-haine.jpg",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-vulcanizare",
        slug: "vulcanizare",
        title: "Banner Vulcanizare",
        description: "Șablon grafic pentru Vulcanizare, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/vulcanizare.jpg",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-vulcanizare-banner",
        slug: "vulcanizare-banner",
        title: "Banner Vulcanizare Banner",
        description: "Șablon grafic pentru Vulcanizare Banner, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/vulcanizare-banner.jpg",
        price: "De la 49 LEI/mp",
        category: "Auto-Moto",
        tags: ["banner", "auto-moto", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },

    {
        id: "banner-magazin-alimentar",
        slug: "banner-magazin-alimentar",
        title: "Banner Magazin Alimentar",
        description: "Banner magazin alimentar rezistent la exterior. Personalizează designul cu mesaje precum 'Pâine proaspătă', 'LEGUME/FRUCTE' sau 'Program 24/7'.",
        image: "/products/banner/banner-magazin-alimentar.jpg",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "magazin alimentar", "retail", "supermarket", "alimente"],
        longDescription: `
            <h3>Banner Magazin Alimentar - Vizibilitate Locală pentru Clienții din Cartier</h3>
            <p>Un banner bine amplasat poate crește traficul în magazinul tău alimentar cu până la 40%. Folosește imagini clare și mesaje de tipul <strong>Oferte Săptămânale, Produse Locale, Carne Proaspătă sau Legume & Fructe de Sezon</strong>. Printul nostru pe poliplan (PVC Frontlit) este rezistent la grăsimi, praf și intemperii.</p>
            <ul>
                <li><strong>Capse perimetrale:</strong> Fixare ușoară deasupra intrării sau pe gard.</li>
                <li><strong>Culori Vibrante:</strong> Utilizăm tehnologie de printare format mare pentru impact vizual maxim.</li>
            </ul>
        `,
        faqs: [
            { question: "Pot schimba textul 'Magazin Alimentar'?", answer: "Da! Toate produsele noastre pot fi personalizate gratuit cu textul specific magazinului tău dacă dorești modificări de design." },
            { question: "Se poate curăța bannerul?", answer: "Da, suprafața este lavabilă. Poți folosi o lavetă umedă pentru a îndepărta praful depus la exterior după o perioadă lungă de timp." }
        ],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-de-vanzare-imobiliare",
        slug: "banner-de-vanzare-imobiliare",
        title: "Banner De Vânzare Imobiliare",
        description: "Banner publicitar rezistent 'DE VÂNZARE' pentru imobiliare. Vizibilitate maximă pentru proprietatea ta și atragerea rapidă a cumpărătorilor locali.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "de vanzare", "imobiliare", "seo", "outdoor"],
        longDescription: `
            <h3>Banner DE VÂNZARE - Vizibilitate Maximă pentru Proprietatea Ta</h3>
            <p>Vrei să vinzi un apartament, o casă sau un teren rapid? Un banner "DE VÂNZARE" este metoda clasică dar și cea mai eficientă de publicitate offline direct pe locație. Folosim <strong>material PVC Frontlit de înaltă densitate</strong>, rezistent la condiții meteo extreme, asigurându-ne că anunțul tău rămâne vizibil și profesional pentru toți trecătorii.</p>
            <ul>
                <li><strong>Capse incluse:</strong> Montare ușoară în câteva minute.</li>
                <li><strong>Garanție culori:</strong> Rezistență la UV pentru mai mult de 2 ani.</li>
            </ul>
        `,
        faqs: [
            { question: "Se decolorează la ploaie?", answer: "Nu, folosim print UV rezistent la apă și intemperii. Materialul și cerneala sunt special concepute pentru uz exterior pe termen lung." },
            { question: "Puteți lăsa spațiu pentru numărul de telefon?", answer: "Absolut! Putem printa direct numărul tău sau lăsăm un spațiu alb marcat clar pentru a fi completat de mână." }
        ],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x75cm", price: 148, id: "200x75" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-de-inchiriat",
        slug: "banner-de-inchiriat",
        title: "Banner De Închiriat",
        description: "Banner publicitar rezistent 'DE ÎNCHIRIAT' pentru spații comerciale, apartamente sau terenuri. Design simplu, clar și de mare impact.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "de inchiriat", "imobiliare", "spatiu comercial", "chirie"],
        longDescription: `
            <h3>Banner DE ÎNCHIRIAT - Soluția pentru un Spațiu Ocupat Rapid</h3>
            <p>Un banner "DE ÎNCHIRIAT" este cel mai eficient instrument offline pentru a găsi chiriași. Fie că ai un <strong>apartament, un spațiu comercial sau un teren</strong>, vizibilitatea directă la locație este esențială. Personalizăm spațiul pentru numărul de telefon astfel încât să fie cel mai vizibil element.</p>
        `,
        faqs: [
            { question: "Ce mărime recomandați pentru un balcon?", answer: "Pentru balcoane standard, dimensiunea de 150x50cm sau 200x75cm este ideală pentru a fi citită de la parter sau de pe strada alăturată." },
            { question: "Se poate scrie numărul de telefon?", answer: "Da, putem lăsa spațiu alb pentru a-l scrie ulterior cu markerul, sau îl putem printa direct pentru un aspect maxim de profesionalism." }
        ],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x75cm", price: 148, id: "200x75" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-cabinet-stomatologic",
        slug: "banner-cabinet-stomatologic",
        title: "Banner Cabinet Stomatologic",
        description: "Banner profesional pentru clinici dentare și cabinete stomatologice. Design curat, culori medicale și rezistență UV ridicată la exterior.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Sănătate",
        tags: ["banner", "stomatologie", "cabinet dentar", "medical", "dentist"],
        longDescription: `
            <h3>Banner Cabinet Stomatologic - Vizibilitate Maximă pentru Clinica Ta</h3>
            <p>Un banner pentru cabinet stomatologic este esențial pentru a atrage pacienți noi și pentru a comunica serviciile principale precum <strong>radiologie dentară, implantologie, detartraj sau urgențe stomatologice</strong>. Tipărim pe material PVC Frontlit premium de 440g sau 510g, rezistent la intemperii și radiații UV, garantând culori vii pentru o perioadă lungă de timp.</p>
            <ul>
                <li><strong>Design profesional:</strong> Mesaj clar, vizibil de la distanță.</li>
                <li><strong>Material rezistent:</strong> Ideal pentru exterior, rezistă la vânt și ploaie.</li>
                <li><strong>Finisaje complete:</strong> Capsele metalice și tivul de întărire sunt incluse.</li>
            </ul>
        `,
        faqs: [
            { question: "Ce servicii merită scoase în evidență pe bannerul clinicii?", answer: "Cele mai căutate servicii pe bannerele medicale sunt Urgențe 24/7, Implantologie și Radiologie, deoarece acestea atrag cel mai rapid atenția trecătorilor." },
            { question: "Rezistă bannerul la soare puternic?", answer: "Da, folosim cerneală UV de înaltă calitate care protejează materialul împotriva decolorării premature cauzate de expunerea prelungită la soare." }
        ],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },

    {
        id: "banner-vulcanizare",
        slug: "banner-vulcanizare",
        title: "Banner Vulcanizare Non-Stop",
        description: "Banner stradal 'VULCANIZARE' cu vizibilitate maximă zi și noapte. Rezistent la intemperii, ideal pentru echilibrare roți și service rapid.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Auto",
        tags: ["banner", "vulcanizare", "servicii auto", "roti", "anvelope"],
        longDescription: `
            <h3>Banner Vulcanizare Non-Stop - Atrage Clienții de pe Șosea</h3>
            <p>Bannerele pentru vulcanizare trebuie să fie mari, clare și contrastante (scris negru pe galben sau alb pe roșu). Afișează servicii esențiale precum <strong>geometrie roți, echilibrare, vânzare anvelope sau vulcanizare mobilă</strong>. Materialul nostru premium rezistă la vânt puternic, fiind ideal pentru amplasarea lângă șosele sau în parcări.</p>
            <ul>
                <li><strong>Durabilitate:</strong> Print UV de înaltă rezoluție care nu se decolorează.</li>
                <li><strong>Garanție:</strong> Produs conceput pentru utilizare intensă la exterior.</li>
            </ul>
        `,
        faqs: [
            { question: "La ce distanță se vede bannerul?", answer: "Un banner de 3x1 metri cu text mare poate fi citit de la o distanță de peste 50 de metri, fiind ideal pentru captarea atenției șoferilor." },
            { question: "Cât de repede primesc bannerul?", answer: "Producem și livrăm în 24-48h, astfel încât să poți semnaliza rapid sediul vulcanizării tale." }
        ],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-spalatorie-auto",
        slug: "banner-spalatorie-auto",
        title: "Banner Spălătorie Auto",
        description: "Banner profesional 'SPĂLĂTORIE AUTO' cu design modern și rezistent la apă și raze UV. Ideal pentru servicii self-service sau detailing auto.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Auto",
        tags: ["banner", "spalatorie auto", "detailing", "autocare"],
        longDescription: `
            <h3>Banner Spălătorie Auto & Detailing</h3>
            <p>Transformă-ți afacerea într-un punct de reper local cu un banner pentru spălătorie auto de înaltă calitate. Fie că oferi <strong>spălare self-service, detailing interior premium sau polish auto</strong>, bannerul tău va transmite un mesaj de profesionalism clienților tăi.</p>
            <ul>
                <li><strong>Ușor de instalat:</strong> Vine cu capsele gata montate pentru instalare rapidă pe gard sau fațadă.</li>
                <li><strong>Aspect Premium:</strong> Material lucios sau mat pentru un design care iese în evidență.</li>
            </ul>
        `,
        faqs: [
            { question: "Pot pune poze cu mașini pe banner?", answer: "Da, printul nostru UV redă detalii clare și culori vibrante, fiind ideal pentru fotografii de tip detailing sau showrooom auto." },
            { question: "Este rezistent la apă?", answer: "Absolut! Materialele noastre sunt 100% rezistente la apă și umiditate ridicată, fiind perfecte pentru mediul unei spălătorii auto." }
        ],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-black-friday",
        slug: "black-friday",
        title: "Banner Black Friday",
        description: "Șablon grafic pentru Black Friday, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-fructe-si-legume",
        slug: "fructe-si-legume",
        title: "Banner Fructe și Legume",
        description: "Șablon grafic pentru Fructe și Legume, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/fructe-si-legume.jpg",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-lichidare-totala",
        slug: "lichidare-totala",
        title: "Banner Lichidare Totala",
        description: "Șablon grafic pentru Lichidare Totala, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-magazin-alimentar",
        slug: "magazin-alimentar",
        title: "Banner Magazin Alimentar",
        description: "Șablon grafic pentru Magazin Alimentar, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/magazin-alimentar.jpg",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-magazin-decoratiuni",
        slug: "magazin-decoratiuni",
        title: "Banner Magazin Decoratiuni",
        description: "Șablon grafic pentru Magazin Decoratiuni, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-magazin-electro-it",
        slug: "magazin-electro-it",
        title: "Banner Magazin Electro It",
        description: "Șablon grafic pentru Magazin Electro It, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-magazin-electrocasnice",
        slug: "magazin-electrocasnice",
        title: "Banner Magazin Electrocasnice",
        description: "Șablon grafic pentru Magazin Electrocasnice, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-magazin-handmade",
        slug: "magazin-handmade",
        title: "Banner Magazin Handmade",
        description: "Șablon grafic pentru Magazin Handmade, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-magazin-pescuit",
        slug: "magazin-pescuit",
        title: "Banner Magazin Pescuit",
        description: "Șablon grafic pentru Magazin Pescuit, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-magazin-second-hand",
        slug: "magazin-second-hand",
        title: "Banner Magazin Second Hand",
        description: "Șablon grafic pentru Magazin Second Hand, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-magazin-sport",
        slug: "magazin-sport",
        title: "Banner Magazin Sport",
        description: "Șablon grafic pentru Magazin Sport, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-magazin-incaltaminte",
        slug: "magazin-incaltaminte",
        title: "Banner Magazin încaltaminte",
        description: "Șablon grafic pentru Magazin încaltaminte, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-oferta-exclusiva",
        slug: "oferta-exclusiva",
        title: "Banner Oferta Exclusiva",
        description: "Șablon grafic pentru Oferta Exclusiva, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-oferta-valabila-pana-la",
        slug: "oferta-valabila-pana-la",
        title: "Banner Oferta Valabila Pana La...",
        description: "Șablon grafic pentru Oferta Valabila Pana La..., gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-pet-shop",
        slug: "pet-shop",
        title: "Banner Pet Shop",
        description: "Șablon grafic pentru Pet Shop, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-produse-bio-eco",
        slug: "produse-bio-eco",
        title: "Banner Produse Bio Eco",
        description: "Șablon grafic pentru Produse Bio Eco, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-produse-noi-disponibile",
        slug: "produse-noi-disponibile",
        title: "Banner Produse Noi Disponibile",
        description: "Șablon grafic pentru Produse Noi Disponibile, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-reduceri-de-toamna",
        slug: "reduceri-de-toamna",
        title: "Banner Reduceri De Toamna",
        description: "Șablon grafic pentru Reduceri De Toamna, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-transport-marfa",
        slug: "transport-marfa",
        title: "Banner Transport Marfa",
        description: "Șablon grafic pentru Transport Marfa, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Comerț & Retail",
        tags: ["banner", "comer\u021b & retail", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-angajam-personal",
        slug: "angajam-personal",
        title: "Banner Angajam Personal",
        description: "Șablon grafic pentru Angajam Personal, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-barbershop-1",
        slug: "banner-barbershop-1",
        title: "Banner Barbershop 1",
        description: "Șablon grafic pentru Banner Barbershop 1, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-barbershop-1.jpg",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },

    {
        id: "banner-banner-1",
        slug: "banner-1",
        title: "Banner Banner 1",
        description: "Șablon grafic pentru Banner 1, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-2",
        slug: "banner-2",
        title: "Banner Banner 2",
        description: "Șablon grafic pentru Banner 2, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-3",
        slug: "banner-3",
        title: "Banner Banner 3",
        description: "Șablon grafic pentru Banner 3, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-4",
        slug: "banner-4",
        title: "Banner Banner 4",
        description: "Șablon grafic pentru Banner 4, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-pers-direct-fermier-6107374",
        slug: "banner-personalizat-direct-de-la-fermier-6107374",
        title: "Banner Banner Personalizat Direct De La Fermier 6107374",
        description: "Șablon grafic pentru Banner Personalizat Direct De La Fermier 6107374, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-personalizat-direct-de-la-fermier_6107374.jpg",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-pers-direct-fermier-6107375",
        slug: "banner-personalizat-direct-de-la-fermier-6107375",
        title: "Banner Banner Personalizat Direct De La Fermier 6107375",
        description: "Șablon grafic pentru Banner Personalizat Direct De La Fermier 6107375, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-personalizat-direct-de-la-fermier_6107375.jpg",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-cadouri-personalizate",
        slug: "cadouri-personalizate",
        title: "Banner Cadouri Personalizate",
        description: "Șablon grafic pentru Cadouri Personalizate, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-centru-de-copiere",
        slug: "centru-de-copiere",
        title: "Banner Centru De Copiere",
        description: "Șablon grafic pentru Centru De Copiere, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-cizmarie",
        slug: "cizmarie",
        title: "Banner Cizmarie",
        description: "Șablon grafic pentru Cizmarie, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-deschis-acum",
        slug: "deschis-acum",
        title: "Banner Deschis Acum",
        description: "Șablon grafic pentru Deschis Acum, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-livram-la-domiciliu",
        slug: "livram-la-domiciliu",
        title: "Banner Livram La Domiciliu",
        description: "Șablon grafic pentru Livram La Domiciliu, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-livram-in-toata-tara",
        slug: "livram-in-toata-tara",
        title: "Banner Livram în Toata Tara",
        description: "Șablon grafic pentru Livram în Toata Tara, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-mobila-la-comanda",
        slug: "mobila-la-comanda",
        title: "Banner Mobila La Comanda",
        description: "Șablon grafic pentru Mobila La Comanda, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-nu-blocati",
        slug: "nu-blocati",
        title: "Banner Nu Blocati",
        description: "Șablon grafic pentru Nu Blocati, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/nu-blocati.jpg",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-promotie-de-vara",
        slug: "promotie-de-vara",
        title: "Banner Promotie De Vara",
        description: "Șablon grafic pentru Promotie De Vara, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-recrutam-personal",
        slug: "recrutam-personal",
        title: "Banner Recrutam Personal",
        description: "Șablon grafic pentru Recrutam Personal, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-showroom-deschis",
        slug: "showroom-deschis",
        title: "Banner Showroom Deschis",
        description: "Șablon grafic pentru Showroom Deschis, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-tipografie",
        slug: "tipografie",
        title: "Banner Tipografie",
        description: "Șablon grafic pentru Tipografie, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-winter-sale",
        slug: "winter-sale",
        title: "Banner Winter Sale",
        description: "Șablon grafic pentru Winter Sale, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-in-stoc",
        slug: "in-stoc",
        title: "Banner în Stoc",
        description: "Șablon grafic pentru în Stoc, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-inchiriere-utilaje",
        slug: "inchiriere-utilaje",
        title: "Banner închiriere Utilaje",
        description: "Șablon grafic pentru închiriere Utilaje, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-inchis-pentru-renovare",
        slug: "inchis-pentru-renovare",
        title: "Banner închis Pentru Renovare",
        description: "Șablon grafic pentru închis Pentru Renovare, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Diverse",
        tags: ["banner", "diverse", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-atelier-mecanic",
        slug: "atelier-mecanic",
        title: "Banner Atelier Mecanic",
        description: "Șablon grafic pentru Atelier Mecanic, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-service-auto.jpg",
        price: "De la 49 LEI/mp",
        category: "Evenimente",
        tags: ["banner", "evenimente", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-personalizat-la-multi-ani-6107372",
        slug: "banner-personalizat-la-multi-ani-6107372",
        title: "Banner Banner Personalizat La Mulți Ani 6107372",
        description: "Șablon grafic pentru Banner Personalizat La Mulți Ani 6107372, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-personalizat-la-multi-ani_6107372.jpg",
        price: "De la 49 LEI/mp",
        category: "Evenimente",
        tags: ["banner", "evenimente", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },

    {
        id: "banner-la-multi-ani",
        slug: "la-multi-ani",
        title: "Banner La Mulți Ani",
        description: "Șablon grafic pentru La Mulți Ani, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/la-multi-ani.jpg",
        price: "De la 49 LEI/mp",
        category: "Evenimente",
        tags: ["banner", "evenimente", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-produs-in-romania",
        slug: "produs-in-romania",
        title: "Banner Produs în Romania",
        description: "Șablon grafic pentru Produs în Romania, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/produs-in-romania.jpg",
        price: "De la 49 LEI/mp",
        category: "Evenimente",
        tags: ["banner", "evenimente", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-vrei-sa-fii-sotia-mea",
        slug: "vrei-sa-fii-sotia-mea",
        title: "Banner Vrei Sa Fii Sotia Mea",
        description: "Șablon grafic pentru Vrei Sa Fii Sotia Mea, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/vrei-sa-fii-sotia-mea.jpg",
        price: "De la 49 LEI/mp",
        category: "Evenimente",
        tags: ["banner", "evenimente", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-fastfood",
        slug: "banner-fastfood",
        title: "Banner Banner Fastfood",
        description: "Șablon grafic pentru Banner Fastfood, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-fastfood.jpg",
        price: "De la 49 LEI/mp",
        category: "HoReCa",
        tags: ["banner", "horeca", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-fastfood-1",
        slug: "banner-fastfood-1",
        title: "Banner Banner Fastfood 1",
        description: "Șablon grafic pentru Banner Fastfood 1, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-fastfood-1.jpg",
        price: "De la 49 LEI/mp",
        category: "HoReCa",
        tags: ["banner", "horeca", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-barbershop",
        slug: "barbershop",
        title: "Banner Barbershop",
        description: "Șablon grafic pentru Barbershop, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/barbershop.jpg",
        price: "De la 49 LEI/mp",
        category: "HoReCa",
        tags: ["banner", "horeca", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-brutarie",
        slug: "brutarie",
        title: "Banner Brutarie",
        description: "Șablon grafic pentru Brutarie, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "HoReCa",
        tags: ["banner", "horeca", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-fastfood",
        slug: "fastfood",
        title: "Banner Fastfood",
        description: "Șablon grafic pentru Fastfood, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/fastfood.jpg",
        price: "De la 49 LEI/mp",
        category: "HoReCa",
        tags: ["banner", "horeca", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-panificatie",
        slug: "panificatie",
        title: "Banner Panificatie",
        description: "Șablon grafic pentru Panificatie, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "HoReCa",
        tags: ["banner", "horeca", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-pizzerie",
        slug: "pizzerie",
        title: "Banner Pizzerie",
        description: "Șablon grafic pentru Pizzerie, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "HoReCa",
        tags: ["banner", "horeca", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-restaurant",
        slug: "restaurant",
        title: "Banner Restaurant",
        description: "Șablon grafic pentru Restaurant, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "HoReCa",
        tags: ["banner", "horeca", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-terasa",
        slug: "terasa",
        title: "Banner Terasa",
        description: "Șablon grafic pentru Terasa, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "HoReCa",
        tags: ["banner", "horeca", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-apartament-de-inchiriat",
        slug: "apartament-de-inchiriat",
        title: "Banner Apartament De Închiriat",
        description: "Șablon grafic pentru Apartament De Închiriat, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/apartament-de-inchiriat.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-imobiliar",
        slug: "banner-de-vanzare-imobiliare-profesional",
        title: "Banner 'DE VÂNZARE' Profesional - Imobiliare Rezistent UV",
        description: "Bannere publicitare 'De Vânzare' pentru imobiliare, extrem de vizibile, printate pe poliplan 440g/mp cu tehnologie UV. Livrate cu tiv și capse pentru montaj rapid.",
        image: "https://res.cloudinary.com/dfizcaiuz/image/upload/f_auto,q_auto/v1774711182/products/banner/c5qocxdnn4konoz7oltl.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-111",
        slug: "banner-de-vanzare-111",
        title: "Banner Banner De Vânzare 111",
        description: "Șablon grafic pentru Banner De Vânzare 111, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-111-scaled.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-112",
        slug: "banner-de-vanzare-112",
        title: "Banner Banner De Vânzare 112",
        description: "Șablon grafic pentru Banner De Vânzare 112, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-112-scaled.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-113",
        slug: "banner-de-vanzare-113",
        title: "Banner Banner De Vânzare 113",
        description: "Șablon grafic pentru Banner De Vânzare 113, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-113-scaled.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-114",
        slug: "banner-de-vanzare-114",
        title: "Banner Banner De Vânzare 114",
        description: "Șablon grafic pentru Banner De Vânzare 114, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-114-scaled.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-115",
        slug: "banner-de-vanzare-115",
        title: "Banner Banner De Vânzare 115",
        description: "Șablon grafic pentru Banner De Vânzare 115, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-115-scaled.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-116",
        slug: "banner-de-vanzare-116",
        title: "Banner Banner De Vânzare 116",
        description: "Șablon grafic pentru Banner De Vânzare 116, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-116-scaled.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-117",
        slug: "banner-de-vanzare-117",
        title: "Banner Banner De Vânzare 117",
        description: "Șablon grafic pentru Banner De Vânzare 117, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-117-scaled.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-118",
        slug: "banner-de-vanzare-118",
        title: "Banner Banner De Vânzare 118",
        description: "Șablon grafic pentru Banner De Vânzare 118, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-118-scaled.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-119",
        slug: "banner-de-vanzare-119",
        title: "Banner Banner De Vânzare 119",
        description: "Șablon grafic pentru Banner De Vânzare 119, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-119-scaled.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-120",
        slug: "banner-de-vanzare-120",
        title: "Banner Banner De Vânzare 120",
        description: "Șablon grafic pentru Banner De Vânzare 120, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-120.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-121",
        slug: "banner-de-vanzare-121",
        title: "Banner Banner De Vânzare 121",
        description: "Șablon grafic pentru Banner De Vânzare 121, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-121.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-122",
        slug: "banner-de-vanzare-122",
        title: "Banner Banner De Vânzare 122",
        description: "Șablon grafic pentru Banner De Vânzare 122, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-122.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-123",
        slug: "banner-de-vanzare-123",
        title: "Banner Banner De Vânzare 123",
        description: "Șablon grafic pentru Banner De Vânzare 123, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-123-scaled.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-1",
        slug: "banner-de-vanzare-de-inchiriat-1",
        title: "Banner Banner De Vânzare De Închiriat 1",
        description: "Șablon grafic pentru Banner De Vânzare De Închiriat 1, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-1.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-10",
        slug: "banner-de-vanzare-de-inchiriat-10",
        title: "Banner Banner De Vânzare De Închiriat 10",
        description: "Șablon grafic pentru Banner De Vânzare De Închiriat 10, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-10.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-11",
        slug: "banner-de-vanzare-de-inchiriat-11",
        title: "Banner Banner De Vânzare De Închiriat 11",
        description: "Șablon grafic pentru Banner De Vânzare De Închiriat 11, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-11.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-13",
        slug: "banner-de-vanzare-de-inchiriat-13",
        title: "Banner Banner De Vânzare De Închiriat 13",
        description: "Șablon grafic pentru Banner De Vânzare De Închiriat 13, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-13.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-14",
        slug: "banner-de-vanzare-de-inchiriat-14",
        title: "Banner Banner De Vânzare De Închiriat 14",
        description: "Șablon grafic pentru Banner De Vânzare De Închiriat 14, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-14.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-2",
        slug: "banner-de-vanzare-de-inchiriat-2",
        title: "Banner Banner De Vânzare De Închiriat 2",
        description: "Șablon grafic pentru Banner De Vânzare De Închiriat 2, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-2.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-3",
        slug: "banner-de-vanzare-de-inchiriat-3",
        title: "Banner Banner De Vânzare De Închiriat 3",
        description: "Șablon grafic pentru Banner De Vânzare De Închiriat 3, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-3.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-4",
        slug: "banner-de-vanzare-de-inchiriat-4",
        title: "Banner Banner De Vânzare De Închiriat 4",
        description: "Șablon grafic pentru Banner De Vânzare De Închiriat 4, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-4.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-5",
        slug: "banner-de-vanzare-de-inchiriat-5",
        title: "Banner Banner De Vânzare De Închiriat 5",
        description: "Șablon grafic pentru Banner De Vânzare De Închiriat 5, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-5.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-6",
        slug: "banner-de-vanzare-de-inchiriat-6",
        title: "Banner Banner De Vânzare De Închiriat 6",
        description: "Șablon grafic pentru Banner De Vânzare De Închiriat 6, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-6.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-8",
        slug: "banner-de-vanzare-de-inchiriat-8",
        title: "Banner Banner De Vânzare De Închiriat 8",
        description: "Șablon grafic pentru Banner De Vânzare De Închiriat 8, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-8.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-de-vanzare-de-inchiriat-9",
        slug: "banner-de-vanzare-de-inchiriat-9",
        title: "Banner Banner De Vânzare De Închiriat 9",
        description: "Șablon grafic pentru Banner De Vânzare De Închiriat 9, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/BANNER-DE-VANZARE-DE-INCHIRIAT-9.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-legume-de-vanzare",
        slug: "banner-legume-de-vanzare",
        title: "Banner Banner Legume De Vânzare",
        description: "Șablon grafic pentru Banner Legume De Vânzare, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-legume-de-vanzare.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },

    {
        id: "banner-pers-vanz-imobil-6107378",
        slug: "banner-personalizat-de-vanzare-apartament-sau-teren-6107378",
        title: "Banner Banner Personalizat De Vânzare Apartament Sau Teren 6107378",
        description: "Șablon grafic pentru Banner Personalizat De Vânzare Apartament Sau Teren 6107378, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-personalizat-de-vanzare-apartament-sau-teren_6107378.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-casa-de-vanzare",
        slug: "casa-de-vanzare",
        title: "Banner Casa De Vânzare",
        description: "Șablon grafic pentru Casa De Vânzare, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/casa-de-vanzare.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-casa-de-inchiriat",
        slug: "casa-de-inchiriat",
        title: "Banner Casa De Închiriat",
        description: "Șablon grafic pentru Casa De Închiriat, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/casa-de-inchiriat.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-de-inchiriat",
        slug: "de-inchiriat",
        title: "Banner De Închiriat",
        description: "Șablon grafic pentru De Închiriat, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/de-inchiriat.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-garsoniera-de-vanzare",
        slug: "garsoniera-de-vanzare",
        title: "Banner Garsoniera De Vânzare",
        description: "Șablon grafic pentru Garsoniera De Vânzare, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/garsoniera-de-vanzare.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-garsoniera-de-inchiriat",
        slug: "garsoniera-de-inchiriat",
        title: "Banner Garsoniera De Închiriat",
        description: "Șablon grafic pentru Garsoniera De Închiriat, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/garsoniera-de-inchiriat.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-spatiu-de-vanzare",
        slug: "spatiu-de-vanzare",
        title: "Banner Spatiu De Vânzare",
        description: "Șablon grafic pentru Spatiu De Vânzare, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/spatiu-de-vanzare.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-spatiu-de-inchiriat",
        slug: "spatiu-de-inchiriat",
        title: "Banner Spatiu De Închiriat",
        description: "Șablon grafic pentru Spatiu De Închiriat, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/spatiu-de-inchiriat.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-teren-de-vanzare",
        slug: "teren-de-vanzare",
        title: "Banner Teren De Vânzare",
        description: "Șablon grafic pentru Teren De Vânzare, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/teren-de-vanzare.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-teren-de-inchiriat",
        slug: "teren-de-inchiriat",
        title: "Banner Teren De Închiriat",
        description: "Șablon grafic pentru Teren De Închiriat, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/teren-de-inchiriat.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-teren-mp-de-vanzare",
        slug: "teren-mp-de-vanzare",
        title: "Banner Teren Mp De Vânzare",
        description: "Șablon grafic pentru Teren Mp De Vânzare, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/teren-mp-de-vanzare.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-vila-de-vanzare",
        slug: "vila-de-vanzare",
        title: "Banner Vila De Vânzare",
        description: "Șablon grafic pentru Vila De Vânzare, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/vila-de-vanzare.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-vila-de-inchiriat",
        slug: "vila-de-inchiriat",
        title: "Banner Vila De Închiriat",
        description: "Șablon grafic pentru Vila De Închiriat, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/vila-de-inchiriat.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-inchiriere-birouri",
        slug: "inchiriere-birouri",
        title: "Banner închiriere Birouri",
        description: "Șablon grafic pentru închiriere Birouri, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-de-inchiriat.jpg",
        price: "De la 49 LEI/mp",
        category: "Imobiliare",
        tags: ["banner", "imobiliare", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-cabinet-dentar",
        slug: "banner-cabinet-dentar",
        title: "Banner Banner Cabinet Dentar",
        description: "Șablon grafic pentru Banner Cabinet Dentar, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-cabinet-dentar.jpg",
        price: "De la 49 LEI/mp",
        category: "Servicii",
        tags: ["banner", "servicii", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-cabinet-dentar-1",
        slug: "banner-cabinet-dentar-1",
        title: "Banner Banner Cabinet Dentar 1",
        description: "Șablon grafic pentru Banner Cabinet Dentar 1, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-cabinet-dentar-1.jpg",
        price: "De la 49 LEI/mp",
        category: "Servicii",
        tags: ["banner", "servicii", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-pers-santier-nu-blocati-6107381",
        slug: "banner-personalizat-santier-in-lucru-nu-blocati-6107381",
        title: "Banner Banner Personalizat Santier în Lucru Nu Blocati 6107381",
        description: "Șablon grafic pentru Banner Personalizat Santier în Lucru Nu Blocati 6107381, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-personalizat-santier-in-lucru-nu-blocati_6107381.jpg",
        price: "De la 49 LEI/mp",
        category: "Servicii",
        tags: ["banner", "servicii", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-banner-servicii-medicale",
        slug: "banner-servicii-medicale",
        title: "Banner Banner Servicii Medicale",
        description: "Șablon grafic pentru Banner Servicii Medicale, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-servicii-medicale.jpg",
        price: "De la 49 LEI/mp",
        category: "Servicii",
        tags: ["banner", "servicii", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },

    {
        id: "banner-cabinet-stomatologic",
        slug: "cabinet-stomatologic",
        title: "Banner Cabinet Stomatologic",
        description: "Șablon grafic pentru Cabinet Stomatologic, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/cabinet-stomatologic.jpg",
        price: "De la 49 LEI/mp",
        category: "Servicii",
        tags: ["banner", "servicii", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-croitorie-retusari",
        slug: "croitorie-retusari",
        title: "Banner Croitorie Retusari",
        description: "Șablon grafic pentru Croitorie Retusari, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Servicii",
        tags: ["banner", "servicii", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-curatenie-la-domiciliu",
        slug: "curatenie-la-domiciliu",
        title: "Banner Curatenie La Domiciliu",
        description: "Șablon grafic pentru Curatenie La Domiciliu, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Servicii",
        tags: ["banner", "servicii", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-curatenie-profesionala",
        slug: "curatenie-profesionala",
        title: "Banner Curatenie Profesionala",
        description: "Șablon grafic pentru Curatenie Profesionala, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Servicii",
        tags: ["banner", "servicii", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-curier-local",
        slug: "curier-local",
        title: "Banner Curier Local",
        description: "Șablon grafic pentru Curier Local, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Servicii",
        tags: ["banner", "servicii", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-reparam-telefoane",
        slug: "reparam-telefoane",
        title: "Banner Reparam Telefoane",
        description: "Șablon grafic pentru Reparam Telefoane, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/banner-1.webp",
        price: "De la 49 LEI/mp",
        category: "Servicii",
        tags: ["banner", "servicii", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
    {
        id: "banner-servicii-medicale",
        slug: "servicii-medicale",
        title: "Banner Servicii Medicale",
        description: "Șablon grafic pentru Servicii Medicale, gata de comandă pe HomePrint.ro — configurează dimensiunea potrivită proiectului tău outdoor.",
        image: "/products/banner/servicii-medicale.jpg",
        price: "De la 49 LEI/mp",
        category: "Servicii",
        tags: ["banner", "servicii", "model"],
        metadata: {
            type: "banner-predefinit",
            variants: [
                { size: "100x50cm", price: 49, id: "100x50" },
                { size: "200x100cm", price: 198, id: "200x100" },
                { size: "300x100cm", price: 297, id: "300x100" }
            ]
        }
    },
];

