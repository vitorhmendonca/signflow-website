import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import paymentCards from "@/assets/payment-cards.png";
import { scrollToContact } from "@/lib/utils";
import { LeadFormModal } from "@/components/LeadFormModal";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const isCaseStudyPage = location.pathname.startsWith("/case-study/");
  const isBlogPage = location.pathname.startsWith("/blog");
  const isBlogListing = location.pathname === "/blog";
  const logoLink = isCaseStudyPage ? location.pathname : "/";

  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);

  // Filter navigation links based on page type
  const allNavigationLinks = [
    { name: "About", href: "#about", isRoute: false },
    { name: "Case Study", href: "#case-study", isRoute: false },
    { name: "Blog", href: "/blog", isRoute: true },
    { name: "FAQ", href: "#faq", isRoute: false },
    { name: "Contact", href: "#contact", isRoute: false },
  ];

  const navigationLinks = isCaseStudyPage
    ? allNavigationLinks.filter(link => link.name === "About" || link.name === "Contact")
    : allNavigationLinks;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");

    // If on case study page, scroll to sections on the same page
    if (isCaseStudyPage) {
      if (targetId === 'contact') {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          const elementHeight = contactSection.offsetHeight;
          const windowHeight = window.innerHeight;
          const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - (windowHeight / 2) + (elementHeight / 2);

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } else if (targetId === 'about') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    } else {
      // On homepage, just scroll
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
    }
  };

  const handleBookZoomClick = () => {
    if (isBlogPage) {
      setIsLeadFormOpen(true);
    } else {
      scrollToContact();
    }
  };

  return (
    <footer>
      <LeadFormModal isOpen={isLeadFormOpen} onOpenChange={setIsLeadFormOpen} />

      {/* Main Footer */}
      <div className="bg-[#1a1a1a] py-14">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 md:gap-16">
            {/* Column 1 - Brand & Contact */}
            <div className={isBlogPage ? "md:text-left" : ""}>
              <Link
                to={logoLink}
                onClick={() => {
                  if (isHomePage || isCaseStudyPage) {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="text-white text-2xl font-bold mb-6 block hover:text-primary transition-colors cursor-pointer"
              >
                SignFlow
              </Link>

              <div className="space-y-3 text-sm">
                <a
                  href="mailto:admin@czg-media.com"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <Mail size={16} style={{ color: '#6db1ee' }} />
                  admin@czg-media.com
                </a>
                <a
                  href="tel:+18333990544"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <Phone size={16} style={{ color: '#6db1ee' }} />
                  +1 (833) 399-0544
                </a>
              </div>

              <Button variant="hero" size="default" className="mt-6" onClick={handleBookZoomClick}>
                <Phone size={16} />
                Book a 15-minute Zoom
              </Button>
            </div>

            {/* Column 2 - Navigation (Normal) OR Legal (Blog) */}
            <div className={isBlogPage ? "md:flex md:flex-col md:items-center md:justify-start" : ""}>
              {!isBlogPage ? (
                // Normal Navigation for non-blog pages
                <>
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
                    Navigation
                  </h3>
                  <ul className="space-y-3">
                    {navigationLinks.map((link) => (
                      <li key={link.name}>
                        {link.isRoute ? (
                          <Link
                            to={link.href}
                            className="text-white/60 hover:text-white text-sm transition-colors"
                          >
                            {link.name}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-white/60 hover:text-white text-sm transition-colors"
                          >
                            {link.name}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                // Legal Section moved to Center for Blog Pages
                <div className="text-center md:text-center">
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
                    {isBlogPage && !isBlogListing ? "Links" : "Legal"}
                  </h3>
                  <ul className="space-y-3">
                    {isBlogPage && !isBlogListing && (
                      <li>
                        <a
                          href="#contact"
                          onClick={(e) => {
                            e.preventDefault();
                            const contactSection = document.getElementById('contact');
                            if (contactSection) {
                              contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                          }}
                          className="text-white/60 hover:text-white text-sm transition-colors"
                        >
                          Contact
                        </a>
                      </li>
                    )}
                    <li>
                      <Link
                        to="/terms"
                        className="text-white/60 hover:text-white text-sm transition-colors"
                      >
                        Terms & Conditions
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/privacy"
                        className="text-white/60 hover:text-white text-sm transition-colors"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Column 3 - Legal (Normal) OR Empty (Blog) */}
            {!isBlogPage && (
              <div>
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
                  Legal
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      to="/terms"
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy"
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#111111] py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center gap-4">
            {/* Payment Methods */}
            <img
              src={paymentCards}
              alt="Payment methods: Visa, Diners Club, American Express, Discover, Mastercard"
              className="h-12 w-auto"
              width={312}
              height={48}
              loading="lazy"
            />

            {/* Copyright */}
            <p className="text-white/40 text-sm">
              © Copyright 2026. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;