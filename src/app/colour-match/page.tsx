'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  calculateTintingFormula,
  FormulationResult,
  hexToLab,
  labToHex,
  rgbToHex,
} from '@/lib/colorScience';
import { STANDARD_VOLUMES } from '@/lib/colorants';

// Popular Nigerian architectural shade presets
const PRESET_SWATCHES = [
  { name: 'Warm Ivory Cream', hex: '#F4E8D1', cat: 'Pastel' },
  { name: 'Sahara Sand Beige', hex: '#D2B48C', cat: 'Pastel' },
  { name: 'Lekki Pearl Off-White', hex: '#EAE6DF', cat: 'Pastel' },
  { name: 'Royal Sapphire Blue', hex: '#1D4E89', cat: 'Deep' },
  { name: 'Terracotta Heritage', hex: '#C05A3E', cat: 'Deep' },
  { name: 'Rainforest Jade', hex: '#1E6B4C', cat: 'Deep' },
  { name: 'Ogun Golden Ochre', hex: '#C98A2C', cat: 'Deep' },
  { name: 'Charcoal Executive', hex: '#2B2D42', cat: 'Deep' },
  { name: 'Victoria Island Grey', hex: '#8D99AE', cat: 'Pastel' },
  { name: 'Velvet Plum Accent', hex: '#581845', cat: 'Deep' },
];

