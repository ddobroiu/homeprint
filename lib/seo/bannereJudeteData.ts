import type { LandingInfo } from '../landingData';
import { pickVariant } from './contentVariants';

const JUDETE: [string, string][] = [
  ["bucuresti", "București"], ["alba", "Alba"], ["arad", "Arad"], ["arges", "Argeș"],
  ["bacau", "Bacău"], ["bihor", "Bihor"], ["bistrita-nasaud", "Bistrița-Năsăud"],
  ["botosani", "Botoșani"], ["brasov", "Brașov"], ["braila", "Brăila"], ["buzau", "Buzău"],
  ["caras-severin", "Caraș-Severin"], ["calarasi", "Călărași"], ["cluj", "Cluj"],
  ["constanta", "Constanța"], ["covasna", "Covasna"], ["dambovita", "Dâmbovița"],
  ["dolj", "Dolj"], ["galati", "Galați"], ["giurgiu", "Giurgiu"], ["gorj", "Gorj"],
  ["harghita", "Harghita"], ["hunedoara", "Hunedoara"], ["ialomita", "Ialomița"],
  ["iasi", "Iași"], ["ilfov", "Ilfov"], ["maramures", "Maramureș"], ["mehedinti", "Mehedinți"],
  ["mures", "Mureș"], ["neamt", "Neamț"], ["olt", "Olt"], ["prahova", "Prahova"],
  ["satu-mare", "Satu Mare"], ["salaj", "Sălaj"], ["sibiu", "Sibiu"], ["suceava", "Suceava"],
  ["teleorman", "Teleorman"], ["timis", "Timiș"], ["tulcea", "Tulcea"], ["vaslui", "Vaslui"],
  ["valcea", "Vâlcea"], ["vrancea", "Vrancea"],
];

const IMAGE = '/products/banner/banner-personalizat-acces-parcare-nu-blocati_6107382.jpg';

