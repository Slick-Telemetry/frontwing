import { useQuery } from '@apollo/client';

import { GET_NEXT_EVENT_CIRCUIT } from '@/lib/queries';

import { CircuitDetails } from '@/generated/customTypes';
import {
  GetNextEventCircuitQuery,
  GetNextEventCircuitQueryVariables,
} from '@/generated/types';

export const CircuitMap = ({
  location,
  country,
}: {
  location: string;
  country: string;
}) => {
  const { loading, data } = useQuery<
    GetNextEventCircuitQuery,
    GetNextEventCircuitQueryVariables
  >(GET_NEXT_EVENT_CIRCUIT, {
    variables: { location, country, year: new Date().getFullYear() - 1 },
  });

  if (!data || loading) return null;

  const circuit_details = data.circuits[0].circuit_details as CircuitDetails;

  const xy_values = circuit_details?.xy_values as {
    X: number;
    Y: number;
  }[];

  // Compute bounding box and offsets
  const [minX, minY] = [
    Math.min(...xy_values.map((p) => p.X)),
    Math.min(...xy_values.map((p) => p.Y)),
  ];
  const [maxX, maxY] = [
    Math.max(...xy_values.map((p) => p.X)),
    Math.max(...xy_values.map((p) => p.Y)),
  ];

  const padding = 500; // padding around track
  const width = maxX - minX + padding * 2;
  const height = maxY - minY + padding * 2;

  const points = xy_values
    .map((p) => `${p.X - minX + padding},${p.Y - minY + padding}`)
    // .concat(`${xy_values[0].X - minX + padding},${xy_values[0].Y - minY + padding}`) // close loop
    .join(' ');

  return (
    <div className='flex h-[150px] items-center justify-center'>
      <svg
        className='h-full w-full'
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio='xMidYMid meet'
      >
        {/* Outer */}
        <polyline
          points={points}
          className='stroke-accent'
          stroke='white'
          fill='none'
          strokeWidth='250'
        />
        {/* Innner */}
        <polyline
          points={points}
          stroke='black'
          fill='none'
          strokeWidth='125'
        />
        /
      </svg>
    </div>
  );
};
