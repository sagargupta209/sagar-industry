import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | SAGAR Industries',
  description: 'Terms and Conditions for browsing and using SAGAR Industries website.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl prose prose-lg prose-indigo">
      <h1 className="text-4xl font-bold text-[#1a237e] text-center mb-12">Terms & Conditions</h1>
      
      <h3>Introduction</h3>
      <p>Welcome to SAGAR Industries. By accessing our website, you agree to these terms and conditions.</p>
      
      <h3>Intellectual Property</h3>
      <p>All content on this website, including text, graphics, logos, images, and software, is the property of SAGAR Industries and is protected by copyright laws.</p>
      
      <h3>Product Information</h3>
      <p>We make every effort to display the colors and images of our products accurately. We cannot guarantee that your monitor's display of any color will be accurate.</p>
      
      <h3>Limitation of Liability</h3>
      <p>SAGAR Industries shall not be liable for any special or consequential damages that result from the use of, or the inability to use, the materials on this site or the performance of the products.</p>
      
      <p className="text-sm text-gray-500 mt-12 border-t pt-4">Last updated: February 2026</p>
    </div>
  );
}
