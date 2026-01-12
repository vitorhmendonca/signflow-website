import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { lazy, Suspense, useState, useEffect } from "react";
import { scrollToContact } from "@/lib/utils";

const SignFlowLogo3D = lazy(() => import("./SignFlowLogo3D"));

const HeroSection = () => {
  const [shouldLoad3D, setShouldLoad3D] = useState(false);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const headerOffset = 80;
      const elementPosition = aboutSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Defer 3D component loading until after initial paint to reduce main-thread blocking
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setShouldLoad3D(true), { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => setShouldLoad3D(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section className="hero-gradient pt-16 relative">
      <div className="container mx-auto px-6 py-12 lg:py-20">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Mobile Logo - Shows above headline on mobile only */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center lg:hidden w-full mb-4 min-h-[160px]"
          >
            <div className="w-full max-w-[280px] h-[160px] flex items-center justify-center">
              {shouldLoad3D && (
                <Suspense fallback={<div className="w-full h-full" />}>
                  <SignFlowLogo3D />
                </Suspense>
              )}
            </div>
          </motion.div>

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
              GET MORE BUSINESS<br />
              SIGNAGE PROJECTS
            </h1>
            <p className="text-lg text-white/90 mb-4 font-medium">
              Pay Per Qualified Lead
            </p>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="text-white/80 flex items-start gap-2">
                <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                Built for American sign companies
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                No year-long binding contracts
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                Our partners stay with us for years
              </li>
            </ul>
            <div className="flex flex-wrap gap-4 mb-4">
              <Button variant="hero" size="default" onClick={scrollToContact}>
                <Send size={16} />
                Book 15-Minute Zoom
              </Button>
              <Button variant="heroOutline" size="default" onClick={scrollToAbout}>
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Desktop Logo - Shows on right side on desktop only */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:flex justify-center"
          >
            <div className="w-full h-[450px]">
              {shouldLoad3D && (
                <Suspense fallback={<div className="w-full h-full" />}>
                  <SignFlowLogo3D />
                </Suspense>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
