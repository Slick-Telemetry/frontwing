'use client';

import { useQuery } from '@apollo/client';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

import { GET_SESSION_LAP_TIMES } from '@/lib/queries';
import { eventLocationDecode } from '@/lib/utils';

import { ServerPageError } from '@/components/ServerError';

import {
  GetSessionLapTimesQuery,
  GetSessionLapTimesQueryVariables,
  Session_Name_Choices_Enum,
} from '@/generated/types';

echarts.use([LineChart, TooltipComponent, GridComponent, CanvasRenderer]);

import { QueryResult } from '@apollo/client';
import type { EChartsOption } from 'echarts';

import { Loader } from '@/components/Loader';

interface ChartProps {
  loading: boolean;
  children: React.ReactNode;
}

const ChartContainer: React.FC<ChartProps> = ({ loading, children }) => {
  if (loading) {
    return <Loader />;
  }
  return (
    <div className='rounded border p-2'>
      <div className='h-[500px]'>{children}</div>
    </div>
  );
};

const DeltaToWinnerChart = ({
  data,
  loading,
}: QueryResult<GetSessionLapTimesQuery, GetSessionLapTimesQueryVariables>) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const driverData = data?.sessions[0].driver_sessions || [];

      // Create a map for driver abbreviation to constructor color and prepare lap data
      const driverColorMap = new Map<string, string>();
      const lapTimesByDriver = new Map<string, number[]>();
      const driverFinalPositions = new Map<string, number>();

      // First pass: collect all lap times and create color map
      driverData.forEach((driver) => {
        if (driver.driver?.abbreviation) {
          // Set color mapping
          driverColorMap.set(
            driver.driver.abbreviation,
            `#${driver.constructorByConstructorId?.color || 'cccccc'}`,
          );

          // Collect lap times
          const validLaps = driver.laps
            .filter((lap) => !!lap.lap_number && lap.lap_time !== null)
            .map((lap) => Number(lap.lap_time));
          lapTimesByDriver.set(driver.driver.abbreviation, validLaps);

          // Store final position based on their completion time
          const finalTime = driver.laps.reduce(
            (sum, lap) => sum + Number(lap.lap_time || 0),
            0,
          );
          driverFinalPositions.set(
            driver.driver.abbreviation,
            finalTime > 0 ? finalTime : Number.POSITIVE_INFINITY,
          );
        }
      });

      // Calculate median lap times for each lap number
      const maxLaps = Math.max(
        ...Array.from(lapTimesByDriver.values()).map((laps) => laps.length),
      );
      const medianLapTimes: number[] = [];

      for (let lap = 0; lap < maxLaps; lap++) {
        const lapTimes = Array.from(lapTimesByDriver.values())
          .map((times) => times[lap])
          .filter((time) => time !== undefined && !isNaN(time));

        if (lapTimes.length > 0) {
          const sortedTimes = lapTimes.sort((a, b) => a - b);
          const mid = Math.floor(sortedTimes.length / 2);
          medianLapTimes[lap] =
            sortedTimes.length % 2 === 0
              ? (sortedTimes[mid - 1] + sortedTimes[mid]) / 2
              : sortedTimes[mid];
        }
      }

      // Calculate cumulative medians
      const cumulativeMedians = medianLapTimes.reduce(
        (acc: number[], curr: number) => {
          const prev = acc.length > 0 ? acc[acc.length - 1] : 0;
          acc.push(prev + curr);
          return acc;
        },
        [],
      );

      // Sort drivers by final position
      const sortedDrivers = Array.from(driverFinalPositions.entries())
        .sort(([, posA], [, posB]) => posA - posB)
        .map(([driver]) => driver);

      // Create series data with calculated offsets
      const series = sortedDrivers.map((driverAbbr, index) => {
        const color = driverColorMap.get(driverAbbr) || '#cccccc';
        const driverLapTimes = lapTimesByDriver.get(driverAbbr) || [];

        // Calculate cumulative times for this driver
        const cumulativeTimes = driverLapTimes.reduce(
          (acc: number[], curr: number) => {
            const prev = acc.length > 0 ? acc[acc.length - 1] : 0;
            acc.push(prev + curr);
            return acc;
          },
          [],
        );

        // Calculate delta to median pace
        const lapData = cumulativeTimes.map((time, lap) => {
          const medianTime = cumulativeMedians[lap] || 0;
          return [lap + 1, -(time - medianTime) / 1000]; // Convert to seconds
        });

        // Determine line style based on index
        const lineStyles = ['-', '-.', '--', ':', '-', '-'];
        const lineStyle = lineStyles[index % lineStyles.length];

        const position = driverFinalPositions.get(driverAbbr);
        const positionStr =
          position === Number.POSITIVE_INFINITY ? 'DNF ' : `${position}. `;

        return {
          name: `${positionStr}${driverAbbr}`,
          type: 'line',
          smooth: false,
          showSymbol: false,
          lineStyle: {
            color: color,
            width: 2,
            type: lineStyle as 'solid' | 'dashed' | 'dotted',
          },
          itemStyle: {
            color: color,
          },
          data: lapData,
        } as LineSeriesOption;
      });

      const option: EChartsOption = {
        title: {
          text: 'Delta to Fastest Lap (Practice) or Winner',
          left: 'center',
          top: 'top',
          textStyle: {
            color: '#fff',
            fontSize: 16,
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' },
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#333',
          borderWidth: 1,
          textStyle: {
            color: '#fff',
          },
          position: (
            pos: number[],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            params: any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dom: any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            rect: any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            size: any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ): any => {
            const chartHeight = rect?.height || 0;
            const tooltipHeight = size?.contentSize?.[1] || 0;

            let top = pos[1] + 10;

            const minTop = 10;
            const maxTop = chartHeight - tooltipHeight - 10;

            top = Math.max(minTop, Math.min(top, maxTop));

            return {
              left: pos[0] + 20,
              top: top,
            };
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter: function (params: any) {
            let tooltipContent = '';
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const typedParams = params as any[];
            if (
              typedParams &&
              typedParams.length > 0 &&
              typedParams[0]?.value
            ) {
              tooltipContent = `<div class='font-bold text-white'>Lap: ${typedParams[0].value[0]}</div>`;

              typedParams.sort((a, b) => {
                return (b.value as number[])[1] - (a.value as number[])[1];
              });
              typedParams.forEach((item) => {
                if (item.value) {
                  const seriesName = item.seriesName.split(' ');
                  const driverAbbr = seriesName[seriesName.length - 1];
                  const driverColor =
                    driverColorMap.get(driverAbbr) || '#FFFFFF';
                  const deltaTime = (item.value as number[])[1];
                  const deltaStr =
                    deltaTime > 0
                      ? `+${deltaTime.toFixed(3)}s`
                      : `${deltaTime.toFixed(3)}s`;
                  tooltipContent += `<div><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${driverColor};"></span><span style="color:${driverColor}">${driverAbbr}</span>: ${deltaStr}</div>`;
                }
              });
            }
            return tooltipContent;
          },
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '5%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          name: 'Lap Number',
          nameLocation: 'middle',
          nameGap: 30,
          axisLabel: {
            formatter: '{value}',
          },
          max: 'dataMax',
          interval: 2,
          splitLine: {
            lineStyle: {
              type: 'dashed',
            },
          },
        },
        yAxis: {
          type: 'value',
          name: 'Time offset from Average Pace (s)',
          nameLocation: 'middle',
          nameGap: 40,
          axisLabel: {
            formatter: '{value}s',
          },
        },
        // @ts-expect-error: Suppress complex type error for series for now
        series: series,
      };

      chart.setOption(option);

      return () => {
        chart.dispose();
      };
    }
  }, [data, loading]);

  return (
    <ChartContainer loading={loading}>
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </ChartContainer>
  );
};

