import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Pe GitHub Actions (3 nuclee) /banner-verso si /rollup depasesc uneori 60 s la generarea statica
  staticPageGenerationTimeout: 300,
  // Dev / build local în paralel cu alt agent: NEXT_DIST_DIR=.next-editor npm run dev
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  // Cache-ul ISR (paginile /judet/... și /dimensiuni/..., sute de mii de URL-uri) stă doar în memorie:
  // LRU limitat aici, nu pe disc (experimental.isrFlushToDisk=false). Serverul are 7,7 GB RAM și 40 GB disc.
  cacheMaxMemorySize: 64 * 1024 * 1024,
  // Datele pe județ citite cu fs de lib/seo/localityData.ts trebuie copiate în build-ul standalone.
  outputFileTracingIncludes: {
    '/**': ['./lib/seo/data/judete/*.json', './lib/seo/data/villageTowns.json', './data/local-content/**/*.json'],
  },
  // Server packages that should not be bundled
  serverExternalPackages: ['@react-pdf/renderer', 'puppeteer'],

  async redirects() {
    return [
      // Fosta pagină de schimb de linkuri către site-urile din rețea - eliminată.
      { source: '/parteneri', destination: '/', permanent: true },
      // Vechile pagini de dimensiune /banner/300x100 -> noile pagini /dimensiuni/...
      { source: '/banner/:size(\d{1,4}x\d{1,4})', destination: '/dimensiuni/banner/:size', permanent: true },
      { source: '/banner-verso/:size(\d{1,4}x\d{1,4})', destination: '/dimensiuni/banner-verso/:size', permanent: true },
      // Canonicalize non-www -> www
      {
        source: "/:path*",
        has: [{ type: "host", value: "homeprint.ro" }],
        destination: "https://www.homeprint.ro/:path*",
        permanent: true,
      },
      {
        source: '/product/materiale/:path*',
        destination: '/materiale/:path*',
        permanent: true,
      },
      {
        source: '/product/autocolante/:path*',
        destination: '/autocolante/:path*',
        permanent: true,
      },
      {
        source: '/product/banner/:path*',
        destination: '/banner/:path*',
        permanent: true,
      },
      {
        source: '/banner-product/:path*',
        destination: '/banner/:path*',
        permanent: true,
      },
      {
        source: '/configurator/autocolant',
        destination: '/autocolante',
        permanent: true,
      },
      {
        // Fără decor-foto-copil / personaj-propriu / canvas-8-martie / canvas-martisor / calendare / beachflag / x-banner / panou-stradal: există doar sub
        // /configurator/... (nu au pagină scurtă), altfel redirecționarea ducea la 404.
        source: '/configurator/:path((?!(?:decor-foto-copil|personaj-propriu|canvas-8-martie|canvas-martisor|calendare|beachflag|x-banner|panou-stradal)(?:/|$)).*)',
        destination: '/:path',
        permanent: true,
        // Designul din editorul online vine cu ?image=...: îl servim direct din
        // /configurator/... (ConfiguratorDispatcher citește w, h și image).
        // La fel linkurile de preț din chatul AI și din calculatorul rapid (au mereu ?q=cantitate):
        // configuratorul din /configurator/... citește dimensiunile/formatul/cantitatea din adresă,
        // deci arată exact prețul dat de chat (paginile scurte /afise, /canvas... nu citesc ?size= / ?q=).
        missing: [{ type: 'query', key: 'image' }, { type: 'query', key: 'q' }],
      },
      {
        source: '/product/canvas/:path*',
        destination: '/canvas/:path*',
        permanent: true,
      },
      {
        source: '/product/afise/:path*',
        destination: '/afise/:path*',
        permanent: true,
      },
      {
        source: '/product/tapet/:path*',
        destination: '/tapet/:path*',
        permanent: true,
      },
      {
        source: '/tapet/sustenabilitate',
        destination: '/tapet',
        permanent: true,
      },
      {
        source: '/tapet/montaj',
        destination: '/tapet',
        permanent: true,
      },
      {
        source: '/blog/ghid-comple-bannere-publicitare-outdoor',
        destination: '/blog/ghid-complet-bannere-publicitare-outdoor',
        permanent: true,
      },
      {
        source: '/tapet/instructiuni',
        destination: '/tapet',
        permanent: true,
      },
      // 05.10: categoriile modelelor gata facute nu au pagina proprie; lista lor e pe /shop (SearchProductShelf)
      { source: '/shop/pvc-forex', destination: '/shop#modele-pvc-petreceri', permanent: false },
      { source: '/shop/afise', destination: '/shop#modele-afise', permanent: false },
      { source: '/shop/autocolante', destination: '/shop#modele-autocolante', permanent: false },
      { source: '/shop/rollup', destination: '/shop#modele-rollup', permanent: false },
      // 05.10: produsul scos din catalog (proprietar); kiturile PNRR sunt in configurator
      { source: '/produse/panouri-si-semnalizare/panou-informativ-pnrr', destination: '/configurator/fonduri-pnrr', permanent: true },
    ];
  },

  // Configure for modern browsers (ES2020+)
  env: {
    BROWSERSLIST_ENV: 'modern',
  },

  // Production optimizations
  /*
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },
  */

  // Performance optimizations
  poweredByHeader: false,
  compress: true,

  // SWC compiler options for modern browsers
  // This tells Next.js to NOT transpile modern JS features
  experimental: {
    // cel mult 2 poze optimizate in paralel (implicit: cate nuclee are serverul)
    imgOptConcurrency: 2,
    isrFlushToDisk: false,
    /*
    serverActions: {
      bodySizeLimit: '10mb',
    },
    */

    // Modern JavaScript features for browsers that support them natively
    // esmExternals: true,

    // Optimize for modern browsers - reduces bundle size
    // optimizePackageImports: ['lucide-react', 'framer-motion'],

    // CSS optimizations - disabled to fix Turbopack build failure
    // optimizeCss: true,
    // cssChunking: 'strict',
  },

  /*
  // Turbopack configuration for modern browsers
  turbopack: {
    resolveAlias: {
      // Modern JavaScript targeting to eliminate polyfills
    },
  },
  */

  images: {
    // 05.10: containerul (1 GB) era oprit de OOM cand libvips codifica AVIF / latimi de 3840 px pentru zeci de poze
    // deodata (ex. /shop/bannere). Doar WebP, maxim 1920 px, rezultatele tinute 30 de zile.
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 2592000,
    remotePatterns: [
      { protocol: 'https', hostname: 'www.homeprint.ro', pathname: '/**' },
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'poze.prynt.ro', pathname: '/**' },
      { protocol: 'https', hostname: '*.r2.dev', pathname: '/**' },
      { protocol: 'https', hostname: 'shop.printcenter.ro', pathname: '/**' },
      { protocol: 'https', hostname: 'www.printcenter.ro', pathname: '/**' },
      { protocol: 'https', hostname: 'dotcomcanvas.de', pathname: '/**' },
      { protocol: 'http', hostname: 'dotcomcanvas.de', pathname: '/**' }
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' https://www.shopprint.ro 'unsafe-inline' 'unsafe-eval' ajax.googleapis.com *.google-analytics.com *.googletagmanager.com *.googleadservices.com *.googlesyndication.com *.doubleclick.net connect.facebook.net https://www.clarity.ms https://*.clarity.ms https://c.bing.com analytics.tiktok.com *.tiktok.com *.tiktokw.us; style-src 'self' 'unsafe-inline' fonts.googleapis.com; img-src 'self' blob: data: tile.openstreetmap.org *.tile.openstreetmap.org cdn.pixabay.com pixabay.com res.cloudinary.com images.unsplash.com poze.prynt.ro *.r2.dev shop.printcenter.ro www.printcenter.ro dotcomcanvas.de *.hotnews.ro hotnews.ro *.replicate.delivery replicate.delivery pbxt.replicate.delivery *.google-analytics.com *.googletagmanager.com *.googlesyndication.com *.googleadservices.com *.doubleclick.net *.google.com *.google.ro *.facebook.com https://www.clarity.ms https://*.clarity.ms https://c.bing.com analytics.tiktok.com *.tiktok.com *.tiktokw.us; font-src 'self' fonts.gstatic.com; connect-src 'self' https://www.shopprint.ro blob: data: fonts.googleapis.com fonts.gstatic.com *.google-analytics.com *.googletagmanager.com *.analytics.google.com *.googlesyndication.com *.googleadservices.com *.doubleclick.net *.google.com *.google.ro *.facebook.com connect.facebook.net https://www.clarity.ms https://*.clarity.ms https://c.bing.com analytics.tiktok.com *.tiktok.com *.tiktokw.us; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com *.doubleclick.net *.google.com *.facebook.com;",
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          }
        ],
      },
      {
        source: '/globals.css',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/css; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/css/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/css; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;