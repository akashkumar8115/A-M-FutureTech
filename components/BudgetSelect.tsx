'use client';

import { BUDGET_OPTIONS } from '@/lib/constants';

export function BudgetSelect({
  id,
  budget,
  customBudget,
  onBudgetChange,
  onCustomChange,
}: {
  id: string;
  budget: string;
  customBudget: string;
  onBudgetChange: (value: string) => void;
  onCustomChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2 md:col-span-2">
      <div className="field-wrap text-sm">
        <label htmlFor={id}>Project Budget</label>
        <select id={id} value={budget} onChange={(e) => onBudgetChange(e.target.value)} required>
          <option value="">Select a budget range</option>
          {BUDGET_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {budget === 'Custom' && (
        <div className="field-wrap text-sm">
          <label htmlFor={`${id}-custom`}>Custom Budget</label>
          <input
            id={`${id}-custom`}
            value={customBudget}
            onChange={(e) => onCustomChange(e.target.value)}
            required
            placeholder="e.g. $12,500 or ₹8 Lakh"
          />
        </div>
      )}
    </div>
  );
}
