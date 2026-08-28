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
    icon: "🏡",
  },
  {
    slug: "commercial-painting",
    title: "Commercial Painting",
    category: "Commercial",
    description:
      "Professional painting for offices, retail spaces, warehouses, schools, and public buildings. Minimal disruption to your business operations.",
    icon: "🏢",
  },
  {
    slug: "interior-painting",
    title: "Interior Painting",
    category: "Residential",
    description:
      "Walls, ceilings, trim, and accent features. We help you choose colours and finishes that complement your furniture and lighting.",
    icon: "🖌️",
  },
  {
    slug: "exterior-painting",
    title: "Exterior Painting",
    category: "Residential",
    description:
      "Weather-resistant exterior painting that protects your building and boosts curb appeal. Includes proper surface preparation and priming.",
    icon: "🏗️",
  },
  {
    slug: "colour-mixing",
    title: "Custom Colour Mixing",
    category: "Specialty",
    description:
      "Can't find the exact shade you want? Our precision colour mixing service creates custom paint colours to match any reference — a swatch, photo, or code.",
    icon: "🎨",
  },
  {
    slug: "decorative-finishes",
    title: "Decorative Finishes",
    category: "Specialty",
    description:
      "Textured walls, faux finishes, accent walls, stencilling, and creative painting techniques for a unique, personalised look.",
    icon: "✨",
  },
  {
    slug: "paint-sales",
    title: "Paint & Material Sales",
    category: "Specialty",
    description:
      "Quality paints, primers, brushes, rollers, tape, and accessories available for purchase. We stock trusted brands at competitive prices.",
    icon: "🪣",
  },
  {
    slug: "surface-preparation",
    title: "Surface Preparation",
    category: "Commercial",
    description:
      "Proper scraping, sanding, filling, and priming to ensure paint adheres correctly and lasts longer. Essential for old or damaged surfaces.",
    icon: "🔧",
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
