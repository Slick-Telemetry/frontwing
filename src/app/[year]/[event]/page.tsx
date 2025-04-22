'use client';

import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use, useMemo, useState } from 'react';

import { GET_EVENT_DETAILS, GET_EVENT_SCHEDULE } from '@/lib/queries';
import { eventLocationDecode } from '@/lib/utils';

import { CheckboxToggle } from '@/components/Checkbox';
import { FullHeightLoader } from '@/components/Loader';
import { ServerPageError } from '@/components/ServerError';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

import {
  EventSession,
  SessionProvisionalGrid,
  SkeletonProvisionalGrid,
} from '@/app/[year]/[event]/EventSession';
import { EventContainer } from '@/app/[year]/EventContainer';
import {
  GetEventDetailsQuery,
  GetEventDetailsQueryVariables,
  GetEventScheduleQuery,
  GetEventScheduleQueryVariables,
} from '@/generated/types';

import circuit from '../../../../public/Bahrain_carbon.png';

const EventPage = ({
  params,
}: {
  params: Promise<{ year: string; event: string }>;
}) => {
  const { year, event: eventLoc } = use(params);
  const [showGrid, setShowGrid] = useState(false);

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
    <main className='container mt-4 flex grid-cols-4 flex-col gap-4 lg:grid'>
      {/* Sidebar  */}
      <Sidebar
        allEvents={data?.dropdown_events}
        event={data.schedule[0]}
        year={year}
      >
        {/* If event is in the past */}
        {event.event_date && new Date(event.event_date) < new Date() && (
          <div className='mb-2'>
            <CheckboxToggle
              toggle={() => setShowGrid((prev) => !prev)}
              label='Show Provisional Results'
            />
          </div>
        )}
      </Sidebar>

      <div className='col-span-3'>
        <div className='grid gap-4'>
          {/* Sessions */}
          {Array.from({ length: 5 }, (_, i) => i + 1).map((sessionNumber) => {
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
                {showGrid &&
                  (loadingDetails ? (
                    // TODO: Replace with sketelon
                    <SkeletonProvisionalGrid />
                  ) : (
                    sessions.length > 0 && (
                      <SessionProvisionalGrid
                        key={sessions[sessionNumber - 1]?.name}
                        session={sessions[sessionNumber - 1]}
                      />
                    )
                  ))}
              </EventSession>
            ) : null;
          })}
        </div>
      </div>
    </main>
  );
};

const Sidebar = ({
  allEvents,
  event,
  year,
  children,
}: {
  year: string;
  event: GetEventScheduleQuery['schedule'][number];
  children?: React.ReactNode;
  allEvents?: GetEventScheduleQuery['dropdown_events'];
}) => {
  const router = useRouter();

  // derive link through alternative means
  return (
    <div>
      {children}

      <EventContainer event={{ ...event, event_name: '' }}>
        <div className='px-4'>
          <Select
            onValueChange={(loc) =>
              router.push(`/${year}/${loc.toLowerCase().replace(/ /g, '-')}`)
            }
          >
            <SelectTrigger className='h-fit bg-inherit p-2 text-left text-lg font-black outline-0 outline-offset-4'>
              {event.event_name}
            </SelectTrigger>
            <SelectContent align='center'>
              <SelectGroup>
                {allEvents?.map((event) => (
                  <SelectItem
                    className='px-1'
                    key={event.event_name}
                    value={event.location || ''}
                  >
                    {event.round_number}{' '}
                    {event.event_name?.replace(/Grand Prix/g, 'GP')}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='bg-muted mt-4 rounded p-4'>
          <Image src={circuit} alt={event.official_event_name || ''} />
        </div>
      </EventContainer>
    </div>
  );
};

export default EventPage;
