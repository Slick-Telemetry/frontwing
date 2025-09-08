import Link from 'next/link';

import { SprintBadge } from '@/components/sprint-badge';

import { SeasonEvent } from '@/types/global';

export const EventContainer = ({
  event,
  children,
}: {
  event: SeasonEvent;
  children: React.ReactNode;
}) => {
  if (!event) return null;
  const {
    year,
    event_name,
    round_number,
    location,
    country,
    event_format,
    event_date,
  } = event;

  const eventUrl = `${year}/${location?.replace(/ /g, '-').toLowerCase()}`;
  const eventDate =
    event_date &&
    new Date(event_date).toLocaleString(undefined, {
      timeZone: 'UTC',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <div className='border'>
      {/* Heading */}
      <div className='flex items-center gap-4 p-4'>
        <p className='flex h-5 w-5 items-center justify-center text-xl leading-tight font-black opacity-50'>
          {round_number}
        </p>
        <div className='flex-1'>
          <div className='flex items-center justify-between'>
            <p className='text-sm' data-cy='event-date'>
              {eventDate}
            </p>
            <SprintBadge format={event_format} />
          </div>
          {event_name && (
            <Link
              href={eventUrl}
              className='text-lg leading-tight font-black hover:underline'
            >
              {event_name.replace(/Grand Prix/g, 'GP')}
            </Link>
          )}
          <p className='text-sm' data-cy='location'>
            {location && `${location},`} {country}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};
