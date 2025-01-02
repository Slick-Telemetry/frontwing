'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';

import { GET_DRIVERS } from '@/lib/queries';

import { GetDriversQuery, GetDriversQueryVariables } from '@/generated/types';

export function DisplayDrivers() {
  const { loading, error, data } = useQuery<
    GetDriversQuery,
    GetDriversQueryVariables
  >(GET_DRIVERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data?.drivers.map(({ full_name, ergast_id, number }) => (
    <Link
      href={`/driver/${ergast_id}`}
      key={full_name}
      className='group relative flex items-center gap-2 overflow-hidden rounded-lg border p-2 hover:bg-gradient-to-l hover:from-current hover:via-transparent'
    >
      {/* <div className='rounded-full w-8 h-8 shadow shadow-current flex items-center justify-center'>
      </div> */}
      <div className='absolute right-2 text-6xl font-bold italic opacity-25 group-hover:text-white dark:group-hover:text-black'>
        {number}
      </div>
      <h3 className='group-hover:underline'>{full_name}</h3>
    </Link>
  ));
}
