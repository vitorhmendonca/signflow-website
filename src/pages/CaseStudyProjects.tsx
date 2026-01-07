import { TrendingUp, Users, Zap, Target, Search, Mail, BarChart3 } from "lucide-react";
import Header from "@/components/Header";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import MetricsGrid from "@/components/case-study/MetricsGrid";
import ProblemSection from "@/components/case-study/ProblemSection";
import ApproachSection from "@/components/case-study/ApproachSection";
import BeforeAfter from "@/components/case-study/BeforeAfter";
import WhyItWorks from "@/components/case-study/WhyItWorks";
import CaseStudyCTA from "@/components/case-study/CaseStudyCTA";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const CaseStudyProjects = () => {

  const metrics = [
    { value: "+350%", label: "Lead Increase", icon: TrendingUp },
    { value: "45", label: "New Projects/Month", icon: BarChart3 },
    { value: "3x", label: "Pipeline Value", icon: Zap },
    { value: "62", label: "New Accounts", icon: Users },
  ];

  const problems = [
    "Spending on ads with no measurable ROI",
    "Sales team chasing unqualified leads",
    "Long sales cycles draining resources",
    "Losing deals to more aggressive competitors",
  ];

  const approachSteps = [
    {
      icon: Search,
      title: "Deep Prospect Research",
      description: "Built a database of ideal customers including property managers, franchises, and retail chains in their territory.",
    },
    {
      icon: Mail,
      title: "Personalized Outreach",
      description: "Created targeted messaging sequences that spoke directly to each prospect's specific signage needs.",
    },
    {
      icon: Target,
      title: "Appointment Setting",
      description: "Qualified and scheduled meetings with decision-makers ready to discuss upcoming projects.",
    },
  ];

  const beforeAfterItems = [
    { before: "12 projects per month", after: "45+ projects per month" },
    { before: "Cold calling with no direction", after: "Warm leads with clear intent" },
    { before: "90-day average sales cycle", after: "45-day average sales cycle" },
    { before: "15% close rate", after: "38% close rate" },
  ];

  const principles = [
    "Quality over quantity in lead generation",
    "Personalization increases response rates",
    "Pre-qualified leads close faster",
    "Consistent touchpoints build trust",
    "Industry-specific messaging resonates",
    "Timing outreach with buying cycles",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="45 New Projects Every Month - SignFlow Case Study"
        description="How a commercial signage company achieved 350% lead increase and 45+ new projects monthly with SignFlow's targeted lead generation system."
        canonical="https://signflow.us/case-study/projects"
        ogImage="https://signflow.us/og-case-study-projects.jpg"
      />
      <Header />

      <main className="pt-16">
        <CaseStudyHero
          tagline="Commercial Signage Company"
          headline="45 New Projects Every Month"
          subheadline="How a commercial signage company built a lead generation engine that delivers consistent, high-quality opportunities."
          primaryMetric="+350%"
          primaryMetricLabel="Lead Increase"
          image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"
        />

        <MetricsGrid metrics={metrics} />

        <ProblemSection
          headline="Their Growth Had Hit a Wall"
          problems={problems}
        />

        <ApproachSection steps={approachSteps} />

        <BeforeAfter items={beforeAfterItems} />

        <WhyItWorks principles={principles} />

        <CaseStudyCTA />
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudyProjects;
