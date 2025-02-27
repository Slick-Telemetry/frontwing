'use client';

import { useQuery } from '@apollo/client';
import { LegendItem, LegendLabel } from '@visx/legend';
import { ParentSize } from '@visx/responsive';
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  darkTheme,
  Tooltip,
  XYChart,
} from '@visx/xychart';
import clsx from 'clsx';
import { useMemo, useState } from 'react';

import { GET_DRIVER_STANDINGS } from '@/lib/queries';
import { bgGradient } from '@/lib/utils';

import {
  GetStandingsQuery,
  GetStandingsQueryVariables,
} from '@/generated/types';

type DriverStanding = GetStandingsQuery['drivers'][0]['driver_standings'][0];

export interface ChartDataFormat extends DriverStanding {
  driver?: string | null;
  abbreviation?: string | null;
  color?: string | null;
  constructor?: string | null;
}

export interface DriverStandings {
  [key: string]: ChartDataFormat[];
}

const legendGlyphSize = 12;

export const Standings = () => {
  const { data, loading, error } = useQuery<
    GetStandingsQuery,
    GetStandingsQueryVariables
  >(GET_DRIVER_STANDINGS, { variables: { season: 2024 } });

  if (loading) return <p>Loading...</p>;
  if (error || !data?.drivers) return <p>Error...</p>;

  const drivers = data.drivers.filter((driver) => !!driver);

  const standings: Record<string, ChartDataFormat[]> = drivers.reduce(
    (acc, driver) => {
      acc[driver?.abbreviation || ''] = driver.driver_standings.map((ds) => ({
        ...ds,
        driver: driver?.full_name,
        abbreviation: driver?.abbreviation,
        color: driver?.driver_sessions?.[0]?.constructorByConstructorId?.color,
        constructor:
          driver?.driver_sessions?.[0]?.constructorByConstructorId?.name,
      }));
      return acc;
    },
    {} as DriverStandings,
  );

  return (
    <div className='min-h-svh'>
      <CumulativeDriverStandings standingsByDriver={standings} />
    </div>
  );
};

// const legendGlyphSize = 15;
const accessors = {
  xAccessor: (d: ChartDataFormat) => d?.round || 0,
  yAccessor: (d: ChartDataFormat) => d?.points || 0,
};
const strokePatterns = ['0', '1 1', '3 3', '5 5'];

