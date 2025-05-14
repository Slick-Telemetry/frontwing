'use client';

import { useQuery } from '@apollo/client';
import { use, useCallback, useState } from 'react';

import { GET_SEASON_EVENTS } from '@/lib/queries';

import { CheckboxToggle } from '@/components/Checkbox';
import { FullHeightLoader } from '@/components/Loader';
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
    <div className='container my-4'>
      <CheckboxToggle toggle={toggleSessions}>Show Sessions</CheckboxToggle>
      <main className='my-4 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
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
      </main>
    </div>
  );
};

export default SeasonPage;
