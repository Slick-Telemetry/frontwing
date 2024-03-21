/* eslint-disable simple-import-sort/imports */

import { Dropdown } from '@/components/QueryNav/Dropdown';

describe('Dropdown.cy.tsx', () => {
  const initialVal = 'Initial Val';
  const options = ['Option 1', 'Options2'];

  it('dropdown selects first option', () => {
    const action = cy.spy().as('onDropdownChange');
    cy.mount(<Dropdown value={initialVal} items={options} action={action} />);
    cy.get('button').click();
    cy.get('[role="menuitemradio"]').eq(0).click();
    cy.get('@onDropdownChange').should('have.been.calledWith', options[0]);
  });

  it('dropdown selects second option', () => {
    const action = cy.spy().as('onDropdownChange');
    cy.mount(<Dropdown value={initialVal} items={options} action={action} />);
    cy.get('button').click();
    cy.get('[role="menuitemradio"]').eq(1).click();
    cy.get('@onDropdownChange').should('have.been.calledWith', options[1]);
  });

  it('dropdown with no items and close dropdown', () => {
    const action = cy.spy().as('onDropdownChange');
    cy.mount(<Dropdown value={initialVal} items={[]} action={action} />);
    cy.get('button').should('have.attr', 'disabled');
    cy.get('[role="menuitemradio"]').should('not.exist');
    cy.get('@onDropdownChange').should('not.have.been.calledWith', options[0]);
    cy.get('@onDropdownChange').should('not.have.been.calledWith', options[1]);
  });
});
