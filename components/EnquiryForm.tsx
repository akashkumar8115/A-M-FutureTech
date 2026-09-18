'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { BudgetSelect } from '@/components/BudgetSelect';
import { HEAR_ABOUT_OPTIONS, SERVICE_OPTIONS, TIMELINE_OPTIONS } from '@/lib/constants';
import { contactSchema, firstZodError } from '@/lib/schemas';

const initialState = {
  fullName: '',
  jobTitle: '',
  companyName: '',
  email: '',
  phone: '',
  website: '',
  serviceRequired: '',
  projectBudget: '',
  customBudget: '',
  timeline: '',
  howHeard: '',
  projectDetails: '',
  consent: false,
};

async function readApiResponse(response: Response) {
  try {
    return await response.json();
  } catch {
    return { success: false, message: 'Unable to submit the form.' };
  }
}

export function EnquiryForm({
  endpoint,
  submitLabel,
  idPrefix,
}: {
  endpoint: '/api/contact' | '/api/quote';
  submitLabel: string;
  idPrefix: string;
}) {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof typeof initialState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const parsed = contactSchema.safeParse(form);
      if (!parsed.success) {
        throw new Error(firstZodError(parsed.error));
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const result = await readApiResponse(response);
      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Unable to submit the form.');
      }

      setStatus({ type: 'success', message: result.message });
      setForm(initialState);
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Unable to submit the form.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-shell p-6 sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="field-wrap text-sm">
          <label htmlFor={`${idPrefix}-name`}>Full Name</label>
          <input id={`${idPrefix}-name`} value={form.fullName} onChange={(e) => handleChange('fullName', e.target.value)} required placeholder="John Smith" />
        </div>
        <div className="field-wrap text-sm">
          <label htmlFor={`${idPrefix}-title`}>Job Title</label>
          <input id={`${idPrefix}-title`} value={form.jobTitle} onChange={(e) => handleChange('jobTitle', e.target.value)} placeholder="Operations Director" />
        </div>
        <div className="field-wrap text-sm">
          <label htmlFor={`${idPrefix}-company`}>Company Name</label>
          <input id={`${idPrefix}-company`} value={form.companyName} onChange={(e) => handleChange('companyName', e.target.value)} required placeholder="Acme Inc." />
        </div>
        <div className="field-wrap text-sm">
          <label htmlFor={`${idPrefix}-email`}>Work Email</label>
          <input id={`${idPrefix}-email`} type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} required placeholder="john@company.com" />
        </div>
        <div className="field-wrap text-sm">
          <label htmlFor={`${idPrefix}-phone`}>Phone Number</label>
          <input id={`${idPrefix}-phone`} value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="+91 98765 43210" />
        </div>
        <div className="field-wrap text-sm">
          <label htmlFor={`${idPrefix}-website`}>Company Website</label>
          <input id={`${idPrefix}-website`} value={form.website} onChange={(e) => handleChange('website', e.target.value)} placeholder="https://company.com" />
        </div>
        <div className="field-wrap text-sm md:col-span-2">
          <label htmlFor={`${idPrefix}-service`}>Service Required</label>
          <select id={`${idPrefix}-service`} value={form.serviceRequired} onChange={(e) => handleChange('serviceRequired', e.target.value)} required>
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <BudgetSelect
          id={`${idPrefix}-budget`}
          budget={form.projectBudget}
          customBudget={form.customBudget}
          onBudgetChange={(value) => handleChange('projectBudget', value)}
          onCustomChange={(value) => handleChange('customBudget', value)}
        />
        <div className="field-wrap text-sm">
          <label htmlFor={`${idPrefix}-timeline`}>Project Timeline</label>
          <select id={`${idPrefix}-timeline`} value={form.timeline} onChange={(e) => handleChange('timeline', e.target.value)} required>
            <option value="">Select a timeline</option>
            {TIMELINE_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="field-wrap text-sm">
          <label htmlFor={`${idPrefix}-heard`}>How did you hear about us?</label>
          <select id={`${idPrefix}-heard`} value={form.howHeard} onChange={(e) => handleChange('howHeard', e.target.value)}>
            <option value="">Select an option</option>
            {HEAR_ABOUT_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="field-wrap text-sm md:col-span-2">
          <label htmlFor={`${idPrefix}-details`}>Project Details</label>
          <textarea id={`${idPrefix}-details`} value={form.projectDetails} onChange={(e) => handleChange('projectDetails', e.target.value)} required rows={5} placeholder="Share goals, current systems, users, and any deadline we should know about." />
        </div>
      </div>
      <label className="mt-5 flex items-start gap-3 text-sm text-[var(--text-soft)]">
        <input type="checkbox" checked={form.consent} onChange={(e) => handleChange('consent', e.target.checked)} className="mt-1 h-4 w-4" />
        <span>
          I agree to the <Link href="/privacy-policy" className="text-[var(--link)]">Privacy Policy</Link> and consent to A&M FutureTech contacting me about this enquiry.
        </span>
      </label>
      <button type="submit" disabled={isSubmitting} className="form-submit-btn primary-btn mt-6 disabled:cursor-not-allowed disabled:opacity-70">
        {isSubmitting ? 'Sending...' : submitLabel}
      </button>
      {status.type !== 'idle' && (
        <p className={status.type === 'success' ? 'mt-4 text-sm text-emerald-500' : 'mt-4 text-sm text-red-500'} role="status">
          {status.message}
        </p>
      )}
    </form>
  );
}
