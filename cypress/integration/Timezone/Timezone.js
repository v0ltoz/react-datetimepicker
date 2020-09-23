import {
  visitAndClickDateTime,
  assertSelectedDateCorrectBothDatesChange,
} from '../HelperFunctions';

describe('Timezone Test', function() {
  it('Ensure timezone changes on click', function() {
    cy.visit('http://localhost:3000/');
    cy.get('#Timezone-Toggle').click();
    cy.get('#Timezone-Click-Button').click();
    cy.get('#DateTimeRangeContainerTimezone').click();
    assertSelectedDateCorrectBothDatesChange(
      'DateRangePickerContainer',
      '8',
      '0',
      'September',
      '2016',
      '7',
      '59',
      'October',
      '2016',
      'row_3_cell_2_start',
      'row_3_cell_5_start',
      'row_3_cell_1_start',
      'row_3_cell_6_start',
      '20-09-2016 08:00',
      '25-09-2016 07:59',
    );
  });

});