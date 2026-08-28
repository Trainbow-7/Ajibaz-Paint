'use client';

import { useState, useRef } from 'react';

const WHATSAPP_NUMBER = '2347066443082';

interface ColorZone {
  zone: string;
  colorName: string;
  hex: string;
  paintType: 'emulsion' | 'gloss' | 'satin' | 'textured';
  finishType: string;
  reason: string;
}

interface AdvisorResult {
  schemeName: string;
  description: string;
  hasImageAnalysis: boolean;
  zones: ColorZone[];
  estimatedCoverage: string;
  specialTips: string[];
  demoMode: boolean;
}

interface UploadedImage {
  preview: string;
  base64: string;
  mimeType: string;
  name: string;
}

const paintTypeBadgeColor: Record<string, string> = {
  emulsion: 'bg-blue-50 text-blue-700 border-blue-100',
  gloss: 'bg-purple-50 text-purple-700 border-purple-100',
  satin: 'bg-teal-50 text-teal-700 border-teal-100',
  textured: 'bg-amber-50 text-amber-700 border-amber-100',
};

function buildWhatsAppMessage(input: Record<string, string>, result: AdvisorResult): string {
  const lines = [
    `🏗️ *BUILDING COLOUR RECOMMENDATION QUOTE*`,
    `From: AJIBAZ AI Colour Advisor${result.hasImageAnalysis ? ' (with Photo Analysis)' : ''}`,
    ``,
    `*Building Details:*`,
    `• Type: ${input.buildingType}`,
    `• Style: ${input.buildingStyle}`,
    `• Floors: ${input.floors || 'N/A'}`,
    `• Environment: ${input.environment || 'N/A'}`,
    `• Roof Type: ${input.roofType || 'N/A'}`,
    `• Preferences: ${input.preferences || 'N/A'}`,
    ``,
    `*Recommended Colour Scheme: ${result.schemeName}*`,
    result.description,
    ``,
    `*Colour Plan by Zone:*`,
    ...result.zones.map(
      (z, i) =>
        `${i + 1}. *${z.zone}*\n   🎨 ${z.colorName} (${z.hex}) — ${z.paintType} / ${z.finishType}`
    ),
    ``,
    `*Application Tips:*`,
    ...result.specialTips.map((t, i) => `${i + 1}. ${t}`),
    ``,
    `📩 Please contact me to confirm availability, pricing, and to book a site visit.`,
  ];
  return lines.join('\n');
}

// ── Reusable Image Upload Dropzone Component ──
interface DropzoneProps {
  label: string;
  sublabel: string;
  icon: string;
  image: UploadedImage | null;
  onUpload: (img: UploadedImage) => void;
  onRemove: () => void;
  id: string;
}

function ImageDropzone({ label, sublabel, icon, image, onUpload, onRemove, id }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    setError('');
    if (file.size > 8 * 1024 * 1024) {
      setError('File must be under 8MB.');
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Only JPG, PNG, or WebP accepted.');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onUpload({
        preview: reader.result as string,
        base64: reader.result as string,
        mimeType: file.type,
        name: file.name,
      });
    };
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  return (
    <div className="flex-1 min-w-0">
      <p className="form-label mb-2 flex items-center gap-1.5">
        <span>{icon}</span> {label}
        <span className="text-text-muted font-normal normal-case">{sublabel}</span>
      </p>

      {image ? (
        <div className="relative rounded-2xl overflow-hidden border border-border-color shadow-sm group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.preview} alt={label} className="w-full h-44 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
            <p className="text-white text-xs font-medium truncate">{image.name}</p>
            <button
              type="button"
              onClick={onRemove}
              className="mt-2 self-start bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full transition-colors"
            >
              ✕ Remove
            </button>
          </div>
          <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            ✓ Uploaded
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative h-44 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-brand-primary bg-brand-primary/5 scale-[1.01]'
              : 'border-border-color bg-bg-secondary hover:border-brand-primary hover:bg-brand-primary/3'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            id={id}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) processFile(file);
            }}
          />
          <div className={`text-3xl mb-2 transition-transform duration-200 ${isDragging ? 'scale-125' : 'group-hover:scale-110'}`}>
            {isDragging ? '📂' : icon}
          </div>
          <p className="text-sm font-semibold text-brand-primary-dark">
            {isDragging ? 'Drop it here!' : 'Click or drag & drop'}
          </p>
          <p className="text-xs text-text-muted mt-0.5">JPG, PNG, WebP · max 8MB</p>
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-1 font-medium">⚠️ {error}</p>}
    </div>
  );
}

