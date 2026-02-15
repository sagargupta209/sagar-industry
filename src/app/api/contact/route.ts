import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { contactSchema } from '@/lib/validations';
import { isAdmin, unauthorizedResponse } from '@/lib/auth';
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit';

export async function GET(req: Request) {
  try {
    // ONLY Admins can see contact messages
    if (!(await isAdmin())) {
      return unauthorizedResponse();
    }

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
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // 0. Rate Limiting (Spam protection)
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const isAllowed = await rateLimit(ip, 5); // 5 messages per minute
    if (!isAllowed) return rateLimitResponse();

    await dbConnect();
    const body = await req.json();

    // 1. Zod Validation
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ 
        success: false, 
        error: 'Validation failed', 
        details: validation.error.format() 
      }, { status: 400 });
    }

    // 2. Honeypot check (handled by Zod, but extra safety)
    if (body.honeypot && body.honeypot.length > 0) {
      return NextResponse.json({ success: false, error: 'Spam detected' }, { status: 400 });
    }

    // 3. Save to DB (Exclude honeypot)
    const { honeypot, ...contactData } = body;
    const contact = await Contact.create(contactData);
    
    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 });
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
      if (!(await isAdmin())) return unauthorizedResponse();

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
