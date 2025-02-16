'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';

import { GET_SEASONS } from '@/lib/queries';

import { GetSeasonsQuery, GetSeasonsQueryVariables } from '@/generated/types';

import { ServerComponentError } from '../ServerError';

export function DisplaySeasons() {
  const { loading, error, data } = useQuery<
    GetSeasonsQuery,
    GetSeasonsQueryVariables
  >(GET_SEASONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <ServerComponentError />;

  return data?.events.map(({ year }) => (
    <Link
      href={'/season/' + year + ''}
      key={year}
      className='flex items-center gap-2 hover:underline'
    >
      <h3>{year}</h3>
    </Link>
  ));
}
