'use client';

import { useAtom } from 'jotai';

import {
  constructorStandingsAtom,
  driverStandingsAtom,
  fetchStandings,
} from '@/atoms/standings';

import { RaceSchedule } from '../(features)/RaceSchedule';
import {
  ConstructorStandingInfo,
  DriverStandingInfo,
} from '../(features)/StandingsTimeline';
import { Tabs } from '../ui/Tabs';
import { Timeline, TimelineElement } from '../ui/Timeline';

export default function ResultsPage() {
  useAtom(fetchStandings);
  const [constructorStandings] = useAtom(constructorStandingsAtom);
  const [driverStandings] = useAtom(driverStandingsAtom);

  return (
    <main>
      <Tabs
        headers={['Races', 'Drivers', 'Constructors']}
        containers={[
          <RaceSchedule key='Race Schedule' />,
          <Timeline key='Driver Standings'>
            {driverStandings.map((driver, index, allDrivers) => (
              <TimelineElement
                key={driver.Driver.givenName}
                first={index === 0}
                last={index === allDrivers.length - 1}
                odd={index % 2 === 0}
              >
                <DriverStandingInfo driver={driver} />
              </TimelineElement>
            ))}
          </Timeline>,
          <Timeline key='Constructor Standings'>
            {constructorStandings.map((constructor, index, allConstructors) => (
              <TimelineElement
                key={constructor.Constructor.name}
                first={index === 0}
                last={index === allConstructors.length - 1}
                odd={index % 2 === 0}
              >
                <ConstructorStandingInfo con={constructor} />
              </TimelineElement>
            ))}
          </Timeline>,
        ]}
      />
    </main>
  );
}
