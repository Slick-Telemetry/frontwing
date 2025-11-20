'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { SUPPORTED_SEASONS } from '@/lib/constants';

import { PossibleEvents } from '@/components/event-details';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const { year } = useParams<{ year: string }>();
  const validYear = SUPPORTED_SEASONS.includes(parseInt(year));
  const linkYear = validYear ? year : '2025';
  return (
    <div className='mx-auto flex w-full max-w-[500px] flex-col gap-2 p-4 lg:px-6'>
      <Button variant='outline' asChild className='w-fit'>
        <Link href={`/${linkYear}`}>Back to {linkYear} Season</Link>
      </Button>
      <div className='rounded border border-dotted p-4'>
        <h1 className='pointer-cursor line-clamp-1 scroll-m-20 text-4xl font-semibold tracking-tight text-balance'>
          No Event Found
        </h1>
        <hr className='mt-1 mb-2' />
        <PossibleEvents />
        <div
          className='flex h-52 flex-1 rounded bg-cover bg-center bg-no-repeat'
          style={{ backgroundImage: `url(/mclaren-mp4.jpg)` }}
        ></div>
      </div>
    </div>
  );
}
