'use client';

import { useAtom } from 'jotai';

import { constructorStandingsAtom, fetchStandings } from '@/atoms/results';

import { RaceSchedule } from './RaceResults';
import { driverData, DriverHeadings } from '../lib/placerholder-results';
import { IConstructorStandings, positionEnding } from '../lib/utils';
import { Table } from '../ui/Table';
import { Tabs } from '../ui/Tabs';

const ConstuctorHeadings = ['position', 'points', 'wins', 'name'];

const ConstructorCard = ({ data }: { data: IConstructorStandings }) => (
  <div className='card overflow-hidden bg-base-100 shadow-xl'>
    <div className='card-body px-0 pb-4 pt-2'>
      <h3 className='card-title max-w-64'>
        {positionEnding(data.pos)} {data.name}
      </h3>
      <div className='flex'>
        <p className='flex-1'>
          Points:
          <br />
          {data.points}
        </p>
        <p className='flex-1'>
          Wins:
          <br />
          {data.wins}
        </p>
      </div>
    </div>
  </div>
);

const ConstructorResults = () => {
  const [constructorStandings] = useAtom(constructorStandingsAtom);
  useAtom(fetchStandings);

  return (
    <>
      <div className='mt-8 grid gap-8 lg:hidden'>
        {constructorStandings.map((constructor) => (
          <ConstructorCard key={constructor.name} data={constructor} />
        ))}
      </div>
      <div className='hidden lg:block'>
        <Table
          key='Constructors Championship'
          headings={ConstuctorHeadings}
          data={constructorStandings}
        />
      </div>
    </>
  );
};

const tabHeaders = ['Races', 'Drivers', 'Constructors'];
const tabs = [
  <RaceSchedule key='Race Results' />,
  <Table
    key='Drivers Championship'
    headings={DriverHeadings}
    data={driverData}
  />,
];

export default function ResultsPage() {
  return (
    <main>
      <Tabs
        headers={tabHeaders}
        containers={[...tabs, <ConstructorResults key='ConstructorResults' />]}
      />
    </main>
  );
}
