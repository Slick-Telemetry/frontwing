import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import type {
  DefaultLabelFormatterCallbackParams,
  EChartsOption,
  SeriesOption,
  TooltipComponentFormatterCallbackParams,
} from 'echarts/types/dist/echarts';
import React, { useEffect, useRef } from 'react';

// Register the required components
echarts.use([BarChart, GridComponent, TooltipComponent, CanvasRenderer]);

const margin = { top: 0, right: 30, bottom: 72, left: 60 };

const processedData = Array.from({ length: 20 }, (_, i) => {
  const driver = `${i + 1}`;
  return {
    driver,
    stints: [
      {
        driver,
        startLap: 1,
        endLap: 20,
      },
      {
        driver,
        startLap: 21,
        endLap: 40,
      },
      {
        driver,
        startLap: 41,
        endLap: 60,
      },
    ],
  };
});

interface CustomStintData {
  value: number;
  originalStartLap: number;
  originalEndLap: number;
}

export const StintSkeleton = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chartInstance: echarts.ECharts | undefined;
    if (chartRef.current) {
      chartInstance = echarts.init(chartRef.current);

      const xAxisMax = 60; // Max lap number from original visx config
      const yAxisCategoryData = processedData.map((d) => d.driver);

      const finalSeries: SeriesOption[] = [];

      processedData.forEach((driverData, driverIndex) => {
        let currentLapPosition = 1; // Tracks the end of the previous segment + 1, for gap calculation

        driverData.stints.forEach((stint) => {
          const startLap = stint.startLap;
          const endLap = stint.endLap;
          const stintLength = endLap - startLap + 1;

          // Add a transparent bar for the gap before the current stint
          if (startLap > currentLapPosition) {
            const gapLength = startLap - currentLapPosition;
            finalSeries.push({
              name: `Gap for ${driverData.driver} before Lap ${startLap}`,
              type: 'bar',
              stack: driverData.driver, // Stack bars for the same driver
              itemStyle: {
                color: 'transparent',
                borderColor: 'transparent',
              },
              emphasis: {
                focus: 'none',
                blurScope: 'coordinateSystem',
              },
              data: Array(yAxisCategoryData.length)
                .fill(null)
                .map((_, i) =>
                  i === driverIndex
                    ? ({
                        value: gapLength,
                        originalStartLap: currentLapPosition,
                        originalEndLap: startLap - 1,
                      } as CustomStintData)
                    : 0,
                ),
            });
          }

          // Add the actual stint bar
          finalSeries.push({
            name: `${driverData.driver} Stint ${startLap}-${endLap}`,
            type: 'bar',
            stack: driverData.driver,
            itemStyle: {
              color: '#cccccc50',
              borderColor: '#cccccc50',
              borderRadius: 4,
            },
            data: Array(yAxisCategoryData.length)
              .fill(null)
              .map((_, i) =>
                i === driverIndex
                  ? ({
                      value: stintLength,
                      originalStartLap: startLap,
                      originalEndLap: endLap,
                    } as CustomStintData)
                  : 0,
              ),
          });

          currentLapPosition = endLap + 1; // Update current position for the next stint
        });
      });

      const option: EChartsOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter: function (
            params: TooltipComponentFormatterCallbackParams,
          ) {
            let tooltipContent = '';
            if (Array.isArray(params)) {
              params.forEach((item: DefaultLabelFormatterCallbackParams) => {
                // Filter out gap series from tooltip
                if (item.seriesName && item.seriesName.startsWith('Gap')) {
                  return;
                }
                // Cast item.data to our custom type
                const stintData = item.data as CustomStintData;

                // Ensure it's a data object with our custom properties
                if (
                  typeof stintData === 'object' &&
                  stintData !== null &&
                  stintData.originalStartLap !== undefined
                ) {
                  // Extract driver name from series name, assuming format "DriverX Stint Y-Z"
                  const driverMatch = item.seriesName
                    ? item.seriesName.match(/(.*?) Stint/)
                    : null;
                  const driverName = driverMatch
                    ? driverMatch[1]
                    : 'Unknown Driver';

                  tooltipContent += `Driver: <b>${driverName}</b><br/>`;
                  tooltipContent += `Lap Range: <b>${stintData.originalStartLap} - ${stintData.originalEndLap}</b><br/>`;
                }
              });
            }
            return tooltipContent;
          },
        },
        xAxis: {
          type: 'value',
          name: 'Lap Number',
          min: 0,
          max: xAxisMax,
          axisLabel: {
            color: 'var(--color-foreground)',
          },
          nameTextStyle: {
            color: 'var(--color-foreground)',
          },
          axisLine: {
            lineStyle: {
              color: 'var(--color-foreground)',
            },
          },
          axisTick: {
            lineStyle: {
              color: 'var(--color-foreground)',
            },
          },
        },
        yAxis: {
          type: 'category',
          data: yAxisCategoryData,
          name: 'Drivers',
          axisLabel: {
            color: 'var(--color-foreground)',
          },
          nameTextStyle: {
            color: 'var(--color-foreground)',
          },
          axisLine: {
            lineStyle: {
              color: 'var(--color-foreground)',
            },
          },
          axisTick: {
            show: false, // hideTicks
          },
        },
        grid: {
          left: margin.left,
          right: margin.right,
          bottom: margin.bottom,
          top: margin.top,
          containLabel: false, // Similar to visx behavior, where margins are outside labels
        },
        series: finalSeries,
      };

      chartInstance.setOption(option);
    }

    const handleResize = () => {
      chartInstance?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance?.dispose();
    };
  }, []);

  return (
    <div className='h-[600px] animate-pulse rounded border p-2'>
      <h3 className='text-center text-lg font-semibold'>Tyre Analysis</h3>
      <div
        id='stintTyresChart'
        ref={chartRef}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
