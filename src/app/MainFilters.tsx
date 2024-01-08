'use client';

import { useAtom } from 'jotai/react';
import Link from 'next/link';
import React from 'react';

import { Dropdown } from './ui/Dropdown';
import {
  driverAtom,
  driversAtom,
  fetchDriver,
  fetchRaces,
  fetchSeasons,
  fetchSessions,
  handleDriverChangeAtom,
  handleRaceChangeAtom,
  handleSeasonChangeAtom,
  handleSessionChangeAtom,
  raceAtom,
  racesDropdownAtom,
  resultUrlAtom,
  seasonAtom,
  seasonsAtom,
  sessionAtom,
  sessionsAtom,
  telemetryDisableAtom,
  toggleTelemetryDisableAtom,
} from '../atoms/results';

const SeasonDropdown = () => {
  const [season] = useAtom(seasonAtom);
  const [, handleSeasonChange] = useAtom(handleSeasonChangeAtom);
  const [seasons] = useAtom(seasonsAtom);

  useAtom(fetchSeasons);
  return (
    <Dropdown
      value={season}
      items={seasons}
      action={(val) => handleSeasonChange(val)}
    />
  );
};

const RaceDropdown = () => {
  const [race] = useAtom(raceAtom);
  const [, handleRaceChange] = useAtom(handleRaceChangeAtom);
  const [races] = useAtom(racesDropdownAtom);

  useAtom(fetchRaces);
  return (
    <Dropdown
      value={race}
      items={races}
      action={(val) => handleRaceChange(val)}
    />
  );
};

const DriverDropdown = () => {
  const [driverName] = useAtom(driverAtom);
  const [, handleDriverChange] = useAtom(handleDriverChangeAtom);
  const [driverList] = useAtom(driversAtom);
  useAtom(fetchDriver);
  return (
    <Dropdown
      value={driverName}
      items={driverList}
      action={(val) => handleDriverChange(val)}
    />
  );
};
const SessionDropdown = () => {
  const [sessionName] = useAtom(sessionAtom);
  const [, handleSessionChange] = useAtom(handleSessionChangeAtom);
  const [sessionList] = useAtom(sessionsAtom);
  useAtom(fetchSessions);
  return (
    <Dropdown
      value={sessionName}
      items={sessionList}
      action={(val) => handleSessionChange(val)}
    />
  );
};
export const MainFilters = () => {
  useAtom(toggleTelemetryDisableAtom);
  const [telemetryDisable] = useAtom(telemetryDisableAtom);
  const [resultsUrl] = useAtom(resultUrlAtom);

  useAtom(fetchSeasons);

  return (
    <div className='flex flex-col gap-2'>
      {/* <Dropdown value={} /> */}
      <div className='flex lg:gap-4'>
        <SeasonDropdown />
        <RaceDropdown />
      </div>

      <div className='flex items-center lg:gap-4'>
        <DriverDropdown />
        in
        <SessionDropdown />
      </div>

      <div className='flex gap-4'>
        <button className='btn btn-primary btn-sm'>
          <Link href={resultsUrl}>Results</Link>
        </button>
        <button disabled={telemetryDisable} className='btn btn-sm'>
          Telemetry
        </button>
      </div>
    </div>
  );
};
