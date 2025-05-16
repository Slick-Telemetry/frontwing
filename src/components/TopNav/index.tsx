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
import { MobileNav } from './MobileNav';
import { ServerStatus } from './ServerStatus';

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
      <PreloadQuery query={GET_DRIVERS}>
        {(driverQuery) => (
          <PreloadQuery query={GET_SEASONS}>
            {(seasonQuery) => (
              <PreloadQuery query={GET_CONSTRUCTORS}>
                {(constructorsQuery) => (
                  <>
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
                    {/* Sidelined for v2 */}
                    <div className='ml-auto flex items-center space-x-4'>
                      <MobileNav
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
                      {/* <UserNav /> */}
                      <ServerStatus />
                    </div>
                  </>
                )}
              </PreloadQuery>
            )}
          </PreloadQuery>
        )}
      </PreloadQuery>
    </div>
  );
};
