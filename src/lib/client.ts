import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/experimental-nextjs-app-support';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL || '',
      headers: {
        'x-hasura-role': 'public',
        skip_zrok_interstitial: 'true',
      },
    }),
    cache: new InMemoryCache(),
  });
});
