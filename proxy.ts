import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { CANVAS_LEGACY_SLUGS } from './lib/products/canvas-legacy-slugs';

// Colecția canvas: slug-urile vechi (copiate din sursă) -> slug-urile noi în română, 301 permanent.
// Rulează doar pe /canvas-product/* (vezi matcher); pagina produsului are și ea o redirecționare de rezervă.
export function proxy(req: NextRequest) {
  const oldSlug = req.nextUrl.pathname.slice('/canvas-product/'.length).replace(/\/+$/, '').toLowerCase();
  const newSlug = CANVAS_LEGACY_SLUGS[oldSlug];
  if (newSlug) {
    const target = req.nextUrl.clone();
    target.pathname = `/canvas-product/${newSlug}`;
    return NextResponse.redirect(target, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/canvas-product/:path*'],
};
