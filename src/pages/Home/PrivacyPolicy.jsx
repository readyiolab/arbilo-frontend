import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
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
        <title>ArbiPair Privacy Policy</title>
        <meta
          name="description"
          content="Review ArbiPair's Privacy Policy to understand how we collect, use, and protect your personal information."
        />
        <meta
          name="keywords"
          content="ArbiPair, privacy policy, data protection, crypto arbitrage"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="ArbiPair Privacy Policy" />
        <meta
          property="og:description"
          content="Learn about how ArbiPair handles your personal data and ensures your privacy."
        />
        <meta property="og:image" content="/assets/images/logo2.png" />
        <meta property="og:url" content="https://yourwebsite.com/privacy" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy",
            "description": "Privacy Policy for using ArbiPair's crypto arbitrage tools and services.",
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
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              Privacy Policy
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              Last Updated: 5 January 2025
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {[
              {
                title: 'Introduction',
                content: (
                  <p className="text-sm sm:text-base text-gray-600">
                    Arbilo.com ("we," "us," "our") values your privacy. This Privacy Policy outlines how we collect, use, disclose, and protect your information. By using Arbilo.com, you agree to this Privacy Policy.
                  </p>
                ),
              },
              {
                title: 'Information We Collect',
                content: (
                  <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                    <li><strong>Personal Information:</strong> Name, email address, phone number, and payment information.</li>
                    <li><strong>Usage Data:</strong> IP address, browser type, pages visited, and interaction data.</li>
                    <li><strong>Cookies:</strong> Small data files stored on your device to enhance user experience.</li>
                  </ul>
                ),
              },
              {
                title: 'How We Use Your Information',
                content: (
                  <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                    <li>To provide and improve our services.</li>
                    <li>To process payments and manage subscriptions.</li>
                    <li>To communicate updates, offers, and changes to services.</li>
                    <li>To ensure legal compliance and security.</li>
                  </ul>
                ),
              },
              {
                title: 'Disclosure of Your Information',
                content: (
                  <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                    <li><strong>Third-Party Service Providers:</strong> For payment processing, hosting, and analytics.</li>
                    <li><strong>Legal Requirements:</strong> Compliance with applicable laws or to protect our legal rights.</li>
                  </ul>
                ),
              },
              {
                title: 'Your Data Rights',
                content: (
                  <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                    <li>Access, update, or delete your information by contacting us.</li>
                    <li>Opt-out of marketing emails by clicking "unsubscribe."</li>
                  </ul>
                ),
              },
              {
                title: 'Data Security',
                content: (
                  <p className="text-sm sm:text-base text-gray-600">
                    We employ industry-standard measures to protect your data but cannot guarantee absolute security.
                  </p>
                ),
              },
              {
                title: 'Third-Party Links',
                content: (
                  <p className="text-sm sm:text-base text-gray-600">
                    Our website may contain links to external sites. We are not responsible for their privacy practices.
                  </p>
                ),
              },
              {
                title: 'Changes to This Policy',
                content: (
                  <p className="text-sm sm:text-base text-gray-600">
                    We reserve the right to update this Privacy Policy at any time. Updates will be posted on this page.
                  </p>
                ),
              },
              {
                title: 'Contact Us',
                content: (
                  <p className="text-sm sm:text-base text-gray-600">
                    For questions or concerns, email us at{' '}
                    <a
                      href="mailto:hello@arbilo.com"
                      className="text-blue-600 hover:underline"
                      aria-label="Email ArbiPair support"
                    >
                      hello@arbilo.com
                    </a>.
                  </p>
                ),
              },
            ].map((section, index) => (
              <motion.div
                key={index}
                className="transition-shadow duration-300"
                variants={sectionVariants}
              >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                  {`${index + 1}. ${section.title}`}
                </h2>
                <div className="text-sm sm:text-base text-gray-600">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;