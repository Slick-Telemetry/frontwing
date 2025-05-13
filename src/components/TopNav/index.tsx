import { QueryRef } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';

import { PreloadQuery } from '@/lib/client';
import { GET_CONSTRUCTORS, GET_DRIVERS, GET_SEASONS } from '@/lib/queries';

import {
  GetConstructorsQuery,
  GetDriversQuery,
  GetSeasonsQuery,
} from '@/generated/types';

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
      <PreloadQuery query={GET_DRIVERS}>
        {(driverQuery) => (
          <PreloadQuery query={GET_SEASONS}>
            {(seasonQuery) => (
              <PreloadQuery query={GET_CONSTRUCTORS}>
                {(constructorsQuery) => (
                  <MainNav
                    driverQuery={
                      driverQuery as QueryRef<GetDriversQuery, unknown>
                    }
                    seasonQuery={
                      seasonQuery as QueryRef<GetSeasonsQuery, unknown>
                    }
                    constructorsQuery={
                      constructorsQuery as QueryRef<
                        GetConstructorsQuery,
                        unknown
                      >
                    }
                  />
                )}
              </PreloadQuery>
            )}
          </PreloadQuery>
        )}
      </PreloadQuery>

      {/* Sidelined for v2 */}
      <div className='ml-auto flex items-center space-x-4'>
        <ServerStatus />
      </div>
    </div>
  );
};
