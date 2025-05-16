'use client';

import { QueryRef, useReadQuery } from '@apollo/client';
import Link from 'next/link';

import { DrawerClose } from '@/components/ui/drawer';

import { GetSeasonsQuery } from '@/generated/types';

import { ServerComponentError } from '../ServerError';

export function DisplaySeasons({
  queryRef,
  asDrawer,
}: {
  queryRef: QueryRef<GetSeasonsQuery>;
  asDrawer?: boolean;
}) {
  const { data, error } = useReadQuery<GetSeasonsQuery>(queryRef);

  if (error) return <ServerComponentError />;

  if (asDrawer) {
    return data?.events.map(({ year }) => (
      <DrawerClose asChild key={year}>
        <Link
          href={'/' + year}
          className='border-primary flex items-center justify-center rounded border py-1 hover:underline'
        >
          <h3>{year}</h3>
        </Link>
      </DrawerClose>
    ));
  }

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
