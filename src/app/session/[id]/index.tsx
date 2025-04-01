'use client';

import { useSuspenseQuery } from '@apollo/client';
import { useRouter, useSearchParams } from 'next/navigation';

import { GET_SESSION_RESULTS } from '@/lib/queries';
import { bgGradient } from '@/lib/utils';

import { FloatingNumber } from '@/components/FloatingNumber';
import { ServerPageError } from '@/components/ServerError';

import {
  SessionResultsQuery,
  SessionResultsQueryVariables,
} from '@/generated/types';

import SectorTimes from './sectorTimes';
import Stints from './stints';

export const SessionResults = ({ id }: { id: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get('view') || 'grid';

  const { data, error } = useSuspenseQuery<
    SessionResultsQuery,
    SessionResultsQueryVariables
  >(GET_SESSION_RESULTS, { variables: { id: id } });

  if (error || !data.sessions) return <ServerPageError />;

  const session = data.sessions[0];
  const eventName = session.event?.name;
  const sessionName = session.name;
  let driverSessions = session.driver_sessions;
  // Sort by results
  if (session.driver_sessions[0].results.length > 0) {
    // Sort by result position
    driverSessions = [...session.driver_sessions].sort((ds1, ds2) => {
      const position1 = Number(ds1.results[0].classified_position);
      const position2 = Number(ds2.results[0].classified_position);
      return position1 - position2;
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
        <div className='grid gap-4 lg:grid-cols-5'>
          {driverSessions.map((ds, i) => (
            <SessionCard
              key={ds.id}
              driverSession={ds}
              position={Number(ds.results?.[0]?.classified_position || i + 1)}
            />
          ))}
        </div>
      )}
      {view === 'charts' && (
        <ChartView id={id} driverSessions={driverSessions} />
      )}
    </>
  );
};

const ChartView = ({
  driverSessions,
  id,
}: {
  driverSessions: SessionResultsQuery['sessions'][0]['driver_sessions'];
  id: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get('chart') || 'laps';
  const chargeChart = (chart: 'sectors' | 'laps' | 'stints') => {
    const params = new URLSearchParams(searchParams);
    params.set('chart', chart);
    router.replace(`?${params.toString()}`);
  };

  return (
    <>
      <div className='grid grid-cols-5 gap-4 py-4'>
        <div className='flex h-8 w-full items-center justify-center rounded border'>
          Laps Chart
        </div>
        <div
          onClick={() => chargeChart('sectors')}
          className='flex h-8 w-full items-center justify-center rounded border'
        >
          Sector Times
        </div>
        <div className='flex h-8 w-full items-center justify-center rounded border'>
          Gap to Fastest
        </div>
        <div
          onClick={() => chargeChart('stints')}
          className='flex h-8 w-full items-center justify-center rounded border'
        >
          Stints
        </div>
        <div className='flex h-8 w-full items-center justify-center rounded border'>
          Top Speeds
        </div>
      </div>

      {view === 'laps' && <>Laps</>}
      {view === 'sectors' && <SectorTimes driverSessions={driverSessions} />}
      {view === 'stints' && <Stints id={id} />}
    </>
  );
};

const formatLapTime = (time: bigint) =>
  new Date(Number(time)).toISOString().slice(14, -1);
const formatSectorTimes = (time: bigint) =>
  new Date(Number(time)).toISOString().slice(17, -1);
const SessionCard = ({
  position,
  driverSession: ds,
}: {
  position: number;
  driverSession: SessionResultsQuery['sessions'][0]['driver_sessions'][0];
}) => (
  <div
    className='relative rounded border p-3'
    style={{
      background: bgGradient(ds.constructorByConstructorId?.color || 'cccccc'),
    }}
  >
    <FloatingNumber className='top-2 right-4 lg:text-xl'>
      {position}
    </FloatingNumber>
    <p className='text-xs leading-2'>{ds.constructorByConstructorId?.name}</p>
    <p>{ds.driver?.full_name}</p>
    <div className='items-cemter my-2 flex justify-between'>
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
      {ds.fastest_lap[0].sector1 && (
        <p>{formatSectorTimes(ds.fastest_lap[0].sector1)}</p>
      )}
      {ds.fastest_lap[0].sector2 && (
        <p>{formatSectorTimes(ds.fastest_lap[0].sector2)}</p>
      )}
      {ds.fastest_lap[0].sector3 && (
        <p>{formatSectorTimes(ds.fastest_lap[0].sector3)}</p>
      )}
    </div>
  </div>
);
