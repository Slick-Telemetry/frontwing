import { Suspense } from 'react';

import { DropdownGroup } from '@/components/QueryNav';
import { Sidebar } from '@/components/Sidebar';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<div className='container h-16 animate-pulse' />}>
        <DropdownGroup />
      </Suspense>

      <div className='container flex gap-x-8'>
        <Suspense fallback={<div className='container h-48 animate-pulse' />}>
          <Sidebar />
        </Suspense>
        <main className='col-span-3 w-full'>{children}</main>
      </div>
    </>
  );
}
