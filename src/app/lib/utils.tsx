import { faker } from '@faker-js/faker';

import { serverUrl } from '../../constants';

export const positionEnding = (position: number | string) => {
  // Convert to int
  position = typeof position === 'string' ? parseInt(position) : position;
  // Format
  if ([1, 21].includes(position)) return position + 'st';
  else if ([2, 22].includes(position)) return position + 'nd';
  else if ([3, 23].includes(position)) return position + 'rd';
  else return position + 'th';
};

/**
 * @description
 * Get all possible seasons/years with results
 * @return {*}  {string[]}
 */
export const f1Seasons = (): string[] => {
  // Discuss : Bump to fetch call to get data
  // ! Alter to be dynamic
  // const testingDate = new Date('02/22/2024');

  const currDate = new Date();
  const currYear = currDate.getFullYear();

  // Compare curr date to testing date (Feb 22 2024)
  // If same year as testing and before testing date
  // Get previous year
  // if (
  //   testingDate.getFullYear() === currYear &&
  //   currDate.getTime() < testingDate.getTime()
  // ) {
  //   currYear -= 1;
  // }

  // Fill array with values between range
  return Array.from({ length: currYear - 1950 + 1 }, (_v, index) =>
    (currYear - index).toString(),
  );
};

const dataConfig: DataConfigSchema = {
  seasons: f1Seasons(),
  schedule: Array.from(Array(3).keys()).map(() => ({
    RoundNumber: 0,
    Country: faker.location.country(),
    Location: faker.location.city(),
    OfficialEventName: faker.word.words(5),
    EventDate: faker.date.future({ years: 1 }).toString(),
    EventName: faker.word.words(3),
    EventFormat: 'string',
    Session1: 'string',
    Session1Date: faker.date.future({ years: 1 }).toString(),
    Session1DateUtc: faker.date.future({ years: 1 }).toString(),
    Session2: 'string',
    Session2Date: faker.date.future({ years: 1 }).toString(),
    Session2DateUtc: faker.date.future({ years: 1 }).toString(),
    Session3: 'string',
    Session3Date: faker.date.future({ years: 1 }).toString(),
    Session3DateUtc: faker.date.future({ years: 1 }).toString(),
    Session4: 'string',
    Session4Date: faker.date.future({ years: 1 }).toString(),
    Session4DateUtc: faker.date.future({ years: 1 }).toString(),
    Session5: 'string',
    Session5Date: faker.date.future({ years: 1 }).toString(),
    Session5DateUtc: faker.date.future({ years: 1 }).toString(),
    F1ApiSupport: true,
  })),
  drivers: [
    'All Drivers',
    'Drive 1',
    'Drive 2',
    'Drive 3',
    'Drive 4',
    'Drive 5',
  ],
  sessions: ['Practice 1', 'Practice 2', 'Practice 3', 'Qualifying', 'Race'],
  standings: {
    DriverStandings: Array.from(Array(5).keys()).map(() => ({
      positionText: faker.number.int(20).toString(),
      position: faker.number.int(20).toString(),
      points: faker.number.int(25).toString(),
      wins: faker.number.int(10).toString(),
      Driver: {
        driverId: faker.person.middleName(),
        permanentNumber: faker.number.int(99).toString(),
        code: faker.word.sample(3),
        url: faker.internet.domainName(),
        givenName: faker.person.firstName(),
        familyName: faker.person.lastName(),
        dateOfBirth: faker.date.birthdate().toString(),
        nationality: faker.location.country(),
      },
      Constructors: [
        {
          constructorId: faker.person.middleName(),
          url: faker.internet.domainName(),
          name: faker.person.middleName(),
          nationality: faker.location.country(),
        },
      ],
    })),
    ConstructorStandings: Array.from(Array(5).keys()).map(() => ({
      positionText: faker.number.int(20).toString(),
      position: faker.number.int(20).toString(),
      points: faker.number.int(25).toString(),
      wins: faker.number.int(10).toString(),
      Constructor: {
        constructorId: faker.person.middleName(),
        url: faker.internet.domainName(),
        name: faker.person.middleName(),
        nationality: faker.location.country(),
      },
    })),
    season: 0,
    round: 0,
  },
};

export const fetchAPI = async (
  endpoint: string,
  statusCheck: boolean = false,
) => {
  const useServer = statusCheck || document.body.classList.contains('server');
  // Headers for statusCheck so
  const options = statusCheck ? { headers: { cache: 'no-store' } } : {};

  // Get dummy data or return false
  const dummy: string[] | ScheduleSchema[] | false =
    dataConfig[
      endpoint.split('?')[0] as 'seasons' | 'schedule' | 'drivers' | 'sessions'
    ] || false;

  // If we are not using the server return the dummy data
  if (!useServer) {
    return dummy;
  }

  // Fetch from server
  const data = await fetch(`${serverUrl}/${endpoint}`, { ...options })
    .then(
      (res) => {
        // Response is not successful
        if (!res.ok) {
          throw new Error('Not 2xx response', { cause: res });
        }

        // Success parse data
        return res.json();
      },
      // Catch initial fetch error
      (err) => {
        throw new Error('Server not connecting', { cause: err });
      },
    )
    // Return parsed data
    .then((data) => data)
    // Catch errors from above
    .catch((err) => {
      if (err === 'Server not connecting') return dummy;
      if (err.status === 404) return dummy;

      return dummy;
    });

  // console.log('data', data)

  return data;
};
