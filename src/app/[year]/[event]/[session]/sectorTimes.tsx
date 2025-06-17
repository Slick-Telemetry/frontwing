'use client';

import { useQuery } from '@apollo/client';
import { GlyphStar } from '@visx/glyph';
import { ParentSize } from '@visx/responsive';
import {
  Axis,
  BarSeries,
  darkTheme,
  GlyphSeries,
  Grid,
  Tooltip,
  XYChart,
} from '@visx/xychart';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import React from 'react';

import { GET_SESSION_FASTEST_TIMES } from '@/lib/queries';
import { eventLocationDecode } from '@/lib/utils';

import { ServerPageError } from '@/components/ServerError';

import {
  GetSessionFastestTimesQuery,
  GetSessionFastestTimesQueryVariables,
  Session_Name_Choices_Enum,
} from '@/generated/types';

import { BarChartSkeleton } from './BarChartSkeleton';
import FastestLapECharts from './FastestLapECharts';

const margin = { top: 20, right: 30, bottom: 50, left: 60 };
const titles = {
  lap_time: (
    <>
      <h3 className='text-center text-lg font-semibold'>
        Fastest Laps with Sectors
      </h3>
    </>
  ),
  sector1: <h3 className='text-center text-lg font-semibold'>Sector 1</h3>,
  sector2: <h3 className='text-center text-lg font-semibold'>Sector 2</h3>,
  sector3: <h3 className='text-center text-lg font-semibold'>Sector 3</h3>,
  potential_best: (
    <>
      <h3 className='text-center text-lg font-semibold'>Fastest Laps</h3>
      <p className='text-center text-sm italic'>
        <svg className='inline size-6' viewBox='0 0 8 8'>
          <GlyphStar left={4} top={4} size={8} fill='#FFD700' />
        </svg>
        = Potential is total of best sector times
      </p>
    </>
  ),
};

type Sector = {
  time: number | null;
  lap?: number | null;
};

interface DriverSectors {
  sector1: Sector;
  sector2: Sector;
  sector3: Sector;
}

interface DriverFastestLap extends DriverSectors {
  lap_number: number | null;
  lap_time: number | null;
  potential_best: string | 0;
}

export interface DriverTimes {
  abbreviation: string;
  fastestLap: DriverFastestLap;
  sectors: DriverSectors;
  color: string;
}

const SectorTimes = () => {
  const { year, event, session: sessionParam } = useParams();
  const { data, loading, error } = useQuery<
    GetSessionFastestTimesQuery,
    GetSessionFastestTimesQueryVariables
  >(GET_SESSION_FASTEST_TIMES, {
    variables: {
      year: parseInt(year as string),
      event: eventLocationDecode(event as string),
      session: eventLocationDecode(
        sessionParam as string,
      ) as Session_Name_Choices_Enum,
    },
  });

  if (error) {
    return (
      <div className='my-16'>
        <ServerPageError msg='Issue loading sectors times' />
      </div>
    );
  }

  const driverSessions = data?.sessions[0].driver_sessions || [];

  const driverTimes: DriverTimes[] = driverSessions.map((ds) => {
    const sector1 =
      ds.fastest_sector1.length > 0 && ds.fastest_sector1[0].sector1 !== null
        ? Number(ds.fastest_sector1[0].sector1) / 1000
        : null;
    const sector2 =
      ds.fastest_sector2.length > 0 && ds.fastest_sector2[0].sector2 !== null
        ? Number(ds.fastest_sector2[0].sector2) / 1000
        : null;
    const sector3 =
      ds.fastest_sector3.length > 0 && ds.fastest_sector3[0].sector3 !== null
        ? Number(ds.fastest_sector3[0].sector3) / 1000
        : null;

    return {
      abbreviation: ds.driver?.abbreviation || 'N/A',
      fastestLap: {
        lap_number:
          ds.fastest_lap.length > 0 && ds.fastest_lap[0].lap_number !== null
            ? Number(ds.fastest_lap[0].lap_number)
            : null,
        lap_time:
          ds.fastest_lap.length > 0 && ds.fastest_lap[0].lap_time !== null
            ? Number(ds.fastest_lap[0].lap_time) / 1000
            : null,
        sector1: {
          time:
            ds.fastest_lap.length > 0 && ds.fastest_lap[0].sector1 !== null
              ? Number(ds.fastest_lap[0].sector1) / 1000
              : null,
        },
        sector2: {
          time:
            ds.fastest_lap.length > 0 && ds.fastest_lap[0].sector2 !== null
              ? Number(ds.fastest_lap[0].sector2) / 1000
              : null,
        },
        sector3: {
          time:
            ds.fastest_lap.length > 0 && ds.fastest_lap[0].sector3 !== null
              ? Number(ds.fastest_lap[0].sector3) / 1000
              : null,
        },
        potential_best:
          sector1 && sector2 && sector3
            ? (sector1 + sector2 + sector3).toFixed(3)
            : 0,
      },
      sectors: {
        sector1: {
          time: sector1,
          lap:
            ds.fastest_sector1.length > 0 &&
            ds.fastest_sector1[0].lap_number !== null
              ? Number(ds.fastest_sector1[0].lap_number)
              : null,
        },
        sector2: {
          time: sector2,
          lap:
            ds.fastest_sector2.length > 0 &&
            ds.fastest_sector2[0].lap_number !== null
              ? Number(ds.fastest_sector2[0].lap_number)
              : null,
        },
        sector3: {
          time: sector3,
          lap:
            ds.fastest_sector3.length > 0 &&
            ds.fastest_sector3[0].lap_number !== null
              ? Number(ds.fastest_sector3[0].lap_number)
              : null,
        },
      },
      color: ds.constructorByConstructorId?.color || 'cccccc',
    };
  });

  return (
    <div className={clsx('grid gap-4', { 'animate-pulse': loading })}>
      {loading ? (
        <>
          <BarChartSkeleton title={titles['potential_best']} />
          <BarChartSkeleton title={titles['sector1']} />
          <BarChartSkeleton title={titles['sector2']} />
          <BarChartSkeleton title={titles['sector3']} />
        </>
      ) : (
        <>
          <FastestLapECharts times={driverTimes} />
          <SectorChart times={driverTimes} sectorKey='sector1' />
          <SectorChart times={driverTimes} sectorKey='sector2' />
          <SectorChart times={driverTimes} sectorKey='sector3' />
        </>
      )}
    </div>
  );
};