// ── Main Page ──
export default function BuildingAdvisorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AdvisorResult | null>(null);
  const [error, setError] = useState('');

  const [exteriorImage, setExteriorImage] = useState<UploadedImage | null>(null);
  const [interiorImage, setInteriorImage] = useState<UploadedImage | null>(null);

  const [formValues, setFormValues] = useState({
    buildingType: '',
    buildingStyle: '',
    floors: '',
    environment: '',
    roofType: '',
    preferences: '',
    additionalNotes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const payload = {
        ...formValues,
        ...(exteriorImage && {
          exteriorImage: exteriorImage.base64,
          exteriorMimeType: exteriorImage.mimeType,
        }),
        ...(interiorImage && {
          interiorImage: interiorImage.base64,
          interiorMimeType: interiorImage.mimeType,
        }),
      };

      const res = await fetch('/api/building-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);

      setTimeout(() => {
        document.getElementById('advisor-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendToWhatsApp = () => {
    if (!result) return;
    const message = buildWhatsAppMessage(formValues, result);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const hasImages = !!(exteriorImage || interiorImage);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-primary-dark via-brand-primary-dark to-brand-primary py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, var(--brand-primary-light) 0%, transparent 60%), radial-gradient(circle at 20% 80%, var(--brand-secondary) 0%, transparent 50%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5">
              <span>🤖</span> AI Vision & Analysis
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-5 max-w-3xl leading-tight">
            AI Building <span className="text-brand-secondary">Colour Advisor</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl leading-relaxed mb-8">
            Upload photos of your building — exterior and/or interior — and let our AI visually analyse the structure and recommend a complete, zone-by-zone professional colour scheme. Then send it to our team on WhatsApp in one click!
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            {['📸 Photo Upload & Vision Analysis', '🏠 New Build & Repainting', '🌍 Nigerian Climate Optimised', '💬 WhatsApp Quote in 1 Click'].map((tag) => (
              <span key={tag} className="bg-white/10 text-white/80 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* ── Form Column ── */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl border border-border-color shadow-sm p-7 sticky top-24">
                <h2 className="text-xl font-bold text-brand-primary-dark mb-1">Describe & Show Your Building</h2>
                <p className="text-text-secondary text-sm mb-6">Upload photos for the best AI analysis, or fill in the details manually — or both!</p>

                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* ── Image Upload Section ── */}
                  <div className="p-4 bg-brand-primary/5 border border-brand-primary/15 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-brand-primary-dark">Upload Building Photos <span className="text-brand-primary font-semibold">(Recommended)</span></p>
                        <p className="text-xs text-text-muted">AI will visually analyse your building for a more accurate recommendation</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <ImageDropzone
                        id="ba_exterior"
                        label="Exterior"
                        sublabel="(front view)"
                        icon="🏠"
                        image={exteriorImage}
                        onUpload={setExteriorImage}
                        onRemove={() => setExteriorImage(null)}
                      />
                      <ImageDropzone
                        id="ba_interior"
                        label="Interior"
                        sublabel="(any room)"
                        icon="🛋️"
                        image={interiorImage}
                        onUpload={setInteriorImage}
                        onRemove={() => setInteriorImage(null)}
                      />
                    </div>

                    {hasImages && (
                      <div className="flex items-center gap-2 p-2.5 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 font-medium">
                        <span>✅</span>
                        {exteriorImage && interiorImage
                          ? 'Both exterior & interior uploaded — AI will perform full visual analysis!'
                          : exteriorImage
                          ? 'Exterior photo uploaded — AI will analyse the building structure.'
                          : 'Interior photo uploaded — AI will analyse the room aesthetics.'}
                      </div>
                    )}
                  </div>

                  {/* ── Building Details ── */}
                  <div>
                    <p className="text-sm font-bold text-brand-primary-dark mb-3 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-brand-primary/10 text-brand-primary text-xs flex items-center justify-center font-bold">2</span>
                      Building Details <span className="text-text-muted font-normal">(for more context)</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="ba_type" className="form-label">Building Type *</label>
                        <select id="ba_type" name="buildingType" required value={formValues.buildingType} onChange={handleChange} className="form-input">
                          <option value="">Select type</option>
                          <option value="Residential House">Residential House</option>
                          <option value="Duplex / Storey Building">Duplex / Storey Building</option>
                          <option value="Bungalow">Bungalow</option>
                          <option value="Block of Flats">Block of Flats</option>
                          <option value="Commercial Office">Commercial Office</option>
                          <option value="Shop / Retail Space">Shop / Retail Space</option>
                          <option value="Warehouse / Industrial">Warehouse / Industrial</option>
                          <option value="Hotel / Guesthouse">Hotel / Guesthouse</option>
                          <option value="School / Church">School / Church</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="ba_style" className="form-label">Architectural Style *</label>
                        <select id="ba_style" name="buildingStyle" required value={formValues.buildingStyle} onChange={handleChange} className="form-input">
                          <option value="">Select style</option>
                          <option value="Modern / Contemporary">Modern / Contemporary</option>
                          <option value="Traditional Nigerian">Traditional Nigerian</option>
                          <option value="Colonial / Classic">Colonial / Classic</option>
                          <option value="Minimalist">Minimalist</option>
                          <option value="Mediterranean">Mediterranean</option>
                          <option value="Tropical / Coastal">Tropical / Coastal</option>
                          <option value="Industrial">Industrial</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="ba_floors" className="form-label">Number of Floors</label>
                        <select id="ba_floors" name="floors" value={formValues.floors} onChange={handleChange} className="form-input">
                          <option value="">Select floors</option>
                          <option value="Bungalow (Ground Only)">Bungalow (Ground Only)</option>
                          <option value="1 Floor (Storey)">1 Floor (Storey)</option>
                          <option value="2 Floors">2 Floors</option>
                          <option value="3+ Floors">3+ Floors</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="ba_env" className="form-label">Surrounding Environment</label>
                        <select id="ba_env" name="environment" value={formValues.environment} onChange={handleChange} className="form-input">
                          <option value="">Select environment</option>
                          <option value="Urban / City Centre">Urban / City Centre</option>
                          <option value="Suburban / Estate">Suburban / Estate</option>
                          <option value="Rural / Village Area">Rural / Village Area</option>
                          <option value="Coastal / Waterside">Coastal / Waterside</option>
                          <option value="Hilltop / Elevated">Hilltop / Elevated</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="ba_roof" className="form-label">Roof Type</label>
                        <select id="ba_roof" name="roofType" value={formValues.roofType} onChange={handleChange} className="form-input">
                          <option value="">Select roof</option>
                          <option value="Flat / Concrete Roof">Flat / Concrete Roof</option>
                          <option value="Pitched (Zinc / Steel)">Pitched (Zinc / Steel)</option>
                          <option value="Hip Roof">Hip Roof</option>
                          <option value="Mansard / Complex">Mansard / Complex</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="ba_pref" className="form-label">Colour Preferences</label>
                        <input
                          type="text"
                          id="ba_pref"
                          name="preferences"
                          value={formValues.preferences}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="e.g. Warm, bold, earthy..."
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="ba_notes" className="form-label">Additional Notes</label>
                        <textarea
                          id="ba_notes"
                          name="additionalNotes"
                          value={formValues.additionalNotes}
                          onChange={handleChange}
                          rows={2}
                          className="form-input resize-none"
                          placeholder="e.g. Black iron gate, tiled compound, repainting (current colour is cream)..."
                        />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2">
                      <span>⚠️</span> {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    id="ba_submit"
                    className="btn btn-primary w-full text-base py-4 disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        {hasImages ? 'Analysing photos & generating scheme...' : 'Generating your colour scheme...'}
                      </>
                    ) : (
                      <>
                        <span>{hasImages ? '🔍' : '✨'}</span>
                        {hasImages ? 'Analyse Photos & Generate Scheme' : 'Generate Colour Recommendation'}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* ── Results Column ── */}
            <div className="lg:col-span-7" id="advisor-results">
              {!result && !isLoading && (
                <div className="flex flex-col items-center justify-center text-center py-20 text-text-muted">
                  <div className="w-20 h-20 rounded-full bg-brand-primary/8 flex items-center justify-center mb-4 text-4xl">🏗️</div>
                  <h3 className="font-bold text-brand-primary-dark text-lg mb-2">Your Colour Scheme Will Appear Here</h3>
                  <p className="text-sm max-w-sm leading-relaxed">
                    Upload photos of your building exterior and/or interior, fill in the details, and click <strong>Generate</strong> to get a tailored AI colour recommendation.
                  </p>
                </div>
              )}

              {isLoading && (
                <div className="flex flex-col items-center justify-center text-center py-20">
                  <div className="relative w-20 h-20 mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-brand-primary/20 animate-ping" />
                    <div className="absolute inset-0 rounded-full border-4 border-brand-primary border-t-transparent animate-spin" />
                    <div className="absolute inset-2 rounded-full bg-brand-primary/10 flex items-center justify-center text-2xl">
                      {hasImages ? '🔍' : '🎨'}
                    </div>
                  </div>
                  <p className="font-bold text-brand-primary-dark text-lg animate-pulse">
                    {hasImages ? 'AI is analysing your photos...' : 'AI is designing your colour scheme...'}
                  </p>
                  <p className="text-sm text-text-muted mt-2">
                    {hasImages
                      ? 'Scanning building structure, textures, and architectural features'
                      : 'Considering building type, environment, and local conditions'}
                  </p>
                </div>
              )}

              {result && !isLoading && (
                <div className="space-y-6 animate-fade-in">

                  {/* Demo Mode Banner */}
                  {result.demoMode && (
                    <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl flex items-start gap-3 text-sm">
                      <span className="text-xl shrink-0">💡</span>
                      <div><strong>Demo Mode:</strong> This is a simulated recommendation. Add your <code>GEMINI_API_KEY</code> to get live AI vision analysis of your uploaded photos.</div>
                    </div>
                  )}

                  {/* Image Analysis Badge */}
                  {result.hasImageAnalysis && !result.demoMode && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 text-sm text-green-800 font-medium">
                      <span className="text-lg">📸</span>
                      AI analysed your uploaded photo(s) to generate this personalised recommendation.
                    </div>
                  )}

                  {/* Scheme Header */}
                  <div className="bg-gradient-to-br from-brand-primary-dark to-brand-primary rounded-3xl p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
                    <div className="relative z-10">
                      <p className="text-white/60 text-xs uppercase tracking-widest mb-1 font-semibold">AI Recommended Scheme</p>
                      <h2 className="text-2xl font-bold mb-3">{result.schemeName}</h2>
                      <p className="text-white/80 text-sm leading-relaxed max-w-xl">{result.description}</p>
                      <div className="flex gap-2 mt-4 flex-wrap">
                        {result.zones.map((z) => (
                          <div
                            key={z.zone}
                            className="w-7 h-7 rounded-full border-2 border-white/30 shadow-md hover:scale-125 transition-transform cursor-pointer"
                            style={{ backgroundColor: z.hex }}
                            title={`${z.zone}: ${z.colorName}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Zone Cards */}
                  <div>
                    <h3 className="text-base font-bold text-brand-primary-dark uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span>🏠</span> Zone-by-Zone Colour Plan
                    </h3>
                    <div className="space-y-3">
                      {result.zones.map((zone, idx) => (
                        <div key={idx} className="flex gap-4 p-4 bg-white rounded-2xl border border-border-color hover:border-brand-primary hover:shadow-md transition-all duration-300">
                          <div className="w-14 h-14 rounded-xl shadow-inner border border-black/8 shrink-0" style={{ backgroundColor: zone.hex }} />
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                              <h4 className="font-bold text-brand-primary-dark text-sm">{zone.zone}</h4>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="font-mono text-[11px] text-text-muted">{zone.hex}</span>
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize ${paintTypeBadgeColor[zone.paintType]}`}>
                                  {zone.paintType} · {zone.finishType}
                                </span>
                              </div>
                            </div>
                            <p className="text-brand-primary font-semibold text-sm">{zone.colorName}</p>
                            <p className="text-text-secondary text-xs mt-1 leading-relaxed">{zone.reason}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                    <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span>🛡️</span> Application Tips for Nigerian Climate
                    </h3>
                    <ol className="space-y-2">
                      {result.specialTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-blue-900">
                          <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-800 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          {tip}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Coverage */}
                  <div className="flex items-start gap-3 p-4 bg-brand-accent/5 border border-brand-accent/15 rounded-2xl">
                    <span className="text-2xl">📏</span>
                    <div>
                      <p className="text-sm font-bold text-brand-primary-dark">Estimated Paint Coverage</p>
                      <p className="text-sm text-text-secondary mt-0.5">{result.estimatedCoverage}</p>
                    </div>
                  </div>

                  {/* WhatsApp CTA */}
                  <div className="bg-green-900 rounded-3xl p-6 text-white text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_var(--whatsapp)_0%,_transparent_60%)] opacity-30" />
                    <div className="relative z-10">
                      <p className="text-white/70 text-sm mb-1">Happy with this colour scheme?</p>
                      <h3 className="text-xl font-bold mb-3">Send This as a Quote to AJIBAZ 🎉</h3>
                      <p className="text-white/70 text-sm mb-5 max-w-sm mx-auto">
                        One click sends the full colour plan, zone details, and your building info directly to our WhatsApp team to get started!
                      </p>
                      <button
                        onClick={handleSendToWhatsApp}
                        id="ba_whatsapp_send"
                        className="inline-flex items-center gap-3 btn-whatsapp font-bold text-base px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Send Quote to WhatsApp
                      </button>
                      <p className="text-white/50 text-xs mt-3">Opens WhatsApp with the full colour plan pre-filled and ready to send.</p>
                    </div>
                  </div>

                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
