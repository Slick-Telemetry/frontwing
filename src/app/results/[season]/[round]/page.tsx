'use client';

import { useAtom } from 'jotai';

import { Tabs } from '@/app/ui/Tabs';
import {
  constructorStandingsAtom,
  driverStandingsAtom,
  fetchStandings,
} from '@/atoms/results';

// import { RaceSchedule } from '../../RaceResults';
import { StandingsTimeline } from '../../StandingsTimeline';

export default function ResultsPage() {
  useAtom(fetchStandings);
  const [constructorStandings] = useAtom(constructorStandingsAtom);
  const [driverStandings] = useAtom(driverStandingsAtom);

  return (
    <main>
      <Tabs
        headers={['Drivers', 'Constructors']}
        containers={[
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
