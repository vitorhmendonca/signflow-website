import { Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { scrollToContact } from "@/lib/utils";

const testimonials = [
  {
    text: (
      <>
        Got two form leads or calls that came in big jobs
        <br />
        Will update the system tomorrow
      </>
    ),
    author: "John W.",
    time: "14:32",
  },
  {
    text: (
      <>
        just closed Randy from last week $19,045 🔥
        <br />
        hope you guys are doing well! have a good weekend😁
      </>
    ),
    author: "Val P.",
    time: "22:17",
  },
  {
    text: "I haven't come across another agency that specializes in signage like they do. The ads are performing well - even outpaced industry giants like FastSigns and 3M!",
    author: "Jon K.",
    time: "09:45",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="font-semibold text-xs tracking-widest uppercase mb-3 block" style={{ color: '#6db1ee' }}>
            THE PRIORITY
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Our Clients Come First.
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Chat-style testimonials */}
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`relative max-w-md ${index % 2 === 0 ? 'bg-[#1a1a2e]' : 'bg-[#0f3460]'} rounded-2xl p-5 shadow-xl`}>
                  {/* Message bubble tail */}
                  <div
                    className={`absolute top-4 w-0 h-0 border-8 ${index % 2 === 0
                        ? '-left-2 border-r-[#1a1a2e] border-t-transparent border-b-transparent border-l-transparent'
                        : '-right-2 border-l-[#0f3460] border-t-transparent border-b-transparent border-r-transparent'
                      }`}
                  />

                  <div className="flex items-start gap-3">
                    <div className="shrink-0">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <MessageCircle size={14} className="text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-white font-semibold text-sm">{testimonial.author}</span>
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed">{testimonial.text}</p>
                      <span className="text-white/40 text-xs mt-2 block text-right">{testimonial.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center mt-10"
          >
            <Button variant="hero" size="lg" onClick={scrollToContact}>
              <Send size={16} />
              Book 15-Minute Zoom
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
