'use client';

import Link from 'next/link';
import React from 'react';

import { ServerStatus } from '@/components/navigation';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import { DisplaySeasons } from './seasons';

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
  const year = new Date().getFullYear();
  return (
    <NavigationMenu className='px-4'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger data-cy='season-selector'>
            Seasons
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[120px] gap-2 p-2'>
              <DisplaySeasons />
            </ul>
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
