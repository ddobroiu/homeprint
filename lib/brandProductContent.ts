import { brandKey } from "@/lib/brandDesign";
import { getLocalProductFacts } from "@/lib/seo/localProductFacts";

const guidance = {
  euprint: "Pentru un proiect cu cerințe definite, confruntă formatul și opțiunile produsului cu documentația pe care o ai. Informațiile obligatorii se verifică înainte de pregătirea graficii.",
  shopprint: "Compară variantele în configurator: materialul, formatul și cantitatea pot schimba alegerea. Prețul de pornire este un reper; selecția finală îți arată costul comenzii.",
  prynt: "Pornește de la designul tău și adaptează-l acestui suport. Verifică lizibilitatea textului și proporțiile graficii, mai ales dacă aceeași idee apare pe mai multe produse.",
  adbanner: "Gândește locul de utilizare înainte să alegi formatul. Pentru un mesaj vizual, dimensiunea elementelor și distanța de citire sunt la fel de importante ca suportul.",
  homeprint: "Așază alegerea în contextul spațiului tău: măsoară suprafața, verifică proporțiile și privește imaginea în formatul final înainte de a pregăti comanda.",
  tablou: "Dacă folosești o fotografie, păstrează fișierul original și verifică detaliile importante la dimensiunea dorită. Raportul dintre lățime și înălțime determină cum încape imaginea pe suport.",
} as const;

export function brandProductIntro(productName: string, ids: string[], locName: string): string {
  const facts = getLocalProductFacts(ids);
  return `${productName}, cu livrare în ${locName}. ${facts ? `${facts.facts.what} ` : "Configurează opțiunile disponibile pentru acest produs. "}${guidance[brandKey]}`;
}
