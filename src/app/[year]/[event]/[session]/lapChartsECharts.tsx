'use client';

import { LineChart, LineSeriesOption } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import React, { useEffect, useRef } from 'react';

echarts.use([LineChart, TooltipComponent, GridComponent, CanvasRenderer]);

import { QueryResult } from '@apollo/client';
import type { EChartsOption } from 'echarts';

import {
  GetSessionLapTimesQuery,
  GetSessionLapTimesQueryVariables,
} from '@/generated/types';

import { LineChartSkeleton } from './LineChartSkeleton';

interface ChartProps {
  title: string;
  loading: boolean;
  children: React.ReactNode;
}

const ChartContainer: React.FC<ChartProps> = ({ title, loading, children }) => {
  if (loading) {
    return <LineChartSkeleton title={`Loading ${title}...`} />;
  }
  return (
    <div className='rounded border p-2'>
      {title}
      <div className='h-[500px]'>{children}</div>
    </div>
  );
};

export const DeltaToWinnerECharts = ({
  data,
  loading,
}: QueryResult<GetSessionLapTimesQuery, GetSessionLapTimesQueryVariables>) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const driverData = data?.sessions[0].driver_sessions || [];
      const firstPlaceLaps = driverData[0]?.laps;

      // Create a map for driver abbreviation to constructor color
      const driverColorMap = new Map<string, string>();
      driverData.forEach((driver) => {
        if (driver.driver?.abbreviation) {
          driverColorMap.set(
            driver.driver.abbreviation,
            `#${driver.constructorByConstructorId?.color || 'cccccc'}`,
          );
        }
      });

      const series = driverData.map((driver) => {
        const color = `#${driver.constructorByConstructorId?.color || 'cccccc'}`;
        const lapData = driver.laps
          .filter((lap) => !!lap.lap_number)
          .map((lap, i) => {
            return [
              lap.lap_number,
              (Number(firstPlaceLaps[i]?.session_time || 0) -
                Number(lap.session_time || 0)) /
                1000,
            ];
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
                  tooltipContent += `<div><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${driverColor};"></span><span style="color:${driverColor}">${item.seriesName}</span>: ${(item.value as number[])[1]?.toFixed(3)}</div>`;
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
        },
        yAxis: {
          type: 'value',
          name: 'Times',
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
    <ChartContainer
      title='Delta to Fastest Lap (Practice) or Winner'
      loading={loading}
    >
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </ChartContainer>
  );
};

export const LapTimesECharts = ({
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
    <ChartContainer title='Raw Lap Times' loading={loading}>
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </ChartContainer>
  );
};
