import Link from 'next/link';

export const MainNav = () => {
  return (
    <ul className='flex gap-2'>
      <li>
        <Link href='/dashboard'>Dashboard</Link>
      </li>
      <li>
        <Link href='/schedule'>Schedule</Link>
      </li>
    </ul>
  );
};
