'use client';

import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import React, { useEffect, useRef } from 'react';

echarts.use([LineChart, TooltipComponent, GridComponent, CanvasRenderer]);

const NUM_LINES = 10;
const NUM_LAPS = 50;

function generateRandomLineData() {
  return Array.from({ length: NUM_LAPS }, (_, i) => ({
    lap: i + 1,
    value: Math.random() * 100 - i * 10, // Random lap time
  }));
}

export const LineChartSkeleton = ({ title }: { title?: React.ReactNode }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const lines = Array.from({ length: NUM_LINES }, () =>
        generateRandomLineData(),
      );

      const series = lines.map((data, i) => ({
        name: `skeleton-${i}`,
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: '#cccccc50',
          width: 2,
        },
        itemStyle: {
          color: '#cccccc50',
        },
        data: data.map((d) => [d.lap, d.value]),
      }));

      const option = {
        grid: {
          left: '2%',
          right: '2%',
          bottom: '5%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          max: NUM_LAPS,
          interval: 2,
          splitLine: {
            lineStyle: {
              type: 'dashed',
            },
          },
        },
        yAxis: {
          type: 'value',
        },
        series: series,
      };

      chart.setOption(option);

      return () => {
        chart.dispose();
      };
    }
  }, []);

  return (
    <div className='rounded border p-2'>
      {title && <div className='mb-2 text-lg font-semibold'>{title}</div>}
      <div ref={chartRef} style={{ width: '100%', height: '500px' }} />
    </div>
  );
};
