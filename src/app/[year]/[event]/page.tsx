'use client';

import { useQuery } from '@apollo/client';
import { use, useMemo } from 'react';

import { GET_EVENT_DETAILS, GET_EVENT_SCHEDULE } from '@/lib/queries';
import { eventLocationDecode } from '@/lib/utils';

import { FullHeightLoader } from '@/components/Loader';
import { ServerPageError } from '@/components/ServerError';

import {
  EventSession,
  SessionProvisionalGrid,
  SkeletonProvisionalGrid,
} from '@/app/[year]/[event]/EventSession';
import { Header } from '@/app/[year]/[event]/Header';
import {
  GetEventDetailsQuery,
  GetEventDetailsQueryVariables,
  GetEventScheduleQuery,
  GetEventScheduleQueryVariables,
} from '@/generated/types';

const EventPage = ({
  params,
}: {
  params: Promise<{ year: string; event: string }>;
}) => {
  const { year, event: eventLoc } = use(params);

  const { loading, data, error } = useQuery<
    GetEventScheduleQuery,
    GetEventScheduleQueryVariables
  >(GET_EVENT_SCHEDULE, {
    variables: {
      year: parseInt(year),
      event: eventLocationDecode(eventLoc),
    },
  });

  // Load grid elements
  const { loading: loadingDetails, data: eventDetailsData } = useQuery<
    GetEventDetailsQuery,
    GetEventDetailsQueryVariables
  >(GET_EVENT_DETAILS, {
    skip:
      loading || !data?.schedule?.[0]?.event_date
        ? true
        : new Date(data.schedule[0].event_date) >= new Date(),
    variables: {
      year: parseInt(year),
      event: eventLocationDecode(eventLoc),
    },
  });

  const sessions = useMemo(() => {
    const eventDetails = eventDetailsData?.events[0];

    return [
      eventDetails?.competition,
      eventDetails?.qualifying,
      eventDetails?.practices,
    ]
      .flat() // Join Arrays
      .filter((session) => !!session) // Filter empty
      .sort(
        (
          sessionA,
          sessionB, // Sort by start_time
        ) =>
          (sessionA?.scheduled_start_time_utc ?? '').localeCompare(
            sessionB?.scheduled_start_time_utc ?? '',
          ),
      );
  }, [eventDetailsData]);

  if (loading) return <FullHeightLoader />;
  if (error) return <ServerPageError msg='Failed to load event details.' />;
  if (!data?.schedule || data?.schedule.length <= 0) {
    // TODO: return to season page
    return <ServerPageError msg={`Event, ${eventLoc}, not found`} />;
  }

  const event = data.schedule[0];
  return (
    <main className='container my-4'>
      {/* Sidebar  */}
      <Header />

      <div className='col-span-3'>
        <div className='grid gap-4'>
          {/* Sessions */}
          {Array.from({ length: 5 }, (_, i) => 5 - i).map((sessionNumber) => {
            const sessionDate =
              event[`session${sessionNumber}_date_utc` as keyof typeof event];
            return sessionDate && sessionDate !== 'NaT' ? (
              <EventSession
                time={String(sessionDate)}
                name={String(
                  event[`session${sessionNumber}` as keyof typeof event],
                )}
                key={String(sessionDate)}
              >
                {loadingDetails ? (
                  // TODO: Replace with sketelon
                  <SkeletonProvisionalGrid />
                ) : (
                  sessions.length > 0 && (
                    <SessionProvisionalGrid
                      key={sessions[sessionNumber - 1]?.name}
                      session={sessions[sessionNumber - 1]}
                    />
                  )
                )}
              </EventSession>
            ) : null;
          })}
        </div>
      </div>
    </main>
  );
};

export default EventPage;
