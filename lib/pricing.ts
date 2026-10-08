// lib/pricing.ts

// --- UTILS ---
export const roundMoney = (num: number) => Math.round(num * 100) / 100;
export const formatMoneyDisplay = (amount: number) =>
  new Intl.NumberFormat("ro-RO", { style: "currency", currency: "RON" }).format(amount);

/* =========================================================================
   REGULA DE PREȚ A PROPRIETARULUI (08.10.2026)
   Prețul nostru ≥ 2 × costul real. Firma NU e plătitoare de TVA, deci costul real = prețul PrintCenter fără TVA × 1,21.
   Costurile reale (fără TVA) vin din cele 263 de comenzi PrintCenter: _deploy/printcenter-preturi/preturi.json
   (copie în data/productie/printcenter-preturi.json). Transportul (DPD) și comisionul de card se plătesc separat
   de client sub pragul de transport gratuit; minimele de comandă de mai jos acoperă comenzile mici.
   Tabelele de mai jos sunt calibrate pe regula asta; comentariile „cost … → min …” arată de unde vine fiecare prag.
   ========================================================================= */
export const OWNER_PRICE_MULTIPLIER = 2;
export const SUPPLIER_VAT_FACTOR = 1.21;
/** Prețul minim (lei întregi, rotunjit în sus) pentru un cost PrintCenter fără TVA: 2 × cost × 1,21. */
export const minPriceForCost = (costExVat: number) =>
  Math.ceil(roundMoney(costExVat * SUPPLIER_VAT_FACTOR * OWNER_PRICE_MULTIPLIER));

/* =========================================================================
   HELPER NOU: UPSELL CALCULATOR (GENERIC)
   Detectează automat următorul prag de reducere pentru produse bazate pe benzi de preț/mp.
   ========================================================================= */
export type UpsellResult = {
  hasUpsell: boolean;
  requiredQty: number;
  discountPercent: number;
  newUnitPrice: number;
  totalSavings: number;
  message: string; // Mesaj gata formatat pentru AI / UI
} | null;

export const calculateUpsellGeneric = (
  currentTotalSqm: number,
  sqmPerUnit: number,
  currentQty: number,
  currentUnitPrice: number,
  bands: { max: number, price: number }[],
  basePriceCalculator: (qty: number) => { finalPrice: number }
): UpsellResult => {

  // 1. Identificăm banda curentă
  let currentBandIndex = -1;
  for (let i = 0; i < bands.length; i++) {
    if (currentTotalSqm <= bands[i].max) {
      currentBandIndex = i;
      break;
    }
  }

  // Dacă nu am găsit banda sau suntem deja în ultima (cea mai ieftină), nu există upsell
  if (currentBandIndex === -1 || currentBandIndex >= bands.length - 1) return null;

  // 2. Calculăm ținta pentru următorul prag
  const thresholdSqm = bands[currentBandIndex].max;
  // Adăugăm o mică marjă pentru a trece sigur în următoarea bandă
  const targetSqm = thresholdSqm + 0.001;

  const requiredQty = Math.ceil(targetSqm / sqmPerUnit);

  // Dacă cantitatea necesară este egală cu cea curentă (cazuri rare la dimensiuni mari), sărim
  if (requiredQty <= currentQty) return null;

  // 3. Simulăm prețul pentru noua cantitate
  const futurePriceData = basePriceCalculator(requiredQty);
  const futureUnitPrice = futurePriceData.finalPrice / requiredQty;

  // 4. Calculăm reducerea procentuală
  const discountPercent = Math.round(((currentUnitPrice - futureUnitPrice) / currentUnitPrice) * 100);

  // Ignorăm reducerile nesemnificative (< 2%)
  if (discountPercent < 2) return null;

  const totalSavings = (currentUnitPrice * requiredQty) - futurePriceData.finalPrice;

  return {
    hasUpsell: true,
    requiredQty,
    discountPercent,
    newUnitPrice: parseFloat(futureUnitPrice.toFixed(2)),
    totalSavings: parseFloat(totalSavings.toFixed(2)),
    message: `Sfat: Dacă mărești cantitatea la ${requiredQty} bucăți, prețul unitar scade cu ${discountPercent}%, ajungând la ${formatMoneyDisplay(futureUnitPrice)}/buc. Economie totală estimată: ${formatMoneyDisplay(totalSavings)}.`
  };
};

/* =========================================================================
   HELPER: UPSELL CALCULATOR PENTRU PRODUSE CU PRAGURI DE CANTITATE
   Pentru Flyer, Afișe, Pliante - unde prețul depinde direct de cantitate, nu de mp
   ========================================================================= */
export const calculateUpsellByQuantity = (
  currentQty: number,
  currentUnitPrice: number,
  tiers: { min: number, price: number }[],
  priceCalculator: (qty: number) => { finalPrice: number }
): UpsellResult => {
  if (!tiers || tiers.length === 0) return null;

  // 1. Găsim tier-ul curent
  let currentTierIndex = -1;
  for (let i = tiers.length - 1; i >= 0; i--) {
    if (currentQty >= tiers[i].min) {
      currentTierIndex = i;
      break;
    }
  }

  // Dacă suntem deja în ultimul tier (cel mai ieftin), nu există upsell
  if (currentTierIndex === -1 || currentTierIndex >= tiers.length - 1) return null;

  // 2. Următorul tier
  const nextTier = tiers[currentTierIndex + 1];
  const requiredQty = nextTier.min;

  // 3. Simulăm prețul pentru cantitatea următorului tier
  const futurePriceData = priceCalculator(requiredQty);
  const futureUnitPrice = futurePriceData.finalPrice / requiredQty;

  // 4. Calculăm reducerea procentuală
  const discountPercent = Math.round(((currentUnitPrice - futureUnitPrice) / currentUnitPrice) * 100);

  // Ignorăm reducerile nesemnificative (< 2%)
  if (discountPercent < 2) return null;

  const totalSavings = (currentUnitPrice * requiredQty) - futurePriceData.finalPrice;

  return {
    hasUpsell: true,
    requiredQty,
    discountPercent,
    newUnitPrice: parseFloat(futureUnitPrice.toFixed(2)),
    totalSavings: parseFloat(totalSavings.toFixed(2)),
    message: `Sfat: Dacă alegi ${requiredQty} bucăți, prețul unitar scade cu ${discountPercent}%, ajungând la ${formatMoneyDisplay(futureUnitPrice)}/buc. Economie totală estimată: ${formatMoneyDisplay(totalSavings)}.`
  };
};

// ==========================================
// GENERIC UPSELL FOR RIGID MATERIALS (Based on Surface Penalty)
// ==========================================
export const getRigidMaterialUpsell = (
  input: { width_cm: number; height_cm: number; quantity: number },
  priceCalculator: (qty: number) => { finalPrice: number }
): UpsellResult => {
  if (input.width_cm <= 0 || input.height_cm <= 0) return null;

  const priceData = priceCalculator(input.quantity);
  const sqmPerUnit = (input.width_cm / 100) * (input.height_cm / 100);
  const currentTotalSqm = sqmPerUnit * input.quantity;
  const currentUnitPrice = priceData.finalPrice / input.quantity;

  // Pragurile de penalizare standard
  const penaltyThresholds = [0.1, 0.2, 0.3, 0.4, 0.5];

  // Găsim primul prag care este mai mare decât suprafața curentă
  const nextThreshold = penaltyThresholds.find(t => t > currentTotalSqm);

  if (nextThreshold) {
    const targetQty = Math.ceil((nextThreshold + 0.001) / sqmPerUnit);

    // Verificăm să nu fie un salt exagerat de cantitate (opțional)
    if (targetQty > input.quantity) {
      const futurePriceData = priceCalculator(targetQty);
      const futureUnitPrice = futurePriceData.finalPrice / targetQty;

      const discountPercent = Math.round(((currentUnitPrice - futureUnitPrice) / currentUnitPrice) * 100);

      // Afișăm upsell doar dacă reducerea e semnificativă (>5%)
      if (discountPercent > 5) {
        const totalSavings = (currentUnitPrice * targetQty) - futurePriceData.finalPrice;
        return {
          hasUpsell: true,
          requiredQty: targetQty,
          discountPercent,
          newUnitPrice: parseFloat(futureUnitPrice.toFixed(2)),
          totalSavings: parseFloat(totalSavings.toFixed(2)),
          message: `Sfat: Treci la **${targetQty} buc** (total >${nextThreshold}mp) pentru a reduce prețul unitar cu **${discountPercent}%**!`
        };
      }
    }
  }

  return null;
};

// ==========================================
// 1. BANNER SIMPLU (FRONTLIT)
// ==========================================
export const BANNER_CONSTANTS = {
  PRICES: {
    // cost real Frontlit 440 (tiv și capse incluse): 26 lei/m² fără TVA → min 62,92 lei/m²; 510: 28 → 67,76 (×1,10);
    // mesh 26,17 → 63,33. Peste 5 m² nu mai coborâm sub 65 lei/m².
    bands: [
      { max: 1, price: 100 },
      { max: 5, price: 75 },
      { max: 20, price: 65 },
      { max: 50, price: 65 },
      { max: Infinity, price: 65 },
    ],
    multipliers: {
      frontlit_510: 1.10,
      hem_grommets: 1.10,
      wind_holes: 1.10,
    }
  },
  PRO_DESIGN_FEE: 50,
};

export type PriceInputBanner = {
  width_cm: number;
  height_cm: number;
  quantity: number;
  material: "frontlit_440" | "frontlit_510" | "mesh";
  banner_type?: "single" | "double";
  want_wind_holes: boolean;
  want_hem_and_grommets: boolean;
  designOption: "upload" | "pro" | "text_only" | "standard";
};

export const calculateBannerPrice = (input: PriceInputBanner) => {
  if (input.width_cm <= 0 || input.height_cm <= 0 || input.quantity <= 0) {
    return { finalPrice: 0, total_sqm: 0, pricePerSqm: 0 };
  }

  const sqm_per_unit = (input.width_cm / 100) * (input.height_cm / 100);
  const total_sqm = roundMoney(sqm_per_unit * input.quantity);

  // Base Price Band
  let basePrice = 35;
  const bands = input.banner_type === "double" 
    ? BANNER_VERSO_CONSTANTS.PRICES.bands 
    : BANNER_CONSTANTS.PRICES.bands;

  for (const band of bands) {
    if (total_sqm <= band.max) {
      basePrice = band.price;
      break;
    }
  }

  // Multipliers
  let multiplier = 1;
  if (input.material === "frontlit_510") multiplier *= BANNER_CONSTANTS.PRICES.multipliers.frontlit_510;
  // mesh: același preț de bază ca Frontlit 440 (fără suprataxă material)
  if (input.want_hem_and_grommets) multiplier *= BANNER_CONSTANTS.PRICES.multipliers.hem_grommets;
  if (input.want_wind_holes) multiplier *= BANNER_CONSTANTS.PRICES.multipliers.wind_holes;

  let pricePerSqm = roundMoney(basePrice * multiplier);

  // LOGICA PENALIZARE SUPRAFEȚE MICI
  if (total_sqm < 0.1) pricePerSqm *= 5;
  else if (total_sqm < 0.2) pricePerSqm *= 4;
  else if (total_sqm < 0.3) pricePerSqm *= 3;
  else if (total_sqm < 0.4) pricePerSqm *= 2;
  else if (total_sqm < 0.5) pricePerSqm *= 1.5;

  let finalPrice = roundMoney(total_sqm * pricePerSqm);

  // Design Fee
  if (input.designOption === "pro") {
    finalPrice += BANNER_CONSTANTS.PRO_DESIGN_FEE;
  }

  return { finalPrice: roundMoney(finalPrice), total_sqm: roundMoney(total_sqm), pricePerSqm };
};

// --- NEW FUNCTION: UPSELL FOR BANNER ---
export const getBannerUpsell = (input: PriceInputBanner): UpsellResult => {
  if (input.width_cm <= 0 || input.height_cm <= 0) return null;

  const priceData = calculateBannerPrice(input);
  const sqmPerUnit = (input.width_cm / 100) * (input.height_cm / 100);
  const currentTotalSqm = sqmPerUnit * input.quantity;
  const currentUnitPrice = priceData.finalPrice / input.quantity;

  return calculateUpsellGeneric(
    currentTotalSqm,
    sqmPerUnit,
    input.quantity,
    currentUnitPrice,
    BANNER_CONSTANTS.PRICES.bands,
    (newQty) => calculateBannerPrice({ ...input, quantity: newQty })
  );
};

// ==========================================
// 2. BANNER VERSO (BLOCKOUT)
// ==========================================
export const BANNER_VERSO_CONSTANTS = {
  PRICES: {
    // cost real blockout față-verso: 52,43 lei/m² (< 2 m²), 50,97 (2–5), 50,9 (> 5) fără TVA → min 126,9 / 123,4 / 123,2
    // lei/m²; tivul (×1,10) se aplică mereu, deci prețul efectiv e banda × 1,10.
    bands: [
      { max: 1, price: 150 },
      { max: 5, price: 120 },
      { max: 20, price: 115 },
      { max: 50, price: 115 },
      { max: Infinity, price: 115 },
    ],
    multipliers: {
      wind_holes: 1.10,
      hem_grommets: 1.10, // Implicit
    }
  },
  FEES: {
    PRO_SAME: 50, // Taxă Design Pro - Grafică Identică
    PRO_DIFF: 100, // Taxă Design Pro - Grafică Diferită
    DIFF_GRAPHICS: 100, // Taxă procesare grafică proprie diferită
  }
};

export type PriceInputBannerVerso = {
  width_cm: number;
  height_cm: number;
  quantity: number;
  want_wind_holes: boolean;
  same_graphic: boolean;
  designOption: "upload" | "pro" | "text_only";
};

