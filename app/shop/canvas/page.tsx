import { Metadata } from 'next';
import Link from 'next/link';
import CanvasProductGrid from '@/components/CanvasProductGrid';
import { canvasProducts } from '@/lib/products/canvas-products';
import { CANVAS_CATEGORIES } from '@/lib/products/canvas-categories';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Tablouri canvas gata făcute – colecție de modele',
    description: 'Peste 2.000 de tablouri canvas gata făcute: abstracte, peisaje, animale, pop art, motivaționale și multe altele. Pânză pe șasiu din lemn, livrare 2–4 zile.',
    keywords: ['tablouri canvas', 'modele tablouri', 'decor perete canvas', 'tablouri living', 'tablouri pe pânză', 'tablouri sufragerie'],
    alternates: {
        canonical: '/shop/canvas',
    },
};

// Doar câmpurile de care are nevoie grila (descrierile lungi nu se trimit în pagină).
const getCanvasProducts = () =>
    canvasProducts.map((p) => ({
        id: p.id, slug: p.slug, title: p.title, image: p.image, price: p.price, dimensions: p.dimensions,
        categories: p.categories, tags: p.tags, category: p.category, orientation: p.orientation,
    }));

export default async function CanvasPage() {
    const products = getCanvasProducts();

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            {/* Products Grid */}
            <section id="products" className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                        Colecția de tablouri canvas
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">
                        {`Descoperă ${products.length} tablouri canvas gata făcute, imprimate la comandă pe pânză întinsă pe șasiu din lemn.`}
                    </p>
                </div>

                <nav className="mb-10" aria-label="Categorii de tablouri canvas">
                    <ul className="flex flex-wrap gap-2">
                        {CANVAS_CATEGORIES.map((c) => (
                            <li key={c.key}>
                                <Link href={`/shop/canvas/${c.slug}`} className="inline-block rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 hover:border-emerald-600 hover:text-emerald-700">{c.heading}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <CanvasProductGrid products={products} />
            </section>
        </div>
    );
}
