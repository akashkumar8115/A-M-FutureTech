import { NextResponse } from 'next/server';
import {
  buildConfirmationEmail,
  buildNotificationEmail,
  getEmailErrorMessage,
  getRecipient,
  sendConfirmationEmail,
  sendEmail,
} from '@/lib/email';
import { jsonError, jsonSuccess } from '@/lib/api';
import { careerSchema, firstZodError } from '@/lib/schemas';
import { SHEET_NAMES } from '@/lib/constants';
import { appendToSheet } from '@/lib/google-sheets';
import { saveSubmission } from '@/lib/submissions';

export const runtime = 'nodejs';
export const maxDuration = 30;

const MAX_RESUME_BYTES = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const payload = Object.fromEntries(
      Array.from(formData.entries())
        .filter(([key]) => key !== 'resume')
        .map(([key, value]) => [key, String(value)]),
    );

    const parsed = careerSchema.safeParse(payload);
    if (!parsed.success) return jsonError(firstZodError(parsed.error));

    const resume = formData.get('resume');
    const resumeFile = resume instanceof File && resume.size > 0 ? resume : null;
    if (!resumeFile) return jsonError('Resume is required.');
    if (!/\.(pdf|doc|docx)$/i.test(resumeFile.name)) return jsonError('Please upload a PDF or Word document.');
    if (resumeFile.size > MAX_RESUME_BYTES) return jsonError('Resume must be 5MB or smaller.');

    const values = {
      'Submitted At': new Date().toISOString(),
      'Full Name': parsed.data.fullName,
      Email: parsed.data.email,
      Phone: parsed.data.phone,
      City: parsed.data.city,
      LinkedIn: parsed.data.linkedin || '',
      Position: parsed.data.position,
      Experience: parsed.data.experience,
      'Current Company': parsed.data.currentCompany || '',
      'Notice Period': parsed.data.noticePeriod,
      'Expected CTC': parsed.data.expectedCtc || '',
      Resume: resumeFile.name,
      Message: parsed.data.message || '',
      Consent: parsed.data.consent ? 'Yes' : 'No',
    };

    await saveSubmission('careers', values);
    await appendToSheet(SHEET_NAMES.careers, values);

    const notification = buildNotificationEmail({
      title: 'New A&M FutureTech job application',
      fields: [
        ['Full Name', parsed.data.fullName],
        ['Email', parsed.data.email],
        ['Phone', parsed.data.phone],
        ['City', parsed.data.city],
        ['LinkedIn', parsed.data.linkedin || 'Not provided'],
        ['Position', parsed.data.position],
        ['Experience', parsed.data.experience],
        ['Current Company', parsed.data.currentCompany || 'Not provided'],
        ['Notice Period', parsed.data.noticePeriod],
        ['Expected CTC', parsed.data.expectedCtc || 'Not provided'],
        ['Resume', resumeFile.name],
      ],
      messageLabel: 'Message',
      message: parsed.data.message || 'No additional message.',
    });

    await sendEmail({
      to: getRecipient(),
      replyTo: parsed.data.email,
      subject: `Career application: ${parsed.data.position}`,
      html: notification.html,
      text: notification.text,
      attachments: [
        {
          filename: resumeFile.name,
          content: Buffer.from(await resumeFile.arrayBuffer()),
          contentType: resumeFile.type || 'application/octet-stream',
        },
      ],
      tags: [{ name: 'form', value: 'careers' }],
    });

    const confirmation = buildConfirmationEmail({
      title: 'We received your application',
      intro: 'Thank you for applying to A&M FutureTech. Our hiring team will review your profile and contact you if there is a match.',
      fields: [
        ['Name', parsed.data.fullName],
        ['Position', parsed.data.position],
      ],
    });

    await sendConfirmationEmail({
      to: parsed.data.email,
      subject: `We received your application for ${parsed.data.position} | A&M FutureTech`,
      html: confirmation.html,
      text: confirmation.text,
      tags: [{ name: 'form', value: 'careers-confirmation' }],
    });

    return jsonSuccess('Your application has been submitted successfully.');
  } catch (error) {
    console.error('[api/careers] Career route error', error);
    return NextResponse.json(
      { success: false, message: getEmailErrorMessage(error) || 'Unable to submit your application right now.' },
      { status: 500 },
    );
  }
}
