import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const EarningDisclaimer = () => {
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
        <title>ArbiPair Earning Disclaimer</title>
        <meta
          name="description"
          content="Review ArbiPair's Earning Disclaimer for information on risks and responsibilities in crypto arbitrage trading."
        />
        <meta
          name="keywords"
          content="ArbiPair, earning disclaimer, crypto arbitrage, trading risks"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="ArbiPair Earning Disclaimer" />
        <meta
          property="og:description"
          content="Understand the risks and limitations of earnings with ArbiPair's crypto arbitrage tools."
        />
        <meta property="og:image" content="/assets/images/logo2.png" />
        <meta property="og:url" content="https://yourwebsite.com/earning-disclaimer" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Earning Disclaimer",
            "description": "Earning Disclaimer for using ArbiPair's crypto arbitrage tools and services.",
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
              Earning Disclaimer
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
                title: 'No Guarantee of Earnings',
                content: (
                  <p className="text-sm sm:text-base text-gray-600">
                    Arbilo.com does not guarantee any specific financial results or earnings. The use of our tools and services does not ensure profitability in crypto trading.
                  </p>
                ),
              },
              {
                title: 'Risk Disclosure',
                content: (
                  <p className="text-sm sm:text-base text-gray-600">
                    Crypto arbitrage trading involves high risks, including the potential loss of your entire investment. You should only trade with funds you can afford to lose.
                  </p>
                ),
              },
              {
                title: 'Informational Purposes Only',
                content: (
                  <p className="text-sm sm:text-base text-gray-600">
                    All information provided by Arbilo.com is for educational purposes and does not constitute financial or investment advice. Arbilo.com is not a financial advisor company; we provide information based on technology and user needs. Users must exercise caution and seek professional advice when necessary.
                  </p>
                ),
              },
              {
                title: 'Independent Decision-Making',
                content: (
                  <p className="text-sm sm:text-base text-gray-600">
                    Users are solely responsible for their trading decisions. We encourage consulting with a qualified financial advisor before engaging in crypto trading.
                  </p>
                ),
              },
              {
                title: 'No Liability',
                content: (
                  <p className="text-sm sm:text-base text-gray-600">
                    Arbilo.com is not liable for any losses, damages, or financial outcomes arising from the use of our services.
                  </p>
                ),
              },
              {
                title: 'Updates to This Disclaimer',
                content: (
                  <p className="text-sm sm:text-base text-gray-600">
                    We reserve the right to update this disclaimer at any time. Updates will be posted on this page.
                  </p>
                ),
              },
              {
                title: 'Contact Information',
                content: (
                  <p className="text-sm sm:text-base text-gray-600">
                    For inquiries, please contact{' '}
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

export default EarningDisclaimer;