import {
  visitAndClickDateTime,
  keyboardOrClickThenCheckAllChanges,
  keyboardOrClickThenCheckAllChangesWithin,
} from '../HelperFunctions';

describe('Smart Mode, LHS, Keyboard Right Tests, From Date', function() {
  it('On Start Date Arrow Right Change Date +1 Days, From Date Time Before To Date Time, 1 Day Before', function() {
    visitAndClickDateTime();
    cy.get('#DateTimeInput_start')
      .clear()
      .type('23-09-2016 00:00')
      .blur();
    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_3_cell_4_start',
      'row_3_cell_5_start',
      'rightarrow',
      '0',
      '0',
      'September',
      '2016',
      '23',
      '59',
      'October',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_4_start',
      'row_3_cell_5_start',
      'row_3_cell_5_start',
      '24-09-2016 00:00',
      '24-09-2016 23:59',
    );
  });

  it('On Start Date Right Arrow Change Date +1 Days, From Date Time Same As To Date Time, 1 Day Before', function() {
    visitAndClickDateTime();
    cy.get('#DateTimeInput_start')
      .clear()
      .type('23-09-2016 23:59')
      .blur();
    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_3_cell_4_start',
      'row_3_cell_5_start',
      'rightarrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '59',
      'October',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_4_start',
      'row_3_cell_5_start',
      'row_3_cell_5_start',
      '24-09-2016 23:59',
      '24-09-2016 23:59',
    );
  });

  it('On Start Date Arrow Right Change Date +1 Days, From Date Time After As To Date Time, 1 Day Before', function() {
    visitAndClickDateTime();
    cy.get('#DateTimeInput_start')
      .clear()
      .type('23-09-2016 23:59')
      .blur();
    cy.get('#DateTimeInput_end')
      .clear()
      .type('24-09-2016 23:00')
      .blur();

    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_3_cell_4_start',
      'row_3_cell_5_start',
      'rightarrow',
      '23',
      '0',
      'September',
      '2016',
      '23',
      '59',
      'October',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_4_start',
      'row_3_cell_5_start',
      'row_3_cell_5_start',
      '24-09-2016 23:00',
      '24-09-2016 23:59',
    );
  });

  it('On Start Date Arrow Right Change Date +1 Days, From Date Time Equal To Date Time, Same Day', function() {
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
      'row_3_cell_6_start',
      'rightarrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '59',
      'October',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_4_start',
      'row_3_cell_5_start',
      'row_3_cell_5_start',
      '24-09-2016 23:59',
      '25-09-2016 23:59',
    );
  });

  it('On Start Date Arrow Right x2 Change Date +1 Days, From Date Time Equal To Date Time, Same Day', function() {
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
      'row_3_cell_6_start',
      'rightarrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '59',
      'October',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_4_start',
      'row_3_cell_5_start',
      'row_3_cell_5_start',
      '24-09-2016 23:59',
      '25-09-2016 23:59',
    );
    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_3_cell_6_start',
      'row_4_cell_0_start',
      'rightarrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '59',
      'October',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_4_start',
      'row_3_cell_5_start',
      'row_3_cell_5_start',
      '24-09-2016 23:59',
      '26-09-2016 23:59',
    );
  });
});

describe('Smart Mode, LHS, Keyboard Right Tests, To Date', function() {
  it('On End Date Arrow Right Change Date +1 Days, From Date Time Before To Date Time, 1 Day Before', function() {
    visitAndClickDateTime();
    cy.get('#DateTimeInput_start')
      .clear()
      .type('23-09-2016 00:00')
      .blur();
    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_3_cell_5_start',
      'row_3_cell_6_start',
      'rightarrow',
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
      'row_3_cell_4_start',
      'row_3_cell_6_start',
      '23-09-2016 00:00',
      '25-09-2016 23:59',
    );
  });

  it('On Start Date Right Arrow Change Date +1 Days, From Date Time Same As To Date Time, 1 Day Before', function() {
    visitAndClickDateTime();
    cy.get('#DateTimeInput_start')
      .clear()
      .type('23-09-2016 23:59')
      .blur();
    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_3_cell_5_start',
      'row_3_cell_6_start',
      'rightarrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '59',
      'October',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_5_start',
      'row_3_cell_4_start',
      'row_3_cell_6_start',
      '23-09-2016 23:59',
      '25-09-2016 23:59',
    );
  });

  it('On Start Date Arrow Right Change Date +1 Days, From Date Time After As To Date Time, 1 Day Before', function() {
    visitAndClickDateTime();
    cy.get('#DateTimeInput_start')
      .clear()
      .type('23-09-2016 23:59')
      .blur();
    cy.get('#DateTimeInput_end')
      .clear()
      .type('24-09-2016 23:00')
      .blur();

    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_3_cell_5_start',
      'row_3_cell_6_start',
      'rightarrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '0',
      'October',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_5_start',
      'row_3_cell_4_start',
      'row_3_cell_6_start',
      '23-09-2016 23:59',
      '25-09-2016 23:00',
    );
  });

  it('On Start Date Arrow Right Change Date +1 Days, From Date Time Equal To Date Time, Same Day', function() {
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
      'row_3_cell_6_start',
      'rightarrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '59',
      'October',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_4_start',
      'row_3_cell_5_start',
      'row_3_cell_6_start',
      '24-09-2016 23:59',
      '25-09-2016 23:59',
    );
  });
});

