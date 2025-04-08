'use client';

import { QueryRef, useBackgroundQuery, useReadQuery } from '@apollo/client';
import { curveBasis, curveCatmullRom } from '@visx/curve';
import { ParentSize } from '@visx/responsive';
import { Axis, Grid, LineSeries, Tooltip, XYChart } from '@visx/xychart';
import React, { Suspense } from 'react';

import { GET_SESSION_LAP_TIMES } from '@/lib/queries';

import { FullHeightLoader } from '@/components/Loader';
import { ServerPageError } from '@/components/ServerError';

import {
  GetSessionLapTimesQuery,
  GetSessionLapTimesQueryVariables,
} from '@/generated/types';

const margin = { top: 20, right: 30, bottom: 50, left: 60 };

const LapTimeContainer = ({ id }: { id: string }) => {
  const [queryRef] = useBackgroundQuery<
    GetSessionLapTimesQuery,
    GetSessionLapTimesQueryVariables
  >(GET_SESSION_LAP_TIMES, { variables: { id: id } });

  return (
    <Suspense fallback={<FullHeightLoader />}>
      <DeltaToWinner queryRef={queryRef} />
      <LapTimes queryRef={queryRef} />
    </Suspense>
  );
};

const DeltaToWinner = ({
  queryRef,
}: {
  queryRef: QueryRef<GetSessionLapTimesQuery, GetSessionLapTimesQueryVariables>;
}) => {
  const { data, error } = useReadQuery(queryRef);

  if (error || !data.sessions) return <ServerPageError />;

  const driverData = data.sessions[0].driver_sessions;
  const firstPlaceLaps = driverData[0].laps;

  return (
    <div className='grid gap-4'>
      <LineChart title='Delta to Winner'>
        {driverData.map((driver) => {
          const color = `#${driver.constructorByConstructorId?.color || 'cccccc'}`;
          const lapData = driver.laps
            .filter((lap) => !!lap.lap_time)
            .map((lap, i) => {
              return {
                ...lap,
                delta_time:
                  (Number(firstPlaceLaps[i].session_time) -
                    Number(lap.session_time)) /
                  1000,
                color: color,
              };
            });
          return (
            <>
              <LineSeries
                curve={curveCatmullRom}
                key={driver.driver?.abbreviation}
                dataKey={driver.driver?.abbreviation as string}
                data={lapData}
                colorAccessor={() => color}
                strokeWidth={2}
                xAccessor={(d) => d.lap_number}
                yAccessor={(d) => d.delta_time}
              />
              {/* <GlyphSeries
                key={`${driver.driver?.abbreviation}-glyphs`}
                dataKey={`${driver.driver?.abbreviation}-glyphs`}
                data={lapData}
                xAccessor={(d) => d.lap_number}
                yAccessor={(d) => d.delta_time}
                colorAccessor={(d) => {
                  const compound = d.compound?.toUpperCase() || 'unknown';
                  return TYRE_COLORS[compound as keyof typeof TYRE_COLORS]?.new || TYRE_COLORS.unknown.new;
                }}
                renderGlyph={({ x, y, color }) => (
                  <GlyphDot cx={x} cy={y} r={4} fill={color} />
                )}
              /> */}
            </>
          );
        })}

        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showHorizontalCrosshair
          renderTooltip={({ tooltipData }) => {
            // console.log('tooltipData', tooltipData);
            const driverStats = tooltipData?.nearestDatum;
            return (
              <>
                {(driverStats && driverStats.key) || 'No Driver'}
                <br />
                <div>
                  {/* TODO:  Convert to min, seconds, milliseconds */}
                  {/* <p>{driverStats.datum.delta_time}</p>
                  <p>{driverStats.datum.compound}</p> */}
                </div>
              </>
            );
          }}
        />
      </LineChart>
    </div>
  );
};

const LapTimes = ({
  queryRef,
}: {
  queryRef: QueryRef<GetSessionLapTimesQuery, GetSessionLapTimesQueryVariables>;
}) => {
  const { data, error } = useReadQuery(queryRef);

  if (error || !data.sessions) return <ServerPageError />;

  // Find fastest lap of race
  // This will be used to compare other laptimes
  const baselineLap = data.sessions[0].driver_sessions[0].laps[0].lap_time;

  return (
    <div className='grid gap-4'>
      <LineChart title='Lap Times'>
        {data.sessions[0].driver_sessions.map((driver) => {
          // console.log('lap difference',  Number(driver.laps[0].lap_time) - Number(fastestLap))
          const color = `#${driver.constructorByConstructorId?.color || 'cccccc'}`;
          return (
            <LineSeries
              curve={curveBasis}
              key={driver.driver?.abbreviation}
              dataKey={driver.driver?.abbreviation as string}
              data={driver.laps
                .filter((lap) => !!lap.lap_time)
                .map((lap) => {
                  return {
                    ...lap,
                    delta_time:
                      (Number(baselineLap) - Number(lap.lap_time)) / 1000,
                    color: color,
                  };
                })}
              colorAccessor={() => color}
              strokeWidth={2}
              xAccessor={(d) => d.lap_number}
              yAccessor={(d) => d.delta_time}
            />
          );
        })}

        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showHorizontalCrosshair
          renderTooltip={({ tooltipData }) => {
            // console.log('tooltipData', tooltipData);
            const driverStats = tooltipData?.nearestDatum;
            return (
              <>
                {(driverStats && driverStats.key) || 'No Driver'}
                <br />
                <div>
                  {/* TODO:  Convert to min, seconds, milliseconds */}
                  {/* <p>{driverStats.datum.lap_time}</p> */}
                </div>
              </>
            );
          }}
        />
      </LineChart>
    </div>
  );
};

interface LineChartProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

const LineChart: React.FC<LineChartProps> = ({ title, children }) => (
  <div className='rounded border p-2'>
    {title}
    <div className='h-[500px]'>
      <ParentSize>
        {({ width, height }) => (
          <XYChart
            height={height}
            width={width}
            xScale={{ type: 'band', padding: 0.1 }}
            yScale={{
              type: 'linear',
              nice: true,
              //   domain: [-25000, 0]
            }}
            margin={margin}
          >
            {children}

            <Grid strokeDasharray='3 3' rows={false} />
            {/* Axis labels */}

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
              label='Times'
              labelOffset={20}
              tickLabelProps={() => ({
                fill: 'var(--color-foreground)',
              })}
              labelClassName='fill-foreground'
              tickClassName='fill-foreground'
            />
          </XYChart>
        )}
      </ParentSize>
    </div>
  </div>
);

export default LapTimeContainer;
