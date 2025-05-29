import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import config from '@/config.js/config';

const NewsletterUnsubscribe = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const unsubscribe = async () => {
      const token = searchParams.get('token');
      if (!token) {
        setError('Invalid or missing token');
        return;
      }

      try {
        const response = await axios.get(`${config.API_URL}/api/newsletter/unsubscribe`, {
          params: { token },
        });
        setMessage(response.data.message);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to unsubscribe');
      }
    };

    unsubscribe();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
        <img src="/assets/images/logo2.webp" alt="Arbilo logo" className="w-24 mx-auto mb-6" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Newsletter Unsubscription</h2>
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
        <a href="/" className="text-black hover:underline mt-4 inline-block">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NewsletterUnsubscribe;