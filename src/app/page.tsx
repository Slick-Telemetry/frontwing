import NextEvent from '@/components/NextEvent';

import bg from '../../public/slick-telemetry-bg.png';

export default function Home() {
  return (
    <>
      <main
        className='flex flex-1 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <div className='w-full grid-rows-3 items-center bg-black/60 py-16 text-white md:grid md:py-0'>
          <div className='my-16 text-center md:self-end'>
            <h1 className='scroll-m-20 text-center text-8xl font-extrabold tracking-tight text-balance uppercase'>
              Slick Telemetry
            </h1>
            <p className='font-semi-bold uppercase sm:text-xl lg:text-3xl'>
              Home of Formula 1 insights
            </p>
          </div>
          <div className='row-start-3'>
            <NextEvent />
          </div>
        </div>
        {/* <div className='mx-auto my-4'>Upcoming event:</div> */}
      </main>
    </>
  );
}
