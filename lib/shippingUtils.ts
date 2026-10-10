import { declaredPackage } from './packageInfo';
import { isFaItem, onlyFaItems } from './femeia-antreprenor';
import { INTL_COUNTRIES, quoteInternationalShipping } from './intlShipping';

// Tipuri de împachetare
export type PackingType = 'rigid' | 'foldable' | 'rolled';

// Limite DPD International (Classic Road)
export const DPD_LIMITS = {
    MAX_WEIGHT_KG: 31.5,
    MAX_LENGTH_CM: 175,
    MAX_GIRTH_CM: 300 // Formula: Lungime + 2*(Lățime + Înălțime) <= 300cm
};

// Țările din formular: România + țările unde DPD ne livrează efectiv (verificate cu API-ul DPD,
// lista și tarifele în lib/intlShipping.ts).
export const DPD_COUNTRIES: { code: string; name: string }[] = [
    { code: 'RO', name: 'România' },
    ...INTL_COUNTRIES.map((c) => ({ code: c.code, name: c.name })),
];

interface ProductDimensions {
    width: number;  // cm
    height: number; // cm
    quantity: number;
    type: PackingType;
    materialDensity?: number;
}

interface ShippingResult {
    volumetricWeight: number;
    physicalWeight: number;
    billingWeight: number;
    packageDimensions: {
        length: number;
        width: number;
        height: number;
    };
    details: string;
}

const DENSITIES = {
    BANNER: 0.55,
    MESH: 0.45,
    CANVAS: 2.5,
    STICKER: 0.25,
    PAPER: 0.20,
    RIGID_LIGHT: 1.5,
    RIGID_HEAVY: 4.0,
};

/**
 * Încearcă să extragă dimensiunile (width, height) dintr-un item.
 * PRIORITIZEAZĂ extragerea din TITLU și OPȚIUNI pentru a suprascrie metadata incorectă.
 */
export function extractDimensions(item: any): { w: number, h: number } {
    let w = 0, h = 0;

    // 1. PRIMA DATĂ: Scanăm textul (Titlu + Opțiuni) pentru că este cel mai de încredere (ce vede clientul)
    const text = ((item.title || item.name || '') + ' ' + JSON.stringify(item.options || item.metadata || {})).toLowerCase();

    // Regex global: prinde numere (inclusiv zecimale) separate de x, X, *, ×
    const rx = /([0-9]+[.,]?[0-9]*)\s*([xX×*])\s*([0-9]+[.,]?[0-9]*)/gi;

    let match;
    let bestArea = 0;

    while ((match = rx.exec(text)) !== null) {
        const v1 = parseFloat(match[1].replace(',', '.'));
        const v2 = parseFloat(match[3].replace(',', '.'));

        // Filtru de plauzibilitate: >= 10cm pe latura pentru a evita confuzii (ex: "2 seturi", "1 bucata")
        if (v1 >= 10 && v2 >= 10) {
            const area = v1 * v2;
            // Păstrăm perechea cu cea mai mare arie (presupunând că asta e dimensiunea principală)
            if (area > bestArea) {
                bestArea = area;
                w = v1;
                h = v2;
            }
        }
    }

    // Dacă am găsit dimensiuni valide în text, le folosim pe acestea!
    if (w > 0 && h > 0) return { w, h };

    // 2. FALLBACK: Metadata explicit (doar dacă nu am găsit nimic în text)
    const meta = item.metadata || {};
    if (meta.width) w = parseFloat(String(meta.width));
    if (meta.height) h = parseFloat(String(meta.height));
    if (w > 0 && h > 0) return { w, h };

    // 3. FALLBACK: Proprietăți root (cel mai puțin de încredere, pot fi default-uri din DB)
    if (item.width) w = parseFloat(String(item.width));
    if (item.height) h = parseFloat(String(item.height));

    return { w, h };
}

export function calculateShippingParams(
    params: ProductDimensions,
    volumetricDivisor: number = 6000
): ShippingResult {
    const { width, height, quantity, type } = params;

    const L = Math.max(width, height);
    const l = Math.min(width, height);
    const areaSqm = (width * height) / 10000;

    let packL = 0, packW = 0, packH = 0;
    let density = params.materialDensity || 0.5;

    if (!params.materialDensity) {
        if (type === 'foldable') density = DENSITIES.BANNER;
        else if (type === 'rigid') density = DENSITIES.CANVAS;
        else density = DENSITIES.STICKER;
    }

    let packagingWeight = 0.3;
    if (type === 'rigid') packagingWeight = 0.5 * quantity;

    const physicalWeight = parseFloat(((areaSqm * density * quantity) + packagingWeight).toFixed(2));

    switch (type) {
        case 'rigid':
            packL = L + 5;
            packW = l + 5;
            packH = Math.max(3, 4 * quantity);
            break;

        case 'foldable':
            {
                const totalAreaSqm = areaSqm * quantity;
                packL = 40;
                packW = 30;
                packH = Math.max(5, Math.ceil(totalAreaSqm * 1.5));

                if (packH > 40) {
                    packL = 60;
                    packW = 40;
                    packH = Math.ceil(packH / 2);
                }
            }
            break;

        case 'rolled':
            packL = l + 10;
            packW = 10;
            packH = 10;
            if (packL < 30) packL = 30;

            if (quantity > 50) { packW = 20; packH = 20; }
            else if (quantity > 10) { packW = 15; packH = 15; }
            break;
    }

    const volume = packL * packW * packH;
    const volumetricWeight = parseFloat((volume / volumetricDivisor).toFixed(2));
    const billingWeight = Math.max(physicalWeight, volumetricWeight);

    return {
        volumetricWeight,
        physicalWeight,
        billingWeight,
        packageDimensions: { length: packL, width: packW, height: packH },
        details: `Colet ${type}: ${packL}x${packW}x${packH}cm | Vol: ${volumetricWeight}kg | Fiz: ${physicalWeight}kg`
    };
}

