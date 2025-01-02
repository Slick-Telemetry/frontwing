import { gql } from '@apollo/client';

export const GET_CONSTRUCTORS = gql`
  query GetConstructors {
    constructors(distinct_on: name, where: { ergast_id: { _neq: "" } }) {
      name
      ergast_id
      color
    }
  }
`;

export const GET_CONSTRUCTOR = gql`
  query GetConstructor($name: String!) {
    constructors(where: { name: { _eq: $name } }) {
      name
      color
    }
  }
`;

export const GET_DRIVERS = gql`
  query GetDrivers {
    drivers(
      where: { driver_sessions: { session: { date: { _iregex: "2024" } } } }
      distinct_on: full_name
      order_by: { full_name: asc }
    ) {
      full_name
      ergast_id
      number
    }
  }
`;

export const GET_SEASONS = gql`
  query GetSeasons {
    events(distinct_on: year) {
      year
    }
  }
`;

export const GET_SEASON_EVENTS = gql`
  query GetSeasonEvents($year: Int!) {
    events(where: { year: { _eq: $year } }) {
      year
      id
      round_number
      name
      location
      date
      country
      sessions {
        name
        id
        scheduled_start_time_utc
      }
    }
  }
`;

export const GET_EVENT_DETAILS = gql`
  query GetEventDetails($_id: String!) {
    events(where: { id: { _eq: $_id } }) {
      round_number
      id
      official_name
      location
      country
      sessions {
        scheduled_start_time_utc
        name
        race_control_messages(
          where: {
            _or: [{ flag: { _eq: "GREEN" } }, { flag: { _eq: "CHEQUERED" } }]
          }
        ) {
          flag
          message
          time
        }
        driver_sessions {
          driver {
            full_name
            number
            headshot_url
          }
          results {
            grid_position
            finishing_position
            classified_position
          }
          laps(
            where: {
              is_personal_best: { _eq: true }
              is_accurate: { _eq: true }
            }
            order_by: { lap_time: asc }
          ) {
            lap_time
            lap_number
          }
        }
      }
    }
  }
`;
