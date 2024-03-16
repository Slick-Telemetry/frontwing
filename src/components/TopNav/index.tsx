import Link from 'next/link';

import { UserNav } from '.';
import { MainNav } from './MainNav';

export * from './MainNav';
export * from './UserNav';

export const TopNav = () => {
  return (
    <div className='container flex justify-between py-8'>
      <Link href='/' className='btn btn-ghost text-xl'>
        Slick Telemetry
      </Link>
      <MainNav />
      <UserNav />
    </div>
  );
};
