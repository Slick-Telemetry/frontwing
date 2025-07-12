describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });
});

describe('Server Status', () => {
  it('shows server error icon when health check fails', () => {
    cy.intercept('GET', '**/healthz', {
      statusCode: 500,
      body: 'Server Error',
    }).as('healthCheckFail');

    cy.visit('/');
    cy.wait('@healthCheckFail');
    cy.get('[data-cy="server-error"]').should('be.visible');
  });

  it('does not show server error icon when health check passes', () => {
    cy.intercept('GET', '**/healthz', {
      statusCode: 200,
      body: 'OK',
    }).as('healthCheckPass');

    cy.visit('/');
    cy.wait('@healthCheckPass');
    cy.get('[data-cy="server-error"]').should('not.exist');
  });
});

describe('Next Event', () => {
  it('shows next event component when data is available', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetNextEvent') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              schedule: [
                {
                  year: 2024,
                  event_name: 'Race Event',
                  location: 'Location',
                  country: 'Country',
                  event_format: 'conventional',
                  session5_date_utc: '2026-01-01T00:00:00Z',
                },
              ],
            },
          },
        });
      }
    }).as('getNextEventSuccess');

    cy.visit('/');
    cy.wait('@getNextEventSuccess');
    cy.get('[data-cy="next-event-name"]')
      .contains('Race Event')
      .should('be.visible');
  });

  it('does not show next event component when no data is available', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetNextEvent') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              schedule: [],
            },
          },
        });
      }
    }).as('getNextEventEmpty');

    cy.visit('/');
    cy.wait('@getNextEventEmpty');
    cy.get('[data-cy="next-event-name"]').should('not.exist');
  });

  it('shows event badge for sprint sessions', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetNextEvent') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              schedule: [
                {
                  year: 2024,
                  event_name: 'Sprint Event',
                  location: 'Location',
                  country: 'Country',
                  event_format: 'sprint',
                  session5_date_utc: '2026-01-01T00:00:00Z',
                },
              ],
            },
          },
        });
      }
    }).as('getNextEventSprint');

    cy.visit('/');
    cy.wait('@getNextEventSprint');
    cy.get('[data-cy="event-badge"]').should('be.visible');
  });

  it('shows event badge for sprint qualifying sessions', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetNextEvent') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              schedule: [
                {
                  year: 2024,
                  event_name: 'Sprint Qualifying Event',
                  location: 'Location',
                  country: 'Country',
                  event_format: 'sprint_qualifying',
                  session5_date_utc: '2026-01-01T00:00:00Z',
                },
              ],
            },
          },
        });
      }
    }).as('getNextEventSprint');

    cy.visit('/');
    cy.wait('@getNextEventSprint');
    cy.get('[data-cy="event-badge"]').should('be.visible');
  });

  it('shows event badge for sprint shootout sessions', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetNextEvent') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              schedule: [
                {
                  year: 2024,
                  event_name: 'Sprint Qualifying Event',
                  location: 'Location',
                  country: 'Country',
                  event_format: 'sprint_shootout',
                  session5_date_utc: '2026-01-01T00:00:00Z',
                },
              ],
            },
          },
        });
      }
    }).as('getNextEventSprint');

    cy.visit('/');
    cy.wait('@getNextEventSprint');
    cy.get('[data-cy="event-badge"]').should('be.visible');
  });

  it('does not show event badge for race or qualifying sessions', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetNextEvent') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              schedule: [
                {
                  year: 2024,
                  event_name: 'Race or Qualifying Event',
                  location: 'Location',
                  country: 'Country',
                  event_format: 'conventional',
                  session5_date_utc: '2026-01-01T00:00:00Z',
                },
              ],
            },
          },
        });
      }
    }).as('getNextEventRace');

    cy.visit('/');
    cy.wait('@getNextEventRace');
    cy.get('[data-cy="event-badge"]').should('not.exist');
  });

  it('does not show event badge for test sessions', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetNextEvent') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              schedule: [
                {
                  year: 2024,
                  event_name: 'Test Event',
                  location: 'Location',
                  country: 'Country',
                  event_format: 'testing',
                  session5_date_utc: '2026-01-01T00:00:00Z',
                },
              ],
            },
          },
        });
      }
    }).as('getNextEventRace');

    cy.visit('/');
    cy.wait('@getNextEventRace');
    cy.get('[data-cy="event-badge"]').should('not.exist');
  });

  it('does not show next event component when event is in the past', () => {
    // Set a date in the past for session5_date_utc
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 1); // Set to last year

    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetNextEvent') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              schedule: [
                {
                  year: pastDate.getFullYear(),
                  event_name: 'Past Event',
                  location: 'Old Location',
                  country: 'Old Country',
                  event_format: 'conventional',
                  session5_date_utc: pastDate.toISOString(),
                },
              ],
            },
          },
        });
      }
    }).as('getNextEventPast');

    cy.visit('/');
    cy.wait('@getNextEventPast');
    cy.get('[data-cy="next-event-name"]').should('not.exist');
  });
});

describe('Top Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('navigates to home page when clicking on the logo', () => {
    cy.get('a.btn.btn-ghost').click();
    cy.url().should('eq', Cypress.config('baseUrl') + '/');
  });

  it('navigates to Standings page', () => {
    const currentYear = new Date().getFullYear();
    cy.get('nav a[href*="/standings"]').click();
    cy.url().should('include', `/${currentYear}/standings`);
  });

  it('navigates to Map page', () => {
    const currentYear = new Date().getFullYear();
    cy.get('nav a[href*="/map"]').click();
    cy.url().should('include', `/${currentYear}/map`);
  });
});

describe('Footer', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('opens Terms of Service dialog', () => {
    cy.contains('Terms of Service').click();
    cy.contains('Terms and Conditions').should('be.visible');
    cy.get('[data-cy="dialog-close-toc"]').contains('Close').click();
    cy.contains('Terms and Conditions').should('not.exist');
  });

  it('opens About Us dialog', () => {
    cy.contains('About Us').click();
    cy.contains('About Slick Telemetry').should('be.visible');
    cy.get('[data-cy="dialog-close-about-us"]').contains('Close').click();
    cy.contains('About Slick Telemetry').should('not.exist');
  });

  it('has correct GitHub link', () => {
    cy.get('a[href*="https://github.com/Slick-Telemetry"]').should(
      'have.attr',
      'target',
      '_blank',
    );
    cy.get('a[href*="https://github.com/Slick-Telemetry"]').should(
      'have.attr',
      'rel',
      'noreferrer',
    );
  });

  it('has correct mailto link', () => {
    cy.get('a[href*="mailto:contact@slicktelemetry.com"]').should(
      'have.attr',
      'href',
      'mailto:contact@slicktelemetry.com',
    );
  });

  it('displays correct application version', () => {
    cy.readFile('VERSION').then((version) => {
      cy.get('[data-cy="app-version"]')
        .should('be.visible')
        .contains(`v${version.trim()}`);
    });
  });
});

describe('Seasons Dropdown', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows loading and then error message when network error occurs for seasons', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetSeasons') {
        req.reply({
          forceNetworkError: true,
        });
      }
    }).as('getSeasonsError');

    cy.get('[data-cy="season-selector"]').click();
    // cy.get('[data-cy="season-selector-loading"]')
    //   .should('be.visible')
    //   .contains('Loading Seasons...');
    cy.wait('@getSeasonsError');
    cy.get('[data-cy="season-selector-error"]')
      .should('be.visible')
      .contains('Server Error');
    cy.get('[data-cy="season-selector-error"]')
      .should('be.visible')
      .contains('Please try again');
  });
});
