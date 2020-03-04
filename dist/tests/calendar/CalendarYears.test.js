"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-15"));

var _moment = _interopRequireDefault(require("moment"));

var _reactBootstrap = require("react-bootstrap");

var _Calendar = _interopRequireDefault(require("../../calendar/Calendar"));

var _DateTimeRangePicker = require("../../DateTimeRangePicker");

var _YearUtils = require("../../utils/YearUtils");

var _MonthYearSelector = _interopRequireDefault(require("../../calendar/MonthYearSelector"));

var _DateTimeRangeContainer = _interopRequireDefault(require("../../DateTimeRangeContainer"));

var _DatePicker = _interopRequireDefault(require("../../date_picker/DatePicker"));

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

var dateTimeRangeCalendar = (0, _enzyme.mount)(_react.default.createElement(_Calendar.default, {
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
var dateTimeRangeCalendarDescendingFirst = (0, _enzyme.mount)(_react.default.createElement(_Calendar.default, {
  ranges: ranges,
  date: start,
  otherDate: end,
  mode: _DateTimeRangePicker.ModeEnum.start,
  dateSelectedNoTimeCallback: dateSelectedNoTimeCallback,
  keyboardCellCallback: keyboardCellCallback,
  focusOnCallback: focusOnCallback,
  focusDate: focusDate,
  cellFocusedCallback: cellFocusedCallback,
  descendingYears: true,
  local: local
}));
var startDateCallback = '';
var endDateCallback = '';

var applyCallback = function applyCallback(startDate, endDate) {
  startDateCallback = startDate;
  endDateCallback = endDate;
};

var dateTimeRangeContainer = (0, _enzyme.mount)(_react.default.createElement(_DateTimeRangeContainer.default, {
  ranges: ranges,
  start: start,
  end: end,
  local: local,
  applyCallback: applyCallback
}, _react.default.createElement(_reactBootstrap.FormControl, {
  id: "formControlsTextB",
  type: "text",
  label: "Text",
  placeholder: "Enter text"
})));
var dateTimeRangeContainerDescendingYears = (0, _enzyme.mount)(_react.default.createElement(_DateTimeRangeContainer.default, {
  ranges: ranges,
  start: start,
  end: end,
  local: local,
  applyCallback: applyCallback,
  descendingYears: true
}, _react.default.createElement(_reactBootstrap.FormControl, {
  id: "formControlsTextB",
  type: "text",
  label: "Text",
  placeholder: "Enter text"
})));
var customYears = [2016, 2019];
var dateTimeRangeContainerCustomYears = (0, _enzyme.mount)(_react.default.createElement(_DateTimeRangeContainer.default, {
  ranges: ranges,
  start: start,
  end: end,
  local: local,
  applyCallback: applyCallback,
  years: customYears
}, _react.default.createElement(_reactBootstrap.FormControl, {
  id: "formControlsTextB",
  type: "text",
  label: "Text",
  placeholder: "Enter text"
})));
var dateTimeRangeContainerCustomDescendingYears = (0, _enzyme.mount)(_react.default.createElement(_DateTimeRangeContainer.default, {
  ranges: ranges,
  start: start,
  end: end,
  local: local,
  applyCallback: applyCallback,
  descendingYears: true,
  years: customYears
}, _react.default.createElement(_reactBootstrap.FormControl, {
  id: "formControlsTextB",
  type: "text",
  label: "Text",
  placeholder: "Enter text"
})));
beforeEach(function () {
  dateSelectedCallback = null;
});
describe('CalenderYearsTest', function () {
  it('Render MonthYearSelector', function () {
    var wrappingDiv = dateTimeRangeCalendar.find(_MonthYearSelector.default).children().children();
    expect(wrappingDiv.length).toBe(4);
  });
  it('Render Years', function () {
    var wrappingDiv = dateTimeRangeCalendar.find(_MonthYearSelector.default).children().children().at(2);
    var yearSelect = wrappingDiv.find('select');
    var years = (0, _YearUtils.createYears)(undefined, false);
    expect(yearSelect.children().length).toBe(years.length);
    yearSelect.children().forEach(function (option, i) {
      expect(option.text()).toEqual(years[i].toString());
    });
  });

  var isMonthYearSelectorAscending = function isMonthYearSelectorAscending(MonthYearSelector) {
    var yearSelector = MonthYearSelector.children().children().at(2);
    var yearSelect = yearSelector.find('select');
    var years = (0, _YearUtils.createYears)(undefined, false);
    expect(yearSelect.children().length).toBe(years.length);
    yearSelect.children().forEach(function (option, i) {
      expect(option.text()).toEqual(years[i].toString());

      if (i === 0) {
        expect(option.text()).toEqual('1900');
      }
    });
  };

  it('Render Years Ascending', function () {
    var monthYearSelector = dateTimeRangeCalendar.find(_MonthYearSelector.default);
    return isMonthYearSelectorAscending(monthYearSelector);
  });
  it('Render Years Ascending Both Sides', function () {
    var monthYearSelectors = dateTimeRangeContainer.find(_MonthYearSelector.default);
    monthYearSelectors.forEach(function (option) {
      isMonthYearSelectorAscending(option);
    });
  });

  var isMonthYearSelectorDescending = function isMonthYearSelectorDescending(MonthYearSelector) {
    var yearSelector = MonthYearSelector.children().children().at(2);
    var yearSelect = yearSelector.find('select');
    var years = (0, _YearUtils.createYears)(undefined, true);
    expect(yearSelect.children().length).toBe(years.length);
    yearSelect.children().forEach(function (option, i) {
      expect(option.text()).toEqual(years[i].toString());

      if (i === 0) {
        expect(option.text()).toEqual(years[i].toString());
      }
    });
  };

  it('Render Years Descending', function () {
    var monthYearSelector = dateTimeRangeCalendarDescendingFirst.find(_MonthYearSelector.default);
    return isMonthYearSelectorDescending(monthYearSelector);
  });
  it('Render Years Descending Both Sides', function () {
    var monthYearSelectors = dateTimeRangeContainerDescendingYears.find(_MonthYearSelector.default);
    monthYearSelectors.forEach(function (option) {
      isMonthYearSelectorDescending(option);
    });
  });
  it('Render normal Years, when user years prop not set', function () {
    var monthYearSelector = dateTimeRangeContainer.find(_MonthYearSelector.default);
    var yearSelector = monthYearSelector.children().children().at(2);
    var yearSelect = yearSelector.find('select');
    var years = (0, _YearUtils.createYears)(undefined, false);
    expect(yearSelect.children().length).toBe(years.length);
    yearSelect.children().forEach(function (option, i) {
      expect(option.text()).toEqual(years[i].toString());
    });
  });
  it('Render user Years, when the user years prop set', function () {
    var expectedCustomYears = [2016, 2017, 2018, 2019];
    var monthYearSelector = dateTimeRangeContainerCustomYears.find(_MonthYearSelector.default);
    var yearSelector = monthYearSelector.children().children().at(2);
    var yearSelect = yearSelector.find('select');
    expect(yearSelect.children().length).toBe(expectedCustomYears.length);
    yearSelect.children().forEach(function (option, i) {
      expect(option.text()).toEqual(expectedCustomYears[i].toString());
    });
  });
  it('Render user Years and Descend, when user years prop and descend set', function () {
    var expectedCustomYears = [2016, 2017, 2018, 2019];
    var monthYearSelector = dateTimeRangeContainerCustomDescendingYears.find(_MonthYearSelector.default);
    var yearSelector = monthYearSelector.children().children().at(2);
    var yearSelect = yearSelector.find('select');
    var customYearsReversed = expectedCustomYears.reverse();
    expect(yearSelect.children().length).toBe(expectedCustomYears.length);
    yearSelect.children().forEach(function (option, i) {
      expect(option.text()).toEqual(customYearsReversed[i].toString());
    });
  });
});