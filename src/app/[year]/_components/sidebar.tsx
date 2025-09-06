'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

type SidebarEndpoint = {
  title: string;
  url: string;
  items?: SidebarEndpoint[];
};
// This is sample data.
const sidebarEndpoints: SidebarEndpoint[] = [
  {
    title: 'Season',
    url: '/$year',
    items: [
      {
        title: 'Map',
        url: '/$year/map',
      },
      {
        title: 'Standings',
        url: '/$year/standings',
      },
    ],
  },
  {
    title: 'Session',
    url: '/$year/$event/$session',
    items: [
      {
        title: 'Fastest Lap',
        url: '/$year/$event/$session?chart=grid',
      },
      {
        title: 'Lap Times',
        url: '/$year/$event/$session?chart=laps',
      },
      {
        title: 'Sector Times',
        url: '/$year/$event/$session?chart=sectors',
      },
      {
        title: 'Strategy',
        url: '/$year/$event/$session?chart=stints',
      },
    ],
  },
];
const formatLink = (url: string, params: DashParams): string | undefined => {
  if (
    (!params.session && url.includes('$session')) ||
    (!params.event && url.includes('$event'))
  ) {
    return;
  }
  return url
    .replace('$year', params.year)
    .replace('$event', params?.event || '')
    .replace('$session', params?.session || 'Race');
};

export function AppSidebar() {
  const params = useParams<DashParams>();
  return (
    <Sidebar variant='inset' collapsible='offcanvas'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link
                href='/'
                data-cy='home-logo-link'
                className='bg-sidebar-accent'
              >
                <div className='flex aspect-square size-8 items-center justify-center'>
                  <Image
                    src='/slick-telemetry-logo.png'
                    width={24}
                    height={24}
                    alt='Slick Telemetry Logo'
                  />{' '}
                </div>
                <div className='flex flex-col gap-0.5 leading-none'>
                  <h1 className='font-extrabold'>Slick Telemetry</h1>
                  <span>v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className='gap-2'>
            {sidebarEndpoints.map((item) => (
              <SidebarItem key={item.title} item={item} params={params} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function SidebarItem({
  item,
  params,
}: {
  item: SidebarEndpoint;
  params: DashParams;
}) {
  const url = formatLink(item.url, params);
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        {!params.session && item.url.includes('$session') ? (
          <span className='text-muted-foreground cursor-not-allowed font-medium opacity-50'>
            {item.title}
          </span>
        ) : (
          <a href={url} className='font-medium'>
            {item.title}
          </a>
        )}
      </SidebarMenuButton>
      {item.items?.length ? (
        <SidebarMenuSub className='ml-0 border-l-0 px-1.5'>
          {item.items.map((item) => (
            <SidebarSubItem key={item.title} item={item} params={params} />
          ))}
        </SidebarMenuSub>
      ) : null}
    </SidebarMenuItem>
  );
}

function SidebarSubItem({
  item,
  params,
}: {
  item: SidebarEndpoint;
  params: DashParams;
}) {
  return (
    <SidebarMenuSubItem key={item.title}>
      <SidebarMenuSubButton
        asChild
        // isActive
      >
        {!params.session && item.url.includes('$session') ? (
          <span className='text-muted-foreground cursor-not-allowed opacity-50'>
            {item.title}
          </span>
        ) : (
          <a href={formatLink(item.url, params)}>{item.title}</a>
        )}
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