export const calculateBannerVersoPrice = (input: PriceInputBannerVerso) => {
  if (input.width_cm <= 0 || input.height_cm <= 0 || input.quantity <= 0) {
    return { finalPrice: 0, total_sqm: 0, pricePerSqm: 0, proFee: 0, diffFee: 0 };
  }

  const sqm_per_unit = (input.width_cm / 100) * (input.height_cm / 100);
  const total_sqm = roundMoney(sqm_per_unit * input.quantity);

  let basePrice = BANNER_VERSO_CONSTANTS.PRICES.bands[BANNER_VERSO_CONSTANTS.PRICES.bands.length - 1].price;
  for (const band of BANNER_VERSO_CONSTANTS.PRICES.bands) {
    if (total_sqm <= band.max) {
      basePrice = band.price;
      break;
    }
  }

  let multiplier = 1.0;
  multiplier *= BANNER_VERSO_CONSTANTS.PRICES.multipliers.hem_grommets;
  if (input.want_wind_holes) multiplier *= BANNER_VERSO_CONSTANTS.PRICES.multipliers.wind_holes;

  let pricePerSqm = roundMoney(basePrice * multiplier);

  if (total_sqm < 0.1) pricePerSqm *= 5;
  else if (total_sqm < 0.2) pricePerSqm *= 4;
  else if (total_sqm < 0.3) pricePerSqm *= 3;
  else if (total_sqm < 0.4) pricePerSqm *= 2;
  else if (total_sqm < 0.5) pricePerSqm *= 1.5;

  let finalPrice = roundMoney(total_sqm * pricePerSqm);

  let proFee = 0;
  let diffFee = 0;

  if (input.designOption === "pro") {
    proFee = input.same_graphic ? BANNER_VERSO_CONSTANTS.FEES.PRO_SAME : BANNER_VERSO_CONSTANTS.FEES.PRO_DIFF;
    finalPrice += proFee;
  }

  return { finalPrice: roundMoney(finalPrice), total_sqm: roundMoney(total_sqm), pricePerSqm, proFee, diffFee };
};

// --- NEW FUNCTION: UPSELL FOR BANNER VERSO ---
export const getBannerVersoUpsell = (input: PriceInputBannerVerso): UpsellResult => {
  if (input.width_cm <= 0 || input.height_cm <= 0) return null;

  const priceData = calculateBannerVersoPrice(input);
  const sqmPerUnit = (input.width_cm / 100) * (input.height_cm / 100);
  const currentTotalSqm = sqmPerUnit * input.quantity;
  const currentUnitPrice = priceData.finalPrice / input.quantity;

  return calculateUpsellGeneric(
    currentTotalSqm,
    sqmPerUnit,
    input.quantity,
    currentUnitPrice,
    BANNER_VERSO_CONSTANTS.PRICES.bands,
    (newQty) => calculateBannerVersoPrice({ ...input, quantity: newQty })
  );
};


// ==========================================
// 3. POLIPROPILENA (AKYPLAC)
// ==========================================
export const POLIPROPILENA_CONSTANTS = {
  LIMITS: { MAX_WIDTH: 200, MAX_HEIGHT: 300 },
  // 3 mm: cost real 86,71 lei/m² (< 1 m²) / 62,4 (≥ 1 m²) fără TVA → min 209,8 lei/m². 4 și 5 mm: fără comenzi
  // reale, urcate în aceeași proporție ca să rămână mai scumpe decât 3 mm.
  PRICES: { 3: 210, 4: 230, 5: 250 } as Record<number, number>,
  GRAMAJ: { 3: 450, 4: 750, 5: 1050 } as Record<number, number>,
  AVAILABLE_THICKNESS: [3, 4, 5],
  PRO_DESIGN_FEE: 50,
};

export type PriceInputPolipropilena = {
  width_cm: number;
  height_cm: number;
  quantity: number;
  thickness_mm: number;
  designOption: "upload" | "pro" | "text_only";
};

export const calculatePolipropilenaPrice = (input: PriceInputPolipropilena) => {
  if (input.width_cm <= 0 || input.height_cm <= 0 || input.quantity <= 0) {
    return { finalPrice: 0, total_sqm: 0, pricePerUnit: 0 };
  }

  const sqmPerUnit = (input.width_cm / 100) * (input.height_cm / 100);
  const totalSqm = roundMoney(sqmPerUnit * input.quantity);

  let pricePerSqm = POLIPROPILENA_CONSTANTS.PRICES[input.thickness_mm] ?? 200;

  if (totalSqm < 0.1) pricePerSqm *= 5;
  else if (totalSqm < 0.2) pricePerSqm *= 4;
  else if (totalSqm < 0.3) pricePerSqm *= 3;
  else if (totalSqm < 0.4) pricePerSqm *= 2;
  else if (totalSqm < 0.5) pricePerSqm *= 1.5;

  let finalPrice = roundMoney(totalSqm * pricePerSqm);

  if (input.designOption === "pro") {
    finalPrice += POLIPROPILENA_CONSTANTS.PRO_DESIGN_FEE;
  }

  const pricePerUnit = roundMoney(finalPrice / input.quantity);
  return { finalPrice: roundMoney(finalPrice), total_sqm: totalSqm, pricePerUnit };
};

export const getPolipropilenaUpsell = (input: PriceInputPolipropilena) =>
  getRigidMaterialUpsell(input, (qty) => calculatePolipropilenaPrice({ ...input, quantity: qty }));

// ==========================================
// 4. PVC FOREX
// ==========================================
export const PVC_FOREX_CONSTANTS = {
  CONTOUR_CUT_RATE: 0.20,
  LIMITS: { MAX_WIDTH: 200, MAX_HEIGHT: 300 },
  // Cost real fără TVA: 1 mm 61,2 lei/m² → min 148,1; 3 mm 95,2 (0,1–0,25 m²) / 91,91 (0,25–5) / 83,95 (> 5) → min 230,4;
  // 5 mm 122,28 (< 2 m²) → min 295,9. Grosimile fără comenzi reale (2, 4, 6, 8, 10 mm) urcate în aceeași proporție.
  PRICES: {
    1: 155, 2: 195, 3: 235, 4: 275, 5: 315, 6: 355, 8: 390, 10: 520,
  } as Record<number, number>,
  /** Modelele de stoc (contur, personaje) nu au penalizarea de suprafață mică; sub 0,1 m² costul PrintCenter e
   *  166,67 lei/m², deci tariful pe m² se dublează acolo. */
  STOCK_SMALL_AREA_SQM: 0.1,
  STOCK_SMALL_AREA_MULTIPLIER: 2,
  AVAILABLE_THICKNESS: [1, 2, 3, 4, 5, 6, 8, 10],
  PRO_DESIGN_FEE: 50,
};

export type PriceInputPVCForex = {
  width_cm: number;
  height_cm: number;
  quantity: number;
  thickness_mm: number;
  contour_cut?: boolean;
  stock_model?: boolean;
  designOption: "upload" | "pro" | "text_only";
};

export const calculatePVCForexPrice = (input: PriceInputPVCForex) => {
  if (input.width_cm <= 0 || input.height_cm <= 0 || input.quantity <= 0) {
    return { finalPrice: 0, total_sqm: 0, pricePerUnit: 0, basePrice: 0, contourCutPrice: 0, designFee: 0 };
  }

  const sqmPerUnit = (input.width_cm / 100) * (input.height_cm / 100);
  const totalSqm = input.stock_model ? sqmPerUnit * input.quantity : roundMoney(sqmPerUnit * input.quantity);

  let pricePerSqm = PVC_FOREX_CONSTANTS.PRICES[input.thickness_mm] ?? 0;

  if (!input.stock_model && totalSqm < 0.1) pricePerSqm *= 5;
  else if (!input.stock_model && totalSqm < 0.2) pricePerSqm *= 4;
  else if (!input.stock_model && totalSqm < 0.3) pricePerSqm *= 3;
  else if (!input.stock_model && totalSqm < 0.4) pricePerSqm *= 2;
  else if (!input.stock_model && totalSqm < 0.5) pricePerSqm *= 1.5;
  else if (input.stock_model && totalSqm < PVC_FOREX_CONSTANTS.STOCK_SMALL_AREA_SQM) pricePerSqm *= PVC_FOREX_CONSTANTS.STOCK_SMALL_AREA_MULTIPLIER;

  const basePrice = roundMoney(totalSqm * pricePerSqm);
  const contourCutPrice = input.contour_cut ? roundMoney(basePrice * PVC_FOREX_CONSTANTS.CONTOUR_CUT_RATE) : 0;
  const designFee = input.designOption === "pro" ? PVC_FOREX_CONSTANTS.PRO_DESIGN_FEE : 0;
  const finalPrice = roundMoney(basePrice + contourCutPrice + designFee);
  const pricePerUnit = roundMoney(finalPrice / input.quantity);
  return { finalPrice, total_sqm: totalSqm, pricePerUnit, basePrice, contourCutPrice, designFee };
};

export const getPVCForexUpsell = (input: PriceInputPVCForex) =>
  getRigidMaterialUpsell(input, (qty) => calculatePVCForexPrice({ ...input, quantity: qty }));

// ==========================================
// 5. ALUCOBOND
// ==========================================
export const ALUCOBOND_CONSTANTS = {
  // 3 mm: cost real 183,34 lei/m² (0,1–1 m²) / 173,74 (> 1 m²) fără TVA → min 443,7 lei/m². 4 mm: fără comenzi, aceeași proporție.
  PRICES: { 3: 445, 4: 570 } as Record<number, number>,
  LIMITS: { MAX_WIDTH: 300, MAX_HEIGHT: 150 },
  AVAILABLE_THICKNESS: [3, 4],
  COLORS: ["Alb", "Argintiu (Silver)", "Antracit (Gri Închis)", "Negru", "Rosu", "Albastru", "Verde", "Galben", "Brushed (Aluminiu Perișat)"],
  PRO_DESIGN_FEE: 60,
};

export type PriceInputAlucobond = {
  width_cm: number;
  height_cm: number;
  quantity: number;
  thickness_mm: number;
  color: string;
  designOption: "upload" | "pro" | "text_only";
};

export const calculateAlucobondPrice = (input: PriceInputAlucobond) => {
  if (input.width_cm <= 0 || input.height_cm <= 0 || input.quantity <= 0) {
    return { finalPrice: 0, total_sqm: 0, pricePerUnit: 0 };
  }

  const sqmPerUnit = (input.width_cm / 100) * (input.height_cm / 100);
  const totalSqm = roundMoney(sqmPerUnit * input.quantity);

  let pricePerSqm = ALUCOBOND_CONSTANTS.PRICES[input.thickness_mm] ?? 0;

  if (totalSqm < 0.1) pricePerSqm *= 5;
  else if (totalSqm < 0.2) pricePerSqm *= 4;
  else if (totalSqm < 0.3) pricePerSqm *= 3;
  else if (totalSqm < 0.4) pricePerSqm *= 2;
  else if (totalSqm < 0.5) pricePerSqm *= 1.5;

  let finalPrice = roundMoney(totalSqm * pricePerSqm);

  if (input.designOption === "pro") {
    finalPrice += ALUCOBOND_CONSTANTS.PRO_DESIGN_FEE;
  }

  const pricePerUnit = roundMoney(finalPrice / input.quantity);
  return { finalPrice: roundMoney(finalPrice), total_sqm: totalSqm, pricePerUnit };
};

export const getAlucobondUpsell = (input: PriceInputAlucobond) =>
  getRigidMaterialUpsell(input, (qty) => calculateAlucobondPrice({ ...input, quantity: qty }));

// ==========================================
// 6. PLEXIGLASS
// ==========================================
export const PLEXIGLASS_CONSTANTS = {
  LIMITS: { MAX_WIDTH: 400, MAX_HEIGHT: 200 },
  THICKNESS: {
    ALB: [2, 3, 4, 5],
    TRANSPARENT: [2, 3, 4, 5, 6, 8, 10],
  },
  PRICES: {
    ALB: { 2: 200, 3: 250, 4: 300, 5: 350 } as Record<number, number>,
    // transparent 3 mm: cost real 235,49 lei/m² (0,1–1 m²) fără TVA → min 569,9 lei/m² după multiplicatorul ×1,5 de mai jos
    TRANSPARENT_SINGLE: { 2: 280, 3: 380, 4: 410, 5: 470, 6: 700, 8: 1100, 10: 1450 } as Record<number, number>,
    TRANSPARENT_DOUBLE: { 2: 380, 3: 450, 4: 510, 5: 570, 6: 800, 8: 1200, 10: 1650 } as Record<number, number>,
  },
  PRO_DESIGN_FEE: 60,
};

const PLEXIGLASS_PRICE_MULTIPLIER = 1.5;

export type PriceInputPlexiglass = {
  width_cm: number;
  height_cm: number;
  quantity: number;
  material: "alb" | "transparent";
  thickness_mm: number;
  print_double: boolean;
  designOption: "upload" | "pro" | "text_only";
  standoffs?: {
    finish: "black" | "silver";
    size: "13x13" | "15x25" | "25x25";
    quantity: number;
  } | null;
};

