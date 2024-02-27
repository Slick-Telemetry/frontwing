'use client';

import { useAtom } from 'jotai/react';
import { usePathname, useRouter } from 'next/navigation';

import {
  allDriversAtom,
  driverAtom,
  handleDriverChangeAtom,
} from '@/atoms/drivers';
import { useMainFiltersAtomFetch } from '@/atoms/fetchCalls';
import { handleRaceChangeAtom, raceAtom, seasonRacesAtom } from '@/atoms/races';
import {
  handleMainFilterSubmit,
  telemetryDisableAtom,
  toggleTelemetryDisableAtom,
  useParamToSetAtoms,
} from '@/atoms/results';
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

interface actionT {
  action: () => void;
}

export const MainFilters = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [telemetryDisable] = useAtom(telemetryDisableAtom);
  const [, handleResultsSubmit] = useAtom(handleMainFilterSubmit);

  const changePath = () => {
    // If not home page auto change page
    const url = handleResultsSubmit();
    if (pathname !== '/' && url) router.push('/' + url);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    const telemetry = (e.target as HTMLButtonElement).innerHTML === 'Telemetry';
    const url = handleResultsSubmit();
    router.push('/' + url + (telemetry ? '/telemetry' : ''));
  };

  // hook to trigger if telemetry is disabled or not
  useAtom(toggleTelemetryDisableAtom);

  // Fetch data when atoms change
  useMainFiltersAtomFetch();

  // Handles hydration on page load
  useParamToSetAtoms();

  //! Handle Server Error to stop spinning
  // useAtom(serverErrorAtom)

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-2 lg:gap-4'>
        <SeasonDropdown action={changePath} />
        <RaceDropdown action={changePath} />
      </div>

      <div className='flex items-center gap-2 lg:gap-4'>
        <DriverDropdown action={changePath} />
        in
        <SessionDropdown action={changePath} />
      </div>

      <div className='flex gap-4 px-2'>
        <button onClick={handleSubmit} className='btn btn-primary btn-sm'>
          Results
        </button>
        <button
          onClick={handleSubmit}
          disabled={telemetryDisable}
          className='btn btn-secondary btn-sm'
        >
          Telemetry
        </button>
      </div>
    </div>
  );
};

const SeasonDropdown = ({ action }: actionT) => {
  const [seasons] = useAtom(allSeasonsAtom);
  const [season] = useAtom(seasonAtom);
  const [, changeSeason] = useAtom(handleSeasonChangeAtom);

  const handleAction = (val: string) => {
    changeSeason(val);
    action();
  };

  // Populate seasons

  return <Dropdown value={season} items={seasons} action={handleAction} />;
};

const RaceDropdown = ({ action }: actionT) => {
  const [race] = useAtom(raceAtom);
  const [, changeRace] = useAtom(handleRaceChangeAtom);
  const [races] = useAtom(seasonRacesAtom);

  const handleAction = (val: string) => {
    const match = races && races.find((race) => race.EventName === val);
    if (match) {
      changeRace(match);
      action();
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

const DriverDropdown = ({ action }: actionT) => {
  const [race] = useAtom(raceAtom);
  const [races] = useAtom(seasonRacesAtom);
  const [driver] = useAtom(driverAtom);
  const [, handleDriverChange] = useAtom(handleDriverChangeAtom);
  const [driverList] = useAtom(allDriversAtom);

  const handleAction = (val: string) => {
    handleDriverChange(val);
    action();
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
const SessionDropdown = ({ action }: actionT) => {
  const [race] = useAtom(raceAtom);
  const [races] = useAtom(seasonRacesAtom);
  const [sessionName] = useAtom(sessionAtom);
  const [, handleSessionChange] = useAtom(handleSessionChangeAtom);
  const [sessionList] = useAtom(allSessionsAtom);

  const handleAction = (val: string) => {
    handleSessionChange(val);
    action();
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
