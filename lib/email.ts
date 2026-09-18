import { Resend } from 'resend';

export type EmailAttachment = {
  filename: string;
  content: Buffer | string;
  contentType?: string;
};

function getEnv(...keys: string[]): string {
  for (const key of keys) {
    const value = process.env[key];

    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return '';
}

export function getResendApiKey() {
  return getEnv('RESEND_API_KEY');
}

export function getFromAddress() {
  return getEnv('EMAIL_FROM', 'RESEND_FROM') || 'A&M FutureTech <info@amfuturetech.com>';
}

export function getRecipient() {
  return getEnv('CONTACT_RECEIVER', 'EMAIL_TO', 'MAIL_TO') || 'info@amfuturetech.com';
}

export function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatMultilineHtml(value: unknown) {
  return escapeHtml(value).replace(/\r\n|\n|\r/g, '<br />');
}

export function getEmailErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return 'Unable to send email. Please try again later.';
  }

  const message = error.message.toLowerCase();

  console.error('[email] Error details:', {
    name: error.name,
    message: error.message,
  });

  if (message.includes('not configured') || message.includes('missing api key')) {
    return 'Email service is not configured. Please try again later.';
  }

  if (message.includes('invalid api key') || message.includes('unauthorized') || message.includes('401')) {
    return 'Email service authentication failed. Please verify the Resend API key.';
  }

  if (message.includes('domain') || message.includes('from address')) {
    return 'The sender domain is not verified in Resend. Please verify the EMAIL_FROM domain.';
  }

  if (message.includes('rate limit') || message.includes('429')) {
    return 'Email service is temporarily rate limited. Please try again in a moment.';
  }

  if (message.includes('etimedout') || message.includes('timed out') || message.includes('network')) {
    return 'Unable to reach the email service. Please try again later.';
  }

  return 'Unable to send email right now. Please try again later.';
}

function getResendClient() {
  const apiKey = getResendApiKey();

  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

function renderEmailHtml(title: string, rows: Array<[string, string]>, bodyHtml?: string) {
  const rowMarkup = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #1e3a5f;color:#94a3b8;width:180px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #1e3a5f;color:#e2e8f0;">${value}</td>
        </tr>
      `,
    )
    .join('');

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#07111f;padding:24px;color:#e2e8f0;">
      <div style="max-width:640px;margin:0 auto;background:#0f1b2d;border:1px solid #1e3a5f;border-radius:16px;padding:28px;">
        <p style="margin:0;color:#67e8f9;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;">A&amp;M FutureTech</p>
        <h2 style="color:#ffffff;margin:12px 0 20px;font-size:22px;">${escapeHtml(title)}</h2>
        <table style="width:100%;border-collapse:collapse;">${rowMarkup}</table>
        ${bodyHtml || ''}
      </div>
    </div>
  `;
}

export function buildNotificationEmail(options: {
  title: string;
  fields: Array<[string, string]>;
  messageLabel?: string;
  message?: string;
}) {
  const html = renderEmailHtml(
    options.title,
    options.fields.map(([label, value]) => [label, formatMultilineHtml(value)]),
    options.message
      ? `<div style="margin-top:20px;"><p style="color:#94a3b8;margin:0 0 8px;">${escapeHtml(options.messageLabel || 'Message')}</p><p style="color:#e2e8f0;margin:0;line-height:1.7;">${formatMultilineHtml(options.message)}</p></div>`
      : undefined,
  );

  const text = [
    options.title,
    ...options.fields.map(([label, value]) => `${label}: ${value}`),
    options.message ? `\n${options.messageLabel || 'Message'}:\n${options.message}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  return { html, text };
}

export function buildConfirmationEmail(options: {
  title: string;
  intro: string;
  fields?: Array<[string, string]>;
}) {
  const html = renderEmailHtml(
    options.title,
    options.fields?.map(([label, value]) => [label, formatMultilineHtml(value)]) || [],
    `<p style="margin-top:20px;color:#cbd5e1;line-height:1.7;">${escapeHtml(options.intro)}</p>`,
  );

  const text = [
    options.title,
    options.intro,
    ...(options.fields || []).map(([label, value]) => `${label}: ${value}`),
  ].join('\n');

  return { html, text };
}

export async function sendEmail(options: {
  to: string | string[];
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
  attachments?: EmailAttachment[];
  tags?: Array<{ name: string; value: string }>;
}) {
  const resend = getResendClient();

  if (!resend) {
    throw new Error('Email service is not configured. Missing RESEND_API_KEY.');
  }

  const fromAddress = getFromAddress();

  console.log('[email] Sending via Resend', {
    from: fromAddress,
    to: options.to,
    subject: options.subject,
  });

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
    text: options.text,
    attachments: options.attachments,
    tags: options.tags,
  });

  if (error) {
    console.error('[email] Resend send failed:', {
      name: error.name,
      message: error.message,
      from: fromAddress,
      to: options.to,
    });

    throw new Error(error.message);
  }

  console.log('[email] Email sent successfully:', {
    id: data?.id,
    to: options.to,
  });

  return data;
}

export async function sendConfirmationEmail(options: {
  to: string;
  subject: string;
  html: string;
  text: string;
  tags?: Array<{ name: string; value: string }>;
}) {
  try {
    await sendEmail(options);
  } catch (error) {
    console.error('[email] Confirmation email failed:', {
      to: options.to,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
