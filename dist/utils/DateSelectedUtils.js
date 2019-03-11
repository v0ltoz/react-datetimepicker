"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pastMaxDate = exports.datePicked = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var datePicked = function datePicked(startDate, endDate, newDate, startMode) {
  if (startMode) {
    return newDateStartMode(newDate, endDate);
  } else {
    return newDateEndMode(newDate, startDate);
  }
};

exports.datePicked = datePicked;

var newDateStartMode = function newDateStartMode(newDate, endDate) {
  if (newDate.isSameOrBefore(endDate, "minutes")) {
    return returnDateObject(newDate, endDate);
  } else {
    var newEnd = (0, _moment.default)(newDate);
    newEnd.add(1, "days");
    return returnDateObject(newDate, newEnd);
  }
};

var newDateEndMode = function newDateEndMode(newDate, startDate) {
  if (newDate.isSameOrAfter(startDate, "minutes")) {
    return returnDateObject(startDate, newDate);
  } else {
    var newStart = (0, _moment.default)(newDate);
    newStart.subtract(1, "days");
    return returnDateObject(newStart, newDate);
  }
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

  if (minuteMode && maxDate && currentDate.isAfter(maxDate, "minute")) {
    return true;
  }

  if (maxDate && currentDate.isAfter(maxDate, "day")) {
    return true;
  }

  return false;
};

exports.pastMaxDate = pastMaxDate;