'use client';

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
import React, { useMemo } from 'react';

import { SessionResultsQuery } from '@/generated/types';

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
  time: number;
  lap?: number;
};

interface DriverSectors {
  sector1: Sector;
  sector2: Sector;
  sector3: Sector;
}

interface DriverFastestLap extends DriverSectors {
  lap_number: number;
  lap_time: number;
  potential_best: string | 0;
}

interface DriverTimes {
  abbreviation: string;
  fastestLap: DriverFastestLap;
  sectors: DriverSectors;
  color: string;
}

const SectorTimes: React.FC<{
  driverSessions: SessionResultsQuery['sessions'][0]['driver_sessions'];
}> = ({ driverSessions }) => {
  const driverTimes: DriverTimes[] = driverSessions.map((ds) => {
    const sector1 = Number(ds.fastest_sector1[0].sector1) / 1000;
    const sector2 = Number(ds.fastest_sector2[0].sector2) / 1000;
    const sector3 = Number(ds.fastest_sector3[0].sector3) / 1000;

    return {
      abbreviation: ds.driver?.abbreviation || 'N/A',
      fastestLap: {
        lap_number: Number(ds.fastest_lap[0].lap_number),
        lap_time: Number(ds.fastest_lap[0].lap_time) / 1000,
        sector1: { time: Number(ds.fastest_lap[0].sector1) / 1000 },
        sector2: { time: Number(ds.fastest_lap[0].sector2) / 1000 },
        sector3: { time: Number(ds.fastest_lap[0].sector3) / 1000 },
        potential_best:
          sector1 && sector2 && sector3
            ? (sector1 + sector2 + sector3).toFixed(3)
            : 0,
      },
      sectors: {
        sector1: {
          time: sector1,
          lap: Number(ds.fastest_sector1[0].lap_number),
        },
        sector2: {
          time: sector2,
          lap: Number(ds.fastest_sector2[0].lap_number),
        },
        sector3: {
          time: sector3,
          lap: Number(ds.fastest_sector3[0].lap_number),
        },
      },
      color: ds.constructorByConstructorId?.color || 'cccccc',
    };
  });

  return (
    <div className='grid gap-4'>
      {/* <StackedSectors times={driverTimes}/> */}
      <BestPotentialChart times={driverTimes} />
      <SectorChart times={driverTimes} sectorKey='sector1' />
      <SectorChart times={driverTimes} sectorKey='sector2' />
      <SectorChart times={driverTimes} sectorKey='sector3' />
    </div>
  );
};

