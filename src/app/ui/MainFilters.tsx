'use client';

import { useAtom } from 'jotai/react';
// import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import {
  allDriversAtom,
  driverAtom,
  handleDriverChangeAtom,
} from '@/atoms/drivers';
import {
  fetchRaces,
  handleRaceChangeAtom,
  raceAtom,
  seasonRacesAtom,
} from '@/atoms/races';
import {
  handleMainFilterSubmit,
  telemetryDisableAtom,
  toggleTelemetryDisableAtom,
} from '@/atoms/results';
import {
  allSeasonsAtom,
  fetchSeasons,
  handleSeasonChangeAtom,
  seasonAtom,
} from '@/atoms/seasons';
import {
  allSessionsAtom,
  fetchSessionResults,
  handleSessionChangeAtom,
  sessionAtom,
} from '@/atoms/sessions';

import { Dropdown } from './Dropdown';

interface actionT {
  action: (url: string) => void;
}

export const MainFilters = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [telemetryDisable] = useAtom(telemetryDisableAtom);
  // const [resultsUrl] = useAtom(resultUrlAtom);
  const [, handleResultsSubmit] = useAtom(handleMainFilterSubmit);

  useAtom(toggleTelemetryDisableAtom);
  useAtom(fetchSeasons);
  useAtom(fetchSessionResults);

  const changePath = (url: string) => {
    // If not home page auto change page
    if (pathname !== '/') router.push(url);
  };

  const handleSubmit = () => {
    const url = handleResultsSubmit();
    router.push(url);
  };

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

      <div className='flex gap-4'>
        <button className='btn btn-primary btn-sm'>
          <a onClick={() => handleSubmit()}>Results</a>
        </button>
        <button
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
  const [, handleSeasonChange] = useAtom(handleSeasonChangeAtom);

  const handleAction = (val: string) => {
    // Submit new value get endpoint
    handleSeasonChange(val).then((url: string) => {
      action(url);
    });
  };

  useAtom(fetchSeasons);
  return <Dropdown value={season} items={seasons} action={handleAction} />;
};

const RaceDropdown = ({ action }: actionT) => {
  const [race] = useAtom(raceAtom);
  const [, handleRaceChange] = useAtom(handleRaceChangeAtom);
  const [races] = useAtom(seasonRacesAtom);

  const handleAction = (val: string) => {
    const match = races.find((race) => race.EventName === val);
    if (match) {
      handleRaceChange(match).then((url: string) => {
        action(url);
      });
    }
  };

  useAtom(fetchRaces);

  return (
    <Dropdown
      value={typeof race === 'string' ? race : race.EventName}
      items={races.map((race) => race.EventName)}
      action={handleAction}
    />
  );
};

const DriverDropdown = ({ action }: actionT) => {
  const [driverName] = useAtom(driverAtom);
  const [, handleDriverChange] = useAtom(handleDriverChangeAtom);
  const [driverList] = useAtom(allDriversAtom);

  const handleAction = (val: string) => {
    handleDriverChange(val).then((url: string) => {
      action(url);
    });
  };

  // useAtom(fetchDriver);
  return (
    <Dropdown
      value={driverName}
      items={driverList.map((driver) => driver.FullName)}
      action={handleAction}
    />
  );
};
const SessionDropdown = ({ action }: actionT) => {
  const [sessionName] = useAtom(sessionAtom);
  const [, handleSessionChange] = useAtom(handleSessionChangeAtom);
  const [sessionList] = useAtom(allSessionsAtom);

  const handleAction = (val: string) => {
    handleSessionChange(val).then((url: string) => {
      action(url);
    });
  };

  return (
    <Dropdown
      value={sessionName}
      items={sessionList.reverse()}
      action={handleAction}
    />
  );
};
