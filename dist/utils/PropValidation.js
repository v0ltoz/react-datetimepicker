"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propValidation = void 0;

var propValidation = function propValidation(props) {
  if (props.years) {
    if (!Array.isArray(props.years)) {
      return 'Year props should be an array e.g. [2019, 2020]';
    }

    if (props.years.length !== 2) {
      return 'Year props should be an array of 2, with the first number being the start date and the second being the end';
    }

    var start = props.start,
        end = props.end,
        years = props.years;

    if (years[0] > years[1]) {
      return 'Start year must be before the end';
    } // Start year defined must be between the custom user defined dates


    var isStartYearBetweenUserDefinedYears = start.year() >= years[0] && start.year() <= years[1]; // End year defined must be between the custom user defined dates

    var isEndYearBetweenUserDefinedYears = end.year() >= years[0] && end.year() <= years[1];

    if (!isStartYearBetweenUserDefinedYears) {
      return 'Start year should be in the custom years defined';
    }

    if (!isEndYearBetweenUserDefinedYears) {
      return 'End year should be in the custom years defined';
    }
  }

  return true;
};

exports.propValidation = propValidation;