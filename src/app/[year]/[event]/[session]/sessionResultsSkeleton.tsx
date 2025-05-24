import React from 'react';

const SessionResultsSkeleton = () => {
  return (
    <>
      {/* Title Area Skeleton */}
      <div className='animate-pulse'>
        <div className='mb-2 h-6 w-48 rounded bg-gray-700'></div>{' '}
        {/* Session Name */}
        <div className='h-8 w-64 rounded bg-gray-700'></div> {/* Event Name */}
      </div>

      {/* View Switch Buttons Skeleton */}
      <div className='mt-6 grid w-full grid-cols-2 gap-4'>
        <div className='h-10 rounded bg-gray-700'></div> {/* Grid Button */}
        <div className='h-10 rounded bg-gray-700'></div> {/* Charts Button */}
      </div>

      {/* Grid View Skeleton (Default) */}
      <div className='grid animate-pulse gap-4 py-4 lg:grid-cols-5'>
        {/* Placeholder Session Cards (mimicking the grid layout) */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className='relative rounded border border-gray-700 bg-gray-800 p-3'
          >
            <div className='absolute top-2 right-4 h-8 w-8 rounded bg-gray-700'></div>{' '}
            {/* Position */}
            <div className='mb-2 h-4 w-3/4 rounded bg-gray-700'></div>{' '}
            {/* Constructor */}
            <div className='h-5 w-1/2 rounded bg-gray-700'></div>{' '}
            {/* Driver Name */}
            <div className='mt-1 h-3 w-1/4 rounded bg-gray-700'></div>{' '}
            {/* Race Time/Placeholder */}
            <div className='my-4 h-12 rounded bg-gray-700'></div>{' '}
            {/* Fastest Lap/Lap/Stint */}
            <div className='grid h-12 grid-cols-3 gap-2 rounded bg-gray-700'></div>{' '}
            {/* Sector Times */}
          </div>
        ))}
      </div>

      {/* Note: For simplicity, we are only showing the grid skeleton initially.
           A more complex skeleton could conditionally render chart placeholders. */}
    </>
  );
};

export default SessionResultsSkeleton;
