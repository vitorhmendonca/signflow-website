import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ApproachStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ApproachSectionProps {
  steps: ApproachStep[];
}

const ApproachSection = ({ steps }: ApproachSectionProps) => {
  return (
    <section id="approach" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="font-semibold text-xs tracking-widest uppercase mb-4 block" style={{ color: '#6db1ee' }}>
            OUR APPROACH
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            The Strategy That Delivered
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-border" />
                )}

                <div className="bg-card border border-border rounded-2xl p-8 h-full relative z-10 hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-xl mb-6">
                    <step.icon className="text-primary-foreground" size={28} />
                  </div>
                  <div className="absolute top-6 right-6 text-6xl font-black text-muted/50">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
