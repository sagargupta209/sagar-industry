import { Metadata } from 'next';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Share2 } from 'lucide-react';
import ShareButton from '@/components/products/ShareButton';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const BLUR_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

interface Props {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
  await dbConnect();
  const product = await Product.findById(id).populate('category').lean();
  if (!product) return null;
  return JSON.parse(JSON.stringify(product));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: 'Premium Quality Product | Sagar Industry',
      description: 'Discover the authentic taste of Gujarat with our premium snacks. Sagar Industry brings you the best quality chips, namkeens, and more.',
      openGraph: {
        title: 'Premium Quality Product | Sagar Industry',
        description: 'Discover the authentic taste of Gujarat with our premium snacks.',
        images: ['/logo.png'],
      },
    };
  }

  return {
    title: `${product.name} | Sagar Industry`,
    description: `Enjoy the authentic taste of ${product.name}. A premium quality snack from Sagar Industry.`,
    openGraph: {
      title: `${product.name} | Sagar Industry`,
      description: `Try our delicious ${product.name}. Perfect for any occasion!`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Sagar Industry`,
      description: `Try our delicious ${product.name}. Perfect for any occasion!`,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "image": [product.image],
            "description": `Premium quality ${product.name} from Sagar Industry. Authentic taste of Gujarat.`,
            "brand": {
              "@type": "Brand",
              "name": "Sagar Industry"
            },
            "offers": {
              "@type": "Offer",
              "url": `https://sagarindustry.com/products/${id}`,
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock",
              "itemCondition": "https://schema.org/NewCondition"
            }
          })
        }}
      />
      <div className="container mx-auto px-4 pt-10">
        <Breadcrumbs 
          items={[
            { label: 'Products', href: '/products' },
            { label: product.name }
          ]} 
        />
        <Link 
          href="/products" 
          className="inline-flex items-center gap-2 text-[#1a237e] font-bold hover:text-orange-500 transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Shop
        </Link>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Image Section */}
          <div className="w-full md:w-1/2 bg-gray-50 rounded-[2.5rem] p-8 md:p-12 flex justify-center items-center shadow-inner relative group">
             <div className="relative w-full aspect-square">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill
                  className="object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  priority
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
             </div>
             {/* Decorative Background */}
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <Share2 size={120} className="text-[#1a237e]" />
             </div>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 text-left">
             {product.category?.name && (
               <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
                 {product.category.name}
               </span>
             )}
             <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
               {product.name}
             </h1>
             <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
               Experience the perfect crunch with our premium {product.name}. Carefully crafted using traditional recipes and the finest ingredients to bring you the authentic taste of Gujarat.
             </p>
             
             <div className="flex flex-wrap gap-4 mb-10">
                <div className="px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                   <div className="text-2xl font-black text-[#1a237e]">100%</div>
                   <div className="text-xs font-bold text-gray-500 uppercase">Natural</div>
                </div>
                <div className="px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                   <div className="text-2xl font-black text-[#1a237e]">Hygiene</div>
                   <div className="text-xs font-bold text-gray-500 uppercase">Assured</div>
                </div>
                <div className="px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                   <div className="text-2xl font-black text-[#1a237e]">Zero</div>
                   <div className="text-xs font-bold text-gray-500 uppercase">Trans Fat</div>
                </div>
             </div>

             <div className="flex gap-4">
               <Link 
                 href="/contact" 
                 className="px-10 py-4 bg-[#1a237e] text-white font-black rounded-full shadow-lg hover:bg-[#151b60] hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95"
               >
                 Enquire for Bulk
               </Link>
                <ShareButton 
                  title={product.name}
                  text={`Check out ${product.name} from Sagar Industry!`}
                  url={`https://sagarindustry.com/products/${id}`}
                />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
