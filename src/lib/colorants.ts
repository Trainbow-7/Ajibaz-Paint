/**
 * AJIBAZ PAINT NIGERIA LIMITED
 * Universal Colorant & Base Tinting System Configuration
 * 
 * Standard 16-station / 10-colorant universal tinting system used in real architectural paint tinting machines.
 * All colorant values are defined in CIE-L*a*b* color space (D65 standard illuminant, 2-degree observer)
 * with RGB fallbacks, specific densities (g/mL), and maximum dosage concentration caps (mL per Litre of base paint).
 * 
 * You can adjust the Lab coordinates, densities, and max concentration limits directly in this file
 * to calibrate against your specific supplier stock, tinting machine canisters, or supplier formula sheets.
 */

export interface LabColor {
  l: number; // 0 to 100
  a: number; // -128 to 127
  b: number; // -128 to 127
}

export interface RGBColor {
  r: number; // 0 to 255
  g: number; // 0 to 255
  b: number; // 0 to 255
}

export interface PaintBase {
  id: string;
  name: string;
  code: string;
  description: string;
  lab: LabColor;
  rgb: RGBColor;
  hex: string;
  tio2Content: 'high' | 'medium' | 'low' | 'none'; // Titanium dioxide level
  maxTotalColorantMlPerLitre: number; // Overall tinting stability limit
  recommendedLightnessMin: number; // L* range lower bound
  recommendedLightnessMax: number; // L* range upper bound
  recommendedChromaMax: number; // Maximum chroma before desaturating/chalking
}

export interface Colorant {
  id: string;
  name: string;
  code: string; // Machine canister code (e.g. RO, YO, PB, etc.)
  family: 'iron_oxide' | 'organic' | 'inorganic' | 'carbon';
  lab: LabColor; // Lab coordinates of masstone/standard dispersion
  rgb: RGBColor; // Visual fallback
  hex: string; // Visual swatch hex
  densityGPerMl: number; // Specific gravity in grams per mL
  maxConcentrationMlPerLitre: number; // Maximum single colorant dose per Litre
  tintingStrength: number; // Relative tinting strength factor (1.0 = baseline)
  absorptionCoeff: { r: number; g: number; b: number }; // Relative spectral absorption
  description: string;
}

/**
 * Standard Universal Paint Bases
 */
export const PAINT_BASES: Record<'pastel' | 'deep', PaintBase> = {
  pastel: {
    id: 'base_pastel_white',
    name: 'White / Pastel Base',
    code: 'AJB-BASE-W',
    description: 'High Titanium Dioxide (TiO2) base with high opacity and whiteness. Ideal for off-whites, creams, pastels, and soft-to-medium tints.',
    lab: { l: 96.2, a: -0.8, b: 1.8 },
    rgb: { r: 247, g: 247, b: 245 },
    hex: '#F7F7F5',
    tio2Content: 'high',
    maxTotalColorantMlPerLitre: 50.0, // Up to 50 mL/L before chalking or dispersion failure
    recommendedLightnessMin: 65.0,
    recommendedLightnessMax: 100.0,
    recommendedChromaMax: 48.0,
  },
  deep: {
    id: 'base_deep_clear',
    name: 'Deep / Clear Base',
    code: 'AJB-BASE-D',
    description: 'Ultra-low Titanium Dioxide translucent base. Allows high pigment loading for intense, rich, deep, and highly saturated colors without milky haze.',
    lab: { l: 62.5, a: -0.2, b: 2.1 },
    rgb: { r: 160, g: 159, b: 156 },
    hex: '#A09F9C',
    tio2Content: 'low',
    maxTotalColorantMlPerLitre: 110.0, // Up to 110 mL/L for deep saturated tones
    recommendedLightnessMin: 0.0,
    recommendedLightnessMax: 65.0,
    recommendedChromaMax: 100.0,
  },
};

/**
 * Standard Universal Tinting Colorants (Machine Canister Set)
 * Configured with standard universal colorant Lab values and dosing limits.
 */
