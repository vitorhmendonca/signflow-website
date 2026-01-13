import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Link, useSearchParams } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight, Search, Mail, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { getAllBlogPosts } from "@/data/blogPosts";
import { format } from "date-fns";
import OptimizedImage from "@/components/OptimizedImage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(6);
  const [email, setEmail] = useState("");
  const allPosts = getAllBlogPosts();

  const handleSubscribe = () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Welcome aboard! 🚀 You've been subscribed.");
    setEmail("");
  };

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(allPosts.map((post) => post.category || "Uncategorized")))];

  // Sync state to URL
  useEffect(() => {
    const params: any = {};
    if (activeCategory !== "All") params.category = activeCategory;
    if (searchQuery) params.search = searchQuery;
    setSearchParams(params, { replace: true });
  }, [activeCategory, searchQuery, setSearchParams]);

  // Reset pagination on filter change
  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory, searchQuery]);

  // Filter posts
  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === "az") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "za") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  // Decide view mode
  const showFeatured = searchQuery === "" && sortBy === "newest" && activeCategory === "All" && sortedPosts.length > 0;
  const featuredPost = showFeatured ? sortedPosts[0] : null;
  const gridPosts = showFeatured ? sortedPosts.slice(1, visibleCount + 1) : sortedPosts.slice(0, visibleCount);
  const hasMore = showFeatured ? sortedPosts.length > visibleCount + 1 : sortedPosts.length > visibleCount;

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
      }
    ]
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "SignFlow Blog",
    "description": "Insights, tips, and case studies for sign companies",
    "url": "https://signflow.us/blog",
    "publisher": {
      "@type": "Organization",
      "name": "SignFlow",
      "logo": {
        "@type": "ImageObject",
        "url": "https://signflow.us/favicon.ico"
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <SEO
        title="Blog | SignFlow"
        description="Get proven marketing strategies, lead generation tips, and growth tactics for sign companies. Free expert insights to boost your signage business revenue and attract more clients."
        canonical="https://signflow.us/blog"
        ogImage="https://signflow.us/og-image.jpg"
      />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={blogSchema} />
      <Header />

      <main>
        {/* Header Section */}
        <section className="bg-slate-900 text-white pt-24 pb-12 md:pt-32 md:pb-16 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
                SignFlow Blog
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
                Expert insights, marketing strategies, and growth tips explicitly designed for the sign industry.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-md mx-auto mb-6">
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-12 h-10 rounded-full focus:bg-white/20 transition-all text-sm"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={16} />
              </div>

              {/* Popular Tags */}
              <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-400">
                <span>Popular:</span>
                {["Marketing", "Lead Gen", "Video", "Process"].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="hover:text-white transition-colors cursor-pointer underline decoration-dotted"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories & Sort Bar */}
        <section className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-16 z-30 shadow-sm">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-3">
              {/* Categories */}
              <div className="overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-2 min-w-max">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={activeCategory === category ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-full h-8 px-4 text-xs ${activeCategory === category ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-slate-600 hover:text-primary hover:bg-primary/5"
                        }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-2 min-w-[140px]">
                <span className="text-xs text-slate-500 whitespace-nowrap hidden md:inline">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-8 rounded-full border-slate-200 bg-transparent text-xs focus:ring-primary/20">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="az">Title (A-Z)</SelectItem>
                    <SelectItem value="za">Title (Z-A)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-8 md:py-12">
          {/* Featured Post */}
          {showFeatured && featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Featured Article</h2>
              </div>

              <Link to={`/blog/${featuredPost.slug}`} className="group relative block rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 max-w-5xl mx-auto">
                <div className="grid md:grid-cols-[40%_60%] gap-0 h-[380px] md:h-[320px]">
                  {/* Image Side */}
                  <div className="relative h-48 md:h-auto overflow-hidden">
                    {featuredPost.featuredImage && (
                      <OptimizedImage
                        src={featuredPost.featuredImage}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent md:hidden"></div>
                  </div>

                  {/* Content Side */}
                  <div className="bg-slate-900 text-white p-6 md:p-8 flex flex-col justify-center h-full">
                    {featuredPost.category && (
                      <Badge variant="secondary" className="w-fit mb-3 bg-primary text-white border-none h-5 text-[10px] px-2">
                        {featuredPost.category}
                      </Badge>
                    )}
                    <h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight group-hover:text-primary-foreground/90 transition-colors line-clamp-2">
                      {featuredPost.title}
                    </h3>
                    <p className="text-slate-300 mb-6 leading-relaxed line-clamp-2 text-sm md:text-base">
                      {featuredPost.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-6 mt-auto">
                      <div className="flex items-center gap-1.5">
                        <User size={14} />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>{format(new Date(featuredPost.date), "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span>{featuredPost.readTime} min read</span>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                      Read Full Article <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Posts Grid */}
          <div>
            {showFeatured && (
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-6 bg-slate-200 dark:bg-slate-700 rounded-full"></span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Latest Articles</h2>
              </div>
            )}

            {filteredPosts.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No posts found</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Try adjusting your search or category filter.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                >
                  Clear filters
                </Button>

                {/* Fallback Recent Posts */}
                <div className="mt-16 text-left max-w-5xl mx-auto border-t border-slate-100 dark:border-slate-800 pt-12">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6 px-6">
                    Check out our latest articles instead:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 text-left">
                    {allPosts.slice(0, 3).map((post, index) => (
                      <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Link to={`/blog/${post.slug}`} className="group h-full block">
                          <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 bg-white dark:bg-slate-900 flex flex-col">
                            <div className="aspect-video relative overflow-hidden">
                              {post.featuredImage && (
                                <OptimizedImage
                                  src={post.featuredImage}
                                  alt={post.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              )}
                              {post.category && (
                                <Badge className="absolute top-4 left-4 bg-white/90 text-slate-900 hover:bg-white border-none shadow-sm backdrop-blur-sm">
                                  {post.category}
                                </Badge>
                              )}
                            </div>
                            <CardContent className="p-6 flex-1 flex flex-col">
                              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                {post.title}
                              </h3>
                              <div className="flex items-center text-primary font-semibold text-xs mt-auto">
                                Read Article <ChevronRight size={14} />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link to={`/blog/${post.slug}`} className="group h-full block">
                      <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 bg-white dark:bg-slate-900 flex flex-col">
                        <div className="aspect-video relative overflow-hidden">
                          {post.featuredImage && (
                            <OptimizedImage
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          )}
                          {post.category && (
                            <Badge className="absolute top-4 left-4 bg-white/90 text-slate-900 hover:bg-white border-none shadow-sm backdrop-blur-sm">
                              {post.category}
                            </Badge>
                          )}
                        </div>
                        <CardContent className="p-6 flex-1 flex flex-col">
                          <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {format(new Date(post.date), "MMM d, yyyy")}
                            </span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {post.readTime} min
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-1">
                            {post.description}
                          </p>
                          <div className="flex items-center text-primary font-semibold text-sm mt-auto group-hover:gap-2 transition-all">
                            Read Article <ChevronRight size={16} />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {hasMore && (
              <div className="mt-12 text-center">
                <Button variant="outline" size="lg" onClick={() => setVisibleCount(prev => prev + 6)}>
                  Load More Articles
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="container mx-auto px-6 pb-20">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-16 relative overflow-hidden text-center">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/10">
                <Mail className="text-white" size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Get Sign Industry Tips Delivered
              </h2>
              <p className="text-slate-300 mb-8 text-lg">
                Join 2,000+ sign company owners receiving our weekly marketing strategies and growth tips.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                />
                <Button
                  onClick={handleSubscribe}
                  className="h-12 px-8 font-semibold bg-primary hover:bg-primary/90 text-white"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-slate-400 text-xs mt-6">
                No spam, ever. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
