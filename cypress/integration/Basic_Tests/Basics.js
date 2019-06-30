import {
  visitAndClickDateTime,
  assertSelectedDateCorrectBothDatesChange,
} from '../HelperFunctions';

describe('Smart Mode, LHS, Functionality Tests', function() {
  it('On Click Same Month Shows Correct Start and From', function() {
    visitAndClickDateTime();
    cy.get('#row_1_cell_0_start').click();
    cy.get('#row_1_cell_1_start').click();
    assertSelectedDateCorrectBothDatesChange(
      'DateRangePickerContainer',
      '0',
      '0',
      'September',
      '2016',
      '23',
      '59',
      'October',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_5_start',
      'row_1_cell_0_start',
      'row_1_cell_1_start',
      '05-09-2016 00:00',
      '06-09-2016 23:59',
    );
  });

  it('On Click Different Start and End Month', function() {
    visitAndClickDateTime();
    cy.get('#row_1_cell_0_start').click();
    cy.get('#row_1_cell_1_end').click();
    assertSelectedDateCorrectBothDatesChange(
      'DateRangePickerContainer',
      '0',
      '0',
      'September',
      '2016',
      '23',
      '59',
      'October',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_5_start',
      'row_1_cell_0_start',
      'row_1_cell_1_end',
      '05-09-2016 00:00',
      '04-10-2016 23:59',
    );
  });
});