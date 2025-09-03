'use client';
import { CombinedGraphQLErrors } from '@apollo/client';
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

      if (error) {
        // TODO: Add logging here for actual error
        message = error.message;
        message =
          'Unable to connect to the server. Please check your connection and try again.';
      }
      if (CombinedGraphQLErrors.is(error)) {
        // TODO: Add logging here for errors
        message = error.errors[0].message;
      }

      return <ServerPageError msg={message} />;
    }

    return this.props.children;
  }
}
