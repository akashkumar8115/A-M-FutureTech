import { NextResponse } from 'next/server';

export async function readJsonBody<T>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}

export function jsonSuccess(message: string, extra?: Record<string, unknown>) {
  return NextResponse.json({ success: true, message, ...extra });
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}
