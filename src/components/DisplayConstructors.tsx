'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';

import { hexToRgba } from '@/lib/helpers';
import { GET_CONSTRUCTORS } from '@/lib/queries';

import {
  GetConstructorsQuery,
  GetConstructorsQueryVariables,
} from '@/generated/types';

export function DisplayConstructors() {
  const { loading, error, data } = useQuery<
    GetConstructorsQuery,
    GetConstructorsQueryVariables
  >(GET_CONSTRUCTORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data?.constructors.map(({ name, ergast_id, color }) => (
    <Link
      href={`/constructor/${ergast_id}`}
      key={name}
      className='flex items-center gap-2 rounded-lg p-2 hover:underline'
      style={{
        background: color
          ? `linear-gradient(to left, ${hexToRgba(color, 0.8)}, ${hexToRgba(color, 0)})`
          : 'initial',
      }}
    >
      <div
        className='h-2 w-2 rounded-full'
        style={{ backgroundColor: `#${color}` }}
      ></div>
      <h3>{name}</h3>
    </Link>
  ));
}
