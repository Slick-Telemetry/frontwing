import { QueryRef } from '@apollo/client';
import { Menu } from 'lucide-react';
import Link from 'next/link';

import { DisplayConstructors } from '@/components/TopNav/Constructors';
import { DisplayDrivers } from '@/components/TopNav/Drivers';
import { DisplaySeasons } from '@/components/TopNav/Seasons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import {
  GetConstructorsQuery,
  GetDriversQuery,
  GetSeasonsQuery,
} from '@/generated/types';

export const MobileNav = ({
  driverQuery,
  seasonQuery,
  constructorsQuery,
}: {
  driverQuery: QueryRef<GetDriversQuery>;
  seasonQuery: QueryRef<GetSeasonsQuery>;
  constructorsQuery: QueryRef<GetConstructorsQuery>;
}) => {
  return (
    <nav className='bg-muted ring-primary fixed right-4 bottom-4 mx-auto flex h-12 w-12 items-center justify-center rounded ring md:hidden'>
      {/* Mobile Nav */}
      <Drawer>
        <DrawerTrigger>
          <Menu size={32} />
        </DrawerTrigger>
        <DrawerContent className='shadow-primary/75 max-w-dvw shadow-[0_0_6px]'>
          <DrawerHeader>
            <DrawerTitle className='hidden'>Menu</DrawerTitle>
            <DrawerDescription className='hidden'>
              Select a menu option
            </DrawerDescription>
          </DrawerHeader>
          <div className='px-4'>
            <Accordion type='single' collapsible>
              <AccordionItem value='season'>
                <AccordionTrigger>Season</AccordionTrigger>
                <AccordionContent className='grid max-h-40 grid-cols-4 gap-2 overflow-scroll'>
                  <DisplaySeasons queryRef={seasonQuery} asDrawer />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='drivers'>
                <AccordionTrigger>Drivers</AccordionTrigger>
                <AccordionContent className='grid max-h-40 grid-cols-2 gap-2 overflow-scroll'>
                  <DisplayDrivers queryRef={driverQuery} asDrawer />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='constructors'>
                <AccordionTrigger>Constructors</AccordionTrigger>
                <AccordionContent className='grid max-h-40 grid-cols-2 gap-2 overflow-scroll'>
                  <DisplayConstructors queryRef={constructorsQuery} asDrawer />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link
              className='block w-full py-4 text-sm font-medium'
              href={`/${new Date().getFullYear()}/standings`}
            >
              Standings
            </Link>
            <Link
              className='block w-full py-4 text-sm font-medium'
              href={`/${new Date().getFullYear()}/map`}
            >
              Map
            </Link>
          </div>
          <DrawerFooter className='flex-row justify-between gap-2'>
            <DrawerClose asChild>
              <Button asChild>
                <Link
                  className='block flex-1 py-4 text-sm font-medium'
                  href='/'
                >
                  Home
                </Link>
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button className='flex-1' variant='secondary'>
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </nav>
  );
};
