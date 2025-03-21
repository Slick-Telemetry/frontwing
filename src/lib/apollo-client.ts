// lib/apollo-client.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL || '',
  headers: {
    'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_SECRET || '',
    skip_zrok_interstitial: 'true',
  },
  cache: new InMemoryCache(),
});

export default client;
