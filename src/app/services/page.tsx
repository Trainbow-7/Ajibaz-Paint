import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore AJIBAZ PAINT NIGERIA LIMITED services: residential painting, commercial painting, colour mixing, decorative finishes, and paint material sales in Ogun State.",
};

const categories = ["All", "Residential", "Commercial", "Specialty"];

const services = [
  {
    slug: "residential-painting",
    title: "Residential Painting",
    category: "Residential",
    description:
      "Complete interior and exterior painting for homes, apartments, duplexes, and estate properties. We prepare surfaces properly and apply premium paints for a durable, beautiful finish.",
    icon: <svg className="w-10 h-10 text-brand-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    slug: "commercial-painting",
    title: "Commercial Painting",
    category: "Commercial",
    description:
      "Professional painting for offices, retail spaces, warehouses, schools, and public buildings. Minimal disruption to your business operations.",
    icon: <svg className="w-10 h-10 text-brand-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>,
  },
  {
    slug: "interior-painting",
    title: "Interior Painting",
    category: "Residential",
    description:
      "Walls, ceilings, trim, and accent features. We help you choose colours and finishes that complement your furniture and lighting.",
    icon: <svg className="w-10 h-10 text-brand-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="6" rx="2"/><path d="M12 9v11a2 2 0 0 1-2 2H8"/><path d="M20 6h2v3a4 4 0 0 1-4 4H12"/></svg>,
  },
  {
    slug: "exterior-painting",
    title: "Exterior Painting",
    category: "Residential",
    description:
      "Weather-resistant exterior painting that protects your building and boosts curb appeal. Includes proper surface preparation and priming.",
    icon: <svg className="w-10 h-10 text-brand-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    slug: "colour-mixing",
    title: "Custom Colour Mixing",
    category: "Specialty",
    description:
      "Can't find the exact shade you want? Our precision colour mixing service creates custom paint colours to match any reference — a swatch, photo, or code.",
    icon: <svg className="w-10 h-10 text-brand-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 14.5 3.5 16.5 6 17H8.5C9.3 17 10 17.7 10 18.5C10 18.9 9.8 19.3 9.6 19.6C9.2 20.1 9 20.7 9 21.3C9 22.2 9.8 23 10.7 23H12Z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="11.5" cy="7.5" r="1"/><circle cx="16.5" cy="9.5" r="1"/><circle cx="15.5" cy="14.5" r="1"/></svg>,
  },
  {
    slug: "decorative-finishes",
    title: "Decorative Finishes",
    category: "Specialty",
    description:
      "Textured walls, faux finishes, accent walls, stencilling, and creative painting techniques for a unique, personalised look.",
    icon: <svg className="w-10 h-10 text-brand-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5 5 3Z"/><path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z"/></svg>,
  },
  {
    slug: "paint-sales",
    title: "Paint & Material Sales",
    category: "Specialty",
    description:
      "Quality paints, primers, brushes, rollers, tape, and accessories available for purchase. We stock trusted brands at competitive prices.",
    icon: <svg className="w-10 h-10 text-brand-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7V9H5v6a7 7 0 0 0 7 7Z"/><path d="M19 9V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v4"/><path d="M12 13v5"/></svg>,
  },
  {
    slug: "surface-preparation",
    title: "Surface Preparation",
    category: "Commercial",
    description:
      "Proper scraping, sanding, filling, and priming to ensure paint adheres correctly and lasts longer. Essential for old or damaged surfaces.",
    icon: <svg className="w-10 h-10 text-brand-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-primary-dark to-brand-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-brand-secondary font-semibold text-sm uppercase tracking-wider">
            What We Offer
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-6">
            Our Services
          </h1>
          <p className="text-white/70 text-lg max-w-3xl">
            From a single room repaint to a full commercial project, we deliver
            quality workmanship every time.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {services.map((svc) => (
              <div key={svc.slug} className="card p-6 flex flex-col">
                <div className="text-3xl mb-4">{svc.icon}</div>
                <span className="text-xs font-semibold text-brand-secondary uppercase tracking-wider">
                  {svc.category}
                </span>
                <h2 className="text-lg font-bold text-brand-primary-dark mt-1 mb-3">
                  {svc.title}
                </h2>
                <p className="text-text-secondary text-sm flex-1 mb-6">
                  {svc.description}
                </p>
                <Link
                  href={`/quote?service=${svc.slug}`}
                  className="btn btn-primary text-sm self-start"
                >
                  Get a Quote for This Service
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-bg-secondary text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-brand-primary-dark mb-4">
            Not Sure What You Need?
          </h2>
          <p className="text-text-secondary mb-8">
            Contact us and describe your project — we&apos;ll recommend the right
            service and provide a free quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="btn btn-primary">
              Request a Quote
            </Link>
            <a href="https://wa.me/2347066443082" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
