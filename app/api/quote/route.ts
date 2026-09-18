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

type QuotePayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  serviceRequired?: string;
  projectBudget?: string;
  projectDetails?: string;
};

export async function POST(request: Request) {
  try {
    const body = await readJsonBody<QuotePayload>(request);

    if (!body) {
      return jsonError('Invalid request body.');
    }

    const { fullName, email, phone, companyName, serviceRequired, projectBudget, projectDetails } = body;

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

    if (!validateRequired(serviceRequired || '')) {
      return jsonError('Service is required.');
    }

    if (!validateRequired(projectDetails || '')) {
      return jsonError('Project details are required.');
    }

    const recipient = getRecipient();
    const notification = buildNotificationEmail({
      title: 'New A&M FutureTech quote request',
      fields: [
        ['Full Name', fullName || ''],
        ['Email', email || ''],
        ['Phone', phone || 'Not provided'],
        ['Company', companyName || 'Not provided'],
        ['Service Required', serviceRequired || ''],
        ['Project Budget', projectBudget || 'Not provided'],
      ],
      messageLabel: 'Project Details',
      message: projectDetails,
    });

    await sendEmail({
      to: recipient,
      replyTo: email,
      subject: `Quote request from ${fullName}`,
      html: notification.html,
      text: notification.text,
      tags: [{ name: 'form', value: 'quote' }],
    });

    const confirmation = buildConfirmationEmail({
      title: 'We received your quote request',
      intro: 'Thank you for requesting a quote from A&M FutureTech. Our team will review the details and share a response shortly.',
      fields: [
        ['Name', fullName || ''],
        ['Service', serviceRequired || ''],
      ],
    });

    await sendConfirmationEmail({
      to: email || '',
      subject: 'We received your quote request | A&M FutureTech',
      html: confirmation.html,
      text: confirmation.text,
      tags: [{ name: 'form', value: 'quote-confirmation' }],
    });

    return jsonSuccess('Your quote request has been submitted successfully.');
  } catch (error) {
    console.error('[api/quote] Quote route error', error);
    return NextResponse.json(
      { success: false, message: getEmailErrorMessage(error) || 'Unable to submit quote request right now.' },
      { status: 500 },
    );
  }
}
