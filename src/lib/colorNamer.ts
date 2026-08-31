import { LabColor } from './colorants';
import { hexToLab, calculateDeltaE2000 } from './colorScience';

export interface NamedShade {
  name: string;
  hex: string;
  category: string;
  lab?: LabColor;
}

/**
 * Curated Architectural Paint Color Dictionary
 * Encompassing standard interior/exterior architectural paint shades,
 * classic heritage tones, and Nigerian architectural palettes.
 */
export const ARCHITECTURAL_SHADES: NamedShade[] = [
  // Whites & Off-Whites
  { name: 'Pure Brilliant White', hex: '#FFFFFF', category: 'White' },
  { name: 'Lekki Pearl Off-White', hex: '#EAE6DF', category: 'White' },
  { name: 'Warm Ivory Cream', hex: '#F4E8D1', category: 'Off-White' },
  { name: 'Alabaster Silk', hex: '#F2EFE9', category: 'Off-White' },
  { name: 'Antique Linen', hex: '#EDE6D6', category: 'Off-White' },
  { name: 'Chantilly Lace', hex: '#F5F5F0', category: 'White' },
  { name: 'Cotton Blossom', hex: '#FBF9F1', category: 'White' },
  { name: 'Vanilla Mist', hex: '#F3EAD3', category: 'Off-White' },
  { name: 'Oatmeal Whisper', hex: '#E8DEC8', category: 'Neutral' },
  { name: 'Magnolia Bloom', hex: '#F8F4E6', category: 'Off-White' },

  // Beiges, Creams & Warm Neutrals
  { name: 'Sahara Sand Beige', hex: '#D2B48C', category: 'Beige' },
  { name: 'Calabar Desert Dune', hex: '#E3CBA8', category: 'Beige' },
  { name: 'Golden Almond', hex: '#EED9B3', category: 'Beige' },
  { name: 'Warm Biscotti', hex: '#D7BFA2', category: 'Beige' },
  { name: 'Cashew Nut', hex: '#CDB296', category: 'Beige' },
  { name: 'Toasted Sesame', hex: '#C4A482', category: 'Beige' },
  { name: 'Latte Foam', hex: '#E6D2B5', category: 'Cream' },
  { name: 'Champagne Glow', hex: '#F7E7CE', category: 'Cream' },
  { name: 'Khaki Stone', hex: '#BDB395', category: 'Neutral' },
  { name: 'Pale Wheat', hex: '#F5DEB3', category: 'Beige' },

  // Terracottas, Earthy Reds & Browns
  { name: 'Terracotta Heritage', hex: '#C05A3E', category: 'Terracotta' },
  { name: 'Kano Clay Red', hex: '#B84930', category: 'Terracotta' },
  { name: 'Rustic Sienna', hex: '#A0472D', category: 'Brown' },
  { name: 'Burnt Ochre', hex: '#9E472A', category: 'Terracotta' },
  { name: 'Tuscan Brick', hex: '#A83B24', category: 'Red' },
  { name: 'African Earth', hex: '#8B4513', category: 'Brown' },
  { name: 'Rich Mahogany', hex: '#4A1C14', category: 'Brown' },
  { name: 'Espresso Roast', hex: '#36221B', category: 'Brown' },
  { name: 'Warm Cocoa', hex: '#6E473B', category: 'Brown' },
  { name: 'Nutmeg Spice', hex: '#81472C', category: 'Brown' },
  { name: 'Auburn Bark', hex: '#652A18', category: 'Brown' },
  { name: 'Cinnamon Bark', hex: '#994422', category: 'Terracotta' },

  // Yellows, Ambers & Ochres
  { name: 'Ogun Golden Ochre', hex: '#C98A2C', category: 'Yellow' },
  { name: 'Harvest Gold', hex: '#DA9100', category: 'Yellow' },
  { name: 'Sahara Sunburst', hex: '#E5A93C', category: 'Yellow' },
  { name: 'Warm Mustard', hex: '#C88D27', category: 'Yellow' },
  { name: 'Canary Yellow', hex: '#F5D219', category: 'Yellow' },
  { name: 'Buttercup Yellow', hex: '#F3E573', category: 'Yellow' },
  { name: 'Honey Amber', hex: '#D97706', category: 'Amber' },
  { name: 'Marigold Blossom', hex: '#EAA221', category: 'Amber' },
  { name: 'Saffron Glow', hex: '#F4C430', category: 'Yellow' },
  { name: 'Raw Ochre', hex: '#C68726', category: 'Ochre' },

  // Blues & Aquas
  { name: 'Royal Sapphire Blue', hex: '#1D4E89', category: 'Blue' },
  { name: 'Atlantic Navy', hex: '#13294B', category: 'Blue' },
  { name: 'Midnight Sovereign', hex: '#1B263B', category: 'Blue' },
  { name: 'Classic Navy Blue', hex: '#0F2A4A', category: 'Blue' },
  { name: 'Ocean Coastal Breeze', hex: '#4682B4', category: 'Blue' },
  { name: 'Sky Horizon Blue', hex: '#7BAFD4', category: 'Blue' },
  { name: 'Powder Blue Pastel', hex: '#B0C4DE', category: 'Blue' },
  { name: 'Cyan Mist', hex: '#5F9EA0', category: 'Blue' },
  { name: 'Deep Cobalt', hex: '#0047AB', category: 'Blue' },
  { name: 'Aegean Sea', hex: '#2E6F8E', category: 'Blue' },
  { name: 'Lagoon Turquoise', hex: '#167D7F', category: 'Aqua' },
  { name: 'Tropical Aqua', hex: '#20B2AA', category: 'Aqua' },

  // Greens & Olives
  { name: 'Rainforest Jade', hex: '#1E6B4C', category: 'Green' },
  { name: 'Emerald Isle', hex: '#0F52BA', category: 'Green' },
  { name: 'Deep Forest Pine', hex: '#194D33', category: 'Green' },
  { name: 'Olive Grove', hex: '#556B2F', category: 'Green' },
  { name: 'Sage Leaf', hex: '#77815C', category: 'Green' },
  { name: 'Eucalyptus Soft', hex: '#8F9779', category: 'Green' },
  { name: 'Mint Meadow', hex: '#98FB98', category: 'Green' },
  { name: 'Palm Frond Green', hex: '#2E8B57', category: 'Green' },
  { name: 'Moss Whisper', hex: '#606C38', category: 'Green' },
  { name: 'Hunter Green', hex: '#1C3A27', category: 'Green' },
  { name: 'Viridian Velvet', hex: '#16764E', category: 'Green' },

  // Reds, Corals & Pinks
  { name: 'Imperial Crimson', hex: '#990000', category: 'Red' },
  { name: 'Royal Scarlet', hex: '#C41E3A', category: 'Red' },
  { name: 'Coral Sunset', hex: '#E05344', category: 'Coral' },
  { name: 'Desert Coral', hex: '#CD5C5C', category: 'Coral' },
  { name: 'Blush Rose', hex: '#E8A598', category: 'Pink' },
  { name: 'Dusty Petal', hex: '#DCAE96', category: 'Pink' },
  { name: 'Ruby Wine', hex: '#722F37', category: 'Red' },
  { name: 'Burgundy Velvet', hex: '#66023C', category: 'Red' },

  // Purples & Violets
  { name: 'Velvet Plum Accent', hex: '#581845', category: 'Purple' },
  { name: 'Royal Amethyst', hex: '#4B2840', category: 'Purple' },
  { name: 'Deep Aubergine', hex: '#3B1E2B', category: 'Purple' },
  { name: 'Lavender Mist', hex: '#B5A8C8', category: 'Purple' },
  { name: 'Heather Mauve', hex: '#96788D', category: 'Purple' },
  { name: 'Mulberry Wine', hex: '#772054', category: 'Purple' },

  // Greys & Charcoals
  { name: 'Charcoal Executive', hex: '#2B2D42', category: 'Grey' },
  { name: 'Victoria Island Grey', hex: '#8D99AE', category: 'Grey' },
  { name: 'Graphite Shadow', hex: '#3E424B', category: 'Grey' },
  { name: 'Slate Manor', hex: '#4A5568', category: 'Grey' },
  { name: 'Pebble Walk', hex: '#B8B8B8', category: 'Grey' },
  { name: 'Silver Dollar', hex: '#D1D5DB', category: 'Grey' },
  { name: 'Ash Storm', hex: '#64748B', category: 'Grey' },
  { name: 'Onyx Black', hex: '#1E1E20', category: 'Grey' },
  { name: 'Midnight Charcoal', hex: '#1F2937', category: 'Grey' },
];

