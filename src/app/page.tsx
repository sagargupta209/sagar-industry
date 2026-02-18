import { Star, ArrowRight, Truck, ShieldCheck, Leaf } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cache } from 'react';

// Components
import HeroSection from '@/components/home/HeroSection';
import CategoryCarousel from '@/components/home/CategoryCarousel';
import DistributorCTA from '@/components/home/DistributorCTA';
import TechSection from '@/components/home/TechSection';
import ContactSection from '@/components/home/ContactSection';
import TrustBadges from '@/components/home/TrustBadges';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ClientMotionWrapper from '@/components/home/ClientMotionWrapper';

// Models & DB
import dbConnect from '@/lib/mongodb';
import HeroSlide from '@/models/HeroSlide';
import Testimonial from '@/models/Testimonial';
import SiteSettings from '@/models/SiteSettings';
import Category from '@/models/Category';

const getInitialData = cache(async () => {
  await dbConnect();
  const [heroSlides, testimonials, settings, categories] = await Promise.all([
    HeroSlide.find({ isActive: { $ne: false } }).sort({ order: 1, createdAt: -1 }).limit(10).lean(),
    Testimonial.find({ isActive: { $ne: false } }).sort({ createdAt: -1 }).limit(6).lean(),
    SiteSettings.findOne({}).lean(),
    Category.find({ isActive: { $ne: false } }).sort({ createdAt: -1 }).limit(10).lean()
  ]);

  return {
    heroSlides: JSON.parse(JSON.stringify(heroSlides)),
    testimonials: JSON.parse(JSON.stringify(testimonials)),
    settings: JSON.parse(JSON.stringify(settings)),
    categories: JSON.parse(JSON.stringify(categories))
  };
});

export default async function Home() {
  const { heroSlides, testimonials, settings, categories } = await getInitialData();

  const features = [
    { icon: <Leaf className="text-green-500" />, title: '100% Natural', desc: 'No artificial preservatives, just pure taste.' },
    { icon: <ShieldCheck className="text-blue-500" />, title: 'Quality Assured', desc: 'Hygiene standards that exceed expectations.' },
    { icon: <Truck className="text-yellow-500" />, title: 'Fresh Delivery', desc: 'From our factory to your home in record time.' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HeroSection initialData={heroSlides} />

      {/* ── Features Bar ── */}
      <section className="bg-[#1a237e] text-white py-8 md:py-16 relative overflow-hidden -mt-2 z-[var(--z-content)] rounded-b-[2rem] shadow-xl">
         <div className="container mx-auto px-4 md:px-6 grid grid-cols-3 gap-4 md:gap-8 text-center relative z-10 w-full overflow-hidden">
            {features.map((f, i) => (
              <ClientMotionWrapper 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center gap-2 p-1 md:p-4 transition-colors relative w-full"
              >
                 <div className="bg-white p-2 md:p-3 rounded-full shadow-lg scale-75 md:scale-100 flex items-center justify-center">{f.icon}</div>
                 <h3 className="font-bold text-[10px] md:text-xl leading-tight w-full break-words">{f.title}</h3>
                 <p className="text-blue-100 text-[8px] md:text-base opacity-90 line-clamp-2 md:line-clamp-none w-full">{f.desc}</p>
              </ClientMotionWrapper>
            ))}
         </div>
         {/* Decor */}
         <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </section>

      {/* ── Best Sellers ── */}
      <section className="py-8 md:py-24 bg-gray-50">
         <CategoryCarousel initialData={categories} />
      </section>

      {/* ── Brand Story ── */}
      <section className="py-4 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50 rounded-l-[5rem] -z-10 hidden lg:block"></div>
        
        <div className="container mx-auto px-6 overflow-hidden flex flex-col lg:flex-row items-center gap-0 md:gap-16">
          <ClientMotionWrapper 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="lg:w-1/2 relative flex justify-center py-0 md:py-12"
          >
            <div className="relative w-full max-w-md px-8 md:px-0">
              {/* Main Image (Top) */}
              <Image 
                src="/images/new/image11.png" 
                alt="Chaat Papdi" 
                width={500}
                height={500}
                className="drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)] relative z-[var(--z-hero-nav)]"
                style={{ width: '100%', height: 'auto' }}
              />
              
              {/* Background Image Left */}
              <ClientMotionWrapper
                as="img"
                src="/images/new/image2.png" 
                alt="Decorative Snack"
                width={400}
                height={400}
                className="absolute top-4 left-0 md:-left-12 opacity-60 blur-[1px] -rotate-12 z-[var(--z-content)]"
                 style={{ width: '35%', height: 'auto' }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 0.6, x: 0 }}
                transition={{ delay: 0.4 }}
              />

              {/* Background Image Right */}
              <ClientMotionWrapper
                as="img"
                src="/images/new/image3.png" 
                alt="Decorative Snack"
                width={400}
                height={400}
                className="absolute top-4 right-0 md:-right-12 opacity-60 blur-[1px] rotate-12 z-[var(--z-elevated)]"
                 style={{ width: '35%', height: 'auto' }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 0.6, x: 0 }}
                transition={{ delay: 0.5 }}
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce-slow hidden md:flex z-[var(--z-floating)]">
               <div className="bg-yellow-400 p-3 rounded-full text-[#1a237e] font-bold text-xl">{settings?.statsExperience || '25+'}</div>
               <div className="text-sm font-bold text-gray-600">Years of<br/>Excellence</div>
            </div>
          </ClientMotionWrapper>

          <ClientMotionWrapper 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="lg:w-1/2"
          >
            <h4 className="text-[#1a237e] font-bold uppercase tracking-widest mb-2 text-sm md:text-base">Our Heritage</h4>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Quality is our <br className="md:hidden" /> <span className="text-orange-500">Cornerstone</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
              Established in <span className="font-bold text-gray-900">2005</span>, <span className="font-bold text-[#1a237e]">Sagar Industry & Sai Food Product</span> has a legacy of over two decades in manufacturing snacks and delicious bakery items. What started in Rajnandgaon is now expanding footprints across the entire country.
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              From <span className="italic font-medium">Crunchy Snacks</span> to a premium range of <span className="font-bold">Biscuits, Rusks, Cookies, and Cream Rolls</span>, we ensure every bite is a burst of flavor, prepared under the most hygienic conditions and international standards.
            </p>
            
            <Link href="/about" className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a237e] text-white font-bold rounded-full shadow-lg hover:bg-[#151b60] hover:shadow-xl transition-all group">
              Read Our Story <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ClientMotionWrapper>
        </div>
      </section>

      {/* ── Quality Trust Badges ── */}
      <TrustBadges />

      <DistributorCTA />
      
      {/* ── Testimonials (Dynamic) ── */}
      <TestimonialsSection initialData={testimonials} />

      <TechSection />

      <ContactSection />
    </div>
  );
}

