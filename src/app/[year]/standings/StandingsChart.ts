import type { LineSeriesOption } from 'echarts/charts';
import { LineChart } from 'echarts/charts';
import type {
  DatasetComponentOption,
  GridComponentOption,
  LegendComponentOption,
  TooltipComponentOption,
} from 'echarts/components';
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type { CallbackDataParams } from 'echarts/types/dist/shared';

import type { GetStandingsQuery } from '@/types/graphql';

echarts.use([
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

type ECOption = echarts.ComposeOption<
  | DatasetComponentOption
  | GridComponentOption
  | LegendComponentOption
  | TooltipComponentOption
  | LineSeriesOption
>;

export class StandingsChart {
  private chart: echarts.ECharts;

  constructor(element: HTMLElement) {
    this.chart = echarts.init(element, 'dark');
  }

  public update(
    data: GetStandingsQuery,
    type: 'drivers' | 'constructors',
    hiddenDrivers: Record<string, boolean> = {},
    hiddenConstructors: Record<string, boolean> = {},
  ) {
    const events = data.events;
    const maxRound = Math.max(...events.map((e) => e.round_number || 0));
    const allRounds = Array.from({ length: maxRound }, (_, i) => i + 1);

    const latestRoundPoints = new Map<string, number>();
    data.drivers.forEach((driver) => {
      const latestPointsEntry = driver.driver_standings.find(
        (ds) => ds.round === maxRound,
      );
      if (latestPointsEntry && latestPointsEntry.points != null) {
        latestRoundPoints.set(
          driver.abbreviation || '',
          Number(latestPointsEntry.points),
        );
      } else {
        latestRoundPoints.set(driver.abbreviation || '', 0);
      }
    });

    const constructorTopDrivers = new Map<string, string>();
    const driversByConstructor = new Map<
      string,
      Array<(typeof data.drivers)[0]>
    >();

    data.drivers.forEach((driver) => {
      const constructorName = driver.latest_constructor?.[0]?.constructor?.name;
      if (constructorName) {
        if (!driversByConstructor.has(constructorName)) {
          driversByConstructor.set(constructorName, []);
        }
        driversByConstructor.get(constructorName)?.push(driver);
      }
    });

    driversByConstructor.forEach((drivers, constructorName) => {
      let topDriverAbbr = '';
      let maxPoints = -1;

      drivers.forEach((driver) => {
        const points = latestRoundPoints.get(driver.abbreviation || '') || 0;
        if (points > maxPoints) {
          maxPoints = points;
          topDriverAbbr = driver.abbreviation || '';
        }
      });
      if (topDriverAbbr) {
        constructorTopDrivers.set(constructorName, topDriverAbbr);
      }
    });

    const prepareSeriesData = (
      standings: Array<{
        round?: number | null;
        points?: number | bigint | null;
      }>,
    ) => {
      const standingsByRound = new Map<number, number>();
      standings.forEach((s) => {
        if (s.round != null && s.points != null) {
          standingsByRound.set(s.round, Number(s.points));
        }
      });

      const seriesData: number[] = [];
      let lastValidPoints = 0;

      for (const round of allRounds) {
        if (standingsByRound.has(round)) {
          lastValidPoints = standingsByRound.get(round)!;
          seriesData.push(lastValidPoints);
        } else {
          seriesData.push(lastValidPoints);
        }
      }
      return seriesData;
    };

    const series =
      type === 'drivers'
        ? data.drivers.map((driver) => {
            const preparedData = prepareSeriesData(driver.driver_standings);
            const isTopDriver =
              driver.abbreviation ===
              constructorTopDrivers.get(
                driver.latest_constructor?.[0]?.constructor?.name || '',
              );
            return {
              name: driver.abbreviation || '',
              type: 'line' as const,
              showSymbol: false,
              emphasis: { focus: 'series' as const },
              itemStyle: {
                color: `#${driver.latest_constructor?.[0]?.constructor?.color || 'cccccc'}`,
              },
              lineStyle: {
                width: 2,
                type: isTopDriver ? 'solid' : 'dotted',
              },
              data: preparedData,
            };
          })
        : data.constructors.map((constructor) => {
            const preparedData = prepareSeriesData(
              constructor.constructor_standings,
            );
            return {
              name: constructor.name || '',
              type: 'line' as const,
              showSymbol: false,
              emphasis: { focus: 'series' as const },
              itemStyle: { color: `#${constructor.color || 'cccccc'}` },
              lineStyle: {
                width: 2,
              },
              data: preparedData,
            };
          });

    const seriesFiltered =
      type === 'drivers'
        ? series.filter((driver) => !hiddenDrivers[driver.name || ''])
        : series.filter(
            (constructor) => !hiddenConstructors[constructor.name || ''],
          );

    const option: ECOption = {
      backgroundColor: 'transparent',
      // @ts-expect-error: ECharts tooltip types are complex and difficult to align perfectly with strict TypeScript.
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross', label: { precision: 0 } },
        backgroundColor: 'rgba(0, 0, 0, 1)',
        borderColor: '#333',
        textStyle: { color: '#fff' },
        confine: true,
        formatter: (params: CallbackDataParams[]) => {
          if (!Array.isArray(params) || !params.length) return '';

          const firstParam = params[0];
          const round = allRounds[firstParam.dataIndex];
          const event = events.find((e) => e.round_number === round);
          const eventName = event?.name || `Round: ${round}`;

          let tooltipContent = `<div class='font-bold text-white'>Round: ${round}</div>`;
          tooltipContent += `<div class='font-bold text-white mb-2'>${eventName}</div>`;

          params.sort(
            (a: CallbackDataParams, b: CallbackDataParams) =>
              (b.value as number) - (a.value as number),
          );

          params.forEach((param: CallbackDataParams) => {
            const name = param.seriesName;
            const value = param.value;
            const color = param.color;
            tooltipContent += `<div><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span><span style="color:${color}">${name}</span>: ${value}</div>`;
          });

          return tooltipContent;
        },
      },
      grid: {
        left: '4%',
        right: '4%',
        bottom: '7%',
      },
      xAxis: {
        type: 'category',
        axisTick: { show: true, alignWithLabel: true },
        data: allRounds,
        name: 'Round',
        nameLocation: 'middle',
        nameGap: 35,
      },
      yAxis: {
        type: 'value',
        name: 'Points',
        nameLocation: 'middle',
        nameGap: 35,
      },
      series: seriesFiltered,
    };

    this.chart.setOption(option, true);
  }

  public dispose() {
    this.chart.dispose();
  }

  public resize() {
    this.chart.resize();
  }
}
