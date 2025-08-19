'use client';

import { ApolloError } from '@apollo/client';
import { Component, ReactNode } from 'react';

import { ServerPageError } from './ServerError';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ApolloErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      const error = this.state.error;
      let message = 'An unexpected error occurred';

      if (error instanceof ApolloError) {
        if (error.networkError) {
          message =
            'Unable to connect to the server. Please check your connection and try again.';
        } else if (error.graphQLErrors.length > 0) {
          message = error.graphQLErrors[0].message;
        }
      }

      return <ServerPageError msg={message} />;
    }

    return this.props.children;
  }
}
