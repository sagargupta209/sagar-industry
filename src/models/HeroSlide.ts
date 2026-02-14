import mongoose from 'mongoose';

const HeroSlideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  imageMobile: {
    type: String,
    required: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.models.HeroSlide || mongoose.model('HeroSlide', HeroSlideSchema);
