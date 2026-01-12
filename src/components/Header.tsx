import { useState, useEffect } from "react";
import { Menu, X, ArrowLeft } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToContact } from "@/lib/utils";

// Sections where invert effect should be used
const INVERT_SECTIONS = ['portfolio', 'client-logos', 'pain-points', 'about', 'case-study', 'faq', 'contact', 'footer'];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [shouldInvert, setShouldInvert] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isBlogPage = location.pathname.startsWith("/blog");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setScrollY(window.scrollY);

      // Only check for inversion on home page
      if (!isHomePage) {
        setShouldInvert(false);
        return;
      }

      // Check which section the header is currently over
      const headerHeight = 64; // Header height in pixels
      const headerMiddle = window.scrollY + headerHeight / 2;

      let isOverInvertSection = false;

      for (const sectionId of INVERT_SECTIONS) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const sectionBottom = sectionTop + rect.height;

          if (headerMiddle >= sectionTop && headerMiddle <= sectionBottom) {
            isOverInvertSection = true;
            break;
          }
        }
      }

      setShouldInvert(isOverInvertSection);
    };

    handleScroll(); // Check on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const navLinks = [
    { name: "About", href: "#about", isRoute: false },
    { name: "Case Study", href: "#case-study", isRoute: false },
    { name: "Blog", href: "/blog", isRoute: true },
    { name: "FAQ", href: "#faq", isRoute: false },
    { name: "Contact", href: "#contact", isRoute: false },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isRoute: boolean) => {
    e.preventDefault();

    if (isRoute) {
      // Handle route navigation
      window.location.href = href;
      return;
    }

    // Handle hash link navigation
    const targetId = href.replace("#", "");

    if (targetId === 'contact') {
      scrollToContact();
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
    setIsMenuOpen(false);
  };

  // Parallax transforms for desktop header elements
  const logoParallax = scrollY * 0.15;
  const navParallax = scrollY * 0.08;
  const ctaParallax = scrollY * 0.12;
  const headerOpacity = Math.max(1 - scrollY * 0.002, 0.85);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 ${isBlogPage
            ? "backdrop-blur-xl bg-slate-900/70 border-b border-white/10 shadow-lg"
            : `transition-all duration-300 ${isScrolled
              ? shouldInvert
                ? "backdrop-invert-[0.85] backdrop-blur-md bg-black/20"
                : "backdrop-blur-xl bg-slate-900/70 border-b border-white/10 shadow-lg"
              : "bg-transparent"
            }`
          }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Back Button (for non-home pages) */}
            {!isHomePage && (
              <Link
                to="/"
                className={`flex items-center gap-2 transition-colors mr-4 ${isScrolled || isBlogPage ? "text-white/80 hover:text-white" : "text-foreground/80 hover:text-foreground"
                  }`}
              >
                <ArrowLeft size={20} />
                <span className="font-medium text-sm hidden sm:inline">Back</span>
              </Link>
            )}

            {/* Logo with parallax */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="hidden md:block"
              style={{
                transform: `translateY(${logoParallax}px) scale(${1 - scrollY * 0.0003})`,
                opacity: headerOpacity,
              }}
            >
              <Link
                to={isHomePage ? "/" : location.pathname}
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`text-[1.25rem] font-bold tracking-tight transition-colors cursor-pointer ${isHomePage || isScrolled || isBlogPage ? "text-white" : "text-foreground"
                  }`}
              >
                SignFlow
              </Link>
            </motion.div>

            {/* Mobile Logo (no parallax) */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:hidden"
            >
              <Link
                to={isHomePage ? "/" : location.pathname}
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`text-[1.25rem] font-bold tracking-tight transition-colors cursor-pointer ${isHomePage || isScrolled || isBlogPage ? "text-white" : "text-foreground"
                  }`}
              >
                SignFlow
              </Link>
            </motion.div>

            {/* Desktop Navigation with staggered parallax */}
            {isHomePage && (
              <nav className="hidden md:flex items-center gap-8 ml-auto">
                {navLinks.map((link, index) => {
                  if (link.isRoute) {
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                        style={{
                          transform: `translateY(${navParallax + index * 2}px)`,
                          opacity: headerOpacity,
                        }}
                      >
                        <Link
                          to={link.href}
                          className="text-white/80 hover:text-white transition-colors text-sm font-medium block"
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    );
                  }
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href, link.isRoute)}
                      className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                      style={{
                        transform: `translateY(${navParallax + index * 2}px)`,
                        opacity: headerOpacity,
                      }}
                      whileHover={{
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {link.name}
                    </motion.a>
                  );
                })}
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToContact();
                  }}
                  className="relative bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  style={{
                    transform: `translateY(${ctaParallax}px) rotate(${scrollY * 0.01}deg)`,
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 0,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book a 15-minute Zoom
                  {/* Reflection/glow effect */}
                  <motion.span
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-primary/40 blur-lg rounded-full"
                    style={{
                      opacity: Math.max(1 - scrollY * 0.005, 0.3),
                    }}
                  />
                </motion.a>
              </nav>
            )}

            {/* Spacer for non-home pages */}
            {!isHomePage && <div className="flex-1" />}

            {/* Mobile Menu Button */}
            {isHomePage && (
              <motion.button
                className="md:hidden text-white p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            )}
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && isHomePage && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute top-16 left-0 right-0 bg-hero border-b border-white/10 shadow-2xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <nav className="container mx-auto px-6 py-6 flex flex-col gap-1">
                {navLinks.map((link, index) => {
                  if (link.isRoute) {
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Link
                          to={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-white/90 hover:text-white hover:bg-white/10 transition-colors text-base font-medium py-3 px-4 rounded-lg block"
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    );
                  }
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href, link.isRoute)}
                      className="text-white/90 hover:text-white hover:bg-white/10 transition-colors text-base font-medium py-3 px-4 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      {link.name}
                    </motion.a>
                  );
                })}
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToContact();
                    setIsMenuOpen(false);
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-center py-3 px-4 rounded-lg text-base font-semibold mt-4 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.25 }}
                >
                  Book a 15-minute Zoom
                </motion.a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
