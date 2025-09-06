'use client';
import { useParams } from 'next/navigation';
import * as React from 'react';

import { DisplaySeasons } from '@/components/TopNav';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function Nav() {
  const params = useParams<{
    year: string;
    event?: string;
    session?: string;
  }>();
  return (
    <header className='flex h-(--header-height) shrink-0 items-center border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
      <NavigationMenu viewport={false}>
        <NavigationMenuList className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
          <NavigationMenuItem>
            <SidebarTrigger />
          </NavigationMenuItem>
          <Separator
            orientation='vertical'
            className='mx-2 data-[orientation=vertical]:h-4'
          />
          <NavigationMenuItem>
            <NavigationMenuTrigger data-cy='season-selector'>
              {params.year}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[120px] gap-2 p-2'>
                <DisplaySeasons />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <Separator
            orientation='vertical'
            className='mx-2 data-[orientation=vertical]:h-4'
          />
          <>
            <NavigationMenuItem>
              <NavigationMenuTrigger data-cy='season-selector'>
                {params.event || 'Event'}
              </NavigationMenuTrigger>
              {params.event && (
                <NavigationMenuContent>
                  <ul className='grid w-[120px] gap-2 p-2'>
                    <DisplaySeasons />
                  </ul>
                </NavigationMenuContent>
              )}
            </NavigationMenuItem>
            <Separator
              orientation='vertical'
              className='mx-2 data-[orientation=vertical]:h-4'
            />
          </>
          <NavigationMenuItem>
            <NavigationMenuTrigger data-cy='season-selector'>
              {params.session || 'Session'}
            </NavigationMenuTrigger>
            {params.session && (
              <NavigationMenuContent>
                <ul className='grid w-[120px] gap-2 p-2'>
                  <DisplaySeasons />
                </ul>
              </NavigationMenuContent>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
