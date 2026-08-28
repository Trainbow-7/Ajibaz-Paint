import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { image, mimeType } = await request.json();

    if (!image) {
      return NextResponse.json({ error: 'Image data is required.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback Mock Data if API Key is not set or placeholder
    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
      console.warn('GEMINI_API_KEY is not configured. Running in Demo Mode.');
      
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockResponses = [
        {
          dominantColors: [
            {
              hex: '#5F7D95',
              name: 'Ocean Mist Blue',
              paintType: 'satin',
              placementAdvice: 'Excellent for bedrooms or bathrooms to create a calming, serene atmosphere.'
            },
            {
              hex: '#D9C5B2',
              name: 'Desert Sand',
              paintType: 'emulsion',
              placementAdvice: 'A warm neutral perfect for living room walls or hallways, pairing well with natural lighting.'
            },
            {
              hex: '#34495E',
              name: 'Deep Slate',
              paintType: 'gloss',
              placementAdvice: 'Best used as an accent on doors, cabinets, or wooden trims for a modern contrast.'
            }
          ],
          coordinatingColors: [
            { hex: '#F39C12', name: 'Marigold Accent' },
            { hex: '#ECF0F1', name: 'Soft Off-White' }
          ],
          overallAdvice: 'This palette blends calming cool tones with soft neutrals, offering a contemporary and balanced aesthetic. It works exceptionally well in modern residential projects.',
          demoMode: true
        },
        {
          dominantColors: [
            {
              hex: '#2C3E50',
              name: 'Midnight Navy',
              paintType: 'emulsion',
              placementAdvice: 'Ideal for a dramatic, sophisticated accent wall in a study or formal dining area.'
            },
            {
              hex: '#BDC3C7',
              name: 'Platinum Grey',
              paintType: 'emulsion',
              placementAdvice: 'A clean, modern grey that acts as an excellent neutral canvas for any room.'
            },
            {
              hex: '#E67E22',
              name: 'Sunset Terracotta',
              paintType: 'textured',
              placementAdvice: 'Perfect for exterior pillars or focal points on front porches to add warmth and texture.'
            }
          ],
          coordinatingColors: [
            { hex: '#27AE60', name: 'Forest Jade' },
            { hex: '#FFFFFF', name: 'Classic Pure White' }
          ],
          overallAdvice: 'A bold, high-contrast combination. Warm rust-orange accents balance the cool structure of navy and platinum, creating a highly architectural look.',
          demoMode: true
        }
      ];

      // Return a random mock response to simulate dynamic analysis
      const selectedMock = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      return NextResponse.json(selectedMock);
    }

    // Call the actual Gemini API
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;

    const promptText = `
Analyze this image, which represents a colour swatch, room design, or design reference for custom paint mixing.
Identify 3-4 dominant colors. For each dominant color, suggest:
1. A descriptive, appealing name (e.g. "Safari Green", "Sun-Kissed Orange").
2. The exact HEX code (e.g. "#6E7A6B").
3. The most suitable paint type for this color from this list: "emulsion" (water-based, for standard walls/ceilings), "gloss" (oil-based, for wood/metal), "satin" (for trim, bathrooms, high-traffic walls), "textured" (for exterior/accent pillars).
4. Placement advice (where to use it in a home or building).

Also suggest 2 coordinating/accent colors with their name and HEX code that would pair beautifully with these dominant colors.
Provide a short overall styling or aesthetic advice paragraph for this palette.

Respond strictly in JSON format matching this schema:
{
  "dominantColors": [
    {
      "hex": string,
      "name": string,
      "paintType": "emulsion" | "gloss" | "satin" | "textured",
      "placementAdvice": string
    }
  ],
  "coordinatingColors": [
    {
      "hex": string,
      "name": string
    }
  ],
  "overallAdvice": string
}
`;

    // Strip out base64 prefixes if sent
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');

    const apiBody = {
      contents: [
        {
          parts: [
            { text: promptText },
            {
              inlineData: {
                mimeType: mimeType || 'image/jpeg',
                data: base64Data
              }
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json'
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
      return NextResponse.json({ error: 'No response content returned from AI Service.' }, { status: 502 });
    }

    const parsedResult = JSON.parse(resultText.trim());
    return NextResponse.json({ ...parsedResult, demoMode: false });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
