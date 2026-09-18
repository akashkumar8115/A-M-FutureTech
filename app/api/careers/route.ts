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
import { validateEmail, validatePhone, validateRequired } from '@/lib/validation';

export const runtime = 'nodejs';
export const maxDuration = 30;

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const ALLOWED_RESUME_EXTENSIONS = ['.pdf', '.doc', '.docx'];

function isAllowedResume(file: File) {
  const name = file.name.toLowerCase();
  const hasAllowedExtension = ALLOWED_RESUME_EXTENSIONS.some((extension) => name.endsWith(extension));
  const hasAllowedType = !file.type || ALLOWED_RESUME_TYPES.includes(file.type);

  return hasAllowedExtension && hasAllowedType;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fullName = String(formData.get('fullName') || '');
    const email = String(formData.get('email') || '');
    const phone = String(formData.get('phone') || '');
    const position = String(formData.get('position') || '');
    const experience = String(formData.get('experience') || '');
    const message = String(formData.get('message') || '');
    const resume = formData.get('resume');

    if (!validateRequired(fullName)) {
      return jsonError('Full name is required.');
    }

    if (!validateRequired(email)) {
      return jsonError('Email is required.');
    }

    if (!validateEmail(email)) {
      return jsonError('Please enter a valid email address.');
    }

    if (!validateRequired(phone)) {
      return jsonError('Phone number is required.');
    }

    if (!validatePhone(phone)) {
      return jsonError('Phone number is too short.');
    }

    if (!validateRequired(position)) {
      return jsonError('Position is required.');
    }

    if (!validateRequired(experience)) {
      return jsonError('Experience is required.');
    }

    const resumeFile = resume instanceof File && resume.size > 0 ? resume : null;

    if (!resumeFile) {
      return jsonError('Resume is required.');
    }

    if (!isAllowedResume(resumeFile)) {
      return jsonError('Please upload a PDF or Word document.');
    }

    if (resumeFile.size > MAX_RESUME_BYTES) {
      return jsonError('Resume must be 5MB or smaller.');
    }

    const recipient = getRecipient();
    const notification = buildNotificationEmail({
      title: 'New A&M FutureTech job application',
      fields: [
        ['Full Name', fullName],
        ['Email', email],
        ['Phone', phone],
        ['Position', position],
        ['Experience', experience],
        ['Resume', resumeFile.name],
      ],
      messageLabel: 'Message',
      message: message || 'No additional message.',
    });

    await sendEmail({
      to: recipient,
      replyTo: email,
      subject: `Career application: ${position}`,
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
        ['Name', fullName],
        ['Position', position],
      ],
    });

    await sendConfirmationEmail({
      to: email,
      subject: `We received your application for ${position} | A&M FutureTech`,
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
