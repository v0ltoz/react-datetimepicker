import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import moment from 'moment';
import Calendar from '../../calendar/Calendar';
import { ModeEnum } from '../../DateTimeRangePicker';
import { createYears } from '../../utils/YearUtils';
import MonthYearSelector from '../../calendar/MonthYearSelector';

configure({ adapter: new Adapter() });
let start = moment(new Date(2018, 1, 1, 0, 0, 0, 0));
let end = moment(start).add(1, 'days');
let ranges = {
  'Today Only': [moment(start), moment(end)],
  'Yesterday Only': [
    moment(start).subtract(1, 'days'),
    moment(end).subtract(1, 'days'),
  ],
  '3 Days': [moment(start).subtract(3, 'days'), moment(end)],
  '5 Days': [moment(start).subtract(5, 'days'), moment(end)],
  '1 Week': [moment(start).subtract(7, 'days'), moment(end)],
  '2 Weeks': [moment(start).subtract(14, 'days'), moment(end)],
  '1 Month': [moment(start).subtract(1, 'months'), moment(end)],
  '90 Days': [moment(start).subtract(90, 'days'), moment(end)],
  '1 Year': [moment(start).subtract(1, 'years'), moment(end)],
};
let local = {
  format: 'DD-MM-YYYY HH:mm',
  sundayFirst: false,
};
// let maxDate = moment(start).add(24, "hour");
var dateSelectedCallback;
let dateSelectedNoTimeCallback = cellDate => {
  dateSelectedCallback = cellDate;
};
let keyboardCellCallback = (originalDate, newDate) => {};
let focusOnCallback = date => {};
let focusDate = false;
let cellFocusedCallback = date => {};

const dateTimeRangeCalendar = mount(
  <Calendar
    ranges={ranges}
    date={start}
    otherDate={end}
    mode={ModeEnum.start}
    dateSelectedNoTimeCallback={dateSelectedNoTimeCallback}
    keyboardCellCallback={keyboardCellCallback}
    focusOnCallback={focusOnCallback}
    focusDate={focusDate}
    cellFocusedCallback={cellFocusedCallback}
    local={local}
  />,
);

const dateTimeRangeCalendarDescendingFirst = mount(
  <Calendar
    ranges={ranges}
    date={start}
    otherDate={end}
    mode={ModeEnum.start}
    dateSelectedNoTimeCallback={dateSelectedNoTimeCallback}
    keyboardCellCallback={keyboardCellCallback}
    focusOnCallback={focusOnCallback}
    focusDate={focusDate}
    cellFocusedCallback={cellFocusedCallback}
    descendingYears
    local={local}
  />,
);

beforeEach(() => {
  dateSelectedCallback = null;
});

describe('CalenderYearsTest', () => {
  it('Render MonthYearSelector', () => {
    const wrappingDiv = dateTimeRangeCalendar
      .find(MonthYearSelector)
      .children()
      .children();
    expect(wrappingDiv.length).toBe(4);
  });

  it('Render Years', () => {
    const wrappingDiv = dateTimeRangeCalendar
      .find(MonthYearSelector)
      .children()
      .children()
      .at(2);
    const yearSelect = wrappingDiv.find('select');
    expect(yearSelect.children().length).toBe(130);
    let years = createYears(false);
    yearSelect.children().forEach((option, i) => {
      expect(option.text() === years[i].toString());
    });
  });

  it('Render Years Ascending', () => {
    const wrappingDiv = dateTimeRangeCalendar
      .find(MonthYearSelector)
      .children()
      .children()
      .at(2);
    const yearSelect = wrappingDiv.find('select');
    expect(yearSelect.children().length).toBe(130);
    let years = createYears(false);
    yearSelect.children().forEach((option, i) => {
      expect(option.text() === years[i]);
      if (i === 0) {
        expect(option.text()).toEqual('1900');
      }
    });
  });

  it('Render Years Descending', () => {
    const wrappingDiv = dateTimeRangeCalendarDescendingFirst
      .find(MonthYearSelector)
      .children()
      .children()
      .at(2);
    const yearSelect = wrappingDiv.find('select');
    expect(yearSelect.children().length).toBe(130);
    let years = createYears(false);
    yearSelect.children().forEach((option, i) => {
      expect(option.text() === years[i]);
      if (i === 0) {
        expect(option.text()).toEqual(years[years.length - 1].toString());
      }
    });
  });
});
