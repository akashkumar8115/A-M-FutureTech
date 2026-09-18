import { NextResponse } from 'next/server';
import { getEmailErrorMessage } from '@/lib/email';
import { jsonError, jsonSuccess, readJsonBody } from '@/lib/api';
import { quoteSchema, firstZodError } from '@/lib/schemas';
import { submitEnquiry } from '@/lib/submit-enquiry';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const body = await readJsonBody(request);
    if (!body) return jsonError('Invalid request body.');

    const parsed = quoteSchema.safeParse({
      fullName: '',
      companyName: '',
      email: '',
      serviceRequired: '',
      projectBudget: '',
      timeline: '',
      projectDetails: '',
      consent: false,
      ...(body as Record<string, unknown>),
    });
    if (!parsed.success) return jsonError(firstZodError(parsed.error));

    await submitEnquiry('quote', parsed.data);
    return jsonSuccess('Your quote request has been submitted successfully.');
  } catch (error) {
    console.error('[api/quote] Quote route error', error);
    return NextResponse.json(
      { success: false, message: getEmailErrorMessage(error) || 'Unable to submit quote request right now.' },
      { status: 500 },
    );
  }
}
