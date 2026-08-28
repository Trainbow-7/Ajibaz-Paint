import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog & Painting Tips",
  description:
    "Read the latest painting tips, colour trends, and company news from AJIBAZ PAINT NIGERIA LIMITED.",
};

import { featuredPost, blogPosts } from "@/data/blog";
import BlogList from "./BlogList";

export default function BlogPage() {
  return (
    <>
      {/* ── Hero / Featured Post ── */}
      <section className="bg-bg-secondary pt-12 pb-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-secondary/10 text-brand-secondary text-sm font-semibold mb-4">
              AJIBAZ PAINT Blog
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-brand-primary-dark">
              Insights, Tips &amp; <span className="text-brand-secondary">Trends</span>
            </h1>
          </div>

          <Link href={`/blog/${featuredPost.slug}`} className="group block relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in-up">
            <div className="relative h-[60vh] min-h-[500px] w-full">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-dark/90 via-brand-primary-dark/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-brand-secondary text-white text-xs font-bold uppercase tracking-wider rounded-full">
                      {featuredPost.category}
                    </span>
                    <span className="text-white/80 text-sm font-medium">
                      {featuredPost.date}
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 group-hover:text-brand-secondary-light transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-white/80 text-lg mb-6 line-clamp-2">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold border-2 border-white/20">
                      A
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{featuredPost.author}</p>
                      <p className="text-white/60 text-xs">AJIBAZ PAINT Expert</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Recent Posts Grid ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-brand-primary-dark">Recent Articles</h2>
              <p className="text-text-secondary mt-2">Expert advice for your next painting project.</p>
            </div>
          </div>

          <BlogList posts={blogPosts} />
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="py-20 bg-brand-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-transparent opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Get Painting Tips Delivered
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive professional painting tips, colour trend reports, and special offers from AJIBAZ PAINT.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-6 py-4 rounded-xl bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                required
              />
              <button type="button" className="btn btn-primary px-8 py-4 whitespace-nowrap">
                Subscribe Now
              </button>
            </form>
            <p className="text-white/50 text-xs mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </>
  );
}
