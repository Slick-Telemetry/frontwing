import Image from 'next/image';
import Link from 'next/link';

import { MainNav } from './MainNav';

export * from './MainNav';
export * from './UserNav';

export const TopNav = () => {
  return (
    <div className='container flex h-16 items-center'>
      <Link
        href='/'
        className='btn btn-ghost flex items-center gap-x-2 text-xl font-extrabold tracking-tight '
      >
        <Image
          src='/slick-telemetry-logo.png'
          width={24}
          height={24}
          alt='Slick Telemetry Logo'
        />
        Slick Telemetry
      </Link>
      <MainNav />
      {/*
      Sidelined for v2
      <div className='flex items-center ml-auto space-x-4'>
        <UserNav />
      </div> */}
    </div>
  );
};
