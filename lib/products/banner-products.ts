import { calculateBannerPrice } from "../pricing";
import { stockBannerDefaultInput } from "../configuratorPresets";
import { applyBannerProductAsset } from "../bannerProductAssets";
import { getBannerExampleImage } from "../originalPrintImages";
export interface BannerProduct {
    material?: "mesh" | "frontlit_440";
    productKind?: "banner" | "mesh";
    id: string;
    slug: string;
    title: string;
    description: string;
    image: string;
    images?: string[];
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

export const bannerProducts: BannerProduct[] = ([
{
  "id": "mesh100-001",
  "slug": "mesh-casa-de-vanzare-telefon-personalizat",
  "title": "Mesh casă de vânzare cu numărul tău",
  "description": "Model mesh microperforat pentru casă de vânzare, cu casă cu grădină. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-casa-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-casa-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh casă de vânzare",
    "mesh publicitar casă de vânzare",
    "mesh personalizat casă de vânzare",
    "banner mesh casă de vânzare",
    "mesh casa de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru casă de vânzare, cu casă cu grădină. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „CASĂ DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-002",
  "slug": "mesh-apartament-de-vanzare-telefon-personalizat",
  "title": "Mesh apartament de vânzare cu numărul tău",
  "description": "Model mesh microperforat pentru apartament de vânzare, cu bloc modern și balcon. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-apartament-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-apartament-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh apartament de vânzare",
    "mesh publicitar apartament de vânzare",
    "mesh personalizat apartament de vânzare",
    "banner mesh apartament de vânzare",
    "mesh apartament de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru apartament de vânzare, cu bloc modern și balcon. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „APARTAMENT DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-003",
  "slug": "mesh-garsoniera-de-vanzare-telefon-personalizat",
  "title": "Mesh garsonieră de vânzare cu numărul tău",
  "description": "Model mesh microperforat pentru garsonieră de vânzare, cu interior compact de locuință. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-garsoniera-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-garsoniera-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh garsonieră de vânzare",
    "mesh publicitar garsonieră de vânzare",
    "mesh personalizat garsonieră de vânzare",
    "banner mesh garsonieră de vânzare",
    "mesh garsoniera de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru garsonieră de vânzare, cu interior compact de locuință. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „GARSONIERĂ DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-004",
  "slug": "mesh-vila-de-vanzare-telefon-personalizat",
  "title": "Mesh vilă de vânzare cu numărul tău",
  "description": "Model mesh microperforat pentru vilă de vânzare, cu vilă luminoasă cu terasă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-vila-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-vila-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh vilă de vânzare",
    "mesh publicitar vilă de vânzare",
    "mesh personalizat vilă de vânzare",
    "banner mesh vilă de vânzare",
    "mesh vila de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru vilă de vânzare, cu vilă luminoasă cu terasă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „VILĂ DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-005",
  "slug": "mesh-hala-de-vanzare-telefon-personalizat",
  "title": "Mesh hală de vânzare cu numărul tău",
  "description": "Model mesh microperforat pentru hală de vânzare, cu hală industrială. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-hala-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-hala-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh hală de vânzare",
    "mesh publicitar hală de vânzare",
    "mesh personalizat hală de vânzare",
    "banner mesh hală de vânzare",
    "mesh hala de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru hală de vânzare, cu hală industrială. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „HALĂ DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-006",
  "slug": "mesh-magazin-de-vanzare-telefon-personalizat",
  "title": "Mesh magazin de vânzare cu numărul tău",
  "description": "Model mesh microperforat pentru magazin de vânzare, cu vitrină comercială. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-magazin-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-magazin-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh magazin de vânzare",
    "mesh publicitar magazin de vânzare",
    "mesh personalizat magazin de vânzare",
    "banner mesh magazin de vânzare",
    "mesh magazin de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru magazin de vânzare, cu vitrină comercială. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „MAGAZIN DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-007",
  "slug": "mesh-ferma-de-vanzare-telefon-personalizat",
  "title": "Mesh fermă de vânzare cu numărul tău",
  "description": "Model mesh microperforat pentru fermă de vânzare, cu fermă rurală. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-ferma-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-ferma-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh fermă de vânzare",
    "mesh publicitar fermă de vânzare",
    "mesh personalizat fermă de vânzare",
    "banner mesh fermă de vânzare",
    "mesh ferma de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru fermă de vânzare, cu fermă rurală. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „FERMĂ DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-008",
  "slug": "mesh-pensiune-de-vanzare-telefon-personalizat",
  "title": "Mesh pensiune de vânzare cu numărul tău",
  "description": "Model mesh microperforat pentru pensiune de vânzare, cu pensiune cu verandă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-pensiune-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-pensiune-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh pensiune de vânzare",
    "mesh publicitar pensiune de vânzare",
    "mesh personalizat pensiune de vânzare",
    "banner mesh pensiune de vânzare",
    "mesh pensiune de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru pensiune de vânzare, cu pensiune cu verandă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „PENSIUNE DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 200 × 50, 300 × 75, 400 × 100, 500 × 125, 600 × 150, 800 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 4:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-009",
  "slug": "mesh-teren-intravilan-de-vanzare-telefon-personalizat",
  "title": "Mesh teren intravilan de vânzare cu numărul tău",
  "description": "Model mesh microperforat pentru teren intravilan de vânzare, cu parcelă de teren delimitată lângă case. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-teren-intravilan-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-teren-intravilan-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh teren intravilan de vânzare",
    "mesh publicitar teren intravilan de vânzare",
    "mesh personalizat teren intravilan de vânzare",
    "banner mesh teren intravilan de vânzare",
    "mesh teren intravilan de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru teren intravilan de vânzare, cu parcelă de teren delimitată lângă case. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „TEREN INTRAVILAN DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-010",
  "slug": "mesh-teren-agricol-de-vanzare-telefon-personalizat",
  "title": "Mesh teren agricol de vânzare cu numărul tău",
  "description": "Model mesh microperforat pentru teren agricol de vânzare, cu câmp agricol cu rânduri cultivate. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-teren-agricol-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-teren-agricol-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh teren agricol de vânzare",
    "mesh publicitar teren agricol de vânzare",
    "mesh personalizat teren agricol de vânzare",
    "banner mesh teren agricol de vânzare",
    "mesh teren agricol de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru teren agricol de vânzare, cu câmp agricol cu rânduri cultivate. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „TEREN AGRICOL DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-011",
  "slug": "mesh-casa-de-inchiriat-telefon-personalizat",
  "title": "Mesh casă de închiriat cu numărul tău",
  "description": "Model mesh microperforat pentru casă de închiriat, cu casă cu intrare primitoare. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-casa-de-inchiriat-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-casa-de-inchiriat-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh casă de închiriat",
    "mesh publicitar casă de închiriat",
    "mesh personalizat casă de închiriat",
    "banner mesh casă de închiriat",
    "mesh casa de inchiriat",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru casă de închiriat, cu casă cu intrare primitoare. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „CASĂ DE ÎNCHIRIAT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-012",
  "slug": "mesh-apartament-de-inchiriat-telefon-personalizat",
  "title": "Mesh apartament de închiriat cu numărul tău",
  "description": "Model mesh microperforat pentru apartament de închiriat, cu apartament modern. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-apartament-de-inchiriat-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-apartament-de-inchiriat-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh apartament de închiriat",
    "mesh publicitar apartament de închiriat",
    "mesh personalizat apartament de închiriat",
    "banner mesh apartament de închiriat",
    "mesh apartament de inchiriat",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru apartament de închiriat, cu apartament modern. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „APARTAMENT DE ÎNCHIRIAT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-013",
  "slug": "mesh-garsoniera-de-inchiriat-telefon-personalizat",
  "title": "Mesh garsonieră de închiriat cu numărul tău",
  "description": "Model mesh microperforat pentru garsonieră de închiriat, cu locuință compactă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-garsoniera-de-inchiriat-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-garsoniera-de-inchiriat-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh garsonieră de închiriat",
    "mesh publicitar garsonieră de închiriat",
    "mesh personalizat garsonieră de închiriat",
    "banner mesh garsonieră de închiriat",
    "mesh garsoniera de inchiriat",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru garsonieră de închiriat, cu locuință compactă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „GARSONIERĂ DE ÎNCHIRIAT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-014",
  "slug": "mesh-birouri-de-inchiriat-telefon-personalizat",
  "title": "Mesh birouri de închiriat cu numărul tău",
  "description": "Model mesh microperforat pentru birouri de închiriat, cu clădire de birouri. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-birouri-de-inchiriat-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-birouri-de-inchiriat-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh birouri de închiriat",
    "mesh publicitar birouri de închiriat",
    "mesh personalizat birouri de închiriat",
    "banner mesh birouri de închiriat",
    "mesh birouri de inchiriat",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru birouri de închiriat, cu clădire de birouri. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „BIROURI DE ÎNCHIRIAT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-015",
  "slug": "mesh-hala-de-inchiriat-telefon-personalizat",
  "title": "Mesh hală de închiriat cu numărul tău",
  "description": "Model mesh microperforat pentru hală de închiriat, cu spațiu industrial cu ușă mare. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-hala-de-inchiriat-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-hala-de-inchiriat-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh hală de închiriat",
    "mesh publicitar hală de închiriat",
    "mesh personalizat hală de închiriat",
    "banner mesh hală de închiriat",
    "mesh hala de inchiriat",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru hală de închiriat, cu spațiu industrial cu ușă mare. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „HALĂ DE ÎNCHIRIAT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-016",
  "slug": "mesh-depozit-de-inchiriat-telefon-personalizat",
  "title": "Mesh depozit de închiriat cu numărul tău",
  "description": "Model mesh microperforat pentru depozit de închiriat, cu depozit cu rafturi. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-depozit-de-inchiriat-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-depozit-de-inchiriat-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh depozit de închiriat",
    "mesh publicitar depozit de închiriat",
    "mesh personalizat depozit de închiriat",
    "banner mesh depozit de închiriat",
    "mesh depozit de inchiriat",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru depozit de închiriat, cu depozit cu rafturi. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „DEPOZIT DE ÎNCHIRIAT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-017",
  "slug": "mesh-garaj-de-inchiriat-telefon-personalizat",
  "title": "Mesh garaj de închiriat cu numărul tău",
  "description": "Model mesh microperforat pentru garaj de închiriat, cu garaj cu ușă rulantă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-garaj-de-inchiriat-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-garaj-de-inchiriat-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh garaj de închiriat",
    "mesh publicitar garaj de închiriat",
    "mesh personalizat garaj de închiriat",
    "banner mesh garaj de închiriat",
    "mesh garaj de inchiriat",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru garaj de închiriat, cu garaj cu ușă rulantă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „GARAJ DE ÎNCHIRIAT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-018",
  "slug": "mesh-loc-de-parcare-de-inchiriat-telefon-personalizat",
  "title": "Mesh loc de parcare de închiriat cu numărul tău",
  "description": "Model mesh microperforat pentru loc de parcare de închiriat, cu loc de parcare marcat. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-loc-de-parcare-de-inchiriat-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-loc-de-parcare-de-inchiriat-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh loc de parcare de închiriat",
    "mesh publicitar loc de parcare de închiriat",
    "mesh personalizat loc de parcare de închiriat",
    "banner mesh loc de parcare de închiriat",
    "mesh loc de parcare de inchiriat",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru loc de parcare de închiriat, cu loc de parcare marcat. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „LOC DE PARCARE DE ÎNCHIRIAT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-019",
  "slug": "mesh-cabana-de-inchiriat-telefon-personalizat",
  "title": "Mesh cabană de închiriat cu numărul tău",
  "description": "Model mesh microperforat pentru cabană de închiriat, cu cabană de lemn în munți. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-cabana-de-inchiriat-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-cabana-de-inchiriat-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh cabană de închiriat",
    "mesh publicitar cabană de închiriat",
    "mesh personalizat cabană de închiriat",
    "banner mesh cabană de închiriat",
    "mesh cabana de inchiriat",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru cabană de închiriat, cu cabană de lemn în munți. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „CABANĂ DE ÎNCHIRIAT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-020",
  "slug": "mesh-inchirieri-in-regim-hotelier-telefon-personalizat",
  "title": "Mesh închirieri în regim hotelier cu numărul tău",
  "description": "Model mesh microperforat pentru închirieri în regim hotelier, cu cameră de cazare modernă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-inchirieri-in-regim-hotelier-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-inchirieri-in-regim-hotelier-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh închirieri în regim hotelier",
    "mesh publicitar închirieri în regim hotelier",
    "mesh personalizat închirieri în regim hotelier",
    "banner mesh închirieri în regim hotelier",
    "mesh inchirieri in regim hotelier",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru închirieri în regim hotelier, cu cameră de cazare modernă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „ÎNCHIRIERI ÎN REGIM HOTELIER” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-021",
  "slug": "mesh-instalatii-sanitare-telefon-personalizat",
  "title": "Mesh instalații sanitare cu numărul tău",
  "description": "Model mesh microperforat pentru instalații sanitare, cu țevi și robinete. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-instalatii-sanitare-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-instalatii-sanitare-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh instalații sanitare",
    "mesh publicitar instalații sanitare",
    "mesh personalizat instalații sanitare",
    "banner mesh instalații sanitare",
    "mesh instalatii sanitare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru instalații sanitare, cu țevi și robinete. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „INSTALAȚII SANITARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-022",
  "slug": "mesh-instalatii-termice-telefon-personalizat",
  "title": "Mesh instalații termice cu numărul tău",
  "description": "Model mesh microperforat pentru instalații termice, cu radiator și conducte. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-instalatii-termice-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-instalatii-termice-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh instalații termice",
    "mesh publicitar instalații termice",
    "mesh personalizat instalații termice",
    "banner mesh instalații termice",
    "mesh instalatii termice",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru instalații termice, cu radiator și conducte. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „INSTALAȚII TERMICE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-023",
  "slug": "mesh-montaj-aer-conditionat-telefon-personalizat",
  "title": "Mesh montaj aer condiționat cu numărul tău",
  "description": "Model mesh microperforat pentru montaj aer condiționat, cu unitate de aer condiționat. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-montaj-aer-conditionat-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-montaj-aer-conditionat-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh montaj aer condiționat",
    "mesh publicitar montaj aer condiționat",
    "mesh personalizat montaj aer condiționat",
    "banner mesh montaj aer condiționat",
    "mesh montaj aer conditionat",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru montaj aer condiționat, cu unitate de aer condiționat. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „MONTAJ AER CONDIȚIONAT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-024",
  "slug": "mesh-reparatii-acoperisuri-telefon-personalizat",
  "title": "Mesh reparații acoperișuri cu numărul tău",
  "description": "Model mesh microperforat pentru reparații acoperișuri, cu acoperiș din țiglă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-reparatii-acoperisuri-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-reparatii-acoperisuri-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh reparații acoperișuri",
    "mesh publicitar reparații acoperișuri",
    "mesh personalizat reparații acoperișuri",
    "banner mesh reparații acoperișuri",
    "mesh reparatii acoperisuri",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru reparații acoperișuri, cu acoperiș din țiglă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „REPARAȚII ACOPERIȘURI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-025",
  "slug": "mesh-montaj-termopane-telefon-personalizat",
  "title": "Mesh montaj termopane cu numărul tău",
  "description": "Model mesh microperforat pentru montaj termopane, cu fereastră modernă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-montaj-termopane-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-montaj-termopane-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh montaj termopane",
    "mesh publicitar montaj termopane",
    "mesh personalizat montaj termopane",
    "banner mesh montaj termopane",
    "mesh montaj termopane",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru montaj termopane, cu fereastră modernă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „MONTAJ TERMOPANE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-026",
  "slug": "mesh-zugraveli-interioare-telefon-personalizat",
  "title": "Mesh zugrăveli interioare cu numărul tău",
  "description": "Model mesh microperforat pentru zugrăveli interioare, cu trafalet și perete. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-zugraveli-interioare-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-zugraveli-interioare-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh zugrăveli interioare",
    "mesh publicitar zugrăveli interioare",
    "mesh personalizat zugrăveli interioare",
    "banner mesh zugrăveli interioare",
    "mesh zugraveli interioare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru zugrăveli interioare, cu trafalet și perete. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „ZUGRĂVELI INTERIOARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-027",
  "slug": "mesh-renovari-apartamente-telefon-personalizat",
  "title": "Mesh renovări apartamente cu numărul tău",
  "description": "Model mesh microperforat pentru renovări apartamente, cu interior renovat și unelte. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-renovari-apartamente-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-renovari-apartamente-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh renovări apartamente",
    "mesh publicitar renovări apartamente",
    "mesh personalizat renovări apartamente",
    "banner mesh renovări apartamente",
    "mesh renovari apartamente",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru renovări apartamente, cu interior renovat și unelte. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „RENOVĂRI APARTAMENTE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-028",
  "slug": "mesh-montaj-gresie-si-faianta-telefon-personalizat",
  "title": "Mesh montaj gresie și faianță cu numărul tău",
  "description": "Model mesh microperforat pentru montaj gresie și faianță, cu plăci ceramice și mistrie. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-montaj-gresie-si-faianta-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-montaj-gresie-si-faianta-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh montaj gresie și faianță",
    "mesh publicitar montaj gresie și faianță",
    "mesh personalizat montaj gresie și faianță",
    "banner mesh montaj gresie și faianță",
    "mesh montaj gresie si faianta",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru montaj gresie și faianță, cu plăci ceramice și mistrie. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „MONTAJ GRESIE ȘI FAIANȚĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-029",
  "slug": "mesh-montaj-parchet-telefon-personalizat",
  "title": "Mesh montaj parchet cu numărul tău",
  "description": "Model mesh microperforat pentru montaj parchet, cu podea din lemn. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-montaj-parchet-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-montaj-parchet-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh montaj parchet",
    "mesh publicitar montaj parchet",
    "mesh personalizat montaj parchet",
    "banner mesh montaj parchet",
    "mesh montaj parchet",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru montaj parchet, cu podea din lemn. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „MONTAJ PARCHET” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-030",
  "slug": "mesh-mobila-la-comanda-telefon-personalizat",
  "title": "Mesh mobilă la comandă cu numărul tău",
  "description": "Model mesh microperforat pentru mobilă la comandă, cu bucătărie cu mobilier din lemn. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-mobila-la-comanda-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-mobila-la-comanda-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh mobilă la comandă",
    "mesh publicitar mobilă la comandă",
    "mesh personalizat mobilă la comandă",
    "banner mesh mobilă la comandă",
    "mesh mobila la comanda",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru mobilă la comandă, cu bucătărie cu mobilier din lemn. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „MOBILĂ LA COMANDĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-031",
  "slug": "mesh-garduri-si-porti-telefon-personalizat",
  "title": "Mesh garduri și porți cu numărul tău",
  "description": "Model mesh microperforat pentru garduri și porți, cu poartă metalică și gard. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-garduri-si-porti-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-garduri-si-porti-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh garduri și porți",
    "mesh publicitar garduri și porți",
    "mesh personalizat garduri și porți",
    "banner mesh garduri și porți",
    "mesh garduri si porti",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru garduri și porți, cu poartă metalică și gard. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „GARDURI ȘI PORȚI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-032",
  "slug": "mesh-pavaje-si-alei-telefon-personalizat",
  "title": "Mesh pavaje și alei cu numărul tău",
  "description": "Model mesh microperforat pentru pavaje și alei, cu alee pavată. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-pavaje-si-alei-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-pavaje-si-alei-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh pavaje și alei",
    "mesh publicitar pavaje și alei",
    "mesh personalizat pavaje și alei",
    "banner mesh pavaje și alei",
    "mesh pavaje si alei",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru pavaje și alei, cu alee pavată. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „PAVAJE ȘI ALEI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-033",
  "slug": "mesh-excavatii-si-terasamente-telefon-personalizat",
  "title": "Mesh excavații și terasamente cu numărul tău",
  "description": "Model mesh microperforat pentru excavații și terasamente, cu excavator. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-excavatii-si-terasamente-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-excavatii-si-terasamente-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh excavații și terasamente",
    "mesh publicitar excavații și terasamente",
    "mesh personalizat excavații și terasamente",
    "banner mesh excavații și terasamente",
    "mesh excavatii si terasamente",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru excavații și terasamente, cu excavator. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „EXCAVAȚII ȘI TERASAMENTE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-034",
  "slug": "mesh-inchirieri-utilaje-telefon-personalizat",
  "title": "Mesh închirieri utilaje cu numărul tău",
  "description": "Model mesh microperforat pentru închirieri utilaje, cu utilaj compact de construcții. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-inchirieri-utilaje-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-inchirieri-utilaje-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh închirieri utilaje",
    "mesh publicitar închirieri utilaje",
    "mesh personalizat închirieri utilaje",
    "banner mesh închirieri utilaje",
    "mesh inchirieri utilaje",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru închirieri utilaje, cu utilaj compact de construcții. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „ÎNCHIRIERI UTILAJE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-035",
  "slug": "mesh-transport-moloz-telefon-personalizat",
  "title": "Mesh transport moloz cu numărul tău",
  "description": "Model mesh microperforat pentru transport moloz, cu container pentru moloz și camion. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-transport-moloz-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-transport-moloz-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh transport moloz",
    "mesh publicitar transport moloz",
    "mesh personalizat transport moloz",
    "banner mesh transport moloz",
    "mesh transport moloz",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru transport moloz, cu container pentru moloz și camion. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „TRANSPORT MOLOZ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-036",
  "slug": "mesh-panouri-fotovoltaice-telefon-personalizat",
  "title": "Mesh panouri fotovoltaice cu numărul tău",
  "description": "Model mesh microperforat pentru panouri fotovoltaice, cu acoperiș cu panouri fotovoltaice. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-panouri-fotovoltaice-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-panouri-fotovoltaice-telefon-personalizat.webp"
  ],
  "category": "Energie și construcții specializate",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh panouri fotovoltaice",
    "mesh publicitar panouri fotovoltaice",
    "mesh personalizat panouri fotovoltaice",
    "banner mesh panouri fotovoltaice",
    "mesh panouri fotovoltaice",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru panouri fotovoltaice, cu acoperiș cu panouri fotovoltaice. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „PANOURI FOTOVOLTAICE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-037",
  "slug": "mesh-pompe-de-caldura-telefon-personalizat",
  "title": "Mesh pompe de căldură cu numărul tău",
  "description": "Model mesh microperforat pentru pompe de căldură, cu unitate exterioară de pompă de căldură. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-pompe-de-caldura-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-pompe-de-caldura-telefon-personalizat.webp"
  ],
  "category": "Energie și construcții specializate",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh pompe de căldură",
    "mesh publicitar pompe de căldură",
    "mesh personalizat pompe de căldură",
    "banner mesh pompe de căldură",
    "mesh pompe de caldura",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru pompe de căldură, cu unitate exterioară de pompă de căldură. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „POMPE DE CĂLDURĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-038",
  "slug": "mesh-termoizolatii-fatade-telefon-personalizat",
  "title": "Mesh termoizolații fațade cu numărul tău",
  "description": "Model mesh microperforat pentru termoizolații fațade, cu fațadă izolată și panouri izolante. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-termoizolatii-fatade-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-termoizolatii-fatade-telefon-personalizat.webp"
  ],
  "category": "Energie și construcții specializate",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh termoizolații fațade",
    "mesh publicitar termoizolații fațade",
    "mesh personalizat termoizolații fațade",
    "banner mesh termoizolații fațade",
    "mesh termoizolatii fatade",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru termoizolații fațade, cu fațadă izolată și panouri izolante. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „TERMOIZOLAȚII FAȚADE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-039",
  "slug": "mesh-hidroizolatii-telefon-personalizat",
  "title": "Mesh hidroizolații cu numărul tău",
  "description": "Model mesh microperforat pentru hidroizolații, cu membrană de hidroizolație și acoperiș plat. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-hidroizolatii-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-hidroizolatii-telefon-personalizat.webp"
  ],
  "category": "Energie și construcții specializate",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh hidroizolații",
    "mesh publicitar hidroizolații",
    "mesh personalizat hidroizolații",
    "banner mesh hidroizolații",
    "mesh hidroizolatii",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru hidroizolații, cu membrană de hidroizolație și acoperiș plat. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „HIDROIZOLAȚII” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-040",
  "slug": "mesh-montaj-acoperisuri-telefon-personalizat",
  "title": "Mesh montaj acoperișuri cu numărul tău",
  "description": "Model mesh microperforat pentru montaj acoperișuri, cu acoperiș nou din țiglă metalică. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-montaj-acoperisuri-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-montaj-acoperisuri-telefon-personalizat.webp"
  ],
  "category": "Energie și construcții specializate",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh montaj acoperișuri",
    "mesh publicitar montaj acoperișuri",
    "mesh personalizat montaj acoperișuri",
    "banner mesh montaj acoperișuri",
    "mesh montaj acoperisuri",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru montaj acoperișuri, cu acoperiș nou din țiglă metalică. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „MONTAJ ACOPERIȘURI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-041",
  "slug": "mesh-service-auto-telefon-personalizat",
  "title": "Mesh service auto cu numărul tău",
  "description": "Model mesh microperforat pentru service auto, cu automobil și scule de atelier. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-service-auto-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-service-auto-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh service auto",
    "mesh publicitar service auto",
    "mesh personalizat service auto",
    "banner mesh service auto",
    "mesh service auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru service auto, cu automobil și scule de atelier. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „SERVICE AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-042",
  "slug": "mesh-vulcanizare-telefon-personalizat",
  "title": "Mesh vulcanizare cu numărul tău",
  "description": "Model mesh microperforat pentru vulcanizare, cu anvelope și jantă auto. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-vulcanizare-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-vulcanizare-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh vulcanizare",
    "mesh publicitar vulcanizare",
    "mesh personalizat vulcanizare",
    "banner mesh vulcanizare",
    "mesh vulcanizare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru vulcanizare, cu anvelope și jantă auto. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „VULCANIZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-043",
  "slug": "mesh-spalatorie-auto-telefon-personalizat",
  "title": "Mesh spălătorie auto cu numărul tău",
  "description": "Model mesh microperforat pentru spălătorie auto, cu automobil cu spumă și apă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-spalatorie-auto-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-spalatorie-auto-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh spălătorie auto",
    "mesh publicitar spălătorie auto",
    "mesh personalizat spălătorie auto",
    "banner mesh spălătorie auto",
    "mesh spalatorie auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru spălătorie auto, cu automobil cu spumă și apă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „SPĂLĂTORIE AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-044",
  "slug": "mesh-detailing-auto-telefon-personalizat",
  "title": "Mesh detailing auto cu numărul tău",
  "description": "Model mesh microperforat pentru detailing auto, cu caroserie lustruită și lavetă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-detailing-auto-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-detailing-auto-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh detailing auto",
    "mesh publicitar detailing auto",
    "mesh personalizat detailing auto",
    "banner mesh detailing auto",
    "mesh detailing auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru detailing auto, cu caroserie lustruită și lavetă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „DETAILING AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-045",
  "slug": "mesh-tinichigerie-auto-telefon-personalizat",
  "title": "Mesh tinichigerie auto cu numărul tău",
  "description": "Model mesh microperforat pentru tinichigerie auto, cu caroserie și unelte de reparații. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-tinichigerie-auto-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-tinichigerie-auto-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh tinichigerie auto",
    "mesh publicitar tinichigerie auto",
    "mesh personalizat tinichigerie auto",
    "banner mesh tinichigerie auto",
    "mesh tinichigerie auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru tinichigerie auto, cu caroserie și unelte de reparații. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „TINICHIGERIE AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-046",
  "slug": "mesh-vopsitorie-auto-telefon-personalizat",
  "title": "Mesh vopsitorie auto cu numărul tău",
  "description": "Model mesh microperforat pentru vopsitorie auto, cu pistol de vopsit și panou de caroserie. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-vopsitorie-auto-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-vopsitorie-auto-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh vopsitorie auto",
    "mesh publicitar vopsitorie auto",
    "mesh personalizat vopsitorie auto",
    "banner mesh vopsitorie auto",
    "mesh vopsitorie auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru vopsitorie auto, cu pistol de vopsit și panou de caroserie. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „VOPSITORIE AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-047",
  "slug": "mesh-piese-auto-telefon-personalizat",
  "title": "Mesh piese auto cu numărul tău",
  "description": "Model mesh microperforat pentru piese auto, cu piese mecanice auto. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-piese-auto-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-piese-auto-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh piese auto",
    "mesh publicitar piese auto",
    "mesh personalizat piese auto",
    "banner mesh piese auto",
    "mesh piese auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru piese auto, cu piese mecanice auto. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „PIESE AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-048",
  "slug": "mesh-tractari-auto-telefon-personalizat",
  "title": "Mesh tractări auto cu numărul tău",
  "description": "Model mesh microperforat pentru tractări auto, cu autospecială cu platformă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-tractari-auto-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-tractari-auto-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh tractări auto",
    "mesh publicitar tractări auto",
    "mesh personalizat tractări auto",
    "banner mesh tractări auto",
    "mesh tractari auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru tractări auto, cu autospecială cu platformă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „TRACTĂRI AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-049",
  "slug": "mesh-inchirieri-auto-telefon-personalizat",
  "title": "Mesh închirieri auto cu numărul tău",
  "description": "Model mesh microperforat pentru închirieri auto, cu automobil și cheie. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-inchirieri-auto-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-inchirieri-auto-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh închirieri auto",
    "mesh publicitar închirieri auto",
    "mesh personalizat închirieri auto",
    "banner mesh închirieri auto",
    "mesh inchirieri auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru închirieri auto, cu automobil și cheie. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „ÎNCHIRIERI AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-050",
  "slug": "mesh-diagnoza-auto-telefon-personalizat",
  "title": "Mesh diagnoză auto cu numărul tău",
  "description": "Model mesh microperforat pentru diagnoză auto, cu aparat de diagnoză și automobil. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-diagnoza-auto-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-diagnoza-auto-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh diagnoză auto",
    "mesh publicitar diagnoză auto",
    "mesh personalizat diagnoză auto",
    "banner mesh diagnoză auto",
    "mesh diagnoza auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru diagnoză auto, cu aparat de diagnoză și automobil. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „DIAGNOZĂ AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-051",
  "slug": "mesh-schimb-ulei-auto-telefon-personalizat",
  "title": "Mesh schimb ulei auto cu numărul tău",
  "description": "Model mesh microperforat pentru schimb ulei auto, cu recipient de ulei și filtru. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-schimb-ulei-auto-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-schimb-ulei-auto-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh schimb ulei auto",
    "mesh publicitar schimb ulei auto",
    "mesh personalizat schimb ulei auto",
    "banner mesh schimb ulei auto",
    "mesh schimb ulei auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru schimb ulei auto, cu recipient de ulei și filtru. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „SCHIMB ULEI AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-052",
  "slug": "mesh-parbrize-auto-telefon-personalizat",
  "title": "Mesh parbrize auto cu numărul tău",
  "description": "Model mesh microperforat pentru parbrize auto, cu parbriz și automobil. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-parbrize-auto-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-parbrize-auto-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh parbrize auto",
    "mesh publicitar parbrize auto",
    "mesh personalizat parbrize auto",
    "banner mesh parbrize auto",
    "mesh parbrize auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru parbrize auto, cu parbriz și automobil. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „PARBRIZE AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-053",
  "slug": "mesh-service-motociclete-telefon-personalizat",
  "title": "Mesh service motociclete cu numărul tău",
  "description": "Model mesh microperforat pentru service motociclete, cu motocicletă și scule. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-service-motociclete-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-service-motociclete-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh service motociclete",
    "mesh publicitar service motociclete",
    "mesh personalizat service motociclete",
    "banner mesh service motociclete",
    "mesh service motociclete",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru service motociclete, cu motocicletă și scule. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „SERVICE MOTOCICLETE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-054",
  "slug": "mesh-inchirieri-rulote-telefon-personalizat",
  "title": "Mesh închirieri rulote cu numărul tău",
  "description": "Model mesh microperforat pentru închirieri rulote, cu rulotă de vacanță. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-inchirieri-rulote-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-inchirieri-rulote-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh închirieri rulote",
    "mesh publicitar închirieri rulote",
    "mesh personalizat închirieri rulote",
    "banner mesh închirieri rulote",
    "mesh inchirieri rulote",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru închirieri rulote, cu rulotă de vacanță. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „ÎNCHIRIERI RULOTE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-055",
  "slug": "mesh-scoala-de-soferi-telefon-personalizat",
  "title": "Mesh școală de șoferi cu numărul tău",
  "description": "Model mesh microperforat pentru școală de șoferi, cu automobil de școală și conuri. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-scoala-de-soferi-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-scoala-de-soferi-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh școală de șoferi",
    "mesh publicitar școală de șoferi",
    "mesh personalizat școală de șoferi",
    "banner mesh școală de șoferi",
    "mesh scoala de soferi",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru școală de șoferi, cu automobil de școală și conuri. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „ȘCOALĂ DE ȘOFERI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-056",
  "slug": "mesh-pizzerie-telefon-personalizat",
  "title": "Mesh pizzerie cu numărul tău",
  "description": "Model mesh microperforat pentru pizzerie, cu pizza proaspătă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-pizzerie-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-pizzerie-telefon-personalizat.webp"
  ],
  "category": "HoReCa",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh pizzerie",
    "mesh publicitar pizzerie",
    "mesh personalizat pizzerie",
    "banner mesh pizzerie",
    "mesh pizzerie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru pizzerie, cu pizza proaspătă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „PIZZERIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-057",
  "slug": "mesh-fast-food-telefon-personalizat",
  "title": "Mesh fast food cu numărul tău",
  "description": "Model mesh microperforat pentru fast food, cu burger și cartofi. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-fast-food-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-fast-food-telefon-personalizat.webp"
  ],
  "category": "HoReCa",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh fast food",
    "mesh publicitar fast food",
    "mesh personalizat fast food",
    "banner mesh fast food",
    "mesh fast food",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru fast food, cu burger și cartofi. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „FAST FOOD” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-058",
  "slug": "mesh-restaurant-telefon-personalizat",
  "title": "Mesh restaurant cu numărul tău",
  "description": "Model mesh microperforat pentru restaurant, cu preparat culinar și tacâmuri. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-restaurant-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-restaurant-telefon-personalizat.webp"
  ],
  "category": "HoReCa",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh restaurant",
    "mesh publicitar restaurant",
    "mesh personalizat restaurant",
    "banner mesh restaurant",
    "mesh restaurant",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru restaurant, cu preparat culinar și tacâmuri. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „RESTAURANT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-059",
  "slug": "mesh-cafenea-telefon-personalizat",
  "title": "Mesh cafenea cu numărul tău",
  "description": "Model mesh microperforat pentru cafenea, cu ceașcă de cafea și boabe. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-cafenea-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-cafenea-telefon-personalizat.webp"
  ],
  "category": "HoReCa",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh cafenea",
    "mesh publicitar cafenea",
    "mesh personalizat cafenea",
    "banner mesh cafenea",
    "mesh cafenea",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru cafenea, cu ceașcă de cafea și boabe. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „CAFENEA” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-060",
  "slug": "mesh-cofetarie-telefon-personalizat",
  "title": "Mesh cofetărie cu numărul tău",
  "description": "Model mesh microperforat pentru cofetărie, cu tort și prăjituri. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-cofetarie-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-cofetarie-telefon-personalizat.webp"
  ],
  "category": "HoReCa",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh cofetărie",
    "mesh publicitar cofetărie",
    "mesh personalizat cofetărie",
    "banner mesh cofetărie",
    "mesh cofetarie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru cofetărie, cu tort și prăjituri. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „COFETĂRIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-061",
  "slug": "mesh-patiserie-telefon-personalizat",
  "title": "Mesh patiserie cu numărul tău",
  "description": "Model mesh microperforat pentru patiserie, cu croissante și produse de patiserie. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-patiserie-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-patiserie-telefon-personalizat.webp"
  ],
  "category": "HoReCa",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh patiserie",
    "mesh publicitar patiserie",
    "mesh personalizat patiserie",
    "banner mesh patiserie",
    "mesh patiserie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru patiserie, cu croissante și produse de patiserie. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „PATISERIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-062",
  "slug": "mesh-brutarie-telefon-personalizat",
  "title": "Mesh brutărie cu numărul tău",
  "description": "Model mesh microperforat pentru brutărie, cu pâine artizanală. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-brutarie-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-brutarie-telefon-personalizat.webp"
  ],
  "category": "HoReCa",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh brutărie",
    "mesh publicitar brutărie",
    "mesh personalizat brutărie",
    "banner mesh brutărie",
    "mesh brutarie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru brutărie, cu pâine artizanală. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „BRUTĂRIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-063",
  "slug": "mesh-catering-telefon-personalizat",
  "title": "Mesh catering cu numărul tău",
  "description": "Model mesh microperforat pentru catering, cu platouri cu mâncare. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-catering-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-catering-telefon-personalizat.webp"
  ],
  "category": "HoReCa",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh catering",
    "mesh publicitar catering",
    "mesh personalizat catering",
    "banner mesh catering",
    "mesh catering",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru catering, cu platouri cu mâncare. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „CATERING” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-064",
  "slug": "mesh-livrari-mancare-telefon-personalizat",
  "title": "Mesh livrări mâncare cu numărul tău",
  "description": "Model mesh microperforat pentru livrări mâncare, cu cutie de mâncare și sacoșă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-livrari-mancare-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-livrari-mancare-telefon-personalizat.webp"
  ],
  "category": "HoReCa",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh livrări mâncare",
    "mesh publicitar livrări mâncare",
    "mesh personalizat livrări mâncare",
    "banner mesh livrări mâncare",
    "mesh livrari mancare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru livrări mâncare, cu cutie de mâncare și sacoșă. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „LIVRĂRI MÂNCARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-065",
  "slug": "mesh-pensiune-telefon-personalizat",
  "title": "Mesh pensiune cu numărul tău",
  "description": "Model mesh microperforat pentru pensiune, cu casă de oaspeți și grădină. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-pensiune-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-pensiune-telefon-personalizat.webp"
  ],
  "category": "HoReCa",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh pensiune",
    "mesh publicitar pensiune",
    "mesh personalizat pensiune",
    "banner mesh pensiune",
    "mesh pensiune",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru pensiune, cu casă de oaspeți și grădină. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „PENSIUNE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-066",
  "slug": "mesh-shaormerie-telefon-personalizat",
  "title": "Mesh shaormerie cu numărul tău",
  "description": "Model mesh microperforat pentru shaormerie, cu shaorma și legume proaspete. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-shaormerie-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-shaormerie-telefon-personalizat.webp"
  ],
  "category": "HoReCa și evenimente",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh shaormerie",
    "mesh publicitar shaormerie",
    "mesh personalizat shaormerie",
    "banner mesh shaormerie",
    "mesh shaormerie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru shaormerie, cu shaorma și legume proaspete. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „SHAORMERIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-067",
  "slug": "mesh-gelaterie-telefon-personalizat",
  "title": "Mesh gelaterie cu numărul tău",
  "description": "Model mesh microperforat pentru gelaterie, cu cupe cu înghețată colorată. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-gelaterie-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-gelaterie-telefon-personalizat.webp"
  ],
  "category": "HoReCa și evenimente",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh gelaterie",
    "mesh publicitar gelaterie",
    "mesh personalizat gelaterie",
    "banner mesh gelaterie",
    "mesh gelaterie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru gelaterie, cu cupe cu înghețată colorată. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „GELATERIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-068",
  "slug": "mesh-gogoserie-telefon-personalizat",
  "title": "Mesh gogoșerie cu numărul tău",
  "description": "Model mesh microperforat pentru gogoșerie, cu gogoși proaspete. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-gogoserie-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-gogoserie-telefon-personalizat.webp"
  ],
  "category": "HoReCa și evenimente",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh gogoșerie",
    "mesh publicitar gogoșerie",
    "mesh personalizat gogoșerie",
    "banner mesh gogoșerie",
    "mesh gogoserie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru gogoșerie, cu gogoși proaspete. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „GOGOȘERIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-069",
  "slug": "mesh-clatitarie-telefon-personalizat",
  "title": "Mesh clătitărie cu numărul tău",
  "description": "Model mesh microperforat pentru clătitărie, cu clătite cu fructe. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-clatitarie-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-clatitarie-telefon-personalizat.webp"
  ],
  "category": "HoReCa și evenimente",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh clătitărie",
    "mesh publicitar clătitărie",
    "mesh personalizat clătitărie",
    "banner mesh clătitărie",
    "mesh clatitarie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru clătitărie, cu clătite cu fructe. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „CLĂTITĂRIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-070",
  "slug": "mesh-covrigarie-telefon-personalizat",
  "title": "Mesh covrigărie cu numărul tău",
  "description": "Model mesh microperforat pentru covrigărie, cu covrigi proaspeți. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-covrigarie-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-covrigarie-telefon-personalizat.webp"
  ],
  "category": "HoReCa și evenimente",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh covrigărie",
    "mesh publicitar covrigărie",
    "mesh personalizat covrigărie",
    "banner mesh covrigărie",
    "mesh covrigarie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru covrigărie, cu covrigi proaspeți. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „COVRIGĂRIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-071",
  "slug": "mesh-macelarie-si-carmangerie-telefon-personalizat",
  "title": "Mesh măcelărie și carmangerie cu numărul tău",
  "description": "Model mesh microperforat pentru măcelărie și carmangerie, cu vitrină cu produse din carne fără scene grafice. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-macelarie-si-carmangerie-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-macelarie-si-carmangerie-telefon-personalizat.webp"
  ],
  "category": "Magazine și comerț local",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh măcelărie și carmangerie",
    "mesh publicitar măcelărie și carmangerie",
    "mesh personalizat măcelărie și carmangerie",
    "banner mesh măcelărie și carmangerie",
    "mesh macelarie si carmangerie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru măcelărie și carmangerie, cu vitrină cu produse din carne fără scene grafice. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „MĂCELĂRIE ȘI CARMANGERIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-072",
  "slug": "mesh-pescarie-telefon-personalizat",
  "title": "Mesh pescărie cu numărul tău",
  "description": "Model mesh microperforat pentru pescărie, cu pește proaspăt pe gheață. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-pescarie-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-pescarie-telefon-personalizat.webp"
  ],
  "category": "Magazine și comerț local",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh pescărie",
    "mesh publicitar pescărie",
    "mesh personalizat pescărie",
    "banner mesh pescărie",
    "mesh pescarie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru pescărie, cu pește proaspăt pe gheață. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „PESCĂRIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-073",
  "slug": "mesh-magazin-alimentar-telefon-personalizat",
  "title": "Mesh magazin alimentar cu numărul tău",
  "description": "Model mesh microperforat pentru magazin alimentar, cu rafturi cu produse alimentare fără mărci. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-magazin-alimentar-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-magazin-alimentar-telefon-personalizat.webp"
  ],
  "category": "Magazine și comerț local",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh magazin alimentar",
    "mesh publicitar magazin alimentar",
    "mesh personalizat magazin alimentar",
    "banner mesh magazin alimentar",
    "mesh magazin alimentar",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru magazin alimentar, cu rafturi cu produse alimentare fără mărci. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „MAGAZIN ALIMENTAR” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-074",
  "slug": "mesh-magazin-mixt-telefon-personalizat",
  "title": "Mesh magazin mixt cu numărul tău",
  "description": "Model mesh microperforat pentru magazin mixt, cu rafturi ordonate cu produse de uz zilnic. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-magazin-mixt-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-magazin-mixt-telefon-personalizat.webp"
  ],
  "category": "Magazine și comerț local",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh magazin mixt",
    "mesh publicitar magazin mixt",
    "mesh personalizat magazin mixt",
    "banner mesh magazin mixt",
    "mesh magazin mixt",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru magazin mixt, cu rafturi ordonate cu produse de uz zilnic. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „MAGAZIN MIXT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-075",
  "slug": "mesh-aprozar-telefon-personalizat",
  "title": "Mesh aprozar cu numărul tău",
  "description": "Model mesh microperforat pentru aprozar, cu lăzi cu fructe și legume. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-aprozar-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-aprozar-telefon-personalizat.webp"
  ],
  "category": "Magazine și comerț local",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh aprozar",
    "mesh publicitar aprozar",
    "mesh personalizat aprozar",
    "banner mesh aprozar",
    "mesh aprozar",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru aprozar, cu lăzi cu fructe și legume. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „APROZAR” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-076",
  "slug": "mesh-produse-traditionale-telefon-personalizat",
  "title": "Mesh produse tradiționale cu numărul tău",
  "description": "Model mesh microperforat pentru produse tradiționale, cu coș rustic cu produse locale. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-produse-traditionale-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-produse-traditionale-telefon-personalizat.webp"
  ],
  "category": "Magazine și comerț local",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh produse tradiționale",
    "mesh publicitar produse tradiționale",
    "mesh personalizat produse tradiționale",
    "banner mesh produse tradiționale",
    "mesh produse traditionale",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru produse tradiționale, cu coș rustic cu produse locale. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „PRODUSE TRADIȚIONALE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-077",
  "slug": "mesh-magazin-de-bauturi-telefon-personalizat",
  "title": "Mesh magazin de băuturi cu numărul tău",
  "description": "Model mesh microperforat pentru magazin de băuturi, cu sticle generice fără etichete și fără mărci. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-magazin-de-bauturi-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-magazin-de-bauturi-telefon-personalizat.webp"
  ],
  "category": "Magazine și comerț local",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh magazin de băuturi",
    "mesh publicitar magazin de băuturi",
    "mesh personalizat magazin de băuturi",
    "banner mesh magazin de băuturi",
    "mesh magazin de bauturi",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru magazin de băuturi, cu sticle generice fără etichete și fără mărci. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „MAGAZIN DE BĂUTURI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-078",
  "slug": "mesh-pet-shop-telefon-personalizat",
  "title": "Mesh pet shop cu numărul tău",
  "description": "Model mesh microperforat pentru pet shop, cu hrană și accesorii pentru câini și pisici. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-pet-shop-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-pet-shop-telefon-personalizat.webp"
  ],
  "category": "Magazine și comerț local",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh pet shop",
    "mesh publicitar pet shop",
    "mesh personalizat pet shop",
    "banner mesh pet shop",
    "mesh pet shop",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru pet shop, cu hrană și accesorii pentru câini și pisici. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „PET SHOP” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-079",
  "slug": "mesh-magazin-de-furaje-telefon-personalizat",
  "title": "Mesh magazin de furaje cu numărul tău",
  "description": "Model mesh microperforat pentru magazin de furaje, cu saci fără etichete și boabe de cereale. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-magazin-de-furaje-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-magazin-de-furaje-telefon-personalizat.webp"
  ],
  "category": "Magazine și comerț local",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh magazin de furaje",
    "mesh publicitar magazin de furaje",
    "mesh personalizat magazin de furaje",
    "banner mesh magazin de furaje",
    "mesh magazin de furaje",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru magazin de furaje, cu saci fără etichete și boabe de cereale. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „MAGAZIN DE FURAJE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-080",
  "slug": "mesh-haine-second-hand-telefon-personalizat",
  "title": "Mesh haine second hand cu numărul tău",
  "description": "Model mesh microperforat pentru haine second hand, cu haine ordonate pe umerașe. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-haine-second-hand-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-haine-second-hand-telefon-personalizat.webp"
  ],
  "category": "Magazine și comerț local",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh haine second hand",
    "mesh publicitar haine second hand",
    "mesh personalizat haine second hand",
    "banner mesh haine second hand",
    "mesh haine second hand",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru haine second hand, cu haine ordonate pe umerașe. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „HAINE SECOND HAND” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-081",
  "slug": "mesh-legume-de-vanzare-telefon-personalizat",
  "title": "Mesh legume de vânzare cu numărul tău",
  "description": "Model mesh microperforat pentru legume de vânzare, cu roșii ardei și legume proaspete. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-legume-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-legume-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Agricultură și produse locale",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh legume de vânzare",
    "mesh publicitar legume de vânzare",
    "mesh personalizat legume de vânzare",
    "banner mesh legume de vânzare",
    "mesh legume de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru legume de vânzare, cu roșii ardei și legume proaspete. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „LEGUME DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-082",
  "slug": "mesh-fructe-de-vanzare-telefon-personalizat",
  "title": "Mesh fructe de vânzare cu numărul tău",
  "description": "Model mesh microperforat pentru fructe de vânzare, cu mere pere și fructe proaspete. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-fructe-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-fructe-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Agricultură și produse locale",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh fructe de vânzare",
    "mesh publicitar fructe de vânzare",
    "mesh personalizat fructe de vânzare",
    "banner mesh fructe de vânzare",
    "mesh fructe de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru fructe de vânzare, cu mere pere și fructe proaspete. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „FRUCTE DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-083",
  "slug": "mesh-miere-de-vanzare-telefon-personalizat",
  "title": "Mesh miere de vânzare cu numărul tău",
  "description": "Model mesh microperforat pentru miere de vânzare, cu borcan de miere și fagure. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-miere-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-miere-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Agricultură și produse locale",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh miere de vânzare",
    "mesh publicitar miere de vânzare",
    "mesh personalizat miere de vânzare",
    "banner mesh miere de vânzare",
    "mesh miere de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru miere de vânzare, cu borcan de miere și fagure. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „MIERE DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-084",
  "slug": "mesh-oua-de-tara-telefon-personalizat",
  "title": "Mesh ouă de țară cu numărul tău",
  "description": "Model mesh microperforat pentru ouă de țară, cu ouă în cofraj rustic. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-oua-de-tara-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-oua-de-tara-telefon-personalizat.webp"
  ],
  "category": "Agricultură și produse locale",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh ouă de țară",
    "mesh publicitar ouă de țară",
    "mesh personalizat ouă de țară",
    "banner mesh ouă de țară",
    "mesh oua de tara",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru ouă de țară, cu ouă în cofraj rustic. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „OUĂ DE ȚARĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-085",
  "slug": "mesh-branza-de-vanzare-telefon-personalizat",
  "title": "Mesh brânză de vânzare cu numărul tău",
  "description": "Model mesh microperforat pentru brânză de vânzare, cu brânză și platou rustic. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-branza-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-branza-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Agricultură și produse locale",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh brânză de vânzare",
    "mesh publicitar brânză de vânzare",
    "mesh personalizat brânză de vânzare",
    "banner mesh brânză de vânzare",
    "mesh branza de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru brânză de vânzare, cu brânză și platou rustic. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „BRÂNZĂ DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-086",
  "slug": "mesh-lemn-de-foc-telefon-personalizat",
  "title": "Mesh lemn de foc cu numărul tău",
  "description": "Model mesh microperforat pentru lemn de foc, cu lemne de foc stivuite. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-lemn-de-foc-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-lemn-de-foc-telefon-personalizat.webp"
  ],
  "category": "Agricultură și produse locale",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh lemn de foc",
    "mesh publicitar lemn de foc",
    "mesh personalizat lemn de foc",
    "banner mesh lemn de foc",
    "mesh lemn de foc",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru lemn de foc, cu lemne de foc stivuite. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „LEMN DE FOC” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-087",
  "slug": "mesh-fan-de-vanzare-telefon-personalizat",
  "title": "Mesh fân de vânzare cu numărul tău",
  "description": "Model mesh microperforat pentru fân de vânzare, cu baloți de fân. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-fan-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-fan-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Agricultură și produse locale",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh fân de vânzare",
    "mesh publicitar fân de vânzare",
    "mesh personalizat fân de vânzare",
    "banner mesh fân de vânzare",
    "mesh fan de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru fân de vânzare, cu baloți de fân. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „FÂN DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-088",
  "slug": "mesh-rasaduri-de-vanzare-telefon-personalizat",
  "title": "Mesh răsaduri de vânzare cu numărul tău",
  "description": "Model mesh microperforat pentru răsaduri de vânzare, cu răsaduri în ghivece. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-rasaduri-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-rasaduri-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Agricultură și produse locale",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh răsaduri de vânzare",
    "mesh publicitar răsaduri de vânzare",
    "mesh personalizat răsaduri de vânzare",
    "banner mesh răsaduri de vânzare",
    "mesh rasaduri de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru răsaduri de vânzare, cu răsaduri în ghivece. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „RĂSADURI DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-089",
  "slug": "mesh-pui-de-gaina-de-vanzare-telefon-personalizat",
  "title": "Mesh pui de găină de vânzare cu numărul tău",
  "description": "Model mesh microperforat pentru pui de găină de vânzare, cu pui de găină în gospodărie. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-pui-de-gaina-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-pui-de-gaina-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Agricultură și produse locale",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh pui de găină de vânzare",
    "mesh publicitar pui de găină de vânzare",
    "mesh personalizat pui de găină de vânzare",
    "banner mesh pui de găină de vânzare",
    "mesh pui de gaina de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru pui de găină de vânzare, cu pui de găină în gospodărie. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „PUI DE GĂINĂ DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-090",
  "slug": "mesh-servicii-agricole-telefon-personalizat",
  "title": "Mesh servicii agricole cu numărul tău",
  "description": "Model mesh microperforat pentru servicii agricole, cu tractor pe câmp. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-servicii-agricole-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-servicii-agricole-telefon-personalizat.webp"
  ],
  "category": "Agricultură și produse locale",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh servicii agricole",
    "mesh publicitar servicii agricole",
    "mesh personalizat servicii agricole",
    "banner mesh servicii agricole",
    "mesh servicii agricole",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru servicii agricole, cu tractor pe câmp. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „SERVICII AGRICOLE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-091",
  "slug": "mesh-foto-si-video-evenimente-telefon-personalizat",
  "title": "Mesh foto și video evenimente cu numărul tău",
  "description": "Model mesh microperforat pentru foto și video evenimente, cu aparat foto și cameră video. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-foto-si-video-evenimente-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-foto-si-video-evenimente-telefon-personalizat.webp"
  ],
  "category": "Servicii",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh foto și video evenimente",
    "mesh publicitar foto și video evenimente",
    "mesh personalizat foto și video evenimente",
    "banner mesh foto și video evenimente",
    "mesh foto si video evenimente",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru foto și video evenimente, cu aparat foto și cameră video. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „FOTO ȘI VIDEO EVENIMENTE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-092",
  "slug": "mesh-inchirieri-sonorizare-telefon-personalizat",
  "title": "Mesh închirieri sonorizare cu numărul tău",
  "description": "Model mesh microperforat pentru închirieri sonorizare, cu boxe și mixer audio. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-inchirieri-sonorizare-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-inchirieri-sonorizare-telefon-personalizat.webp"
  ],
  "category": "Servicii",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh închirieri sonorizare",
    "mesh publicitar închirieri sonorizare",
    "mesh personalizat închirieri sonorizare",
    "banner mesh închirieri sonorizare",
    "mesh inchirieri sonorizare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru închirieri sonorizare, cu boxe și mixer audio. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „ÎNCHIRIERI SONORIZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-093",
  "slug": "mesh-decoratiuni-evenimente-telefon-personalizat",
  "title": "Mesh decorațiuni evenimente cu numărul tău",
  "description": "Model mesh microperforat pentru decorațiuni evenimente, cu aranjament floral și decor de eveniment. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-decoratiuni-evenimente-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-decoratiuni-evenimente-telefon-personalizat.webp"
  ],
  "category": "Servicii",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh decorațiuni evenimente",
    "mesh publicitar decorațiuni evenimente",
    "mesh personalizat decorațiuni evenimente",
    "banner mesh decorațiuni evenimente",
    "mesh decoratiuni evenimente",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru decorațiuni evenimente, cu aranjament floral și decor de eveniment. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „DECORAȚIUNI EVENIMENTE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-094",
  "slug": "mesh-florarie-telefon-personalizat",
  "title": "Mesh florărie cu numărul tău",
  "description": "Model mesh microperforat pentru florărie, cu buchet de flori. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-florarie-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-florarie-telefon-personalizat.webp"
  ],
  "category": "Servicii",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh florărie",
    "mesh publicitar florărie",
    "mesh personalizat florărie",
    "banner mesh florărie",
    "mesh florarie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru florărie, cu buchet de flori. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „FLORĂRIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-095",
  "slug": "mesh-angajam-personal-telefon-personalizat",
  "title": "Mesh angajăm personal cu numărul tău",
  "description": "Model mesh microperforat pentru angajăm personal, cu ilustrație de echipă și simbol de recrutare. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-angajam-personal-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-angajam-personal-telefon-personalizat.webp"
  ],
  "category": "Servicii",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh angajăm personal",
    "mesh publicitar angajăm personal",
    "mesh personalizat angajăm personal",
    "banner mesh angajăm personal",
    "mesh angajam personal",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru angajăm personal, cu ilustrație de echipă și simbol de recrutare. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „ANGAJĂM PERSONAL” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-096",
  "slug": "mesh-sala-fitness-telefon-personalizat",
  "title": "Mesh sală fitness cu numărul tău",
  "description": "Model mesh microperforat pentru sală fitness, cu gantere și aparate de fitness. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-sala-fitness-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-sala-fitness-telefon-personalizat.webp"
  ],
  "category": "Educație și sport",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh sală fitness",
    "mesh publicitar sală fitness",
    "mesh personalizat sală fitness",
    "banner mesh sală fitness",
    "mesh sala fitness",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru sală fitness, cu gantere și aparate de fitness. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „SALĂ FITNESS” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-097",
  "slug": "mesh-cursuri-de-dans-telefon-personalizat",
  "title": "Mesh cursuri de dans cu numărul tău",
  "description": "Model mesh microperforat pentru cursuri de dans, cu pantofi de dans și studio luminos. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-cursuri-de-dans-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-cursuri-de-dans-telefon-personalizat.webp"
  ],
  "category": "Educație și sport",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh cursuri de dans",
    "mesh publicitar cursuri de dans",
    "mesh personalizat cursuri de dans",
    "banner mesh cursuri de dans",
    "mesh cursuri de dans",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru cursuri de dans, cu pantofi de dans și studio luminos. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „CURSURI DE DANS” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-098",
  "slug": "mesh-cursuri-de-inot-telefon-personalizat",
  "title": "Mesh cursuri de înot cu numărul tău",
  "description": "Model mesh microperforat pentru cursuri de înot, cu bazin și ochelari de înot. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-cursuri-de-inot-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-cursuri-de-inot-telefon-personalizat.webp"
  ],
  "category": "Educație și sport",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh cursuri de înot",
    "mesh publicitar cursuri de înot",
    "mesh personalizat cursuri de înot",
    "banner mesh cursuri de înot",
    "mesh cursuri de inot",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru cursuri de înot, cu bazin și ochelari de înot. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „CURSURI DE ÎNOT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-099",
  "slug": "mesh-yoga-si-pilates-telefon-personalizat",
  "title": "Mesh yoga și pilates cu numărul tău",
  "description": "Model mesh microperforat pentru yoga și pilates, cu saltele și accesorii pentru exerciții. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-yoga-si-pilates-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-yoga-si-pilates-telefon-personalizat.webp"
  ],
  "category": "Educație și sport",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh yoga și pilates",
    "mesh publicitar yoga și pilates",
    "mesh personalizat yoga și pilates",
    "banner mesh yoga și pilates",
    "mesh yoga si pilates",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru yoga și pilates, cu saltele și accesorii pentru exerciții. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „YOGA ȘI PILATES” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "mesh100-100",
  "slug": "mesh-arte-martiale-telefon-personalizat",
  "title": "Mesh arte marțiale cu numărul tău",
  "description": "Model mesh microperforat pentru arte marțiale, cu mănuși de antrenament și tatami. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea și cantitatea pentru mesh microperforat înainte de comandă.",
  "image": "/products/mesh-100/mesh-arte-martiale-telefon-personalizat.webp",
  "images": [
    "/products/mesh-100/mesh-arte-martiale-telefon-personalizat.webp"
  ],
  "category": "Educație și sport",
  "material": "mesh",
  "productKind": "mesh",
  "tags": [
    "banner",
    "telefon personalizat",
    "mesh arte marțiale",
    "mesh publicitar arte marțiale",
    "mesh personalizat arte marțiale",
    "banner mesh arte marțiale",
    "mesh arte martiale",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model mesh microperforat pentru arte marțiale, cu mănuși de antrenament și tatami. Titlul identifică activitatea, iar banda de contact arată unde imprimăm telefonul tău.</p><p>Fotografia prezintă un model cu mesajul „ARTE MARȚIALE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Modelul este imprimat pe mesh microperforat, cu tiv și capse. Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Materialul inițial este mesh microperforat. Selectezi cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},

