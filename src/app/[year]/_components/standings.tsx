'use client';
import { useQuery } from '@apollo/client/react';
import clsx from 'clsx';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { GET_TOP_STANDINGS } from '@/lib/queries';
import { useLocalStorage } from '@/hooks/use-local-storage';

import { Button } from '@/components/ui/button';

type ViewType = 'drivers' | 'constructors';
type StandingsListProps<T> = {
  items: T[];
  loading?: boolean;
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
    <div className='flex h-full min-h-[296px] flex-col gap-2 rounded border p-4 2xl:col-span-2'>
      <Link
        href={`${year}/standings?chart=${view}`}
        className='flex w-full items-center justify-between text-xl font-bold hover:underline'
      >
        Standings
        <ExternalLink />
      </Link>

      <div className='grid grid-cols-2 gap-2 rounded'>
        {(['drivers', 'constructors'] as ViewType[]).map((v) => (
          <Button
            key={v}
            variant={view === v ? 'secondary' : 'outline'}
            onClick={() => setView(v)}
            className='block truncate capitalize'
          >
            {v}
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
            loading={loading}
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
    </div>
  );
}

// *** Takes functions as props to get values dynamically
function StandingsList<T>({
  items,
  loading,
  getName,
  getTeam,
  getStandings,
}: StandingsListProps<T>) {
  return (
    <div className='bg-muted divide-background flex flex-1 flex-col divide-y overflow-hidden rounded'>
      {loading &&
        Array.from(Array(3)).map((_k, i) => (
          <StandingRowSkeleton key={`standing-row-loader-${i}`} />
        ))}
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
    <div className='flex flex-1 items-center gap-4 px-4 py-1'>
      <p className='text-xl'>{position}</p>
      <div className='flex-1'>
        <h4 className='line-clamp-1 font-semibold'>{name}</h4>
        {team && <p className='line-clamp-1 text-sm'>{team}</p>}
      </div>
      <p>{points}</p>
      <p className='hidden lg:block'>
        {prevPoints !== undefined ? points - prevPoints : 'Gap'}
      </p>
    </div>
  );
}

function StandingRowSkeleton() {
  return (
    <div className='flex flex-1 animate-pulse items-center gap-4 px-4 py-1'>
      <p className='bg-background h-8 w-4 rounded' />
      <div className='h-fit flex-1'>
        <h4 className='bg-background h-6 w-full rounded' />
        <p className='bg-background mt-1 h-4 w-full rounded' />
      </div>
      <p className='bg-background h-6 w-8 rounded' />
      <p className='bg-background hidden h-6 w-8 rounded lg:block' />
    </div>
  );
}
