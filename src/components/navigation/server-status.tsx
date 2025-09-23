'use client';

import { ServerOffIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { checkServerHealth } from '@/app/api/healthCheck';

export const ServerStatus = () => {
  const [error, setError] = useState(false);
  const pathname = usePathname(); // Tracks the current route in the App Router

  const fetchServerStatus = async () => {
    setError(false);
    try {
      await checkServerHealth();
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    fetchServerStatus(); // Check server status on every route change
  }, [pathname]); // Runs whenever the route changes

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
