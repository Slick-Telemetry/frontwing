// lib/apollo-client.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_HASURA_URL || '',
  headers: {
    'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_SECRET || '',
  },
  cache: new InMemoryCache(),
});

export default client;
