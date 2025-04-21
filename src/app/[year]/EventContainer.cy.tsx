import { mount } from 'cypress/react';

import { EventContainer } from '@/app/[year]/EventContainer';
import {
  Event_Format_Choices_Enum,
  Session_Name_Choices_Enum,
} from '@/generated/types';

const mockEvent = {
  round_number: 2,
  event_name: 'Saudi Arabian Grand Prix',
  event_format: 'CONVENTIONAL' as Event_Format_Choices_Enum, // Assuming 'CONVENTIONAL' is a valid value in Event_Format_Choices_Enum
  event_date: '2024-03-09T00:00:00',
  location: 'Jeddah',
  country: 'Saudi Arabia',
  session1: 'Practice 1' as Session_Name_Choices_Enum,
  session1_date: '2024-03-07T16:30:00+03:00',
  session2: 'Practice 2' as Session_Name_Choices_Enum,
  session2_date: '2024-03-07T20:10:00+03:00',
  session3: 'Practice 3' as Session_Name_Choices_Enum,
  session3_date: '2024-03-08T16:30:00+03:00',
  session4: 'Qualifying' as Session_Name_Choices_Enum,
  session4_date: '2024-03-08T20:00:00+03:00',
  session5: 'Race' as Session_Name_Choices_Enum,
  session5_date: '2024-03-09T20:00:00+03:00',
};

describe('<EventContainer/>', () => {
  it('should not mount component with no values', () => {
    mount(
      <EventContainer event={null}>
        <></>
      </EventContainer>,
    );

    cy.get('div.border').should('not.exist');
  });

  it('should not mount component without a name', () => {
    mount(
      <EventContainer event={{ ...mockEvent, event_name: '' }}>
        <></>
      </EventContainer>,
    );

    cy.get('div.border').should('not.exist');
  });

  it('mount component with only name', () => {
    mount(
      <EventContainer event={{ event_name: mockEvent.event_name }}>
        <></>
      </EventContainer>,
    );

    cy.get('div.border').should('exist');
    cy.contains(mockEvent.event_name.replace(/Grand Prix/g, 'GP')).should(
      'exist',
    );
  });

  it('mount component with name & date', () => {
    mount(
      <EventContainer
        event={{
          event_name: mockEvent.event_name,
          event_date: mockEvent.event_date,
        }}
      >
        <></>
      </EventContainer>,
    );

    cy.get('div.border').should('exist');
    cy.contains(mockEvent.event_name.replace(/Grand Prix/g, 'GP')).should(
      'exist',
    );
    cy.get('[data-cy=event-date]').should('exist');
  });

  it('mount component with all data', () => {
    mount(
      <EventContainer event={mockEvent}>
        <></>
      </EventContainer>,
    );

    cy.get('div.border').should('exist');
    cy.get('a')
      .contains(mockEvent.event_name.replace(/Grand Prix/g, 'GP'))
      .should('exist');
    cy.get('[data-cy=event-date]').should('exist');
    cy.get('[data-cy=location]').should('exist');
  });
});
