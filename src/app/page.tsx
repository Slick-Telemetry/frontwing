import NextEvent from '@/components/NextEvent';

import bg from '../../public/slick-telemetry-bg.png';

export default function Home() {
  return (
    <main
      className='flex flex-1 bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className='w-full grid-rows-3 items-center bg-black/50 py-16 text-white md:grid md:py-0'>
        <div className='row-span-2 my-16 text-center md:self-end'>
          <h1 className='h-fit text-6xl font-bold tracking-tighter uppercase md:text-7xl'>
            Slick Telemetry
          </h1>
          <p className='font-semi-bold sm:text-xl lg:text-3xl'>
            Home of Formula 1 insights
          </p>
        </div>
        <div className='row-start-3'>
          <NextEvent />
        </div>
      </div>
      {/* <div className='mx-auto my-4'>Upcoming event:</div> */}
    </main>
  );
}
