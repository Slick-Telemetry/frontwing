import clsx from 'clsx';
import Link from 'next/link';

import { eventLocationEncode, eventTiming } from '@/lib/utils';

import { CircuitMap } from '@/components/circuit-map';

import { GetSeasonEventsQuery } from '@/types/graphql';

type Item = GetSeasonEventsQuery['schedule'][number];
interface ScheduleEventItemProps extends Item {
  next?: number | null;
  details: boolean;
  trackTime: boolean;
}
export function ScheduleEventItem({
  next,
  details,
  trackTime,
  ...event
}: ScheduleEventItemProps) {
  const timing = eventTiming(event.event_date as string);
  const numberClass = clsx({
    'bg-secondary': timing === 'past',
    'bg-foreground/90 text-background':
      timing === 'future' && next !== event.round_number,
    'bg-accent text-accent-foreground': next === event.round_number,
  });

  const formatDate = (date: string, withTime = false) =>
    trackTime
      ? new Date(date.slice(0, -6)).toLocaleString(undefined, {
          month: 'short',
          day: 'numeric',
          ...(withTime && {
            hour: '2-digit',
            minute: '2-digit',
            // hourCycle: 'h24',
          }),
        })
      : new Date(date).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          ...(withTime && {
            hour: '2-digit',
            minute: '2-digit',
            // hourCycle: 'h24',
            // timeZoneName: 'short',
          }),
        });
  const sessions = [
    { name: event.session1, date: event.session1_date },
    { name: event.session2, date: event.session2_date },
    { name: event.session3, date: event.session3_date },
    { name: event.session4, date: event.session4_date },
    { name: event.session5, date: event.session5_date },
  ];

  return (
    <li className='flex flex-col overflow-hidden rounded border'>
      <Link
        href={`${event.year}/${eventLocationEncode(event.location)}`}
        className='group hover:bg-muted flex flex-1 items-center gap-2 pr-4'
        aria-label={`Round ${event.round_number}: ${event.event_name} in ${event.location}, ${event.country} from ${formatDate(event.session1_date!)} to ${formatDate(event.event_date!)}`}
      >
        <div
          className={clsx(
            'border-background flex h-full w-[50px] items-center justify-center border-r text-2xl',
            numberClass,
          )}
        >
          {event.round_number}
        </div>
        <div className='flex-1 py-2'>
          <p className='text-sm'>
            {formatDate(event.session1_date as string)} -
            {formatDate(event.session5_date as string)}
          </p>
          <p className='line-clamp-1 font-semibold group-hover:underline'>
            {event.event_name}
          </p>
          <p className='line-clamp-1 text-sm'>
            {event.location}, {event.country}
          </p>
        </div>
        <CircuitMap
          location={event.location as string}
          country={event.country as string}
          small
        />
      </Link>

      {details && (
        <div className='border-t px-3 py-2'>
          {sessions.map(
            (s, idx) =>
              s.name &&
              s.date && (
                <div
                  key={idx}
                  className={clsx(
                    'flex justify-between gap-2 py-1',
                    idx > 0 && 'border-t',
                  )}
                >
                  <p className='flex-1 capitalize'>
                    {s.name.replace('_', ' ')}
                  </p>
                  <p>{formatDate(s.date as string, true)}</p>
                </div>
              ),
          )}
        </div>
      )}
    </li>
  );
}
