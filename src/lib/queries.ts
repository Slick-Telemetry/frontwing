import { gql } from '@apollo/client';

export const GET_CONSTRUCTORS = gql`
  query GetConstructors {
    constructors(distinct_on: name) {
      name
      color
    }
  }
`;
