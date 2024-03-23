import { faker } from '@faker-js/faker';

/**
 * @description
 * Get all possible seasons/years with results
 * @return {*}  {string[]}
 */
export const f1Seasons = (): string[] => {
  const currYear = new Date().getFullYear();

  // Fill array with values between range
  return Array.from({ length: currYear - 1950 + 1 }, (_v, index) =>
    (currYear - index).toString(),
  );
};

const driverResults: DriverResult[] = Array.from(Array(10).keys()).map(() => ({
  DriverNumber: faker.number.int(99).toString(),
  BroadcastName: faker.person.middleName('male'),
  Abbreviation: faker.person.middleName('male').slice(0, 3),
  DriverId: faker.person.lastName('male'),
  TeamName: faker.person.firstName(),
  TeamColor: faker.color.rgb(),
  TeamId: faker.person.firstName(),
  FirstName: faker.person.firstName('male'),
  LastName: faker.person.lastName('male'),
  FullName: faker.person.fullName(),
  HeadshotUrl: faker.image.url({ height: 93, width: 93 }),
  CountryCode: faker.location.countryCode(),
  Position: faker.number.int(20),
  ClassifiedPosition: faker.number.int(20).toString(),
  GridPosition: faker.number.int(20),
  Q1: null,
  Q2: null,
  Q3: null,
  Time: faker.number.int(5222624),
  Status: faker.helpers.arrayElement(['Finished', '+1 Lap', 'Retired']),
  Points: faker.number.int(25),
}));

export const dataConfig: DataConfigSchema = {
  seasons: f1Seasons(),
  schedule: {
    year: faker.number.int({ min: 1950, max: 2024 }).toString(),
    EventSchedule: Array.from(Array(3).keys()).map(() => ({
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
  },
  drivers: [
    'All Drivers',
    'Drive 1',
    'Drive 2',
    'Drive 3',
    'Drive 4',
    'Drive 5',
  ],
  sessions: [],
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

  results: {
    drivers: driverResults,
    constructors: Array.from(Array(5).keys()).map((_, i) => ({
      name: faker.person.firstName(),
      points: faker.number.int(44),
      position: faker.number.int(5),
      drivers: driverResults.filter((_, filterIndex) => filterIndex % 5 === i),
    })),
  },
};
