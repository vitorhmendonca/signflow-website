import { motion } from "framer-motion";
import { UserCheck, TrendingUp, Laptop, PhoneCall } from "lucide-react";

const painPoints = [
  {
    icon: UserCheck,
    title: "Pre-Qualified Leads",
    description: "Know their budget and timeline before the first call",
  },
  {
    icon: TrendingUp,
    title: "Scalable Lead Flow",
    description: "Doesn't matter whether you need 100 or 10,000 leads—we've got you covered",
  },
  {
    icon: Laptop,
    title: "Custom Software",
    description: "All leads in one place. Instant alerts for you and your team—nothing slips through the cracks",
  },
  {
    icon: PhoneCall,
    title: "Real Phone Numbers",
    description: "Can't reach them? We replace the lead at zero cost",
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
            Built for Sign Companies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            Unique SignFlow pay-per-lead model. Get plugged into our network and grow your business.
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
              className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-border/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-shadow duration-300"
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
