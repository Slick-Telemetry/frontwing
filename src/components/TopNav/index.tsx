import Image from 'next/image';
import Link from 'next/link';

import { MobileNav } from '@/components/TopNav/MobileNav';
import { ServerStatus } from '@/components/TopNav/ServerStatus';

import { MainNav } from './MainNav';

export const TopNav = () => {
  return (
    <div className='container flex h-12 items-center md:h-16'>
      <Link
        href='/'
        className='btn btn-ghost flex items-center gap-x-2 font-extrabold tracking-tight md:text-xl'
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
      <MobileNav />

      {/* Sidelined for v2 */}
      <div className='ml-auto flex items-center space-x-4'>
        <ServerStatus />
      </div>
      <MobileNav />
    </div>
  );
};
