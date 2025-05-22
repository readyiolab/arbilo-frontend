import { motion } from 'framer-motion';

export default function ArbiPairSection() {
  const steps = [
    {
      title: "Buy at Exchange A",
      description: "Buy Coin 1 at Exchange A using USDT. Transfer it to Exchange B.",
      icon: "1",
    },
    {
      title: "Sell at Exchange B",
      description: "Sell Coin 1 at Exchange B for USDT.",
      icon: "2",
    },
    {
      title: "Buy Coin 2",
      description: "Use the USDT to buy Coin 2 at Exchange B. Transfer Coin 2 to Exchange A.",
      icon: "3",
    },
    {
      title: "Complete the Cycle",
      description: "Sell Coin 2 at Exchange A for USDT to complete the cycle.",
      icon: "4",
    },
  ];

  return (
    <section id="how-it-works-section" className="how-it-works-section bg-gradient-to-b from-white to-gray-50 py-12">
      <article className="home-content-title text-center">
        <header className="home-content-title-inner w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="home-content-title-text pb-8">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="home-content-heading mb-10 text-3xl sm:text-4xl font-bold text-center text-gray-900"
            >
              How ArbiPair Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto px-4 md:px-8 py-6"
            >
              Discover today's best crypto signals for substantial profits. Get expert insights on high-potential coin pairs and top exchanges. Start maximizing your crypto gains now!
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="profit-cycle-wrapper max-w-7xl mx-auto mb-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white font-semibold text-lg mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-base text-gray-800">{step.description}</p>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex justify-center mt-8"
            >
              <p className="text-base text-gray-600 px-8 py-2 max-w-md text-center border-b-2 border-gray-300">
                *Monitor the signal and repeat Steps 1-4 to continue earning profits
              </p>
            </motion.div>
          </motion.div>
          <div className="home-content-title text-center py-12">
            <div className="home-content-title-inner w-full max-w-7xl mx-auto">
              <div className="home-content-title-text pb-8">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="home-content-heading text-3xl md:text-4xl font-semibold leading-tight text-gray-900"
                >
                  Sample ArbiPair Signals
                </motion.h2>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full signal_wrapper max-w-4xl mx-auto"
              >
                <img
                  src="/assets/images/arbisignal.webp"
                  alt="Sample ArbiPair Signals"
                  className="mx-auto bg-gradient-to-b from-white to-gray-50  max-w-full h-auto bg-"
                />
              </motion.div>
            </div>
          </div>
          
        </header>
      </article>
    </section>
  );
}