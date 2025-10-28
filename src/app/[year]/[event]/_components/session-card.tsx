import { ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { SESSION_KEYS } from '@/lib/constants';
import { eventLocationEncode } from '@/lib/utils';

import { FragmentType, graphql, useFragment } from '@/types';

const EventSessionCards = graphql(`
  fragment EventSessionCards on schedule {
    session1
    session1_date_utc
    session2
    session2_date_utc
    session3
    session3_date_utc
    session4
    session4_date_utc
    session5
    session5_date_utc
  }
`);

export function SessionCards({
  eventLoc,
  ...props
}: {
  schedule: FragmentType<typeof EventSessionCards>;
  eventLoc: string;
}) {
  const schedule = useFragment(EventSessionCards, props?.schedule);

  const router = useRouter();
  return SESSION_KEYS.map((sessId) => {
    const name = schedule?.[sessId];
    const date = schedule?.[`${sessId}_date_utc`];
    return (
      <div
        key={sessId}
        id={`${name}-session`}
        className='bg-muted border-secondary hover:bg-secondary shadow-accent/50 cursor-pointer rounded border px-4 py-2 transition-shadow hover:shadow'
        onClick={() => router.push(`${eventLoc}/${eventLocationEncode(name)}`)}
        aria-label={name?.replace('_', ' ')}
        tabIndex={0}
      >
        <div className='flex justify-between'>
          <h3 className='truncate text-xl font-semibold tracking-tight'>
            {name?.replace('_', ' ')}
          </h3>
          <ArrowUpRight className='size-5' />
        </div>
        <p className='text-sm lg:text-base'>
          {new Date(date as string).toLocaleString(undefined, {
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          })}
        </p>
      </div>
    );
  });
}

export function SessionCardSkeletons() {
  return Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className='bg-muted animate-pulse rounded border px-4 py-2'>
      <div className='mb-2 flex justify-between'>
        <div className='bg-accent/50 h-6 w-3/4 rounded' />
        <ArrowUpRight className='size-5' />
      </div>
      <div className='bg-accent/50 h-4 w-1/2 rounded' />
    </div>
  ));
}
