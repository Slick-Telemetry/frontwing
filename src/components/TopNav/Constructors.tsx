'use client';

import { QueryRef, useReadQuery } from '@apollo/client';
import Link from 'next/link';

import { bgGradient } from '@/lib/utils';

import { DrawerClose } from '@/components/ui/drawer';

import { GetConstructorsQuery } from '@/generated/types';

import { ServerComponentError } from '../ServerError';

export function DisplayConstructors({
  queryRef,
  asDrawer,
}: {
  queryRef: QueryRef<GetConstructorsQuery>;
  asDrawer?: boolean;
}) {
  const { error, data } = useReadQuery<GetConstructorsQuery>(queryRef);

  if (error) return <ServerComponentError />;

  if (asDrawer) {
    return data?.constructors.map(({ name, ergast_id, color }) => (
      <DrawerClose key={name}>
        <Link
          href={`/constructor/${ergast_id}`}
          className='flex items-center gap-2 rounded-lg p-2 hover:underline'
          style={{
            background: color ? bgGradient(color) : 'initial',
          }}
        >
          {/* Dot Next to name */}
          <div
            className='h-2 w-2 rounded-full'
            style={{ backgroundColor: `#${color}` }}
          ></div>
          <h3>{name}</h3>
        </Link>
      </DrawerClose>
    ));
  }

  return data?.constructors.map(({ name, ergast_id, color }) => (
    <Link
      href={`/constructor/${ergast_id}`}
      key={name}
      className='flex items-center gap-2 rounded-lg p-2 hover:underline'
      style={{
        background: color ? bgGradient(color) : 'initial',
      }}
    >
      {/* Dot Next to name */}
      <div
        className='h-2 w-2 rounded-full'
        style={{ backgroundColor: `#${color}` }}
      ></div>
      <h3>{name}</h3>
    </Link>
  ));
}
