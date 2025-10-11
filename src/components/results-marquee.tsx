import { clsx } from 'clsx';
import Marquee from 'react-fast-marquee';

import { positionDisplay } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import { FragmentType, graphql, useFragment } from '@/types';

const RaceResultsFragment = graphql(`
  fragment RaceResults on events {
    name
    raceSession: sessions(
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

type ResultsMarqueeProps = {
  evt?: FragmentType<typeof RaceResultsFragment>;
};

export function ResultsMarquee(props: ResultsMarqueeProps) {
  const { name, raceSession } =
    useFragment(RaceResultsFragment, props.evt) ?? {};
  const driverSessions = raceSession?.[0]?.driver_sessions ?? [];
  if (!driverSessions.length) return null;
  return (
    <Marquee
      key={name}
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
  );
}
