import { NextResponse } from 'next/server';

import { LRUCache } from 'lru-cache';

const tokenCache = new LRUCache({
  max: 500,
  ttl: 60 * 1000, // 1 minute
});

/**
 * A simple rate limiting utility for API routes.
 * @param req Request object
 * @param limit Maximum number of requests allowed within the interval
 * @returns boolean true if allowed, false if limited
 */
export async function rateLimit(ip: string, limit: number = 60) {
  const tokenCount = (tokenCache.get(ip) as number[]) || [0];
  
  if (tokenCount[0] === 0) {
    tokenCache.set(ip, [1]);
    return true;
  }

  if (tokenCount[0] < limit) {
    tokenCount[0] += 1;
    tokenCache.set(ip, tokenCount);
    return true;
  }

  return false;
}

/**
 * Standard response for rate limited requests
 */
export function rateLimitResponse() {
  return NextResponse.json(
    { success: false, error: 'Too many requests. Please try again later.' },
    { status: 429 }
  );
}
