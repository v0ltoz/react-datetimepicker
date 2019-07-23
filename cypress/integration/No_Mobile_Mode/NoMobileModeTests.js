import {
  visitAndClickDateTime,
  keyboardOrClickThenCheckAllChanges,
  keyboardOrClickThenCheckAllChangesWithin,
} from '../HelperFunctions';

describe('Date Time Picker Mobile Mode Tests', function() {
  it('Mobile Mode not disabled (Default) Mobile Mode Active, When Below 680px', function() {
    visitAndClickDateTime('DateTimeRangeContainerMobileMode');
    cy.viewport('iphone-5'); // Set viewport to 375px x 667px
    cy.get('#DateTimeRangeContainerMobileMode').within(() => {
      cy.get('#daterangepicker').should('have.css', 'display', 'block');
    });
  });

  it('Mobile Mode not showing, When above 680px', function() {
    visitAndClickDateTime('DateTimeRangeContainerMobileMode');
    cy.viewport('macbook-11'); // Set viewport to 375px x 667px
    cy.get('#DateTimeRangeContainerMobileMode').within(() => {
      cy.get('#daterangepicker').should('have.css', 'display', 'flex');
    });
  });

  it('Mobile Mode disabled, When Below 680px when disable prop set', function() {
    visitAndClickDateTime('DateTimeRangeContainerNoMobileMode');
    cy.viewport('iphone-5'); // Set viewport to 375px x 667px
    cy.get('#DateTimeRangeContainerNoMobileMode').within(() => {
      cy.get('#daterangepicker').should('have.css', 'display', 'flex');
    });
  });
});
