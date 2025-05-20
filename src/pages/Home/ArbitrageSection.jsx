import { motion } from 'framer-motion';

export default function ArbitrageSection() {
  const cards = [
    {
      title: "ArbiPair",
      description: "Access cryptocurrency price lists highlighting the highest and lowest prices across multiple exchanges.",
      icon: "1",
      link: "https://whop.com/checkout/plan_9RzOL8KjwzHS8/",
    },
    {
      title: "ArbiTrack",
      description: "Leverage Arbilo’s exclusive algorithm to find the most profitable trading pairs and exchanges.",
      icon: "2",
      link: "https://whop.com/checkout/plan_oo91x9FgSm2jL/",
    },
  ];

  return (
    <section className="arbitrage-section bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="home-container px-4 md:px-8 max-w-7xl mx-auto">
        <div className="home-inner-container w-full mx-auto">
          <article className="home-content">
            <header className="home-content-header text-center">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="home-content-heading font-semibold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black pb-3"
              >
                Unlock Profitable Arbitrage with Confidence
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto px-4 md:px-8 mt-4"
              >
                Secure crypto signals ,  putting you in control. Actionable insights, your wallet, your trades, your profits – powered by cutting-edge data science for consistent, reliable gains.
              </motion.p>
            </header>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl md:text-4xl font-semibold leading-tight text-gray-900 text-center mt-12 mb-8"
            >
              Arbitrage Signals
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-8">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
                  className="flex flex-col items-center text-center gap-3 p-4 md:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white font-semibold text-lg mb-4">
                    {card.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-base text-gray-800 mb-4">{card.description}</p>
                  <button
                    onClick={() => handleBuyClick(card.link)}
                    className="rounded-md bg-black px-4 py-2 text-sm md:text-base font-semibold text-white shadow-sm hover:bg-gray-800  duration-300"
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