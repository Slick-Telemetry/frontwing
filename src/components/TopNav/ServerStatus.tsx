'use client';

import { RouterIcon, ServerCogIcon, ServerOffIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { checkServerHealth } from '@/app/api/healthCheck';

export const ServerStatus = () => {
  const [status, setStatus] = useState('loading');
  const pathname = usePathname(); // Tracks the current route in the App Router

  const fetchServerStatus = async () => {
    try {
      setStatus('loading');
      const result = await checkServerHealth();
      setStatus(result);
    } catch {
      setStatus('error');
    }
  };

  useEffect(() => {
    fetchServerStatus(); // Check server status on every route change
  }, [pathname]); // Runs whenever the route changes

  return (
    <div title={status.toUpperCase()}>
      {status === 'loading' && <ServerCogIcon />}
      {status === 'error' && <ServerOffIcon stroke='red' />}
      {status === 'connected' && <RouterIcon />}
    </div>
  );
};
