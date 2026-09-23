import Script from 'next/script';
import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, Sofa, BedDouble, Briefcase, DoorOpen, Baby, Factory, ShieldCheck, Truck, MapPin, CheckCircle2, Phone, Ruler } from "lucide-react";
import { siteConfig } from '@/lib/siteConfig';
import { CONFIGURATORS_REGISTRY } from '@/lib/configurators-registry';
import PromoSection from '@/components/PromoSection';

export const metadata: Metadata = {
  authors: [{ name: 'Echipa HomePrint.ro', url: 'https://www.homeprint.ro' }],
  title: 'Fototapet, Canvas și Decor Printat pentru Casă și Birou | Preț Instant, Livrare 2-4 zile lucrătoare',
  description: 'HomePrint printează decor pentru casă și birou: fototapet personalizat, tablouri canvas, postere de artă, autocolante decorative de perete și plexiglas. Tot catalogul rămâne disponibil: bannere, roll-up, panouri rigide, textile, kituri fonduri UE. Preț instant, atelier propriu, livrare 2-4 zile lucrătoare.',
  keywords: ['fototapet personalizat', 'tablou canvas personalizat', 'postere de artă', 'autocolante decorative perete', 'decor birou', 'tapet foto living', 'canvas din poza ta', 'homeprint'],
  other: {
    "article:published_time": "2024-01-01T08:00:00+02:00",
    "article:modified_time": "2026-09-11T09:00:00+02:00"
  },
  alternates: {
    canonical: 'https://www.homeprint.ro',
  },
  openGraph: {
    title: 'HomePrint.ro — Decor printat pentru casă și birou',
    description: 'Fototapet, canvas, postere și autocolante de perete personalizate, cameră cu cameră. Preț instant în configurator, producție proprie.',
    url: 'https://www.homeprint.ro',
    siteName: 'HomePrint.ro',
    locale: 'ro_RO',
    type: 'website',
    images: [
      {
        url: '/products/tapet/tapet-1.jpg',
        width: 1200,
        height: 630,
        alt: 'HomePrint.ro - Fototapet personalizat montat într-un living',
      }
    ],
  },
};

const ROOMS = [
  {
    icon: Sofa,
    name: "Living",
    idea: "Perete de accent cu fototapet mat, în spatele canapelei sau al televizorului.",
    href: "/tapet",
    cta: "Fototapet",
    image: "/products/tapet/tapet-2.jpg",
    alt: "Fototapet personalizat pe peretele unui living",
  },
  {
    icon: BedDouble,
    name: "Dormitor",
    idea: "Un canvas mare deasupra patului sau un triptic cu aceeași poză tăiată în trei.",
    href: "/canvas",
    cta: "Canvas",
    image: "/products/canvas/canvas-1.jpg",
    alt: "Tablou canvas montat deasupra patului într-un dormitor",
  },
  {
    icon: Briefcase,
    name: "Birou",
    idea: "Logo decupat din vinil la recepție și grafică de perete în sala de ședințe.",
    href: "/autocolante",
    cta: "Autocolante",
    image: "/products/autocolante/autocolante-1.jpg",
    alt: "Autocolante decorative aplicate pe peretele unui birou",
  },
  {
    icon: DoorOpen,
    name: "Hol",
    idea: "Postere de artă pe hârtie foto, în rame simple, aliniate pe o singură linie.",
    href: "/afise",
    cta: "Postere",
    image: "/products/afise/afise-1.jpg",
    alt: "Postere de artă înrămate pe holul unei locuințe",
  },
  {
    icon: Baby,
    name: "Camera copilului",
    idea: "Tapet cu hartă, animale sau cer înstelat, pe un material mat, lavabil.",
    href: "/tapet",
    cta: "Fototapet",
    image: "/products/tapet/tapet-3.jpg",
    alt: "Fototapet cu ilustrații în camera unui copil",
  },
];

