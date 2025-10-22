'use client';

import { ServerOffIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const checkServerHealth = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_HASURA_URL}/healthz`);
  if (!response.ok) {
    throw new Error('Server not healthy');
  }
  return;
};

export const ServerStatus = () => {
  const [error, setError] = useState(false);
  const [path, setPath] = useState('');
  const pathName = usePathname(); // Tracks the current route in the App Router

  // Check health only pathname has changed
  if (path !== pathName) {
    setPath(pathName);
    checkServerHealth()
      .then(() => setError(false))
      .catch(() => setError(true));
  }

  if (!error) return null;

  return (
    <div data-cy='server-error' title='Server Error'>
      <a
        href='https://status.slicktelemetry.com/'
        target='_blank'
        rel='noreferrer'
      >
        <ServerOffIcon stroke='red' />
      </a>
    </div>
  );
};
