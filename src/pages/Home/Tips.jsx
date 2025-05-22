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
            "For beginners, start trading in stable markets with lower volatility. Avoid bull and bear runs initially, as they can bring high fluctuations. Pro traders, however, can leverage this volatility to their advantage in arbitrage, making it better suited for experienced traders.",
          icon: <ShieldCheckIcon className="w-6 h-6 text-black" />,
        },
        {
          title: "Start Small",
          description:
            "If you’re new to crypto arbitrage, begin with small trades to minimize risk while familiarizing yourself with strategies and tools like ArbiPair and ArbiTrack. While larger trades yield better results due to lower relative transfer costs, it’s crucial to first build confidence.",
          icon: <LightbulbIcon className="w-6 h-6 text-black" />,
        },
        {
          title: "Understand Arbitrage Basics",
          description:
            "Take the time to thoroughly learn crypto arbitrage. Consistent effort and experience can lead to stable profits over time. Beginners can practice using paper trading with Arbilo's signals before committing real funds.",
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
            "Ensure both deposits and withdrawals are active on the exchanges you plan to trade with, as these functions are sometimes temporarily suspended.",
          icon: <CheckCircleIcon className="w-6 h-6 text-black" />,
        },
        {
          title:
            "Check Signal Profit  ",
          description:"Trade only when signals indicate a good profit margin, accounting for transaction fees, transfer costs, and price fluctuations. Verify liquidity on the suggested exchanges to avoid execution delays or slippage.",
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
            "Use ArbiPair to track which exchanges frequently provide profitable signals. Take notes, observe trends, and keep funds in USDT on those exchanges to execute trades quickly when opportunities arise.",
          icon: <CheckCircleIcon className="w-6 h-6 text-black" />,
        },
        {
          title: "Efficient Coin Transfers",
          description:
            "Pro traders recommend buying Coin 1 and Coin 2 simultaneously on the respective exchanges listed in the signals. Ensure funds are pre-loaded on both Exchange A and Exchange B. Transfer the coins across exchanges, then sell them back to USDT to save time and minimize transfer costs.",
          icon: <StarIcon className="w-6 h-6 text-black" />,
        },
        {
          title: "Leverage Futures and Options",
          description: [
            "Advanced traders can enhance profits by combining ArbiTrack signals with futures and options trading. For example, if a coin’s price is significantly lower or higher on one exchange, execute future trades (long or short) to lock in profits when prices align.",
            "Caution: Futures trading is risky. Only attempt this if you’re experienced, and always use stop-losses and monitor market volatility carefully.",
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
            "Document your trades, including exchanges, signals, and outcomes. Reviewing this data will help refine your strategy, identify trends, and improve decision-making over time.",
          icon: <BookOpenIcon className="w-6 h-6 text-black" />,
        },
        {
          title: "Stay Adaptable",
          description:
            "Arbitrage opportunities vary with market conditions. Regularly monitor trends and adapt your approach to take advantage of evolving opportunities.",
          icon: <StarIcon className="w-6 h-6 text-black" />,
        },
        {
          title: "Use ArbiPoint Tools to Maximize Profits",
          description:
            "Utilize Arbilo’s tools like ArbiPair for advanced pair trading strategies and ArbiTrack for real-time signals. These tools simplify arbitrage, making it accessible and profitable for both beginners and advanced traders.",
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
            "Arbitrage isn’t about instant wealth. Success comes from experience, consistency, and disciplined trading.",
          icon: <CheckCircleIcon className="w-6 h-6 text-black" />,
        },
        {
          title: "Avoid Emotional Trading",
          description:
            "Stick to your strategy and avoid impulsive decisions driven by greed or fear. Wait for the right signals with high profitability and execute trades thoughtfully.",
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
          <h2 className="mb-10 text-3xl sm:text-4xl font-bold text-center text-gray-900">
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
