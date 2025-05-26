'use client';

import { QueryRef } from '@apollo/client';
import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

import {
  GetConstructorsQuery,
  GetDriversQuery,
  GetSeasonsQuery,
} from '@/generated/types';

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

export function MainNav({
  seasonQuery,
  // driverQuery,
  // constructorsQuery,
}: {
  seasonQuery: QueryRef<GetSeasonsQuery>;
  constructorsQuery?: QueryRef<GetConstructorsQuery>;
  driverQuery?: QueryRef<GetDriversQuery>;
}) {
  return (
    <NavigationMenu className='hidden px-4 md:block'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Seasons</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid gap-3 p-3 md:w-[150px] lg:w-[200px] lg:grid-cols-2'>
              <DisplaySeasons queryRef={seasonQuery} />
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
            <Link href={`/${new Date().getFullYear()}/standings`}>
              Standings
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            {/* TODO: Get value from lastest year in schedule */}
            <Link href={`/${new Date().getFullYear()}/map`}>Map</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none',
            className,
          )}
          {...props}
        >
          <div className='text-sm leading-none font-medium'>{title}</div>
          <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
