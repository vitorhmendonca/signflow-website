import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load non-critical routes
const NotFound = lazy(() => import("./pages/NotFound"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CaseStudyVolumes = lazy(() => import("./pages/CaseStudyVolumes"));
const CaseStudyProjects = lazy(() => import("./pages/CaseStudyProjects"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/terms" element={<Suspense fallback={<div className="min-h-screen" />}><TermsAndConditions /></Suspense>} />
          <Route path="/privacy" element={<Suspense fallback={<div className="min-h-screen" />}><PrivacyPolicy /></Suspense>} />
          <Route path="/case-study/volumes" element={<Suspense fallback={<div className="min-h-screen" />}><CaseStudyVolumes /></Suspense>} />
          <Route path="/case-study/projects" element={<Suspense fallback={<div className="min-h-screen" />}><CaseStudyProjects /></Suspense>} />
          <Route path="/gallery" element={<Suspense fallback={<div className="min-h-screen" />}><Gallery /></Suspense>} />
          <Route path="/blog" element={<Suspense fallback={<div className="min-h-screen" />}><Blog /></Suspense>} />
          <Route path="/blog/:slug" element={<Suspense fallback={<div className="min-h-screen" />}><BlogPost /></Suspense>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<Suspense fallback={<div className="min-h-screen" />}><NotFound /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