{
  "id": "banner-industry100-001",
  "slug": "cabinet-stomatologic-telefon-personalizat",
  "title": "Banner cabinet stomatologic cu numărul tău",
  "description": "Model pentru cabinet stomatologic, cu instrumente stomatologice și scaun dentar. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/cabinet-stomatologic-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/cabinet-stomatologic-telefon-personalizat.webp"
  ],
  "category": "Sănătate și servicii veterinare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner cabinet stomatologic",
    "banner publicitar cabinet stomatologic",
    "banner personalizat cabinet stomatologic",
    "banner cabinet stomatologic",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru cabinet stomatologic, cu instrumente stomatologice și scaun dentar. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „CABINET STOMATOLOGIC” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 200 × 50, 300 × 75, 400 × 100, 500 × 125, 600 × 150, 800 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 4:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-002",
  "slug": "cabinet-veterinar-telefon-personalizat",
  "title": "Banner cabinet veterinar cu numărul tău",
  "description": "Model pentru cabinet veterinar, cu câine și pisică într-un cabinet luminos. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/cabinet-veterinar-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/cabinet-veterinar-telefon-personalizat.webp"
  ],
  "category": "Sănătate și servicii veterinare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner cabinet veterinar",
    "banner publicitar cabinet veterinar",
    "banner personalizat cabinet veterinar",
    "banner cabinet veterinar",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru cabinet veterinar, cu câine și pisică într-un cabinet luminos. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „CABINET VETERINAR” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-003",
  "slug": "optica-medicala-telefon-personalizat",
  "title": "Banner optică medicală cu numărul tău",
  "description": "Model pentru optică medicală, cu ochelari de vedere și lentile. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/optica-medicala-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/optica-medicala-telefon-personalizat.webp"
  ],
  "category": "Sănătate și servicii veterinare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner optică medicală",
    "banner publicitar optică medicală",
    "banner personalizat optică medicală",
    "banner optica medicala",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru optică medicală, cu ochelari de vedere și lentile. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „OPTICĂ MEDICALĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 200 × 50, 300 × 75, 400 × 100, 500 × 125, 600 × 150, 800 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 4:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-004",
  "slug": "farmacie-veterinara-telefon-personalizat",
  "title": "Banner farmacie veterinară cu numărul tău",
  "description": "Model pentru farmacie veterinară, cu produse de îngrijire pentru animale fără etichete. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/farmacie-veterinara-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/farmacie-veterinara-telefon-personalizat.webp"
  ],
  "category": "Sănătate și servicii veterinare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner farmacie veterinară",
    "banner publicitar farmacie veterinară",
    "banner personalizat farmacie veterinară",
    "banner farmacie veterinara",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru farmacie veterinară, cu produse de îngrijire pentru animale fără etichete. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „FARMACIE VETERINARĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-005",
  "slug": "fizioterapie-telefon-personalizat",
  "title": "Banner fizioterapie cu numărul tău",
  "description": "Model pentru fizioterapie, cu pat de fizioterapie și echipament de recuperare. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/fizioterapie-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/fizioterapie-telefon-personalizat.webp"
  ],
  "category": "Sănătate și servicii veterinare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner fizioterapie",
    "banner publicitar fizioterapie",
    "banner personalizat fizioterapie",
    "banner fizioterapie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru fizioterapie, cu pat de fizioterapie și echipament de recuperare. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „FIZIOTERAPIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 200 × 50, 300 × 75, 400 × 100, 500 × 125, 600 × 150, 800 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 4:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-006",
  "slug": "kinetoterapie-telefon-personalizat",
  "title": "Banner kinetoterapie cu numărul tău",
  "description": "Model pentru kinetoterapie, cu minge de recuperare și benzi elastice. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/kinetoterapie-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/kinetoterapie-telefon-personalizat.webp"
  ],
  "category": "Sănătate și servicii veterinare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner kinetoterapie",
    "banner publicitar kinetoterapie",
    "banner personalizat kinetoterapie",
    "banner kinetoterapie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru kinetoterapie, cu minge de recuperare și benzi elastice. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „KINETOTERAPIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-007",
  "slug": "cabinet-psihologic-telefon-personalizat",
  "title": "Banner cabinet psihologic cu numărul tău",
  "description": "Model pentru cabinet psihologic, cu două fotolii într-un cabinet primitor. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/cabinet-psihologic-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/cabinet-psihologic-telefon-personalizat.webp"
  ],
  "category": "Sănătate și servicii veterinare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner cabinet psihologic",
    "banner publicitar cabinet psihologic",
    "banner personalizat cabinet psihologic",
    "banner cabinet psihologic",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru cabinet psihologic, cu două fotolii într-un cabinet primitor. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „CABINET PSIHOLOGIC” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-008",
  "slug": "laborator-de-analize-telefon-personalizat",
  "title": "Banner laborator de analize cu numărul tău",
  "description": "Model pentru laborator de analize, cu eprubete în stativ și microscop. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/laborator-de-analize-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/laborator-de-analize-telefon-personalizat.webp"
  ],
  "category": "Sănătate și servicii veterinare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner laborator de analize",
    "banner publicitar laborator de analize",
    "banner personalizat laborator de analize",
    "banner laborator de analize",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru laborator de analize, cu eprubete în stativ și microscop. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „LABORATOR DE ANALIZE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-009",
  "slug": "consultatii-medicale-telefon-personalizat",
  "title": "Banner consultații medicale cu numărul tău",
  "description": "Model pentru consultații medicale, cu stetoscop și cabinet luminos. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/consultatii-medicale-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/consultatii-medicale-telefon-personalizat.webp"
  ],
  "category": "Sănătate și servicii veterinare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner consultații medicale",
    "banner publicitar consultații medicale",
    "banner personalizat consultații medicale",
    "banner consultatii medicale",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru consultații medicale, cu stetoscop și cabinet luminos. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „CONSULTAȚII MEDICALE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 200 × 50, 300 × 75, 400 × 100, 500 × 125, 600 × 150, 800 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 4:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-010",
  "slug": "tehnica-dentara-telefon-personalizat",
  "title": "Banner tehnică dentară cu numărul tău",
  "description": "Model pentru tehnică dentară, cu model dentar și unelte de laborator. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/tehnica-dentara-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/tehnica-dentara-telefon-personalizat.webp"
  ],
  "category": "Sănătate și servicii veterinare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner tehnică dentară",
    "banner publicitar tehnică dentară",
    "banner personalizat tehnică dentară",
    "banner tehnica dentara",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru tehnică dentară, cu model dentar și unelte de laborator. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „TEHNICĂ DENTARĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-011",
  "slug": "panouri-fotovoltaice-telefon-personalizat",
  "title": "Banner panouri fotovoltaice cu numărul tău",
  "description": "Model pentru panouri fotovoltaice, cu acoperiș cu panouri fotovoltaice. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/panouri-fotovoltaice-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/panouri-fotovoltaice-telefon-personalizat.webp"
  ],
  "category": "Energie și construcții specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner panouri fotovoltaice",
    "banner publicitar panouri fotovoltaice",
    "banner personalizat panouri fotovoltaice",
    "telefon personalizat",
    "banner fotovoltaice",
    "banner energie solară"
  ],
  "longDescription": "<p>Model pentru panouri fotovoltaice, cu acoperiș cu panouri fotovoltaice. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „PANOURI FOTOVOLTAICE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 200 × 50, 300 × 75, 400 × 100, 500 × 125, 600 × 150, 800 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 4:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-012",
  "slug": "pompe-de-caldura-telefon-personalizat",
  "title": "Banner pompe de căldură cu numărul tău",
  "description": "Model pentru pompe de căldură, cu unitate exterioară de pompă de căldură. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/pompe-de-caldura-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/pompe-de-caldura-telefon-personalizat.webp"
  ],
  "category": "Energie și construcții specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner pompe de căldură",
    "banner publicitar pompe de căldură",
    "banner personalizat pompe de căldură",
    "banner pompe de caldura",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru pompe de căldură, cu unitate exterioară de pompă de căldură. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „POMPE DE CĂLDURĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-013",
  "slug": "termoizolatii-fatade-telefon-personalizat",
  "title": "Banner termoizolații fațade cu numărul tău",
  "description": "Model pentru termoizolații fațade, cu fațadă izolată și panouri izolante. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/termoizolatii-fatade-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/termoizolatii-fatade-telefon-personalizat.webp"
  ],
  "category": "Energie și construcții specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner termoizolații fațade",
    "banner publicitar termoizolații fațade",
    "banner personalizat termoizolații fațade",
    "banner termoizolatii fatade",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru termoizolații fațade, cu fațadă izolată și panouri izolante. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „TERMOIZOLAȚII FAȚADE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 200 × 50, 300 × 75, 400 × 100, 500 × 125, 600 × 150, 800 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 4:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-014",
  "slug": "hidroizolatii-telefon-personalizat",
  "title": "Banner hidroizolații cu numărul tău",
  "description": "Model pentru hidroizolații, cu membrană de hidroizolație și acoperiș plat. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/hidroizolatii-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/hidroizolatii-telefon-personalizat.webp"
  ],
  "category": "Energie și construcții specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner hidroizolații",
    "banner publicitar hidroizolații",
    "banner personalizat hidroizolații",
    "banner hidroizolatii",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru hidroizolații, cu membrană de hidroizolație și acoperiș plat. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „HIDROIZOLAȚII” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-015",
  "slug": "montaj-acoperisuri-telefon-personalizat",
  "title": "Banner montaj acoperișuri cu numărul tău",
  "description": "Model pentru montaj acoperișuri, cu acoperiș nou din țiglă metalică. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/montaj-acoperisuri-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/montaj-acoperisuri-telefon-personalizat.webp"
  ],
  "category": "Energie și construcții specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner montaj acoperișuri",
    "banner publicitar montaj acoperișuri",
    "banner personalizat montaj acoperișuri",
    "banner montaj acoperisuri",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru montaj acoperișuri, cu acoperiș nou din țiglă metalică. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „MONTAJ ACOPERIȘURI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-016",
  "slug": "foraje-puturi-telefon-personalizat",
  "title": "Banner foraje puțuri cu numărul tău",
  "description": "Model pentru foraje puțuri, cu utilaj pentru foraje de apă. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/foraje-puturi-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/foraje-puturi-telefon-personalizat.webp"
  ],
  "category": "Energie și construcții specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner foraje puțuri",
    "banner publicitar foraje puțuri",
    "banner personalizat foraje puțuri",
    "banner foraje puturi",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru foraje puțuri, cu utilaj pentru foraje de apă. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „FORAJE PUȚURI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-017",
  "slug": "beton-amprentat-telefon-personalizat",
  "title": "Banner beton amprentat cu numărul tău",
  "description": "Model pentru beton amprentat, cu alee cu beton decorativ amprentat. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/beton-amprentat-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/beton-amprentat-telefon-personalizat.webp"
  ],
  "category": "Energie și construcții specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner beton amprentat",
    "banner publicitar beton amprentat",
    "banner personalizat beton amprentat",
    "banner beton amprentat",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru beton amprentat, cu alee cu beton decorativ amprentat. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „BETON AMPRENTAT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-018",
  "slug": "usi-de-garaj-telefon-personalizat",
  "title": "Banner uși de garaj cu numărul tău",
  "description": "Model pentru uși de garaj, cu ușă secțională de garaj. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/usi-de-garaj-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/usi-de-garaj-telefon-personalizat.webp"
  ],
  "category": "Energie și construcții specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner uși de garaj",
    "banner publicitar uși de garaj",
    "banner personalizat uși de garaj",
    "banner usi de garaj",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru uși de garaj, cu ușă secțională de garaj. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „UȘI DE GARAJ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-019",
  "slug": "rulouri-exterioare-telefon-personalizat",
  "title": "Banner rulouri exterioare cu numărul tău",
  "description": "Model pentru rulouri exterioare, cu fereastră cu rulou exterior. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/rulouri-exterioare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/rulouri-exterioare-telefon-personalizat.webp"
  ],
  "category": "Energie și construcții specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner rulouri exterioare",
    "banner publicitar rulouri exterioare",
    "banner personalizat rulouri exterioare",
    "banner rulouri exterioare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru rulouri exterioare, cu fereastră cu rulou exterior. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „RULOURI EXTERIOARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-020",
  "slug": "confectii-metalice-telefon-personalizat",
  "title": "Banner confecții metalice cu numărul tău",
  "description": "Model pentru confecții metalice, cu structură metalică și banc de lucru. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/confectii-metalice-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/confectii-metalice-telefon-personalizat.webp"
  ],
  "category": "Energie și construcții specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner confecții metalice",
    "banner publicitar confecții metalice",
    "banner personalizat confecții metalice",
    "banner confectii metalice",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru confecții metalice, cu structură metalică și banc de lucru. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „CONFECȚII METALICE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-021",
  "slug": "statie-itp-telefon-personalizat",
  "title": "Banner stație itp cu numărul tău",
  "description": "Model pentru stație itp, cu automobil pe stand de inspecție. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/statie-itp-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/statie-itp-telefon-personalizat.webp"
  ],
  "category": "Auto și utilaje specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner stație itp",
    "banner publicitar stație itp",
    "banner personalizat stație itp",
    "banner statie itp",
    "telefon personalizat",
    "banner ITP",
    "banner inspecție tehnică"
  ],
  "longDescription": "<p>Model pentru stație itp, cu automobil pe stand de inspecție. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „STAȚIE ITP” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-022",
  "slug": "dezmembrari-auto-telefon-personalizat",
  "title": "Banner dezmembrări auto cu numărul tău",
  "description": "Model pentru dezmembrări auto, cu piese auto curate pe rafturi. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/dezmembrari-auto-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/dezmembrari-auto-telefon-personalizat.webp"
  ],
  "category": "Auto și utilaje specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner dezmembrări auto",
    "banner publicitar dezmembrări auto",
    "banner personalizat dezmembrări auto",
    "banner dezmembrari auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru dezmembrări auto, cu piese auto curate pe rafturi. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „DEZMEMBRĂRI AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-023",
  "slug": "geometrie-roti-telefon-personalizat",
  "title": "Banner geometrie roți cu numărul tău",
  "description": "Model pentru geometrie roți, cu roată auto și aparat de geometrie. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/geometrie-roti-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/geometrie-roti-telefon-personalizat.webp"
  ],
  "category": "Auto și utilaje specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner geometrie roți",
    "banner publicitar geometrie roți",
    "banner personalizat geometrie roți",
    "banner geometrie roti",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru geometrie roți, cu roată auto și aparat de geometrie. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „GEOMETRIE ROȚI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-024",
  "slug": "incarcare-freon-auto-telefon-personalizat",
  "title": "Banner încărcare freon auto cu numărul tău",
  "description": "Model pentru încărcare freon auto, cu aparat de service climatizare auto. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/incarcare-freon-auto-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/incarcare-freon-auto-telefon-personalizat.webp"
  ],
  "category": "Auto și utilaje specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner încărcare freon auto",
    "banner publicitar încărcare freon auto",
    "banner personalizat încărcare freon auto",
    "banner incarcare freon auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru încărcare freon auto, cu aparat de service climatizare auto. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „ÎNCĂRCARE FREON AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-025",
  "slug": "reparatii-cutii-de-viteze-telefon-personalizat",
  "title": "Banner reparații cutii de viteze cu numărul tău",
  "description": "Model pentru reparații cutii de viteze, cu cutie de viteze și unelte de atelier. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/reparatii-cutii-de-viteze-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/reparatii-cutii-de-viteze-telefon-personalizat.webp"
  ],
  "category": "Auto și utilaje specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner reparații cutii de viteze",
    "banner publicitar reparații cutii de viteze",
    "banner personalizat reparații cutii de viteze",
    "banner reparatii cutii de viteze",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru reparații cutii de viteze, cu cutie de viteze și unelte de atelier. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „REPARAȚII CUTII DE VITEZE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-026",
  "slug": "service-camioane-telefon-personalizat",
  "title": "Banner service camioane cu numărul tău",
  "description": "Model pentru service camioane, cu camion într-un atelier. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/service-camioane-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/service-camioane-telefon-personalizat.webp"
  ],
  "category": "Auto și utilaje specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner service camioane",
    "banner publicitar service camioane",
    "banner personalizat service camioane",
    "telefon personalizat",
    "banner service camion",
    "banner atelier camioane"
  ],
  "longDescription": "<p>Model pentru service camioane, cu camion într-un atelier. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „SERVICE CAMIOANE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-027",
  "slug": "service-tractoare-telefon-personalizat",
  "title": "Banner service tractoare cu numărul tău",
  "description": "Model pentru service tractoare, cu tractor și unelte de service. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/service-tractoare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/service-tractoare-telefon-personalizat.webp"
  ],
  "category": "Auto și utilaje specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner service tractoare",
    "banner publicitar service tractoare",
    "banner personalizat service tractoare",
    "banner service tractoare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru service tractoare, cu tractor și unelte de service. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „SERVICE TRACTOARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-028",
  "slug": "anvelope-second-hand-telefon-personalizat",
  "title": "Banner anvelope second hand cu numărul tău",
  "description": "Model pentru anvelope second hand, cu anvelope și jante fără marcă. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/anvelope-second-hand-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/anvelope-second-hand-telefon-personalizat.webp"
  ],
  "category": "Auto și utilaje specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner anvelope second hand",
    "banner publicitar anvelope second hand",
    "banner personalizat anvelope second hand",
    "banner anvelope second hand",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru anvelope second hand, cu anvelope și jante fără marcă. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „ANVELOPE SECOND HAND” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-029",
  "slug": "polish-faruri-telefon-personalizat",
  "title": "Banner polish faruri cu numărul tău",
  "description": "Model pentru polish faruri, cu far auto curat și echipament de polish. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/polish-faruri-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/polish-faruri-telefon-personalizat.webp"
  ],
  "category": "Auto și utilaje specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner polish faruri",
    "banner publicitar polish faruri",
    "banner personalizat polish faruri",
    "banner polish faruri",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru polish faruri, cu far auto curat și echipament de polish. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „POLISH FARURI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-030",
  "slug": "spalatorie-self-service-telefon-personalizat",
  "title": "Banner spălătorie self service cu numărul tău",
  "description": "Model pentru spălătorie self service, cu boxă de spălare auto cu lance de presiune. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/spalatorie-self-service-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/spalatorie-self-service-telefon-personalizat.webp"
  ],
  "category": "Auto și utilaje specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner spălătorie self service",
    "banner publicitar spălătorie self service",
    "banner personalizat spălătorie self service",
    "banner spalatorie self service",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru spălătorie self service, cu boxă de spălare auto cu lance de presiune. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „SPĂLĂTORIE SELF SERVICE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-031",
  "slug": "sala-fitness-telefon-personalizat",
  "title": "Banner sală fitness cu numărul tău",
  "description": "Model pentru sală fitness, cu gantere și aparate de fitness. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/sala-fitness-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/sala-fitness-telefon-personalizat.webp"
  ],
  "category": "Educație și sport",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner sală fitness",
    "banner publicitar sală fitness",
    "banner personalizat sală fitness",
    "banner sala fitness",
    "telefon personalizat",
    "banner sală sport"
  ],
  "longDescription": "<p>Model pentru sală fitness, cu gantere și aparate de fitness. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „SALĂ FITNESS” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-032",
  "slug": "cursuri-de-dans-telefon-personalizat",
  "title": "Banner cursuri de dans cu numărul tău",
  "description": "Model pentru cursuri de dans, cu pantofi de dans și studio luminos. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/cursuri-de-dans-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/cursuri-de-dans-telefon-personalizat.webp"
  ],
  "category": "Educație și sport",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner cursuri de dans",
    "banner publicitar cursuri de dans",
    "banner personalizat cursuri de dans",
    "banner cursuri de dans",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru cursuri de dans, cu pantofi de dans și studio luminos. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „CURSURI DE DANS” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-033",
  "slug": "cursuri-de-engleza-telefon-personalizat",
  "title": "Banner cursuri de engleză cu numărul tău",
  "description": "Model pentru cursuri de engleză, cu cărți și caiet deschis fără text lizibil. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/cursuri-de-engleza-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/cursuri-de-engleza-telefon-personalizat.webp"
  ],
  "category": "Educație și sport",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner cursuri de engleză",
    "banner publicitar cursuri de engleză",
    "banner personalizat cursuri de engleză",
    "banner cursuri de engleza",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru cursuri de engleză, cu cărți și caiet deschis fără text lizibil. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „CURSURI DE ENGLEZĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-034",
  "slug": "meditatii-matematica-telefon-personalizat",
  "title": "Banner meditații matematică cu numărul tău",
  "description": "Model pentru meditații matematică, cu caiet calculator și instrumente de geometrie. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/meditatii-matematica-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/meditatii-matematica-telefon-personalizat.webp"
  ],
  "category": "Educație și sport",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner meditații matematică",
    "banner publicitar meditații matematică",
    "banner personalizat meditații matematică",
    "banner meditatii matematica",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru meditații matematică, cu caiet calculator și instrumente de geometrie. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „MEDITAȚII MATEMATICĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-035",
  "slug": "after-school-telefon-personalizat",
  "title": "Banner after school cu numărul tău",
  "description": "Model pentru after school, cu birou pentru copii cu creioane colorate. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/after-school-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/after-school-telefon-personalizat.webp"
  ],
  "category": "Educație și sport",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner after school",
    "banner publicitar after school",
    "banner personalizat after school",
    "telefon personalizat",
    "banner afterschool"
  ],
  "longDescription": "<p>Model pentru after school, cu birou pentru copii cu creioane colorate. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „AFTER SCHOOL” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-036",
  "slug": "gradinita-privata-telefon-personalizat",
  "title": "Banner grădiniță privată cu numărul tău",
  "description": "Model pentru grădiniță privată, cu sală colorată cu jucării educative. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/gradinita-privata-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/gradinita-privata-telefon-personalizat.webp"
  ],
  "category": "Educație și sport",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner grădiniță privată",
    "banner publicitar grădiniță privată",
    "banner personalizat grădiniță privată",
    "banner gradinita privata",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru grădiniță privată, cu sală colorată cu jucării educative. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „GRĂDINIȚĂ PRIVATĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-037",
  "slug": "cursuri-de-inot-telefon-personalizat",
  "title": "Banner cursuri de înot cu numărul tău",
  "description": "Model pentru cursuri de înot, cu bazin și ochelari de înot. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/cursuri-de-inot-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/cursuri-de-inot-telefon-personalizat.webp"
  ],
  "category": "Educație și sport",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner cursuri de înot",
    "banner publicitar cursuri de înot",
    "banner personalizat cursuri de înot",
    "banner cursuri de inot",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru cursuri de înot, cu bazin și ochelari de înot. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „CURSURI DE ÎNOT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-038",
  "slug": "antrenor-personal-telefon-personalizat",
  "title": "Banner antrenor personal cu numărul tău",
  "description": "Model pentru antrenor personal, cu gantere și echipament de antrenament. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/antrenor-personal-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/antrenor-personal-telefon-personalizat.webp"
  ],
  "category": "Educație și sport",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner antrenor personal",
    "banner publicitar antrenor personal",
    "banner personalizat antrenor personal",
    "banner antrenor personal",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru antrenor personal, cu gantere și echipament de antrenament. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „ANTRENOR PERSONAL” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-039",
  "slug": "yoga-si-pilates-telefon-personalizat",
  "title": "Banner yoga și pilates cu numărul tău",
  "description": "Model pentru yoga și pilates, cu saltele și accesorii pentru exerciții. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/yoga-si-pilates-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/yoga-si-pilates-telefon-personalizat.webp"
  ],
  "category": "Educație și sport",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner yoga și pilates",
    "banner publicitar yoga și pilates",
    "banner personalizat yoga și pilates",
    "banner yoga si pilates",
    "telefon personalizat",
    "banner yoga",
    "banner pilates"
  ],
  "longDescription": "<p>Model pentru yoga și pilates, cu saltele și accesorii pentru exerciții. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „YOGA ȘI PILATES” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-040",
  "slug": "arte-martiale-telefon-personalizat",
  "title": "Banner arte marțiale cu numărul tău",
  "description": "Model pentru arte marțiale, cu mănuși de antrenament și tatami. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/arte-martiale-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/arte-martiale-telefon-personalizat.webp"
  ],
  "category": "Educație și sport",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner arte marțiale",
    "banner publicitar arte marțiale",
    "banner personalizat arte marțiale",
    "banner arte martiale",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru arte marțiale, cu mănuși de antrenament și tatami. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „ARTE MARȚIALE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-041",
  "slug": "dezinsectie-telefon-personalizat",
  "title": "Banner dezinsecție cu numărul tău",
  "description": "Model pentru dezinsecție, cu echipament de pulverizare și protecție. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/dezinsectie-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/dezinsectie-telefon-personalizat.webp"
  ],
  "category": "Igienă și intervenții pentru casă",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner dezinsecție",
    "banner publicitar dezinsecție",
    "banner personalizat dezinsecție",
    "banner dezinsectie",
    "telefon personalizat",
    "banner DDD"
  ],
  "longDescription": "<p>Model pentru dezinsecție, cu echipament de pulverizare și protecție. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „DEZINSECȚIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-042",
  "slug": "deratizare-telefon-personalizat",
  "title": "Banner deratizare cu numărul tău",
  "description": "Model pentru deratizare, cu stație închisă de monitorizare pentru rozătoare. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/deratizare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/deratizare-telefon-personalizat.webp"
  ],
  "category": "Igienă și intervenții pentru casă",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner deratizare",
    "banner publicitar deratizare",
    "banner personalizat deratizare",
    "telefon personalizat",
    "banner DDD"
  ],
  "longDescription": "<p>Model pentru deratizare, cu stație închisă de monitorizare pentru rozătoare. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „DERATIZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-043",
  "slug": "dezinfectie-telefon-personalizat",
  "title": "Banner dezinfecție cu numărul tău",
  "description": "Model pentru dezinfecție, cu pulverizator și mănuși de protecție. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/dezinfectie-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/dezinfectie-telefon-personalizat.webp"
  ],
  "category": "Igienă și intervenții pentru casă",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner dezinfecție",
    "banner publicitar dezinfecție",
    "banner personalizat dezinfecție",
    "banner dezinfectie",
    "telefon personalizat",
    "banner DDD"
  ],
  "longDescription": "<p>Model pentru dezinfecție, cu pulverizator și mănuși de protecție. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „DEZINFECȚIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-044",
  "slug": "curatatorie-haine-telefon-personalizat",
  "title": "Banner curățătorie haine cu numărul tău",
  "description": "Model pentru curățătorie haine, cu haine curate pe umerașe. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/curatatorie-haine-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/curatatorie-haine-telefon-personalizat.webp"
  ],
  "category": "Igienă și intervenții pentru casă",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner curățătorie haine",
    "banner publicitar curățătorie haine",
    "banner personalizat curățătorie haine",
    "banner curatatorie haine",
    "telefon personalizat",
    "banner curățătorie",
    "banner curățătorie chimică"
  ],
  "longDescription": "<p>Model pentru curățătorie haine, cu haine curate pe umerașe. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „CURĂȚĂTORIE HAINE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-045",
  "slug": "spalatorie-haine-telefon-personalizat",
  "title": "Banner spălătorie haine cu numărul tău",
  "description": "Model pentru spălătorie haine, cu mașini de spălat și coș de rufe. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/spalatorie-haine-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/spalatorie-haine-telefon-personalizat.webp"
  ],
  "category": "Igienă și intervenții pentru casă",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner spălătorie haine",
    "banner publicitar spălătorie haine",
    "banner personalizat spălătorie haine",
    "banner spalatorie haine",
    "telefon personalizat",
    "banner spălătorie rufe"
  ],
  "longDescription": "<p>Model pentru spălătorie haine, cu mașini de spălat și coș de rufe. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „SPĂLĂTORIE HAINE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-046",
  "slug": "curatare-saltele-telefon-personalizat",
  "title": "Banner curățare saltele cu numărul tău",
  "description": "Model pentru curățare saltele, cu saltea și aparat de curățare prin extracție. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/curatare-saltele-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/curatare-saltele-telefon-personalizat.webp"
  ],
  "category": "Igienă și intervenții pentru casă",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner curățare saltele",
    "banner publicitar curățare saltele",
    "banner personalizat curățare saltele",
    "banner curatare saltele",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru curățare saltele, cu saltea și aparat de curățare prin extracție. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „CURĂȚARE SALTELE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-047",
  "slug": "curatare-geamuri-telefon-personalizat",
  "title": "Banner curățare geamuri cu numărul tău",
  "description": "Model pentru curățare geamuri, cu racletă și suprafață de sticlă. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/curatare-geamuri-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/curatare-geamuri-telefon-personalizat.webp"
  ],
  "category": "Igienă și intervenții pentru casă",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner curățare geamuri",
    "banner publicitar curățare geamuri",
    "banner personalizat curățare geamuri",
    "banner curatare geamuri",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru curățare geamuri, cu racletă și suprafață de sticlă. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „CURĂȚARE GEAMURI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-048",
  "slug": "desfundare-canalizare-telefon-personalizat",
  "title": "Banner desfundare canalizare cu numărul tău",
  "description": "Model pentru desfundare canalizare, cu echipament și conducte de canalizare. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/desfundare-canalizare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/desfundare-canalizare-telefon-personalizat.webp"
  ],
  "category": "Igienă și intervenții pentru casă",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner desfundare canalizare",
    "banner publicitar desfundare canalizare",
    "banner personalizat desfundare canalizare",
    "banner desfundare canalizare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru desfundare canalizare, cu echipament și conducte de canalizare. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „DESFUNDARE CANALIZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-049",
  "slug": "vidanjare-telefon-personalizat",
  "title": "Banner vidanjare cu numărul tău",
  "description": "Model pentru vidanjare, cu autospecială de vidanjare. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/vidanjare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/vidanjare-telefon-personalizat.webp"
  ],
  "category": "Igienă și intervenții pentru casă",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner vidanjare",
    "banner publicitar vidanjare",
    "banner personalizat vidanjare",
    "banner vidanjare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru vidanjare, cu autospecială de vidanjare. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „VIDANJARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-050",
  "slug": "coserit-telefon-personalizat",
  "title": "Banner coșerit cu numărul tău",
  "description": "Model pentru coșerit, cu coș de fum și perie de curățare. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/coserit-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/coserit-telefon-personalizat.webp"
  ],
  "category": "Igienă și intervenții pentru casă",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner coșerit",
    "banner publicitar coșerit",
    "banner personalizat coșerit",
    "banner coserit",
    "telefon personalizat",
    "banner coșar",
    "banner curățare coșuri de fum"
  ],
  "longDescription": "<p>Model pentru coșerit, cu coș de fum și perie de curățare. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „COȘERIT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-051",
  "slug": "macelarie-si-carmangerie-telefon-personalizat",
  "title": "Banner măcelărie și carmangerie cu numărul tău",
  "description": "Model pentru măcelărie și carmangerie, cu vitrină cu produse din carne fără scene grafice. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/macelarie-si-carmangerie-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/macelarie-si-carmangerie-telefon-personalizat.webp"
  ],
  "category": "Magazine și comerț local",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner măcelărie și carmangerie",
    "banner publicitar măcelărie și carmangerie",
    "banner personalizat măcelărie și carmangerie",
    "banner macelarie si carmangerie",
    "telefon personalizat",
    "banner măcelărie",
    "banner carmangerie",
    "banner carne"
  ],
  "longDescription": "<p>Model pentru măcelărie și carmangerie, cu vitrină cu produse din carne fără scene grafice. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „MĂCELĂRIE ȘI CARMANGERIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 200 × 50, 300 × 75, 400 × 100, 500 × 125, 600 × 150, 800 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 4:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-052",
  "slug": "pescarie-telefon-personalizat",
  "title": "Banner pescărie cu numărul tău",
  "description": "Model pentru pescărie, cu pește proaspăt pe gheață. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/pescarie-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/pescarie-telefon-personalizat.webp"
  ],
  "category": "Magazine și comerț local",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner pescărie",
    "banner publicitar pescărie",
    "banner personalizat pescărie",
    "banner pescarie",
    "telefon personalizat",
    "banner pește",
    "banner vânzare pește"
  ],
  "longDescription": "<p>Model pentru pescărie, cu pește proaspăt pe gheață. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „PESCĂRIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-053",
  "slug": "magazin-alimentar-telefon-personalizat",
  "title": "Banner magazin alimentar cu numărul tău",
  "description": "Model pentru magazin alimentar, cu rafturi cu produse alimentare fără mărci. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/magazin-alimentar-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/magazin-alimentar-telefon-personalizat.webp"
  ],
  "category": "Magazine și comerț local",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner magazin alimentar",
    "banner publicitar magazin alimentar",
    "banner personalizat magazin alimentar",
    "banner magazin alimentar",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru magazin alimentar, cu rafturi cu produse alimentare fără mărci. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „MAGAZIN ALIMENTAR” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 200 × 50, 300 × 75, 400 × 100, 500 × 125, 600 × 150, 800 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 4:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-054",
  "slug": "magazin-mixt-telefon-personalizat",
  "title": "Banner magazin mixt cu numărul tău",
  "description": "Model pentru magazin mixt, cu rafturi ordonate cu produse de uz zilnic. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/magazin-mixt-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/magazin-mixt-telefon-personalizat.webp"
  ],
  "category": "Magazine și comerț local",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner magazin mixt",
    "banner publicitar magazin mixt",
    "banner personalizat magazin mixt",
    "banner magazin mixt",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru magazin mixt, cu rafturi ordonate cu produse de uz zilnic. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „MAGAZIN MIXT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-055",
  "slug": "aprozar-telefon-personalizat",
  "title": "Banner aprozar cu numărul tău",
  "description": "Model pentru aprozar, cu lăzi cu fructe și legume. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/aprozar-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/aprozar-telefon-personalizat.webp"
  ],
  "category": "Magazine și comerț local",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner aprozar",
    "banner publicitar aprozar",
    "banner personalizat aprozar",
    "banner aprozar",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru aprozar, cu lăzi cu fructe și legume. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „APROZAR” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 200 × 50, 300 × 75, 400 × 100, 500 × 125, 600 × 150, 800 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 4:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-056",
  "slug": "produse-traditionale-telefon-personalizat",
  "title": "Banner produse tradiționale cu numărul tău",
  "description": "Model pentru produse tradiționale, cu coș rustic cu produse locale. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/produse-traditionale-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/produse-traditionale-telefon-personalizat.webp"
  ],
  "category": "Magazine și comerț local",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner produse tradiționale",
    "banner publicitar produse tradiționale",
    "banner personalizat produse tradiționale",
    "banner produse traditionale",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru produse tradiționale, cu coș rustic cu produse locale. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „PRODUSE TRADIȚIONALE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-057",
  "slug": "magazin-de-bauturi-telefon-personalizat",
  "title": "Banner magazin de băuturi cu numărul tău",
  "description": "Model pentru magazin de băuturi, cu sticle generice fără etichete și fără mărci. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/magazin-de-bauturi-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/magazin-de-bauturi-telefon-personalizat.webp"
  ],
  "category": "Magazine și comerț local",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner magazin de băuturi",
    "banner publicitar magazin de băuturi",
    "banner personalizat magazin de băuturi",
    "banner magazin de bauturi",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru magazin de băuturi, cu sticle generice fără etichete și fără mărci. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „MAGAZIN DE BĂUTURI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 200 × 50, 300 × 75, 400 × 100, 500 × 125, 600 × 150, 800 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 4:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-058",
  "slug": "pet-shop-telefon-personalizat",
  "title": "Banner pet shop cu numărul tău",
  "description": "Model pentru pet shop, cu hrană și accesorii pentru câini și pisici. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/pet-shop-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/pet-shop-telefon-personalizat.webp"
  ],
  "category": "Magazine și comerț local",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner pet shop",
    "banner publicitar pet shop",
    "banner personalizat pet shop",
    "banner pet shop",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru pet shop, cu hrană și accesorii pentru câini și pisici. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „PET SHOP” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-059",
  "slug": "magazin-de-furaje-telefon-personalizat",
  "title": "Banner magazin de furaje cu numărul tău",
  "description": "Model pentru magazin de furaje, cu saci fără etichete și boabe de cereale. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/magazin-de-furaje-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/magazin-de-furaje-telefon-personalizat.webp"
  ],
  "category": "Magazine și comerț local",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner magazin de furaje",
    "banner publicitar magazin de furaje",
    "banner personalizat magazin de furaje",
    "banner magazin de furaje",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru magazin de furaje, cu saci fără etichete și boabe de cereale. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „MAGAZIN DE FURAJE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-060",
  "slug": "haine-second-hand-telefon-personalizat",
  "title": "Banner haine second hand cu numărul tău",
  "description": "Model pentru haine second hand, cu haine ordonate pe umerașe. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/haine-second-hand-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/haine-second-hand-telefon-personalizat.webp"
  ],
  "category": "Magazine și comerț local",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner haine second hand",
    "banner publicitar haine second hand",
    "banner personalizat haine second hand",
    "banner haine second hand",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru haine second hand, cu haine ordonate pe umerașe. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „HAINE SECOND HAND” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-061",
  "slug": "shaormerie-telefon-personalizat",
  "title": "Banner shaormerie cu numărul tău",
  "description": "Model pentru shaormerie, cu shaorma și legume proaspete. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/shaormerie-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/shaormerie-telefon-personalizat.webp"
  ],
  "category": "HoReCa și evenimente",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner shaormerie",
    "banner publicitar shaormerie",
    "banner personalizat shaormerie",
    "banner shaormerie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru shaormerie, cu shaorma și legume proaspete. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „SHAORMERIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-062",
  "slug": "gelaterie-telefon-personalizat",
  "title": "Banner gelaterie cu numărul tău",
  "description": "Model pentru gelaterie, cu cupe cu înghețată colorată. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/gelaterie-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/gelaterie-telefon-personalizat.webp"
  ],
  "category": "HoReCa și evenimente",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner gelaterie",
    "banner publicitar gelaterie",
    "banner personalizat gelaterie",
    "banner gelaterie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru gelaterie, cu cupe cu înghețată colorată. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „GELATERIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-063",
  "slug": "gogoserie-telefon-personalizat",
  "title": "Banner gogoșerie cu numărul tău",
  "description": "Model pentru gogoșerie, cu gogoși proaspete. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/gogoserie-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/gogoserie-telefon-personalizat.webp"
  ],
  "category": "HoReCa și evenimente",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner gogoșerie",
    "banner publicitar gogoșerie",
    "banner personalizat gogoșerie",
    "banner gogoserie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru gogoșerie, cu gogoși proaspete. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „GOGOȘERIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-064",
  "slug": "clatitarie-telefon-personalizat",
  "title": "Banner clătitărie cu numărul tău",
  "description": "Model pentru clătitărie, cu clătite cu fructe. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/clatitarie-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/clatitarie-telefon-personalizat.webp"
  ],
  "category": "HoReCa și evenimente",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner clătitărie",
    "banner publicitar clătitărie",
    "banner personalizat clătitărie",
    "banner clatitarie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru clătitărie, cu clătite cu fructe. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „CLĂTITĂRIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-065",
  "slug": "covrigarie-telefon-personalizat",
  "title": "Banner covrigărie cu numărul tău",
  "description": "Model pentru covrigărie, cu covrigi proaspeți. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/covrigarie-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/covrigarie-telefon-personalizat.webp"
  ],
  "category": "HoReCa și evenimente",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner covrigărie",
    "banner publicitar covrigărie",
    "banner personalizat covrigărie",
    "banner covrigarie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru covrigărie, cu covrigi proaspeți. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „COVRIGĂRIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-066",
  "slug": "rulota-street-food-telefon-personalizat",
  "title": "Banner rulotă street food cu numărul tău",
  "description": "Model pentru rulotă street food, cu rulotă gastronomică fără inscripții. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/rulota-street-food-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/rulota-street-food-telefon-personalizat.webp"
  ],
  "category": "HoReCa și evenimente",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner rulotă street food",
    "banner publicitar rulotă street food",
    "banner personalizat rulotă street food",
    "banner rulota street food",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru rulotă street food, cu rulotă gastronomică fără inscripții. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „RULOTĂ STREET FOOD” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-067",
  "slug": "bar-si-terasa-telefon-personalizat",
  "title": "Banner bar și terasă cu numărul tău",
  "description": "Model pentru bar și terasă, cu terasă primitoare cu mese. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/bar-si-terasa-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/bar-si-terasa-telefon-personalizat.webp"
  ],
  "category": "HoReCa și evenimente",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner bar și terasă",
    "banner publicitar bar și terasă",
    "banner personalizat bar și terasă",
    "banner bar si terasa",
    "telefon personalizat",
    "banner bar",
    "banner terasă"
  ],
  "longDescription": "<p>Model pentru bar și terasă, cu terasă primitoare cu mese. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „BAR ȘI TERASĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-068",
  "slug": "sala-de-evenimente-telefon-personalizat",
  "title": "Banner sală de evenimente cu numărul tău",
  "description": "Model pentru sală de evenimente, cu sală elegantă cu mese festive. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/sala-de-evenimente-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/sala-de-evenimente-telefon-personalizat.webp"
  ],
  "category": "HoReCa și evenimente",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner sală de evenimente",
    "banner publicitar sală de evenimente",
    "banner personalizat sală de evenimente",
    "banner sala de evenimente",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru sală de evenimente, cu sală elegantă cu mese festive. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „SALĂ DE EVENIMENTE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-069",
  "slug": "inchirieri-corturi-telefon-personalizat",
  "title": "Banner închirieri corturi cu numărul tău",
  "description": "Model pentru închirieri corturi, cu cort alb pentru evenimente. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/inchirieri-corturi-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/inchirieri-corturi-telefon-personalizat.webp"
  ],
  "category": "HoReCa și evenimente",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner închirieri corturi",
    "banner publicitar închirieri corturi",
    "banner personalizat închirieri corturi",
    "banner inchirieri corturi",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru închirieri corturi, cu cort alb pentru evenimente. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „ÎNCHIRIERI CORTURI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-070",
  "slug": "loc-de-joaca-telefon-personalizat",
  "title": "Banner loc de joacă cu numărul tău",
  "description": "Model pentru loc de joacă, cu tobogan și echipamente de joacă colorate. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/loc-de-joaca-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/loc-de-joaca-telefon-personalizat.webp"
  ],
  "category": "HoReCa și evenimente",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner loc de joacă",
    "banner publicitar loc de joacă",
    "banner personalizat loc de joacă",
    "banner loc de joaca",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru loc de joacă, cu tobogan și echipamente de joacă colorate. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „LOC DE JOACĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-071",
  "slug": "transport-marfa-telefon-personalizat",
  "title": "Banner transport marfă cu numărul tău",
  "description": "Model pentru transport marfă, cu camion și paleți cu cutii. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/transport-marfa-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/transport-marfa-telefon-personalizat.webp"
  ],
  "category": "Afaceri și transport",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner transport marfă",
    "banner publicitar transport marfă",
    "banner personalizat transport marfă",
    "banner transport marfa",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru transport marfă, cu camion și paleți cu cutii. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „TRANSPORT MARFĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-072",
  "slug": "transport-persoane-telefon-personalizat",
  "title": "Banner transport persoane cu numărul tău",
  "description": "Model pentru transport persoane, cu microbuz modern fără marcă. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/transport-persoane-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/transport-persoane-telefon-personalizat.webp"
  ],
  "category": "Afaceri și transport",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner transport persoane",
    "banner publicitar transport persoane",
    "banner personalizat transport persoane",
    "banner transport persoane",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru transport persoane, cu microbuz modern fără marcă. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „TRANSPORT PERSOANE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-073",
  "slug": "curierat-local-telefon-personalizat",
  "title": "Banner curierat local cu numărul tău",
  "description": "Model pentru curierat local, cu dubă și colete. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/curierat-local-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/curierat-local-telefon-personalizat.webp"
  ],
  "category": "Afaceri și transport",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner curierat local",
    "banner publicitar curierat local",
    "banner personalizat curierat local",
    "banner curierat local",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru curierat local, cu dubă și colete. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „CURIERAT LOCAL” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-074",
  "slug": "contabilitate-telefon-personalizat",
  "title": "Banner contabilitate cu numărul tău",
  "description": "Model pentru contabilitate, cu calculator dosare și birou ordonat. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/contabilitate-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/contabilitate-telefon-personalizat.webp"
  ],
  "category": "Afaceri și transport",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner contabilitate",
    "banner publicitar contabilitate",
    "banner personalizat contabilitate",
    "telefon personalizat",
    "banner firmă contabilitate"
  ],
  "longDescription": "<p>Model pentru contabilitate, cu calculator dosare și birou ordonat. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „CONTABILITATE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-075",
  "slug": "broker-asigurari-telefon-personalizat",
  "title": "Banner broker asigurări cu numărul tău",
  "description": "Model pentru broker asigurări, cu mapă și chei de casă și automobil. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/broker-asigurari-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/broker-asigurari-telefon-personalizat.webp"
  ],
  "category": "Afaceri și transport",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner broker asigurări",
    "banner publicitar broker asigurări",
    "banner personalizat broker asigurări",
    "banner broker asigurari",
    "telefon personalizat",
    "banner asigurări",
    "banner RCA"
  ],
  "longDescription": "<p>Model pentru broker asigurări, cu mapă și chei de casă și automobil. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „BROKER ASIGURĂRI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-076",
  "slug": "agentie-de-turism-telefon-personalizat",
  "title": "Banner agenție de turism cu numărul tău",
  "description": "Model pentru agenție de turism, cu valiză și peisaj de vacanță. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/agentie-de-turism-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/agentie-de-turism-telefon-personalizat.webp"
  ],
  "category": "Afaceri și transport",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner agenție de turism",
    "banner publicitar agenție de turism",
    "banner personalizat agenție de turism",
    "banner agentie de turism",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru agenție de turism, cu valiză și peisaj de vacanță. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „AGENȚIE DE TURISM” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-077",
  "slug": "traduceri-autorizate-telefon-personalizat",
  "title": "Banner traduceri autorizate cu numărul tău",
  "description": "Model pentru traduceri autorizate, cu documente fără text lizibil și cărți. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/traduceri-autorizate-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/traduceri-autorizate-telefon-personalizat.webp"
  ],
  "category": "Afaceri și transport",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner traduceri autorizate",
    "banner publicitar traduceri autorizate",
    "banner personalizat traduceri autorizate",
    "telefon personalizat",
    "banner traduceri",
    "banner birou traduceri"
  ],
  "longDescription": "<p>Model pentru traduceri autorizate, cu documente fără text lizibil și cărți. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „TRADUCERI AUTORIZATE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-078",
  "slug": "servicii-funerare-telefon-personalizat",
  "title": "Banner servicii funerare cu numărul tău",
  "description": "Model pentru servicii funerare, cu aranjament floral sobru și lumânare. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/servicii-funerare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/servicii-funerare-telefon-personalizat.webp"
  ],
  "category": "Afaceri și transport",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner servicii funerare",
    "banner publicitar servicii funerare",
    "banner personalizat servicii funerare",
    "banner servicii funerare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru servicii funerare, cu aranjament floral sobru și lumânare. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „SERVICII FUNERARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-079",
  "slug": "reciclare-metale-telefon-personalizat",
  "title": "Banner reciclare metale cu numărul tău",
  "description": "Model pentru reciclare metale, cu metal sortat într-un centru curat. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/reciclare-metale-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/reciclare-metale-telefon-personalizat.webp"
  ],
  "category": "Afaceri și transport",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner reciclare metale",
    "banner publicitar reciclare metale",
    "banner personalizat reciclare metale",
    "banner reciclare metale",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru reciclare metale, cu metal sortat într-un centru curat. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „RECICLARE METALE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-080",
  "slug": "inchirieri-containere-telefon-personalizat",
  "title": "Banner închirieri containere cu numărul tău",
  "description": "Model pentru închirieri containere, cu containere de șantier și depozitare. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/inchirieri-containere-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/inchirieri-containere-telefon-personalizat.webp"
  ],
  "category": "Afaceri și transport",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner închirieri containere",
    "banner publicitar închirieri containere",
    "banner personalizat închirieri containere",
    "banner inchirieri containere",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru închirieri containere, cu containere de șantier și depozitare. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „ÎNCHIRIERI CONTAINERE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-081",
  "slug": "pepiniera-telefon-personalizat",
  "title": "Banner pepinieră cu numărul tău",
  "description": "Model pentru pepinieră, cu rânduri de plante tinere în ghivece. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/pepiniera-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/pepiniera-telefon-personalizat.webp"
  ],
  "category": "Agricultură și grădină",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner pepinieră",
    "banner publicitar pepinieră",
    "banner personalizat pepinieră",
    "banner pepiniera",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru pepinieră, cu rânduri de plante tinere în ghivece. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „PEPINIERĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-082",
  "slug": "pomi-fructiferi-telefon-personalizat",
  "title": "Banner pomi fructiferi cu numărul tău",
  "description": "Model pentru pomi fructiferi, cu pomi tineri și fructe. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/pomi-fructiferi-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/pomi-fructiferi-telefon-personalizat.webp"
  ],
  "category": "Agricultură și grădină",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner pomi fructiferi",
    "banner publicitar pomi fructiferi",
    "banner personalizat pomi fructiferi",
    "banner pomi fructiferi",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru pomi fructiferi, cu pomi tineri și fructe. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „POMI FRUCTIFERI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-083",
  "slug": "flori-de-gradina-telefon-personalizat",
  "title": "Banner flori de grădină cu numărul tău",
  "description": "Model pentru flori de grădină, cu flori în ghivece colorate. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/flori-de-gradina-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/flori-de-gradina-telefon-personalizat.webp"
  ],
  "category": "Agricultură și grădină",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner flori de grădină",
    "banner publicitar flori de grădină",
    "banner personalizat flori de grădină",
    "banner flori de gradina",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru flori de grădină, cu flori în ghivece colorate. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „FLORI DE GRĂDINĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-084",
  "slug": "gazon-rulou-telefon-personalizat",
  "title": "Banner gazon rulou cu numărul tău",
  "description": "Model pentru gazon rulou, cu rulouri de gazon verde. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/gazon-rulou-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/gazon-rulou-telefon-personalizat.webp"
  ],
  "category": "Agricultură și grădină",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner gazon rulou",
    "banner publicitar gazon rulou",
    "banner personalizat gazon rulou",
    "banner gazon rulou",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru gazon rulou, cu rulouri de gazon verde. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „GAZON RULOU” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-085",
  "slug": "sisteme-de-irigatii-telefon-personalizat",
  "title": "Banner sisteme de irigații cu numărul tău",
  "description": "Model pentru sisteme de irigații, cu aspersor pe gazon și conducte. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/sisteme-de-irigatii-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/sisteme-de-irigatii-telefon-personalizat.webp"
  ],
  "category": "Agricultură și grădină",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner sisteme de irigații",
    "banner publicitar sisteme de irigații",
    "banner personalizat sisteme de irigații",
    "banner sisteme de irigatii",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru sisteme de irigații, cu aspersor pe gazon și conducte. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „SISTEME DE IRIGAȚII” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-086",
  "slug": "cereale-de-vanzare-telefon-personalizat",
  "title": "Banner cereale de vânzare cu numărul tău",
  "description": "Model pentru cereale de vânzare, cu boabe de grâu și lan. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/cereale-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/cereale-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Agricultură și grădină",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner cereale de vânzare",
    "banner publicitar cereale de vânzare",
    "banner personalizat cereale de vânzare",
    "banner cereale de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru cereale de vânzare, cu boabe de grâu și lan. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „CEREALE DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-087",
  "slug": "ingrasaminte-agricole-telefon-personalizat",
  "title": "Banner îngrășăminte agricole cu numărul tău",
  "description": "Model pentru îngrășăminte agricole, cu saci generici și plante cultivate. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/ingrasaminte-agricole-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/ingrasaminte-agricole-telefon-personalizat.webp"
  ],
  "category": "Agricultură și grădină",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner îngrășăminte agricole",
    "banner publicitar îngrășăminte agricole",
    "banner personalizat îngrășăminte agricole",
    "banner ingrasaminte agricole",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru îngrășăminte agricole, cu saci generici și plante cultivate. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „ÎNGRĂȘĂMINTE AGRICOLE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-088",
  "slug": "servicii-cu-combina-telefon-personalizat",
  "title": "Banner servicii cu combina cu numărul tău",
  "description": "Model pentru servicii cu combina, cu combină de recoltat într-un lan. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/servicii-cu-combina-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/servicii-cu-combina-telefon-personalizat.webp"
  ],
  "category": "Agricultură și grădină",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner servicii cu combina",
    "banner publicitar servicii cu combina",
    "banner personalizat servicii cu combina",
    "telefon personalizat",
    "banner recoltare cereale",
    "banner recoltare cu combina"
  ],
  "longDescription": "<p>Model pentru servicii cu combina, cu combină de recoltat într-un lan. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „SERVICII CU COMBINA” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-089",
  "slug": "prelucrarea-solului-telefon-personalizat",
  "title": "Banner prelucrarea solului cu numărul tău",
  "description": "Model pentru prelucrarea solului, cu tractor cu utilaj de prelucrare a solului. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/prelucrarea-solului-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/prelucrarea-solului-telefon-personalizat.webp"
  ],
  "category": "Agricultură și grădină",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner prelucrarea solului",
    "banner publicitar prelucrarea solului",
    "banner personalizat prelucrarea solului",
    "banner prelucrarea solului",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru prelucrarea solului, cu tractor cu utilaj de prelucrare a solului. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „PRELUCRAREA SOLULUI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-090",
  "slug": "solar-de-legume-telefon-personalizat",
  "title": "Banner solar de legume cu numărul tău",
  "description": "Model pentru solar de legume, cu solar cu rânduri de roșii. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/solar-de-legume-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/solar-de-legume-telefon-personalizat.webp"
  ],
  "category": "Agricultură și grădină",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner solar de legume",
    "banner publicitar solar de legume",
    "banner personalizat solar de legume",
    "banner solar de legume",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru solar de legume, cu solar cu rânduri de roșii. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „SOLAR DE LEGUME” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-091",
  "slug": "reparatii-centrale-termice-telefon-personalizat",
  "title": "Banner reparații centrale termice cu numărul tău",
  "description": "Model pentru reparații centrale termice, cu centrală termică și unelte de service. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/reparatii-centrale-termice-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/reparatii-centrale-termice-telefon-personalizat.webp"
  ],
  "category": "Instalații și reparații specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner reparații centrale termice",
    "banner publicitar reparații centrale termice",
    "banner personalizat reparații centrale termice",
    "banner reparatii centrale termice",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru reparații centrale termice, cu centrală termică și unelte de service. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „REPARAȚII CENTRALE TERMICE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-092",
  "slug": "revizii-centrale-termice-telefon-personalizat",
  "title": "Banner revizii centrale termice cu numărul tău",
  "description": "Model pentru revizii centrale termice, cu centrală termică și echipament de verificare. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/revizii-centrale-termice-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/revizii-centrale-termice-telefon-personalizat.webp"
  ],
  "category": "Instalații și reparații specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner revizii centrale termice",
    "banner publicitar revizii centrale termice",
    "banner personalizat revizii centrale termice",
    "banner revizii centrale termice",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru revizii centrale termice, cu centrală termică și echipament de verificare. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „REVIZII CENTRALE TERMICE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-093",
  "slug": "montaj-camere-de-supraveghere-telefon-personalizat",
  "title": "Banner montaj camere de supraveghere cu numărul tău",
  "description": "Model pentru montaj camere de supraveghere, cu camere de supraveghere și recorder fără mărci. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/montaj-camere-de-supraveghere-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/montaj-camere-de-supraveghere-telefon-personalizat.webp"
  ],
  "category": "Instalații și reparații specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner montaj camere de supraveghere",
    "banner publicitar montaj camere de supraveghere",
    "banner personalizat montaj camere de supraveghere",
    "banner montaj camere de supraveghere",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru montaj camere de supraveghere, cu camere de supraveghere și recorder fără mărci. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „MONTAJ CAMERE DE SUPRAVEGHERE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-094",
  "slug": "sisteme-de-alarma-telefon-personalizat",
  "title": "Banner sisteme de alarmă cu numărul tău",
  "description": "Model pentru sisteme de alarmă, cu senzori și centrală de alarmă fără inscripții. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/sisteme-de-alarma-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/sisteme-de-alarma-telefon-personalizat.webp"
  ],
  "category": "Instalații și reparații specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner sisteme de alarmă",
    "banner publicitar sisteme de alarmă",
    "banner personalizat sisteme de alarmă",
    "banner sisteme de alarma",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru sisteme de alarmă, cu senzori și centrală de alarmă fără inscripții. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „SISTEME DE ALARMĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-095",
  "slug": "automatizari-porti-telefon-personalizat",
  "title": "Banner automatizări porți cu numărul tău",
  "description": "Model pentru automatizări porți, cu poartă și motor de automatizare. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/automatizari-porti-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/automatizari-porti-telefon-personalizat.webp"
  ],
  "category": "Instalații și reparații specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner automatizări porți",
    "banner publicitar automatizări porți",
    "banner personalizat automatizări porți",
    "banner automatizari porti",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru automatizări porți, cu poartă și motor de automatizare. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „AUTOMATIZĂRI PORȚI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-096",
  "slug": "montaj-interfoane-telefon-personalizat",
  "title": "Banner montaj interfoane cu numărul tău",
  "description": "Model pentru montaj interfoane, cu interfon și panou de intrare fără text. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/montaj-interfoane-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/montaj-interfoane-telefon-personalizat.webp"
  ],
  "category": "Instalații și reparații specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner montaj interfoane",
    "banner publicitar montaj interfoane",
    "banner personalizat montaj interfoane",
    "banner montaj interfoane",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru montaj interfoane, cu interfon și panou de intrare fără text. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „MONTAJ INTERFOANE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-097",
  "slug": "deblocari-usi-telefon-personalizat",
  "title": "Banner deblocări uși cu numărul tău",
  "description": "Model pentru deblocări uși, cu yală și chei fără detalii de bypass. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/deblocari-usi-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/deblocari-usi-telefon-personalizat.webp"
  ],
  "category": "Instalații și reparații specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner deblocări uși",
    "banner publicitar deblocări uși",
    "banner personalizat deblocări uși",
    "banner deblocari usi",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru deblocări uși, cu yală și chei fără detalii de bypass. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „DEBLOCĂRI UȘI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 150 × 50, 225 × 75, 300 × 100, 375 × 125, 450 × 150, 600 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 3:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-098",
  "slug": "copiere-chei-telefon-personalizat",
  "title": "Banner copiere chei cu numărul tău",
  "description": "Model pentru copiere chei, cu chei și aparat de copiat chei. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/copiere-chei-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/copiere-chei-telefon-personalizat.webp"
  ],
  "category": "Instalații și reparații specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner copiere chei",
    "banner publicitar copiere chei",
    "banner personalizat copiere chei",
    "banner copiere chei",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru copiere chei, cu chei și aparat de copiat chei. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „COPIERE CHEI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-099",
  "slug": "reparatii-motounelte-telefon-personalizat",
  "title": "Banner reparații motounelte cu numărul tău",
  "description": "Model pentru reparații motounelte, cu motocoasă și unelte de atelier. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/reparatii-motounelte-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/reparatii-motounelte-telefon-personalizat.webp"
  ],
  "category": "Instalații și reparații specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner reparații motounelte",
    "banner publicitar reparații motounelte",
    "banner personalizat reparații motounelte",
    "banner reparatii motounelte",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru reparații motounelte, cu motocoasă și unelte de atelier. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „REPARAȚII MOTOUNELTE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-industry100-100",
  "slug": "reparatii-biciclete-telefon-personalizat",
  "title": "Banner reparații biciclete cu numărul tău",
  "description": "Model pentru reparații biciclete, cu bicicletă și unelte de service. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-industrii-100/reparatii-biciclete-telefon-personalizat.webp",
  "images": [
    "/products/bannere-industrii-100/reparatii-biciclete-telefon-personalizat.webp"
  ],
  "category": "Instalații și reparații specializate",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner reparații biciclete",
    "banner publicitar reparații biciclete",
    "banner personalizat reparații biciclete",
    "banner reparatii biciclete",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru reparații biciclete, cu bicicletă și unelte de service. Mesajul mare identifică activitatea, iar banda de contact rezervă locul telefonului tău. Potrivit pentru afișarea la intrarea în sediu, pe gard sau în spațiul de prezentare.</p><p>Fotografia prezintă un model cu mesajul „REPARAȚII BICICLETE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150, 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},

