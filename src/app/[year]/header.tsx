'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import SeasonSelector from '@/components/seasonSelector';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const params = useParams();
  const year = (params.year || '2025') as string;
  return (
    <header className='container mx-auto flex items-center gap-2'>
      <div className='flex items-center gap-2'>
        <h1 className='text-2xl font-black'>Season</h1>
        <SeasonSelector year={parseInt(year)} />
      </div>
      {/* <CheckboxToggle toggle={toggleSessions} label='Show Sessions' /> */}
      <Button variant='outline' asChild>
        <Link href={`/${year}`}>All Events</Link>
      </Button>
      <Button variant='outline' asChild>
        <Link href={`/${year}/standings`}>Driver Standings</Link>
      </Button>
      <Button variant='outline'>
        <Link href={`/${year}/standings?chart=constructors`}>
          Constructor Standings
        </Link>
      </Button>
      <Button variant='outline'>
        <Link href={`/${year}/map`}>Travel Map</Link>
      </Button>
    </header>
  );
};
