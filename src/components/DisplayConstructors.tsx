'use client';

import { useQuery } from '@apollo/client';

import { GET_CONSTRUCTORS } from '@/lib/queries';

// import {
//   GetConstructorsQuery,
//   GetConstructorsQueryVariables,
// } from '@/generated/graphql';

export function DisplayConstructors() {
  const { loading, error, data } = useQuery(GET_CONSTRUCTORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data?.constructors.map(
    ({ name, color }: { name: string; color: string }) => (
      <div key={name} className='flex items-center justify-between gap-2'>
        <h3>{name}</h3>
        <div
          style={{
            backgroundColor: `#${color}`,
            borderRadius: '50%',
            height: '20px',
            width: '20px',
          }}
        ></div>
      </div>
    ),
  );
}
