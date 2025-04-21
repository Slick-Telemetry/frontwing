import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'cypress/react';
import React from 'react';

import { GET_NEXT_EVENT } from '@/lib/queries';

import { Event_Format_Choices_Enum } from '@/generated/types';

import NextEvent from './NextEvent';

const mockEvent = {
  event_name: 'Grand Prix',
  country: 'USA',
  event_format: Event_Format_Choices_Enum.Conventional,
  session5_date_utc: new Date(Date.now() + 100000).toISOString(),
};

const getTodayMidnightUTC = () => {
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0); // Set to midnight UTC
  return now.toISOString(); // Convert to ISO 8601 format
};

it('renders the loader while loading', () => {
  mount(
    <MockedProvider mocks={[]}>
      <NextEvent />
    </MockedProvider>,
  );

  cy.get('svg').should('be.visible');
});

it('renders nothing on error', () => {
  const errorMocks = [
    {
      request: {
        query: GET_NEXT_EVENT,
        variables: { today: getTodayMidnightUTC() },
      },
      error: new Error('An error occurred'),
    },
  ];

  mount(
    <MockedProvider mocks={errorMocks}>
      <NextEvent />
    </MockedProvider>,
  );

  cy.get('svg').should('not.exist');
  cy.contains('Grand Prix').should('not.exist');
});

it('renders nothing with incorrect today date', () => {
  const mocks = [
    {
      request: {
        query: GET_NEXT_EVENT,
        variables: { today: '123456' },
      },
      result: {
        data: {
          schedule: [mockEvent],
        },
      },
    },
  ];

  mount(
    <MockedProvider mocks={mocks}>
      <NextEvent />
    </MockedProvider>,
  );

  cy.get('svg').should('not.exist');
  cy.contains('Grand Prix').should('not.exist');
});

it('renders next event details', () => {
  const mocks = [
    {
      request: {
        query: GET_NEXT_EVENT,
        variables: { today: getTodayMidnightUTC() },
      },
      result: {
        data: {
          schedule: [mockEvent],
        },
      },
    },
  ];

  mount(
    <MockedProvider mocks={mocks}>
      <NextEvent />
    </MockedProvider>,
  );

  cy.get('svg').should('be.visible');

  // Wait for the mock data to load
  cy.contains('Grand Prix').should('exist');
  cy.contains('🇺🇸').should('exist');
});
