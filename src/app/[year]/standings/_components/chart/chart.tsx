'use client';

import { LineChart } from 'echarts/charts';
import {
  DatasetComponent,
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

  // update chart
  useEffect(() => {
    if (!chartInstance.current) return;
    const activeSeries = [
      showAvailablePoints ? availablePointsSeries : null,
      ...filtered,
    ];

    chartInstance.current.setOption(
      {
        ...baseOptions,
        xAxis: { ...baseOptions.xAxis, data: allRounds },
        tooltip: {
          ...baseOptions.tooltip,
          formatter: showTooltip ? formatTooltip : () => {},
        },
        series: activeSeries,
      },
      { notMerge: true, lazyUpdate: true },
    );
  }, [
    chartInstance,
    allRounds,
    showTooltip,
    formatTooltip,
    showAvailablePoints,
    availablePointsSeries,
    filtered,
  ]);

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
      />
      <div
        ref={chartRef}
        className='h-[300px] w-full pr-4 pb-2 pl-2 lg:h-[400px] 2xl:h-[500px]'
      />
    </>
  );
}
