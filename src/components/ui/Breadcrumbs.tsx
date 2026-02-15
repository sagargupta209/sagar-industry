'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide py-1">
      <ol className="flex items-center gap-2 text-sm font-medium text-gray-500">
        <li className="flex items-center">
          <Link 
            href="/" 
            className="flex items-center gap-1 hover:text-[#1a237e] transition-colors"
          >
            <Home size={14} />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
            {item.href ? (
              <Link 
                href={item.href}
                className="hover:text-[#1a237e] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[#1a237e] font-bold">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://sagarindustry.com"
              },
              ...items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": item.label,
                "item": item.href ? `https://sagarindustry.com${item.href}` : undefined
              }))
            ]
          })
        }}
      />
    </nav>
  );
};

export default Breadcrumbs;
