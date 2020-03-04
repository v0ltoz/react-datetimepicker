"use strict";

var _moment = _interopRequireDefault(require("moment"));

var _DateSelectedUtils = require("../../utils/DateSelectedUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_moment.default.locale('en');

describe('Time Function Utils Tests', function () {
  it('Date Picked, Start Mode, Start Before End Check', function () {
    var start = (0, _moment.default)(new Date(2018, 0, 0));
    var newDate = (0, _moment.default)(new Date(2018, 0, 10));
    var end = (0, _moment.default)(new Date(2018, 1, 1));
    var dates = (0, _DateSelectedUtils.datePicked)(start, end, newDate, true);
    var expectedStartDate = (0, _moment.default)(new Date(2018, 0, 10));
    var expectedEndDate = (0, _moment.default)(new Date(2018, 1, 1));
    expect(expectedStartDate.isSame(dates.startDate, 'day')).toEqual(true);
    expect(expectedEndDate.isSame(dates.endDate, 'day')).toEqual(true);
  });
  it('Date Picked, Start Mode, Start Same As End Check', function () {
    var start = (0, _moment.default)(new Date(2018, 0, 0));
    var newDate = (0, _moment.default)(new Date(2018, 0, 0));
    var end = (0, _moment.default)(new Date(2018, 0, 0));
    var dates = (0, _DateSelectedUtils.datePicked)(start, end, newDate, true);
    var expectedStartDate = (0, _moment.default)(new Date(2018, 0, 0));
    var expectedEndDate = (0, _moment.default)(new Date(2018, 0, 0));
    expect(expectedStartDate.isSame(dates.startDate, 'day')).toEqual(true);
    expect(expectedEndDate.isSame(dates.endDate, 'day')).toEqual(true);
  });
  it('Date Picked, Start Mode, Start After End Check, Smart Mode Enabled', function () {
    var start = (0, _moment.default)(new Date(2018, 0, 0));
    var newDate = (0, _moment.default)(new Date(2018, 0, 10));
    var end = (0, _moment.default)(new Date(2018, 0, 0));
    var dates = (0, _DateSelectedUtils.datePicked)(start, end, newDate, true, true);
    var expectedStartDate = (0, _moment.default)(new Date(2018, 0, 10));
    var expectedEndDate = (0, _moment.default)(new Date(2018, 0, 11));
    expect(expectedStartDate.isSame(dates.startDate, 'day')).toEqual(true);
    expect(expectedEndDate.isSame(dates.endDate, 'day')).toEqual(true);
  });
  it('Date Picked, Start Mode, Start After End Check, Smart Mode Disabled', function () {
    var start = (0, _moment.default)(new Date(2018, 0, 0, 0, 0));
    var newDate = (0, _moment.default)(new Date(2018, 0, 10, 0, 0));
    var end = (0, _moment.default)(new Date(2018, 0, 1, 0, 0));
    var dates = (0, _DateSelectedUtils.datePicked)(start, end, newDate, true, false);
    var expectedStartDate = (0, _moment.default)(new Date(2018, 0, 0));
    var expectedEndDate = (0, _moment.default)(new Date(2018, 0, 1));
    expect(expectedStartDate.isSame(dates.startDate, 'day')).toEqual(true);
    expect(expectedEndDate.isSame(dates.endDate, 'day')).toEqual(true);
  });
  it('Date Picked, Start Mode, Start After End Check (By 1 Minute), Smart Mode Disabled', function () {
    var start = (0, _moment.default)(new Date(2018, 0, 0, 1, 0));
    var newDate = (0, _moment.default)(new Date(2018, 0, 1, 1, 0));
    var end = (0, _moment.default)(new Date(2018, 0, 1, 0, 0));
    var dates = (0, _DateSelectedUtils.datePicked)(start, end, newDate, true, false);
    var expectedStartDate = (0, _moment.default)(new Date(2018, 0, 0));
    var expectedEndDate = (0, _moment.default)(new Date(2018, 0, 1));
    expect(expectedStartDate.isSame(dates.startDate, 'day')).toEqual(true);
    expect(expectedEndDate.isSame(dates.endDate, 'day')).toEqual(true);
  });
  it('Date Picked, Start Mode, Start Exactly End Check, Smart Mode Disabled', function () {
    var start = (0, _moment.default)(new Date(2018, 0, 0, 1, 0));
    var newDate = (0, _moment.default)(new Date(2018, 0, 1, 1, 0));
    var end = (0, _moment.default)(new Date(2018, 0, 1, 1, 0));
    var dates = (0, _DateSelectedUtils.datePicked)(start, end, newDate, true, false);
    var expectedStartDate = (0, _moment.default)(new Date(2018, 0, 1));
    var expectedEndDate = (0, _moment.default)(new Date(2018, 0, 1));
    expect(expectedStartDate.isSame(dates.startDate, 'day')).toEqual(true);
    expect(expectedEndDate.isSame(dates.endDate, 'day')).toEqual(true);
  });
  it('Date Picked, Start Mode, Start Before End Check, Smart Mode Disabled', function () {
    var start = (0, _moment.default)(new Date(2018, 0, 0, 0, 0));
    var newDate = (0, _moment.default)(new Date(2018, 0, 0, 0, 0));
    var end = (0, _moment.default)(new Date(2018, 0, 1, 1, 0));
    var dates = (0, _DateSelectedUtils.datePicked)(start, end, newDate, true, false);
    var expectedStartDate = (0, _moment.default)(new Date(2018, 0, 0));
    var expectedEndDate = (0, _moment.default)(new Date(2018, 0, 1));
    expect(expectedStartDate.isSame(dates.startDate, 'day')).toEqual(true);
    expect(expectedEndDate.isSame(dates.endDate, 'day')).toEqual(true);
  });
  it('Date Picked, End Mode, End After Start Check', function () {
    var start = (0, _moment.default)(new Date(2018, 0, 0));
    var newDate = (0, _moment.default)(new Date(2018, 0, 10));
    var end = (0, _moment.default)(new Date(2018, 1, 1));
    var dates = (0, _DateSelectedUtils.datePicked)(start, end, newDate, false);
    var expectedStartDate = (0, _moment.default)(new Date(2018, 0, 0));
    var expectedEndDate = (0, _moment.default)(new Date(2018, 0, 10));
    expect(expectedStartDate.isSame(dates.startDate, 'day')).toEqual(true);
    expect(expectedEndDate.isSame(dates.endDate, 'day')).toEqual(true);
  });
  it('Date Picked, End Mode, End After Start Check, Smart Mode Disabled', function () {
    var start = (0, _moment.default)(new Date(2018, 0, 0));
    var newDate = (0, _moment.default)(new Date(2018, 0, 10));
    var end = (0, _moment.default)(new Date(2018, 1, 1));
    var dates = (0, _DateSelectedUtils.datePicked)(start, end, newDate, false);
    var expectedStartDate = (0, _moment.default)(new Date(2018, 0, 0));
    var expectedEndDate = (0, _moment.default)(new Date(2018, 0, 10));
    expect(expectedStartDate.isSame(dates.startDate, 'day')).toEqual(true);
    expect(expectedEndDate.isSame(dates.endDate, 'day')).toEqual(true);
  });
  it('Date Picked, End Mode, End Same As Start Check', function () {
    var start = (0, _moment.default)(new Date(2018, 0, 0));
    var newDate = (0, _moment.default)(new Date(2018, 0, 0));
    var end = (0, _moment.default)(new Date(2018, 0, 0));
    var dates = (0, _DateSelectedUtils.datePicked)(start, end, newDate, false);
    var expectedStartDate = (0, _moment.default)(new Date(2018, 0, 0));
    var expectedEndDate = (0, _moment.default)(new Date(2018, 0, 0));
    expect(expectedStartDate.isSame(dates.startDate, 'day')).toEqual(true);
    expect(expectedEndDate.isSame(dates.endDate, 'day')).toEqual(true);
  });
  it('Date Picked, End Mode, End Before Start Check', function () {
    var start = (0, _moment.default)(new Date(2018, 0, 0));
    var newDate = (0, _moment.default)(new Date(2017, 11, 30));
    var end = (0, _moment.default)(new Date(2018, 0, 0));
    var dates = (0, _DateSelectedUtils.datePicked)(start, end, newDate, false, true);
    var expectedStartDate = (0, _moment.default)(new Date(2017, 11, 29));
    var expectedEndDate = (0, _moment.default)(new Date(2017, 11, 30));
    expect(expectedStartDate.isSame(dates.startDate, 'day')).toEqual(true);
    expect(expectedEndDate.isSame(dates.endDate, 'day')).toEqual(true);
  });
  it('Past Max Date Test, No Max Date', function () {
    var currentDate = (0, _moment.default)(new Date(2018, 0, 0));
    var maxDate = (0, _moment.default)(new Date(2018, 0, 10));
    var outcome = (0, _DateSelectedUtils.pastMaxDate)(currentDate);
    expect(outcome).toEqual(false);
  });
  it('Past Max Date Test, Minute Mode, Date Past Max', function () {
    var currentDate = (0, _moment.default)(new Date(2018, 0, 0, 10));
    var maxDate = (0, _moment.default)(new Date(2018, 0, 0));
    var outcome = (0, _DateSelectedUtils.pastMaxDate)(currentDate, maxDate, true);
    expect(outcome).toEqual(true);
  });
  it('Past Max Date Test, Minute Mode, Date Not Past Max', function () {
    var currentDate = (0, _moment.default)(new Date(2018, 0, 0));
    var maxDate = (0, _moment.default)(new Date(2018, 0, 10));
    var outcome = (0, _DateSelectedUtils.pastMaxDate)(currentDate, maxDate, true);
    expect(outcome).toEqual(false);
  });
  it('Past Max Date Test, Not Minute Mode, Date Not Past Max', function () {
    var currentDate = (0, _moment.default)(new Date(2018, 0, 0));
    var maxDate = (0, _moment.default)(new Date(2018, 0, 25));
    var outcome = (0, _DateSelectedUtils.pastMaxDate)(currentDate, maxDate, false);
    expect(outcome).toEqual(false);
  });
  it('Past Max Date Test, Not Minute Mode, Date Past Max', function () {
    var currentDate = (0, _moment.default)(new Date(2018, 0, 10));
    var maxDate = (0, _moment.default)(new Date(2018, 0, 0));
    var outcome = (0, _DateSelectedUtils.pastMaxDate)(currentDate, maxDate, false);
    expect(outcome).toEqual(true);
  });
  it('Past Max Date Test, Not Minute Mode, Date Not Past Max, Hour Is Though', function () {
    var currentDate = (0, _moment.default)(new Date(2018, 0, 0, 1));
    var maxDate = (0, _moment.default)(new Date(2018, 0, 0));
    var outcome = (0, _DateSelectedUtils.pastMaxDate)(currentDate, maxDate, false);
    expect(outcome).toEqual(false);
  });
});