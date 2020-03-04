"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-15"));

var _moment = _interopRequireDefault(require("moment"));

var _Calendar = _interopRequireDefault(require("../../calendar/Calendar"));

var _DateTimeRangePicker = require("../../DateTimeRangePicker");

var _CalendarRows = _interopRequireDefault(require("../../calendar/CalendarRows"));

var _Cell = _interopRequireDefault(require("../../calendar/Cell"));

var _CalendarHeader = _interopRequireDefault(require("../../calendar/CalendarHeader"));

var _MonthYearSelector = _interopRequireDefault(require("../../calendar/MonthYearSelector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact.default()
});
var start = (0, _moment.default)(new Date(2018, 0, 1, 0, 0, 0, 0));
var end = (0, _moment.default)(start).add(1, 'days');
var ranges = {
  'Today Only': [(0, _moment.default)(start), (0, _moment.default)(end)],
  'Yesterday Only': [(0, _moment.default)(start).subtract(1, 'days'), (0, _moment.default)(end).subtract(1, 'days')],
  '3 Days': [(0, _moment.default)(start).subtract(3, 'days'), (0, _moment.default)(end)],
  '5 Days': [(0, _moment.default)(start).subtract(5, 'days'), (0, _moment.default)(end)],
  '1 Week': [(0, _moment.default)(start).subtract(7, 'days'), (0, _moment.default)(end)],
  '2 Weeks': [(0, _moment.default)(start).subtract(14, 'days'), (0, _moment.default)(end)],
  '1 Month': [(0, _moment.default)(start).subtract(1, 'months'), (0, _moment.default)(end)],
  '90 Days': [(0, _moment.default)(start).subtract(90, 'days'), (0, _moment.default)(end)],
  '1 Year': [(0, _moment.default)(start).subtract(1, 'years'), (0, _moment.default)(end)]
};
var local = {
  format: 'DD-MM-YYYY HH:mm',
  sundayFirst: false
}; // let maxDate = moment(start).add(24, "hour");

var dateSelectedCallback;

var dateSelectedNoTimeCallback = function dateSelectedNoTimeCallback(cellDate) {
  dateSelectedCallback = cellDate;
};

var keyboardCellCallback = function keyboardCellCallback(originalDate, newDate) {};

var focusOnCallback = function focusOnCallback(date) {};

var focusDate = false;

var cellFocusedCallback = function cellFocusedCallback(date) {};

