// Protecție pentru rutele API interne (admin, cron, debug), după modelul din shopprint.
//  - admin: cookie-ul de sesiune „admin_auth” din panoul /admin (lib/adminSession.ts)
//  - cron: antetul „Authorization: Bearer $CRON_SECRET”, comparat în timp constant
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/adminSession';

function readCookie(req: Request, name: string): string | undefined {
    const raw = req.headers.get('cookie') || '';
    for (const part of raw.split(';')) {
        const i = part.indexOf('=');
        if (i < 0 || part.slice(0, i).trim() !== name) continue;
        const v = part.slice(i + 1).trim();
        try {
            return decodeURIComponent(v);
        } catch {
            return v;
        }
    }
    return undefined;
}

export function isAdminRequest(req: Request): boolean {
    return Boolean(verifyAdminSession(readCookie(req, 'admin_auth')));
}

export function cronAllowed(req: Request): boolean {
    const secret = process.env.CRON_SECRET;
    if (!secret) return false;
    const got = Buffer.from(req.headers.get('authorization') || '');
    const want = Buffer.from(`Bearer ${secret}`);
    return got.length === want.length && crypto.timingSafeEqual(got, want);
}

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

/** null = are voie; altfel răspunsul 401 de întors din rută. */
export function requireAdmin(req: Request): NextResponse | null {
    return isAdminRequest(req) ? null : unauthorized();
}

/** Cron de pe server (Bearer CRON_SECRET) sau adminul logat. */
export function requireCronOrAdmin(req: Request): NextResponse | null {
    return cronAllowed(req) || isAdminRequest(req) ? null : unauthorized();
}

let warnedNoMetaSecret = false;

/**
 * Semnătura webhook-ului Meta / WhatsApp: antetul „X-Hub-Signature-256: sha256=<HMAC(corp brut, META_APP_SECRET)>”.
 * Fără META_APP_SECRET setat, cererea e acceptată (ca până acum) și se scrie un avertisment o singură dată.
 */
export function verifyMetaSignature(rawBody: string, header: string | null): boolean {
    const secret = process.env.META_APP_SECRET;
    if (!secret) {
        if (!warnedNoMetaSecret) {
            warnedNoMetaSecret = true;
            console.warn('[whatsapp] META_APP_SECRET lipsește: semnătura webhook-ului NU este verificată');
        }
        return true;
    }
    if (!header || !header.startsWith('sha256=')) return false;
    const want = Buffer.from('sha256=' + crypto.createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex'));
    const got = Buffer.from(header);
    return got.length === want.length && crypto.timingSafeEqual(got, want);
}
