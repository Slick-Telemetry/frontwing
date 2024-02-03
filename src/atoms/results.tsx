import { atom } from 'jotai';
import { atomEffect } from 'jotai-effect';

import { driverAtom } from './drivers';
import { raceAtom } from './races';
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
  const season = get(seasonAtom);
  const race = get(raceAtom);
  const driver = get(driverAtom);
  const session = get(sessionAtom);
  const url = [];

  // Return if no race specified
  if (!season) return;
  // Add season to url
  else url.push(season);

  // Return if no race specified
  if (race === 'All Races') return url.join('/');
  // Add race location to url
  else url.push(race.Location.toLowerCase());

  // Return if no driver specified
  if (driver === 'All Drivers') return url.join('/');
  // Add driver id to url
  else url.push(driver.DriverId);

  // Return if no sessions
  if (get(allSessionsAtom).length === 0) return url.join('/');
  // Add session to url
  else url.push(session.toLowerCase());

  return url.join('/');
});
