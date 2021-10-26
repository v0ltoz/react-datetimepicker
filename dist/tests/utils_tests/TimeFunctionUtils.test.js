"use strict";

var _moment = _interopRequireDefault(require("moment"));

var _TimeFunctionUtils = require("../../utils/TimeFunctionUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_moment.default.locale('en');

describe('Time Function Utils Tests', function () {
  it('Invalid Style Contains not-allowed cursor', function () {
    var style = (0, _TimeFunctionUtils.invalidStyle)();
    expect(style.cursor).toEqual('not-allowed');
  });
  it('Hover Style non between returns 4px border', function () {
    var style = (0, _TimeFunctionUtils.hoverCellStyle)(false);
    expect(style.borderRadius).toEqual('4px 4px 4px 4px');
  });
  it('Hover Style non between returns 0px border', function () {
    var style = (0, _TimeFunctionUtils.hoverCellStyle)(true);
    expect(style.borderRadius).toEqual('0 0 0 0');
  });
  it('In Between Style returns pointer cursor', function () {
    var style = (0, _TimeFunctionUtils.inBetweenStyle)();
    expect(style.cursor).toEqual('pointer');
  });
  it('Is Valid Time Change Mode Start, Start before End', function () {
    var startDate = (0, _moment.default)();
    var endDate = (0, _moment.default)();
    var outcome = (0, _TimeFunctionUtils.isValidTimeChange)('start', startDate, startDate, endDate);
    expect(outcome).toEqual(true);
  });
  it('Is invalid Time Change Mode Start, End before Start', function () {
    var startDate = (0, _moment.default)();
    startDate.add(1, 'days');
    var endDate = (0, _moment.default)();
    var outcome = (0, _TimeFunctionUtils.isValidTimeChange)('start', startDate, startDate, endDate);
    expect(outcome).toEqual(false);
  });
  it('Is Valid Time Change Mode End, End before Start', function () {
    var startDate = (0, _moment.default)();
    var endDate = (0, _moment.default)();
    endDate.subtract(1, 'days');
    var outcome = (0, _TimeFunctionUtils.isValidTimeChange)('end', endDate, startDate, endDate);
    expect(outcome).toEqual(false);
  });
  it('Is Valid Time Change Mode End, End after Start', function () {
    var startDate = (0, _moment.default)();
    var endDate = (0, _moment.default)();
    var outcome = (0, _TimeFunctionUtils.isValidTimeChange)('end', endDate, startDate, endDate);
    expect(outcome).toEqual(true);
  });
  it('Work Out Month, Both Months Different Months', function () {
    var startDate = (0, _moment.default)(new Date(2018, 0, 1));
    startDate.subtract(1, 'month');
    var endDate = (0, _moment.default)(new Date(2018, 0, 2));
    var outcome = (0, _TimeFunctionUtils.getMonth)(startDate, endDate, 'start');
    expect(outcome).toEqual(11);
  });
  it('Work Out Month, Both Months Same Months and Same Year, Start mode, PastFriendly so previous month expected', function () {
    var startDate = (0, _moment.default)(new Date(2018, 0, 1));
    var endDate = (0, _moment.default)(new Date(2018, 0, 2));
    var outcome = (0, _TimeFunctionUtils.getMonth)(startDate, endDate, 'start', true, true);
    expect(outcome).toEqual(11);
  });
  it('Work Out Month, Both Months Same Months and Same Year, End mode, PastFriendly so previous month expected', function () {
    var startDate = (0, _moment.default)(new Date(2018, 0, 1));
    var endDate = (0, _moment.default)(new Date(2018, 0, 2));
    var outcome = (0, _TimeFunctionUtils.getMonth)(startDate, endDate, 'end', true, true);
    expect(outcome).toEqual(0);
  });
  it('Work Out Month, Both Months Same Months and Same Year, Start mode, not PastFriendly so same month expected', function () {
    var startDate = (0, _moment.default)(new Date(2018, 0, 1));
    var endDate = (0, _moment.default)(new Date(2018, 0, 2));
    var outcome = (0, _TimeFunctionUtils.getMonth)(startDate, endDate, 'start', false, true);
    expect(outcome).toEqual(0);
  });
  it('Work Out Month, Both Months Same Months and Same Year, not PastFriendly so next month expected', function () {
    var startDate = (0, _moment.default)(new Date(2018, 0, 1));
    var endDate = (0, _moment.default)(new Date(2018, 0, 2));
    var outcome = (0, _TimeFunctionUtils.getMonth)(startDate, endDate, 'end', false, true);
    expect(outcome).toEqual(1);
  });
  it('Work Out Month, Both Months Same Months and Different Year', function () {
    var startDate = (0, _moment.default)(new Date(2017, 0, 1));
    var endDate = (0, _moment.default)(new Date(2018, 0, 2));
    var outcome = (0, _TimeFunctionUtils.getMonth)(startDate, endDate, 'start');
    expect(outcome).toEqual(0);
  });
});