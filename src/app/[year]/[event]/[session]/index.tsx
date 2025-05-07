'use client';

import { useSuspenseQuery } from '@apollo/client';
import { useRouter, useSearchParams } from 'next/navigation';

import { GET_SESSION_RESULTS } from '@/lib/queries';
import { bgGradient, eventLocationDecode } from '@/lib/utils';

import { ChequeredFlagIcon } from '@/components/ChequeredFlagIcon';
import { FloatingNumber } from '@/components/FloatingNumber';
import { ServerPageError } from '@/components/ServerError';

import LapTimeContainer from '@/app/[year]/[event]/[session]/lapTimes';
import SectorTimes from '@/app/[year]/[event]/[session]/sectorTimes';
import Stints from '@/app/[year]/[event]/[session]/stints';
import {
  Session_Name_Choices_Enum,
  SessionResultsQuery,
  SessionResultsQueryVariables,
} from '@/generated/types';

// import LapTimeContainer from './lapTimes';
// import SectorTimes from './sectorTimes';
// import Stints from './stints';

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
  const eventName = session.event?.name;
  const sessionName = session.name;
  let driverSessions = session.driver_sessions;
  // Sort by results
  if (session.driver_sessions[0].results.length > 0) {
    // Sort by classified_position: integers first (asc), then non-integers
    driverSessions = [...session.driver_sessions].sort((ds1, ds2) => {
      const pos1 = ds1.results[0]?.classified_position;
      const pos2 = ds2.results[0]?.classified_position;
      const num1 = Number(pos1);
      const num2 = Number(pos2);
      const isNum1 =
        !isNaN(num1) && pos1 !== null && pos1 !== undefined && pos1 !== '';
      const isNum2 =
        !isNaN(num2) && pos2 !== null && pos2 !== undefined && pos2 !== '';

      if (isNum1 && isNum2) {
        return num1 - num2; // both numbers, sort ascending
      }
      if (isNum1) return -1; // num1 is number, num2 is not: num1 comes first
      if (isNum2) return 1; // num2 is number, num1 is not: num2 comes first
      return 0; // both non-numbers, keep original order
    });
  } else if (session.driver_sessions[0].fastest_lap.length > 0) {
    // Sort by laptime
    driverSessions = [...session.driver_sessions].sort((ds1, ds2) => {
      const lapTime1 = ds1.fastest_lap[0].lap_time
        ? Number(ds1.fastest_lap[0].lap_time)
        : 0;
      const lapTime2 = ds2.fastest_lap[0].lap_time
        ? Number(ds2.fastest_lap[0].lap_time)
        : 0;
      return lapTime1 - lapTime2;
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
              position={Number(ds.results?.[0]?.classified_position || i + 1)}
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
            <SectorTimes driverSessions={driverSessions} />
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

const formatLapTime = (time: bigint) => {
  const date = new Date(Number(time));
  const iso = date.toISOString();
  // Convert to numbers to remove leading zeros, but pad seconds/minutes if needed
  const hours = Number(iso.slice(11, 13));
  const minutes = Number(iso.slice(14, 16));
  const seconds = Number(iso.slice(17, 19));
  const millis = iso.slice(19, -1); // .sss

  // Helper to pad with zero if needed
  const pad = (n: number) => n.toString().padStart(2, '0');

  if (hours === 0 && minutes === 0) {
    return `${seconds}${millis}`;
  }
  if (hours === 0) {
    return `${minutes}:${pad(seconds)}${millis}`;
  }
  return `${hours}:${pad(minutes)}:${pad(seconds)}${millis}`;
};
const formatSectorTimes = (time: bigint) =>
  new Date(Number(time)).toISOString().slice(17, -1);

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
  const displayPosition = ds.results?.[0]?.classified_position ?? position;
  const isInteger =
    !isNaN(Number(displayPosition)) &&
    Number.isInteger(Number(displayPosition));
  return (
    <div
      className='relative rounded border p-3'
      style={{
        background: bgGradient(
          ds.constructorByConstructorId?.color || 'cccccc',
        ),
      }}
    >
      <div className='absolute top-2 right-4 flex items-center gap-1'>
        {isInteger && <ChequeredFlagIcon className='inline-block opacity-60' />}
        <FloatingNumber
          className={isInteger ? 'text-2xl lg:text-2xl' : 'text-xm lg:text-xm'}
        >
          {positionDisplay(displayPosition)}
        </FloatingNumber>
      </div>
      <p className='text-xs leading-2'>{ds.constructorByConstructorId?.name}</p>
      <p>{ds.driver?.full_name}</p>
      {ds.results?.[0]?.total_race_time && (
        <p className='text-muted-foreground text-xs'>
          {index === 0
            ? formatLapTime(ds.results[0].total_race_time)
            : `+${formatLapTime(ds.results[0].total_race_time)}`}
        </p>
      )}
      <div className='items-cemter my-2 flex justify-between rounded border p-1'>
        <div className='grid'>
          <p className='text-xs'>Fastest Lap</p>
          {ds.fastest_lap[0].lap_time && (
            <p className='text-2xl leading-6'>
              {formatLapTime(ds.fastest_lap[0].lap_time)}
            </p>
          )}
        </div>
        <div className='ml-auto flex gap-2'>
          <div className='grid text-center'>
            <p className='text-xs'>Lap</p>
            <p className='text-2xl leading-6'>{ds.fastest_lap[0].lap_number}</p>
          </div>
          <div className='grid text-center'>
            <p className='text-xs'>Stint</p>
            <p className='text-2xl leading-6'>{ds.fastest_lap[0].stint}</p>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-3 divide-x rounded border p-1 text-center text-sm'>
        <div>
          <span className='text-muted-foreground block text-xs'>S1</span>
          <p>
            {ds.fastest_lap[0].sector1
              ? formatSectorTimes(ds.fastest_lap[0].sector1)
              : 'N/A'}
          </p>
        </div>
        <div>
          <span className='text-muted-foreground block text-xs'>S2</span>
          <p>
            {ds.fastest_lap[0].sector2
              ? formatSectorTimes(ds.fastest_lap[0].sector2)
              : 'N/A'}
          </p>
        </div>
        <div>
          <span className='text-muted-foreground block text-xs'>S3</span>
          <p>
            {ds.fastest_lap[0].sector3
              ? formatSectorTimes(ds.fastest_lap[0].sector3)
              : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};
