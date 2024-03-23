import Link from 'next/link';

export const MainNav = () => {
  return (
    <nav className='mx-8 flex items-center space-x-4 lg:mx-8 lg:space-x-6'>
      <Link
        className='font-medium transition-colors hover:text-primary'
        href='/dashboard'
      >
        Dashboard
      </Link>
      <Link
        className='font-medium transition-colors hover:text-primary'
        href='/schedule'
      >
        Schedule
      </Link>
    </nav>
  );
};
