'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, Globe, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

import { useSettings } from '@/context/SettingsContext';

export default function ContactPage() {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '' // Spam protection
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#1a237e', '#FFD700', '#ea580c']
        });
        setFormData({ firstName: '', lastName: '', phone: '', email: '', subject: '', message: '', honeypot: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-40 lg:pt-40 lg:pb-64 bg-[#1a237e] text-white overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>
         <div className="absolute inset-0 bg-gradient-to-b from-[#1a237e]/80 to-[#1a237e]/95"></div>
         <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
         <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500 rounded-full blur-[100px] opacity-20 -ml-20 -mb-20"></div>
         
         <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-yellow-300 font-bold text-sm tracking-wider uppercase mb-6">
                Get in Touch
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                Let's Start a <span className="text-yellow-400">Conversation</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                Have a question, feedback, or just want to say hello? We'd love to hear from you.
              </p>
            </motion.div>
         </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 -mt-24 lg:-mt-32 relative z-20 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* ── Contact Info Cards ── */}
          <div className="w-full lg:w-5/12 space-y-6">
             <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="bg-[#1a237e] text-white rounded-[2.5rem] p-10 shadow-xl overflow-hidden relative"
             >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                
                <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-xl flex-shrink-0">
                      <MapPin className="text-yellow-400 w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-1">Headquarters</p>
                      <p className="text-lg font-medium leading-relaxed">
                        {settings?.companyName || 'Sagar Industries Pvt. Ltd.'}<br/>
                        {settings?.addressStreet || 'Ghatula, Khairagarh'}<br/>
                        {settings?.addressArea ? `${settings.addressArea}, ` : ''}
                        {settings?.addressCity || 'Rajnandgaon'} - {settings?.addressPincode || '491441'}, {settings?.addressState || 'Chhattisgarh'}.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-xl flex-shrink-0">
                      <Phone className="text-green-400 w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-1">Phone</p>
                      <p className="text-2xl font-bold">{settings?.phonePrimary || '+91 98765 43210'}</p>
                      {settings?.phoneSecondary && <p className="text-lg text-white/70">{settings.phoneSecondary}</p>}
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-xl flex-shrink-0">
                      <Mail className="text-pink-400 w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-1">Email</p>
                      <p className="text-lg font-bold break-all">{settings?.emailPrimary || 'hello@sagarindustry.com'}</p>
                    </div>
                  </div>
                </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-gray-100 flex items-center justify-between"
             >
                <div className="flex items-center gap-4">
                   <div className="bg-blue-50 p-3 rounded-full">
                     <Clock className="text-blue-600 w-6 h-6" />
                   </div>
                   <div>
                     <p className="text-gray-500 text-sm font-bold uppercase">Business Hours</p>
                     <p className="text-gray-900 font-bold">Mon - Sat, 09:00 - 18:00</p>
                   </div>
                </div>
             </motion.div>
          </div>

          {/* ── Message Form ── */}
          <div className="w-full lg:w-7/12">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-gray-100 h-full"
             >
               <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
               <p className="text-gray-500 mb-8">Fill out the form below and we'll get back to you shortly.</p>

               <form onSubmit={handleSubmit} className="space-y-6">
                  {status === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="bg-green-50 text-green-800 p-10 rounded-[2rem] border border-green-100 text-center flex flex-col items-center"
                    >
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={40} className="text-green-600" />
                      </div>
                      <h3 className="text-3xl font-black mb-3">Message Sent!</h3>
                      <p className="text-lg text-green-700 max-w-sm mx-auto mb-8">
                        Thank you for reaching out! We've received your query and will get back to you within 24 hours.
                      </p>
                      <button 
                        type="button" 
                        onClick={() => setStatus('idle')} 
                        className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition shadow-lg hover:shadow-xl"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">First Name <span className="text-red-500">*</span></label>
                          <input 
                            required
                            type="text" 
                            className="w-full px-5 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e] outline-none transition-all" 
                            placeholder="John" 
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Last Name <span className="text-red-500">*</span></label>
                          <input 
                            required
                            type="text" 
                            className="w-full px-5 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e] outline-none transition-all" 
                            placeholder="Doe" 
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                          <input 
                            required
                            type="tel" 
                            className="w-full px-5 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e] outline-none transition-all" 
                            placeholder="+91 98765 43210" 
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Email Address (Optional)</label>
                          <input 
                            type="email" 
                            className="w-full px-5 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e] outline-none transition-all" 
                            placeholder="john@example.com" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Subject <span className="text-red-500">*</span></label>
                        <input 
                          required
                          type="text" 
                          className="w-full px-5 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e] outline-none transition-all" 
                          placeholder="General Inquiry" 
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Your Message <span className="text-red-500">*</span></label>
                        <textarea 
                          required
                          rows={5} 
                          className="w-full px-5 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e] outline-none transition-all resize-none" 
                          placeholder="How can we help you today?" 
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                      </div>

                      {/* Honeypot Field (Hidden) */}
                      <div className="hidden">
                        <input 
                          type="text" 
                          autoComplete="off"
                          value={formData.honeypot}
                          onChange={(e) => setFormData({...formData, honeypot: e.target.value})}
                        />
                      </div>

                      <button 
                        disabled={status === 'loading'}
                        type="submit" 
                        className="w-full bg-[#1a237e] text-white font-bold text-lg py-5 rounded-xl hover:bg-[#151b60] hover:shadow-lg transition-all duration-300 transform active:scale-[0.99] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {status === 'loading' ? 'Sending...' : 'Send Message'} <Send size={20} />
                      </button>
                      {status === 'error' && <p className="text-red-500 text-sm text-center mt-2">Failed to send message. Please try again.</p>}
                    </>
                  )}
               </form>
             </motion.div>
          </div>

        </div>

        {/* ── Map ── */}
        <motion.div 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-20 h-[400px] w-full rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white ring-1 ring-gray-100"
        >
           <iframe 
             src={settings?.googleMapsEmbed || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118147.68202061097!2d70.73892828699661!3d22.273630794506306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac71cdf0f%3A0x76dd15cfbe93ad3b!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1709848293847!5m2!1sen!2sin"} 
             width="100%" 
             height="100%" 
             style={{ border: 0 }} 
             allowFullScreen 
             loading="lazy" 
             title="Sagar Industries Location"
             className="grayscale hover:grayscale-0 transition duration-700"
           ></iframe>
        </motion.div>

      </div>
    </div>
  );
}
