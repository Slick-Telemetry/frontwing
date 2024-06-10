'use client';

import { useAtom } from 'jotai';

import {
  constructorStandingsAtom,
  driverStandingsAtom,
  fetchStandings,
} from '@/atoms/results';

import { RaceSchedule } from './RaceResults';
import { StandingsTimeline } from './StandingsTimeline';
import { Tabs } from '../ui/Tabs';

export default function ResultsPage() {
  useAtom(fetchStandings);
  const [constructorStandings] = useAtom(constructorStandingsAtom);
  const [driverStandings] = useAtom(driverStandingsAtom);

  return (
    <main>
      <Tabs
        headers={['Races', 'Drivers', 'Constructors']}
        containers={[
          <RaceSchedule key='Race Results' />,
          <StandingsTimeline key='Driver Standings' data={driverStandings} />,
          <StandingsTimeline
            key='Constructor Standings'
            data={constructorStandings}
          />,
        ]}
      />
    </main>
  );
}
