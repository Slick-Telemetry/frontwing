import clsx from 'clsx';
import { Circle, Crown, Tally2, Tally3 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { ConstructorBadge } from '@/components/constructor-badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { DriverBadges } from './driver-badges';

// TODO duplicate from legend
type Driver = {
  name: string;
  abbr: string;
  team?: string;
  color: string;
  totalPoints: number;
  positionCounts?: number[];
};

const calculateGap = (currentPoints: number, previousPoints: number | null) => {
  if (previousPoints !== 0 && !previousPoints) {
    return 'Gap';
  }
  const diff = previousPoints - currentPoints;
  return diff === 0 ? '0' : `-${diff}`;
};

export function Table({
  items,
  toggleItem,
  hiddenItems,
  driversByConstructor,
}: {
  items: Driver[];
  toggleItem: (items: string[]) => void;
  hiddenItems: Record<string, boolean>;
  driversByConstructor?: Map<string, string[]>;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartIndex, setDragStartIndex] = useState<number | null>(null);
  const [dragEndIndex, setDragEndIndex] = useState<number | null>(null);

  const handleMouseDown = (index: number) => {
    setIsDragging(true);
    setDragStartIndex(index);
    setDragEndIndex(index);
  };

  const handleMouseEnter = (index: number) => {
    if (isDragging && dragStartIndex !== null) {
      setDragEndIndex(index);
    }
  };

  const handleMouseUp = useCallback(() => {
    if (isDragging && dragStartIndex !== null && dragEndIndex !== null) {
      // Check if it's a single item click (start and end are the same)
      if (dragStartIndex === dragEndIndex) {
        // Single item click - just toggle that item
        const item = items[dragStartIndex];
        if (item) {
          toggleItem([item.abbr]);
        }
      } else {
        // Multi-item drag selection
        const startIndex = Math.min(dragStartIndex, dragEndIndex);
        const endIndex = Math.max(dragStartIndex, dragEndIndex);
        const itemsToToggle = items
          .slice(startIndex, endIndex + 1)
          .map((item) => item.abbr);

        toggleItem(itemsToToggle);
      }

      setIsDragging(false);
      setDragStartIndex(null);
      setDragEndIndex(null);
    }
  }, [isDragging, dragStartIndex, dragEndIndex, items, toggleItem]);

  // Handle mouse up events outside the component
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
    }
  }, [isDragging, handleMouseUp]);

  return items.map((item, idx, allItems) => {
    const currentPoints = item.totalPoints;
    const previousPoints = allItems[idx - 1]?.totalPoints;
    const gap = calculateGap(currentPoints, previousPoints);

    // Check if this item is in the drag selection range
    const isInDragRange =
      isDragging &&
      dragStartIndex !== null &&
      dragEndIndex !== null &&
      idx >= Math.min(dragStartIndex, dragEndIndex) &&
      idx <= Math.max(dragStartIndex, dragEndIndex);

    const isConstructorView = !!driversByConstructor;

    return (
      <div
        key={item.name}
        onMouseDown={() => handleMouseDown(idx)}
        onMouseEnter={() => handleMouseEnter(idx)}
        onMouseUp={handleMouseUp}
        className={clsx(
          'bg-background flex min-w-0 cursor-pointer flex-nowrap items-center divide-x rounded border py-1 select-none',
          {
            'opacity-50': hiddenItems[item.abbr],
            'dark:bg-accent/50 bg-blue-100': isInDragRange,
          },
        )}
        aria-label={`Toggle ${item.name} from chart`}
        // style={{ borderColor: item.color }}
      >
        <p className='w-8 shrink-0 text-center'>{idx + 1}</p>
        <div className='flex min-w-0 flex-1 items-center gap-2 px-2'>
          <Circle fill={item.color} stroke='none' className='size-4 shrink-0' />
          <div className='flex min-w-0 flex-1 items-center gap-2 overflow-hidden'>
            <p className='min-w-[120px] flex-1 truncate'>{item.name}</p>
            {/* Position icons and counts - hide after badges are hidden */}
            {item.positionCounts && (
              <div className='hidden shrink-0 items-center gap-1 @[500px]:flex'>
                {item.positionCounts[0] > 0 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className='flex items-center gap-0.5 rounded border px-1.5 py-0.5'>
                        <Crown className='size-3.5 text-yellow-500' />
                        <span className='text-xs font-medium'>
                          {item.positionCounts[0]}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {item.positionCounts[0]} Win
                        {item.positionCounts[0] > 1 ? 's' : ''}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {item.positionCounts[1] > 0 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className='flex items-center gap-0.5 rounded border px-1.5 py-0.5'>
                        <Tally2 className='size-3.5 text-gray-400' />
                        <span className='text-xs font-medium'>
                          {item.positionCounts[1]}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {item.positionCounts[1]} P2
                        {item.positionCounts[1] > 1 ? 's' : ''}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {item.positionCounts[2] > 0 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className='flex items-center gap-0.5 rounded border px-1.5 py-0.5'>
                        <Tally3 className='size-3.5 text-amber-600' />
                        <span className='text-xs font-medium'>
                          {item.positionCounts[2]}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {item.positionCounts[2]} P3
                        {item.positionCounts[2] > 1 ? 's' : ''}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            )}
            {/* Driver badges for constructor view - hide first when space is limited */}
            {driversByConstructor && driversByConstructor.has(item.name) && (
              <div className='hidden shrink-0 overflow-visible @[600px]:flex'>
                <DriverBadges
                  drivers={driversByConstructor.get(item.name) || []}
                  color={item.color}
                />
              </div>
            )}
            {/* Constructor badge for driver view - hide first when space is limited */}
            {item.team && !isConstructorView && (
              <div className='hidden min-w-[120px] shrink-0 @[600px]:flex'>
                <ConstructorBadge
                  className='2xl:text-sm'
                  color={item.color.slice(1)} //remove #
                  name={item.team}
                />
              </div>
            )}
          </div>
        </div>
        <p className='min-w-16 shrink-0 text-center'>{item.totalPoints}</p>
        <p className='min-w-16 shrink-0 text-center'>{gap ?? 'Gap'}</p>
      </div>
    );
  });
}
