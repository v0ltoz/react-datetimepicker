"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pastMaxDate = exports.datePicked = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var datePicked = function datePicked(startDate, endDate, newDate, startMode, smartMode) {
  if (startMode) {
    return newDateStartMode(newDate, endDate, smartMode, startDate);
  } else {
    return newDateEndMode(newDate, startDate, smartMode, endDate);
  }
};

exports.datePicked = datePicked;

var newDateStartMode = function newDateStartMode(newDate, endDate, smartMode, startDate) {
  // Create a new moment object which combines the new date and the original start date as newDate
  // doesnt contain time info which is important to determining equality
  var newDateWithTime = createNewDateWithTime(newDate, startDate.hour(), startDate.minute(), startDate.second());

  if (newDateWithTime.isSameOrBefore(endDate, 'seconds')) {
    return returnDateObject(newDate, endDate);
  } else if (smartMode) {
    var newEnd = (0, _moment.default)(newDate);
    newEnd.add(1, 'days');
    return returnDateObject(newDate, newEnd);
  } else {
    return returnDateObject(startDate, endDate);
  }
};

var newDateEndMode = function newDateEndMode(newDate, startDate, smartMode, endDate) {
  // Create a new moment object which combines the new date and the original end date as newDate
  // doesnt contain time info which is important to determining equality
  var newDateWithTime = createNewDateWithTime(newDate, endDate.hour(), endDate.minute(), endDate.second());

  if (newDateWithTime.isSameOrAfter(startDate, 'seconds')) {
    return returnDateObject(startDate, newDate);
  } else if (smartMode) {
    var newStart = (0, _moment.default)(newDate);
    newStart.subtract(1, 'days');
    return returnDateObject(newStart, newDate);
  } else {
    return returnDateObject(startDate, endDate);
  }
};

var createNewDateWithTime = function createNewDateWithTime(newDate, hour, minute, second) {
  var newDateTmp = [newDate.year(), newDate.month(), newDate.date()];
  var newDateWithTime = (0, _moment.default)(newDateTmp);
  newDateWithTime.hour(hour);
  newDateWithTime.minute(minute);
  newDateWithTime.second(second);
  return newDateWithTime;
};

var returnDateObject = function returnDateObject(startDate, endDate) {
  var returnValues = {};
  returnValues.startDate = startDate;
  returnValues.endDate = endDate;
  return returnValues;
};

var pastMaxDate = function pastMaxDate(currentDate, maxDate, minuteMode) {
  if (!maxDate) {
    return false;
  }

  if (minuteMode && maxDate && currentDate.isAfter(maxDate, 'seconds')) {
    return true;
  }

  if (maxDate && currentDate.isAfter(maxDate, 'day')) {
    return true;
  }

  return false;
};

exports.pastMaxDate = pastMaxDate;