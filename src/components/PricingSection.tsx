
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

type PricingTierProps = {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  recommended?: boolean;
};

const tiers: PricingTierProps[] = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for occasional gift-giving needs.",
    features: [
      "5 AI gift recommendations per month",
      "Basic personality analysis",
      "Standard gift categories",
      "Email support"
    ],
    buttonText: "Start Free",
  },
  {
    name: "Pro",
    price: "$9.99",
    description: "For frequent gift-givers and special occasions.",
    features: [
      "Unlimited AI recommendations",
      "Advanced personality analysis",
      "All gift categories and preferences",
      "Budget optimization",
      "Priority support",
      "Gift history tracking"
    ],
    buttonText: "Get Pro",
    recommended: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For businesses and corporate gifting needs.",
    features: [
      "Everything in Pro",
      "Bulk recipient management",
      "Corporate branding options",
      "Integration with CRM systems",
      "Dedicated account manager",
      "Custom gift sourcing"
    ],
    buttonText: "Contact Sales",
  }
];

const PricingTier = ({ tier }: { tier: PricingTierProps }) => {
  return (
    <div className={cn(
      "glass-card p-6 border border-white/10 rounded-lg relative transition-all duration-300",
      tier.recommended && "border-primary/50 shadow-[0_0_30px_rgba(13,255,139,0.2)]"
    )}>
      {tier.recommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-black text-xs font-semibold py-1 px-3 rounded-full">
          RECOMMENDED
        </div>
      )}
      <h3 className="text-xl font-medium mb-2">{tier.name}</h3>
      <div className="mb-4">
        <span className="text-3xl font-light">{tier.price}</span>
        {tier.price !== "Custom" && <span className="text-white/60 ml-1">/month</span>}
      </div>
      <p className="text-white/70 mb-6 text-sm">{tier.description}</p>
      <ul className="space-y-3 mb-8">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check size={18} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-white/80 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <Button className={cn(
        "neomorphic-button w-full",
        tier.recommended && "border-primary/20"
      )}>
        {tier.buttonText}
      </Button>
    </div>
  );
};

const PricingSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section id="pricing" className="py-24 bg-black/20">
      <div 
        ref={ref} 
        className={cn(
          "container mx-auto px-4 fade-in-section",
          inView && "is-visible"
        )}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Choose the plan that best fits your gift-giving needs. All plans include our core AI recommendation engine.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <PricingTier key={index} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
