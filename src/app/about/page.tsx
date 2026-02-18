'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Heart, Award, Users, Leaf, Globe, CheckCircle } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

export default function AboutPage() {
  const { settings } = useSettings();
  
  const stats = [
    { label: 'Years of Experience', value: settings?.statsExperience || '20+' },
    { label: 'Products', value: settings?.statsProducts || '50+' },
    { label: 'Happy Customers', value: settings?.statsCustomers || '1M+' },
    { label: 'Cities Covered', value: settings?.statsCities || '100+' },
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: 'Our Mission',
      description: 'To spread deliciousness across India by manufacturing snacks and bakery items following traditional recipes and highest quality standards.',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      icon: <Eye className="w-8 h-8 text-green-600" />,
      title: 'Our Vision',
      description: 'To establish footprints across the entire country for Sagar Industry and Sai Food Product, becoming the leading choice for packaged food.',
      color: 'bg-green-50 border-green-200'
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: 'Quality Cornerstone',
      description: 'At Sagar Industry, quality is our cornerstone. We source the finest ingredients and monitor every step for your peace of mind.',
      color: 'bg-red-50 border-red-200'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[#1a237e] text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605204482084-5a2656965154?q=80&w=2070&auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>
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
              Established 2005
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
              Sagar Industry & <br /> <span className="text-[#FFD700]">Sai Food Product</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              A legacy of manufacturing snacks and delicious bakery items with a commitment to quality and hygiene since 2005.
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
                  src="https://images.unsplash.com/photo-1605204482084-5a2656965154?q=80&w=2070&auto=format&fit=crop" 
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
                    <div className="font-bold text-[#1a237e] text-lg">Quality Certified</div>
                    <div className="text-[#1a237e]/80 text-sm">Cornerstone of Excellence</div>
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
              <h4 className="text-[#1a237e] font-bold uppercase tracking-widest mb-4">Our Legacy</h4>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight text-left">
                A Legacy of Quality, <span className="text-orange-500">Since 2005.</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed text-left">
                <p>
                  Established in <span className="font-bold text-gray-900">2005</span>, <span className="font-bold text-[#1a237e]">Sagar Industry and Sai Food Product</span> emerged as a premier packaged food company in Rajnandgaon. Founded by the visionary <span className="font-bold text-gray-900">Late Shri Gurmuk Das Motlani ji</span>, our unit has been a symbol of quality and trust for nearly two decades.
                </p>
                <p>
                  Our legacy is defined by a deep-rooted commitment to manufacturing the finest <span className="text-gray-900 font-semibold">Snacks, Delicious Biscuits, Rusks, Cookies, and Cream Rolls</span>. From a localized presence, we have grown into a brand with a strong national footprint, constantly making progressive efforts to establish our mark across the entire country.
                </p>
                <p>
                  At our well-equipped facilities, manufacturing is executed in <span className="italic">environmentally friendly premises under the most hygienic conditions</span>. We combine traditional recipes passed down through generations with modern technology to ensure a burst of flavor and goodness in every bite.
                </p>
              </div>
              
              <div className="mt-10 flex flex-wrap gap-6">
                 <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <CheckCircle className="text-green-500 w-5 h-5" /> 100% Hygienic
                 </div>
                 <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <CheckCircle className="text-green-500 w-5 h-5" /> Premium Ingredients
                 </div>
                 <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <CheckCircle className="text-green-500 w-5 h-5" /> Heritage of 2005
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Quality Section ── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Quality Assurance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">At Sagar Industry, quality is our cornerstone. We monitor every step to ensure your complete peace of mind.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-3xl shadow-lg border-l-8 border-orange-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Meticulous Monitoring</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Our state-of-the-art facilities are staffed by a team of skilled professionals who meticulously monitor every step of the production process. From ingredient sourcing to final packaging, nothing is left to chance.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-lg border-l-8 border-green-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Prepared with Love</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Every product that bears the Sagar Industry name has met the highest quality standards. Our snacks and bakery items are prepared with love and care, ensuring a burst of flavor and goodness.
                </p>
              </div>
            </div>
            <div className="relative mt-8 md:mt-0 px-4 md:px-0">
               <img src="https://images.unsplash.com/photo-1590069230002-70cc83bf107c?q=80&w=2070" className="rounded-[40px] shadow-2xl w-full object-cover" alt="Quality Control" />
               <div className="hidden md:block absolute md:-top-10 md:-left-10 bg-[#1a237e] text-white p-8 rounded-3xl shadow-2xl border-4 border-white z-10">
                  <span className="text-3xl md:text-5xl font-black">2005</span><br/>
                  <span className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-90">Since Year</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission, Vision & Values ── */}
      <section className="py-20">
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
                <h2 className="text-3xl md:text-5xl font-bold mb-8">Why People Love Sagar Industry?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                        <Leaf className="w-10 h-10 text-green-400 mx-auto mb-4" />
                        <h4 className="font-bold text-xl mb-2">Hygienic conditions</h4>
                        <p className="text-white/70">Most hygienic conditions for manufacturing.</p>
                    </div>
                    <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                        <Users className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
                        <h4 className="font-bold text-xl mb-2">Progressive Efforts</h4>
                        <p className="text-white/70">Establishing footprints in the whole country.</p>
                    </div>
                    <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                        <Globe className="w-10 h-10 text-blue-300 mx-auto mb-4" />
                        <h4 className="font-bold text-xl mb-2">Modern Technology</h4>
                        <p className="text-white/70">State-of-the-art facilities with latest technology.</p>
                    </div>
                </div>
            </div>
         </div>
      </section>

    </div>
  );
}
