import { useQuery } from '@apollo/client/react';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { GET_TOP_THREE_STANDINGS } from '@/lib/queries';

import { Loader } from '@/components/Loader';
import { Button } from '@/components/ui/button';

import { GetStandingsQuery, GetStandingsQueryVariables } from '@/types/graphql';

type ViewType = 'drivers' | 'constructors';

export default function TopThreeStandings({ year }: { year: string }) {
  const [view, setView] = useState<ViewType>('drivers');
  const { data, loading, error } = useQuery<
    GetStandingsQuery,
    GetStandingsQueryVariables
  >(GET_TOP_THREE_STANDINGS, { variables: { season: parseInt(year) } });

  if (loading) return <Loader />;
  if (error) return null;

  // --- helpers ---
  const sortByLastPoints = <T,>(items: T[], getPoints: (item: T) => number) =>
    [...items].sort((a, b) => getPoints(b) - getPoints(a));

  const getLast = <T,>(arr: T[]): T => arr[arr.length - 1];

  // --- prepare data ---
  const drivers = sortByLastPoints(
    data?.drivers || [],
    (d) => getLast(d.driver_standings).points as number,
  ).slice(0, 3);

  const constructors = sortByLastPoints(
    data?.constructors || [],
    (c) => getLast(c.constructor_standings).points as number,
  ).slice(0, 3);

  const activeList = view === 'drivers' ? drivers : constructors;

  // --- render ---
  return (
    <>
      <Link
        href={`${year}/standings?chart=${view}`}
        className='flex w-full items-center justify-between text-xl font-bold hover:underline'
      >
        Standings
        <ExternalLink />
      </Link>
      <div className='grid grid-cols-2 gap-2'>
        {(['drivers', 'constructors'] as ViewType[]).map((v) => (
          <Button
            key={v}
            variant={view === v ? 'secondary' : 'outline'}
            onClick={() => setView(v)}
          >
            {v === 'drivers' ? 'Drivers' : 'Constructors'}
          </Button>
        ))}
      </div>

      <div className='bg-muted divide-background flex flex-1 flex-col divide-y overflow-hidden rounded'>
        {activeList.map((item, idx) => {
          if (view === 'drivers') {
            const driver = item as GetStandingsQuery['drivers'][number];

            const last = getLast(driver.driver_standings);
            return (
              <StandingRow
                key={driver.full_name}
                position={last.position || idx + 1}
                name={driver.full_name as string}
                team={driver.latest_constructor[0].constructor?.name || ''}
                points={last.points as number}
                prevPoints={
                  idx > 0
                    ? (getLast(drivers[idx - 1].driver_standings)
                        .points as number)
                    : undefined
                }
              />
            );
          }
          if (view === 'constructors') {
            const constructor =
              item as GetStandingsQuery['constructors'][number];
            const last = getLast(constructor.constructor_standings);
            return (
              <StandingRow
                key={constructor.name}
                position={last.position || idx + 1}
                name={constructor.name as string}
                points={last.points as number}
                prevPoints={
                  idx > 0
                    ? (getLast(constructors[idx - 1].constructor_standings)
                        .points as number)
                    : undefined
                }
              />
            );
          }
        })}
      </div>
    </>
  );
}

function StandingRow({
  position,
  name,
  team,
  points,
  prevPoints,
}: {
  name: string;
  position: number;
  points: number;
  team?: string;
  prevPoints?: number;
}) {
  return (
    <div className='flex flex-1 items-center gap-4 px-4 py-2'>
      <p className='text-xl'>{position}</p>
      <div className='flex-1'>
        <h4 className='line-clamp-1 font-semibold'>{name}</h4>
        {team && <p className='text-sm'>{team}</p>}
      </div>
      <p>{points}</p>
      <p>{prevPoints !== undefined ? points - prevPoints : 'Gap'}</p>
    </div>
  );
}