describe('Basic Mode, LHS, Keyboard Right Tests, From Date', function() {
  it('On Start Date Arrow Right Change Date +1 Days, From Date Time Before To Date Time, 1 Day Before', function() {
    visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
    cy.get('#DateTimeRangeContainerSmartModeDisabled').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('23-09-2016 00:00')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_4_start',
      'row_3_cell_5_end',
      'rightarrow',
      '0',
      '0',
      'September',
      '2016',
      '23',
      '59',
      'September',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_4_start',
      'row_3_cell_5_start',
      'row_3_cell_5_end',
      '24-09-2016 00:00',
      '24-09-2016 23:59',
    );
  });

  it('On Start Date Right Arrow Change Date +1 Days, From Date Time Same As To Date Time, 1 Day Before', function() {
    visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
    cy.get('#DateTimeRangeContainerSmartModeDisabled').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('23-09-2016 23:59')
        .blur();
    });
    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_4_start',
      'row_3_cell_5_end',
      'rightarrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '59',
      'September',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_4_start',
      'row_3_cell_5_start',
      'row_3_cell_5_end',
      '24-09-2016 23:59',
      '24-09-2016 23:59',
    );
  });

  it('On Start Date Arrow Right Change Date +1 Days, From Date Time After As To Date Time, 1 Day Before', function() {
    visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
    cy.get('#DateTimeRangeContainerSmartModeDisabled').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('23-09-2016 23:59')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('24-09-2016 23:00')
        .blur();
    });
    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_4_start',
      'row_3_cell_4_start',
      'rightarrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '0',
      'September',
      '2016',
      'row_3_cell_1_start',
      undefined,
      'row_3_cell_4_start',
      'row_3_cell_5_end',
      '23-09-2016 23:59',
      '24-09-2016 23:00',
    );
  });

  it('On Start Date Arrow Right Change Date +1 Days, From Date Time Equal To Date Time, Same Day', function() {
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
      'row_3_cell_4_start',
      'row_3_cell_4_start',
      'rightarrow',
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
      'row_3_cell_5_start',
      'row_3_cell_5_end',
      '24-09-2016 23:59',
      '24-09-2016 23:59',
    );
  });
});

describe('Basic Mode, LHS, Keyboard Right Tests, To Date', function() {
  it('On Start Date Arrow Right Change Date +1 Days, From Date Time Before To Date Time, 1 Day Before', function() {
    visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
    cy.get('#DateTimeRangeContainerSmartModeDisabled').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('23-09-2016 00:00')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_5_start',
      'row_3_cell_6_end',
      'rightarrow',
      '0',
      '0',
      'September',
      '2016',
      '23',
      '59',
      'September',
      '2016',
      'row_3_cell_5_start',
      undefined,
      'row_3_cell_4_start',
      'row_3_cell_6_end',
      '23-09-2016 00:00',
      '25-09-2016 23:59',
    );
  });

  it('On Start Date Right Arrow Change Date +1 Days, From Date Time Same As To Date Time, 1 Day Before', function() {
    visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
    cy.get('#DateTimeRangeContainerSmartModeDisabled').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('23-09-2016 23:59')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_5_start',
      'row_3_cell_6_end',
      'rightarrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '59',
      'September',
      '2016',
      'row_3_cell_5_start',
      undefined,
      'row_3_cell_4_start',
      'row_3_cell_6_end',
      '23-09-2016 23:59',
      '25-09-2016 23:59',
    );
  });

  it('On Start Date Arrow Right Change Date +1 Days, From Date Time After As To Date Time, 1 Day Before', function() {
    visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
    cy.get('#DateTimeRangeContainerSmartModeDisabled').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('23-09-2016 23:59')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('24-09-2016 23:00')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSmartModeDisabled',
      'row_3_cell_5_start',
      'row_3_cell_6_end',
      'rightarrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '0',
      'September',
      '2016',
      'row_3_cell_5_start',
      undefined,
      'row_3_cell_4_start',
      'row_3_cell_6_end',
      '23-09-2016 23:59',
      '25-09-2016 23:00',
    );
  });

  it('On Start Date Arrow Right Change Date +1 Days, From Date Time Equal To Date Time, Same Day', function() {
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
      'row_3_cell_5_end',
      'row_3_cell_6_end',
      'rightarrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '59',
      'September',
      '2016',
      'row_3_cell_4_start',
      undefined,
      'row_3_cell_5_start',
      'row_3_cell_6_end',
      '24-09-2016 23:59',
      '25-09-2016 23:59',
    );
  });
});
