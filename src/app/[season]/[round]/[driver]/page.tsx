'use client';

import { useAtom } from 'jotai';

import { driverAtom } from '@/atoms/drivers';

export default function DriverPage() {
  const [driver] = useAtom(driverAtom);
  return <h1>{driver === 'All Drivers' ? driver : driver.FullName} - Race</h1>;
}
