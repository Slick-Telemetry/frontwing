import Image from 'next/image';
import Link from 'next/link';

import { MainNav } from './MainNav';
import { MobileNav } from './MobileNav';
import { DisplaySeasons } from './Seasons';
import { ServerStatus } from './ServerStatus';

export { DisplaySeasons, MainNav, ServerStatus };

export const TopNav = () => {
  return (
    <div className='container flex h-12 items-center md:h-16'>
      <Link
        href='/'
        className='btn btn-ghost flex items-center gap-x-2 font-extrabold tracking-tight md:text-xl'
        data-cy='home-logo-link'
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
