import { motion } from "framer-motion";
import { DollarSign, TrendingDown, Building, Clock } from "lucide-react";

const painPoints = [
  {
    icon: DollarSign,
    title: "Limited Marketing Budget",
    description: "Every dollar counts. You need marketing that delivers measurable ROI, not empty promises.",
  },
  {
    icon: TrendingDown,
    title: "Inconsistent Lead Flow",
    description: "Some months are feast, others are famine. You need a steady stream of qualified leads.",
  },
  {
    icon: Building,
    title: "Competition from Big Players",
    description: "National chains have deeper pockets. You need smarter strategies to compete effectively.",
  },
  {
    icon: Clock,
    title: "Time Spent on Bad Leads",
    description: "Hours wasted on tire-kickers. You need leads that are ready to buy, not just browse.",
  },
];

const PainPointsSection = () => {
  return (
    <section id="about" className="py-20 section-light border-none">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="font-semibold text-xs tracking-widest uppercase mb-3 block" style={{ color: '#6db1ee' }}>
            WE GET IT
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            We Understand Your Challenges
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            Running a sign company isn't easy. Here's what we hear from partners every day.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-border/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <point.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {point.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PainPointsSection;
