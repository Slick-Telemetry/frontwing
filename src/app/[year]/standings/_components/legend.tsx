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
  toggleDriverVisibility,
  toggleConstructorVisibility,
  hiddenDrivers,
  hiddenConstructors,
}: {
  standings: Driver[];
  // toggleVisibility: (type: 'driver' | 'constructor', id: string) => void;
  // hiddenItems: Record<string, boolean>;
  toggleDriverVisibility: (constructor: string, driver: string) => void;
  toggleConstructorVisibility: (constructor: string, drivers: string[]) => void;
  hiddenDrivers: Record<string, boolean>;
  hiddenConstructors: Record<string, boolean>;
}) => {
  const showDrivers = useSearchParams().get('chart') === 'drivers';
  const constructorsWithDrivers = groupDriversByConstructor(standings);

  return (
    <div className='grid grid-cols-2 gap-2 p-4 lg:grid-cols-5'>
      {constructorsWithDrivers.map(({ team, drivers, color }) => (
        <div
          key={team}
          className='flex cursor-pointer flex-col justify-between gap-1 rounded border p-2'
          style={{ borderColor: `${color}` }}
          onClick={() => toggleConstructorVisibility(team, drivers)}
          aria-label={`Toggle ${team}`}
        >
          {/* **Constructor Name Toggle** */}
          <div
            className={clsx(
              'flex items-center gap-1',
              hiddenConstructors[team] ? 'opacity-50' : 'opacity-100',
            )}
          >
            <Circle fill={`${color}`} stroke='none' className='size-4' />
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
                    toggleDriverVisibility(team, driver);
                  }}
                  className={clsx(
                    'max-w-1/2 flex-1 cursor-pointer px-0 py-1 text-center text-sm select-none',
                    `border-1 border-${['solid', 'dashed', 'dotted', 'double'][idx % 4]}`,
                    hiddenDrivers[driver] ? 'opacity-50' : 'opacity-100',
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
    </div>
  );
};
