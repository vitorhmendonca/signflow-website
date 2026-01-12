import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { scrollToContact } from "@/lib/utils";
import img1 from "@/assets/img1.webp";
import img2 from "@/assets/img2.webp";
import img3 from "@/assets/img3.webp";
import img4 from "@/assets/img4.webp";
import img5 from "@/assets/img5.webp";
import img6 from "@/assets/img6.webp";
import img7 from "@/assets/img7.webp";
import img8 from "@/assets/img8.webp";
import img9 from "@/assets/img9.webp";
import img10 from "@/assets/img10.webp";
import img11 from "@/assets/img11.webp";
import img12 from "@/assets/img12.webp";

// Portfolio images
const portfolioImages = [
  { src: img1, alt: "Illuminated channel letter signage installation for retail storefront" },
  { src: img2, alt: "Commercial building exterior signage with LED lighting" },
  { src: img3, alt: "Custom designed monument sign for business entrance" },
  { src: img4, alt: "Professional storefront sign installation with branding" },
  { src: img5, alt: "Large-scale commercial signage project for office building" },
  { src: img6, alt: "Custom fabricated business sign with modern design" },
  { src: img7, alt: "Illuminated pylon sign installation for commercial property" },
  { src: img8, alt: "Custom channel letters and storefront signage package" },
  { src: img9, alt: "Completed commercial sign project with professional finish" },
  { src: img10, alt: "High-quality business signage installation for retail location" },
  { src: img11, alt: "Professional sign installation service for commercial client" },
  { src: img12, alt: "Custom business sign fabrication and installation project" },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12"
        >
          Signs Get Installed Thanks To Our Ads
        </motion.h2>

        <div className="relative">
          {/* Instagram-style grid: 3 columns, square images */}
          <div className="grid grid-cols-3 gap-3 md:gap-5 max-w-6xl mx-auto">
            {portfolioImages.map((image, index) => {
              const isBottomRow = index >= 9; // Last row gets permanent overlay
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative aspect-square bg-muted"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={371}
                    height={371}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-all duration-300 relative ${
                      isBottomRow 
                        ? 'opacity-50 pointer-events-none' 
                        : 'hover:scale-105 hover:shadow-xl hover:z-10'
                    }`}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Fade overlay at bottom with CTA */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent flex items-end justify-center pb-6">
            <Button variant="hero" size="lg" onClick={scrollToContact}>
              Book 1-On-1 Zoom
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
