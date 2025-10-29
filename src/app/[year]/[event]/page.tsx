'use client';
import { useQuery } from '@apollo/client/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use } from 'react';

import { GET_EVENT_SCHEDULE } from '@/lib/queries';
import { eventLocationDecode } from '@/lib/utils';

import { FullHeightLoader } from '@/components/Loader';
import { SeasonSelector } from '@/components/navigation';
import { ServerPageError } from '@/components/ServerError';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

import { EventContainer } from '@/app/[year]/EventContainer';

import {
  GetEventScheduleQuery,
  GetEventScheduleQueryVariables,
} from '@/types/graphql';

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

  if (loading) return <FullHeightLoader />;
  if (error) return <ServerPageError msg='Failed to load event details.' />;
  if (!data?.schedule || data?.schedule.length <= 0) {
    // TODO: return to season page
    return <ServerPageError msg={`Event, ${eventLoc}, not found`} />;
  }

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
        <div className='grid gap-4'>{/* Sessions */}</div>
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
      <EventContainer event={{ ...event, event_name: '' }} clickable={false}>
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
          <Image
            src='/Bahrain_carbon.png'
            height={250}
            width={300}
            alt={event.official_event_name || ''}
          />
        </div>
      </EventContainer>
    </div>
  );
};

export default EventPage;
