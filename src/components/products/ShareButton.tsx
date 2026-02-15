'use client';

import { Share2, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
}

const ShareButton = ({ title, text, url }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-6 py-4 bg-gray-100 text-[#1a237e] font-bold rounded-full hover:bg-gray-200 transition-all active:scale-95 group"
      aria-label="Share Product"
    >
      {copied ? (
        <>
          <Check size={20} className="text-green-600" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Share2 size={20} className="group-hover:rotate-12 transition-transform" />
          <span>Share Product</span>
        </>
      )}
    </button>
  );
};

export default ShareButton;
