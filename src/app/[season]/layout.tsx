'use client';

import { useAtom } from 'jotai';
import Error from 'next/error';

import { serverErrorAtom } from '@/atoms/results';

import { MainFilters } from '../ui/MainFilters';

// Default Next Layout
export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [serverError] = useAtom(serverErrorAtom);

  return (
    <>
      <div className='rounded-box bg-base-300 container mx-auto mb-4 p-4 px-2 md:my-4'>
        <MainFilters />
      </div>
      {serverError ? <Error statusCode={422} title={serverError} /> : children}
    </>
  );
}
