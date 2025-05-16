import { useParams, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { 
  Calendar, Clock, User, Heart, MessageCircle, Share2, ArrowLeft, Tag, Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';
import config from '@/config.js/config';


export default function BlogDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blog and related posts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch all blogs to map slug to ID
        const blogsResponse = await fetch(`${config.API_URL}/api/blogs`);
        if (!blogsResponse.ok) throw new Error(`Failed to fetch blogs: ${blogsResponse.status}`);
        const blogsData = await blogsResponse.json();
        console.log('Blogs response:', blogsData);
        const blogs = (blogsData.blogs || [])
          .filter(blog => blog.status === 'published')
          .map(blog => ({
            ...blog,
            slug: blog.title
              ? blog.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)/g, '')
              : '',
            readTime: blog.read_time || '5 min',
            date: blog.published_at
              ? new Date(blog.published_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'Unknown',
            featured: blog.is_featured || false,
            category: blog.category || 'Uncategorized',
          }));
        console.log('Mapped blogs:', blogs);

        // Find post by slug
        const foundPost = blogs.find(p => p.slug === slug);
        console.log('Found post:', foundPost);
        if (!foundPost) throw new Error(`Blog post not found for slug: ${slug}`);

        // Fetch blog details
        const blogResponse = await fetch(`${config.API_URL}/api/blogs/${foundPost.id}`);
        if (!blogResponse.ok) throw new Error(`Failed to fetch blog: ${blogResponse.status}`);
        const blogData = await blogResponse.json();
        console.log('Blog response:', blogData);

        // Extract blog data (handle { blog: {...} } structure)
        const blog = blogData.blog || blogData;
        if (!blog) throw new Error('Blog data not found in response');

        // Fetch comments
        const commentsResponse = await fetch(`${config.API_URL}/api/blogs/${foundPost.id}/comments`);
        if (!commentsResponse.ok) throw new Error(`Failed to fetch comments: ${commentsResponse.status}`);
        const commentsData = await commentsResponse.json();
        console.log('Comments response:', commentsData);

        // Format post
        const formattedPost = {
          ...blog,
          slug,
          readTime: blog.read_time || '5 min',
          date: blog.published_at
            ? new Date(blog.published_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : 'Unknown',
          featured: blog.is_featured || false,
          category: blog.category || 'Uncategorized',
        };
        console.log('Formatted post:', formattedPost);

        // Get related posts
        let related = blogs
          .filter(p => p.category === formattedPost.category && p.id !== formattedPost.id)
          .slice(0, 3);
        // Fallback to other posts if no related posts found
        if (related.length === 0) {
          related = blogs
            .filter(p => p.id !== formattedPost.id)
            .slice(0, 3);
        }
        console.log('Related posts:', related);

        setPost(formattedPost);
        setRelatedPosts(related);
        setComments((commentsData.comments || []).map(comment => ({
          id: comment.id,
          author: comment.name || 'Anonymous',
          text: comment.comment || '',
          date: comment.created_at
            ? new Date(comment.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : 'Unknown',
        })));
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  // Category colors
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Gardening': return { bg: 'bg-green-100', text: 'text-green-700' };
      case 'Technology': return { bg: 'bg-blue-100', text: 'text-blue-700' };
      case 'Photography': return { bg: 'bg-purple-100', text: 'text-purple-700' };
      case 'Fitness': return { bg: 'bg-red-100', text: 'text-red-700' };
      case 'Programming': return { bg: 'bg-indigo-100', text: 'text-indigo-700' };
      case 'Design': return { bg: 'bg-pink-100', text: 'text-pink-700' };
      case 'Database': return { bg: 'bg-teal-100', text: 'text-teal-700' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700' };
    }
  };

  // Scroll to comments or top
  useEffect(() => {
    if (!post) return;
    if (location.state?.scrollToComments) {
      setTimeout(() => {
        const commentSection = document.getElementById('comment-section');
        if (commentSection) {
          window.scrollTo({
            top: commentSection.offsetTop - 100,
            behavior: 'smooth',
          });
        }
      }, 200);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [post, location]);

  // Handle like
  const handleLikeClick = async () => {
    if (!post) return;
    try {
      const response = await fetch(`${config.API_URL}/api/blogs/${post.id}/like`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to like blog');
      const data = await response.json();
      setPost({ ...post, likes: data.likes });
      toast.success('Blog liked!', {
        style: { background: '#fff', color: '#333', border: '1px solid #e5e7eb' },
      });
    } catch (error) {
      toast.error('Failed to like blog.', {
        style: { background: '#fff', color: '#333', border: '1px solid #e5e7eb' },
      });
    }
  };

  // Handle share
  const handleShareClick = async () => {
    if (!post) return;
    const shareUrl = `${window.location.origin}/blog/${post.slug}`;
    const shareData = {
      title: post.title || 'Blog Post',
      text: post.excerpt || '',
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

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!post) return;
    const formData = new FormData(e.target);
    try {
      const response = await fetch(`${config.API_URL}/api/blogs/${post.id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          comment: formData.get('comment'),
        }),
      });
      if (!response.ok) throw new Error('Failed to submit comment');
      const commentResult = await response.json();
      console.log('Comment submission response:', commentResult);

      // Refetch comments to ensure latest data
      const commentsResponse = await fetch(`${config.API_URL}/api/blogs/${post.id}/comments`);
      if (!commentsResponse.ok) throw new Error('Failed to fetch comments');
      const commentsData = await commentsResponse.json();
      console.log('Updated comments response:', commentsData);

      setComments((commentsData.comments || []).map(comment => ({
        id: comment.id,
        author: comment.name || 'Anonymous',
        text: comment.comment || '',
        date: comment.created_at
          ? new Date(comment.created_at).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          : 'Unknown',
      })));
      setPost({ ...post, comments: post.comments + 1 });
      toast.success('Comment submitted!', {
        style: { background: '#fff', color: '#333', border: '1px solid #e5e7eb' },
      });
      e.target.reset();
    } catch (error) {
      console.error('Comment submission error:', error);
      toast.error('Failed to submit comment.', {
        style: { background: '#fff', color: '#333', border: '1px solid #e5e7eb' },
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <section className="py-12 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Blog Post Not Found</h2>
        <p className="text-gray-600 mt-2">{error || 'The requested blog post does not exist.'}</p>
        <Button asChild variant="link" className="mt-4 text-black text-lg">
          <Link to="/blog-section">Back to Blog</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50 relative overflow-hidden" id="blog-section">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-teal-50 opacity-40 blur-3xl" />
        <div className="absolute bottom-16 -left-16 w-64 h-64 rounded-full bg-purple-50 opacity-40 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <Button asChild variant="ghost" className="mb-6 text-black text-base animate-slide-in">
          <Link to="/blog-section">
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to Blog
          </Link>
        </Button>

        <div className="relative mb-8 animate-slide-in">
          <img 
            src={post.image || '/api/placeholder/800/500'} 
            alt={post.title || 'Blog Post'}
            className="w-full h-80 sm:h-96 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <span className={`inline-block ${getCategoryColor(post.category).bg} ${getCategoryColor(post.category).text} text-sm font-medium py-1 px-3 rounded-full mb-2`}>
              {post.category ? post.category.charAt(0).toUpperCase() + post.category.slice(1) : 'Uncategorized'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">{post.title || 'Untitled'}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
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
                {post.author || 'Unknown Author'}
              </div>
            </div>
            <div className="prose prose-sm sm:prose-base prose-teal max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {(post.tags || []).map((tag) => (
                <span 
                  key={tag} 
                  className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 py-1 px-3 rounded-full"
                >
                  <Tag className="h-4 w-4" />
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
              <Button 
                variant="ghost" 
                className="text-gray-400 hover:text-red-500"
                onClick={handleLikeClick}
              >
                <Heart className="h-5 w-5 mr-1" /> {post.likes || 0}
              </Button>
              <Button variant="ghost" className="text-gray-400 hover:text-blue-500">
                <MessageCircle className="h-5 w-5 mr-1" /> {post.comments || 0}
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

          <div className="animate-slide-in">
            <div className="bg-white border border-gray-100 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Author</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-black" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{post.author || 'Unknown Author'}</p>
                  <p className="text-xs text-gray-600">{post.author_bio || 'No bio available.'}</p>
                </div>
              </div>
            </div>
            <div id="comment-section" className="bg-white border border-gray-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave a Comment</h3>
              <form className="space-y-4 mb-6" onSubmit={handleCommentSubmit}>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="h-10 text-base"
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="h-10 text-base"
                  required
                />
                <Textarea
                  name="comment"
                  placeholder="Your Comment"
                  className="h-24 text-base"
                  required
                />
                <Button className="text-black text-white h-10 text-base">
                  Submit <Send className="h-4 w-4 ml-1" />
                </Button>
              </form>
              <p className="text-xs text-gray-500 mb-6">Comments are moderated and will appear after approval.</p>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Comments ({comments.length})
                </h3>
                {comments.length > 0 ? (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="border-t border-gray-200 pt-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                            <User className="h-4 w-4 text-black" />
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

        {relatedPosts.length > 0 && (
          <div className="mb-10 animate-slide-in">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Explore More Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div 
                  key={relatedPost.id} 
                  className="group bg-white border border-gray-100 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                >
                  <Link to={`/blog/${relatedPost.slug}`} className="block">
                    <div className="relative">
                      <img 
                        src={relatedPost.image || '/api/placeholder/800/500'} 
                        alt={relatedPost.title || 'Blog Post'}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className={`absolute top-3 left-3 ${getCategoryColor(relatedPost.category).bg} ${getCategoryColor(relatedPost.category).text} text-xs font-medium py-1 px-2 rounded-full`}>
                        {relatedPost.category ? relatedPost.category.charAt(0).toUpperCase() + relatedPost.category.slice(1) : 'Uncategorized'}
                      </span>
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-2 mb-2">
                        {relatedPost.title || 'Untitled'}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt || ''}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}