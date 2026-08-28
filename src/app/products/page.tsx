import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse quality paints, primers, brushes, rollers, and painting accessories from AJIBAZ PAINT NIGERIA LIMITED. Enquire about any product via WhatsApp.",
};

const products = [
  {
    slug: "premium-emulsion-paint",
    name: "Premium Emulsion Paint",
    category: "paint",
    description: "High-quality water-based emulsion paint for interior walls and ceilings. Smooth finish, low odour, excellent coverage.",
    sizes: ["4L", "10L", "20L"],
    colours: ["White", "Magnolia", "Cream", "Custom"],
    price: 15000,
    showPrice: true,
    image: null,
  },
  {
    slug: "weather-guard-exterior",
    name: "Weather Guard Exterior Paint",
    category: "paint",
    description: "Durable exterior paint formulated to resist rain, sun, and humidity. Long-lasting colour and protection.",
    sizes: ["4L", "10L", "20L"],
    colours: ["White", "Cream", "Terracotta", "Custom"],
    price: 18000,
    showPrice: true,
    image: null,
  },
  {
    slug: "satin-finish-paint",
    name: "Satin Finish Paint",
    category: "paint",
    description: "Elegant satin-finish paint for living rooms, bedrooms, and feature walls. Easy to clean, durable sheen.",
    sizes: ["4L", "10L"],
    colours: ["Various"],
    price: null,
    showPrice: false,
    image: null,
  },
  {
    slug: "textured-coating",
    name: "Textured Coating",
    category: "paint",
    description: "Heavy-duty textured paint for exterior walls. Hides imperfections and creates a decorative finish.",
    sizes: ["20L", "25L"],
    colours: ["White", "Custom"],
    price: 22000,
    showPrice: true,
    image: null,
  },
  {
    slug: "paint-brushes-set",
    name: "Professional Paint Brush Set",
    category: "accessory",
    description: "Set of 5 professional-grade paint brushes. Includes 1\", 2\", 3\", 4\", and 5\" brushes with ergonomic handles.",
    sizes: ["Set of 5"],
    colours: [],
    price: 5500,
    showPrice: true,
    image: null,
  },
  {
    slug: "roller-kit",
    name: "Paint Roller Kit",
    category: "accessory",
    description: "Complete roller kit with 9\" frame, 3 roller sleeves (smooth, medium, rough), extension pole, and paint tray.",
    sizes: ["Standard Kit"],
    colours: [],
    price: 8000,
    showPrice: true,
    image: null,
  },
  {
    slug: "masking-tape",
    name: "Professional Masking Tape",
    category: "accessory",
    description: "High-quality masking tape for clean edges and sharp lines. Easy removal, no residue.",
    sizes: ["24mm x 50m", "48mm x 50m"],
    colours: [],
    price: 1500,
    showPrice: true,
    image: null,
  },
  {
    slug: "primer-undercoat",
    name: "All-Surface Primer",
    category: "paint",
    description: "Universal primer suitable for wood, metal, and masonry. Provides excellent adhesion for top coats.",
    sizes: ["4L", "10L"],
    colours: ["White"],
    price: 12000,
    showPrice: true,
    image: null,
  },
];

const WHATSAPP_NUMBER = "2347066443082";

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-primary-dark to-brand-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-brand-secondary font-semibold text-sm uppercase tracking-wider">
            Shop With Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-6">
            Paints &amp; Materials
          </h1>
          <p className="text-white/70 text-lg max-w-3xl">
            Quality paints and painting accessories at competitive prices. Enquire
            via WhatsApp for pricing and availability.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex gap-3 mb-10 flex-wrap">
            {["All", "Paints", "Accessories"].map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-full text-sm font-semibold border border-border hover:border-brand-secondary hover:text-brand-secondary transition-all first:bg-brand-primary first:text-white first:border-brand-primary"
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <div key={p.slug} className="card flex flex-col">
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 flex items-center justify-center">
                  <span className="text-5xl opacity-30">
                    {p.category === "paint" ? "🎨" : "🛠️"}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs font-semibold text-brand-secondary uppercase tracking-wider">
                    {p.category === "paint" ? "Paint" : "Accessory"}
                  </span>
                  <h3 className="text-base font-bold text-brand-primary-dark mt-1 mb-2">
                    {p.name}
                  </h3>
                  <p className="text-text-secondary text-sm flex-1 mb-3">
                    {p.description}
                  </p>

                  {/* Sizes */}
                  {p.sizes.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {p.sizes.map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-bg-tertiary text-text-secondary text-xs rounded-md">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Price */}
                  {p.showPrice && p.price && (
                    <p className="text-lg font-bold text-brand-primary-dark mb-4">
                      ₦{p.price.toLocaleString()}
                    </p>
                  )}
                  {!p.showPrice && (
                    <p className="text-sm text-text-muted italic mb-4">
                      Price on enquiry
                    </p>
                  )}

                  {/* Enquire Button */}
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      `Hello AJIBAZ PAINT NIGERIA LIMITED, I would like to enquire about: ${p.name}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp text-sm mt-auto"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Enquire Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
