import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jsonError, jsonSuccess, readJsonBody } from '@/lib/api';
import { ADMIN_COOKIE, getAdminPassword } from '@/lib/admin';
import { adminLoginSchema, firstZodError } from '@/lib/schemas';

export async function POST(request: Request) {
  const body = await readJsonBody(request);
  const parsed = adminLoginSchema.safeParse(body);
  if (!parsed.success) return jsonError(firstZodError(parsed.error));

  if (parsed.data.password !== getAdminPassword()) {
    return jsonError('Invalid admin password.', 401);
  }

  cookies().set(ADMIN_COOKIE, 'authenticated', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12,
  });

  return jsonSuccess('Signed in.');
}
