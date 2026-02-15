'use client';

import { motion } from 'framer-motion';
import { useSettings } from '@/context/SettingsContext';

const ContactSection = () => {
  const { settings } = useSettings();

  return (
    <section className="py-12 md:py-24 bg-gray-50 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Yellow Card Container */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#EDD719] rounded-[40px] shadow-2xl px-6 py-8 md:px-10 md:py-8 flex flex-col md:flex-row md:items-stretch items-center relative z-10 max-w-5xl mx-auto"
        >
          
          {/* Left Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center text-[#1a0505] relative z-20">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-black mb-4 md:mb-6 tracking-tight text-center md:text-left"
            >
              Contact Us
            </motion.h2>

            <div className="space-y-4 md:space-y-3 bg-white/10 md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none backdrop-blur-sm md:backdrop-blur-none border border-white/20 md:border-none">
              <div className="text-center md:text-left">
                <h3 className="text-lg md:text-xl font-bold mb-1">{settings?.companyName || 'Sagar Industries Private Limited'}</h3>
                <p className="text-sm md:text-base font-medium leading-relaxed opacity-90">
                  {settings?.addressStreet || 'Survey No.19, Vajdi (Vad), Kalawad Road,'}<br/>
                  {settings?.addressArea ? `${settings.addressArea}, ` : ''}
                  {settings?.addressCity || 'Lodhika, Rajkot'} - {settings?.addressPincode || '360021'}, {settings?.addressState || 'Gujarat (India)'}.
                </p>
              </div>

              <div className="w-full h-[1px] bg-black/10 my-2" />

              <div className="text-center md:text-left">
                <p className="font-bold text-base md:text-lg mb-1">Phone :</p>
                <p className="font-medium opacity-90 text-sm md:text-base">{settings?.phonePrimary || '+91-281-2783755 / 56'}</p>
                {settings?.phoneSecondary && (
                  <p className="font-medium opacity-90 text-sm md:text-base">{settings.phoneSecondary}</p>
                )}
              </div>

              <div className="w-full h-[1px] bg-black/10 my-2" />

              <div className="text-center md:text-left">
                <p className="font-bold text-base md:text-lg mb-1">E-mail :</p>
                <a href={`mailto:${settings?.emailPrimary || 'contact@sagarindustry.com'}`} className="font-medium opacity-90 hover:opacity-100 underline decoration-1 text-sm md:text-base break-all">
                   {settings?.emailPrimary || 'contact@sagarindustry.com'}
                </a>
              </div>
            </div>
          </div>

          {/* Right Content - Floating Product Images */}
          <div className="w-full md:w-1/2 relative h-[250px] md:h-auto flex items-center justify-center md:justify-end mt-8 md:mt-0">
             <motion.img
               src="/images/new/image2.png" 
               alt="Spicy Chips"
               initial={{ rotate: 10, x: -30, opacity: 0 }}
               whileInView={{ rotate: -12, x: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
               className="absolute w-48 md:w-[350px] lg:w-[420px] drop-shadow-2xl z-10 left-0 md:-left-[40px] md:-top-[80px] top-4 md:top-auto"
             />

             <motion.img
               src="/images/new/image3.png" 
               alt="Cream Onion"
               initial={{ rotate: -10, x: 30, opacity: 0 }}
               whileInView={{ rotate: 12, x: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
               className="absolute w-52 md:w-[380px] lg:w-[450px] drop-shadow-2xl z-20 right-0 md:left-[120px] md:-top-[40px] bottom-4 md:bottom-auto"
             />
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
