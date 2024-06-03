/* eslint-disable simple-import-sort/imports */

import { Dropdown, DropdownItem } from '@/components/QueryNav/Dropdown';

describe('Dropdown.cy.tsx', () => {
  const initialVal = 'Initial Val';
  const options = ['Option 1', 'Options2'];

  it('renders', () => {
    const action = cy.spy().as('onDropdownChange');
    cy.mount(
      <Dropdown value={initialVal} action={action}>
        {options.map((option) => (
          <DropdownItem key={option} item={option} />
        ))}
      </Dropdown>,
    );
  });

  it('dropdown selects first option', () => {
    const action = cy.spy().as('onDropdownChange');
    cy.mount(
      <Dropdown value={initialVal} action={action}>
        {options.map((option) => (
          <DropdownItem key={option} item={option} />
        ))}
      </Dropdown>,
    );
    cy.get('button').click();
    cy.get('[role="menuitemradio"]').eq(0).click();
    cy.get('@onDropdownChange').should('have.been.calledWith', options[0]);
  });

  it('dropdown selects second option', () => {
    const action = cy.spy().as('onDropdownChange');
    cy.mount(
      <Dropdown value={initialVal} action={action}>
        {options.map((option) => (
          <DropdownItem key={option} item={option} />
        ))}
      </Dropdown>,
    );
    cy.get('button').click();
    cy.get('[role="menuitemradio"]').eq(1).click();
    cy.get('@onDropdownChange').should('have.been.calledWith', options[1]);
  });

  it('dropdown with no items', () => {
    const action = cy.spy().as('onDropdownChange');
    cy.mount(
      <Dropdown value={initialVal} action={action}>
        {[]}
      </Dropdown>,
    );
    cy.get('button').should('have.attr', 'disabled');
    cy.get('[role="menuitemradio"]').should('not.exist');
    cy.get('@onDropdownChange').should('not.have.been.calledWith', options[0]);
    cy.get('@onDropdownChange').should('not.have.been.calledWith', options[1]);
  });

  it('dropdown open then click away', () => {
    const action = cy.spy().as('onDropdownChange');
    cy.mount(
      <Dropdown value={initialVal} action={action}>
        {options.map((option) => (
          <DropdownItem key={option} item={option} />
        ))}
      </Dropdown>,
    );
    cy.get('button').click();
    cy.get('body').click({ force: true });
    cy.get('@onDropdownChange').should('not.have.been.calledWith', options[0]);
    cy.get('@onDropdownChange').should('not.have.been.calledWith', options[1]);
  });
});
