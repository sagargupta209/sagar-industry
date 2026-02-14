import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | SAGAR Industries',
  description: 'Privacy Policy for SAGAR Industries website data collection and usage.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl prose prose-lg prose-indigo">
      <h1 className="text-4xl font-bold text-[#1a237e] text-center mb-12">Privacy Policy</h1>
      
      <h3>Information We Collect</h3>
      <p>We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, subscribe to the newsletter, respond to a survey, fill out a form, and in connection with other activities, services, features or resources we make available on our Site.</p>
      
      <h3>How We Use Collected Information</h3>
      <p>SAGAR Industries may collect and use Users personal information for the following purposes:</p>
      <ul>
        <li>To improve customer service</li>
        <li>To personalize user experience</li>
        <li>To improve our Site</li>
        <li>To process payments</li>
        <li>To send periodic emails</li>
      </ul>
      
      <h3>Web Browser Cookies</h3>
      <p>Our Site may use "cookies" to enhance User experience. User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them.</p>
      
      <p className="text-sm text-gray-500 mt-12 border-t pt-4">Last updated: February 2026</p>
    </div>
  );
}
