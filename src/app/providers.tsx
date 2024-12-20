// app/providers.tsx
'use client';

import { ApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';

import client from '../lib/apollo-client';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
