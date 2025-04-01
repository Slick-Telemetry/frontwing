'use client';

import { ParentSize } from '@visx/responsive';
import {
  Axis,
  BarGroup,
  BarSeries,
  GlyphSeries,
  Grid,
  Tooltip,
  XYChart,
} from '@visx/xychart';
import React from 'react';

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
      <p className='text-center text-sm'>
        *Potential is total of best sector times
      </p>
    </>
  ),
};

interface DriverSectors {
  sector1: number;
  sector2: number;
  sector3: number;
}

interface DriverFastestLap extends DriverSectors {
  lap_time: number;
  potential_best: string;
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
        lap_time: Number(ds.fastest_lap[0].lap_time) / 1000,
        sector1: Number(ds.fastest_lap[0].sector1) / 1000,
        sector2: Number(ds.fastest_lap[0].sector2) / 1000,
        sector3: Number(ds.fastest_lap[0].sector3) / 1000,
        potential_best: (sector1 + sector2 + sector3).toFixed(3),
      },
      sectors: {
        sector1,
        sector2,
        sector3,
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
  const driverTimes = [...times].sort(
    (a, b) =>
      Number(b.fastestLap.lap_time || 0) - Number(a.fastestLap.lap_time || 0),
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
      <BarGroup padding={0}>
        <BarSeries
          dataKey='Potential Best'
          data={driverTimes}
          yAccessor={(d) => d.abbreviation}
          xAccessor={(d) => d.fastestLap.potential_best}
          colorAccessor={() => `#FFD70099`}
        />
        <BarSeries
          dataKey='Lap Time'
          data={driverTimes}
          yAccessor={(d) => d.abbreviation}
          xAccessor={(d) => d.fastestLap.lap_time}
          colorAccessor={(d) => `#${d.color}`}
        />
      </BarGroup>

      {/* Labels on top of bars */}
      <GlyphSeries
        dataKey='Sector Time Labels'
        data={driverTimes}
        yAccessor={(d) => d.abbreviation}
        xAccessor={(d) => d.fastestLap.lap_time}
        renderGlyph={({ x, y, datum }) => (
          <text
            x={x + 24}
            y={y + 3} // Position slightly above the bar
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
        snapTooltipToDatumY
        showVerticalCrosshair
        showHorizontalCrosshair
        renderTooltip={({ tooltipData }) => {
          const driverStats = tooltipData?.nearestDatum?.datum as DriverTimes;
          return (
            <>
              {/** date */}
              {(driverStats && driverStats.abbreviation) || 'No Driver'}
              <br />
              <div>
                <p>Best: {driverStats.fastestLap.lap_time}</p>
                <p>Potential: {driverStats.fastestLap.potential_best}</p>
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
  const driverTimes = [...times].sort(
    (a, b) =>
      Number(b.sectors[sectorKey] || 0) - Number(a.sectors[sectorKey] || 0),
  );

  // Ensure we have valid min and max values
  const minValue =
    Math.min(
      ...(driverTimes || []).map((d) => Number(d.sectors?.[sectorKey] || 0)),
    ) - 0.05;

  const maxValue =
    Math.max(
      ...(driverTimes || []).map((d) => Number(d.sectors?.[sectorKey] || 0)),
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
        yAccessor={(d) => d.abbreviation}
        xAccessor={(d) => d.sectors[sectorKey]}
        colorAccessor={(d) => `#${d.color}`}
      />

      {/* Labels on top of bars */}
      <GlyphSeries
        dataKey='Sector Time Labels'
        data={driverTimes}
        yAccessor={(d) => d.abbreviation}
        xAccessor={(d) => d.sectors[sectorKey]}
        renderGlyph={({ x, y, datum }) => (
          <text
            x={x + 20}
            y={y + 4} // Position slightly above the bar
            fontSize={10}
            className='fill-foreground'
            textAnchor='middle'
          >
            {Number(datum.sectors[sectorKey]).toFixed(3)}
          </text>
        )}
      />

      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        showVerticalCrosshair
        showHorizontalCrosshair
        renderTooltip={({ tooltipData }) => {
          const driverStats = tooltipData?.nearestDatum?.datum as DriverTimes;
          return (
            <>
              {/** date */}
              {(driverStats && driverStats.abbreviation) || 'No Driver'}
              <br />
              <div>
                <p>{driverStats.sectors[sectorKey]}</p>
              </div>
            </>
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
            height={height}
            width={width}
            yScale={{ type: 'band', padding: 0.1 }}
            xScale={{
              type: 'log',
              domain: minMax,
            }}
            margin={margin}
          >
            {children}

            <Grid strokeDasharray='3 3' rows={false} />
            {/* Axis labels */}

            <Axis
              orientation='bottom'
              label='Sector Time (s)'
              // numTicks={5}
              tickLabelProps={() => ({
                fill: 'var(--color-foreground)',
              })}
              labelClassName='fill-foreground'
              tickClassName='fill-foreground'
            />
            <Axis
              orientation='left'
              label='Driver'
              labelOffset={20}
              numTicks={driverCount}
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
