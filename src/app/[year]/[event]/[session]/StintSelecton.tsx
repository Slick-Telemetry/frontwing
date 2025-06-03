import { ParentSize } from '@visx/responsive';
import { AnimatedBarSeries, Axis, BarStack, XYChart } from '@visx/xychart';

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

export const StintSkeleton = () => {
  return (
    <div className='h-[600px] animate-pulse rounded border p-2'>
      <h3 className='text-center text-lg font-semibold'>Tyre Analysis</h3>
      <ParentSize key='stintTyres'>
        {({ width, height }) => (
          <XYChart
            xScale={{ type: 'linear', domain: [0, 60] }}
            yScale={{ type: 'band', padding: 0.2 }}
            width={width}
            height={height}
            margin={margin}
          >
            {/* X and Y Axes */}
            <Axis
              orientation='bottom'
              label='Lap Number'
              tickLabelProps={() => ({
                fill: 'var(--color-foreground)',
              })}
              labelClassName='fill-foreground'
              tickClassName='fill-foreground'
            />
            <Axis
              orientation='left'
              labelOffset={16}
              hideTicks
              tickClassName='opacity-0'
              label='Drivers'
              labelClassName='fill-foreground'
            />

            {/* Stacked Bars for Stints */}
            {processedData?.flatMap((driverData) => (
              <BarStack key={driverData.driver}>
                {driverData.stints.map((stint) => {
                  // Define a pattern ID for old tyres
                  return (
                    <AnimatedBarSeries
                      radius={4}
                      radiusAll
                      key={`${driverData.driver}-stint-${stint.startLap}`}
                      dataKey={`${driverData.driver}-stint-${stint.startLap}`}
                      data={[stint]}
                      xAccessor={(d) => d.endLap - d.startLap + 1}
                      yAccessor={(d) => d.driver}
                      colorAccessor={() => '#cccccc50'} // Use pattern for old tyres
                    />
                  );
                })}
              </BarStack>
            ))}
          </XYChart>
        )}
      </ParentSize>
    </div>
  );
};
