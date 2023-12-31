'use client';

import { faker } from '@faker-js/faker';
import { clsx } from 'clsx';
import { atom, useAtom } from 'jotai';

import { RaceResults } from './RaceResults';
import { Table } from '../components/Table';

const tabHeaders = ['Races', 'Drivers', 'Constructors'];

const DriverHeadings = [
  'Position',
  'Driver',
  'Constructor',
  'Points',
  // Race Starts
  // Race Finishes
  // Podiums
];
const ConstuctorHeadings = [
  'Position',
  'Constructor',
  'Points',
  'Drivers',
  // Best Result
  // DNFs
];

const formatDriver = (key: string, i: number) => {
  switch (key) {
    case 'Position':
      return i + 1;
    case 'Driver':
    case 'Constructor':
      return faker.lorem.word();
    case 'Points':
      return faker.number.int(26);
  }
};
const formatConstructor = (key: string, i: number) => {
  switch (key) {
    case 'Position':
      return i + 1;
    case 'Constructor':
      return faker.lorem.word();
    case 'Points':
      return faker.number.int(51);
    case 'Drivers':
      return (
        <>
          {faker.lorem.word()} - {faker.number.int(26)}, {faker.lorem.word()} -{' '}
          {faker.number.int(26)}
        </>
      );
  }
};

const tabs = [
  <RaceResults key='Race Results' />,

  <div key='Drivers Championship' className='rounded bg-base-100 p-4'>
    <Table
      headings={DriverHeadings}
      data={Array.from({ length: 20 }, (_v, index) =>
        DriverHeadings.reduce(
          (obj, value) => ({ ...obj, [value]: formatDriver(value, index) }),
          {},
        ),
      )}
    />
  </div>,
  <div key='Constructors Championship' className='rounded bg-base-100 p-4'>
    <Table
      headings={ConstuctorHeadings}
      data={Array.from({ length: 20 }, (_v, index) =>
        ConstuctorHeadings.reduce(
          (obj, value) => ({
            ...obj,
            [value]: formatConstructor(value, index),
          }),
          {},
        ),
      )}
    />
    ,
  </div>,
];
const tabView = atom<number>(0);
export default function Page() {
  // Testing Jotai & Atoms
  const [tabIndex, setTabIndex] = useAtom(tabView);

  // Active tab has matching tabIndex
  const TabButtons = tabHeaders.map((header, i) => (
    <a
      key={header}
      role='tab'
      className={clsx('tab', { 'tab-active': i === tabIndex })}
      onClick={() => setTabIndex(i)}
    >
      {header}
    </a>
  ));

  // Hide containers not matching tabIndex
  const TabContainers = tabs.map((tab, i) => (
    <div
      key={'tab' + i}
      className={clsx({
        hidden: i !== tabIndex,
      })}
    >
      {tab}
    </div>
  ));

  return (
    <main className='min-h-screen'>
      <div className='container mx-auto mt-4 pb-8'>
        <div role='tablist' className='tabs-boxed tabs my-4'>
          {TabButtons}
        </div>
        {TabContainers}
      </div>
    </main>
  );
}
