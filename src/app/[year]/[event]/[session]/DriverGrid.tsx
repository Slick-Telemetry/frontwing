import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';

import { GET_SESSION_RESULTS } from '@/lib/queries';
import {
  bgGradient,
  eventLocationDecode,
  findSessionType,
  formatLapTime,
  positionDisplay,
  sortFastestLaps,
  sortQuali,
} from '@/lib/utils';

import { FloatingNumber } from '@/components/FloatingNumber';
import { ChequeredFlagIcon } from '@/components/icons/ChequeredFlagIcon';
import { Loader } from '@/components/Loader';
import { ServerPageError } from '@/components/ServerError';

import {
  Session_Name_Choices_Enum,
  SessionResultsQuery,
  SessionResultsQueryVariables,
} from '@/generated/types';

export const DriverGrid = () => {
  const { year, event, session: sessionBlob } = useParams();

  const { data, loading, error } = useQuery<
    SessionResultsQuery,
    SessionResultsQueryVariables
  >(GET_SESSION_RESULTS, {
    variables: {
      year: parseInt(year as string),
      event: eventLocationDecode(event as string),
      session: eventLocationDecode(
        sessionBlob as string,
      ) as Session_Name_Choices_Enum,
    },
    skip: !year || !event || !sessionBlob,
  });

  if (loading) {
    return <Loader />;
  }
  if (error || !data?.sessions) return <ServerPageError />;

  const session = data.sessions[0];
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
  // If Race or Sprint, sort by position
  if (sessionType === 'competition') {
    driverSessions = (
      [
        ...session.driver_sessions,
      ] as SessionResultsQuery['sessions'][0]['driver_sessions']
    ).sort((a, b) => {
      const posA =
        a.results?.[0]?.classified_position ||
        a.results?.[0]?.finishing_position;
      const posB =
        b.results?.[0]?.classified_position ||
        b.results?.[0]?.finishing_position;

      // If both have numeric positions, compare them
      if (!isNaN(Number(posA)) && !isNaN(Number(posB))) {
        return Number(posA) - Number(posB);
      }

      // If only one has a numeric position, the other should come after
      if (!isNaN(Number(posA))) return -1;
      if (!isNaN(Number(posB))) return 1;

      // If neither has a numeric position, maintain their original order
      return 0;
    });
  }
  return (
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
  );
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
