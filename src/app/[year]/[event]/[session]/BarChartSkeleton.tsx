import { BarSeries } from '@visx/xychart';

import { BarChart } from './sectorTimes';

const chartVals = Array.from({ length: 20 }, (_, i) => ({
  name: (i + 1).toString(),
  value: (i + 1) * 5 + i / 10,
}));

export const BarChartSkeleton = ({ title }: { title?: React.ReactNode }) => {
  return (
    <BarChart
      driverCount={chartVals.length}
      title={title || ''}
      minMax={[chartVals[0].value, chartVals[chartVals.length - 1].value]}
    >
      <BarSeries
        dataKey='skeleton'
        data={chartVals}
        xAccessor={(val) => val.name}
        yAccessor={(val) => val.value}
        colorAccessor={() => '#cccccc50'}
      />
    </BarChart>
  );
};
