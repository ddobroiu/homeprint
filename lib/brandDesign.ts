import { siteConfig } from "@/lib/siteConfig";

export const brandDesigns = {
  euprint: {
    name: "EuPrint", label: "Print pentru proiecte clare", eyebrow: "De la cerință la configurație",
    title: "Un proiect bine pregătit începe cu printul potrivit.",
    intro: "Panouri, materiale de informare și tipărituri pentru proiectul tău. Compară produsele, verifică dimensiunile și construiește comanda în configurator.",
    action: "Pregătește proiectul", hero: "fonduri-eu", focus: ["fonduri-eu", "pvc-forex", "alucobond", "banner"],
    catalogTitle: "Toate instrumentele pentru următorul proiect", catalogIntro: "De la un afiș la un set de materiale, fiecare produs are propriul configurator. Alege după utilizare, nu doar după nume.",
    storyTitle: "Ordine în detalii. Coerență în rezultat.", story: "Înainte de comandă, notează formatul, locul de utilizare și informațiile care trebuie să apară. Pentru materiale de proiect, verifică și cerințele beneficiarului sau ale programului de finanțare.",
    localTitle: "Print pentru proiectul tău, cu livrare în", localIntro: "Găsești aici produsele și punctele de pornire pentru o comandă destinată acestei localități. Cerințele proiectului rămân esențiale pentru alegerea materialului.",
    steps: [{ title: "Definește cerințele", text: "Alege produsul care corespunde utilizării și documentației proiectului." }, { title: "Completează configurația", text: "Verifică formatul, cantitatea și opțiunile disponibile înainte de a trimite grafica." }, { title: "Stabilește destinația", text: "Introdu datele de livrare și verifică rezumatul comenzii." }],
    guides: ["Formate și cantități", "Fișiere și informații obligatorii", "Produse pentru informare"],
  },
  shopprint: {
    name: "ShopPrint", label: "Catalogul tău de print", eyebrow: "Alege. Compară. Configurează.",
    title: "Tot printul de care ai nevoie. Într-un catalog ușor de ales.",
    intro: "Bannere, autocolante, tipărituri, textile și decor. Explorează gama completă, apoi ajustează dimensiunile și cantitățile în configuratorul produsului.",
    action: "Explorează catalogul", hero: "autocolante", focus: ["banner", "autocolante", "carti-vizita", "rollup"],
    catalogTitle: "Găsește produsul, apoi fă-l al tău", catalogIntro: "Un catalog complet, organizat pe utilizări. Fiecare card te duce direct la opțiunile produsului ales.",
    storyTitle: "Cumpărături mai simple, alegeri mai informate.", story: "Începe cu ce vrei să obții: vizibilitate în exterior, materiale pentru un eveniment sau un obiect personalizat. Compară formatele și pregătește fișierul pentru dimensiunea finală.",
    localTitle: "Catalog de print cu livrare în", localIntro: "Explorează gama disponibilă pentru comenzi cu destinația în această localitate. Produsele se configurează online; adresa de livrare se completează în comandă.",
    steps: [{ title: "Găsește în catalog", text: "Răsfoiește categoriile și deschide produsul de care ai nevoie." }, { title: "Alege opțiunile", text: "Compară variantele disponibile și verifică prețul configurației." }, { title: "Verifică și comandă", text: "Pregătește grafica, verifică datele și continuă spre comandă." }],
    guides: ["Compară produsele", "Pregătește grafica", "Alege destinația"],
  },
  prynt: {
    name: "Prynt", label: "Idei care ies din ecran", eyebrow: "Print pentru ideile tale",
    title: "Pune ideea pe tricou. Pe hârtie. În fața oamenilor.",
    intro: "Merch pentru echipe, tipărituri pentru evenimente și materiale pentru brandul tău. Alege suportul și transformă grafica într-o configurație gata de comandat.",
    action: "Dă formă ideii", hero: "tricouri", focus: ["tricouri", "hanorace", "carti-vizita", "flayere"],
    catalogTitle: "Un design. O mulțime de posibilități.", catalogIntro: "Textile, hârtie, autocolante sau formate mari: pornește de la suportul pe care vrei să îți vezi ideea.",
    storyTitle: "Gândește o colecție, nu doar un obiect.", story: "Același logo poate apărea pe un tricou, pe o carte de vizită sau pe un afiș. Pregătește variante ale graficii pentru fiecare format, ca textul și elementele importante să rămână lizibile.",
    localTitle: "Idei personalizate, livrate în", localIntro: "Pentru echipe, evenimente sau propria afacere: alege suportul, pregătește designul și configurează o comandă cu livrare în localitatea ta.",
    steps: [{ title: "Alege pe ce printezi", text: "Pornește de la un tricou, un material de promovare sau orice alt produs din gamă." }, { title: "Adaptează designul", text: "Pregătește grafica pentru formatul și opțiunile produsului ales." }, { title: "Dă-i o destinație", text: "Verifică selecția și completează datele pentru comandă și livrare." }],
    guides: ["Alege suportul ideii", "Fă designul lizibil", "Descoperă toate formatele"],
  },
  adbanner: {
    name: "AdBanner", label: "Formate pentru vizibilitate", eyebrow: "Vizibilitate, la dimensiunea potrivită",
    title: "Mesajul tău merită un format care se vede.",
    intro: "Bannere, mesh, roll-up și materiale pentru vitrine. Pornește de la spațiul de afișare și configurează suportul, dimensiunile și finisajele disponibile.",
    action: "Alege formatul", hero: "banner", focus: ["banner", "mesh", "rollup", "window-graphics"],
    catalogTitle: "Afișaj mare. Gamă completă.", catalogIntro: "Produse pentru comunicare vizuală și toate celelalte configuratoare, de la tipărituri la obiecte personalizate.",
    storyTitle: "Mai întâi spațiul. Apoi materialul.", story: "Măsoară locul de afișare și gândește distanța de la care se va citi mesajul. Tipul de suport și finisajele se aleg în funcție de utilizare și de modul de prindere.",
    localTitle: "Materiale pentru vizibilitate în", localIntro: "Pregătește afișajul pentru spațiul tău, cu comandă online și livrare la destinație. Dimensiunea și modul de montare ajută la alegerea suportului potrivit.",
    steps: [{ title: "Măsoară spațiul", text: "Stabilește formatul util și unde va fi folosit materialul." }, { title: "Configurează afișajul", text: "Alege suportul și finisajele disponibile pentru produs." }, { title: "Pregătește mesajul", text: "Verifică lizibilitatea graficii și datele comenzii înainte de finalizare." }],
    guides: ["Format și distanță de citire", "Rezoluție pentru suprafețe mari", "Suporturi și finisaje"],
  },
  homeprint: {
    name: "HomePrint", label: "Print care își găsește locul", eyebrow: "Un alt fel de a privi spațiul",
    title: "Un perete. O imagine. Un spațiu care te reprezintă.",
    intro: "Canvas, tapet și printuri pentru decor. Alege imaginea, gândește proporțiile și explorează opțiunile produsului înainte să îl aduci în spațiul tău.",
    action: "Găsește printul potrivit", hero: "tapet", focus: ["tapet", "canvas", "autocolante", "afise"],
    catalogTitle: "Pentru pereți, obiecte și ideile din jurul lor", catalogIntro: "Decorul este punctul de pornire. Catalogul complet rămâne la îndemână pentru orice alt proiect de print.",
    storyTitle: "Lasă proporțiile să conducă alegerea.", story: "Măsoară suprafața și păstrează în vedere mobilierul, lumina și spațiul liber. Verifică raportul imaginii înainte de a alege formatul: un decupaj potrivit poate schimba felul în care se vede fotografia.",
    localTitle: "Print pentru spațiul tău, livrat în", localIntro: "Explorează decorul și gama completă de produse, fără să schimbi locul din care comanzi. Alege formatul în funcție de suprafața pe care vrei să îl folosești.",
    steps: [{ title: "Imaginează locul", text: "Măsoară peretele sau suprafața și alege un produs potrivit spațiului." }, { title: "Potrivește imaginea", text: "Verifică proporțiile și rezoluția fotografiei pentru dimensiunea aleasă." }, { title: "Completează detaliile", text: "Revizuiește opțiunile produsului și adresa la care vrei să ajungă." }],
    guides: ["Proporțiile în decor", "Rezoluția fotografiei", "Materiale pentru spațiul tău"],
  },
  tablou: {
    name: "Tablou", label: "Imagini care rămân", eyebrow: "Din fotografie, în spațiul tău",
    title: "Dă fotografiei tale un loc dincolo de ecran.",
    intro: "Un peisaj, un portret sau o amintire. Explorează printul pe canvas și celelalte suporturi, apoi alege dimensiunea care pune imaginea în valoare.",
    action: "Începe cu imaginea ta", hero: "canvas", focus: ["canvas", "afise", "tapet", "plexiglass"],
    catalogTitle: "Alege cum vrei să se vadă", catalogIntro: "Canvas și alte formate pentru imagini, alături de toate produsele de print din catalog.",
    storyTitle: "O imagine bună începe cu un fișier potrivit.", story: "Folosește fotografia originală, nu o captură de ecran. Compară proporțiile ei cu formatul dorit și verifică rezoluția înainte de comandă, mai ales atunci când mărești imaginea.",
    localTitle: "Fotografii și printuri cu livrare în", localIntro: "Alege un suport pentru imaginea ta și configurează produsul online. Comanda poate avea ca destinație propria adresă sau adresa la care vrei să ajungă printul.",
    steps: [{ title: "Alege fotografia", text: "Pornește de la fișierul original și o imagine pe care vrei să o păstrezi." }, { title: "Găsește proporția", text: "Compară formatele și verifică ce elemente rămân în imagine." }, { title: "Pregătește comanda", text: "Alege opțiunile disponibile și verifică destinația printului." }],
    guides: ["Fotografia originală", "Format și decupaj", "Canvas și alte suporturi"],
  },
} as const;

