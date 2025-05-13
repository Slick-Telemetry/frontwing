'use client';

import { QueryRef, useReadQuery } from '@apollo/client';
import Link from 'next/link';

import { ServerComponentError } from '@/components/ServerError';

import { GetSeasonsQuery } from '@/generated/types';

export function DisplaySeasons({
  queryRef,
}: {
  queryRef: QueryRef<GetSeasonsQuery>;
}) {
  const { data, error } = useReadQuery<GetSeasonsQuery>(queryRef);
  if (error) return <ServerComponentError />;

  return data?.events.map(({ year }) => (
    <Link
      href={'/' + year}
      key={year}
      className='border-primary flex items-center justify-center rounded border py-1 hover:underline'
    >
      <h3>{year}</h3>
    </Link>
  ));
}
