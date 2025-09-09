'use client';

import { useQuery } from '@apollo/client/react';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { use, useCallback, useEffect, useState } from 'react';

import { GET_SEASON_EVENTS } from '@/lib/queries';

import { CheckboxToggle } from '@/components/Checkbox';
import { FullHeightLoader } from '@/components/Loader';
import NextEvent from '@/components/next-event';
import { ServerPageError } from '@/components/ServerError';
import { SessionTime } from '@/components/SessionTime';

import TopThreeStandings from '@/app/[year]/_components/standings';
import { EventContainer } from '@/app/[year]/EventContainer';
import NotFound from '@/app/not-found';

import {
  GetSeasonEventsQuery,
  GetSeasonEventsQueryVariables,
  Session_Name_Choices_Enum,
} from '@/types/graphql';

export default function SeasonPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = use(params);
  const [showSessions, setShowSessions] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem('showSessions');
      return storedValue === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('showSessions', String(showSessions));
    }
  }, [showSessions]);

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
  if (
    data?.schedule.length === 0 ||
    data?.schedule.filter((e) => !!e.event_name).length === 0
  )
    return <NotFound />;

  return (
    <main className='p-4 lg:p-6'>
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-2 flex flex-col gap-4'>
          <div className='flex h-full justify-center rounded border px-4'>
            <NextEvent />
          </div>
          {/* Quick Links */}
          <QuickLinks year={year} />
        </div>
        <div className='flex h-full min-h-[296px] flex-col gap-2 rounded border p-4'>
          <TopThreeStandings year={year} />
        </div>
      </div>
      <div className='py-6'>
        <CheckboxToggle toggle={toggleSessions} checked={showSessions}>
          Show Sessions
        </CheckboxToggle>
        <div className='my-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {data?.schedule.map(
            (event) =>
              event.event_name && (
                <EventContainer key={event.event_name} event={event}>
                  {showSessions && (
                    <div className='bg-secondary divide-background border-background grid divide-y rounded border-2'>
                      {Array.from({ length: 5 }, (_, i) => i + 1).map(
                        (sessionNumber) => {
                          const sessionDate =
                            event[
                              `session${sessionNumber}_date` as keyof typeof event
                            ];
                          return sessionDate && sessionDate !== 'NaT' ? (
                            <SessionTime
                              key={String(sessionDate)}
                              event={event.location}
                              time={String(sessionDate)}
                              name={
                                event[
                                  `session${sessionNumber}` as keyof typeof event
                                ] as Session_Name_Choices_Enum
                              }
                            />
                          ) : null;
                        },
                      )}
                    </div>
                  )}
                </EventContainer>
              ),
          )}
        </div>
      </div>
    </main>
  );
}

function QuickLinks({ year }: { year: string }) {
  const links = [
    {
      name: 'Season Map',
      href: `${year}/map`,
      description: 'View the travel of the season',
    },
    { name: 'Head to Head', href: '#', description: 'Compare driver results' },
  ] as { name: string; href: string; description?: string }[];
  return (
    <div
      className='grid gap-4'
      style={{ gridTemplateColumns: `repeat(${links.length}, 1fr)` }}
    >
      {links.map(({ name, href, description }) =>
        href === '#' ? (
          <div
            key={href}
            className='block cursor-not-allowed rounded border border-dashed px-4 py-2 opacity-50'
            title='Coming soon'
          >
            <div className='flex w-full items-center justify-between text-xl font-bold'>
              {name}
              <ExternalLink />
            </div>
            {description && <p>{description}</p>}
          </div>
        ) : (
          <Link
            key={href}
            href={href}
            className='block rounded border px-4 py-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800'
          >
            <div className='flex w-full items-center justify-between text-xl font-bold'>
              {name}
              <ExternalLink />
            </div>
            {description && <p>{description}</p>}
          </Link>
        ),
      )}
    </div>
  );
}
