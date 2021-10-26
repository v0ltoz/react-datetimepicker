"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCalendarGridCellClassName = exports.getCalendarGridHeaderClassName = exports.getCalendarGridClassName = void 0;

var _BrowserVersion = require("./BrowserVersion");

var getCalendarGridClassName = function getCalendarGridClassName() {
  var firefoxBelow35 = (0, _BrowserVersion.isFirefoxBelow53)();

  if (firefoxBelow35) {
    return 'calendarGridFirefoxBelow35';
  } else {
    return 'calendarGrid';
  }
};

exports.getCalendarGridClassName = getCalendarGridClassName;

var getCalendarGridHeaderClassName = function getCalendarGridHeaderClassName() {
  var firefoxBelow35 = (0, _BrowserVersion.isFirefoxBelow53)();

  if (firefoxBelow35) {
    return 'calendarGridHeaderFirefoxBelow35';
  } else {
    return;
  }
};

exports.getCalendarGridHeaderClassName = getCalendarGridHeaderClassName;

var getCalendarGridCellClassName = function getCalendarGridCellClassName() {
  var firefoxBelow35 = (0, _BrowserVersion.isFirefoxBelow53)();

  if (firefoxBelow35) {
    return 'calendarCellFirefoxBelow35';
  } else {
    return 'calendarCell';
  }
};

exports.getCalendarGridCellClassName = getCalendarGridCellClassName;