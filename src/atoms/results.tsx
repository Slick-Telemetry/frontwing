import { atom } from 'jotai';
import { atomEffect } from 'jotai-effect';

import { raceAtom } from './races';
import { allDriversAtom, driverAtom } from './drivers';
import { seasonAtom } from './seasons';
import { allSessionsAtom, sessionAtom } from './sessions';


// Telemetry Active
export const telemetryDisableAtom = atom(true);
// Telemetry is disabled if no race and driver are selected
export const toggleTelemetryDisableAtom = atomEffect((get, set) => {
  set(
    telemetryDisableAtom,
    get(raceAtom) === 'All Races' || get(driverAtom) === 'All Drivers',
  );
});


export const handleMainFilterSubmit = atom(null, (get) => {
  const url = ['/results', get(seasonAtom)];
  const race = get(raceAtom);
  const driver = get(driverAtom);

  if (race === 'All Races')
    return url.join('/');
  else
    url.push(race.Location)

  if (driver === 'All Drivers')
    return url.join('/');
  else {
    const driverInfo = get(allDriversAtom).find(driver => driver.FullName === get(driverAtom))
    if (driverInfo)
      url.push(driverInfo.DriverId)
    else
      return url.join('/');
  }

  if (get(allSessionsAtom).length === 0)
    return url.join('/');
  else {
    const sessionIndex = get(allSessionsAtom).indexOf(get(sessionAtom)) + 1;
    url.push(sessionIndex.toString())
  }

  return url.join('/');
})