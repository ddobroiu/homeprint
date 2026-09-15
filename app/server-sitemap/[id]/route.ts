import { LOCS_PER_SITEMAP } from '@/lib/seo/sitemapPaging';
import { getAllDimensionEntries, DIMENSION_URLS_PER_SITEMAP, DIMENSION_PRODUCT_IDS, dimensionUrl } from '@/lib/seo/dimensionPages';
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
const REAL_PRODUCT_KEYS = [
    'banner', 'banner-verso', 'mesh', 'afise', 'autocolante', 'canvas', 'tapet', 'rollup',
    'window-graphics', 'pliante', 'flayere', 'plexiglass', 'pvc-forex', 'alucobond',
    'fonduri-eu', 'polipropilena', 'carton', 'carti-vizita', 'tricouri', 'hanorace', 'sepci'
];

// Curated set of realistic, commonly-ordered dimensions (cm) - the same
// square/landscape/portrait/banner/A-series presets already shown as quick
// picks on the live configurator pages (see components/SeoDimensionLanding.tsx),
// instead of a brute-force every-5cm-from-20-to-500 mesh (~10,000 combos/product).
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

/**
 * Last meaningful content change for evergreen pages. Bump when the catalog or
 * copy actually changes. A per-request `new Date()` told Google every URL
 * changed today, every day, so it learned to ignore the field.
 */
const CONTENT_LASTMOD = '2026-09-11';

function generateUrlNode(url: string, priority: string, changefreq: string, lastmod: string = CONTENT_LASTMOD) {
    return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
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
            xml += generateUrlNode(`${BASE_URL}/blog/${post.slug}`, '0.7', 'weekly', post.date ? post.date.slice(0, 10) : CONTENT_LASTMOD);
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
        // Pagini de dimensiune: /dimensiuni/{produs}/{L}x{H}, una pentru fiecare
        // combinație din grila lib/seo/dimensionPages.ts. Indexul (app/sitemap.xml)
        // anunță câte părți există folosind aceeași constantă DIMENSION_URLS_PER_SITEMAP.
        const part = parseInt(id.replace('dimensions-', '')) || 0;
        const entries = getAllDimensionEntries();
        const startIdx = part * DIMENSION_URLS_PER_SITEMAP;
        const slice = entries.slice(startIdx, startIdx + DIMENSION_URLS_PER_SITEMAP);

        if (part === 0) {
            xml += generateUrlNode(`${BASE_URL}/dimensiuni`, '0.7', 'monthly');
            for (const pid of DIMENSION_PRODUCT_IDS) {
                xml += generateUrlNode(`${BASE_URL}/dimensiuni/${pid}`, '0.6', 'monthly');
            }
        }
        for (const e of slice) {
            xml += generateUrlNode(`${BASE_URL}${dimensionUrl(e.productId, e.w, e.h)}`, '0.5', 'monthly');
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

    } else {
        // TOATE localitățile județului, paginat: id-ul e "{judetIndex}-{pagePart}".
        //
        // Paginile de localitate sunt cele care aduc traficul organic, deci le
        // listăm pe toate (~13.300 din lib/seo/ro_localitati.json), încrucișate
        // cu configuratoarele reale. Indexul (app/sitemap.xml) anunță câte părți
        // are fiecare județ folosind aceeași constantă LOCS_PER_SITEMAP.
        //
        // Un id necunoscut (inclusiv vechiul "localities") dă un urlset valid,
        // dar gol, ca să nu erorizeze URL-urile de sitemap deja indexate.
        const [judetIndexStr, pagePartStr] = String(id ?? '').split('-');
        const judetIndex = parseInt(judetIndexStr);
        const pagePart = parseInt(pagePartStr || '0');
        const judet = Number.isInteger(judetIndex) ? JUDETE_FULL_DATA[judetIndex] : undefined;

        if (judet) {
            const startLocIndex = pagePart * LOCS_PER_SITEMAP;
            const localitiesSlice = judet.localitati.slice(
                startLocIndex,
                startLocIndex + LOCS_PER_SITEMAP
            );

            // Pagina județului o emitem o singură dată, nu în fiecare parte.
            if (pagePart === 0) {
                xml += generateUrlNode(`${BASE_URL}/judet/${judet.slug}`, '0.6', 'monthly');
            }

            for (const loc of localitiesSlice) {
                xml += generateUrlNode(`${BASE_URL}/judet/${judet.slug}/${loc.slug}`, '0.5', 'monthly');

                for (const cfg of CONFIGURATORS_REGISTRY) {
                    const cfgSlug = (cfg as any).slug || cfg.id;
                    xml += generateUrlNode(`${BASE_URL}/judet/${judet.slug}/${loc.slug}/${cfgSlug}`, '0.4', 'monthly');
                }
            }
        }
    }
    xml += `</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate'
        }
    });
}
