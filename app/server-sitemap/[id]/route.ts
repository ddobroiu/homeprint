import { bannerProducts } from '@/lib/products/banner-products';
import { signageProducts } from '@/lib/products/signage-products';
import canvasProductsRaw from '@/lib/products/canvas-products.json';
import { euFundsProducts } from '@/lib/products/eu-funds-products';
import { configuratorProducts } from '@/lib/products/configurator-products';
import { seoCampaignProducts } from '@/lib/products/seo-campaign-products';
import { getAllPosts } from '@/lib/blogPosts';
import { listAllLandingRoutes } from '@/lib/landingData';
import { JUDETE_FULL_DATA } from '@/lib/localitati';
import { CONFIGURATORS_REGISTRY } from '@/lib/configurators-registry';
import { getTargetLocalities } from '@/lib/seo/targetLocalities';

import { PRODUCT_INTENTS, INTENT_LABELS, MARKETING_INTENTS } from '@/lib/seo/intents';
import { MATERIALE_DATA } from '@/lib/seo/materialeData';
import { SERVICII_DATA } from '@/lib/seo/serviciiData';
import { REGLEMENTARI_DATA } from '@/lib/seo/reglementariData';
import { STILURI_DATA } from '@/lib/seo/stiluriData';
import { INDUSTRIE_DATA } from '@/lib/seo/industriiData';

// Real, site-native product/configurator keys (matches the WxH slug parser in
// app/configurator/[slug]/page.tsx) - used instead of the inflated SEO
// campaign product list (600+ generated keyword pages) for combinatoric
// sitemap sections like dimensions and județ x localitate x product.
/**
 * Products that actually have an `app/<product>/[...slug]/page.tsx` route, i.e.
 * the only ones where /<product>/<W>x<H> resolves. Keep in sync with the app dir.
 */
const DIMENSION_CAPABLE_PRODUCTS = ['banner', 'banner-verso'];

const REAL_PRODUCT_KEYS = [
    'banner', 'banner-verso', 'mesh', 'afise', 'autocolante', 'canvas', 'tapet', 'rollup',
    'window-graphics', 'pliante', 'flayere', 'plexiglass', 'pvc-forex', 'alucobond',
    'fonduri-eu', 'polipropilena', 'carton', 'carti-vizita', 'tricouri', 'hanorace', 'sepci'
];

// Curated set of realistic, commonly-ordered dimensions (cm) - the same
// square/landscape/portrait/banner/A-series presets already shown as quick
// picks on the live configurator pages (see components/SeoDimensionLanding.tsx),
// instead of a brute-force every-5cm-from-20-to-500 mesh (~10,000 combos/product).
const CURATED_DIMENSIONS: Array<{ w: number; h: number }> = [
    { w: 20, h: 20 }, { w: 30, h: 30 }, { w: 40, h: 40 }, { w: 50, h: 50 }, { w: 60, h: 60 }, { w: 100, h: 100 },
    { w: 70, h: 70 }, { w: 80, h: 80 }, { w: 90, h: 90 },
    { w: 30, h: 20 }, { w: 40, h: 30 }, { w: 60, h: 40 }, { w: 90, h: 60 }, { w: 120, h: 80 }, { w: 150, h: 100 },
    { w: 100, h: 70 },
    { w: 20, h: 30 }, { w: 30, h: 40 }, { w: 60, h: 90 }, { w: 70, h: 100 }, { w: 80, h: 120 }, { w: 100, h: 150 },
    { w: 200, h: 100 }, { w: 300, h: 100 }, { w: 400, h: 100 }, { w: 300, h: 150 }, { w: 500, h: 150 },
    { w: 200, h: 150 }, { w: 250, h: 150 }, { w: 300, h: 200 }, { w: 400, h: 200 }, { w: 500, h: 200 }, { w: 600, h: 150 },
    { w: 21, h: 30 }, { w: 30, h: 42 }, { w: 42, h: 60 }
];

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.homeprint.ro';

const ALL_PRODUCTS = [
    ...bannerProducts,
    ...signageProducts,
    ...(canvasProductsRaw as any[]),
    ...euFundsProducts,
    ...configuratorProducts,
    ...seoCampaignProducts
];

/**
 * Route segment each product family renders under, for products with no explicit
 * `routeSlug`: /canvas-product/<slug>, /banner-product/<slug>,
 * /semnalistica-product/<slug>, /programe-finantare/<slug>.
 */
const PRODUCT_ROUTE_PREFIX = new Map<string, string>([
    ...bannerProducts.map((p) => [p.id, 'banner-product'] as [string, string]),
    ...signageProducts.map((p) => [p.id, 'semnalistica-product'] as [string, string]),
    ...(canvasProductsRaw as any[]).map((p) => [p.id, 'canvas-product'] as [string, string]),
    ...euFundsProducts.map((p) => [p.id, 'programe-finantare'] as [string, string]),
]);

