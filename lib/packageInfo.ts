// Coletul declarat explicit de produs (metadata.packageCm = [lungime, lățime, grosime pe bucată] în cm,
// metadata.packageKg = kg pe bucată, metadata.packageLarge = colet mare / greu). Îl pun în coș produsele
// a căror cutie nu se poate deduce din dimensiunea printului: steaguri beachflag cu tije și bază, X-banner,
// panouri stradale, calendare (lib/produseNoi/definitions.ts). Restul produselor nu au aceste câmpuri și
// folosesc calculul vechi din lib/shippingUtils.ts.

export type DeclaredPackage = {
    /** cutia pentru toată cantitatea, laturile crescător (cm) */
    box: [number, number, number];
    /** cea mai lungă latură a unei bucăți (cm) */
    lengthCm: number;
    /** greutatea totală (kg) */
    kg: number;
    /** greutatea unei bucăți (kg) */
    unitKg: number;
    /** colet mare / greu (tariful de colet mare în România) */
    large: boolean;
};

export function declaredPackage(item: any): DeclaredPackage | null {
    const m = item?.metadata || item?.options;
    if (!m || typeof m !== "object") return null;
    const cm = Array.isArray(m.packageCm) ? m.packageCm.map(Number) : null;
    const unitKg = Number(m.packageKg);
    if (!cm || cm.length !== 3 || cm.some((v: number) => !Number.isFinite(v) || v <= 0) || !Number.isFinite(unitKg) || unitKg <= 0) return null;
    const q = Math.max(1, Number(item.quantity || item.qty || 1));
    const [l, w, t] = cm as number[];
    // bucățile se pun una peste alta; când teancul ar ieși mai înalt decât lungimea unei bucăți,
    // îl împărțim în teancuri așezate unul lângă altul (cutie cât mai „cubică”)
    const height = t * q;
    const stacks = height > l ? Math.ceil(height / l) : 1;
    const cols = Math.ceil(Math.sqrt(stacks));
    const rows = Math.ceil(stacks / cols);
    const box = [l * cols, w * rows, Math.max(1, Math.ceil(height / stacks))].sort((a, b) => a - b) as [number, number, number];
    return { box, lengthCm: Math.max(l, w), kg: Math.round(unitKg * q * 100) / 100, unitKg, large: m.packageLarge === true };
}
