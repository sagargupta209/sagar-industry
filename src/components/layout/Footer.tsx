'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Facebook, Instagram, Twitter, Youtube, ArrowRight, ChevronDown, CreditCard, Heart, Linkedin, MessageSquare, Pin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '@/context/SettingsContext';

const Footer = () => {
  const pathname = usePathname();
  const { settings } = useSettings();
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  if (pathname?.startsWith('/admin')) return null;

  const socialLinks = [
    { Icon: Facebook, url: settings?.facebook },
    { Icon: Instagram, url: settings?.instagram },
    { Icon: Twitter, url: settings?.twitter },
    { Icon: Youtube, url: settings?.youtube },
    { Icon: Linkedin, url: settings?.linkedin },
    { Icon: MessageSquare, url: settings?.whatsapp },
    { Icon: Pin, url: settings?.pinterest },
  ].filter(link => link.url);

  const footerLinksArr = [
    {
      title: 'Company',
      items: [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Distributor Page', href: '/distributors' },
        { name: 'Shop', href: '/products' },
      ]
    },
    {
      title: 'Support',
      items: [
        { name: 'FAQ', href: '/faq' },
        { name: 'Terms & Conditions', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Disclaimer', href: '/disclaimer' },
      ]
    },
  ];

  const toggleAccordion = (title: string) => {
    setActiveAccordion(activeAccordion === title ? null : title);
  };

  return (
    <footer className="bg-[#121212] text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-12 mb-16">
          
          {/* Brand & Socials (Left Column) */}
          <div className="lg:w-1/5 flex flex-col items-center lg:items-start text-center lg:text-left">
             <Link href="/" className="mb-6">
                  {/* Logo Badge Simulation */}
                  <div className="bg-[#1a237e] text-yellow-400 p-2 rounded-lg border border-yellow-500 inline-block">
                     <span className="text-xl font-black uppercase tracking-widest block leading-none">SAGAR</span>
                     <span className="text-[10px] font-bold bg-green-600 text-white px-1 rounded-sm uppercase tracking-wider block mt-1">Industries</span>
                 </div>
            </Link>
            
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Delivering the perfect crunch and authentic taste to millions of households since 1995.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
               {socialLinks.map(({ Icon, url }, i) => (
                 <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FFC107] hover:text-black transition duration-300">
                   <Icon size={18} />
                 </a>
               ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:w-3/5">
             {/* Desktop Grid */}
             <div className="hidden lg:grid grid-cols-2 gap-20">
                {footerLinksArr.map((section) => (
                  <div key={section.title}>
                    <h4 className="text-[#FFC107] font-bold mb-6 text-sm uppercase tracking-wider">{section.title}</h4>
                    <ul className="space-y-3">
                      {section.items.map((item) => (
                        <li key={item.name}>
                          <Link href={item.href} className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
             </div>

             {/* Mobile Accordion */}
             <div className="lg:hidden space-y-4">
               {footerLinksArr.map((section) => (
                 <div key={section.title} className="border-b border-gray-800 last:border-none pb-2">
                   <button 
                     onClick={() => toggleAccordion(section.title)}
                     className="w-full flex justify-between items-center py-2 text-left focus:outline-none"
                   >
                     <span className="text-lg font-bold text-gray-200">{section.title}</span>
                     <ChevronDown 
                       size={20} 
                       className={`text-[#FFC107] transition-transform duration-300 ${activeAccordion === section.title ? 'rotate-180' : ''}`} 
                     />
                   </button>
                   <AnimatePresence>
                     {activeAccordion === section.title && (
                       <motion.ul 
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: 'auto', opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         className="overflow-hidden space-y-3 pt-2 pb-4"
                       >
                         {section.items.map((item) => (
                           <li key={item.name}>
                             <Link href={item.href} className="text-gray-400 hover:text-[#FFC107] block text-sm pl-4 border-l-2 border-gray-700 hover:border-[#FFC107] transition-all">
                               {item.name}
                             </Link>
                           </li>
                         ))}
                       </motion.ul>
                     )}
                   </AnimatePresence>
                 </div>
               ))}
             </div>
          </div>

          {/* Newsletter (Right Column) */}
          <div className="lg:w-1/5 flex flex-col items-center lg:items-end">
             <div className="w-full max-w-sm">
                <h4 className="text-white font-bold text-lg mb-4 text-center lg:text-right">Subscribe Newsletter</h4>
                <NewsletterForm />
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-6">
           <div className="order-2 md:order-1">
             {settings?.copyrightText || `© ${new Date().getFullYear()} Sagar Industries Pvt Ltd. All Rights Reserved.`}
           </div>


           <div className="flex items-center gap-2 order-1 md:order-3">
              <span>Made with</span>
              <Heart size={14} className="text-red-500 fill-current animate-pulse" />
              <span>by <a href="https://webzotech.in" target="_blank" rel="noopener noreferrer" className="text-white font-bold hover:text-[#FFC107] transition-colors">Webzotech</a></span>
           </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

const NewsletterForm = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!email) return;
        setStatus('loading');
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if(res.ok) {
                setStatus('success');
                setEmail('');
                setMessage('Subscribed successfully!');
            } else {
                setStatus('error');
                setMessage(data.message || 'Something went wrong');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Failed to subscribe');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative">
            <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email" 
                className="w-full bg-[#1e1e1e] border border-gray-700 text-white rounded-full py-3 px-6 pr-12 focus:outline-none focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107] transition-all placeholder-gray-500"
                required
            />
            <button 
                type="submit"
                disabled={status === 'loading'}
                className="absolute right-1 top-1 bottom-1 bg-[#00A651] hover:bg-[#008f45] text-white w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-105 disabled:opacity-50"
            >
                {status === 'loading' ? (
                   <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                   <ArrowRight size={18} />
                )}
            </button>
            {status !== 'idle' && (
                <p className={`absolute -bottom-6 right-0 text-[10px] font-bold uppercase tracking-wider ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    {message}
                </p>
            )}
        </form>
    );
};
