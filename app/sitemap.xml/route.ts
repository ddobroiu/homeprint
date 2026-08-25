const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.homeprint.ro';

export async function GET() {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Main sitemap
    xml += `  <sitemap>\n    <loc>${BASE_URL}/server-sitemap/main</loc>\n  </sitemap>\n`;

    // JUDEȚ x LOCALITATE x PRODUCT sitemap - curated list of major
    // municipii/orașe plus every județ reședință (see lib/seo/targetLocalities.ts)
    // crossed with the real configurator catalog. Comfortably fits in one part.
    xml += `  <sitemap>\n    <loc>${BASE_URL}/server-sitemap/localities</loc>\n  </sitemap>\n`;

    // DIMENSIONS SITEMAP - curated product x standard-dimension combinations
    // (~500 URLs), fits in a single part.
    xml += `  <sitemap>\n    <loc>${BASE_URL}/server-sitemap/dimensions-0</loc>\n  </sitemap>\n`;

    // NEW SEO CLUSTERS SITEMAPS
    xml += `  <sitemap>\n    <loc>${BASE_URL}/server-sitemap/materiale</loc>\n  </sitemap>\n`;
    xml += `  <sitemap>\n    <loc>${BASE_URL}/server-sitemap/servicii</loc>\n  </sitemap>\n`;
    xml += `  <sitemap>\n    <loc>${BASE_URL}/server-sitemap/norme</loc>\n  </sitemap>\n`;
    xml += `  <sitemap>\n    <loc>${BASE_URL}/server-sitemap/stiluri</loc>\n  </sitemap>\n`;

    // RECOMANDAT SITEMAP (product x intent x industry combinations) - fits in one part.
    xml += `  <sitemap>\n    <loc>${BASE_URL}/server-sitemap/recomandat-0</loc>\n  </sitemap>\n`;

    // INTENTS SITEMAP (purpose-driven pages like de-vanzare, nunta, etc.) - fits in one part.
    xml += `  <sitemap>\n    <loc>${BASE_URL}/server-sitemap/intents-0</loc>\n  </sitemap>\n`;

    xml += `</sitemapindex>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate'
        }
    });
}
