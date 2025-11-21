import { ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { SESSION_KEYS } from '@/lib/constants';
import { eventLocationEncode } from '@/lib/utils';
import { useReadLocalStorage } from '@/hooks/use-storage';

import { Button } from '@/components/ui/button';

import { FragmentType, graphql, useFragment } from '@/types';

const EventSessionCards = graphql(`
  fragment EventSessionCards on schedule {
    session1
    session1_date
    session2
    session2_date
    session3
    session3_date
    session4
    session4_date
    session5
    session5_date
  }
`);

export function SessionCards({
  eventLoc,
  ...props
}: {
  schedule?: FragmentType<typeof EventSessionCards>;
  eventLoc: string;
}) {
  const schedule = useFragment(EventSessionCards, props?.schedule);
  const trackTime = useReadLocalStorage('track-time');

  const router = useRouter();
  return SESSION_KEYS.map((sessId) => {
    const name = schedule?.[sessId];
    const date = schedule?.[`${sessId}_date`] ?? '';
    return (
      <Button
        variant='outline'
        size='lg'
        key={sessId}
        id={`${name}-session`}
        className='flex h-fit w-full cursor-pointer items-start justify-between gap-1 rounded border px-4 py-2 transition-shadow hover:shadow'
        onClick={() => router.push(`${eventLoc}/${eventLocationEncode(name)}`)}
        aria-label={name?.replace('_', ' ')}
        tabIndex={0}
      >
        <div className='text-left'>
          <p className='text-sm lg:text-base'>
            {trackTime
              ? new Date(date.slice(0, -6)).toLocaleString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : new Date(date).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
          </p>
          <h3 className='truncate text-3xl tracking-tight'>
            {name?.replace('_', ' ')}
          </h3>
        </div>
        <ArrowUpRight className='size-6' />
      </Button>
    );
  });
}

export function SessionCardSkeletons() {
  return Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className='bg-muted animate-pulse rounded border px-4 py-2'>
      <div className='mb-2 flex justify-between'>
        <div className='bg-accent/50 h-4 w-24 rounded' />
        <ArrowUpRight className='size-6' />
      </div>
      <div className='bg-accent/50 h-7 w-32 rounded' />
    </div>
  ));
}
