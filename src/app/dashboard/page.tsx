// {serverError ? <Error statusCode={422} title={serverError} /> : children}

import Image from 'next/image';
import { Suspense } from 'react';

import { SelectionList } from '@/components/SelectionData/SelectionList';

export default function Page() {
  return (
    <>
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-1 row-span-3'>
          <div>
            <Suspense fallback={<div className='h-16 animate-pulse' />}>
              <SelectionList />
            </Suspense>
          </div>
        </div>
        <div className='col-span-2 grid grid-cols-2 justify-center gap-3'>
          <h2 className='col-span-2'>Charts</h2>
          <div className='rounded border border-primary p-4'>
            <h3>Constructor Standings</h3>
            <Image
              width={400}
              height={200}
              src='https://via.placeholder.com/400x200'
              alt='placeholder'
            />
          </div>
          <div className='rounded border border-primary p-4'>
            <h3>Driver Standings</h3>
            <Image
              width={400}
              height={200}
              src='https://via.placeholder.com/400x200'
              alt='placeholder'
            />
          </div>
          <div className='rounded border border-primary p-4'>
            <h3>Season Travel Map</h3>
            <Image
              width={400}
              height={400}
              src='https://via.placeholder.com/400x400'
              alt='placeholder'
            />
          </div>
          <div className='rounded border border-primary p-4'>
            <h3>Season Average Gap</h3>
            <p>https://slick-telemetry.atlassian.net/l/cp/uXhho51R</p>
            <Image
              width={400}
              height={400}
              src='https://via.placeholder.com/400x400'
              alt='placeholder'
            />
          </div>
        </div>
      </div>
    </>
  );
}
