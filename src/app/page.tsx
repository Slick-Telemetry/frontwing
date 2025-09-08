import Link from 'next/link';

import { Footer } from '@/components/Footer';
import NextEvent from '@/components/next-event';
import { Button } from '@/components/ui/button';

import { LandingNav } from '@/app/_components/nav';

import bg from '../../public/slick-telemetry-bg.png';

export default function Home() {
  return (
    <>
      <main
        className='flex flex-1 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <div className='bg-background/65 flex-1'>
          <div className='container flex h-full flex-col items-center'>
            <LandingNav />

            <div className='flex flex-1 flex-col items-center justify-center gap-2 text-center'>
              <h1 className='scroll-m-20 text-center text-8xl font-extrabold tracking-tight text-balance uppercase'>
                Slick Telemetry
              </h1>
              <p className='font-light uppercase sm:text-xl lg:text-3xl'>
                Home of Formula 1 insights
              </p>

              <Button asChild>
                <Link href={'/' + new Date().getFullYear()} className='w-fit'>
                  Explore Now
                </Link>
              </Button>
            </div>

            <NextEvent />
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}
