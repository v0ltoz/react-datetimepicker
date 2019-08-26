import React from 'react';
import '../style/DateTimeRange.css';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import MonthYearSelector from './MonthYearSelector';
import CalendarHeader from './CalendarHeader';
import CalendarRows from './CalendarRows';
import { createYears } from '../utils/YearUtils';
import { getMonth, getYear, getFourtyTwoDays } from '../utils/TimeFunctionUtils';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: 0,
      year: 0,
    };

    this.changeMonthCallback = this.changeMonthCallback.bind(this);
    this.changeYearCallback = this.changeYearCallback.bind(this);
    this.changeMonthArrowsCallback = this.changeMonthArrowsCallback.bind(this);
  }

  componentDidMount() {
    this.updateMonthYear();
  }

  componentDidUpdate(previousProps) {
    if (!previousProps.date.isSame(this.props.date) || !previousProps.otherDate.isSame(this.props.otherDate)) {
      this.updateMonthYear();
    }
  }

  updateMonthYear() {
    let newMonth = getMonth(
      this.props.date,
      this.props.otherDate,
      this.props.mode,
      this.props.pastSearchFriendly,
      this.props.smartMode,
    );
    let newYear = getYear(
      this.props.date,
      this.props.otherDate,
      this.props.mode,
      this.props.pastSearchFriendly,
      this.props.smartMode,
    );
    this.setState({
      month: newMonth,
      year: newYear,
    });
  }

  createMonths(local) {
    if (local && local.months) {
      return local.months;
    }
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months;
  }

  changeMonthCallback(event) {
    for (let i = 0; i < event.target.length; i++) {
      if (event.target[i].value === event.target.value) {
        this.setState({ month: i });
      }
    }
  }

  changeMonthArrowsCallback(isPreviousChange, isNextChange) {
    let years = createYears(this.props.years, this.props.descendingYears);
    let monthLocal = parseInt(this.state.month);
    let yearLocal = parseInt(this.state.year);

    let newMonthYear;
    if (isPreviousChange) {
      newMonthYear = this.getPreviousMonth(monthLocal, yearLocal, years);
    }
    if (isNextChange) {
      newMonthYear = this.getNextMonth(monthLocal, yearLocal, years);
    }

    this.setState({
      year: newMonthYear.yearLocal,
      month: newMonthYear.monthLocal,
    });
  }

  getPreviousMonth(monthLocal, yearLocal, years) {
    let isStartOfMonth = monthLocal === 0;
    let isFirstYear = parseInt(yearLocal) === years[0];

    if (!(isStartOfMonth && isFirstYear)) {
      if (monthLocal === 0) {
        monthLocal = 11;
        yearLocal -= 1;
      } else {
        monthLocal -= 1;
      }
    }
    return { monthLocal, yearLocal };
  }

  getNextMonth(monthLocal, yearLocal, years) {
    let isEndOfMonth = monthLocal === 11;
    let isLastYear = parseInt(yearLocal) === years[years.length - 1];
    if (!(isEndOfMonth && isLastYear)) {
      if (monthLocal === 11) {
        monthLocal = 0;
        yearLocal += 1;
      } else {
        monthLocal += 1;
      }
    }
    return { monthLocal, yearLocal };
  }

  changeYearCallback(event) {
    this.setState({ year: parseInt(event.target.value) });
  }

  render() {
    let months = this.createMonths(this.props.local);
    let years = createYears(this.props.years, this.props.descendingYears);
    let headers = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    let sundayFirst = false;
    if (this.props.local) {
      if (this.props.local.days) {
        headers = this.props.local.days;
      }
      if (this.props.local.sundayFirst) {
        sundayFirst = true;
        headers.unshift(headers.pop());
      }
    }

    let fourtyTwoDays = getFourtyTwoDays(this.state.month, this.state.year, sundayFirst);
    return (
      <div>
        <MonthYearSelector
          months={months}
          years={years}
          month={this.state.month}
          year={this.state.year}
          mode={this.props.mode}
          changeMonthCallback={this.changeMonthCallback}
          changeYearCallback={this.changeYearCallback}
          changeMonthArrowsCallback={this.changeMonthArrowsCallback}
          darkMode={this.props.darkMode}
        />
        <CalendarHeader headers={headers} />
        <CalendarRows
          fourtyTwoDays={fourtyTwoDays}
          date={this.props.date}
          mode={this.props.mode}
          otherDate={this.props.otherDate}
          maxDate={this.props.maxDate}
          month={this.state.month}
          year={this.state.year}
          dateSelectedNoTimeCallback={this.props.dateSelectedNoTimeCallback}
          keyboardCellCallback={this.props.keyboardCellCallback}
          focusOnCallback={this.props.focusOnCallback}
          focusDate={this.props.focusDate}
          cellFocusedCallback={this.props.cellFocusedCallback}
          smartMode={this.props.smartMode}
          style={this.props.style}
          darkMode={this.props.darkMode}
        />
      </div>
    );
  }
}

Calendar.propTypes = {
  date: momentPropTypes.momentObj,
  mode: PropTypes.string.isRequired,
  otherDate: momentPropTypes.momentObj,
  maxDate: momentPropTypes.momentObj,
  dateSelectedNoTimeCallback: PropTypes.func.isRequired,
  keyboardCellCallback: PropTypes.func.isRequired,
  focusOnCallback: PropTypes.func.isRequired,
  focusDate: PropTypes.any.isRequired,
  descendingYears: PropTypes.bool,
  years: PropTypes.array,
  pastSearchFriendly: PropTypes.bool,
  smartMode: PropTypes.bool,
  cellFocusedCallback: PropTypes.func.isRequired,
  local: PropTypes.object,
  style: PropTypes.object,
  darkMode: PropTypes.bool,
};
export default Calendar;
