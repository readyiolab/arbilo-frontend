import config from "@/config.js/config";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  PlusCircle,
  Pencil,
  Trash2,
  ImagePlus,
  FileText,
  Clock,
  Tag,
  User,
  Check,
  AlertTriangle,
} from "lucide-react";

const AdminBlogManager = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    author_bio: "",
    status: "draft",
    read_time: "",
    tags: "",
    is_featured: false,
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch blogs on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${config.API_URL}/api/blogs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        console.log("Fetched blogs:", data);
        setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
        setLoading(false);
      } catch (err) {
        console.error("Fetch blogs error:", err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // Handle status selection
  const handleStatusChange = (value) => {
    setForm({ ...form, status: value });
  };

  // Handle featured toggle
  const handleFeaturedChange = (checked) => {
    setForm({ ...form, is_featured: checked });
  };

  // Validate form before submission
  const validateForm = () => {
    const requiredFields = [
      "title",
      "excerpt",
      "content",
      "category",
      "author",
    ];
    const errors = [];
    requiredFields.forEach((field) => {
      if (!form[field].trim()) {
        errors.push(
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
        );
      }
    });
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(", "));
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "tags") {
          const tagsArray = value
            ? value
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag)
            : [];
          tagsArray.forEach((tag) => formData.append("tags[]", tag));
        } else if (key === "image" && value) {
          formData.append(key, value);
        } else if (key === "is_featured") {
          formData.append(key, value ? "true" : "false");
        } else {
          formData.append(key, value || "");
        }
      });

      console.log("FormData entries:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const url = editingId
        ? `${config.API_URL}/api/blogs/${editingId}`
        : `${config.API_URL}/api/blogs`;
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error response:", errorData);
        throw new Error(errorData.message || JSON.stringify(errorData.errors));
      }

      const data = await response.json();
      console.log("New blog from POST:", data.blog);

      if (editingId) {
        setBlogs(
          blogs.map((blog) => (blog.id === editingId ? data.blog : blog))
        );
        setSuccess("Blog successfully updated!");
      } else {
        setBlogs([...blogs, data.blog]);
        setSuccess("New blog successfully created!");
      }

      resetForm();
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit button click
  const handleEdit = (blog) => {
    setForm({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      category: blog.category || "",
      author: blog.author || "",
      author_bio: blog.author_bio || "",
      status: blog.status || "draft",
      read_time: blog.read_time || "",
      tags: blog.tags ? blog.tags.join(", ") : "",
      is_featured: blog.is_featured || false,
      image: null,
    });
    setEditingId(blog.id);
    setImagePreview(blog.image || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Open delete confirmation dialog
  const confirmDelete = (blog) => {
    setBlogToDelete(blog);
    setDeleteDialogOpen(true);
  };

  // Handle blog deletion
  const handleDelete = async () => {
    if (!blogToDelete) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${config.API_URL}/api/blogs/${blogToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete blog");

      setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
      setSuccess(`"${blogToDelete.title || "Blog"}" has been deleted.`);
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setForm({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      author: "",
      author_bio: "",
      status: "draft",
      read_time: "",
      tags: "",
      is_featured: false,
      image: null,
    });
    setEditingId(null);
    setImagePreview(null);
  };

  // Clear notifications after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 5000);
      return () => clearTimeout(timer);
    }
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Filter blogs based on tab and search term
  console.log("Blogs state:", blogs);
  const filteredBlogs = blogs
    .filter((blog) => {
      const status =
        typeof blog.status === "string" ? blog.status.toLowerCase().trim() : "";
      console.log(
        `Blog ID: ${blog.id}, Status: ${blog.status}, Normalized: ${status}`
      );
      return activeTab === "all" || status === activeTab;
    })
    .filter((blog) => {
      const title =
        typeof blog.title === "string" ? blog.title.toLowerCase() : "";
      const category =
        typeof blog.category === "string" ? blog.category.toLowerCase() : "";
      const author =
        typeof blog.author === "string" ? blog.author.toLowerCase() : "";
      const search = searchTerm.toLowerCase().trim();
      return (
        title.includes(search) ||
        category.includes(search) ||
        author.includes(search)
      );
    });
  console.log("Filtered blogs for tab", activeTab, ":", filteredBlogs);

  // Render status badge
  const getStatusBadge = (status) => {
    const normalizedStatus =
      typeof status === "string" ? status.toLowerCase() : "";
    if (normalizedStatus === "published") {
      return (
        <Badge className="bg-green-500 hover:bg-green-600">Published</Badge>
      );
    }
    return (
      <Badge variant="outline" className="text-amber-500 border-amber-500">
        Draft
      </Badge>
    );
  };

  // Show loading screen during initial fetch
  if (loading && blogs.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto py-10 px-4 max-w-7xl">
      <h1 className="text-3xl font-bold tracking-tight mb-6 text-center text-black">
        Blog Management
      </h1>

      {/* Success and Error Alerts */}
      {success && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-500" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">
            {success}
          </AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert className="mb-6 bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertTitle className="text-red-800">Error</AlertTitle>
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}

      {/* Blog Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>
            {editingId ? "Edit Blog Post" : "Create New Blog Post"}
          </CardTitle>
          <CardDescription>
            {editingId
              ? "Update the details of your blog post"
              : "Fill in the details to create a new blog post"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="blogForm" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title*</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter blog title"
                    value={form.title}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category*</Label>
                  <Input
                    id="category"
                    name="category"
                    placeholder="Enter category"
                    value={form.category}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <Label htmlFor="author">Author*</Label>
                  <Input
                    id="author"
                    name="author"
                    placeholder="Enter author name"
                    value={form.author}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <Label htmlFor="read_time">Read Time</Label>
                  <Input
                    id="read_time"
                    name="read_time"
                    placeholder="e.g., 8 min read"
                    value={form.read_time}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="excerpt">Excerpt*</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    placeholder="Brief summary of the blog post"
                    value={form.excerpt}
                    onChange={handleInputChange}
                    required
                    className="min-h-[80px]"
                    aria-required="true"
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    name="tags"
                    placeholder="Enter tags separated by commas"
                    value={form.tags}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="status">Publication Status</Label>
                  <Select
                    value={form.status}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_featured"
                    checked={form.is_featured}
                    onCheckedChange={handleFeaturedChange}
                  />
                  <Label htmlFor="is_featured">Featured Post</Label>
                </div>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="author_bio">Author Bio</Label>
                <Textarea
                  id="author_bio"
                  name="author_bio"
                  placeholder="Brief author biography"
                  value={form.author_bio}
                  onChange={handleInputChange}
                  className="min-h-[80px]"
                />
              </div>
              <div>
                <Label htmlFor="content">Content*</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write your blog post content here"
                  value={form.content}
                  onChange={handleInputChange}
                  required
                  className="min-h-[200px]"
                  aria-required="true"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="image" className="block mb-2">
                  Featured Image
                </Label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                    <ImagePlus className="h-5 w-5 text-gray-500" />
                    <span>{form.image ? "Change Image" : "Upload Image"}</span>
                    <Input
                      id="image"
                      type="file"
                      name="image"
                      accept="image/jpeg,image/png"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {imagePreview && (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-16 w-24 object-cover rounded-md border border-gray-300"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white border border-gray-300 p-1 text-gray-500 hover:text-red-500"
                        onClick={() => {
                          setForm({ ...form, image: null });
                          setImagePreview(null);
                        }}
                      >
                        ×
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <div>
            {editingId && (
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </div>
          <Button
            type="submit"
            form="blogForm"
            disabled={loading}
            className="bg-black hover:bg-gray-800 text-white"
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2">⟳</span>
                {editingId ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>{editingId ? "Update Blog Post" : "Create Blog Post"}</>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Blog List */}
      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
          <CardDescription>Manage your existing blog posts</CardDescription>
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="w-full sm:max-w-sm">
              <Input
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
                aria-label="Search blogs"
              />
            </div>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full sm:w-auto"
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-600">
                No blog posts found
              </h3>
              <p className="text-gray-500 mt-2">
                {searchTerm
                  ? "Try a different search term"
                  : "Create your first blog post by filling the form above"}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredBlogs.map((blog) => (
                <div key={blog.id}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">
                          {blog.title || "Untitled"}
                        </h3>
                        {blog.is_featured && (
                          <Badge className="bg-purple-500 hover:bg-purple-600">
                            Featured
                          </Badge>
                        )}
                        {getStatusBadge(blog.status)}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Tag className="h-3.5 w-3.5" />
                          <span>{blog.category || "No Category"}</span>
                        </div>
                        {blog.author && (
                          <div className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5" />
                            <span>{blog.author}</span>
                          </div>
                        )}
                        {blog.read_time && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{blog.read_time}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(blog)}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => confirmDelete(blog)}
                        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "
              {blogToDelete?.title || "this blog"}"? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlogManager;
