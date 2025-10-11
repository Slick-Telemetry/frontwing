import { Circle } from 'lucide-react';

import { positionEnding } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import { FragmentType, graphql, useFragment } from '@/types';

const TopThreeRaceResultsFragment = graphql(`
  fragment TopThreeRaceResults on events {
    topThreeRace: sessions(
      where: { event: { year: { _eq: $year } }, name: { _eq: Race } }
    ) {
      driver_sessions(
        limit: 3
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

type TopThreeProps = {
  evt?: FragmentType<typeof TopThreeRaceResultsFragment>;
};

export function TopThree(props: TopThreeProps) {
  const evt = useFragment(TopThreeRaceResultsFragment, props?.evt);
  if (!evt) return null;
  return (
    <div className='grid h-fit divide-y pr-2'>
      {evt.topThreeRace[0].driver_sessions.slice(0, 3).map((d) => (
        <div
          className='flex items-center gap-1 py-0.5'
          key={`top-three-${d.driver?.full_name}`}
        >
          <p className='w-6 text-right'>
            {d.results[0].finishing_position}
            <span className='text-xs'>
              {positionEnding(d.results[0].finishing_position ?? 0)}
            </span>
          </p>

          <Separator
            orientation='vertical'
            className='mx-0.5 data-[orientation=vertical]:h-4'
          />
          <p className='mr-auto line-clamp-1 font-medium'>
            {d.driver?.full_name}
          </p>
          <Circle
            fill={`#${d.constructorByConstructorId?.color}`}
            className='hidden size-3 sm:block xl:hidden'
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
  );
}
