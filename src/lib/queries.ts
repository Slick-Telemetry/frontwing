import { gql } from '@apollo/client';

export const GET_CONSTRUCTORS = gql`
  query GetConstructors @cached {
    constructors(
      where: { driver_sessions: { session: { date: { _iregex: "2025" } } } }
      order_by: { name: asc }
      distinct_on: name
    ) {
      name
      ergast_id
      color
    }
  }
`;

export const GET_CONSTRUCTOR = gql`
  query GetConstructor($_id: String!) @cached {
    constructors(where: { ergast_id: { _eq: $_id } }) {
      name
      color
      year
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
  query GetDrivers @cached {
    drivers(
      where: { driver_sessions: { session: { date: { _iregex: "2025" } } } }
      order_by: { full_name: asc }
      distinct_on: full_name
    ) {
      full_name
      ergast_id
      number
    }
  }
`;

export const GET_SEASONS = gql`
  query GetSeasons @cached {
    events(distinct_on: year, order_by: { year: desc }) {
      year
    }
  }
`;

export const GET_MAP_EVENTS = gql`
  query GetMapEvents($year: Int!) @cached {
    events(where: { year: { _eq: $year } }) {
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

export const GET_NEXT_EVENT = gql`
  query GetNextEvent($today: String!) {
    schedule(
      where: { event_date: { _gte: $today } }
      order_by: { event_date: asc }
      limit: 1
    ) {
      year
      event_name
      location
      country
      event_format
      session5_date_utc
    }
  }
`;

export const GET_SEASON_EVENTS = gql`
  query GetSeasonEvents($year: Int!) @cached {
    schedule(where: { year: { _eq: $year } }) {
      year
      round_number
      event_name
      event_format
      event_date
      location
      country
      session1
      session1_date
      session2
      session2_date
      session3
      session3_date
      session4
      session4_date
      session5
      session5_date
    }
  }
`;

export const GET_EVENT_SCHEDULE = gql`
  query GetEventSchedule($year: Int!, $event: String!) @cached {
    dropdown_events: schedule(
      where: { location: { _neq: $event }, year: { _eq: $year } }
    ) {
      event_name
      round_number
      location
    }
    schedule(
      where: { year: { _eq: $year }, location: { _eq: $event } }
      limit: 1
    ) {
      year
      round_number
      event_date
      official_event_name
      event_name
      event_format
      location
      country
      session1
      session1_date_utc
      session2
      session2_date_utc
      session3
      session3_date_utc
      session4
      session4_date_utc
      session5
      session5_date_utc
    }
  }
`;
export const GET_EVENT_DETAILS = gql`
  query GetEventDetails($year: Int!, $event: String!) @cached {
    events(
      where: { location: { _eq: $event }, year: { _eq: $year } }
      limit: 1
    ) {
      competition: sessions(
        where: { name: { _in: [Sprint, Race] } }
        limit: 2
      ) {
        scheduled_start_time_utc
        name
        driver_sessions {
          driver {
            abbreviation
            full_name
            number
            headshot_url
          }
          constructorByConstructorId {
            color
          }
          results {
            finishing_position
            classified_position
            grid_position
            total_race_time
          }
          fastest_lap: laps(limit: 1, order_by: { lap_time: asc }) {
            lap_time
            lap_number
          }
        }
      }
      qualifying: sessions(
        where: {
          name: { _in: [Sprint_Shootout, Sprint_Qualifying, Qualifying] }
        }
        limit: 2
      ) {
        scheduled_start_time_utc
        name
        driver_sessions {
          driver {
            abbreviation
            full_name
            number
            headshot_url
          }
          constructorByConstructorId {
            color
          }
          results {
            finishing_position
            q1_time
            q2_time
            q3_time
          }
        }
      }
      practices: sessions(
        limit: 3
        where: { name: { _in: [Practice_1, Practice_2, Practice_3] } }
      ) {
        scheduled_start_time_utc
        name
        driver_sessions {
          driver {
            abbreviation
            full_name
            number
            headshot_url
          }
          constructorByConstructorId {
            color
          }
          fastest_lap: laps(limit: 1, order_by: { lap_time: asc }) {
            lap_time
            lap_number
          }
        }
      }
    }
  }
