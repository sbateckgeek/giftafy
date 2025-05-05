
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the AI gift recommendation work?",
    answer: "Our AI analyzes information you provide about the gift recipient, including their interests, personality traits, and the occasion. It then searches through our database of thousands of gift ideas to find matches that align with the recipient's profile."
  },
  {
    question: "How accurate are the gift recommendations?",
    answer: "The accuracy of our recommendations depends on the quality of information you provide. Most users report high satisfaction rates with our suggestions, especially after using the app a few times as the AI learns from your feedback."
  },
  {
    question: "Can I use Giftafy for corporate gifting?",
    answer: "Absolutely! Our Enterprise plan is specifically designed for corporate gifting needs, allowing you to manage multiple recipients, maintain gift history, and ensure consistent gifting quality across your organization."
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, we take data privacy very seriously. All personal information is encrypted and stored securely. We never sell your data to third parties and only use it to improve your gift recommendations."
  },
  {
    question: "Can I return gifts purchased through Giftafy?",
    answer: "Giftafy provides recommendations and links to retailers. Returns and exchanges are subject to each retailer's policies. However, we do track user satisfaction to continually improve our recommendation algorithm."
  }
];

const FaqSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section id="faq" className="py-24">
      <div 
        ref={ref} 
        className={cn(
          "container mx-auto px-4 fade-in-section",
          inView && "is-visible"
        )}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Get answers to common questions about Giftafy and how it helps you find the perfect gift.
          </p>
        </div>

        <div className="max-w-3xl mx-auto glass-card border border-white/10 rounded-lg overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-white/10 last:border-b-0">
                <AccordionTrigger className="py-6 px-6 text-left font-normal hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-white/70">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
