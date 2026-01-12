import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";

const TermsAndConditions = () => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://signflow.us/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Terms & Conditions",
        "item": "https://signflow.us/terms"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Terms & Conditions - SignFlow"
        description="Read SignFlow's terms and conditions for our lead generation and marketing services for sign companies."
        canonical="https://signflow.us/terms"
      />
      <StructuredData data={breadcrumbSchema} />
      {/* Header */}
      <header className="bg-[#0a0a12] py-6 border-b border-white/10">
        <div className="container mx-auto px-6">
          <Link to="/" className="text-white text-xl font-bold tracking-tight">
            SignFlow
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 hover:underline mb-8"
          style={{ color: '#6db1ee' }}
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          Terms & Conditions
        </h1>

        <div className="prose prose-gray max-w-none space-y-6 text-muted-foreground">
          <p>
            These Terms & Conditions are prepared by <strong className="text-foreground">SignFlow</strong>,
            whose registered address is Lithuania, European Union, and apply to all users of our website,
            services, and social media platforms ("we," "us," or "our"). By accessing our services,
            you agree to be bound by these terms. Please read the following carefully.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Scope of Services</h2>
          <p>
            We provide marketing and business growth services, including online marketing services
            and consulting. The scope of these services may vary based on location and individual agreements.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Use of Services</h2>
          <p>By using our services, you confirm:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You are at least 18 years old.</li>
            <li>You will not misuse or abuse our website or services.</li>
            <li>You will provide accurate and truthful information in all communications.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Intellectual Property</h2>
          <p>
            All content on our website and materials provided as part of our services remain the
            property of SignFlow. You may not reproduce, distribute, or use our materials for any
            unauthorized purposes.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Limitation of Liability</h2>
          <p>
            We are not liable for any indirect, incidental, or consequential damages resulting
            from the use of our services. Our liability is limited to the amount paid by you
            for services rendered in the past 12 months.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Data Protection</h2>
          <p>
            We collect and process your personal data in accordance with US privacy laws.
            By using our services, you consent to such processing.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Changes to Terms</h2>
          <p>
            We may update these Terms & Conditions from time to time. Any changes will be posted
            on this page, and your continued use of our services constitutes acceptance of the
            updated terms.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Contact Information</h2>
          <p className="whitespace-nowrap">
            If you have any questions or concerns about these terms, please contact us at{" "}
            <a href="mailto:admin@czg-media.com" className="hover:underline" style={{ color: '#6db1ee' }}>admin@czg-media.com</a>.
          </p>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;