export type BrandKey = keyof typeof brandDesigns;
export const brandKey: BrandKey = siteConfig.url.includes("euprint") ? "euprint" : siteConfig.url.includes("shopprint") ? "shopprint" : siteConfig.url.includes("adbanner") ? "adbanner" : siteConfig.url.includes("homeprint") ? "homeprint" : siteConfig.url.includes("tablou") ? "tablou" : "prynt";
export const brandDesign = brandDesigns[brandKey];

const editorialByBrand = {
  euprint: { kicker: "Cerințele proiectului", title: "Ai documentația. Hai să alegem materialele.", text: "Trimite lista de produse, dimensiunile și cerințele de afișare. Dacă proiectul are un manual de identitate, include și regulile care trebuie respectate.", action: "Discută lista de materiale", stepsTitle: "De la cerințe la o comandă completă.", aiTitle: "Ce materiale îți cere proiectul?", aiText: "Pornește cu produsul și cantitatea din documentație. Asistentul te ajută să explorezi configuratoarele și formatele disponibile.", storyKicker: "Pregătirea documentației" },
  shopprint: { kicker: "Găsește în catalog", title: "Nu știi încă ce produs să alegi?", text: "Spune-ne unde vei folosi printul și ce format ai nevoie. Poți compara produsele în ghid sau ne poți scrie pentru clarificarea opțiunilor.", action: "Întreabă despre un produs", stepsTitle: "Găsește produsul. Alege opțiunile. Verifică selecția.", aiTitle: "Cauți un produs sau un preț?", aiText: "Scrie ce vrei să comanzi sau deschide formularul rapid: produs, dimensiuni și cantitate, într-un singur loc.", storyKicker: "Compară înainte de alegere" },
  prynt: { kicker: "Din design, în print", title: "Pe ce suport îți vezi ideea?", text: "Un logo pe textile, o grafică pe stickere sau un afiș pentru un eveniment: spune-ne ce pregătești și pe ce produse vrei să apară designul.", action: "Povestește-ne ideea", stepsTitle: "Alege suportul și pregătește-ți designul.", aiTitle: "Cu ce începe următoarea ta idee?", aiText: "Un tricou, un sticker, o tipăritură? Spune-i asistentului suportul, formatul și cantitatea pe care le ai în minte.", storyKicker: "Un design, mai multe suporturi" },
  adbanner: { kicker: "Planifică afișajul", title: "Unde trebuie să se vadă mesajul?", text: "Fațadă, vitrină sau stand: măsoară spațiul și spune-ne cum vrei să fixezi materialul. Aceste detalii ajută la alegerea suportului și a finisajelor.", action: "Discută despre afișaj", stepsTitle: "Măsoară. Configurează. Pregătește mesajul.", aiTitle: "Ce dimensiune are spațiul tău de afișare?", aiText: "Introdu produsul, lățimea, înălțimea și cantitatea. Poți explora opțiunile prin chat sau în formularul rapid.", storyKicker: "Înainte de montare" },
  homeprint: { kicker: "Gândește decorul", title: "Ce ai vrea să schimbi în spațiul tău?", text: "Începe cu suprafața pe care o ai și imaginea pe care vrei să o folosești. Notează măsurătorile și verifică proporțiile înainte de alegerea unui canvas sau tapet.", action: "Discută alegerea pentru decor", stepsTitle: "De la măsurători la imaginea potrivită spațiului.", aiTitle: "Un perete întreg sau un accent de decor?", aiText: "Spune-i asistentului ce produs ai în vedere și dimensiunile suprafeței. Pentru fotografie, poți verifica separat rezoluția în ghidul de fișiere.", storyKicker: "Privește spațiul în ansamblu" },
  tablou: { kicker: "Pregătește fotografia", title: "Ce imagine ai vrea să păstrezi la vedere?", text: "Alege fișierul original și gândește locul în care va sta printul. Dacă eziti între două formate, compară proporțiile lor cu cele ale fotografiei.", action: "Întreabă despre formatul imaginii", stepsTitle: "Fotografia ta, pregătită pentru un nou format.", aiTitle: "Ce format se potrivește fotografiei tale?", aiText: "Explorează produsul și dimensiunile împreună cu asistentul. Calculatorul de rezoluție rămâne la îndemână în ghidul de pregătire a fișierelor.", storyKicker: "Înainte să mărești imaginea" },
} as const;
export const brandEditorial = editorialByBrand[brandKey];
