import { NextResponse } from 'next/server';
import { getEmailErrorMessage } from '@/lib/email';
import { jsonError, jsonSuccess, readJsonBody } from '@/lib/api';
import { contactSchema, firstZodError } from '@/lib/schemas';
import { submitEnquiry } from '@/lib/submit-enquiry';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const body = await readJsonBody(request);
    if (!body) return jsonError('Invalid request body.');

    const parsed = contactSchema.safeParse({
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

    await submitEnquiry('contact', parsed.data);
    return jsonSuccess('Your enquiry has been submitted successfully. Our team will contact you shortly.');
  } catch (error) {
    console.error('[api/contact] Contact route error', error);
    return NextResponse.json(
      { success: false, message: getEmailErrorMessage(error) || 'Something went wrong while sending your enquiry.' },
      { status: 500 },
    );
  }
}