{
  "id": "banner-phone100-001",
  "slug": "casa-de-vanzare-telefon-personalizat",
  "title": "Banner casă de vânzare cu numărul tău",
  "description": "Model pentru casă de vânzare, cu casă cu grădină și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/casa-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/casa-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner casă de vânzare",
    "banner casa de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru casă de vânzare, cu casă cu grădină și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „CASĂ DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-002",
  "slug": "apartament-de-vanzare-telefon-personalizat",
  "title": "Banner apartament de vânzare cu numărul tău",
  "description": "Model pentru apartament de vânzare, cu bloc modern și balcon și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/apartament-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/apartament-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner apartament de vânzare",
    "banner apartament de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru apartament de vânzare, cu bloc modern și balcon și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „APARTAMENT DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-003",
  "slug": "garsoniera-de-vanzare-telefon-personalizat",
  "title": "Banner garsonieră de vânzare cu numărul tău",
  "description": "Model pentru garsonieră de vânzare, cu interior compact de locuință și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/garsoniera-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/garsoniera-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner garsonieră de vânzare",
    "banner garsoniera de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru garsonieră de vânzare, cu interior compact de locuință și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „GARSONIERĂ DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-004",
  "slug": "vila-de-vanzare-telefon-personalizat",
  "title": "Banner vilă de vânzare cu numărul tău",
  "description": "Model pentru vilă de vânzare, cu vilă luminoasă cu terasă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/vila-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/vila-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner vilă de vânzare",
    "banner vila de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru vilă de vânzare, cu vilă luminoasă cu terasă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „VILĂ DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-005",
  "slug": "hala-de-vanzare-telefon-personalizat",
  "title": "Banner hală de vânzare cu numărul tău",
  "description": "Model pentru hală de vânzare, cu hală industrială și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/hala-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/hala-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner hală de vânzare",
    "banner hala de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru hală de vânzare, cu hală industrială și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „HALĂ DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-006",
  "slug": "magazin-de-vanzare-telefon-personalizat",
  "title": "Banner magazin de vânzare cu numărul tău",
  "description": "Model pentru magazin de vânzare, cu vitrină comercială și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/magazin-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/magazin-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner magazin de vânzare",
    "banner magazin de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru magazin de vânzare, cu vitrină comercială și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „MAGAZIN DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-007",
  "slug": "ferma-de-vanzare-telefon-personalizat",
  "title": "Banner fermă de vânzare cu numărul tău",
  "description": "Model pentru fermă de vânzare, cu fermă rurală și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/ferma-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/ferma-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner fermă de vânzare",
    "banner ferma de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru fermă de vânzare, cu fermă rurală și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „FERMĂ DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-008",
  "slug": "pensiune-de-vanzare-telefon-personalizat",
  "title": "Banner pensiune de vânzare cu numărul tău",
  "description": "Model pentru pensiune de vânzare, cu pensiune cu verandă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/pensiune-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/pensiune-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner pensiune de vânzare",
    "banner pensiune de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru pensiune de vânzare, cu pensiune cu verandă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „PENSIUNE DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-009",
  "slug": "teren-intravilan-de-vanzare-telefon-personalizat",
  "title": "Banner teren intravilan de vânzare cu numărul tău",
  "description": "Model pentru teren intravilan de vânzare, cu parcelă de teren delimitată lângă case și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/teren-intravilan-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/teren-intravilan-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner teren intravilan de vânzare",
    "banner teren intravilan de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru teren intravilan de vânzare, cu parcelă de teren delimitată lângă case și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „TEREN INTRAVILAN DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-010",
  "slug": "teren-agricol-de-vanzare-telefon-personalizat",
  "title": "Banner teren agricol de vânzare cu numărul tău",
  "description": "Model pentru teren agricol de vânzare, cu câmp agricol cu rânduri cultivate și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/teren-agricol-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/teren-agricol-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner teren agricol de vânzare",
    "banner teren agricol de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru teren agricol de vânzare, cu câmp agricol cu rânduri cultivate și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „TEREN AGRICOL DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-011",
  "slug": "casa-de-inchiriat-telefon-personalizat",
  "title": "Banner casă de închiriat cu numărul tău",
  "description": "Model pentru casă de închiriat, cu casă cu intrare primitoare și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/casa-de-inchiriat-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/casa-de-inchiriat-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner casă de închiriat",
    "banner casa de inchiriat",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru casă de închiriat, cu casă cu intrare primitoare și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „CASĂ DE ÎNCHIRIAT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-012",
  "slug": "apartament-de-inchiriat-telefon-personalizat",
  "title": "Banner apartament de închiriat cu numărul tău",
  "description": "Model pentru apartament de închiriat, cu apartament modern și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/apartament-de-inchiriat-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/apartament-de-inchiriat-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner apartament de închiriat",
    "banner apartament de inchiriat",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru apartament de închiriat, cu apartament modern și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „APARTAMENT DE ÎNCHIRIAT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-013",
  "slug": "garsoniera-de-inchiriat-telefon-personalizat",
  "title": "Banner garsonieră de închiriat cu numărul tău",
  "description": "Model pentru garsonieră de închiriat, cu locuință compactă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/garsoniera-de-inchiriat-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/garsoniera-de-inchiriat-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner garsonieră de închiriat",
    "banner garsoniera de inchiriat",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru garsonieră de închiriat, cu locuință compactă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „GARSONIERĂ DE ÎNCHIRIAT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-014",
  "slug": "birouri-de-inchiriat-telefon-personalizat",
  "title": "Banner birouri de închiriat cu numărul tău",
  "description": "Model pentru birouri de închiriat, cu clădire de birouri și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/birouri-de-inchiriat-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/birouri-de-inchiriat-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner birouri de închiriat",
    "banner birouri de inchiriat",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru birouri de închiriat, cu clădire de birouri și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „BIROURI DE ÎNCHIRIAT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-015",
  "slug": "hala-de-inchiriat-telefon-personalizat",
  "title": "Banner hală de închiriat cu numărul tău",
  "description": "Model pentru hală de închiriat, cu spațiu industrial cu ușă mare și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/hala-de-inchiriat-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/hala-de-inchiriat-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner hală de închiriat",
    "banner hala de inchiriat",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru hală de închiriat, cu spațiu industrial cu ușă mare și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „HALĂ DE ÎNCHIRIAT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-016",
  "slug": "depozit-de-inchiriat-telefon-personalizat",
  "title": "Banner depozit de închiriat cu numărul tău",
  "description": "Model pentru depozit de închiriat, cu depozit cu rafturi și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/depozit-de-inchiriat-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/depozit-de-inchiriat-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner depozit de închiriat",
    "banner depozit de inchiriat",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru depozit de închiriat, cu depozit cu rafturi și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „DEPOZIT DE ÎNCHIRIAT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-017",
  "slug": "garaj-de-inchiriat-telefon-personalizat",
  "title": "Banner garaj de închiriat cu numărul tău",
  "description": "Model pentru garaj de închiriat, cu garaj cu ușă rulantă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/garaj-de-inchiriat-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/garaj-de-inchiriat-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner garaj de închiriat",
    "banner garaj de inchiriat",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru garaj de închiriat, cu garaj cu ușă rulantă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „GARAJ DE ÎNCHIRIAT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-018",
  "slug": "loc-de-parcare-de-inchiriat-telefon-personalizat",
  "title": "Banner loc de parcare de închiriat cu numărul tău",
  "description": "Model pentru loc de parcare de închiriat, cu loc de parcare marcat și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/loc-de-parcare-de-inchiriat-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/loc-de-parcare-de-inchiriat-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner loc de parcare de închiriat",
    "banner loc de parcare de inchiriat",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru loc de parcare de închiriat, cu loc de parcare marcat și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „LOC DE PARCARE DE ÎNCHIRIAT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-019",
  "slug": "cabana-de-inchiriat-telefon-personalizat",
  "title": "Banner cabană de închiriat cu numărul tău",
  "description": "Model pentru cabană de închiriat, cu cabană de lemn în munți și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/cabana-de-inchiriat-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/cabana-de-inchiriat-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner cabană de închiriat",
    "banner cabana de inchiriat",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru cabană de închiriat, cu cabană de lemn în munți și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „CABANĂ DE ÎNCHIRIAT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-020",
  "slug": "inchirieri-in-regim-hotelier-telefon-personalizat",
  "title": "Banner închirieri în regim hotelier cu numărul tău",
  "description": "Model pentru închirieri în regim hotelier, cu cameră de cazare modernă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/inchirieri-in-regim-hotelier-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/inchirieri-in-regim-hotelier-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner închirieri în regim hotelier",
    "banner inchirieri in regim hotelier",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru închirieri în regim hotelier, cu cameră de cazare modernă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „ÎNCHIRIERI ÎN REGIM HOTELIER” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-021",
  "slug": "service-auto-telefon-personalizat",
  "title": "Banner service auto cu numărul tău",
  "description": "Model pentru service auto, cu automobil și scule de atelier și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/service-auto-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/service-auto-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner service auto",
    "banner service auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru service auto, cu automobil și scule de atelier și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „SERVICE AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-022",
  "slug": "vulcanizare-telefon-personalizat",
  "title": "Banner vulcanizare cu numărul tău",
  "description": "Model pentru vulcanizare, cu anvelope și jantă auto și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/vulcanizare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/vulcanizare-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner vulcanizare",
    "banner vulcanizare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru vulcanizare, cu anvelope și jantă auto și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „VULCANIZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-023",
  "slug": "spalatorie-auto-telefon-personalizat",
  "title": "Banner spălătorie auto cu numărul tău",
  "description": "Model pentru spălătorie auto, cu automobil cu spumă și apă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/spalatorie-auto-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/spalatorie-auto-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner spălătorie auto",
    "banner spalatorie auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru spălătorie auto, cu automobil cu spumă și apă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „SPĂLĂTORIE AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-024",
  "slug": "detailing-auto-telefon-personalizat",
  "title": "Banner detailing auto cu numărul tău",
  "description": "Model pentru detailing auto, cu caroserie lustruită și lavetă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/detailing-auto-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/detailing-auto-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner detailing auto",
    "banner detailing auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru detailing auto, cu caroserie lustruită și lavetă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „DETAILING AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-025",
  "slug": "tinichigerie-auto-telefon-personalizat",
  "title": "Banner tinichigerie auto cu numărul tău",
  "description": "Model pentru tinichigerie auto, cu caroserie și unelte de reparații și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/tinichigerie-auto-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/tinichigerie-auto-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner tinichigerie auto",
    "banner tinichigerie auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru tinichigerie auto, cu caroserie și unelte de reparații și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „TINICHIGERIE AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-026",
  "slug": "vopsitorie-auto-telefon-personalizat",
  "title": "Banner vopsitorie auto cu numărul tău",
  "description": "Model pentru vopsitorie auto, cu pistol de vopsit și panou de caroserie și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/vopsitorie-auto-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/vopsitorie-auto-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner vopsitorie auto",
    "banner vopsitorie auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru vopsitorie auto, cu pistol de vopsit și panou de caroserie și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „VOPSITORIE AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-027",
  "slug": "piese-auto-telefon-personalizat",
  "title": "Banner piese auto cu numărul tău",
  "description": "Model pentru piese auto, cu piese mecanice auto și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/piese-auto-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/piese-auto-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner piese auto",
    "banner piese auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru piese auto, cu piese mecanice auto și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „PIESE AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-028",
  "slug": "tractari-auto-telefon-personalizat",
  "title": "Banner tractări auto cu numărul tău",
  "description": "Model pentru tractări auto, cu autospecială cu platformă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/tractari-auto-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/tractari-auto-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner tractări auto",
    "banner tractari auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru tractări auto, cu autospecială cu platformă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „TRACTĂRI AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-029",
  "slug": "inchirieri-auto-telefon-personalizat",
  "title": "Banner închirieri auto cu numărul tău",
  "description": "Model pentru închirieri auto, cu automobil și cheie și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/inchirieri-auto-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/inchirieri-auto-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner închirieri auto",
    "banner inchirieri auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru închirieri auto, cu automobil și cheie și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „ÎNCHIRIERI AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-030",
  "slug": "diagnoza-auto-telefon-personalizat",
  "title": "Banner diagnoză auto cu numărul tău",
  "description": "Model pentru diagnoză auto, cu aparat de diagnoză și automobil și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/diagnoza-auto-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/diagnoza-auto-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner diagnoză auto",
    "banner diagnoza auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru diagnoză auto, cu aparat de diagnoză și automobil și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „DIAGNOZĂ AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-031",
  "slug": "schimb-ulei-auto-telefon-personalizat",
  "title": "Banner schimb ulei auto cu numărul tău",
  "description": "Model pentru schimb ulei auto, cu recipient de ulei și filtru și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/schimb-ulei-auto-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/schimb-ulei-auto-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner schimb ulei auto",
    "banner schimb ulei auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru schimb ulei auto, cu recipient de ulei și filtru și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „SCHIMB ULEI AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-032",
  "slug": "parbrize-auto-telefon-personalizat",
  "title": "Banner parbrize auto cu numărul tău",
  "description": "Model pentru parbrize auto, cu parbriz și automobil și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/parbrize-auto-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/parbrize-auto-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner parbrize auto",
    "banner parbrize auto",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru parbrize auto, cu parbriz și automobil și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „PARBRIZE AUTO” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-033",
  "slug": "service-motociclete-telefon-personalizat",
  "title": "Banner service motociclete cu numărul tău",
  "description": "Model pentru service motociclete, cu motocicletă și scule și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/service-motociclete-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/service-motociclete-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner service motociclete",
    "banner service motociclete",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru service motociclete, cu motocicletă și scule și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „SERVICE MOTOCICLETE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-034",
  "slug": "inchirieri-rulote-telefon-personalizat",
  "title": "Banner închirieri rulote cu numărul tău",
  "description": "Model pentru închirieri rulote, cu rulotă de vacanță și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/inchirieri-rulote-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/inchirieri-rulote-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner închirieri rulote",
    "banner inchirieri rulote",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru închirieri rulote, cu rulotă de vacanță și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „ÎNCHIRIERI RULOTE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-035",
  "slug": "scoala-de-soferi-telefon-personalizat",
  "title": "Banner școală de șoferi cu numărul tău",
  "description": "Model pentru școală de șoferi, cu automobil de școală și conuri și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/scoala-de-soferi-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/scoala-de-soferi-telefon-personalizat.webp"
  ],
  "category": "Auto-Moto",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner școală de șoferi",
    "banner scoala de soferi",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru școală de șoferi, cu automobil de școală și conuri și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „ȘCOALĂ DE ȘOFERI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-036",
  "slug": "instalatii-sanitare-telefon-personalizat",
  "title": "Banner instalații sanitare cu numărul tău",
  "description": "Model pentru instalații sanitare, cu țevi și robinete și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/instalatii-sanitare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/instalatii-sanitare-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner instalații sanitare",
    "banner instalatii sanitare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru instalații sanitare, cu țevi și robinete și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „INSTALAȚII SANITARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-037",
  "slug": "instalatii-termice-telefon-personalizat",
  "title": "Banner instalații termice cu numărul tău",
  "description": "Model pentru instalații termice, cu radiator și conducte și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/instalatii-termice-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/instalatii-termice-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner instalații termice",
    "banner instalatii termice",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru instalații termice, cu radiator și conducte și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „INSTALAȚII TERMICE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-038",
  "slug": "montaj-aer-conditionat-telefon-personalizat",
  "title": "Banner montaj aer condiționat cu numărul tău",
  "description": "Model pentru montaj aer condiționat, cu unitate de aer condiționat și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/montaj-aer-conditionat-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/montaj-aer-conditionat-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner montaj aer condiționat",
    "banner montaj aer conditionat",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru montaj aer condiționat, cu unitate de aer condiționat și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „MONTAJ AER CONDIȚIONAT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-039",
  "slug": "reparatii-acoperisuri-telefon-personalizat",
  "title": "Banner reparații acoperișuri cu numărul tău",
  "description": "Model pentru reparații acoperișuri, cu acoperiș din țiglă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/reparatii-acoperisuri-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/reparatii-acoperisuri-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner reparații acoperișuri",
    "banner reparatii acoperisuri",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru reparații acoperișuri, cu acoperiș din țiglă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „REPARAȚII ACOPERIȘURI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-040",
  "slug": "montaj-termopane-telefon-personalizat",
  "title": "Banner montaj termopane cu numărul tău",
  "description": "Model pentru montaj termopane, cu fereastră modernă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/montaj-termopane-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/montaj-termopane-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner montaj termopane",
    "banner montaj termopane",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru montaj termopane, cu fereastră modernă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „MONTAJ TERMOPANE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-041",
  "slug": "zugraveli-interioare-telefon-personalizat",
  "title": "Banner zugrăveli interioare cu numărul tău",
  "description": "Model pentru zugrăveli interioare, cu trafalet și perete și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/zugraveli-interioare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/zugraveli-interioare-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner zugrăveli interioare",
    "banner zugraveli interioare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru zugrăveli interioare, cu trafalet și perete și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „ZUGRĂVELI INTERIOARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-042",
  "slug": "renovari-apartamente-telefon-personalizat",
  "title": "Banner renovări apartamente cu numărul tău",
  "description": "Model pentru renovări apartamente, cu interior renovat și unelte și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/renovari-apartamente-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/renovari-apartamente-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner renovări apartamente",
    "banner renovari apartamente",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru renovări apartamente, cu interior renovat și unelte și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „RENOVĂRI APARTAMENTE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-043",
  "slug": "montaj-gresie-si-faianta-telefon-personalizat",
  "title": "Banner montaj gresie și faianță cu numărul tău",
  "description": "Model pentru montaj gresie și faianță, cu plăci ceramice și mistrie și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/montaj-gresie-si-faianta-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/montaj-gresie-si-faianta-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner montaj gresie și faianță",
    "banner montaj gresie si faianta",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru montaj gresie și faianță, cu plăci ceramice și mistrie și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „MONTAJ GRESIE ȘI FAIANȚĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-044",
  "slug": "montaj-parchet-telefon-personalizat",
  "title": "Banner montaj parchet cu numărul tău",
  "description": "Model pentru montaj parchet, cu podea din lemn și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/montaj-parchet-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/montaj-parchet-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner montaj parchet",
    "banner montaj parchet",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru montaj parchet, cu podea din lemn și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „MONTAJ PARCHET” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-045",
  "slug": "mobila-la-comanda-telefon-personalizat",
  "title": "Banner mobilă la comandă cu numărul tău",
  "description": "Model pentru mobilă la comandă, cu bucătărie cu mobilier din lemn și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/mobila-la-comanda-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/mobila-la-comanda-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner mobilă la comandă",
    "banner mobila la comanda",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru mobilă la comandă, cu bucătărie cu mobilier din lemn și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „MOBILĂ LA COMANDĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-046",
  "slug": "garduri-si-porti-telefon-personalizat",
  "title": "Banner garduri și porți cu numărul tău",
  "description": "Model pentru garduri și porți, cu poartă metalică și gard și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/garduri-si-porti-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/garduri-si-porti-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner garduri și porți",
    "banner garduri si porti",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru garduri și porți, cu poartă metalică și gard și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „GARDURI ȘI PORȚI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-047",
  "slug": "pavaje-si-alei-telefon-personalizat",
  "title": "Banner pavaje și alei cu numărul tău",
  "description": "Model pentru pavaje și alei, cu alee pavată și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/pavaje-si-alei-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/pavaje-si-alei-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner pavaje și alei",
    "banner pavaje si alei",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru pavaje și alei, cu alee pavată și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „PAVAJE ȘI ALEI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-048",
  "slug": "excavatii-si-terasamente-telefon-personalizat",
  "title": "Banner excavații și terasamente cu numărul tău",
  "description": "Model pentru excavații și terasamente, cu excavator și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/excavatii-si-terasamente-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/excavatii-si-terasamente-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner excavații și terasamente",
    "banner excavatii si terasamente",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru excavații și terasamente, cu excavator și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „EXCAVAȚII ȘI TERASAMENTE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-049",
  "slug": "inchirieri-utilaje-telefon-personalizat",
  "title": "Banner închirieri utilaje cu numărul tău",
  "description": "Model pentru închirieri utilaje, cu utilaj compact de construcții și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/inchirieri-utilaje-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/inchirieri-utilaje-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner închirieri utilaje",
    "banner inchirieri utilaje",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru închirieri utilaje, cu utilaj compact de construcții și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „ÎNCHIRIERI UTILAJE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-050",
  "slug": "transport-moloz-telefon-personalizat",
  "title": "Banner transport moloz cu numărul tău",
  "description": "Model pentru transport moloz, cu container pentru moloz și camion și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/transport-moloz-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/transport-moloz-telefon-personalizat.webp"
  ],
  "category": "Construcții și amenajări",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner transport moloz",
    "banner transport moloz",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru transport moloz, cu container pentru moloz și camion și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „TRANSPORT MOLOZ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-051",
  "slug": "frizerie-telefon-personalizat",
  "title": "Banner frizerie cu numărul tău",
  "description": "Model pentru frizerie, cu foarfecă și pieptene și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/frizerie-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/frizerie-telefon-personalizat.webp"
  ],
  "category": "Frumusețe și îngrijire",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner frizerie",
    "banner frizerie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru frizerie, cu foarfecă și pieptene și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „FRIZERIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-052",
  "slug": "barber-shop-telefon-personalizat",
  "title": "Banner barber shop cu numărul tău",
  "description": "Model pentru barber shop, cu aparat de tuns și scaun de frizerie și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/barber-shop-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/barber-shop-telefon-personalizat.webp"
  ],
  "category": "Frumusețe și îngrijire",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner barber shop",
    "banner barber shop",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru barber shop, cu aparat de tuns și scaun de frizerie și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „BARBER SHOP” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-053",
  "slug": "coafor-telefon-personalizat",
  "title": "Banner coafor cu numărul tău",
  "description": "Model pentru coafor, cu foarfecă și șuvițe de păr și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/coafor-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/coafor-telefon-personalizat.webp"
  ],
  "category": "Frumusețe și îngrijire",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner coafor",
    "banner coafor",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru coafor, cu foarfecă și șuvițe de păr și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „COAFOR” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-054",
  "slug": "manichiura-si-pedichiura-telefon-personalizat",
  "title": "Banner manichiură și pedichiură cu numărul tău",
  "description": "Model pentru manichiură și pedichiură, cu ojă și unelte de manichiură și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/manichiura-si-pedichiura-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/manichiura-si-pedichiura-telefon-personalizat.webp"
  ],
  "category": "Frumusețe și îngrijire",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner manichiură și pedichiură",
    "banner manichiura si pedichiura",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru manichiură și pedichiură, cu ojă și unelte de manichiură și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „MANICHIURĂ ȘI PEDICHIURĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-055",
  "slug": "salon-de-infrumusetare-telefon-personalizat",
  "title": "Banner salon de înfrumusețare cu numărul tău",
  "description": "Model pentru salon de înfrumusețare, cu interior elegant de salon și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/salon-de-infrumusetare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/salon-de-infrumusetare-telefon-personalizat.webp"
  ],
  "category": "Frumusețe și îngrijire",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner salon de înfrumusețare",
    "banner salon de infrumusetare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru salon de înfrumusețare, cu interior elegant de salon și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „SALON DE ÎNFRUMUSEȚARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-056",
  "slug": "cosmetica-faciala-telefon-personalizat",
  "title": "Banner cosmetică facială cu numărul tău",
  "description": "Model pentru cosmetică facială, cu produse de îngrijire și prosop și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/cosmetica-faciala-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/cosmetica-faciala-telefon-personalizat.webp"
  ],
  "category": "Frumusețe și îngrijire",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner cosmetică facială",
    "banner cosmetica faciala",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru cosmetică facială, cu produse de îngrijire și prosop și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „COSMETICĂ FACIALĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-057",
  "slug": "masaj-de-relaxare-telefon-personalizat",
  "title": "Banner masaj de relaxare cu numărul tău",
  "description": "Model pentru masaj de relaxare, cu pietre de masaj și prosop și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/masaj-de-relaxare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/masaj-de-relaxare-telefon-personalizat.webp"
  ],
  "category": "Frumusețe și îngrijire",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner masaj de relaxare",
    "banner masaj de relaxare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru masaj de relaxare, cu pietre de masaj și prosop și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „MASAJ DE RELAXARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-058",
  "slug": "make-up-telefon-personalizat",
  "title": "Banner make-up cu numărul tău",
  "description": "Model pentru make-up, cu pensule și paletă de machiaj și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/make-up-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/make-up-telefon-personalizat.webp"
  ],
  "category": "Frumusețe și îngrijire",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner make-up",
    "banner make-up",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru make-up, cu pensule și paletă de machiaj și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „MAKE-UP” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-059",
  "slug": "stilizare-sprancene-telefon-personalizat",
  "title": "Banner stilizare sprâncene cu numărul tău",
  "description": "Model pentru stilizare sprâncene, cu pensetă și pensulă de sprâncene și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/stilizare-sprancene-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/stilizare-sprancene-telefon-personalizat.webp"
  ],
  "category": "Frumusețe și îngrijire",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner stilizare sprâncene",
    "banner stilizare sprancene",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru stilizare sprâncene, cu pensetă și pensulă de sprâncene și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „STILIZARE SPRÂNCENE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-060",
  "slug": "extensii-gene-telefon-personalizat",
  "title": "Banner extensii gene cu numărul tău",
  "description": "Model pentru extensii gene, cu instrumente pentru aplicarea genelor și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/extensii-gene-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/extensii-gene-telefon-personalizat.webp"
  ],
  "category": "Frumusețe și îngrijire",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner extensii gene",
    "banner extensii gene",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru extensii gene, cu instrumente pentru aplicarea genelor și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „EXTENSII GENE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-061",
  "slug": "pizzerie-telefon-personalizat",
  "title": "Banner pizzerie cu numărul tău",
  "description": "Model pentru pizzerie, cu pizza proaspătă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/pizzerie-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/pizzerie-telefon-personalizat.webp"
  ],
  "category": "HoReCa",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner pizzerie",
    "banner pizzerie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru pizzerie, cu pizza proaspătă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „PIZZERIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-062",
  "slug": "fast-food-telefon-personalizat",
  "title": "Banner fast food cu numărul tău",
  "description": "Model pentru fast food, cu burger și cartofi și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/fast-food-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/fast-food-telefon-personalizat.webp"
  ],
  "category": "HoReCa",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner fast food",
    "banner fast food",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru fast food, cu burger și cartofi și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „FAST FOOD” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-063",
  "slug": "restaurant-telefon-personalizat",
  "title": "Banner restaurant cu numărul tău",
  "description": "Model pentru restaurant, cu preparat culinar și tacâmuri și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/restaurant-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/restaurant-telefon-personalizat.webp"
  ],
  "category": "HoReCa",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner restaurant",
    "banner restaurant",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru restaurant, cu preparat culinar și tacâmuri și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „RESTAURANT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-064",
  "slug": "cafenea-telefon-personalizat",
  "title": "Banner cafenea cu numărul tău",
  "description": "Model pentru cafenea, cu ceașcă de cafea și boabe și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/cafenea-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/cafenea-telefon-personalizat.webp"
  ],
  "category": "HoReCa",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner cafenea",
    "banner cafenea",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru cafenea, cu ceașcă de cafea și boabe și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „CAFENEA” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-065",
  "slug": "cofetarie-telefon-personalizat",
  "title": "Banner cofetărie cu numărul tău",
  "description": "Model pentru cofetărie, cu tort și prăjituri și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/cofetarie-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/cofetarie-telefon-personalizat.webp"
  ],
  "category": "HoReCa",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner cofetărie",
    "banner cofetarie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru cofetărie, cu tort și prăjituri și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „COFETĂRIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-066",
  "slug": "patiserie-telefon-personalizat",
  "title": "Banner patiserie cu numărul tău",
  "description": "Model pentru patiserie, cu croissante și produse de patiserie și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/patiserie-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/patiserie-telefon-personalizat.webp"
  ],
  "category": "HoReCa",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner patiserie",
    "banner patiserie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru patiserie, cu croissante și produse de patiserie și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „PATISERIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-067",
  "slug": "brutarie-telefon-personalizat",
  "title": "Banner brutărie cu numărul tău",
  "description": "Model pentru brutărie, cu pâine artizanală și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/brutarie-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/brutarie-telefon-personalizat.webp"
  ],
  "category": "HoReCa",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner brutărie",
    "banner brutarie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru brutărie, cu pâine artizanală și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „BRUTĂRIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-068",
  "slug": "catering-telefon-personalizat",
  "title": "Banner catering cu numărul tău",
  "description": "Model pentru catering, cu platouri cu mâncare și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/catering-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/catering-telefon-personalizat.webp"
  ],
  "category": "HoReCa",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner catering",
    "banner catering",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru catering, cu platouri cu mâncare și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „CATERING” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-069",
  "slug": "livrari-mancare-telefon-personalizat",
  "title": "Banner livrări mâncare cu numărul tău",
  "description": "Model pentru livrări mâncare, cu cutie de mâncare și sacoșă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/livrari-mancare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/livrari-mancare-telefon-personalizat.webp"
  ],
  "category": "HoReCa",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner livrări mâncare",
    "banner livrari mancare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru livrări mâncare, cu cutie de mâncare și sacoșă și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „LIVRĂRI MÂNCARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-070",
  "slug": "pensiune-telefon-personalizat",
  "title": "Banner pensiune cu numărul tău",
  "description": "Model pentru pensiune, cu casă de oaspeți și grădină și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/pensiune-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/pensiune-telefon-personalizat.webp"
  ],
  "category": "HoReCa",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner pensiune",
    "banner pensiune",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru pensiune, cu casă de oaspeți și grădină și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „PENSIUNE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-071",
  "slug": "legume-de-vanzare-telefon-personalizat",
  "title": "Banner legume de vânzare cu numărul tău",
  "description": "Model pentru legume de vânzare, cu roșii ardei și legume proaspete și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/legume-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/legume-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Agricultură și produse locale",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner legume de vânzare",
    "banner legume de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru legume de vânzare, cu roșii ardei și legume proaspete și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „LEGUME DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-072",
  "slug": "fructe-de-vanzare-telefon-personalizat",
  "title": "Banner fructe de vânzare cu numărul tău",
  "description": "Model pentru fructe de vânzare, cu mere pere și fructe proaspete și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/fructe-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/fructe-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Agricultură și produse locale",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner fructe de vânzare",
    "banner fructe de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru fructe de vânzare, cu mere pere și fructe proaspete și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „FRUCTE DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-073",
  "slug": "miere-de-vanzare-telefon-personalizat",
  "title": "Banner miere de vânzare cu numărul tău",
  "description": "Model pentru miere de vânzare, cu borcan de miere și fagure și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/miere-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/miere-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Agricultură și produse locale",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner miere de vânzare",
    "banner miere de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru miere de vânzare, cu borcan de miere și fagure și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „MIERE DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-074",
  "slug": "oua-de-tara-telefon-personalizat",
  "title": "Banner ouă de țară cu numărul tău",
  "description": "Model pentru ouă de țară, cu ouă în cofraj rustic și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/oua-de-tara-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/oua-de-tara-telefon-personalizat.webp"
  ],
  "category": "Agricultură și produse locale",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner ouă de țară",
    "banner oua de tara",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru ouă de țară, cu ouă în cofraj rustic și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „OUĂ DE ȚARĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-075",
  "slug": "branza-de-vanzare-telefon-personalizat",
  "title": "Banner brânză de vânzare cu numărul tău",
  "description": "Model pentru brânză de vânzare, cu brânză și platou rustic și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/branza-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/branza-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Agricultură și produse locale",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner brânză de vânzare",
    "banner branza de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru brânză de vânzare, cu brânză și platou rustic și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „BRÂNZĂ DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-076",
  "slug": "lemn-de-foc-telefon-personalizat",
  "title": "Banner lemn de foc cu numărul tău",
  "description": "Model pentru lemn de foc, cu lemne de foc stivuite și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/lemn-de-foc-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/lemn-de-foc-telefon-personalizat.webp"
  ],
  "category": "Agricultură și produse locale",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner lemn de foc",
    "banner lemn de foc",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru lemn de foc, cu lemne de foc stivuite și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „LEMN DE FOC” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-077",
  "slug": "fan-de-vanzare-telefon-personalizat",
  "title": "Banner fân de vânzare cu numărul tău",
  "description": "Model pentru fân de vânzare, cu baloți de fân și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/fan-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/fan-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Agricultură și produse locale",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner fân de vânzare",
    "banner fan de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru fân de vânzare, cu baloți de fân și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „FÂN DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-078",
  "slug": "rasaduri-de-vanzare-telefon-personalizat",
  "title": "Banner răsaduri de vânzare cu numărul tău",
  "description": "Model pentru răsaduri de vânzare, cu răsaduri în ghivece și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/rasaduri-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/rasaduri-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Agricultură și produse locale",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner răsaduri de vânzare",
    "banner rasaduri de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru răsaduri de vânzare, cu răsaduri în ghivece și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „RĂSADURI DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-079",
  "slug": "pui-de-gaina-de-vanzare-telefon-personalizat",
  "title": "Banner pui de găină de vânzare cu numărul tău",
  "description": "Model pentru pui de găină de vânzare, cu pui de găină în gospodărie și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/pui-de-gaina-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/pui-de-gaina-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Agricultură și produse locale",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner pui de găină de vânzare",
    "banner pui de gaina de vanzare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru pui de găină de vânzare, cu pui de găină în gospodărie și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „PUI DE GĂINĂ DE VÂNZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-080",
  "slug": "servicii-agricole-telefon-personalizat",
  "title": "Banner servicii agricole cu numărul tău",
  "description": "Model pentru servicii agricole, cu tractor pe câmp și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/servicii-agricole-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/servicii-agricole-telefon-personalizat.webp"
  ],
  "category": "Agricultură și produse locale",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner servicii agricole",
    "banner servicii agricole",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru servicii agricole, cu tractor pe câmp și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „SERVICII AGRICOLE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-081",
  "slug": "curatenie-la-domiciliu-telefon-personalizat",
  "title": "Banner curățenie la domiciliu cu numărul tău",
  "description": "Model pentru curățenie la domiciliu, cu produse de curățenie și mop și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/curatenie-la-domiciliu-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/curatenie-la-domiciliu-telefon-personalizat.webp"
  ],
  "category": "Servicii pentru casă",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner curățenie la domiciliu",
    "banner curatenie la domiciliu",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru curățenie la domiciliu, cu produse de curățenie și mop și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „CURĂȚENIE LA DOMICILIU” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-082",
  "slug": "curatenie-birouri-telefon-personalizat",
  "title": "Banner curățenie birouri cu numărul tău",
  "description": "Model pentru curățenie birouri, cu birou curat și unelte de curățenie și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/curatenie-birouri-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/curatenie-birouri-telefon-personalizat.webp"
  ],
  "category": "Servicii pentru casă",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner curățenie birouri",
    "banner curatenie birouri",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru curățenie birouri, cu birou curat și unelte de curățenie și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „CURĂȚENIE BIROURI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-083",
  "slug": "spalare-covoare-telefon-personalizat",
  "title": "Banner spălare covoare cu numărul tău",
  "description": "Model pentru spălare covoare, cu covor și echipament de curățare și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/spalare-covoare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/spalare-covoare-telefon-personalizat.webp"
  ],
  "category": "Servicii pentru casă",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner spălare covoare",
    "banner spalare covoare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru spălare covoare, cu covor și echipament de curățare și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „SPĂLARE COVOARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-084",
  "slug": "curatare-canapele-telefon-personalizat",
  "title": "Banner curățare canapele cu numărul tău",
  "description": "Model pentru curățare canapele, cu canapea curată și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/curatare-canapele-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/curatare-canapele-telefon-personalizat.webp"
  ],
  "category": "Servicii pentru casă",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner curățare canapele",
    "banner curatare canapele",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru curățare canapele, cu canapea curată și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „CURĂȚARE CANAPELE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-085",
  "slug": "mutari-si-transport-mobila-telefon-personalizat",
  "title": "Banner mutări și transport mobilă cu numărul tău",
  "description": "Model pentru mutări și transport mobilă, cu camion și cutii de mutare și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/mutari-si-transport-mobila-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/mutari-si-transport-mobila-telefon-personalizat.webp"
  ],
  "category": "Servicii pentru casă",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner mutări și transport mobilă",
    "banner mutari si transport mobila",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru mutări și transport mobilă, cu camion și cutii de mutare și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „MUTĂRI ȘI TRANSPORT MOBILĂ” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-086",
  "slug": "gradinarit-si-intretinere-telefon-personalizat",
  "title": "Banner grădinărit și întreținere cu numărul tău",
  "description": "Model pentru grădinărit și întreținere, cu unelte de grădină și flori și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/gradinarit-si-intretinere-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/gradinarit-si-intretinere-telefon-personalizat.webp"
  ],
  "category": "Servicii pentru casă",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner grădinărit și întreținere",
    "banner gradinarit si intretinere",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru grădinărit și întreținere, cu unelte de grădină și flori și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „GRĂDINĂRIT ȘI ÎNTREȚINERE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-087",
  "slug": "tundere-gazon-telefon-personalizat",
  "title": "Banner tundere gazon cu numărul tău",
  "description": "Model pentru tundere gazon, cu mașină de tuns iarba și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/tundere-gazon-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/tundere-gazon-telefon-personalizat.webp"
  ],
  "category": "Servicii pentru casă",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner tundere gazon",
    "banner tundere gazon",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru tundere gazon, cu mașină de tuns iarba și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „TUNDERE GAZON” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-088",
  "slug": "reparatii-electrocasnice-telefon-personalizat",
  "title": "Banner reparații electrocasnice cu numărul tău",
  "description": "Model pentru reparații electrocasnice, cu mașină de spălat și unelte și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/reparatii-electrocasnice-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/reparatii-electrocasnice-telefon-personalizat.webp"
  ],
  "category": "Servicii pentru casă",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner reparații electrocasnice",
    "banner reparatii electrocasnice",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru reparații electrocasnice, cu mașină de spălat și unelte și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „REPARAȚII ELECTROCASNICE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-089",
  "slug": "reparatii-frigidere-telefon-personalizat",
  "title": "Banner reparații frigidere cu numărul tău",
  "description": "Model pentru reparații frigidere, cu frigider și unelte și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/reparatii-frigidere-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/reparatii-frigidere-telefon-personalizat.webp"
  ],
  "category": "Servicii pentru casă",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner reparații frigidere",
    "banner reparatii frigidere",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru reparații frigidere, cu frigider și unelte și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „REPARAȚII FRIGIDERE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-090",
  "slug": "reparatii-masini-de-spalat-telefon-personalizat",
  "title": "Banner reparații mașini de spălat cu numărul tău",
  "description": "Model pentru reparații mașini de spălat, cu mașină de spălat și cheie de atelier și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/reparatii-masini-de-spalat-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/reparatii-masini-de-spalat-telefon-personalizat.webp"
  ],
  "category": "Servicii pentru casă",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner reparații mașini de spălat",
    "banner reparatii masini de spalat",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru reparații mașini de spălat, cu mașină de spălat și cheie de atelier și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „REPARAȚII MAȘINI DE SPĂLAT” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-091",
  "slug": "croitorie-si-retusuri-telefon-personalizat",
  "title": "Banner croitorie și retușuri cu numărul tău",
  "description": "Model pentru croitorie și retușuri, cu mașină de cusut și ață și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/croitorie-si-retusuri-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/croitorie-si-retusuri-telefon-personalizat.webp"
  ],
  "category": "Servicii",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner croitorie și retușuri",
    "banner croitorie si retusuri",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru croitorie și retușuri, cu mașină de cusut și ață și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „CROITORIE ȘI RETUȘURI” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-092",
  "slug": "cizmarie-telefon-personalizat",
  "title": "Banner cizmărie cu numărul tău",
  "description": "Model pentru cizmărie, cu pantof și unelte pentru încălțăminte și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/cizmarie-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/cizmarie-telefon-personalizat.webp"
  ],
  "category": "Servicii",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner cizmărie",
    "banner cizmarie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru cizmărie, cu pantof și unelte pentru încălțăminte și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „CIZMĂRIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-093",
  "slug": "reparatii-telefoane-telefon-personalizat",
  "title": "Banner reparații telefoane cu numărul tău",
  "description": "Model pentru reparații telefoane, cu telefon și scule de precizie și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/reparatii-telefoane-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/reparatii-telefoane-telefon-personalizat.webp"
  ],
  "category": "Servicii",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner reparații telefoane",
    "banner reparatii telefoane",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru reparații telefoane, cu telefon și scule de precizie și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „REPARAȚII TELEFOANE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-094",
  "slug": "reparatii-calculatoare-telefon-personalizat",
  "title": "Banner reparații calculatoare cu numărul tău",
  "description": "Model pentru reparații calculatoare, cu laptop și unelte și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/reparatii-calculatoare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/reparatii-calculatoare-telefon-personalizat.webp"
  ],
  "category": "Servicii",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner reparații calculatoare",
    "banner reparatii calculatoare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru reparații calculatoare, cu laptop și unelte și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „REPARAȚII CALCULATOARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-095",
  "slug": "foto-si-video-evenimente-telefon-personalizat",
  "title": "Banner foto și video evenimente cu numărul tău",
  "description": "Model pentru foto și video evenimente, cu aparat foto și cameră video și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/foto-si-video-evenimente-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/foto-si-video-evenimente-telefon-personalizat.webp"
  ],
  "category": "Servicii",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner foto și video evenimente",
    "banner foto si video evenimente",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru foto și video evenimente, cu aparat foto și cameră video și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „FOTO ȘI VIDEO EVENIMENTE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-096",
  "slug": "inchirieri-sonorizare-telefon-personalizat",
  "title": "Banner închirieri sonorizare cu numărul tău",
  "description": "Model pentru închirieri sonorizare, cu boxe și mixer audio și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/inchirieri-sonorizare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/inchirieri-sonorizare-telefon-personalizat.webp"
  ],
  "category": "Servicii",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner închirieri sonorizare",
    "banner inchirieri sonorizare",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru închirieri sonorizare, cu boxe și mixer audio și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „ÎNCHIRIERI SONORIZARE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-097",
  "slug": "decoratiuni-evenimente-telefon-personalizat",
  "title": "Banner decorațiuni evenimente cu numărul tău",
  "description": "Model pentru decorațiuni evenimente, cu aranjament floral și decor de eveniment și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/decoratiuni-evenimente-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/decoratiuni-evenimente-telefon-personalizat.webp"
  ],
  "category": "Servicii",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner decorațiuni evenimente",
    "banner decoratiuni evenimente",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru decorațiuni evenimente, cu aranjament floral și decor de eveniment și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „DECORAȚIUNI EVENIMENTE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-098",
  "slug": "florarie-telefon-personalizat",
  "title": "Banner florărie cu numărul tău",
  "description": "Model pentru florărie, cu buchet de flori și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/florarie-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/florarie-telefon-personalizat.webp"
  ],
  "category": "Servicii",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner florărie",
    "banner florarie",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru florărie, cu buchet de flori și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „FLORĂRIE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 sau 400 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-099",
  "slug": "ingrijire-animale-telefon-personalizat",
  "title": "Banner îngrijire animale cu numărul tău",
  "description": "Model pentru îngrijire animale, cu câine pisică și accesorii de îngrijire și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/ingrijire-animale-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/ingrijire-animale-telefon-personalizat.webp"
  ],
  "category": "Servicii",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner îngrijire animale",
    "banner ingrijire animale",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru îngrijire animale, cu câine pisică și accesorii de îngrijire și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „ÎNGRIJIRE ANIMALE” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-phone100-100",
  "slug": "angajam-personal-telefon-personalizat",
  "title": "Banner angajăm personal cu numărul tău",
  "description": "Model pentru angajăm personal, cu ilustrație de echipă și simbol de recrutare și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact. „Nr. tău 07** *** ***” se înlocuiește cu telefonul completat de tine. Configurează dimensiunea, materialul și cantitatea înainte de comandă.",
  "image": "/products/bannere-telefon-100/angajam-personal-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon-100/angajam-personal-telefon-personalizat.webp"
  ],
  "category": "Servicii",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner angajăm personal",
    "banner angajam personal",
    "telefon personalizat"
  ],
  "longDescription": "<p>Model pentru angajăm personal, cu ilustrație de echipă și simbol de recrutare și o zonă de contact ușor de observat. Mesajul principal prezintă clar oferta, iar numărul tău se imprimă pe banda de contact.</p><p>Fotografia prezintă un model cu mesajul „ANGAJĂM PERSONAL” și textul „Nr. tău 07** *** ***”. Explicația „Înlocuim cu numărul tău” arată unde se imprimă telefonul completat în configurator. Exemplul cu asteriscuri nu este un număr de contact.</p><p>Alegi dimensiunea în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Pentru o lățime personalizată, înălțimea se calculează automat la raportul 2.5:1, păstrând proporțiile modelului.</p><p>Selectezi materialul și cantitatea, iar prețul se calculează pentru opțiunile alese. Poți păstra grafica și completa telefonul, încărca propria machetă sau cere grafică personalizată. Telefonul și indicațiile se salvează împreună cu modelul în comandă; fotografia de referință nu se actualizează automat.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},

