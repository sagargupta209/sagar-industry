import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * Checks if the user is authenticated as an admin.
 * @returns boolean
 */
export async function isAdmin() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('admin_auth');
  return auth?.value === 'true';
}

/**
 * Common response for unauthorized access
 */
export function unauthorizedResponse() {
  return NextResponse.json(
    { success: false, error: 'Unauthorized. Admin access required.' },
    { status: 401 }
  );
}
