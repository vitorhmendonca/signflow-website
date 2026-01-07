import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StructuredData from "@/components/StructuredData";

const faqs = [
  {
    question: "What do I do to get started?",
    answer:
      "Simply book a 15-minute Zoom call with us. We'll discuss your business goals, current challenges, and how our advertising solutions can help you get more commercial signage projects.",
  },
  {
    question: "How much does it cost?",
    answer:
      "We don't believe in one-size-fits-all principle when it comes to online ads. Our services range from free ones up to $5197/mo. To understand your particular case and find out if we fit each other we recommend scheduling a quick Zoom call.",
  },
  {
    question: "What if it does not work?",
    answer:
      "If you don't get new clients from our online ad campaigns – you don't pay us.",
  },
];

// FAQ Schema for rich snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 bg-background">
      <StructuredData data={faqSchema} />
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10"
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl px-6 border border-gray-200 shadow-sm"
              >
                <AccordionTrigger className="text-left text-foreground font-semibold text-lg hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
