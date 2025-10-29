import { Session_Name_Choices_Enum } from '@/types/graphql';

export const SUPPORTED_SEASONS = [
  2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018,
];

export const SESSION_KEYS = [
  'session1',
  'session2',
  'session3',
  'session4',
  'session5',
] as SessionKey[];

export const PRACTICE_SESSIONS = [
  Session_Name_Choices_Enum['Practice_1'],
  Session_Name_Choices_Enum['Practice_2'],
  Session_Name_Choices_Enum['Practice_3'],
];

export const QUALIFYING_SESSIONS = [
  Session_Name_Choices_Enum['Qualifying'],
  Session_Name_Choices_Enum['SprintQualifying'],
  Session_Name_Choices_Enum['SprintShootout'],
];

export const COMPETITION_SESSIONS = [
  Session_Name_Choices_Enum['Race'],
  Session_Name_Choices_Enum['Sprint'],
];

export const FINISHING_CLASSIFICATIONS = {
  R: 'Retired',
  D: 'Disqualified',
  E: 'Excluded',
  W: 'Withdrawn',
  F: 'Failed to qualify',
  N: 'Not classified',
};
