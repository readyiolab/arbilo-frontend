import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import config from '@/config.js/config';

// Configure ReactQuill toolbar (removed image option)
const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link'],
    ['clean'],
  ],
};

const SubscribersTable = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);
  const [error, setError] = useState('');
  const [newsletterSubject, setNewsletterSubject] = useState('');
  const [newsletterContent, setNewsletterContent] = useState('');
  const [isSendingNewsletter, setIsSendingNewsletter] = useState(false);
  const [showSendDialog, setShowSendDialog] = useState(false);
  const quillRef = useRef(null);

  // Separate image upload handler
  const handleImageUpload = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('image', file);

      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          toast.error('Admin not authenticated!');
          return;
        }

        const response = await axios.post(
          `${config.API_URL}/api/newsletter/upload-image`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        const imageUrl = response.data.url;
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection() || { index: quill.getLength() };
        quill.insertEmbed(range.index, 'image', imageUrl);
        toast.success('Image uploaded and inserted!');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to upload image');
      }
    };
  };

  // Fetch subscribers
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          toast.error('Admin not authenticated!');
          return;
        }

        setLoading(true);
        const response = await axios.get(`${config.API_URL}/api/newsletter/subscribers`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data.subscribers)) {
          setSubscribers(response.data.subscribers);
        } else {
          toast.error('Invalid subscribers data received');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch subscribers');
        toast.error(err.response?.data?.message || 'Failed to fetch subscribers');
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, []);

  const handleToggleActiveStatus = (subscriber) => {
    setSelectedSubscriber(subscriber);
  };

  const confirmToggle = async () => {
    if (!selectedSubscriber) return;

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        toast.error('Admin not authenticated!');
        return;
      }

      setLoading(true);
      const newStatus = selectedSubscriber.is_active ? 0 : 1;

      const response = await axios.patch(
        `${config.API_URL}/api/newsletter/subscribers/${selectedSubscriber.id}/toggle`,
        { is_active: newStatus },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSubscribers((prevSubscribers) =>
          prevSubscribers.map((sub) =>
            sub.id === selectedSubscriber.id ? { ...sub, is_active: newStatus } : sub
          )
        );
        toast.success(response.data.message || 'Subscriber status updated successfully');
      } else {
        toast.error('Failed to update subscriber status');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error toggling subscriber status');
    } finally {
      setLoading(false);
      setSelectedSubscriber(null);
    }
  };

  const handleSendNewsletter = async () => {
    if (!newsletterSubject || !newsletterContent) {
      toast.error('Please provide both subject and content');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        toast.error('Admin not authenticated!');
        return;
      }

      setIsSendingNewsletter(true);
      const response = await axios.post(
        `${config.API_URL}/api/newsletter/send`,
        { subject: newsletterSubject, content: newsletterContent },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || 'Newsletter sent successfully');
      setNewsletterSubject('');
      setNewsletterContent('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send newsletter');
    } finally {
      setIsSendingNewsletter(false);
      setShowSendDialog(false);
    }
  };

  const handlePreview = () => {
    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Newsletter Preview</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8f8f8; font-family: Arial, Helvetica, sans-serif; color: #333;">
        <table width="100%" bgcolor="#f8f8f8" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <table width="600" bgcolor="#ffffff" cellpadding="0" cellspacing="0" style="border-radius: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td align="right" style="padding: 10px; font-size: 12px; color: #555;">
                    <a href="#" style="color: #222222; text-decoration: underline;">View in browser</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" bgcolor="#222222" style="padding: 20px;">
                    <img src="https://res.cloudinary.com/dp50h8gbe/image/upload/v1738745363/gwkvk5vkbzvb5b7hosxj.png" alt="Arbilo Logo" width="120" style="display: block; max-width: 100%;">
                  </td>
                </tr>
                <tr>
                  <td align="center" bgcolor="#222222" style="padding: 15px; color: #ffffff; font-size: 24px; font-weight: bold;">
                    ${newsletterSubject || 'Newsletter Subject'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px; color: #444; font-size: 16px; line-height: 1.5;">
                    <p style="margin: 0 0 20px;">Having trouble viewing this email? <a href="#" style="color: #222222;">View it in your browser</a>.</p>
                    <p style="margin: 0 0 20px;">Dear Subscriber,</p>
                    ${newsletterContent.replace(/<p>(.*)<img(.*?)>(.*?)<\/p>/g, '<p>$1</p><img$2><p>$3</p>')}
                    <p style="margin: 20px 0 0; font-size: 14px; color: #555;">
                      Want to stop receiving these emails? <a href="#" style="color: #222222; text-decoration: underline;">Unsubscribe</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center" bgcolor="#eeeeee" style="padding: 15px; font-size: 14px; color: #555;">
                    <p style="margin: 0 0 10px;"><strong>Stay Connected</strong></p>
                    <table cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td style="padding: 0 5px;">
                          <a href="https://facebook.com/yourpage"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="30" alt="Facebook" style="display: block;"></a>
                        </td>
                        <td style="padding: 0 5px;">
                          <a href="https://twitter.com/yourpage"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" width="30" alt="Twitter" style="display: block;"></a>
                        </td>
                        <td style="padding: 0 5px;">
                          <a href="https://instagram.com/yourpage"><img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" width="30" alt="Instagram" style="display: block;"></a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 10px 0 0;">© 2025 Arbilo. All rights reserved.</p>
                    <p style="margin: 5px 0 0;">Arbilo, Your City, Your Country</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `);
  };

  // Show full-screen loader when loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subscribers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Newsletter Composition Form */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Send Newsletter</h2>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Newsletter Subject"
            value={newsletterSubject}
            onChange={(e) => setNewsletterSubject(e.target.value)}
            className="w-full"
          />
          <div className="border rounded-md">
            <ReactQuill
              ref={quillRef}
              value={newsletterContent}
              onChange={setNewsletterContent}
              modules={quillModules}
              placeholder="Enter newsletter content..."
              className="h-40 mb-4"
            />
          </div>
          <div className="flex space-x-2">
            <Button
              type="button"
              onClick={handleImageUpload}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              Upload Image
            </Button>
            <Button
              type="button"
              onClick={handlePreview}
              className="bg-gray-500 text-white hover:bg-gray-600"
              disabled={!newsletterContent}
            >
              Preview
            </Button>
            <AlertDialog open={showSendDialog} onOpenChange={setShowSendDialog}>
              <AlertDialogTrigger asChild>
                <Button
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  disabled={isSendingNewsletter || !newsletterSubject || !newsletterContent}
                >
                  {isSendingNewsletter ? 'Sending...' : 'Send Newsletter'}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Newsletter Send</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                  Are you sure you want to send this newsletter to all active subscribers?
                </AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleSendNewsletter}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Send
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="overflow-x-auto rounded-lg">
        <Table className="border border-gray-200">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="px-4 py-2 text-left text-gray-700">Email</TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-700">Status</TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-700">Subscribed At</TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {error ? (
              <TableRow>
                <TableCell colSpan="4" className="text-center py-4 text-red-600">
                  {error}
                </TableCell>
              </TableRow>
            ) : subscribers.length === 0 ? (
              <TableRow>
                <TableCell colSpan="4" className="text-center py-4 text-gray-500">
                  No subscribers found
                </TableCell>
              </TableRow>
            ) : (
              subscribers.map((sub) => (
                <TableRow key={sub.id} className="border-b">
                  <TableCell className="px-4 py-2">{sub.email}</TableCell>
                  <TableCell className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        sub.is_active ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {sub.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {new Date(sub.subscribed_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    <AlertDialog
                      open={selectedSubscriber === sub}
                      onOpenChange={(open) =>
                        open ? setSelectedSubscriber(sub) : setSelectedSubscriber(null)
                      }
                    >
                      <AlertDialogTrigger asChild>
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          disabled={loading}
                        >
                          {sub.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogDescription>
                          Do you want to {sub.is_active ? 'deactivate' : 'activate'} this subscriber?
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={confirmToggle}
                            className="bg-blue-500 text-white hover:bg-blue-600"
                          >
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SubscribersTable;