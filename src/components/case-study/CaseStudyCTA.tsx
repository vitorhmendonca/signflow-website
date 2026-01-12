import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Phone } from "lucide-react";
import { useState } from "react";

const CaseStudyCTA = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'case-study',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl"
          >
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <span className="font-semibold text-xs tracking-widest uppercase mb-4 block" style={{ color: '#6db1ee' }}>
                  READY TO GROW?
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Get Results Like These
                </h2>
                <p className="text-muted-foreground mb-6">
                  Book a free 15-minute strategy call. We'll analyze your current pipeline and show you exactly how to scale.
                </p>

              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background"
                  required
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background"
                  required
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-background"
                  required
                />
                <Button type="submit" size="lg" className="w-full group" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Book Free Strategy Call'}
                  {!isSubmitting && <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />}
                </Button>

                {submitStatus === 'success' && (
                  <div className="text-green-600 text-sm text-center font-medium">
                    ✓ Thank you! We'll contact you soon to schedule your call.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="text-red-600 text-sm text-center">
                    {errorMessage}
                  </div>
                )}

                <p className="text-xs text-muted-foreground text-center">
                  No commitment required. 100% free consultation.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyCTA;