const MEASURE_STEPS = [
  {
    n: "1",
    title: "Măsoară lățimea și înălțimea peretelui",
    desc: "Cu ruleta, în cel puțin două locuri pe fiecare latură (pereții rar sunt perfect drepți). Notează valoarea cea mai mare. Nu scădea ferestrele și ușile: tapetul se decupează la montaj.",
  },
  {
    n: "2",
    title: "Adaugă 5 cm pe fiecare latură",
    desc: "Rezerva acoperă colțurile strâmbe și micile erori de tăiere. Un perete de 350 x 260 cm se comandă 360 x 270 cm. În configurator scrii direct dimensiunile finale, cu tot cu rezervă.",
  },
  {
    n: "3",
    title: "Alege materialul și încarcă poza",
    desc: "Tapet mat (se lipește cu adeziv de tapet, ideal pe pereți zugrăviți) sau adeziv (se dezlipește fără urme, bun pentru chirie și birouri). Vezi prețul pe loc și primești bunul de tipar pe e-mail.",
  },
];

const INTERIOR_MATERIALS = [
  {
    name: "Tapet mat, non-adeziv",
    use: "Living, dormitor, camera copilului",
    why: "Textură fină, fără reflexii, se lipește cu adeziv de tapet obișnuit. Ascunde micile denivelări și rezistă la ștergere cu o cârpă umedă.",
    href: "/tapet",
  },
  {
    name: "Tapet adeziv, repoziționabil",
    use: "Chirie, birouri, spații comerciale",
    why: "Are propriul strat de adeziv: se aplică pe pereți netezi și se dezlipește după ani fără să rămână urme sau să se ia vopseaua.",
    href: "/tapet",
  },
  {
    name: "Pânză polyester 360 g/mp pe șasiu",
    use: "Tablouri canvas, tripticuri",
    why: "Print latex cu culori stabile, întinsă pe șasiu de lemn de 2 cm, cu marginile printate în oglindă. Vine cu agățătoare montată.",
    href: "/canvas",
  },
  {
    name: "Hârtie foto 220 g și hârtie mată 150 g",
    use: "Postere de artă, afișe pentru birou",
    why: "Hârtia foto dă culori saturate și contrast pentru fotografii; cea mată e potrivită ilustrațiilor și textelor, fără reflexii în rame cu sticlă.",
    href: "/afise",
  },
  {
    name: "Vinil decupat sau printat",
    use: "Logo la recepție, citate, forme decorative",
    why: "Se aplică direct pe perete sau sticlă, fără găuri. Vinilul removabil se scoate fără urme; cel polimeric ține 3-5 ani și afară.",
    href: "/autocolante",
  },
  {
    name: "Plexiglas printat UV",
    use: "Panouri decorative, plăcuțe, splash-back",
    why: "Placă transparentă sau albă, printată pe spate pentru un efect de adâncime. Se montează pe distanțiere metalice sau se lipește.",
    href: "/materiale/plexiglass",
  },
];

