import clsx from 'clsx';
import { Circle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

// TODO duplicate from legend
type Driver = {
  name: string;
  abbr: string;
  team?: string;
  color: string;
  totalPoints: number;
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
}: {
  items: Driver[];
  toggleItem: (item: string) => void;
  hiddenItems: Record<string, boolean>;
}) {
  return items.map((item, idx, allItems) => {
    const currentPoints = item.totalPoints;
    const previousPoints = allItems[idx - 1]?.totalPoints;
    const gap = calculateGap(currentPoints, previousPoints);

    return (
      <div
        key={item.name}
        onClick={() => toggleItem(item.abbr)}
        className={clsx(
          'flex cursor-pointer flex-wrap items-center divide-x rounded border py-1',
          { 'opacity-50': hiddenItems[item.abbr] },
        )}
        aria-label={`Toggle ${item.name} from chart`}
        // style={{ borderColor: item.color }}
      >
        <p className='w-8 text-center'>{idx + 1}</p>
        <div className='flex flex-1 items-center justify-between gap-2 px-2'>
          <Circle fill={item.color} stroke='none' className='size-4' />
          <p className='line-clamp-1 flex-1'>{item.name}</p>

          {item.team && (
            <Badge
              variant='outline'
              className='inline w-28 truncate text-sm xl:w-20 2xl:w-28'
              style={{ borderColor: item.color }}
            >
              {item.team}
            </Badge>
          )}
        </div>
        <p className='w-10 text-center'>{item.totalPoints}</p>
        <p className='w-10 text-center'>{gap ?? 'Gap'}</p>
      </div>
    );
  });
}
