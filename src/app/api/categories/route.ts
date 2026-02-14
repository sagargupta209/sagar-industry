import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';

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
        { name: { $regex: queryParam, $options: 'i' } }
      ];
    }

    const [categories, totalCount] = await Promise.all([
      Category.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Category.countDocuments(query)
    ]);

    return NextResponse.json({ 
      success: true, 
      data: categories,
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
  await dbConnect();
  try {
    const body = await req.json();
    const category = await Category.create(body);
    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    
    const body = await req.json();
    const category = await Category.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: category });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    
    const body = await req.json();
    const category = await Category.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: category });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  await dbConnect();
  try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      const clearAll = searchParams.get('clearAll') === 'true';

      if (clearAll) {
          await Category.deleteMany({});
          return NextResponse.json({ success: true, message: 'All categories cleared' });
      }

      if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
      
      await Category.findByIdAndDelete(id);
      return NextResponse.json({ success: true, message: 'Category deleted' });
  } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
