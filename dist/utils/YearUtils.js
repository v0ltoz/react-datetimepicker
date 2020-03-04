"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createYears = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createYears = function createYears(userDefinedYears, descendingYears) {
  var years = [];

  if (!userDefinedYears) {
    //Range from 1900 to 25 years into the future
    var past = (0, _moment.default)('19000101', 'YYYYMMDD');
    var yearsToGetFuture = 10;
    var endYear = (0, _moment.default)().add(yearsToGetFuture, 'years').get('year');
    var addedCurrentYear = false;

    while (!addedCurrentYear) {
      if (past.get('years') === endYear) {
        addedCurrentYear = true;
      }

      years.push(past.year());
      past.add(1, 'years');
    }
  } else {
    var start = userDefinedYears[0];
    var end = userDefinedYears[1];

    for (var i = start; i <= end; i++) {
      years.push(i);
    }
  }

  return sortYears(years, descendingYears);
};

exports.createYears = createYears;

var sortYears = function sortYears(years, descendingYears) {
  // Decides whether to order dates in ascending or descending order
  if (descendingYears) {
    return years.reverse();
  }

  return years;
};