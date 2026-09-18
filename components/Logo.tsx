import Image from 'next/image';

const logoAlt = 'A&M FutureTech Solution Pvt Ltd';

const sizes = {
  sm: 'h-10 w-[88px] sm:h-11 sm:w-[104px]',
  md: 'h-11 w-[108px] sm:h-12 sm:w-[128px] lg:h-14 lg:w-[152px]',
  lg: 'h-24 w-[210px] sm:h-28 sm:w-[248px]',
  xl: 'h-36 w-[260px] sm:h-44 sm:w-[320px] max-w-full',
} as const;

export function Logo({
  className = '',
  size = 'md',
  variant = 'full',
  priority = false,
}: {
  className?: string;
  size?: keyof typeof sizes;
  variant?: 'full' | 'mark';
  priority?: boolean;
}) {
  const src = variant === 'mark' ? '/logo-mark.png' : '/logo.png';
  const box = sizes[size];

  return (
    <span className={`relative inline-block shrink-0 ${box} ${className}`}>
      <Image
        src={src}
        alt={logoAlt}
        fill
        sizes="(max-width: 640px) 128px, (max-width: 1024px) 168px, 320px"
        priority={priority}
        className="object-contain object-left"
      />
    </span>
  );
}
