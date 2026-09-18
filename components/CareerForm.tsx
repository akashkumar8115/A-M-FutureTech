'use client';

import { FormEvent, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { EXPERIENCE_OPTIONS, NOTICE_OPTIONS, POSITION_OPTIONS } from '@/lib/constants';
import { careerSchema, firstZodError } from '@/lib/schemas';

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  linkedin: '',
  position: '',
  experience: '',
  currentCompany: '',
  noticePeriod: '',
  expectedCtc: '',
  message: '',
  consent: false,
};

const MAX_RESUME_BYTES = 5 * 1024 * 1024;

async function readApiResponse(response: Response) {
  try {
    return await response.json();
  } catch {
    return { success: false, message: 'Unable to submit application.' };
  }
}

export function CareerForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeName, setResumeName] = useState('');
  const resumeInputRef = useRef<HTMLInputElement | null>(null);
  const resumeInputId = useId();

  const handleChange = (field: keyof typeof initialState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const parsed = careerSchema.safeParse(form);
      if (!parsed.success) {
        throw new Error(firstZodError(parsed.error));
      }

      const file = resumeInputRef.current?.files?.[0];
      if (!file) throw new Error('Please upload your resume.');
      if (!/\.(pdf|doc|docx)$/i.test(file.name)) throw new Error('Please upload a PDF or Word document.');
      if (file.size > MAX_RESUME_BYTES) throw new Error('Resume must be 5MB or smaller.');

      const data = new FormData();
      Object.entries(parsed.data).forEach(([key, value]) => data.append(key, String(value)));
      data.append('resume', file);

      const response = await fetch('/api/careers', { method: 'POST', body: data });
      const result = await readApiResponse(response);
      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Unable to submit application.');
      }

      setStatus({ type: 'success', message: result.message });
      setForm(initialState);
      setResumeName('');
      if (resumeInputRef.current) resumeInputRef.current.value = '';
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Unable to submit application.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-shell p-6 sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="field-wrap text-sm">
          <label htmlFor="career-name">Full Name</label>
          <input id="career-name" value={form.fullName} onChange={(e) => handleChange('fullName', e.target.value)} required placeholder="Jane Doe" />
        </div>
        <div className="field-wrap text-sm">
          <label htmlFor="career-email">Email</label>
          <input id="career-email" type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} required placeholder="jane@example.com" />
        </div>
        <div className="field-wrap text-sm">
          <label htmlFor="career-phone">Phone Number</label>
          <input id="career-phone" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} required placeholder="+91 98765 43210" />
        </div>
        <div className="field-wrap text-sm">
          <label htmlFor="career-city">City</label>
          <input id="career-city" value={form.city} onChange={(e) => handleChange('city', e.target.value)} required placeholder="Bengaluru" />
        </div>
        <div className="field-wrap text-sm">
          <label htmlFor="career-linkedin">LinkedIn URL</label>
          <input id="career-linkedin" value={form.linkedin} onChange={(e) => handleChange('linkedin', e.target.value)} placeholder="https://linkedin.com/in/username" />
        </div>
        <div className="field-wrap text-sm">
          <label htmlFor="career-company">Current Company</label>
          <input id="career-company" value={form.currentCompany} onChange={(e) => handleChange('currentCompany', e.target.value)} placeholder="Present employer" />
        </div>
        <div className="field-wrap text-sm">
          <label htmlFor="career-position">Position Applying For</label>
          <select id="career-position" value={form.position} onChange={(e) => handleChange('position', e.target.value)} required>
            <option value="">Select a position</option>
            {POSITION_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="field-wrap text-sm">
          <label htmlFor="career-experience">Experience</label>
          <select id="career-experience" value={form.experience} onChange={(e) => handleChange('experience', e.target.value)} required>
            <option value="">Select experience</option>
            {EXPERIENCE_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="field-wrap text-sm">
          <label htmlFor="career-notice">Notice Period</label>
          <select id="career-notice" value={form.noticePeriod} onChange={(e) => handleChange('noticePeriod', e.target.value)} required>
            <option value="">Select notice period</option>
            {NOTICE_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="field-wrap text-sm">
          <label htmlFor="career-ctc">Expected CTC</label>
          <input id="career-ctc" value={form.expectedCtc} onChange={(e) => handleChange('expectedCtc', e.target.value)} placeholder="e.g. ₹12 LPA" />
        </div>
        <div className="field-wrap text-sm md:col-span-2">
          <label htmlFor="career-message">Cover Message</label>
          <textarea id="career-message" value={form.message} onChange={(e) => handleChange('message', e.target.value)} rows={5} placeholder="Tell us about your experience and why you want to join A&M FutureTech." />
        </div>
        <div className="field-wrap text-sm md:col-span-2">
          <label htmlFor={resumeInputId}>Resume Upload</label>
          <input
            id={resumeInputId}
            ref={resumeInputRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            required
            onChange={(e) => setResumeName(e.target.files?.[0]?.name || '')}
            className="block w-full rounded-xl border border-dashed px-4 py-3"
          />
          {resumeName && <span className="mt-2 block text-xs">Selected: {resumeName}</span>}
        </div>
      </div>
      <label className="mt-5 flex items-start gap-3 text-sm text-[var(--text-soft)]">
        <input type="checkbox" checked={form.consent} onChange={(e) => handleChange('consent', e.target.checked)} className="mt-1 h-4 w-4" />
        <span>
          I agree to the <Link href="/privacy-policy" className="text-[var(--link)]">Privacy Policy</Link> and consent to A&M FutureTech processing this application.
        </span>
      </label>
      <button type="submit" disabled={isSubmitting} className="form-submit-btn primary-btn mt-6 disabled:cursor-not-allowed disabled:opacity-70">
        {isSubmitting ? 'Submitting...' : 'Apply Now'}
      </button>
      {status.type !== 'idle' && (
        <p className={status.type === 'success' ? 'mt-4 text-sm text-emerald-500' : 'mt-4 text-sm text-red-500'} role="status">
          {status.message}
        </p>
      )}
    </form>
  );
}
