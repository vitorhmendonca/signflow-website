import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    comment: "",
    agreed: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreed) {
      setErrorMessage('Please agree to the terms and conditions');
      return;
    }

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
          source: 'contact-form',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: "",
          email: "",
          phone: "",
          comment: "",
          agreed: false,
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
    <section id="contact" className="relative bg-secondary">
      {/* Diagonal background */}
      <div className="absolute inset-0 section-dark" style={{ clipPath: "polygon(0 6%, 100% 0, 100% 100%, 0 100%)" }} />

      <div className="relative py-24 pt-32">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-center text-white mb-10"
          >
            Let's Get In Touch!
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <p className="text-muted-foreground text-center text-sm mb-5">Quick Zoom Chat</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="First Name*"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="bg-transparent border-0 border-b border-gray-300 rounded-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-primary text-sm h-10"
                  required
                />
                <Input
                  type="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-transparent border-0 border-b border-gray-300 rounded-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-primary text-sm h-10"
                  required
                />
                <Input
                  type="tel"
                  placeholder="Phone*"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-transparent border-0 border-b border-gray-300 rounded-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-primary text-sm h-10"
                  required
                />
                <Textarea
                  placeholder="Preferred time or another comment*"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="bg-transparent border-0 border-b border-gray-300 rounded-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-primary resize-none text-sm"
                  rows={2}
                  required
                />

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={formData.agreed}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreed: checked as boolean })}
                    className="border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-0.5"
                  />
                  <label htmlFor="terms" className="text-muted-foreground text-xs leading-relaxed">
                    I agree to <Link to="/terms" className="text-primary underline">terms & conditions</Link> provided by the company. By providing my phone number, I agree to receive text messages from the business.
                  </label>
                </div>

                <p className="text-muted-foreground/60 text-[10px] text-center">
                  * No annoying follow-up calls/texts
                </p>

                <Button variant="default" size="default" className="w-full hover:bg-primary/90" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>

                {submitStatus === 'success' && (
                  <div className="text-green-600 text-sm text-center font-medium">
                    ✓ Thank you! We'll be in touch soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="text-red-600 text-sm text-center">
                    {errorMessage}
                  </div>
                )}
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white flex flex-col items-center justify-center"
            >
              <h3 className="text-lg font-bold text-center mb-6 tracking-widest">
                CONTACT US
              </h3>

              <div className="space-y-3">
                <a
                  href="tel:+18333990544"
                  className="flex items-center gap-2 text-sm transition-colors justify-center"
                  style={{ color: 'white' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#6db1ee'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                >
                  <Phone size={16} style={{ color: '#6db1ee' }} />
                  <span className="font-medium" style={{ color: '#6db1ee' }}>Phone:</span>
                  +1 (833) 399-0544
                </a>
                <a
                  href="https://wa.me/18333990544"
                  className="flex items-center gap-2 text-sm transition-colors justify-center"
                  style={{ color: 'white' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#6db1ee'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                >
                  <MessageCircle size={16} style={{ color: '#6db1ee' }} />
                  <span className="font-medium" style={{ color: '#6db1ee' }}>WhatsApp:</span>
                  +1 (833) 399-0544
                </a>
                <a
                  href="mailto:admin@czg-media.com"
                  className="flex items-center gap-2 text-sm transition-colors justify-center"
                  style={{ color: 'white' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#6db1ee'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                >
                  <Mail size={16} style={{ color: '#6db1ee' }} />
                  <span className="font-medium" style={{ color: '#6db1ee' }}>Email:</span>
                  admin@czg-media.com
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
