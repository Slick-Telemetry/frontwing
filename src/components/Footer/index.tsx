'use client';

import { useAtom } from 'jotai';

import { fetchHealth } from '@/app/api/fetchHealth';
import { serverConnectedState, serverErrorState } from '@/state-mgmt/atoms';

function Footer() {
  useAtom(fetchHealth);
  const [serverError] = useAtom(serverErrorState);
  const [serverStatus] = useAtom(serverConnectedState);

  return (
    <div className='container min-h-24'>
      <p>Footer</p>
      <p>
        <b>Server Status:</b>{' '}
        {serverError || (serverStatus ? 'Connected' : 'Connecting')}
      </p>
    </div>
  );
}

export { Footer };
