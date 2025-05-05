
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Calendar, User, Clock } from 'lucide-react';

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readingTime: string;
  image: string;
  category: string;
};

const blogPosts: BlogPost[] = [
  {
    id: "ai-revolution-gift-giving",
    title: "How AI is Revolutionizing the Art of Gift-Giving",
    excerpt: "Explore how artificial intelligence is transforming the way we choose gifts for our loved ones, making the process more personalized and meaningful.",
    date: "May 2, 2025",
    author: "Sophia Chen",
    readingTime: "5 min read",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80&w=2000",
    category: "AI Technology"
  },
  {
    id: "psychology-perfect-gift",
    title: "The Psychology Behind the Perfect Gift",
    excerpt: "Understanding the emotional and psychological impact of gift-giving and how it strengthens relationships and creates lasting memories.",
    date: "April 28, 2025",
    author: "Marcus Taylor",
    readingTime: "7 min read",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=2000",
    category: "Gift Psychology"
  },
  {
    id: "sustainable-gifting",
    title: "Sustainable Gifting: Thoughtful Presents for a Greener Future",
    excerpt: "Discover how to make your gift-giving more environmentally friendly without sacrificing thoughtfulness or quality.",
    date: "April 21, 2025",
    author: "Elena Rodriguez",
    readingTime: "6 min read",
    image: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&q=80&w=2000",
    category: "Sustainability"
  },
  {
    id: "personalization-era",
    title: "The Personalization Era: Why One-Size-Fits-All Gifts Are History",
    excerpt: "Learn why personalized gifts are becoming the new standard and how AI can help you find the perfect tailored present every time.",
    date: "April 15, 2025",
    author: "David Kim",
    readingTime: "4 min read",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80&w=2000",
    category: "Personalization"
  }
];

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <div className="glass-card border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_5px_30px_rgba(13,255,139,0.15)]">
      <Link to={`/blog/${post.id}`}>
        <div className="relative h-52 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-primary/80 text-black text-xs font-semibold py-1 px-2 rounded-full backdrop-blur-sm">
              {post.category}
            </span>
          </div>
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-center text-white/50 text-xs mb-3 gap-4">
          <div className="flex items-center">
            <Calendar size={12} className="mr-1" />
            {post.date}
          </div>
          <div className="flex items-center">
            <User size={12} className="mr-1" />
            {post.author}
          </div>
          <div className="flex items-center">
            <Clock size={12} className="mr-1" />
            {post.readingTime}
          </div>
        </div>
        <Link to={`/blog/${post.id}`}>
          <h3 className="text-xl mb-3 font-medium hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="text-white/70 mb-4 text-sm">
          {post.excerpt}
        </p>
        <Link to={`/blog/${post.id}`}>
          <Button variant="link" className="p-0 text-primary hover:text-primary/80">
            Read More
          </Button>
        </Link>
      </div>
    </div>
  );
};

const BlogPage = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />

      <main className="pt-20">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter mb-8">
                Giftafy Blog
              </h1>
              <p className="text-lg text-white/70 mb-8">
                Insights and inspiration to help you master the art of gift-giving
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
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-white/70 mb-4">
                Looking for more gift-giving insights?
              </p>
              <Button className="neomorphic-button">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