export const calculatePlexiglassPrice = (input: PriceInputPlexiglass) => {
  if (input.width_cm <= 0 || input.height_cm <= 0 || input.quantity <= 0) {
    return { finalPrice: 0, total_sqm: 0, pricePerUnit: 0 };
  }

  const sqmPerUnit = (input.width_cm / 100) * (input.height_cm / 100);
  const totalSqm = roundMoney(sqmPerUnit * input.quantity);

  let pricePerSqm = 0;
  if (input.material === "alb") {
    pricePerSqm = PLEXIGLASS_CONSTANTS.PRICES.ALB[input.thickness_mm] ?? 0;
  } else {
    if (input.print_double) {
      pricePerSqm = PLEXIGLASS_CONSTANTS.PRICES.TRANSPARENT_DOUBLE[input.thickness_mm] ?? 0;
    } else {
      pricePerSqm = PLEXIGLASS_CONSTANTS.PRICES.TRANSPARENT_SINGLE[input.thickness_mm] ?? 0;
    }
  }

  if (totalSqm < 0.1) pricePerSqm *= 5;
  else if (totalSqm < 0.2) pricePerSqm *= 4;
  else if (totalSqm < 0.3) pricePerSqm *= 3;
  else if (totalSqm < 0.4) pricePerSqm *= 2;
  else if (totalSqm < 0.5) pricePerSqm *= 1.5;

  let finalPrice = roundMoney(totalSqm * pricePerSqm);

  if (input.designOption === "pro") {
    finalPrice += PLEXIGLASS_CONSTANTS.PRO_DESIGN_FEE;
  }

  // Price increase requested: x1.5 for plexiglass.
  finalPrice = roundMoney(finalPrice * PLEXIGLASS_PRICE_MULTIPLIER);

  // Optional standoffs (distantiere) charged per piece.
  const standoffPrices: Record<"black" | "silver", Record<"13x13" | "15x25" | "25x25", number>> = {
    black: { "13x13": 20, "15x25": 25, "25x25": 30 },
    silver: { "13x13": 20, "15x25": 25, "25x25": 30 },
  };
  if (input.standoffs && input.standoffs.quantity > 0) {
    const unit = standoffPrices[input.standoffs.finish]?.[input.standoffs.size] ?? 0;
    finalPrice = roundMoney(finalPrice + unit * input.standoffs.quantity);
  }

  const pricePerUnit = roundMoney(finalPrice / input.quantity);
  return { finalPrice: roundMoney(finalPrice), total_sqm: totalSqm, pricePerUnit };
};

export const getPlexiglassUpsell = (input: PriceInputPlexiglass) =>
  getRigidMaterialUpsell(input, (qty) => calculatePlexiglassPrice({ ...input, quantity: qty }));

// ==========================================
// 7. CARTON
// ==========================================
export const CARTON_CONSTANTS = {
  LIMITS: { MAX_WIDTH: 400, MAX_HEIGHT: 200 },
  ONDULAT: {
    SINGLE: { "E": 80, "3B": 85, "3C": 90, "5BC": 100 } as Record<string, number>,
    DOUBLE: { "E": 120, "3B": 130, "3C": 135, "5BC": 150 } as Record<string, number>,
  },
  RECICLAT: {
    BOARD: { "board10": 200, "board16": 250 } as Record<string, number>,
    EDGE: { "board10": 15, "board16": 17 } as Record<string, number>,
  },
  PRO_DESIGN_FEE: 50,
};

export type PriceInputCarton = {
  width_cm: number;
  height_cm: number;
  quantity: number;
  material: "ondulat" | "reciclat";
  ondula?: string;
  reciclatBoard?: string;
  printDouble?: boolean;
  edgePerimeter_m?: number;
  edgeType?: string | null;
  designOption: "upload" | "pro" | "text_only";
};

export const calculateCartonPrice = (input: PriceInputCarton) => {
  if (input.width_cm <= 0 || input.height_cm <= 0 || input.quantity <= 0) {
    return { finalPrice: 0, total_sqm: 0, pricePerUnit: 0, accessoryCost: 0 };
  }

  const sqmPerUnit = (input.width_cm / 100) * (input.height_cm / 100);
  const totalSqm = roundMoney(sqmPerUnit * input.quantity);

  let pricePerSqm = 0;
  let accessoryCost = 0;

  if (input.material === "ondulat" && input.ondula) {
    const prices = input.printDouble ? CARTON_CONSTANTS.ONDULAT.DOUBLE : CARTON_CONSTANTS.ONDULAT.SINGLE;
    pricePerSqm = prices[input.ondula] ?? 0;
  } else if (input.material === "reciclat" && input.reciclatBoard) {
    pricePerSqm = CARTON_CONSTANTS.RECICLAT.BOARD[input.reciclatBoard] ?? 0;
    if (input.edgePerimeter_m && input.edgeType && CARTON_CONSTANTS.RECICLAT.EDGE[input.edgeType]) {
      accessoryCost = roundMoney(input.edgePerimeter_m * CARTON_CONSTANTS.RECICLAT.EDGE[input.edgeType]);
    }
  }

  let finalPrice = roundMoney(totalSqm * pricePerSqm + accessoryCost);
  if (input.designOption === "pro") {
    finalPrice += CARTON_CONSTANTS.PRO_DESIGN_FEE;
  }

  const pricePerUnit = roundMoney(finalPrice / input.quantity);
  return { finalPrice: roundMoney(finalPrice), total_sqm: totalSqm, pricePerUnit, accessoryCost };
};

export const getCartonUpsell = (input: PriceInputCarton) =>
  getRigidMaterialUpsell(input, (qty) => calculateCartonPrice({ ...input, quantity: qty }));

// ==========================================
// 8. AUTOCOLANTE (GENERIC - SQM BASED)
// ==========================================
// ==========================================
// 8. AUTOCOLANTE (GENERIC - SQM BASED)
// ==========================================
// ==========================================
// 8. AUTOCOLANTE (GENERIC - SQM BASED)
// ==========================================
export const AUTOCOLANTE_CONSTANTS = {
  MATERIALS: [
    {
      // cost real Oracal 3641 fără TVA: 41,85 lei/m² (0,5–1), 41 (1–2), 40,74 (2–10), 40 (> 10) → min 101,3 … 96,8 lei/m²;
      // benzile acoperă și „Doar print” (−20%).
      key: "oracal_3641", label: "Economic — Folie economică", bands: [
        { max_sqm: 1, price_per_sqm: 135 },
        { max_sqm: 5, price_per_sqm: 128 },
        { max_sqm: 20, price_per_sqm: 125 },
        { max_sqm: Infinity, price_per_sqm: 122 },
      ]
    },
    {
      key: "oracal_transparent", label: "Transparent — Folie transparentă", bands: [
        { max_sqm: 1, price_per_sqm: 180 },
        { max_sqm: 5, price_per_sqm: 135 },
        { max_sqm: 20, price_per_sqm: 120 },
        { max_sqm: Infinity, price_per_sqm: 105 },
      ]
    },
    {
      key: "oracal_621", label: "Removabil — Folie cu adeziv removabil", bands: [
        { max_sqm: 1, price_per_sqm: 180 },
        { max_sqm: 5, price_per_sqm: 135 },
        { max_sqm: 20, price_per_sqm: 120 },
        { max_sqm: Infinity, price_per_sqm: 105 },
      ]
    },
    {
      key: "oracal_970", label: "Auto — Folie auto", bands: [
        { max_sqm: 1, price_per_sqm: 180 },
        { max_sqm: 5, price_per_sqm: 135 },
        { max_sqm: 20, price_per_sqm: 120 },
        { max_sqm: Infinity, price_per_sqm: 105 },
      ]
    },
  ],
  PRO_DESIGN_FEE: 100,
  /** Latura max (cm) — sub aceasta aplicăm taxă de tăiere/buc (nu mai umflăm mp facturați). */
  SMALL_PIECE_MAX_SIDE_CM: 30,
  /** Lei/buc tăiere pe contur (print_cut) la piesele mici. PrintCenter: 10×10 cm pe contur 1,01 lei/buc față de
   *  0,41 tăiat drept (≈ 0,6 lei/buc fără TVA în plus) → 1,10 lei/buc la noi (cu banda de material). */
  CUT_FEE_PER_PIECE: 1.1,
  /** Comanda minimă (lei) pe un produs autocolant: PrintCenter ia 20–25 lei fără TVA pe o linie mică
   *  (ex. 30×20 cm = 21 lei, 30×30 cm = 25 lei) → min 2 × 25 × 1,21 = 60,5 lei. Taxa de design se adaugă peste. */
  MIN_ORDER_PRICE: 61,
  LAMINATE_MARKUP: 1.4,
  TRANSFER_FILM_MARKUP: 1.2,
};

/** Mp reali + taxă tăiere per bucată la piese mici (fără mp minim artificial). */
export function getAutocolanteBillableArea(input: Pick<PriceInputAutocolante, "width_cm" | "height_cm" | "quantity" | "print_type">) {
  const sqmPerUnit = (input.width_cm / 100) * (input.height_cm / 100);
  const maxSideCm = Math.max(input.width_cm, input.height_cm);
  const isSmallPiece =
    maxSideCm > 0 && maxSideCm <= AUTOCOLANTE_CONSTANTS.SMALL_PIECE_MAX_SIDE_CM;
  const totalSqm = roundMoney(sqmPerUnit * input.quantity);
  const cuttingFee =
    isSmallPiece && input.print_type === "print_cut"
      ? roundMoney(AUTOCOLANTE_CONSTANTS.CUT_FEE_PER_PIECE * input.quantity)
      : 0;
  return { sqmPerUnit, billableSqmPerUnit: sqmPerUnit, totalSqm, cuttingFee, isSmallPiece };
}

export type AutocolantesMaterialKey = "oracal_3641" | "oracal_transparent" | "oracal_621" | "oracal_970";

export type PriceInputAutocolante = {
  width_cm: number;
  height_cm: number;
  quantity: number;
  material: AutocolantesMaterialKey;
  print_type: "print_cut" | "print_only"; // print+cut sau doar print (-20%)
  laminated: boolean; // laminare (+40%)
  transfer_film: boolean; // folie de transfer (+20%)
  designOption: "upload" | "text_only" | "pro";
};

export const calculateAutocolantePrice = (input: PriceInputAutocolante) => {
  if (input.width_cm <= 0 || input.height_cm <= 0 || input.quantity <= 0) {
    return { finalPrice: 0, total_sqm: 0, pricePerSqm: 0, sqmPerUnit: 0, cuttingFee: 0 };
  }

  const { sqmPerUnit, billableSqmPerUnit, totalSqm, cuttingFee } = getAutocolanteBillableArea(input);

  // Găsim materialul selectat
  const materialDef = AUTOCOLANTE_CONSTANTS.MATERIALS.find(m => m.key === input.material);
  if (!materialDef) {
    return { finalPrice: 0, total_sqm: totalSqm, pricePerSqm: 0, sqmPerUnit, billableSqmPerUnit, cuttingFee };
  }

  // Găsim prețul per MP bazat pe totalSqm
  let pricePerSqm = materialDef.bands[materialDef.bands.length - 1].price_per_sqm;
  for (const band of materialDef.bands) {
    if (totalSqm <= band.max_sqm) {
      pricePerSqm = band.price_per_sqm;
      break;
    }
  }

  // LOGICA NOUĂ: Penalizări granulare pentru suprafețe mici
  if (totalSqm < 0.1) {
    pricePerSqm = pricePerSqm * 5;
  } else if (totalSqm < 0.2) {
    pricePerSqm = pricePerSqm * 4;
  } else if (totalSqm < 0.3) {
    pricePerSqm = pricePerSqm * 3;
  } else if (totalSqm < 0.4) {
    pricePerSqm = pricePerSqm * 2;
  } else if (totalSqm < 0.5) {
    pricePerSqm = pricePerSqm * 1.5;
  }

  // Aplicăm reducere de 20% dacă e doar print (fără cut)
  if (input.print_type === "print_only") {
    pricePerSqm = roundMoney(pricePerSqm * 0.8);
  }

  let subtotal = roundMoney(totalSqm * pricePerSqm + cuttingFee);

  if (input.transfer_film) {
    subtotal = roundMoney(subtotal * AUTOCOLANTE_CONSTANTS.TRANSFER_FILM_MARKUP);
  }
  if (input.laminated) {
    subtotal = roundMoney(subtotal * AUTOCOLANTE_CONSTANTS.LAMINATE_MARKUP);
  }
  subtotal = Math.max(subtotal, AUTOCOLANTE_CONSTANTS.MIN_ORDER_PRICE);

  let finalPrice = subtotal;

  if (input.designOption === "pro") {
    finalPrice += AUTOCOLANTE_CONSTANTS.PRO_DESIGN_FEE;
  }

  return {
    finalPrice: roundMoney(finalPrice),
    total_sqm: totalSqm,
    pricePerSqm,
    sqmPerUnit,
    billableSqmPerUnit,
    cuttingFee,
  };
};

