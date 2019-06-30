import { keyboardOrClickThenCheckAllChanges, visitAndClickDateTime, checkStyleOfSelector } from '../HelperFunctions';

describe('Smart Mode, Invalid Cell Tests', function() {
  it('LHS, Cell Click after End Date, should be valid and not greyed out', function() {
    visitAndClickDateTime();
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
  });

  it('LHS, Cell Click before Start Date, should be valid and not greyed out', function() {
    visitAndClickDateTime();
    checkStyleOfSelector('row_1_cell_0_start', 'color', 'rgb(0, 0, 0)');
    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_1_cell_0_start',
      'row_1_cell_0_start',
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
      'row_1_cell_0_start',
      'row_3_cell_5_start',
      '05-09-2016 00:00',
      '24-09-2016 23:59',
    );
  });

  it('RHS, Cell Click after End Date, should be valid and not greyed out', function() {
    visitAndClickDateTime();
    checkStyleOfSelector('row_1_cell_0_end', 'color', 'rgb(0, 0, 0)');
    keyboardOrClickThenCheckAllChanges(
      'DateRangePickerContainer',
      'row_1_cell_0_end',
      'row_1_cell_0_end',
      'click',
      '0',
      '0',
      'October',
      '2016',
      '23',
      '59',
      'November',
      '2016',
      'row_3_cell_1_start',
      'row_3_cell_5_start',
      'row_1_cell_0_start',
      'row_1_cell_1_start',
      '03-10-2016 00:00',
      '04-10-2016 23:59',
    );
  });
});
