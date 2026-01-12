import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToContact } from "@/lib/utils";

interface CaseStudyHeroProps {
  tagline: string;
  headline: string;
  subheadline: string;
  primaryMetric: string;
  primaryMetricLabel: string;
  image: string;
}

const CaseStudyHero = ({
  tagline,
  headline,
  subheadline,
  primaryMetric,
  primaryMetricLabel,
  image,
}: CaseStudyHeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-background via-secondary/30 to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6">
              {tagline}
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              {headline}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              {subheadline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button size="lg" className="group" onClick={scrollToContact}>
                Get Similar Results
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
              <Button size="lg" variant="outline" onClick={() => {
                const approachSection = document.getElementById('approach');
                if (approachSection) {
                  const headerOffset = 80;
                  const elementPosition = approachSection.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}>
                See How We Did It
              </Button>
            </div>
            
            {/* Primary Metric Callout */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="inline-flex items-center gap-4 bg-card border border-border rounded-2xl p-6 shadow-lg">
                <div className="text-5xl font-black text-primary">{primaryMetric}</div>
                <div className="text-muted-foreground font-medium">{primaryMetricLabel}</div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={image}
                alt={`${headline} - SignFlow case study showcasing real results for sign company clients`}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyHero;
