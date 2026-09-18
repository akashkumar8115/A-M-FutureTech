import { z } from 'zod';
import { BUDGET_OPTIONS } from '@/lib/constants';

const phoneSchema = z
  .string()
  .trim()
  .min(1, 'Phone number is required.')
  .refine((value) => value.replace(/\s+/g, '').length >= 8, 'Phone number is too short.');

const optionalPhoneSchema = z
  .string()
  .trim()
  .optional()
  .refine((value) => !value || value.replace(/\s+/g, '').length >= 8, 'Phone number is too short.');

const enquiryObject = z.object({
  fullName: z.string().trim().min(2, 'Full name is required.'),
  jobTitle: z.string().trim().optional().default(''),
  companyName: z.string().trim().min(2, 'Company name is required.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  phone: optionalPhoneSchema,
  website: z.string().trim().optional().default(''),
  serviceRequired: z.string().trim().min(1, 'Please select a service.'),
  projectBudget: z
    .string()
    .min(1, 'Please select a project budget.')
    .refine((value) => (BUDGET_OPTIONS as readonly string[]).includes(value), 'Please select a project budget.'),
  customBudget: z.string().trim().optional().default(''),
  timeline: z.string().trim().min(1, 'Please select a timeline.'),
  howHeard: z.string().trim().optional().default(''),
  projectDetails: z.string().trim().min(20, 'Please share at least 20 characters of project details.'),
  consent: z
    .union([z.boolean(), z.string()])
    .transform((value) => value === true || value === 'true' || value === 'on')
    .refine((value) => value, 'Please accept the privacy policy to continue.'),
});

export const contactSchema = enquiryObject.superRefine((data, ctx) => {
  if (data.projectBudget === 'Custom' && !data.customBudget.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please enter a custom budget.',
      path: ['customBudget'],
    });
  }
});

export function resolvedBudget(budget: string, customBudget?: string) {
  return budget === 'Custom' ? (customBudget || '').trim() : budget;
}

export const quoteSchema = contactSchema;

export const careerSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name is required.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  phone: phoneSchema,
  city: z.string().trim().min(2, 'City is required.'),
  linkedin: z.string().trim().optional().default(''),
  position: z.string().trim().min(1, 'Position is required.'),
  experience: z.string().trim().min(1, 'Experience is required.'),
  currentCompany: z.string().trim().optional().default(''),
  noticePeriod: z.string().trim().min(1, 'Notice period is required.'),
  expectedCtc: z.string().trim().optional().default(''),
  message: z.string().trim().optional().default(''),
  consent: z
    .union([z.boolean(), z.string()])
    .transform((value) => value === true || value === 'true' || value === 'on')
    .refine((value) => value, 'Please accept the privacy policy to continue.'),
});

export const adminLoginSchema = z.object({
  password: z.string().min(1, 'Password is required.'),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactPayload = z.output<typeof contactSchema>;
export type QuotePayload = z.output<typeof quoteSchema>;
export type CareerPayload = z.output<typeof careerSchema>;

export function firstZodError(error: z.ZodError) {
  return error.issues[0]?.message || 'Please check the form and try again.';
}
