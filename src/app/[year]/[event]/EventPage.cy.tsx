import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'cypress/react';
import React from 'react';

import { GET_EVENT_SCHEDULE } from '@/lib/queries';

import EventPage from './page';

// const mockDropdownEvent = {
//   event_name: 'Saudi Arabian Grand Prix',
//   round_number: 2,
//   location: 'Jeddah',
// };

// const mockEvent = {
//   round_number: 2,
//   event_name: 'Saudi Arabian Grand Prix',
//   event_format: 'conventional',
//   event_date: '2024-03-09T00:00:00',
//   location: 'Jeddah',
//   country: 'Saudi Arabia',
//   session1: 'Practice 1',
//   session1_date: '2024-03-07T16:30:00+03:00',
//   session2: 'Practice 2',
//   session2_date: '2024-03-07T20:10:00+03:00',
//   session3: 'Practice 3',
//   session3_date: '2024-03-08T16:30:00+03:00',
//   session4: 'Qualifying',
//   session4_date: '2024-03-08T20:00:00+03:00',
//   session5: 'Race',
//   session5_date: '2024-03-09T20:00:00+03:00',
//   __typename: 'schedule',
// };

describe('<EventPage />', () => {
  it('renders page not found because no event found', () => {
    const mocks = [
      {
        request: {
          query: GET_EVENT_SCHEDULE,
          variables: { year: 2024, event: 'Jeddah' },
        },
        result: {
          data: {
            schedule: [],
            dropdownEvents: [],
          },
        },
      },
    ];
    mount(
      <MockedProvider mocks={mocks}>
        <EventPage
          params={Promise.resolve({ year: '2024', event: 'Jeddah' })}
        />
      </MockedProvider>,
    );
    cy.get('main').should('not.exist');

    cy.contains('Page Not Found').should('exist');
  });

  // it('renders page not found because no event found', () => {
  //   const mocks = [
  //     {
  //       request: {
  //         query: GET_EVENT_SCHEDULE,
  //         variables: { year: 2024, event: 'Jeddah' },
  //       },
  //       result: {
  //         data: {
  //           schedule: [mockEvent],
  //           dropdownEvents: [],
  //         },
  //       },
  //     },
  //     {
  //       request: {
  //         query: GET_EVENT_DETAILS,
  //         variables: { year: 2025, event: 'Jeddah' },
  //       },
  //       result: {
  //         data: {
  //           events: [],
  //         },
  //       },
  //     },
  //   ];
  //   mount(
  //     <MockedProvider mocks={mocks}>
  //       <EventPage
  //         params={Promise.resolve({ year: '2024', event: 'Jeddah' })}
  //       />
  //     </MockedProvider>,
  //   );
  //   cy.get('main').should('not.exist');
  //   cy.contains('Page Not Found').should('exist');
  // });
});
