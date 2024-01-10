// /* eslint-disable simple-import-sort/imports */

import '@/app/globals.css';

import { Dropdown } from '@/app/ui/Dropdown';

describe('Dropdown.cy.tsx', () => {
  const initialVal = 'Initial Val';
  const options = ['Option 1', 'Options2'];

  it('dropdown selects first option', () => {
    const action = cy.spy().as('onDropdownChange');
    cy.mount(<Dropdown value={initialVal} items={options} action={action} />);
    cy.get('[data-cy="dropdown"]').click();
    cy.get('[data-cy="dropdown-item"]').first().click();
    cy.get('@onDropdownChange').should('have.been.calledWith', options[0]);
  });

  it('dropdown selects second option', () => {
    const action = cy.spy().as('onDropdownChange');
    cy.mount(<Dropdown value={initialVal} items={options} action={action} />);
    cy.get('[data-cy="dropdown"]').click();
    cy.get('[data-cy="dropdown-item"]').first().next().click();
    cy.get('@onDropdownChange').should('have.been.calledWith', options[1]);
  });

  it('dropdown with no items and close dropdown', () => {
    const action = cy.spy().as('onDropdownChange');
    cy.mount(<Dropdown value={initialVal} items={[]} action={action} />);
    cy.get('[data-cy="dropdown"]').click();
    cy.get('[data-cy="dropdown-item"]').should('not.exist');
    cy.get('@onDropdownChange').should('not.have.been.calledWith', options[0]);
    cy.get('@onDropdownChange').should('not.have.been.calledWith', options[1]);

    // Outside click
    cy.get('body').click();
  });
});