export function determinePackingType(productSlug: string, item: any = {}): PackingType {
    const s = String(productSlug).toLowerCase();
    const name = (item.title || item.name || '').toLowerCase();
    const opts = JSON.stringify(item.options || item.metadata || {}).toLowerCase();

    // CANVAS Logic
    if (s.includes('canvas') || s.includes('tablou') || name.includes('canvas')) {
        // Diferențiere Rigid (cu cadru) vs Rolled (doar print)
        if (s.includes('fara-rama') || s.includes('print-only') ||
            name.includes('fara rama') || name.includes('doar print') ||
            opts.includes('fara rama') || opts.includes('doar print') || opts.includes('fara sasiu')) {
            return 'rolled';
        }
        return 'rigid'; // Default Rigid
    }

    if (s.includes('banner') || s.includes('mesh') || s.includes('steag') || s.includes('panza')) {
        return 'foldable';
    }

    if (s.includes('rigid') || s.includes('panou') ||
        s.includes('bond') || s.includes('alucobond') || 
        s.includes('plexiglass') || s.includes('plexiglas') || 
        s.includes('forex') || s.includes('pvc') ||
        name.includes('plexiglas') || name.includes('plexiglass') || 
        name.includes('forex') || name.includes('alucobond') ||
        name.includes('bond') || name.includes('panou rigid')) {
        return 'rigid';
    }

    return 'rolled';
}

export function estimateDensity(productSlug: string): number {
    const s = String(productSlug).toLowerCase();
    if (s.includes('banner')) return DENSITIES.BANNER;
    if (s.includes('mesh')) return DENSITIES.MESH;
    if (s.includes('canvas')) return DENSITIES.CANVAS;
    if (s.includes('bond') || s.includes('alucobond')) return DENSITIES.RIGID_HEAVY;
    if (s.includes('pvc') || s.includes('forex')) return 2.0;
    if (s.includes('polipropilena')) return DENSITIES.RIGID_LIGHT;
    return DENSITIES.STICKER;
}


// --- CALCUL COST ---

export function getEstimatedShippingCost(countryCode: string | null | undefined, items: any[]): number {
    // Plăcuțele Femeia Antreprenor au transport gratuit; celelalte produse din coș își păstrează transportul.
    if (onlyFaItems(items)) return 0;
    items = items.filter(item => !isFaItem(item));
    let code = (countryCode || 'RO').toUpperCase().trim();
    if (code === 'ROMANIA') code = 'RO';

    // Check for large dimensions (> 100cm) ONLY for RIGID items
    const hasLargeRigidItem = items.some(item => {
        // colet declarat de produs (ex. panouri stradale): tariful mare doar dacă produsul îl cere
        const pkg = declaredPackage(item);
        if (pkg) return pkg.large;
        const { w, h } = extractDimensions(item);
        if (w > 100 || h > 100) {
            const slugOrId = item.slug || item.productId || item.name || item.title || '';
            const type = determinePackingType(slugOrId, item);
            return type === 'rigid';
        }
        return false;
    });

    if (code === 'RO') return hasLargeRigidItem ? 40 : 24;

    // Internațional: coletele reale ale coșului (lib/parcels.ts) × tariful DPD al țării + 10% (lib/intlShipping.ts).
    // Coșurile care nu se pot trimite automat (țară neservită / colet peste limite) sunt blocate în checkout
    // și la crearea comenzii (internationalShippingError).
    const quote = quoteInternationalShipping(code, items);
    return quote.ok ? quote.price : 0;
}

/** Eroarea de livrare internațională pentru coș (null = se poate livra automat; România = mereu null). */
export function internationalShippingError(countryCode: string | null | undefined, items: any[]): string | null {
    let code = (countryCode || 'RO').toUpperCase().trim();
    if (code === 'ROMANIA') code = 'RO';
    if (code === 'RO') return null;
    const rest = (items || []).filter((item) => !isFaItem(item));
    const quote = quoteInternationalShipping(code, rest);
    return quote.ok ? null : quote.error || 'Livrarea în țara aleasă nu este disponibilă.';
}

// --- VALIDARE LIMITE DPD (internațional) ---
// Coletele reale ale coșului față de limitele DPD internațional (31,5 kg, 175 cm, L+2(l+h) ≤ 300 cm)
// și țara aleasă; mesajul îi spune clientului că primește oferta de transport pe email.
export function validateDpdShipment(items: any[], countryCode?: string | null): { valid: boolean; error?: string; invalidItem?: any } {
    const error = internationalShippingError(countryCode || 'DE', items || []);
    return error ? { valid: false, error } : { valid: true };
}