// --- UPSELL FOR AUTOCOLANTE ---
export const getAutocolanteUpsell = (input: PriceInputAutocolante): UpsellResult => {
  if (input.width_cm <= 0 || input.height_cm <= 0) return null;

  const priceData = calculateAutocolantePrice(input);
  const { sqmPerUnit, totalSqm: currentTotalSqm } = getAutocolanteBillableArea(input);
  const currentUnitPrice = priceData.finalPrice / input.quantity;

  // 1. VERIFICARE PRAGURI PENALIZARE (PRIORITATE MAXIMĂ)
  // Pragurile sunt: 0.1, 0.2, 0.3, 0.4, 0.5
  const penaltyThresholds = [0.1, 0.2, 0.3, 0.4, 0.5];

  // Găsim primul prag care este mai mare decât suprafața curentă
  const nextThreshold = penaltyThresholds.find(t => t > currentTotalSqm);

  if (nextThreshold) {
    const targetQty = Math.ceil((nextThreshold + 0.001) / sqmPerUnit);

    // Dacă saltul la următorul prag nu necesită o cantitate absurdă (ex: max +50% bucăți sau +10 bucăți mici)
    if (targetQty > input.quantity) {
      const futurePriceData = calculateAutocolantePrice({ ...input, quantity: targetQty });
      const futureUnitPrice = futurePriceData.finalPrice / targetQty;

      // Calculăm reducerea
      const discountPercent = Math.round(((currentUnitPrice - futureUnitPrice) / currentUnitPrice) * 100);

      // Afișăm upsell doar dacă reducerea e semnificativă (>5%)
      if (discountPercent > 5) {
        const totalSavings = (currentUnitPrice * targetQty) - futurePriceData.finalPrice;
        return {
          hasUpsell: true,
          requiredQty: targetQty,
          discountPercent,
          newUnitPrice: parseFloat(futureUnitPrice.toFixed(2)),
          totalSavings: parseFloat(totalSavings.toFixed(2)),
          message: `Sfat: Treci la **${targetQty} buc** (total >${nextThreshold}mp) si furi din penalizare! Preț unitar cu **${discountPercent}% mai mic**.`,
        };
      }
    }
  }

  // 2. FALLBACK LA BENZILE STANDARD (PENTRU COMENZI MARI > 0.5mp)
  // Găsim banda pentru materialul selectat
  const materialDef = AUTOCOLANTE_CONSTANTS.MATERIALS.find((m) => m.key === input.material);
  if (!materialDef) return null;

  // Transformăm benzile din formatul autocolante în formatul generic
  const transformedBands = materialDef.bands.map(b => ({ max: b.max_sqm, price: b.price_per_sqm }));

  return calculateUpsellGeneric(
    currentTotalSqm,
    sqmPerUnit,
    input.quantity,
    currentUnitPrice,
    transformedBands,
    (newQty) => calculateAutocolantePrice({ ...input, quantity: newQty })
  );
};

// ==========================================
// 9. CANVAS
// ==========================================
export const CANVAS_CONSTANTS = {
  PRICES: {
    // Dimensiuni libere (pe șasiu). Costul PrintCenter pe bucată ≈ 100,7 lei/m² + 15,55 lei/ml de perimetru fără TVA
    // (potrivit pe comenzile reale 30×40 … 100×100) → după reducerea de 20% de mai jos: ≥ 305 lei/m² și ≥ 48 lei/ml,
    // cu marjă pentru formatele unde costul real e peste model (ex. 40×60 = 60,64 lei).
    bands: [
      { max_sqm: 1, price_per_sqm: 330 },
      { max_sqm: 3, price_per_sqm: 325 },
      { max_sqm: 5, price_per_sqm: 320 },
      { max_sqm: Infinity, price_per_sqm: 315 },
    ],
    chassis_price_per_ml: 55,
    /** Prețul minim pe bucată (lei): cel mai mic tablou comandat real, 30×40 = 33,86 lei fără TVA → min 82. */
    MIN_PIECE_PRICE: 82,
  },
  // Canvas pe șasiu de lemn, preț pe bucată pe trepte de cantitate (FRAMED_QUANTITY_RANGES).
  // Costul PrintCenter (fără TVA) pe format, din comenzile reale; formatele necomandate încă sunt interpolate după
  // suprafață („estimat”). Ultima treaptă = minimul regulii (2 × cost × 1,21); prima = +10%, coborâre liniară.
  FRAMED_PRICES_RECTANGLE: {
    "30x40": [91, 90, 88, 86, 84, 82], // cost 33,86 → min 82
    "30x50": [112, 110, 108, 106, 104, 101], // cost 41,52 → min 101
    "40x60": [162, 159, 156, 153, 150, 147], // cost 60,64 → min 147
    "50x70": [184, 181, 178, 174, 171, 167], // cost 68,84 → min 167
    "50x80": [206, 203, 199, 195, 191, 187], // cost 77,02 → min 187
    "60x80": [244, 240, 235, 230, 225, 220], // cost ~90,76 (estimat) → min 220
    "60x90": [270, 265, 260, 255, 250, 245], // cost 101,06 → min 245
    "70x100": [327, 321, 315, 309, 303, 297], // cost ~122,57 (estimat) → min 297
    "80x100": [364, 358, 351, 344, 337, 330], // cost 136,02 → min 330
    "80x120": [392, 385, 378, 371, 364, 356], // cost 147,08 → min 356
    "90x120": [505, 496, 487, 478, 469, 459], // cost ~189,33 (estimat) → min 459
    "100x120": [662, 650, 638, 626, 614, 601], // cost 248,33 → min 601
  },
  FRAMED_PRICES_SQUARE: {
    "30x30": [91, 90, 88, 86, 84, 82], // cost ~33,86 (estimat, ca 30×40) → min 82
    "40x40": [117, 115, 113, 111, 109, 106], // cost ~43,60 (estimat) → min 106
    "50x50": [145, 143, 140, 137, 134, 131], // cost 54,08 → min 131
    "60x60": [189, 186, 182, 179, 175, 171], // cost ~70,48 (estimat) → min 171
    "70x70": [249, 244, 239, 234, 229, 224], // cost ~92,47 (estimat) → min 224
    "80x80": [306, 301, 295, 290, 284, 278], // cost ~114,51 (estimat) → min 278
    "90x90": [365, 359, 352, 345, 338, 331], // cost ~136,71 (estimat) → min 331
    "100x100": [400, 393, 386, 378, 371, 363], // cost 150 → min 363
  },
  FRAMED_QUANTITY_RANGES: [
    { min: 1, max: 1, index: 0 },
    { min: 2, max: 5, index: 1 },
    { min: 6, max: 15, index: 2 },
    { min: 16, max: 25, index: 3 },
    { min: 26, max: 40, index: 4 },
    { min: 41, max: 50, index: 5 },
  ],
  DISCOUNT_PERCENT: 20, // Reducere 20%
  PRO_DESIGN_FEE: 40,
};

export type PriceInputCanvas = {
  width_cm: number;
  height_cm: number;
  quantity: number;
  edge_type: "white" | "mirror" | "wrap";
  designOption: "upload" | "pro";
  frameType?: "none" | "framed"; // nou: tip ramă
  framedSize?: string; // nou: dimensiune pentru opțiunea cu ramă (ex: "20x30")
  framedShape?: "rectangle" | "square"; // nou: formă pentru opțiunea cu ramă
};

export const calculateCanvasPrice = (input: PriceInputCanvas) => {
  if (input.quantity <= 0) {
    return { finalPrice: 0, total_sqm: 0, pricePerUnit: 0 };
  }

  // Dacă este cu ramă, folosim prețurile prestabilite
  if (input.frameType === "framed" && input.framedSize) {
    const shape = input.framedShape || "rectangle";
    const priceTable = shape === "square"
      ? CANVAS_CONSTANTS.FRAMED_PRICES_SQUARE
      : CANVAS_CONSTANTS.FRAMED_PRICES_RECTANGLE;

    const priceArray = priceTable[input.framedSize as keyof typeof priceTable] as number[] | undefined;
    if (!priceArray) {
      return { finalPrice: 0, total_sqm: 0, pricePerUnit: 0 };
    }

    // Găsim indexul pentru prețul în funcție de cantitate
    let priceIndex = 0;
    for (const range of CANVAS_CONSTANTS.FRAMED_QUANTITY_RANGES) {
      if (input.quantity >= range.min && input.quantity <= range.max) {
        priceIndex = range.index;
        break;
      }
    }

    const pricePerUnit = priceArray[priceIndex] || priceArray[priceArray.length - 1];
    let finalPrice = roundMoney(pricePerUnit * input.quantity);

    if (input.designOption === "pro") {
      finalPrice += CANVAS_CONSTANTS.PRO_DESIGN_FEE;
    }

    return { finalPrice: roundMoney(finalPrice), total_sqm: 0, pricePerUnit: roundMoney(pricePerUnit) };
  }

  // Logic original pentru fără ramă (dimensiuni personalizate)
  if (input.width_cm <= 0 || input.height_cm <= 0) {
    return { finalPrice: 0, total_sqm: 0, pricePerUnit: 0 };
  }

  const sqmPerUnit = (input.width_cm / 100) * (input.height_cm / 100);
  const totalSqm = roundMoney(sqmPerUnit * input.quantity);
  const perimeterPerUnitMl = 2 * (input.width_cm + input.height_cm) / 100;

  let pricePerSqm = CANVAS_CONSTANTS.PRICES.bands[CANVAS_CONSTANTS.PRICES.bands.length - 1].price_per_sqm;
  for (const band of CANVAS_CONSTANTS.PRICES.bands) {
    if (totalSqm <= band.max_sqm) {
      pricePerSqm = band.price_per_sqm;
      break;
    }
  }
  // Fără penalizare de suprafață mică: costul pe bucată vine din m² + perimetrul șasiului (inclus mai jos),
  // iar formatele foarte mici au prețul minim pe bucată MIN_PIECE_PRICE.
  const printCost = totalSqm * pricePerSqm;
  const totalPerimeter = perimeterPerUnitMl * input.quantity;
  const chassisCost = totalPerimeter * CANVAS_CONSTANTS.PRICES.chassis_price_per_ml;

  let finalPrice = roundMoney(printCost + chassisCost);

  // Aplicare reducere 20%
  finalPrice = roundMoney(finalPrice * 0.8);
  finalPrice = Math.max(finalPrice, CANVAS_CONSTANTS.PRICES.MIN_PIECE_PRICE * input.quantity);

  if (input.designOption === "pro") {
    finalPrice += CANVAS_CONSTANTS.PRO_DESIGN_FEE;
  }

  const pricePerUnit = roundMoney(finalPrice / input.quantity);
  return { finalPrice: roundMoney(finalPrice), total_sqm: totalSqm, pricePerUnit };
};

// --- UPSELL FOR CANVAS (Fără Ramă) ---
export const getCanvasUpsell = (input: PriceInputCanvas): UpsellResult => {
  // Upsell doar pentru Canvas fără ramă (personalizat)
  if (input.frameType === "framed") return null;
  if (input.width_cm <= 0 || input.height_cm <= 0) return null;

  const priceData = calculateCanvasPrice(input);
  const sqmPerUnit = (input.width_cm / 100) * (input.height_cm / 100);
  const currentTotalSqm = sqmPerUnit * input.quantity;
  const currentUnitPrice = priceData.finalPrice / input.quantity;

  const transformedBands = CANVAS_CONSTANTS.PRICES.bands.map(b => ({ max: b.max_sqm, price: b.price_per_sqm }));

  return calculateUpsellGeneric(
    currentTotalSqm,
    sqmPerUnit,
    input.quantity,
    currentUnitPrice,
    transformedBands,
    (newQty) => calculateCanvasPrice({ ...input, quantity: newQty })
  );
};

