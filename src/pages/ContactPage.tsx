
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactInfo = ({ icon: Icon, title, content }: { icon: any, title: string, content: React.ReactNode }) => {
  return (
    <div className="flex items-start mb-8">
      <div className="mr-4">
        <div className="bg-gradient-to-br from-black/40 to-black/60 p-3 rounded-full flex items-center justify-center border border-white/10">
          <Icon size={20} className="text-primary" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <div className="text-white/70 font-light">{content}</div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent",
        description: "Thanks for reaching out! We'll get back to you soon.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />

      <main className="pt-20">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter mb-8">
                Get In Touch
              </h1>
              <p className="text-lg text-white/70 mb-8">
                Have questions about Giftafy? We'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        <section 
          ref={ref} 
          className={cn(
            "py-16 fade-in-section",
            inView && "is-visible"
          )}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-light mb-8">Contact Information</h2>
                
                <ContactInfo 
                  icon={Mail} 
                  title="Email Us" 
                  content={<a href="mailto:hello@giftafy.com" className="hover:text-primary">hello@giftafy.com</a>}
                />
                
                <ContactInfo 
                  icon={Phone} 
                  title="Call Us" 
                  content={<a href="tel:+11234567890" className="hover:text-primary">+1 (123) 456-7890</a>}
                />
                
                <ContactInfo 
                  icon={MapPin} 
                  title="Visit Us" 
                  content={
                    <address className="not-italic">
                      Giftafy Headquarters<br />
                      123 Innovation Drive<br />
                      San Francisco, CA 94107
                    </address>
                  }
                />
                
                <div className="glass-card p-6 border border-white/10 rounded-lg mt-12">
                  <h3 className="text-lg font-medium mb-4">Office Hours</h3>
                  <p className="text-white/70 mb-2">Monday - Friday: 9am - 6pm PST</p>
                  <p className="text-white/70">Saturday - Sunday: Closed</p>
                </div>
              </div>
              
              <div>
                <div className="glass-card p-8 border border-white/10 rounded-lg">
                  <h2 className="text-2xl font-light mb-6">Send a Message</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-white/70 mb-2">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="min-h-32 bg-white/5 border-white/10"
                        />
                      </div>
                      
                      <Button type="submit" className="neomorphic-button w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
