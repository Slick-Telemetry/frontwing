'use client';

import Link from 'next/link';

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
  return (
    <Link
      href={disabled ? '#' : `dashboard?view=${title}`}
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
