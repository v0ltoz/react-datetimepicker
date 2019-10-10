import {
  visitAndClickDateTime,
  keyboardOrClickThenCheckAllChanges,
  keyboardOrClickThenCheckAllChangesWithin, checkStyleOfSelectorWithin, assertSelectedDateCorrectBothDatesChange,
} from '../HelperFunctions';

describe('Standalone Picker Tests', function() {
  it('Is standalone picker showing by default', function() {
    cy.visit('http://localhost:3000/');
    cy.scrollTo('bottom');
    cy.get('#DateTimeRangeContainerStandalone').within(() => {
      cy.get('#rangeButton0').should('be.visible');
      cy.get('#DateTimeInput_end').should('be.visible');
    });
  });

  it('Standalone picker allows date changes', function() {
    cy.get('#DateTimeRangeContainerStandalone').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 23:59')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('25-09-2016 00:00')
        .blur();
      cy.get('#startNotifierID').contains('From Date');
      cy.get('#endNotifierID').contains('To Date');
    });
    checkStyleOfSelectorWithin(
      'DateTimeRangeContainerStandalone',
      'row_3_cell_2_end',
      'color',
      'rgb(255, 255, 255)',
    );
    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerStandalone',
      'row_3_cell_1_end',
      'row_3_cell_1_end',
      'click',
      '23',
      '59',
      'September',
      '2016',
      '0',
      '0',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_6_end',
      '21-09-2016 23:59',
      '25-09-2016 00:00',
    );
    cy.get('#DateTimeRangeContainerStandalone').within(() => {
      cy.get('#startNotifierID').contains('From Date');
      cy.get('#endNotifierID').contains('To Date');
    });
  });

  it('Standalone picker can click on Ranges', function() {
    cy.get('#DateTimeRangeContainerStandalone').within(() => {
      cy.get('#rangeButton7').click();
    });

    assertSelectedDateCorrectBothDatesChange(
      'DateTimeRangeContainerStandalone',
      0,
      0,
      'August',
      2018,
      0,
      0,
      'August',
      2018,
      'row_1_cell_0_start',
      'row_1_cell_0_start',
      'row_0_cell_2_start',
      'row_0_cell_3_end',
      '01-08-2018 00:00',
      '02-08-2018 00:00'
      ,
    );
  });

});
