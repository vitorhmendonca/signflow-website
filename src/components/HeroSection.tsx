import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { scrollToContact } from "@/lib/utils";
import signflowLogo from "@/assets/signflow-logo-square.png";
import OptimizedImage from "./OptimizedImage";

const HeroSection = () => {
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

  return (
    <section className="hero-gradient pt-16 relative">
      <div className="container mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
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
              For American Sign Companies
            </p>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="text-white/80 flex items-start gap-2">
                <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                Results driven advertisement
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                No year-long binding contracts
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                Our clients stay with us for years
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

          {/* Right Content - Static Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center lg:justify-center"
          >
            <div className="w-full max-w-[500px] aspect-square flex items-center justify-center">
              <OptimizedImage
                src={signflowLogo}
                alt="SignFlow Logo"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
