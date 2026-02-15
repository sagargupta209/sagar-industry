import { z } from 'zod';

// Contact Form Schema
export const contactSchema = z.object({
  firstName: z.string().min(2, 'First name is required').max(50),
  lastName: z.string().min(2, 'Last name is required').max(50),
  phone: z.string().min(10, 'Invalid phone number').max(15),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  subject: z.string().min(3, 'Subject is required').max(100),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
  honeypot: z.string().max(0, 'Spam detected').optional(), // Should be empty
});

// Product Schema
export const productSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  image: z.string().url('Invalid image URL'),
  category: z.string().min(1, 'Category ID is required'),
  isActive: z.boolean().default(true),
});

// Hero Slide Schema
export const heroSlideSchema = z.object({
  title: z.string().min(2, 'Title is required').max(100).optional(),
  description: z.string().max(300).optional(),
  image: z.string().url('Invalid desktop image URL'),
  imageMobile: z.string().url('Invalid mobile image URL').optional(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

// Testimonial Schema
export const testimonialSchema = z.object({
  name: z.string().min(2, 'Name is required').max(50),
  role: z.string().max(50).optional(),
  review: z.string().min(10, 'Review is too short').max(500),
  rating: z.number().min(1).max(5).default(5),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
  isActive: z.boolean().default(true),
});
