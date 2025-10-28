'use client';
import { useQuery } from '@apollo/client/react';

import { getTodayMidnightUTC } from '@/lib/utils';

import { CircuitMap } from '@/components/circuit-map';
import { ServerPageError } from '@/components/ServerError';
import { ToggleLocalStorage } from '@/components/toggle';
import { Separator } from '@/components/ui/separator';

import { ScheduleEventItem } from './schedule-event';

import { graphql } from '@/types';

export const GET_SEASON_EVENTS = graphql(`
  query GetSeasonEvents($year: Int!) @cached {
    schedule(where: { year: { _eq: $year } }) {
      event_name
      event_date
      round_number
      location
      country
      ...Event_ScheduleFragment
    }
    circuits(where: { year: { _eq: $year } }) {
      location
      country
      ...CircuitDetails
    }
  }
`);

export function Schedule({ year }: { year: string }) {
  const { loading, error, data } = useQuery(GET_SEASON_EVENTS, {
    variables: { year: parseInt(year) },
  });

  if (error) return <ServerPageError />;

  const now = getTodayMidnightUTC();
  const nextEvent = data?.schedule.find(
    (evt) => new Date(evt.event_date as string) > new Date(now),
  );

  return (
    <>
      <div className='bg-background/80 sticky top-16 z-20 flex flex-col justify-between gap-2 py-4 md:flex-row md:items-end'>
        <h1 className='text-4xl font-extrabold tracking-tight text-balance'>
          {year} Schedule
        </h1>
        <div className='flex items-center gap-2'>
          <ToggleLocalStorage id='show-sessions' initial={false}>
            Show Sessions
          </ToggleLocalStorage>
          <Separator
            orientation='vertical'
            className='mx-2 data-[orientation=vertical]:h-4'
          />
          <ToggleLocalStorage id='track-time' initial={false}>
            Track Time
          </ToggleLocalStorage>
        </div>
      </div>

      <ul className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
        {loading &&
          Array.from(Array(18)).map((_v, idx) => (
            <li
              key={`schedule_event_loader_${idx}`}
              className='flex flex-col overflow-hidden rounded border'
            >
              <div className='group hover:bg-muted flex flex-1 items-center gap-2 pr-4'>
                <div className='bg-secondary border-background flex h-full w-[50px] items-center justify-center border-r text-2xl'>
                  {idx}
                </div>
                <div className='grid flex-1 animate-pulse gap-0.5 py-2'>
                  <div className='bg-accent/50 h-4 w-1/2 rounded' />
                  <div className='bg-accent/50 h-7 w-3/4 rounded' />
                  <div className='bg-accent/50 h-4 w-3/4 rounded' />
                </div>
              </div>
            </li>
          ))}
        {data?.schedule.map((event) => {
          const circuitData = data.circuits.find(
            (c) => c.country === event.country && c.location === event.location,
          );
          return (
            <ScheduleEventItem
              key={event.event_name as string}
              next={event.round_number === nextEvent?.round_number}
              event={event}
            >
              <CircuitMap circuitData={circuitData} small />
            </ScheduleEventItem>
          );
        })}
      </ul>
    </>
  );
}
