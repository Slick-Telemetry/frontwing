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
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useECharts } from '@/hooks/use-EChart';

import {
  baseOptions,
  ChartControls,
  useStandingsSeries,
  useTooltipFormatter,
} from '@/app/[year]/standings/_components/chart';

import type { GetStandingsQuery } from '@/types/graphql';

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
  type: 'drivers' | 'constructors';
  hiddenDrivers?: Record<string, boolean>;
  hiddenConstructors?: Record<string, boolean>;
}

export function StandingsChart({
  data,
  type,
  hiddenDrivers = {},
  hiddenConstructors = {},
}: Props) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useECharts(chartRef);

  const [hideTooltip, setHideTooltip] = useState(false);
  const [showRoundPoints, setShowRoundPoints] = useState(false);

  const { events } = data;
  const maxRound = Math.max(...events.map((e) => e.round_number || 0));
  const allRounds = useMemo(
    () => Array.from({ length: maxRound }, (_, i) => i + 1),
    [maxRound],
  );

  const { driversSeries, constructorsSeries } = useStandingsSeries({
    data,
    allRounds,
    showRoundPoints,
  });
  const formatTooltip = useTooltipFormatter({ events, allRounds, hideTooltip });

  // update chart
  useEffect(() => {
    if (!chartInstance.current) return;
    const filtered =
      type === 'drivers'
        ? driversSeries.filter((s) => !hiddenDrivers[s.name])
        : constructorsSeries.filter((s) => !hiddenConstructors[s.name]);

    chartInstance.current.setOption(
      {
        ...baseOptions,
        xAxis: { ...baseOptions.xAxis, data: allRounds },
        tooltip: { ...baseOptions.tooltip, formatter: formatTooltip },
        series: filtered,
      },
      { notMerge: true, lazyUpdate: true },
    );
  }, [
    chartInstance,
    type,
    hideTooltip,
    driversSeries,
    constructorsSeries,
    hiddenDrivers,
    hiddenConstructors,
    allRounds,
    formatTooltip,
  ]);

  return (
    <>
      <ChartControls
        hideTooltip={hideTooltip}
        toggleTooltip={() => setHideTooltip((prev) => !prev)}
        showRoundPoints={showRoundPoints}
        toggleRoundPoints={() => setShowRoundPoints((prev) => !prev)}
      />
      <div
        ref={chartRef}
        className='w-full pr-4 pb-2 pl-2 sm:h-[300px] lg:h-[400px] 2xl:h-[500px]'
      />
    </>
  );
}