var dateTimeRangeCalendarExpectedUseStartMode = (0, _enzyme.mount)(_react.default.createElement(_Calendar.default, {
  ranges: ranges,
  date: start,
  otherDate: end,
  mode: _DateTimeRangePicker.ModeEnum.start,
  dateSelectedNoTimeCallback: dateSelectedNoTimeCallback,
  keyboardCellCallback: keyboardCellCallback,
  focusOnCallback: focusOnCallback,
  focusDate: focusDate,
  cellFocusedCallback: cellFocusedCallback,
  smartMode: true,
  local: local
}));
var dateTimeRangeCalendarExpectedUseEndMode = (0, _enzyme.mount)(_react.default.createElement(_Calendar.default, {
  ranges: ranges,
  date: start,
  otherDate: end,
  mode: _DateTimeRangePicker.ModeEnum.end,
  dateSelectedNoTimeCallback: dateSelectedNoTimeCallback,
  keyboardCellCallback: keyboardCellCallback,
  focusOnCallback: focusOnCallback,
  focusDate: focusDate,
  cellFocusedCallback: cellFocusedCallback,
  smartMode: true,
  local: local
}));
var dateTimeRangeCalendarPastFriendlyStartMode = (0, _enzyme.mount)(_react.default.createElement(_Calendar.default, {
  ranges: ranges,
  date: start,
  otherDate: end,
  mode: _DateTimeRangePicker.ModeEnum.start,
  dateSelectedNoTimeCallback: dateSelectedNoTimeCallback,
  keyboardCellCallback: keyboardCellCallback,
  focusOnCallback: focusOnCallback,
  focusDate: focusDate,
  cellFocusedCallback: cellFocusedCallback,
  local: local,
  smartMode: true,
  pastSearchFriendly: true
}));
var dateTimeRangeCalendarPastFriendlyEndMode = (0, _enzyme.mount)(_react.default.createElement(_Calendar.default, {
  ranges: ranges,
  date: start,
  otherDate: end,
  mode: _DateTimeRangePicker.ModeEnum.end,
  dateSelectedNoTimeCallback: dateSelectedNoTimeCallback,
  keyboardCellCallback: keyboardCellCallback,
  focusOnCallback: focusOnCallback,
  focusDate: focusDate,
  cellFocusedCallback: cellFocusedCallback,
  local: local,
  smartMode: true,
  pastSearchFriendly: true
}));
var dateTimeRangeCalendarSmartModeDisabledStartMode = (0, _enzyme.mount)(_react.default.createElement(_Calendar.default, {
  ranges: ranges,
  date: start,
  otherDate: end,
  mode: _DateTimeRangePicker.ModeEnum.start,
  dateSelectedNoTimeCallback: dateSelectedNoTimeCallback,
  keyboardCellCallback: keyboardCellCallback,
  focusOnCallback: focusOnCallback,
  focusDate: focusDate,
  cellFocusedCallback: cellFocusedCallback,
  local: local,
  pastSearchFriendly: true
}));
var dateTimeRangeCalendarSmartModeDisabledEndMode = (0, _enzyme.mount)(_react.default.createElement(_Calendar.default, {
  ranges: ranges,
  date: start,
  otherDate: end,
  mode: _DateTimeRangePicker.ModeEnum.end,
  dateSelectedNoTimeCallback: dateSelectedNoTimeCallback,
  keyboardCellCallback: keyboardCellCallback,
  focusOnCallback: focusOnCallback,
  focusDate: focusDate,
  cellFocusedCallback: cellFocusedCallback,
  local: local,
  pastSearchFriendly: true
}));
var localUSA = {
  format: 'MM-DD-YYYY HH:mm',
  sundayFirst: true
};
var dateTimeRangeCalendarAmerican = (0, _enzyme.mount)(_react.default.createElement(_Calendar.default, {
  ranges: ranges,
  date: start,
  otherDate: end,
  mode: _DateTimeRangePicker.ModeEnum.start,
  dateSelectedNoTimeCallback: dateSelectedNoTimeCallback,
  keyboardCellCallback: keyboardCellCallback,
  focusOnCallback: focusOnCallback,
  focusDate: focusDate,
  cellFocusedCallback: cellFocusedCallback,
  smartMode: true,
  local: localUSA
}));
beforeEach(function () {
  dateSelectedCallback = null;
});
describe('DateTimeRangeContainer', function () {
  it('Render Calendar Test', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUseStartMode.first().children().children();
    expect(wrappingDiv.length).toBe(3);
  });
  it('Calendar Rows Renders', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUseStartMode;
    expect(wrappingDiv.find(_CalendarRows.default).length).toBe(1);
  });
  it('Calendar Test Correct Amount of Cells Generated', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUseStartMode;
    var cells = wrappingDiv.find(_Cell.default);
    expect(cells.length).toBe(42);
  });
  it('Calendar Test January 2018, First Cell set to 27th November, start mode, pastFriendlyMode', function () {
    var wrappingDiv = dateTimeRangeCalendarPastFriendlyStartMode;
    var cells = wrappingDiv.find(_Cell.default);
    var cellDay = cells.at(0).props().cellDay;
    var expectedDate = (0, _moment.default)(new Date(2017, 10, 27));
    expect(cellDay.isSame(expectedDate, 'day')).toBe(true);
  });
  it('Calendar Test January 2018, First Cell set to 25th December, end mode, pastFriendlyMode', function () {
    var wrappingDiv = dateTimeRangeCalendarPastFriendlyEndMode;
    var cells = wrappingDiv.find(_Cell.default);
    var cellDay = cells.at(0).props().cellDay;
    var expectedDate = (0, _moment.default)(new Date(2017, 11, 25));
    expect(cellDay.isSame(expectedDate, 'day')).toBe(true);
  });
  it('Calendar Test January 2018, First Cell set to 25th December, start mode, smartModeDisabled', function () {
    var wrappingDiv = dateTimeRangeCalendarSmartModeDisabledStartMode;
    var cells = wrappingDiv.find(_Cell.default);
    var cellDay = cells.at(0).props().cellDay;
    var expectedDate = (0, _moment.default)(new Date(2017, 11, 25));
    expect(cellDay.isSame(expectedDate, 'day')).toBe(true);
  });
  it('Calendar Test January 2018, First Cell set to 25th December, end mode, smartModeDisabled', function () {
    var wrappingDiv = dateTimeRangeCalendarSmartModeDisabledEndMode;
    var cells = wrappingDiv.find(_Cell.default);
    var cellDay = cells.at(0).props().cellDay;
    var expectedDate = (0, _moment.default)(new Date(2017, 11, 25));
    expect(cellDay.isSame(expectedDate, 'day')).toBe(true);
  });
  it('Calendar Test January 2018, First Cell set to 25th December', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUseStartMode;
    var cells = wrappingDiv.find(_Cell.default);
    var cellDay = cells.at(0).props().cellDay;
    var expectedDate = (0, _moment.default)(new Date(2017, 11, 25));
    expect(cellDay.isSame(expectedDate, 'day')).toBe(true);
  });
  it('Calendar Test January 2018, Last Cell to be Cell set to 4th Feb', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUseStartMode;
    var cells = wrappingDiv.find(_Cell.default);
    var cellDay = cells.at(41).props().cellDay;
    var expectedDate = (0, _moment.default)(new Date(2018, 1, 4));
    expect(cellDay.isSame(expectedDate, 'day')).toBe(true);
  });
  it('Calendar Test January 2018, 8th Cell is the 1st of Jan', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUseStartMode;
    var cells = wrappingDiv.find(_Cell.default);
    var cellDay = cells.at(7).props().cellDay;
    var expectedDate = (0, _moment.default)(new Date(2018, 0, 1));
    expect(cellDay.isSame(expectedDate, 'day')).toBe(true);
  });
  it('Calendar Test January 2018, 38th Cell is the 31st of Jan', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUseStartMode;
    var cells = wrappingDiv.find(_Cell.default);
    var cellDay = cells.at(37).props().cellDay;
    var expectedDate = (0, _moment.default)(new Date(2018, 0, 31));
    expect(cellDay.isSame(expectedDate, 'day')).toBe(true);
  });
  it('Calendar Test January 2018, First Cell Clicked Callback Test', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUseStartMode;
    var cells = wrappingDiv.find(_Cell.default);
    var firstCell = cells.at(0);
    firstCell.simulate('click');
    var expectedDate = (0, _moment.default)(new Date(2017, 11, 25));
    expect(dateSelectedCallback.isSame(expectedDate, 'day')).toBe(true);
  });
  it('Calendar Test January 2018, First Cell Clicked Callback Test', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUseStartMode;
    var cells = wrappingDiv.find(_Cell.default);
    var firstCell = cells.at(0);
    firstCell.simulate('click');
    var expectedDate = (0, _moment.default)(new Date(2017, 11, 25));
    expect(dateSelectedCallback.isSame(expectedDate, 'day')).toBe(true);
  });
  it('Calendar Test January 2018, Last Cell Clicked Callback Test', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUseStartMode;
    var cells = wrappingDiv.find(_Cell.default);
    var lastCell = cells.at(41);
    lastCell.simulate('click');
    var expectedDate = (0, _moment.default)(new Date(2018, 1, 4));
    expect(dateSelectedCallback.isSame(expectedDate, 'day')).toBe(true);
  });
  it('UK: Expect Headers Mo-Su', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUseStartMode;
    var cells = wrappingDiv.find(_CalendarHeader.default);
    var headers = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    var index = 0;
    var success = true;
    cells.children().children().forEach(function (node) {
      if (success) {
        success = node.contains(_react.default.createElement("div", null, headers[index]));
        index++;
      }
    });
    expect(success).toBe(true);
  });
  it('American: Expect Headers Su-Sat', function () {
    var wrappingDiv = dateTimeRangeCalendarAmerican;
    var cells = wrappingDiv.find(_CalendarHeader.default);
    var headers = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    var index = 0;
    var success = true;
    cells.children().children().forEach(function (node) {
      if (success) {
        success = node.contains(_react.default.createElement("div", null, headers[index]));
        index++;
      }
    });
    expect(success).toBe(true);
  });
  it('Calendar Month Set To January Test', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUseStartMode;
    var monthYearSelector = wrappingDiv.find(_MonthYearSelector.default);
    var monthSelected = monthYearSelector.children().children().at(1).children().props().value;
    expect(monthSelected).toBe('January');
  });
  it('Calendar Year Set To Be 2018 Test', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUseStartMode;
    var monthYearSelector = wrappingDiv.find(_MonthYearSelector.default);
    var yearSelected = monthYearSelector.children().children().at(2).children().props().value;
    expect(yearSelected).toBe(2018);
  });
  it('Calendar Year Change to 2017, Changes Cells Test', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUseStartMode;
    var monthYearSelector = wrappingDiv.find(_MonthYearSelector.default);
    monthYearSelector.children().children().at(2).children().simulate('change', {
      target: {
        value: 2017
      }
    });
    var cells = wrappingDiv.find(_Cell.default);
    var cellDay = cells.at(0).props().cellDay;
    var expectedDate = (0, _moment.default)(new Date(2016, 11, 26));
    expect(cellDay.isSame(expectedDate, 'day')).toBe(true); // Reset To Previous Value

    monthYearSelector.children().children().at(2).children().simulate('change', {
      target: {
        value: 2018
      }
    });
  });
  it('Calendar Left Arrow Press Test', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUseStartMode;
    var monthYearSelector = wrappingDiv.find(_MonthYearSelector.default);
    monthYearSelector.children().children().at(0).children().simulate('click');
    var cells = wrappingDiv.find(_Cell.default);
    var cellDay = cells.at(0).props().cellDay;
    var expectedDate = (0, _moment.default)(new Date(2017, 10, 27));
    expect(cellDay.isSame(expectedDate, 'day')).toBe(true); // Reset To Previous Value

    monthYearSelector.children().children().at(3).children().simulate('click');
  });
  it('Calendar Right Arrow Press Test', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUseStartMode;
    var monthYearSelector = wrappingDiv.find(_MonthYearSelector.default);
    monthYearSelector.children().children().at(3).children().simulate('click');
    var cells = wrappingDiv.find(_Cell.default);
    var cellDay = cells.at(0).props().cellDay;
    var expectedDate = (0, _moment.default)(new Date(2018, 0, 29));
    expect(cellDay.isSame(expectedDate, 'day')).toBe(true); // Reset To Previous Value

    monthYearSelector.children().children().at(0).children().simulate('click');
  });
  it('Calendar Update Month Year after Props Change Test, Different Month Year', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUseStartMode;
    var props = JSON.parse(JSON.stringify(wrappingDiv.props()));
    props.date = (0, _moment.default)(new Date(2017, 11, 1));
    props.otherDate = (0, _moment.default)(new Date(2018, 1, 10));
    wrappingDiv.setProps(props);
    expect(wrappingDiv.state().year).toBe(2017);
    expect(wrappingDiv.state().month).toBe(11);
  });
  it('Calendar Update Month Year after Props Change Test, Same Month Year Start Mode', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUseStartMode;
    var props = JSON.parse(JSON.stringify(wrappingDiv.props()));
    props.date = (0, _moment.default)(new Date(2017, 11, 1));
    props.otherDate = (0, _moment.default)(new Date(2017, 11, 10));
    wrappingDiv.setProps(props);
    expect(wrappingDiv.state().year).toBe(2017);
    expect(wrappingDiv.state().month).toBe(11);
  });
  it('Calendar Update Month Year after Props Change Test, Same Month Year Start Mode, Past Friendly Mode', function () {
    var wrappingDiv = dateTimeRangeCalendarPastFriendlyStartMode;
    var props = JSON.parse(JSON.stringify(wrappingDiv.props()));
    props.date = (0, _moment.default)(new Date(2017, 11, 1));
    props.otherDate = (0, _moment.default)(new Date(2017, 11, 10));
    wrappingDiv.setProps(props);
    expect(wrappingDiv.state().year).toBe(2017);
    expect(wrappingDiv.state().month).toBe(10);
  });
  it('Calendar Update Month Year after Props Change Test, Same Month Year End Mode', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUseEndMode;
    var props = JSON.parse(JSON.stringify(wrappingDiv.props()));
    props.date = (0, _moment.default)(new Date(2017, 11, 1));
    props.otherDate = (0, _moment.default)(new Date(2017, 11, 10));
    wrappingDiv.setProps(props);
    expect(wrappingDiv.state().year).toBe(2018);
    expect(wrappingDiv.state().month).toBe(0);
  });
  it('Calendar Update Month Year after Props Change Test, Same Month Year End Mode, Past Friendly Mode', function () {
    var wrappingDiv = dateTimeRangeCalendarPastFriendlyEndMode;
    var props = JSON.parse(JSON.stringify(wrappingDiv.props()));
    props.date = (0, _moment.default)(new Date(2017, 11, 1));
    props.otherDate = (0, _moment.default)(new Date(2017, 11, 10));
    wrappingDiv.setProps(props);
    expect(wrappingDiv.state().year).toBe(2017);
    expect(wrappingDiv.state().month).toBe(11);
  });
  it('Calendar Update Month Year after Props Change Test, Same Month Year Start Mode, Smart Mode Disabled', function () {
    var wrappingDiv = dateTimeRangeCalendarSmartModeDisabledStartMode;
    var props = JSON.parse(JSON.stringify(wrappingDiv.props()));
    props.date = (0, _moment.default)(new Date(2017, 11, 1));
    props.otherDate = (0, _moment.default)(new Date(2017, 11, 10));
    wrappingDiv.setProps(props);
    expect(wrappingDiv.state().year).toBe(2017);
    expect(wrappingDiv.state().month).toBe(11);
  });
  it('Calendar Update Month Year after Props Change Test, Same Month Year End Mode, Smart Mode Disabled', function () {
    var wrappingDiv = dateTimeRangeCalendarSmartModeDisabledEndMode;
    var props = JSON.parse(JSON.stringify(wrappingDiv.props()));
    props.date = (0, _moment.default)(new Date(2017, 11, 1));
    props.otherDate = (0, _moment.default)(new Date(2017, 11, 10));
    wrappingDiv.setProps(props);
    expect(wrappingDiv.state().year).toBe(2017);
    expect(wrappingDiv.state().month).toBe(11);
  });
  it('Calendar Update Month Year after Props Change Test, Different Month Year Start Mode, Smart Mode Disabled', function () {
    var wrappingDiv = dateTimeRangeCalendarSmartModeDisabledStartMode;
    var props = JSON.parse(JSON.stringify(wrappingDiv.props()));
    props.date = (0, _moment.default)(new Date(2017, 10, 1));
    props.otherDate = (0, _moment.default)(new Date(2017, 11, 10));
    wrappingDiv.setProps(props);
    expect(wrappingDiv.state().year).toBe(2017);
    expect(wrappingDiv.state().month).toBe(10);
  });
  it('Calendar Update Month Year after Props Change Test, Different Month Year End Mode, Smart Mode Disabled', function () {
    var wrappingDiv = dateTimeRangeCalendarSmartModeDisabledEndMode;
    var props = JSON.parse(JSON.stringify(wrappingDiv.props()));
    props.date = (0, _moment.default)(new Date(2017, 11, 1));
    props.otherDate = (0, _moment.default)(new Date(2017, 10, 10));
    wrappingDiv.setProps(props);
    expect(wrappingDiv.state().year).toBe(2017);
    expect(wrappingDiv.state().month).toBe(11);
  });
});