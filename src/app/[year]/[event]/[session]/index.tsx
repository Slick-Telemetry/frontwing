'use client';

import { useSuspenseQuery } from '@apollo/client';
import { useRouter, useSearchParams } from 'next/navigation';

import { GET_SESSION_RESULTS } from '@/lib/queries';
import {
  bgGradient,
  eventLocationDecode,
  findSessionType,
  formatLapTime,
  sortFastestLaps,
  sortQuali,
} from '@/lib/utils';

import { FloatingNumber } from '@/components/FloatingNumber';
import { ChequeredFlagIcon } from '@/components/icons/ChequeredFlagIcon';
import { ServerPageError } from '@/components/ServerError';

import {
  Session_Name_Choices_Enum,
  SessionResultsQuery,
  SessionResultsQueryVariables,
} from '@/generated/types';

import LapTimeContainer from './lapTimes';
import SectorTimes from './sectorTimes';
import Stints from './stints';

export const SessionResults = ({
  year,
  event,
  session: sessionBlob,
}: {
  year: string;
  event: string;
  session: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get('view') || 'grid';
  const chart = searchParams.get('chart') || 'laps';

  const { data, error } = useSuspenseQuery<
    SessionResultsQuery,
    SessionResultsQueryVariables
  >(GET_SESSION_RESULTS, {
    variables: {
      year: parseInt(year),
      event: eventLocationDecode(event),
      session: eventLocationDecode(sessionBlob) as Session_Name_Choices_Enum,
    },
  });

  if (error || !data.sessions) return <ServerPageError />;

  const session = data.sessions[0];
  const sessionName = session.name;
  const eventName = session.event?.name;
  let driverSessions = session.driver_sessions;

  const sessionType = findSessionType(session?.name || '');

  // If Practice, sort by fastest lap
  if (sessionType === 'practice' && driverSessions.length > 0) {
    driverSessions = sortFastestLaps([
      ...session.driver_sessions,
    ]) as SessionResultsQuery['sessions'][0]['driver_sessions'];
  }
  // If Qualifying, sort by finishing position
  if (sessionType === 'qualifying') {
    driverSessions = sortQuali([
      ...session.driver_sessions,
    ]) as SessionResultsQuery['sessions'][0]['driver_sessions'];
  }
  // If Race or Sprint, sort by classified_position
  if (sessionType === 'competition') {
    driverSessions = (
      [
        ...session.driver_sessions,
      ] as SessionResultsQuery['sessions'][0]['driver_sessions']
    )
      .filter((driver) => !!driver.results[0].classified_position)
      .sort((a, b) => {
        return (
          Number(a.results[0]?.classified_position || 0) -
          Number(b.results[0]?.classified_position || 0)
        );
      });
  }

  const changeView = (
    view: 'grid' | 'sectors' | 'charts' | 'laps' | 'stints',
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set('view', view);
    router.replace(`?${params.toString()}`);
  };

  return (
    <>
      <div>
        <h2 className='text-2xl'>{sessionName?.replace(/_/g, ' ')}</h2>
        <h1 className='text-4xl'>{eventName}</h1>
      </div>
      <div className='grid w-full grid-cols-2 gap-4'>
        <button
          className={`w-full px-4 py-2 text-xs md:text-base ${view === 'grid' ? 'border-b-2 border-blue-600' : ''}`}
          onClick={() => changeView('grid')}
        >
          Grid
        </button>
        <button
          className={`w-full px-4 py-2 text-xs md:text-base ${view === 'charts' ? 'border-b-2 border-blue-600' : ''}`}
          onClick={() => changeView('charts')}
        >
          Charts
        </button>
      </div>
      {view === 'grid' && (
        <div className='grid gap-4 py-4 lg:grid-cols-5'>
          {driverSessions.map((ds, i) => (
            <SessionCard
              key={ds.driver?.full_name}
              driverSession={ds}
              position={
                ds.results?.[0]?.classified_position ||
                ds.results?.[0]?.finishing_position ||
                i + 1
              }
              index={i}
            />
          ))}
        </div>
      )}
      {view === 'charts' && (
        <ChartViewController
        // id={id}
        >
          {chart === 'laps' && <LapTimeContainer />}
          {chart === 'sectors' && (
            <>
              <SectorTimes />
            </>
          )}
          {chart === 'stints' && <Stints />}
        </ChartViewController>
      )}
    </>
  );
};

const ChartViewController = ({
  children,
  // id,
}: {
  children: React.ReactNode;
  // id: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Helper to check if a tab is active, similar to header.tsx
  const isActive = (tab: string) => {
    if (tab === 'laps') {
      return !searchParams.get('chart') || searchParams.get('chart') === 'laps';
    }
    return searchParams.get('chart') === tab;
  };

  const chargeChart = (tab: 'sectors' | 'laps' | 'stints') => {
    const params = new URLSearchParams(searchParams);
    params.set('chart', tab);
    router.replace(`?${params.toString()}`);
  };

  const tabClass = (tab: string) =>
    `flex h-8 w-full items-center justify-center rounded border transition-colors
    ${
      isActive(tab)
        ? 'bg-white text-black font-semibold'
        : 'border outline-none hover:bg-muted cursor-pointer'
    }
    `;

  return (
    <>
      <div className='grid grid-cols-5 gap-4 py-4'>
        <div onClick={() => chargeChart('laps')} className={tabClass('laps')}>
          Laps Chart
        </div>
        <div
          onClick={() => chargeChart('sectors')}
          className={tabClass('sectors')}
        >
          Sector Times
        </div>
        <div
          className='flex h-8 w-full cursor-not-allowed items-center justify-center rounded border opacity-50'
          aria-disabled='true'
        >
          Gap to Fastest
        </div>
        <div
          onClick={() => chargeChart('stints')}
          className={tabClass('stints')}
        >
          Stints
        </div>
        <div
          className='flex h-8 w-full cursor-not-allowed items-center justify-center rounded border opacity-50'
          aria-disabled='true'
        >
          Top Speeds
        </div>
      </div>
      {children}
    </>
  );
};

// const formatSectorTimes = (time: bigint) =>
//   new Date(Number(time)).toISOString().slice(17, -1);

const positionDisplay = (position: string | number) => {
  const map: Record<string, string> = {
    R: 'Retired',
    D: 'Disqualified',
    E: 'Excluded',
    W: 'Withdrawn',
    F: 'Failed to Qualify',
    N: 'Not Classified',
  };
  // If position is a number or a string that can be converted to a number, show the number
  if (!isNaN(Number(position))) {
    return position;
  }
  // Otherwise, show the mapped value or the original string
  return map[String(position)] || position;
};

const SessionCard = ({
  position,
  driverSession: ds,
  index,
}: {
  position: number | string;
  driverSession: SessionResultsQuery['sessions'][0]['driver_sessions'][0];
  index: number;
}) => {
  const isInteger =
    !isNaN(Number(position)) && Number.isInteger(Number(position));
  const constructorColor = ds.constructorByConstructorId?.color;

  return (
    <div
      className='relative rounded border p-3'
      style={{
        background: constructorColor ? bgGradient(constructorColor) : 'initial',
      }}
    >
      <div className='absolute top-2 right-4 flex items-center gap-1'>
        {isInteger && <ChequeredFlagIcon className='inline-block opacity-60' />}
        <FloatingNumber
          className={isInteger ? 'text-2xl lg:text-2xl' : 'text-xm lg:text-xm'}
        >
          {positionDisplay(position)}
        </FloatingNumber>
      </div>
      <p className='text-xs leading-2'>{ds.constructorByConstructorId?.name}</p>
      <p>{ds.driver?.full_name}</p>
      {ds.results?.[0]?.total_race_time ? (
        <p className='text-muted-foreground text-xs'>
          {index === 0
            ? formatLapTime(ds.results[0].total_race_time)
            : `+${formatLapTime(ds.results[0].total_race_time)}`}
        </p>
      ) : (
        <p className='text-muted-foreground text-xs'>&nbsp;</p> // Placeholder to maintain layout
      )}
      {ds.fastest_lap[0]?.lap_time && (
        <div className='items-cemter my-2 flex justify-between rounded border p-1'>
          <div className='grid'>
            <p className='text-xs'>Fastest Lap</p>
            <p className='text-2xl leading-6'>
              {formatLapTime(ds.fastest_lap[0].lap_time)}
            </p>
          </div>
          <div className='ml-auto flex gap-2'>
            <div className='grid text-center'>
              <p className='text-xs'>Lap</p>
              <p className='text-2xl leading-6'>
                {ds.fastest_lap[0]?.lap_number}
              </p>
            </div>
            <div className='grid text-center'>
              <p className='text-xs'>Stint</p>
              <p className='text-2xl leading-6'>{ds.fastest_lap[0]?.stint}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