`;

export const GET_STANDINGS = gql`
  query GetStandings($season: Int!) @cached {
    events(where: { year: { _eq: $season } }) {
      round_number
      name
    }
    drivers(where: { driver_standings: { season: { _eq: $season } } }) {
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

export const GET_SESSION = gql`
  query Session(
    $year: Int!
    $event: String!
    $session: session_name_choices_enum!
  ) @cached {
    sessions(
      limit: 1
      where: {
        event: { year: { _eq: $year }, location: { _eq: $event } }
        name: { _eq: $session }
      }
    ) {
      name
      total_laps
      scheduled_start_time_utc
      event {
        name
      }
    }
  }
`;

export const GET_SESSION_RESULTS = gql`
  query SessionResults(
    $year: Int!
    $event: String!
    $session: session_name_choices_enum!
  ) @cached {
    sessions(
      limit: 1
      where: {
        event: { year: { _eq: $year }, location: { _eq: $event } }
        name: { _eq: $session }
      }
    ) {
      name
      event {
        name
      }
      driver_sessions {
        constructorByConstructorId {
          name
          color
        }
        driver {
          abbreviation
          full_name
          number
          headshot_url
        }
        results(
          where: {
            _or: [
              { grid_position: { _is_null: false } }
              { finishing_position: { _is_null: false } }
            ]
          }
        ) {
          grid_position
          finishing_position
          points
          status
          classified_position
          total_race_time
        }
        fastest_lap: laps(order_by: { lap_time: asc }, limit: 1) {
          lap_number
          stint
          lap_time
        }
      }
    }
  }
`;

export const GET_SESSION_FASTEST_TIMES = gql`
  query GetSessionFastestTimes(
    $year: Int!
    $event: String!
    $session: session_name_choices_enum!
  ) @cached {
    sessions(
      limit: 1
      where: {
        event: { year: { _eq: $year }, location: { _eq: $event } }
        name: { _eq: $session }
      }
    ) {
      name
      event {
        name
      }
      driver_sessions {
        constructorByConstructorId {
          name
          color
        }
        driver {
          abbreviation
        }
        fastest_lap: laps(order_by: { lap_time: asc }, limit: 1) {
          lap_number
          stint
          lap_time
          sector1
          sector2
          sector3
        }
        fastest_sector1: laps(order_by: { sector1: asc }, limit: 1) {
          lap_number
          stint
          sector1
        }
        fastest_sector2: laps(order_by: { sector2: asc }, limit: 1) {
          lap_number
          stint
          sector2
        }
        fastest_sector3: laps(order_by: { sector3: asc }, limit: 1) {
          lap_number
          stint
          sector3
        }
      }
    }
  }
`;

export const GET_SESSION_STINTS = gql`
  query GetSessionStints(
    $year: Int!
    $event: String!
    $session: session_name_choices_enum!
  ) @cached {
    sessions(
      limit: 1
      where: {
        event: { year: { _eq: $year }, location: { _eq: $event } }
        name: { _eq: $session }
      }
    ) {
      driver_sessions {
        driver {
          abbreviation
          full_name
        }
        laps {
          stint
          tyre_compound {
            value
          }
          tyre_life
          fresh_tyre
        }
      }
    }
  }
`;

export const GET_SESSION_LAP_TIMES = gql`
  query GetSessionLapTimes(
    $year: Int!
    $event: String!
    $session: session_name_choices_enum!
  ) @cached {
    sessions(
      limit: 1
      where: {
        event: { year: { _eq: $year }, location: { _eq: $event } }
        name: { _eq: $session }
      }
    ) {
      driver_sessions {
        constructorByConstructorId {
          name
          color
        }
        driver {
          abbreviation
          full_name
          number
        }
        laps(order_by: { lap_number: asc }) {
          lap_number
          lap_time
          compound
          session_time
        }
      }
    }
  }
`;