function generateUrlNode(url: string, priority: string, changefreq: string) {
    return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
}

export async function GET(request: Request, props: any) {
    const params = await (props.params instanceof Promise ? props.params : props.params);
    const id = params?.id;

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    if (id === 'main') {
        const staticRoutes = [
            '', '/shop', '/shop/bannere', '/shop/canvas', '/shop/semnalistica',
            '/shop/panouri-sticla', '/shop/fonduri-europene', '/configurator/banner', '/configurator/rollup',
            '/configurator/afise', '/configurator/autocolante', '/configurator/pliante', '/configurator/flayere',
            '/configurator/window-graphics', '/configurator/canvas', '/configurator/tapet',
            '/configurator/custom-glass', '/configurator/fonduri-eu', '/materiale/plexiglass', '/materiale/pvc-forex',
            '/contact', '/termeni', '/confidentialitate', '/livrare', '/politica-cookies', '/urmareste-comanda',
            '/anpc', '/litigii', '/judet', '/seap'
        ];

        for (const route of staticRoutes) {
            xml += generateUrlNode(`${BASE_URL}${route}`, route === '' ? '1.0' : '0.8', 'daily');
        }

        for (const product of ALL_PRODUCTS) {
            let pRoute = (product as any).routeSlug || (product as any).slug || product.id;
            // Only configurator/seo-campaign products carry a routeSlug. The rest expose
            // a bare slug, which is not a route on its own — each family renders under
            // its own segment, so prefix accordingly. Without this the sitemap lists
            // URLs that 404 (or merely redirect) instead of the real product pages.
            if (!(product as any).routeSlug) {
                const prefix = PRODUCT_ROUTE_PREFIX.get(product.id);
                if (prefix && !pRoute.startsWith(`${prefix}/`)) {
                    pRoute = `${prefix}/${pRoute}`;
                }
            }
            const normalizedPSlug = pRoute?.startsWith('/') ? pRoute.slice(1) : pRoute;
            xml += generateUrlNode(`${BASE_URL}/${normalizedPSlug}`, '0.9', 'weekly');
        }

        for (const post of getAllPosts()) {
            xml += generateUrlNode(`${BASE_URL}/blog/${post.slug}`, '0.7', 'weekly');
        }

        for (const route of listAllLandingRoutes()) {
            let path = '';
            if (route.category === 'bannere') path = `/bannere/${route.slug}`;
            else if (route.category === 'canvas') path = `/canvas/${route.slug}`;
            else path = `/shop/${route.category}/${route.slug}`;
            xml += generateUrlNode(`${BASE_URL}${path}`, '0.9', 'weekly');
        }

        for (const j of JUDETE_FULL_DATA) {
            xml += generateUrlNode(`${BASE_URL}/judet/${j.slug}`, '0.6', 'monthly');
        }

        const { INDUSTRIE_DATA } = await import('@/lib/seo/industriiData');
        xml += generateUrlNode(`${BASE_URL}/industrii`, '0.8', 'weekly');
        xml += generateUrlNode(`${BASE_URL}/sectoare-bucuresti`, '0.8', 'weekly');

        for (const ind of INDUSTRIE_DATA) {
            xml += generateUrlNode(`${BASE_URL}/industrii/${ind.slug}`, '0.8', 'weekly');
            for (const prod of ind.recommendedProducts) {
                xml += generateUrlNode(`${BASE_URL}/industrii/${ind.slug}/${prod}`, '0.7', 'weekly');
            }
        }

    } else if (id && id.startsWith('dimensions-')) {
        const part = parseInt(id.replace('dimensions-', ''));

        // Curated product x dimension combinations. Only these products have a
        // `[...slug]` route that renders a size page.
        // The rest have no dimension route at all, so every combo we used to emit
        // for them 404'd (verified live: /afise/100x100, /canvas/50x70 → 404).
        const allCombos: Array<{ pk: string; w: number; h: number }> = [];
        for (const pk of DIMENSION_CAPABLE_PRODUCTS) {
            for (const dim of CURATED_DIMENSIONS) {
                allCombos.push({ pk, w: dim.w, h: dim.h });
            }
        }

        const MAX_PER_PART = 45000;
        const startIdx = part * MAX_PER_PART;
        const endIdx = startIdx + MAX_PER_PART;
        const pageCombos = allCombos.slice(startIdx, endIdx);

        for (const combo of pageCombos) {
            // Real, working shape is /<product>/<W>x<H>. The old
            // /configurator/<product>-<W>x<H> form 308-redirected to a 404.
            xml += generateUrlNode(`${BASE_URL}/${combo.pk}/${combo.w}x${combo.h}`, '0.5', 'monthly');
        }

    } else if (id && id.startsWith('intents-')) {
        const part = parseInt(id.replace('intents-', ''));
        const allIntentsCombos = [];
        
        for (const [productId, intents] of Object.entries(PRODUCT_INTENTS)) {
            for (const intent of intents) {
                allIntentsCombos.push({ productId, intent });
            }
        }

        const MAX_PER_PART = 45000;
        const startIdx = part * MAX_PER_PART;
        const endIdx = startIdx + MAX_PER_PART;
        const pageCombos = allIntentsCombos.slice(startIdx, endIdx);

        for (const combo of pageCombos) {
            // Link the destination directly — /configurator/<x> 308-redirects to /<x>,
            // and sitemaps should list final URLs, not redirects.
            xml += generateUrlNode(`${BASE_URL}/${combo.productId}-${combo.intent}`, '0.7', 'monthly');
        }

    } else if (id === 'materiale') {
        xml += generateUrlNode(`${BASE_URL}/material`, '0.8', 'weekly');
        for (const mat of MATERIALE_DATA) {
            xml += generateUrlNode(`${BASE_URL}/material/${mat.slug}`, '0.7', 'weekly');
        }
    } else if (id === 'servicii') {
        xml += generateUrlNode(`${BASE_URL}/servicii`, '0.8', 'weekly');
        for (const srv of SERVICII_DATA) {
            xml += generateUrlNode(`${BASE_URL}/servicii/${srv.slug}`, '0.7', 'weekly');
        }
    } else if (id === 'norme') {
        xml += generateUrlNode(`${BASE_URL}/norme`, '0.8', 'weekly');
        for (const reg of REGLEMENTARI_DATA) {
            xml += generateUrlNode(`${BASE_URL}/norme/${reg.slug}`, '0.7', 'weekly');
        }
    } else if (id === 'stiluri') {
        xml += generateUrlNode(`${BASE_URL}/stil`, '0.8', 'weekly');
        for (const stl of STILURI_DATA) {
            xml += generateUrlNode(`${BASE_URL}/stil/${stl.slug}`, '0.7', 'weekly');
        }
    } else if (id && id.startsWith('recomandat-')) {
        const part = parseInt(id.replace('recomandat-', ''));
        const allRecomandat = [];
        const { configuratorProducts } = await import('@/lib/products/configurator-products');
        
        // Note: "/pentru-{x}" is dropped - app/recomandat/[productSlug]/[targetSlug]/page.tsx
        // strips the "pentru-" prefix before resolving content, so it is a
        // duplicate-content alias of "/{x}", not a distinct page.
        for (const prod of configuratorProducts) {
            const pSlug = prod.slug || prod.id;
            // Existing intents
            const intents = PRODUCT_INTENTS[prod.id] || [];
            for (const intent of intents) {
                allRecomandat.push(`/recomandat/${pSlug}/${intent}`);
            }
            // Marketing intents
            for (const m of MARKETING_INTENTS) {
                allRecomandat.push(`/recomandat/${pSlug}/${m}`);
            }
            // Industries
            for (const ind of INDUSTRIE_DATA) {
                allRecomandat.push(`/recomandat/${pSlug}/${ind.slug}`);
            }
        }

        const MAX_PER_PART = 45000;
        const startIdx = part * MAX_PER_PART;
        const endIdx = startIdx + MAX_PER_PART;
        const pageCombos = allRecomandat.slice(startIdx, endIdx);

        for (const path of pageCombos) {
            xml += generateUrlNode(`${BASE_URL}${path}`, '0.6', 'monthly');
        }

    } else if (id === 'localities') {
        // Curated județ x localitate x product sitemap: only the localities
        // matched in lib/seo/targetLocalities.ts (major municipii/orașe plus
        // every județ reședință - ~350-400 localities, not all ~13,300 in
        // ro_localitati.json), crossed with the real configurator catalog
        // (CONFIGURATORS_REGISTRY, ~20 products, not the 600+ SEO campaign
        // keyword list). "/personalizat" and "/ieftin" sub-variants are
        // dropped - one canonical page per locality x product.
        for (const { judet, loc } of getTargetLocalities()) {
            xml += generateUrlNode(`${BASE_URL}/judet/${judet.slug}/${loc.slug}`, '0.5', 'monthly');

            for (const cfg of CONFIGURATORS_REGISTRY) {
                const cfgSlug = (cfg as any).slug || cfg.id;
                xml += generateUrlNode(`${BASE_URL}/judet/${judet.slug}/${loc.slug}/${cfgSlug}`, '0.4', 'monthly');
            }
        }
    } else {
        // Legacy paginated "{judetIndex}-{pagePart}" id scheme, kept only so
        // previously indexed/cached sitemap URLs don't error. The județ x
        // localitate x product combinatorics now live under the single
        // /server-sitemap/localities sitemap above, so this intentionally
        // emits an empty (but valid) urlset rather than regenerating the old
        // full locality x campaign-product matrix.
    }

    xml += `</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate'
        }
    });
}
