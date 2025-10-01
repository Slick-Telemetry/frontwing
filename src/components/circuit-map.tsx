import { useQuery } from '@apollo/client/react';
import clsx from 'clsx';

import { graphql } from '@/types';

export const GET_NEXT_EVENT_CIRCUIT = graphql(`
  query GetNextEventCircuit(
    $location: String!
    $country: String!
    $year: Int!
  ) {
    circuits(
      where: {
        _and: {
          location: { _eq: $location }
          country: { _eq: $country }
          year: { _eq: $year }
        }
      }
      limit: 1
    ) {
      circuit_details
    }
  }
`);

export const CircuitMap = ({
  location,
  country,
  small = false,
  year = new Date().getFullYear(),
}: {
  location: string;
  country: string;
  small?: boolean;
  year?: number;
}) => {
  const { loading, data, error } = useQuery(GET_NEXT_EVENT_CIRCUIT, {
    variables: { location, country, year },
  });

  if (loading || error || !data?.circuits[0]?.circuit_details) return null;

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
    'max-h-[180px] w-full hidden lg:block': !small,
  });

  return (
    <svg
      className={clsx('aspect-square h-full', sizeClasses)}
      style={{
        transform: `rotate(${rotation}deg) scaleY(-1)`,
      }}
      aria-hidden='true'
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
