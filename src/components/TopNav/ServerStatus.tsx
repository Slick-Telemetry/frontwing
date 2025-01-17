'use client';
import { RouterIcon } from 'lucide-react';

export const ServerStatus = () => {
  return (
    <span title='Unknown Error'>
      {/* {error.type === 'server' && <ServerOffIcon stroke='red' />} */}
      {/* {!health && !error.type && <ServerCogIcon />} */}
      {/* {health && !error.type && <RouterIcon />} */}
      <RouterIcon />
    </span>
  );
};
