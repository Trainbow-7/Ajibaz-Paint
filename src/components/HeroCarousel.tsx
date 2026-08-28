"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    title: "Transform Your Space",
    highlight: "With Professional Painting",
    subtitle:
      "Residential & commercial painting, custom colour mixing, and premium paint materials — delivered with expert craftsmanship across Ogun State, Nigeria.",
    imageUrl:
      "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?auto=format&fit=crop&q=80&w=1920",
    ctaText: "Get a Quote",
    ctaLink: "/quote",
  },
  {
    title: "Custom Colour Mixing",
    highlight: "For Every Vision",
    subtitle:
      "Get the exact shade you want with our precision colour-matching technology. Hundreds of colours, perfectly mixed every time.",
    imageUrl:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1920",
    ctaText: "Explore Services",
    ctaLink: "/services",
  },
  {
    title: "Premium Materials",
    highlight: "Built To Last",
    subtitle:
      "We use only the highest-quality paints and coatings to ensure your space looks stunning and stands the test of time.",
    imageUrl:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=1920",
    ctaText: "View Gallery",
    ctaLink: "/gallery",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
      {/* ── Slide backgrounds ── */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background image with slow zoom (Ken Burns) */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-linear ${
              idx === current ? "scale-110" : "scale-100"
            }`}
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          />

          {/* Dark overlay – just enough to keep text readable while showing the image */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
      ))}

      {/* ── Slide content ── */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-3xl">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`transition-all duration-700 ${
                idx === current
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6 absolute pointer-events-none"
              }`}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-secondary/25 text-brand-secondary text-sm font-semibold mb-6 backdrop-blur-sm border border-brand-secondary/30">
                Professional Painting Services
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
                {slide.title}{" "}
                <span className="text-brand-secondary">{slide.highlight}</span>
              </h1>

              <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl">
                {slide.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={slide.ctaLink}
                  className="btn btn-primary text-base px-8 py-4"
                >
                  {slide.ctaText}
                </Link>
                <a
                  href="https://wa.me/2347066443082?text=Hello%20AJIBAZ%20PAINT%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp text-base px-8 py-4"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Navigation dots ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-3 rounded-full transition-all duration-300 ${
              idx === current
                ? "bg-brand-secondary w-10"
                : "bg-white/50 w-3 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

