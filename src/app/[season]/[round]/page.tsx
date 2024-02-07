'use client';

import { useAtom } from 'jotai';

import {
  ConstructorResultsInfo,
  DriverResultsInfo,
} from '@/app/(features)/RaceTimeline';
import { Tabs } from '@/app/ui/Tabs';
import { Timeline, TimelineElement } from '@/app/ui/Timeline';
import { allConstructorAtom } from '@/atoms/constructors';
import { allDriversAtom } from '@/atoms/drivers';
import { raceAtom } from '@/atoms/races';

export default function ResultsPage() {
  const [drivers] = useAtom(allDriversAtom);
  const [constructors] = useAtom(allConstructorAtom);
  const [race] = useAtom(raceAtom);

  return (
    <main>
      <h1>{race === 'All Races' ? race : race.EventName}</h1>
      <Tabs
        headers={['Drivers', 'Constructors']}
        containers={[
          <Timeline key='Driver Results'>
            {drivers?.map((driver, index, allDrivers) => (
              <TimelineElement
                key={driver.FullName}
                first={index === 0}
                last={index === allDrivers.length - 1}
                odd={index % 2 === 0}
              >
                <DriverResultsInfo driver={driver} />
              </TimelineElement>
            ))}
          </Timeline>,
          <Timeline key='Constructor Results'>
            {constructors.map((con, index, allConstructors) => (
              <TimelineElement
                key={con.name}
                first={index === 0}
                last={index === allConstructors.length - 1}
                odd={index % 2 === 0}
              >
                <ConstructorResultsInfo con={con} />
              </TimelineElement>
            ))}
          </Timeline>,
        ]}
      />
    </main>
  );
}
