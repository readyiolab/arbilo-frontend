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
import { Helmet } from 'react-helmet';

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
        const blogsResponse = await fetch(`${config.API_URL}/api/blogs`);
        if (!blogsResponse.ok) throw new Error(`Failed to fetch crypto blogs: ${blogsResponse.status}`);
        const blogsData = await blogsResponse.json();
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
            readTime: blog.read_time || '5 min read',
            date: blog.published_at
              ? new Date(blog.published_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'Unknown',
            featured: blog.is_featured || false,
            category: blog.category || 'cryptocurrency',
          }));

        const foundPost = blogs.find(p => p.slug === slug);
        if (!foundPost) throw new Error(`Crypto blog post not found for slug: ${slug}`);

        const blogResponse = await fetch(`${config.API_URL}/api/blogs/${foundPost.id}`);
        if (!blogResponse.ok) throw new Error(`Failed to fetch crypto blog: ${blogResponse.status}`);
        const blogData = await blogResponse.json();
        const blog = blogData.blog || blogData;
        if (!blog) throw new Error('Crypto blog data not found');

        const commentsResponse = await fetch(`${config.API_URL}/api/blogs/${foundPost.id}/comments`);
        if (!commentsResponse.ok) throw new Error(`Failed to fetch comments: ${commentsResponse.status}`);
        const commentsData = await commentsResponse.json();

        const formattedPost = {
          ...blog,
          slug,
          readTime: blog.read_time || '5 min read',
          date: blog.published_at
            ? new Date(blog.published_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : 'Unknown',
          featured: blog.is_featured || false,
          category: blog.category || 'cryptocurrency',
        };

        let related = blogs
          .filter(p => p.category === formattedPost.category && p.id !== formattedPost.id)
          .slice(0, 3);
        if (related.length === 0) {
          related = blogs
            .filter(p => p.id !== formattedPost.id)
            .slice(0, 3);
        }

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

  // Category colors for crypto themes
  const getCategoryColor = (category) => {
    switch (category) {
      case 'bitcoin': return { bg: 'bg-orange-100', text: 'text-orange-600' };
      case 'ethereum': return { bg: 'bg-purple-100', text: 'text-purple-600' };
      case 'defi': return { bg: 'bg-blue-100', text: 'text-blue-600' };
      case 'nfts': return { bg: 'bg-green-100', text: 'text-green-600' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-600' };
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
      if (!response.ok) throw new Error('Failed to like crypto blog');
      const data = await response.json();
      setPost({ ...post, likes: data.likes });
      toast.success('Crypto blog liked!', {
        style: { background: '#fff', color: '#333', border: '1px solid #e5e7eb' },
      });
    } catch (error) {
      toast.error('Failed to like crypto blog.', {
        style: { background: '#fff', color: '#333', border: '1px solid #e5e7eb' },
      });
    }
  };

  // Handle share
  const handleShareClick = async () => {
    if (!post) return;
    const shareUrl = `${window.location.origin}/blog/${post.slug}`;
    const shareData = {
      title: post.title || 'Crypto Blog Post',
      text: post.excerpt || 'Check out this cryptocurrency article!',
      url: shareUrl,
    };

    try {
      const response = await fetch(`${config.API_URL}/api/blogs/${post.id}/share`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to share crypto blog');

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Crypto blog link copied!', {
          style: { background: '#fff', color: '#333', border: '1px solid #e5e7eb' },
        });
      }
    } catch (error) {
      toast.error('Failed to share crypto blog.', {
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
      const commentsResponse = await fetch(`${config.API_URL}/api/blogs/${post.id}/comments`);
      if (!commentsResponse.ok) throw new Error('Failed to fetch comments');
      const commentsData = await commentsResponse.json();

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
      toast.success('Comment submitted on crypto blog!', {
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

  // Structured data for BlogPosting
  const structuredData = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title || 'Crypto Blog Post',
        description: post.excerpt || 'Explore insights on cryptocurrency and blockchain.',
        author: {
          '@type': 'Person',
          name: post.author || 'Unknown Author',
        },
        datePublished: post.published_at || new Date().toISOString(),
        image: post.image || '/api/placeholder/800/500',
        url: `${window.location.origin}/blog/${post.slug}`,
        keywords: [post.category, 'cryptocurrency', 'blockchain', 'bitcoin', 'ethereum', 'defi', 'nfts'],
        commentCount: post.comments || 0,
        comment: comments.map(comment => ({
          '@type': 'Comment',
          author: {
            '@type': 'Person',
            name: comment.author,
          },
          text: comment.text,
          dateCreated: comment.date,
        })),
      }
    : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading crypto blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <section className="py-12 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Crypto Blog Post Not Found</h2>
        <p className="text-gray-600 mt-2">{error || 'The requested cryptocurrency blog post does not exist.'}</p>
        <Button asChild variant="link" className="mt-4 text-black text-lg">
          <Link to="/blog-section" aria-label="Back to cryptocurrency blog">Back to Crypto Blog</Link>
        </Button>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${post.title || 'Crypto Blog Post'} | Crypto Insights Hub`}</title>
        <meta
          name="description"
          content={post.excerpt || 'Read the latest insights on cryptocurrency, blockchain, Bitcoin, Ethereum, DeFi, and NFTs.'}
        />
        <meta
          name="keywords"
          content={`${post.category}, cryptocurrency, blockchain, bitcoin, ethereum, defi, nfts, crypto news`}
        />
        <link rel="canonical" href={`${window.location.origin}/blog/${post.slug}`} />
        <meta
          property="og:title"
          content={`${post.title || 'Crypto Blog Post'} | Crypto Insights Hub`}
        />
        <meta
          property="og:description"
          content={post.excerpt || 'Read the latest insights on cryptocurrency, blockchain, Bitcoin, Ethereum, DeFi, and NFTs.'}
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${window.location.origin}/blog/${post.slug}`} />
        <meta property="og:image" content={post.image || '/api/placeholder/800/500'} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <section className="py-12 bg-gray-50 relative overflow-hidden" id="blog-section">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-teal-50 opacity-40 blur-3xl" />
          <div className="absolute bottom-16 -left-16 w-64 h-64 rounded-full bg-purple-50 opacity-40 blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <Button asChild variant="ghost" className="mb-6 text-black text-base animate-slide-in">
            <Link to="/blog-section" aria-label="Back to cryptocurrency blog">
              <ArrowLeft className="h-5 w-5 mr-2" aria-hidden="true" /> Back to Crypto Blog
            </Link>
          </Button>

          <article className="relative mb-8 animate-slide-in">
            <div className="relative">
              <img
                src={post.image || '/api/placeholder/800/500'}
                alt={`${post.title || 'Crypto Blog Post'} - Cryptocurrency article cover`}
                className="w-full h-80 sm:h-96 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span
                  className={`inline-block ${getCategoryColor(post.category).bg} ${getCategoryColor(post.category).text} text-sm font-medium py-1 px-3 rounded-full mb-2`}
                >
                  {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">{post.title || 'Untitled'}</h1>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    {post.readTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" aria-hidden="true" />
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
                      <Tag className="h-4 w-4" aria-hidden="true" />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                  <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-red-500"
                    onClick={handleLikeClick}
                    aria-label={`Like ${post.title}`}
                  >
                    <Heart className="h-5 w-5 mr-1" aria-hidden="true" /> {post.likes || 0}
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-blue-500"
                    asChild
                  >
                    <a href="#comment-section" aria-label={`View comments for ${post.title}`}>
                      <MessageCircle className="h-5 w-5 mr-1" aria-hidden="true" /> {post.comments || 0}
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-green-500"
                    onClick={handleShareClick}
                    aria-label={`Share ${post.title}`}
                  >
                    <Share2 className="h-5 w-5 mr-1" aria-hidden="true" /> Share
                  </Button>
                </div>
              </div>

              <aside className="animate-slide-in">
                <div className="bg-white border border-gray-100 rounded-lg p-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">About the Author</h2>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-black" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{post.author || 'Unknown Author'}</p>
                      <p className="text-xs text-gray-600">{post.author_bio || 'Expert in cryptocurrency and blockchain technology.'}</p>
                    </div>
                  </div>
                </div>
                <div id="comment-section" className="bg-white border border-gray-100 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Leave a Comment</h2>
                  <form className="space-y-4 mb-6" onSubmit={handleCommentSubmit}>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className="h-10 text-base"
                      required
                      aria-label="Your name for comment"
                    />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className="h-10 text-base"
                      required
                      aria-label="Your email for comment"
                    />
                    <Textarea
                      name="comment"
                      placeholder="Your Comment on this crypto article"
                      className="h-24 text-base"
                      required
                      aria-label="Your comment"
                    />
                    <Button className="text-black text-white h-10 text-base" aria-label="Submit comment">
                      Submit <Send className="h-4 w-4 ml-1" aria-hidden="true" />
                    </Button>
                  </form>
                  <p className="text-xs text-gray-500 mb-6">Comments are moderated and will appear after approval.</p>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Comments ({comments.length})
                    </h2>
                    {comments.length > 0 ? (
                      <div className="space-y-4">
                        {comments.map((comment) => (
                          <div key={comment.id} className="border-t border-gray-200 pt-4">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                                <User className="h-4 w-4 text-black" aria-hidden="true" />
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
                      <p className="text-sm text-gray-600">No comments yet. Be the first to comment on this crypto article!</p>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </article>

          {relatedPosts.length > 0 && (
            <section className="mb-10 animate-slide-in" aria-labelledby="related-crypto-articles">
              <h2 id="related-crypto-articles" className="text-2xl font-semibold text-gray-900 mb-6">
                Explore More Crypto Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.id}
                    className="group bg-white border border-gray-100 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                  >
                    <Link to={`/blog/${relatedPost.slug}`} aria-label={`Read ${relatedPost.title}`}>
                      <div className="relative">
                        <img
                          src={relatedPost.image || '/api/placeholder/800/500'}
                          alt={`${relatedPost.title || 'Crypto Blog Post'} - Blockchain article`}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <span
                          className={`absolute top-3 left-3 ${getCategoryColor(relatedPost.category).bg} ${getCategoryColor(relatedPost.category).text} text-xs font-medium py-1 px-2 rounded-full`}
                        >
                          {relatedPost.category.charAt(0).toUpperCase() + relatedPost.category.slice(1)}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-2 mb-2">
                          {relatedPost.title || 'Untitled'}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt || ''}</p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </>
  );
}