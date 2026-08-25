import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Server packages that should not be bundled
  serverExternalPackages: ['@react-pdf/renderer', 'puppeteer'],

  async redirects() {
    return [
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
        source: '/configurator/:path*',
        destination: '/:path*',
        permanent: true,
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
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
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
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.google-analytics.com *.googletagmanager.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; img-src 'self' blob: data: res.cloudinary.com images.unsplash.com poze.prynt.ro *.r2.dev shop.printcenter.ro www.printcenter.ro dotcomcanvas.de *.hotnews.ro hotnews.ro *.replicate.delivery replicate.delivery pbxt.replicate.delivery; font-src 'self' fonts.gstatic.com; connect-src 'self' *.google-analytics.com *.googletagmanager.com; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com;",
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