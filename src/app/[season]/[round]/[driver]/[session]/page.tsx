'use client';

import { useAtom } from 'jotai';

import { sessionAtom } from '@/atoms/sessions';

export default function SessionPage() {
  const [session] = useAtom(sessionAtom);
  return <h1>{session}</h1>;
}
