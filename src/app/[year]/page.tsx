'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { use, useCallback, useState } from 'react';

import { GET_SEASON_EVENTS } from '@/lib/queries';

import { CheckboxToggle } from '@/components/Checkbox';
import { EventTypeBadge } from '@/components/EventTypeBadge';
import { FullHeightLoader } from '@/components/Loader';
import { ServerPageError } from '@/components/ServerError';
import { SessionTime } from '@/components/SessionTime';

import NotFound from '@/app/not-found';
import { SeasonEvent } from '@/generated/customTypes';
import {
  GetSeasonEventsQuery,
  GetSeasonEventsQueryVariables,
} from '@/generated/types';

const SeasonPage = ({ params }: { params: Promise<{ year: string }> }) => {
  const { year } = use(params);
  const [showSessions, setShowSessions] = useState(false);

  const { loading, error, data } = useQuery<
    GetSeasonEventsQuery,
    GetSeasonEventsQueryVariables
  >(GET_SEASON_EVENTS, {
    variables: { year: parseInt(year) },
  });

  const toggleSessions = useCallback(() => {
    setShowSessions((prev) => !prev);
  }, []);

  if (loading) return <FullHeightLoader />;
  if (error) return <ServerPageError />;
  if (data?.events.length === 0) return <NotFound />;

  return (
    <div className='container'>
      <CheckboxToggle toggle={toggleSessions} label='Show Sessions' />
      <main className='my-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {data?.events.map((event) => (
          <EventContainer key={event.official_name} event={event}>
            {showSessions && (
              <div className='bg-muted grid divide-y'>
                {[...event.sessions].map((session) => (
                  <SessionTime
                    key={session.scheduled_start_time_utc}
                    id={session?.scheduled_start_time_utc}
                    time={session?.scheduled_start_time_utc}
                    name={session?.name}
                  />
                ))}
              </div>
            )}
          </EventContainer>
        ))}
      </main>
    </div>
  );
};

export const EventContainer = ({
  event,
  children,
}: {
  event: SeasonEvent;
  children: React.ReactNode;
}) => {
  const { year } = useParams();
  const { official_name, round_number, location, country, format, date } =
    event;

  const eventUrl = `${year}/${location?.replace(/ /g, '-').toLowerCase()}`;
  const eventDate =
    date &&
    new Date(date).toLocaleString(undefined, {
      timeZone: 'UTC',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <fieldset className='border-accent-foreground mb-2 overflow-hidden rounded border'>
      <legend className='ml-2 px-2 font-black'>Round {round_number}</legend>
      {/* Heading */}
      <div className='px-4 py-2'>
        <div className='mb-2 flex items-center justify-between text-sm'>
          <EventTypeBadge format={format} />
          <p>{eventDate}</p>
        </div>
        {official_name && (
          <Link
            href={eventUrl}
            className='line-clamp-2 flex-1 text-lg leading-tight font-black hover:underline'
          >
            {official_name}
          </Link>
        )}
        <p>
          {location}, {country}
        </p>
      </div>
      {children}
    </fieldset>
  );
};

export default SeasonPage;
