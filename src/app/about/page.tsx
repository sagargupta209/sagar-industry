'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Heart, Award, Users, Leaf, Globe, CheckCircle } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

export default function AboutPage() {
  const { settings } = useSettings();
  
  const stats = [
    { label: 'Years of Experience', value: settings?.statsExperience || '25+' },
    { label: 'Products', value: settings?.statsProducts || '50+' },
    { label: 'Happy Customers', value: settings?.statsCustomers || '1M+' },
    { label: 'Cities Covered', value: settings?.statsCities || '100+' },
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: 'Our Mission',
      description: 'To deliver the freshest and tastiest snacks to every household in India, ensuring happiness in every bite.',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      icon: <Eye className="w-8 h-8 text-green-600" />,
      title: 'Our Vision',
      description: 'To become a global leader in the snack industry, recognized for quality, innovation, and customer satisfaction.',
      color: 'bg-green-50 border-green-200'
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: 'Our Values',
      description: 'Quality, Integrity, Innovation, and Customer Delight are at the heart of everything we do.',
      color: 'bg-red-50 border-red-200'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[#1a237e] text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599488615731-7e5128160cc3?q=80&w=1974&auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a237e]/80 to-[#1a237e]/95"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500 rounded-full blur-3xl opacity-20 -ml-20 -mb-20"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-yellow-400/20 text-yellow-300 text-sm font-bold tracking-wider uppercase mb-6 border border-yellow-400/40">
              Since 1998
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
              Crafting <span className="text-[#FFD700]">Happiness,</span> <br /> One Crunch at a Time.
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Sagar Industry is more than just a snack brand; it's a legacy of authentic flavors, premium quality, and the joy of sharing good food.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="py-10 bg-white -mt-10 relative z-20">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-[#1a237e] mb-2">{stat.value}</div>
                <div className="text-gray-500 font-medium uppercase tracking-wide text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story Section ── */}
      <section className="py-20 lg:py-28 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              className="w-full lg:w-1/2 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1599488615731-7e5128160cc3?q=80&w=1974&auto=format&fit=crop" 
                  alt="Sagar Industry Manufacturing" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Decorative Card */}
              <div className="absolute -bottom-10 -right-10 bg-yellow-400 p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-full">
                    <Award className="w-8 h-8 text-[#1a237e]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#1a237e] text-lg">Award Winning</div>
                    <div className="text-[#1a237e]/80 text-sm">Taste & Quality</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="text-[#1a237e] font-bold uppercase tracking-widest mb-4">Our Journey</h4>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                From Humble Beginnings to a <span className="text-green-600">Flavor Revolution.</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded in <span className="font-bold text-gray-900">2025</span>, Sagar Industry started as a small vision in the heart of Rajkot, Gujarat. Inspired by the rich culinary heritage of India, we set out on a mission to bring authentic, high-quality snacks to modern families.
                </p>
                <p>
                  What began as a small family-owned unit has now grown into a <span className="font-bold text-gray-900">leading FMCG powerhouse</span>. We believe that great taste starts with great ingredients, which is why we partner directly with farmers to source the finest potatoes and spices.
                </p>
                <p>
                  Today, our state-of-the-art facility combines traditional recipes with modern hygiene standards, ensuring that every packet you open delivers the perfect crunch and smile.
                </p>
              </div>
              
              <div className="mt-10 flex gap-4">
                 <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <CheckCircle className="text-green-500 w-5 h-5" /> 100% Quality
                 </div>
                 <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <CheckCircle className="text-green-500 w-5 h-5" /> Authentic Taste
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission, Vision & Values ── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Guiding Principles</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">The core beliefs that drive our passion for excellence every single day.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`p-10 rounded-3xl border-2 ${item.color} hover:shadow-xl transition-all duration-300 group bg-white`}
              >
                <div className="mb-6 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20">
         <div className="container mx-auto bg-[#1a237e] rounded-3xl p-10 md:p-20 relative overflow-hidden text-center text-white">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-400 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-8">Why People Love Sagar Snacks?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                        <Leaf className="w-10 h-10 text-green-400 mx-auto mb-4" />
                        <h4 className="font-bold text-xl mb-2">Natural Ingredients</h4>
                        <p className="text-white/70">No artificial preservatives, just pure flavor.</p>
                    </div>
                    <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                        <Users className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
                        <h4 className="font-bold text-xl mb-2">Community First</h4>
                        <p className="text-white/70">Supporting local farmers and sustainable practices.</p>
                    </div>
                    <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                        <Globe className="w-10 h-10 text-blue-300 mx-auto mb-4" />
                        <h4 className="font-bold text-xl mb-2">Global Standards</h4>
                        <p className="text-white/70">World-class manufacturing for safety & hygiene.</p>
                    </div>
                </div>
            </div>
         </div>
      </section>

    </div>
  );
}
