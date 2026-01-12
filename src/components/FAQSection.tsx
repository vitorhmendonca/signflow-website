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
      "Book a 15-minute Zoom call with us. We'll discuss your lead volume needs, service area, and how our pay-per-lead model can deliver qualified signage leads (e.g., if your sign company doesn't do vehicle wraps or canopies, we'll adjust the lead flow to match your specific services).",
  },
  {
    question: "How much does it cost?",
    answer:
      "We charge a fixed cost per lead based on the level of qualification. To understand your particular case and find out if we fit each other we recommend scheduling a quick Zoom call.",
  },
  {
    question: "Am I guaranteed to get the leads?",
    answer:
      "Yes. Even if it costs us more to generate your leads than what you're paying, we'll still deliver the full package you purchased. No risk on your side—you get every lead you paid for, guaranteed.",
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
