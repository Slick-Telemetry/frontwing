import { AnimatedLineSeries } from '@visx/xychart';

import { GetSeasonEventsQuery, GetStandingsQuery } from '@/generated/types';

import { accessors } from '.';

export const ConstructorStandingsChart = ({
  events,
  constructors,
  hiddenConstructors,
}: {
  constructors: GetStandingsQuery['constructors'];
  hiddenConstructors: Record<string, boolean>;
  events?: GetSeasonEventsQuery['schedule'];
}) => {
  return constructors.map((constructor) =>
    constructor && !hiddenConstructors[constructor.name || ''] ? (
      <AnimatedLineSeries
        key={constructor.name}
        dataKey={constructor.name as string}
        data={constructor.constructor_standings.map((cs) => ({
          ...cs,
          color: `#${constructor.color || 'cccccc'}`,
          eventName:
            events?.find((event) => event.round_number === cs.round)
              ?.event_name || '',
        }))}
        colorAccessor={() => `#${constructor.color || 'cccccc'}`}
        {...accessors}
      />
    ) : null,
  );
};
