
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

type BlogPost = {
  id: string;
  title: string;
  content: React.ReactNode;
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
    category: "AI Technology",
    content: (
      <>
        <p className="mb-6">
          Gift-giving has always been an art form that combines understanding, empathy, and creativity. It's about knowing the recipient well enough to select something that resonates with their personality, interests, and needs. But even for those who know their loved ones intimately, finding that perfect gift can be challenging. This is where artificial intelligence is making a remarkable difference.
        </p>
        <h2 className="text-2xl font-medium mb-4 mt-8">Understanding Preferences Through Data</h2>
        <p className="mb-6">
          AI-powered gift recommendation systems like Giftafy can analyze vast amounts of data about a person's interests, previous gifts they've enjoyed, their hobbies, and even their social media activity to identify patterns and preferences that might not be immediately obvious.
        </p>
        <p className="mb-6">
          While a friend or family member might know that someone enjoys cooking, an AI system can identify specific cooking styles, equipment gaps, or ingredients that would perfectly complement their culinary journey. This deeper level of understanding comes from processing more information than a human typically could.
        </p>
        <h2 className="text-2xl font-medium mb-4 mt-8">Personalization at Scale</h2>
        <p className="mb-6">
          One of the most significant advantages of AI in gift-giving is the ability to provide highly personalized recommendations at scale. Whether you're buying for one person or twenty, AI can deliver the same level of thoughtfulness and personalization for each recipient.
        </p>
        <p className="mb-6">
          This is particularly valuable during holidays when many people struggle to find unique gifts for multiple family members and friends. AI can help ensure that each person receives something tailored to their individual tastes and needs.
        </p>
        <h2 className="text-2xl font-medium mb-4 mt-8">Reducing Gift-Giving Anxiety</h2>
        <p className="mb-6">
          For many people, choosing gifts creates significant stress and anxiety. Will the recipient like it? Is it appropriate for the occasion? Does it convey the right message? AI helps alleviate this anxiety by providing data-backed recommendations with high probabilities of success.
        </p>
        <p className="mb-6">
          By taking the guesswork out of gift selection, AI allows givers to approach the process with confidence rather than apprehension, making the entire experience more enjoyable for everyone involved.
        </p>
        <h2 className="text-2xl font-medium mb-4 mt-8">Discovering Unique Items</h2>
        <p className="mb-6">
          AI gift recommendation algorithms can search through millions of products to find unique items that perfectly match a recipient's taste. These might be products from small businesses or artisans that would be difficult to discover through conventional shopping methods.
        </p>
        <p className="mb-6">
          This capability not only leads to more distinctive and memorable gifts but also helps support independent creators and retailers who might otherwise struggle to reach customers.
        </p>
        <h2 className="text-2xl font-medium mb-4 mt-8">The Future of AI-Powered Gifting</h2>
        <p className="mb-6">
          As AI technology continues to evolve, we can expect even more sophisticated gift recommendation systems. These might incorporate emotional intelligence to gauge the current relationship dynamics between giver and recipient, or use predictive analytics to recommend gifts for future occasions based on evolving interests.
        </p>
        <p className="mb-6">
          The ultimate goal is to make every gift exchange a meaningful moment that strengthens connections between people. By handling the complex analysis required for perfect gift selection, AI frees humans to focus on the emotional aspects of giving—the presentation, the personal message, and the shared joy of the moment.
        </p>
        <p className="mb-6">
          While the technology behind these recommendations is complex, the outcome is simple: better gifts, happier recipients, and stronger relationships. And that's something worth celebrating.
        </p>
      </>
    )
  },
  {
    id: "psychology-perfect-gift",
    title: "The Psychology Behind the Perfect Gift",
    excerpt: "Understanding the emotional and psychological impact of gift-giving and how it strengthens relationships and creates lasting memories.",
    date: "April 28, 2025",
    author: "Marcus Taylor",
    readingTime: "7 min read",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=2000",
    category: "Gift Psychology",
    content: (
      <>
        <p className="mb-6">
          Gift-giving is far more than a simple exchange of objects. It's a complex psychological and emotional transaction that carries meaning, strengthens bonds, and communicates care in ways that words often cannot. Understanding the psychology behind gift-giving can help us make more thoughtful choices and appreciate the deeper significance of this universal practice.
        </p>
        <h2 className="text-2xl font-medium mb-4 mt-8">The Psychology of Giving</h2>
        <p className="mb-6">
          Research has consistently shown that giving gifts activates the reward centers in our brains, often producing more pleasure than receiving gifts. This phenomenon, sometimes called the "helper's high," demonstrates that generosity and altruism are hardwired into our neural circuitry.
        </p>
        <p className="mb-6">
          When we give thoughtful gifts, we experience increased levels of dopamine and oxytocin—neurotransmitters associated with pleasure, happiness, and bonding. This chemical reaction explains why giving often feels so satisfying and why cultures worldwide have incorporated gift exchange into their most important rituals and celebrations.
        </p>
        <h2 className="text-2xl font-medium mb-4 mt-8">What Makes a Gift "Perfect"?</h2>
        <p className="mb-6">
          Psychologically speaking, the perfect gift achieves several outcomes simultaneously:
        </p>
        <ul className="list-disc pl-6 mb-6 text-white/70">
          <li className="mb-2">It demonstrates understanding of the recipient's identity, values, and needs</li>
          <li className="mb-2">It creates or reinforces emotional connection</li>
          <li className="mb-2">It provides lasting utility or emotional value</li>
          <li>It surprises or delights in an authentic way</li>
        </ul>
        <p className="mb-6">
          Interestingly, research suggests that the monetary value of a gift has relatively little impact on how much it's appreciated. Far more important is how well the gift reflects the giver's understanding of the recipient—what psychologists call "empathic accuracy."
        </p>
        <h2 className="text-2xl font-medium mb-4 mt-8">Gift-Giving as Communication</h2>
        <p className="mb-6">
          Gifts function as a form of non-verbal communication, often expressing sentiments that might be difficult to articulate directly. This is particularly true in cultures or relationships where emotional expression is more reserved.
        </p>
        <p className="mb-6">
          A carefully chosen gift can say "I understand you," "I value our relationship," or "I see your challenges and want to help"—all without speaking a word. This symbolic function of gifts explains why we often feel pressure to find "just the right thing"; we intuitively understand that our selection communicates our perception of the relationship.
        </p>
        <h2 className="text-2xl font-medium mb-4 mt-8">The Memory Value of Experiences vs. Objects</h2>
        <p className="mb-6">
          Psychological research has found that experiential gifts (concerts, travel, classes) often create more lasting happiness than material objects. This is because experiences become part of our identity and life narrative, while adaptation diminishes our appreciation of material possessions over time.
        </p>
        <p className="mb-6">
          Additionally, shared experiences strengthen relationship bonds through co-created memories. When we experience something enjoyable together, we associate those positive feelings with the person who shared the experience, deepening our connection to them.
        </p>
        <h2 className="text-2xl font-medium mb-4 mt-8">Cultural and Social Dimensions</h2>
        <p className="mb-6">
          Gift-giving practices vary widely across cultures, but their psychological importance is universal. In some societies, gifts establish or reinforce social hierarchies; in others, they equalize relationships through reciprocity. Understanding these cultural dimensions helps us navigate the social meaning of gifts in diverse contexts.
        </p>
        <p className="mb-6">
          Even within a single culture, gift exchanges carry different psychological weight depending on the relationship and occasion. A birthday gift for a close friend operates under different emotional rules than a hostess gift or a professional thank-you present.
        </p>
        <h2 className="text-2xl font-medium mb-4 mt-8">The Future of Meaningful Gift-Giving</h2>
        <p className="mb-6">
          As we move toward more technologically mediated relationships, understanding the psychology of gifting becomes increasingly important. Digital gifts, subscription services, and AI-recommended presents are changing how we exchange tokens of affection and appreciation.
        </p>
        <p className="mb-6">
          The most successful of these innovations will be those that preserve the core psychological functions of gift-giving: demonstrating understanding, creating connection, and providing lasting value. Technologies that help us become more empathically accurate—better at seeing the world from the recipient's perspective—will enhance rather than diminish the emotional impact of our gifts.
        </p>
        <p className="mb-6">
          By understanding the psychology behind gifting, we can make choices that truly resonate with recipients and fulfill the deeper purpose of this ancient human practice: building and sustaining the relationships that give our lives meaning.
        </p>
      </>
    )
  },
  {
    id: "sustainable-gifting",
    title: "Sustainable Gifting: Thoughtful Presents for a Greener Future",
    excerpt: "Discover how to make your gift-giving more environmentally friendly without sacrificing thoughtfulness or quality.",
    date: "April 21, 2025",
    author: "Elena Rodriguez",
    readingTime: "6 min read",
    image: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&q=80&w=2000",
    category: "Sustainability",
    content: (
      <>
        <p className="mb-6">
          As environmental awareness grows, more people are seeking ways to celebrate special occasions and show appreciation while minimizing their ecological footprint. Sustainable gifting represents a thoughtful approach to present-giving that considers not just the recipient's preferences but also the planet's wellbeing.
        </p>
        <h2 className="text-2xl font-medium mb-4 mt-8">Why Sustainable Gifting Matters</h2>
        <p className="mb-6">
          The environmental impact of traditional gifting is substantial. From resource extraction for production to packaging waste, transportation emissions, and eventually disposal, conventional gifts can carry a significant carbon footprint. Consider these statistics:
        </p>
        <ul className="list-disc pl-6 mb-6 text-white/70">
          <li className="mb-2">Americans discard an additional 25% more waste during the holiday season</li>
          <li className="mb-2">An estimated 114,000 tons of plastic packaging is thrown away during Christmas in the UK alone</li>
          <li>Many gifts end up unused or quickly discarded, representing wasted resources</li>
        </ul>
        <p className="mb-6">
          Sustainable gifting offers an alternative that maintains the joy and thoughtfulness of gift-giving while reducing these negative impacts.
        </p>
        <h2 className="text-2xl font-medium mb-4 mt-8">Principles of Sustainable Gifting</h2>
        <p className="mb-6">
          Truly sustainable gifts embody several core principles:
        </p>
        <h3 className="text-xl font-medium mb-3 mt-6">Longevity</h3>
        <p className="mb-6">
          Sustainable gifts are designed to last, avoiding the "disposable" mentality that contributes to overflowing landfills. This might mean choosing higher-quality items made with durable materials and timeless design, or selecting items specifically designed for repair and maintenance over time.
        </p>
        <h3 className="text-xl font-medium mb-3 mt-6">Ethical Production</h3>
        <p className="mb-6">
          Considering how products are made—including labor conditions, fair compensation, and resource extraction practices—ensures that your gift doesn't come at the expense of people or ecosystems elsewhere. Look for fair trade certifications and transparent supply chains.
        </p>
        <h3 className="text-xl font-medium mb-3 mt-6">Material Consciousness</h3>
        <p className="mb-6">
          Sustainable gifts are made from materials that have minimal environmental impact. This might include renewable resources, recycled or upcycled materials, or biodegradable components that won't persist in the environment for centuries.
        </p>
        <h3 className="text-xl font-medium mb-3 mt-6">Carbon Awareness</h3>
        <p className="mb-6">
          Considering the carbon footprint of production and shipping helps minimize climate impact. Locally made items or digital gifts can significantly reduce transportation emissions.
        </p>
        <h2 className="text-2xl font-medium mb-4 mt-8">Sustainable Gift Categories</h2>
        <h3 className="text-xl font-medium mb-3 mt-6">Experience Gifts</h3>
        <p className="mb-6">
          Experiences create memories without creating waste. Consider gifting:
        </p>
        <ul className="list-disc pl-6 mb-6 text-white/70">
          <li className="mb-2">Museum or park memberships</li>
          <li className="mb-2">Classes or workshops (cooking, art, dance)</li>
          <li className="mb-2">Concert or theater tickets</li>
          <li>Outdoor adventures like kayaking or hiking guided tours</li>
        </ul>
        <h3 className="text-xl font-medium mb-3 mt-6">Consumable Gifts</h3>
        <p className="mb-6">
          Items meant to be used up leave no long-term waste. Consider:
        </p>
        <ul className="list-disc pl-6 mb-6 text-white/70">
          <li className="mb-2">Organic, locally produced foods</li>
          <li className="mb-2">Natural beauty products in minimal packaging</li>
          <li className="mb-2">Specialty teas or coffees</li>
          <li>Handmade candles or soaps from sustainable materials</li>
        </ul>
        <h3 className="text-xl font-medium mb-3 mt-6">Second-Hand Treasures</h3>
        <p className="mb-6">
          Pre-loved items extend the life of existing products and often come with unique character:
        </p>
        <ul className="list-disc pl-6 mb-6 text-white/70">
          <li className="mb-2">Vintage clothing or accessories</li>
          <li className="mb-2">Antique home goods or furniture</li>
          <li className="mb-2">Rare books or vinyl records</li>
          <li>Refurbished electronics or tools</li>
        </ul>
        <h3 className="text-xl font-medium mb-3 mt-6">Digital Gifts</h3>
        <p className="mb-6">
          Zero physical footprint options include:
        </p>
        <ul className="list-disc pl-6 mb-6 text-white/70">
          <li className="mb-2">Streaming service subscriptions</li>
          <li className="mb-2">Online courses</li>
          <li className="mb-2">E-books or audiobooks</li>
          <li>Digital art or music downloads</li>
        </ul>
        <h2 className="text-2xl font-medium mb-4 mt-8">Sustainable Packaging and Presentation</h2>
        <p className="mb-6">
          A sustainable gift wrapped in single-use plastic represents a missed opportunity. Consider these alternatives:
        </p>
        <ul className="list-disc pl-6 mb-6 text-white/70">
          <li className="mb-2">Furoshiki (Japanese fabric wrapping that becomes part of the gift)</li>
          <li className="mb-2">Recycled or seed paper that can be planted after unwrapping</li>
          <li className="mb-2">Reusable gift bags or boxes</li>
          <li>Natural decorative elements like dried flowers or herbs instead of plastic ribbons</li>
        </ul>
        <h2 className="text-2xl font-medium mb-4 mt-8">The Role of AI in Sustainable Gifting</h2>
        <p className="mb-6">
          Advanced recommendation systems like Giftafy are increasingly incorporating sustainability parameters into their algorithms. By understanding both recipient preferences and environmental priorities, AI can help identify the perfect intersection of personal relevance and planetary responsibility.
        </p>
        <p className="mb-6">
          These systems can also help givers navigate the sometimes complex world of sustainability certifications, supply chain transparency, and environmental claims, making it easier to choose gifts that truly align with both personal values and recipient preferences.
        </p>
        <h2 className="text-2xl font-medium mb-4 mt-8">The Future of Gifting</h2>
        <p className="mb-6">
          As environmental awareness continues to grow, sustainable gifting is likely to become the new normal rather than a niche practice. Manufacturers and retailers are already responding with more sustainable options, greater transparency, and innovative approaches to reducing the environmental impact of products and packaging.
        </p>
        <p className="mb-6">
          By choosing sustainable gifts today, we not only reduce our immediate environmental impact but also send a market signal that encourages continued innovation in this direction. In this way, each thoughtful sustainable gift contributes to a broader transformation toward a more environmentally responsible consumption culture.
        </p>
        <p className="mb-6">
          The most valuable gift we can give future generations is a healthy planet. Sustainable gifting allows us to maintain the joy and connection of present-giving while contributing to that essential legacy.
        </p>
      </>
    )
  },
  {
    id: "personalization-era",
    title: "The Personalization Era: Why One-Size-Fits-All Gifts Are History",
    excerpt: "Learn why personalized gifts are becoming the new standard and how AI can help you find the perfect tailored present every time.",
    date: "April 15, 2025",
    author: "David Kim",
    readingTime: "4 min read",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80&w=2000",
    category: "Personalization",
    content: (
      <>
        <p className="mb-6">
          The days of generic gift-giving are rapidly fading into history. As we move deeper into what many are calling the "Personalization Era," one-size-fits-all presents are being replaced by thoughtfully tailored gifts that reflect a genuine understanding of the recipient's unique personality, interests, and preferences.
        </p>
        <h2 className="text-2xl font-medium mb-4 mt-8">The Shift Toward Personalization</h2>
        <p className="mb-6">
          This transition isn't happening in isolation—it's part of a broader cultural shift toward personalization in every aspect of our lives. From customized entertainment recommendations to individualized health care plans, people increasingly expect experiences and products tailored specifically to them.
        </p>
        <p className="mb-6">
          Gift-giving, as one of our most meaningful social rituals, naturally follows this trend. When someone takes the time to select or create something uniquely suited to the recipient, it communicates a level of attention and care that generic presents simply cannot match.
        </p>
        <h2 className="text-2xl font-medium mb-4 mt-8">The Psychology of Personalization</h2>
        <p className="mb-6">
          Research in consumer psychology reveals why personalized gifts make such an impact. When we receive something that aligns perfectly with our identity, interests, or aspirations, it activates the brain's reward centers more powerfully than generic alternatives, regardless of monetary value.
        </p>
        <p className="mb-6">
          This effect stems from our fundamental need to feel seen and understood. A highly personalized gift signals that the giver has paid attention to who we really are—affirming our identity and strengthening our social bonds.
        </p>
        <h2 className="text-2xl font-medium mb-4 mt-8">Categories of Personalization</h2>
        <p className="mb-6">
          Modern personalized gifting extends far beyond simply adding a monogram. Consider these increasingly sophisticated approaches:
        </p>
        <h3 className="text-xl font-medium mb-3 mt-6">Interest-Based Personalization</h3>
        <p className="mb-6">
          These gifts align with the recipient's specific hobbies, passions, or collections. Examples include rare items for a collector, specialized equipment for an enthusiast, or deep-cut merchandise related to a favorite band or show.
        </p>
        <h3 className="text-xl font-medium mb-3 mt-6">Experience Personalization</h3>
        <p className="mb-6">
          Creating custom experiences tailored to someone's preferences—like a personalized city tour focusing on architecture for a design enthusiast or a custom tasting menu at a restaurant featuring someone's favorite flavors and ingredients.
        </p>
        <h3 className="text-xl font-medium mb-3 mt-6">Data-Driven Personalization</h3>
        <p className="mb-6">
          Using someone's behavioral data to identify perfect matches—such as a custom playlist based on their listening history or a subscription box curated around their past purchases and preferences.
        </p>
        <h3 className="text-xl font-medium mb-3 mt-6">Memory-Based Personalization</h3>
        <p className="mb-6">
          Gifts that commemorate shared experiences or milestones—like custom photo books, maps marking significant locations in a relationship, or jewelry incorporating birthstones from family members.
        </p>
        <h2 className="text-2xl font-medium mb-4 mt-8">AI's Role in the Personalization Revolution</h2>
        <p className="mb-6">
          Artificial intelligence is playing a pivotal role in making sophisticated personalization accessible to everyone. While knowing someone well enough to select a perfect gift has traditionally required significant time and attention, AI systems can now analyze vast amounts of information to identify patterns and preferences that might otherwise remain hidden.
        </p>
        <p className="mb-6">
          Platforms like Giftafy leverage these technologies to transform the gifting process:
        </p>
        <ul className="list-disc pl-6 mb-6 text-white/70">
          <li className="mb-2">Processing information about the recipient's interests, past reactions to gifts, and even social media activity</li>
          <li className="mb-2">Identifying subtle patterns and connections between preferences</li>
          <li className="mb-2">Accessing databases of millions of potential gifts to find perfect matches</li>
          <li>Continuously learning from feedback to improve future recommendations</li>
        </ul>
        <p className="mb-6">
          This approach combines the emotional intelligence of human gift-giving with computational power that can process more information than any individual could manage manually.
        </p>
        <h2 className="text-2xl font-medium mb-4 mt-8">The Future: Hyper-Personalization</h2>
        <p className="mb-6">
          As personalization technologies continue to advance, we're moving toward a future of "hyper-personalization"—where gifts might be:
        </p>
        <ul className="list-disc pl-6 mb-6 text-white/70">
          <li className="mb-2">Created on-demand using 3D printing or other manufacturing technologies</li>
          <li className="mb-2">Designed using generative AI to perfectly match someone's aesthetic preferences</li>
          <li className="mb-2">Adaptive over time, evolving based on the recipient's changing interests</li>
          <li>Interactive, adjusting to the recipient's usage patterns</li>
        </ul>
        <p className="mb-6">
          These developments will further heighten the emotional impact of gift-giving while making the process of finding or creating perfect gifts more accessible than ever before.
        </p>
        <h2 className="text-2xl font-medium mb-4 mt-8">Balancing Technology and Humanity</h2>
        <p className="mb-6">
          As gift personalization becomes increasingly technology-assisted, maintaining the human element remains essential. The most meaningful gifts combine technological precision with personal connection—using AI to identify possibilities but adding human touches like handwritten notes or personally significant timing.
        </p>
        <p className="mb-6">
          The ideal approach uses technology to enhance rather than replace the thoughtfulness that makes gift-giving meaningful. AI can handle the cognitive challenge of identifying perfect matches, freeing humans to focus on the emotional aspects that technology cannot replicate.
        </p>
        <h2 className="text-2xl font-medium mb-4 mt-8">Conclusion</h2>
        <p className="mb-6">
          One-size-fits-all gifts are becoming increasingly obsolete in an era where personalization is both expected and achievable. Whether assisted by AI or guided by careful observation, tailoring gifts to the specific individual demonstrates a level of care that generic presents cannot match.
        </p>
        <p className="mb-6">
          As personalization technologies continue to evolve, gift-giving will become simultaneously more individualized and more accessible—maintaining its essential role as an expression of connection while adapting to our increasingly customized world.
        </p>
      </>
    )
  }
];

const BlogPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  
  const currentPost = blogPosts.find(post => post.id === postId);
  const currentIndex = blogPosts.findIndex(post => post.id === postId);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  useEffect(() => {
    if (!currentPost) {
      navigate('/blog');
    }
    window.scrollTo(0, 0);
  }, [currentPost, navigate, postId]);

  if (!currentPost) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />

      <main className="pt-20">
        <article className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 animate-fade-in-up">
              <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
                <ChevronLeft size={16} className="mr-1" />
                Back to Blog
              </Link>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter mb-6">
                {currentPost.title}
              </h1>
              
              <div className="flex items-center text-white/60 text-sm mb-8 flex-wrap gap-4">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  {currentPost.date}
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  {currentPost.author}
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  {currentPost.readingTime}
                </div>
                <div className="bg-primary/80 text-black text-xs font-semibold py-1 px-2 rounded-full">
                  {currentPost.category}
                </div>
              </div>
              
              <div className="relative h-64 md:h-96 mb-12 glass-card p-2 rounded-lg overflow-hidden">
                <img 
                  src={currentPost.image} 
                  alt={currentPost.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
              <div className="animate-fade-in">
                {currentPost.content}
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-white/10">
              <div className="flex justify-between flex-wrap gap-4">
                {prevPost ? (
                  <Link to={`/blog/${prevPost.id}`} className="glass-card p-4 rounded-lg flex items-center">
                    <ChevronLeft size={20} className="mr-2 text-primary" />
                    <div>
                      <div className="text-sm text-white/60">Previous</div>
                      <div className="text-white hover:text-primary">{prevPost.title}</div>
                    </div>
                  </Link>
                ) : <div></div>}
                
                {nextPost && (
                  <Link to={`/blog/${nextPost.id}`} className="glass-card p-4 rounded-lg flex items-center">
                    <div className="text-right">
                      <div className="text-sm text-white/60">Next</div>
                      <div className="text-white hover:text-primary">{nextPost.title}</div>
                    </div>
                    <ChevronRight size={20} className="ml-2 text-primary" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
