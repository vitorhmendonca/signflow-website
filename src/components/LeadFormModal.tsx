import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface LeadFormModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export const LeadFormModal = ({ isOpen, onOpenChange }: LeadFormModalProps) => {
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
                    source: 'blog-popup',
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
                // Optional: Close modal after success?
                // setTimeout(() => onOpenChange(false), 2000);
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
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-white p-6 rounded-xl shadow-2xl">
                <p className="text-muted-foreground text-center text-sm mb-5 font-medium">Quick Zoom Chat</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="text"
                        placeholder="First Name*"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="bg-transparent border-0 border-b border-gray-300 rounded-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-primary text-sm h-10 px-0"
                        required
                    />
                    <Input
                        type="email"
                        placeholder="Email*"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-transparent border-0 border-b border-gray-300 rounded-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-primary text-sm h-10 px-0"
                        required
                    />
                    <Input
                        type="tel"
                        placeholder="Phone*"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-transparent border-0 border-b border-gray-300 rounded-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-primary text-sm h-10 px-0"
                        required
                    />
                    <Textarea
                        placeholder="Preferred time or another comment*"
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        className="bg-transparent border-0 border-b border-gray-300 rounded-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-primary resize-none text-sm px-0"
                        rows={2}
                        required
                    />

                    <div className="flex items-start gap-3">
                        <Checkbox
                            id="terms-modal"
                            checked={formData.agreed}
                            onCheckedChange={(checked) => setFormData({ ...formData, agreed: checked as boolean })}
                            className="border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-0.5"
                        />
                        <label htmlFor="terms-modal" className="text-muted-foreground text-xs leading-relaxed">
                            I agree to <Link to="/terms" className="text-primary underline" onClick={() => onOpenChange(false)}>terms & conditions</Link> provided by the company. By providing my phone number, I agree to receive text messages from the business.
                        </label>
                    </div>

                    <p className="text-muted-foreground/60 text-[10px] text-center">
                        * No annoying follow-up calls/texts
                    </p>

                    <Button variant="default" size="default" className="w-full hover:bg-primary/90 mt-2" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>

                    {submitStatus === 'success' && (
                        <div className="text-green-600 text-sm text-center font-medium mt-2">
                            ✓ Thank you! We'll be in touch soon.
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="text-red-600 text-sm text-center mt-2">
                            {errorMessage}
                        </div>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
};
