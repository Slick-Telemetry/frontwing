'use client';
import { useQuery } from '@apollo/client/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { use, useEffect, useState } from 'react';

import { eventLocationDecode, eventLocationEncode } from '@/lib/utils';

import { ServerPageError } from '@/components/ServerError';

import Header from '@/app/[year]/map/_components/header';
import { MapLoader } from '@/app/[year]/map/_components/map/loader';
import { MapContent } from '@/app/[year]/map/_components/map/map';
import EventResults from '@/app/[year]/map/_components/results';
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
      ...MapTopRaceDrivers
    }
  }
`);

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

  if (loading)
    return (
      <MapPageLoader year={year}>
        <MapLoader loading />
      </MapPageLoader>
    );
  if (error || !data || data?.events?.length === 0)
    return (
      <MapPageLoader year={year}>
        <div className='flex h-full items-center justify-center'>
          <ServerPageError />
        </div>
      </MapPageLoader>
    );

  const activeScheduleEvent = data.schedule.find(
    (evt) => evt.event_name === activeEvent,
  );

  return (
    <div className='flex gap-4 p-4 lg:px-6'>
      {data.schedule && (
        <Schedule
          events={data.schedule}
          activeEvent={activeEvent}
          selectEvent={handleNewSelected}
        />
      )}

      <div className='h-fit flex-1 rounded border'>
        {/* Header */}
        <Header evt={activeScheduleEvent} maxRounds={data.schedule.length}>
          <EventResults
            results={data.events?.find((e) => e.name === activeEvent) ?? {}}
          />
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

function MapPageLoader({
  year,
  children,
}: {
  year: string;
  children?: React.ReactNode;
}) {
  return (
    <div className='flex gap-4 p-4 lg:px-6'>
      <div className='min-w-[250px]'>
        <h1 className='py-2 text-center text-xl'>{year} Schedule</h1>
        <div className='grid animate-pulse divide-y overflow-hidden rounded border'>
          {Array.from(Array(18)).map((_v, idx) => (
            <div
              key={`map-schedule-skeleton-${idx}`}
              className='bg-accent/50 h-7 w-full'
            ></div>
          ))}
        </div>
      </div>
      <div className='flex-1 rounded border'>
        <div className='grid animate-pulse gap-1 px-4 py-2'>
          <div className='bg-accent/50 h-9 w-72 rounded'></div>
          <div className='bg-accent/50 h-7 w-36 rounded'></div>
          <div className='bg-accent/50 h-7 w-96 rounded'></div>
        </div>
        <div className='relative h-[666px] rounded border'>{children}</div>
      </div>
    </div>
  );
}