/**
 * Returns the closest human-friendly paint color name for any Hex code.
 * Uses CIEDE2000 color distance to ensure accurate perceptual naming.
 * Lab values are lazily initialized to prevent circular dependency ReferenceErrors.
 */
export function getPaintColorName(hex: string): { name: string; category: string; deltaE: number } {
  const targetLab = hexToLab(hex);
  let closestShade = ARCHITECTURAL_SHADES[0];
  let minDelta = Infinity;

  for (const shade of ARCHITECTURAL_SHADES) {
    if (!shade.lab) {
      shade.lab = hexToLab(shade.hex);
    }
    const dE = calculateDeltaE2000(targetLab, shade.lab);
    if (dE < minDelta) {
      minDelta = dE;
      closestShade = shade;
    }
  }

  // If Delta E is very close, return the exact shade name
  if (minDelta < 4.0) {
    return {
      name: closestShade.name,
      category: closestShade.category,
      deltaE: minDelta,
    };
  }

  // If the color has subtle lightness or chroma variation from known shades, add a natural descriptor
  const targetLightness = targetLab.l;
  const targetChroma = Math.sqrt(targetLab.a * targetLab.a + targetLab.b * targetLab.b);

  let prefix = '';
  if (targetLightness > 78 && targetChroma < 25) {
    prefix = 'Soft ';
  } else if (targetLightness < 35) {
    prefix = 'Deep ';
  } else if (targetChroma > 50) {
    prefix = 'Vibrant ';
  } else if (targetChroma < 15 && targetLightness > 40 && targetLightness < 75) {
    prefix = 'Muted ';
  }

  const baseName = closestShade.name.replace(/^(Soft|Deep|Vibrant|Muted|Classic|Pure|Warm)\s+/, '');
  const descriptiveName = `${prefix}${baseName}`.trim();

  return {
    name: descriptiveName,
    category: closestShade.category,
    deltaE: minDelta,
  };
}