export const UNIVERSAL_COLORANTS: Colorant[] = [
  {
    id: 'red_oxide',
    name: 'Red Oxide (Iron Oxide Red)',
    code: 'RO',
    family: 'iron_oxide',
    lab: { l: 38.4, a: 34.2, b: 24.6 },
    rgb: { r: 156, g: 61, b: 47 },
    hex: '#9C3D2F',
    densityGPerMl: 1.62,
    maxConcentrationMlPerLitre: 45.0,
    tintingStrength: 1.15,
    absorptionCoeff: { r: 0.20, g: 0.75, b: 0.85 },
    description: 'Earthy, light-fast mineral red for terracotta, warm beiges, browns, and exterior masonry.',
  },
  {
    id: 'yellow_oxide',
    name: 'Yellow Oxide (Iron Oxide Yellow / Raw Sienna)',
    code: 'YO',
    family: 'iron_oxide',
    lab: { l: 58.2, a: 16.5, b: 52.4 },
    rgb: { r: 198, g: 135, b: 38 },
    hex: '#C68726',
    densityGPerMl: 1.48,
    maxConcentrationMlPerLitre: 50.0,
    tintingStrength: 1.10,
    absorptionCoeff: { r: 0.15, g: 0.40, b: 0.90 },
    description: 'Warm golden-ochre oxide for creams, tans, warm stone, olive greens, and neutrals.',
  },
  {
    id: 'organic_red',
    name: 'Organic Red (Bright Scarlet / Naphthol)',
    code: 'OR',
    family: 'organic',
    lab: { l: 45.1, a: 62.8, b: 41.2 },
    rgb: { r: 215, g: 35, b: 45 },
    hex: '#D7232D',
    densityGPerMl: 1.22,
    maxConcentrationMlPerLitre: 35.0,
    tintingStrength: 1.30,
    absorptionCoeff: { r: 0.10, g: 0.92, b: 0.88 },
    description: 'Vibrant, high-chroma primary red for bold accents, crimson, and bright corals.',
  },
  {
    id: 'organic_yellow',
    name: 'Organic Yellow (Bright Lemon / Canary)',
    code: 'OY',
    family: 'organic',
    lab: { l: 82.3, a: -4.1, b: 78.6 },
    rgb: { r: 245, g: 210, b: 25 },
    hex: '#F5D219',
    densityGPerMl: 1.25,
    maxConcentrationMlPerLitre: 40.0,
    tintingStrength: 1.25,
    absorptionCoeff: { r: 0.08, g: 0.15, b: 0.95 },
    description: 'Intense, clean lemon yellow for sunny accents, vibrant limes, and bright greens.',
  },
  {
    id: 'phthalo_blue',
    name: 'Phthalo Blue (Cyanine Blue)',
    code: 'PB',
    family: 'organic',
    lab: { l: 26.5, a: -4.2, b: -38.6 },
    rgb: { r: 18, g: 68, b: 125 },
    hex: '#12447D',
    densityGPerMl: 1.28,
    maxConcentrationMlPerLitre: 30.0,
    tintingStrength: 1.60,
    absorptionCoeff: { r: 0.92, g: 0.65, b: 0.12 },
    description: 'High-strength primary cyan-blue for sky blues, deep royal navy, and teals.',
  },
  {
    id: 'phthalo_green',
    name: 'Phthalo Green (Emerald / Viridian)',
    code: 'PG',
    family: 'organic',
    lab: { l: 36.8, a: -48.2, b: 8.5 },
    rgb: { r: 22, g: 118, b: 78 },
    hex: '#16764E',
    densityGPerMl: 1.32,
    maxConcentrationMlPerLitre: 30.0,
    tintingStrength: 1.50,
    absorptionCoeff: { r: 0.90, g: 0.18, b: 0.70 },
    description: 'Vivid clean green for mint, jade, forest greens, and modern botanical tones.',
  },
  {
    id: 'carbon_black',
    name: 'Carbon Black (Lamp Black)',
    code: 'CB',
    family: 'carbon',
    lab: { l: 12.0, a: 0.0, b: -0.5 },
    rgb: { r: 30, g: 30, b: 32 },
    hex: '#1E1E20',
    densityGPerMl: 1.18,
    maxConcentrationMlPerLitre: 35.0,
    tintingStrength: 1.75,
    absorptionCoeff: { r: 0.96, g: 0.96, b: 0.96 },
    description: 'Neutral, high-opacity black for greys, charcoal, shading, and darkening values.',
  },
  {
    id: 'white_tint',
    name: 'White Tint (Titanium White Dispersion)',
    code: 'WT',
    family: 'inorganic',
    lab: { l: 97.5, a: -0.5, b: 0.8 },
    rgb: { r: 252, g: 252, b: 250 },
    hex: '#FCFCFA',
    densityGPerMl: 1.82,
    maxConcentrationMlPerLitre: 50.0,
    tintingStrength: 1.00,
    absorptionCoeff: { r: 0.02, g: 0.02, b: 0.02 },
    description: 'Pure titanium dioxide white tint for lightening deep bases or adjusting opacity.',
  },
  {
    id: 'magenta_violet',
    name: 'Quinacridone Magenta / Violet',
    code: 'MV',
    family: 'organic',
    lab: { l: 35.2, a: 52.4, b: -18.6 },
    rgb: { r: 165, g: 32, b: 108 },
    hex: '#A5206C',
    densityGPerMl: 1.20,
    maxConcentrationMlPerLitre: 28.0,
    tintingStrength: 1.45,
    absorptionCoeff: { r: 0.35, g: 0.90, b: 0.35 },
    description: 'Intense magenta-violet for lilacs, royal purples, rich plums, and mauve tones.',
  },
  {
    id: 'raw_umber',
    name: 'Raw / Burnt Umber',
    code: 'RU',
    family: 'iron_oxide',
    lab: { l: 30.8, a: 8.5, b: 18.2 },
    rgb: { r: 92, g: 68, b: 46 },
    hex: '#5C442E',
    densityGPerMl: 1.55,
    maxConcentrationMlPerLitre: 40.0,
    tintingStrength: 1.20,
    absorptionCoeff: { r: 0.65, g: 0.80, b: 0.92 },
    description: 'Deep natural earthy brown for warm greys, taupes, coffee, and rich architectural tones.',
  },
];

/**
 * Standard Packaging Sizes (Litres) available at AJIBAZ PAINT
 */
export const STANDARD_VOLUMES = [
  { value: 1, label: '1 Litre (Touch-up / Sample)' },
  { value: 4, label: '4 Litres (1 Gallon)' },
  { value: 10, label: '10 Litres (Medium Bucket)' },
  { value: 20, label: '20 Litres (1 Large Drum)' },
];
