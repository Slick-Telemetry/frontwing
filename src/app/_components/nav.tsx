'use client';

import { useQuery } from '@apollo/client/react';
import Link from 'next/link';
import React from 'react';

import { GET_SEASONS } from '@/lib/queries';

import { ServerStatus } from '@/components/navigation';
import { ServerComponentError } from '@/components/ServerError';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export const LandingNav = () => {
  return (
    <div className='relative container flex h-12 items-center justify-center self-start md:h-20'>
      <Nav />

      <div className='absolute right-4'>
        <ServerStatus />
      </div>
    </div>
  );
};

function Nav() {
  {
    /* TODO: Get value from lastest year in schedule */
  }
  const { data, error } = useQuery(GET_SEASONS);
  const year = data?.events[0].year ?? new Date().getFullYear();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger data-cy='season-selector'>
            Seasons
          </NavigationMenuTrigger>
          {/* Season dropdown */}
          <NavigationMenuContent>
            {error && (
              <div className='w-[120px]'>
                <ServerComponentError />
              </div>
            )}
            {data?.events?.map(({ year }) => (
              <NavigationMenuLink asChild key={year}>
                <Link href={'/' + year} className='hover:underline'>
                  <p>{year}</p>
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link href={`/${year}/standings`} data-cy='nav-link-standings'>
              Standings
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={`/${year}/map`} data-cy='nav-link-map'>
              Map
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
