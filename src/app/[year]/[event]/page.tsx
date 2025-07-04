'use client';

import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use, useMemo } from 'react';

import { GET_EVENT_DETAILS, GET_EVENT_SCHEDULE } from '@/lib/queries';
import { eventLocationDecode } from '@/lib/utils';

import { FullHeightLoader } from '@/components/Loader';
import SeasonSelector from '@/components/seasonSelector';
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
    <main className='container my-4 flex grid-cols-4 flex-col gap-4 lg:grid'>
      {/* Sidebar  */}
      <Sidebar
        allEvents={data?.dropdown_events}
        event={data.schedule[0]}
        year={year}
      >
        <div className='mb-2 flex items-center gap-2 md:order-first md:mr-auto'>
          <h1 className='text-2xl font-black'>Season</h1>
          <SeasonSelector />
        </div>
      </Sidebar>

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
      <EventContainer event={{ ...event, event_name: '' }}>
        <div className='p-4'>
          {children}
          <Select
            onValueChange={(loc) =>
              router.push(`/${year}/${loc.toLowerCase().replace(/ /g, '-')}`)
            }
          >
            <SelectTrigger className='h-fit w-full overflow-hidden bg-inherit p-2 text-left text-lg font-black text-ellipsis whitespace-nowrap outline-0 outline-offset-4'>
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
        <div className='bg-muted p-4'>
          <Image src={circuit} alt={event.official_event_name || ''} />
        </div>
      </EventContainer>
    </div>
  );
};

export default EventPage;
