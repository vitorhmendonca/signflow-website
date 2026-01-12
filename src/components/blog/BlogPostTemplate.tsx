import React, { useState } from "react";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { BlogPost } from "@/types/blog";
import { format } from "date-fns";
import OptimizedImage from "@/components/OptimizedImage";
import { LeadFormModal } from "@/components/LeadFormModal";

interface BlogPostTemplateProps {
  post: BlogPost;
}

const BlogPostTemplate = ({ post }: BlogPostTemplateProps) => {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const publishedDate = new Date(post.date);
  const formattedDate = format(publishedDate, "MMMM d, yyyy");

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

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${post.title} | SignFlow Blog`}
        description={post.description}
        canonical={`https://signflow.us/blog/${post.slug}`}
        ogImage={post.ogImage || post.featuredImage || "https://signflow.us/og-image.jpg"}
        type="article"
        keywords={post.tags?.join(", ")}
      />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={articleSchema} />
      {faqSchema && <StructuredData data={faqSchema} />}
      <LeadFormModal isOpen={isLeadFormOpen} onOpenChange={setIsLeadFormOpen} />
      <Header />

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
              {/* Back to Blog Link */}
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 text-sm font-medium"
              >
                <ArrowLeft size={16} />
                Back to Blog
              </Link>

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
                  <span>{post.readTime} min read</span>
                </div>
              </motion.div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-wrap gap-2 mt-6"
                >
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              )}
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
        <section className="container mx-auto px-6 py-12 md:py-20">
          <article className="max-w-4xl mx-auto prose prose-lg prose-slate dark:prose-invert prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-slate-900 dark:prose-strong:text-white prose-img:rounded-xl prose-img:shadow-lg">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8"
            >
              {post.content.introduction}
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
    </div>
  );
};

export default BlogPostTemplate;
