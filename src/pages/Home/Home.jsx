import React from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import Pricing from "./Pricing";
import FAQs from "./FAQs";
import CTA from "./CTA";
import Scroll from "@/components/Scroll/Scroll";
import Tips from "./Tips";
import { Helmet } from "react-helmet";
import ArbiPairSection from "./ArbiPairSection";
import ArbitrageSection from "./ArbitrageSection";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>
          Arbilo - Crypto Arbitrage Signals - World's First Pair Based
          Arbitrage System
        </title>
        <meta
          name="description"
          content="Maximize your crypto profits with ArbiPair's pair-based arbitrage algorithm. Get actionable signals for high-potential trades across top exchanges."
        />
        <meta
          name="keywords"
          content="crypto arbitrage, ArbiPair, ArbiTrack, crypto signals, cryptocurrency trading"
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Boost Your Crypto Profits with ArbiPair"
        />
        <meta
          property="og:description"
          content="Discover profitable crypto arbitrage opportunities with ArbiPair's cutting-edge algorithm."
        />
        <meta property="og:image" content="/assets/images/arbisignal.png" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <section id="home-section" class="home-section hero-section bg-white ">
        <div class="home-container px-4 sm:px-6 md:px-8 lg:px-12">
          <div class="home-inner-container w-full max-w-7xl mx-auto">
            <header class="home-header py-12 sm:py-16 md:py-20  ">
              <div class="home-title text-center">
                <motion.div
                  class="home-title-inner w-full max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.div
                    class="home-title-text mt-0 mb-6"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  >
                    <h1 class="home-title-heading font-semibold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black">
                      Boost Your Crypto Profits Like Never Before
                    </h1>
                  </motion.div>
                  <motion.div
                    class="home-subtitle w-full max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  >
                    <div class="home-subtitle-text text-base sm:text-lg md:text-xl lg:text-2xl text-black">
                      Powered by the World’s First Pair-Based Arbitrage
                      Algorithm
                    </div>
                  </motion.div>
                </motion.div>
              </div>
              <motion.div
                class="home-buttons mb-8 mt-6 sm:mt-8 md:mt-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              >
                <div class="home-buttons-container flex flex-col sm:flex-row gap-4 sm:gap-3 items-center justify-center">
                  <motion.div
                    class="home-button-wrapper w-full sm:w-auto"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="how-it-works-section"
                      smooth={true}
                      duration={500}
                      class="cursor-pointer home-button gap-2 border border-black bg-black text-white text-center rounded-md justify-center items-center py-3 sm:py-4 px-6 sm:px-7 font-medium transition-all flex shadow-sm text-base sm:text-lg w-full sm:w-auto hover:bg-gray-800 hover:border-gray-800"
                    >
                      <div>Profitable Unique Signals</div>
                    </Link>
                  </motion.div>
                  <motion.div
                    class="home-button-wrapper w-full sm:w-auto"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="pricing-section"
                      smooth={true}
                      duration={500}
                      class="home-button-secondary cursor-pointer gap-2 border border-gray-800 bg-white text-gray-800 text-center rounded-md justify-center items-center py-3 sm:py-4 px-6 sm:px-7 font-medium transition-all flex shadow-sm text-base sm:text-lg w-full sm:w-auto hover:bg-gray-800 hover:text-white hover:border-gray-800 relative"
                    >
                      <div class="flex items-center justify-center">
                        Simple and Low Pricing
                      </div>
                      <span class="bg-black text-white text-xs font-bold rounded-sm px-2 py-1 absolute -top-2 -right-2 sm:static sm:ml-2">
                        60% off
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </header>
          </div>
        </div>
      </section>

      <ArbitrageSection />
      <ArbiPairSection />

      <section className="pair-point-section bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="home-container px-4 md:px-8 max-w-7xl mx-auto">
          <div className="home-inner-container w-full mx-auto">
            <article className="home-header ">
              <header className="home-title text-center">
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="home-title-inner w-full max-w-6xl mx-auto"
                >
                  <div className="home-subtitle w-full max-w-6xl mx-auto pb-8">
                    <h2 className="pair-point-description text-2xl font-semibold leading-tight text-center text-black md:text-4xl">
                      How ArbiTrack Works
                    </h2>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="home-title-text mx-auto max-w-3xl"
                  >
                    <p className="home-subtitle-text text-lg md:text-xl text-gray-600 pb-8">
                      Simplify crypto arbitrage with ArbiScan. Automatically
                      identify price differences across exchanges to buy low,
                      sell high, and maximize your profits effortlessly.
                    </p>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10">
                    {[
                      {
                        title: "Buy at the Lowest Price",
                        text: "Purchase Coin A at a low price on Exchange A using USDT or fiat, then transfer it to Exchange B.",
                        icon: "1",
                      },
                      {
                        title: "Sell at the Highest Price",
                        text: "Sell Coin A on Exchange B against USDT or fiat currency, capturing the price difference for profit.",
                        icon: "2",
                      },
                      {
                        title: "Prepare for the Next Trade",
                        text: "Transfer USDT to the exchange with the next low-price signal or withdraw fiat directly to your bank, ready to seize the next profitable arbitrage opportunity.",
                        icon: "3",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * index, duration: 0.6 }}
                        className="box p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-start gap-4"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white font-semibold text-lg">
                          {item.icon}
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">
                          {item.title}
                        </h2>
                        <p className="text-gray-800 text-base text-center">
                          {item.text}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </header>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex justify-center items-center text-base text-gray-600 pb-8 text-center"
              >
                <p className="border-b-2 border-gray-300 px-8 py-2 max-w-md">
                  *Remember to follow the best practices listed in the Tips
                  section to get the most out of this.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="home-content-title text-center py-12"
              >
                <div className="home-content-title-inner w-full max-w-6xl mx-auto">
                  <div className="home-content-title-text pb-8">
                    <h2 className="home-content-heading text-2xl font-semibold leading-tight text-center text-black md:text-4xl">
                      Sample ArbiTrack Signals
                    </h2>
                  </div>
                  <div className="w-full signal_wrapper max-w-4xl mx-auto">
                    <motion.img
                      src="/assets/images/arbitrack.png"
                      alt="ArbiTrack Signals"
                      className="mx-auto  max-w-full h-auto"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.6 }}
                    />
                  </div>
                </div>
              </motion.div>
            </article>
          </div>
        </div>
      </section>

      <section id="pricing-section" className="pricing-section">
        <Pricing />
      </section>

      <section id="faq-section" className="faq-section">
        <FAQs />
      </section>
      <section className="tips" id="tips">
        <Tips />
      </section>
      <section id="contact-section" className="contact-section">
        <CTA />
      </section>

      <Scroll />
    </>
  );
};

export default Home;
