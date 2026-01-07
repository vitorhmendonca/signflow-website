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

const CaseStudyVolumes = () => {

  const metrics = [
    { value: "+200%", label: "Revenue Growth", icon: TrendingUp },
    { value: "5", label: "Months to Results", icon: Clock },
    { value: "2x", label: "Project Volume", icon: BarChart3 },
    { value: "47", label: "New Clients", icon: Users },
  ];

  const problems = [
    "Inconsistent lead flow making revenue unpredictable",
    "Relying solely on referrals and word-of-mouth",
    "No systematic approach to generating new business",
    "Competitors winning projects through better visibility",
  ];

  const approachSteps = [
    {
      icon: Target,
      title: "Market Analysis",
      description: "Identified high-value commercial sectors in their service area with the greatest growth potential.",
    },
    {
      icon: Megaphone,
      title: "Multi-Channel Outreach",
      description: "Built a systematic prospecting engine targeting property managers, GCs, and retail chains.",
    },
    {
      icon: BarChart3,
      title: "Pipeline Optimization",
      description: "Implemented tracking and follow-up systems to convert more leads into signed contracts.",
    },
  ];

  const beforeAfterItems = [
    { before: "5-10 projects per month", after: "20-25 projects per month" },
    { before: "Reactive, waiting for referrals", after: "Proactive pipeline of qualified leads" },
    { before: "Feast or famine revenue cycles", after: "Predictable monthly revenue" },
    { before: "No marketing strategy", after: "Full-funnel lead generation system" },
  ];

  const principles = [
    "Focus on high-intent commercial buyers",
    "Consistent outreach compounds over time",
    "Data-driven targeting reduces waste",
    "Speed-to-lead wins more deals",
    "Multi-touch follow-up sequences",
    "Local market expertise matters",
  ];

  const contentBlocks = [
    {
      headline: "Understanding the Market Dynamics",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      headline: "Building a Sustainable Pipeline",
      body: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
    {
      headline: "Scaling for Long-Term Growth",
      body: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="2x Volume in 5 Months - SignFlow Case Study"
        description="How a regional sign company doubled their project pipeline and achieved 200% revenue growth in just 5 months with SignFlow's lead generation system."
        canonical="https://signflow.us/case-study/volumes"
        ogImage="https://signflow.us/og-case-study-volumes.jpg"
      />
      <Header />

      <main className="pt-16">
        <CaseStudyHero
          tagline="Sign Installer & Manufacturer"
          headline="2x Volume in Just 5 Months"
          subheadline="How a regional sign company doubled their project pipeline and transformed their business with predictable lead generation."
          primaryMetric="+200%"
          primaryMetricLabel="Revenue Growth"
          image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop"
        />

        <MetricsGrid metrics={metrics} />

        <ProblemSection
          headline="They Were Leaving Money on the Table"
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
