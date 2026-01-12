import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";

const PrivacyPolicy = () => {
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
        "name": "Privacy Policy",
        "item": "https://signflow.us/privacy"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Privacy Policy - SignFlow"
        description="Learn how SignFlow protects your privacy and handles your data. Read our comprehensive privacy policy."
        canonical="https://signflow.us/privacy"
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
          Privacy Policy
        </h1>

        <div className="prose prose-gray max-w-none space-y-6 text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Introduction</h2>
          <p>
            This Privacy Policy describes how <strong className="text-foreground">CZG Media MB</strong> ("We", "Us", or "Our"),
            located at Tverečiaus 12-19, Vilnius, Lithuania, collects, uses, and protects the personal information
            you provide when using our Facebook Lead Forms or visiting our digital properties. We are committed to
            safeguarding your privacy in accordance with the General Data Protection Regulation (GDPR) and applicable
            United States data protection laws.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Information We Collect</h2>
          <p>We collect information you voluntarily provide through our Facebook Lead Forms, including but not limited to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name</li>
            <li>Phone Number</li>
            <li>Email Address</li>
            <li>Business Name</li>
            <li>Project Details (e.g., budget, timeline)</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. How We Use Your Information</h2>
          <p>We use the information collected for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide the quotes, consultations, or services you requested.</li>
            <li>To contact you via phone, email, or SMS regarding your inquiry.</li>
            <li>To improve our advertising and customer service.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Data Protection & Sharing</h2>
          <p>
            <strong className="text-foreground">Security:</strong> We implement strict security measures to protect your data.
          </p>
          <p>
            <strong className="text-foreground">No Sale of Data:</strong> We do not sell, rent, or trade your personal information to third parties.
          </p>
          <p>
            <strong className="text-foreground">Third Parties:</strong> We may share your information with trusted partners
            (such as installation teams or CRM software) solely for the purpose of fulfilling your request.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Data Retention</h2>
          <p>
            We retain your personal information only as long as necessary to fulfill the purposes outlined
            in this policy or as required by law.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. International Data Transfers</h2>
          <p>
            Your information may be processed in Lithuania (EU) and the United States. By submitting your data,
            you consent to this transfer. We ensure appropriate safeguards are in place to protect your data during transfer.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Your Rights</h2>
          <p>Under GDPR and applicable laws, you have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access the personal data we hold about you.</li>
            <li>Request correction or deletion of your data.</li>
            <li>Withdraw consent for marketing communications at any time.</li>
          </ul>
          <p>
            To exercise these rights, please contact us at:{" "}
            <a href="mailto:admin@czg-media.com" className="hover:underline whitespace-nowrap" style={{ color: '#6db1ee' }}>admin@czg-media.com</a>
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. Updates to This Policy</h2>
          <p>
            We may update this policy from time to time. Any changes will be posted on this page.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Contact Us</h2>
          <p>
            If you have questions about this policy, please contact us at{" "}
            <a href="mailto:admin@czg-media.com" className="hover:underline whitespace-nowrap" style={{ color: '#6db1ee' }}>admin@czg-media.com</a>.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;