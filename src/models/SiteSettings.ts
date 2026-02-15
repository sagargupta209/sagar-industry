import mongoose from 'mongoose';

const SiteSettingsSchema = new mongoose.Schema({
  // Business Contact
  phonePrimary: { type: String, default: '' },
  phoneSecondary: { type: String, default: '' },
  whatsapp: { type: String, default: '' },
  customerCare: { type: String, default: '' },
  emailPrimary: { type: String, default: '' },
  emailSupport: { type: String, default: '' },
  emailSales: { type: String, default: '' },

  // Business Address
  companyName: { type: String, default: 'Sagar Industries Pvt. Ltd.' },
  addressStreet: { type: String, default: '' },
  addressArea: { type: String, default: '' },
  addressCity: { type: String, default: '' },
  addressState: { type: String, default: '' },
  addressPincode: { type: String, default: '' },
  googleMapsEmbed: { type: String, default: '' },

  // Social Links
  facebook: { type: String, default: '' },
  instagram: { type: String, default: '' },
  twitter: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  youtube: { type: String, default: '' },
  pinterest: { type: String, default: '' },

  // Brand & Legal
  copyrightText: { type: String, default: '© 2024 Sagar Industries. All Rights Reserved.' },
  gstNumber: { type: String, default: '' },
  cinNumber: { type: String, default: '' },
  trademarkLine: { type: String, default: '' },
  
  // Business Stats
  statsExperience: { type: String, default: '25+' },
  statsProducts: { type: String, default: '50+' },
  statsCustomers: { type: String, default: '1M+' },
  statsCities: { type: String, default: '100+' },
  
  // homepage sections
  trustBadgesTitle: { type: String, default: 'Our Quality' },
  trustBadgesTitleAccent: { type: String, default: 'Uncompromised' },

  // SEO
  metaTitle: { type: String, default: 'Sagar Industry' },
  metaDescription: { type: String, default: '' },
  ogImage: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);
