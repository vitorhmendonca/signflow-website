import { TrendingUp, Users, Clock, Target, Zap, CheckCircle } from "lucide-react";
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
import caseStudy2 from "@/assets/channel letters case study 2.webp";

const CaseStudyProjects = () => {

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
        "name": "$28.7K from First 100 Leads",
        "item": "https://signflow.us/case-study/projects"
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "$28.7K from First 100 Leads - SignFlow Case Study",
    "description": "How a Southern California sign company achieved 3.83x ROI and closed 5 projects from their first 100-lead test package with SignFlow.",
    "image": "https://signflow.us/og-case-study-projects.jpg",
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
      "@id": "https://signflow.us/case-study/projects"
    }
  };

  const metrics = [
    { value: "100", label: "Leads Delivered", icon: Users },
    { value: "$28.7K", label: "Revenue Closed", icon: TrendingUp },
    { value: "5", label: "Projects Won", icon: CheckCircle },
    { value: "3.83x", label: "ROI", icon: Target },
  ];

  const problems = [
    "Multiple failed attempts with marketing agencies—break-even or unprofitable results",
    "Never tried pay-per-lead before—skeptical about the model",
    "Needed proof before committing to larger campaigns",
    "Sales team had capacity but lacked consistent qualified leads",
  ];

  const approachSteps = [
    {
      icon: Clock,
      title: "Fast Onboarding",
      description: "Connected to SignFlow's system and launched the campaign in just 8 days—streamlined process from start to finish.",
    },
    {
      icon: Zap,
      title: "100 Lead Test Package",
      description: "Delivered 100 pre-qualified leads over 3 weeks—real prospects from Southern California, Northern California, and Arizona.",
    },
    {
      icon: Target,
      title: "Sales Execution",
      description: "Client's sales team responded fast with calls, multiple touchpoints, and free quotes—closing 5 projects within 4 weeks.",
    },
  ];

  const beforeAfterItems = [
    { before: "Break-even or losing money on ads", after: "3.83x ROI from first 100 leads" },
    { before: "Skeptical about pay-per-lead", after: "Proven model with measurable results" },
    { before: "Sales team underutilized", after: "5 projects closed, pipeline active" },
    { before: "No system for consistent leads", after: "Qualified leads delivered on schedule" },
  ];

  const principles = [
    "Pre-qualified leads save time and close faster",
    "Fast response and multiple touchpoints win deals",
    "Skilled sales team maximizes conversion rates",
    "Sales team effort and persistence pay off",
  ];

  const contentBlocks = [
    {
      headline: "Burned by Agencies, Ready for Something Different",
      body: "This Southern California sign company had tried it all—multiple marketing agencies, various ad strategies, and every promise of 'guaranteed results.' The outcome? Break-even at best, unprofitable at worst. They'd never tried pay-per-lead before and were understandably skeptical. But their sales team had capacity, and they needed a consistent source of qualified leads. SignFlow's 100-lead package was the minimum we offered—and the perfect test to prove the model worked.",
    },
    {
      headline: "8 Days to Launch, 3 Weeks to Deliver",
      body: "No complex onboarding. No months of 'optimization.' The client was connected to SignFlow's system in 8 days and receiving leads within the first week. Over the next 3 weeks, we delivered 100 pre-qualified leads—real contacts from their service area across Southern California, Northern California, and Arizona. Every lead was verified, reachable, and looking for signage services. Their sales team jumped on them fast: quick calls, multiple follow-ups, and free quotes. Within 4 weeks of campaign start, they closed 5 projects totaling $28,710 in revenue.",
    },
    {
      headline: "What Made This Work",
      body: "Three factors turned skepticism into results. First, the leads were qualified—no fake contacts, no tire-kickers, just real prospects with actual signage needs. Second, their sales team executed flawlessly. They responded fast, stayed persistent with multiple touches, and offered free quotes to remove friction. One of their salesmen was exceptionally skilled—the kind who can close anything with anyone—and that made a difference. Third, they invested $7,500 and got $28,710 back. A 3.83x return in 4 weeks proved the model worked. The test package delivered exactly what they needed: proof, revenue, and confidence to scale.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="$28.7K from First 100 Leads - SignFlow Case Study"
        description="How a Southern California sign company achieved 3.83x ROI and closed 5 projects from their first 100-lead test package with SignFlow."
        canonical="https://signflow.us/case-study/projects"
        ogImage="https://signflow.us/og-case-study-projects.jpg"
      />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={articleSchema} />
      <Header />

      <main className="pt-16">
        <CaseStudyHero
          tagline="Full-Service Sign Company"
          headline="$28.7K from First 100 Leads"
          subheadline="How a skeptical sign company in Southern California tested SignFlow with 100 leads and achieved 3.83x ROI in 4 weeks."
          primaryMetric="3.83x"
          primaryMetricLabel="ROI"
          image={caseStudy2}
        />

        <MetricsGrid metrics={metrics} />

        <ProblemSection
          headline="Skeptical After Multiple Failed Attempts"
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

export default CaseStudyProjects;
