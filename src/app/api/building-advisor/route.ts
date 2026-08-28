import { NextResponse } from 'next/server';

export interface BuildingAdvisorInput {
  buildingType: string;
  buildingStyle: string;
  floors: string;
  environment: string;
  roofType: string;
  preferences: string;
  additionalNotes: string;
  // Optional vision inputs
  exteriorImage?: string;    // base64 data URL
  exteriorMimeType?: string;
  interiorImage?: string;    // base64 data URL
  interiorMimeType?: string;
}

export async function POST(request: Request) {
  try {
    const body: BuildingAdvisorInput = await request.json();
    const {
      buildingType, buildingStyle, floors, environment, roofType,
      preferences, additionalNotes,
      exteriorImage, exteriorMimeType,
      interiorImage, interiorMimeType,
    } = body;

    if (!buildingType || !buildingStyle) {
      return NextResponse.json({ error: 'Building type and style are required.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // --- Demo Mode ---
    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
      await new Promise((r) => setTimeout(r, 2000));
      return NextResponse.json({
        schemeName: 'Urban Warmth Classic',
        description: 'A sophisticated palette inspired by modern West African architecture, balancing warm terracotta tones with crisp neutral whites. This scheme maximises curb appeal while remaining timeless.',
        hasImageAnalysis: false,
        zones: [
          {
            zone: 'Main Exterior Walls',
            colorName: 'Sandstone Beige',
            hex: '#D4B896',
            paintType: 'emulsion',
            finishType: 'Flat/Matt',
            reason: 'A warm neutral that complements the natural landscape of Ogun State, providing excellent coverage across large wall surfaces.'
          },
          {
            zone: 'Window Frames & Trims',
            colorName: 'Ivory White',
            hex: '#F7F3EC',
            paintType: 'gloss',
            finishType: 'High Gloss',
            reason: 'Bright, clean trims create contrast against the warm walls and are easy to maintain with a gloss finish that repels dust.'
          },
          {
            zone: 'Feature Wall / Entrance',
            colorName: 'Rustic Terracotta',
            hex: '#C0623A',
            paintType: 'textured',
            finishType: 'Textured',
            reason: 'A bold feature wall at the entrance creates a strong first impression and reflects traditional Nigerian architectural warmth.'
          },
          {
            zone: 'Fence & Perimeter Walls',
            colorName: 'Cool Slate',
            hex: '#7A8D99',
            paintType: 'emulsion',
            finishType: 'Satin',
            reason: 'A muted, cool tone for the fence creates a boundary that complements the warm main building without competing visually.'
          },
          {
            zone: 'Roof Fascia / Eaves',
            colorName: 'Deep Charcoal',
            hex: '#3A3A3A',
            paintType: 'gloss',
            finishType: 'Gloss',
            reason: 'Dark charcoal fascia boards provide a grounded, modern finish that anchors the roofline.'
          }
        ],
        estimatedCoverage: '4–6 litres per zone (varies by surface area)',
        specialTips: [
          'Apply a quality primer/sealer before topcoat on all new concrete surfaces to prevent efflorescence.',
          'Use anti-fungal additive in the exterior emulsion — the humidity in Ogun State can cause mold on north-facing walls.',
          'Apply 2 coats of exterior emulsion for maximum durability and UV resistance.'
        ],
        demoMode: true
      });
    }

    // --- Live Gemini Call ---
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;

    const hasExteriorImage = !!exteriorImage;
    const hasInteriorImage = !!interiorImage;
    const hasImages = hasExteriorImage || hasInteriorImage;

    const imageContext = hasImages
      ? `\nIMPORTANT: The customer has also uploaded ${hasExteriorImage && hasInteriorImage ? 'exterior AND interior photos' : hasExteriorImage ? 'an exterior photo' : 'an interior photo'} of the building. Carefully analyse ${hasImages ? 'the image(s)' : ''} to:
- Identify the existing building structure, wall texture, and any current paint/staining
- Note the architectural features visible (pillars, balconies, window type, fence style, etc.)
- Factor these visual observations into your colour recommendations
- For REPAINTING jobs: suggest colours that will cover existing paint and improve the look
- For NEW builds: suggest a complete colour scheme that complements the raw structure`
      : '';

    const promptText = `
You are an expert paint colour consultant for AJIBAZ PAINT NIGERIA LIMITED, based in Ogun State, Nigeria.
A customer needs a professional colour recommendation for their building project.

Building Details provided by customer:
- Building Type: ${buildingType}
- Architectural Style: ${buildingStyle}
- Number of Floors: ${floors || 'Not specified'}
- Surrounding Environment: ${environment || 'Not specified'}
- Roof Type: ${roofType || 'Not specified'}
- Colour Preferences: ${preferences || 'No specific preferences'}
- Additional Notes: ${additionalNotes || 'None'}
${imageContext}

YOUR TASK:
Recommend a complete, professional paint colour scheme covering BOTH exterior and interior areas.
Consider the Nigerian climate (high humidity, intense sunlight, harmattan), Ogun State local architecture trends, and the customer's preferences.

For EACH building zone (aim for 6–8 zones covering exterior AND interior), specify:
1. Zone name — be specific (e.g. "Main Exterior Walls", "Living Room Walls", "Bedroom Walls", "Kitchen & Bathroom", "Gate/Entrance", "Fence", "Window Frames", "Ceiling")
2. Color name — descriptive and appealing
3. HEX color code
4. Paint type: "emulsion" | "gloss" | "satin" | "textured"
5. Finish type (e.g. Matt, Satin, High Gloss, Textured)
6. Reason — brief explanation why this color/finish suits this zone, referencing the uploaded images where applicable

Also provide:
- A creative name for the overall colour scheme
- A 2–3 sentence description of the aesthetic mood and vision
- Estimated paint coverage advice (general quantities)
- 3 practical application tips specific to Nigerian/Ogun State conditions

Respond ONLY as valid JSON matching this exact schema:
{
  "schemeName": string,
  "description": string,
  "hasImageAnalysis": ${hasImages},
  "zones": [
    {
      "zone": string,
      "colorName": string,
      "hex": string,
      "paintType": "emulsion" | "gloss" | "satin" | "textured",
      "finishType": string,
      "reason": string
    }
  ],
  "estimatedCoverage": string,
  "specialTips": [string, string, string],
  "demoMode": false
}
`;

    // Build the parts array — always include text prompt, conditionally add images
    const parts: object[] = [{ text: promptText }];

    if (hasExteriorImage) {
      parts.push({
        inlineData: {
          mimeType: exteriorMimeType || 'image/jpeg',
          data: exteriorImage!.replace(/^data:image\/\w+;base64,/, '')
        }
      });
    }

    if (hasInteriorImage) {
      parts.push({
        inlineData: {
          mimeType: interiorMimeType || 'image/jpeg',
          data: interiorImage!.replace(/^data:image\/\w+;base64,/, '')
        }
      });
    }

    const apiBody = {
      contents: [{ parts }],
      generationConfig: {
        responseMimeType: 'application/json'
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apiBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', errorText);
      return NextResponse.json({ error: 'Failed to connect to AI Service.' }, { status: 502 });
    }

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!resultText) {
      return NextResponse.json({ error: 'No response from AI Service.' }, { status: 502 });
    }

    const parsedResult = JSON.parse(resultText.trim());
    return NextResponse.json(parsedResult);

  } catch (error: any) {
    console.error('Building Advisor API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
