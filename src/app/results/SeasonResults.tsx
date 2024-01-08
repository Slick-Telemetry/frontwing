'use client';

import { RaceSchedule } from './RaceResults';
import {
  constructorsData,
  ConstuctorHeadings,
  driverData,
  DriverHeadings,
} from '../lib/placerholder-results';
import { Table } from '../ui/Table';
import { Tabs } from '../ui/Tabs';

const tabHeaders = ['Races', 'Drivers', 'Constructors'];
const tabs = [
  <RaceSchedule key='Race Results' />,

  <div key='Drivers Championship' className='rounded bg-base-100 p-4'>
    <Table headings={DriverHeadings} data={driverData} />
  </div>,
  <div key='Constructors Championship' className='rounded bg-base-100 p-4'>
    <Table headings={ConstuctorHeadings} data={constructorsData} />,
  </div>,
];

export default function ResultsPage() {
  return (
    <main className='min-h-screen'>
      <Tabs headers={tabHeaders} containers={tabs} />
    </main>
  );
}
