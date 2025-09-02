import { MainNav, ServerStatus } from '@/components/TopNav';

export const LandingNav = () => {
  return (
    <div className='relative container flex h-12 items-center justify-center self-start md:h-20'>
      <MainNav />

      <div className='absolute right-4'>
        <ServerStatus />
      </div>
    </div>
  );
};
