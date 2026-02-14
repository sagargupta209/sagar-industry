import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import HeroSlide from '@/models/HeroSlide';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const isAdmin = searchParams.get('admin') === 'true';
    const queryParam = searchParams.get('q');
    const skip = (page - 1) * limit;

    let query: any = {};
    if (!isAdmin) query.isActive = { $ne: false };
    if (queryParam) {
      query.$or = [
        { title: { $regex: queryParam, $options: 'i' } },
        { description: { $regex: queryParam, $options: 'i' } }
      ];
    }

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
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch slides' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const slide = await HeroSlide.create(body);
    return NextResponse.json({ success: true, data: slide }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create slide' }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    
    const body = await req.json();
    const slide = await HeroSlide.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: slide });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update slide' }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    
    const body = await req.json();
    const slide = await HeroSlide.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: slide });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update slide' }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
    await dbConnect();
    try {
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
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete slide' }, { status: 500 });
    }
}