// ==========================================
// 10. AFISE
// ==========================================
export const AFISE_CONSTANTS = {
  SIZES: [
    { key: "A3", label: "A3", dims: "297×420 mm" }, { key: "A2", label: "A2", dims: "420×594 mm" }, { key: "A1", label: "A1", dims: "594×841 mm" },
    { key: "A0", label: "A0", dims: "841×1189 mm" }, { key: "S5", label: "S5", dims: "500×700 mm" }, { key: "S7", label: "S7", dims: "700×1000 mm" },
  ],
  MATERIALS: [
    { key: "paper_150_lucioasa", label: "Hârtie 150g lucioasă", description: "Standard" },
    { key: "paper_150_mata", label: "Hârtie 150g mată", description: "Elegant" },
    { key: "paper_300_lucioasa", label: "Carton 300g lucios", description: "Rigid" },
    { key: "paper_300_mata", label: "Carton 300g mat", description: "Premium" },
    { key: "blueback_115", label: "Blueback 115g", description: "Outdoor" },
    { key: "whiteback_150_material", label: "Whiteback 150g", description: "Indoor" },
    { key: "satin_170", label: "Satin 170g", description: "Foto" },
    { key: "foto_220", label: "Hârtie Foto 220g", description: "Foto Premium" },
  ],
  PRO_DESIGN_FEE: 100,
  /** Tabelul de mai jos era ≈ 2 × costul PrintCenter FĂRĂ TVA; ×1,22 (TVA 1,21 rotunjit în sus) → 2 × costul real
   *  (cu TVA). Cost real pe bucată (comenzi, cantități mici): whiteback A2 9,98 / S5 13,5 / S7 26,6 / A0 40; blueback A2 8,73 / A1 17,48 / S5 12,25 /
   *  S7 24,5; hârtie 150 g A2 9,98 / S5 14; carton 250–300 g A3 1,56–1,69 / A2 14,97–15,42; foto A2 14,97.
   *  Satin 170 g: nicio comandă reală încă → neschimbat. */
  MATERIAL_MULTIPLIER: {
    paper_150_lucioasa: 1.22,
    whiteback_150_material: 1.22,
    blueback_115: 1.22,
    foto_220: 1.22,
  } as Record<string, number>,
  PRICE_TABLE: {
    paper_150_lucioasa: {
      A3: [{ min: 1, price: 3.0 }],
      A2: [{ min: 1, price: 19.96 }], // era 9,98 = chiar costul PrintCenter

      A1: [{ min: 1, price: 39.96 }],
      A0: [{ min: 1, price: 80.0 }],
      S5: [{ min: 1, price: 28.0 }],
      S7: [{ min: 1, price: 56.0 }]
    },
    blueback_115: {
      A2: [
        { min: 1, price: 17.46 },
        { min: 51, price: 14.96 },
        { min: 100, price: 12.48 },
        { min: 200, price: 9.98 },
        { min: 300, price: 7.48 },
        { min: 400, price: 6.24 },
        { min: 500, price: 5.74 },
        { min: 1000, price: 4.98 },
      ],
      A1: [
        { min: 1, price: 34.96 },
        { min: 51, price: 29.98 },
        { min: 100, price: 24.98 },
        { min: 200, price: 19.98 },
        { min: 300, price: 14.98 },
        { min: 400, price: 12.48 },
        { min: 500, price: 11.48 },
        { min: 1000, price: 10.00 },
      ],
      A0: [
        { min: 1, price: 70.00 },
        { min: 51, price: 60.00 },
        { min: 100, price: 50.00 },
        { min: 200, price: 40.00 },
        { min: 300, price: 30.00 },
        { min: 400, price: 25.00 },
        { min: 500, price: 23.00 },
        { min: 1000, price: 20.00 },
      ],
      S5: [
        { min: 1, price: 24.50 },
        { min: 51, price: 21.00 },
        { min: 100, price: 17.50 },
        { min: 200, price: 14.00 },
        { min: 300, price: 10.50 },
        { min: 400, price: 8.76 },
        { min: 500, price: 8.06 },
        { min: 1000, price: 7.00 },
      ],
      S7: [
        { min: 1, price: 49.00 },
        { min: 51, price: 42.00 },
        { min: 100, price: 35.00 },
        { min: 200, price: 28.00 },
        { min: 300, price: 21.00 },
        { min: 400, price: 17.50 },
        { min: 500, price: 16.10 },
        { min: 1000, price: 14.00 },
      ]
    },
    whiteback_150_material: {
      A3: [
        { min: 1, price: 3.00 },
        { min: 51, price: 2.50 },
        { min: 100, price: 2.30 },
        { min: 200, price: 2.20 },
        { min: 300, price: 1.98 },
        { min: 400, price: 1.88 },
        { min: 500, price: 1.60 },
        { min: 1000, price: 1.20 },
      ],
      A2: [
        { min: 1, price: 19.96 },
        { min: 51, price: 17.46 },
        { min: 100, price: 14.96 },
        { min: 200, price: 12.48 },
        { min: 300, price: 9.98 },
        { min: 400, price: 8.74 },
        { min: 500, price: 7.48 },
        { min: 1000, price: 6.24 },
      ],
      A1: [
        { min: 1, price: 39.96 },
        { min: 51, price: 34.96 },
        { min: 100, price: 29.98 },
        { min: 200, price: 24.98 },
        { min: 300, price: 19.98 },
        { min: 400, price: 17.48 },
        { min: 500, price: 14.98 },
        { min: 1000, price: 12.48 },
      ],
      A0: [
        { min: 1, price: 80.00 },
        { min: 51, price: 70.00 },
        { min: 100, price: 60.00 },
        { min: 200, price: 50.00 },
        { min: 300, price: 40.00 },
        { min: 400, price: 35.00 },
        { min: 500, price: 30.00 },
        { min: 1000, price: 25.00 },
      ],
      S5: [
        { min: 1, price: 28.00 },
        { min: 51, price: 24.50 },
        { min: 100, price: 21.00 },
        { min: 200, price: 17.50 },
        { min: 300, price: 14.00 },
        { min: 400, price: 12.26 },
        { min: 500, price: 10.50 },
        { min: 1000, price: 8.76 },
      ],
      S7: [
        { min: 1, price: 56.00 },
        { min: 51, price: 49.00 },
        { min: 100, price: 42.00 },
        { min: 200, price: 35.00 },
        { min: 300, price: 28.00 },
        { min: 400, price: 24.50 },
        { min: 500, price: 21.00 },
        { min: 1000, price: 17.50 },
      ]
    },
    satin_170: {
      A2: [
        { min: 1, price: 22.46 },
        { min: 51, price: 19.96 },
        { min: 100, price: 17.46 },
        { min: 200, price: 14.96 },
        { min: 300, price: 12.48 },
        { min: 400, price: 9.98 },
        { min: 500, price: 8.74 },
        { min: 1000, price: 8.24 },
      ],
      A1: [
        { min: 1, price: 44.96 },
        { min: 51, price: 39.96 },
        { min: 100, price: 34.96 },
        { min: 200, price: 29.98 },
        { min: 300, price: 24.98 },
        { min: 400, price: 19.98 },
        { min: 500, price: 17.48 },
        { min: 1000, price: 16.48 },
      ],
      A0: [
        { min: 1, price: 90.00 },
        { min: 51, price: 80.00 },
        { min: 100, price: 70.00 },
        { min: 200, price: 60.00 },
        { min: 300, price: 50.00 },
        { min: 400, price: 40.00 },
        { min: 500, price: 35.00 },
        { min: 1000, price: 33.00 },
      ],
      S5: [
        { min: 1, price: 31.50 },
        { min: 51, price: 28.00 },
        { min: 100, price: 24.50 },
        { min: 200, price: 21.00 },
        { min: 300, price: 17.50 },
        { min: 400, price: 14.00 },
        { min: 500, price: 12.26 },
        { min: 1000, price: 11.56 },
      ],
      S7: [
        { min: 1, price: 63.00 },
        { min: 51, price: 56.00 },
        { min: 100, price: 49.00 },
        { min: 200, price: 42.00 },
        { min: 300, price: 35.00 },
        { min: 400, price: 28.00 },
        { min: 500, price: 24.50 },
        { min: 1000, price: 23.10 },
      ]
    },
    foto_220: {
      A2: [
        { min: 1, price: 29.94 },
        { min: 51, price: 24.94 },
        { min: 100, price: 22.46 },
        { min: 200, price: 19.96 },
        { min: 300, price: 17.46 },
        { min: 400, price: 14.96 },
        { min: 500, price: 12.48 },
        { min: 1000, price: 9.98 },
      ],
      A1: [
        { min: 1, price: 59.94 },
        { min: 51, price: 49.96 },
        { min: 100, price: 44.96 },
        { min: 200, price: 39.96 },
        { min: 300, price: 34.96 },
        { min: 400, price: 29.98 },
        { min: 500, price: 24.98 },
        { min: 1000, price: 19.98 },
      ],
      A0: [
        { min: 1, price: 120.00 },
        { min: 51, price: 100.00 },
        { min: 100, price: 90.00 },
        { min: 200, price: 80.00 },
        { min: 300, price: 70.00 },
        { min: 400, price: 60.00 },
        { min: 500, price: 50.00 },
        { min: 1000, price: 40.00 },
      ],
      S5: [
        { min: 1, price: 42.00 },
        { min: 51, price: 35.00 },
        { min: 100, price: 31.50 },
        { min: 200, price: 28.00 },
        { min: 300, price: 24.50 },
        { min: 400, price: 21.00 },
        { min: 500, price: 17.50 },
        { min: 1000, price: 14.00 },
      ],
      S7: [
        { min: 1, price: 84.00 },
        { min: 51, price: 70.00 },
        { min: 100, price: 63.00 },
        { min: 200, price: 56.00 },
        { min: 300, price: 49.00 },
        { min: 400, price: 42.00 },
        { min: 500, price: 35.00 },
        { min: 1000, price: 28.00 },
      ]
    },
  } as Record<string, Record<string, Array<{ min: number; price: number }>>>
};

export type PriceInputAfise = { size: string; material: string; quantity: number; designOption: "upload" | "pro" };

export const calculatePosterPrice = (input: PriceInputAfise) => {
  let matKey = input.material;
  let multiplier = 1;

  // Hârtia 300g (mata/lucioasa) este dublu la preț față de 150g
  // Hârtia 150g (mata/lucioasa) are același preț (folosim cheia de lucioasa)
  if (matKey.startsWith("paper_300")) {
    // Indiferent dacă e mata sau lucioasa, baza e paper_150_lucioasa, iar prețul e dublu
    matKey = "paper_150_lucioasa";
    multiplier = 2;
  } else if (matKey === "paper_150_mata") {
    // Mată la fel ca lucioasă
    matKey = "paper_150_lucioasa";
  }

  let basePrice = 10;
  if (AFISE_CONSTANTS.PRICE_TABLE[matKey] && AFISE_CONSTANTS.PRICE_TABLE[matKey][input.size]) {
    const tiers = AFISE_CONSTANTS.PRICE_TABLE[matKey][input.size];
    const sorted = tiers.slice().sort((a: { min: number; price: number }, b: { min: number; price: number }) => b.min - a.min);
    basePrice = sorted[sorted.length - 1].price;
    for (const t of sorted) { if (input.quantity >= t.min) { basePrice = t.price; break; } }
  }

  const unitPrice = roundMoney(basePrice * multiplier * (AFISE_CONSTANTS.MATERIAL_MULTIPLIER[matKey] ?? 1));
  const proFee = input.designOption === "pro" ? AFISE_CONSTANTS.PRO_DESIGN_FEE : 0;
  const finalPrice = roundMoney(unitPrice * input.quantity + proFee);
  return { finalPrice, unitPrice, proFee };
};

// --- UPSELL FOR AFISE ---
export const getAfiseUpsell = (input: PriceInputAfise): UpsellResult => {
  let matKey = input.material;
  if (matKey.startsWith("paper_300")) {
    matKey = matKey.includes("lucioasa") ? "paper_150_lucioasa" : "paper_150_mata";
  }

  if (!AFISE_CONSTANTS.PRICE_TABLE[matKey] || !AFISE_CONSTANTS.PRICE_TABLE[matKey][input.size]) {
    return null;
  }

  const tiers = AFISE_CONSTANTS.PRICE_TABLE[matKey][input.size];
  const priceData = calculatePosterPrice(input);
  const currentUnitPrice = priceData.unitPrice;

  return calculateUpsellByQuantity(
    input.quantity,
    currentUnitPrice,
    tiers,
    (newQty) => calculatePosterPrice({ ...input, quantity: newQty })
  );
};

// ==========================================
// 11. FLYERE
// ==========================================
export const FLYER_CONSTANTS = {
  // Cost real PrintCenter fără TVA (135 g): A5 față 0,45 (< 100 buc) / 0,41 (100–500) / 0,27 (≥ 500); A6 față 0,21 / 0,14
  // (≥ 500); 210×100 față 0,38 / 0,31 (≥ 100); A5 față-verso 0,86 (< 250) / 0,79; A6 față-verso 0,40 / 0,27 (≥ 500).
  // Fiecare tabel (format × fețe) e înmulțit cu factorul care îl aduce la 2 × cost × 1,21 în zona comandată real;
  // treptele mari (≥ 2000 buc, fără comenzi reale) urmează aceeași proporție. 210×100 față-verso: fără cost real, același
  // factor ca fața simplă (să nu iasă mai ieftin decât fața simplă).
  SIZES: [
    {
      key: "A6",
      label: "A6",
      dims: "105 × 148 mm",
      oneSided: [
        { min: 1, price: 0.567 }, // vechi 0.375 (×1.51)
        { min: 101, price: 0.521 }, // vechi 0.345 (×1.51)
        { min: 501, price: 0.34 }, // vechi 0.225 (×1.51)
        { min: 2000, price: 0.318 }, // vechi 0.21 (×1.51)
        { min: 3000, price: 0.295 }, // vechi 0.195 (×1.51)
        { min: 4000, price: 0.272 }, // vechi 0.18 (×1.51)
        { min: 5000, price: 0.25 }, // vechi 0.165 (×1.51)
      ],
      twoSided: [
        { min: 1, price: 1.059 }, // vechi 0.72 (×1.47)
        { min: 101, price: 0.971 }, // vechi 0.66 (×1.47)
        { min: 501, price: 0.662 }, // vechi 0.45 (×1.47)
        { min: 2000, price: 0.508 }, // vechi 0.345 (×1.47)
        { min: 3000, price: 0.441 }, // vechi 0.30 (×1.47)
        { min: 4000, price: 0.397 }, // vechi 0.27 (×1.47)
        { min: 5000, price: 0.309 }, // vechi 0.21 (×1.47)
      ]
    },
    {
      key: "A5",
      label: "A5",
      dims: "148 × 210 mm",
      oneSided: [
        { min: 1, price: 1.095 }, // vechi 0.75 (×1.46)
        { min: 101, price: 1.008 }, // vechi 0.69 (×1.46)
        { min: 501, price: 0.657 }, // vechi 0.45 (×1.46)
        { min: 2000, price: 0.57 }, // vechi 0.39 (×1.46)
        { min: 3000, price: 0.417 }, // vechi 0.285 (×1.46)
        { min: 4000, price: 0.351 }, // vechi 0.24 (×1.46)
        { min: 5000, price: 0.307 }, // vechi 0.21 (×1.46)
      ],
      twoSided: [
        { min: 1, price: 2.276 }, // vechi 1.44 (×1.58)
        { min: 101, price: 2.086 }, // vechi 1.32 (×1.58)
        { min: 501, price: 1.422 }, // vechi 0.90 (×1.58)
        { min: 1000, price: 0.996 }, // vechi 0.63 (×1.58)
        { min: 2000, price: 0.759 }, // vechi 0.48 (×1.58)
        { min: 3000, price: 0.522 }, // vechi 0.33 (×1.58)
        { min: 4000, price: 0.451 }, // vechi 0.285 (×1.58)
        { min: 5000, price: 0.38 }, // vechi 0.24 (×1.58)
      ]
    },
    {
      key: "21x10",
      label: "21 × 10 cm",
      dims: "210 × 100 mm",
      oneSided: [
        { min: 1, price: 0.924 }, // vechi 0.57 (×1.62)
        { min: 101, price: 0.827 }, // vechi 0.51 (×1.62)
        { min: 501, price: 0.657 }, // vechi 0.405 (×1.62)
        { min: 2000, price: 0.486 }, // vechi 0.30 (×1.62)
        { min: 3000, price: 0.438 }, // vechi 0.27 (×1.62)
        { min: 4000, price: 0.341 }, // vechi 0.21 (×1.62)
        { min: 5000, price: 0.268 }, // vechi 0.165 (×1.62)
      ],
      twoSided: [
        { min: 1, price: 1.701 }, // vechi 1.05 (×1.62)
        { min: 101, price: 1.458 }, // vechi 0.90 (×1.62)
        { min: 501, price: 1.215 }, // vechi 0.75 (×1.62)
        { min: 1000, price: 1.021 }, // vechi 0.63 (×1.62)
        { min: 2000, price: 0.778 }, // vechi 0.48 (×1.62)
        { min: 3000, price: 0.632 }, // vechi 0.39 (×1.62)
        { min: 4000, price: 0.462 }, // vechi 0.285 (×1.62)
        { min: 5000, price: 0.341 }, // vechi 0.21 (×1.62)
      ]
    },
  ],
  PAPER_WEIGHTS: [
    { key: "135", label: "135 g/m² (Standard)", multiplier: 1.0 },
    { key: "250", label: "250 g/m² (Premium +20%)", multiplier: 1.2 }
  ],
  PRO_FEE_PER_FACE: 50,
  DISCOUNT_PERCENT: 25, // Reducere 25%
};

