import clsx from 'clsx';

export function DriverBadges({
  drivers,
  color,
  onDriverClick,
  hiddenItems,
  fullWidth,
}: {
  drivers: string[];
  color: string;
  onDriverClick?: (driver: string, e: React.MouseEvent) => void;
  hiddenItems?: Record<string, boolean>;
  fullWidth?: boolean;
}) {
  if (!drivers || drivers.length === 0) return null;

  const getBorderStyle = (idx: number) => {
    // Cycle through border styles: solid, dashed, dotted, double
    const borderStyles = [
      'border-solid',
      'border-dashed',
      'border-dotted',
      'border-double',
    ];
    return borderStyles[idx % 4];
  };

  return (
    <div className={clsx('flex gap-x-2', fullWidth && 'w-full')}>
      {drivers.map((driver, idx) => (
        <div
          key={driver}
          onClick={onDriverClick ? (e) => onDriverClick(driver, e) : undefined}
          className={clsx(
            'flex h-6 items-center justify-center rounded-md px-2 text-xs font-semibold uppercase',
            getBorderStyle(idx),
            'border',
            fullWidth ? 'flex-1' : 'min-w-12',
            onDriverClick && 'cursor-pointer select-none',
            hiddenItems?.[driver] ? 'opacity-50' : 'opacity-100',
          )}
          style={{ borderColor: color }}
        >
          {driver}
        </div>
      ))}
    </div>
  );
}
