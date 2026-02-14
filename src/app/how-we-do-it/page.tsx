'use client';

import { motion } from 'framer-motion';
import { Play, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function HowWeDoItPage() {
  const processSteps = [
    {
      id: 1,
      label: 'Stage 01',
      title: 'Prepping the potatoes',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=2070', // Potato farm/pile
      points: [
         'Trucks unload farm-fresh potatoes straight from the fields',
         'Only the plumpest spuds pass our quality check',
         'Extra potatoes are stashed in cool silos for future use',
         'The rest are washed, peeled, and cleaned to perfection'
      ]
    },
    {
       id: 2,
       label: 'Stage 02',
       title: 'Slicing & Frying',
       image: 'https://images.unsplash.com/photo-1566478919030-26d9e54179d6?q=80&w=1974', // Chips process
       points: [
          'Precision slicers cut wafers to exact thickness',
          'Slices take a dip in hot, high-quality vegetable oil',
          'Advanced fryers ensure perfect golden crunch every time',
          'Excess oil is removed for a lighter, crispier texture'
       ]
    },
    {
       id: 3,
       label: 'Stage 03',
       title: 'Seasoning & Packing',
       image: 'https://images.unsplash.com/photo-1621447504864-284aa8778bf6?q=80&w=1974', // Spices/Packing
       points: [
          'Wafers enter the seasoning drum for a masala shower',
          'Automated weighers measure every gram accurately',
          'Nitrogen flushing keeps the freshness locked in',
          'Packets are sealed, boxed, and ready to reach you!'
       ]
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-green-800">
           <img 
              src="https://images.unsplash.com/photo-1621447504864-284aa8778bf6?q=80&w=1974" 
              className="w-full h-full object-cover opacity-40 mix-blend-overlay"
              alt="How We Do It Banner"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] via-transparent to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 h-full flex flex-col justify-end pb-16 relative z-10">
           <nav className="text-sm font-bold text-white/80 mb-4 bg-black/20 inline-block px-4 py-1 rounded-full backdrop-blur-sm self-start">
              <Link href="/" className="hover:text-yellow-400 transition">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-yellow-400">How We Do It</span>
           </nav>
           
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-5xl md:text-7xl font-black text-white dropshadow-lg mb-4 max-w-4xl"
           >
             From Farm to Crunch
           </motion.h1>
           <p className="text-xl md:text-2xl font-medium text-gray-200 max-w-2xl">
             A journey of taste, technology, and tradition.
           </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 md:px-8 py-16">
        
        {/* Headline Transition */}
        <div className="text-center mb-20">
           <motion.h2 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="text-4xl md:text-6xl font-black text-[#1a0505] leading-tight"
           >
             Ever seen a potato turn into <br/> 
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">a wafer?</span>
           </motion.h2>
        </div>

        {/* Process Stages */}
        <div className="space-y-24 mb-24">
           {processSteps.map((step, index) => (
             <motion.div 
               key={step.id}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20`}
             >
                {/* Visual Side */}
                <div className="w-full md:w-1/2 relative group">
                   <div className="relative rounded-[40px] overflow-hidden shadow-2xl aspect-video md:aspect-[4/3] border-4 border-white">
                      <img src={step.image} alt={step.title} className="w-full h-full object-cover transform transition duration-700 group-hover:scale-105" />
                      
                      {/* Fake Video Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition">
                         <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center pl-1 shadow-lg cursor-pointer transform group-hover:scale-110 transition">
                            <Play size={32} fill="black" className="text-black" />
                         </div>
                      </div>
                   </div>
                   {/* Decor blob */}
                   <div className={`absolute -bottom-6 ${index % 2 === 0 ? '-left-6' : '-right-6'} w-32 h-32 bg-yellow-400 rounded-full -z-10 opacity-50 blur-2xl`}></div>
                </div>

                {/* Text Side */}
                <div className="w-full md:w-1/2">
                   <span className="inline-block bg-green-100 text-green-800 font-bold px-4 py-1 rounded-full mb-4">
                     {step.label}
                   </span>
                   <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">{step.title}</h3>
                   <ul className="space-y-6">
                      {step.points.map((point, i) => (
                        <li key={i} className="flex items-start">
                           <CheckCircle className="text-green-500 mt-1 mr-4 flex-shrink-0" size={20} />
                           <span className="text-lg text-gray-700 font-medium leading-relaxed">{point}</span>
                        </li>
                      ))}
                   </ul>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Tech Highlight Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0a192f] rounded-[50px] p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center border-[8px] border-white shadow-2xl"
        >
           {/* Background Pattern */}
           <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

           {/* Content */}
           <div className="w-full md:w-3/5 relative z-10 text-center md:text-left">
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
                With 16 precision touchpoints, our machines handle it all. No human hands, just seamless automation. From washing to packaging, every step is crafted efficiently to ensure each bag of Sagar Wafers is as perfect as the last.
              </p>
              <div className="w-full h-px bg-white/10 mb-8"></div>
              <h3 className="text-3xl md:text-5xl font-black text-[#FFC107] leading-tight">
                No shortcuts - just cutting-edge technology at work!
              </h3>
           </div>

           {/* Floating Product Visuals */}
           <div className="w-full md:w-2/5 relative mt-12 md:mt-0 h-[300px] flex items-center justify-center">
              <motion.img 
                animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                src="https://images.unsplash.com/photo-1621447504864-284aa8778bf6?q=80&w=1974" 
                className="w-48 md:w-64 drop-shadow-2xl z-20 relative"
                alt="Tech Snack Pack"
              />
              {/* Falling Chips */}
              <motion.div 
                animate={{ y: [0, 100], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute top-0 right-10 w-12 h-12 bg-yellow-400 rounded-full opacity-0 blur-sm mix-blend-overlay"
              ></motion.div>
              <motion.div 
                 className="absolute -top-10 left-10 text-4xl"
                 animate={{ y: [0, 200], rotate: 360, opacity: [0, 1, 0] }}
                 transition={{ repeat: Infinity, duration: 3, ease: "linear", delay: 1 }}
              >
                 🥔
              </motion.div>
               <motion.div 
                 className="absolute top-10 right-20 text-4xl"
                 animate={{ y: [0, 150], rotate: -180, opacity: [0, 1, 0] }}
                 transition={{ repeat: Infinity, duration: 2.5, ease: "linear", delay: 0.5 }}
              >
                 ✨
              </motion.div>
           </div>
        </motion.div>

      </div>
    </div>
  );
}
