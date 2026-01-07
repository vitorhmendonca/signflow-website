import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface WhyItWorksProps {
  principles: string[];
}

const WhyItWorks = ({ principles }: WhyItWorksProps) => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="font-semibold text-xs tracking-widest uppercase mb-4 block opacity-80">
            THE FRAMEWORK
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Why This Works
          </h2>
        </motion.div>
        
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-3 bg-primary-foreground/10 rounded-lg p-4"
            >
              <CheckCircle2 className="shrink-0" size={22} />
              <span className="font-medium">{principle}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyItWorks;
