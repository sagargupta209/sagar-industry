import { MetadataRoute } from 'next';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sagarindustry.com';

  // Fetch all active products for dynamic routes
  let productEntries: any[] = [];
  try {
    await dbConnect();
    const products = await Product.find({ isActive: { $ne: false } }).select('_id updatedAt').lean();
    productEntries = products.map((p) => ({
      url: `${baseUrl}/products/${p._id}`,
      lastModified: p.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Sitemap product fetch error:', error);
  }

  const routes = [
    '',
    '/products',
    '/about',
    '/contact',
    '/distributors',
    '/how-we-do-it',
    '/faq',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes, ...productEntries];
}
