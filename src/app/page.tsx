import Link from 'next/link';
import { BsPlusCircle } from 'react-icons/bs';

import { LandingNextEvent } from './(features)/LandingNextEvent';

export default function Home() {
  return (
    <main className='grid min-h-dvh'>
      <Hero />

      {/* Suspense */}
      <LandingNextEvent />
    </main>
  );
}

const Hero = () => (
  <div className='hero min-h-[80dvh] lg:min-h-[60dvh]'>
    <div className='container my-12 flex flex-col flex-wrap items-center gap-x-6 gap-y-4 md:flex-row'>
      {/* Slick Telemetry */}
      <div className='grid flex-1 text-center lg:gap-2'>
        <h1 className='text-2xl font-bold lg:text-5xl'>Slick Telemetry</h1>
        <p className='font-semi-boldl lg:text-2xl'>
          Your home for Formula 1 insights
        </p>
      </div>

      <BsPlusCircle className='h-8 w-8 lg:h-16 lg:w-16 ' />

      {/* Formula */}
      <div className='grid flex-1 gap-2 text-center'>
        <h2 className='text-2xl font-bold lg:text-5xl'>Formula 1</h2>
        <p className='font-semi-bold lg:text-2xl'>
          The world largest science contest
        </p>
      </div>

      {/* Call to Action  */}
      <div className='my-8 w-full text-center'>
        <Link href='/telemetry'>
          <button className='btn btn-primary lg:text-xl'>
            Telemetry Time!
          </button>
        </Link>
      </div>
    </div>
  </div>
);
