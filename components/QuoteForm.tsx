'use client';

import { EnquiryForm } from '@/components/EnquiryForm';

export function QuoteForm() {
  return <EnquiryForm endpoint="/api/quote" submitLabel="Request Quote" idPrefix="quote" />;
}
