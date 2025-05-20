import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Calendar, Clock, User, Tag, ChevronRight, 
  ArrowRight, Search, Heart, MessageCircle, Share2, Bookmark,
  ChevronLeft, Filter, TrendingUp
} from 'lucide-react';
import toast from 'react-hot-toast';
import config from '@/config.js/config';

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const postsPerPage = 6;
  const navigate = useNavigate();

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${config.API_URL}/api/blogs`);
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        // Filter published posts and add slug
        const publishedBlogs = data.blogs
          .filter(blog => blog.status === 'published')
          .map(blog => ({
            ...blog,
            slug: blog.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, ''),
            readTime: blog.read_time,
            date: new Date(blog.published_at).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            }),
            featured: blog.is_featured,
          }));
        setBlogs(publishedBlogs);
        setLoading(false);
      } catch (err) {
        console.error('Fetch blogs error:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Dynamic categories from API
  const categories = [
    { id: 'all', name: 'All Posts' },
    ...[...new Set(blogs.map(blog => blog.category))].map(cat => ({
      id: cat,
      name: cat.charAt(0).toUpperCase() + cat.slice(1),
    })),
  ];

  // Filter posts
  const filteredPosts = blogs.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Featured posts
  const featuredPosts = blogs.filter(post => post.featured).slice(0, 2);

  // Category colors
  const getCategoryColor = (category) => {
    switch (category) {
      case 'wellness': return { bg: 'bg-green-100', text: 'text-green-600' };
      case 'beauty': return { bg: 'bg-pink-100', text: 'text-pink-600' };
      case 'lifestyle': return { bg: 'bg-blue-100', text: 'text-blue-600' };
      case 'herbal': return { bg: 'bg-lime-100', text: 'text-lime-600' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-600' };
    }
  };

  // Handle like
  const handleLikeClick = async (blogId) => {
    try {
      const response = await fetch(`${config.API_URL}/api/blogs/${blogId}/like`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to like blog');
      const data = await response.json();
      setBlogs(blogs.map(blog =>
        blog.id === blogId ? { ...blog, likes: data.likes } : blog
      ));
      toast.success('Blog liked!', {
        style: { background: '#fff', color: '#333', border: '1px solid #e5e7eb' },
      });
    } catch (error) {
      toast.error('Failed to like blog.', {
        style: { background: '#fff', color: '#333', border: '1px solid #e5e7eb' },
      });
    }
  };

  // Handle comment navigation
  const handleCommentClick = (slug) => {
    navigate(`/blog/${slug}`, { state: { scrollToComments: true } });
  };

  // Handle share
  const handleShareClick = async (post) => {
    const shareUrl = `${window.location.origin}/blog/${post.slug}`;
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: shareUrl,
    };

    try {
      const response = await fetch(`${config.API_URL}/api/blogs/${post.id}/share`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to share blog');

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard!', {
          style: { background: '#fff', color: '#333', border: '1px solid #e5e7eb' },
        });
      }
    } catch (error) {
      toast.error('Failed to share. Please try again.', {
        style: { background: '#fff', color: '#333', border: '1px solid #e5e7eb' },
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          className="mt-4 text-blue-600 hover:text-blue-700"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section id="blog-section" className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-orange-50 opacity-60 blur-3xl" />
        <div className="absolute bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-50 opacity-60 blur-3xl" />
      </div>
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-full mb-6">
            <div className="bg-black text-white p-2 rounded-full">
              <BookOpen className="h-6 w-6" />
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Crypto Insights Hub </h2>
          <div className="h-1 w-24 bg-black mx-auto mb-6"></div>
          
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
            Stay ahead with the latest trends, tips, and insights in the world of cryptocurrency and blockchain.
          </p>
        </div>

        {featuredPosts.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                Featured Articles
              </h3>
              <Link to="/blog-section" className="text-black font-medium flex items-center gap-1 group">
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
                        src={post.image || '/api/placeholder/800/500'} 
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
                    
                    <h4 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
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
                        <button 
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          onClick={() => handleLikeClick(post.id)}
                        >
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
                        className="text-black font-medium text-sm flex items-center justify-center gap-1 group"
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
        
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-6">
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
              
              <div className="flex items-center overflow-x-auto gap-2 pb-2 md:pb-0 scrollbar-hide">
                <span className="flex-shrink-0 bg-gray-100 rounded-full p-2">
                  <Filter className="h-5 w-5 text-gray-500" />
                </span>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`flex-shrink-0 py-2 px-4 rounded-full transition-colors ${
                      activeCategory === category.id
                        ? 'bg-black text-white'
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {paginatedPosts.map((post) => (
            <div 
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
            >
              <div className="relative overflow-hidden">
                <Link to={`/blog/${post.slug}`}>
                  <img 
                    src={post.image || '/api/placeholder/800/500'} 
                    alt={post.title}
                    className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                  />
                </Link>
                <div className="absolute top-3 left-3">
                  <span className={`${getCategoryColor(post.category).bg} ${getCategoryColor(post.category).text} text-xs font-medium py-1 px-2 rounded-full`}>
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </span>
                </div>
               
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
                
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
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
                      <button 
                        className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                        onClick={() => handleLikeClick(post.id)}
                      >
                        <Heart className="h-3 w-3" />
                        {post.likes}
                      </button>
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
                      className="text-black font-medium text-sm flex items-center justify-center gap-1 group"
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
        
        <div className="flex justify-center items-center gap-2">
          <button 
            className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`flex items-center justify-center h-10 w-10 rounded-full ${
                currentPage === page 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          
          {totalPages > 5 && (
            <span className="px-2">...</span>
          )}
          
          {totalPages > 5 && (
            <button 
              className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </button>
          )}
          
          <button 
            className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}