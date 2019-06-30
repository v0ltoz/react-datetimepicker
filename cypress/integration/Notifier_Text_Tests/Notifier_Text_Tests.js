import {
  keyboardOrClickThenCheckAllChangesWithin,
  visitAndClickDateTime,
  checkStyleOfSelectorWithin,
  checkStyleOfSelector,
  keyboardOrClickThenCheckAllChanges,
} from '../HelperFunctions';

describe('Notifier Text Tests', function() {
  it('Smart mode starts with Start and on click switches too To date', function() {
    visitAndClickDateTime();
    cy.get('#DateRangePickerContainer').within(() => {
      cy.get('#startNotifierID').contains('Selecting From');
      cy.get('#endNotifierID').should('not.exist');
    });
    checkStyleOfSelector('row_4_cell_0_start', 'color', 'rgb(0, 0, 0)');
    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_4_cell_0_start',
      'row_4_cell_0_start',
      'click',
      '0',
      '0',
      'September',
      '2016',
      '23',
      '59',
      'October',
      '2016',
      'row_3_cell_1_start',
      undefined,
      'row_4_cell_0_start',
      'row_4_cell_1_start',
      '26-09-2016 00:00',
      '27-09-2016 23:59',
    );
    cy.get('#DateRangePickerContainer').within(() => {
      cy.get('#endNotifierID').contains('Selecting To');
      cy.get('#startNotifierID').should('not.exist');
    });
    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_4_cell_4_start',
      'row_4_cell_4_start',
      'click',
      '0',
      '0',
      'September',
      '2016',
      '23',
      '59',
      'October',
      '2016',
      'row_3_cell_1_start',
      undefined,
      'row_4_cell_0_start',
      'row_4_cell_4_start',
      '26-09-2016 00:00',
      '30-09-2016 23:59',
    );
    cy.get('#DateRangePickerContainer').within(() => {
      cy.get('#startNotifierID').contains('Selecting From');
      cy.get('#endNotifierID').should('not.exist');
    });
  });

  it('Non Smart Mode, Shows From Date and To Date', function() {
    visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
    cy.get('#DateTimeRangeContainerSmartModeDisabled').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('20-09-2016 23:59')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('24-09-2016 00:00')
        .blur();
      cy.get('#startNotifierID').contains('From Date');
      cy.get('#endNotifierID').contains('To Date');
    });
    checkStyleOfSelectorWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_1_end',
      'color',
      'rgb(255, 255, 255)',
    );
    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSmartModeDisabled',
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
      'row_3_cell_6_end',
      'row_3_cell_1_start',
      'row_3_cell_5_end',
      '20-09-2016 23:59',
      '24-09-2016 00:00',
    );
    cy.get('#DateTimeRangeContainerSmartModeDisabled').within(() => {
      cy.get('#startNotifierID').contains('From Date');
      cy.get('#endNotifierID').contains('To Date');
    });
  });
});
