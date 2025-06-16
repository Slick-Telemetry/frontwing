'use client';

import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import { GET_SESSION_STINTS } from '@/lib/queries';
import { eventLocationDecode } from '@/lib/utils';

import { ServerPageError } from '@/components/ServerError';

import { StintSkeleton } from '@/app/[year]/[event]/[session]/StintSkeleton';
import {
  GetSessionStintsQuery,
  GetSessionStintsQueryVariables,
  Session_Name_Choices_Enum,
} from '@/generated/types';

import StintsEchartsChart from './StintsEchartsChart';

type Stint = {
  stint: number;
  startLap: number;
  endLap: number;
  tyreLife: number;
  tyreCompound: string;
  freshTyre: boolean;
  driver: string;
};
type StintMap = Record<number, Stint>;

// Chart Component
const Stints = () => {
  const { year, event, session } = useParams();

  const {
    data: sessionData,
    loading,
    error,
  } = useQuery<GetSessionStintsQuery, GetSessionStintsQueryVariables>(
    GET_SESSION_STINTS,
    {
      variables: {
        year: parseInt(year as string),
        event: eventLocationDecode(event as string),
        session: eventLocationDecode(
          session as string,
        ) as Session_Name_Choices_Enum,
      },
    },
  );

  // 🛠️ Process data for BarStack
  const data = useMemo(() => {
    let maxLaps = 0; // Track the largest endLap

    const processedData = sessionData?.sessions[0]?.driver_sessions
      .map((ds) => {
        const stintMap: StintMap = {};

        ds.laps.forEach((lap, index) => {
          if (lap.stint === null || lap.stint === undefined) return;

          if (!stintMap[lap.stint]) {
            stintMap[lap.stint] = {
              stint: lap.stint || 1,
              startLap: index + 1,
              endLap: index + 1, // Defaults to same lap; will be updated
              tyreLife: lap.tyre_life || 1,
              tyreCompound: lap.tyre_compound?.value || 'unknown',
              freshTyre: lap.fresh_tyre || false,
              driver: ds.driver?.abbreviation || 'Unknown',
            };
          } else {
            stintMap[lap.stint].endLap = index + 1;
          }

          // Track max lap
          maxLaps = Math.max(maxLaps, index + 1);
        });

        return {
          driver: ds.driver?.abbreviation || 'Unknown',
          totalLaps: ds.laps.length, // Store lap count for sorting
          stints: Object.values(stintMap),
        };
      })
      .sort((a, b) => a.totalLaps - b.totalLaps); // ✅ Sort drivers by most laps

    return { processedData, maxLaps };
  }, [sessionData]);

  const { processedData, maxLaps } = data;

  if (loading) return <StintSkeleton />;
  if (error || !sessionData) return <ServerPageError />;

  return (
    <>
      <div className='h-[600px] rounded border p-2'>
        <h3 className='text-center text-lg font-semibold'>Tyre Analysis</h3>
        <StintsEchartsChart processedData={processedData} maxLaps={maxLaps} />
      </div>
    </>
  );
};

export default Stints;
