'use client';

import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

import { DriverTimes } from './sectorTimes';

interface FastestLapEChartsProps {
  times: DriverTimes[];
}

interface EChartsCallbackParams {
  name: string;
  value: number | string | number[]; // Value of the data item
  seriesName?: string;
  // Data item itself (e.g., for bar series, it's {value: ..., itemStyle: ...})
  data: { value: number | null; itemStyle?: { color: string } };
  color?: string;
}

const FastestLapECharts: React.FC<FastestLapEChartsProps> = ({ times }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const driverTimes = React.useMemo(
    () =>
      [...times]
        .filter((d) => d.fastestLap.lap_time !== null)
        .sort(
          (a, b) =>
            Number(a.fastestLap.lap_time || 0) -
            Number(b.fastestLap.lap_time || 0),
        ),
    [times],
  );

  useEffect(() => {
    let chartInstance: echarts.ECharts | undefined;
    if (chartRef.current) {
      chartInstance = echarts.init(chartRef.current, 'dark');

      const abbreviations = driverTimes.map((d) => d.abbreviation);
      const lapTimes = driverTimes.map((d) => d.fastestLap.lap_time);
      const potentialBests = driverTimes.map((d) =>
        d.fastestLap.potential_best !== 0
          ? Number(d.fastestLap.potential_best)
          : null,
      );
      const colors = driverTimes.map((d) => `#${d.color}`);

      const option: echarts.EChartsOption = {
        title: {
          text: 'Fastest Lap Times',
          subtext: '{diamond|} = Potential is total of best sector times',
          subtextStyle: {
            rich: {
              diamond: {
                backgroundColor: {
                  image:
                    'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,0 100,50 50,100 0,50" fill="%23FFD700"/></svg>',
                },
                width: 12,
                height: 12,
                align: 'center',
                verticalAlign: 'middle',
              },
            },
          },
        },
        // @ts-expect-error: ECharts tooltip formatter parameters are complex and difficult to type precisely.
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter: (params: EChartsCallbackParams[]) => {
            const driverData = driverTimes.find(
              (d) => d.abbreviation === (params[0]?.name || ''),
            );
            if (!driverData) return '';

            return `
              <div style="display: grid; grid-template-columns: auto auto auto; gap: 5px; font-weight: normal;">
                <div style="grid-column: 1 / span 3; text-align: center; font-weight: bold;">
                  ${driverData.abbreviation}
                </div>
                <div style="text-align: center;"></div>
                <div style="text-align: center;">Fastest Lap</div>
                <div style="text-align: center;">Best Sectors</div>

                <div style="text-align: center;">S1</div>
                <div style="text-align: center;">
                  ${
                    driverData.fastestLap.sector1.time !== null
                      ? `${driverData.fastestLap.sector1.time}s`
                      : 'N/A'
                  }
                </div>
                <div style="text-align: center;">
                  ${
                    driverData.sectors.sector1.time !== null
                      ? `${driverData.sectors.sector1.time}s`
                      : 'N/A'
                  }
                </div>

                <div style="text-align: center;">S2</div>
                <div style="text-align: center;">
                  ${
                    driverData.fastestLap.sector2.time !== null
                      ? `${driverData.fastestLap.sector2.time}s`
                      : 'N/A'
                  }
                </div>
                <div style="text-align: center;">
                  ${
                    driverData.sectors.sector2.time !== null
                      ? `${driverData.sectors.sector2.time}s`
                      : 'N/A'
                  }
                </div>

                <div style="text-align: center;">S3</div>
                <div style="text-align: center;">
                  ${
                    driverData.fastestLap.sector3.time !== null
                      ? `${driverData.fastestLap.sector3.time}s`
                      : 'N/A'
                  }
                </div>
                <div style="text-align: center;">
                  ${
                    driverData.sectors.sector3.time !== null
                      ? `${driverData.sectors.sector3.time}s`
                      : 'N/A'
                  }
                </div>

                <div style="text-align: center;">Lap</div>
                <div style="text-align: center;">
                  ${
                    driverData.fastestLap.lap_time !== null
                      ? `${driverData.fastestLap.lap_time}s`
                      : 'N/A'
                  }
                </div>
                <div style="text-align: center;">
                  ${
                    driverData.fastestLap.potential_best
                      ? `${driverData.fastestLap.potential_best}s`
                      : 'N/A'
                  }
                </div>
              </div>
            `;
          },
        },
        xAxis: {
          type: 'category',
          name: 'Drivers',
          nameLocation: 'middle',
          nameGap: 25,
          data: abbreviations,
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: 'value',
          name: 'Time (s)',
          nameLocation: 'middle',
          nameGap: 40,
          axisLabel: {
            formatter: '{value}s',
          },
          min: function (value) {
            return Math.floor(value.min);
          },
          max: function (value) {
            return Math.floor(value.max);
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: 'rgba(255,255,255,0.3)',
            },
          },
        },
        series: [
          {
            name: 'Lap Times',
            type: 'bar',
            data: lapTimes.map((value, index) => ({
              value: value,
              itemStyle: {
                color: colors[index],
              },
            })),
            label: {
              show: true,
              position: 'top',
              // eslint-disable-next-line
              formatter: (params: any) => `${params.data.value.toFixed(3)}s`,
            },
          },
          {
            name: 'Potential Best',
            type: 'scatter',
            data: potentialBests.map((value) => ({
              value: value,
              itemStyle: {
                color: '#FFD700',
              },
            })),
            itemStyle: {
              color: '#FFD700',
            },
            z: 2,
            symbol: 'diamond',
            tooltip: {
              show: false, // Hide tooltip for this series as it's handled by the bar series
            },
          },
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        backgroundColor: 'transparent',
      };

      chartInstance.setOption(option);
    }

    return () => {
      chartInstance?.dispose();
    };
  }, [driverTimes]);

  return <div ref={chartRef} style={{ width: '100%', height: '500px' }} />;
};

export default FastestLapECharts;
