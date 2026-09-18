import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin';
import { SHEET_NAMES } from '@/lib/constants';
import { listSheetRows } from '@/lib/google-sheets';
import { listSubmissions, markSubmissionsRead } from '@/lib/submissions';
import { getBlogs } from '@/lib/blogs';

export const runtime = 'nodejs';

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const [contacts, quotes, careers, blogs, local] = await Promise.all([
    listSheetRows(SHEET_NAMES.contact),
    listSheetRows(SHEET_NAMES.quote),
    listSheetRows(SHEET_NAMES.careers),
    getBlogs(),
    listSubmissions(),
  ]);

  const unread = local.filter((item) => !item.read).length;

  return NextResponse.json({
    success: true,
    contacts,
    quotes,
    careers,
    blogs,
    local,
    unread,
    notifications: local.slice(0, 12),
  });
}

export async function POST() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  await markSubmissionsRead();
  return NextResponse.json({ success: true });
}
