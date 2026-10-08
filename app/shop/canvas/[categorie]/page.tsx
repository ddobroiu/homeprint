import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CanvasProductGrid from '@/components/CanvasProductGrid';
import { canvasProducts } from '@/lib/products/canvas-products';
import { CANVAS_CATEGORIES, CANVAS_CATEGORY_BY_SLUG, CANVAS_COLLECTION_HOME } from '@/lib/products/canvas-categories';

// Pagina unei categorii din colecția de tablouri canvas gata făcute (/shop/canvas/<slug>).
export const dynamic = 'force-dynamic';

const BASE_URL: string = "https://www.HomePrint.ro";
// Colecția e indexabilă doar pe tablou.net; pe celelalte site-uri categoriile rămân accesibile cu noindex,follow.
const COLLECTION_INDEXABLE = BASE_URL === CANVAS_COLLECTION_HOME;

type Props = { params: Promise<{ categorie: string }> };

function productsOf(key: string) {
    return canvasProducts
        .filter((p) => p.tags.includes(key))
        .sort((a, b) => Number(b.category === key) - Number(a.category === key))
        .map((p) => ({
            id: p.id, slug: p.slug, title: p.title, image: p.image, price: p.price, dimensions: p.dimensions,
            categories: p.categories, tags: p.tags, category: p.category, orientation: p.orientation,
        }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { categorie } = await params;
    const cat = CANVAS_CATEGORY_BY_SLUG[categorie];
    if (!cat) return { title: 'Categorie negăsită', robots: { index: false, follow: true } };
    return {
        title: cat.heading,
        description: cat.metaDescription,
        alternates: { canonical: `${BASE_URL}/shop/canvas/${cat.slug}` },
        robots: COLLECTION_INDEXABLE ? undefined : { index: false, follow: true },
        openGraph: { title: cat.heading, description: cat.metaDescription, url: `${BASE_URL}/shop/canvas/${cat.slug}`, type: 'website' },
    };
}

export default async function CanvasCategoryPage({ params }: Props) {
    const { categorie } = await params;
    const cat = CANVAS_CATEGORY_BY_SLUG[categorie];
    if (!cat) notFound();
    const products = productsOf(cat.key);
    if (products.length === 0) notFound();

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <section className="container mx-auto px-4">
                <nav className="text-sm text-slate-500 mb-4" aria-label="Breadcrumb">
                    <Link href="/shop" className="hover:underline">Produse</Link> / <Link href="/shop/canvas" className="hover:underline">Tablouri canvas</Link> / <span className="text-slate-700">{cat.label}</span>
                </nav>
                <div className="mb-10 max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">{cat.heading}</h1>
                    <p className="text-slate-600 mt-4 leading-relaxed">{cat.intro}</p>
                    <p className="text-slate-500 mt-3 text-sm">
                        {products.length} modele, imprimate la comandă pe pânză canvas întinsă pe șasiu din lemn; livrare în 2–4 zile lucrătoare.
                        {cat.customHref && (
                            <> Vrei unul cu fotografia ta? <Link href={cat.customHref} className="font-semibold text-emerald-700 hover:underline">Tablou canvas personalizat</Link>.</>
                        )}
                    </p>
                </div>

                <CanvasProductGrid products={products} />

                <nav className="mt-16" aria-labelledby="canvas-cats">
                    <h2 id="canvas-cats" className="text-lg font-bold text-slate-900 mb-3">Alte categorii de tablouri canvas</h2>
                    <ul className="flex flex-wrap gap-2">
                        {CANVAS_CATEGORIES.filter((c) => c.key !== cat.key).map((c) => (
                            <li key={c.key}>
                                <Link href={`/shop/canvas/${c.slug}`} className="inline-block rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 hover:border-emerald-600 hover:text-emerald-700">{c.heading}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </section>
        </div>
    );
}
