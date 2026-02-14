import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

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
      query.$or = [
        { firstName: { $regex: queryParam, $options: 'i' } },
        { lastName: { $regex: queryParam, $options: 'i' } },
        { phone: { $regex: queryParam, $options: 'i' } },
        { email: { $regex: queryParam, $options: 'i' } },
        { subject: { $regex: queryParam, $options: 'i' } },
        { message: { $regex: queryParam, $options: 'i' } }
      ];
    }

    const [contacts, totalCount] = await Promise.all([
      Contact.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Contact.countDocuments(query)
    ]);

    return NextResponse.json({ 
      success: true, 
      data: contacts,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        limit
      }
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const contact = await Contact.create(body);
    return NextResponse.json({ success: true, data: contact }, { status: 201 });
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
        await Contact.deleteMany({});
        return NextResponse.json({ success: true, message: 'All messages cleared' });
    }

    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    
    await Contact.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Message deleted' });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
      await dbConnect();
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
      
      const body = await req.json();
      const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
      return NextResponse.json({ success: true, data: contact });
  } catch (error: any) {
      console.error('API Error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
