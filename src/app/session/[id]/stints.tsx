'use client';

import { useQuery } from '@apollo/client';
import { ParentSize } from '@visx/responsive';
import {
  AnimatedBarSeries,
  AnimatedBarStack,
  Axis,
  XYChart,
} from '@visx/xychart';
import { useMemo } from 'react';

import { GET_SESSION_STINTS } from '@/lib/queries';

import { Loader } from '@/components/Loader';
import { ServerPageError } from '@/components/ServerError';

import {
  GetSessionStintsQuery,
  GetSessionStintsQueryVariables,
} from '@/generated/types';

// Define colors for tyre compounds
const TYRE_COLORS = {
  SOFT: {
    new: '#b22222', // Soft (New)
    old: '#ff9999', // Soft (Used)
  },
  MEDIUM: {
    new: '#ffcc00', // Medium (New)
    old: '#ffff99', // Medium (Used)
  },
  HARD: {
    new: '#a9a9a9', // Hard (New)
    old: '#d3d3d3', // Hard (Used)
  },
  unknown: {
    new: '#ffffff', // Unknown
    old: '#ffffff', // Unknown
  },
};

// Chart Component
const Stints = ({ id }: { id: string }) => {
  const {
    data: sessionData,
    loading,
    error,
  } = useQuery<GetSessionStintsQuery, GetSessionStintsQueryVariables>(
    GET_SESSION_STINTS,
    { variables: { session: id } },
  );
  // 🛠️ Process data for BarStack
  const data = useMemo(() => {
    let maxLaps = 0; // Track the largest endLap

    const processedData = sessionData?.sessions[0]?.driver_sessions
      .map((ds) => {
        const stintMap: Record<
          number,
          {
            stint: number;
            startLap: number;
            endLap: number;
            tyreLife: number;
            tyreCompound: string;
            freshTyre: boolean;
            driver: string;
          }
        > = {};

        ds.laps.forEach((lap, index) => {
          if (lap.stint === null || lap.stint === undefined) return;

          if (!stintMap[lap.stint]) {
            stintMap[lap.stint] = {
              stint: lap.stint || 1,
              startLap: index + 1,
              endLap: index + 1, // Defaults to same lap; will be updated
              tyreLife: lap.tyre_life || 1,
              tyreCompound: lap.tyre_compound?.value || 'unknown',
              freshTyre: lap.fresh_tyre || false,
              driver: ds.driver?.abbreviation || 'Unknown',
            };
          } else {
            stintMap[lap.stint].endLap = index + 1;
          }

          // Track max lap
          maxLaps = Math.max(maxLaps, index + 1);
        });

        return {
          driver: ds.driver?.abbreviation || 'Unknown',
          totalLaps: ds.laps.length, // Store lap count for sorting
          stints: Object.values(stintMap),
        };
      })
      .sort((a, b) => a.totalLaps - b.totalLaps); // ✅ Sort drivers by most laps

    return { processedData, maxLaps };
  }, [sessionData]);

  const { processedData, maxLaps } = data;

  if (loading)
    return (
      <div className='flex h-96 items-center justify-center'>
        <Loader />
      </div>
    );
  if (error || !sessionData) return <ServerPageError />;

  return (
    <div className='h-[600px] w-full'>
      <ParentSize key='stintTyres'>
        {({ width, height }) => (
          <XYChart
            xScale={{ type: 'linear', domain: [0, maxLaps] }}
            yScale={{ type: 'band', padding: 0.1 }}
            width={width}
            height={height}
          >
            {/* X and Y Axes */}
            <Axis
              orientation='bottom'
              label='Lap Number'
              tickLabelProps={() => ({
                fill: 'var(--color-foreground)',
              })}
              labelClassName='fill-foreground'
              tickClassName='fill-foreground'
            />
            <Axis
              orientation='left'
              labelOffset={16}
              //   numTicks={data.length}
              label='Drivers'
              tickStroke='white'
              tickLabelProps={() => ({
                fill: 'var(--color-foreground)',
              })}
              labelClassName='fill-foreground'
              tickClassName='fill-foreground'
            />

            {/* Stacked Bars for Stints */}
            {processedData?.flatMap((driverData) => (
              <AnimatedBarStack>
                {driverData.stints.map((stint) => {
                  const compound =
                    TYRE_COLORS[
                      stint.tyreCompound as keyof typeof TYRE_COLORS
                    ] || TYRE_COLORS.unknown;

                  const type = stint.freshTyre ? 'new' : 'old';
                  const compoundColor = compound[type];

                  return (
                    <AnimatedBarSeries
                      radius={8}
                      radiusAll
                      key={`${driverData.driver}-stint-${stint.startLap}`}
                      dataKey={`${driverData.driver}-stint-${stint.startLap}`}
                      data={[stint]}
                      xAccessor={(d) => d.endLap - d.startLap + 1}
                      yAccessor={(d) => d.driver}
                      colorAccessor={() => compoundColor} // ✅ Correct color for each stint
                    />
                  );
                })}
              </AnimatedBarStack>
            ))}

            {/* Tooltip */}
            {/* <Tooltip
              showVerticalCrosshair
              renderTooltip={({ tooltipData }) => {
                if (!tooltipData?.nearestDatum) return null;
                const {
                  startLap,
                  endLap,
                  tyreLife,
                  stint,
                  tyreCompound,
                  freshTyre,
                } = tooltipData.nearestDatum.datum;
                return (
                  <div className='bg-black p-2 text-white'>
                    <div>
                      <strong>Stint:</strong> {stint}
                    </div>
                    <div>
                      <strong>Laps:</strong> {startLap} - {endLap}
                    </div>
                    <div>
                      <strong>Tire Life:</strong> {tyreLife}
                    </div>
                    <div>
                      <strong>Compound:</strong> {tyreCompound}
                    </div>
                    <div>
                      <strong>Condition:</strong> {freshTyre ? 'NEW' : 'OLD'}
                    </div>
                  </div>
                );
              }}
            /> */}
          </XYChart>
        )}
      </ParentSize>
    </div>
  );
};

export default Stints;
