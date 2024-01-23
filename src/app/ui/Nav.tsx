import Link from 'next/link';

export const Nav = () => (
  <div className='navbar mx-auto lg:container'>
    <div className='navbar-start'>
      <Link href='/' className='btn btn-ghost text-xl'>
        Slick Telemetry
      </Link>
    </div>
    <div className='navbar-center hidden lg:flex'>
      <ul className='menu menu-horizontal gap-2 px-1'>
        <li>
          <a>Schedule</a>
        </li>
        <li>
          <Link href='/results'>Results</Link>
        </li>
        <li>
          <a>Drivers</a>
        </li>
        <li>
          <a>Constructors</a>
        </li>
      </ul>
    </div>
    <div className='navbar-end'>
      <div className='dropdown dropdown-end'>
        <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='inline-block h-5 w-5 stroke-current'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16'
            ></path>
          </svg>
        </div>
        <ul
          tabIndex={0}
          className='menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow'
        >
          <li>
            <a>Schedule</a>
          </li>
          <li>
            <Link href='/results'>Results</Link>
          </li>
          <li>
            <a>Drivers</a>
          </li>
          <li>
            <a>Constructors</a>
          </li>
        </ul>
      </div>
      <div className='hidden items-center gap-2 lg:flex'>
        <div className='h-3 w-3 rounded-full bg-amber-300'></div>
        <p className='text-sm font-bold'>
          53 days until <span className='underline'>Winter Testing</span>
        </p>
      </div>
    </div>
  </div>
);