function buildBannerJudetEntry(slug: string, name: string): LandingInfo {
  const variants: Omit<LandingInfo, 'key' | 'images'>[] = [
    {
      title: `Bannere Personalizate în ${name} — Tipar & Comandă Online`,
      shortDescription: `Comandă bannere publicitare personalizate livrate direct în ${name}. Materiale durabile (Frontlit / Mesh), rezistente la exterior, grafică la cerere.`,
      seoTitle: `Print Bannere Personalizate ${name} | Reclamă Outdoor`,
      seoDescription: `Ai nevoie de un banner în ${name}? Printează bannerul tău publicitar cu livrare rapidă. Rezistență UV și de exterior. Prețuri de producător.`,
      contentHtml: `<h2>Producție Bannere Publicitare pentru locații din ${name}</h2><p>Indiferent dacă ai un eveniment, o campanie de vânzări sau vrei să semnalizezi o locație în <strong>${name}</strong>, bannerele noastre sunt soluția perfectă.</p><p>Materialele noastre sunt concepute pentru a rezista intemperiilor (vânt, soare și ploaie), folosind cerneală UV care nu se decolorează. Oferim atât bannere <em>frontlit</em> cât și bannere tip plasă (<em>mesh</em>) ideale pentru fațade.</p><ul><li>Dimensiuni configurabile (până la formaturi mari de fațadă)</li><li>Finisaje incluse: tiv perimetral de întărire, capse rezistente la rugină din 50 în 50 cm.</li><li>Livrare în ${name} în siguranță, roluit pe tub sau pliat inteligent, în funcție de format.</li></ul>`,
    },
    {
      title: `Banner Publicitar la Comandă — Livrare în ${name}`,
      shortDescription: `Configurator online pentru bannere personalizate, cu producție proprie și livrare rapidă în ${name}. Preț calculat instant.`,
      seoTitle: `Comandă Banner Online ${name} | Preț Instant, Fără Telefon`,
      seoDescription: `Configurezi dimensiunea, alegi materialul și vezi prețul final înainte de comandă. Producem și livrăm bannere direct în ${name}.`,
      contentHtml: `<h2>Configurator Online pentru Bannere — Zona ${name}</h2><p>Nu mai e nevoie de telefoane sau negocieri: alegi dimensiunea, materialul și opțiunile direct în configurator, iar prețul se actualizează instant.</p><p>Pentru comenzi din <strong>${name}</strong>, livrarea se face prin curier rapid, cu bannerul roluit sau pliat corespunzător formatului ales.</p><ul><li>Materiale Frontlit (interior/exterior) și Mesh (fațade mari, rezistent la vânt)</li><li>Tiv și capse incluse standard, fără costuri ascunse</li><li>Producție 24-48h din momentul confirmării graficii</li></ul>`,
    },
    {
      title: `Bannere Rezistente la Exterior pentru ${name}`,
      shortDescription: `Bannere publicitare cu rezistență UV, potrivite pentru evenimente, fațade și șantiere din ${name}. Comandă online, fără deplasare.`,
      seoTitle: `Banner Exterior Rezistent UV — Comandă din ${name}`,
      seoDescription: `Banner publicitar rezistent la soare, vânt și ploaie, livrat direct în ${name}. Alege dimensiunea și materialul potrivit pentru locația ta.`,
      contentHtml: `<h2>Bannere pentru Exterior — Comenzi din ${name}</h2><p>Un banner expus afară trebuie să reziste la intemperii luni de zile, nu doar să arate bine în prima săptămână. De aceea folosim cerneală UV și materiale calibrate pentru rezistență la exterior.</p><p>Livrăm în <strong>${name}</strong> atât bannere frontlit clasice, cât și variante mesh pentru fațade expuse la vânt puternic.</p><ul><li>Rezistență UV — culorile nu se decolorează în timp</li><li>Opțional: găuri pentru vânt pe formatele mari tip mesh</li><li>Finisaje standard: tiv de întărire și capse metalice</li></ul>`,
    },
    {
      title: `Print Banner Personalizat — ${name}, Producție Directă`,
      shortDescription: `Producție proprie de bannere, fără intermediari, cu livrare în ${name}. Alege între frontlit și mesh, în funcție de unde va fi expus bannerul.`,
      seoTitle: `Banner Personalizat ${name} — Producător Direct`,
      seoDescription: `Comandă bannerul direct de la producător, fără intermediari. Livrare rapidă în ${name}, preț de producător, calitate constantă.`,
      contentHtml: `<h2>Producător Direct de Bannere pentru ${name}</h2><p>Lucrezi direct cu producătorul, nu cu un intermediar care subcontractează print-ul altundeva — asta înseamnă control real asupra calității și a termenelor.</p><p>Pentru clienții din <strong>${name}</strong>, oferim atât bannere frontlit standard, cât și variante mesh pentru montaj pe schele sau fațade expuse la vânt.</p><ul><li>Preț de producător, fără marjă de intermediar</li><li>Grafică verificată manual înainte de print</li><li>Livrare directă prin curier, oriunde în ${name}</li></ul>`,
    },
    {
      title: `Banner Outdoor la Dimensiunea Ta — ${name}`,
      shortDescription: `Configurează bannerul exact la dimensiunea de care ai nevoie și primește-l rapid în ${name}. Materiale certificate pentru exterior.`,
      seoTitle: `Banner Outdoor pe Comandă — ${name}`,
      seoDescription: `Bannere outdoor la orice dimensiune, materiale certificate pentru exterior, livrare rapidă în ${name}. Configurezi și comanzi online.`,
      contentHtml: `<h2>Banner Outdoor Configurabil pentru ${name}</h2><p>Fiecare locație are nevoi diferite de dimensiune — de aceea configuratorul îți permite să introduci exact lățimea și înălțimea de care ai nevoie, nu doar formate standard.</p><p>Pentru <strong>${name}</strong>, livrăm rapid prin curier, cu bannerul pregătit pentru montaj imediat.</p><ul><li>Dimensiuni la milimetru, nu doar formate fixe</li><li>Materiale certificate pentru expunere îndelungată la exterior</li><li>Finisaje standard incluse: tiv și capse</li></ul>`,
    },
  ];

  const variant = variants[pickVariant(slug, variants.length)];
  return { key: slug, images: [IMAGE], ...variant };
}

export const BANNERE_JUDETE_DATA: Record<string, LandingInfo> = Object.fromEntries(
  JUDETE.map(([slug, name]) => [slug, buildBannerJudetEntry(slug, name)])
);
