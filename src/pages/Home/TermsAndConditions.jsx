import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';


const TermsAndConditions = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <Helmet>
        <title>ArbiPair Terms and Conditions</title>
        <meta
          name="description"
          content="Review the Terms and Conditions for using ArbiPair's crypto arbitrage tools and services."
        />
        <meta
          name="keywords"
          content="ArbiPair, terms and conditions, crypto arbitrage, trading platform"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="ArbiPair Terms and Conditions" />
        <meta
          property="og:description"
          content="Understand the terms governing your use of ArbiPair's services for crypto arbitrage trading."
        />
        <meta property="og:image" content="/assets/images/logo2.png" />
        <meta property="og:url" content="https://yourwebsite.com/terms" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Terms and Conditions",
            "description": "Terms and Conditions for using ArbiPair's crypto arbitrage tools and services.",
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
      <section className=" py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className=" mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              Terms and Conditions
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
                content:
                  'These Terms and Conditions ("Terms") govern your use of Arbilo.com. By accessing or using our services, you agree to comply with these Terms.',
              },
              {
                title: 'Eligibility',
                content:
                  'You must be at least 18 years old or of legal age in your jurisdiction to use our services.',
              },
              {
                title: 'Services Provided',
                content:
                  'Arbilo.com offers tools, signals, and insights for crypto arbitrage trading. Our services are informational and educational only and do not constitute financial or investment advice. Arbilo.com is not a financial advisor company; we provide information based on technology and user needs. Users must exercise caution and make informed decisions.',
              },
              {
                title: 'User Responsibilities',
                content: (
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Maintain the confidentiality of your account information.</li>
                    <li>Use our services for lawful purposes only.</li>
                    <li>Acknowledge that all trading decisions are solely your responsibility.</li>
                  </ul>
                ),
              },
              {
                title: 'Fees and Payments',
                content: (
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>All fees for monthly or quarterly packages are non-refundable.</li>
                    <li>Payments are processed through secure third-party providers.</li>
                    <li>Subscriptions canceled by users will remain active until the end of the subscription period. There will be no prorated refunds for the remaining period.</li>
                  </ul>
                ),
              },
              {
                title: 'Disclaimer of Liability',
                content:
                  'Arbilo.com is not responsible for any financial losses or damages resulting from the use of our services. Crypto trading carries inherent risks, and past performance is not indicative of future results.',
              },
              {
                title: 'Intellectual Property',
                content:
                  'All content on Arbilo.com, including algorithms, tools, and trademarks, is owned by us and protected by intellectual property laws.',
              },
              {
                title: 'Termination',
                content:
                  'We reserve the right to terminate or suspend your access for violations of these Terms.',
              },
              {
                title: 'Contact Us',
                content: (
                  <p>
                    For questions, email us at{' '}
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
                className="   transition-shadow duration-300"
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

export default TermsAndConditions;