const LapTimesChart = ({
  data,
  loading,
}: QueryResult<GetSessionLapTimesQuery, GetSessionLapTimesQueryVariables>) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const driverSessions = data?.sessions[0]?.driver_sessions || [];

      // Create a map for driver abbreviation to constructor color
      const driverColorMap = new Map<string, string>();
      driverSessions.forEach((driver) => {
        if (driver.driver?.abbreviation) {
          driverColorMap.set(
            driver.driver.abbreviation,
            `#${driver.constructorByConstructorId?.color || 'cccccc'}`,
          );
        }
      });

      const baselineLap = driverSessions
        .find(
          (driverSession) =>
            driverSession.laps &&
            driverSession.laps.some((lap) => lap.lap_time !== null),
        )
        ?.laps?.find((lap) => lap.lap_time !== null)?.lap_time;

      if (
        baselineLap === null ||
        baselineLap === undefined ||
        driverSessions.length === 0
      ) {
        chart.setOption({
          title: {
            text: 'No completed laps found to display raw lap times.',
            left: 'center',
            top: 'center',
          },
        });
        return;
      }

      const series = driverSessions.map((driver) => {
        const color = `#${driver.constructorByConstructorId?.color || 'cccccc'}`;
        const lapData = driver.laps
          .filter((lap) => !!lap.lap_number && lap.lap_time !== null)
          .map((lap) => {
            return [lap.lap_number, Number(lap.lap_time)];
          });

        return {
          name: driver.driver?.abbreviation,
          type: 'line',
          smooth: true,
          showSymbol: false,
          lineStyle: {
            color: color,
            width: 2,
          },
          itemStyle: {
            color: color,
          },
          data: lapData,
        } as LineSeriesOption;
      });

      const option: EChartsOption = {
        title: {
          text: 'Lap Times',
          left: 'center',
          top: 'top',
          textStyle: {
            color: '#fff',
            fontSize: 16,
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' },
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#333',
          borderWidth: 1,
          textStyle: {
            color: '#fff',
          },
          position: (
            pos: number[],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            params: any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dom: any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            rect: any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            size: any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ): any => {
            const chartHeight = rect?.height || 0;
            const tooltipHeight = size?.contentSize?.[1] || 0;

            let top = pos[1] + 10;

            const minTop = 10;
            const maxTop = chartHeight - tooltipHeight - 10;

            top = Math.max(minTop, Math.min(top, maxTop));

            return {
              left: pos[0] + 20,
              top: top,
            };
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter: function (params: any) {
            let tooltipContent = '';
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const typedParams = params as any[];
            if (
              typedParams &&
              typedParams.length > 0 &&
              typedParams[0]?.value
            ) {
              tooltipContent = `<div class='font-bold text-white'>Lap: ${typedParams[0].value[0]}</div>`;

              typedParams.sort((a, b) => {
                return (b.value as number[])[1] - (a.value as number[])[1];
              });
              typedParams.forEach((item) => {
                const driverAbbr = item.seriesName;
                const driverColor = driverColorMap.get(driverAbbr) || '#FFFFFF';
                if (item.value) {
                  const lapTimeMs = item.value[1] as number;
                  const minutes = Math.floor(lapTimeMs / 60000);
                  const seconds = Math.floor((lapTimeMs % 60000) / 1000);
                  const milliseconds = lapTimeMs % 1000;
                  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;

                  tooltipContent += `<div><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${driverColor};"></span><span style="color:${driverColor}">${item.seriesName}</span>: ${formattedTime}</div>`;
                }
              });
            }
            return tooltipContent;
          },
        },
        grid: {
          left: '2%',
          right: '5%',
          bottom: '5%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          name: 'Lap Number',
          nameLocation: 'middle',
          nameGap: 30,
          axisLabel: {
            formatter: '{value}',
          },
          max: 'dataMax',
        },
        yAxis: {
          type: 'time',
          name: 'Times',
          nameLocation: 'middle',
          nameGap: 40,
          min: 'dataMin',
          max: 'dataMax',
        },
        // @ts-expect-error: Suppress complex type error for series for now
        series: series,
      };

      chart.setOption(option);

      return () => {
        chart.dispose();
      };
    }
  }, [data, loading]);

  return (
    <ChartContainer loading={loading}>
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </ChartContainer>
  );
};

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
      {session && competition && <DeltaToWinnerChart {...queryState} />}
      <LapTimesChart {...queryState} />
    </div>
  );
};

export default LapTimeContainer;
