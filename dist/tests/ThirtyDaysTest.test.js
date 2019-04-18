"use strict";

var _TimeFunctionUtils = require("../utils/TimeFunctionUtils");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_moment.default.locale('en');

describe("DateTimeRangeContainer", function () {
  it("EN Locale Thirty Days Method Returns Correct June 2018", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(5, 2018);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2018-05-28");
    var expectedEnd = (0, _moment.default)("2018-07-08");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("EN Locale Thirty Days Method Returns Correct July 2018", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(6, 2018);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2018-06-25");
    var expectedEnd = (0, _moment.default)("2018-08-05");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("EN Locale Thirty Days Method Returns Correct October 2018", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(9, 2018);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2018-09-24");
    var expectedEnd = (0, _moment.default)("2018-11-04");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("EN Locale Thirty Days Method Returns Correct September 2018", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(8, 2018);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2018-08-27");
    var expectedEnd = (0, _moment.default)("2018-10-07");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("EN Locale Thirty Days Method Returns Correct May 2018", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(4, 2018);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2018-04-30");
    var expectedEnd = (0, _moment.default)("2018-06-10");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("EN Locale Thirty Days Method Returns Correct Jan 2018", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(0, 2018);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2017-12-25");
    var expectedEnd = (0, _moment.default)("2018-02-04");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("EN Locale Thirty Days Method Returns Correct October 2017", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(9, 2017);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2017-09-25");
    var expectedEnd = (0, _moment.default)("2017-11-05");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("EN Locale Thirty Days Method Returns Correct August 2017", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(7, 2017);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2017-07-31");
    var expectedEnd = (0, _moment.default)("2017-09-10");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("EN Locale Thirty Days Method Returns Correct July 2017", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(6, 2017);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2017-06-26");
    var expectedEnd = (0, _moment.default)("2017-08-06");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("EN Locale Thirty Days Method Returns Correct May 2017", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(4, 2017);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2017-04-24");
    var expectedEnd = (0, _moment.default)("2017-06-04");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("EN Locale Thirty Days Method Returns Correct February 2017", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(1, 2017);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2017-01-30");
    var expectedEnd = (0, _moment.default)("2017-03-12");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("EN Locale Thirty Days Method Returns Correct Leap Year", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(1, 2016);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2016-01-25");
    var expectedEnd = (0, _moment.default)("2016-03-06");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("EN Locale Thirty Days Method Returns Correct January 2016", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(0, 2016);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2015-12-28");
    var expectedEnd = (0, _moment.default)("2016-02-07");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("Sunday Start Date Thirty Days Method Returns Correct January 2016", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(0, 2016, true);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2015-12-27");
    var expectedEnd = (0, _moment.default)("2016-02-06");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("Sunday Start Date Thirty Days Method Returns Correct March 2016", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(2, 2016, true);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2016-02-28");
    var expectedEnd = (0, _moment.default)("2016-04-09");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("Sunday Start Date Thirty Days Method Returns Correct May 2016", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(4, 2016, true);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2016-04-24");
    var expectedEnd = (0, _moment.default)("2016-06-04");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("Sunday Start Date Thirty Days Method Returns Correct June 2016", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(5, 2016, true);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2016-05-29");
    var expectedEnd = (0, _moment.default)("2016-07-09");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("Sunday Start Date Thirty Days Method Returns Correct July 2016", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(6, 2016, true);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2016-06-26");
    var expectedEnd = (0, _moment.default)("2016-08-06");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("Sunday Start Date Thirty Days Method Returns Correct August 2016", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(7, 2016, true);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2016-07-31");
    var expectedEnd = (0, _moment.default)("2016-09-10");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("Sunday Start Date Thirty Days Method Returns Correct October 2016", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(9, 2016, true);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2016-09-25");
    var expectedEnd = (0, _moment.default)("2016-11-05");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("Sunday Start Date Thirty Days Method Returns Correct December 2016", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(11, 2016, true);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2016-11-27");
    var expectedEnd = (0, _moment.default)("2017-01-07");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("Sunday Start Date Thirty Days Method Returns Correct January 2017", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(0, 2017, true);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2016-12-25");
    var expectedEnd = (0, _moment.default)("2017-02-04");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("Sunday Start Date Thirty Days Method Returns Correct March 2017", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(2, 2017, true);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2017-02-26");
    var expectedEnd = (0, _moment.default)("2017-04-08");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
  it("Sunday Start Date Thirty Days Method Returns Correct April 2017", function () {
    var days = (0, _TimeFunctionUtils.getFourtyTwoDays)(3, 2017, true);
    var firstDay = days[0];
    var lastDay = days[41];
    var expectedStart = (0, _moment.default)("2017-03-26");
    var expectedEnd = (0, _moment.default)("2017-05-06");
    var firstDaySame = firstDay.isSame(expectedStart, 'day');
    var isEndDaySame = lastDay.isSame(expectedEnd, 'day');
    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
});