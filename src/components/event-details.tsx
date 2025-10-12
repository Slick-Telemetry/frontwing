import Link from 'next/link';

import { eventLocationEncode } from '@/lib/utils';

import { SprintBadge } from '@/components/sprint-badge';
import { Separator } from '@/components/ui/separator';

import { FragmentType, graphql, useFragment } from '@/types';

const ScheduleEventDetailFragment = graphql(`
  fragment ScheduleEventDetails on schedule {
    year
    event_name
    event_date
    round_number
    location
    country
    event_format
  }
`);

type EventDetailsProps = {
  evt?: FragmentType<typeof ScheduleEventDetailFragment>;
  maxRounds?: number;
};
export function EventDetails({ maxRounds, ...props }: EventDetailsProps) {
  const evt = useFragment(ScheduleEventDetailFragment, props?.evt);
  if (!evt) return null;
  return (
    <>
      {/* Event Title */}
      <h1 className='pointer-cursor line-clamp-1 scroll-m-20 text-4xl font-semibold tracking-tight text-balance hover:underline'>
        <Link href={`/${evt.year}/${eventLocationEncode(evt.event_name)}`}>
          {evt.event_name}
        </Link>
      </h1>

      {/* Attributes */}
      <p className='text-lg'>
        {evt.location}, {evt.country}
      </p>
      <div className='flex items-center text-xs md:text-sm'>
        <p>
          {new Date((evt.event_date as string).slice(0, -6)).toLocaleDateString(
            undefined,
            {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            },
          )}
        </p>

        <Separator
          orientation='vertical'
          className='mx-2 data-[orientation=vertical]:h-4'
        />
        <p>
          Round {evt.round_number}
          {maxRounds && maxRounds >= 1 ? `/${maxRounds}` : ''}
        </p>
        <Separator
          orientation='vertical'
          className='mx-2 data-[orientation=vertical]:h-4'
        />
        <SprintBadge format={evt.event_format} />
      </div>
    </>
  );
}
