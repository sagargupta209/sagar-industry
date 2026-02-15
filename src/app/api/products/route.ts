import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import '@/models/Category'; 
import { productSchema } from '@/lib/validations';
import { isAdmin, unauthorizedResponse } from '@/lib/auth';
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit';
import { IProduct, ApiResponse } from '@/types';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const isAdminUser = searchParams.get('admin') === 'true';
    const queryParam = searchParams.get('q');
    const skip = (page - 1) * limit;

    let query: any = {}; // MongoDB query is naturally dynamic
    if (categoryId) query.category = categoryId;
    if (!isAdminUser) query.isActive = { $ne: false };
    if (queryParam) {
      query.$or = [
        { name: { $regex: queryParam, $options: 'i' } }
      ];
    }

    const [products, totalCount] = await Promise.all([
      Product.find(query).populate('category').sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Product.countDocuments(query)
    ]);

    const response: ApiResponse<IProduct[]> = {
      success: true,
      data: JSON.parse(JSON.stringify(products)),
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        limit
      }
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message } as ApiResponse<never>, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!(await isAdmin())) return unauthorizedResponse();

    // Rate limiting for admin actions too (prevents bot brute force or scripted spam)
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!(await rateLimit(ip, 10))) return rateLimitResponse();

    await dbConnect();
    const body = await req.json();

    // Zod Validation
    const validation = productSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ success: false, error: 'Invalid data', details: validation.error.format() }, { status: 400 });
    }

    const product = await Product.create(body);
    return NextResponse.json({ success: true, data: product } as ApiResponse<IProduct>, { status: 201 });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    if (!(await isAdmin())) return unauthorizedResponse();

    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!(await rateLimit(ip, 20))) return rateLimitResponse();

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    
    const body = await req.json();

    // Zod Validation
    const validation = productSchema.partial().safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ success: false, error: 'Invalid data', details: validation.error.format() }, { status: 400 });
    }

    const product = await Product.findByIdAndUpdate(id, body, { new: true }).lean();
    return NextResponse.json({ success: true, data: JSON.parse(JSON.stringify(product)) } as ApiResponse<IProduct>);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
    try {
        if (!(await isAdmin())) return unauthorizedResponse();

        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const clearAll = searchParams.get('clearAll') === 'true';

        if (clearAll) {
            await Product.deleteMany({});
            return NextResponse.json({ success: true, message: 'All products cleared' });
        }

        if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
        
        await Product.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: 'Product deleted' });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
