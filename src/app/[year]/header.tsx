'use client';

import { ChartLine, Globe2, List } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';

const QuickLinks = () => {
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const year = (params.year || '2025') as string;

  // Helper to check if a path is active
  const isActive = (href: string) => {
    // get full pathname with searchParams
    const chartParam = searchParams.get('chart');
    const chart = chartParam ? `?chart=${chartParam}` : '';
    const fullPath = pathname + chart;

    // compare href with fullPath
    return fullPath === href;
  };

  return (
    <>
      <Button variant={isActive(`/${year}`) ? 'default' : 'outline'} asChild>
        <Link href={`/${year}`}>
          <List />
          All Events
        </Link>
      </Button>
      <Button
        variant={isActive(`/${year}/map`) ? 'default' : 'outline'}
        asChild
      >
        <Link href={`/${year}/map`}>
          <Globe2 /> Map
        </Link>
      </Button>
      <Button
        variant={isActive(`/${year}/standings`) ? 'default' : 'outline'}
        asChild
      >
        <Link href={`/${year}/standings`}>
          <ChartLine /> Drivers
        </Link>
      </Button>
      <Button
        variant={
          isActive(`/${year}/standings?chart=constructors`)
            ? 'default'
            : 'outline'
        }
        asChild
      >
        <Link href={`/${year}/standings?chart=constructors`}>
          <ChartLine /> Constructors
        </Link>
      </Button>
    </>
  );
};

export const Header = () => {
  return (
    // <header className='flegap-2 container mx-auto my-4 md:my-0 md:flex-row md:items-center'>
    <header className='container grid grid-cols-2 gap-2 md:flex'>
      <QuickLinks />
    </header>
    // </header>
  );
};
