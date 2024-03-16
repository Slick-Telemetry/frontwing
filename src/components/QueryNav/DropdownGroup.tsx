'use client';

import { useAtom } from 'jotai/react';

import {
  allDriversAtom,
  driverAtom,
  handleDriverChangeAtom,
} from '@/atoms/drivers';
import { useMainFiltersAtomFetch } from '@/atoms/fetchCalls';
import { handleRaceChangeAtom, raceAtom, seasonRacesAtom } from '@/atoms/races';
import { useParamToSetAtoms } from '@/atoms/results';
import {
  allSeasonsAtom,
  handleSeasonChangeAtom,
  seasonAtom,
} from '@/atoms/seasons';
import {
  allSessionsAtom,
  handleSessionChangeAtom,
  sessionAtom,
} from '@/atoms/sessions';

import { Dropdown } from './Dropdown';

export const DropdownGroup = () => {
  // Fetch data when atoms change
  useMainFiltersAtomFetch();

  // Handles hydration on page load
  useParamToSetAtoms();

  return (
    <div className='container flex gap-2 lg:gap-4'>
      <SeasonDropdown />
      <RaceDropdown />
      <SessionDropdown />
      <DriverDropdown />
    </div>
  );
};

const SeasonDropdown = () => {
  const [seasons] = useAtom(allSeasonsAtom);
  const [season] = useAtom(seasonAtom);
  const [, changeSeason] = useAtom(handleSeasonChangeAtom);

  const handleAction = (val: string) => {
    changeSeason(val);
  };

  // Populate seasons

  return <Dropdown value={season} items={seasons} action={handleAction} />;
};

const RaceDropdown = () => {
  const [race] = useAtom(raceAtom);
  const [, changeRace] = useAtom(handleRaceChangeAtom);
  const [races] = useAtom(seasonRacesAtom);

  const handleAction = (val: string) => {
    const match = races && races.find((race) => race.EventName === val);
    if (match) {
      changeRace(match);
    }
  };

  // Populate Races

  return (
    <Dropdown
      value={race === 'All Races' ? race : race.EventName}
      items={races && ['All Races', ...races.map((race) => race.EventName)]}
      action={handleAction}
    />
  );
};

const DriverDropdown = () => {
  const [race] = useAtom(raceAtom);
  const [races] = useAtom(seasonRacesAtom);
  const [driver] = useAtom(driverAtom);
  const [, handleDriverChange] = useAtom(handleDriverChangeAtom);
  const [driverList] = useAtom(allDriversAtom);

  const handleAction = (val: string) => {
    handleDriverChange(val);
  };

  let items = null;

  // If races it not default we need values
  if (race === 'All Races' && races && races.length > 0) {
    items = [];
  }

  // If race is default we return []
  if (race !== 'All Races' && driverList) {
    items = ['All Drivers', ...driverList.map((driver) => driver.FullName)];
  }
  // const items = (driverList && driverList.length > 0 && race !== 'All Races') ? [

  return (
    <Dropdown
      value={driver !== 'All Drivers' ? driver.FullName : driver}
      items={items}
      action={handleAction}
    />
  );
};
const SessionDropdown = () => {
  const [race] = useAtom(raceAtom);
  const [races] = useAtom(seasonRacesAtom);
  const [sessionName] = useAtom(sessionAtom);
  const [, handleSessionChange] = useAtom(handleSessionChangeAtom);
  const [sessionList] = useAtom(allSessionsAtom);

  const handleAction = (val: string) => {
    handleSessionChange(val);
  };

  let items = null;

  // If races it not default we need values
  if (race === 'All Races' && races && races.length > 0) {
    items = [];
  }

  // If race is default we return []
  if (race !== 'All Races' && sessionList) {
    items = [...sessionList.reverse()];
  }

  return <Dropdown value={sessionName} items={items} action={handleAction} />;
};
