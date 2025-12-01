import { Crown, Tally2, Tally3 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function PositionsBadge({
  positionCounts,
}: {
  positionCounts?: number[];
}) {
  if (!positionCounts) return null;

  const [wins = 0, p2s = 0, p3s = 0] = positionCounts;

  if (wins === 0 && p2s === 0 && p3s === 0) return null;

  return (
    <div className='hidden shrink-0 items-center gap-1 @[500px]:flex'>
      {wins > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant='outline'
              className='flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-medium'
            >
              <Crown className='size-3.5 text-yellow-500' />
              <span>{wins}</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {wins} Win
              {wins > 1 ? 's' : ''}
            </p>
          </TooltipContent>
        </Tooltip>
      )}

      {p2s > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant='outline'
              className='flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-medium'
            >
              <Tally2 className='size-3.5 text-gray-400' />
              <span>{p2s}</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {p2s} P2
              {p2s > 1 ? 's' : ''}
            </p>
          </TooltipContent>
        </Tooltip>
      )}

      {p3s > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant='outline'
              className='flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-medium'
            >
              <Tally3 className='size-3.5 text-amber-600' />
              <span>{p3s}</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {p3s} P3
              {p3s > 1 ? 's' : ''}
            </p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
