'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { updateSearchParams } from '@/lib/helpers';
import { cn } from '@/lib/utils';

import { buttonVariants } from '../ui/button';

export const Selection = ({
  title,
  label,
  active,
  disabled,
  className,
  children,
}: {
  title: string;
  label?: string;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Updated params with new view value
  const linkParams = updateSearchParams(
    new URLSearchParams(searchParams),
    'view',
    title.toLowerCase(),
  );

  return (
    <Link
      href={disabled ? '#' : `${pathname}?${linkParams.toString()}`}
      tabIndex={disabled ? -1 : undefined}
      className={cn(
        buttonVariants({ variant: 'ghost', size: 'sm' }),
        active &&
          'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
        'justify-start',
        disabled && 'text-muted-foreground',
        className,
      )}
    >
      {title}
      {label && (
        <span
          className={cn('ml-auto', active && 'text-background dark:text-white')}
        >
          {label}
        </span>
      )}
      {children}
    </Link>
  );
};
