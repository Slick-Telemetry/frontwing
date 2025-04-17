import { AnimatedLineSeries } from '@visx/xychart';

import { GetStandingsQuery } from '@/generated/types';

import { accessors } from '.';
import { StandingsChart } from './chart';

export const ConstructorStandingsChart = ({
  standingsByConstructor,
  hiddenConstructors,
}: {
  standingsByConstructor: GetStandingsQuery['constructors'];
  hiddenConstructors: Record<string, boolean>;
}) => {
  return (
    <StandingsChart>
      {standingsByConstructor.map((constructor) =>
        constructor && !hiddenConstructors[constructor.name || ''] ? (
          <AnimatedLineSeries
            key={constructor.name}
            dataKey={constructor.name as string}
            data={constructor.constructor_standings.map((cs) => ({
              ...cs,
              color: `#${constructor.color || 'cccccc'}`,
            }))}
            colorAccessor={() => `#${constructor.color || 'cccccc'}`}
            {...accessors}
          />
        ) : null,
      )}
    </StandingsChart>
  );
};
