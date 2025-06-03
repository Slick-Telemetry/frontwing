'use client';

import { QueryResult, useQuery } from '@apollo/client';
import { curveCatmullRom } from '@visx/curve';
import { ParentSize } from '@visx/responsive';
import { Axis, Grid, LineSeries, Tooltip, XYChart } from '@visx/xychart';
import { useParams } from 'next/navigation';
import React from 'react';

import { GET_SESSION_LAP_TIMES } from '@/lib/queries';
import { eventLocationDecode } from '@/lib/utils';

import { ServerPageError } from '@/components/ServerError';

import { LineChartSkeleton } from '@/app/[year]/[event]/[session]/LineChartSkeleton';
import {
  GetSessionLapTimesQuery,
  GetSessionLapTimesQueryVariables,
  Session_Name_Choices_Enum,
} from '@/generated/types';

const margin = { top: 20, right: 30, bottom: 50, left: 60 };

const LapTimeContainer = () => {
  const { year, event, session } = useParams();

  const queryState = useQuery<
    GetSessionLapTimesQuery,
    GetSessionLapTimesQueryVariables
  >(GET_SESSION_LAP_TIMES, {
    variables: {
      year: parseInt(year as string),
      event: eventLocationDecode(event as string),
      session: eventLocationDecode(
        session as string,
      ) as Session_Name_Choices_Enum,
    },
  });

  const competition = [
    'sprint_qualifying',
    'race',
    'sprint',
    'sprint_shootout',
    'qualifying',
  ].includes(session as string);

  if (queryState.error || (!queryState.data?.sessions && !queryState.loading))
    return <ServerPageError />;

  return (
    <div className='grid gap-4'>
      {session && competition && <DeltaToWinner {...queryState} />}
      <LapTimes {...queryState} />
    </div>
  );
};

const DeltaToWinner = ({
  data,
  loading,
}: QueryResult<GetSessionLapTimesQuery, GetSessionLapTimesQueryVariables>) => {
  if (loading) {
    return (
      <LineChartSkeleton title='Delta to Fastest Lap (Practice) or Winner' />
    );
  }

  const driverData = data?.sessions[0].driver_sessions || [];
  const firstPlaceLaps = driverData[0]?.laps;

  return (
    <LineChart title='Delta to Fastest Lap (Practice) or Winner'>
      {driverData.map((driver) => {
        const color = `#${driver.constructorByConstructorId?.color || 'cccccc'}`;
        const lapData = driver.laps
          .filter((lap) => !!lap.lap_number)
          .map((lap, i) => {
            return {
              ...lap,
              delta_time:
                (Number(firstPlaceLaps[i]?.session_time || 0) -
                  Number(lap.session_time || 0)) /
                1000,
              color: color,
            };
          });
        return (
          <React.Fragment key={driver.driver?.abbreviation}>
            <LineSeries
              curve={curveCatmullRom}
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
          </React.Fragment>
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
  );
};

const LapTimes = ({
  data,
  loading,
}: QueryResult<GetSessionLapTimesQuery, GetSessionLapTimesQueryVariables>) => {
  if (loading) {
    return <LineChartSkeleton title='Raw Lap Times' />;
  }

  const driverSessions = data?.sessions[0]?.driver_sessions || [];

  // Find the first driver session with at least one lap that has a lap_time
  const driverWithFirstLap = driverSessions.find(
    (driverSession) =>
      driverSession.laps &&
      driverSession.laps.some((lap) => lap.lap_time !== null),
  );

  // Determine the baselineLap from the first completed lap of the found driver
  const baselineLap = driverWithFirstLap?.laps?.find(
    (lap) => lap.lap_time !== null,
  )?.lap_time;

  // If no completed laps are found across all drivers, display a message
  if (
    baselineLap === null ||
    baselineLap === undefined ||
    driverSessions.length === 0
  ) {
    return (
      <div className='grid gap-4'>
        No completed laps found to display raw lap times.
      </div>
    );
  }

  return (
    <LineChart title='Raw Lap Times' yScaleType='log'>
      {driverSessions.map((driver) => {
        // console.log('lap difference',  Number(driver.laps[0].lap_time) - Number(fastestLap))
        const color = `#${driver.constructorByConstructorId?.color || 'cccccc'}`;
        return (
          <LineSeries
            curve={curveCatmullRom}
            key={driver.driver?.abbreviation}
            dataKey={driver.driver?.abbreviation as string}
            data={driver.laps
              .filter((lap) => !!lap.lap_number)
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
            yAccessor={(d) => d.lap_time}
          />
        );
      })}

      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        showVerticalCrosshair
        showHorizontalCrosshair
        renderTooltip={({ tooltipData }) => {
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
  );
};

interface LineChartProps {
  title: React.ReactNode;
  yScaleType?: 'linear' | 'log';
  children: React.ReactNode;
}

export const LineChart: React.FC<LineChartProps> = ({
  title,
  children,
  yScaleType = 'linear',
}) => (
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
              type: yScaleType,
              nice: yScaleType === 'linear',
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
