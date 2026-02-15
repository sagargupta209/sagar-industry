'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, User, ShoppingCart, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useSettings } from '@/context/SettingsContext';

const Navbar = () => {
  const { settings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  interface NavLink {
    name: string;
    href: string;
    submenu?: { name: string; href: string }[];
  }

  const navLinks: NavLink[] = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Distributors', href: '/distributors' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const companyName = settings?.companyName || "SAGAR Industries";
  const nameParts = companyName.split(' ');
  const firstName = nameParts[0];
  const restName = nameParts.slice(1).join(' ');

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] bg-[#1a237e] text-white py-1 md:py-2 text-xs md:text-sm font-medium">
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {settings?.phonePrimary && (
              <a href={`tel:${settings.phonePrimary}`} className="hover:text-yellow-400 transition flex items-center gap-1">
                <span>📞</span> {settings.phonePrimary}
              </a>
            )}
            {settings?.emailPrimary && (
              <a href={`mailto:${settings.emailPrimary}`} className="hidden md:flex hover:text-yellow-400 transition items-center gap-1">
                <span>✉️</span> {settings.emailPrimary}
              </a>
            )}
          </div>
          <div className="flex items-center space-x-4">
             {settings?.whatsapp && (
               <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" className="hover:text-green-400 transition flex items-center gap-1">
                 <span className="md:inline hidden">Chat on WhatsApp</span>
                 <span className="md:hidden inline">💬</span>
               </a>
             )}
          </div>
        </div>
      </div>

      <nav
        className={clsx(
          'fixed top-6 md:top-10 left-0 right-0 z-50 transition-all duration-300 shadow-md',
          'bg-[#FFD700] text-black' // Bright Yellow Background
        )}
      >
        <div className="container mx-auto px-4 md:px-8 h-20 md:h-24 flex justify-between items-center relative">
          
          {/* Desktop Logo */}
          <div className="hidden md:flex flex-shrink-0 items-start absolute top-0 left-8 z-50">
             <Link href="/" className="relative group p-2">
                <img 
                  src="/logo.png" 
                  alt={companyName} 
                  className="w-32 h-32 object-contain transition-transform transform group-hover:scale-105"
                />
             </Link>
          </div>

          {/* Mobile Layout: Hamburger Left, Logo Center, Icons Right */}
          <div className="flex md:hidden w-full items-center justify-between">
             <button onClick={() => setIsOpen(true)} className="p-2 -ml-2 text-black hover:text-gray-700">
               <Menu size={28} strokeWidth={2.5} />
             </button>

             {/* Centered Logo for Mobile */}
             <Link href="/" className="flex flex-col items-center">
                <img 
                  src="/logo.png" 
                  alt={companyName} 
                  className="h-12 w-auto object-contain"
                />
             </Link>

             <div className="flex items-center space-x-3">
                 <Search size={24} className="cursor-pointer" />
             </div>
          </div>

          {/* Desktop Navigation - Centered (Pushing left margin for logo) */}
          <div className="hidden md:flex flex-1 justify-center ml-32 pl-8">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <li 
                  key={link.name} 
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link 
                    href={link.href}
                    className="flex items-center text-lg font-bold text-[#1a237e] hover:text-gray-900 transition tracking-wide py-8"
                  >
                    {link.name}
                    {link.submenu && <ChevronDown size={16} className="ml-1 mt-0.5" />}
                  </Link>
                  
                  {/* Desktop Dropdown */}
                  <AnimatePresence>
                    {link.submenu && hoveredLink === link.name && (
                       <motion.div
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: 10 }}
                         transition={{ duration: 0.2 }}
                         className="absolute top-full left-0 bg-white shadow-xl rounded-b-xl border-t-4 border-orange-500 min-w-[220px] overflow-hidden"
                       >
                         {link.submenu.map((sub) => (
                           <Link key={sub.name} href={sub.href} className="block px-6 py-3 text-gray-800 hover:bg-orange-50 hover:text-orange-600 transition font-medium border-b border-gray-100 last:border-none">
                             {sub.name}
                           </Link>
                         ))}
                       </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Right Icons */}
          <div className="hidden md:flex items-center space-x-6">
             <div className="p-2 bg-white/30 rounded-full hover:bg-white/50 transition cursor-pointer text-[#1a237e]">
                <Search size={22} strokeWidth={2.5} />
             </div>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60] md:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-[70] overflow-y-auto shadow-2xl"
            >
              <div className="p-5 flex justify-between items-center bg-[#FFD700]">
                 <div className="flex items-center">
                    <span className="font-bold text-xl text-[#1a237e]">Menu</span>
                 </div>
                 <button onClick={() => setIsOpen(false)} className="p-1 text-[#1a237e]">
                   <X size={28} />
                 </button>
              </div>

              <div className="py-4">
                {navLinks.map((link) => (
                  <div key={link.name} className="border-b border-gray-100 last:border-none">
                    <div 
                      className="px-6 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 bg-white"
                      onClick={() => link.submenu ? setMobileSubmenu(mobileSubmenu === link.name ? null : link.name) : setIsOpen(false)}
                    >
                       <Link href={link.submenu ? '#' : link.href} className="text-lg font-bold text-gray-800 flex-1" onClick={(e) => link.submenu && e.preventDefault()}>
                         {link.name}
                       </Link>
                       {link.submenu && (
                         <ChevronRight 
                           size={20} 
                           className={`text-gray-400 transition-transform duration-300 ${mobileSubmenu === link.name ? 'rotate-90' : ''}`} 
                          />
                       )}
                    </div>
                    
                    {/* Mobile Submenu Accordion */}
                    <AnimatePresence>
                      {link.submenu && mobileSubmenu === link.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-gray-50"
                        >
                          {link.submenu.map(sub => (
                            <Link 
                              key={sub.name} 
                              href={sub.href}
                              onClick={() => setIsOpen(false)}
                              className="block pl-10 pr-6 py-3 text-gray-600 font-medium hover:text-orange-600 border-l-4 border-transparent hover:border-orange-500 transition"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
              
              {/* Social Icons */}
              {settings && (
                <div className="px-6 py-6 border-t border-gray-100">
                   <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Follow Us</p>
                   <div className="flex items-center gap-4 flex-wrap">
                      {[
                        { key: 'facebook', Icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>, color: 'bg-[#1877F2]' },
                        { key: 'instagram', Icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>, color: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400' },
                        { key: 'twitter', Icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, color: 'bg-black' },
                        { key: 'youtube', Icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>, color: 'bg-[#FF0000]' },
                        { key: 'linkedin', Icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>, color: 'bg-[#0077B5]' },
                      ].map((social) => {
                          const url = settings?.[social.key] || settings?.socialLinks?.[social.key];
                          if (!url) return null;
                          return (
                            <a 
                              key={social.key} 
                              href={url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center text-white hover:opacity-90 transition shadow-md`}
                            >
                               <social.Icon />
                            </a>
                          );
                      })}
                   </div>
                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
