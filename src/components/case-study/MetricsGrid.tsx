import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Metric {
  value: string;
  label: string;
  icon: LucideIcon;
}

interface MetricsGridProps {
  metrics: Metric[];
}

const MetricsGrid = ({ metrics }: MetricsGridProps) => {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 text-center border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <metric.icon className="text-primary" size={24} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsGrid;
