'use client';

import { useAtom } from 'jotai';
import { useEffect } from 'react';

import {
  ConstructorResultsInfo,
  DriverResultsInfo,
} from '@/app/(features)/RaceTimeline';
import { Tabs } from '@/app/ui/Tabs';
import { Timeline, TimelineElement } from '@/app/ui/Timeline';
import { allConstructorAtom } from '@/atoms/constructors';
import { allDriversAtom } from '@/atoms/drivers';
import { raceAtom, seasonRacesAtom } from '@/atoms/races';
import { fetchSessionResults } from '@/atoms/sessions';

// import { RaceSchedule } from '../../RaceResults';
// import { handleRaceChangeAtom, seasonRacesAtom } from '@/atoms/races';

export default function ResultsPage({
  params,
}: {
  params: { location: string };
}) {
  const [races] = useAtom(seasonRacesAtom);
  const [_, setRace] = useAtom(raceAtom);

  useEffect(() => {
    setRace(
      races.find((race) => race.Location === params.location) || 'All Races',
    );
  }, [races, params.location, setRace]);
  // useAtom(fetchStandings);
  // useAtom(fetchSessionResults);
  useAtom(fetchSessionResults);

  // const [constructorStandings] = useAtom(constructorStandingsAtom);
  // const [driverStandings] = useAtom(driverStandingsAtom);
  const [drivers] = useAtom(allDriversAtom);
  const [constructors] = useAtom(allConstructorAtom);

  // const [driverStandings] = useAtom(driverStandingsAtom);

  // const [, handleRaceChange] = useAtom(handleRaceChangeAtom);
  // const [allRaces] = useAtom(seasonRacesAtom)

  // if (!params) return <></>;
  // Get all

  // if (allRaces && allRaces.length > 0) {
  //   console.log('all races', allRaces[parseInt(params.round) - 1])

  //   handleRaceChange(allRaces[parseInt(params.round) - 1]);
  // }

  return (
    <main>
      <Tabs
        headers={['Drivers', 'Constructors']}
        containers={[
          <Timeline key='Driver Results'>
            {drivers.map((driver, index, allDrivers) => (
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
