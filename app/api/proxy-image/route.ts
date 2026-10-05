import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy pentru imaginile din bibliotecile externe folosite în editorul online
 * și pentru pozele produselor din catalog (tablourile canvas din stoc le pun pe modelul 3D).
 * Le servește same-origin (trec de CSP și pot fi exportate fără probleme CORS).
 * Doar hosturi cunoscute, ca să nu fie un proxy deschis.
 */
export const runtime = 'nodejs';

const ALLOWED_HOSTS = [
    'pixabay.com',
    'cdn.pixabay.com',
    'res.cloudinary.com',
    'images.unsplash.com',
    // pozele produselor din catalog (fără ele, vederea 3D a tablourilor din stoc rămânea fără poza produsului)
    'pub-5e0f8c0a4c03499b92d64adf2a42dd22.r2.dev',
    'dotcomcanvas.de',
    'shop.printcenter.ro',
    'www.printcenter.ro',
];

function envHost(value: string | undefined): string | null {
    if (!value) return null;
    try { return new URL(value).hostname; } catch { return null; }
}

// Bucketul R2 al site-ului (unde ajung pozele încărcate), dacă e altul decât cel de mai sus
const EXTRA_HOSTS = [envHost(process.env.R2_PUBLIC_DOMAIN)].filter((h): h is string => !!h);

function hostAllowed(hostname: string): boolean {
    if (EXTRA_HOSTS.includes(hostname)) return true;
    return ALLOWED_HOSTS.some((h) => hostname === h || hostname.endsWith(`.${h}`));
}

export async function GET(request: NextRequest) {
    const raw = request.nextUrl.searchParams.get('url');
    if (!raw) return new NextResponse('Missing URL parameter', { status: 400 });

    let target: URL;
    try {
        target = new URL(raw);
    } catch {
        return new NextResponse('Invalid URL', { status: 400 });
    }
    // unele poze din catalog au link http:// — le cerem pe https
    if (target.protocol === 'http:') target.protocol = 'https:';
    if (target.protocol !== 'https:' || !hostAllowed(target.hostname)) {
        return new NextResponse('Host not allowed', { status: 403 });
    }

    try {
        const response = await fetch(target.toString(), {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EditorOnline/1.0)' },
            next: { revalidate: 86400 },
        });
        if (!response.ok) {
            return new NextResponse(`Failed to fetch image: ${response.statusText}`, { status: response.status });
        }
        const contentType = response.headers.get('content-type') || 'image/jpeg';
        if (!contentType.startsWith('image/')) {
            return new NextResponse('Not an image', { status: 415 });
        }
        const buffer = await response.arrayBuffer();
        return new NextResponse(buffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (error) {
        console.error('Proxy image error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
