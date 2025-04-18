import NextEvent from '@/components/NextEvent';

import bg from '../../public/slick-telemetry-bg.png';

export default function Home() {
  return (
    <main
      className='flex flex-1 bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className='grid w-full grid-rows-3 items-center bg-black/50 text-white'>
        <div className='row-start-2 text-center'>
          <h1 className='h-fit text-4xl font-bold tracking-tighter uppercase md:text-7xl'>
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
