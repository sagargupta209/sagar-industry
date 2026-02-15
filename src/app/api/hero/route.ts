import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import HeroSlide from '@/models/HeroSlide';
import { heroSlideSchema } from '@/lib/validations';
import { isAdmin, unauthorizedResponse } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const isAdminUser = searchParams.get('admin') === 'true';
    const skip = (page - 1) * limit;

    let query: any = {};
    if (!isAdminUser) query.isActive = { $ne: false };

    const [slides, totalCount] = await Promise.all([
      HeroSlide.find(query).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit),
      HeroSlide.countDocuments(query)
    ]);

    return NextResponse.json({ 
      success: true, 
      data: slides,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        limit
      }
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!(await isAdmin())) return unauthorizedResponse();

    await dbConnect();
    const body = await req.json();

    // Zod Validation
    const validation = heroSlideSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ success: false, error: 'Invalid data', details: validation.error.format() }, { status: 400 });
    }

    const slide = await HeroSlide.create(body);
    return NextResponse.json({ success: true, data: slide }, { status: 201 });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    if (!(await isAdmin())) return unauthorizedResponse();

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    
    const body = await req.json();
    
    // Zod Validation
    const validation = heroSlideSchema.partial().safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ success: false, error: 'Invalid data', details: validation.error.format() }, { status: 400 });
    }

    const slide = await HeroSlide.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: slide });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    if (!(await isAdmin())) return unauthorizedResponse();

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    
    const body = await req.json();

    // Zod Validation
    const validation = heroSlideSchema.partial().safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ success: false, error: 'Invalid data', details: validation.error.format() }, { status: 400 });
    }

    const slide = await HeroSlide.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: slide });
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
        await HeroSlide.deleteMany({});
        return NextResponse.json({ success: true, message: 'All slides cleared' });
    }

    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    
    await HeroSlide.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Slide deleted' });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
