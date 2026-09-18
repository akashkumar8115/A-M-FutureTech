import { SHEET_NAMES } from '@/lib/constants';
import { appendToSheet } from '@/lib/google-sheets';
import { saveSubmission, type SubmissionType } from '@/lib/submissions';
import {
  buildConfirmationEmail,
  buildNotificationEmail,
  sendConfirmationEmail,
  sendEmail,
  getRecipient,
} from '@/lib/email';
import { resolvedBudget } from '@/lib/schemas';
import type { ContactPayload } from '@/lib/schemas';

export async function submitEnquiry(type: Extract<SubmissionType, 'contact' | 'quote'>, data: ContactPayload) {
  const budget = resolvedBudget(data.projectBudget, data.customBudget);
  const submittedAt = new Date().toISOString();
  const sheetName = type === 'quote' ? SHEET_NAMES.quote : SHEET_NAMES.contact;
  const values = {
    'Submitted At': submittedAt,
    'Full Name': data.fullName,
    'Job Title': data.jobTitle || '',
    'Company Name': data.companyName,
    Email: data.email,
    Phone: data.phone || '',
    Website: data.website || '',
    'Service Required': data.serviceRequired,
    'Project Budget': budget,
    Timeline: data.timeline,
    'How Heard': data.howHeard || '',
    'Project Details': data.projectDetails,
    Consent: data.consent ? 'Yes' : 'No',
  };

  await saveSubmission(type, values);
  await appendToSheet(sheetName, values);

  const title = type === 'quote' ? 'New A&M FutureTech quote request' : 'New A&M FutureTech enquiry';
  const notification = buildNotificationEmail({
    title,
    fields: [
      ['Full Name', data.fullName],
      ['Job Title', data.jobTitle || 'Not provided'],
      ['Company', data.companyName],
      ['Email', data.email],
      ['Phone', data.phone || 'Not provided'],
      ['Website', data.website || 'Not provided'],
      ['Service Required', data.serviceRequired],
      ['Project Budget', budget],
      ['Timeline', data.timeline],
      ['How Heard', data.howHeard || 'Not provided'],
    ],
    messageLabel: 'Project Details',
    message: data.projectDetails,
  });

  await sendEmail({
    to: getRecipient(),
    replyTo: data.email,
    subject: type === 'quote' ? `Quote request from ${data.fullName}` : `New enquiry from ${data.fullName}`,
    html: notification.html,
    text: notification.text,
    tags: [{ name: 'form', value: type }],
  });

  const confirmation = buildConfirmationEmail({
    title: type === 'quote' ? 'We received your quote request' : 'We received your enquiry',
    intro: 'Thank you for contacting A&M FutureTech. Our team will review the details and get back to you shortly.',
    fields: [
      ['Name', data.fullName],
      ['Service', data.serviceRequired],
      ['Budget', budget],
    ],
  });

  await sendConfirmationEmail({
    to: data.email,
    subject: type === 'quote' ? 'We received your quote request | A&M FutureTech' : 'We received your enquiry | A&M FutureTech',
    html: confirmation.html,
    text: confirmation.text,
    tags: [{ name: 'form', value: `${type}-confirmation` }],
  });
}
