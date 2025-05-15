import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"; // shadcn Accordion
import { ChevronDown } from "lucide-react"; // Lucide icon for the arrow

const faqs = [
  {
    question: "What is ArbiPair?",
    answer:
      "Discover Arbilo's ArbiPair: a unique algorithm for pair-based crypto arbitrage. Maximize profits across exchanges without fiat transfers. Trade smarter, not harder!",
  },
  {
    question: "How is ArbiPair different from traditional crypto arbitrage?",
    answer:
      "Unlike traditional methods, ArbiPair focuses on pair-based crypto arbitrage, significantly reducing transaction costs and boosting trading efficiency for maximized profits.",
  },
  {
    question: "What is ArbiTrack?",
    answer:
      "Master traditional crypto arbitrage with ArbiTrack. Get real-time price insights across multiple exchanges to buy low and sell high for maximum profit potential.",
  },
  {
    question: "Do I need to share my wallet or keys to use Arbilo?",
    answer:
      "Arbilo ensures your complete privacy and security in crypto arbitrage. Trade directly on your exchanges – no wallet, keys, or passwords shared. Your control, guaranteed.",
  },
  {
    question: "Which exchanges and cryptocurrencies does Arbilo support?",
    answer:
      "Currently, we support the top 30 exchanges and top 30 cryptocurrencies, ensuring access to the most popular and liquid trading opportunities. This list is updated monthly based on user feedback, so feel free to suggest additional cryptocurrencies or exchanges.",
  },
  {
    question: "How often is the data refreshed in Arbilo?",
    answer:
      "The arbitrage table in your back office refreshes every 5 minutes, ensuring you receive up-to-date trading signals. All prices are shown in USD/USDT.",
  },
  {
    question: "How often do we get good signals?",
    answer:
      "Sometimes you may get multiple signals in a single day, and at other times, a great profitable signal with a good percentage of profit may come after a few days. It all depends on market volatility, price movements on exchanges, and trading volume.",
  },
  {
    question: "Any cautions or suggestions for trading with Arbilo's system?",
    answer: [
      "If you’re new to trading, start in stable markets. Bull and bear runs can present high fluctuations but also more opportunities.",
      "Ensure both coin deposits and withdrawals are active on the exchanges you’re trading with, as they may be temporarily suspended.",
      "Trade only when signals show a good profit margin. This accounts for transaction and transfer fees while providing a buffer for price fluctuations.",
    ],
  },
  {
    question: "Can I trade in fiat currency with Arbilo?",
    answer:
      "ArbiPair is designed to eliminate the need for fiat currency transfers, making the process faster and more efficient. However, ArbiTrack can help you find opportunities involving fiat if preferred.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "We do not offer a free trial. However, Arbilo is priced affordably, and even a single successful trade using our signals can generate returns that far exceed the subscription cost.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you may cancel your subscription anytime. It typically takes 24–48 hours to process the cancellation.",
  },
];

const FAQs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h2 className="mb-10 text-3xl sm:text-4xl font-bold text-center text-gray-900">
        Frequently Asked Questions
      </h2>

      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-gray-200 rounded-lg bg-gray-50"
          >
            <AccordionTrigger className="flex items-center justify-between w-full p-4 text-left text-base sm:text-lg font-semibold text-gray-800 hover:bg-gray-100 transition-colors">
              <span>{faq.question}</span>
            
            </AccordionTrigger>
            <AccordionContent className="p-4 text-gray-600 text-sm sm:text-base">
              {Array.isArray(faq.answer) ? (
                <ul className="list-disc pl-5 space-y-2">
                  {faq.answer.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{faq.answer}</p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQs;