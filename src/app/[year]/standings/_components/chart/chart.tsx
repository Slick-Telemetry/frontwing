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
import { useEffect, useRef, useState } from 'react';

import { useECharts } from '@/hooks/use-EChart';

import {
  baseOptions,
  ChartControls,
  generatePerRoundAvailablePoints,
  useStandingsSeries,
  useTooltipFormatter,
} from '@/app/[year]/standings/_components/chart';

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

  const formatTooltip = useTooltipFormatter({
    events: data.events,
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

  // Track zoom changes using ECharts datazoom event
  // API Reference: https://echarts.apache.org/en/api.html#events.datazoom
  useEffect(() => {
    if (!chartInstance.current) return;

    const chart = chartInstance.current;

    // Event params include: start, end, dataZoomIndex, and batch (for multiple components)
    type DataZoomEventParams = {
      start?: number; // start percentage (0-100)
      end?: number; // end percentage (0-100)
      dataZoomIndex?: number; // 0 = inside zoom, 1 = slider zoom
      batch?: Array<{
        start?: number;
        end?: number;
        dataZoomIndex?: number;
      }>;
    };

    const handleDataZoom = (...args: unknown[]) => {
      const params = args[0] as DataZoomEventParams;

      // Always save the latest zoom state from events
      // This captures both user interactions and programmatic changes
      // We always update the ref - if it's a programmatic restore, it's the same value anyway
      if (params.batch) {
        // Handle multiple dataZoom components (both inside and slider fire together)
        // Prefer slider (index 1) as it's the visible control
        const sliderZoom = params.batch.find((p) => p.dataZoomIndex === 1);
        const insideZoom = params.batch.find((p) => p.dataZoomIndex === 0);
        const zoomSource = sliderZoom || insideZoom;
        if (
          zoomSource &&
          zoomSource.start !== undefined &&
          zoomSource.end !== undefined
        ) {
          zoomStateRef.current = {
            start: zoomSource.start,
            end: zoomSource.end,
          };
        }
      } else {
        // Handle single dataZoom event (either inside or slider)
        if (
          (params.dataZoomIndex === 0 || params.dataZoomIndex === 1) &&
          params.start !== undefined &&
          params.end !== undefined
        ) {
          zoomStateRef.current = {
            start: params.start,
            end: params.end,
          };
        }
      }
    };

    chart.on('datazoom', handleDataZoom);

    return () => {
      chart.off('datazoom', handleDataZoom);
    };
  }, [chartInstance]);

  // update chart
  useEffect(() => {
    if (!chartInstance.current) return;
    const chart = chartInstance.current;

    // Always read current zoom state before updating as a fallback
    // This ensures we have the absolute latest state even if event handler missed something
    const currentOption = chart.getOption();
    type EChartsOption = {
      dataZoom?: Array<{
        start?: number;
        end?: number;
      }>;
    };
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
