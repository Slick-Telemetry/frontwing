'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';

import { GET_SEASONS } from '@/lib/queries';

import { ServerComponentError } from '@/components/ServerError';
import { DrawerClose } from '@/components/ui/drawer';

import { GetSeasonsQuery, GetSeasonsQueryVariables } from '@/generated/types';

export function DisplaySeasons({ asDrawer }: { asDrawer?: boolean }) {
  const { data, loading, error } = useQuery<
    GetSeasonsQuery,
    GetSeasonsQueryVariables
  >(GET_SEASONS);

  if (loading) {
    return <div>Loading Seasons...</div>;
  }

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
