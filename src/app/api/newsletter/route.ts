import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const queryParam = searchParams.get('q');
    const skip = (page - 1) * limit;

    let query: any = {};
    if (queryParam) {
      query.email = { $regex: queryParam, $options: 'i' };
    }

    const [subscribers, totalCount] = await Promise.all([
      Newsletter.find(query).sort({ subscribedAt: -1 }).skip(skip).limit(limit),
      Newsletter.countDocuments(query)
    ]);

    return NextResponse.json({ 
      success: true, 
      data: subscribers,
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
    await dbConnect();
    const { email } = await req.json();
    
    // Check if email already exists
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return NextResponse.json({ success: false, message: 'You are already subscribed!' }, { status: 400 });
    }

    const subscriber = await Newsletter.create({ email });
    return NextResponse.json({ success: true, data: subscriber });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const clearAll = searchParams.get('clearAll') === 'true';

        if (clearAll) {
            await Newsletter.deleteMany({});
            return NextResponse.json({ success: true, message: 'All subscribers cleared' });
        }

        if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
        
        await Newsletter.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: 'Subscriber removed' });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
