import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

/* Static service data – will be replaced with Supabase query */
const servicesData: Record<
  string,
  { title: string; category: string; description: string; details: string[]; icon: string }
> = {
  "residential-painting": {
    title: "Residential Painting",
    category: "Residential",
    icon: "🏡",
    description:
      "Complete interior and exterior painting for homes, apartments, duplexes, and estate properties. We prepare surfaces properly and apply premium paints for a durable, beautiful finish.",
    details: [
      "Full interior painting — walls, ceilings, trim, and doors",
      "Exterior facade and boundary wall painting",
      "New-build painting and finishing",
      "Repaint and renovation painting",
      "Colour consultation and selection",
      "Surface preparation, filling, and priming",
    ],
  },
  "commercial-painting": {
    title: "Commercial Painting",
    category: "Commercial",
    icon: "🏢",
    description:
      "Professional painting for offices, retail spaces, warehouses, schools, and public buildings. Minimal disruption to your business operations.",
    details: [
      "Office and co-working space painting",
      "Retail and showroom painting",
      "Warehouse and factory floor markings",
      "School and institutional painting",
      "Weekend and after-hours scheduling",
      "Large-scale projects with dedicated team",
    ],
  },
  "colour-mixing": {
    title: "Custom Colour Mixing",
    category: "Specialty",
    icon: "🎨",
    description:
      "Our precision colour mixing service creates custom paint colours to match any reference — a swatch, photo, or code.",
    details: [
      "Match any colour from a swatch, photo, or paint code",
      "Wide range of paint bases and finishes",
      "Small and bulk quantities available",
      "Colour consistency guaranteed across batches",
      "Expert advice on complementary colours",
    ],
  },
  "paint-sales": {
    title: "Paint & Materials",
    category: "Sales",
    icon: "🪣",
    description: "We supply premium quality paints, brushes, rollers, masking tapes, and all necessary painting accessories at competitive prices.",
    details: [
      "Premium emulsion, satin, and gloss paints",
      "High-quality undercoats and primers",
      "Professional-grade brushes and rollers",
      "Masking tapes, drop cloths, and protective gear",
      "Textured and specialty decorative coatings",
      "Wholesale and retail quantities available"
    ]
  },
  "interior-design-painting": {
    title: "Decorative Finishes",
    category: "Specialty",
    icon: "✨",
    description: "Elevate your interior spaces with our custom decorative finishes. From textured accent walls to intricate geometric designs, our artisans bring your vision to life.",
    details: [
      "Textured wall finishes (stucco, marble effects)",
      "Accent walls and geometric patterns",
      "Metallic and pearl sheen coatings",
      "Faux finishes and murals",
      "Custom stenciling and border work",
      "Expert colour coordination with existing decor"
    ]
  },
  "exterior-coating": {
    title: "Exterior Coating",
    category: "Exterior",
    icon: "🏗️",
    description: "Protect your building from the elements with our durable, weather-resistant exterior coatings. Formulated to withstand harsh sun, heavy rain, and humidity.",
    details: [
      "Weather-resistant and UV-protective coatings",
      "Anti-fungal and algae-resistant formulations",
      "Waterproofing for exterior walls",
      "Elastomeric coatings for crack bridging",
      "High-build textured exterior finishes",
      "Long-lasting colour retention guarantee"
    ]
  }
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const svc = servicesData[slug];
  if (!svc) return { title: "Service Not Found" };
  return {
    title: svc.title,
    description: svc.description,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const svc = servicesData[slug];
  if (!svc) notFound();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-primary-dark to-brand-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="text-white/60 hover:text-white text-sm inline-flex items-center gap-1 mb-4 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            All Services
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{svc.icon}</span>
            <div>
              <span className="text-brand-secondary font-semibold text-sm uppercase tracking-wider">
                {svc.category}
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mt-1">
                {svc.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-text-secondary mb-10 leading-relaxed">
            {svc.description}
          </p>

          <h2 className="text-2xl font-bold text-brand-primary-dark mb-6">
            What&apos;s Included
          </h2>
          <ul className="space-y-3 mb-12">
            {svc.details.map((d) => (
              <li key={d} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-brand-accent mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-text-secondary">{d}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/quote?service=${slug}`} className="btn btn-primary">
              Get a Quote for {svc.title}
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
