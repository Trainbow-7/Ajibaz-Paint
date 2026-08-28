import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Client Testimonials",
  description:
    "Read what our clients have to say about the professional painting services, quality workmanship, and custom colour mixing by AJIBAZ PAINT NIGERIA LIMITED.",
};

const allTestimonials = [
  {
    name: "Mr. Adebayo Ogundimu",
    location: "Abeokuta",
    text: "AJIBAZ PAINT NIGERIA LIMITED transformed our entire home. The attention to detail and colour matching was exceptional. Highly recommended!",
    type: "Residential",
    rating: 5,
  },
  {
    name: "Mrs. Folake Adeyemi",
    location: "Sagamu",
    text: "We hired them for our office renovation and the result was stunning. Professional team, great communication, and finished on time.",
    type: "Commercial",
    rating: 5,
  },
  {
    name: "Chief Oladipo Bakare",
    location: "Ijebu Ode",
    text: "The custom colour mixing service is unmatched. They got the exact shade I wanted for my living room. Will use again for my new property.",
    type: "Colour Mixing",
    rating: 5,
  },
  {
    name: "Dr. Emmanuel Ojo",
    location: "Otta",
    text: "I was extremely impressed by the clean lines and flawless finish. They left the workspace cleaner than they found it. A true premium service.",
    type: "Interior",
    rating: 5,
  },
  {
    name: "Grace O. (Retail Store Owner)",
    location: "Abeokuta",
    text: "Our boutique needed a fresh, inviting look. AJIBAZ PAINT delivered beyond our expectations with vibrant, long-lasting exterior coatings.",
    type: "Commercial",
    rating: 5,
  },
  {
    name: "Alhaji Tunde",
    location: "Ifo",
    text: "Very reliable painters. They completed the exterior painting of my 4-bedroom bungalow right on schedule despite the unpredictable weather.",
    type: "Exterior",
    rating: 4,
  },
  {
    name: "Victoria Nnamdi",
    location: "Sagamu",
    text: "The textured decorative finish they applied in my dining room is a conversation starter for every guest. Incredible artistry and professionalism.",
    type: "Decorative",
    rating: 5,
  },
  {
    name: "Ogun State High School",
    location: "Abeokuta",
    text: "They handled the repainting of our classroom blocks during the holiday. Efficient, affordable, and high-quality paint materials that withstand wear.",
    type: "Commercial",
    rating: 5,
  },
  {
    name: "Mr. & Mrs. Adeleke",
    location: "Ijebu Ode",
    text: "We couldn't decide on colours for our new duplex, but their team provided excellent consultation and mixed the perfect shades for every room.",
    type: "Residential",
    rating: 5,
  },
];

export default function TestimonialsPage() {
  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative bg-gradient-to-br from-brand-primary-dark via-brand-primary to-brand-secondary overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-brand-secondary text-sm font-semibold mb-6 backdrop-blur-sm border border-white/20">
            Client Reviews
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            What Our <span className="text-brand-secondary">Clients Say</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Don't just take our word for it. Read honest reviews from homeowners and businesses across Ogun State who trusted AJIBAZ PAINT.
          </p>
        </div>
      </section>

      {/* ── Reviews Grid ── */}
      <section className="py-20 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats summary */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16 p-8 bg-white rounded-2xl shadow-sm border border-border">
            <div className="text-center md:border-r md:border-border md:pr-8">
              <h3 className="text-4xl font-bold text-brand-primary-dark mb-1">4.9/5</h3>
              <div className="flex justify-center gap-1 text-brand-secondary mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-sm font-semibold text-text-secondary">Average Rating</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-brand-primary-dark mb-2">150+</h3>
              <p className="text-sm font-semibold text-text-secondary">Projects Completed</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-border mx-4"></div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-brand-primary-dark mb-2">100%</h3>
              <p className="text-sm font-semibold text-text-secondary">Satisfaction Guarantee</p>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger">
            {allTestimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border border-border hover:border-brand-secondary/50 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${(idx % 3) * 150}ms` }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < t.rating ? "text-brand-secondary" : "text-gray-200"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-text-secondary leading-relaxed mb-6 italic min-h-[100px]">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="pt-6 border-t border-border mt-auto">
                  <p className="font-bold text-brand-primary-dark">{t.name}</p>
                  <p className="text-sm text-text-muted font-medium mt-1">
                    <span className="text-brand-secondary/80">{t.type}</span> &bull; {t.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-brand-primary-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/50 to-transparent mix-blend-overlay" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Join Our Happy Clients
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Ready to experience the AJIBAZ PAINT difference? Contact us today for a free consultation and quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="btn btn-primary text-base px-8 py-4">
              Get Your Free Quote
            </Link>
            <a href="https://wa.me/2347066443082" target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-base px-8 py-4">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
