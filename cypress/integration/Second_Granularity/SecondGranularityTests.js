import {
  visitAndClickDateTime,
  keyboardOrClickThenCheckAllChanges,
  keyboardOrClickThenCheckAllChangesWithin, checkStyleOfSelectorWithin, assertSelectedDateCorrectBothDatesChange,
} from '../HelperFunctions';

describe('Second Level Granularity Tests', function() {

  it('Range Selected Click Shows Seconds', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#rangeButton7').click();
    });

    assertSelectedDateCorrectBothDatesChange(
      'DateTimeRangeContainerSeconds',
      0,
      0,
      'August',
      2018,
      23,
      59,
      'August',
      2018,
      'row_1_cell_0_start',
      'row_1_cell_0_start',
      'row_0_cell_2_start',
      'row_0_cell_3_end',
      '01-08-2018 00:00:00',
      '02-08-2018 23:59:59'
      ,
    );
  });

  it('From Date Second After To Date Second test if From date gets invalidated', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    // test setup
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:10')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('21-09-2016 10:10:15')
        .blur();
    });

    // Change start date to be after to date (seconds)
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:20')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_1_end',
      'row_3_cell_1_end',
      'click',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '21-09-2016 10:10:10',
      '21-09-2016 10:10:15',
    );
  });

  it('To Date Second Before From Date Second test if To date gets invalidated', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    // test setup
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:10')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('21-09-2016 10:10:15')
        .blur();
    });

    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_end')
        .clear()
        .type('21-09-2016 10:10:05')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_1_end',
      'row_3_cell_1_end',
      'click',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '21-09-2016 10:10:10',
      '21-09-2016 10:10:15',
    );
  });

  it('To Date Second Equal From Date Second test if To date gets validated', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    // test setup
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:10')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('21-09-2016 10:10:15')
        .blur();
    });

    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_end')
        .clear()
        .type('21-09-2016 10:10:10')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_1_end',
      'row_3_cell_1_end',
      'click',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '21-09-2016 10:10:10',
      '21-09-2016 10:10:10',
    );
  });

  it('To Date Second Equal From Date Second test if From date gets validated', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    // test setup
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:10')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('21-09-2016 10:10:15')
        .blur();
    });

    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:15')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_1_end',
      'row_3_cell_1_end',
      'click',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '21-09-2016 10:10:15',
      '21-09-2016 10:10:15',
    );
  });

  it('To Date Second After From Date Second test if To date gets validated', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:10')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('21-09-2016 10:10:15')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_1_end',
      'row_3_cell_1_end',
      'click',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '21-09-2016 10:10:10',
      '21-09-2016 10:10:15',
    );
  });

  it('From Date Second Before To Date Second test if From date gets validated', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:05')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('21-09-2016 10:10:20')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_1_end',
      'row_3_cell_1_end',
      'click',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '21-09-2016 10:10:05',
      '21-09-2016 10:10:20',
    );
  });

  it('Changing From hour using select keeps second ', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:05')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('21-09-2016 10:10:20')
        .blur();
      cy.get('#Hour_start').select('1');
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_1_end',
      'row_3_cell_1_end',
      'click',
      '1',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '21-09-2016 01:10:05',
      '21-09-2016 10:10:20',
    );
  });

  it('Changing To hour using select keeps second ', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:05')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('21-09-2016 10:10:20')
        .blur();
      cy.get('#Hour_end').select('11');
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_1_end',
      'row_3_cell_1_end',
      'click',
      '10',
      '10',
      'September',
      '2016',
      '11',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '21-09-2016 10:10:05',
      '21-09-2016 11:10:20',
    );
  });

  it('Changing To minute using select keeps second ', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:05')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('21-09-2016 10:10:20')
        .blur();
      cy.get('#Minutes_end').select('15');
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_1_end',
      'row_3_cell_1_end',
      'click',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '15',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '21-09-2016 10:10:05',
      '21-09-2016 10:15:20',
    );
  });

  it('Changing From minute using select keeps second ', function() {
      visitAndClickDateTime('DateTimeRangeContainerSeconds');
      cy.get('#DateTimeRangeContainerSeconds').within(() => {
        cy.get('#DateTimeInput_start')
          .clear()
          .type('21-09-2016 10:10:05')
          .blur();
        cy.get('#DateTimeInput_end')
          .clear()
          .type('21-09-2016 10:10:20')
          .blur();
        cy.get('#Minutes_start').select('5');
      });

      keyboardOrClickThenCheckAllChangesWithin(
        'DateTimeRangeContainerSeconds',
        'row_3_cell_1_end',
        'row_3_cell_1_end',
        'click',
        '10',
        '05',
        'September',
        '2016',
        '10',
        '10',
        'September',
        '2016',
        'row_1_cell_0_start',
        'row_3_cell_5_end',
        'row_3_cell_2_start',
        'row_3_cell_2_end',
        '21-09-2016 10:05:05',
        '21-09-2016 10:10:20',
      );
  });

  it('Clicking From minute keeps second ', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:05')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('21-09-2016 10:10:20')
        .blur();
      cy.get('#Minutes_start').select('5');
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_0_start',
      'row_3_cell_0_start',
      'click',
      '10',
      '05',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '19-09-2016 10:05:05',
      '21-09-2016 10:10:20',
    );
  });

  it('Clicking To minute keeps second ', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:05')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('21-09-2016 10:10:20')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_6_end',
      'row_3_cell_6_end',
      'click',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '21-09-2016 10:10:05',
      '25-09-2016 10:10:20',
    );
  });

  it('Clicking From Day Same As To Date, From Day after To Day second, check invalid', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:15')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('22-09-2016 10:10:10')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_3_start',
      'row_3_cell_3_start',
      'click',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '21-09-2016 10:10:15',
      '22-09-2016 10:10:10',
    );
  });

  it('Clicking From Day Same As To Date, From Day same as To Day second, check valid', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:10')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('22-09-2016 10:10:10')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_3_start',
      'row_3_cell_3_start',
      'click',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_3_start',
      'row_3_cell_3_end',
      '22-09-2016 10:10:10',
      '22-09-2016 10:10:10',
    );
  });

  it('Clicking From Day Same As To Date, From Day Before To Day second, check valid', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:05')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('22-09-2016 10:10:10')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_3_start',
      'row_3_cell_3_start',
      'click',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_3_start',
      'row_3_cell_3_end',
      '22-09-2016 10:10:05',
      '22-09-2016 10:10:10',
    );
  });

  it('Clicking To Day Same As From Date, To Day Before From Day second, check invalid', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:10')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('22-09-2016 10:10:05')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_2_end',
      'row_3_cell_2_end',
      'click',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_3_start',
      'row_3_cell_3_end',
      '21-09-2016 10:10:10',
      '22-09-2016 10:10:05',
    );
  });

  it('Clicking To Day Same As From Date, To Day Same as From Day second, check valid', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:10')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('22-09-2016 10:10:10')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_2_end',
      'row_3_cell_2_end',
      'click',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '21-09-2016 10:10:10',
      '21-09-2016 10:10:10',
    );
  });

  it('Clicking To Day Same As From Date, To Day After From Day second, check valid', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:10')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('22-09-2016 10:10:15')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_2_end',
      'row_3_cell_2_end',
      'click',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '21-09-2016 10:10:10',
      '21-09-2016 10:10:15',
    );
  });

  it('Keyboard right From Day before To Date, From Day second After to Day second, check invalid', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:15')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('22-09-2016 10:10:10')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_2_end',
      'row_3_cell_2_end',
      'rightarrow',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '21-09-2016 10:10:15',
      '22-09-2016 10:10:10',
    );
  });

  // it.only('Keyboard right From Day before To Date, From Day second same as to Day second, check valid', function() {
  //   visitAndClickDateTime('DateTimeRangeContainerSeconds');
  //   cy.get('#DateTimeRangeContainerSeconds').within(() => {
  //     cy.get('#DateTimeInput_start')
  //       .clear()
  //       .type('21-09-2016 10:10:10')
  //       .blur();
  //     cy.get('#DateTimeInput_end')
  //       .clear()
  //       .type('22-09-2016 10:10:10')
  //       .blur();
  //   });
  //
  //   keyboardOrClickThenCheckAllChangesWithin(
  //     'DateTimeRangeContainerSeconds',
  //     'row_3_cell_2_start',
  //     'row_3_cell_3_start',
  //     'rightarrow',
  //     '10',
  //     '10',
  //     'September',
  //     '2016',
  //     '10',
  //     '10',
  //     'September',
  //     '2016',
  //     'row_1_cell_0_start',
  //     'row_3_cell_5_end',
  //     'row_3_cell_2_start',
  //     'row_3_cell_2_end',
  //     '22-09-2016 10:10:10',
  //     '22-09-2016 10:10:10',
  //   );
  // });

  // it.only('Keyboard right From Day before To Date, From Day second before to Day second, check valid', function() {
  //     visitAndClickDateTime('DateTimeRangeContainerSeconds');
  //     cy.get('#DateTimeRangeContainerSeconds').within(() => {
  //       cy.get('#DateTimeInput_start')
  //         .clear()
  //         .type('21-09-2016 10:10:05')
  //         .blur();
  //       cy.get('#DateTimeInput_end')
  //         .clear()
  //         .type('22-09-2016 10:10:10')
  //         .blur();
  //     });
  //
  //     keyboardOrClickThenCheckAllChangesWithin(
  //       'DateTimeRangeContainerSeconds',
  //       'row_3_cell_2_start',
  //       'row_3_cell_3_start',
  //       'rightarrow',
  //       '10',
  //       '10',
  //       'September',
  //       '2016',
  //       '10',
  //       '10',
  //       'September',
  //       '2016',
  //       'row_1_cell_0_start',
  //       'row_3_cell_5_end',
  //       'row_3_cell_2_start',
  //       'row_3_cell_2_end',
  //       '22-09-2016 10:10:10',
  //       '22-09-2016 10:10:10',
  //     );
  //   });

  it('Keyboard down From Day before To Date, From Day second After to Day second, check invalid', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:15')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('22-09-2016 10:10:10')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_2_end',
      'row_3_cell_2_end',
      'downarrow',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '21-09-2016 10:10:15',
      '22-09-2016 10:10:10',
    );
  });

  // it.only('Keyboard down From Day before To Date, From Day equal After to Day second, check valid', function() {
  //   visitAndClickDateTime('DateTimeRangeContainerSeconds');
  //   cy.get('#DateTimeRangeContainerSeconds').within(() => {
  //     cy.get('#DateTimeInput_start')
  //       .clear()
  //       .type('15-09-2016 10:10:10')
  //       .blur();
  //     cy.get('#DateTimeInput_end')
  //       .clear()
  //       .type('22-09-2016 10:10:10')
  //       .blur();
  //   });
  //
  //   keyboardOrClickThenCheckAllChangesWithin(
  //     'DateTimeRangeContainerSeconds',
  //     'row_2_cell_3_start',
  //     'row_3_cell_2_end',
  //     'downarrow',
  //     '10',
  //     '10',
  //     'September',
  //     '2016',
  //     '10',
  //     '10',
  //     'September',
  //     '2016',
  //     'row_1_cell_0_start',
  //     'row_3_cell_5_end',
  //     'row_3_cell_2_start',
  //     'row_3_cell_2_end',
  //     '21-09-2016 10:10:15',
  //     '22-09-2016 10:10:10',
  //   );
  // });

  it('Keyboard down From Day before To Date, From Day before After to Day second, check valid', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('14-09-2016 10:10:10')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('22-09-2016 10:10:10')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_2_cell_2_start',
      'row_3_cell_2_end',
      'downarrow',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '21-09-2016 10:10:10',
      '22-09-2016 10:10:10',
    );
  });

  it('Keyboard up To Day before From Date, From Day second After to Day second, check invalid', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:15')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('22-09-2016 10:10:10')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_3_end',
      'row_3_cell_3_end',
      'uparrow',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '21-09-2016 10:10:15',
      '22-09-2016 10:10:10',
    );
  });

  it('Keyboard up To Day equal From Date, From Day second After to Day second, check valid', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:10')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('28-09-2016 10:10:10')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_4_cell_2_end',
      'row_3_cell_2_end',
      'uparrow',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '21-09-2016 10:10:10',
      '21-09-2016 10:10:10',
    );
  });

  it('Keyboard up To Day after From Date, From Day second After to Day second, check valid', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:10')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('29-09-2016 10:10:15')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_4_cell_3_end',
      'row_3_cell_3_end',
      'uparrow',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '21-09-2016 10:10:10',
      '22-09-2016 10:10:15',
    );
  });

  it('Keyboard left To Day before From Date, From Day second After to Day second, check invalid', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:15')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('22-09-2016 10:10:10')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_3_end',
      'row_3_cell_3_end',
      'leftarrow',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '21-09-2016 10:10:15',
      '22-09-2016 10:10:10',
    );
  });

  it('Keyboard left To Day same as From Date, From Day second same as to Day second, check valid', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:10')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('22-09-2016 10:10:10')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_3_end',
      'row_3_cell_2_end',
      'leftarrow',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '21-09-2016 10:10:10',
      '21-09-2016 10:10:10',
    );
  });

  it('Keyboard left To Day after From Date, From Day second before to Day second, check valid', function() {
    visitAndClickDateTime('DateTimeRangeContainerSeconds');
    cy.get('#DateTimeRangeContainerSeconds').within(() => {
      cy.get('#DateTimeInput_start')
        .clear()
        .type('21-09-2016 10:10:10')
        .blur();
      cy.get('#DateTimeInput_end')
        .clear()
        .type('23-09-2016 10:10:15')
        .blur();
    });

    keyboardOrClickThenCheckAllChangesWithin(
      'DateTimeRangeContainerSeconds',
      'row_3_cell_4_end',
      'row_3_cell_3_end',
      'leftarrow',
      '10',
      '10',
      'September',
      '2016',
      '10',
      '10',
      'September',
      '2016',
      'row_1_cell_0_start',
      'row_3_cell_5_end',
      'row_3_cell_2_start',
      'row_3_cell_2_end',
      '21-09-2016 10:10:10',
      '22-09-2016 10:10:15',
    );
  });
});
