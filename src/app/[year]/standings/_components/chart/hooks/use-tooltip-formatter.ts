import { CallbackDataParams } from 'echarts/types/dist/shared';
import { useCallback } from 'react';

import {
  FIXED_STANDINGS_CHART_TOOLTIP_WIDTH_CH,
  SPRINT_EVENT_FORMATS,
} from '@/lib/constants';

import { compareCountback } from '@/app/[year]/standings/_components/countback';

import { Event_Format_Choices_Enum } from '@/types/graphql';

interface UseTooltipFormatterProps {
  events: {
    round_number?: number | null;
    name?: string | null;
    format?: Event_Format_Choices_Enum | null;
  }[];
  positionCountsTimeline: Record<string, number[][]>;
}

const isSprintFormat = (format?: Event_Format_Choices_Enum | null) =>
  format != null && SPRINT_EVENT_FORMATS.includes(format);

export function useTooltipFormatter({
  events,
  positionCountsTimeline,
}: UseTooltipFormatterProps) {
  return useCallback(
    (params: CallbackDataParams[]) => {
      if (!params?.length) return '';
      const eventIndex = params[0].dataIndex;

      const event = events[eventIndex];
      const round = eventIndex + 1;

      const sprint = isSprintFormat(event?.format);
      const sprintBadge = sprint
        ? "<span class='ml-1 inline-flex items-center justify-center rounded border border-yellow-400 px-1 py-px text-[0.65rem] leading-none align-middle'>S</span>"
        : '';

      // Header with round and event name
      const headerText = `R${round} - ${event?.name?.replace(
        'Grand Prix',
        'GP',
      )}`;
      const header = `<div class='font-bold text-white mb-1 flex items-center'>${headerText}${sprintBadge}</div>`;

      const getCountsThroughRound = (seriesName: string) => {
        const timeline = positionCountsTimeline[seriesName];
        if (!timeline?.length) return [];
        if (eventIndex < timeline.length) {
          return timeline[eventIndex] ?? [];
        }
        return timeline[timeline.length - 1] ?? [];
      };

      // Body with series names and points, sorted by:
      // 1) Points (descending)
      // 2) Countback (finishing positions), to break ties
      const body = params
        .sort((a, b) => {
          const aValue = (a.value as number) ?? 0;
          const bValue = (b.value as number) ?? 0;

          if (bValue !== aValue) {
            return bValue - aValue;
          }

          const aCounts = getCountsThroughRound(String(a.seriesName));
          const bCounts = getCountsThroughRound(String(b.seriesName));

          return compareCountback(aCounts, bCounts);
        })
        .map(
          (p, index) => `
          <div class='flex items-center justify-between gap-2 border-t'>
            <div class='flex items-center gap-2'>
              <span class='w-4 text-right text-xs text-muted-foreground'>${index + 1}</span>
              <span class="inline-block rounded-full w-2 h-2" style="background-color:${p.color};"></span>
              <span style="color:${p.color}">${p.seriesName}</span>
            </div>
            ${p.value}
          </div>`,
        )
        .join('');

      // Wrap header + body in a fixed-width container so tooltip width doesn't
      // change between events. Width is based on the longest header text.
      return `
        <div style="width:${FIXED_STANDINGS_CHART_TOOLTIP_WIDTH_CH}ch; white-space: normal; word-break: break-word;">
          ${header}${body}
        </div>
      `;
    },
    [events, positionCountsTimeline],
  );
}
