interface QueryProps {
  season: string;
  event: string;
  session: string;
  driver: string;
}

interface EventSchedule {
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

interface SessionBasics {
  index: number;
  name: string;
  date: string;
  dateUtc: string;
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

interface LapData {
  Time: number;
  Driver: string;
  DriverNumber: string;
  LapTime: number;
  LapNumber: number;
  Stint: number;
  PitOutTime: number;
  PitInTime: number;
  Sector1Time: number;
  Sector2Time: number;
  Sector3Time: number;
  Sector1SessionTime: number;
  Sector2SessionTime: number;
  Sector3SessionTime: number;
  SpeedI1: number;
  SpeedI2: number;
  SpeedFL: number;
  SpeedST: number;
  IsPersonalBest: boolean;
  Compound: string;
  TyreLife: number;
  FreshTyre: boolean;
  Team: string;
  LapStartTime: number;
  LapStartDate: string;
  TrackStatus: string;
  Position: number;
  Deleted: boolean;
  DeletedReason: string;
  FastF1Generated: boolean;
  IsAccurate: boolean;
}

// Raw Fetch Format
// interface DriverSchema {
//   driverId: string;
//   permanentNumber: string;
//   code: string;
//   url: string;
//   givenName: string;
//   familyName: string;
//   dateOfBirth: string;
//   nationality: string;
// }

// interface ConstructorSchema {
//   constructorId: string;
//   url: string;
//   name: string;
//   nationality: string;
// }

// interface StandingsSchema {
//   position: string;
//   positionText: string;
//   points: string;
//   wins: string;
// }

// interface DriverStandingSchema extends StandingsSchema {
//   Constructors: ConstructorSchema[];
//   Driver: DriverSchema;
// }

// interface ConstructorStandingSchema extends StandingsSchema {
//   Constructor: ConstructorSchema;
//   Drivers?: DriverStandingSchema[];
// }

// interface ConstructorResult {
//   name: string;
//   position: number;
//   points: number;
//   drivers: DriverResult[];
// }

// UI format
// interface DataConfigSchema {
//   seasons: string[];
//   schedule: {
//     year: string;
//     EventSchedule: EventSchedule[];
//   };
//   drivers: string[];
//   sessions: string[];
//   standings: {
//     season: number;
//     round: number;
//     DriverStandings: DriverStandingSchema[];
//     ConstructorStandings: ConstructorStandingSchema[];
//   };
//   results: {
//     drivers: DriverResult[];
//     constructors: ConstructorResult[];
//   };
// }

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
