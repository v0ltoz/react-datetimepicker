import {
  visitAndClickDateTime,
  keyboardOrClickThenCheckAllChanges,
  keyboardOrClickThenCheckAllChangesWithin,
} from '../HelperFunctions';

describe('Smart Mode, LHS, Keyboard Left Tests, From Date', function() {
  it('On Start Date Arrow Left Change Date -1 Days, From Date Time Before To Date Time, 1 Day Before', function() {
    visitAndClickDateTime();
    cy.get('#DateTimeInput_start')
      .clear()
      .type('23-09-2016 00:00')
      .blur();
    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_3_cell_4_start',
      'row_3_cell_3_start',
      'leftarrow',
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
      'row_3_cell_3_start',
      'row_3_cell_5_start',
      '22-09-2016 00:00',
      '24-09-2016 23:59',
    );
  });

  it('On Start Date Left Arrow Change Date -1 Days, From Date Time Same As To Date Time, 1 Day Before', function() {
    visitAndClickDateTime();
    cy.get('#DateTimeInput_start')
      .clear()
      .type('23-09-2016 23:59')
      .blur();
    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_3_cell_4_start',
      'row_3_cell_3_start',
      'leftarrow',
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
      'row_3_cell_3_start',
      'row_3_cell_5_start',
      '22-09-2016 23:59',
      '24-09-2016 23:59',
    );
  });

  it('On Start Date Arrow Left Change Date -1 Days, From Date Time After As To Date Time, 1 Day Before', function() {
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
      'row_3_cell_3_start',
      'leftarrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '0',
      'October',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_4_start',
      'row_3_cell_3_start',
      'row_3_cell_5_start',
      '22-09-2016 23:59',
      '24-09-2016 23:00',
    );
  });

  it('On Start Date Arrow Left Change Date -1 Days, From Date Time Equal To Date Time, Same Day', function() {
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
      'row_3_cell_4_start',
      'leftarrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '59',
      'October',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_6_start',
      'row_3_cell_4_start',
      'row_3_cell_5_start',
      '23-09-2016 23:59',
      '24-09-2016 23:59',
    );
  });

  it('On Start Date Arrow Left x2 Change Date -1 Days, From Date Time Equal To Date Time, Same Day', function() {
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
      'row_3_cell_4_start',
      'leftarrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '59',
      'October',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_6_start',
      'row_3_cell_4_start',
      'row_3_cell_5_start',
      '23-09-2016 23:59',
      '24-09-2016 23:59',
    );
    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_3_cell_4_start',
      'row_3_cell_3_start',
      'leftarrow',
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
      'row_3_cell_3_start',
      'row_3_cell_5_start',
      '22-09-2016 23:59',
      '24-09-2016 23:59',
    );
  });
});

describe('Smart Mode, LHS, Keyboard Right Tests, To Date', function() {
  it('On End Date Arrow Left Change Date -1 Days, From Date Time Before To Date Time, 1 Day Before', function() {
    visitAndClickDateTime();
    cy.get('#DateTimeInput_start')
      .clear()
      .type('23-09-2016 00:00')
      .blur();
    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_3_cell_5_start',
      'row_3_cell_3_start',
      'leftarrow',
      '0',
      '0',
      'September',
      '2016',
      '23',
      '59',
      'October',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_6_start',
      'row_3_cell_4_start',
      'row_3_cell_3_start',
      '22-09-2016 00:00',
      '23-09-2016 23:59',
    );
  });

  it('On Start Date Left Arrow Change Date -1 Days, From Date Time Same As To Date Time, 1 Day Before', function() {
    visitAndClickDateTime();
    cy.get('#DateTimeInput_start')
      .clear()
      .type('23-09-2016 23:59')
      .blur();
    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_3_cell_5_start',
      'row_3_cell_3_start',
      'leftarrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '59',
      'October',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_6_start',
      'row_3_cell_4_start',
      'row_3_cell_3_start',
      '22-09-2016 23:59',
      '23-09-2016 23:59',
    );
  });

  it('On Start Date Arrow Left Change Date -1 Days, From Date Time After As To Date Time, 1 Day Before', function() {
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
      'row_3_cell_3_start',
      'leftarrow',
      '23',
      '00',
      'September',
      '2016',
      '23',
      '59',
      'October',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_6_start',
      'row_3_cell_4_start',
      'row_3_cell_3_start',
      '22-09-2016 23:00',
      '23-09-2016 23:59',
    );
  });

  it('On Start Date Arrow Left Change Date -1 Days, From Date Time Equal To Date Time, Same Day', function() {
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
      'row_3_cell_4_start',
      'leftarrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '59',
      'October',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_6_start',
      'row_3_cell_5_start',
      'row_3_cell_4_start',
      '23-09-2016 23:59',
      '24-09-2016 23:59',
    );
  });
});

