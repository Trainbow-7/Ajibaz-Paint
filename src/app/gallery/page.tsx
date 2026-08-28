"use client";

import { useState } from "react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Link from "next/link";

const categories = [
  "All",
  "Residential",
  "Commercial",
  "Interior",
  "Exterior",
  "Colour Mixing",
  "Decorative",
];

const projects = [
  {
    id: "1",
    title: "Modern Villa Transformation",
    location: "Abeokuta, Ogun State",
    category: "Residential",
    description:
      "Complete interior and exterior repaint of a 5-bedroom villa. We refreshed the facade with a warm cream tone and modernised the interiors with contemporary accent walls.",
    beforeImage:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=800",
    afterImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    title: "Corporate Office Refresh",
    location: "Ijebu Ode, Ogun State",
    category: "Commercial",
    description:
      "Professional repaint of a 3-storey corporate office building. Applied durable, washable finishes in the company's brand colours throughout all floors.",
    beforeImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    afterImage:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    title: "Luxury Living Room Makeover",
    location: "Sagamu, Ogun State",
    category: "Interior",
    description:
      "Transformed a dated living room into a contemporary haven with soft grey walls and a bold teal feature wall behind the entertainment centre.",
    beforeImage:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    afterImage:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "4",
    title: "Retail Store Rebrand",
    location: "Abeokuta, Ogun State",
    category: "Commercial",
    description:
      "Full exterior and interior rebrand paint job for a major retail store. Bright, inviting colours that attract foot traffic and reflect the new brand identity.",
    beforeImage:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=800",
    afterImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "5",
    title: "Exterior Weather Coating",
    location: "Ifo, Ogun State",
    category: "Exterior",
    description:
      "Applied premium weather-resistant exterior coating to protect a residential building from harsh tropical weather. The finish will last 10+ years.",
    beforeImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=800",
    afterImage:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "6",
    title: "Custom Colour Feature Wall",
    location: "Sagamu, Ogun State",
    category: "Colour Mixing",
    description:
      "Client requested a specific shade of terracotta not available off-the-shelf. We precision-mixed the colour and created a stunning accent wall in their dining room.",
    beforeImage:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
    afterImage:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "7",
    title: "Textured Decorative Finish",
    location: "Abeokuta, Ogun State",
    category: "Decorative",
    description:
      "Applied an elegant textured decorative finish to the walls of a luxury hotel lobby. The result is a unique, tactile surface with depth and sophistication.",
    beforeImage:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
    afterImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "8",
    title: "Apartment Complex Exterior",
    location: "Otta, Ogun State",
    category: "Residential",
    description:
      "Repainted the exterior of a 12-unit apartment complex. Coordinated colours for each block while maintaining a cohesive, premium estate look.",
    beforeImage:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
    afterImage:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "9",
    title: "Master Bedroom Refresh",
    location: "Ijebu Ode, Ogun State",
    category: "Interior",
    description:
      "Calming pastel palette for a master bedroom retreat. Soft lavender walls paired with crisp white trim create a serene, restful atmosphere.",
    beforeImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800",
    afterImage:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800",
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-primary-dark via-brand-primary to-brand-secondary overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center relative">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-brand-secondary text-sm font-semibold mb-6 backdrop-blur-sm border border-white/20">
            Our Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Project <span className="text-brand-secondary">Gallery</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Browse our completed painting projects. Drag the slider on each
            image to see the stunning before &amp; after transformations.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-bg-secondary border-b border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-brand-primary text-white shadow-md"
                    : "bg-white text-text-secondary border border-border hover:border-brand-secondary/50 hover:text-brand-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-muted text-lg">
                No projects in this category yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger">
              {filtered.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                >
                  {/* Before / After Slider */}
                  <BeforeAfterSlider
                    beforeImage={project.beforeImage}
                    afterImage={project.afterImage}
                  />

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-brand-secondary uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="text-text-muted text-xs">·</span>
                      <span className="text-text-muted text-xs">
                        {project.location}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-brand-primary-dark mb-2">
                      {project.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary-dark via-brand-primary to-brand-secondary" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready For Your Own Transformation?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Get a free, no-obligation quote for your painting project. Our team
            will assess your needs and provide a detailed estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="btn btn-primary text-base px-8 py-4"
            >
              Request a Free Quote
            </Link>
            <a
              href="https://wa.me/2347066443082"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-base px-8 py-4"
            >
              Contact Us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
