
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Calendar, Clock, User, Tag, ChevronRight, 
  ArrowRight, Search, Heart, MessageCircle, Share2, Bookmark,
  ChevronLeft, Filter, TrendingUp
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  
  // Example blog post data with slugs and comments
  const blogPosts = [
    {
      id: 1,
      slug: '10-essential-nutrients-your-body-needs-daily',
      title: "10 Essential Nutrients Your Body Needs Daily",
      excerpt: "Discover the vital nutrients your body requires for optimal health and learn how to incorporate them into your daily diet.",
      category: "wellness",
      image: "/api/placeholder/800/500",
      author: "Dr. Sarah Johnson",
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
      category: "beauty",
      image: "/api/placeholder/800/500",
      author: "Emma Rodriguez",
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
      category: "wellness",
      image: "/api/placeholder/800/500",
      author: "Dr. Michael Chen",
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
      category: "lifestyle",
      image: "/api/placeholder/800/500",
      author: "Jessica Wang",
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
      category: "herbal",
      image: "/api/placeholder/800/500",
      author: "Thomas Green",
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
      category: "wellness",
      image: "/api/placeholder/800/500",
      author: "Dr. Laura Smith",
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

  // List of blog categories
  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'wellness', name: 'Wellness' },
    { id: 'beauty', name: 'Beauty' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'herbal', name: 'Herbal' }
  ];

  // Filter posts based on active category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured posts - get top 2 featured posts
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 2);

  // Get category color class
  const getCategoryColor = (category) => {
    switch(category) {
      case 'wellness': return { bg: 'bg-green-100', text: 'text-green-600' };
      case 'beauty': return { bg: 'bg-pink-100', text: 'text-pink-600' };
      case 'lifestyle': return { bg: 'bg-blue-100', text: 'text-blue-600' };
      case 'herbal': return { bg: 'bg-lime-100', text: 'text-lime-600' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-600' };
    }
  };

  // Handle comment button click
  const handleCommentClick = (slug) => {
    navigate(`/blog/${slug}`, { state: { scrollToComments: true } });
  };

  // Handle share button click
  const handleShareClick = async (post) => {
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

  return (
    <section id="blog-section" className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-orange-50 opacity-60 blur-3xl" />
        <div className="absolute bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-50 opacity-60 blur-3xl" />
      </div>
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-full mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-2 rounded-full">
              <BookOpen className="h-6 w-6" />
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Health & Wellness Blog</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-6"></div>
          
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
            Insights, tips, and the latest research to help you live your healthiest life.
          </p>
        </div>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                Featured Articles
              </h3>
              <Link to="/blog-section" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 group">
                View all
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <div 
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className="relative overflow-hidden">
                    <Link to={`/blog/${post.slug}`}>
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                      />
                    </Link>
                    <div className="absolute top-4 left-4">
                      <span className={`${getCategoryColor(post.category).bg} ${getCategoryColor(post.category).text} text-sm font-medium py-1 px-3 rounded-full`}>
                        {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h4 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h4>
                    
                    <p className="text-gray-600 mb-6">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-100 rounded-full p-2">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                        <span className="text-gray-700 font-medium">{post.author}</span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                          <Heart className="h-5 w-5" />
                        </button>
                        <button 
                          className="text-gray-400 hover:text-blue-500 transition-colors"
                          onClick={() => handleCommentClick(post.slug)}
                        >
                          <MessageCircle className="h-5 w-5" />
                        </button>
                        <button 
                          className="text-gray-400 hover:text-green-500 transition-colors"
                          onClick={() => handleShareClick(post)}
                        >
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center justify-center gap-1 group"
                      >
                        Read Article
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Search Input */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center overflow-x-auto gap-2 pb-2 md:pb-0 scrollbar-hide">
                <span className="flex-shrink-0 bg-gray-100 rounded-full p-2">
                  <Filter className="h-5 w-5 text-gray-500" />
                </span>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`flex-shrink-0 py-2 px-4 rounded-full transition-colors ${
                      activeCategory === category.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map((post) => (
            <div 
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
            >
              <div className="relative overflow-hidden">
                <Link to={`/blog/${post.slug}`}>
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                  />
                </Link>
                <div className="absolute top-3 left-3">
                  <span className={`${getCategoryColor(post.category).bg} ${getCategoryColor(post.category).text} text-xs font-medium py-1 px-2 rounded-full`}>
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </span>
                </div>
                <button className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full p-1.5 text-gray-400 hover:text-blue-500 transition-colors">
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>
                
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h4>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-100 rounded-full p-1.5">
                        <User className="h-3 w-3 text-gray-600" />
                      </div>
                      <span className="text-gray-700 text-sm">{post.author}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1 text-gray-500">
                        <Heart className="h-3 w-3" />
                        {post.likes}
                      </span>
                      <button 
                        className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors"
                        onClick={() => handleCommentClick(post.slug)}
                      >
                        <MessageCircle className="h-3 w-3" />
                        {post.comments}
                      </button>
                      <button
                        className="flex items-center gap-1 text-gray-500 hover:text-green-500 transition-colors"
                        onClick={() => handleShareClick(post)}
                      >
                        <Share2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center justify-center gap-1 group"
                    >
                      Read Article
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
          <button 
            className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`flex items-center justify-center h-10 w-10 rounded-full ${
                currentPage === page 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          
          <span className="px-2">...</span>
          
          <button 
            className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            10
          </button>
          
          <button 
            className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === 10}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        {/* Newsletter Subscription */}
        <div className="mt-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12">
              <h3 className="text-3xl font-bold text-white mb-4">Stay Updated with Latest Health Insights</h3>
              <p className="text-blue-100 mb-8">
                Join our newsletter to receive the latest articles, health tips, and exclusive content straight to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg focus:outline-none"
                />
                <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition-colors shadow-md">
                  Subscribe
                </button>
              </div>
              
              <p className="text-blue-200 text-sm mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
            
            <div className="hidden lg:block relative">
              <img 
                src="/api/placeholder/800/600" 
                alt="Newsletter"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-blue-600 opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
