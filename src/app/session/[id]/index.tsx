'use client';

import { useSuspenseQuery } from '@apollo/client';
import moment from 'moment';
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
  } else if (session.driver_sessions[0].laps.length > 0) {
    // Sort by laptime
    driverSessions = [...session.driver_sessions].sort((ds1, ds2) => {
      const lapTime1 = ds1.laps[0].lap_time ? Number(ds1.laps[0].lap_time) : 0;
      const lapTime2 = ds2.laps[0].lap_time ? Number(ds2.laps[0].lap_time) : 0;
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
        <div className='my-4 grid gap-4 lg:grid-cols-5'>
          {driverSessions.map((ds, i) => (
            <SessionCard key={ds.id} driverSession={ds} position={i + 1} />
          ))}
        </div>
      )}
      {view === 'charts' && <ChartView changeView={changeView} />}
      {view === 'sectors' && <SectorTimes driverSessions={driverSessions} />}
      {view === 'stints' && <Stints id={id} />}
    </>
  );
};

const ChartView = ({
  changeView,
}: {
  changeView: (view: 'sectors' | 'laps' | 'stints') => void;
}) => {
  return (
    <div className='grid grid-cols-3 gap-4 py-4'>
      <div className='flex h-48 w-full items-center justify-center rounded border'>
        Laps Chart
      </div>
      <div
        onClick={() => changeView('sectors')}
        className='flex h-48 w-full items-center justify-center rounded border'
      >
        Sector Times
      </div>
      <div className='flex h-48 w-full items-center justify-center rounded border'>
        Gap to Fastest
      </div>
      <div
        onClick={() => changeView('stints')}
        className='flex h-48 w-full items-center justify-center rounded border'
      >
        Stints
      </div>
      <div className='flex h-48 w-full items-center justify-center rounded border'>
        Top Speeds
      </div>
    </div>
  );
};

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
    <div className='my-2 flex items-end justify-between'>
      <p className='text-2xl'>
        {moment.utc(Number(ds.laps[0].lap_time)).format('m:ss.SSS')}
      </p>
      <div className='ml-auto flex gap-2 text-xs'>
        <div className='grid text-center'>
          <p>Lap</p>
          <p className='leading-3'>{ds.laps[0].lap_number}</p>
        </div>
        <div className='grid text-center'>
          <p>Stint</p>
          <p className='leading-3'>{ds.laps[0].stint}</p>
        </div>
      </div>
    </div>
    <div className='grid grid-cols-3 divide-x rounded border p-1 text-center text-sm'>
      <p>{moment.utc(Number(ds.laps[0].sector1)).format('ss.SSS')}</p>
      <p>{moment.utc(Number(ds.laps[0].sector2)).format('ss.SSS')}</p>
      <p>{moment.utc(Number(ds.laps[0].sector3)).format('ss.SSS')}</p>
    </div>
  </div>
);
