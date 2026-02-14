import mongoose from 'mongoose';

const DistributorSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  ownerName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  experience: { type: String, default: '' },
  message: { type: String, default: '' },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Distributor || mongoose.model('Distributor', DistributorSchema);
