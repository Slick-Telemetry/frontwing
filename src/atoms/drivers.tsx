import { atom } from 'jotai';

export const allDriversAtom = atom<DriverResult[] | null>(null);
export const driverAtom = atom<DriverResult | 'All Drivers'>('All Drivers');

export const handleDriverChangeAtom = atom(
  null,
  async (get, set, driverName: string) => {
    const drivers = get(allDriversAtom);
    const driver = drivers?.find((driver) => driver.FullName === driverName);

    if (driver) {
      set(driverAtom, driver);
    }
  },
);
