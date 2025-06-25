'use client';

import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { Earth } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';

import { GET_MAP_EVENTS } from '@/lib/queries';

import { ServerPageError } from '@/components/ServerError';

import EChartsMap from '@/app/[year]/map/EChartsMap';
import {
  GetMapEventsQuery,
  GetMapEventsQueryVariables,
} from '@/generated/types';

const WorldMap = () => {
  const { year } = useParams<{ year: string }>();
  const { data, error, loading } = useQuery<
    GetMapEventsQuery,
    GetMapEventsQueryVariables
  >(GET_MAP_EVENTS, {
    variables: { year: parseInt(year) },
  });

  if (error) return <ServerPageError />;

  return (
    <div className='relative flex h-[700px] w-full items-center justify-center'>
      <EChartsMap events={data?.events} />
      <MapLoader loading={loading} />
    </div>
  );
};

const MapLoader = ({ loading }: { loading: boolean }) => {
  return (
    <div
      className={clsx(
        'pointer-events-none absolute inset-0 flex items-center justify-center bg-black transition-opacity duration-400',
        loading ? 'opacity-100' : 'opacity-0',
      )}
    >
      <Earth
        size={48}
        className={
          loading ? 'animate-[ping_1.5s_ease-out_infinite]' : 'animate-none'
        }
      />
    </div>
  );
};

export default WorldMap;
