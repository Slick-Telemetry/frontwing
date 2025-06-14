'use client';

import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import React from 'react';

import { GET_SESSION_LAP_TIMES } from '@/lib/queries';
import { eventLocationDecode } from '@/lib/utils';

import { ServerPageError } from '@/components/ServerError';

import {
  GetSessionLapTimesQuery,
  GetSessionLapTimesQueryVariables,
  Session_Name_Choices_Enum,
} from '@/generated/types';

import { DeltaToWinnerECharts, LapTimesECharts } from './lapChartsECharts';

const LapTimeContainer = () => {
  const { year, event, session } = useParams();

  const queryState = useQuery<
    GetSessionLapTimesQuery,
    GetSessionLapTimesQueryVariables
  >(GET_SESSION_LAP_TIMES, {
    variables: {
      year: parseInt(year as string),
      event: eventLocationDecode(event as string),
      session: eventLocationDecode(
        session as string,
      ) as Session_Name_Choices_Enum,
    },
  });

  const competition = [
    'sprint_qualifying',
    'race',
    'sprint',
    'sprint_shootout',
    'qualifying',
  ].includes(session as string);

  if (queryState.error || (!queryState.data?.sessions && !queryState.loading))
    return <ServerPageError />;

  return (
    <div className='grid gap-4'>
      {session && competition && <DeltaToWinnerECharts {...queryState} />}
      <LapTimesECharts {...queryState} />
    </div>
  );
};

export default LapTimeContainer;
