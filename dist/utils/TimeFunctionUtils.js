"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invalidStyle = exports.greyCellStyle = exports.hoverCellStyle = exports.normalCellStyle = exports.inBetweenStyle = exports.endDateStyle = exports.startDateStyle = exports.isValidTimeChange = exports.isInbetweenDates = exports.getFourtyTwoDays = exports.getYear = exports.getMonth = exports.generateMinutes = exports.generateHours = void 0;

var _DateTimeRangePicker = require("../DateTimeRangePicker");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateHours = function generateHours() {
  var hours = [];

  for (var i = 0; i < 24; i++) {
    hours.push(i);
  }

  return hours;
};

exports.generateHours = generateHours;

var generateMinutes = function generateMinutes() {
  var minutes = [];

  for (var i = 0; i < 60; i++) {
    if (i < 10) {
      minutes.push("0" + i.toString());
    } else {
      minutes.push(i.toString());
    }
  }

  return minutes;
};

exports.generateMinutes = generateMinutes;

function workOutMonthYear(date, secondDate, mode) {
  // If both months are different months then
  // allow normal display in the calendar
  var selectedMonth = date.month();
  var otherMonth = secondDate.month();

  if (selectedMonth !== otherMonth) {
    return date;
  } // If both months are the same and the same year 
  // have "end"/right as the month and "start"/left as -1 month
  else if (date.year() === secondDate.year() && mode === _DateTimeRangePicker.ModeEnum.start) {
      var lastMonth = JSON.parse(JSON.stringify(date));
      lastMonth = (0, _moment.default)(lastMonth);
      lastMonth.subtract(1, "month");
      return lastMonth;
    } else {
      return date;
    }
}

var getMonth = function getMonth(date, secondDate, mode) {
  return workOutMonthYear(date, secondDate, mode).month();
};

exports.getMonth = getMonth;

var getYear = function getYear(date, secondDate, mode) {
  return workOutMonthYear(date, secondDate, mode).year();
};

exports.getYear = getYear;

var getDaysBeforeStartMonday = function getDaysBeforeStartMonday(firstDayOfMonth) {
  var fourtyTwoDays = [];
  var dayBeforeFirstDayOfMonth = firstDayOfMonth.day() - 1; // We dont want to include the first day of the new month
  // Case whereby day before is a Saturday (6) and we require Saturday back to Monday for that week

  if (dayBeforeFirstDayOfMonth === -1) {
    for (var i = 6; i > 0; i--) {
      var firstDayOfMonthCopy = firstDayOfMonth.clone();
      firstDayOfMonthCopy = firstDayOfMonthCopy.subtract(i, 'd');
      fourtyTwoDays.push(firstDayOfMonthCopy);
    }
  } // Case Whereby day before first day is the Sunday (0), therefore we want the entire previous week


  if (dayBeforeFirstDayOfMonth === 0) {
    for (var _i = 7; _i > 0; _i--) {
      var _firstDayOfMonthCopy = firstDayOfMonth.clone();

      _firstDayOfMonthCopy = _firstDayOfMonthCopy.subtract(_i, 'd');
      fourtyTwoDays.push(_firstDayOfMonthCopy);
    }
  } // Every other day
  else {
      for (var _i2 = dayBeforeFirstDayOfMonth; _i2 > 0; _i2--) {
        var _firstDayOfMonthCopy2 = firstDayOfMonth.clone();

        _firstDayOfMonthCopy2 = _firstDayOfMonthCopy2.subtract(_i2, 'd');
        fourtyTwoDays.push(_firstDayOfMonthCopy2);
      }
    }

  return fourtyTwoDays;
};

var getDaysBeforeStartSunday = function getDaysBeforeStartSunday(firstDayOfMonth) {
  var fourtyTwoDays = [];
  var dayBeforeFirstDayOfMonth = firstDayOfMonth.day() - 1; // We dont want to include the first day of the new month
  // Case whereby we need all previous week days

  if (dayBeforeFirstDayOfMonth === -1) {
    for (var i = 7; i > 0; i--) {
      var firstDayOfMonthCopy = firstDayOfMonth.clone();
      firstDayOfMonthCopy = firstDayOfMonthCopy.subtract(i, 'd');
      fourtyTwoDays.push(firstDayOfMonthCopy);
    }
  } // Every other day
  else {
      for (var _i3 = dayBeforeFirstDayOfMonth + 1; _i3 > 0; _i3--) {
        var _firstDayOfMonthCopy3 = firstDayOfMonth.clone();

        _firstDayOfMonthCopy3 = _firstDayOfMonthCopy3.subtract(_i3, 'd');
        fourtyTwoDays.push(_firstDayOfMonthCopy3);
      }
    }

  return fourtyTwoDays;
};

