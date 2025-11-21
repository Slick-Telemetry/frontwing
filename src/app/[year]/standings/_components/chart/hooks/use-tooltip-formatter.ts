import { CallbackDataParams } from 'echarts/types/dist/shared';
import { useCallback } from 'react';

interface UseTooltipFormatterProps {
  events: {
    round_number?: number | null;
    name?: string | null;
  }[];
}

export function useTooltipFormatter({ events }: UseTooltipFormatterProps) {
  return useCallback(
    (params: CallbackDataParams[]) => {
      if (!params?.length) return '';
      const eventIndex = params[0].dataIndex;

      const event = events[eventIndex];
      const round = eventIndex + 1;

      // Header with round and event name
      const header = `<div class='font-bold text-white w-24 truncate'>${round} ${
        event?.name?.replace('Grand Prix', '') || `Round: ${round}`
      }</div>`;

      // Body with series names and points
      const body = params
        .sort((a, b) => (b.value as number) - (a.value as number))
        .map(
          (p) => `
          <div class='flex items-center justify-between gap-2 border-t'>
            <div>
              <span class="inline-block rounded-full w-2 h-2" style="background-color:${p.color};"></span>
              <span style="color:${p.color}">${p.seriesName}</span>
            </div>
            ${p.value}
          </div>`,
        )
        .join('');

      return header + body;
    },
    [events],
  );
}
