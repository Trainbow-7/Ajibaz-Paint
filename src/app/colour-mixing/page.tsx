'use client';

import { useState } from 'react';

interface DominantColor {
  hex: string;
  name: string;
  paintType: 'emulsion' | 'gloss' | 'satin' | 'textured';
  placementAdvice: string;
}

interface CoordinatingColor {
  hex: string;
  name: string;
}

interface AIResult {
  dominantColors: DominantColor[];
  coordinatingColors: CoordinatingColor[];
  overallAdvice: string;
  demoMode: boolean;
}

export default function ColourMixingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileError, setFileError] = useState('');
  
  // AI related states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [aiError, setAiError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [notification, setNotification] = useState('');

  // Controlled form states
  const [preferredColour, setPreferredColour] = useState('');
  const [paintType, setPaintType] = useState('');

  // File to base64 converter
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    setAiError('');
    setNotification('');
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Basic Validations
    if (file.size > 5 * 1024 * 1024) {
      setFileError('The file must be under 5MB.');
      e.target.value = '';
      return;
    }
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setFileError('Only JPG and PNG files are accepted.');
      e.target.value = '';
      return;
    }

    try {
      // 1. Convert to Base64 for Preview & API
      const base64 = await fileToBase64(file);
      setImagePreview(base64);

      // 2. Call the AI Route
      setIsAnalyzing(true);
      const res = await fetch('/api/color-match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64,
          mimeType: file.type
        })
      });

      if (!res.ok) {
        throw new Error('Failed to analyze image. Please try again.');
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setAiResult(data);
      setNotification('✨ AI Swatches extracted! Click a swatch to auto-fill the form.');
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'An error occurred during image analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApplyColor = (color: DominantColor) => {
    setPreferredColour(`${color.name} (${color.hex})`);
    
    // Clean string comparison to map AI paintType to select option
    if (['emulsion', 'gloss', 'satin', 'textured'].includes(color.paintType)) {
      setPaintType(color.paintType);
    } else {
      setPaintType('other');
    }

    setNotification(`Applied "${color.name}" & "${color.paintType}" to the request form below!`);
    
    // Auto-scroll to form input on mobile
    const formElement = document.getElementById('cm_form_header');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }

    // Clear notification after 4 seconds
    setTimeout(() => {
      setNotification((prev) => prev.includes(color.name) ? '' : prev);
    }, 4000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API submission to DB (e.g. Supabase)
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-6xl mb-6 animate-bounce">🎨</div>
          <h1 className="text-3xl font-bold text-brand-primary-dark mb-4">
            Colour Mixing Request Received!
          </h1>
          <p className="text-text-secondary text-lg mb-8">
            Our colour specialists will review your request and contact you
            shortly with availability and pricing.
          </p>
          <a href="/" className="btn btn-primary">Back to Home</a>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-primary-dark via-brand-primary to-brand-secondary py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="bg-white/10 text-white font-semibold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md">
            Custom Colours &amp; AI Matching
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6">
            Colour Mixing Service
          </h1>
          <p className="text-white/80 text-lg max-w-3xl leading-relaxed">
            Can&apos;t find the exact shade you want? Upload any photo or swatch, and let our 
            AI-powered matching assistant analyze the colors, or fill out the custom request below.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-bg-secondary border-b border-border-color">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-primary-dark text-center mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Upload Reference", desc: "Upload a photo or swatch image. Our AI analyzes the color palette and suggests matching paint specifications instantly." },
              { step: "2", title: "Auto-fill & Customize", desc: "Choose your favorite shade from the AI recommendations to auto-fill the request, or enter details manually." },
              { step: "3", title: "Specialist Review", desc: "Our specialists mix the custom formula using high-precision matchers and contact you for collection or delivery." },
            ].map((s) => (
              <div key={s.step} className="text-center p-6 bg-white rounded-2xl border border-border-color shadow-sm transition-transform hover:-translate-y-1 duration-300">
                <div className="w-12 h-12 rounded-full bg-brand-primary-light/10 text-brand-primary-dark font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold text-brand-primary-dark mb-2">{s.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Interactive Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Notification Toast */}
          {notification && (
            <div className="mb-8 p-4 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary-dark rounded-xl flex items-center gap-3 animate-fade-in shadow-sm">
              <span className="text-xl">✨</span>
              <p className="text-sm font-medium">{notification}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Image Upload & AI Panel (5 Cols) */}
            <div className="lg:col-span-5 bg-white border border-border-color rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-brand-primary-dark mb-4 flex items-center gap-2">
                <span>🎨</span> AI Color Analyzer
              </h2>
              <p className="text-text-secondary text-sm mb-6">
                Upload a picture of a room, a fabric swatch, or an inspiration photo. The AI will extract the dominant tones and suggest paint products.
              </p>

              {/* Upload Dropzone Container */}
              <div className="space-y-6">
                <div className="relative border-2 border-dashed border-border-color rounded-2xl p-6 text-center hover:border-brand-primary transition-colors cursor-pointer group">
                  <input
                    type="file"
                    id="cm_images_ai"
                    name="images_ai"
                    accept="image/jpeg,image/png"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {imagePreview ? (
                    <div className="space-y-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-h-48 mx-auto rounded-lg object-cover shadow-sm"
                      />
                      <p className="text-xs text-text-muted">Click or drag another image to change</p>
                    </div>
                  ) : (
                    <div className="py-4">
                      <div className="w-12 h-12 bg-bg-secondary rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-brand-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="font-semibold text-brand-primary-dark text-sm">Upload reference image</p>
                      <p className="text-xs text-text-muted mt-1">JPG or PNG, max 5MB</p>
                    </div>
                  )}
                </div>

                {fileError && <p className="text-red-500 text-xs mt-1 font-medium">{fileError}</p>}
                {aiError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                    ⚠️ {aiError}
                  </div>
                )}

                {/* AI Analyzer Loading State */}
                {isAnalyzing && (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-sm font-semibold text-brand-primary animate-pulse">AI extracting color swatches...</p>
                  </div>
                )}

                {/* AI Results Output */}
                {aiResult && !isAnalyzing && (
                  <div className="space-y-6 animate-fade-in border-t border-border-color pt-6">
                    
                    {/* Demo Mode Badge */}
                    {aiResult.demoMode && (
                      <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl flex items-start gap-2">
                        <span className="text-base mt-0.5">💡</span>
                        <div>
                          <strong>Demo Mode Active:</strong> Add <code>GEMINI_API_KEY</code> to <code>.env.local</code> to analyze your uploaded files using Gemini Vision. Showing a simulated palette.
                        </div>
                      </div>
                    )}

                    {/* Dominant Swatches */}
                    <div>
                      <h3 className="text-sm font-bold text-brand-primary-dark uppercase tracking-wider mb-3">Dominant Swatches</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {aiResult.dominantColors.map((color, idx) => (
                          <div 
                            key={idx}
                            onClick={() => handleApplyColor(color)}
                            className="flex items-center gap-4 p-3 rounded-xl border border-border-color hover:border-brand-primary hover:shadow-md cursor-pointer group transition-all duration-300 bg-bg-secondary"
                          >
                            <div 
                              className="w-12 h-12 rounded-xl shadow-inner border border-black/10 shrink-0 group-hover:scale-105 transition-transform duration-300"
                              style={{ backgroundColor: color.hex }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <h4 className="font-bold text-brand-primary-dark text-sm truncate">{color.name}</h4>
                                <span className="text-xs font-mono text-text-muted">{color.hex}</span>
                              </div>
                              <p className="text-[11px] text-text-secondary truncate mt-0.5">{color.placementAdvice}</p>
                              <span className="inline-block bg-white text-brand-primary text-[10px] font-semibold px-2 py-0.5 rounded-full border border-brand-primary/10 mt-1 capitalize">
                                {color.paintType} Recommended
                              </span>
                            </div>
                            <button className="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-white rounded-full border border-brand-primary/10 shadow-sm shrink-0">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Coordinating Swatches */}
                    <div>
                      <h3 className="text-sm font-bold text-brand-primary-dark uppercase tracking-wider mb-2.5">Coordinating Accents</h3>
                      <div className="flex gap-4">
                        {aiResult.coordinatingColors.map((color, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div 
                              className="w-6 h-6 rounded-full border border-black/10 shadow-inner"
                              style={{ backgroundColor: color.hex }}
                            />
                            <div className="leading-none">
                              <p className="text-xs font-bold text-brand-primary-dark">{color.name}</p>
                              <span className="text-[10px] font-mono text-text-muted">{color.hex}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Designer Advice */}
                    <div className="p-4 bg-brand-secondary/5 border border-brand-secondary/15 rounded-2xl">
                      <h4 className="text-xs font-bold text-brand-secondary-dark uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <span>💡</span> Designer Advice
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {aiResult.overallAdvice}
                      </p>
                    </div>

                  </div>
                )}

              </div>
            </div>

            {/* Right Column: Custom Request Form (7 Cols) */}
            <div className="lg:col-span-7 bg-white border border-border-color rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 id="cm_form_header" className="text-2xl font-bold text-brand-primary-dark mb-2">
                Request Colour Mixing
              </h2>
              <p className="text-text-secondary text-sm mb-8">
                Confirm your color preferences and required quantities below. Our mixing team will formulate your order to perfection.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cm_name" className="form-label">Full Name *</label>
                    <input type="text" id="cm_name" name="full_name" required className="form-input" />
                  </div>
                  <div>
                    <label htmlFor="cm_phone" className="form-label">Phone Number *</label>
                    <input type="tel" id="cm_phone" name="phone" required className="form-input" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="cm_email" className="form-label">Email Address</label>
                    <input type="email" id="cm_email" name="email" className="form-input" />
                  </div>
                  
                  <div>
                    <label htmlFor="cm_paint_type" className="form-label">Paint Type *</label>
                    <select 
                      id="cm_paint_type" 
                      name="paint_type" 
                      required 
                      value={paintType} 
                      onChange={(e) => setPaintType(e.target.value)}
                      className="form-input"
                    >
                      <option value="">Select type</option>
                      <option value="emulsion">Emulsion (Water-based)</option>
                      <option value="gloss">Gloss (Oil-based)</option>
                      <option value="satin">Satin</option>
                      <option value="textured">Textured</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="cm_quantity" className="form-label">Quantity Required *</label>
                    <input type="text" id="cm_quantity" name="quantity_required" required className="form-input" placeholder="e.g. 20 litres" />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="cm_colour" className="form-label">Preferred Colour *</label>
                    <input 
                      type="text" 
                      id="cm_colour" 
                      name="preferred_colour" 
                      required 
                      value={preferredColour}
                      onChange={(e) => setPreferredColour(e.target.value)}
                      className="form-input" 
                      placeholder="e.g. Dusty Rose (or click an AI swatch above)" 
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="cm_reference" className="form-label">Colour Reference / Code (Optional)</label>
                    <input type="text" id="cm_reference" name="colour_reference" className="form-input" placeholder="e.g. Pantone 7522 C or NCS S 2030-R" />
                  </div>

                  {/* Manual file upload reference (fallback/alternative) */}
                  <div className="sm:col-span-2">
                    <label className="form-label">Additional Reference Document (Optional)</label>
                    <p className="text-xs text-text-muted mb-2">If you have additional design specs, upload them here.</p>
                    <input
                      type="file"
                      id="cm_images"
                      name="images"
                      accept="image/jpeg,image/png"
                      className="form-input file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full sm:w-auto text-base px-10 py-4 disabled:opacity-50 transition-all shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? 'Submitting Request...' : 'Send Mixing Request'}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
