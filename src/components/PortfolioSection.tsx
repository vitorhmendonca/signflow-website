import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { scrollToContact } from "@/lib/utils";

// Professional signage industry images - 9 for desktop (3x3), 12 for mobile (3x4)
const portfolioImages = [
  { src: "https://images.unsplash.com/photo-1563906267088-b029e7101114?w=371&h=371&fit=crop&fm=webp&q=80", alt: "LED channel letter installation" },
  { src: "https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=371&h=371&fit=crop&fm=webp&q=80", alt: "Illuminated storefront sign" },
  { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=371&h=371&fit=crop&fm=webp&q=80", alt: "Crane lifting large sign" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=371&h=371&fit=crop&fm=webp&q=80", alt: "Monument sign installation" },
  { src: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=371&h=371&fit=crop&fm=webp&q=80", alt: "Pylon sign construction" },
  { src: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=371&h=371&fit=crop&fm=webp&q=80", alt: "Digital billboard sign" },
  { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=371&h=371&fit=crop&fm=webp&q=80", alt: "High-rise building signage" },
  { src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=371&h=371&fit=crop&fm=webp&q=80", alt: "Industrial facility signage" },
  { src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=371&h=371&fit=crop&fm=webp&q=80", alt: "Retail plaza signage" },
  { src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=371&h=371&fit=crop&fm=webp&q=80", alt: "Corporate headquarters sign" },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=371&h=371&fit=crop&fm=webp&q=80", alt: "Office building directory" },
  { src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=371&h=371&fit=crop&fm=webp&q=80", alt: "Mixed-use development signage" },
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
