import Image from 'next/image';
import Link from 'next/link';

import { PreloadQuery } from '@/lib/client';
import { GET_SEASONS } from '@/lib/queries';

import { MainNav } from './MainNav';
import { ServerStatus } from './ServerStatus';

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
      <PreloadQuery query={GET_SEASONS}>
        <MainNav />
      </PreloadQuery>

      {/* Sidelined for v2 */}
      <div className='ml-auto flex items-center space-x-4'>
        <ServerStatus />
      </div>
    </div>
  );
};
