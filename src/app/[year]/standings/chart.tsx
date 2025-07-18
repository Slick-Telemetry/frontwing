import { ParentSize } from '@visx/responsive';
import { Axis, darkTheme, Grid, Tooltip, XYChart } from '@visx/xychart';
import clsx from 'clsx';

import { Standings } from '@/app/[year]/standings/page';

export const StandingsChart = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-[300px] rounded border lg:h-[450px]'>
      <ParentSize initialSize={{ height: 300 }}>
        {({ height, width }) => (
          <XYChart
            theme={darkTheme}
            height={height}
            width={width}
            margin={{ top: 16, left: 16, right: 64, bottom: 50 }}
            xScale={{ type: 'band' }}
            yScale={{ type: 'linear', nice: true }}
          >
            <Axis
              orientation='bottom'
              label='Round'
              labelClassName='text-lg'
              // animationTrajectory='min'
              numTicks={24}
            />
            <Axis
              orientation='right'
              label='Points'
              labelClassName='text-lg'
              labelOffset={16}
              // animationTrajectory='min'
            />
            <Grid
              strokeDasharray='3 6'
              strokeWidth={1}
              // animationTrajectory='min'
            />
            {children}
            <Tooltip
              snapTooltipToDatumX
              snapTooltipToDatumY
              showHorizontalCrosshair
              showVerticalCrosshair
              showDatumGlyph
              renderGlyph={({ datum }: { datum: Standings }) => {
                if (!datum) return null;
                return (
                  <circle
                    r={4}
                    fill={datum.color}
                    stroke='white'
                    strokeWidth={1}
                  />
                );
              }}
              renderTooltip={({ tooltipData }) => {
                if (!tooltipData) return null;
                return (
                  <div>
                    <p>
                      {tooltipData.nearestDatum &&
                        `Round: ${(tooltipData.nearestDatum.datum as Standings).round}`}
                    </p>
                    <p className='text-lg'>
                      {tooltipData.nearestDatum?.datum.eventName?.replace(
                        'Grand Prix',
                        'GP',
                      )}
                    </p>
                    {tooltipData.datumByKey &&
                      Object.keys(tooltipData.datumByKey)
                        .sort((a, b) => {
                          const pointsA =
                            tooltipData.datumByKey[a].datum.points;
                          const pointsB =
                            tooltipData.datumByKey[b].datum.points;
                          return Number(pointsB) - Number(pointsA); // Sort descending
                        })
                        .map((key) => {
                          const result = tooltipData.datumByKey[key].datum;
                          const active = tooltipData.nearestDatum?.key === key;
                          return (
                            <div
                              key={key}
                              className={clsx(
                                'flex justify-between gap-1 border-y border-gray-700 py-0.5',
                                !active && 'font-light opacity-80',
                                active && 'border-white font-black',
                              )}
                            >
                              <span style={{ color: result.color }}>{key}</span>
                              {result.points}
                            </div>
                          );
                        })}
                  </div>
                );
              }}
            />
          </XYChart>
        )}
      </ParentSize>
    </div>
  );
};
