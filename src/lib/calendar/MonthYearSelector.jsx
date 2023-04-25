import React from 'react';
import PropTypes from 'prop-types';
import { addFocusStyle, darkTheme, lightTheme } from '../utils/StyleUtils';

import { ReactComponent as ChevronRightIcon } from '../icons/chevron-right.svg';
import { ReactComponent as ChevronLeftIcon } from '../icons/chevron-left.svg';

class MonthYearSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthFocus: false,
      yearFocus: false,
    };

    this.monthFocus = this.monthFocus.bind(this);
    this.yearFocus = this.yearFocus.bind(this);
    this.monthBlur = this.monthBlur.bind(this);
    this.yearBlur = this.yearBlur.bind(this);
  }

  createCalendarMonths(months) {
    return this.mapToOption(months);
  }

  createYears(years) {
    return this.mapToOption(years);
  }

  monthFocus() {
    this.setState({ monthFocus: true });
  }

  monthBlur() {
    this.setState({ monthFocus: false });
  }

  yearFocus() {
    this.setState({ yearFocus: true });
  }

  yearBlur() {
    this.setState({ yearFocus: false });
  }

  mapToOption(variableArray) {
    return variableArray.map(function (varInstance, i) {
      return <option key={i}>{varInstance}</option>;
    });
  }

  render() {
    let months = this.createCalendarMonths(this.props.months);
    let years = this.createYears(this.props.years);
    let theme = this.props.darkMode ? darkTheme : lightTheme;
    let monthFocusStyle = {};
    monthFocusStyle = addFocusStyle(this.state.monthFocus, monthFocusStyle);
    let yearFocusStyle = {};
    yearFocusStyle = addFocusStyle(this.state.yearFocus, yearFocusStyle);

    return (
      <div className="m-1 mt-2 flex items-center">
        <div className="grow text-left">
          <ChevronLeftIcon
            className="h-4 w-4 cursor-pointer"
            onClick={() => this.props.changeMonthArrowsCallback(true, false)}
          />
        </div>
        <div
          className="grow"
          onFocus={this.monthFocus}
          onBlur={this.monthBlur}
          style={monthFocusStyle}
        >
          <select
            id={'MonthSelector_' + this.props.mode}
            value={this.props.months[this.props.month]}
            onChange={this.props.changeMonthCallback}
            style={theme}
            className="rounded border border-gray-200 p-1"
          >
            {months}
          </select>
        </div>
        <div
          className="grow"
          onFocus={this.yearFocus}
          onBlur={this.yearBlur}
          style={yearFocusStyle}
        >
          <select
            id={'YearSelector_' + this.props.mode}
            value={this.props.year}
            onChange={this.props.changeYearCallback}
            style={theme}
            className="rounded border border-gray-200 p-1"
          >
            {years}
          </select>
        </div>
        <div className="inline-block text-right">
          <ChevronRightIcon
            className="h-4 w-4 cursor-pointer"
            onClick={() => this.props.changeMonthArrowsCallback(false, true)}
          />
        </div>
      </div>
    );
  }
}

MonthYearSelector.propTypes = {
  months: PropTypes.array.isRequired,
  years: PropTypes.array.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  changeMonthCallback: PropTypes.func.isRequired,
  changeYearCallback: PropTypes.func.isRequired,
  changeMonthArrowsCallback: PropTypes.func.isRequired,
  darkMode: PropTypes.bool,
  mode: PropTypes.string.isRequired,
};
export default MonthYearSelector;
