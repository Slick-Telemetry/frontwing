import { useQuery } from '@apollo/client/react';
import clsx from 'clsx';

import { GET_NEXT_EVENT_CIRCUIT } from '@/lib/queries';

import {
  GetNextEventCircuitQuery,
  GetNextEventCircuitQueryVariables,
} from '@/types/graphql';

export const CircuitMap = ({
  location,
  country,
  small = false,
}: {
  location: string;
  country: string;
  small?: boolean;
}) => {
  const { loading, data, error } = useQuery<
    GetNextEventCircuitQuery,
    GetNextEventCircuitQueryVariables
  >(GET_NEXT_EVENT_CIRCUIT, {
    variables: { location, country, year: new Date().getFullYear() - 1 },
  });

  if (loading || error || !data?.circuits[0].circuit_details) return null;

  const { xy_values, rotation } = data.circuits[0]
    .circuit_details as CircuitDetails;

  // Compute bounding box and offsets
  const [minX, minY] = [
    Math.min(...xy_values.map((p) => p.X)),
    Math.min(...xy_values.map((p) => p.Y)),
  ];
  const [maxX, maxY] = [
    Math.max(...xy_values.map((p) => p.X)),
    Math.max(...xy_values.map((p) => p.Y)),
  ];

  // SVG dimensions
  const padding = 1500; // padding around track
  const width = maxX - minX + padding * 2;
  const height = maxY - minY + padding * 2;
  const strokeWidth = Math.max(width, height) * 0.03;

  const points = xy_values
    .map((p) => `${p.X - minX + padding},${p.Y - minY + padding}`)
    .concat(
      `${xy_values[0].X - minX + padding},${xy_values[0].Y - minY + padding}`,
    ) // close loop
    .join(' ');

  const sizeClasses = clsx({
    'max-h-[75px] w-fit': small,
    'max-h-[180px] w-full': !small,
  });

  return (
    <svg
      className={clsx('aspect-square h-full', sizeClasses)}
      style={{
        // TODO: Remove -1 when circuits are updated
        transform: `rotate(${rotation}deg) scaleY(-1)`,
      }}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio='xMidYMid meet'
    >
      {/* Outer */}
      <polyline
        points={points}
        className='stroke-foreground'
        fill='none'
        strokeWidth={strokeWidth}
      />
      {/* Innner */}
      <polyline
        points={points}
        className='stroke-accent'
        fill='none'
        strokeWidth={strokeWidth * 0.5}
      />
    </svg>
  );
};
