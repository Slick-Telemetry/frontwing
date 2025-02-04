'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';

import { GET_CONSTRUCTORS } from '@/lib/queries';
import { bgGradient } from '@/lib/utils';

import {
  GetConstructorsQuery,
  GetConstructorsQueryVariables,
} from '@/generated/types';

import { ServerComponentError } from './ServerError';

export function DisplayConstructors() {
  const { loading, error, data } = useQuery<
    GetConstructorsQuery,
    GetConstructorsQueryVariables
  >(GET_CONSTRUCTORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <ServerComponentError />;

  return data?.constructors.map(({ name, ergast_id, color }) => (
    <Link
      href={`/constructor/${ergast_id}`}
      key={name}
      className='flex items-center gap-2 rounded-lg p-2 hover:underline'
      style={{
        background: color ? bgGradient(color) : 'initial',
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
