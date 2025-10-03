import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { getColor } from '@/lib/utils';

import { FragmentType, graphql, useFragment } from '@/types';

const MapScheduleFragment = graphql(`
  fragment MapScheduleFragment on schedule {
    event_name
    round_number
    event_date
    year
  }
`);

export const Schedule = ({
  selectEvent,
  activeEvent,
  ...props
}: {
  events?: FragmentType<typeof MapScheduleFragment>[];
  activeEvent: string | null;
  selectEvent: (event: string) => void;
}) => {
  const events = useFragment(MapScheduleFragment, props?.events);

  if (!events || events.length === 0) return null;
  const now = new Date();
  const { year } = events[0];

  return (
    <div className='hidden h-fit min-w-[250px] lg:@5xl/sidebar:block'>
      <div className='flex items-center gap-2 py-2 text-lg'>
        <h1
          className='text-center hover:underline'
          aria-label={`${year} Schedule`}
        >
          <Link href={`/${year}`}>{year}</Link>
        </h1>
        <ChevronRight className='size-4' />
        <p>Schedule</p>
      </div>
      <div className='grid divide-y overflow-hidden rounded border'>
        {events?.map((e) => {
          const name = e.event_name ?? '';
          // custom color logic so colors don't overwrite map markers
          const date = e.event_date ? new Date(e.event_date) : now;
          const color = now >= date ? 'inherit' : getColor(e.event_date);
          return (
            <div
              key={name}
              style={{ color: color }}
              className={clsx(
                'hover:bg-accent flex cursor-pointer items-center gap-2 px-2 py-0.5',
                activeEvent === name && 'bg-accent/50',
              )}
              onClick={() => selectEvent(name)}
            >
              <div className='flex h-4 w-4 items-center justify-center text-sm'>
                {e.round_number}
              </div>
              <p className='line-clamp-1'>{name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
