import React, { useState, useEffect } from "react";
import { Calendar, Clock, User, ArrowLeft, Linkedin, Twitter, Facebook, Link as LinkIcon, Share2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { format } from "date-fns";
import { toast } from "sonner";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { BlogPost } from "@/types/blog";
import { getAllBlogPosts } from "@/data/blogPosts";
import OptimizedImage from "@/components/OptimizedImage";
import { LeadFormModal } from "@/components/LeadFormModal";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogPostTemplateProps {
  post: BlogPost;
}

// Helper to generate slug from headline
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const BlogPostTemplate = ({ post }: BlogPostTemplateProps) => {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const location = useLocation();
  const currentUrl = `https://signflow.us${location.pathname}`;
  const publishedDate = new Date(post.date);
  const formattedDate = format(publishedDate, "MMMM d, yyyy");

  // Reading Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate Reading Time
  const calculateReadTime = () => {
    if (!post.content) return 5; // fallback
    const text = post.content.introduction +
      post.content.sections.map(s => s.headline + " " + s.body).join(" ") +
      (post.content.conclusion || "");
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / 200); // 200 words per minute
  };

  const readTime = calculateReadTime();

  // Social Share Helpers
  const shareLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      color: "hover:bg-[#0077b5] hover:text-white"
    },
    {
      name: "X (Twitter)",
      icon: ({ size = 24, ...props }: any) => (
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`,
      color: "hover:bg-black hover:text-white"
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(post.title)}`,
      color: "hover:bg-[#4267B2] hover:text-white"
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.ogImage || post.featuredImage || "https://signflow.us/og-image.jpg",
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "SignFlow",
      "logo": {
        "@type": "ImageObject",
        "url": "https://signflow.us/favicon.ico"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://signflow.us/blog/${post.slug}`
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://signflow.us/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://signflow.us/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://signflow.us/blog/${post.slug}`
      }
    ]
  };

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;
  // ... existing hooks ...

  // TOC Logic
  useEffect(() => {
    // Add IDs to headings for TOC navigation
    const headings = document.querySelectorAll('h2');
    headings.forEach((heading) => {
      if (!heading.id) {
        heading.id = slugify(heading.textContent || '');
      }
    });
  }, [post.content.sections]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background relative pb-20 lg:pb-0">
      <SEO
        title={`${post.title} | SignFlow Blog`}
        description={post.description}
        canonical={`https://signflow.us/blog/${post.slug}`}
        ogImage={post.ogImage || post.featuredImage || "https://signflow.us/og-image.jpg"}
        type="article"
        keywords={post.tags?.join(", ")}
      />

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-16 left-0 right-0 h-1.5 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={articleSchema} />
      {faqSchema && <StructuredData data={faqSchema} />}
      <LeadFormModal isOpen={isLeadFormOpen} onOpenChange={setIsLeadFormOpen} />
      <Header />

      <ScrollToTopButton className="bottom-24 lg:bottom-8" />

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pt-24 pb-24 md:pt-32 md:pb-32">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              {/* Breadcrumbs */}
              <div className="mb-8">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-white/50" />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to="/blog" className="text-white/70 hover:text-white transition-colors">Blog</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-white/50" />

                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-white font-medium truncate max-w-[200px] md:max-w-xs block">
                        {post.title}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              {/* Category Badge */}
              {post.category && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mb-6"
                >
                  <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                </motion.div>
              )}

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
              >
                {post.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl text-white/80 mb-6 leading-relaxed"
              >
                {post.description}
              </motion.p>

              {/* Meta Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center gap-6 text-white/70 text-sm"
              >
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{readTime} min read</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        {post.featuredImage && (
          <section className="container mx-auto px-6 -mt-12 md:-mt-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <OptimizedImage
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </section>
        )}

        {/* Content Section */}
        <section className="container mx-auto px-6 py-12 md:py-20 relative">

          {/* Social Share - Desktop Sidebar */}
          <div className="hidden lg:flex flex-col gap-4 fixed left-8 top-1/2 -translate-y-1/2 z-40">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:-translate-y-1 ${link.color}`}
                aria-label={`Share on ${link.name}`}
              >
                <link.icon size={18} />
              </a>
            ))}
            <button
              onClick={copyToClipboard}
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="Copy Link"
            >
              <LinkIcon size={18} />
            </button>
          </div>

          <article className="max-w-4xl mx-auto prose prose-lg prose-slate dark:prose-invert prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-slate-900 dark:prose-strong:text-white prose-img:rounded-xl prose-img:shadow-lg relative">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8"
            >
              {post.content.introduction}
            </motion.div>

            {/* Table of Contents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="my-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700"
            >
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                What's in this article
              </h3>
              <nav className="flex flex-col gap-2">
                {post.content.sections.map((section, index) => (
                  <a
                    key={index}
                    href={`#${slugify(section.headline)}`}
                    onClick={(e) => scrollToSection(e, slugify(section.headline))}
                    className="flex justify-between items-center text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-base group"
                  >
                    <span>{section.headline}</span>
                    <span className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">↓</span>
                  </a>
                ))}
              </nav>
            </motion.div>

            {/* Sections */}
            {post.content.sections.map((section, index) => (
              <React.Fragment key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="mb-10"
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-5 text-slate-900 dark:text-white tracking-tight">
                    {section.headline}
                  </h2>
                  <div className="prose prose-lg max-w-none text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {section.body}
                  </div>
                  {section.image && (
                    <div className={`my-6 rounded-lg overflow-hidden shadow-md ${index % 3 === 0 ? 'max-w-md' :
                      index % 3 === 1 ? 'max-w-xs float-right ml-6 mb-4' :
                        'max-w-lg mx-auto'
                      }`}>
                      <OptimizedImage
                        src={section.image}
                        alt={section.imageAlt || section.headline}
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </motion.div>

                {/* Mid-content CTA after 3rd section */}
                {index === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="my-12 p-8 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 rounded-xl border-l-4 border-primary"
                  >
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                      Ready to Get More Qualified Leads?
                    </h3>
                    <p className="text-base text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                      Stop wasting time on unqualified prospects. SignFlow delivers pre-vetted, ready-to-buy leads directly to your inbox. No spam, no cold contacts—just real opportunities.
                    </p>
                    <button
                      onClick={() => setIsLeadFormOpen(true)}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-base transition-colors"
                    >
                      Learn How It Works →
                    </button>
                  </motion.div>
                )}
              </React.Fragment>
            ))}

            {/* Conclusion */}
            {post.content.conclusion && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: post.content.sections.length * 0.1 }}
                className="mt-12 p-8 bg-slate-100 dark:bg-slate-800 rounded-2xl border-l-4 border-primary"
              >
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                  Conclusion
                </h3>
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {post.content.conclusion}
                </p>
              </motion.div>
            )}
          </article>

          {/* Author Bio Section */}
          <div className="max-w-4xl mx-auto mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-8 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <User size={40} className="text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    About {post.author}
                  </h3>
                  <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    The SignFlow team has helped 200+ sign companies generate over $5M in qualified leads. With 10+ years of experience in the signage industry, we understand what it takes to grow a successful sign business through proven marketing strategies and AI-free lead generation.
                  </p>
                  <div className="flex gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <span>✓ 200+ Sign Companies Served</span>
                    <span>✓ $5M+ in Leads Generated</span>
                    <span>✓ 10+ Years Experience</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Articles */}
          <div className="max-w-4xl mx-auto mt-20 border-t border-slate-200 dark:border-slate-800 pt-12">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
              Related Articles
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {getAllBlogPosts()
                .filter(p => p.category === post.category && p.slug !== post.slug)
                .slice(0, 3)
                .map((relatedPost) => (
                  <Link key={relatedPost.slug} to={`/blog/${relatedPost.slug}`} className="group block h-full">
                    <Card className="h-full overflow-hidden hover:shadow-lg transition-all border-border/50 bg-white dark:bg-slate-900 flex flex-col">
                      <div className="aspect-video relative overflow-hidden">
                        {relatedPost.featuredImage && (
                          <OptimizedImage
                            src={relatedPost.featuredImage}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        <Badge className="absolute top-2 left-2 bg-white/90 text-slate-900 hover:bg-white text-[10px] h-5 px-1.5">
                          {relatedPost.category}
                        </Badge>
                      </div>
                      <CardContent className="p-4 flex flex-col flex-1">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors text-base">
                          {relatedPost.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-auto">
                          <Calendar size={12} />
                          <span>{format(new Date(relatedPost.date), "MMM d, yyyy")}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              {/* Fallback to latest posts if no related posts found */}
              {getAllBlogPosts().filter(p => p.category === post.category && p.slug !== post.slug).length === 0 &&
                getAllBlogPosts()
                  .filter(p => p.slug !== post.slug)
                  .slice(0, 3)
                  .map((recentPost) => (
                    <Link key={recentPost.slug} to={`/blog/${recentPost.slug}`} className="group block h-full">
                      <Card className="h-full overflow-hidden hover:shadow-lg transition-all border-border/50 bg-white dark:bg-slate-900 flex flex-col">
                        <div className="aspect-video relative overflow-hidden">
                          {recentPost.featuredImage && (
                            <OptimizedImage
                              src={recentPost.featuredImage}
                              alt={recentPost.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          )}
                          <Badge className="absolute top-2 left-2 bg-white/90 text-slate-900 hover:bg-white text-[10px] h-5 px-1.5">
                            {recentPost.category}
                          </Badge>
                        </div>
                        <CardContent className="p-4 flex flex-col flex-1">
                          <h4 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors text-base">
                            {recentPost.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-auto">
                            <Calendar size={12} />
                            <span>{format(new Date(recentPost.date), "MMM d, yyyy")}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
              }
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="bg-slate-100 dark:bg-slate-800 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Ready to Grow Your Sign Business?
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
                Get qualified leads delivered to your inbox. Book a 15-minute Zoom call to learn how SignFlow can help.
              </p>
              <button
                onClick={() => setIsLeadFormOpen(true)}
                className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
              >
                Book a 15-minute Zoom
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Social Share - Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 z-50 flex justify-around items-center md:justify-center md:gap-8">
        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 mr-2">Share:</span>
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full text-slate-600 dark:text-slate-400 transition-colors ${link.color}`}
            aria-label={`Share on ${link.name}`}
          >
            <link.icon size={20} />
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Copy Link"
        >
          <LinkIcon size={20} />
        </button>
      </div>
    </div >
  );
};

export default BlogPostTemplate;
