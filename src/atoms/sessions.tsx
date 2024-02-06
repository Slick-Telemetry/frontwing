import { atom } from 'jotai';
// Sessions
export const allSessionsAtom = atom<string[] | null>(null);
export const sessionAtom = atom<string>('Race');

export const handleSessionChangeAtom = atom(
  null,
  async (get, set, session: string) => {
    set(sessionAtom, session);
  },
);
