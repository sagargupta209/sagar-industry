'use client';

import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, Truck, ShieldCheck, CheckCircle2, MapPin, Building2, User } from 'lucide-react';

export default function DistributorPage() {
  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: 'High Growth Potential',
      description: 'Join a rapidly expanding brand with increasing demand across markets.'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      title: 'Premium Quality',
      description: 'Sell products that customers love and trust, with 100% quality assurance.'
    },
    {
      icon: <Briefcase className="w-8 h-8 text-yellow-600" />,
      title: 'Marketing Support',
      description: 'Get comprehensive support with branding, displays, and promotional materials.'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-40 lg:pt-40 lg:pb-64 bg-[#1a237e] text-white overflow-hidden">
         {/* Background Decoration */}
         <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
         <div className="absolute inset-0 bg-gradient-to-b from-[#1a237e]/90 to-[#1a237e]/95"></div>
         <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
         <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500 rounded-full blur-[100px] opacity-20 -ml-20 -mb-20"></div>

         <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-yellow-300 font-bold text-sm tracking-wider uppercase mb-6">
                Business Opportunity
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                Become a <span className="text-yellow-400">Distributor</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                <span className="font-bold text-white uppercase tracking-wider">Sagar Industry & Sai Food Product</span> is a leading brand with a range of <span className="text-yellow-300 font-semibold">Snacks, Rusks, Cream Roll and Bakery items</span>. Become part of our family and help us spread deliciousness across India.
              </p>
            </motion.div>
         </div>
      </section>

      <div className="container mx-auto px-6 -mt-24 lg:-mt-32 relative z-20 pb-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* ── Left Content: Benefits ── */}
          <div className="w-full lg:w-5/12">
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="space-y-6"
            >
               <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Strong Presence</h3>
                  <div className="space-y-8">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center">
                        <TrendingUp className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">National Growth</h4>
                        <p className="text-gray-600 text-sm leading-relaxed mt-1">Established in 2005, we are currently making progressive efforts to establish footprints in the whole country.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center">
                        <ShieldCheck className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">Quality Assurance</h4>
                        <p className="text-gray-600 text-sm leading-relaxed mt-1">We source only the finest ingredients, and our products are prepared with love and care following traditional recipes.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center">
                        <Briefcase className="w-8 h-8 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">Legacy of Manufacturing</h4>
                        <p className="text-gray-600 text-sm leading-relaxed mt-1">From last two decades, company has legacy of manufacturing Snack, Biscuits, Rusks, Cookies and Cream Roll.</p>
                      </div>
                    </div>
                  </div>
               </div>

               {/* Easy Process Card */}
               <div className="bg-[#1a237e] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full blur-3xl opacity-20 transform translate-x-10 -translate-y-10"></div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-green-400" /> Simple Onboarding
                  </h3>
                  <ol className="relative border-l border-white/20 ml-3 space-y-6">
                    <li className="pl-6 relative">
                      <span className="absolute -left-1.5 top-1.5 w-3 h-3 bg-yellow-400 rounded-full ring-2 ring-[#1a237e]"></span>
                      <h5 className="font-bold text-yellow-300">Submit Application</h5>
                      <p className="text-sm text-blue-100 mt-1">Fill out the form with your details.</p>
                    </li>
                    <li className="pl-6 relative">
                      <span className="absolute -left-1.5 top-1.5 w-3 h-3 bg-white/50 rounded-full"></span>
                      <h5 className="font-bold">Review & Approval</h5>
                      <p className="text-sm text-blue-100 mt-1">Our team will verify your profile.</p>
                    </li>
                    <li className="pl-6 relative">
                      <span className="absolute -left-1.5 top-1.5 w-3 h-3 bg-white/50 rounded-full"></span>
                      <h5 className="font-bold">Start Business</h5>
                      <p className="text-sm text-blue-100 mt-1">Receive stock and marketing kit!</p>
                    </li>
                  </ol>
               </div>
            </motion.div>
          </div>

          {/* ── Right Content: Application Form ── */}
          <div className="w-full lg:w-7/12">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-gray-100"
            >
              <h2 className="text-3xl font-black text-gray-900 mb-8">Application Form</h2>
              
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const data = Object.fromEntries(formData);
                  
                  try {
                    const res = await fetch('/api/distributors', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data)
                    });
                    if (res.ok) {
                      alert('Application submitted successfully! Our team will contact you soon.');
                      (e.target as HTMLFormElement).reset();
                    }
                  } catch (err) {
                    alert('Failed to submit application. Please try again.');
                  }
                }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Company Name</label>
                    <input name="companyName" required type="text" placeholder="Your Business Name" className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Owner Name</label>
                    <input name="ownerName" required type="text" placeholder="Full Name" className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                    <input name="phone" required type="tel" placeholder="+91 XXXXX XXXXX" className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                    <input name="email" required type="email" placeholder="email@example.com" className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">City</label>
                    <input name="city" required type="text" placeholder="Your City" className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">State</label>
                    <input name="state" required type="text" placeholder="Your State" className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Business Experience</label>
                  <input name="experience" type="text" placeholder="e.g. 5 Years in FMCG" className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Additional Message</label>
                  <textarea name="message" rows={4} placeholder="Anything else you'd like to share?" className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium resize-none"></textarea>
                </div>

                <button type="submit" className="w-full bg-[#1a237e] text-white font-black text-xl py-5 rounded-[1.5rem] shadow-xl shadow-blue-100 hover:bg-orange-500 hover:shadow-orange-200 transition-all transform hover:-translate-y-1 active:scale-95">
                  Submit Application
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
