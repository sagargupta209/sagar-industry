import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer | SAGAR Industries',
  description: 'Legal disclaimer for SAGAR Industries website.',
};

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl prose prose-lg prose-indigo">
      <h1 className="text-4xl font-bold text-[#1a237e] text-center mb-12">Disclaimer</h1>
      
      <h3>General Disclaimer</h3>
      <p>The information provided on this website is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.</p>
      
      <h3>Product Disclaimer</h3>
      <p>Actual product packaging and materials may contain more and different information than what is shown on our website. We recommend that you do not rely solely on the information presented and that you always read labels, warnings, and directions before using or consuming a product.</p>
      
      <p className="text-sm text-gray-500 mt-12 border-t pt-4">Last updated: February 2026</p>
    </div>
  );
}
