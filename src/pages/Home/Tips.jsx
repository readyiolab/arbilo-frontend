import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { BookOpenIcon, CheckCircleIcon, LightbulbIcon, StarIcon, ShieldCheckIcon } from 'lucide-react';

const Tips = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <Helmet>
        <title>ArbiPair Trading Tips - Maximize Your Crypto Arbitrage</title>
        <meta
          name="description"
          content="Learn expert trading tips to maximize your crypto arbitrage profits using ArbiPair and ArbiTrack signals. Start small, trade smart, and optimize your strategy."
        />
        <meta
          name="keywords"
          content="crypto trading tips, ArbiPair, ArbiTrack, crypto arbitrage, trading strategies"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="ArbiPair Trading Tips - Maximize Your Crypto Arbitrage" />
        <meta
          property="og:description"
          content="Discover how to leverage ArbiPair and ArbiTrack for profitable crypto trading with our expert tips."
        />
        <meta property="og:image" content="/assets/images/arbisignal.png" />
        <meta property="og:url" content="https://yourwebsite.com/#tips" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "ArbiPair Trading Tips",
            "description": "Learn expert tips to maximize your crypto arbitrage profits with ArbiPair and ArbiTrack.",
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
      <section id="tips" className="py-10 sm:py-14 lg:py-18 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className=" mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="mb-10 text-3xl sm:text-4xl font-bold text-center text-gray-900">
              Trading Tips
            </h2>
          </motion.div>

          {/* Starting Out Section */}
          <motion.section
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-8 text-center">
              Starting Out: Build a Strong Foundation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Begin in Stable Markets',
                  description:
                    'Start trading in stable markets with lower volatility. Avoid bull and bear runs initially, as they can bring high fluctuations. Pro traders can leverage volatility for arbitrage.',
                  icon: <ShieldCheckIcon className="w-8 h-8 text-gray-800" />,
                },
                {
                  title: 'Start Small',
                  description:
                    'Begin with small trades to minimize risk while learning ArbiPair and ArbiTrack. Larger trades yield better results but require confidence.',
                  icon: <LightbulbIcon className="w-8 h-8 text-gray-800" />,
                },
                {
                  title: 'Understand Arbitrage Basics',
                  description:
                    'Learn crypto arbitrage thoroughly. Practice with paper trading using Arbilo’s signals before committing real funds.',
                  icon: <BookOpenIcon className="w-8 h-8 text-gray-800" />,
                },
              ].map((tip, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col min-h-[180px]"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    {tip.icon}
                    <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 flex-grow">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Preparing to Trade Section */}
          <motion.section
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-8 text-center">
              Preparing to Trade: Essential Checks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Verify Exchange Functionality',
                  description:
                    'Ensure deposits and withdrawals are active on your chosen exchanges, as these can be temporarily suspended.',
                  icon: <CheckCircleIcon className="w-8 h-8 text-gray-800" />,
                },
                {
                  title: 'Check Signal Profitability',
                  description:
                    'Trade only when signals show a good profit margin, accounting for fees, transfer costs, and liquidity to avoid slippage.',
                  icon: <StarIcon className="w-8 h-8 text-gray-800" />,
                },
              ].map((tip, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col min-h-[180px]"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    {tip.icon}
                    <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 flex-grow">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Optimizing Signals Section */}
          <motion.section
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-8 text-center">
              Optimizing with ArbiPair and ArbiTrack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Identify Reliable Exchanges',
                  description:
                    'Use ArbiPair to track exchanges with frequent profitable signals. Keep funds in USDT for quick trades.',
                  icon: <CheckCircleIcon className="w-8 h-8 text-gray-800" />,
                },
                {
                  title: 'Efficient Coin Transfers',
                  description:
                    'Buy coins simultaneously on listed exchanges, transfer, and sell back to USDT to minimize costs.',
                  icon: <StarIcon className="w-8 h-8 text-gray-800" />,
                },
              ].map((tip, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col min-h-[180px]"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    {tip.icon}
                    <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 flex-grow">{tip.description}</p>
                </motion.div>
              ))}
            </div>
            <motion.div
              variants={cardVariants}
              className="mt-8 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center space-x-3 mb-4">
                <BookOpenIcon className="w-8 h-8 text-gray-800" />
                <h3 className="text-lg font-semibold text-gray-900">Leverage Futures and Options</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                <li>Combine ArbiTrack signals with futures and options for higher profits. Execute long or short trades to lock in gains.</li>
                <li>Caution: Futures are risky. Use stop-losses and monitor volatility carefully.</li>
              </ul>
            </motion.div>
          </motion.section>

          {/* Pro Tips Section */}
          <motion.section
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-8 text-center">
              Pro Tips for Long-Term Success
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Keep a Trading Journal',
                  description:
                    'Document trades to refine your strategy and improve decision-making.',
                  icon: <BookOpenIcon className="w-8 h-8 text-gray-800" />,
                },
                {
                  title: 'Stay Adaptable',
                  description:
                    'Monitor market trends and adapt your approach to capitalize on opportunities.',
                  icon: <StarIcon className="w-8 h-8 text-gray-800" />,
                },
                {
                  title: 'Use ArbiPoint Tools',
                  description:
                    'Leverage ArbiPair and ArbiTrack for simplified, profitable arbitrage.',
                  icon: <CheckCircleIcon className="w-8 h-8 text-gray-800" />,
                },
              ].map((tip, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col min-h-[180px]"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    {tip.icon}
                    <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 flex-grow">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Key Reminders Section */}
          <motion.section
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-8 text-center">
              Key Reminders
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Patience Pays Off',
                  description:
                    'Success in arbitrage comes from consistency and disciplined trading.',
                  icon: <CheckCircleIcon className="w-8 h-8 text-gray-800" />,
                },
                {
                  title: 'Avoid Emotional Trading',
                  description:
                    'Stick to your strategy and wait for high-profitability signals.',
                  icon: <ShieldCheckIcon className="w-8 h-8 text-gray-800" />,
                },
              ].map((tip, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col min-h-[180px]"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    {tip.icon}
                    <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 flex-grow">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </section>
    </>
  );
};

export default Tips;