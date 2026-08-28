import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { featuredPost, blogPosts } from "@/data/blog";

const allPosts = [featuredPost, ...blogPosts];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | AJIBAZ PAINT NIGERIA LIMITED`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Find related posts (same category, or just up to 3 random ones excluding current)
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  // Block-aware markdown parser for formatted, clean text rendering
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let currentList: { type: "ul" | "ol"; items: string[] } | null = null;

    const parseFormattedText = (text: string) => {
      const parts = text.split(/(\*\*.*?\*\*)/g);
      return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-bold text-brand-primary-dark">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });
    };

    const flushList = (keyPrefix: number) => {
      if (!currentList) return;
      if (currentList.type === "ul") {
        elements.push(
          <ul key={`ul-${keyPrefix}`} className="list-disc pl-6 mb-6 space-y-2 text-text-secondary text-base sm:text-lg">
            {currentList.items.map((item, i) => (
              <li key={i}>{parseFormattedText(item)}</li>
            ))}
          </ul>
        );
      } else if (currentList.type === "ol") {
        elements.push(
          <ol key={`ol-${keyPrefix}`} className="list-decimal pl-6 mb-6 space-y-2 text-text-secondary text-base sm:text-lg">
            {currentList.items.map((item, i) => (
              <li key={i}>{parseFormattedText(item)}</li>
            ))}
          </ol>
        );
      }
      currentList = null;
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) {
        flushList(index);
        return;
      }

      if (trimmed.startsWith("###")) {
        flushList(index);
        elements.push(
          <h3 key={index} className="text-xl sm:text-2xl font-bold text-brand-primary-dark mt-8 mb-4">
            {parseFormattedText(trimmed.replace("###", "").trim())}
          </h3>
        );
        return;
      }

      if (trimmed.startsWith("##")) {
        flushList(index);
        elements.push(
          <h2 key={index} className="text-2xl sm:text-3xl font-bold text-brand-primary-dark mt-10 mb-4">
            {parseFormattedText(trimmed.replace("##", "").trim())}
          </h2>
        );
        return;
      }

      if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
        const itemContent = trimmed.replace(/^[\*\-]\s*/, "").trim();
        if (!currentList || currentList.type !== "ul") {
          flushList(index);
          currentList = { type: "ul", items: [] };
        }
        currentList.items.push(itemContent);
        return;
      }

      if (/^\d+\./.test(trimmed)) {
        const itemContent = trimmed.replace(/^\d+\.\s*/, "").trim();
        if (!currentList || currentList.type !== "ol") {
          flushList(index);
          currentList = { type: "ol", items: [] };
        }
        currentList.items.push(itemContent);
        return;
      }

      flushList(index);
      elements.push(
        <p key={index} className="text-text-secondary leading-relaxed mb-6 text-base sm:text-lg">
          {parseFormattedText(trimmed)}
        </p>
      );
    });

    flushList(lines.length);
    return elements;
  };

  return (
    <>
      {/* ── Article Header ── */}
      <article className="py-12 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-brand-primary hover:text-brand-secondary mb-8 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </Link>

          {/* Category & Date */}
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-brand-secondary/15 text-brand-secondary text-xs font-bold uppercase tracking-wider rounded-full">
              {post.category}
            </span>
            <span className="text-text-muted text-sm font-medium">
              {post.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-primary-dark leading-tight mb-8">
            {post.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-4 mb-10 pb-8 border-b border-border">
            <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-lg border border-border">
              {post.author.replace("Mr. ", "").replace("Mrs. ", "").charAt(0)}
            </div>
            <div>
              <p className="text-brand-primary-dark font-bold text-base">{post.author}</p>
              <p className="text-text-muted text-xs">AJIBAZ PAINT NIGERIA LIMITED Expert</p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-[40vh] sm:h-[50vh] min-h-[300px] w-full rounded-3xl overflow-hidden mb-12 shadow-md">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Body Content */}
          <div className="prose prose-lg max-w-none mb-16">
            {renderContent(post.content)}
          </div>
        </div>
      </article>

      {/* ── Related Posts ── */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-bg-secondary border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-primary-dark mb-10 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.id}
                  href={`/blog/${rPost.slug}`}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={rPost.image}
                      alt={rPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-brand-secondary text-xs font-bold uppercase tracking-wider mb-2 block">
                      {rPost.category}
                    </span>
                    <h3 className="text-lg font-bold text-brand-primary-dark group-hover:text-brand-secondary transition-colors mb-3 line-clamp-2">
                      {rPost.title}
                    </h3>
                    <p className="text-text-secondary text-sm line-clamp-2 mt-auto">
                      {rPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Dynamic Bottom CTA ── */}
      <section className="relative py-20 overflow-hidden bg-brand-primary-dark">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-transparent opacity-50" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Need Expert Painters for Your Project?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Let the professionals handle it. Contact AJIBAZ PAINT NIGERIA LIMITED today for premium results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="btn btn-primary text-base px-8 py-4">
              Get a Free Quote
            </Link>
            <a
              href="https://wa.me/2347066443082"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-base px-8 py-4"
            >
              Consult via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
