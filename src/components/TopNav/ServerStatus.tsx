'use client';
import { useAtom } from 'jotai';
import { RouterIcon, ServerCogIcon, ServerOffIcon } from 'lucide-react';

import { globalError, healthStatus } from '@/state-mgmt/store';

export const ServerStatus = () => {
  const [health] = useAtom(healthStatus);
  const [error] = useAtom(globalError);
  return (
    <span
      title={
        (error.type === 'server' && error.message) ||
        (!health && !error.type && 'Connecting...') ||
        (health && !error.type && 'Connected') ||
        'Unknown Error'
      }
    >
      {error.type === 'server' && <ServerOffIcon stroke='red' />}
      {!health && !error.type && <ServerCogIcon />}
      {health && !error.type && <RouterIcon />}
    </span>
  );
};
