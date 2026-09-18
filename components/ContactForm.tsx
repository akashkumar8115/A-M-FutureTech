'use client';

import { EnquiryForm } from '@/components/EnquiryForm';

export function ContactForm() {
  return <EnquiryForm endpoint="/api/contact" submitLabel="Send Enquiry" idPrefix="contact" />;
}
