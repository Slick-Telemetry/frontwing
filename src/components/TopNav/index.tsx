import Image from 'next/image';
import Link from 'next/link';

import { MainNav } from './MainNav';
import { ServerStatus } from './ServerStatus';
import { ThemeToggler } from './ThemeToggler';

export const TopNav = () => {
  return (
    <div className='container flex h-16 items-center'>
      <Link
        href='/'
        className='btn btn-ghost flex items-center gap-x-2 text-xl font-extrabold tracking-tight'
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

      {/* Sidelined for v2 */}
      <div className='ml-auto flex items-center space-x-4'>
        <ServerStatus />
        <ThemeToggler />
      </div>
    </div>
  );
};