export default function ColourMatchPage() {
  // Input states
  const [inputMode, setInputMode] = useState<'hex' | 'swatch' | 'photo'>('hex');
  const [targetHex, setTargetHex] = useState<string>('#C05A3E');
  const [selectedVolume, setSelectedVolume] = useState<number>(4);
  const [customVolume, setCustomVolume] = useState<string>('4');

  // Formulation result state
  const [result, setResult] = useState<FormulationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>('');

  // Photo Eyedropper states
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [isHoveringCanvas, setIsHoveringCanvas] = useState<boolean>(false);
  const [hoverColor, setHoverColor] = useState<string>('#C05A3E');
  const [loupePos, setLoupePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [eyedropperSupported, setEyedropperSupported] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Check for native EyeDropper API support
  useEffect(() => {
    if (typeof window !== 'undefined' && 'EyeDropper' in window) {
      setEyedropperSupported(true);
    }
  }, []);

  // Compute formula callback
  const runCalculation = useCallback((hex: string, volume: number) => {
    setIsCalculating(true);
    setSaveStatus('');
    try {
      const formula = calculateTintingFormula(hex, volume);
      setResult(formula);

      // Asynchronously log to Supabase
      fetch('/api/colour-match/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetHex: formula.targetHex,
          targetLab: formula.targetLab,
          achievedHex: formula.achievedHex,
          achievedLab: formula.achievedLab,
          base: formula.base,
          deltaE2000: formula.deltaE2000,
          deltaE76: formula.deltaE76,
          matchQuality: formula.matchQuality,
          totalVolumeLitres: formula.totalVolumeLitres,
          totalColorantMl: formula.totalColorantMl,
          totalColorantGrams: formula.totalColorantGrams,
          colorantDoses: formula.colorantDoses,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.saved) {
            setSaveStatus('✓ Formula logged to quality database');
          }
        })
        .catch(() => {});
    } catch (err) {
      console.error('Calculation error:', err);
    } finally {
      setIsCalculating(false);
    }
  }, []);

  // Calculate on initial mount
  useEffect(() => {
    runCalculation(targetHex, selectedVolume);
  }, []);

  // Handle volume changes
  const handleVolumeChange = (vol: number) => {
    setSelectedVolume(vol);
    setCustomVolume(vol.toString());
    runCalculation(targetHex, vol);
  };

  const handleCustomVolumeInput = (val: string) => {
    setCustomVolume(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      setSelectedVolume(num);
      runCalculation(targetHex, num);
    }
  };

  // Handle Hex changes
  const handleHexChange = (newHex: string) => {
    let cleanHex = newHex.trim();
    if (!cleanHex.startsWith('#')) cleanHex = `#${cleanHex}`;
    setTargetHex(cleanHex);
    if (/^#[0-9A-Fa-f]{6}$/.test(cleanHex)) {
      runCalculation(cleanHex, selectedVolume);
    }
  };

  // Photo Upload & Canvas Drawing
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      setPhotoSrc(src);
    };
    reader.readAsDataURL(file);
  };

  // Redraw image onto canvas when photoSrc changes
  useEffect(() => {
    if (!photoSrc || !canvasRef.current) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageRef.current = img;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      // Fit to container width while preserving aspect ratio
      const maxWidth = 700;
      const scale = Math.min(1, maxWidth / img.width);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = photoSrc;
  }, [photoSrc]);

  // Eyedropper hover on canvas
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hex = rgbToHex({ r: pixel[0], g: pixel[1], b: pixel[2] });
      setHoverColor(hex);
      setLoupePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setIsHoveringCanvas(true);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hex = rgbToHex({ r: pixel[0], g: pixel[1], b: pixel[2] });
      setTargetHex(hex);
      runCalculation(hex, selectedVolume);
    }
  };

  // Native EyeDropper API handler
  const handleNativeEyedropper = async () => {
    if (typeof window !== 'undefined' && 'EyeDropper' in window) {
      try {
        const eyeDropper = new (window as any).EyeDropper();
        const response = await eyeDropper.open();
        if (response?.sRGBHex) {
          const hex = response.sRGBHex.toUpperCase();
          setTargetHex(hex);
          runCalculation(hex, selectedVolume);
        }
      } catch (e) {
        // User cancelled eyedropper
      }
    }
  };

  // Build Quote Link with pre-filled query parameters
  const getQuoteLink = () => {
    if (!result) return '/quote';
    const params = new URLSearchParams({
      service: 'colour-mixing',
      target_hex: result.targetHex,
      base: result.base.name,
      base_code: result.base.code,
      volume: `${result.totalVolumeLitres} Litres`,
      delta_e: result.deltaE2000.toString(),
      match_quality: result.matchQuality,
      formula_summary: result.colorantDoses
        .map((d) => `${d.colorant.name} (${d.colorant.code}): ${d.totalMl}ml / ${d.totalGrams}g`)
        .join('; '),
    });
    return `/quote?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-24">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-brand-primary-dark to-slate-900 border-b border-white/10 py-14 sm:py-20">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#C68726_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary/20 border border-brand-secondary/40 text-brand-secondary text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" />
            AI Tinting Laboratory
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Universal Paint Tinting &amp; Colour Mixing Formula Engine
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mt-3">
            Accurate, industrial-grade pigment mixing for AJIBAZ PAINT. Pick any custom shade, upload a reference photo, or input a Hex code. Our CIE-L*a*b* optimization engine calculates the exact base paint and colorant dosages (mL and grams) used by real automated tinting machines.
          </p>
        </div>
      </section>

      {/* Main Studio Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Input Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl border border-slate-700/80 p-6 shadow-xl space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  1. Select Target Color
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Choose your target shade using Hex input, preset swatches, or photo eyedropper.
                </p>
              </div>

              {/* Input Mode Switcher */}
              <div className="grid grid-cols-3 gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-700">
                <button
                  type="button"
                  onClick={() => setInputMode('hex')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                    inputMode === 'hex'
                      ? 'bg-brand-primary text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  HEX / Picker
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('swatch')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                    inputMode === 'swatch'
                      ? 'bg-brand-primary text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Architectural
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('photo')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                    inputMode === 'photo'
                      ? 'bg-brand-primary text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Photo Eyedropper
                </button>
              </div>

              {/* MODE 1: HEX & Native Color Picker */}
              {inputMode === 'hex' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="relative group">
                      <input
                        type="color"
                        value={targetHex.length === 7 ? targetHex : '#C05A3E'}
                        onChange={(e) => handleHexChange(e.target.value)}
                        className="w-14 h-14 rounded-xl cursor-pointer border-2 border-slate-600 bg-transparent p-0 overflow-hidden shadow-inner"
                        title="Click to open color palette picker"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        HEX Color Code
                      </label>
                      <input
                        type="text"
                        value={targetHex}
                        onChange={(e) => handleHexChange(e.target.value)}
                        placeholder="#C05A3E"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-sm uppercase focus:outline-none focus:border-brand-secondary transition-colors"
                      />
                    </div>
                    {eyedropperSupported && (
                      <button
                        type="button"
                        onClick={handleNativeEyedropper}
                        className="h-10 px-3 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors self-end"
                        title="Pick color from anywhere on screen"
                      >
                        <svg className="w-4 h-4 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                        Screen Pick
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* MODE 2: Curated Architectural Swatches */}
              {inputMode === 'swatch' && (
                <div className="space-y-3 animate-fade-in">
                  <label className="block text-xs font-medium text-slate-400">
                    Popular Nigerian Architectural Palette
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                    {PRESET_SWATCHES.map((swatch) => (
                      <button
                        key={swatch.hex}
                        type="button"
                        onClick={() => {
                          setTargetHex(swatch.hex);
                          runCalculation(swatch.hex, selectedVolume);
                        }}
                        className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all ${
                          targetHex.toUpperCase() === swatch.hex.toUpperCase()
                            ? 'border-brand-secondary bg-slate-700/80 ring-1 ring-brand-secondary'
                            : 'border-slate-700 bg-slate-900/50 hover:bg-slate-700/50'
                        }`}
                      >
                        <span
                          className="w-7 h-7 rounded-lg border border-white/20 shadow-sm shrink-0"
                          style={{ backgroundColor: swatch.hex }}
                        />
                        <div className="overflow-hidden">
                          <p className="text-xs font-semibold text-white truncate">{swatch.name}</p>
                          <p className="text-[10px] font-mono text-slate-400">{swatch.hex}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* MODE 3: Photo Upload with Canvas Eyedropper & Loupe */}
              {inputMode === 'photo' && (
                <div className="space-y-4 animate-fade-in">
                  {!photoSrc ? (
                    <label className="border-2 border-dashed border-slate-600 hover:border-brand-secondary rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-900/40">
                      <svg className="w-10 h-10 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-semibold text-white">Upload Reference Photo</span>
                      <span className="text-xs text-slate-400 mt-1">Click to browse or drag &amp; drop (JPG, PNG)</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">
                          Hover &amp; click on the photo to extract exact pigment color
                        </span>
                        <label className="text-xs text-brand-secondary hover:underline cursor-pointer">
                          Change Photo
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="relative overflow-hidden rounded-xl border border-slate-700 bg-black flex justify-center">
                        <canvas
                          ref={canvasRef}
                          onMouseMove={handleCanvasMouseMove}
                          onMouseLeave={() => setIsHoveringCanvas(false)}
                          onClick={handleCanvasClick}
                          className="max-w-full h-auto cursor-crosshair"
                        />

                        {/* Interactive Eyedropper Loupe Overlay */}
                        {isHoveringCanvas && (
                          <div
                            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-2xl flex items-center justify-center transition-transform"
                            style={{
                              left: `${loupePos.x}px`,
                              top: `${loupePos.y}px`,
                              width: '54px',
                              height: '54px',
                              backgroundColor: hoverColor,
                            }}
                          >
                            <span className="w-2 h-2 rounded-full bg-white ring-1 ring-black" />
                          </div>
                        )}
                      </div>

                      {/* Live Selected Color from Photo */}
                      <div className="flex items-center gap-3 bg-slate-900/80 p-2.5 rounded-xl border border-slate-700">
                        <div
                          className="w-8 h-8 rounded-lg border border-white/20 shadow-sm"
                          style={{ backgroundColor: targetHex }}
                        />
                        <div className="flex-1">
                          <p className="text-xs text-slate-400">Extracted Shade</p>
                          <p className="text-xs font-mono font-bold text-white">{targetHex}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Volume Selection */}
              <div className="pt-4 border-t border-slate-700/70 space-y-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  2. Total Paint Volume (Litres)
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {STANDARD_VOLUMES.map((vol) => (
                    <button
                      key={vol.value}
                      type="button"
                      onClick={() => handleVolumeChange(vol.value)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        selectedVolume === vol.value
                          ? 'border-brand-secondary bg-brand-primary text-white shadow-md'
                          : 'border-slate-700 bg-slate-900/60 text-slate-300 hover:bg-slate-700/50'
                      }`}
                    >
                      {vol.value}L {vol.value === 4 ? '(1 Gal)' : vol.value === 20 ? '(Drum)' : ''}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs text-slate-400 whitespace-nowrap">Custom Volume:</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={customVolume}
                    onChange={(e) => handleCustomVolumeInput(e.target.value)}
                    className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white text-xs font-semibold focus:outline-none focus:border-brand-secondary"
                  />
                  <span className="text-xs text-slate-400">Litres</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => runCalculation(targetHex, selectedVolume)}
                disabled={isCalculating}
                className="w-full py-3.5 px-6 rounded-xl bg-brand-secondary hover:bg-yellow-500 text-brand-primary-dark font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-brand-secondary/20 transition-all transform active:scale-95 disabled:opacity-50"
              >
                {isCalculating ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Optimizing Pigment Ratios...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Calculate Tinting Formula
                  </>
                )}
              </button>

              {saveStatus && (
                <p className="text-[11px] text-emerald-400 text-center font-medium animate-fade-in">
                  {saveStatus}
                </p>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Results & Formula Output */}
          <div className="lg:col-span-7 space-y-6">
            {result ? (
              <div className="space-y-6 animate-fade-in">
                {/* Visual Swatch Comparison & Delta E Banner */}
                <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl border border-slate-700/80 p-6 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/70">
                    <div>
                      <h3 className="text-lg font-extrabold text-white">
                        Formulation Match Analysis
                      </h3>
                      <p className="text-xs text-slate-400">
                        CIE-L*a*b* Standard D65 Spectral Simulation
                      </p>
                    </div>
                    {/* Delta E Badge */}
                    <div
                      className={`px-3 py-1.5 rounded-xl border text-xs font-extrabold flex items-center gap-1.5 ${
                        result.matchQuality === 'excellent'
                          ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                          : result.matchQuality === 'good'
                          ? 'bg-blue-950/80 border-blue-500/50 text-blue-300'
                          : result.matchQuality === 'moderate'
                          ? 'bg-amber-950/80 border-amber-500/50 text-amber-300'
                          : 'bg-rose-950/80 border-rose-500/50 text-rose-300'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current" />
                      ΔE₂₀₀₀ = {result.deltaE2000} ({result.matchQuality.toUpperCase()})
                    </div>
                  </div>

                  {/* Swatches Side-by-Side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Target Color */}
                    <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-700/70 space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                        <span>Target Input Color</span>
                        <span className="font-mono text-slate-400">{result.targetHex}</span>
                      </div>
                      <div
                        className="h-28 w-full rounded-xl shadow-inner border border-white/15 transition-all"
                        style={{ backgroundColor: result.targetHex }}
                      />
                      <div className="text-[11px] text-slate-400 font-mono flex justify-between">
                        <span>L*: {result.targetLab.l}</span>
                        <span>a*: {result.targetLab.a}</span>
                        <span>b*: {result.targetLab.b}</span>
                      </div>
                    </div>

                    {/* Achieved Mix Swatch */}
                    <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-700/70 space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                        <span>Achieved Mix Swatch</span>
                        <span className="font-mono text-slate-400">{result.achievedHex}</span>
                      </div>
                      <div
                        className="h-28 w-full rounded-xl shadow-inner border border-white/15 transition-all"
                        style={{ backgroundColor: result.achievedHex }}
                      />
                      <div className="text-[11px] text-slate-400 font-mono flex justify-between">
                        <span>L*: {result.achievedLab.l}</span>
                        <span>a*: {result.achievedLab.a}</span>
                        <span>b*: {result.achievedLab.b}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quality Summary Text */}
                  <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-white">Delta E Interpretation: </span>
                    {result.qualitySummary}
                  </div>
                </div>

                {/* Base Paint & Formulation Table */}
                <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl border border-slate-700/80 p-6 shadow-xl space-y-6">
                  {/* Selected Base Paint Card */}
                  <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 rounded-xl border border-slate-700/80">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-secondary">
                          Step 1: Required Base Paint
                        </span>
                        <h4 className="text-base font-bold text-white flex items-center gap-2 mt-0.5">
                          {result.base.name}
                          <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                            {result.base.code}
                          </span>
                        </h4>
                      </div>
                      <div className="text-right sm:text-right">
                        <span className="text-xs text-slate-400">Batch Quantity:</span>
                        <p className="text-sm font-extrabold text-white">{result.totalVolumeLitres} Litres</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {result.baseReason}
                    </p>
                  </div>

                  {/* Universal Colorants Table */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-secondary">
                          Step 2: Universal Colorant Dosing Recipe
                        </span>
                        <h4 className="text-base font-bold text-white">
                          Precise Machine Dosing
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-400">Total Tint Volume:</span>
                        <p className="text-xs font-mono font-bold text-brand-secondary">
                          {result.totalColorantMl} mL ({result.totalColorantGrams}g)
                        </p>
                      </div>
                    </div>

                    {result.colorantDoses.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-slate-700 text-slate-400 font-semibold uppercase text-[10px]">
                              <th className="py-2.5 px-3">Colorant</th>
                              <th className="py-2.5 px-2">Code</th>
                              <th className="py-2.5 px-2">Dose / Litre</th>
                              <th className="py-2.5 px-2 text-right">Total Volume</th>
                              <th className="py-2.5 px-2 text-right">Total Weight</th>
                              <th className="py-2.5 px-3 text-right">Mix %</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800">
                            {result.colorantDoses.map((dose) => (
                              <tr key={dose.colorant.id} className="hover:bg-slate-700/30 transition-colors">
                                <td className="py-3 px-3">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className="w-4 h-4 rounded-md border border-white/20 shrink-0"
                                      style={{ backgroundColor: dose.colorant.hex }}
                                    />
                                    <span className="font-semibold text-white">{dose.colorant.name}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-2 font-mono font-bold text-brand-secondary">
                                  {dose.colorant.code}
                                </td>
                                <td className="py-3 px-2 font-mono text-slate-300">
                                  {dose.dosageMlPerLitre} mL/L
                                </td>
                                <td className="py-3 px-2 font-mono font-bold text-white text-right">
                                  {dose.totalMl} mL
                                </td>
                                <td className="py-3 px-2 font-mono text-slate-300 text-right">
                                  {dose.totalGrams} g
                                </td>
                                <td className="py-3 px-3 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <div className="w-12 bg-slate-700 rounded-full h-1.5 overflow-hidden">
                                      <div
                                        className="bg-brand-secondary h-full rounded-full"
                                        style={{ width: `${dose.percentOfTotalColorant}%` }}
                                      />
                                    </div>
                                    <span className="font-mono text-slate-300 w-9 text-right">
                                      {dose.percentOfTotalColorant}%
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 py-4 text-center">
                        This color is naturally achieved by the pure base paint with zero tint addition.
                      </p>
                    )}
                  </div>

                  {/* Laboratory Advisory Disclaimer */}
                  <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-xs text-amber-200/90 space-y-1">
                      <p className="font-bold text-amber-200">
                        In-Store Technician Verification Recommended
                      </p>
                      <p className="leading-relaxed">
                        This formula provides a mathematically optimized tinting starting point using standard universal colorants. For commercial orders and large drum batches, our factory technicians perform physical drawdown cards and spectrophotometer checks to guarantee exact substrate coverage.
                      </p>
                    </div>
                  </div>

                  {/* Conversion Button */}
                  <div className="pt-2">
                    <Link
                      href={getQuoteLink()}
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-brand-primary to-brand-primary-dark hover:from-brand-primary-light hover:to-brand-primary border border-white/20 text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl hover:shadow-brand-primary/40 transition-all transform active:scale-98"
                    >
                      <svg className="w-5 h-5 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Request This Custom Mix Order
                    </Link>
                    <p className="text-[11px] text-slate-400 text-center mt-2">
                      Pre-fills our quote form with this exact tinting formula, base paint, and batch volume.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800/60 rounded-2xl border border-slate-700/60 p-12 text-center text-slate-400">
                <svg className="w-12 h-12 mx-auto text-slate-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <p className="text-base font-semibold text-white">Select a color to calculate formulation</p>
                <p className="text-xs text-slate-400 mt-1">Enter a Hex code, pick an architectural preset, or upload an image.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
