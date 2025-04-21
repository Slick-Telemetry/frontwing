import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'cypress/react';
import React from 'react';

import { GET_SEASON_EVENTS } from '@/lib/queries';

import SeasonPage from './page';

const mockEvent = {
  round_number: 2,
  event_name: 'Saudi Arabian Grand Prix',
  event_format: 'conventional',
  event_date: '2024-03-09T00:00:00',
  location: 'Jeddah',
  country: 'Saudi Arabia',
  session1: 'Practice 1',
  session1_date: '2024-03-07T16:30:00+03:00',
  session2: 'Practice 2',
  session2_date: '2024-03-07T20:10:00+03:00',
  session3: 'Practice 3',
  session3_date: '2024-03-08T16:30:00+03:00',
  session4: 'Qualifying',
  session4_date: '2024-03-08T20:00:00+03:00',
  session5: 'Race',
  session5_date: '2024-03-09T20:00:00+03:00',
  __typename: 'schedule',
};

describe('<SeasonPage />', () => {
  it('renders page not found because no events', () => {
    const mocks = [
      {
        request: {
          query: GET_SEASON_EVENTS,
          variables: { year: 2025 },
        },
        result: {
          data: {
            schedule: [],
          },
        },
      },
    ];
    mount(
      <MockedProvider mocks={mocks}>
        <SeasonPage params={Promise.resolve({ year: '2025' })} />
      </MockedProvider>,
    );

    cy.get('main').should('not.exist');
    cy.contains('Page Not Found').should('exist');
  });

  it('renders page not found because no event data', () => {
    const mocks = [
      {
        request: {
          query: GET_SEASON_EVENTS,
          variables: { year: 2025 },
        },
        result: {
          data: {
            schedule: [{}],
          },
        },
      },
    ];
    mount(
      <MockedProvider mocks={mocks}>
        <SeasonPage params={Promise.resolve({ year: '2025' })} />
      </MockedProvider>,
    );

    cy.get('main').should('not.exist');
    cy.contains('Page Not Found').should('exist');
  });

  it('renders page not found because no events with event_name', () => {
    const mockNoNameEvent = { ...mockEvent, event_name: '' };
    const mocks = [
      {
        request: {
          query: GET_SEASON_EVENTS,
          variables: { year: 2025 },
        },
        result: {
          data: {
            schedule: [mockNoNameEvent],
          },
        },
      },
    ];
    mount(
      <MockedProvider mocks={mocks}>
        <SeasonPage params={Promise.resolve({ year: '2025' })} />
      </MockedProvider>,
    );

    cy.get('main').should('not.exist');
    cy.contains('Page Not Found').should('exist');
  });

  it('renders only name because only event name', () => {
    const mocks = [
      {
        request: {
          query: GET_SEASON_EVENTS,
          variables: { year: 2025 },
        },
        result: {
          data: {
            schedule: [{ event_name: mockEvent.event_name }],
          },
        },
      },
    ];
    mount(
      <MockedProvider mocks={mocks}>
        <SeasonPage params={Promise.resolve({ year: '2025' })} />
      </MockedProvider>,
    );

    cy.get('main').should('exist');
    cy.get('main').children().should('have.length', 1);
  });

  it('renders error because of error', () => {
    const mocks = [
      {
        request: {
          query: GET_SEASON_EVENTS,
          variables: { year: 2025 },
        },
        error: new Error('An error occurred'),
      },
    ];
    mount(
      <MockedProvider mocks={mocks}>
        <SeasonPage params={Promise.resolve({ year: '2025' })} />
      </MockedProvider>,
    );

    cy.get('main').should('not.exist');
    cy.contains('Server Error').should('exist');
  });

  it('renders one event', () => {
    const mocks = [
      {
        request: {
          query: GET_SEASON_EVENTS,
          variables: { year: 2025 },
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
        <SeasonPage params={Promise.resolve({ year: '2025' })} />
      </MockedProvider>,
    );

    cy.get('main').should('exist');
    cy.get('main').children().should('have.length', 1);
  });

  it('renders two event', () => {
    const mocks = [
      {
        request: {
          query: GET_SEASON_EVENTS,
          variables: { year: 2025 },
        },
        result: {
          data: {
            schedule: [mockEvent, mockEvent],
          },
        },
      },
    ];
    mount(
      <MockedProvider mocks={mocks}>
        <SeasonPage params={Promise.resolve({ year: '2025' })} />
      </MockedProvider>,
    );

    cy.get('main').should('exist');
    cy.get('main').children().should('have.length', 2);
  });
});
