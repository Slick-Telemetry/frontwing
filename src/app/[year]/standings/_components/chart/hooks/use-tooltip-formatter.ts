import { CallbackDataParams } from 'echarts/types/dist/shared';
import { useCallback } from 'react';

interface UseTooltipFormatterProps {
  events: { round_number?: number | null; name?: string | null }[];
  allRounds: number[];
  hideTooltip?: boolean;
}

export function useTooltipFormatter({
  events,
  allRounds,
  hideTooltip = false,
}: UseTooltipFormatterProps) {
  return useCallback(
    (params: CallbackDataParams[]) => {
      if (hideTooltip || !params?.length) return '';

      const round = allRounds[params[0].dataIndex];
      const event = events.find((e) => e.round_number === round);
      const header = `<div class='font-bold text-white w-24 truncate'>${round} ${
        event?.name?.replace('Grand Prix', '') || `Round: ${round}`
      }</div>`;

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
    [events, allRounds, hideTooltip],
  );
}
