import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    const admin = searchParams.get('admin') === 'true';
    const queryParam = searchParams.get('q');

    let query: any = admin ? {} : { isActive: { $ne: false } };
    if (queryParam) {
      query.$or = [
        { name: { $regex: queryParam, $options: 'i' } },
        { review: { $regex: queryParam, $options: 'i' } }
      ];
    }

    const [testimonials, totalCount] = await Promise.all([
      Testimonial.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Testimonial.countDocuments(query)
    ]);

    return NextResponse.json({ 
      success: true, 
      data: testimonials,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        limit
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const testimonial = await Testimonial.create(body);
    return NextResponse.json({ success: true, data: testimonial }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create testimonial' }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    
    const body = await req.json();
    const testimonial = await Testimonial.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: testimonial });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update testimonial' }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    
    const body = await req.json();
    const testimonial = await Testimonial.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: testimonial });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update testimonial' }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const clearAll = searchParams.get('clearAll') === 'true';

        if (clearAll) {
            await Testimonial.deleteMany({});
            return NextResponse.json({ success: true, message: 'All testimonials cleared' });
        }

        if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
        
        await Testimonial.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: 'Testimonial deleted' });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete testimonial' }, { status: 500 });
    }
}
