import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import FAQ from '@/models/FAQ';

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
        { question: { $regex: queryParam, $options: 'i' } },
        { answer: { $regex: queryParam, $options: 'i' } }
      ];
    }

    const [faqs, totalCount] = await Promise.all([
      FAQ.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      FAQ.countDocuments(query)
    ]);

    return NextResponse.json({ 
      success: true, 
      data: faqs,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        limit
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const faq = await FAQ.create(body);
    return NextResponse.json({ success: true, data: faq }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create FAQ' }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    
    const body = await req.json();
    const faq = await FAQ.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: faq });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update FAQ' }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    
    const body = await req.json();
    const faq = await FAQ.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: faq });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update FAQ' }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const clearAll = searchParams.get('clearAll') === 'true';

        if (clearAll) {
            await FAQ.deleteMany({});
            return NextResponse.json({ success: true, message: 'All FAQs cleared' });
        }

        if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
        
        await FAQ.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: 'FAQ deleted' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to delete FAQ' }, { status: 500 });
    }
}
