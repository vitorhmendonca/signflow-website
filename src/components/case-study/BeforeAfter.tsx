import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface BeforeAfterItem {
  before: string;
  after: string;
}

interface BeforeAfterProps {
  items: BeforeAfterItem[];
}

const BeforeAfter = ({ items }: BeforeAfterProps) => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="font-semibold text-xs tracking-widest uppercase mb-4 block" style={{ color: '#6db1ee' }}>
            TRANSFORMATION
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Before → After
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-center bg-card border border-border rounded-xl p-6"
            >
              <div className="text-center md:text-left">
                <span className="text-xs font-semibold text-destructive uppercase tracking-wider mb-2 block">Before</span>
                <p className="text-foreground font-medium">{item.before}</p>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ArrowRight className="text-primary" size={24} />
                </div>
              </div>

              <div className="text-center md:text-right">
                <span className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2 block">After</span>
                <p className="text-foreground font-medium">{item.after}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
