interface ScheduleSchema {
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
interface DriverSchema {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

interface ConstructorSchema {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

interface StandingsSchema {
  position: string;
  positionText: string;
  points: string;
  wins: string;
}

interface DriverStandingSchema extends StandingsSchema {
  Constructors: ConstructorSchema[];
  Driver: DriverSchema;
}

interface ConstructorStandingSchema extends StandingsSchema {
  Constructor: ConstructorSchema;
  Drivers?: DriverStandingSchema[];
}

interface DriverResult {
  DriverNumber: string;
  BroadcastName: string;
  Abbreviation: string;
  DriverId: string;
  TeamName: string;
  TeamColor: string;
  TeamId: string;
  FirstName: string;
  LastName: string;
  FullName: string;
  HeadshotUrl: string;
  CountryCode: string;
  Position: number;
  ClassifiedPosition: string;
  GridPosition: number;
  Q1: number | null;
  Q2: number | null;
  Q3: number | null;
  Time: number | null;
  Status: string;
  Points: number;
}

interface ConstructorResult {
  name: string;
  position: number;
  points: number;
  drivers: DriverResult[];
}

// UI format
interface DataConfigSchema {
  seasons: string[];
  schedule: {
    year: string;
    EventSchedule: ScheduleSchema[];
  };
  drivers: string[];
  sessions: string[];
  standings: {
    season: number;
    round: number;
    DriverStandings: DriverStandingSchema[];
    ConstructorStandings: ConstructorStandingSchema[];
  };
  results: {
    drivers: DriverResult[];
    constructors: ConstructorResult[];
  };
}

interface ServerErrorResponse {
  detail: [
    {
      loc: string[];
      msg: string;
      input: string;
    },
  ];
}

// UI Format Next Event
interface NextEventProps {
  name: string;
  session: string;
  time: number;
  endTime: number;
}
