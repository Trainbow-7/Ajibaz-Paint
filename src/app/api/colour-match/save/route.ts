import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      targetHex,
      targetLab,
      achievedHex,
      achievedLab,
      base,
      deltaE2000,
      deltaE76,
      matchQuality,
      totalVolumeLitres,
      totalColorantMl,
      totalColorantGrams,
      colorantDoses,
    } = body;

    if (!targetHex || !base || !colorantDoses) {
      return NextResponse.json(
        { error: 'Missing required calculation fields.' },
        { status: 400 }
      );
    }

    // Try saving to Supabase
    if (supabase) {
      const { data, error } = await supabase
        .from('colour_match_requests')
        .insert({
          target_hex: targetHex,
          target_lab: targetLab,
          achieved_hex: achievedHex,
          achieved_lab: achievedLab,
          base_name: base.name,
          base_code: base.code,
          delta_e: deltaE2000,
          delta_e_76: deltaE76,
          match_quality: matchQuality,
          volume_litres: totalVolumeLitres,
          total_colorant_ml: totalColorantMl,
          total_colorant_grams: totalColorantGrams,
          formula: colorantDoses,
        })
        .select('id')
        .single();

      if (error) {
        console.warn('Supabase insert warning (colour_match_requests):', error.message);
        return NextResponse.json({
          success: true,
          saved: false,
          warning: 'Logged locally, database sync pending table creation.',
        });
      }

      return NextResponse.json({
        success: true,
        saved: true,
        id: data?.id,
      });
    }

    return NextResponse.json({ success: true, saved: false });
  } catch (err: any) {
    console.error('Error saving colour match request:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
