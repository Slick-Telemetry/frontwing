'use client';

import { LineChart } from 'echarts/charts';
import {
  DatasetComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useECharts } from '@/hooks/use-EChart';

import {
  baseOptions,
  ChartControls,
  generatePerRoundAvailablePoints,
  useStandingsSeries,
  useTooltipFormatter,
} from '@/app/[year]/standings/_components/chart';
import {
  buildConstructorPositionCountsTimeline,
  buildDriverPositionCountsTimeline,
} from '@/app/[year]/standings/_components/countback';

import {
  Event_Format_Choices_Enum,
  type GetStandingsQuery,
} from '@/types/graphql';

// Register ECharts pieces globally once
echarts.use([
  DataZoomComponent,
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

interface Props {
  data: GetStandingsQuery;
  type: ViewType;
  hiddenItems: Record<string, boolean>;
  toggleVisibility: (string: 'all' | 'none') => void;
}

type EChartsOption = {
  dataZoom?: Array<{
    start?: number;
    end?: number;
  }>;
};

export function StandingsChart({
  data,
  type,
  hiddenItems,
  toggleVisibility,
}: Props) {
  const { year } = useParams<{ year: string }>();
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useECharts(chartRef);

  // Store zoom state to preserve it across updates
  // This is updated automatically by the datazoom event listener
  const zoomStateRef = useRef<{ start: number; end: number } | null>(null);

  // Chart Settings
  const [showTooltip, setShowTooltip] = useState(true);
  const [showPointsPerRound, setShowRoundPoints] = useState(false);
  const [showAvailablePoints, setShowAvailablePoints] = useState(false);

  const driverWithMostRounds = Math.max(
    ...data.drivers.map((d) => d.driver_standings.length),
  );
  const allRounds = Array.from(
    { length: driverWithMostRounds },
    (_, i) => i + 1,
  );
  const allRoundFormats = data.events.map(
    (e) => e.format ?? Event_Format_Choices_Enum.Conventional,
  );

  const perRoundAvailablePoints = generatePerRoundAvailablePoints({
    year: parseInt(year),
    allRoundFormats,
    type,
  });

  // Precompute countback position counts for each series after every event so
  // the tooltip can apply per-round countback identical to the standings table
  // but scoped to the rounds completed so far.
  const driverPositionCountsTimeline = useMemo(
    () =>
      buildDriverPositionCountsTimeline(
        data.drivers
          .map((driver) => driver.abbreviation ?? '')
          .filter((abbr): abbr is string => Boolean(abbr)),
        data.events,
      ),
    [data.drivers, data.events],
  );

  const constructorPositionCountsTimeline = useMemo(
    () =>
      buildConstructorPositionCountsTimeline(
        data.constructors
          .map((constructor) => constructor.name ?? '')
          .filter((name): name is string => Boolean(name)),
        data.events,
      ),
    [data.constructors, data.events],
  );

  const positionCountsTimeline =
    type === 'drivers'
      ? driverPositionCountsTimeline
      : constructorPositionCountsTimeline;

  const formatTooltip = useTooltipFormatter({
    events: data.events,
    positionCountsTimeline,
  });

  const { driversSeries, constructorsSeries, availablePointsSeries } =
    useStandingsSeries({
      data,
      allRounds,
      showPointsPerRound,
      perRoundAvailablePoints,
    });

  const baseSeries = type === 'drivers' ? driversSeries : constructorsSeries;
  const filtered = baseSeries.filter((s) => !hiddenItems[s.name]);

  // update chart
  useEffect(() => {
    if (!chartInstance.current) return;
    const chart = chartInstance.current;

    // Always read current zoom state before updating as a fallback
    // This ensures we have the absolute latest state even if event handler missed something
    const currentOption = chart.getOption();

    // Safely access dataZoom with proper null checks
    if (
      currentOption &&
      typeof currentOption === 'object' &&
      !Array.isArray(currentOption)
    ) {
      const option = currentOption as EChartsOption;
      const dataZoom = option.dataZoom;
      if (dataZoom && Array.isArray(dataZoom) && dataZoom[1]) {
        const currentStart = dataZoom[1].start;
        const currentEnd = dataZoom[1].end;
        if (currentStart !== undefined && currentEnd !== undefined) {
          // Always update to the current zoom state from the chart
          // This ensures we restore to the actual current zoom, not a stale value
          zoomStateRef.current = {
            start: currentStart,
            end: currentEnd,
          };
        }
      }
    }

    const activeSeries = [
      showAvailablePoints ? availablePointsSeries : null,
      ...filtered,
    ];

    // Prepare the option without zoom (we'll restore it after)
    const option = {
      ...baseOptions,
      xAxis: { ...baseOptions.xAxis, data: allRounds },
      tooltip: {
        ...baseOptions.tooltip,
        formatter: showTooltip ? formatTooltip : () => {},
      },
      series: activeSeries,
    };

    // Set the option first
    chart.setOption(option, { notMerge: true, lazyUpdate: true });

    // Restore zoom state after option is set using dispatchAction
    // The datazoom event will fire and update zoomStateRef, which is fine
    if (zoomStateRef.current) {
      // Use dispatchAction to restore zoom for both inside and slider
      // This will trigger datazoom events, which will update zoomStateRef with the same values
      chart.dispatchAction({
        type: 'dataZoom',
        dataZoomIndex: 0, // inside zoom
        start: zoomStateRef.current.start,
        end: zoomStateRef.current.end,
      });
      chart.dispatchAction({
        type: 'dataZoom',
        dataZoomIndex: 1, // slider zoom
        start: zoomStateRef.current.start,
        end: zoomStateRef.current.end,
      });
    }
  }, [
    chartInstance,
    allRounds,
    showTooltip,
    formatTooltip,
    showAvailablePoints,
    availablePointsSeries,
    filtered,
  ]);

  const resetZoom = () => {
    if (!chartInstance.current) return;
    const chart = chartInstance.current;

    // Reset zoom state to default (0-100)
    zoomStateRef.current = { start: 0, end: 100 };

    // Reset zoom for both inside and slider using dispatchAction
    chart.dispatchAction({
      type: 'dataZoom',
      dataZoomIndex: 0, // inside zoom
      start: 0,
      end: 100,
    });
    chart.dispatchAction({
      type: 'dataZoom',
      dataZoomIndex: 1, // slider zoom
      start: 0,
      end: 100,
    });
  };

  return (
    <>
      <ChartControls
        toggleVisibility={toggleVisibility}
        showTooltip={showTooltip}
        toggleTooltip={() => setShowTooltip((prev) => !prev)}
        showPointsPerRound={showPointsPerRound}
        togglePointsPerRound={() => setShowRoundPoints((prev) => !prev)}
        showAvailablePoints={showAvailablePoints}
        toggleAvailablePoints={() => setShowAvailablePoints((prev) => !prev)}
        resetZoom={resetZoom}
      />
      <div
        ref={chartRef}
        className='h-[300px] w-full pr-4 pb-2 pl-2 lg:h-[400px] 2xl:h-[500px]'
      />
    </>
  );
}