var getDaysBeforeStart = function getDaysBeforeStart(firstDayOfMonth, sundayFirst) {
  if (!sundayFirst) {
    return getDaysBeforeStartMonday(firstDayOfMonth);
  } else {
    return getDaysBeforeStartSunday(firstDayOfMonth);
  }
};

var getFourtyTwoDays = function getFourtyTwoDays(initMonth, initYear, sundayFirst) {
  var fourtyTwoDays = [];
  var firstDayOfMonth = (0, _moment.default)(new Date(initYear, initMonth, 1));
  fourtyTwoDays = getDaysBeforeStart(firstDayOfMonth, sundayFirst); // Add in all days this month

  for (var i = 0; i < firstDayOfMonth.daysInMonth(); i++) {
    fourtyTwoDays.push(firstDayOfMonth.clone().add(i, 'd'));
  } // Add in all days at the end of the month until last day of week seen


  var lastDayOfMonth = (0, _moment.default)(new Date(initYear, initMonth, firstDayOfMonth.daysInMonth()));
  var toAdd = 1;
  var gotAllDays = false;

  while (!gotAllDays) {
    if (fourtyTwoDays.length >= 42) {
      gotAllDays = true;
      break;
    }

    fourtyTwoDays.push(lastDayOfMonth.clone().add(toAdd, 'd'));
    toAdd++;
  }

  return fourtyTwoDays;
};

exports.getFourtyTwoDays = getFourtyTwoDays;

var isInbetweenDates = function isInbetweenDates(isStartDate, dayToFindOut, start, end) {
  var isInBetweenDates;

  if (isStartDate) {
    isInBetweenDates = dayToFindOut.isAfter(start) && dayToFindOut.isBefore(end);
  } else {
    isInBetweenDates = dayToFindOut.isBefore(start) && dayToFindOut.isAfter(end);
  }

  return isInBetweenDates;
};

exports.isInbetweenDates = isInbetweenDates;

var isValidTimeChange = function isValidTimeChange(mode, date, start, end) {
  var modeStartAndDateSameOrBeforeStart = mode === "start" && date.isSameOrBefore(end);
  var modeEndAndDateSameOrAfterEnd = mode === "end" && date.isSameOrAfter(start);
  return modeStartAndDateSameOrBeforeStart || modeEndAndDateSameOrAfterEnd;
};

exports.isValidTimeChange = isValidTimeChange;

var startDateStyle = function startDateStyle() {
  return {
    borderRadius: "4px 0 0 4px",
    borderColour: "transparent",
    color: "#fff",
    backgroundColor: "#357abd",
    cursor: "pointer"
  };
};

exports.startDateStyle = startDateStyle;

var endDateStyle = function endDateStyle() {
  return {
    borderRadius: "0 4px 4px 0",
    borderColour: "transparent",
    color: "#fff",
    backgroundColor: "#357abd",
    cursor: "pointer"
  };
};

exports.endDateStyle = endDateStyle;

var inBetweenStyle = function inBetweenStyle() {
  return {
    borderRadius: "0",
    borderColour: "transparent",
    color: "#000",
    backgroundColor: "#ebf4f8",
    cursor: "pointer"
  };
};

exports.inBetweenStyle = inBetweenStyle;

var normalCellStyle = function normalCellStyle() {
  return {
    borderRadius: "0 0 0 0",
    borderColour: "transparent",
    color: "black",
    backgroundColor: ""
  };
};

exports.normalCellStyle = normalCellStyle;

var hoverCellStyle = function hoverCellStyle(between) {
  var borderRadius = "4px 4px 4px 4px";

  if (between) {
    borderRadius = "0 0 0 0";
  }

  return {
    borderRadius: borderRadius,
    borderColour: "transparent",
    color: "inherit",
    backgroundColor: "#eee",
    cursor: "pointer"
  };
};

exports.hoverCellStyle = hoverCellStyle;

var greyCellStyle = function greyCellStyle() {
  var borderRadius = "4px 4px 4px 4px";
  return {
    borderRadius: borderRadius,
    borderColour: "transparent",
    color: "#999",
    backgroundColor: "#fff",
    cursor: "pointer",
    opacity: "0.25"
  };
};

exports.greyCellStyle = greyCellStyle;

var invalidStyle = function invalidStyle() {
  var style = greyCellStyle();
  style.cursor = "not-allowed";
  return style;
};

exports.invalidStyle = invalidStyle;