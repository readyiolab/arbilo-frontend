import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Newsletter = () => {
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

  return (
    <>
      <Helmet>
        <title>ArbiPair Newsletter</title>
        <meta
          name="description"
          content="Subscribe to ArbiPair's newsletter for updates on crypto arbitrage tools and services, and review our privacy and terms information."
        />
        <meta
          name="keywords"
          content="ArbiPair, newsletter, crypto arbitrage, subscription, privacy policy, terms and conditions"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="ArbiPair Newsletter" />
        <meta
          property="og:description"
          content="Stay updated with ArbiPair's newsletter and learn about our crypto arbitrage tools, privacy policy, and terms."
        />
        <meta property="og:image" content="/assets/images/logo2.png" />
        <meta property="og:url" content="https://yourwebsite.com/newsletter" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Newsletter",
            "description": "Newsletter subscription and legal information for ArbiPair's crypto arbitrage tools and services.",
            "publisher": {
              "@type": "Organization",
              "name": "ArbiPair",
              "logo": {
                "@type": "ImageObject",
                "url": "/assets/images/logo2.png",
              },
            },
          })}
        </script>
      </Helmet>
      <section className="border-t pt-5 bg-gray-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row justify-between items-center space-y-10 md:space-y-0"
          >
            {/* Left Section - Content */}
            <motion.div variants={sectionVariants} className="md:w-1/2 flex flex-col items-start">
              <img src="/assets/images/logo2.png" alt="ArbiPair logo" className="w-24 mb-6" />
              <p className="text-gray-600 text-sm sm:text-base mb-4 text-left">
                We use cookies to enhance your experience. By continuing to use our website, you agree to our use of cookies and accept our{' '}
                <Link to="/terms-and-conditions" className="text-black hover:underline">
                  Terms and Conditions
                </Link>
                ,{' '}
                <Link to="/privacy-policy" className="text-black hover:underline">
                  Privacy Policy
                </Link>
                , and{' '}
                <Link to="/earning-disclaimer" className="text-black hover:underline">
                  Earning Disclaimer
                </Link>
                .
              </p>
              <p className="text-gray-600 text-sm sm:text-base text-left">
                The information provided on Arbilo.com is general and does not account for personal circumstances. Crypto trading involves significant risks, including the potential loss of your entire investment. Users should understand these risks, conduct thorough research, and consider seeking independent financial advice before trading. Arbilo.com is not liable for any losses resulting from reliance on the information provided. Use of this website is entirely at your own risk.
              </p>
            </motion.div>

            {/* Right Section - Newsletter Subscription */}
            <motion.div variants={sectionVariants} className="md:w-1/2 flex justify-center md:justify-end w-full">
              <div className="bg-white border p-6 rounded-lg w-full max-w-md shadow-md">
                <h3 className="font-semibold text-gray-900 text-lg sm:text-xl mb-3 text-left">
                  Newsletter Subscription
                </h3>
                <motion.div variants={sectionVariants} className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full sm:flex-1 text-sm text-gray-900 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  />
                  <Button className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 text-sm font-semibold rounded-md">
                    Subscribe
                  </Button>
                </motion.div>
                <p className="text-xs text-gray-500 mt-2 text-left">
                  Your data is secured. Unsubscribe anytime.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Section - Privacy Policy, Terms, and Earning Disclaimer */}
          <motion.div variants={sectionVariants} className=" mt-10 text-center">
            <p className="text-sm text-gray-600">
              <span className="space-x-2">
                <Link to="/privacy-policy" className="text-black hover:underline">
                  Privacy Policy
                </Link>
                <span>|</span>
                <Link to="/terms-and-conditions" className="text-black hover:underline">
                  Terms and Conditions
                </Link>
                <span>|</span>
                <Link to="/earning-disclaimer" className="text-black hover:underline">
                  Earning Disclaimer
                </Link>
              </span>
              <br />
              <span className="text-gray-500 mt-2 block">
                © 2025 Arbilo <span className="ml-2">All rights reserved.</span>
              </span>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;