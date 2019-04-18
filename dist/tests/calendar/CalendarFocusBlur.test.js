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
var start = (0, _moment.default)(new Date(2018, 1, 1, 0, 0, 0, 0));
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

var dateTimeRangeCalendarExpectedUse = (0, _enzyme.mount)(_react.default.createElement(_Calendar.default, {
  ranges: ranges,
  date: start,
  otherDate: end,
  mode: _DateTimeRangePicker.ModeEnum.start,
  dateSelectedNoTimeCallback: dateSelectedNoTimeCallback,
  keyboardCellCallback: keyboardCellCallback,
  focusOnCallback: focusOnCallback,
  focusDate: focusDate,
  cellFocusedCallback: cellFocusedCallback,
  local: local
}));
describe('MonthYearSelector Focus Blur Tests', function () {
  it('Month Focus State Test', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUse;
    var monthYearSelector = wrappingDiv.find(_MonthYearSelector.default);
    monthYearSelector.children().children().at(1).simulate('focus');
    expect(monthYearSelector.state().monthFocus).toBe(true);
  });
  it('Month Blur State Test', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUse;
    var monthYearSelector = wrappingDiv.find(_MonthYearSelector.default);
    monthYearSelector.children().children().at(1).simulate('blur');
    expect(monthYearSelector.state().monthFocus).toBe(false);
  });
  it('Year Focus State Test', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUse;
    var monthYearSelector = wrappingDiv.find(_MonthYearSelector.default);
    monthYearSelector.children().children().at(2).simulate('focus');
    expect(monthYearSelector.state().yearFocus).toBe(true);
  });
  it('Year Blur State Test', function () {
    var wrappingDiv = dateTimeRangeCalendarExpectedUse;
    var monthYearSelector = wrappingDiv.find(_MonthYearSelector.default);
    monthYearSelector.children().children().at(2).simulate('blur');
    expect(monthYearSelector.state().yearFocus).toBe(false);
  });
});