// {serverError ? <Error statusCode={422} title={serverError} /> : children}

import { Suspense } from 'react';

import { SelectionList } from '@/components/SelectionData/SelectionList';

export default function Page() {
  return (
    <>
      <div className='grid grid-cols-3'>
        <div className='col-span-1 row-span-3'>
          <Suspense fallback={<div className='h-16 animate-pulse' />}>
            <SelectionList />
          </Suspense>
        </div>
        <div>{/* Selection Query Action List Options goes here */}</div>
      </div>
    </>
  );
}
