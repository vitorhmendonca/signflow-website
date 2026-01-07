import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import ClientLogosSection from "@/components/ClientLogosSection";
import PainPointsSection from "@/components/PainPointsSection";
import ValuePropSection from "@/components/ValuePropSection";
import MapSection from "@/components/MapSection";
import CaseStudySection from "@/components/CaseStudySection";
import FAQSection from "@/components/FAQSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MobileCTABar from "@/components/MobileCTABar";
import StructuredData from "@/components/StructuredData";
import { scrollToContact } from "@/lib/utils";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SignFlow",
  "url": "https://signflow.us",
  "logo": "https://signflow.us/favicon.ico",
  "description": "Results-driven advertisement for American sign companies. We help sign installers and manufacturers get more business signage projects.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Sales",
    "email": "admin@czg-media.com"
  },
  "sameAs": [
    "https://twitter.com/SignFlow"
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Lead Generation for Sign Companies",
  "provider": {
    "@type": "Organization",
    "name": "SignFlow"
  },
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "description": "We provide results-driven advertisement and lead generation services specifically for American sign companies, helping them get more business signage projects.",
  "offers": {
    "@type": "Offer",
    "description": "No year-long binding contracts. Flexible, results-driven marketing solutions."
  }
};

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation when page loads
    if (location.hash) {
      const targetId = location.hash.replace("#", "");

      // Small delay to ensure DOM is ready
      setTimeout(() => {
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
      }, 100);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <StructuredData data={organizationSchema} />
      <StructuredData data={serviceSchema} />
      <Header />
      <main>
        <HeroSection />
        <PortfolioSection />
        <ClientLogosSection />
        <PainPointsSection />
        <ValuePropSection />
        <MapSection />
        <CaseStudySection />
        <FAQSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileCTABar />
    </div>
  );
};

export default Index;
