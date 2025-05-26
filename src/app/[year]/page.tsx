'use client';

import { useQuery } from '@apollo/client';
import { use, useCallback, useState } from 'react';

import { GET_SEASON_EVENTS } from '@/lib/queries';

import { CheckboxToggle } from '@/components/Checkbox';
import { FullHeightLoader } from '@/components/Loader';
import NextEvent from '@/components/NextEvent';
import { ServerPageError } from '@/components/ServerError';
import { SessionTime } from '@/components/SessionTime';

import { EventContainer } from '@/app/[year]/EventContainer';
import NotFound from '@/app/not-found';
import {
  GetSeasonEventsQuery,
  GetSeasonEventsQueryVariables,
  Session_Name_Choices_Enum,
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
  if (
    data?.schedule.length === 0 ||
    data?.schedule.filter((e) => !!e.event_name).length === 0
  )
    return <NotFound />;

  return (
    <>
      <CheckboxToggle toggle={toggleSessions}>Show Sessions</CheckboxToggle>
      <main className='grid grid-flow-row gap-8 p-4 sm:grid-cols-2 2xl:grid-cols-3'>
        <NextEvent />
        <div className='bg-muted col-start-2 rounded'>Driver Standings</div>
        <div className='bg-muted col-start-2 rounded'>
          Constructor Standings
        </div>
        <div className='bg-muted col-start-2 rounded'>Map</div>
        <div className='col-start-1 row-span-2 row-start-2 my-4 grid max-h-96 overflow-scroll'>
          {/* Schedule */}
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
      </main>
    </>
  );
};

export default SeasonPage;