{
  "id": "banner-teren-de-vanzare-telefon-personalizat",
  "slug": "teren-de-vanzare-telefon-personalizat",
  "title": "Banner teren de vânzare cu numărul tău",
  "description": "Anunță vânzarea unui teren cu un titlu mare și o bandă galbenă pentru contact. Ilustrația parcelei ajută la recunoașterea anunțului. Textul „Nr. tău 07** *** ***” este un exemplu și se înlocuiește cu telefonul completat în configurator. Alege dimensiunea și materialul înainte de comandă.",
  "image": "/products/bannere-telefon/teren-de-vanzare-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon/teren-de-vanzare-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner teren de vanzare",
    "vand teren",
    "banner de vanzare cu telefon"
  ],
  "longDescription": "<p>Anunță vânzarea unui teren cu un titlu mare și o bandă galbenă pentru contact. Ilustrația parcelei ajută la recunoașterea anunțului.</p><p>Pe fotografie apare „Nr. tău 07** *** ***”, urmat de „Înlocuim cu numărul tău”. Completează telefonul care trebuie imprimat; asteriscurile nu reprezintă un număr de contact.</p><p>Dimensiuni disponibile în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Poți alege și o lățime personalizată; înălțimea se ajustează automat la raportul 2.5:1 pentru a păstra proporțiile modelului.</p><p>Alegi materialul, cantitatea și finisajele în configurator, iar prețul se calculează pentru opțiunile selectate. Păstrezi acest model și completezi telefonul, încarci propria machetă sau alegi grafică personalizată.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-spatiu-de-inchiriat-telefon-personalizat",
  "slug": "spatiu-de-inchiriat-telefon-personalizat",
  "title": "Banner spațiu de închiriat cu numărul tău",
  "description": "Prezintă un spațiu disponibil pentru închiriere. Modelul combină titlul alb pe fond verde petrol, o ilustrație de vitrină și o zonă portocalie pentru numărul de contact. Textul „Nr. tău 07** *** ***” este un exemplu și se înlocuiește cu telefonul completat în configurator. Alege dimensiunea și materialul înainte de comandă.",
  "image": "/products/bannere-telefon/spatiu-de-inchiriat-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon/spatiu-de-inchiriat-telefon-personalizat.webp"
  ],
  "category": "Imobiliare",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner spatiu de inchiriat",
    "spatiu comercial de inchiriat",
    "banner inchiriere cu telefon"
  ],
  "longDescription": "<p>Prezintă un spațiu disponibil pentru închiriere. Modelul combină titlul alb pe fond verde petrol, o ilustrație de vitrină și o zonă portocalie pentru numărul de contact.</p><p>Pe fotografie apare „Nr. tău 07** *** ***”, urmat de „Înlocuim cu numărul tău”. Completează telefonul care trebuie imprimat; asteriscurile nu reprezintă un număr de contact.</p><p>Dimensiuni disponibile în același configurator: 100 × 50, 150 × 75, 200 × 100, 250 × 125, 300 × 150 și 400 × 200 cm. Poți alege și o lățime personalizată; înălțimea se ajustează automat la raportul 2:1 pentru a păstra proporțiile modelului.</p><p>Alegi materialul, cantitatea și finisajele în configurator, iar prețul se calculează pentru opțiunile selectate. Păstrezi acest model și completezi telefonul, încarci propria machetă sau alegi grafică personalizată.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  "id": "banner-instalatii-electrice-telefon-personalizat",
  "slug": "instalatii-electrice-telefon-personalizat",
  "title": "Banner instalații electrice cu numărul tău",
  "description": "Promovează serviciile de instalații electrice cu un mesaj simplu și o zonă de contact vizibilă. Grafica folosește contrastul dintre antracit, alb și galben. Textul „Nr. tău 07** *** ***” este un exemplu și se înlocuiește cu telefonul completat în configurator. Alege dimensiunea și materialul înainte de comandă.",
  "image": "/products/bannere-telefon/instalatii-electrice-telefon-personalizat.webp",
  "images": [
    "/products/bannere-telefon/instalatii-electrice-telefon-personalizat.webp"
  ],
  "category": "Servicii",
  "tags": [
    "banner",
    "telefon personalizat",
    "banner electrician",
    "banner instalatii electrice",
    "electrician telefon",
    "banner servicii electrice"
  ],
  "longDescription": "<p>Promovează serviciile de instalații electrice cu un mesaj simplu și o zonă de contact vizibilă. Grafica folosește contrastul dintre antracit, alb și galben.</p><p>Pe fotografie apare „Nr. tău 07** *** ***”, urmat de „Înlocuim cu numărul tău”. Completează telefonul care trebuie imprimat; asteriscurile nu reprezintă un număr de contact.</p><p>Dimensiuni disponibile în același configurator: 125 × 50, 187.5 × 75, 250 × 100, 312.5 × 125, 375 × 150, 500 × 200 cm. Poți alege și o lățime personalizată; înălțimea se ajustează automat la raportul 2.5:1 pentru a păstra proporțiile modelului.</p><p>Alegi materialul, cantitatea și finisajele în configurator, iar prețul se calculează pentru opțiunile selectate. Păstrezi acest model și completezi telefonul, încarci propria machetă sau alegi grafică personalizată.</p>",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice
},
{
  id: "banner-model-aniversar",
  "slug": "banner-aniversar",
  "title": "Banner aniversar personalizat — model cu baloane",
  "description": "Păstrează grafica pentru banner aniversar personalizat — model cu baloane sau solicită adaptarea ei. Prețul se recalculează pentru opțiunile alese.",
  "image": "/products/modele-personalizate/banner-banner-aniversar-model-personalizat.webp",
  "price": calculateBannerPrice(stockBannerDefaultInput()).finalPrice,
  "category": "Evenimente",
  "tags": [
    "banner aniversar",
    "banner personalizat",
    "banner aniversare"
  ],
  "images": [
    "/products/modele-personalizate/banner-banner-aniversar-model-personalizat.webp"
  ]
},
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
            { question: "Cât de repede primesc bannerul?", answer: "Producem și livrăm în 2-4 zile lucrătoare, astfel încât să poți semnaliza rapid sediul vulcanizării tale." }
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
        image: "/products/grafica-originala/banner-publicitar-pvc-grafica-magazin.webp",
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
 ] satisfies BannerProduct[]).map(product => ({ ...product, image: getBannerExampleImage(`${product.title} ${product.slug}`, product.image) })).map(applyBannerProductAsset).map(product => ({ ...product, price: calculateBannerPrice(stockBannerDefaultInput(product.slug)).finalPrice }));

