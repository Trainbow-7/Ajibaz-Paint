import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about AJIBAZ PAINT NIGERIA LIMITED — our story, values, and the team behind the best painting services in Ogun State, Nigeria.",
};

const values = [
  {
    icon: <svg className="text-brand-accent w-10 h-10 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>,
    title: "Excellence",
    desc: "We hold ourselves to the highest standards on every project, no matter the size.",
  },
  {
    icon: <svg className="text-brand-accent w-10 h-10 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>,
    title: "Integrity",
    desc: "Transparent pricing, honest timelines, and reliable communication from start to finish.",
  },
  {
    icon: <svg className="text-brand-accent w-10 h-10 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>,
    title: "Innovation",
    desc: "We stay current with the latest painting techniques, materials, and colour trends.",
  },
  {
    icon: <svg className="text-brand-accent w-10 h-10 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
    title: "Customer Focus",
    desc: "Your satisfaction drives everything we do. We listen, adapt, and deliver beyond expectations.",
  },
];

const teamMembers = [
  {
    name: "Mr. Ajibaz",
    role: "Founder & Lead Painter",
    bio: "With over 15 years of experience in professional painting, Mr. Ajibaz founded the company to bring quality painting services to Ogun State and beyond.",
  },
  {
    name: "Mrs. Ajibaz",
    role: "Operations Manager",
    bio: "Ensures smooth project coordination and client satisfaction across all our service areas.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-primary-dark to-brand-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-brand-secondary font-semibold text-sm uppercase tracking-wider">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-6">
            About AJIBAZ PAINT NIGERIA LIMITED
          </h1>
          <p className="text-white/70 text-lg max-w-3xl">
            Born out of a passion for colour and craftsmanship, AJIBAZ PAINT NIGERIA LIMITED has
            grown from a small local operation to one of the most trusted painting
            businesses in Ogun State, Nigeria.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-primary-dark mb-6">
                Our Journey
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  AJIBAZ PAINT NIGERIA LIMITED was established with a simple mission: to deliver
                  professional-grade painting services that transform spaces and
                  exceed expectations. We started serving residential clients in
                  Abeokuta and quickly expanded our reach across Ogun State.
                </p>
                <p>
                  Today, we handle everything from single-room repaints to large
                  commercial projects, custom colour mixing, and paint material
                  sales. Our team of skilled painters brings decades of combined
                  experience to every job.
                </p>
                <p>
                  What sets us apart is our commitment to using premium materials,
                  our meticulous attention to detail, and our ability to match any
                  colour our clients desire through our custom mixing service.
                </p>
              </div>
            </div>
            {/* Image placeholder */}
            <div className="bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-2xl h-80 flex items-center justify-center">
              <span className="text-8xl opacity-30">🎨</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-brand-secondary font-semibold text-sm uppercase tracking-wider">
              What Drives Us
            </span>
            <h2 className="text-3xl font-bold text-brand-primary-dark mt-2">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="text-center p-6 rounded-2xl bg-white border border-border hover:border-brand-secondary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-lg text-brand-primary-dark mb-2">
                  {v.title}
                </h3>
                <p className="text-text-secondary text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-brand-secondary font-semibold text-sm uppercase tracking-wider">
              Meet The Team
            </span>
            <h2 className="text-3xl font-bold text-brand-primary-dark mt-2">
              The People Behind The Paint
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {teamMembers.map((m) => (
              <div
                key={m.name}
                className="card p-8 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">👤</span>
                </div>
                <h3 className="font-bold text-lg text-brand-primary-dark">
                  {m.name}
                </h3>
                <p className="text-brand-secondary text-sm font-semibold mb-3">
                  {m.role}
                </p>
                <p className="text-text-secondary text-sm">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
