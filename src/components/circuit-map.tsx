import clsx from 'clsx';

import { cn } from '@/lib/utils';

import { FragmentType, graphql, useFragment } from '@/types';

export const CircuitDetails = graphql(`
  fragment CircuitDetails on circuits {
    circuit_details
  }
`);

export const CircuitMap = ({
  circuitData,
  className,
  small = false,
}: {
  circuitData?: FragmentType<typeof CircuitDetails>;
  small?: boolean;
  className?: string;
}) => {
  const data = useFragment(CircuitDetails, circuitData);
  if (!data?.circuit_details) return null;

  const { xy_values, rotation } = data.circuit_details as CircuitDetails;

  // Find the minimum coordinates to use as the origin point
  const origin = xy_values.reduce(
    (acc, point) =>
      [Math.min(acc[0], point.X), Math.min(acc[1], point.Y)] as [
        number,
        number,
      ],
    [Infinity, Infinity],
  );
  const [originX, originY] = origin;

  // Prepare rotation transformation
  const rotationRadians = (rotation * Math.PI) / 180;
  const cos = Math.cos(rotationRadians);
  const sin = Math.sin(rotationRadians);

  // Transform points: normalize to origin, flip vertically, then rotate
  const transformed: { X: number; Y: number }[] = [];
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  for (const point of xy_values) {
    // Normalize to origin (translate to 0,0)
    const normalizedX = point.X - originX;
    const normalizedY = point.Y - originY;

    // Flip vertically (to match SVG coordinate system)
    const flippedY = -normalizedY;

    // Apply rotation transformation
    const rotatedX = normalizedX * cos - flippedY * sin;
    const rotatedY = normalizedX * sin + flippedY * cos;

    transformed.push({ X: rotatedX, Y: rotatedY });

    // Track bounding box of transformed points
    if (rotatedX < minX) minX = rotatedX;
    if (rotatedY < minY) minY = rotatedY;
    if (rotatedX > maxX) maxX = rotatedX;
    if (rotatedY > maxY) maxY = rotatedY;
  }

  // Calculate SVG dimensions with padding
  const PADDING = 350;
  const width = maxX - minX + PADDING * 2;
  const height = maxY - minY + PADDING * 2;
  const STROKE_WIDTH_SCALE = 0.025;
  const strokeWidth = Math.max(width, height) * STROKE_WIDTH_SCALE;

  // Convert transformed points to SVG path coordinates
  const pathPoints = transformed.map(
    (point) => `${point.X - minX + PADDING},${point.Y - minY + PADDING}`,
  );
  // Close the loop by repeating the first point
  pathPoints.push(pathPoints[0]);
  const points = pathPoints.join(' ');

  const sizeClasses = clsx({
    'max-h-[75px] w-fit': small,
    'max-h-[175px] hidden lg:block': !small,
  });

  return (
    <svg
      className={cn('aspect-square py-2', sizeClasses, className)}
      aria-hidden='true'
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio='xMidYMid meet'
    >
      {/* Outer track outline */}
      <polyline
        points={points}
        className='stroke-accent origin-center'
        fill='none'
        strokeWidth={strokeWidth}
      />
      {/* Inner track outline */}
      <polyline
        points={points}
        className='stroke-foreground origin-center'
        fill='none'
        strokeWidth={strokeWidth * 0.2}
      />
    </svg>
  );
};
