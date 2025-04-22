'use client';

import { useQuery } from '@apollo/client';
import { PatternLines } from '@visx/pattern';
import { ParentSize } from '@visx/responsive';
import {
  AnimatedBarSeries,
  Axis,
  BarStack,
  Tooltip,
  XYChart,
} from '@visx/xychart';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import { GET_SESSION_STINTS } from '@/lib/queries';
import { eventLocationDecode } from '@/lib/utils';

import { Loader } from '@/components/Loader';
import { ServerPageError } from '@/components/ServerError';

import {
  GetSessionStintsQuery,
  GetSessionStintsQueryVariables,
  Session_Name_Choices_Enum,
} from '@/generated/types';

const margin = { top: 0, right: 30, bottom: 72, left: 60 };

type Stint = {
  stint: number;
  startLap: number;
  endLap: number;
  tyreLife: number;
  tyreCompound: string;
  freshTyre: boolean;
  driver: string;
};
type StintMap = Record<number, Stint>;

// Chart Component
const Stints = () => {
  const { year, event, session } = useParams();

  const {
    data: sessionData,
    loading,
    error,
  } = useQuery<GetSessionStintsQuery, GetSessionStintsQueryVariables>(
    GET_SESSION_STINTS,
    {
      variables: {
        year: parseInt(year as string),
        event: eventLocationDecode(event as string),
        session: eventLocationDecode(
          session as string,
        ) as Session_Name_Choices_Enum,
      },
    },
  );

  // 🛠️ Process data for BarStack
  const data = useMemo(() => {
    let maxLaps = 0; // Track the largest endLap

    const processedData = sessionData?.sessions[0]?.driver_sessions
      .map((ds) => {
        const stintMap: StintMap = {};

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
    <div className='h-[600px] rounded border p-2'>
      <h3 className='text-center text-lg font-semibold'>Tyre Analysis</h3>
      <ParentSize key='stintTyres'>
        {({ width, height }) => (
          <XYChart
            xScale={{ type: 'linear', domain: [0, maxLaps + 1] }}
            yScale={{ type: 'band', padding: 0.2 }}
            width={width}
            height={height}
            margin={margin}
          >
            {/* Define Patterns in <defs> */}
            <defs>
              {processedData?.flatMap((driverData) =>
                driverData.stints.map((stint) => {
                  if (!stint.freshTyre) {
                    const compound = stint.tyreCompound.toLowerCase();
                    const type = stint.freshTyre ? 'new' : 'old';
                    const patternId = `${driverData.driver}-stint-${stint.startLap}-pattern`;

                    return (
                      <PatternLines
                        key={patternId}
                        id={patternId}
                        height={6}
                        width={6}
                        stroke='black'
                        strokeWidth={1}
                        orientation={['diagonal']}
                        background={`var(--${compound}-${type})`} // Use the calculated compoundColor
                      />
                    );
                  }
                  return null;
                }),
              )}
            </defs>
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
              numTicks={processedData?.length}
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
              <BarStack>
                {driverData.stints.map((stint) => {
                  const compound = stint.tyreCompound.toLowerCase();
                  const type = stint.freshTyre ? 'new' : 'old';

                  // Define a pattern ID for old tyres
                  const patternId = `${driverData.driver}-stint-${stint.startLap}-pattern`;
                  return (
                    <AnimatedBarSeries
                      radius={4}
                      radiusAll
                      key={`${driverData.driver}-stint-${stint.startLap}`}
                      dataKey={`${driverData.driver}-stint-${stint.startLap}`}
                      data={[stint]}
                      xAccessor={(d) => d.endLap - d.startLap + 1}
                      yAccessor={(d) => d.driver}
                      colorAccessor={() =>
                        stint.freshTyre
                          ? `var(--${compound}-${type})`
                          : `url(#${patternId})`
                      } // Use pattern for old tyres
                    />
                  );
                })}
              </BarStack>
            ))}

            {/* Tooltip */}
            <Tooltip
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
                  driver,
                } = tooltipData.nearestDatum.datum as Stint;
                return (
                  <>
                    <div>
                      <strong>
                        <u>{driver}</u>
                      </strong>
                    </div>
                    <div>
                      <strong>Stint:</strong> {stint}
                    </div>
                    <div>
                      <strong>Laps:</strong> {startLap} - {endLap}
                    </div>
                    <div>
                      <strong>Tyre Life:</strong> {tyreLife}
                    </div>
                    <div>
                      <strong>Compound:</strong> {tyreCompound}
                    </div>
                    <div>
                      <strong>Condition:</strong> {freshTyre ? 'NEW' : 'OLD'}
                    </div>
                  </>
                );
              }}
            />
          </XYChart>
        )}
      </ParentSize>
    </div>
  );
};

export default Stints;
