"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  image: string;
  slug: string;
}

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, posts.length));
  };

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger">
        {visiblePosts.map((post, idx) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:border-brand-secondary/30 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${(idx % 3) * 100}ms` }}
          >
            <div className="relative h-56 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-primary-dark text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                  {post.category}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <span className="text-text-muted text-xs font-medium mb-3 block">
                {post.date}
              </span>
              <h3 className="text-xl font-bold text-brand-primary-dark mb-3 group-hover:text-brand-secondary transition-colors">
                {post.title}
              </h3>
              <p className="text-text-secondary text-sm line-clamp-3 mb-6 flex-1">
                {post.excerpt}
              </p>

              <div className="mt-auto flex items-center text-brand-primary font-semibold text-sm group-hover:text-brand-secondary transition-colors">
                Read Article
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-16">
          <button onClick={handleLoadMore} className="btn btn-outline px-8 cursor-pointer">
            Load More Articles
          </button>
        </div>
      )}
    </>
  );
}
