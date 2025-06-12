'use client';

import { useQuery } from '@apollo/client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { GET_SESSION } from '@/lib/queries';
import { eventLocationDecode } from '@/lib/utils';

import { ServerPageError } from '@/components/ServerError';

import { DriverGrid } from '@/app/[year]/[event]/[session]/DriverGrid';
import { SessionHeaderSkeleton } from '@/app/[year]/[event]/[session]/sessionResultsSkeleton';
import {
  Session_Name_Choices_Enum,
  SessionQuery,
  SessionQueryVariables,
} from '@/generated/types';

import LapTimeContainer from './lapTimes';
import SectorTimes from './sectorTimes';
import Stints from './stints';

export const SessionHeader = () => {
  const { year, event: eventParams, session: sessionParam } = useParams();

  const { data, loading, error } = useQuery<
    SessionQuery,
    SessionQueryVariables
  >(GET_SESSION, {
    variables: {
      year: parseInt(year as string),
      event: eventLocationDecode(eventParams as string),
      session: eventLocationDecode(
        sessionParam as string,
      ) as Session_Name_Choices_Enum,
    },
  });

  if (loading) {
    return <SessionHeaderSkeleton />;
  }
  if (error || !data?.sessions) return <ServerPageError />;

  const { event, name, total_laps, scheduled_start_time_utc } =
    data.sessions[0];

  return (
    <div>
      <h1 className='text-4xl'>{event?.name}</h1>
      <h2 className='text-2xl'>{name?.replace(/_/g, ' ')}</h2>
      <span className='italic'>
        {total_laps} Laps
        <br />
        {new Date(scheduled_start_time_utc as string).toLocaleString(
          undefined,
          {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          },
        )}
      </span>
    </div>
  );
};

const ChartConfigs: Record<
  string,
  { title: string; component?: React.ReactNode }
> = {
  grid: {
    title: 'Driver Grid',
    component: <DriverGrid />,
  },
  laps: {
    title: 'Laps Chart',
    component: <LapTimeContainer />,
  },
  sectors: {
    title: 'Sector Times',
    component: <SectorTimes />,
  },
  stints: {
    title: 'Stints',
    component: <Stints />,
  },
  'gap to fastest': {
    title: 'Gap to Fastest',
  },
  'top speeds': {
    title: 'Top Speeds',
  },
};
type ChartKey = keyof typeof ChartConfigs;

export const ChartViewController = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chart = (searchParams.get('chart') || 'grid') as ChartKey;

  const chargeChart = (tab: 'grid' | 'sectors' | 'laps' | 'stints') => {
    const params = new URLSearchParams(searchParams);
    params.set('chart', tab);
    router.replace(`?${params.toString()}`);
  };

  const tabClass = (tab: string) =>
    `flex h-8 w-full items-center justify-center rounded border transition-colors
    ${
      // Active tab styles
      tab === chart
        ? 'bg-white text-black font-semibold'
        : 'border outline-none hover:bg-muted cursor-pointer'
    }
    ${
      // Disabled styles for specific tabs
      ['gap to fastest', 'top speeds'].includes(tab)
        ? 'opacity-50 cursor-not-allowed'
        : ''
    }
    `;

  return (
    <>
      <div className='grid grid-cols-5 gap-4 py-4'>
        {Object.keys(ChartConfigs).map((tab) => (
          <div
            key={tab}
            onClick={() =>
              chargeChart(tab as 'grid' | 'sectors' | 'laps' | 'stints')
            }
            className={tabClass(tab)}
          >
            {ChartConfigs[tab].title}
          </div>
        ))}
      </div>
      {ChartConfigs[chart] && ChartConfigs[chart].component}
    </>
  );
};
