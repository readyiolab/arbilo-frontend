
import { useParams, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { 
  Calendar, Clock, User, Heart, MessageCircle, Share2, ArrowLeft, Tag, Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';

export default function BlogDetail() {
  const { slug } = useParams();
  const location = useLocation();

  // Example blog post data with slugs and comments
  const blogPosts = [
    {
      id: 1,
      slug: '10-essential-nutrients-your-body-needs-daily',
      title: "10 Essential Nutrients Your Body Needs Daily",
      excerpt: "Discover the vital nutrients your body requires for optimal health and learn how to incorporate them into your daily diet.",
      content: (
        <>
          <p className="mb-4">Your body requires a variety of nutrients to function at its best. These include macronutrients like carbohydrates, proteins, and fats, as well as micronutrients such as vitamins and minerals. In this article, we dive deep into the top 10 essential nutrients, their benefits, and how to incorporate them into your daily diet.</p>
          <h3 className="text-xl font-semibold mb-2">1. Vitamin C</h3>
          <p className="mb-4">Known for its immune-boosting properties, vitamin C is found in citrus fruits, bell peppers, and broccoli. It also aids in collagen production for healthy skin.</p>
          <blockquote className="border-l-4 border-teal-500 pl-4 italic text-gray-600 mb-4">
            "A diet rich in vitamin C can reduce the duration of colds by up to 8%." — Health Journal
          </blockquote>
          <h3 className="text-xl font-semibold mb-2">2. Omega-3 Fatty Acids</h3>
          <p className="mb-4">These healthy fats, found in salmon, walnuts, and flaxseeds, support heart health and reduce inflammation. Aim for at least two servings of fatty fish per week.</p>
          <p className="mb-4">By prioritizing these nutrients, you can enhance your overall wellbeing and prevent deficiencies. Check out our downloadable meal plan for practical tips!</p>
        </>
      ),
      category: "wellness",
      image: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGVhbHRofGVufDB8fDB8fHww",
      author: "Dr. Sarah Johnson",
      authorBio: "Dr. Sarah Johnson is a nutritionist with over 15 years of experience in dietary health.",
      date: "May 2, 2025",
      readTime: "8 min read",
      tags: ["Nutrition", "Health", "Wellness"],
      featured: true,
      likes: 124,
      comments: 32,
      commentList: [
        { id: 1, author: "Jane Doe", text: "Great article! I learned a lot about vitamin C.", date: "May 3, 2025" },
        { id: 2, author: "John Smith", text: "Thanks for the meal plan suggestion!", date: "May 4, 2025" }
      ]
    },
    {
      id: 2,
      slug: 'the-science-behind-anti-aging-skincare',
      title: "The Science Behind Anti-Aging Skincare",
      excerpt: "Explore the cutting-edge research and ingredients that are revolutionizing the way we approach skin health and aging.",
      content: (
        <>
          <p className="mb-4">Anti-aging skincare has transformed with advancements in dermatology. Ingredients like retinol, hyaluronic acid, and peptides are leading the charge. This article explores their science and how to build an effective routine.</p>
          <h3 className="text-xl font-semibold mb-2">Retinol: The Gold Standard</h3>
          <p className="mb-4">Retinol, a vitamin A derivative, boosts cell turnover to reduce wrinkles. Start with a low concentration to avoid irritation.</p>
          <h3 className="text-xl font-semibold mb-2">Hyaluronic Acid</h3>
          <p className="mb-4">This moisture-retaining molecule keeps skin plump and hydrated. Apply it on damp skin for maximum benefits.</p>
          <blockquote className="border-l-4 border-teal-500 pl-4 italic text-gray-600 mb-4">
            "Consistent skincare can delay visible aging by up to 5 years." — Dermatology Today
          </blockquote>
          <p className="mb-4">Combine these ingredients with sunscreen for a comprehensive anti-aging strategy. Stay tuned for our skincare quiz!</p>
        </>
      ),
      category: "beauty",
      image: "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGVhbHRofGVufDB8fDB8fHww",
      author: "Emma Rodriguez",
      authorBio: "Emma Rodriguez is a skincare expert and beauty columnist.",
      date: "April 28, 2025",
      readTime: "6 min read",
      tags: ["Skincare", "Beauty", "Anti-aging"],
      featured: true,
      likes: 98,
      comments: 17,
      commentList: [
        { id: 1, author: "Alice Brown", text: "Retinol really works wonders!", date: "April 29, 2025" }
      ]
    },
    {
      id: 3,
      slug: 'natural-ways-to-boost-your-immune-system',
      title: "Natural Ways to Boost Your Immune System",
      excerpt: "Learn effective, science-backed methods to strengthen your body's natural defenses against illness.",
      content: (
        <>
          <p className="mb-4">A robust immune system is your body's first line of defense. This article covers natural ways to enhance immunity through diet, exercise, and lifestyle changes.</p>
          <h3 className="text-xl font-semibold mb-2">Nutrition for Immunity</h3>
          <p className="mb-4">Foods rich in vitamin C (oranges, strawberries) and zinc (nuts, seeds) are key. Probiotics from yogurt also support gut health, which is linked to immunity.</p>
          <h3 className="text-xl font-semibold mb-2">Exercise and Sleep</h3>
          <p className="mb-4">Moderate exercise and 7-8 hours of sleep nightly boost immune function. Avoid overtraining, which can suppress immunity.</p>
          <blockquote className="border-l-4 border-teal-500 pl-4 italic text-gray-600 mb-4">
            "Sleep deprivation can reduce immune response by 30%." — Health Studies
          </blockquote>
          <p className="mb-4">Implement these strategies to stay healthy year-round. Download our immunity checklist for more tips!</p>
        </>
      ),
      category: "wellness",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhlYWx0aHxlbnwwfHwwfHx8MA%3D%3D",
      author: "Dr. Michael Chen",
      authorBio: "Dr. Michael Chen is an immunologist specializing in natural health solutions.",
      date: "April 25, 2025",
      readTime: "5 min read",
      tags: ["Immunity", "Natural Health", "Wellness"],
      featured: false,
      likes: 86,
      comments: 14,
      commentList: []
    },
    {
      id: 4,
      slug: 'creating-a-healthier-home-environment',
      title: "Creating a Healthier Home Environment",
      excerpt: "Simple changes you can make to reduce toxins and create a healthier living space for you and your family.",
      content: (
        <>
          <p className="mb-4">Your home environment impacts your health more than you might think. This article shares practical steps to reduce toxins and create a safer space.</p>
          <h3 className="text-xl font-semibold mb-2">Non-Toxic Cleaning</h3>
          <p className="mb-4">Switch to natural cleaning products like vinegar and baking soda to avoid harmful chemicals. They’re effective and budget-friendly.</p>
          <h3 className="text-xl font-semibold mb-2">Indoor Plants</h3>
          <p className="mb-4">Plants like peace lilies and snake plants purify the air, removing toxins like formaldehyde.</p>
          <blockquote className="border-l-4 border-teal-500 pl-4 italic text-gray-600 mb-4">
            "Indoor air can be 2-5 times more polluted than outdoor air." — EPA
          </blockquote>
          <p className="mb-4">Start with these changes to create a healthier home. Explore our guide for more ideas!</p>
        </>
      ),
      category: "lifestyle",
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhlYWx0aHxlbnwwfHwwfHx8MA%3D%3D",
      author: "Jessica Wang",
      authorBio: "Jessica Wang is a lifestyle coach focused on sustainable living.",
      date: "April 20, 2025",
      readTime: "7 min read",
      tags: ["Home", "Clean Living", "Lifestyle"],
      featured: false,
      likes: 73,
      comments: 21,
      commentList: [
        { id: 1, author: "Emily Davis", text: "Love the indoor plant idea!", date: "April 21, 2025" }
      ]
    },
    {
      id: 5,
      slug: 'traditional-herbal-remedies-for-modern-life',
      title: "Traditional Herbal Remedies for Modern Life",
      excerpt: "How ancient herbal wisdom can address contemporary health challenges and support overall wellbeing.",
      content: (
        <>
          <p className="mb-4">Herbal remedies offer time-tested solutions for modern health issues. This article explores how to use herbs like turmeric, ginger, and echinacea effectively.</p>
          <h3 className="text-xl font-semibold mb-2">Turmeric for Inflammation</h3>
          <p className="mb-4">Curcumin in turmeric reduces inflammation and supports joint health. Add it to curries or take as a supplement.</p>
          <h3 className="text-xl font-semibold mb-2">Ginger for Digestion</h3>
          <p className="mb-4">Ginger soothes nausea and aids digestion. Brew it as a tea for quick relief.</p>
          <blockquote className="border-l-4 border-teal-500 pl-4 italic text-gray-600 mb-4">
            "Herbal remedies are used by 80% of the world’s population." — WHO
          </blockquote>
          <p className="mb-4">Always consult a healthcare provider before starting herbal treatments. Try our herbal recipe book for more!</p>
        </>
      ),
      category: "herbal",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhlYWx0aHxlbnwwfHwwfHx8MA%3D%3D",
      author: "Thomas Green",
      authorBio: "Thomas Green is an herbalist with a passion for natural remedies.",
      date: "April 15, 2025",
      readTime: "9 min read",
      tags: ["Herbal", "Traditional Medicine", "Natural Remedies"],
      featured: false,
      likes: 65,
      comments: 18,
      commentList: []
    },
    {
      id: 6,
      slug: 'the-connection-between-gut-health-and-mental-wellbeing',
      title: "The Connection Between Gut Health and Mental Wellbeing",
      excerpt: "New research reveals the profound impact your digestive system has on your mental health and emotional balance.",
      content: (
        <>
          <p className="mb-4">The gut-brain axis links your digestive system to mental health. This article explores how to optimize gut health for better mood and cognition.</p>
          <h3 className="text-xl font-semibold mb-2">The Microbiome</h3>
          <p className="mb-4">Your gut microbiome influences neurotransmitter production. A diverse microbiome supports serotonin and dopamine levels.</p>
          <h3 className="text-xl font-semibold mb-2">Diet and Probiotics</h3>
          <p className="mb-4">Eat fiber-rich foods and fermented products like kefir to nurture gut bacteria. Probiotic supplements can also help.</p>
          <blockquote className="border-l-4 border-teal-500 pl-4 italic text-gray-600 mb-4">
            "90% of serotonin is produced in the gut." — Neuroscience Research
          </blockquote>
          <p className="mb-4">Adopt these habits to boost both gut and mental health. Get our gut health guide for more!</p>
        </>
      ),
      category: "wellness",
      image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhlYWx0aHxlbnwwfHwwfHx8MA%3D%3D",
      author: "Dr. Laura Smith",
      authorBio: "Dr. Laura Smith is a neuroscientist studying the gut-brain connection.",
      date: "April 10, 2025",
      readTime: "10 min read",
      tags: ["Gut Health", "Mental Health", "Wellness"],
      featured: false,
      likes: 112,
      comments: 43,
      commentList: [
        { id: 1, author: "Michael Lee", text: "The gut-brain axis is fascinating!", date: "April 11, 2025" }
      ]
    }
  ];

  // Find the blog post by slug
  const post = blogPosts.find(p => p.slug === slug);

  // Get related posts (same category, excluding current post, max 3)
  const relatedPosts = blogPosts
    .filter(p => p.category === post?.category && p.slug !== post?.slug)
    .slice(0, 3);

  // Get category color class
  const getCategoryColor = (category) => {
    switch(category) {
      case 'wellness': return { bg: 'bg-green-100', text: 'text-green-700' };
      case 'beauty': return { bg: 'bg-pink-100', text: 'text-pink-700' };
      case 'lifestyle': return { bg: 'bg-blue-100', text: 'text-blue-700' };
      case 'herbal': return { bg: 'bg-lime-100', text: 'text-lime-700' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700' };
    }
  };

  // Scroll to top on slug change or to comment section if specified
  useEffect(() => {
    if (location.state?.scrollToComments) {
      setTimeout(() => {
        const commentSection = document.getElementById('comment-section');
        if (commentSection) {
          window.scrollTo({
            top: commentSection.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }, 200);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [slug, location]);

  // Handle share button click
  const handleShareClick = async () => {
    const shareUrl = `${window.location.origin}/blog/${post.slug}`;
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard!', {
          style: {
            background: '#fff',
            color: '#333',
            border: '1px solid #e5e7eb',
          },
        });
      }
    } catch (error) {
      toast.error('Failed to share. Please try again.', {
        style: {
          background: '#fff',
          color: '#333',
          border: '1px solid #e5e7eb',
        },
      });
    }
  };

  if (!post) {
    return (
      <section className="py-12 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Blog Post Not Found</h2>
        <Button asChild variant="link" className="mt-4 text-teal-600 hover:text-teal-700 text-lg">
          <Link to="/blog-section">Back to Blog</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50 relative overflow-hidden" id="blog-section">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-teal-50 opacity-40 blur-3xl" />
        <div className="absolute bottom-16 -left-16 w-64 h-64 rounded-full bg-purple-50 opacity-40 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6 text-teal-600 hover:text-teal-700 text-base animate-slide-in">
          <Link to="/blog-section">
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to Blog
          </Link>
        </Button>

        {/* Blog Post Hero */}
        <div className="relative mb-8 animate-slide-in">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-80 sm:h-96 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <span className={`inline-block ${getCategoryColor(post.category).bg} ${getCategoryColor(post.category).text} text-sm font-medium py-1 px-3 rounded-full mb-2`}>
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">{post.title}</h1>
          </div>
        </div>

        {/* Main Content and Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Main Content */}
          <div className="lg:col-span-2 animate-slide-in">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </div>
            </div>
            <div className="prose prose-sm sm:prose-base prose-teal max-w-none">
              {post.content}
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 py-1 px-3 rounded-full"
                >
                  <Tag className="h-4 w-4" />
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
              <Button variant="ghost" className="text-gray-400 hover:text-red-500">
                <Heart className="h-5 w-5 mr-1" /> {post.likes}
              </Button>
              <Button variant="ghost" className="text-gray-400 hover:text-blue-500">
                <MessageCircle className="h-5 w-5 mr-1" /> {post.comments}
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-400 hover:text-green-500"
                onClick={handleShareClick}
              >
                <Share2 className="h-5 w-5 mr-1" /> Share
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="animate-slide-in">
            <div className="bg-white border border-gray-100 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Author</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{post.author}</p>
                  <p className="text-xs text-gray-600">{post.authorBio}</p>
                </div>
              </div>
            </div>
            <div id="comment-section" className="bg-white border border-gray-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave a Comment</h3>
              <form className="space-y-4 mb-6">
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="h-10 text-base"
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="h-10 text-base"
                />
                <Textarea
                  placeholder="Your Comment"
                  className="h-24 text-base"
                />
                <Button className="bg-teal-600 hover:bg-teal-700 h-10 text-base">
                  Submit <Send className="h-4 w-4 ml-1" />
                </Button>
              </form>
              <p className="text-xs text-gray-500 mb-6">Comments are moderated and will appear after approval.</p>
              
              {/* Comments List */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Comments ({post.commentList.length})
                </h3>
                {post.commentList.length > 0 ? (
                  <div className="space-y-4">
                    {post.commentList.map((comment) => (
                      <div key={comment.id} className="border-t border-gray-200 pt-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                            <User className="h-4 w-4 text-teal-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{comment.author}</p>
                            <p className="text-xs text-gray-500">{comment.date}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">No comments yet. Be the first to comment!</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mb-10 animate-slide-in">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Explore More Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div 
                  key={relatedPost.id} 
                  className="group**.jsx
                  group bg-white border border-gray-100 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                >
                  <Link to={`/blog/${relatedPost.slug}`} className="block">
                    <div className="relative">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className={`absolute top-3 left-3 ${getCategoryColor(relatedPost.category).bg} ${getCategoryColor(relatedPost.category).text} text-xs font-medium py-1 px-2 rounded-full`}>
                        {relatedPost.category.charAt(0).toUpperCase() + relatedPost.category.slice(1)}
                      </span>
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}
