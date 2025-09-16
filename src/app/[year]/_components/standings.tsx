'use client';
import { useQuery } from '@apollo/client/react';
import clsx from 'clsx';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { GET_TOP_STANDINGS } from '@/lib/queries';
import { useLocalStorage } from '@/hooks/use-local-storage';

import { Loader } from '@/components/Loader';
import { Button } from '@/components/ui/button';

type ViewType = 'drivers' | 'constructors';
type StandingsListProps<T> = {
  items: T[];
  getName: (item: T) => string;
  getTeam?: (item: T) => string;
  getStandings: (
    item: T,
  ) => { points?: number | null; position?: number | null }[];
};

const getLast = <T,>(arr: T[]): T => arr[arr.length - 1];
const sortByLastPoints = <T,>(items: T[], getPoints: (item: T) => number) =>
  [...items].sort((a, b) => getPoints(b) - getPoints(a));

export default function TopThreeStandings({ year }: { year: string }) {
  const [view, setView] = useLocalStorage('season-standings', 'drivers');

  const { data, loading, error } = useQuery(GET_TOP_STANDINGS, {
    variables: { season: parseInt(year) },
  });

  if (loading) return <Loader />;
  if (error) return null;

  const drivers = sortByLastPoints(
    data?.drivers || [],
    (d) => getLast(d.driver_standings).points as number,
  );

  const constructors = sortByLastPoints(
    data?.constructors || [],
    (c) => getLast(c.constructor_standings).points as number,
  );

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

      <div className='grid flex-1 gap-2 2xl:grid-cols-2'>
        <div
          className={clsx({
            'hidden 2xl:flex': view !== 'drivers',
            flex: view === 'drivers',
          })}
        >
          <StandingsList
            items={drivers}
            getName={(d) => d.full_name!}
            getTeam={(d) => d.latest_constructor[0]?.constructor?.name ?? ''}
            getStandings={(d) => d.driver_standings}
          />
        </div>

        <div
          className={clsx('2xl:flex', {
            hidden: view !== 'constructors',
            flex: view === 'constructors',
          })}
        >
          <StandingsList
            items={constructors}
            getName={(c) => c.name!}
            getStandings={(c) => c.constructor_standings}
          />
        </div>
      </div>
    </>
  );
}

function StandingsList<T>({
  items,
  getName,
  getTeam,
  getStandings,
}: StandingsListProps<T>) {
  return (
    <div className='bg-muted divide-background flex flex-1 flex-col divide-y overflow-hidden rounded'>
      {items.map((item, idx) => {
        const standings = getStandings(item);
        const last = getLast(standings);

        return (
          <StandingRow
            key={getName(item)}
            position={last.position || idx + 1}
            name={getName(item)}
            team={getTeam?.(item) ?? ''}
            points={last.points as number}
            prevPoints={
              idx > 0
                ? (getLast(getStandings(items[idx - 1])).points ?? undefined)
                : undefined
            }
          />
        );
      })}
    </div>
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
      <p className='hidden lg:block'>
        {prevPoints !== undefined ? points - prevPoints : 'Gap'}
      </p>
    </div>
  );
}
