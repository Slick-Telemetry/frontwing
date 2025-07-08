import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL || '',
    headers: {
      'x-hasura-role': 'public',
      skip_zrok_interstitial: 'true',
    },
    fetchOptions: {
      cache: 'force-cache',
      next: { revalidate: false },
      // you can pass additional options that should be passed to `fetch` here,
      // e.g. Next.js-related `fetch` options regarding caching and revalidation
      // see https://nextjs.org/docs/app/api-reference/functions/fetch#fetchurl-options
    },
  }),
});