export const CumulativeDriverStandings = ({
  standingsByDriver,
}: {
  standingsByDriver: DriverStandings;
}) => {
  const [hiddenDrivers, setHiddenDrivers] = useState<Record<string, boolean>>(
    {},
  );
  const [hiddenConstructors, setHiddenConstructors] = useState<
    Record<string, boolean>
  >({});

  // Toggles a driver, overriding the constructor state if necessary
  const toggleDriverVisibility = (driver: string, constructor: string) => {
    setHiddenDrivers((prev) => {
      const newState = { ...prev, [driver]: !prev[driver] };

      // If toggling the driver on, ensure the constructor is visible
      if (!newState[driver]) {
        setHiddenConstructors((prev) => ({ ...prev, [constructor]: false }));
      }

      return newState;
    });
  };

  // Toggles all drivers for a constructor
  const toggleConstructorVisibility = (
    constructor: string,
    drivers: string[],
  ) => {
    setHiddenConstructors((prev) => {
      const newState = { ...prev, [constructor]: !prev[constructor] };

      // If hiding the constructor, hide all its drivers
      if (newState[constructor]) {
        setHiddenDrivers((prevDrivers) => {
          const updatedDrivers = { ...prevDrivers };
          drivers.forEach((driver) => (updatedDrivers[driver] = true));
          return updatedDrivers;
        });
      } else {
        // If showing the constructor, show all drivers unless explicitly hidden before
        setHiddenDrivers((prevDrivers) => {
          const updatedDrivers = { ...prevDrivers };
          drivers.forEach((driver) => (updatedDrivers[driver] = false));
          return updatedDrivers;
        });
      }

      return newState;
    });
  };

  const constructorStrokeMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    Object.values(standingsByDriver).forEach((driverData) => {
      const constructor = driverData[0].constructor || 'Unknown';
      if (!map[constructor]) map[constructor] = [];
      const patternIndex = map[constructor].length % strokePatterns.length;
      map[constructor].push(strokePatterns[patternIndex]);
    });
    return map;
  }, [standingsByDriver]);

  return (
    <div className='container grid items-center gap-4 lg:grid-cols-4'>
      <div className='h-full lg:col-span-3'>
        <ParentSize className='graph-container' debounceTime={10}>
          {({ height }) => (
            <XYChart
              theme={darkTheme}
              height={height}
              xScale={{ type: 'band' }}
              yScale={{ type: 'linear' }}
            >
              <AnimatedAxis
                orientation='bottom'
                numTicks={Object.values(standingsByDriver)[0]?.length || 0}
                label='Round'
              />
              <AnimatedAxis
                orientation='right'
                label='Points'
                labelOffset={18}
              />
              <AnimatedGrid strokeDasharray='2 6' animationTrajectory='min' />

              {Object.keys(standingsByDriver).map((driver) => {
                if (hiddenDrivers[driver]) return null; // Hide driver if toggled off
                const constructor =
                  standingsByDriver[driver][0].constructor || 'Unknown';

                if (hiddenConstructors[constructor]) return null; // Hide all drivers in constructor
                const driverIndex = Object.values(standingsByDriver)
                  .map((d) => d[0].constructor)
                  .filter((c) => c === constructor)
                  .indexOf(constructor);
                return (
                  <AnimatedLineSeries
                    key={driver}
                    dataKey={driver}
                    data={standingsByDriver[driver]}
                    colorAccessor={() =>
                      `#${standingsByDriver[driver][0].color || '000000'}`
                    }
                    strokeDasharray={
                      constructorStrokeMap[constructor][driverIndex] || '3 3'
                    } // Assign stroke pattern
                    {...accessors}
                  />
                );
              })}

              <Tooltip
                snapTooltipToDatumX
                snapTooltipToDatumY
                showHorizontalCrosshair
                showVerticalCrosshair
                showDatumGlyph
                // showSeriesGlyphs
                renderGlyph={({ datum }: { datum: ChartDataFormat }) => {
                  return (
                    <svg width={10} height={10} className='overflow-visible'>
                      <circle
                        cx={5}
                        cy={5}
                        r={4}
                        fill={`#${datum.color}`}
                        stroke='white'
                        strokeWidth={1}
                        transform='translate(-5, -5)'
                      />
                    </svg>
                  );
                }}
                renderTooltip={({ tooltipData }) => {
                  if (!tooltipData) return;
                  return (
                    <div>
                      {/* round */}
                      <p className='text-lg'>
                        {tooltipData.nearestDatum &&
                          `Round: ${accessors.xAccessor(tooltipData.nearestDatum.datum as ChartDataFormat)}`}
                      </p>
                      {/* driver and points */}
                      {tooltipData.datumByKey &&
                        Object.keys(tooltipData?.datumByKey)
                          .sort(
                            (a, b) =>
                              Number(
                                accessors.yAccessor(
                                  tooltipData?.datumByKey[b]
                                    .datum as ChartDataFormat,
                                ),
                              ) -
                              Number(
                                accessors.yAccessor(
                                  tooltipData?.datumByKey[a]
                                    .datum as ChartDataFormat,
                                ),
                              ),
                          ) // sort by points
                          .map((driver) => {
                            const result = tooltipData?.datumByKey[driver]
                              .datum as ChartDataFormat;
                            const active =
                              tooltipData?.nearestDatum?.key === driver;
                            return (
                              <div
                                key={driver}
                                className={clsx(
                                  'flex justify-between border-y border-gray-700 py-0.5',
                                  !active && 'font-light opacity-80',
                                  active && 'border-white font-black',
                                )}
                              >
                                <em
                                  style={{
                                    color: `#${result.color}`,
                                  }}
                                >
                                  {driver}
                                </em>{' '}
                                {`${accessors.yAccessor(result)}`}
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

      <Legend
        standingsByDriver={standingsByDriver}
        toggleDriverVisibility={toggleDriverVisibility}
        toggleConstructorVisibility={toggleConstructorVisibility}
        hiddenDrivers={hiddenDrivers}
      />
    </div>
  );
};

const Legend = ({
  standingsByDriver,
  toggleDriverVisibility,
  toggleConstructorVisibility,
  hiddenDrivers,
}: {
  standingsByDriver: DriverStandings;
  toggleDriverVisibility: (driver: string, constructor: string) => void;
  toggleConstructorVisibility: (constructor: string, drivers: string[]) => void;
  hiddenDrivers: Record<string, boolean>;
}) => {
  const groupedDrivers = Object.values(standingsByDriver)
    .map((driverData) => driverData[0]) // Take first entry per driver
    .reduce(
      (acc, driver) => {
        const constructor = driver.constructor || 'Unknown';
        if (!acc[constructor]) acc[constructor] = [];
        acc[constructor].push(driver);
        return acc;
      },
      {} as Record<string, ChartDataFormat[]>,
    );

  return (
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-2'>
      {Object.entries(groupedDrivers).map(([constructor, drivers]) => (
        <div
          key={constructor}
          className='flex justify-between rounded border border-gray-700 p-2'
          style={{ background: bgGradient(drivers[0].color || '000000') }}
        >
          {/* Constructor Name as a Header */}
          <span
            className='font-bold text-white'
            onClick={() =>
              toggleConstructorVisibility(
                constructor,
                drivers.map((d) => d?.abbreviation || ''),
              )
            }
          >
            {constructor}
          </span>
          <div className='flex'>
            {drivers.map((driver, i) => (
              <LegendItem
                key={`legend-${driver.abbreviation}-${i}`}
                margin='0 5px'
                onClick={() =>
                  toggleDriverVisibility(
                    driver?.abbreviation || '',
                    constructor,
                  )
                }
                style={{
                  opacity: hiddenDrivers[driver?.abbreviation || ''] ? 0.3 : 1, // Dim hidden drivers
                  textDecoration: hiddenDrivers[driver?.abbreviation || '']
                    ? 'line-through'
                    : 'none', // Strikethrough
                  cursor: 'pointer',
                }}
              >
                <svg width={legendGlyphSize} height={legendGlyphSize}>
                  <circle
                    cy={legendGlyphSize / 2}
                    cx={legendGlyphSize / 2}
                    r={legendGlyphSize / 2}
                    fill={`#${driver.color || 'ccc'}`}
                    width={legendGlyphSize}
                    height={legendGlyphSize}
                    // strokeDasharray={`${i * 2} ${i * 2}`}
                  />
                </svg>
                <LegendLabel align='left' margin='0 0 0 4px'>
                  {driver.abbreviation}
                </LegendLabel>
              </LegendItem>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
