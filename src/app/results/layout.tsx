'use client';

import { f1Seasons } from './utils';
import { Dropdown } from '../components/Dropdown';

// Default Next Layout
export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ResultsNav />
      {children}
    </>
  );
}

const ResultsNav = () => {
  const seasons = f1Seasons();
  const dummyRaces = [
    'All Races',
    'Bahrain',
    'Mexico',
    'Monaco',
    'Imola',
    'Spain',
  ];
  const dummyDrivers = [
    'All Drivers',
    'Drive 1',
    'Drive 2',
    'Drive 3',
    'Drive 4',
    'Drive 5',
  ];

  return (
    <div className='navbar rounded-box bg-base-300'>
      <h2 className='p-2 text-lg font-bold'>Results:</h2>
      <Dropdown value={seasons[0]} items={seasons} action={() => {}} />
      <Dropdown value={dummyRaces[0]} items={dummyRaces} action={() => {}} />
      <Dropdown
        value={dummyDrivers[0]}
        items={dummyDrivers}
        action={() => {}}
      />
    </div>
  );
};
