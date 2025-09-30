'use client';
import { useQuery } from '@apollo/client/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { use, useEffect, useState } from 'react';

import { eventLocationDecode, eventLocationEncode } from '@/lib/utils';

import Header from '@/app/[year]/map/_components/header';
import { MapContent } from '@/app/[year]/map/_components/map/map';
import { Schedule } from '@/app/[year]/map/_components/schedule';

import { graphql } from '@/types';

const GET_SCHEDULE = graphql(`
  query GetMapSchedule($year: Int!) @cached {
    schedule(where: { year: { _eq: $year } }) {
      event_name
      ...MapScheduleFragment
      ...MapHeader_ScheduleFragment
    }
    events(where: { year: { _eq: $year } }) {
      name
      ...MapEvent
    }
  }
`);
// ...MapTopRaceDriversFragment

export default function MapPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loading, error, data } = useQuery(GET_SCHEDULE, {
    variables: { year: parseInt(year) },
  });
  const [activeEvent, setActiveEvent] = useState<string | null>(
    eventLocationDecode(searchParams.get('event') ?? ''),
  );
  // Set focus on first location
  useEffect(() => {
    if (!data || searchParams.get('event')) return;
    setActiveEvent(data.schedule[0]?.event_name ?? null);
  }, [data, searchParams]);

  const handleNewSelected = (event: string) => {
    // update url for sharing purposes
    const params = new URLSearchParams(searchParams);
    params.set('event', eventLocationEncode(event) ?? '');
    router.push(`?${params.toString()}`);

    setActiveEvent(event);
  };

  // TODO: Handle other states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading map data.</div>;
  if (!data || data?.schedule?.length === 0)
    return <div>No events found for {year}.</div>;

  const activeScheduleEvent = data.schedule.find(
    (evt) => evt.event_name === activeEvent,
  );

  return (
    <div className='flex gap-4 px-4 py-4 lg:px-6'>
      <Schedule
        events={data.schedule}
        activeEvent={activeEvent}
        selectEvent={handleNewSelected}
      />

      <div className='h-fit flex-1 rounded border'>
        {/* Header */}
        <Header evt={activeScheduleEvent} maxRounds={data.schedule.length}>
          {/* <TopThree
              data={data.events?.find((e) => e.name === selectedEvent) ?? {}}
            /> */}
        </Header>

        {/* Map */}
        <MapContent
          events={data.events}
          selectedEvent={activeEvent}
          onClickAction={handleNewSelected}
        />
      </div>
    </div>
  );
}
