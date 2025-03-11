'use client';

import { Axis, BarSeries, GlyphSeries, XYChart } from '@visx/xychart';
import React from 'react';

import { SessionResultsQuery } from '@/generated/types';

const height = 300;
const margin = { top: 20, right: 30, bottom: 50, left: 60 };

interface BarChartProps {
  driverSessions: SessionResultsQuery['sessions'][0]['driver_sessions'];
  sectorKey: 'sector1' | 'sector2' | 'sector3';
  title: string;
}

const BarChart: React.FC<BarChartProps> = ({
  driverSessions,
  sectorKey,
  title,
}) => {
  // Extract and sort sector data by lap time (ascending)
  const formattedData = driverSessions
    .map((ds) => ({
      driver: ds.driver?.abbreviation || 'N/A',
      value: Number(ds.laps[0]?.[sectorKey] || 0) / 1000,
      color: ds.constructorByConstructorId?.color || 'cccccc',
    }))
    .filter((d) => d.value > 0)
    .sort((a, b) => a.value - b.value);

  // Ensure we have valid min and max values
  const minValue =
    formattedData.length > 0
      ? Math.min(...formattedData.map((d) => d.value)) - 0.05
      : 0;
  const maxValue =
    formattedData.length > 0
      ? Math.max(...formattedData.map((d) => d.value)) + 0.05
      : 1;

  return (
    <div>
      <h3 className='mb-2 text-center text-lg font-semibold'>{title}</h3>

      <XYChart
        height={height}
        xScale={{ type: 'band', padding: 0.2 }}
        yScale={{
          type: 'log',
          domain: [minValue, maxValue],
        }}
        margin={margin}
      >
        {/* Axis labels */}
        <Axis
          orientation='left'
          label='Sector Time (s)'
          labelOffset={30}
          numTicks={5}
          tickLabelProps={() => ({
            fill: 'var(--color-foreground)',
            fontSize: 12,
          })}
          labelClassName='fill-foreground'
          tickClassName='fill-foreground'
        />
        <Axis
          orientation='bottom'
          label='Driver'
          numTicks={formattedData.length}
          tickLabelProps={() => ({
            fill: 'var(--color-foreground)',
            fontSize: 12,
          })}
          labelClassName='fill-foreground'
          tickClassName='fill-foreground'
        />

        {/* Bars with dynamic colors */}
        <BarSeries
          dataKey='Sector Time'
          data={formattedData}
          xAccessor={(d) => d.driver}
          yAccessor={(d) => d.value}
          colorAccessor={(d) => `#${d.color}`}
        />

        {/* Labels on top of bars */}
        <GlyphSeries
          dataKey='Sector Time Labels'
          data={formattedData}
          xAccessor={(d) => d.driver}
          yAccessor={(d) => d.value}
          renderGlyph={({ x, y, datum }) => (
            <text
              x={x}
              y={y - 5} // Position slightly above the bar
              fontSize={10}
              className='fill-foreground'
              textAnchor='middle'
            >
              {datum.value.toFixed(3)}s
            </text>
          )}
        />
      </XYChart>
    </div>
  );
};

const SectorTimes: React.FC<{
  driverSessions: SessionResultsQuery['sessions'][0]['driver_sessions'];
}> = ({ driverSessions }) => {
  return (
    <div className='grid gap-4'>
      <BarChart
        driverSessions={driverSessions}
        sectorKey='sector1'
        title='Sector 1 Times'
      />
      <BarChart
        driverSessions={driverSessions}
        sectorKey='sector2'
        title='Sector 2 Times'
      />
      <BarChart
        driverSessions={driverSessions}
        sectorKey='sector3'
        title='Sector 3 Times'
      />
    </div>
  );
};

export default SectorTimes;
