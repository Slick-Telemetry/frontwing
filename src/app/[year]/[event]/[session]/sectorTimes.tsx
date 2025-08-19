'use client';

import { useQuery } from '@apollo/client';
import { BarChart } from 'echarts/charts';
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsOption } from 'echarts/types/dist/echarts';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

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

// Register the required components
echarts.use([
  BarChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  CanvasRenderer,
]);

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
        ⭐ = Potential is total of best sector times
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
    <div className='grid gap-4'>
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
          <SectorChartECharts times={driverTimes} sectorKey='sector1' />
          <SectorChartECharts times={driverTimes} sectorKey='sector2' />
          <SectorChartECharts times={driverTimes} sectorKey='sector3' />
        </>
      )}
    </div>
  );
};

const SectorChartECharts = ({
  sectorKey,
  times,
}: {
  sectorKey: keyof DriverSectors;
  times: DriverTimes[];
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    let chartInstance: echarts.ECharts | undefined;
    if (chartRef.current && driverTimes.length > 0) {
      chartInstance = echarts.init(chartRef.current, 'dark');

      const abbreviations = driverTimes.map((d) => d.abbreviation);
      const sectorTimes = driverTimes.map((d) => d.sectors[sectorKey].time);
      const lapNumbers = driverTimes.map((d) => d.sectors[sectorKey].lap);
      const colors = driverTimes.map((d) => `#${d.color}`);

      const option: EChartsOption = {
        backgroundColor: 'transparent',
        title: {
          text:
            sectorKey === 'sector1'
              ? 'Sector 1'
              : sectorKey === 'sector2'
                ? 'Sector 2'
                : 'Sector 3',
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          confine: true,
          backgroundColor: 'transparent',
          borderWidth: 0,
          formatter: (params: unknown) => {
            if (!Array.isArray(params) || !params.length) return '';

            const param = params[0] as { dataIndex: number };
            const hoveredDriverIndex = param.dataIndex;

            let tableHtml = `
              <div style="border: 2px solid #c23531; border-radius: 4px; background-color: #282c34; padding: 10px; box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);">
                <table style="width: 100%; border-collapse: collapse; color: #fff; font-family: 'Arial', sans-serif;">
                  <thead>
                    <tr>
                      <th style="text-align: left; padding: 5px; font-weight: normal;"></th>
                      <th style="text-align: left; padding: 5px; font-weight: normal;">Time</th>
                      <th style="text-align: left; padding: 5px; font-weight: normal;">Lap</th>
                    </tr>
                  </thead>
                  <tbody>
            `;

            driverTimes.forEach((driver, index) => {
              const isHovered = index === hoveredDriverIndex;
              const style = isHovered
                ? 'background-color: rgba(255, 255, 255, 0.2);'
                : '';
              const time = driver.sectors[sectorKey].time;
              const lap = driver.sectors[sectorKey].lap;

              tableHtml += `
                <tr style="${style}">
                  <td style="font-weight: bold; text-align: left; padding: 5px;">${driver.abbreviation}</td>
                  <td style="text-align: left; padding: 5px;">${
                    time ? `${time.toFixed(3)}s` : 'N/A'
                  }</td>
                  <td style="text-align: left; padding: 5px;">${lap || 'N/A'}</td>
                </tr>
              `;
            });

            tableHtml += `
                  </tbody>
                </table>
              </div>
            `;

            return tableHtml;
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          top: '15%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: abbreviations,
          axisLabel: {
            color: '#fff',
            fontSize: 12,
          },
          axisTick: {
            alignWithLabel: true,
          },
          name: 'Driver',
          nameLocation: 'middle',
          nameGap: 35,
          nameTextStyle: {
            color: '#fff',
            fontSize: 14,
          },
        },
        yAxis: {
          type: 'value',
          name: 'Time (s)',
          nameLocation: 'middle',
          nameGap: 40,
          min: 'dataMin',
          nameTextStyle: {
            color: '#fff',
            fontSize: 14,
          },
          axisLabel: {
            color: '#fff',
            formatter: '{value}s',
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
            name: `Sector ${sectorKey.slice(-1)}`,
            type: 'bar',
            data: sectorTimes.map((value, index) => ({
              value: value,
              itemStyle: {
                color: colors[index],
              },
            })),
            label: {
              show: true,
              position: 'top',
              formatter: (params: unknown) => {
                const param = params as { dataIndex: number; value: number };
                const driverIndex = param.dataIndex;
                const lap = lapNumbers[driverIndex];
                return `Lap ${lap}\n${Number(param.value).toFixed(3)}s`;
              },
              color: '#fff',
              fontSize: 10,
            },
            barWidth: '60%',
          },
        ],
      };

      chartInstance.setOption(option);

      const handleResize = () => {
        chartInstance?.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance?.dispose();
      };
    }
  }, [driverTimes, sectorKey]);

  if (driverTimes.length === 0) {
    return (
      <div className='rounded border p-2'>
        {titles[sectorKey]}
        <div className='flex h-[500px] items-center justify-center text-gray-500'>
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className='rounded border p-2'>
      <div ref={chartRef} style={{ width: '100%', height: '500px' }} />
    </div>
  );
};

export default SectorTimes;
