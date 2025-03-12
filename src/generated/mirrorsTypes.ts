type Timestamp = string;

interface Heartbeat {
  Utc: Timestamp;
  _kf: boolean;
}

// interface EncodedData {
//   'CarData.z': string;
//   'Position.z': string;
// }

interface ExtrapolatedClock {
  Utc: Timestamp;
  Remaining: string;
  Extrapolating: boolean;
  _kf?: boolean;
}

interface Driver {
  Position: string;
  ShowPosition: boolean;
  RacingNumber: string;
  Tla: string;
  BroadcastName: string;
  FullName: string;
  Team: string;
  TeamColour: string;
  LapTime: string;
  LapState: number;
  DiffToAhead: string;
  DiffToLeader: string;
  OverallFastest: boolean;
  PersonalFastest: boolean;
}

interface TopThree {
  SessionPart?: number;
  Withheld: boolean;
  Lines: Driver[];
  _kf?: boolean;
}

interface BestSector {
  Position: number;
  Value: string;
}

interface BestSpeed {
  Position: number;
  Value: string;
}

interface PersonalBestLapTime {
  Lap: number;
  Position: number;
  Value: string;
}

interface TimingStatsEntry {
  Line: number;
  RacingNumber: string;
  PersonalBestLapTime: PersonalBestLapTime;
  BestSectors: BestSector[];
  BestSpeeds: Record<string, BestSpeed>;
}

interface TimingStats {
  Withheld: boolean;
  Lines: Record<string, TimingStatsEntry>;
  SessionType?: string;
  _kf?: boolean;
}

interface Stint {
  LapTime?: string;
  LapNumber?: number;
  LapFlags: number;
  Compound: string;
  New: string;
  TyresNotChanged: string;
  TotalLaps: number;
  StartLaps: number;
}

interface TimingAppDataEntry {
  RacingNumber: string;
  Line: number;
  Stints: Stint[];
}

interface TimingAppData {
  Lines: Record<string, TimingAppDataEntry>;
  _kf?: boolean;
}

interface WeatherData {
  AirTemp: string;
  Humidity: string;
  Pressure: string;
  Rainfall: string;
  TrackTemp: string;
  WindDirection: string;
  WindSpeed: string;
  _kf?: boolean;
}

interface TrackStatus {
  Status: string;
  Message: string;
  _kf?: boolean;
}

export interface DriverListEntry {
  RacingNumber: string;
  BroadcastName: string;
  FullName: string;
  Tla: string;
  Line: number;
  TeamName: string;
  TeamColour: string;
  FirstName: string;
  LastName: string;
  Reference: string;
  HeadshotUrl: string;
  CountryCode?: string;
}

export interface DriverList {
  [key: string]: DriverListEntry | boolean;
}

interface RaceControlMessage {
  Utc: Timestamp;
  Category: string;
  Flag?: string;
  Scope?: string;
  Sector?: number;
  Message: string;
}

interface RaceControlMessages {
  Messages: RaceControlMessage[];
  _kf?: boolean;
}

interface Meeting {
  Key: number;
  Name: string;
  OfficialName: string;
  Location: string;
  Country: {
    Key: number;
    Code: string;
    Name: string;
  };
  Circuit: {
    Key: number;
    ShortName: string;
  };
}

interface ArchiveStatus {
  Status: string;
}

interface SessionInfo {
  Meeting: Meeting;
  ArchiveStatus: ArchiveStatus;
  Key: number;
  Type: string;
  Name: string;
  StartDate: Timestamp;
  EndDate: Timestamp;
  GmtOffset: string;
  Path: string;
  _kf?: boolean;
}

interface SessionDataEntry {
  Utc: Timestamp;
  TrackStatus?: string;
  SessionStatus?: string;
  QualifyingPart?: number;
}

export interface SessionData {
  Series?: SessionDataEntry[];
  StatusSeries?: SessionDataEntry[];
  _kf?: boolean;
}

interface SectorSegment {
  Status: number;
}

interface Sector {
  PreviousValue?: string;
  Value?: string;
  Status?: number;
  OverallFastest?: boolean;
  PersonalFastest?: boolean;
  Segments?: Record<number, SectorSegment>;
}

interface Speed {
  Value: string;
  Status?: number;
  OverallFastest?: boolean;
  PersonalFastest?: boolean;
}

interface LapTime {
  Value: string;
  Lap?: number;
}

interface TimingDataEntry {
  TimeDiffToFastest?: string;
  TimeDiffToPositionAhead?: string;
  Line: number;
  Position: string;
  ShowPosition: boolean;
  RacingNumber: string;
  Retired: boolean;
  InPit: boolean;
  PitOut: boolean;
  Stopped: boolean;
  Status: number;
  NumberOfLaps: number;
  NumberOfPitStops: number;
  Sectors: Sector[];
  Speeds: Record<string, Speed>;
  BestLapTime: LapTime;
  LastLapTime: LapTime;
  BestLapTimes?: LapTime[];
  KnockedOut?: boolean;
  Cutoff?: boolean;
}

interface TimingData {
  Lines: Record<string, TimingDataEntry>;
  Withheld?: boolean;
  CutOffTime?: string;
  CutOffPercentage?: string;
  NoEntries?: number[];
  SessionPart?: number;
  _kf?: boolean;
}

interface StreamingFeedMessage {
  H: string;
  M: string;
  A: [
    string,
    Record<
      string,
      Record<
        string,
        | TimingStatsEntry
        | TimingDataEntry
        | Heartbeat
        | SessionDataEntry
        | TimingAppDataEntry
        | string
      >
    >,
    Timestamp,
  ];
}

interface StreamingResponse {
  C: string;
  M: StreamingFeedMessage[];
}

interface MainResponse {
  R: {
    Heartbeat: Heartbeat;
    ExtrapolatedClock: ExtrapolatedClock;
    'CarData.z': string;
    'Position.z': string;
    TopThree: TopThree;
    TimingStats: TimingStats;
    TimingAppData: TimingAppData;
    WeatherData: WeatherData;
    TrackStatus: TrackStatus;
    DriverList: DriverList;
    RaceControlMessages: RaceControlMessages;
    SessionInfo: SessionInfo;
    SessionData: SessionData;
    TimingData: TimingData;
  };
  I: string;
}

export type TranslateItem =
  | Heartbeat
  | ExtrapolatedClock
  | TopThree
  | TimingAppData
  | WeatherData
  | TrackStatus
  | DriverList
  | RaceControlMessage
  | SessionInfo
  | SessionData
  | TimingData;

/**
 * Union type to represent all possible responses.
 */
export type LiveTimingResponse = MainResponse | StreamingResponse;
