import clsx from 'clsx';
import { Circle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';

type Driver = {
  abbr: string;
  team: string;
  color: string;
  totalPoints: number;
};

type GroupedByConstructor = {
  team: string;
  color: string;
  drivers: string[];
  totalPoints: number;
};

function groupDriversByConstructor(drivers: Driver[]): GroupedByConstructor[] {
  const grouped = drivers.reduce<Map<string, GroupedByConstructor>>(
    (acc, { team, color, abbr, totalPoints }) => {
      const group = acc.get(team) ?? {
        team,
        color,
        drivers: [],
        totalPoints: 0,
      };
      group.drivers.push(abbr);
      group.totalPoints += totalPoints;
      acc.set(team, group);
      return acc;
    },
    new Map(),
  );

  return grouped
    .values()
    .toArray()
    .sort((a, b) => b.totalPoints - a.totalPoints);
}

export const Legend = ({
  standings,
  toggleVisibility,
  hiddenItems,
}: {
  standings: Driver[];
  toggleVisibility: (
    type: 'drivers' | 'constructors' | 'all' | 'none',
    id?: string[],
  ) => void;
  hiddenItems: Record<string, boolean>;
}) => {
  const showDrivers = useSearchParams().get('chart') !== 'constructors';
  const constructorsWithDrivers = groupDriversByConstructor(standings);

  return (
    <div className='grid grid-cols-2 gap-2 p-4 lg:grid-cols-5'>
      {constructorsWithDrivers.map(({ team, drivers, color }) => (
        <div
          key={team}
          role='button'
          tabIndex={0}
          className='focus-visible:border-ring focus-visible:ring-ring/50 flex cursor-pointer flex-col justify-between gap-1 rounded border p-2 py-1 outline-none focus-visible:ring-[3px]'
          style={{ borderColor: color }}
          onClick={() => toggleVisibility('constructors', [team])}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleVisibility('constructors', [team]);
            }
          }}
          aria-label={`Toggle ${team}`}
          aria-pressed={!hiddenItems[team]}
        >
          {/* **Constructor Name Toggle** */}
          <div
            className={clsx(
              'flex items-center gap-1',
              hiddenItems[team] ? 'opacity-50' : 'opacity-100',
            )}
          >
            <Circle fill={color} stroke='none' className='size-3' />
            <p className='truncate'>{team}</p>
          </div>

          {showDrivers && (
            <div className='flex gap-x-2'>
              {drivers.map((driver, idx) => (
                <Button
                  key={driver}
                  size='sm'
                  variant='outline'
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleVisibility('drivers', [driver]);
                  }}
                  className={clsx(
                    'h-6 max-w-1/2 flex-1 cursor-pointer px-0 py-1 text-center text-sm select-none',
                    `border-1 border-${['solid', 'dashed', 'dotted', 'double'][idx % 4]}`,
                    hiddenItems[driver] ? 'opacity-50' : 'opacity-100',
                  )}
                  style={{ borderColor: color }}
                >
                  {driver}
                </Button>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className='col-span-full flex gap-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => toggleVisibility('all')}
        >
          Select All
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => toggleVisibility('none')}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};
