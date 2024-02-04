import { atom } from 'jotai';

import { raceAtom } from './races';
import { seasonAtom } from './seasons';

// Drivers
export const allDriversAtom = atom<DriverResult[]>([]);
export const driverAtom = atom<DriverResult | 'All Drivers'>('All Drivers');

export const handleDriverChangeAtom = atom(
  null,
  async (get, set, driverName: string) => {
    const baseUrl = '/' + get(seasonAtom);

    const race = get(raceAtom);
    const raceLoc = race !== 'All Races' && race.Location.toLowerCase();

    const drivers = get(allDriversAtom);
    const driver = drivers.find((driver) => driver.FullName === driverName);

    if (driver) {
      set(driverAtom, driver);
      return baseUrl + (raceLoc && `/${raceLoc}/${driver.DriverId}`);
    }
    //   return nagivation url
    set(driverAtom, 'All Drivers');
    return baseUrl + (raceLoc && `/${raceLoc}`);
  },
);
