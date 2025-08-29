import { MainNav } from '@/components/TopNav/MainNav';
import { ServerStatus } from '@/components/TopNav/ServerStatus';

export const Nav = () => {
  return (
    <div className='container flex h-12 items-center md:h-24'>
      <MainNav />

      {/* Sidelined for v2 */}
      <div className='ml-auto flex items-center space-x-4'>
        <ServerStatus />
      </div>
    </div>
  );
};
