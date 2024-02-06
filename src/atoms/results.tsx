import { atom, useAtom } from 'jotai';
import { atomEffect } from 'jotai-effect';
import { usePathname } from 'next/navigation';

import { allDriversAtom, driverAtom } from './drivers';
import { raceAtom, seasonRacesAtom } from './races';
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

export const useParamToSetAtoms = () => {
  const [season, location, driverId, session] = usePathname()
    .split('/')
    .slice(1);

  const [, setSeason] = useAtom(seasonAtom);
  const [races] = useAtom(seasonRacesAtom);
  const [, setRace] = useAtom(raceAtom);
  const [drivers] = useAtom(allDriversAtom);
  const [, setDriver] = useAtom(driverAtom);
  const [sessions] = useAtom(allSessionsAtom);
  const [, setSession] = useAtom(sessionAtom);

  // if (!season) return;
  setSeason(season);

  // if (!location) return;
  setRace(
    races.find((r) => r.Location.toLowerCase() === location) || 'All Races',
  );

  // if (!driverId) return;
  setDriver(drivers.find((d) => d.DriverId === driverId) || 'All Drivers');

  // if (!sessions) return;
  setSession(sessions.find((s) => s.toLowerCase() === session) || 'Race');
};

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
  if (get(allSessionsAtom).length === 0 || session === 'Race')
    return url.join('/');
  // Add session to url
  else url.push(session.toLowerCase());

  return url.join('/');
});
