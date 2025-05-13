'use client';

import { QueryRef, useReadQuery } from '@apollo/client';
import Link from 'next/link';

import { ServerComponentError } from '@/components/ServerError';

import { GetDriversQuery } from '@/generated/types';

import { FloatingNumber } from '../FloatingNumber';

export function DisplayDrivers({
  queryRef,
}: {
  queryRef: QueryRef<GetDriversQuery>;
}) {
  const { data, error } = useReadQuery(queryRef);
  if (error) return <ServerComponentError />;

  return data?.drivers.map(({ full_name, ergast_id, number }) => (
    <Link
      href={`/driver/${ergast_id}`}
      key={full_name}
      className='group relative flex items-center gap-2 overflow-hidden rounded-lg border p-2 hover:bg-linear-to-l hover:from-current hover:via-transparent'
    >
      <FloatingNumber className='right-2'>{number}</FloatingNumber>
      <h3 className='line-clamp-1 group-hover:underline'>{full_name}</h3>
    </Link>
  ));
}