const SectorChart = ({
  sectorKey,
  times,
}: {
  sectorKey: keyof DriverSectors;
  times: DriverTimes[];
}) => {
  // Sort by fastest sector times
  const driverTimes = [...times]
    .filter(
      (d) =>
        d.sectors[sectorKey].time !== null && d.sectors[sectorKey].time > 0,
    )
    .sort(
      (a, b) =>
        Number(a.sectors[sectorKey].time || 0) -
        Number(b.sectors[sectorKey].time || 0),
    );

  // Ensure we have valid min and max values
  let minValue: number;
  let maxValue: number;

  if (driverTimes.length === 0) {
    // If no valid data, set a default small range
    minValue = 0;
    maxValue = 1;
  } else {
    minValue =
      Math.min(
        ...(driverTimes || []).map((d) => Number(d.sectors?.[sectorKey].time)),
      ) - 0.05;

    maxValue =
      Math.max(
        ...(driverTimes || []).map((d) => Number(d.sectors?.[sectorKey].time)),
      ) + 0.05;
  }

  return (
    <BarChart
      driverCount={driverTimes.length}
      title={titles[sectorKey]}
      minMax={[minValue, maxValue]}
    >
      <BarSeries
        dataKey='sector3'
        data={driverTimes}
        xAccessor={(d) => d.abbreviation}
        yAccessor={(d) => d.sectors[sectorKey].time}
        colorAccessor={(d) => `#${d.color}`}
      />

      {/* Labels on top of bars */}
      <GlyphSeries
        dataKey='Sector Time Labels'
        data={driverTimes}
        xAccessor={(d) => d.abbreviation}
        yAccessor={(d) => d.sectors[sectorKey].time}
        renderGlyph={({ x, y, datum }) => (
          <>
            <text
              x={x}
              y={y - 16} // Position slightly above the bar
              fontSize={10}
              className='fill-foreground'
              textAnchor='middle'
            >
              Lap {datum.sectors[sectorKey].lap}
            </text>
            <text
              x={x}
              y={y - 4} // Position slightly above the bar
              fontSize={10}
              className='fill-foreground'
              textAnchor='middle'
            >
              {Number(datum.sectors[sectorKey].time).toFixed(3)}s
            </text>
          </>
        )}
      />

      <Tooltip
        snapTooltipToDatumX
        renderTooltip={({ tooltipData }) => {
          const driverStats = tooltipData?.nearestDatum?.datum as DriverTimes;
          return (
            <div className='grid divide-y'>
              <div className='grid grid-cols-3'>
                <p></p>
                <p>Time</p>
                <p className='text-right'>Lap</p>
              </div>
              {driverTimes.map((d) => {
                const activeDriver =
                  driverStats.abbreviation === d.abbreviation;
                const classList = activeDriver
                  ? 'font-black border-y border-foreground'
                  : 'font-light opacity-80';
                return (
                  <div
                    className='grid grid-cols-3'
                    key={`tooltip-${d.abbreviation}`}
                  >
                    <p className={clsx(classList)}>{d.abbreviation}</p>
                    <p className={clsx(classList)}>
                      {d.sectors[sectorKey].time}s
                    </p>
                    <p className={clsx('text-right', classList)}>
                      {d.sectors[sectorKey].lap}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        }}
      />
    </BarChart>
  );
};

interface BarChartProps {
  driverCount: number;
  minMax: [number, number];
  title: React.ReactNode;
  children: React.ReactNode;
}

export const BarChart: React.FC<BarChartProps> = ({
  title,
  driverCount,
  minMax,
  children,
}) => (
  <div className='rounded border p-2'>
    {title}
    <div className='h-[500px]'>
      <ParentSize>
        {({ width, height }) => (
          <XYChart
            theme={darkTheme}
            height={height}
            width={width}
            xScale={{ type: 'band', padding: 0.1 }}
            yScale={{
              type: 'log',
              domain: minMax,
            }}
            margin={margin}
          >
            {children}

            <Grid strokeDasharray='3 3' columns={false} />
            {/* Axis labels */}

            <Axis
              orientation='bottom'
              label='Driver'
              numTicks={driverCount}
              tickLabelProps={() => ({
                fill: 'var(--color-foreground)',
              })}
              labelClassName='fill-foreground'
              tickClassName='fill-foreground'
            />

            <Axis
              orientation='left'
              label='Time (s)'
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

export default SectorTimes;