describe('Basic Mode, LHS, Keyboard Left Tests, From Date', function() {
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
      'row_3_cell_3_end',
      'leftarrow',
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
      'row_3_cell_3_start',
      'row_3_cell_5_end',
      '22-09-2016 00:00',
      '24-09-2016 23:59',
    );
  });

  it('On Start Date Left Arrow Change Date -1 Days, From Date Time Same As To Date Time, 1 Day Before', function() {
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
      'row_3_cell_3_end',
      'leftarrow',
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
      'row_3_cell_3_start',
      'row_3_cell_5_end',
      '22-09-2016 23:59',
      '24-09-2016 23:59',
    );
  });

  it('On Start Date Arrow Left Change Date -1 Days, From Date Time After As To Date Time, 1 Day Before', function() {
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
      'row_3_cell_3_end',
      'leftarrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '0',
      'September',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_4_start',
      'row_3_cell_3_start',
      'row_3_cell_5_end',
      '22-09-2016 23:59',
      '24-09-2016 23:00',
    );
  });

  it('On Start Date Arrow Left Change Date -1 Days, From Date Time Equal To Date Time, Same Day', function() {
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
      'row_3_cell_4_end',
      'leftarrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '59',
      'September',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_6_start',
      'row_3_cell_4_start',
      'row_3_cell_5_end',
      '23-09-2016 23:59',
      '24-09-2016 23:59',
    );
  });
});

describe('Basic Mode, LHS, Keyboard Left Tests, To Date', function() {
  it('On Start Date Arrow Left Change Date -1 Days, From Date Time Before To Date Time, 1 Day Before', function() {
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
      'row_3_cell_3_end',
      'leftarrow',
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
      'row_3_cell_4_start',
      'row_3_cell_4_end',
      '22-09-2016 00:00',
      '23-09-2016 23:59',
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
      'row_3_cell_3_end',
      'leftarrow',
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
      'row_3_cell_4_start',
      'row_3_cell_4_end',
      '22-09-2016 23:59',
      '23-09-2016 23:59',
    );
  });

  it('On Start Date Arrow Left Change Date -1 Days, From Date Time After As To Date Time, 1 Day Before', function() {
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
      'row_3_cell_5_start',
      'leftarrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '0',
      'September',
      '2016',
      'row_3_cell_6_start',
      'row_3_cell_3_end',
      'row_3_cell_5_start',
      'row_3_cell_4_end',
      '23-09-2016 23:59',
      '24-09-2016 23:00',
    );
  });

  it('On Start Date Arrow Left Change Date -1 Days, From Date Time Equal To Date Time, Same Day', function() {
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
      'row_3_cell_4_end',
      'leftarrow',
      '23',
      '59',
      'September',
      '2016',
      '23',
      '59',
      'September',
      '2016',
      'row_3_cell_6_start',
      'row_3_cell_3_end',
      'row_3_cell_5_start',
      'row_3_cell_4_end',
      '23-09-2016 23:59',
      '24-09-2016 23:59',
    );
  });
});

it('Edge case: 1 Day Before, Arrow right then arrow left', function() {
  visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
  cy.get('#DateTimeRangeContainerSmartModeDisabled').within(() => {
    cy.get('#DateTimeInput_start')
      .clear()
      .type('23-09-2016 23:59')
      .blur();
    cy.get('#DateTimeInput_end')
      .clear()
      .type('24-09-2016 23:59')
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
    'row_3_cell_6_start',
    'row_3_cell_4_end',
    'row_3_cell_5_start',
    'row_3_cell_5_end',
    '24-09-2016 23:59',
    '24-09-2016 23:59',
  );

  keyboardOrClickThenCheckAllChangesWithin(
    'DateTimeRangeContainerSmartModeDisabled',
    'row_3_cell_5_end',
    'row_3_cell_4_end',
    'leftarrow',
    '23',
    '59',
    'September',
    '2016',
    '23',
    '59',
    'September',
    '2016',
    'row_3_cell_6_start',
    'row_3_cell_3_end',
    'row_3_cell_4_start',
    'row_3_cell_5_end',
    '23-09-2016 23:59',
    '24-09-2016 23:59',
  );
});

it('Edge case: 1 Day Before, Arrow right then arrow right', function() {
  visitAndClickDateTime('DateTimeRangeContainerSmartModeDisabled');
  cy.get('#DateTimeRangeContainerSmartModeDisabled').within(() => {
    cy.get('#DateTimeInput_start')
      .clear()
      .type('23-09-2016 23:59')
      .blur();
    cy.get('#DateTimeInput_end')
      .clear()
      .type('24-09-2016 23:59')
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
    'row_3_cell_6_start',
    'row_3_cell_4_end',
    'row_3_cell_5_start',
    'row_3_cell_5_end',
    '24-09-2016 23:59',
    '24-09-2016 23:59',
  );

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
    'row_3_cell_3_end',
    'row_3_cell_6_start',
    'row_3_cell_5_end',
    '24-09-2016 23:59',
    '25-09-2016 23:59',
  );
});