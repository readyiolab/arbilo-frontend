import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpenIcon,
  CheckCircleIcon,
  LightbulbIcon,
  StarIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
} from "lucide-react";

const Tips = () => {
  const [activeTab, setActiveTab] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const tabContentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  };

  const sections = [
    {
      title: "Build a Strong Foundation",
      items: [
        {
          title: "Begin in Stable Markets",
          description:
            "Start trading in stable markets with lower volatility to build confidence. Avoid bull and bear runs initially, as they bring high fluctuations. Pro traders can leverage volatility for arbitrage.",
          icon: <ShieldCheckIcon className="w-6 h-6 text-black" />,
        },
        {
          title: "Start Small",
          description:
            "Begin with small trades to minimize risk while mastering ArbiPair and ArbiTrack. Larger trades yield better results but require experience.",
          icon: <LightbulbIcon className="w-6 h-6 text-black" />,
        },
        {
          title: "Understand Arbitrage Basics",
          description:
            "Master crypto arbitrage fundamentals. Practice with paper trading using Arbilo’s signals before risking real funds.",
          icon: <BookOpenIcon className="w-6 h-6 text-black" />,
        },
      ],
    },
    {
      title: "Essential Pre-Trade Checks",
      items: [
        {
          title: "Verify Exchange Functionality",
          description:
            "Confirm deposits and withdrawals are active on your chosen exchanges, as these can be temporarily suspended.",
          icon: <CheckCircleIcon className="w-6 h-6 text-black" />,
        },
        {
          title:
            "Check Signal Profit jefe: Ensure deposits and withdrawals are active on your chosen exchanges, as these can be temporarily suspended.",
          icon: <StarIcon className="w-6 h-6 text-black" />,
        },
      ],
    },
    {
      title: "Optimize with Tools",
      items: [
        {
          title: "Identify Reliable Exchanges",
          description:
            "Use ArbiPair to track exchanges with frequent profitable signals. Keep funds in USDT for quick trades.",
          icon: <CheckCircleIcon className="w-6 h-6 text-black" />,
        },
        {
          title: "Efficient Coin Transfers",
          description:
            "Buy coins simultaneously on listed exchanges, transfer, and sell back to USDT to minimize costs.",
          icon: <StarIcon className="w-6 h-6 text-black" />,
        },
        {
          title: "Leverage Futures and Options",
          description: [
            "Combine ArbiTrack signals with futures and options for higher profits. Execute long or short trades to lock in gains.",
            "Caution: Futures are risky. Use stop-losses and monitor volatility carefully.",
          ],
          icon: <TrendingUpIcon className="w-6 h-6 text-black" />,
        },
      ],
    },
    {
      title: "Pro Tips for Success",
      items: [
        {
          title: "Keep a Trading Journal",
          description:
            "Document trades to refine your strategy and improve decision-making over time.",
          icon: <BookOpenIcon className="w-6 h-6 text-black" />,
        },
        {
          title: "Stay Adaptable",
          description:
            "Monitor market trends and adjust your approach to seize new opportunities.",
          icon: <StarIcon className="w-6 h-6 text-black" />,
        },
        {
          title: "Use ArbiPoint Tools",
          description:
            "Leverage ArbiPair and ArbiTrack for streamlined, profitable arbitrage.",
          icon: <CheckCircleIcon className="w-6 h-6 text-black" />,
        },
      ],
    },
    {
      title: "Key Reminders",
      items: [
        {
          title: "Patience Pays Off",
          description:
            "Success in arbitrage comes from consistency and disciplined trading.",
          icon: <CheckCircleIcon className="w-6 h-6 text-black" />,
        },
        {
          title: "Avoid Emotional Trading",
          description:
            "Stick to your strategy and wait for high-profitability signals.",
          icon: <ShieldCheckIcon className="w-6 h-6 text-black" />,
        },
      ],
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-semibold leading-tight text-center text-black md:text-4xl pb-4">
            Trading Tips
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock the power of crypto arbitrage with these expert tips, crafted
            to elevate your trading game.
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 border-b-2 p-5 border-gray-200">
            {sections.map((section, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`py-3 px-4 text-sm sm:text-base font-medium transition-all duration-300 relative
                  ${
                    activeTab === index
                      ? "text-white border-2 rounded-xl border-black bg-black"
                      : "text-gray-600 "
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.title}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className=" rounded-xl  p-6 sm:p-8"
          >
            <div className="grid gap-6">
              {sections[activeTab].items.map((item, itemIndex) => (
                <motion.div
                  key={itemIndex}
                  variants={itemVariants}
                  className="flex items-start space-x-4 p-4  transition-colors duration-200"
                >
                  {item.icon}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    {Array.isArray(item.description) ? (
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm sm:text-base">
                        {item.description.map((desc, idx) => (
                          <li key={idx}>{desc}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600 text-sm sm:text-base">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Tips;
