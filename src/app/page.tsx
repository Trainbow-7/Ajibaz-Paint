import Link from "next/link";
import type { Metadata } from "next";
import HeroCarousel from "@/components/HeroCarousel";

export const metadata: Metadata = {
  title: "AJIBAZ PAINT NIGERIA LIMITED – Professional Painting Services in Ogun State",
  description:
    "Transform your space with AJIBAZ PAINT NIGERIA LIMITED. Professional residential & commercial painting, custom colour mixing, and quality paint materials in Ogun State, Nigeria.",
};

/* ── Static data (will be replaced with Supabase queries later) ── */
const trustItems = [
  {
    id: "workmanship",
    title: "Professional Workmanship",
    desc: "Skilled painters delivering flawless finishes on every project.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
  },
  {
    id: "materials",
    title: "Quality Materials",
    desc: "We use only premium paints and materials for lasting results.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    id: "colour",
    title: "Custom Colour Mixing",
    desc: "Get the exact shade you want with our precision colour mixing.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25C9.996 3 10.5 3.504 10.5 4.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
      </svg>
    ),
  },
  {
    id: "residential",
    title: "Residential & Commercial",
    desc: "Expert service for homes, offices, and commercial properties.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
      </svg>
    ),
  },
];

const services = [
  {
    slug: "residential-painting",
    title: "Residential Painting",
    desc: "Interior & exterior painting for homes, apartments, and estates.",
    image: "/images/services/residential.jpg",
  },
  {
    slug: "commercial-painting",
    title: "Commercial Painting",
    desc: "Professional painting for offices, retail spaces, and warehouses.",
    image: "/images/services/commercial.jpg",
  },
  {
    slug: "colour-mixing",
    title: "Custom Colour Mixing",
    desc: "Precision colour matching and custom paint mixing services.",
    image: "/images/services/mixing.jpg",
  },
  {
    slug: "paint-sales",
    title: "Paint & Materials",
    desc: "Premium paints, brushes, rollers, and accessories for sale.",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "interior-design-painting",
    title: "Decorative Finishes",
    desc: "Textured walls, accent colours, and creative decorative painting.",
    image: "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "exterior-coating",
    title: "Exterior Coating",
    desc: "Weather-resistant exterior coatings to protect your building.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800",
  },
];

const featuredProjects = [
  {
    id: "1",
    title: "Modern Villa — Abeokuta",
    category: "Residential",
    image: "/images/project-residential.jpg",
  },
  {
    id: "2",
    title: "Corporate Office — Ijebu Ode",
    category: "Commercial",
    image: "/images/project-commercial.jpg",
  },
  {
    id: "3",
    title: "Luxury Apartment — Sagamu",
    category: "Interior",
    image: "/images/project-interior.jpg",
  },
];

const testimonials = [
  {
    name: "Mr. Adebayo Ogundimu",
    location: "Abeokuta",
    text: "AJIBAZ PAINT NIGERIA LIMITED transformed our entire home. The attention to detail and colour matching was exceptional. Highly recommended!",
    type: "Residential",
  },
  {
    name: "Mrs. Folake Adeyemi",
    location: "Sagamu",
    text: "We hired them for our office renovation and the result was stunning. Professional team, great communication, and finished on time.",
    type: "Commercial",
  },
  {
    name: "Chief Oladipo Bakare",
    location: "Ijebu Ode",
    text: "The custom colour mixing service is unmatched. They got the exact shade I wanted for my living room. Will use again for my new property.",
    type: "Colour Mixing",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroCarousel />


      {/* ── Trust Strip ── */}
      <section className="py-16 bg-bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger">
            {trustItems.map((item) => (
              <div
                key={item.id}
                className="text-center p-8 rounded-2xl bg-white border border-border hover:border-brand-secondary/50 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white shadow-md">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg text-brand-primary-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Preview ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-brand-secondary font-semibold text-sm uppercase tracking-wider">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary-dark mt-2">
              Our Services
            </h2>
            <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
              From residential repaints to large-scale commercial projects,
              AJIBAZ PAINT NIGERIA LIMITED delivers quality at every scale.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {services.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="card p-0 overflow-hidden group flex flex-col"
              >
                <div className="h-48 overflow-hidden">
                  <img src={svc.image} alt={svc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-brand-primary-dark group-hover:text-brand-secondary transition-colors mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4 flex-1">{svc.desc}</p>
                  <span className="text-brand-secondary text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                    Learn more
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services" className="btn btn-outline">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="py-20 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-brand-secondary font-semibold text-sm uppercase tracking-wider">
              Our Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary-dark mt-2">
              Featured Projects
            </h2>
            <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
              See the quality of our work across residential and commercial projects.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/gallery/${project.id}`}
                className="card group overflow-hidden"
              >
                {/* Project image */}
                <div className="h-56 relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-brand-secondary uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold text-brand-primary-dark mt-1 group-hover:text-brand-secondary transition-colors">
                    {project.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/gallery" className="btn btn-outline">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-brand-secondary font-semibold text-sm uppercase tracking-wider">
              What Clients Say
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary-dark mt-2">
              Customer Testimonials
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-text-secondary leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="font-bold text-brand-primary-dark">{t.name}</p>
                  <p className="text-sm text-text-muted">
                    {t.type} · {t.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/testimonials" className="btn btn-outline">
              Read More Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary-dark via-brand-primary to-brand-primary-light" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-secondary/15 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Get a free, no-obligation quote for your painting project. Our team
            will assess your needs and provide a detailed estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="btn btn-primary text-base px-8 py-4">
              Request a Free Quote
            </Link>
            <a href="https://wa.me/2347066443082" target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-base px-8 py-4">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
