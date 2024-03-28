'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';

import { buttonVariants } from '../ui/button';

export const Selection = ({
  title,
  label,
  active,
  className,
}: {
  title: string;
  label?: string;
  active?: boolean;
  className?: string;
}) => {
  return (
    <Link
      href='#'
      className={cn(
        buttonVariants({ variant: 'ghost', size: 'sm' }),
        active &&
          'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
        'justify-start',
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
    </Link>
  );
};
