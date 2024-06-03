import { atom } from 'jotai';

const LapListState = atom<LapData[]>([]);

// Server Error
export const serverErrorState = atom('');
export const serverConnectedState = atom(false);

export { LapListState };
