'use client';

import { useAtom } from 'jotai';

import { ConstructorResultsInfo, DriverResultsInfo } from '@/app/(features)/RaceTimeline';
import { Tabs } from '@/app/ui/Tabs';
import { Timeline, TimelineElement } from '@/app/ui/Timeline';
import { allDriversAtom } from '@/atoms/drivers';
import { fetchSessionResults } from '@/atoms/sessions';
import {
  constructorStandingsAtom,
  driverStandingsAtom,
  fetchStandings,
} from '@/atoms/standings';
import { allConstructorAtom } from '@/atoms/constructors';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { raceAtom, seasonRacesAtom } from '@/atoms/races';
import { useEffect } from 'react';

// import { RaceSchedule } from '../../RaceResults';
// import { handleRaceChangeAtom, seasonRacesAtom } from '@/atoms/races';

export default function ResultsPage({ params }: { params: { location: string } }) {


  const [races] = useAtom(seasonRacesAtom)
  const [_, setRace] = useAtom(raceAtom)

  useEffect(() => {
    setRace(races.find(race => race.Location === params.location) || 'All Races')
  }, [races])
  // useAtom(fetchStandings);
  // useAtom(fetchSessionResults);
  useAtom(fetchSessionResults);

  const [constructorStandings] = useAtom(constructorStandingsAtom);
  const [driverStandings] = useAtom(driverStandingsAtom);
  const [drivers] = useAtom(allDriversAtom);
  const [constructors] = useAtom(allConstructorAtom);

  console.log('data', [drivers, constructors])
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

// <Timeline>
//   {constructorStandings.map((constructor, index, allConstructors) => (
//     <TimelineElement
//       key={constructor.Constructor.name}
//       first={index === 0}
//       last={index === allConstructors.length - 1}
//       odd={index % 2 === 0}
//     >
//       <ConstructorResultsInfo con={constructor} />
//     </TimelineElement>
//   ))}
// </Timeline>
