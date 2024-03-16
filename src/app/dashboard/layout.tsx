import { DropdownGroup } from '../../components/QueryNav';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DropdownGroup />

      <div className='container grid grid-cols-4'>
        {/* <SideBar></SideBar> */}
        <aside>SideBar Component Goes Here</aside>
        <main className='col-span-3 min-h-96'>{children}</main>
      </div>
    </>
  );
}
