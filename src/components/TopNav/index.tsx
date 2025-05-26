import { QueryRef } from '@apollo/client';

import { PreloadQuery } from '@/lib/client';
import { GET_SEASONS } from '@/lib/queries';

import { GetSeasonsQuery } from '@/generated/types';

import { MainNav } from './MainNav';
import { ServerStatus } from './ServerStatus';

export const TopNav = () => {
  return (
    <div className='container flex h-16 items-center'>
      <PreloadQuery query={GET_SEASONS}>
        {(seasonQuery) => (
          // <PreloadQuery query={GET_DRIVERS}>
          //   {(driverQuery) => (
          //         <PreloadQuery query={GET_CONSTRUCTORS}>
          //           {(constructorsQuery) => (
          <MainNav
            seasonQuery={seasonQuery as QueryRef<GetSeasonsQuery, unknown>}
            // driverQuery={driverQuery as QueryRef<GetDriversQuery, unknown>}
            // constructorsQuery={
            //   constructorsQuery as QueryRef<GetConstructorsQuery, unknown>
            // }
          />
          // )}
          // {/* </PreloadQuery> */}
          // {/* )} */}
          // {/* </PreloadQuery> */}
        )}
      </PreloadQuery>

      {/* Sidelined for v2 */}
      <div className='ml-auto flex items-center space-x-4'>
        <ServerStatus />
      </div>
    </div>
  );
};
