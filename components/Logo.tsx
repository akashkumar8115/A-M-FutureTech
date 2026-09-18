'use client';

import { useId } from 'react';

const logoAlt = 'A&M FutureTech Solutions Pvt. Ltd. Logo';

export function Logo({ className = '' }: { className?: string }) {
  const gradientId = useId().replace(/:/g, '');

  return (
    <div className={`flex min-w-0 items-center ${className}`}>
      <svg
        role="img"
        aria-label={logoAlt}
        viewBox="0 0 96 96"
        className="h-[4.5rem] w-[4.5rem] object-contain sm:h-[5.25rem] sm:w-[5.25rem] lg:h-24 lg:w-24"
      >
        <defs>
          <linearGradient id={gradientId} x1="12" y1="8" x2="84" y2="88" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60A5FA" />
            <stop offset="0.5" stopColor="#22D3EE" />
            <stop offset="1" stopColor="#A78BFA" />
          </linearGradient>
        </defs>
        <rect width="96" height="96" rx="24" fill="#0B1220" />
        <rect x="2" y="2" width="92" height="92" rx="22" fill="none" stroke={`url(#${gradientId})`} strokeWidth="3" />
        <text
          x="48"
          y="46"
          textAnchor="middle"
          fill={`url(#${gradientId})`}
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="28"
          fontWeight="800"
        >
          A&amp;M
        </text>
        <text
          x="48"
          y="68"
          textAnchor="middle"
          fill="#E2E8F0"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="10"
          letterSpacing="1.4"
        >
          FUTURETECH
        </text>
      </svg>
    </div>
  );
}
