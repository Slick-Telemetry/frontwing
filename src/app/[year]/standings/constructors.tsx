import { AnimatedLineSeries } from '@visx/xychart';

import { GetStandingsQuery } from '@/generated/types';

import { accessors } from '.';

export const ConstructorStandingsChart = ({
  events,
  standingsByConstructor,
  hiddenConstructors,
}: {
  events: GetStandingsQuery['events'];
  standingsByConstructor: GetStandingsQuery['constructors'];
  hiddenConstructors: Record<string, boolean>;
}) => {
  return standingsByConstructor.map((constructor) =>
    constructor && !hiddenConstructors[constructor.name || ''] ? (
      <AnimatedLineSeries
        key={constructor.name}
        dataKey={constructor.name as string}
        data={constructor.constructor_standings.map((cs) => ({
          ...cs,
          color: `#${constructor.color || 'cccccc'}`,
          eventName:
            events.find((event) => event.round_number === cs.round)?.name || '',
        }))}
        colorAccessor={() => `#${constructor.color || 'cccccc'}`}
        {...accessors}
      />
    ) : null,
  );
};
