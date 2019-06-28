import {
  keyboardOrClickThenCheckAllChangesWithin,
  visitAndClickDateTime,
  checkStyleOfSelectorWithin,
} from '../HelperFunctions';

describe('Non Smart Mode, Invalid Cell Tests', function() {
  it('LHS, Cell Click after End Date, should not be valid and should be greyed out', function() {
    visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
    checkStyleOfSelectorWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_4_cell_0_start',
      'color',
      'rgb(153, 153, 153)',
    );
    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_4_cell_0_start',
      'row_4_cell_0_start',
      'click',
      '0',
      '0',
      'September',
      '2016',
      '23',
      '59',
      'September',
      '2016',
      'row_4_cell_0_start',
      'row_3_cell_2_start',
      'row_3_cell_1_start',
      'row_3_cell_5_start',
      '20-09-2016 00:00',
      '24-09-2016 23:59',
    );
  });

  it('LHS, Cell Click before Start Date, should be valid and not greyed out', function() {
    visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
    checkStyleOfSelectorWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_1_cell_0_start',
      'color',
      'rgb(0, 0, 0)',
    );
    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_1_cell_0_start',
      'row_1_cell_0_start',
      'click',
      '0',
      '0',
      'September',
      '2016',
      '23',
      '59',
      'September',
      '2016',
      'row_3_cell_1_start',
      undefined,
      'row_1_cell_0_start',
      'row_3_cell_5_start',
      '05-09-2016 00:00',
      '24-09-2016 23:59',
    );
  });

  it('LHS, Cell Click same as End Date, Start time before end time, should be valid and not greyed out', function() {
    visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
    checkStyleOfSelectorWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_5_start',
      'color',
      'rgb(255, 255, 255)',
    );
    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_5_start',
      'row_3_cell_5_start',
      'click',
      '0',
      '0',
      'September',
      '2016',
      '23',
      '59',
      'September',
      '2016',
      'row_3_cell_1_start',
      'row_1_cell_0_start',
      'row_3_cell_5_start',
      'row_3_cell_5_end',
      '24-09-2016 00:00',
      '24-09-2016 23:59',
    );
  });

  it('LHS, Cell Click same as End Date, Start time same as end time, should be valid', function() {
    visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
    cy.get('#DateTimeRangeContainerSmartModeDisabled').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('20-09-2016 23:59')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('24-09-2016 23:59')
        .blur();
    });
    checkStyleOfSelectorWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_5_start',
      'color',
      'rgb(255, 255, 255)',
    );
    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_5_start',
      'row_3_cell_5_start',
      'click',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '59',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_6_end',
      'row_3_cell_5_start',
      'row_3_cell_5_end',
      '24-09-2016 23:59',
      '24-09-2016 23:59',
    );
  });

  it('LHS, Cell Click same as End Date, Start time after end time, should be invalid', function() {
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
    });
    checkStyleOfSelectorWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_5_start',
      'color',
      'rgb(255, 255, 255)',
    );
    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_5_start',
      'row_3_cell_5_start',
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
  });

  it('RHS, Cell Click before Start Date, shouldnt be valid and should be greyed out', function() {
    visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
    checkStyleOfSelectorWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_1_cell_0_end',
      'color',
      'rgb(153, 153, 153)',
    );
    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_1_cell_0_end',
      'row_1_cell_0_end',
      'click',
      '0',
      '0',
      'September',
      '2016',
      '23',
      '59',
      'September',
      '2016',
      'row_1_cell_0_end',
      'row_1_cell_0_start',
      'row_3_cell_1_start',
      'row_3_cell_5_start',
      '20-09-2016 00:00',
      '24-09-2016 23:59',
    );
  });

  it('RHS, Cell Click After Start Date, should be valid and shouldnt be greyed out', function() {
    visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
    checkStyleOfSelectorWithin('DateTimeRangeContainerSmartModeDisabled', 'row_4_cell_0_end', 'color', 'rgb(0, 0, 0)');
    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_4_cell_0_end',
      'row_4_cell_0_end',
      'click',
      '0',
      '0',
      'September',
      '2016',
      '23',
      '59',
      'September',
      '2016',
      'row_3_cell_5_start',
      'row_3_cell_5_end',
      'row_3_cell_1_start',
      'row_4_cell_0_start',
      '20-09-2016 00:00',
      '26-09-2016 23:59',
    );
  });

  it('RHS, Cell Click same as Start Date, End time after start time, should be valid and not greyed out', function() {
    visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
    checkStyleOfSelectorWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_1_start',
      'color',
      'rgb(255, 255, 255)',
    );
    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_1_end',
      'row_3_cell_1_end',
      'click',
      '0',
      '0',
      'September',
      '2016',
      '23',
      '59',
      'September',
      '2016',
      'row_3_cell_5_end',
      'row_3_cell_5_start',
      'row_3_cell_1_start',
      'row_3_cell_1_end',
      '20-09-2016 00:00',
      '20-09-2016 23:59',
    );
  });

  it('RHS, Cell Click same as Start Date, Start time same as end time, should be valid', function() {
    visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
    cy.get('#DateTimeRangeContainerSmartModeDisabled').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('20-09-2016 23:59')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('24-09-2016 23:59')
        .blur();
    });
    checkStyleOfSelectorWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_1_start',
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
      '23',
      '59',
      'September',
      '2016',
      'row_3_cell_5_start',
      'row_3_cell_5_end',
      'row_3_cell_1_start',
      'row_3_cell_1_end',
      '20-09-2016 23:59',
      '20-09-2016 23:59',
    );
  });

  it('RHS, Cell Click same as Start Date, Start time after end time, should be invalid', function() {
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
  });
});