{
  /* Best Lap Compared to Potential Best */
}
const BestPotentialChart = ({ times }: { times: DriverTimes[] }) => {
  const driverTimes = useMemo(
    () =>
      [...times]
        .filter((d) => d.fastestLap.lap_time !== 0)
        .sort(
          (a, b) =>
            Number(a.fastestLap.lap_time || 0) -
            Number(b.fastestLap.lap_time || 0),
        ),
    [times],
  );
  // Ensure we have valid min and max values
  const minValue =
    Math.min(
      ...(driverTimes || []).map((d) =>
        Number(d.fastestLap.potential_best || 0),
      ),
    ) - 0.05;

  const maxValue =
    Math.max(
      ...(driverTimes || []).map((d) => Number(d.fastestLap.lap_time || 0)),
    ) + 0.05;

  return (
    <BarChart
      driverCount={driverTimes.length}
      title={titles['potential_best']}
      minMax={[minValue, maxValue]}
    >
      <BarSeries
        dataKey='Lap Time'
        data={driverTimes}
        xAccessor={(d) => d.abbreviation}
        yAccessor={(d) => d.fastestLap.lap_time}
        colorAccessor={(d) => `#${d.color}`}
      />
      <GlyphSeries
        dataKey='Potential Best'
        data={driverTimes}
        xAccessor={(d) => d.abbreviation}
        yAccessor={(d) => d.fastestLap.potential_best}
        colorAccessor={() => '#FFD700'}
        enableEvents={false} // Disable tooltip effects
        renderGlyph={({ x, y, size, color }) => {
          return (
            <GlyphStar
              left={x}
              top={y}
              stroke='black'
              fill={color}
              size={size * 10}
            />
          );
        }}
      />

      {/* Labels on top of bars */}
      <GlyphSeries
        dataKey='Sector Time Labels'
        data={driverTimes}
        xAccessor={(d) => d.abbreviation}
        yAccessor={(d) => d.fastestLap.lap_time}
        renderGlyph={({ x, y, datum }) => (
          <text
            x={x}
            y={y - 4} // Position slightly above the bar
            fontSize={10}
            className='fill-foreground'
            textAnchor='middle'
          >
            {Number(datum.fastestLap.lap_time).toFixed(3)}s
          </text>
        )}
      />

      <Tooltip
        snapTooltipToDatumX
        renderTooltip={({ tooltipData }) => {
          const driverStats = tooltipData?.nearestDatum?.datum as DriverTimes;
          return (
            <>
              {/** date */}

              <div className='divide-foreground [&>*]:divide-foreground flex gap-y-1 divide-x font-normal **:[p]:px-1 **:[p]:py-0.5'>
                <div className='grid divide-y text-center'>
                  <p className='font-bold'>
                    {(driverStats && driverStats.abbreviation) || 'No Driver'}
                  </p>
                  <p>S1</p>
                  <p>S2</p>
                  <p>S3</p>
                  <p>Lap</p>
                </div>
                <div className='grid divide-y border-r text-center'>
                  <p>Fastest Lap</p>
                  <p>{driverStats.fastestLap.sector1.time}s</p>
                  <p>{driverStats.fastestLap.sector2.time}s</p>
                  <p>{driverStats.fastestLap.sector3.time}s</p>
                  <p>{driverStats.fastestLap.lap_time}s</p>
                </div>
                <div className='grid divide-y text-center'>
                  <p>Best Sectors</p>
                  <p>{driverStats.sectors.sector1.time}s</p>
                  <p>{driverStats.sectors.sector2.time}s</p>
                  <p>{driverStats.sectors.sector3.time}s</p>
                  <p>{driverStats.fastestLap.potential_best}s</p>
                </div>
              </div>
            </>
          );
        }}
      />
    </BarChart>
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
    .filter((d) => d.sectors[sectorKey].time !== 0)
    .sort(
      (a, b) =>
        Number(a.sectors[sectorKey].time || 0) -
        Number(b.sectors[sectorKey].time || 0),
    );

  // Ensure we have valid min and max values
  const minValue =
    Math.min(
      ...(driverTimes || []).map((d) =>
        Number(d.sectors?.[sectorKey].time || 0),
      ),
    ) - 0.05;

  const maxValue =
    Math.max(
      ...(driverTimes || []).map((d) =>
        Number(d.sectors?.[sectorKey].time || 0),
      ),
    ) + 0.05;
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

// Stacked Sectors Times of Fastest Lao
// const StackedSectors = ({ times }: { times: DriverTimes[] }) => {
//   const driverTimes = [...times].sort(
//     (a, b) =>
//       Number(a.fastestLap.lap_time || 0) - Number(b.fastestLap.lap_time || 0),
//   );
//   // Ensure we have valid min and max values
//   const minValue =
//     Math.min(
//       ...(driverTimes || []).map((d) =>
//         Number(d.fastestLap.potential_best || 0),
//       ),
//     ) - 0.05;

//   const maxValue =
//     Math.max(
//       ...(driverTimes || []).map((d) => Number(d.fastestLap.lap_time || 0)),
//     ) + 0.05;

//   return (
//     <BarChart
//       driverCount={driverTimes.length}
//       title={titles['potential_best']}
//       minMax={[minValue, maxValue]}
//     >
//       <BarStack>
//         <BarSeries
//           dataKey='Sector 1'
//           data={driverTimes}
//           yAccessor={(d) => d.abbreviation}
//           xAccessor={(d) => d.sectors.sector1}
//           colorAccessor={(d) => `#${d.color}`}
//         />
//         <BarSeries
//           dataKey='Sector 2'
//           data={driverTimes}
//           yAccessor={(d) => d.abbreviation}
//           xAccessor={(d) => d.sectors.sector2}
//           colorAccessor={(d) => `#${d.color}99`}
//         />
//         <BarSeries
//           dataKey='Sector 3'
//           data={driverTimes}
//           yAccessor={(d) => d.abbreviation}
//           xAccessor={(d) => d.sectors.sector3}
//           colorAccessor={(d) => `#${d.color}`}
//         />
//       </BarStack>

//       {/* Labels on top of bars */}
//       <GlyphSeries
//         dataKey='Sector Time Labels'
//         data={driverTimes}
//         yAccessor={(d) => d.abbreviation}
//         xAccessor={(d) => d.fastestLap.lap_time}
//         renderGlyph={({ x, y, datum }) => (
//           <text
//             x={x}
//             y={y - 5} // Position slightly above the bar
//             fontSize={10}
//             className='fill-foreground'
//             textAnchor='middle'
//           >
//             {Number(datum.fastestLap.lap_time).toFixed(3)}s
//           </text>
//         )}
//       />

//       <Tooltip
//         snapTooltipToDatumX
//         snapTooltipToDatumY
//         showVerticalCrosshair
//         showHorizontalCrosshair
//         renderTooltip={({ tooltipData }) => {
//           const driverStats = tooltipData?.nearestDatum?.datum as DriverTimes;
//           return (
//             <>
//               {/** date */}
//               {(driverStats && driverStats.abbreviation) || 'No Driver'}
//               <br />
//               <div>
//                 <p>Best: {driverStats.fastestLap.lap_time}</p>
//                 <p>Potential: {driverStats.fastestLap.potential_best}</p>
//               </div>
//             </>
//           );
//         }}
//       />
//     </BarChart>
//   );
// };

interface BarChartProps {
  driverCount: number;
  minMax: [number, number];
  title: React.ReactNode;
  children: React.ReactNode;
}

const BarChart: React.FC<BarChartProps> = ({
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
              // numTicks={5}
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
              // numTicks={driverCount}
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
