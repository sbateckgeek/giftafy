
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const FeaturedInSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const logos = [
    { name: 'TechCrunch', logo: '⨁' },
    { name: 'Forbes', logo: '⨁' },
    { name: 'Business Insider', logo: '⨁' },
    { name: 'Wired', logo: '⨁' },
    { name: 'Fast Company', logo: '⨁' },
  ];

  return (
    <section className="py-16 bg-black/20">
      <div 
        ref={ref} 
        className={cn(
          "container mx-auto px-4 text-center fade-in-section",
          inView && "is-visible"
        )}
      >
        <p className="text-white/50 uppercase tracking-wider mb-8 text-sm">Featured in</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {logos.map((item, index) => (
            <div key={index} className="text-white/30 hover:text-white/60 transition-all duration-300">
              <p className="text-xl font-light">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedInSection;
