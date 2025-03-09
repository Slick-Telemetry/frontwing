import { ParentSize } from '@visx/responsive';
import {
  AnimatedAxis,
  AnimatedGrid,
  darkTheme,
  Tooltip,
  XYChart,
} from '@visx/xychart';
import clsx from 'clsx';

import { Standings } from '.';

export const StandingsChart = ({ children }: { children: React.ReactNode }) => {
  return (
    <ParentSize className='rounded border'>
      {({ width, height }) => (
        <XYChart
          theme={darkTheme}
          height={height}
          width={width}
          margin={{ top: 16, left: 16, right: 64, bottom: 50 }}
          xScale={{ type: 'band' }}
          yScale={{ type: 'linear', nice: true }}
        >
          <AnimatedAxis
            orientation='bottom'
            label='Round'
            labelClassName='text-lg'
            animationTrajectory='min'
            numTicks={24}
          />
          <AnimatedAxis
            orientation='right'
            label='Points'
            labelClassName='text-lg'
            labelOffset={16}
            animationTrajectory='min'
          />
          <AnimatedGrid strokeDasharray='3 6' animationTrajectory='min' />
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
                  <p className='text-lg'>
                    {tooltipData.nearestDatum &&
                      `Round: ${(tooltipData.nearestDatum.datum as Standings).round}`}
                  </p>
                  {tooltipData.datumByKey &&
                    Object.keys(tooltipData.datumByKey)
                      .sort((a, b) => {
                        const pointsA = tooltipData.datumByKey[a].datum.points;
                        const pointsB = tooltipData.datumByKey[b].datum.points;
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
  );
};
