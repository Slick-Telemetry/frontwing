import * as React from 'react';

import {
  EventSelector,
  SeasonSelector,
  ServerStatus,
  SessionSelector,
} from '@/components/navigation';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function Nav() {
  return (
    <header className='relative flex h-(--header-height) shrink-0 items-center border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
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
            <SeasonSelector />
          </NavigationMenuItem>
          <Separator
            orientation='vertical'
            className='mx-2 data-[orientation=vertical]:h-4'
          />
          <NavigationMenuItem>
            <EventSelector />
          </NavigationMenuItem>
          <Separator
            orientation='vertical'
            className='mx-2 data-[orientation=vertical]:h-4'
          />
          <NavigationMenuItem>
            <SessionSelector />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className='absolute right-4'>
        <ServerStatus />
      </div>
    </header>
  );
}
