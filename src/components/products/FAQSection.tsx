'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'Where does Sagar Industry deliver?',
    answer:
      'We currently deliver across Rajnandgaon and all major metro cities in India. We are actively expanding to cover more regions. Check pincode availability at checkout.',
  },
  {
    question: 'Can I place bulk orders for events or parties?',
    answer:
      'Absolutely! We handle bulk orders for weddings, corporate events, festivals, and parties with special discounted rates. Contact our sales team directly for a custom quote.',
  },
  {
    question: 'Are there any discounts for first-time buyers?',
    answer:
      'Yes! New customers enjoy 10% off on their first order. Use code WELCOME10 at checkout. We also run seasonal festivals and flash sales — follow us on social media to stay updated.',
  },
  {
    question: 'What is the standard shipping time?',
    answer:
      'Orders are processed within 24 hours. Standard delivery takes 2–4 business days depending on your location. Express shipping options are available for select cities.',
  },
  {
    question: 'Are your products made with natural ingredients?',
    answer:
      'Yes! We pride ourselves on using quality, natural ingredients with no artificial preservatives. Our manufacturing follows strict quality and hygiene standards.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#0f172a] py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            FAQs
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Got questions? We&apos;ve got answers. If you can&apos;t find what you need, reach out to us.
          </p>
        </div>

        {/* Accordion */}
        <div className="bg-[#1e293b]/80 backdrop-blur-sm rounded-3xl p-2 sm:p-4 md:p-6 shadow-2xl border border-slate-700/50">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border-b border-slate-700/60 last:border-0 ${
                  isOpen ? 'bg-slate-800/40 rounded-2xl' : ''
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left py-5 sm:py-6 px-4 sm:px-6 flex justify-between items-center focus:outline-none group transition-colors rounded-2xl"
                >
                  <span className="text-base sm:text-lg md:text-xl font-semibold text-slate-100 pr-4 group-hover:text-yellow-400 transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? 'bg-yellow-500 text-[#0f172a] rotate-180'
                        : 'bg-slate-700 text-slate-300 group-hover:bg-slate-600'
                    }`}
                  >
                    <ChevronDown size={18} strokeWidth={2.5} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 sm:px-6 pb-6 text-slate-300 leading-relaxed text-sm sm:text-base md:text-lg">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