const FAQ = [
  {
    q: "Cum se montează fototapetul și pot să îl pun singur?",
    a: "Da, pentru majoritatea pereților montajul se face în doi, într-o după-amiază. Tapetul mat se lipește cu adeziv de tapet aplicat pe perete, fâșie cu fâșie, de la stânga la dreapta, cu suprapunere de 1-2 cm pe care o tai apoi cu cutterul. Tapetul adeziv se aplică uscat, pe un perete curat și neted, dezlipind treptat folia de protecție. Trimitem cu fiecare comandă instrucțiuni pas cu pas, iar fâșiile sunt numerotate."
  },
  {
    q: "Ce rezoluție trebuie să aibă poza pentru tapet sau canvas?",
    a: "Pentru un perete întreg, o poză de minimum 4000 px pe latura lungă arată bine de la distanța normală de privit (1-2 m). Pentru un canvas de 60 x 90 cm sunt suficienți 2500 px. Verificăm manual fiecare fișier și îți spunem înainte de print dacă imaginea ar ieși pixelată; de multe ori o putem mări cu un algoritm de upscaling fără pierderi vizibile."
  },
  {
    q: "Ce dimensiuni pot comanda și ce fac dacă peretele e mai lat decât rola?",
    a: "Configuratorul de fototapet acceptă orice dimensiune, de la 50 cm până la pereți de 10 m lățime. Peste lățimea rolei (de regulă 100-130 cm) împărțim imaginea în fâșii verticale numerotate, cu suprapunere, astfel încât modelul să se continue exact. Canvasul se poate comanda de la 20 x 20 cm până la 150 x 300 cm pe un singur șasiu, sau ca triptic."
  },
  {
    q: "Pot returna un fototapet sau un canvas dacă nu îmi place?",
    a: "Produsele sunt printate la comandă, după imaginea și dimensiunile tale, așa că legal nu intră sub dreptul de retragere de 14 zile pentru bunuri personalizate. Ce garantăm în schimb: dacă produsul ajunge deteriorat, cu defecte de print sau cu alte dimensiuni decât cele comandate, îl refacem gratuit. Înainte de print primești un bun de tipar pe e-mail și poți cere modificări."
  },
  {
    q: "Cum îngrijesc tapetul și canvasul după montaj?",
    a: "Tapetul mat se șterge cu o cârpă moale, ușor umedă, fără detergenți abrazivi; nu freca zonele cu print intens. Canvasul se șterge doar uscat, cu o pensulă moale sau o cârpă din microfibră, și se ține departe de lumina directă a soarelui și de umezeala din baie. Cernelurile latex și UV pe care le folosim nu se decolorează vizibil în interior timp de mai mulți ani."
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ.map((f) => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }))
};

/** Produsele de decor apar primele în grilă; restul catalogului urmează, complet. */
const DECOR_FIRST = ['tapet', 'canvas', 'afise', 'autocolante', 'plexiglass'];

function startPrice(p: (typeof CONFIGURATORS_REGISTRY)[number]): string | null {
  const band = p.pricing?.bands?.[0]?.price;
  const base = p.pricing?.basePricePerSqm;
  const price = band ?? base;
  if (!price) return null;
  const unit = p.pricing?.type === 'per_sqm' ? 'lei/mp' : 'lei/buc';
  const value = price < 1 ? price.toFixed(2).replace('.', ',') : String(price);
  return `de la ${value} ${unit}`;
}

function productHref(p: (typeof CONFIGURATORS_REGISTRY)[number]): string {
  const raw = p.url || `/configurator/${p.slug}`;
  // /configurator/* face 308 către /*; trimitem direct la destinație.
  return raw.replace(/^\/configurator\//, '/');
}

export default function Home() {
  const products = [
    ...DECOR_FIRST.map((id) => CONFIGURATORS_REGISTRY.find((p) => p.id === id)).filter((p): p is (typeof CONFIGURATORS_REGISTRY)[number] => Boolean(p)),
    ...CONFIGURATORS_REGISTRY.filter((p) => !DECOR_FIRST.includes(p.id)),
  ];
  const phoneHref = `tel:${siteConfig.phone.replace(/\s+/g, '').replace(/^0/, '+40')}`;

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF6EF] text-stone-800 selection:bg-[#1F4D3A] selection:text-white">
      <Script
        id="home-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO: fotografie mare de cameră, promisiune scurtă */}
      <section className="relative">
        <div className="relative h-[70vh] min-h-[480px] max-h-[760px] w-full overflow-hidden">
          <Image
            src="/products/tapet/tapet-1.jpg"
            alt="Living cu fototapet personalizat pe peretele din spatele canapelei"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6EF] via-[#FAF6EF]/30 to-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl -mt-40 md:-mt-56 relative z-10 pb-12">
          <div className="max-w-3xl bg-white/95 backdrop-blur rounded-3xl border border-[#E4D9C8] shadow-[0_30px_60px_-30px_rgba(60,40,20,0.35)] p-7 md:p-12">
            <p className="text-[#1F4D3A] font-bold uppercase tracking-[0.18em] text-xs md:text-sm mb-4">Decor printat · atelier propriu</p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] text-stone-900 leading-[1.08] mb-5">
              Pereții tăi, cameră cu cameră.
            </h1>
            <p className="text-stone-600 text-lg md:text-xl leading-relaxed mb-7">
              Fototapet, tablouri canvas, postere de artă și autocolante de perete, printate după poza sau ideea ta.
              Pui dimensiunile peretelui, vezi prețul pe loc și primești comanda acasă în 2-4 zile lucrătoare.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/tapet" className="inline-flex items-center justify-center gap-2 bg-[#1F4D3A] text-white font-bold px-7 py-4 rounded-xl hover:bg-[#173B2C] transition-colors">
                Începe cu un fototapet <ArrowRight size={18} />
              </Link>
              <Link href="#camere" className="inline-flex items-center justify-center gap-2 bg-[#F3ECE1] text-stone-900 font-semibold px-7 py-4 rounded-xl border border-[#E4D9C8] hover:border-[#1F4D3A] transition-colors">
                Vezi idei pe camere
              </Link>
            </div>
            <p className="text-stone-500 text-sm mt-5">
              Ai nevoie de bannere, roll-up sau panouri rigide pentru firmă? <Link href="#produse" className="text-[#1F4D3A] font-bold underline underline-offset-4">Tot catalogul e mai jos</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* INSPIRAȚIE PE CAMERE */}
      <section id="camere" className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <p className="text-[#1F4D3A] font-bold uppercase tracking-[0.18em] text-xs md:text-sm mb-3">Inspirație pe camere</p>
              <h2 className="text-3xl md:text-4xl text-stone-900 tracking-tight">Pornește de la camera pe care vrei să o schimbi</h2>
            </div>
            <Link href="/stil" className="inline-flex items-center gap-2 text-[#1F4D3A] font-bold text-sm hover:gap-3 transition-all">
              Sau alege după stil <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
            {ROOMS.map((room, index) => (
              <Link
                key={room.name}
                href={room.href}
                className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-[#E4D9C8] hover:border-[#1F4D3A]/50 hover:shadow-[0_20px_40px_-24px_rgba(31,77,58,0.35)] transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <Image
                    src={room.image}
                    alt={room.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    loading={index < 2 ? undefined : "lazy"}
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <room.icon size={18} className="text-[#1F4D3A]" />
                    <h3 className="text-lg text-stone-900">{room.name}</h3>
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed flex-1">{room.idea}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[#B5563A] font-bold text-sm">
                    {room.cta} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CUM MĂSORI PERETELE */}
      <section className="bg-white border-y border-[#E4D9C8] py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-4">
              <p className="text-[#1F4D3A] font-bold uppercase tracking-[0.18em] text-xs md:text-sm mb-3">Ghid rapid</p>
              <h2 className="text-3xl md:text-4xl text-stone-900 tracking-tight mb-4">Cum măsori peretele pentru fototapet</h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                Trei pași, o ruletă și cinci minute. Dimensiunile intră direct în configurator, iar prețul se recalculează la fiecare centimetru.
              </p>
              <div className="inline-flex items-center gap-3 rounded-xl bg-[#FAF6EF] border border-[#E4D9C8] px-4 py-3 text-sm text-stone-700">
                <Ruler size={18} className="text-[#B5563A] shrink-0" />
                Exemplu: perete 350 x 260 cm → comanzi 360 x 270 cm
              </div>
            </div>
            <ol className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5">
              {MEASURE_STEPS.map((s) => (
                <li key={s.n} className="rounded-2xl bg-[#FAF6EF] border border-[#E4D9C8] p-6">
                  <div className="w-11 h-11 rounded-full bg-[#B5563A] text-white font-black text-lg flex items-center justify-center mb-4">{s.n}</div>
                  <h3 className="text-lg text-stone-900 leading-tight mb-2">{s.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CATALOG COMPLET */}
      <section id="produse" className="py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <p className="text-[#1F4D3A] font-bold uppercase tracking-[0.18em] text-xs md:text-sm mb-3">Tot catalogul, cu preț instant</p>
              <h2 className="text-3xl md:text-4xl text-stone-900 tracking-tight">Decor mai întâi, apoi tot ce printăm pentru firme</h2>
            </div>
            <Link href="/configuratoare" className="inline-flex items-center gap-2 text-[#1F4D3A] font-bold text-sm hover:gap-3 transition-all">
              Toate configuratoarele <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
            {products.map((p, index) => {
              const price = startPrice(p);
              const isDecor = DECOR_FIRST.includes(p.id);
              return (
                <Link
                  key={p.id}
                  href={productHref(p)}
                  className={`group flex flex-col rounded-2xl border bg-white p-3 md:p-4 transition-all hover:shadow-[0_20px_40px_-24px_rgba(31,77,58,0.35)] ${isDecor ? 'border-[#1F4D3A]/30 hover:border-[#1F4D3A]' : 'border-[#E4D9C8] hover:border-[#B5563A]/60'}`}
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF6EF]">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        loading="lazy"
                      />
                    ) : null}
                    {isDecor ? (
                      <span className="absolute top-2 left-2 bg-[#1F4D3A] text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">Decor</span>
                    ) : null}
                  </div>
                  <div className="pt-3 flex flex-col flex-1">
                    <h3 className="text-stone-900 font-bold text-sm md:text-base leading-tight group-hover:text-[#1F4D3A] transition-colors">{p.name}</h3>
                    <p className="text-stone-500 text-xs leading-snug mt-1.5 line-clamp-2 hidden md:block">{p.description}</p>
                    <div className="mt-auto pt-3 flex items-center justify-between gap-2">
                      {price ? <span className="text-[#B5563A] font-bold text-sm whitespace-nowrap">{price}</span> : <span className="text-stone-400 text-xs">preț în configurator</span>}
                      <span className="text-stone-400 text-[10px] uppercase tracking-wider hidden sm:inline">{p.turnaroundTime.replace(" lucrătoare", "")}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* MATERIALE PENTRU INTERIOR */}
      <section className="bg-white border-y border-[#E4D9C8] py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-2xl mb-10">
            <p className="text-[#1F4D3A] font-bold uppercase tracking-[0.18em] text-xs md:text-sm mb-3">Materiale pentru interior</p>
            <h2 className="text-3xl md:text-4xl text-stone-900 tracking-tight mb-4">Materialul se alege după cameră și după cât timp rămâne pe perete</h2>
            <p className="text-stone-600 leading-relaxed">
              În interior nu contează vântul sau ploaia, ci lumina, reflexiile și cât de ușor se scoate. Mai jos sunt materialele pe care le recomandăm la telefon, cu locul unde le-am folosi.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {INTERIOR_MATERIALS.map((m) => (
              <Link key={m.name} href={m.href} className="group rounded-2xl border border-[#E4D9C8] bg-[#FAF6EF] p-6 hover:border-[#1F4D3A]/50 transition-colors">
                <h3 className="text-lg text-stone-900 leading-tight mb-1 group-hover:text-[#1F4D3A] transition-colors">{m.name}</h3>
                <p className="text-[#B5563A] text-xs font-bold uppercase tracking-wider mb-3">{m.use}</p>
                <p className="text-stone-600 text-sm leading-relaxed">{m.why}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/material" className="inline-flex items-center gap-2 text-[#1F4D3A] font-bold text-sm hover:gap-3 transition-all">
              Ghidul complet de materiale, inclusiv cele de exterior <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <PromoSection />

      {/* ÎNCREDERE + LIVRARE LOCALĂ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="text-[#1F4D3A] font-bold uppercase tracking-[0.18em] text-xs md:text-sm mb-3">Cum lucrăm</p>
            <h2 className="text-3xl md:text-4xl text-stone-900 tracking-tight mb-8">Fără intermediari, fără surprize la livrare</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Factory, title: "Producție proprie", desc: "Print latex și UV în atelierul nostru, pe materialele pe care le-am ales și testat noi." },
                { icon: ShieldCheck, title: "Fișier verificat de un om", desc: "Un grafician verifică rezoluția, proporțiile și culorile și îți trimite bunul de tipar înainte de print." },
                { icon: Truck, title: "Livrare în 2-4 zile lucrătoare", desc: "Tapetul pleacă rulat în tub rigid, canvasul în colțare de carton. AWB și factură pe e-mail." },
              ].map((f) => (
                <li key={f.title} className="rounded-2xl bg-white border border-[#E4D9C8] p-5">
                  <div className="w-10 h-10 rounded-xl bg-[#1F4D3A]/10 text-[#1F4D3A] flex items-center justify-center mb-3">
                    <f.icon size={20} strokeWidth={2.2} />
                  </div>
                  <p className="text-stone-900 font-bold leading-tight mb-1">{f.title}</p>
                  <p className="text-stone-600 text-sm leading-snug">{f.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-[#E4D9C8] bg-[#1F4D3A] text-white p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <MapPin size={20} className="text-[#F3ECE1]" />
              <h2 className="text-xl">Livrăm acasă și la birou, în toată țara</h2>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Expediem prin curier din atelierul nostru din județul Buzău către orice oraș din România și către toate sectoarele Bucureștiului. Pentru proiecte cu mai multe camere sau birouri întregi, ne suni și programăm livrarea într-o singură tură.
            </p>
            <ul className="space-y-2 text-sm text-white/90 mb-5">
              <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#F3ECE1] shrink-0 mt-0.5" /> Plată cu cardul, transfer sau ramburs</li>
              <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#F3ECE1] shrink-0 mt-0.5" /> Factură pe persoană fizică sau firmă</li>
              <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#F3ECE1] shrink-0 mt-0.5" /> Designeri de interior: ofertă pe proiect, la cerere</li>
            </ul>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/judet" className="font-bold underline underline-offset-4 hover:text-[#F3ECE1]">Pe județe</Link>
              <span className="text-white/40">·</span>
              <Link href="/sectoare-bucuresti" className="font-bold underline underline-offset-4 hover:text-[#F3ECE1]">Sectoare București</Link>
              <span className="text-white/40">·</span>
              <Link href="/livrare" className="font-bold underline underline-offset-4 hover:text-[#F3ECE1]">Termene și costuri</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white border-t border-[#E4D9C8] py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-[#1F4D3A] font-bold uppercase tracking-[0.18em] text-xs md:text-sm mb-3">Întrebări frecvente</p>
          <h2 className="text-3xl md:text-4xl text-stone-900 tracking-tight mb-8">Ce ne întreabă clienții despre tapet și canvas</h2>
          <div className="divide-y divide-[#E4D9C8] border-y border-[#E4D9C8]">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-stone-900 font-bold">
                  <span>{f.q}</span>
                  <span className="text-[#B5563A] text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-stone-600 text-sm leading-relaxed mt-3 pr-8">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 md:px-8 py-12 md:py-20 !max-w-7xl">
        <div className="relative rounded-3xl overflow-hidden bg-[#F3ECE1] border border-[#E4D9C8] p-8 md:p-16 text-center">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-stone-900 tracking-tight mb-4 leading-tight">Ai dimensiunile peretelui? Ai și prețul.</h2>
            <p className="text-stone-600 mb-8">Fără cont și fără cerere de ofertă. Configurezi, vezi prețul, comanzi. Dacă ai o întrebare înainte, ne suni.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/tapet" className="inline-flex justify-center items-center gap-2 bg-[#1F4D3A] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#173B2C] transition-colors">
                Configurează un fototapet <ArrowRight size={18} />
              </Link>
              <Link href="/canvas" className="inline-flex justify-center items-center gap-2 bg-white text-stone-900 font-bold px-8 py-4 rounded-xl border border-[#E4D9C8] hover:border-[#1F4D3A] transition-colors">
                Vreau un canvas
              </Link>
              <a href={phoneHref} className="inline-flex justify-center items-center gap-2 text-stone-900 font-semibold px-6 py-4 rounded-xl hover:text-[#1F4D3A] transition-colors">
                <Phone size={16} /> {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="pb-6 text-center text-xs text-stone-500">
        <Truck size={14} className="inline mr-1 -mt-0.5" /> Livrare prin {siteConfig.shipping.provider} în toată România
      </div>
    </div>
  );
}
