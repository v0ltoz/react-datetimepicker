import {
  assertSelectedDateCorrectBothDatesChange,
  keyboardOrClickThenCheckAllChanges,
  keyboardOrClickThenCheckAllChangesWithin,
  visitAndClickDateTime,
} from '../HelperFunctions';

describe('Smart Mode, LHS, Keyboard Up Tests, From Date', function() {
  it('On Start Date Arrow Down Change Date -7 Days, From Date Time Before To Date Time', function() {
    visitAndClickDateTime();
    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_3_cell_1_start',
      'row_2_cell_1_start',
      'uparrow',
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
      'row_2_cell_1_start',
      'row_3_cell_5_start',
      '13-09-2016 00:00',
      '24-09-2016 23:59',
    );
  });

  it('On Start Date Arrow Down Change Date -7 Days, From Date Time Same As To Date Time', function() {
    visitAndClickDateTime();
    cy.get('#DateTimeInput_start')
      .clear()
      .type('20-09-2016 23:59')
      .blur();

    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_3_cell_1_start',
      'row_2_cell_1_start',
      'uparrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '59',
      'October',
      '2016',
      'row_3_cell_1_start',
      undefined,
      'row_2_cell_1_start',
      'row_3_cell_5_start',
      '13-09-2016 23:59',
      '24-09-2016 23:59',
    );
  });

  it('On Start Date Arrow Down Change Date -7 Days, From Date Time After As To Date Time', function() {
    visitAndClickDateTime();
    cy.get('#DateTimeInput_start')
      .clear()
      .type('20-09-2016 23:59')
      .blur();
    cy.get('#DateTimeInput_end')
      .clear()
      .type('24-09-2016 23:00')
      .blur();

    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_3_cell_1_start',
      'row_2_cell_1_start',
      'uparrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '0',
      'October',
      '2016',
      'row_3_cell_1_start',
      undefined,
      'row_2_cell_1_start',
      'row_3_cell_5_start',
      '13-09-2016 23:59',
      '24-09-2016 23:00',
    );
  });

  it('On Start Date Arrow Up Change Date -7 Days, From Date Time Same As To Date', function() {
    visitAndClickDateTime();
    cy.get('#DateTimeInput_start')
      .clear()
      .type('24-09-2016 23:59')
      .blur();
    cy.get('#DateTimeInput_end')
      .clear()
      .type('24-09-2016 23:59')
      .blur();

    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_3_cell_5_start',
      'row_2_cell_5_start',
      'uparrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '59',
      'October',
      '2016',
      'row_3_cell_1_start',
      undefined,
      'row_2_cell_5_start',
      'row_3_cell_5_start',
      '17-09-2016 23:59',
      '24-09-2016 23:59',
    );
  });
});

describe('Smart Mode, LHS, Keyboard Up Tests, To Date', function() {
  it('On Start Date Arrow Down Change Date -7 Days, From Date Time Before To Date Time', function() {
    visitAndClickDateTime();
    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_3_cell_5_start',
      'row_2_cell_5_start',
      'uparrow',
      '23',
      '59',
      'September',
      '2016',
      '0',
      '0',
      'October',
      '2016',
      undefined,
      'row_3_cell_5_start',
      'row_3_cell_1_start',
      'row_2_cell_5_start',
      '17-09-2016 23:59',
      '20-09-2016 00:00',
    );
  });

  it('On Start Date Arrow Down Change Date -7 Days, From Date Time Same As To Date Time', function() {
    visitAndClickDateTime();
    cy.get('#DateTimeInput_start')
      .clear()
      .type('20-09-2016 23:59')
      .blur();

    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_3_cell_5_start',
      'row_2_cell_5_start',
      'uparrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '59',
      'October',
      '2016',
      undefined,
      'row_3_cell_5_start',
      'row_3_cell_1_start',
      'row_2_cell_5_start',
      '17-09-2016 23:59',
      '20-09-2016 23:59',
    );
  });

  it('On Start Date Arrow Down Change Date -7 Days, From Date Time After As To Date Time', function() {
    visitAndClickDateTime();
    cy.get('#DateTimeInput_start')
      .clear()
      .type('20-09-2016 23:59')
      .blur();
    cy.get('#DateTimeInput_end')
      .clear()
      .type('24-09-2016 23:00')
      .blur();

    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_3_cell_5_start',
      'row_2_cell_5_start',
      'uparrow',
      '23',
      '0',
      'September',
      '2016',
      '23',
      '59',
      'October',
      '2016',
      undefined,
      'row_3_cell_5_start',
      'row_3_cell_1_start',
      'row_2_cell_5_start',
      '17-09-2016 23:00',
      '20-09-2016 23:59',
    );
  });
});