export type PriceInputFlyer = { sizeKey: string; quantity: number; twoSided: boolean; paperWeightKey: string; designOption: "upload" | "pro" };

export const calculateFlyerPrice = (input: PriceInputFlyer) => {
  const sizeDef = FLYER_CONSTANTS.SIZES.find((x) => x.key === input.sizeKey);
  if (!sizeDef) return { finalPrice: 0, unitPrice: 0, proFee: 0 };

  const tiers = input.twoSided ? sizeDef.twoSided : sizeDef.oneSided;
  let baseUnit: number = tiers[0].price;

  // Găsim prețul corect în funcție de cantitate
  for (let i = tiers.length - 1; i >= 0; i--) {
    if (input.quantity >= tiers[i].min) {
      baseUnit = tiers[i].price;
      break;
    }
  }

  const multiplier = FLYER_CONSTANTS.PAPER_WEIGHTS.find((p) => p.key === input.paperWeightKey)?.multiplier ?? 1;
  const unitPrice = roundMoney(baseUnit * multiplier);
  const proFee = input.designOption === "pro" ? (input.twoSided ? FLYER_CONSTANTS.PRO_FEE_PER_FACE * 2 : FLYER_CONSTANTS.PRO_FEE_PER_FACE) : 0;

  return { finalPrice: roundMoney(unitPrice * input.quantity + proFee), unitPrice, proFee };
};

// --- UPSELL FOR FLYER ---
export const getFlyerUpsell = (input: PriceInputFlyer): UpsellResult => {
  const sizeDef = FLYER_CONSTANTS.SIZES.find((x) => x.key === input.sizeKey);
  if (!sizeDef) return null;

  const tiers = input.twoSided ? sizeDef.twoSided : sizeDef.oneSided;
  const priceData = calculateFlyerPrice(input);
  const currentUnitPrice = priceData.unitPrice;

  return calculateUpsellByQuantity(
    input.quantity,
    currentUnitPrice,
    tiers,
    (newQty) => calculateFlyerPrice({ ...input, quantity: newQty })
  );
};

// ==========================================
// 12. PLIANTE
// ==========================================
export type PlianteFoldType = "simplu" | "fereastra" | "paralel" | "fluture";
export type PlianteWeightKey = "115" | "135" | "150" | "170" | "200" | "250";

export const PLIANTE_CONSTANTS = {
  FOLDS: {
    simplu: { label: "1 big (Simplu)", open: "297×210mm", closed: "148.5×210mm" },
    fereastra: { label: "2 biguri (Fereastră)", open: "297×210mm", closed: "148.5×210mm" },
    paralel: { label: "3 biguri (Paralel)", open: "297×210mm", closed: "75×210mm" },
    fluture: { label: "4 biguri (Fluture)", open: "297×210mm", closed: "74.25×210mm" },
  } as Record<PlianteFoldType, { label: string; open: string; closed: string }>,
  // Cost real PrintCenter fără TVA (pliant A4 biguit): 1,49 lei/buc (100 buc, 130 g) / 0,89 (510 buc, 115 g); o comandă
  // de 2 buc = 10 lei (vezi MIN_ORDER_PRICE). Tabelele vechi × 1,62 → 2 × cost × 1,21; toate gramajele în aceeași proporție.
  PRICE_TABLE: {
    "115": [
      { min: 1, price: 3.629 }, // vechi 2.24 (×1.62)
      { min: 500, price: 2.246 }, // vechi 1.386 (×1.62)
      { min: 1000, price: 1.565 }, // vechi 0.966 (×1.62)
      { min: 2500, price: 0.93 }, // vechi 0.574 (×1.62)
      { min: 5000, price: 0.658 }, // vechi 0.406 (×1.62)
      { min: 10000, price: 0.567 }, // vechi 0.35 (×1.62)
    ],
    "135": [
      { min: 1, price: 3.743 }, // vechi 2.31 (×1.62)
      { min: 500, price: 2.359 }, // vechi 1.456 (×1.62)
      { min: 1000, price: 1.679 }, // vechi 1.036 (×1.62)
      { min: 2500, price: 1.044 }, // vechi 0.644 (×1.62)
      { min: 5000, price: 0.772 }, // vechi 0.476 (×1.62)
      { min: 10000, price: 0.681 }, // vechi 0.42 (×1.62)
    ],
    "150": [
      { min: 1, price: 3.856 }, // vechi 2.38 (×1.62)
      { min: 500, price: 2.473 }, // vechi 1.526 (×1.62)
      { min: 1000, price: 1.792 }, // vechi 1.106 (×1.62)
      { min: 2500, price: 1.157 }, // vechi 0.714 (×1.62)
      { min: 5000, price: 0.885 }, // vechi 0.546 (×1.62)
      { min: 10000, price: 0.794 }, // vechi 0.49 (×1.62)
    ],
    "170": [
      { min: 1, price: 3.969 }, // vechi 2.45 (×1.62)
      { min: 500, price: 2.586 }, // vechi 1.596 (×1.62)
      { min: 1000, price: 1.906 }, // vechi 1.176 (×1.62)
      { min: 2500, price: 1.271 }, // vechi 0.784 (×1.62)
      { min: 5000, price: 0.998 }, // vechi 0.616 (×1.62)
      { min: 10000, price: 0.908 }, // vechi 0.56 (×1.62)
    ],
    "200": [
      { min: 1, price: 4.083 }, // vechi 2.52 (×1.62)
      { min: 500, price: 2.699 }, // vechi 1.666 (×1.62)
      { min: 1000, price: 2.019 }, // vechi 1.246 (×1.62)
      { min: 2500, price: 1.384 }, // vechi 0.854 (×1.62)
      { min: 5000, price: 1.112 }, // vechi 0.686 (×1.62)
      { min: 10000, price: 1.021 }, // vechi 0.63 (×1.62)
    ],
    "250": [
      { min: 1, price: 4.196 }, // vechi 2.59 (×1.62)
      { min: 500, price: 2.813 }, // vechi 1.736 (×1.62)
      { min: 1000, price: 2.132 }, // vechi 1.316 (×1.62)
      { min: 2500, price: 1.497 }, // vechi 0.924 (×1.62)
      { min: 5000, price: 1.225 }, // vechi 0.756 (×1.62)
      { min: 10000, price: 1.134 }, // vechi 0.70 (×1.62)
    ],
  } as Record<PlianteWeightKey, { min: number; price: number }[]>,
  PRO_FEES: { simplu: 100, fereastra: 135, paralel: 175, fluture: 200 } as Record<PlianteFoldType, number>,
  DISCOUNT_PERCENT: 30, // Reducere 30%
  /** Comanda minimă (lei): PrintCenter ia ~10 lei fără TVA pe o comandă foarte mică → min 2 × 10 × 1,21. */
  MIN_ORDER_PRICE: 25,
};

export type PriceInputPliante = { weight: PlianteWeightKey; quantity: number; fold: PlianteFoldType; designOption: "upload" | "pro" };

export const calculatePliantePrice = (input: PriceInputPliante) => {
  const tiers = PLIANTE_CONSTANTS.PRICE_TABLE[input.weight];
  if (!tiers) {
    return { finalPrice: 0, pricePerUnit: 0, proFee: 0 };
  }
  let unitBasePrice: number = tiers[0].price;

  // Găsim prețul corect în funcție de cantitate
  for (let i = tiers.length - 1; i >= 0; i--) {
    if (input.quantity >= tiers[i].min) {
      unitBasePrice = tiers[i].price;
      break;
    }
  }

  const subtotal = Math.max(roundMoney(unitBasePrice * input.quantity), PLIANTE_CONSTANTS.MIN_ORDER_PRICE);
  const proFee = input.designOption === "pro" ? (PLIANTE_CONSTANTS.PRO_FEES[input.fold] ?? 0) : 0;
  const finalPrice = roundMoney(subtotal + proFee);
  const pricePerUnit = roundMoney(finalPrice / input.quantity);
  return { finalPrice, pricePerUnit, proFee };
};

// --- UPSELL FOR PLIANTE ---
export const getPlianteUpsell = (input: PriceInputPliante): UpsellResult => {
  const weight = PLIANTE_CONSTANTS.PRICE_TABLE[input.weight] ? input.weight : "115";
  const tiers = PLIANTE_CONSTANTS.PRICE_TABLE[weight];
  if (!tiers) return null;

  const priceData = calculatePliantePrice({ ...input, weight });
  const currentUnitPrice = priceData.pricePerUnit;

  return calculateUpsellByQuantity(
    input.quantity,
    currentUnitPrice,
    tiers,
    (newQty) => calculatePliantePrice({ ...input, weight, quantity: newQty })
  );
};

// ==========================================
// 13. TAPET
// ==========================================
export const TAPET_CONSTANTS = {
  PRICES: {
    bands: [
      { max_sqm: 1, price_per_sqm: 150 },
      { max_sqm: 5, price_per_sqm: 140 },
      { max_sqm: 20, price_per_sqm: 130 },
      { max_sqm: Infinity, price_per_sqm: 120 },
    ],
    multipliers: { adhesive: 1.10 }
  },
  PRO_DESIGN_FEE: 200,
};

export type PriceInputTapet = { width_cm: number; height_cm: number; quantity: number; want_adhesive: boolean; designOption: "upload" | "pro" };

export const calculateTapetPrice = (input: PriceInputTapet) => {
  if (input.width_cm <= 0 || input.height_cm <= 0) return { finalPrice: 0, total_sqm: 0, pricePerUnit: 0 };
  const sqmPerUnit = (input.width_cm / 100) * (input.height_cm / 100);
  const totalSqm = roundMoney(sqmPerUnit * input.quantity);

  // Găsim prețul pe mp în funcție de totalul de mp
  let pricePerSqm = 120; // default pentru > 20 MP
  for (const band of TAPET_CONSTANTS.PRICES.bands) {
    if (totalSqm <= band.max_sqm) {
      pricePerSqm = band.price_per_sqm;
      break;
    }
  }

  if (totalSqm < 0.1) pricePerSqm *= 5;
  else if (totalSqm < 0.2) pricePerSqm *= 4;
  else if (totalSqm < 0.3) pricePerSqm *= 3;
  else if (totalSqm < 0.4) pricePerSqm *= 2;
  else if (totalSqm < 0.5) pricePerSqm *= 1.5;

  // Aplicăm adaos 10% pentru auto-adeziv
  if (input.want_adhesive) pricePerSqm *= TAPET_CONSTANTS.PRICES.multipliers.adhesive;

  let finalPrice = roundMoney(totalSqm * pricePerSqm);
  if (input.designOption === "pro") finalPrice += TAPET_CONSTANTS.PRO_DESIGN_FEE;
  return { finalPrice: roundMoney(finalPrice), totalSqm, pricePerUnit: roundMoney(finalPrice / input.quantity) };
};

// --- UPSELL FOR TAPET ---
export const getTapetUpsell = (input: PriceInputTapet): UpsellResult => {
  if (input.width_cm <= 0 || input.height_cm <= 0) return null;

  const priceData = calculateTapetPrice(input);
  const sqmPerUnit = (input.width_cm / 100) * (input.height_cm / 100);
  const currentTotalSqm = sqmPerUnit * input.quantity;
  const currentUnitPrice = priceData.finalPrice / input.quantity;

  // Transformăm benzile din formatul tapet în formatul generic
  const transformedBands = TAPET_CONSTANTS.PRICES.bands.map(b => ({ max: b.max_sqm, price: b.price_per_sqm }));

  return calculateUpsellGeneric(
    currentTotalSqm,
    sqmPerUnit,
    input.quantity,
    currentUnitPrice,
    transformedBands,
    (newQty) => calculateTapetPrice({ ...input, quantity: newQty })
  );
};

