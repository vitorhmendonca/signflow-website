import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

interface ProblemSectionProps {
  headline: string;
  problems: string[];
}

const ProblemSection = ({ headline, problems }: ProblemSectionProps) => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="font-semibold text-xs tracking-widest uppercase mb-4 block" style={{ color: '#6db1ee' }}>
            THE CHALLENGE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {headline}
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 bg-destructive/5 border border-destructive/20 rounded-xl p-5"
            >
              <XCircle className="text-destructive shrink-0 mt-0.5" size={22} />
              <p className="text-foreground font-medium">{problem}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
