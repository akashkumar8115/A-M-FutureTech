import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'am_admin_session';

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD?.trim() || 'AMfuture@2026';
}

export function isAdminAuthenticated() {
  return cookies().get(ADMIN_COOKIE)?.value === 'authenticated';
}
