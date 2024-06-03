'use client';

import { useAtom } from 'jotai';

import { incrementalHealthCheck } from '@/state-mgmt/store';

function Footer() {
  useAtom(incrementalHealthCheck);

  return (
    <div className='container mt-8 min-h-24'>
      <p>Footer</p>
    </div>
  );
}

export { Footer };
