import { useQuery } from '@apollo/client/react';

import { GET_NEXT_EVENT_CIRCUIT } from '@/lib/queries';

import {
  GetNextEventCircuitQuery,
  GetNextEventCircuitQueryVariables,
} from '@/types/graphql';

export const CircuitMap = ({
  location,
  country,
}: {
  location: string;
  country: string;
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

  return (
    <div className='transform-[scaleY(-1)]'>
      <svg
        className='aspect-square h-full max-h-[205px] w-full'
        style={{
          // TODO: Remove -1 when circuits are updated
          transform: `rotate(${rotation * -1}deg)`,
        }}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio='xMidYMid meet'
      >
        {/* Outer */}
        <polyline
          points={points}
          stroke='white'
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
    </div>
  );
};
