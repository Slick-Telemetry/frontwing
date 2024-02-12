import clsx from 'clsx';

import { formatDuration } from '@/utils/helpers';

export const Countdown = ({
  time,
  className,
}: {
  time: number;
  className?: string;
}) => {
  return (
    <span className={clsx(className)}>
      {/* Remove last 4 characters which as milliseconds */}
      {formatDuration(time).slice(0, -4)}
    </span>
  );
};
