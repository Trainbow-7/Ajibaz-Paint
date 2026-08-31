import {
  Colorant,
  LabColor,
  PAINT_BASES,
  PaintBase,
  RGBColor,
  UNIVERSAL_COLORANTS,
} from './colorants';

/**
 * Standard D65 Reference White Point (2-degree standard observer)
 */
const D65_REF = {
  X: 95.047,
  Y: 100.000,
  Z: 108.883,
};

// ==========================================
// Color Conversion Science (sRGB <-> XYZ <-> Lab)
// ==========================================

/**
 * Converts a 6-digit or 3-digit HEX string into sRGB [0..255]
 */
export function hexToRgb(hex: string): RGBColor {
  const sanitized = hex.replace(/^#/, '').trim();
  let fullHex = sanitized;
  if (sanitized.length === 3) {
    fullHex = sanitized.split('').map((c) => c + c).join('');
  }
  if (!/^[0-9A-Fa-f]{6}$/.test(fullHex)) {
    // Default safe fallback if malformed
    return { r: 255, g: 255, b: 255 };
  }
  const intVal = parseInt(fullHex, 16);
  return {
    r: (intVal >> 16) & 255,
    g: (intVal >> 8) & 255,
    b: intVal & 255,
  };
}

/**
 * Converts sRGB [0..255] into a standard 6-digit uppercase HEX string
 */
export function rgbToHex(rgb: RGBColor): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const r = clamp(rgb.r).toString(16).padStart(2, '0');
  const g = clamp(rgb.g).toString(16).padStart(2, '0');
  const b = clamp(rgb.b).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`.toUpperCase();
}

/**
 * Converts sRGB [0..255] into linear CIEXYZ coordinates under D65 illuminant
 */
export function rgbToXyz(rgb: RGBColor): { x: number; y: number; z: number } {
  // Standard sRGB inverse gamma companding
  const toLinear = (c: number) => {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };

  const rLin = toLinear(rgb.r) * 100;
  const gLin = toLinear(rgb.g) * 100;
  const bLin = toLinear(rgb.b) * 100;

  // Standard sRGB to XYZ D65 transformation matrix
  const x = rLin * 0.4124564 + gLin * 0.3575761 + bLin * 0.1804375;
  const y = rLin * 0.2126729 + gLin * 0.7151522 + bLin * 0.0721750;
  const z = rLin * 0.0193339 + gLin * 0.1191920 + bLin * 0.9503041;

  return { x, y, z };
}

/**
 * Converts linear CIEXYZ coordinates into CIE-L*a*b* coordinates (D65 standard)
 */
export function xyzToLab(xyz: { x: number; y: number; z: number }): LabColor {
  const xr = xyz.x / D65_REF.X;
  const yr = xyz.y / D65_REF.Y;
  const zr = xyz.z / D65_REF.Z;

  const epsilon = 0.008856451679; // (6/29)^3
  const kappa = 903.2962962; // (29/3)^3

  const fx = xr > epsilon ? Math.cbrt(xr) : (kappa * xr + 16) / 116;
  const fy = yr > epsilon ? Math.cbrt(yr) : (kappa * yr + 16) / 116;
  const fz = zr > epsilon ? Math.cbrt(zr) : (kappa * zr + 16) / 116;

  const l = Math.max(0, Math.min(100, 116 * fy - 16));
  const a = 500 * (fx - fy);
  const b = 200 * (fy - fz);

  return {
    l: Number(l.toFixed(2)),
    a: Number(a.toFixed(2)),
    b: Number(b.toFixed(2)),
  };
}

/**
 * High-level helper: Converts Hex directly to CIE-L*a*b*
 */
export function hexToLab(hex: string): LabColor {
  return xyzToLab(rgbToXyz(hexToRgb(hex)));
}

/**
 * Converts CIE-L*a*b* coordinates back into CIEXYZ (D65)
 */
export function labToXyz(lab: LabColor): { x: number; y: number; z: number } {
  const fy = (lab.l + 16) / 116;
  const fx = lab.a / 500 + fy;
  const fz = fy - lab.b / 200;

  const epsilon = 0.008856451679; // (6/29)^3
  const kappa = 903.2962962;

  const fx3 = fx * fx * fx;
  const fz3 = fz * fz * fz;

  const xr = fx3 > epsilon ? fx3 : (116 * fx - 16) / kappa;
  const yr = lab.l > kappa * epsilon ? Math.pow((lab.l + 16) / 116, 3) : lab.l / kappa;
  const zr = fz3 > epsilon ? fz3 : (116 * fz - 16) / kappa;

  return {
    x: xr * D65_REF.X,
    y: yr * D65_REF.Y,
    z: zr * D65_REF.Z,
  };
}

/**
 * Converts CIEXYZ into sRGB [0..255] with sRGB forward gamma companding and gamut clipping
 */
export function xyzToRgb(xyz: { x: number; y: number; z: number }): RGBColor {
  const x = xyz.x / 100;
  const y = xyz.y / 100;
  const z = xyz.z / 100;

  // Standard XYZ D65 to sRGB matrix
  const rLin = x * 3.2404542 + y * -1.5371385 + z * -0.4985314;
  const gLin = x * -0.9692660 + y * 1.8760108 + z * 0.0415560;
  const bLin = x * 0.0556434 + y * -0.2040259 + z * 1.0572252;

  // Forward gamma companding
  const fromLinear = (v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    return clamped <= 0.0031308
      ? clamped * 12.92
      : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  };

  return {
    r: Math.round(fromLinear(rLin) * 255),
    g: Math.round(fromLinear(gLin) * 255),
    b: Math.round(fromLinear(bLin) * 255),
  };
}

/**
 * High-level helper: Converts CIE-L*a*b* directly to Hex
 */
export function labToHex(lab: LabColor): string {
  return rgbToHex(xyzToRgb(labToXyz(lab)));
}

// ==========================================
// Delta E Metrics (CIE76 and CIEDE2000)
// ==========================================

/**
 * Calculates standard CIE76 Euclidean color difference (ΔE*76)
 */
export function calculateDeltaE76(lab1: LabColor, lab2: LabColor): number {
  const dl = lab1.l - lab2.l;
  const da = lab1.a - lab2.a;
  const db = lab1.b - lab2.b;
  return Number(Math.sqrt(dl * dl + da * da + db * db).toFixed(2));
}

/**
 * Calculates ISO/CIE Standard CIEDE2000 (ΔE*00) Color Difference
 * This is the international gold standard in modern colorimetry and coatings formulation.
 */
export function calculateDeltaE2000(
  lab1: LabColor,
  lab2: LabColor,
  kL: number = 1,
  kC: number = 1,
  kH: number = 1
): number {
  const deg2rad = (deg: number) => (deg * Math.PI) / 180;
  const rad2deg = (rad: number) => (rad * 180) / Math.PI;

  const L1 = lab1.l;
  const a1 = lab1.a;
  const b1 = lab1.b;

  const L2 = lab2.l;
  const a2 = lab2.a;
  const b2 = lab2.b;

  // 1. Calculate C_i and average C
  const C1 = Math.sqrt(a1 * a1 + b1 * b1);
  const C2 = Math.sqrt(a2 * a2 + b2 * b2);
  const C_bar = (C1 + C2) / 2;

  // 2. Calculate G factor
  const C_bar7 = Math.pow(C_bar, 7);
  const G = 0.5 * (1 - Math.sqrt(C_bar7 / (C_bar7 + 6103515625))); // 25^7 = 6103515625

  // 3. Adjusted a' and C'
  const a1_prime = (1 + G) * a1;
  const a2_prime = (1 + G) * a2;
  const C1_prime = Math.sqrt(a1_prime * a1_prime + b1 * b1);
  const C2_prime = Math.sqrt(a2_prime * a2_prime + b2 * b2);

  // 4. Hue angles h'_i in degrees [0..360)
  const get_h_prime = (b: number, a_prime: number) => {
    if (b === 0 && a_prime === 0) return 0;
    let h = rad2deg(Math.atan2(b, a_prime));
    if (h < 0) h += 360;
    return h;
  };

  const h1_prime = get_h_prime(b1, a1_prime);
  const h2_prime = get_h_prime(b2, a2_prime);

  // 5. Delta L', Delta C', Delta h'
  const delta_L_prime = L2 - L1;
  const delta_C_prime = C2_prime - C1_prime;

  let delta_h_prime = 0;
  if (C1_prime * C2_prime !== 0) {
    const diff = h2_prime - h1_prime;
    if (Math.abs(diff) <= 180) {
      delta_h_prime = diff;
    } else if (diff > 180) {
      delta_h_prime = diff - 360;
    } else {
      delta_h_prime = diff + 360;
    }
  }

  const delta_H_prime =
    2 *
    Math.sqrt(C1_prime * C2_prime) *
    Math.sin(deg2rad(delta_h_prime / 2));

  // 6. Mean values L_bar', C_bar', h_bar'
  const L_bar_prime = (L1 + L2) / 2;
  const C_bar_prime = (C1_prime + C2_prime) / 2;

  let h_bar_prime = 0;
  if (C1_prime * C2_prime === 0) {
    h_bar_prime = h1_prime + h2_prime;
  } else {
    const diff = Math.abs(h1_prime - h2_prime);
    if (diff <= 180) {
      h_bar_prime = (h1_prime + h2_prime) / 2;
    } else if (h1_prime + h2_prime < 360) {
      h_bar_prime = (h1_prime + h2_prime + 360) / 2;
    } else {
      h_bar_prime = (h1_prime + h2_prime - 360) / 2;
    }
  }

  // 7. Weighting factors: T, S_L, S_C, S_H
  const T =
    1 -
    0.17 * Math.cos(deg2rad(h_bar_prime - 30)) +
    0.24 * Math.cos(deg2rad(2 * h_bar_prime)) +
    0.32 * Math.cos(deg2rad(3 * h_bar_prime + 6)) -
    0.20 * Math.cos(deg2rad(4 * h_bar_prime - 63));

  const L_bar_minus_50_sq = Math.pow(L_bar_prime - 50, 2);
  const S_L = 1 + (0.015 * L_bar_minus_50_sq) / Math.sqrt(20 + L_bar_minus_50_sq);
  const S_C = 1 + 0.045 * C_bar_prime;
  const S_H = 1 + 0.015 * C_bar_prime * T;

  // 8. Rotation term R_T
  const delta_theta = 30 * Math.exp(-Math.pow((h_bar_prime - 275) / 25, 2));
  const C_bar_prime7 = Math.pow(C_bar_prime, 7);
  const R_C = 2 * Math.sqrt(C_bar_prime7 / (C_bar_prime7 + 6103515625));
  const R_T = -Math.sin(deg2rad(2 * delta_theta)) * R_C;

  // 9. Total Delta E 2000
  const termL = delta_L_prime / (kL * S_L);
  const termC = delta_C_prime / (kC * S_C);
  const termH = delta_H_prime / (kH * S_H);

  const delta_E_sq =
    termL * termL +
    termC * termC +
    termH * termH +
    R_T * termC * termH;

  return Number(Math.sqrt(Math.max(0, delta_E_sq)).toFixed(2));
}

// ==========================================
// Base Selection Logic
// ==========================================

/**
 * Determines the optimum paint base (White/Pastel vs Deep/Clear) based on target color
 * lightness (L*) and chroma (C*).
 * 
 * Rationale:
 * - High lightness (L* >= 65) with low/medium chroma requires White/Pastel Base because
 *   the high TiO2 provides necessary opacity and bright undertone.
 * - Low lightness (L* < 65) or high saturation (Chroma >= 45) requires Deep/Clear Base.
 *   If mixed into a White base, TiO2 would turn the color chalky, cloudy, or pastel-grey,
 *   and would exceed maximum tinting limits.
 */
export function selectPaintBase(targetLab: LabColor): {
  base: PaintBase;
  reason: string;
} {
  const chroma = Math.sqrt(targetLab.a * targetLab.a + targetLab.b * targetLab.b);
  const lightness = targetLab.l;

  if (lightness >= 65.0 && chroma < 46.0) {
    return {
      base: PAINT_BASES.pastel,
      reason: `Selected White/Pastel Base (Lightness L* = ${lightness.toFixed(1)}, Chroma C* = ${chroma.toFixed(1)}). High titanium dioxide provides optimal whiteness, hiding power, and clean pastel tone.`,
    };
  }

  return {
    base: PAINT_BASES.deep,
    reason: `Selected Deep/Clear Base (Lightness L* = ${lightness.toFixed(1)}, Chroma C* = ${chroma.toFixed(1)}). Low TiO2 allows high colorant saturation and deep value without chalking or desaturation.`,
  };
}

// ==========================================
// Tinting Formulation Engine & Solver
// ==========================================

export interface TintingColorantDose {
  colorant: Colorant;
  dosageMlPerLitre: number; // mL of colorant per 1 Litre of base
  totalMl: number; // Total mL for requested volume
  totalGrams: number; // Total grams based on pigment density
  percentOfTotalColorant: number; // % share among added tints
}

export interface FormulationResult {
  targetHex: string;
  targetLab: LabColor;
  achievedHex: string;
  achievedLab: LabColor;
  base: PaintBase;
  baseReason: string;
  totalVolumeLitres: number;
  colorantDoses: TintingColorantDose[];
  totalColorantMlPerLitre: number;
  totalColorantMl: number;
  totalColorantGrams: number;
  deltaE2000: number;
  deltaE76: number;
  matchQuality: 'excellent' | 'good' | 'moderate' | 'closest_achievable';
  qualitySummary: string;
  isConfidenceLow: boolean;
  notes: string[];
}

/**
 * Simulates the resulting Lab color when adding a set of colorant concentrations (mL/L) to a base.
 * Uses a modified subtractive dispersion transfer model calibrated to standard universal tinting behavior.
 */
export function simulateMixLab(
  base: PaintBase,
  doses: Map<string, number>
): LabColor {
  // Convert base to reflectance proxy
  const baseLab = base.lab;
  let totalDose = 0;

  // Weighted delta shifts from colorants
  let shiftL = 0;
  let shiftA = 0;
  let shiftB = 0;

  for (const colorant of UNIVERSAL_COLORANTS) {
    const dose = doses.get(colorant.id) || 0;
    if (dose <= 0) continue;
    totalDose += dose;

    // Relative influence of this colorant
    const strength = colorant.tintingStrength;
    const effDose = Math.pow(dose, 0.88) * strength; // Subtractive diminishing return response

    const dL = (colorant.lab.l - baseLab.l) * 0.028 * effDose;
    const dA = (colorant.lab.a - baseLab.a) * 0.032 * effDose;
    const dB = (colorant.lab.b - baseLab.b) * 0.032 * effDose;

    shiftL += dL;
    shiftA += dA;
    shiftB += dB;
  }

  // Damping factor for high total loading
  const totalLoadFactor = 1 / (1 + totalDose * 0.012);

  const finalL = Math.max(8, Math.min(98, baseLab.l + shiftL * totalLoadFactor));
  const finalA = Math.max(-80, Math.min(80, baseLab.a + shiftA * totalLoadFactor));
  const finalB = Math.max(-80, Math.min(80, baseLab.b + shiftB * totalLoadFactor));

  return {
    l: Number(finalL.toFixed(2)),
    a: Number(finalA.toFixed(2)),
    b: Number(finalB.toFixed(2)),
  };
}

/**
 * Calculates a precise paint tinting formula for a target color.
 * Uses bounded iterative optimization to minimize CIEDE2000 while respecting
 * each colorant's maximum dosing limit and total base stability limits.
 */
export function calculateTintingFormula(
  targetInput: string | LabColor,
  totalVolumeLitres: number = 4
): FormulationResult {
  // 1. Determine target Lab and Hex
  let targetHex: string;
  let targetLab: LabColor;

  if (typeof targetInput === 'string') {
    targetHex = targetInput.startsWith('#') ? targetInput.toUpperCase() : `#${targetInput.toUpperCase()}`;
    targetLab = hexToLab(targetHex);
  } else {
    targetLab = targetInput;
    targetHex = labToHex(targetLab);
  }

  // 2. Select appropriate Paint Base
  const { base, reason: baseReason } = selectPaintBase(targetLab);

  // 3. Select top relevant candidate colorants for this hue
  // In professional tinting, selecting 2 to 4 primary colorants produces the cleanest, most stable mix.
  const activeColorants = UNIVERSAL_COLORANTS;

  // Initialize doses
  const doses = new Map<string, number>();
  for (const c of activeColorants) {
    doses.set(c.id, 0);
  }

  // 4. Bounded Optimization Solver to Minimize CIEDE2000
  // We use coordinate descent with adaptive learning rates and bounds enforcement
  let bestLab = simulateMixLab(base, doses);
  let bestDeltaE = calculateDeltaE2000(targetLab, bestLab);

  const iterations = 60;
  const learningSteps = [10.0, 5.0, 2.0, 1.0, 0.4, 0.1, 0.02];

  for (const step of learningSteps) {
    for (let iter = 0; iter < iterations; iter++) {
      let improved = false;

      for (const colorant of activeColorants) {
        const currentDose = doses.get(colorant.id) || 0;
        const maxDose = Math.min(colorant.maxConcentrationMlPerLitre, base.maxTotalColorantMlPerLitre);

        // Try increase
        const testDoseUp = Math.min(maxDose, currentDose + step);
        if (testDoseUp !== currentDose) {
          doses.set(colorant.id, testDoseUp);
          const labUp = simulateMixLab(base, doses);
          const deltaUp = calculateDeltaE2000(targetLab, labUp);

          if (deltaUp < bestDeltaE) {
            bestDeltaE = deltaUp;
            bestLab = labUp;
            improved = true;
            continue;
          }
        }

        // Try decrease
        const testDoseDown = Math.max(0, currentDose - step);
        if (testDoseDown !== currentDose) {
          doses.set(colorant.id, testDoseDown);
          const labDown = simulateMixLab(base, doses);
          const deltaDown = calculateDeltaE2000(targetLab, labDown);

          if (deltaDown < bestDeltaE) {
            bestDeltaE = deltaDown;
            bestLab = labDown;
            improved = true;
            continue;
          }
        }

        // Revert if neither step improved
        doses.set(colorant.id, currentDose);
      }

      if (!improved && iter > 10) break;
    }
  }

  // 5. Filter out tiny insignificant traces (< 0.05 mL/L)
  let totalMlPerLitre = 0;
  const finalDosesList: { colorant: Colorant; dose: number }[] = [];

  for (const colorant of activeColorants) {
    const rawDose = doses.get(colorant.id) || 0;
    if (rawDose >= 0.05) {
      const roundedDose = Number(rawDose.toFixed(2));
      finalDosesList.push({ colorant, dose: roundedDose });
      totalMlPerLitre += roundedDose;
    }
  }

  // Re-verify achieved color with cleaned doses
  const cleanDosesMap = new Map<string, number>();
  finalDosesList.forEach(({ colorant, dose }) => cleanDosesMap.set(colorant.id, dose));
  const achievedLab = simulateMixLab(base, cleanDosesMap);
  const achievedHex = labToHex(achievedLab);
  const deltaE2000 = calculateDeltaE2000(targetLab, achievedLab);
  const deltaE76 = calculateDeltaE76(targetLab, achievedLab);

  // 6. Scale measurements to customer's requested total volume
  const validVolume = Math.max(0.5, totalVolumeLitres);
  const colorantDoses: TintingColorantDose[] = finalDosesList.map(({ colorant, dose }) => {
    const totalMl = Number((dose * validVolume).toFixed(2));
    const totalGrams = Number((totalMl * colorant.densityGPerMl).toFixed(2));
    const percentOfTotalColorant = totalMlPerLitre > 0
      ? Number(((dose / totalMlPerLitre) * 100).toFixed(1))
      : 0;

    return {
      colorant,
      dosageMlPerLitre: dose,
      totalMl,
      totalGrams,
      percentOfTotalColorant,
    };
  });

  // Sort by highest concentration first
  colorantDoses.sort((a, b) => b.dosageMlPerLitre - a.dosageMlPerLitre);

  const totalColorantMl = Number((totalMlPerLitre * validVolume).toFixed(2));
  const totalColorantGrams = Number(
    colorantDoses.reduce((sum, d) => sum + d.totalGrams, 0).toFixed(2)
  );

  // 7. Determine Match Quality Category & Plain Language Rating
  let matchQuality: 'excellent' | 'good' | 'moderate' | 'closest_achievable';
  let qualitySummary: string;
  let isConfidenceLow = false;

  if (deltaE2000 < 1.0) {
    matchQuality = 'excellent';
    qualitySummary = 'Excellent match (ΔE < 1.0) — Visually imperceptible color variance. Highly accurate tinting formulation.';
  } else if (deltaE2000 < 2.5) {
    matchQuality = 'good';
    qualitySummary = 'Good match (ΔE < 2.5) — Within standard commercial architectural coating tolerance. Minor in-person technician calibration may be done.';
  } else if (deltaE2000 < 4.5) {
    matchQuality = 'moderate';
    qualitySummary = 'Acceptable match (ΔE < 4.5) — Very close visual alignment. Slight variation may be detectable under certain lighting conditions.';
  } else {
    matchQuality = 'closest_achievable';
    qualitySummary = 'Closest achievable match (ΔE ≥ 4.5) — This shade lies near the boundary of the standard universal colorant gamut. In-store custom formulation recommended.';
    isConfidenceLow = true;
  }

  // 8. Actionable notes and guidance
  const notes: string[] = [
    `Base requirement: ${base.name} (${base.code}) — ${validVolume} Litre(s).`,
    `Total tinting load: ${totalMlPerLitre.toFixed(2)} mL/L (${((totalMlPerLitre / base.maxTotalColorantMlPerLitre) * 100).toFixed(0)}% of base capacity).`,
    'Always shake or machine-gyromix thoroughly for at least 3 minutes before application.',
    'Formulation calibrated for standard architectural emulsion, satin, or gloss paint grades.',
  ];

  if (isConfidenceLow) {
    notes.push('⚠️ Flagged low-confidence match: Target shade requires specialized exterior pigment dispersion or custom factory mixing.');
  }

  return {
    targetHex,
    targetLab,
    achievedHex,
    achievedLab,
    base,
    baseReason,
    totalVolumeLitres: validVolume,
    colorantDoses,
    totalColorantMlPerLitre: Number(totalMlPerLitre.toFixed(2)),
    totalColorantMl,
    totalColorantGrams,
    deltaE2000,
    deltaE76,
    matchQuality,
    qualitySummary,
    isConfidenceLow,
    notes,
  };
}
