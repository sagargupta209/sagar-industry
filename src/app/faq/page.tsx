'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageCircle, HelpCircle, Package, Truck, Search } from 'lucide-react';
import Link from 'next/link';

export default function FAQPage() {
  const [activeId, setActiveId] = useState<number | string | null>(0);
  const [faqData, setFaqData] = useState<any[]>([]);

  useEffect(() => {
    const fetchFAQs = async () => {
        try {
            const res = await fetch('/api/faqs');
            const data = await res.json();
            if(data.success && data.data.length > 0) {
                // Group by category
                const groups: any = {};
                data.data.forEach((item: any) => {
                    if(!groups[item.category]) groups[item.category] = [];
                    groups[item.category].push({ id: item._id, q: item.question, a: item.answer });
                });

                const formatted = Object.keys(groups).map((cat, idx) => ({
                    category: cat,
                    icon: getIconForCategory(cat),
                    items: groups[cat]
                }));
                setFaqData(formatted);
            } else {
                // Fallback
                setFaqData(defaultFaqs);
            }
        } catch (e) {
            console.error(e);
            setFaqData(defaultFaqs);
        }
    };
    fetchFAQs();
  }, []);
  
  const getIconForCategory = (cat: string) => {
      switch(cat) {
          case 'General': return <HelpCircle className="w-6 h-6 text-blue-500" />;
          case 'Products & Quality': 
          case 'Products': return <Package className="w-6 h-6 text-yellow-500" />;
          case 'Orders & Distribution':
          case 'Orders': return <Truck className="w-6 h-6 text-green-500" />;
          default: return <HelpCircle className="w-6 h-6 text-gray-500" />;
      }
  };

  const defaultFaqs = [
    {
      category: 'General',
      icon: <HelpCircle className="w-6 h-6 text-blue-500" />,
      items: [
        {
          id: 0,
          q: 'Where are your products manufactured?',
          a: 'All our products are manufactured in our state-of-the-art facility in Rajkot, Gujarat. We adhere to the highest international quality and hygiene standards to ensure every pack is fresh and safe.'
        },
        {
          id: 1,
          q: 'Are your products 100% vegetarian?',
          a: 'Yes! Every single product from Sagar Industries is 100% vegetarian. We do not use eggs or any non-vegetarian ingredients in our processing facility.'
        }
      ]
    },
    {
      category: 'Products & Quality',
      icon: <Package className="w-6 h-6 text-yellow-500" />,
      items: [
        {
          id: 2,
          q: 'What is the shelf life of your snacks?',
          a: 'Our chips and namkeens typically have a shelf life of 4 to 6 months when stored in a cool, dry place away from direct sunlight. Please refer to the "Best Before" date on the pack for specifics.'
        },
        {
          id: 3,
          q: 'Do you use artificial preservatives?',
          a: 'We strive to keep our snacks as natural as possible. We use minimal preservatives only where absolutely necessary to maintain freshness and food safety, complying strictly with FSSAI regulations.'
        }
      ]
    },
    {
      category: 'Orders & Distribution',
      icon: <Truck className="w-6 h-6 text-green-500" />,
      items: [
        {
          id: 4,
          q: 'How can I become a distributor?',
          a: 'We are always looking to expand our family! Please visit our "Distributors" page or simply contact us at +91 98765 43210 to discuss partnership opportunities in your region.'
        },
        {
          id: 5,
          q: 'Do you offer bulk orders for events?',
          a: 'Absolutely. We cater to weddings, corporate events, and parties. For bulk inquiries and special pricing, please reach out to our sales team via the Contact page.'
        }
      ]
    }
  ];

  const toggleFAQ = (id: number | string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-[#1a237e] text-white overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
         <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500 rounded-full blur-[100px] opacity-20 -ml-20 -mb-20"></div>
         
         <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-yellow-300 font-bold text-sm tracking-wider uppercase mb-6">
                Support Center
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                Frequently Asked <span className="text-yellow-400">Questions</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                Everything you need to know about our products, quality, and services.
              </p>
            </motion.div>
         </div>
      </section>

      {/* ── FAQ Content ── */}
      <div className="container mx-auto px-4 md:px-6 py-20 -mt-10 relative z-20">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {faqData.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
               <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-6 pl-2 border-l-4 border-[#1a237e]">
                 <span className="bg-white p-2 rounded-lg shadow-sm">{section.icon}</span>
                 {section.category}
               </h3>
               
               <div className="space-y-4">
                 {section.items.map((item: any) => (
                   <div 
                     key={item.id}
                     className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                       activeId === item.id 
                         ? 'border-[#1a237e] shadow-lg ring-1 ring-[#1a237e]/10' 
                         : 'border-gray-100 shadow-md hover:border-gray-200'
                     }`}
                   >
                     <button
                       onClick={() => toggleFAQ(item.id)}
                       className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                     >
                       <span className={`text-lg font-bold pr-8 transition-colors ${activeId === item.id ? 'text-[#1a237e]' : 'text-gray-700'}`}>
                         {item.q}
                       </span>
                       <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                         activeId === item.id ? 'bg-[#1a237e] text-white rotate-180' : 'bg-gray-100 text-gray-500'
                       }`}>
                         {activeId === item.id ? <Minus size={16} /> : <Plus size={16} />}
                       </span>
                     </button>
                     
                     <AnimatePresence>
                       {activeId === item.id && (
                         <motion.div
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           transition={{ duration: 0.3 }}
                         >
                           <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                             {item.a}
                           </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>
                 ))}
               </div>
            </motion.div>
          ))}
          
        </div>

        {/* ── Contact CTA ── */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="mt-20 max-w-3xl mx-auto bg-[#1a237e] rounded-[2.5rem] p-10 md:p-16 text-center text-white relative overflow-hidden"
        >
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="relative z-10">
             <MessageCircle className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
             <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
             <p className="text-blue-100 mb-8 max-w-lg mx-auto">
               Can’t find what you’re looking for? Chat with our friendly team.
             </p>
             <Link 
               href="/contact" 
               className="inline-flex items-center gap-2 bg-yellow-400 text-[#1a237e] font-bold px-8 py-3.5 rounded-full hover:bg-yellow-300 transition-transform active:scale-95 shadow-lg"
             >
               Contact Us
             </Link>
           </div>
        </motion.div>

      </div>
    </div>
  );
}
