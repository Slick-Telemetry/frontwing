import { LandingNextEvent } from './(features)/LandingNextEvent';
import { MainFilters } from './ui/MainFilters';

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Suspense */}
      <LandingNextEvent />
    </main>
  );
}

const Hero = () => (
  <div className='hero my-16 lg:my-32'>
    <div className='hero-content gap-8  lg:w-4/5 lg:justify-start'>
      <div className='flex flex-col gap-8 '>
        <h1 className='text-5xl font-bold lg:text-7xl'>Slick Telemetry</h1>
        <MainFilters />
        <p className='max-w-sm text-sm lg:max-w-md lg:text-base'>
          We are Slick Telemetry, like-minded individuals and fans of Formula 1.
          We are currently building an analysis platform for F1 Data Analysis!
        </p>
      </div>
    </div>
  </div>
);
