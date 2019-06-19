import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import moment from 'moment';
import { FormControl } from 'react-bootstrap';
import Calendar from '../../calendar/Calendar';
import { ModeEnum } from '../../DateTimeRangePicker';
import { createYears } from '../../utils/YearUtils';
import MonthYearSelector from '../../calendar/MonthYearSelector';
import DateTimeRangeContainer from '../../DateTimeRangeContainer';
import DatePicker from '../../date_picker/DatePicker';

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

let startDateCallback = '';
let endDateCallback = '';
let applyCallback = (startDate, endDate) => {
  startDateCallback = startDate;
  endDateCallback = endDate;
};

const dateTimeRangeContainer = mount(
  <DateTimeRangeContainer
    ranges={ranges}
    start={start}
    end={end}
    local={local}
    applyCallback={applyCallback}
  >
    <FormControl
      id="formControlsTextB"
      type="text"
      label="Text"
      placeholder="Enter text"
    />
  </DateTimeRangeContainer>,
);

const dateTimeRangeContainerDescendingYears = mount(
  <DateTimeRangeContainer
    ranges={ranges}
    start={start}
    end={end}
    local={local}
    applyCallback={applyCallback}
    descendingYears
  >
    <FormControl
      id="formControlsTextB"
      type="text"
      label="Text"
      placeholder="Enter text"
    />
  </DateTimeRangeContainer>,
);

let customYears = [2016, 2019];

const dateTimeRangeContainerCustomYears = mount(
  <DateTimeRangeContainer
    ranges={ranges}
    start={start}
    end={end}
    local={local}
    applyCallback={applyCallback}
    years={customYears}
  >
    <FormControl
      id="formControlsTextB"
      type="text"
      label="Text"
      placeholder="Enter text"
    />
  </DateTimeRangeContainer>,
);

const dateTimeRangeContainerCustomDescendingYears = mount(
  <DateTimeRangeContainer
    ranges={ranges}
    start={start}
    end={end}
    local={local}
    applyCallback={applyCallback}
    descendingYears
    years={customYears}
  >
    <FormControl
      id="formControlsTextB"
      type="text"
      label="Text"
      placeholder="Enter text"
    />
  </DateTimeRangeContainer>,
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
    let years = createYears(undefined, false);
    expect(yearSelect.children().length).toBe(years.length);
    yearSelect.children().forEach((option, i) => {
      expect(option.text()).toEqual(years[i].toString());
    });
  });

  let isMonthYearSelectorAscending = MonthYearSelector => {
    let yearSelector = MonthYearSelector.children()
      .children()
      .at(2);
    const yearSelect = yearSelector.find('select');
    let years = createYears(undefined, false);
    expect(yearSelect.children().length).toBe(years.length);
    yearSelect.children().forEach((option, i) => {
      expect(option.text()).toEqual(years[i].toString());
      if (i === 0) {
        expect(option.text()).toEqual('1900');
      }
    });
  };

  it('Render Years Ascending', () => {
    const monthYearSelector = dateTimeRangeCalendar.find(MonthYearSelector);
    return isMonthYearSelectorAscending(monthYearSelector);
  });

  it('Render Years Ascending Both Sides', () => {
    const monthYearSelectors = dateTimeRangeContainer.find(MonthYearSelector);
    monthYearSelectors.forEach(option => {
      isMonthYearSelectorAscending(option);
    });
  });

  let isMonthYearSelectorDescending = MonthYearSelector => {
    let yearSelector = MonthYearSelector.children()
      .children()
      .at(2);
    const yearSelect = yearSelector.find('select');
    let years = createYears(undefined, true);
    expect(yearSelect.children().length).toBe(years.length);
    yearSelect.children().forEach((option, i) => {
      expect(option.text()).toEqual(years[i].toString());
      if (i === 0) {
        expect(option.text()).toEqual(years[i].toString());
      }
    });
  };

  it('Render Years Descending', () => {
    const monthYearSelector = dateTimeRangeCalendarDescendingFirst.find(
      MonthYearSelector,
    );
    return isMonthYearSelectorDescending(monthYearSelector);
  });

  it('Render Years Descending Both Sides', () => {
    const monthYearSelectors = dateTimeRangeContainerDescendingYears.find(
      MonthYearSelector,
    );
    monthYearSelectors.forEach(option => {
      isMonthYearSelectorDescending(option);
    });
  });

  it('Render normal Years, when user years prop not set', () => {
    const monthYearSelector = dateTimeRangeContainer.find(MonthYearSelector);
    const yearSelector = monthYearSelector
      .children()
      .children()
      .at(2);
    const yearSelect = yearSelector.find('select');
    let years = createYears(undefined, false);
    expect(yearSelect.children().length).toBe(years.length);
    yearSelect.children().forEach((option, i) => {
      expect(option.text()).toEqual(years[i].toString());
    });
  });

  it('Render user Years, when the user years prop set', () => {
    let expectedCustomYears = [2016, 2017, 2018, 2019];
    const monthYearSelector = dateTimeRangeContainerCustomYears.find(
      MonthYearSelector,
    );
    const yearSelector = monthYearSelector
      .children()
      .children()
      .at(2);
    const yearSelect = yearSelector.find('select');
    expect(yearSelect.children().length).toBe(expectedCustomYears.length);
    yearSelect.children().forEach((option, i) => {
      expect(option.text()).toEqual(expectedCustomYears[i].toString());
    });
  });

  it('Render user Years and Descend, when user years prop and descend set', () => {
    let expectedCustomYears = [2016, 2017, 2018, 2019];
    const monthYearSelector = dateTimeRangeContainerCustomDescendingYears.find(
      MonthYearSelector,
    );
    const yearSelector = monthYearSelector
      .children()
      .children()
      .at(2);
    const yearSelect = yearSelector.find('select');
    let customYearsReversed = expectedCustomYears.reverse();
    expect(yearSelect.children().length).toBe(expectedCustomYears.length);
    yearSelect.children().forEach((option, i) => {
      expect(option.text()).toEqual(customYearsReversed[i].toString());
    });
  });
});