// ==========================================
// 14. FONDURI EU (KIT VIZIBILITATE)
// ==========================================
export const FONDURI_EU_CONSTANTS = {
  GROUPS: {
    comunicat: {
      title: "Comunicat de presă",
      options: [
        { id: "none", label: "Fără comunicat", price: 0 },
        { id: "start", label: "Începere proiect (dovadă 3000 vizitatori)", price: 690 },
        { id: "final", label: "Finalizare (dovadă 3000 vizitatori)", price: 690 },
        { id: "start+final", label: "Începere + Finalizare", price: 1380 },
      ],
    },
    bannerSite: {
      title: "Banner site",
      options: [
        { id: "none", label: "Fără banner", price: 0 },
        { id: "with", label: "Banner site (Digital)", price: 100 },
      ],
    },
    afisInformativ: {
      title: "Afiș informativ",
      options: [
        { id: "none", label: "Fără afiș", price: 0 },
        { id: "A4", label: "Format A4", price: 19 },
        { id: "A3", label: "Format A3", price: 49 },
        { id: "A2", label: "Format A2", price: 79 },
      ],
    },
    autoMici: {
      title: "Autocolante mici",
      options: [
        { id: "none", label: "Nu", price: 0 },
        { id: "10x10-20", label: "10×10 cm (set 20 buc)", price: 55 },
        { id: "15x15-10", label: "15×15 cm (set 10 buc)", price: 55 },
        { id: "15x21-5", label: "15×21 cm (set 5 buc)", price: 55 },
      ],
    },
    autoMari: {
      title: "Autocolante mari",
      options: [
        { id: "none", label: "Nu", price: 0 },
        { id: "30x30-3", label: "30×30 cm (set 3 buc)", price: 55 },
        { id: "40x40-1", label: "40×40 cm (1 buc)", price: 55 },
      ],
    },
    panouTemporar: {
      title: "Panou temporar",
      options: [
        { id: "none", label: "Nu", price: 0 },
        { id: "A2", label: "Format A2", price: 200 },
        { id: "80x50", label: "80×50 cm", price: 290 },
        { id: "200x150", label: "200×150 cm", price: 700 },
        { id: "300x200", label: "300×200 cm", price: 1390 },
      ],
    },
    placaPermanenta: {
      title: "Placă permanentă",
      options: [
        { id: "none", label: "Nu", price: 0 },
        { id: "A2", label: "Format A2", price: 200 },
        { id: "80x50", label: "80×50 cm", price: 290 },
        { id: "150x100", label: "150×100 cm", price: 550 },
      ],
    },
  },
};

export function getFonduriEUGroups(isRegio: boolean = false) {
  const baseGroups = FONDURI_EU_CONSTANTS.GROUPS;

  const comunicatOptions = isRegio ? [
    { id: "none", label: "Fără comunicat", price: 0 },
    { id: "start", label: "Începere proiect (dovadă 3000 vizitatori)", price: 690 },
    { id: "final", label: "Finalizare (dovadă 3000 vizitatori)", price: 690 },
    { id: "start+final", label: "Începere + Finalizare", price: 1380 },
  ] : [
    { id: "none", label: "Fără comunicat", price: 0 },
    { id: "start", label: "Începere proiect", price: 490 },
    { id: "final", label: "Finalizare", price: 490 },
    { id: "start+final", label: "Începere + Finalizare", price: 980 },
  ];

  return {
    ...baseGroups,
    comunicat: {
      ...baseGroups.comunicat,
      options: comunicatOptions
    }
  };
}

export type PriceInputFonduriEU = {
  selections: Record<string, string>;
  isRegio?: boolean;
};

export const calculateFonduriEUPrice = (input: PriceInputFonduriEU) => {
  let finalPrice = 0;
  const groups = getFonduriEUGroups(input.isRegio);

  for (const groupKey in groups) {
    const key = groupKey as keyof typeof groups;
    const selectedValue = input.selections[key];
    if (selectedValue && selectedValue !== "none" && selectedValue !== "Nu") {
      const groupOptions = groups[key].options;
      // Search by ID first, then by Label
      const option = groupOptions.find(o => o.id === selectedValue) ||
        groupOptions.find(o => o.label === selectedValue);

      if (option) {
        finalPrice += option.price;
      }
    }
  }

  return { finalPrice: roundMoney(finalPrice) };
};

// ==========================================
// WINDOW GRAPHICS
// ==========================================
export const WINDOW_GRAPHICS_CONSTANTS = {
  PRICES: {
    // cost real window graphic (folie microperforată): mediana 76,49 lei/m² fără TVA → min 185,1 lei/m² (acoperit și la
    // „Doar print”, −20%); o comandă de 180×73 cm a costat 101,86 lei/m² → min 246,5 lei/m² la print + tăiere.
    bands: [
      { max: 1, price: 255 },
      { max: 5, price: 250 },
      { max: 20, price: 245 },
      { max: Infinity, price: 242 },
    ]
  },
  PRO_DESIGN_FEE: 100,
  /** Comanda minimă (lei), ca la autocolante: o linie mică la PrintCenter costă 20–25 lei fără TVA. */
  MIN_ORDER_PRICE: 61,
};

export type PriceInputWindowGraphics = {
  width_cm: number;
  height_cm: number;
  quantity: number;
  designOption: "upload" | "pro";
  print_type?: "print_cut" | "print_only";
  laminated?: boolean;
};

export const calculateWindowGraphicsPrice = (input: PriceInputWindowGraphics) => {
  const { width_cm, height_cm, quantity, designOption } = input;

  if (width_cm <= 0 || height_cm <= 0) {
    return {
      finalPrice: 0,
      pricePerSqm: 0,
      total_sqm: 0,
      designFee: 0,
    };
  }

  const total_sqm = (width_cm * height_cm * quantity) / 10000;

  let pricePerSqm = WINDOW_GRAPHICS_CONSTANTS.PRICES.bands[0].price;
  for (const band of WINDOW_GRAPHICS_CONSTANTS.PRICES.bands) {
    if (total_sqm <= band.max) {
      pricePerSqm = band.price;
      break;
    }
  }

  // Production modifiers
  if (input.print_type === "print_only") {
    pricePerSqm = roundMoney(pricePerSqm * 0.8);
  }
  if (input.laminated) {
    pricePerSqm = roundMoney(pricePerSqm * 1.1);
  }

  let finalPrice = Math.max(roundMoney(total_sqm * pricePerSqm), WINDOW_GRAPHICS_CONSTANTS.MIN_ORDER_PRICE);

  // Add design fee if pro option
  const designFee = designOption === "pro" ? WINDOW_GRAPHICS_CONSTANTS.PRO_DESIGN_FEE : 0;
  finalPrice += designFee;

  return {
    finalPrice: roundMoney(finalPrice),
    pricePerSqm,
    total_sqm: roundMoney(total_sqm),
    designFee,
  };
};

// --- UPSELL FOR WINDOW GRAPHICS ---
export const getWindowGraphicsUpsell = (input: PriceInputWindowGraphics): UpsellResult => {
  if (input.width_cm <= 0 || input.height_cm <= 0) return null;

  const priceData = calculateWindowGraphicsPrice(input);
  const sqmPerUnit = (input.width_cm / 100) * (input.height_cm / 100);
  const currentTotalSqm = sqmPerUnit * input.quantity;
  const currentUnitPrice = priceData.finalPrice / input.quantity;

  return calculateUpsellGeneric(
    currentTotalSqm,
    sqmPerUnit,
    input.quantity,
    currentUnitPrice,
    WINDOW_GRAPHICS_CONSTANTS.PRICES.bands,
    (newQty) => calculateWindowGraphicsPrice({ ...input, quantity: newQty })
  );
};

// ==========================================
// ROLLUP BANNER
// ==========================================
export const ROLLUP_CONSTANTS = {
  SIZES: [
    { width_cm: 85, label: "Compact" },
    { width_cm: 100, label: "Standard" },
    { width_cm: 120, label: "Mare" },
    { width_cm: 150, label: "Premium" },
  ],
  // Roll-up-urile vin de la un furnizor alternativ (nu PrintCenter), deci regula 2 × cost PrintCenter nu se aplică
  // (decizia proprietarului, 08.10.2026). Tabelul vechi × 1,12 (100×200: 250 → 280 lei), aceleași proporții de reducere.
  PRICE_TABLE: {
    85: [
      { min: 1, max: 5, price: 249 },
      { min: 6, max: 10, price: 225 },
      { min: 11, max: 20, price: 215 },
      { min: 21, max: Infinity, price: 199 },
    ],
    100: [
      { min: 1, max: 5, price: 280 },
      { min: 6, max: 10, price: 269 },
      { min: 11, max: 20, price: 259 },
      { min: 21, max: Infinity, price: 225 },
    ],
    120: [
      { min: 1, max: 5, price: 329 },
      { min: 6, max: 10, price: 305 },
      { min: 11, max: 20, price: 285 },
      { min: 21, max: Infinity, price: 259 },
    ],
    150: [
      { min: 1, max: 5, price: 439 },
      { min: 6, max: 10, price: 415 },
      { min: 11, max: 20, price: 405 },
      { min: 21, max: Infinity, price: 369 },
    ],
  },
  PRO_DESIGN_FEE: 100,
};

export type PriceInputRollup = {
  width_cm: number;
  quantity: number;
  designOption: "upload" | "pro";
};

export const calculateRollupPrice = (input: PriceInputRollup) => {
  const { width_cm, quantity, designOption } = input;

  // Get price table for selected width
  const priceTable = ROLLUP_CONSTANTS.PRICE_TABLE[width_cm as keyof typeof ROLLUP_CONSTANTS.PRICE_TABLE];

  if (!priceTable) {
    return {
      finalPrice: 0,
      unitPrice: 0,
      designFee: 0,
    };
  }

  // Find price per unit based on quantity
  let unitPrice = priceTable[0].price;
  for (const tier of priceTable) {
    if (quantity >= tier.min && quantity <= tier.max) {
      unitPrice = tier.price;
      break;
    }
  }

  let finalPrice = unitPrice * quantity;

  // Add design fee if pro option
  const designFee = designOption === "pro" ? ROLLUP_CONSTANTS.PRO_DESIGN_FEE : 0;
  finalPrice += designFee;

  return {
    finalPrice: roundMoney(finalPrice),
    unitPrice,
    designFee,
  };
};

// --- UPSELL FOR ROLLUP ---
export const getRollupUpsell = (input: PriceInputRollup): UpsellResult => {
  const priceTable = ROLLUP_CONSTANTS.PRICE_TABLE[input.width_cm as keyof typeof ROLLUP_CONSTANTS.PRICE_TABLE];
  if (!priceTable) return null;

  const priceData = calculateRollupPrice(input);
  const currentUnitPrice = priceData.unitPrice;

  return calculateUpsellByQuantity(
    input.quantity,
    currentUnitPrice,
    priceTable,
    (newQty) => calculateRollupPrice({ ...input, quantity: newQty })
  );
};

// ==========================================
// 16. CANVAS MARTISOR
// ==========================================
export const CANVAS_MARTISOR_CONSTANTS = {
  SIZES: [
    { key: "40x60", label: "40×60 cm", basePrice: 149 },
    { key: "60x90", label: "60×90 cm", basePrice: 249 },
  ],
  QUANTITY_DISCOUNTS: [], // No discounts requested
  PRO_DESIGN_FEE: 0,
};

export type PriceInputCanvasMartisor = {
  sizeKey: string;
  quantity: number;
  customText?: string;
  designOption: "upload" | "pro";
};

export const calculateCanvasMartisorPrice = (input: PriceInputCanvasMartisor) => {
  const sizeDef = CANVAS_MARTISOR_CONSTANTS.SIZES.find(s => s.key === input.sizeKey);
  if (!sizeDef) return { finalPrice: 0, unitPrice: 0 };

  const unitPrice = sizeDef.basePrice;
  const totalPrice = unitPrice * input.quantity;

  return {
    finalPrice: roundMoney(totalPrice),
    unitPrice: roundMoney(unitPrice),
  };
};

// ==========================================
// 17. CANVAS 8 MARTIE
// ==========================================
export const CANVAS_8_MARTIE_CONSTANTS = {
  SIZES: [
    { key: "40x60", label: "40×60 cm", basePrice: 149 },
    { key: "60x90", label: "60×90 cm", basePrice: 249 },
  ],
  QUANTITY_DISCOUNTS: [],
  PRO_DESIGN_FEE: 0,
};

export type PriceInputCanvas8Martie = PriceInputCanvasMartisor;

export const calculateCanvas8MartiePrice = (input: PriceInputCanvas8Martie) => {
  const sizeDef = CANVAS_8_MARTIE_CONSTANTS.SIZES.find(s => s.key === input.sizeKey);
  if (!sizeDef) return { finalPrice: 0, unitPrice: 0 };

  const unitPrice = sizeDef.basePrice;
  const totalPrice = unitPrice * input.quantity;

  return {
    finalPrice: roundMoney(totalPrice),
    unitPrice: roundMoney(unitPrice),
  };
};


// ==========================================
// 9. TEXTILE (TRICOURI / HANORACE)
// ==========================================
type TextilePriceDef = {
  base: number;
  fata_si_spate: number;
  cost: { fata: number; fata_si_spate: number };
  /** preț stabilit de proprietar: fără pragul 2 × cost */
  ownerPrice?: boolean;
  volumeDiscounts?: { min: number; factor: number }[];
};

export const TEXTILE_CONSTANTS = {
  // Prețul pe bucată (produs + tipar față); fata_si_spate = adaosul pentru tipar și pe spate.
  // cost = costul real PrintCenter fără TVA (produs + personalizare, din comenzi), pentru minimul 2 × cost × 1,21.
  PRICES: {
    tricouri: { base: 79, fata_si_spate: 25, cost: { fata: 30.15, fata_si_spate: 40.15 } }, // tricou basic
    v_neck: { base: 99, fata_si_spate: 25, cost: { fata: 39, fata_si_spate: 49 } },
    polo: { base: 139, fata_si_spate: 25, cost: { fata: 54.14, fata_si_spate: 61.14 } }, // polo pique (adulți / copii)
    // Hanorac: preț stabilit de proprietar (08.10.2026), sub regula 2 × cost (cost real 117,38 lei fără TVA = 142 cu TVA,
    // marjă ~35% la 220 lei); reduceri mici proprii, minim ~200 lei la 50 buc, fără pragul de cost.
    hanorace: {
      base: 220, fata_si_spate: 30, cost: { fata: 117.38, fata_si_spate: 124.38 }, ownerPrice: true,
      volumeDiscounts: [{ min: 50, factor: 0.91 }, { min: 30, factor: 0.94 }, { min: 10, factor: 0.97 }],
    },
    sepci: { base: 65, fata_si_spate: 0, cost: { fata: 24.94, fata_si_spate: 24.94 } },
  } as Record<"tricouri" | "v_neck" | "polo" | "hanorace" | "sepci", TextilePriceDef>,
  /** Reduceri de volum; prețul pe bucată nu coboară sub 2 × cost × 1,21 (PrintCenter nu ne dă reducere de volum). */
  VOLUME_DISCOUNTS: [
    { min: 50, factor: 0.8 },
    { min: 30, factor: 0.85 },
    { min: 10, factor: 0.9 },
  ],
  PRO_DESIGN_FEE: 50,
};

