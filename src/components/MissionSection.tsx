
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const MissionSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section className="py-24">
      <div 
        ref={ref} 
        className={cn(
          "container mx-auto px-4 fade-in-section",
          inView && "is-visible"
        )}
      >
        <div className="glass-card p-8 md:p-12 border border-white/10 rounded-lg max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-8">
              Our Mission
            </h2>
            <p className="text-white/80 text-lg font-light leading-relaxed mb-6">
              At Giftafy, we believe that the perfect gift has the power to strengthen relationships and create lasting memories. Our mission is to eliminate the stress and guesswork from gift-giving by harnessing the power of artificial intelligence.
            </p>
            <p className="text-white/80 text-lg font-light leading-relaxed">
              We're committed to helping people find thoughtful, personalized gifts that truly reflect the personalities and preferences of their recipients, making every celebration more meaningful and joyful.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
