/**
 * Faptele de livrare și plată afișate pe paginile /judet/..., citite din regulile reale ale
 * site-ului (aceleași funcții ca în coș și în checkout), nu scrise de mână:
 *  - termen: lib/shipping.ts computeEtaByCounty (zile lucrătoare, ora limită)
 *  - transport: lib/shippingUtils.ts getEstimatedShippingCost + pragul de transport gratuit
 *  - plată: lib/paymentRules.ts (ramburs până la MAX_RAMBURS_LIMIT, fără textile)
 * Curierul (DPD, la adresă sau la locker / punct DPD) e cel din checkout (DpdPointPicker, AWB DPD).
 *
 * FIȘIER IDENTIC ÎN TOATE CELE 6 REPO-URI.
 */
import { computeEtaByCounty } from "@/lib/shipping";
import { getEstimatedShippingCost } from "@/lib/shippingUtils";
import { FREE_SHIPPING_THRESHOLD, MAX_RAMBURS_LIMIT } from "@/lib/paymentRules";

export type DeliveryFacts = {
    minDays: number;
    maxDays: number;
    /** Ora (0-23) de la care o comandă confirmată intră în lucru abia în ziua lucrătoare următoare. */
    cutoffHour: number | null;
    courier: string;
    standardShipping: number;
    /** Transportul pentru plăci rigide cu o latură peste 100 cm, dacă diferă de cel standard. */
    largeRigidShipping: number | null;
    freeShippingFrom: number;
    codAvailable: boolean;
    codMax: number;
};

let _facts: DeliveryFacts | null = null;

/** Prima oră la care data de expediere trece pe ziua următoare (luni, 5 ianuarie 2026). */
function probeCutoff(): number | null {
    for (let h = 0; h < 24; h++) {
        const now = new Date(2026, 0, 5, h, 0, 0);
        const eta = computeEtaByCounty("Cluj", "RO", now);
        if (eta.shipDate.getDate() !== now.getDate()) return h;
    }
    return null;
}

export function deliveryFacts(): DeliveryFacts {
    if (_facts) return _facts;
    const eta = computeEtaByCounty("Cluj", "RO", new Date(2026, 0, 5, 9, 0, 0));
    const standard = getEstimatedShippingCost("RO", [{ slug: "afise", title: "Afiș 30x42 cm", quantity: 1 }]);
    const large = getEstimatedShippingCost("RO", [{ slug: "pvc-forex", title: "Placă PVC forex 150x100 cm", quantity: 1 }]);
    _facts = {
        minDays: eta.transitMinDays,
        maxDays: eta.transitMaxDays,
        cutoffHour: probeCutoff(),
        courier: "DPD",
        standardShipping: standard,
        largeRigidShipping: large !== standard ? large : null,
        freeShippingFrom: FREE_SHIPPING_THRESHOLD,
        codAvailable: eta.codAvailable,
        codMax: MAX_RAMBURS_LIMIT,
    };
    return _facts;
}

export const lei = (n: number) => `${n.toLocaleString("ro-RO")} lei`;

/** „2–4 zile lucrătoare” */
export function deliveryDaysText(f: DeliveryFacts = deliveryFacts()): string {
    return f.minDays === f.maxDays ? `${f.maxDays} zile lucrătoare` : `${f.minDays}–${f.maxDays} zile lucrătoare`;
}

/** „24 lei (40 lei pentru plăci rigide mai mari de 100 cm); gratuit de la 500 lei” */
export function shippingCostText(f: DeliveryFacts = deliveryFacts()): string {
    const large = f.largeRigidShipping != null ? ` (${lei(f.largeRigidShipping)} pentru plăci rigide mai mari de 100 cm)` : "";
    return `${lei(f.standardShipping)}${large}; gratuit pentru comenzile de la ${lei(f.freeShippingFrom)}`;
}

export const TEXTILE_KEYS = ["tricouri", "hanorace", "sepci"];

export function paymentText(productKey?: string, f: DeliveryFacts = deliveryFacts()): string {
    const textile = productKey && TEXTILE_KEYS.includes(productKey);
    if (!f.codAvailable || textile) return "Cu cardul online sau prin ordin de plată (transfer bancar).";
    return `Cu cardul online, prin ordin de plată (transfer bancar) sau ramburs la curier, pentru comenzile de până la ${lei(f.codMax)}.`;
}
