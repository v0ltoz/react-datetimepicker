import { visitAndClickDateTime, checkStyleOfSelectorWithin } from '../HelperFunctions';

describe('Custom Style Tests', function() {
  it('Custom Styles Showing', function() {
    visitAndClickDateTime('DateTimeRangeContainerCustomStyles');
    checkStyleOfSelectorWithin(
      'DateTimeRangeContainerCustomStyles',
      'rangeButton9',
      'background-color',
      'rgb(100, 90, 200)',
    );
    checkStyleOfSelectorWithin(
      'DateTimeRangeContainerCustomStyles',
      'rangeButton6',
      'background-color',
      'rgb(40, 90, 75)',
    );
    checkStyleOfSelectorWithin(
      'DateTimeRangeContainerCustomStyles',
      'row_3_cell_1_start',
      'background-color',
      'rgb(255, 100, 100)',
    );
    checkStyleOfSelectorWithin(
      'DateTimeRangeContainerCustomStyles',
      'row_3_cell_2_start',
      'background-color',
      'rgb(200, 150, 100)',
    );
    checkStyleOfSelectorWithin(
      'DateTimeRangeContainerCustomStyles',
      'row_3_cell_5_start',
      'background-color',
      'rgb(40, 90, 75)',
    );
    cy.get('#DateTimeRangeContainerCustomStyles').within(() => {
      cy.get('#row_1_cell_2_start')
        .trigger('mouseover')
        .should('have.css', 'color', 'rgb(200, 0, 34)');
    });
  });

  it('No Custom Styles Showing On Non Custom Styles Input', function() {
    visitAndClickDateTime();
    checkStyleOfSelectorWithin(
      'DateRangePickerContainer',
      'rangeButton9',
      'background-color',
      'rgb(0, 136, 204)',
    );
    checkStyleOfSelectorWithin(
      'DateRangePickerContainer',
      'rangeButton6',
      'background-color',
      'rgb(245, 245, 245)',
    );
    checkStyleOfSelectorWithin(
      'DateRangePickerContainer',
      'row_3_cell_1_start',
      'background-color',
      'rgb(53, 122, 189)',
    );
    checkStyleOfSelectorWithin(
      'DateRangePickerContainer',
      'row_3_cell_2_start',
      'background-color',
      'rgb(235, 244, 248)',
    );
    checkStyleOfSelectorWithin(
      'DateRangePickerContainer',
      'row_3_cell_5_start',
      'background-color',
      'rgb(53, 122, 189)',
    );
    cy.get('#DateRangePickerContainer').within(() => {
      cy.get('#row_1_cell_2_start')
        .trigger('mouseover')
        .should('have.css', 'color', 'rgb(0, 0, 0)');
    });
  });
});
