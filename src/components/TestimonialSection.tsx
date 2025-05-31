
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';

type TestimonialProps = {
  name: string;
  role: string;
  comment: string;
  gift: string;
  rating: number;
};

const testimonials: TestimonialProps[] = [
  {
    name: "Alexandra Johnson",
    role: "Marketing Director",
    comment: "Giftafy helped me find the perfect anniversary gift for my husband. The recommendations were spot-on!",
    gift: "Vintage Watch Collection",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    comment: "I was struggling to find a gift for my tech-savvy friend. Giftafy suggested items I never would have thought of.",
    gift: "Smart Home Starter Kit",
    rating: 5
  },
  {
    name: "Sophia Williams",
    role: "Teacher",
    comment: "As someone who's terrible at gift-giving, this app has been a life-saver. Highly recommend!",
    gift: "Personalized Book Subscription",
    rating: 4
  },
  {
    name: "Marcus Rodriguez",
    role: "Chef",
    comment: "The AI really understands preferences and personalities. Every gift suggestion was thoughtful and unique.",
    gift: "Artisanal Cooking Set",
    rating: 5
  },
  {
    name: "Emma Davis",
    role: "Graphic Designer",
    comment: "Giftafy takes the stress out of gift shopping. The interface is beautiful and the recommendations are perfect.",
    gift: "Limited Edition Art Prints",
    rating: 5
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialProps }) => {
  return (
    <Card className="glass-card border-white/10 h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={16} className="text-primary fill-primary mr-1" />
          ))}
        </div>
        <blockquote className="flex-grow mb-4 italic text-white/80 font-light">
          "{testimonial.comment}"
        </blockquote>
        <div className="border-t border-white/10 pt-4 mt-auto">
          <p className="font-medium text-white">{testimonial.name}</p>
          <p className="text-sm text-white/60">{testimonial.role}</p>
          <p className="text-xs mt-2 text-primary">Found: {testimonial.gift}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const TestimonialSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section id="testimonials" className="py-20">
      <div 
        ref={ref} 
        className={cn(
          "container mx-auto px-4 fade-in-section",
          inView && "is-visible"
        )}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-4">
            What Our Users Say
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            See how Giftafy has transformed the gift-giving experience for people like you.
          </p>
        </div>

        <div className="relative testimonials-carousel">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 sm:basis-1/1 md:basis-1/2 lg:basis-1/3">
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Fixed carousel navigation positioning */}
            <div className="carousel-navigation">
              <CarouselPrevious className="relative neomorphic-button border-0 shadow-none hover:bg-white/10 translate-x-0 translate-y-0" />
              <CarouselNext className="relative neomorphic-button border-0 shadow-none hover:bg-white/10 translate-x-0 translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
