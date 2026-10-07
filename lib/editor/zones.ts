// Zone speciale ale produselor, desenate ca ghidaje în editor și respectate de șabloane.
// Ex.: la roll-up, partea de jos intră în casetă (nu se vede), deci acolo nu se pune nimic important.

export type ProductZone = { bottomMm: number; label: string };

export const PRODUCT_ZONES: Record<string, ProductZone> = {
    rollup: { bottomMm: 150, label: "casetă roll-up · fără text (15 cm)" },
};

/** Zona de jos în care nu se pune text, mm (0 dacă produsul nu are). */
export function bottomNoGoMm(productId: string, hMm: number): number {
    const z = PRODUCT_ZONES[productId];
    return z ? Math.min(z.bottomMm, hMm * 0.2) : 0;
}
