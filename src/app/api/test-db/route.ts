import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const logFile = path.join(process.cwd(), 'db-test-log.json');
  let publicIp = 'unknown';
  try {
    const ipRes = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipRes.json();
    publicIp = ipData.ip;
  } catch (e) {}

  try {
    console.log('Testing DB connection from IP:', publicIp);
    const conn = await dbConnect();
    const result = { 
      success: true, 
      timestamp: new Date().toISOString(),
      publicIp,
      message: 'Connected to MongoDB',
      readyState: mongoose.connection.readyState,
      dbName: mongoose.connection.db?.databaseName
    };
    fs.writeFileSync(logFile, JSON.stringify(result, null, 2));
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('DB Test Error:', error);
    const errorResult = { 
      success: false, 
      timestamp: new Date().toISOString(),
      publicIp,
      error: error.message,
      name: error.name,
      reason: error.reason,
      stack: error.stack,
      code: error.code
    };
    fs.writeFileSync(logFile, JSON.stringify(errorResult, null, 2));
    return NextResponse.json(errorResult, { status: 500 });
  }
}
