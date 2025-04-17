'use client';

import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';

import { GET_EVENT_DETAILS_v2 } from '@/lib/queries';
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

import { EventSession } from '@/app/[year]/[event]/EventSession';
import { EventContainer } from '@/app/[year]/page';
import {
  GetEventDetailsV2Query,
  GetEventDetailsV2QueryVariables,
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
    GetEventDetailsV2Query,
    GetEventDetailsV2QueryVariables
  >(GET_EVENT_DETAILS_v2, {
    variables: {
      year: parseInt(year),
      event: eventLocationDecode(eventLoc),
    },
  });

  if (loading) return <FullHeightLoader />;
  if (error) return <ServerPageError msg='Failed to load event details.' />;
  if (!data?.events || data?.events.length <= 0) {
    // TODO: return to season page
    return <ServerPageError msg='Event not found.' />;
  }

  const event = data?.events[0];
  const sessions = [event?.competition, event?.qualifying, event?.practices]
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

  return (
    <main className='container mt-4 flex grid-cols-4 flex-col gap-4 lg:grid'>
      {/* Sidebar  */}
      <Sidebar
        allEvents={data?.dropdown_events}
        event={data.events[0]}
        year={year}
      >
        <div className='mb-2'>
          <CheckboxToggle
            toggle={() => setShowGrid((prev) => !prev)}
            label='Show Provisional Results'
          />
        </div>
      </Sidebar>

      <div className='col-span-3'>
        <div className='grid gap-4'>
          {/* Sessions */}
          {sessions.map((session) => (
            <EventSession
              key={session.scheduled_start_time_utc}
              session={session}
              grid={showGrid}
            />
          ))}
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
  event: GetEventDetailsV2Query['events'][number];
  children?: React.ReactNode;
  allEvents?: GetEventDetailsV2Query['dropdown_events'];
}) => {
  const router = useRouter();

  // derive link through alternative means
  return (
    <div>
      {children}

      <EventContainer event={{ ...event, official_name: '' }}>
        <div className='px-4'>
          <Select
            onValueChange={(loc) =>
              router.push(`/${year}/${loc.toLowerCase().replace(/ /g, '-')}`)
            }
          >
            <SelectTrigger className='h-fit bg-inherit p-2 text-left text-lg font-black outline-0 outline-offset-4'>
              {event.official_name}
            </SelectTrigger>
            <SelectContent align='center'>
              <SelectGroup>
                {allEvents?.map((event) => (
                  <SelectItem
                    className='px-1'
                    key={event.official_name}
                    value={event.location || ''}
                  >
                    {event.round_number}{' '}
                    {event.official_name?.replace(/FORMULA 1/g, '')}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='bg-muted mt-4 rounded p-4'>
          <Image src={circuit} alt={event.official_name || ''} />
        </div>
      </EventContainer>
    </div>
  );
};

export default EventPage;
