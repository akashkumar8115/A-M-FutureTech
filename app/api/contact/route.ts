import { NextResponse } from 'next/server';
import {
  buildConfirmationEmail,
  buildNotificationEmail,
  getEmailErrorMessage,
  getRecipient,
  sendConfirmationEmail,
  sendEmail,
} from '@/lib/email';
import { jsonError, jsonSuccess, readJsonBody } from '@/lib/api';
import { validateEmail, validatePhone, validateRequired } from '@/lib/validation';

export const runtime = 'nodejs';
export const maxDuration = 30;

type ContactPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  projectDetails?: string;
  companyName?: string;
  serviceRequired?: string;
  projectBudget?: string;
};

export async function POST(request: Request) {
  try {
    const body = await readJsonBody<ContactPayload>(request);

    if (!body) {
      return jsonError('Invalid request body.');
    }

    const { fullName, email, phone, projectDetails, companyName, serviceRequired, projectBudget } = body;

    if (!validateRequired(fullName || '')) {
      return jsonError('Full name is required.');
    }

    if (!validateRequired(email || '')) {
      return jsonError('Email is required.');
    }

    if (!validateEmail(email || '')) {
      return jsonError('Please enter a valid email address.');
    }

    if (phone && !validatePhone(phone)) {
      return jsonError('Phone number is too short.');
    }

    if (!validateRequired(projectDetails || '')) {
      return jsonError('Project details are required.');
    }

    const recipient = getRecipient();
    const notification = buildNotificationEmail({
      title: 'New A&M FutureTech enquiry',
      fields: [
        ['Full Name', fullName || ''],
        ['Email', email || ''],
        ['Phone', phone || 'Not provided'],
        ['Company', companyName || 'Not provided'],
        ['Service Required', serviceRequired || 'Not provided'],
        ['Project Budget', projectBudget || 'Not provided'],
      ],
      messageLabel: 'Project Details',
      message: projectDetails,
    });

    await sendEmail({
      to: recipient,
      replyTo: email,
      subject: `New enquiry from ${fullName}`,
      html: notification.html,
      text: notification.text,
      tags: [{ name: 'form', value: 'contact' }],
    });

    const confirmation = buildConfirmationEmail({
      title: 'We received your enquiry',
      intro: 'Thank you for contacting A&M FutureTech. Our team will review your project details and get back to you shortly.',
      fields: [
        ['Name', fullName || ''],
        ['Service', serviceRequired || 'Not specified'],
      ],
    });

    await sendConfirmationEmail({
      to: email || '',
      subject: 'We received your enquiry | A&M FutureTech',
      html: confirmation.html,
      text: confirmation.text,
      tags: [{ name: 'form', value: 'contact-confirmation' }],
    });

    return jsonSuccess('Your enquiry has been submitted successfully. Our team will contact you shortly.');
  } catch (error) {
    console.error('[api/contact] Contact route error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    const message = getEmailErrorMessage(error) || 'Something went wrong while sending your enquiry.';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
