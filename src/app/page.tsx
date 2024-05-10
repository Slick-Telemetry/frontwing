import Link from 'next/link';

import { PlusCircle } from '@/components/icons/PlusCircle';
import { NextEvent } from '@/components/SelectionData';

export default function Home() {
  return (
    <main className='flex min-h-[80vh] flex-col'>
      <Hero />

      <div className='mx-auto my-4'>
        <NextEvent />
      </div>
    </main>
  );
}

const Hero = () => (
  <div className='container my-auto flex flex-col flex-wrap items-center justify-center gap-y-6 md:flex-row md:gap-x-12'>
    {/* Slick Telemetry */}
    <div className='grid text-center md:flex-1 lg:gap-2'>
      <h1 className='text-4xl font-bold lg:text-6xl'>Slick Telemetry</h1>
      <p className='font-semi-boldl text-lg  lg:text-3xl'>
        Your home for Formula 1 insights
      </p>
    </div>

    <PlusCircle className='h-8 w-8 lg:h-16 lg:w-16' />

    {/* Formula */}
    <div className='grid gap-2 text-center md:flex-1'>
      <h2 className='text-4xl font-bold lg:text-6xl'>Formula 1</h2>
      <p className='font-semi-bold text-lg lg:text-3xl'>
        The world largest science contest
      </p>
    </div>

    {/* Call to Action  */}
    <div className='my-8 w-full text-center'>
      <Link href='/dashboard'>
        <button className='btn rounded border border-current px-3 py-1 text-2xl md:border-2 md:px-5 md:py-2 md:text-3xl'>
          Dashboard
        </button>
      </Link>
    </div>
  </div>
);
