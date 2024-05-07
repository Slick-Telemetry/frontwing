/// <reference types="cypress" />

describe('visit dashboard', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://127.0.0.1:3000/dashboard');

    // TODO: Replace with network fixtures
    // https://docs.cypress.io/guides/guides/network-requests#Routing
    // Wait 100 millisecond to make sure the page is loaded.
    cy.wait(100);
  });

  it('displays defaults values', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get('#queryNav').should('have.length', 1);
    cy.get('#queryNav [data-cy="dropdown"]').should('have.length', 4);

    // We can go even further and check that the default todos each contain
    // the correct text. We use the `first` and `last` functions
    // to get just the first and last matched elements individually,
    // and then perform an assertion with `should`.
    cy.get('#queryNav [data-cy="dropdown"]')
      .first()
      .should('have.text', '2024');
    cy.get('#queryNav [data-cy="dropdown"]')
      .eq(1)
      .should('have.text', 'All Events');
    // .parent().should('not.have.attr', 'disabled')
    cy.get('#queryNav [data-cy="dropdown"]')
      .eq(2)
      .should('have.text', 'Race')
      .parent()
      .should('have.attr', 'disabled');
    cy.get('#queryNav [data-cy="dropdown"]')
      .last()
      .should('have.text', 'All Drivers')
      .parent()
      .should('have.attr', 'disabled');
  });

  it('change the season', () => {
    cy.get('#queryNav [data-cy="dropdown"]').first().click();
    cy.get('[role="menuitemradio"]').eq(1).click(); // 2023
    cy.url().should('include', '?season=2023');

    // TODO: No fetch call is made

    cy.get('#queryNav [data-cy="dropdown"]')
      .first()
      .should('have.text', '2023');
    cy.get('#queryNav [data-cy="dropdown"]')
      .eq(1)
      .should('have.text', 'All Events')
      .parent()
      .should('not.have.attr', 'disabled');
    cy.get('#queryNav [data-cy="dropdown"]')
      .eq(2)
      .should('have.text', 'Race')
      .parent()
      .should('have.attr', 'disabled');
    cy.get('#queryNav [data-cy="dropdown"]')
      .last()
      .should('have.text', 'All Drivers')
      .parent()
      .should('have.attr', 'disabled');

    // Change the event
    cy.get('#queryNav [data-cy="dropdown"]').eq(1).click();
    cy.get('[role="menuitemradio"]')
      .last()
      .should('have.text', 'Abu Dhabi Grand Prix');
    cy.get('[role="menuitemradio"]').last().click(); // Bahrain
    cy.url().should('include', '?season=2023&event=Abu+Dhabi+Grand+Prix');
  });

  it('change the event', () => {
    cy.get('#queryNav [data-cy="dropdown"]').eq(1).click();
    cy.get('[role="menuitemradio"]').eq(1).click(); // Bahrain
    cy.url().should('include', '?season=2024&event=Bahrain+Grand+Prix');

    cy.get('#queryNav [data-cy="dropdown"]')
      .first()
      .should('have.text', '2024');
    cy.get('#queryNav [data-cy="dropdown"]')
      .eq(1)
      .should('have.text', 'Bahrain Grand Prix')
      .parent()
      .should('not.have.attr', 'disabled');
    cy.get('#queryNav [data-cy="dropdown"]')
      .eq(2)
      .should('have.text', 'Race')
      .parent()
      .should('not.have.attr', 'disabled');
    cy.get('#queryNav [data-cy="dropdown"]')
      .last()
      .should('have.text', 'All Drivers')
      .parent()
      .should('not.have.attr', 'disabled');
  });
});
