import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { 
  Twitter, 
  Send, 
  Disc, 
  Linkedin,
  ArrowRight,
  Mail,
  Facebook,
  Youtube
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { InstagramLogoIcon } from '@radix-ui/react-icons';
import { FaYoutube } from 'react-icons/fa';
import config from '@/config.js/config';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navLinks = [
    
    { to: "how-it-works-section", label: "How it Works", type: "scroll" },
    { to: "pricing-section", label: "Pricing", type: "scroll" },
    { to: "faq-section", label: "FAQs", type: "scroll" },
    { to: "tips", label: "Tips", type: "scroll" },
    { to: "/blog-section", label: "Blog", type: "route" },
    { to: "contact-section", label: "Contact", type: "scroll" },
  ];

  const quickLinks = [
    { to: "/privacy-policy", label: "Privacy Policy", type: "route" },
    { to: "/terms-and-conditions", label: "Terms & Conditions", type: "route" },
    { to: "/earning-disclaimer", label: "Earning Disclaimer", type: "route" },
  ];

  const socialLinks = [
    { icon: InstagramLogoIcon, href: "https://www.instagram.com/arbilo01/", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61576167397019", label: "Facebook" },
    { icon: FaYoutube, href: "https://www.youtube.com/@Arbilo-p2p", label: "Youtube" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/arbilo", label: "LinkedIn" },
  ];

  const handleSubscribe = async () => {
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${config.API_URL}/api/newsletter/subscribe`, { email });
      setMessage(response.data.message || 'Thank you for subscribing to our newsletter!');
      setEmail('');
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="bg-black rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white max-w-xl">
              <h2 className="text-3xl font-bold mb-3">Stay Ahead of the Market</h2>
              <p className="text-gray-300">Subscribe to receive real-time trading signals and exclusive market insights directly to your inbox.</p>
            </div>
            
            <div className="w-full max-w-md">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full bg-white border-0 text-gray-800 placeholder-gray-400 rounded-lg"
                    required
                  />
                </div>
                <Button
                  onClick={handleSubscribe}
                  disabled={loading || !email}
                  className="bg-white text-black hover:bg-gray-100 font-medium rounded-lg px-6 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Subscribing...' : 'Subscribe'} 
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </Button>
              </div>
              {message && <p className="text-white text-sm mt-2 bg-gray-700/40 px-3 py-1 rounded">{message}</p>}
              {error && <p className="text-white text-sm mt-2 bg-red-700/40 px-3 py-1 rounded">{error}</p>}
              <p className="text-xs text-gray-300 mt-2">Your data is secure. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <img src="/assets/images/logo2.webp" alt="Arbilo logo" className="w-auto h-8" />
            </div>
            <p className="text-gray-600 leading-relaxed">
              Advanced crypto arbitrage solutions powered by real-time market data and AI-driven insights.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 p-2 rounded-full text-gray-600 hover:bg-gray-200 hover:text-black transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Explore</h3>
            <ul className="space-y-3">
              {navLinks.slice(0, 5).map(({ to, label, type }) => (
                <li key={label}>
                  {type === "scroll" ? (
                    <button
                      onClick={() => handleScroll(to)}
                      className="text-gray-600 hover:text-black transition-colors flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-500"></span> {label}
                    </button>
                  ) : (
                    <NavLink
                      to={to}
                      className={({ isActive }) => 
                        `text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 ${isActive ? 'text-blue-600 font-medium' : ''}`
                      }
                    >
                      <span className="w-1 h-1 rounded-full bg-blue-500"></span> {label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {/* More Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Resources</h3>
            <ul className="space-y-3">
              {navLinks.slice(5).map(({ to, label, type }) => (
                <li key={label}>
                  {type === "scroll" ? (
                    <button
                      onClick={() => handleScroll(to)}
                      className="text-gray-600 hover:text-black transition-colors flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-500"></span> {label}
                    </button>
                  ) : (
                    <NavLink
                      to={to}
                      className={({ isActive }) => 
                        `text-gray-600 hover:text-black transition-colors flex items-center gap-2 ${isActive ? 'text-blue-600 font-medium' : ''}`
                      }
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-500"></span> {label}
                    </NavLink>
                  )}
                </li>
              ))}
              {quickLinks.map(({ to, label }) => (
                <li key={label}>
                  <NavLink
                    to={to}
                    className={({ isActive }) => 
                      `text-gray-600 hover:text-black transition-colors flex items-center gap-2 ${isActive ? 'text-blue-600 font-medium' : ''}`
                    }
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-500"></span> {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Legal</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Crypto trading involves significant risks, including potential loss of investment. 
              Users should understand these risks and conduct thorough research. 
              Arbilo is not liable for any losses resulting from reliance on the information provided.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              By using our website, you agree to our{' '}
              <NavLink to="/terms-and-conditions" className="text-gray-800 hover:underline">
                Terms and Conditions
              </NavLink>
              ,{' '}
              <NavLink to="/privacy-policy" className="text-gray-800 hover:underline">
                Privacy Policy
              </NavLink>
              , and{' '}
              <NavLink to="/earning-disclaimer" className="text-gray-800 hover:underline">
                Earning Disclaimer
              </NavLink>
              .
            </p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Arbilo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;