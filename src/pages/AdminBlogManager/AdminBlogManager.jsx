import config from '@/config.js/config';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AdminBlogManager = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
    author_bio: '',
    status: 'draft',
    read_time: '',
    tags: '',
    is_featured: false,
    image: null,
  });
  const [editingId,setEditingId]=useState("") 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${config.API_URL}/api/blogs`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        });
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        setBlogs(data.blogs);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'tags') {
        formData.append(key, JSON.stringify(value.split(',').map(tag => tag.trim())));
      } else if (key === 'image' && value) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });

    try {
      const url = editingId ? `${config.API_URL}/api/blogs/${editingId}` : `${config.API_URL}/api/blogs`;
      const method = editingId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to save blog');
      const data = await response.json();
      if (editingId) {
        setBlogs(blogs.map(blog => blog.id === editingId ? data.blog : blog));
      } else {
        setBlogs([...blogs, data.blog]);
      }
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      author: blog.author,
      author_bio: blog.author_bio,
      status: blog.status,
      read_time: blog.read_time,
      tags: blog.tags.join(', '),
      is_featured: blog.is_featured,
      image: null,
    });
    setEditingId(blog.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${config.API_URL}/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      if (!response.ok) throw new Error('Failed to delete blog');
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      author: '',
      author_bio: '',
      status: 'draft',
      read_time: '',
      tags: '',
      is_featured: false,
      image: null,
    });
    setEditingId(null);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-6">Manage Blogs</h1>

      {/* Blog Form */}
      <form onSubmit={handleSubmit} className="mb-10 bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleInputChange}
            className="border rounded-lg p-2"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleInputChange}
            className="border rounded-lg p-2"
            required
          />
        </div>
        <textarea
          name="excerpt"
          placeholder="Excerpt"
          value={form.excerpt}
          onChange={handleInputChange}
          className="border rounded-lg p-2 w-full mb-4"
          rows="3"
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleInputChange}
          className="border rounded-lg p-2 w-full mb-4"
          rows="6"
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleInputChange}
            className="border rounded-lg p-2"
            required
          />
          <input
            type="text"
            name="read_time"
            placeholder="Read Time (e.g., 8 min read)"
            value={form.read_time}
            onChange={handleInputChange}
            className="border rounded-lg p-2"
          />
        </div>
        <textarea
          name="author_bio"
          placeholder="Author Bio"
          value={form.author_bio}
          onChange={handleInputChange}
          className="border rounded-lg p-2 w-full mb-4"
          rows="3"
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={handleInputChange}
          className="border rounded-lg p-2 w-full mb-4"
        />
        <div className="flex items-center gap-4 mb-4">
          <select
            name="status"
            value={form.status}
            onChange={handleInputChange}
            className="border rounded-lg p-2"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_featured"
              checked={form.is_featured}
              onChange={handleInputChange}
            />
            Featured
          </label>
        </div>
        <input
          type="file"
          name="image"
          accept="image/jpeg,image/png"
          onChange={handleImageChange}
          className="mb-4"
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            {editingId ? 'Update Blog' : 'Create Blog'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Blog List */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Blog Posts</h2>
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="flex justify-between items-center border-b py-2">
              <div>
                <h3 className="text-lg font-medium">{blog.title}</h3>
                <p className="text-sm text-gray-500">{blog.category} • {blog.status}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminBlogManager;