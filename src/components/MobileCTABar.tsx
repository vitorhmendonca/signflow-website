import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { scrollToContact } from "@/lib/utils";

const MobileCTABar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (approx 500px)
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          <div className="bg-white/95 backdrop-blur-lg border-t border-border/50 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-foreground font-semibold text-sm truncate">
                  Ready to grow?
                </p>
                <p className="text-muted-foreground text-xs truncate">
                  Free 15-min consultation
                </p>
              </div>
              <Button variant="hero" size="sm" className="flex-shrink-0" onClick={scrollToContact}>
                <Send size={14} />
                Book Call
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileCTABar;
