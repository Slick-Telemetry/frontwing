export enum race_control_messages_categories {
  Other = 'Other',
  Flag = 'Flag',
  Drs = 'Drs',
  CarEvent = 'CarEvent',
  SafetyCar = 'SafetyCar',
}

export enum race_control_messages_flags {
  Green = 'Green',
  Red = 'Red',
  Yellow = 'Yellow',
  Blue = 'Blue',
  BlackAndWhite = 'BlackAndWhite',
  DoubleYellow = 'DoubleYellow',
  Clear = 'Clear',
  Chequered = 'Chequered',
}
export enum race_control_messages_scopes {
  Track = 'Track',
  Sector = 'Sector',
  Driver = 'Driver',
}

export enum event_format_choices {
  conventional = 'conventional',
  sprint_shootout = 'sprint_shootout',
  sprint_qualifying = 'sprint_qualifying',
  testing = 'testing',
}

export enum tyre_compounds {
  HYPERSOFT = 'HYPERSOFT',
  ULTRASOFT = 'ULTRASOFT',
  SUPERSOFT = 'SUPERSOFT',
  SOFT = 'SOFT',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  INTERMEDIATE = 'INTERMEDIATE',
  WET = 'WET',
  UNKNOWN = 'UNKNOWN',
}

export enum session_name_choices {
  Practice1 = 'Practice 1',
  Practice2 = 'Practice 2',
  Practice3 = 'Practice 3',
  Qualifying = 'Qualifying',
  SprintShootout = 'Sprint Shootout',
  SprintQualifying = 'Sprint Qualifying',
  Sprint = 'Sprint',
  Race = 'Race',
  TestSession = 'Test Session',
}

export enum data_source_types {
  car = 'car',
}

export enum telemetry_sources {
  car = 'car',
  pos = 'pos',
  interpolation = 'interpolation',
}

export enum telemetry_car_status {
  OnTrack = 'OnTrack',
  OffTrack = 'OffTrack',
}
