import { Suspense } from 'react';

import { DropdownGroup } from '../../components/QueryNav';

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

      <div className='container grid grid-cols-4'>
        {/* <SideBar></SideBar> */}
        <aside>SideBar Component Goes Here</aside>
        <main className='col-span-3 min-h-96'>{children}</main>
      </div>
    </>
  );
}
