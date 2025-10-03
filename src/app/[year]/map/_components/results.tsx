'use client';

import clsx from 'clsx';
import { Circle } from 'lucide-react';
import Marquee from 'react-fast-marquee';

import { positionDisplay } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import { FragmentType, graphql, useFragment } from '@/types';

const MapTopRaceDrivers = graphql(`
  fragment MapTopRaceDrivers on events {
    eventSessions: sessions(
      where: { event: { year: { _eq: $year } }, name: { _eq: Race } }
    ) {
      driver_sessions(
        limit: 30
        order_by: { results_aggregate: { max: { finishing_position: asc } } }
      ) {
        results {
          finishing_position
        }
        driver {
          full_name
        }
        constructorByConstructorId {
          name
          color
        }
      }
    }
  }
`);

type EventResultsProps = {
  results: FragmentType<typeof MapTopRaceDrivers>;
};

export default function EventResults({ results }: EventResultsProps) {
  const { eventSessions } = useFragment(MapTopRaceDrivers, results);
  const driverSessions = eventSessions?.[0]?.driver_sessions ?? [];
  if (!driverSessions.length) return null;

  return (
    <>
      <div className='grid h-fit divide-y pr-2'>
        {driverSessions.slice(0, 3).map((d) => (
          <div
            className='flex items-center gap-1 py-0.5'
            key={`top-three-${d.driver?.full_name}`}
          >
            <p className='w-6'>
              {positionDisplay(d.results[0].finishing_position ?? 0)}
            </p>
            <p className='text mr-auto line-clamp-1 font-semibold'>
              {d.driver?.full_name}
            </p>
            <Circle
              fill={`#${d.constructorByConstructorId?.color}`}
              className='hidden size-4 sm:block xl:hidden'
            />
            {d.constructorByConstructorId?.name && (
              <Badge
                variant='outline'
                className='inline w-18 truncate text-xs sm:hidden xl:inline'
                style={{
                  borderColor: `#${d.constructorByConstructorId.color}`,
                }}
              >
                {d.constructorByConstructorId.name}
              </Badge>
            )}
          </div>
        ))}
      </div>
      <Marquee
        key={Date.now()} // Hacky way to trigger fresh mount
        gradient
        pauseOnHover
        gradientWidth={10}
        gradientColor='var(--background)'
        speed={30}
        delay={3}
        className='bg-muted/50 absolute! bottom-0'
      >
        {driverSessions.map(
          ({ driver, constructorByConstructorId, results }, idx) => {
            if (!driver || !constructorByConstructorId) return null;
            const position = results?.[0]?.finishing_position;
            return (
              <div className='flex items-center' key={driver.full_name}>
                <Separator
                  orientation='vertical'
                  className={clsx(
                    'mx-2 data-[orientation=vertical]:h-4',
                    idx === 0 ? 'bg-green-600' : 'bg-foreground/50',
                  )}
                />
                <div className='flex items-center gap-2 rounded-lg px-2 py-1'>
                  {position && (
                    <p className='text-center font-semibold'>
                      {positionDisplay(position)}
                    </p>
                  )}
                  <p>{driver.full_name}</p>
                  {constructorByConstructorId.name && (
                    <Badge
                      variant='outline'
                      className='ml-auto inline w-fit truncate text-xs'
                      style={{
                        borderColor: `#${constructorByConstructorId.color}`,
                      }}
                    >
                      {constructorByConstructorId.name}
                    </Badge>
                  )}
                </div>
              </div>
            );
          },
        )}
      </Marquee>
    </>
  );
}
