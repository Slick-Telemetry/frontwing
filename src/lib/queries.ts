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
  query GetConstructor($_id: String!) {
    constructors(where: { ergast_id: { _eq: $_id } }) {
      name
      color
      driver_sessions(
        order_by: { session: { event: { year: asc } } }
        where: { session: { total_laps: { _is_null: false } } }
      ) {
        driver {
          full_name
          number
          headshot_url
          country_code
        }
        session {
          id
          name
          event {
            round_number
            name
            year
          }
        }
        results {
          points
          classified_position
          grid_position
        }
      }
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

export const GET_MAP_EVENTS = gql`
  query GetMapEvents($year: Int!) {
    events(where: { year: { _eq: $year } }) {
      id
      round_number
      name
      location
      date
      country
      format
      sessions(limit: 1, where: { name: { _eq: Race } }) {
        circuit {
          country
          latitude
          longitude
        }
        driver_sessions(
          limit: 3
          where: { results: { classified_position: { _in: ["1", "2", "3"] } } }
        ) {
          results {
            classified_position
          }
          driver {
            full_name
            headshot_url
          }
          constructorByConstructorId {
            name
            color
          }
        }
      }
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
        id
        scheduled_start_time_utc
        name
        race_control_messages(where: { flag: { _eq: CHEQUERED } }) {
          flag
          message
          time
        }
        driver_sessions(order_by: { constructor_id: asc }) {
          driver {
            abbreviation
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

export const GET_STANDINGS = gql`
  query GetStandings($season: Int!) {
    drivers(where: { driver_standings: { season: { _eq: $season } } }) {
      id
      abbreviation
      full_name
      latest_constructor: driver_sessions(
        limit: 1
        order_by: { session: { date: desc } }
      ) {
        constructor: constructorByConstructorId {
          name
          color
        }
      }
      driver_standings(
        where: { season: { _eq: $season } }
        order_by: { round: asc }
      ) {
        round
        points
        position
      }
    }
    constructors(
      where: { constructor_standings: { season: { _eq: $season } } }
    ) {
      name
      color
      constructor_standings(
        where: { season: { _eq: $season } }
        order_by: { round: asc }
      ) {
        round
        points
        position
      }
    }
  }
`;
