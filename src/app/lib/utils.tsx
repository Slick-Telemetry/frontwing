import { faker } from '@faker-js/faker';
import axios from 'axios';

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

export interface ISchedule {
  RoundNumber: number;
  Country: string;
  Location: string;
  OfficialEventName: string;
  EventDate: string;
  EventName: string;
  EventFormat: string;
  Session1: string;
  Session1Date: string;
  Session1DateUtc: string;
  Session2: string;
  Session2Date: string;
  Session2DateUtc: string;
  Session3: string;
  Session3Date: string;
  Session3DateUtc: string;
  Session4: string;
  Session4Date: string;
  Session4DateUtc: string;
  Session5: string;
  Session5Date: string;
  Session5DateUtc: string;
  F1ApiSupport: boolean;
}

// Raw Fetch Format
export type IConstructorStandingsFetch = {
  [key in 'position' | 'points' | 'wins']: string;
} & {
  Constructor: {
    name: string;
  };
};
// UI format
export type IConstructorStandings = {
  [key in 'pos' | 'points' | 'wins' | 'name']: string;
};

interface IDataConfigs {
  seasons: string[];
  schedule: ISchedule[];
  drivers: string[];
  sessions: string[];
  standings: {
    // drivers: {
    //   position: string,
    //   points: string,
    //   wins: string,
    //   Constructor?: {
    //     name: string,
    //   }
    // }[],
    constructors: IConstructorStandingsFetch[];
  };
}

const dataConfig: IDataConfigs = {
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
    // drivers: {

    // },
    constructors: Array.from(Array(10).keys()).map(() => ({
      position: faker.number.int(20).toString(),
      points: faker.number.int(25).toString(),
      wins: faker.number.int(10).toString(),
      Constructor: {
        name: faker.person.middleName(),
      },
    })),
  },
};

const serverURL = 'http://0.0.0.0:8081';
export const fetchAPI = async (
  endpoint: string,
  statusCheck: boolean = false,
) => {
  const server = statusCheck || document.body.classList.contains('server');
  // Headers for statusCheck so
  const options = statusCheck ? { headers: { cache: 'no-store' } } : {};

  // Get dummy data or return false
  const dummy: string[] | ISchedule[] | false =
    dataConfig[
      endpoint.split('?')[0] as 'seasons' | 'schedule' | 'drivers' | 'sessions'
    ] || false;

  // If we are not using the server return the dummy data
  if (!server) {
    return dummy;
  } else {
    // Fetch from server
    const data = await axios(`${serverURL}/${endpoint}`, options)
      .then(
        (res) => {
          // Response is not successful
          if (res.statusText !== 'OK') {
            throw new Error('Not 2xx response', { cause: res });
          }
          // Sucess - parse data
          return res.data;
        },
        // Catch initial fetch error
        (err) => {
          throw new Error('Server not connecting', { cause: err });
        },
      )
      // Return parsed data
      .then((data) => data)
      // Catch errors from above
      .catch(() => {
        return dummy;
      });

    return data;
  }
};
