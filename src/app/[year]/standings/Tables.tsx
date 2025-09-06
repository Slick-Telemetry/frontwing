import clsx from 'clsx';

import { bgGradient } from '@/lib/utils';

import { GetStandingsQuery } from '@/types/graphql';

const calculateGap = (currentPoints: number, previousPoints: number | null) => {
  if (previousPoints === null) {
    return 'Gap';
  }
  const diff = previousPoints - currentPoints;
  return diff === 0 ? '0' : `-${diff}`;
};

export const DriversTable = ({
  drivers,
  hiddenDrivers,
  toggleDriverVisibility,
}: {
  drivers: GetStandingsQuery['drivers'];
  toggleDriverVisibility: (constructor: string, driver: string) => void;
  hiddenDrivers: Record<string, boolean>;
}) =>
  [...drivers]
    .sort((a, b) => {
      const aPoints = Number(
        a.driver_standings[a.driver_standings.length - 1]?.points ?? 0,
      );
      const bPoints = Number(
        b.driver_standings[b.driver_standings.length - 1]?.points ?? 0,
      );
      return bPoints - aPoints;
    })
    .map((driver, i, sortedDrivers) => {
      // if (hiddenDrivers[driver.abbreviation as string]) return null;

      const lastSession =
        driver.driver_standings[driver.driver_standings.length - 1];
      const currentPoints = Number(lastSession?.points ?? 0);
      const previousPoints =
        i > 0
          ? Number(
              sortedDrivers[i - 1].driver_standings[
                sortedDrivers[i - 1].driver_standings.length - 1
              ]?.points ?? 0,
            )
          : null;
      const gap = calculateGap(currentPoints, previousPoints);

      return (
        <div
          onClick={() =>
            toggleDriverVisibility(
              driver.latest_constructor[0].constructor?.name as string,
              driver.abbreviation as string,
            )
          }
          className={clsx(
            { 'opacity-50': hiddenDrivers[driver.abbreviation as string] },
            'border-muted flex flex-wrap items-center border',
          )}
          key={driver?.abbreviation || driver?.full_name}
        >
          <p className='w-8 text-center'>{i + 1}</p>
          <div
            className='flex flex-1 justify-between p-2 py-1'
            style={{
              background: bgGradient(
                driver.latest_constructor[0].constructor?.color || 'cccccc',
              ),
            }}
          >
            <p>{driver.full_name}</p>
            <p>{driver.latest_constructor[0].constructor?.name}</p>
          </div>
          <p className='w-12 text-center'>{lastSession.points}</p>
          <p className='w-12 text-center'>{gap}</p>
        </div>
      );
    });

export const ConstructorsTable = ({
  constructors,
  hiddenConstructors,
  toggleConstructorVisibility,
}: {
  constructors: GetStandingsQuery['constructors'];
  toggleConstructorVisibility: (constructor: string, drivers: string[]) => void;
  hiddenConstructors: Record<string, boolean>;
}) =>
  [...constructors]
    .sort((a, b) => {
      const aPoints = Number(
        a.constructor_standings[a.constructor_standings.length - 1]?.points ??
          0,
      );
      const bPoints = Number(
        b.constructor_standings[b.constructor_standings.length - 1]?.points ??
          0,
      );
      return bPoints - aPoints;
    })
    .map((constructor, i, sortedConstructors) => {
      // if (hiddenConstructors[constructor.name as string]) return null;

      const currentPoints = Number(
        constructor.constructor_standings[
          constructor.constructor_standings.length - 1
        ]?.points ?? 0,
      );
      const previousPoints =
        i > 0
          ? Number(
              sortedConstructors[i - 1].constructor_standings[
                sortedConstructors[i - 1].constructor_standings.length - 1
              ]?.points ?? 0,
            )
          : null;
      const gap = calculateGap(currentPoints, previousPoints);

      return (
        <div
          onClick={() =>
            toggleConstructorVisibility(constructor.name as string, [])
          }
          className={clsx(
            { 'opacity-50': hiddenConstructors[constructor.name as string] },
            'border-muted flex flex-wrap items-center border',
          )}
          key={constructor.name}
        >
          <p className='w-8 text-center'>{i + 1}</p>
          <p
            className='flex-1 p-2 py-1'
            style={{
              background: bgGradient(constructor.color || 'cccccc'),
            }}
          >
            {constructor.name}
          </p>
          <p className='w-12 text-center'>
            {
              constructor.constructor_standings[
                constructor.constructor_standings.length - 1
              ].points
            }
          </p>
          <p className='w-12 text-center'>{gap}</p>
        </div>
      );
    });
