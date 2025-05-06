'use client';

import Link from 'next/link';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

import SeasonSelector from '@/components/seasonSelector';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const year = (params.year || '2025') as string;

  // Helper to check if a path is active
  const isActive = (href: string) => {
    if (href.endsWith('?chart=constructors')) {
      // Active only if pathname matches and query param is present
      return (
        pathname === `/${year}/standings` &&
        searchParams.get('chart') === 'constructors'
      );
    }
    // For driver standings, active only if pathname matches exactly and no query
    if (href === `/${year}/standings`) {
      return pathname === href && !searchParams.get('chart');
    }
    // For other links, match the pathname exactly
    return pathname === href;
  };

  return (
    <header className='container mx-auto flex items-center gap-2'>
      <div className='flex items-center gap-2'>
        <h1 className='text-2xl font-black'>Season</h1>
        <SeasonSelector year={parseInt(year)} />
      </div>
      <Button variant={isActive(`/${year}`) ? 'default' : 'outline'} asChild>
        <Link href={`/${year}`}>All Events</Link>
      </Button>
      <Button
        variant={isActive(`/${year}/standings`) ? 'default' : 'outline'}
        asChild
      >
        <Link href={`/${year}/standings`}>Driver Standings</Link>
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
          Constructor Standings
        </Link>
      </Button>
      <Button
        variant={isActive(`/${year}/map`) ? 'default' : 'outline'}
        asChild
      >
        <Link href={`/${year}/map`}>Travel Map</Link>
      </Button>
    </header>
  );
};