export type PriceInputTextile = {
  type: "tricouri" | "hanorace" | "sepci";
  model?: string;
  quantity: number;
  size: "XS" | "S" | "M" | "L" | "XL" | "2XL" | "3XL" | string;
  color: string;
  printPosition: "fata" | "spate" | "fata_si_spate" | string;
  designOption: "upload" | "text_only" | "pro" | string;
};

export const calculateTextilePrice = (input: PriceInputTextile) => {
  if (input.quantity <= 0) {
    return { finalPrice: 0, pricePerUnit: 0 };
  }

  // Prețuri pe model: polo și V-neck au costuri proprii
  const isPolo = input.model?.startsWith('polo_pique');
  const isVNeck = input.model?.startsWith('v_neck');
  const baseData = isPolo
    ? TEXTILE_CONSTANTS.PRICES.polo
    : isVNeck
      ? TEXTILE_CONSTANTS.PRICES.v_neck
      : TEXTILE_CONSTANTS.PRICES[input.type] ?? TEXTILE_CONSTANTS.PRICES.tricouri;

  const bothSides = input.printPosition === 'fata_si_spate';
  let unitPrice = baseData.base + (bothSides ? baseData.fata_si_spate : 0);

  // Reducere de volum, dar nu sub minimul regulii (2 × cost real)
  const discount = (baseData.volumeDiscounts ?? TEXTILE_CONSTANTS.VOLUME_DISCOUNTS).find((d) => input.quantity >= d.min);
  if (discount) unitPrice *= discount.factor;
  if (!baseData.ownerPrice) {
    unitPrice = Math.max(unitPrice, minPriceForCost(bothSides ? baseData.cost.fata_si_spate : baseData.cost.fata));
  }

  let finalPrice = roundMoney(unitPrice * input.quantity);

  if (input.designOption === "pro") {
    finalPrice += TEXTILE_CONSTANTS.PRO_DESIGN_FEE;
  }

  return { finalPrice: roundMoney(finalPrice), pricePerUnit: roundMoney(finalPrice / input.quantity) };
};

export const getTextileUpsell = (input: PriceInputTextile): UpsellResult => {
  // Simplu upsell bazat pe cantitati prags 10, 30, 50
  const tiers = [
    { min: 10, price: 0 },
    { min: 30, price: 0 },
    { min: 50, price: 0 }
  ];

  const priceData = calculateTextilePrice(input);
  const currentUnitPrice = priceData.finalPrice / input.quantity;

  return calculateUpsellByQuantity(
    input.quantity,
    currentUnitPrice,
    tiers,
    (newQty) => calculateTextilePrice({ ...input, quantity: newQty })
  );
};

// ==========================================
// 19. CARȚI DE VIZITĂ
// ==========================================
const BUSINESS_CARD_PRICE_MULTIPLIER = 1.5;

export const BUSINESS_CARD_CONSTANTS = {
  PRICES: {
    // Prețul final = preț × 1,5 (BUSINESS_CARD_PRICE_MULTIPLIER). Cost real carton 300–350 g față, fără TVA: 0,27 lei
    // (< 250 buc) / 0,20 (250–499) / 0,18 (≥ 500) → min 0,654 / 0,484 / 0,436 lei pe bucată; pragurile urmează pe ale
    // PrintCenter. Peste 2000 buc (fără comenzi reale) aceeași proporție ca înainte.
    standard: [
      { max: 249, price: 0.44 },
      { max: 499, price: 0.33 },
      { max: 1999, price: 0.30 },
      { max: Infinity, price: 0.24 }
    ],
    plastic: [
      { max: 100, price: 1.60 }, // 0.5mm
      { max: 300, price: 1.50 },
      { max: 500, price: 1.20 },
      { max: Infinity, price: 1.00 }
    ],
    plastic_07: [
      { max: 100, price: 2.10 },
      { max: 300, price: 1.90 },
      { max: 500, price: 1.60 },
      { max: Infinity, price: 1.50 }
    ],
    lemn: [
      { max: 20, price: 3.50 },
      { max: 50, price: 2.80 },
      { max: 100, price: 2.20 },
      { max: 500, price: 2.00 },
      { max: Infinity, price: 1.79 }
    ],
    metalice_02_silver_gold: [
      { max: 50, price: 1.90 },
      { max: 100, price: 1.70 },
      { max: 200, price: 1.50 },
      { max: 500, price: 1.35 },
      { max: Infinity, price: 1.20 }
    ],
    metalice_02_colors: [
      { max: 50, price: 2.20 },
      { max: 100, price: 2.00 },
      { max: 200, price: 1.80 },
      { max: 500, price: 1.60 },
      { max: Infinity, price: 1.40 }
    ],
    metalice_duraluxe: [
      { max: 50, price: 7.90 },
      { max: 100, price: 6.90 },
      { max: 200, price: 5.90 },
      { max: 500, price: 4.90 },
      { max: Infinity, price: 3.90 }
    ]
  },
  FINISH_ADDONS: {
    special_shape: 0.20,
    rounded_corners: 0.20,
    two_sided_multiplier: 1.6,
  },
  PRO_DESIGN_FEE: 50,
};

export type PriceInputBusinessCard = {
  type: 'standard' | 'plastic' | 'lemn' | 'metalice' | string;
  materialId?: string;
  quantity: number;
  twoSided?: boolean;
  roundedCorners?: boolean;
  specialShape?: boolean;
  designOption?: 'upload' | 'pro' | string;
};

export const calculateBusinessCardPrice = (input: PriceInputBusinessCard) => {
  if (input.quantity <= 0) return { finalPrice: 0, pricePerUnit: 0 };

  let tiers = BUSINESS_CARD_CONSTANTS.PRICES.standard;

  if (input.type === 'plastic' || input.type === 'transparent') {
    tiers = input.materialId === 'pvc-07' ? BUSINESS_CARD_CONSTANTS.PRICES.plastic_07 : BUSINESS_CARD_CONSTANTS.PRICES.plastic;
  } else if (input.type === 'lemn') {
    tiers = BUSINESS_CARD_CONSTANTS.PRICES.lemn;
  } else if (input.type === 'metalice') {
    if (input.materialId === 'duraluxe') tiers = BUSINESS_CARD_CONSTANTS.PRICES.metalice_duraluxe;
    else if (['black', 'blue', 'red'].includes(input.materialId || '')) tiers = BUSINESS_CARD_CONSTANTS.PRICES.metalice_02_colors;
    else tiers = BUSINESS_CARD_CONSTANTS.PRICES.metalice_02_silver_gold;
  }

  const tier = tiers.find(t => input.quantity <= t.max) || tiers[tiers.length - 1];
  let unitPrice = tier.price;

  if (input.twoSided) unitPrice *= BUSINESS_CARD_CONSTANTS.FINISH_ADDONS.two_sided_multiplier;
  if (input.roundedCorners) unitPrice += BUSINESS_CARD_CONSTANTS.FINISH_ADDONS.rounded_corners;
  if (input.specialShape) unitPrice += BUSINESS_CARD_CONSTANTS.FINISH_ADDONS.special_shape;

  let finalPrice = roundMoney(unitPrice * input.quantity);

  if (input.designOption === 'pro') {
    finalPrice += BUSINESS_CARD_CONSTANTS.PRO_DESIGN_FEE;
  }

  finalPrice = roundMoney(finalPrice * BUSINESS_CARD_PRICE_MULTIPLIER);

  return {
    finalPrice: roundMoney(finalPrice),
    pricePerUnit: roundMoney(finalPrice / input.quantity)
  };
};

export const getBusinessCardUpsell = (input: PriceInputBusinessCard): UpsellResult => {
  let tiersArr = BUSINESS_CARD_CONSTANTS.PRICES.standard;
  if (input.type === 'plastic' || input.type === 'transparent') {
    tiersArr = input.materialId === 'pvc-07' ? BUSINESS_CARD_CONSTANTS.PRICES.plastic_07 : BUSINESS_CARD_CONSTANTS.PRICES.plastic;
  } else if (input.type === 'lemn') {
    tiersArr = BUSINESS_CARD_CONSTANTS.PRICES.lemn;
  } else if (input.type === 'metalice') {
    if (input.materialId === 'duraluxe') tiersArr = BUSINESS_CARD_CONSTANTS.PRICES.metalice_duraluxe;
    else if (['black', 'blue', 'red'].includes(input.materialId || '')) tiersArr = BUSINESS_CARD_CONSTANTS.PRICES.metalice_02_colors;
    else tiersArr = BUSINESS_CARD_CONSTANTS.PRICES.metalice_02_silver_gold;
  }

  const tiers = tiersArr.filter(t => t.max !== Infinity).map(t => ({ min: t.max + 1, price: 0 }));

  const priceData = calculateBusinessCardPrice(input);
  const currentUnitPrice = priceData.finalPrice / input.quantity;

  return calculateUpsellByQuantity(
    input.quantity,
    currentUnitPrice,
    tiers,
    (newQty) => calculateBusinessCardPrice({ ...input, quantity: newQty })
  );
};
// ==========================================
// 15. COMUNICATE PRESĂ
// ==========================================
export type ComunicatType = "incepere" | "finalizare" | "ambele";

export const COMUNICATE_CONSTANTS = {
  TYPES: [
    { key: "incepere" as const, label: "Anunț Începere Proiect", price: 490 },
    { key: "finalizare" as const, label: "Anunț Finalizare Proiect", price: 490 },
    { key: "ambele" as const, label: "Începere + Finalizare Proiect", price: 980 },
  ],
};

export type PriceInputComunicat = {
  type: ComunicatType;
  designOption: "upload" | "text_only";
  quantity: number;
};

export const calculateComunicatPrice = (input: PriceInputComunicat) => {
  const typeDef = COMUNICATE_CONSTANTS.TYPES.find(t => t.key === input.type);
  const unitPrice = typeDef?.price || 490;
  const finalPrice = unitPrice * input.quantity;

  return {
    unitPrice,
    finalPrice,
    proFee: 0
  };
};

// ==========================================
// 16. AUTOCOLANTE SET (FONDURI EU)
// ==========================================
export const AUTOCOLANTE_SET_CONSTANTS = {
  // cost real PrintCenter pentru un set (3641, tăiat): ~20,4 lei fără TVA → min 49,3 lei (era 49)
  OPTIONS: [
    { id: "10x10-20", label: "Set 10x10 cm (20 buc)", price: 55 },
    { id: "15x15-10", label: "Set 15x15 cm (10 buc)", price: 55 },
    { id: "15x21-5", label: "Set 15x21 cm (5 buc)", price: 55 },
    { id: "15x21-10", label: "Set 15x21 cm (10 buc)", price: 55 },
    { id: "30x30-3", label: "Set 30x30 cm (3 buc)", price: 55 },
    { id: "40x40-1", label: "Set 40x40 cm (1 buc)", price: 55 },
  ],
};

export type PriceInputAutocolanteSet = {
  optionId: string;
  quantity: number;
};

export const calculateAutocolanteSetPrice = (input: PriceInputAutocolanteSet) => {
  const option = AUTOCOLANTE_SET_CONSTANTS.OPTIONS.find(o => o.id === input.optionId);
  const unitPrice = option?.price || 55;
  const finalPrice = unitPrice * input.quantity;

  return {
    unitPrice,
    finalPrice,
  };
};
// ==========================================
// 17. PANOURI (PVC / ALUCOBOND)
// ==========================================
export const PANOURI_CONSTANTS = {
  OPTIONS: [
    { id: "a2", label: "A2 (42x59.4 cm)", width: 42, height: 59.4, pricePVC: 200 },
    { id: "80x50", label: "80x50 cm", width: 80, height: 50, pricePVC: 290 },
    { id: "70x50", label: "70x50 cm", width: 70, height: 50, pricePVC: 290 },
    { id: "150x100", label: "150x100 cm", width: 150, height: 100, pricePVC: 550 },
    { id: "200x150", label: "200x150 cm", width: 200, height: 150, pricePVC: 700 },
    { id: "300x200", label: "300x200 cm", width: 300, height: 200, pricePVC: 1390 },
  ],
  ALUCOBOND_MULTIPLIER: 1.5,
};

export type PriceInputPanou = {
  optionId: string;
  material: "pvc" | "alucobond";
  quantity: number;
};

export const calculatePanouPrice = (input: PriceInputPanou) => {
  const option = PANOURI_CONSTANTS.OPTIONS.find(o => o.id === input.optionId);
  if (!option) return { unitPrice: 0, finalPrice: 0 };

  let unitPrice = option.pricePVC;
  if (input.material === "alucobond") {
    unitPrice = roundMoney(unitPrice * PANOURI_CONSTANTS.ALUCOBOND_MULTIPLIER);
  }

  const finalPrice = unitPrice * input.quantity;

  return {
    unitPrice,
    finalPrice,
  };
};

// ==========================================
// PRODUSE NOI: calendare, steaguri beachflag, X-banner, panou stradal (people stopper)
// Prețul = dublul costului PrintCenter; costurile în data/productie/costuri-produse-noi.json.
// ==========================================
export * from "./produseNoi/pricing";
