'use client';

import { useState } from 'react';
import type { Metadata } from 'next';

// Note: metadata must be in a separate file for client components
// We'll handle this via a parent layout or generateMetadata in the future

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission – replace with Supabase insert
    await new Promise((r) => setTimeout(r, 1500));

    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-3xl font-bold text-brand-primary-dark mb-4">
            Thank You for Contacting AJIBAZ PAINT NIGERIA LIMITED
          </h1>
          <p className="text-text-secondary text-lg mb-8">
            Your project request has been received. Our team will review the
            information and contact you shortly.
          </p>
          <a href="/" className="btn btn-primary">
            Back to Home
          </a>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-primary-dark to-brand-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-brand-secondary font-semibold text-sm uppercase tracking-wider">
            Get Started
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-4">
            Request a Quote
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Fill out the form below and we&apos;ll get back to you with a
            detailed estimate for your painting project.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Honeypot field */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            {/* Contact Info */}
            <fieldset>
              <legend className="text-xl font-bold text-brand-primary-dark mb-6 pb-2 border-b border-border">
                Your Details
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="full_name" className="form-label">Full Name *</label>
                  <input type="text" id="full_name" name="full_name" required className="form-input" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="phone" className="form-label">Phone Number *</label>
                  <input type="tel" id="phone" name="phone" required className="form-input" placeholder="+234 800 000 0000" />
                </div>
                <div>
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input type="email" id="email" name="email" className="form-input" placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="whatsapp" className="form-label">WhatsApp Number</label>
                  <input type="tel" id="whatsapp" name="whatsapp_number" className="form-input" placeholder="+234 800 000 0000" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="location" className="form-label">Location / Address *</label>
                  <input type="text" id="location" name="location" required className="form-input" placeholder="e.g. Abeokuta, Ogun State" />
                </div>
              </div>
            </fieldset>

            {/* Project Info */}
            <fieldset>
              <legend className="text-xl font-bold text-brand-primary-dark mb-6 pb-2 border-b border-border">
                Project Details
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="project_type" className="form-label">Service Required *</label>
                  <select id="project_type" name="project_type" required className="form-input">
                    <option value="">Select a service</option>
                    <option value="residential-painting">Residential Painting</option>
                    <option value="commercial-painting">Commercial Painting</option>
                    <option value="interior-painting">Interior Painting</option>
                    <option value="exterior-painting">Exterior Painting</option>
                    <option value="colour-mixing">Custom Colour Mixing</option>
                    <option value="decorative-finishes">Decorative Finishes</option>
                    <option value="paint-sales">Paint & Material Purchase</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="estimated_size" className="form-label">Estimated Size</label>
                  <input type="text" id="estimated_size" name="estimated_size" className="form-input" placeholder="e.g. 3 bedrooms / 200 sqm" />
                </div>
                <div>
                  <label className="form-label">Property Type</label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 text-sm text-text-secondary">
                      <input type="radio" name="is_residential" value="true" defaultChecked className="accent-brand-primary" />
                      Residential
                    </label>
                    <label className="flex items-center gap-2 text-sm text-text-secondary">
                      <input type="radio" name="is_residential" value="false" className="accent-brand-primary" />
                      Commercial
                    </label>
                  </div>
                </div>
                <div>
                  <label className="form-label">Interior or Exterior?</label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 text-sm text-text-secondary">
                      <input type="radio" name="is_interior" value="true" defaultChecked className="accent-brand-primary" />
                      Interior
                    </label>
                    <label className="flex items-center gap-2 text-sm text-text-secondary">
                      <input type="radio" name="is_interior" value="false" className="accent-brand-primary" />
                      Exterior
                    </label>
                    <label className="flex items-center gap-2 text-sm text-text-secondary">
                      <input type="radio" name="is_interior" value="both" className="accent-brand-primary" />
                      Both
                    </label>
                  </div>
                </div>
                <div>
                  <label htmlFor="num_rooms" className="form-label">Number of Rooms</label>
                  <input type="number" id="num_rooms" name="num_rooms" min="0" className="form-input" placeholder="e.g. 4" />
                </div>
                <div>
                  <label htmlFor="preferred_colour" className="form-label">Preferred Colour(s)</label>
                  <input type="text" id="preferred_colour" name="preferred_colour" className="form-input" placeholder="e.g. Off-white, Sky blue" />
                </div>
                <div>
                  <label htmlFor="target_start_date" className="form-label">Target Start Date</label>
                  <input type="date" id="target_start_date" name="target_start_date" className="form-input" />
                </div>
                <div>
                  <label htmlFor="budget_range" className="form-label">Budget Range</label>
                  <select id="budget_range" name="budget_range" className="form-input">
                    <option value="">Select budget range</option>
                    <option value="under-100k">Under ₦100,000</option>
                    <option value="100k-250k">₦100,000 – ₦250,000</option>
                    <option value="250k-500k">₦250,000 – ₦500,000</option>
                    <option value="500k-1m">₦500,000 – ₦1,000,000</option>
                    <option value="over-1m">Over ₦1,000,000</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="description" className="form-label">Project Description</label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="form-input resize-y"
                    placeholder="Describe your project, any special requirements, or additional details..."
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="images" className="form-label">Upload Images (optional)</label>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    multiple
                    accept="image/jpeg,image/png"
                    className="form-input file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20"
                  />
                  <p className="text-xs text-text-muted mt-1">JPG or PNG, max 5MB each</p>
                </div>
              </div>
            </fieldset>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full sm:w-auto text-base px-10 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Quote Request"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
