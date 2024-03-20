import Image from 'next/image';
import Link from 'next/link';

import { UserNav } from '.';
import { MainNav } from './MainNav';
import Logo from './slick-telemetry-logo.webp';

export * from './MainNav';
export * from './UserNav';

export const TopNav = () => {
  return (
    <div className='container flex h-16 items-center px-4'>
      <Link
        href='/'
        className='btn btn-ghost flex items-center gap-x-2 text-xl font-extrabold tracking-tight '
      >
        <Image src={Logo} width={24} height={24} alt='Slick Telemetry Logo' />
        Slick Telemetry
      </Link>
      <MainNav />
      <div className='ml-auto flex items-center space-x-4'>
        <UserNav />
      </div>
    </div>
  );
};
