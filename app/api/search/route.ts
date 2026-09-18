import { NextRequest, NextResponse } from 'next/server';
import { filterSearchIndex, getSearchIndex } from '@/lib/search';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') || '';
  const items = filterSearchIndex(await getSearchIndex(), query);
  return NextResponse.json({ success: true, items });
}