describe('Basic Mode, Keyboard Up Tests, From Date', function() {
  it('On Start Date Arrow Down Change Date -7 Days, From Date Time Before To Date Time', function() {
    visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_1_start',
      'row_2_cell_1_end',
      'uparrow',
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
      'row_2_cell_1_start',
      'row_3_cell_5_start',
      '13-09-2016 00:00',
      '24-09-2016 23:59',
    );
  });

  it('On Start Date Arrow Down Change Date -7 Days, From Date Time Same As To Date Time', function() {
    visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
    cy.get('#DateTimeRangeContainerSmartModeDisabled').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('20-09-2016 23:59')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_1_start',
      'row_2_cell_1_end',
      'uparrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '59',
      'September',
      '2016',
      'row_3_cell_1_start',
      undefined,
      'row_2_cell_1_start',
      'row_3_cell_5_start',
      '13-09-2016 23:59',
      '24-09-2016 23:59',
    );
  });

  it('On Start Date Arrow Down Change Date -7 Days, From Date Time After As To Date Time', function() {
    visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
    cy.get('#DateTimeRangeContainerSmartModeDisabled').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('20-09-2016 23:59')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('24-09-2016 23:00')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_1_start',
      'row_2_cell_1_end',
      'uparrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '00',
      'September',
      '2016',
      'row_3_cell_1_start',
      undefined,
      'row_2_cell_1_start',
      'row_3_cell_5_start',
      '13-09-2016 23:59',
      '24-09-2016 23:00',
    );
  });
});

describe('Basic Mode, Keyboard Up Tests, To Date', function() {
  it('On Start Date Arrow Down Change Date -7 Days, From Date Time Before To Date Time', function() {
    visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_5_start',
      'row_3_cell_5_start',
      'uparrow',
      '0',
      '0',
      'September',
      '2016',
      '23',
      '59',
      'September',
      '2016',
      'row_2_cell_5_start',
      undefined,
      'row_3_cell_1_start',
      'row_3_cell_5_start',
      '20-09-2016 00:00',
      '24-09-2016 23:59',
    );
  });

  it('On Start Date Arrow Down Change Date -7 Days, From Date Time Same As To Date Time', function() {
    visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
    cy.get('#DateTimeRangeContainerSmartModeDisabled').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('20-09-2016 23:59')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_5_start',
      'row_3_cell_5_start',
      'uparrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '59',
      'September',
      '2016',
      'row_2_cell_5_start',
      undefined,
      'row_3_cell_1_start',
      'row_3_cell_5_start',
      '20-09-2016 23:59',
      '24-09-2016 23:59',
    );
  });

  it('On Start Date Arrow Down Change Date -7 Days, From Date Time After As To Date Time', function() {
    visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
    cy.get('#DateTimeRangeContainerSmartModeDisabled').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('20-09-2016 23:59')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('24-09-2016 23:00')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_5_start',
      'row_3_cell_5_start',
      'uparrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '0',
      'September',
      '2016',
      'row_2_cell_5_start',
      undefined,
      'row_3_cell_1_start',
      'row_3_cell_5_start',
      '20-09-2016 23:59',
      '24-09-2016 23:00',
    );
  });

  it('On Start Date Arrow Up Change Date -7 Days, From Date Time Same As To Date', function() {
    visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
    cy.get('#DateTimeRangeContainerSmartModeDisabled').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('24-09-2016 23:59')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('24-09-2016 23:59')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_5_start',
      'row_2_cell_5_end',
      'uparrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '59',
      'September',
      '2016',
      'row_3_cell_1_start',
      undefined,
      'row_2_cell_5_start',
      'row_3_cell_5_start',
      '17-09-2016 23:59',
      '24-09-2016 23:59',
    );
  });
});
