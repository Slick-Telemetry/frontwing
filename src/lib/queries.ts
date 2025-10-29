import { gql } from '@apollo/client';

import { graphql } from '@/types';

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

export const GET_EVENT_DETAILS = graphql(`
  query GetEventDetails($year: Int!, $event: String!) @cached {
    events(where: { name: { _eq: $event }, year: { _eq: $year } }, limit: 1) {
      ...EventSessionResults
    }

    circuits(
      where: {
        year: { _eq: $year }
        sessions: { name: { _eq: Race }, event: { name: { _eq: $event } } }
      }
      limit: 1
    ) {
      ...CircuitDetails
    }

    fia_documents(
      where: { _and: { event_name: { _eq: $event }, year: { _eq: $year } } }
      order_by: { publish_time: desc }
    ) {
      ...FIADocs
    }

    drivers(
      distinct_on: year
      where: {
        driver_sessions: {
          session: { event: { name: { _eq: $event } }, name: { _eq: Race } }
          results: { classified_position: { _eq: "1" } }
        }
      }
      order_by: { year: desc }
    ) {
      ...EventWinners
    }

    schedule(
      where: { _and: { event_name: { _eq: $event }, year: { _eq: $year } } }
      order_by: { round_number: asc }
    ) {
      session1_date_utc
      session5_date_utc
      location
      ...EventSessionCards
      ...ScheduleEventDetails
    }
  }
`);

export const GET_TOP_STANDINGS = graphql(`
  query GetTopStandings($season: Int!, $limit: Int = 3) @cached {
    drivers(
      where: { driver_standings: { season: { _eq: $season } } }
      order_by: { driver_standings_aggregate: { max: { points: desc } } }
      limit: $limit
    ) {
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
        order_by: { round: desc }
        limit: 1
      ) {
        round
        points
        position
      }
    }
    constructors(
      where: { constructor_standings: { season: { _eq: $season } } }
      order_by: { constructor_standings_aggregate: { max: { points: desc } } }
      limit: $limit
    ) {
      name
      color
      constructor_standings(
        where: { season: { _eq: $season } }
        order_by: { round: desc }
        limit: 1
      ) {
        round
        points
        position
      }
    }
  }
`);

export const GET_STANDINGS = graphql(`
  query GetStandings($season: Int!) @cached {
    events(where: { year: { _eq: $season } }) {
      round_number
      name
    }
    drivers(
      where: { driver_standings: { season: { _eq: $season } } }
      order_by: { driver_standings_aggregate: { max: { points: desc } } }
    ) {
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
      order_by: { constructor_standings_aggregate: { max: { points: desc } } }
    ) {
      name
      color
      lastRoundPoints: constructor_standings(
        where: { season: { _eq: $season } }
        order_by: { round: desc }
        limit: 1
      ) {
        points
      }
      constructor_standings(
        where: { season: { _eq: $season } }
        order_by: { round: desc }
      ) {
        round
        points
        position
      }
    }
  }
`);

export const GET_SESSION = gql`
  query Session(
    $year: Int!
    $event: String!
    $session: session_name_choices_enum!
  ) @cached {
    sessions(
      limit: 1
      where: {
        event: { year: { _eq: $year }, name: { _eq: $event } }
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
        event: { year: { _eq: $year }, name: { _eq: $event } }
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
        event: { year: { _eq: $year }, name: { _eq: $event } }
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
        event: { year: { _eq: $year }, name: { _eq: $event } }
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
        event: { year: { _eq: $year }, name: { _eq: $event } }
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
