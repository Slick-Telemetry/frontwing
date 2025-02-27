import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/experimental-nextjs-app-support';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_HASURA_URL || '',
      headers: {
        'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_SECRET || '',
        // 'skip_zrok_interstitial': 'true',
      },
    }),
    cache: new InMemoryCache(),
  });
});
