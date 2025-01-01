import { gql } from '@apollo/client';

export const GET_CONSTRUCTORS = gql`
  query GetConstructors {
    constructors(distinct_on: name) {
      name
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
