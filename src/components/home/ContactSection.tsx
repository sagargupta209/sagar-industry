'use client';

import { motion } from 'framer-motion';
import { useSettings } from '@/context/SettingsContext';

const ContactSection = () => {
  const { settings } = useSettings();

  return (
    <section className="py-16 md:py-24 pb-32 md:pb-24 bg-gray-50 overflow-visible relative">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Yellow Card Container */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#EDD719] rounded-[40px] shadow-2xl px-5 py-0 md:px-8 lg:px-10 flex flex-col md:flex-row md:items-stretch items-center relative z-10 max-w-5xl mx-auto"
        >
          
          {/* Left Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center text-[#1a0505] pt-6 pb-0 md:py-8 lg:py-10">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-black mb-2 tracking-tight"
            >
              Contact Us
            </motion.h2>

            <div className="space-y-2">
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-0.5">{settings?.companyName || 'Sagar Industries Private Limited'}</h3>
                <p className="text-base md:text-lg font-medium leading-relaxed opacity-90 text-[14px] md:text-base">
                  {settings?.addressStreet || 'Survey No.19, Vajdi (Vad), Kalawad Road,'}<br/>
                  {settings?.addressArea ? `${settings.addressArea}, ` : ''}
                  {settings?.addressCity || 'Lodhika, Rajkot'} - {settings?.addressPincode || '360021'}, {settings?.addressState || 'Gujarat (India)'}.
                </p>
              </div>

              <div className="w-full h-[1px] bg-black/10 my-2" />

              <div>
                <p className="font-bold text-base md:text-lg mb-0.5">Phone :</p>
                <p className="font-medium opacity-90 text-[14px] md:text-base">{settings?.phonePrimary || '+91-281-2783755 / 56'}</p>
                {settings?.phoneSecondary && (
                  <p className="font-medium opacity-90 text-[14px] md:text-base">{settings.phoneSecondary}</p>
                )}
              </div>

              <div className="w-full h-[1px] bg-black/10 my-2" />

              <div>
                <p className="font-bold text-base md:text-lg mb-0.5">E-mail :</p>
                <a href={`mailto:${settings?.emailPrimary || 'contact@sagarindustry.com'}`} className="font-medium opacity-90 hover:opacity-100 underline decoration-1 text-[14px] md:text-base">
                   {settings?.emailPrimary || 'contact@sagarindustry.com'}
                </a>
              </div>
            </div>
          </div>

          {/* Right Content - Floating Product Images */}
          <div className="w-full md:w-1/2 relative h-full flex flex-row justify-center md:justify-end items-end md:items-end -mt-2 md:mt-0 pt-0 md:pt-8 lg:pt-10">
             <motion.img
               src="/images/new/image2.png" // Transparency applied
               alt="Spicy Chips"
               initial={{ rotate: 10, x: -50, opacity: 0 }}
               whileInView={{ rotate: -12, x: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
               className="relative md:absolute w-72 md:w-[350px] lg:w-[420px] drop-shadow-2xl z-10 md:-left-[40px] md:-top-[80px] -mr-40 md:mr-0 -mb-32 md:mb-0"
             />

             <motion.img
               src="/images/new/image3.png" // Transparency applied
               alt="Cream Onion"
               initial={{ rotate: -10, x: 50, opacity: 0 }}
               whileInView={{ rotate: 12, x: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
               className="relative md:absolute w-80 md:w-[380px] lg:w-[450px] drop-shadow-2xl z-20 md:left-[120px] md:-top-[40px] -mb-28 md:mb-0"
             />
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
