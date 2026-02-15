'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, BadgeCheck, Leaf, Heart } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

const TrustBadges = () => {
  const { settings } = useSettings();
  const badges = [
    {
      icon: <div className="font-black text-2xl tracking-tighter">fssai</div>,
      label: 'FSSAI Certified',
      desc: 'License: 10714022000512',
      color: 'text-blue-700',
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    {
      icon: <ShieldCheck size={40} strokeWidth={1.5} />,
      label: 'ISO 22000:2018',
      desc: 'Food Safety Standard',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      border: 'border-indigo-100'
    },
    {
      icon: <Leaf size={40} strokeWidth={1.5} />,
      label: '100% Vegetarian',
      desc: 'Pure Veg Ingredients',
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-100'
    },
    {
      icon: <CheckCircle2 size={40} strokeWidth={1.5} />,
      label: 'No Artificial Colors',
      desc: 'Naturally Delicious',
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
      border: 'border-cyan-100'
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-gray-50/50 border-y border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-black text-gray-900 mb-4"
          >
            {settings?.trustBadgesTitle || 'Our Quality'} <span className="text-orange-500">{settings?.trustBadgesTitleAccent || 'Uncompromised'}</span>
          </motion.h2>
          <div className="w-20 h-1.5 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl ${badge.bg} ${badge.color} ${badge.border} border-2 flex items-center justify-center transition-all duration-500 shadow-sm mb-4 group-hover:shadow-lg group-hover:rotate-3`}>
                {badge.icon}
              </div>
              <h3 className="font-black text-gray-900 text-sm md:text-lg mb-1 uppercase tracking-tight group-hover:text-orange-600 transition-colors">
                {badge.label}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 font-medium">
                {badge.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
