'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { fetchNextEvent } from '@/atoms/fetchCalls';
import {
  nextEventAtom,
  nextEventEffect,
  nextEventLiveAtom,
} from '@/atoms/nextEvent';
import { seasonAtom } from '@/atoms/seasons';

import { EventCountDown } from '../(features)/EventCountdown';

export const NextEvent = () => {
  const [nextEvent] = useAtom(nextEventAtom);
  const [liveEvent] = useAtom(nextEventLiveAtom);

  useAtom(fetchNextEvent);
  useAtom(nextEventEffect);

  if (!nextEvent) return <></>;
  return (
    <>
      <div
        className={clsx('h-3 w-3 rounded-full', {
          'bg-info': !liveEvent,
          'bg-success': liveEvent,
        })}
      ></div>
      <p className='text-sm font-bold'>
        <span className='underline'>{nextEvent.name}</span> <br />
        in <EventCountDown />
      </p>
    </>
  );
};

export const Nav = () => {
  const router = useRouter();
  const [season] = useAtom(seasonAtom);

  const handleSubmit = () => {
    router.push('/' + season);
  };

  return (
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
            <a onClick={handleSubmit}>Results</a>
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
            className='menu dropdown-content menu-sm rounded-box bg-base-100 z-[1] mt-3 w-52 p-2 shadow'
          >
            <li>
              <a>Schedule</a>
            </li>
            <li>
              <a onClick={handleSubmit}>Results</a>
            </li>
            <li>
              <a>Drivers</a>
            </li>
            <li>
              <a>Constructors</a>
            </li>
          </ul>
        </div>
        <div className='hidden min-w-48 items-center gap-2 lg:flex'>
          <NextEvent />
        </div>
      </div>
    </div>
  );
};
