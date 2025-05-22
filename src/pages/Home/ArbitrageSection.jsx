import { motion } from 'framer-motion';

export default function ArbitrageSection() {
  const cards = [
    {
      title: "ArbiPair",
      description: "Access cryptocurrency price lists highlighting the highest and lowest prices across multiple exchanges.",
      link: "https://whop.com/checkout/plan_9RzOL8KjwzHS8/",
    },
    {
      title: "ArbiTrack",
      description: "Leverage Arbilo’s exclusive algorithm to find the most profitable trading pairs and exchanges.",
      link: "https://whop.com/checkout/plan_oo91x9FgSm2jL/",
    },
  ];

  // Handle button click to navigate to the link
  const handleBuyClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="arbitrage-section bg-gradient-to-b from-white to-gray-50 py-8 sm:py-12 min-h-screen flex items-center">
      <div className="home-container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="home-inner-container w-full mx-auto">
          <article className="home-content">
            <header className="home-content-header text-center">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="home-content-heading font-semibold leading-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black pb-3"
              >
                Unlock Profitable Arbitrage with Confidence
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 sm:px-6 mt-4"
              >
                Secure crypto signals, putting you in control. Actionable insights, your wallet, your trades, your profits – powered by cutting-edge data science for consistent, reliable gains.
              </motion.p>
            </header>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight text-gray-900 text-center mt-8 sm:mt-12 mb-6 sm:mb-8"
            >
              Arbitrage Signals
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
                  className="flex flex-col items-center text-center gap-3 p-4 sm:p-5 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-sm sm:text-base text-gray-800 mb-4">{card.description}</p>
                  <button
                    onClick={() => handleBuyClick(card.link)}
                    className="rounded-md bg-black px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-gray-800 duration-300"
                  >
                    {card.title === "ArbiPair" ? "Discover Price Differences" : "Unique Arbitrage Pairs"}
                  </button>
                </motion.div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}