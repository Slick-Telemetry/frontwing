'use client';

import Link from 'next/link';
import React from 'react';

import { DisplaySeasons } from './Seasons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';

export function MainNav() {
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
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Constructors</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[300px] gap-3 p-3 md:grid-cols-2 lg:w-[400px]'>
              <DisplayConstructors queryRef={constructorsQuery} />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Drivers</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[400px] gap-3 p-3 md:w-[500px] md:grid-cols-2 lg:w-[600px] lg:grid-cols-3'>
              <DisplayDrivers queryRef={driverQuery} />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            {/* TODO: Get value from lastest year in schedule */}
            <Link
              href={`/${new Date().getFullYear()}/standings`}
              data-cy='nav-link-standings'
            >
              Standings
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            {/* TODO: Get value from lastest year in schedule */}
            <Link
              href={`/${new Date().getFullYear()}/map`}
              data-cy='nav-link-map'
            >
              Map
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
