'use client';

import { MainFilters } from '../MainFilters';

// Default Next Layout
export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='container mx-auto mb-4 rounded-box bg-base-300 p-4 lg:my-4'>
        <MainFilters />
      </div>
      {children}
    </>
  );
}
