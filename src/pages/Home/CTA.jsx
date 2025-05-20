import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import config from '@/config.js/config';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const CTA = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading('Sending your message...');

    try {
      const response = await axios.post(`${config.API_URL}/api/auth/contact-us`, formData);
      setFormData({ name: '', email: '', message: '' });
      toast.success(response.data.message || 'Message sent successfully!', { id: toastId });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send the message.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <Toaster />
        <div className="mx-auto max-w-screen-md">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="mb-10 text-3xl sm:text-4xl font-bold text-center text-gray-900">
              Contact Us
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              Have a question? We're here to help! Simply fill out the form below or send us an email, and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              variants={sectionVariants}
            >
              <motion.div variants={sectionVariants}>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full text-sm text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </motion.div>
              <motion.div variants={sectionVariants}>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full text-sm text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </motion.div>
              <motion.div variants={sectionVariants}>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Leave a message..."
                  required
                  className="w-full text-sm text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </motion.div>
              <motion.div variants={sectionVariants} className="text-center">
                <Button
                  type="submit"
                  disabled={loading}
                  className="py-3 px-5 text-sm font-medium text-white bg-black hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 disabled:opacity-50"
                >
                  {loading ? 'Sending message...' : 'Send message'}
                </Button>
              </motion.div>
              <motion.p
                variants={sectionVariants}
                className="text-center text-sm sm:text-base text-gray-600"
              >
                You can also reach us directly at{' '}
                <a
                  href="mailto:hello@arbilo.com"
                  className="text-blue-600 hover:underline"
                  aria-label="Email ArbiPair support"
                >
                  hello@arbilo.com
                </a>
              </motion.p>
            </motion.form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CTA;