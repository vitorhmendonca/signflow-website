import { TrendingUp, Users, Clock, BarChart3, Target, Megaphone } from "lucide-react";
import Header from "@/components/Header";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import MetricsGrid from "@/components/case-study/MetricsGrid";
import ProblemSection from "@/components/case-study/ProblemSection";
import ApproachSection from "@/components/case-study/ApproachSection";
import ContentSection from "@/components/case-study/ContentSection";
import BeforeAfter from "@/components/case-study/BeforeAfter";
import WhyItWorks from "@/components/case-study/WhyItWorks";
import CaseStudyCTA from "@/components/case-study/CaseStudyCTA";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import caseStudy1 from "@/assets/channel letters case study 1.webp";

const CaseStudyVolumes = () => {

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
        "name": "Case Studies",
        "item": "https://signflow.us/#case-studies"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "$1M Lead Value Generated",
        "item": "https://signflow.us/case-study/volumes"
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "$1M Lead Value Generated - SignFlow Case Study",
    "description": "How a sign company generated $1M in quote value from 363 qualified leads with 5.45x ROI using SignFlow's pay-per-lead model over 6 months.",
    "image": "https://signflow.us/og-case-study-volumes.jpg",
    "datePublished": "2026-01-07",
    "dateModified": "2026-01-07",
    "author": {
      "@type": "Organization",
      "name": "SignFlow"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SignFlow",
      "logo": {
        "@type": "ImageObject",
        "url": "https://signflow.us/favicon.ico"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://signflow.us/case-study/volumes"
    }
  };

  const metrics = [
    { value: "363", label: "Leads Generated", icon: Users },
    { value: "$1.01M", label: "Total Quotes Sent", icon: TrendingUp },
    { value: "$143K", label: "Revenue Closed", icon: BarChart3 },
    { value: "5.45x", label: "ROI", icon: Target },
  ];

  const problems = [
    "Wasted thousands on agencies and freelancers with poor results",
    "Inconsistent leads from Google Ads and fake leads from Meta",
    "Sales team working below capacity with no predictable pipeline",
    "Needed scalable lead volume on demand to grow the business",
  ];

  const approachSteps = [
    {
      icon: Target,
      title: "Pre-Qualified Lead Delivery",
      description: "Provided 363 qualified leads over 6 months—real prospects with verified contact information and actual signage needs.",
    },
    {
      icon: Megaphone,
      title: "Pay-Per-Lead Model",
      description: "Client invested $26,250 in lead packages at $75 per lead—no wasted ad spend, only paying for qualified opportunities.",
    },
    {
      icon: BarChart3,
      title: "Volume Optimization",
      description: "Scaled lead flow to match their sales capacity, ensuring their dedicated rep could respond fast and close more deals.",
    },
  ];

  const beforeAfterItems = [
    { before: "Inconsistent lead sources", after: "363 qualified leads in 6 months" },
    { before: "Sales team underutilized", after: "Full pipeline, dedicated rep closing consistently" },
    { before: "Uncertain marketing ROI", after: "5.45x return on investment" },
    { before: "Chasing fake leads from ads", after: "$1.01M in quotes sent to real prospects" },
  ];

  const principles = [
    "Only real leads—verified contacts with actual signage needs",
    "Quick response time—quotes often ready within 24 hours",
    "Pay per lead eliminates wasted ad spend",
    "Skilled sales rep maximizes conversion rates",
    "Scalable volume matches your capacity",
    "Predictable pipeline drives consistent revenue",
  ];

  const contentBlocks = [
    {
      headline: "From Marketing Chaos to Predictable Pipeline",
      body: "After burning through multiple marketing agencies and freelancers with little to show for it, this sign company was done gambling on unproven strategies. Google Ads brought inconsistent results. Meta ads delivered fake leads that wasted their team's time. They needed a system that worked—leads they could trust, volume they could control, and ROI they could measure. SignFlow's pay-per-lead model eliminated the guesswork. No more upfront ad spend with uncertain returns. Just qualified prospects, delivered consistently, at $75 per lead.",
    },
    {
      headline: "The Numbers That Matter",
      body: "Over six months, we delivered 363 qualified leads. Their sales team sent out $1.01 million in quotes—real opportunities with real budgets. They closed $143,000 in revenue from 25 projects, turning a $26,250 investment into a 5.45x return. But the real win wasn't just the revenue—it was the predictability. They allocated one of their three sales reps exclusively to SignFlow leads while the other two handled their existing volume. No slow seasons, no dry spells—just consistent lead flow that kept their entire team busy and their revenue growing.",
    },
    {
      headline: "Why This Worked",
      body: "Two factors made this a success story. First, they had a dedicated sales rep handling the SignFlow leads and offered free on-site quotes and surveys—this combination helped convert more leads into paying customers. Second, they trusted the process. Instead of spreading their budget thin across unproven channels, they committed to a proven pay-per-lead system and scaled it as their capacity grew. The result? A predictable pipeline, a sales team operating at full capacity, and measurable ROI that justified every dollar spent.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="$1M Lead Value Generated - SignFlow Case Study"
        description="How a sign company generated $1M in quote value from 363 qualified leads with 5.45x ROI using SignFlow's pay-per-lead model over 6 months."
        canonical="https://signflow.us/case-study/volumes"
        ogImage="https://signflow.us/og-case-study-volumes.jpg"
      />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={articleSchema} />
      <Header />

      <main className="pt-16">
        <CaseStudyHero
          tagline="Sign Installer & Manufacturer"
          headline="$1M Lead Value Generated"
          subheadline="How a sign company achieved 5.45x ROI in 6 months by switching from unreliable ad agencies to SignFlow's pay-per-lead model."
          primaryMetric="5.45x"
          primaryMetricLabel="ROI"
          image={caseStudy1}
        />

        <MetricsGrid metrics={metrics} />

        <ProblemSection
          headline="Tired of Wasting Money on Bad Marketing"
          problems={problems}
        />

        <ApproachSection steps={approachSteps} />

        <ContentSection blocks={contentBlocks} />

        <BeforeAfter items={beforeAfterItems} />

        <WhyItWorks principles={principles} />

        <CaseStudyCTA />
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudyVolumes;
