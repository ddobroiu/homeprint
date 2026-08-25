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

const IMAGE = '/products/canvas/canvas-1.webp';

function buildCanvasJudetEntry(slug: string, name: string): LandingInfo {
  const variants: Omit<LandingInfo, 'key' | 'images'>[] = [
    {
      title: `Tablou Canvas în ${name} — Personalizat & Livrare Rapidă`,
      shortDescription: `Comandă tablouri canvas personalizate cu livrare în ${name}. Calitate premium, șasiu lemn natural, print UV de înaltă rezoluție.`,
      seoTitle: `Tablou Canvas Personalizat ${name} | Cadouri Foto`,
      seoDescription: `Transformă pozele tale în tablouri canvas superbe cu livrare în ${name}. Prețuri de producător, execuție rapidă, materiale de top.`,
      contentHtml: `<h2>Tablouri Canvas Personalizate pentru clienții din ${name}</h2><p>Dacă ești din <strong>${name}</strong> și cauți un mod deosebit de a-ți decora pereții sau un cadou memorabil, tablourile noastre canvas sunt alegerea ideală.</p><p>Folosim pânză canvas de calitate superioară și șasiuri din lemn de brad uscat, asigurând o întindere perfectă și rezistență în timp. Tehnologia de imprimare UV garantează culori vii care nu se decolorează sub acțiunea luminii.</p><ul><li>Livrare rapidă prin curier în tot județul ${name}</li><li>Editor online simplu pentru încărcarea fotografiilor</li><li>Opțiuni de personalizare: alb-negru, colaj, triptic</li><li>Finisaj premium: margini îmbrăcate, agățătoare inclusă</li></ul>`,
    },
    {
      title: `Tablouri Canvas Personalizate — Comenzi din ${name}`,
      shortDescription: `Configurator online pentru tablouri canvas din poze proprii, cu livrare rapidă în ${name}. Alege dimensiunea și tipul de margine.`,
      seoTitle: `Canvas din Poza Ta — Comandă Online din ${name}`,
      seoDescription: `Încarci poza, alegi dimensiunea și marginea, iar noi producem și livrăm tabloul canvas direct în ${name}.`,
      contentHtml: `<h2>Configurator Canvas Online pentru ${name}</h2><p>Nu ai nevoie de nimic altceva decât o poză bună și câteva minute — restul se configurează online: dimensiune, tip de margine (albă, oglindă sau răsfrântă) și cantitate.</p><p>Pentru clienții din <strong>${name}</strong>, livrarea se face prin curier rapid, cu tabloul gata de agățat, șasiu de lemn inclus.</p><ul><li>Previzualizare reală înainte de comandă</li><li>Șasiu de lemn masiv inclus în preț</li><li>Producție 24-48h din momentul confirmării</li></ul>`,
    },
    {
      title: `Canvas Foto Personalizat, Livrat în ${name}`,
      shortDescription: `Tablou canvas din fotografia ta preferată, calitate de galerie, livrat rapid oriunde în ${name}. Ideal ca decor sau cadou.`,
      seoTitle: `Canvas Foto Calitate Galerie — Livrare ${name}`,
      seoDescription: `Tablou canvas la calitate de galerie, din poza ta, cu livrare rapidă în ${name}. Perfect pentru cadouri sau decor interior.`,
      contentHtml: `<h2>Canvas Foto la Calitate de Galerie pentru ${name}</h2><p>Un tablou canvas bun nu e doar o poză mărită — e vorba de rezoluție de print corectă, culori calibrate și un șasiu care nu se strâmbă în timp.</p><p>Livrăm în <strong>${name}</strong> tablouri gata de agățat, cu pânza întinsă corect pe șasiu de lemn natural.</p><ul><li>Print UV de înaltă rezoluție, culori fidele</li><li>Șasiu de lemn de brad, uscat corespunzător</li><li>Livrare prin curier, gata de expus la primire</li></ul>`,
    },
    {
      title: `Tablou Canvas Cadou Personalizat — ${name}`,
      shortDescription: `Un tablou canvas cu poza potrivită rămâne pe perete ani de zile. Comandă din ${name}, configurator simplu, livrare rapidă.`,
      seoTitle: `Canvas Personalizat ca Cadou — Comandă din ${name}`,
      seoDescription: `Cadou personalizat pentru orice ocazie: tablou canvas din poza aleasă de tine, livrat rapid în ${name}.`,
      contentHtml: `<h2>Canvas Personalizat ca Idee de Cadou — ${name}</h2><p>Un tablou canvas cu o poză aleasă cu grijă e genul de cadou care rămâne pe perete ani de zile, spre deosebire de multe alte cadouri de ocazie.</p><p>Pentru clienții din <strong>${name}</strong>, configuratorul îți arată exact cum va arăta tabloul înainte să comanzi, iar livrarea se face rapid prin curier.</p><ul><li>Previzualizare reală a decupării înainte de comandă</li><li>Mai multe dimensiuni disponibile, de la format mic la mare</li><li>Ambalare sigură pentru transport</li></ul>`,
    },
    {
      title: `Canvas pe Șasiu de Lemn — Comandă din ${name}`,
      shortDescription: `Tablou canvas clasic, pe șasiu de lemn masiv, gata de agățat direct pe perete. Livrare rapidă în ${name}.`,
      seoTitle: `Canvas pe Șasiu Lemn — Livrare Rapidă ${name}`,
      seoDescription: `Tablou canvas pe șasiu de lemn masiv, fără ramă suplimentară, livrat rapid în ${name}. Configurezi online în câteva minute.`,
      contentHtml: `<h2>Canvas Clasic pe Șasiu de Lemn pentru ${name}</h2><p>Varianta clasică de tablou canvas — pânza întinsă direct pe un șasiu de lemn masiv, fără ramă suplimentară, gata de agățat imediat ce ajunge la tine.</p><p>Livrăm în <strong>${name}</strong> la orice dimensiune, de la formate mici de birou până la piese mari pentru living.</p><ul><li>Șasiu de lemn masiv, rezistent în timp</li><li>Fără ramă suplimentară — aspect modern, minimalist</li><li>Agățătoare inclusă, gata de montat la livrare</li></ul>`,
    },
  ];

  const variant = variants[pickVariant(slug, variants.length)];
  return { key: slug, images: [IMAGE], ...variant };
}

export const CANVAS_JUDETE_DATA: Record<string, LandingInfo> = Object.fromEntries(
  JUDETE.map(([slug, name]) => [slug, buildCanvasJudetEntry(slug, name)])
);
