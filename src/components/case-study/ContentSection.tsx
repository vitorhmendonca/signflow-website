import { motion } from "framer-motion";

interface ContentBlock {
  headline: string;
  body: string;
}

interface ContentSectionProps {
  blocks: ContentBlock[];
}

const ContentSection = ({ blocks }: ContentSectionProps) => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          {blocks.map((block, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                {block.headline}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {block.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
