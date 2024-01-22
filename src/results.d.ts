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

// UI format
interface DataConfigSchema {
  seasons: string[];
  schedule: ScheduleSchema[];
  drivers: string[];
  sessions: string[];
  standings: {
    season: number;
    round: number;
    DriverStandings: DriverStandingSchema[];
    ConstructorStandings: ConstructorStandingSchema[];
  };
}
