import { curveCatmullRom } from '@visx/curve';
import { LineSeries } from '@visx/xychart';

import { LineChart } from '@/app/[year]/[event]/[session]/lapTimes';

const NUM_LINES = 10;
const NUM_LAPS = 20;

function generateRandomLineData() {
  return Array.from({ length: NUM_LAPS }, (_, i) => ({
    lap: i + 1,
    value: Math.random() * 100 - i * 10, // Random lap time
  }));
}

export const LineChartSkeleton = ({ title }: { title?: React.ReactNode }) => {
  const lines = Array.from({ length: NUM_LINES }, () =>
    generateRandomLineData(),
  );

  return (
    <LineChart title={title || ''} yScaleType='linear'>
      {lines.map((data, i) => (
        <LineSeries
          curve={curveCatmullRom}
          key={i}
          dataKey={`skeleton-${i}`}
          data={data}
          xAccessor={(val) => val.lap}
          yAccessor={(val) => val.value}
          colorAccessor={() => '#cccccc50'}
        />
      ))}
    </LineChart>
  );
};
