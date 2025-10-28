import { useQuery } from '@apollo/client/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { SUPPORTED_SEASONS } from '@/lib/constants';
import { eventLocationDecode, eventLocationEncode } from '@/lib/utils';

import { SprintBadge } from '@/components/sprint-badge';
import { Button } from '@/components/ui/button';
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
  const { year } = useParams();
  if (!evt)
    return (
      <div className='grid gap-1'>
        <h1 className='pointer-cursor line-clamp-1 scroll-m-20 text-4xl font-semibold tracking-tight text-balance'>
          No Event Found
        </h1>
        <p>
          Return to{' '}
          <Link
            className='decoration-1 hover:underline'
            href={`/${year || '2025'}`}
          >
            {year || '2025'} Season
          </Link>
        </p>
        <PossibleEvents />
      </div>
    );
  return (
    <>
      {/* Event Title */}
      <h1 className='pointer-cursor line-clamp-1 scroll-m-20 text-4xl font-semibold tracking-tight text-balance'>
        <Link
          className='hover:underline focus:underline'
          href={`/${evt.year}/${eventLocationEncode(evt.event_name)}`}
        >
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

function PossibleEvents() {
  const { year, event } = useParams<{ year: string; event?: string }>();
  const supportedYear = SUPPORTED_SEASONS.includes(parseInt(year));
  const { data } = useQuery(
    graphql(`
      query GetSeasonEventNames($year: Int!, $event: String!) @cached {
        schedule(
          where: {
            year: { _eq: $year }
            _or: [
              { event_name: { _regex: $event } }
              { country: { _regex: $event } }
              { location: { _regex: $event } }
            ]
          }
        ) {
          event_name
        }
      }
    `),
    {
      variables: {
        year: parseInt(year),
        event: eventLocationDecode(event as string),
      },
      skip: !supportedYear || !event,
    },
  );

  if (!supportedYear || !data || data.schedule.length <= 0) return null;
  return (
    <div className='flex items-center gap-2'>
      <p>Did you mean...</p>
      {data.schedule.map(({ event_name }) => (
        <Button
          key={event_name}
          variant='link'
          className='px-2'
          size='sm'
          asChild
        >
          <Link href={`/${year || '2025'}/${eventLocationEncode(event_name)}`}>
            {event_name}
          </Link>
        </Button>
      ))}
    </div>
  );
}
