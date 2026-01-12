import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import caseStudy1 from "@/assets/channel letters case study 1.webp";
import caseStudy2 from "@/assets/channel letters case study 2.webp";

const caseStudies = [
  {
    title: "$1M Lead Value Generated",
    subtitle: "6-Month Results",
    metric: "5.45x",
    metricLabel: "ROI",
    image: caseStudy1,
    link: "/case-study/volumes",
  },
  {
    title: "$28.7K from First 100 Leads",
    subtitle: "4-Week Test Campaign",
    metric: "3.83x",
    metricLabel: "ROI",
    image: caseStudy2,
    link: "/case-study/projects",
  },
];

const CaseStudySection = () => {
  const navigate = useNavigate();

  const handleCaseStudyClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    // Reset scroll position before navigation
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    // Navigate to case study page
    navigate(link);
  };

  return (
    <section id="case-study" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="font-semibold text-xs tracking-widest uppercase mb-3 block" style={{ color: '#6db1ee' }}>
            OUR PORTFOLIO
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Latest Case Studies
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link
                to={study.link}
                onClick={(e) => handleCaseStudyClick(e, study.link)}
                className="block"
              >
                <div className="bg-card rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                  <div className="p-3">
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src={study.image}
                        alt={study.title}
                        width={412}
                        height={160}
                        loading="lazy"
                        className="object-cover w-full h-40 group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1 text-xs font-semibold">
                        <TrendingUp size={12} />
                        {study.metric}
                      </div>
                      <span className="text-muted-foreground text-xs">{study.metricLabel}</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {study.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {study.subtitle}
                    </p>
                    <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      View Case Study
                      <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;
