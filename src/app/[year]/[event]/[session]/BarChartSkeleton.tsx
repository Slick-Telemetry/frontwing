import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

// reverse order of values for the chart
const chartVals = Array.from({ length: 20 }, (_, i) => ({
  name: (i + 1).toString(),
  value: (20 - i) * 5 + (19 - i) / 10,
}));

export const BarChartSkeleton = ({ title }: { title?: React.ReactNode }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let myChart: echarts.ECharts | undefined;
    if (chartRef.current) {
      myChart = echarts.init(chartRef.current);

      const option: echarts.EChartsOption = {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: chartVals.map((val) => val.name),
          inverse: true, // Show first item at the top
          axisLabel: {
            show: false, // Hide y-axis labels as it's a skeleton
          },
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: 'value',
          show: false, // Hide x-axis labels as it's a skeleton
          min: chartVals[0].value,
          max: chartVals[chartVals.length - 1].value,
        },
        series: [
          {
            name: 'skeleton',
            type: 'bar',
            data: chartVals.map((val) => val.value),
            itemStyle: {
              color: '#cccccc50',
            },
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)',
            },
          },
        ],
      };

      myChart.setOption(option);

      const handleResize = () => {
        myChart?.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        myChart?.dispose();
      };
    }
  }, []);

  return (
    <div className='flex flex-col gap-2'>
      {title && (
        <div className='text-center text-lg font-semibold'>{title}</div>
      )}
      <div
        ref={chartRef}
        style={{ width: '100%', height: `${chartVals.length * 25 + 50}px` }} // Dynamic height based on number of bars
        className='min-h-40'
      ></div>
    </div>
  );
};
