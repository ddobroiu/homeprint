export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { listAllLandingRoutes, getLandingInfo, LANDING_CATALOG } from '@/lib/landingData';
import { requireAdmin } from '@/lib/apiAuth';

export async function GET(req: Request) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  try {
    const routes = listAllLandingRoutes();
    const sample = {
      pliante_plexiglass: getLandingInfo('pliante', 'plexiglass') ?? null,
      pliante_alucobond: getLandingInfo('pliante', 'alucobond') ?? null,
      top_alucobond_exists: !!(LANDING_CATALOG as any)['alucobond'],
      top_plexiglass_exists: !!(LANDING_CATALOG as any)['plexiglass'],
    };
    return NextResponse.json({ ok: true, routes, sample });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 });
  }
}
