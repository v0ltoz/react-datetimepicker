import React from 'react';
import ReactDOM from 'react-dom';
import '../style/DateTimeRange.css';
import moment from 'moment';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import {
  startDateStyle,
  endDateStyle,
  inBetweenStyle,
  normalCellStyle,
  hoverCellStyle,
  greyCellStyle,
  invalidStyle,
  isInbetweenDates,
} from '../utils/TimeFunctionUtils';
import { addFocusStyle } from '../utils/StyleUtils';
import { pastMaxDate } from '../utils/DateSelectedUtils';
import { getCalendarGridCellClassName } from '../utils/CssClassNameHelper';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = { style: {} };

    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.onClick = this.onClick.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidUpdate(oldProps) {
    if (
      !this.props.date.isSame(oldProps.date) ||
      !this.props.otherDate.isSame(oldProps.otherDate)
    ) {
      this.styleCell();
    }
    if (!this.props.cellDay.isSame(oldProps.cellDay)) {
      this.styleCell();
    }

    // If a Cell is Selected
    // If the focusDate is this cell
    // and its not a gray cell
    // Then Focus on this cell
    let cellFocused = false;
    let focusDateIsCellDate =
      typeof this.props.focusDate === 'object' &&
      this.props.focusDate.isSame(this.props.cellDay, 'day');
    let activeElement = document.activeElement.id;
    if (activeElement && activeElement.includes('_cell_')) {
      cellFocused = true;
    }
    if (
      cellFocused &&
      focusDateIsCellDate &&
      !this.shouldStyleCellGrey(this.props.cellDay)
    ) {
      this.cell.focus();
      this.props.focusOnCallback(false);
    }
  }

  pastMaxDatePropsChecker(isCellDateProp, days) {
    if (isCellDateProp) {
      if (
        pastMaxDate(
          moment(this.props.date).add(days, 'days'),
          this.props.maxDate,
          true,
        )
      ) {
        return true;
      }
    } else {
      if (
        pastMaxDate(
          moment(this.props.otherDate).add(days, 'days'),
          this.props.maxDate,
          true,
        )
      ) {
        return true;
      }
    }
    return false;
  }

  keyDown(e) {
    let componentFocused =
      document.activeElement === ReactDOM.findDOMNode(this.cell);
    if (componentFocused && e.keyCode >= 37 && e.keyCode <= 40) {
      e.preventDefault();
      let newDate = moment(this.props.cellDay);
      // Check to see if this cell is the date prop
      let isCellDateProp = this.props.cellDay.isSame(this.props.date, 'day');
      if (e.keyCode === 38) {
        // Up Key
        newDate.subtract(7, 'days');
      } else if (e.keyCode === 40) {
        // Down Key
        if (this.pastMaxDatePropsChecker(isCellDateProp, 7)) {
          return;
        }
        newDate.add(7, 'days');
      } else if (e.keyCode === 37) {
        // Left Key
        newDate.subtract(1, 'days');
      } else if (e.keyCode === 39) {
        // Right Key
        if (this.pastMaxDatePropsChecker(isCellDateProp, 1)) {
          return;
        }
        newDate.add(1, 'days');
      }
      let isSuccessfulCallback = this.props.keyboardCellCallback(
        this.props.cellDay,
        newDate,
      );
      if (isSuccessfulCallback) {
        this.props.focusOnCallback(newDate);
      }
    }
  }

  onClick() {
    if (pastMaxDate(this.props.cellDay, this.props.maxDate, false)) {
      return;
    }
    this.props.dateSelectedNoTimeCallback(this.props.cellDay);
  }

  mouseEnter() {
    // If Past Max Date Style Cell Out of Use
    if (this.checkAndSetMaxDateStyle(this.props.cellDay)) {
      return;
    }
    // Hover Style Cell, Different if inbetween start and end date
    let isDateStart = this.props.date.isSameOrBefore(
      this.props.otherDate,
      'minute',
    );
    if (
      isInbetweenDates(
        isDateStart,
        this.props.cellDay,
        this.props.date,
        this.props.otherDate,
      )
    ) {
      this.setState({ style: hoverCellStyle(true) });
    } else {
      this.setState({ style: hoverCellStyle() });
    }
  }

  mouseLeave() {
    this.styleCell();
  }

  onFocus() {
    this.props.cellFocusedCallback(this.props.cellDay);
    this.setState({ focus: true });
  }

  onBlur() {
    this.setState({ focus: false });
  }

  shouldStyleCellGrey(cellDay) {
    let month = this.props.month;
    let cellDayMonth = cellDay.month();
    if (month !== cellDayMonth) {
      return true;
    }
  }

  shouldStyleCellStartEnd(cellDay, date, otherDate, startCheck, endCheck) {
    let isCellDateProp = cellDay.isSame(date, 'day');
    let isCellOtherDateProp = cellDay.isSame(otherDate, 'day');
    let isDateStart = date.isSameOrBefore(otherDate, 'minute');
    let isOtherDateStart = otherDate.isSameOrBefore(date, 'minute');

    if (startCheck) {
      return (
        (isCellDateProp && isDateStart) ||
        (isCellOtherDateProp && isOtherDateStart)
      );
    } else if (endCheck) {
      return (
        (isCellDateProp && !isDateStart) ||
        (isCellOtherDateProp && !isOtherDateStart)
      );
    }
  }

  checkAndSetMaxDateStyle(cellDate) {
    if (pastMaxDate(cellDate, this.props.maxDate, false)) {
      this.setState({ style: invalidStyle() });
      return true;
    }
    return false;
  }

  styleCell() {
    let cellDay = this.props.cellDay;
    let date = this.props.date;
    let otherDate = this.props.otherDate;

    // If Past Max Date Style Cell Out of Use
    if (this.checkAndSetMaxDateStyle(cellDay)) {
      return;
    }

    if (this.shouldStyleCellGrey(cellDay)) {
      this.setState({ style: greyCellStyle() });
      return;
    }

    let isDateStart = date.isSameOrBefore(otherDate, 'minute');
    let inbetweenDates = isInbetweenDates(
      isDateStart,
      cellDay,
      date,
      otherDate,
    );

    if (this.shouldStyleCellStartEnd(cellDay, date, otherDate, true, false)) {
      this.setState({ style: startDateStyle() });
    } else if (
      this.shouldStyleCellStartEnd(cellDay, date, otherDate, false, true)
    ) {
      this.setState({ style: endDateStyle() });
    } else if (inbetweenDates) {
      this.setState({ style: inBetweenStyle() });
    } else {
      this.setState({ style: normalCellStyle() });
    }
  }

  isStartOrEndDate() {
    let cellDay = this.props.cellDay;
    let date = this.props.date;
    let otherDate = this.props.otherDate;
    if (
      this.shouldStyleCellStartEnd(cellDay, date, otherDate, true, false) ||
      this.shouldStyleCellStartEnd(cellDay, date, otherDate, false, true)
    ) {
      return true;
    }
    return false;
  }

  render() {
    let className = getCalendarGridCellClassName();
    let dateFormatted = this.props.cellDay.format('D');
    let tabIndex = -1;
    if (
      this.isStartOrEndDate() &&
      !this.shouldStyleCellGrey(this.props.cellDay)
    ) {
      document.addEventListener('keydown', this.keyDown, false);
      tabIndex = 0;
    } else {
      document.removeEventListener('keydown', this.keyDown, false);
    }
    let style = addFocusStyle(this.state.focus, this.state.style);
    return (
      <div
        ref={cell => {
          this.cell = cell;
        }}
        className={className}
        tabIndex={tabIndex}
        style={style}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        onClick={this.onClick}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        id={`row_${this.props.row}_cell_${this.props.id}_${this.props.mode}`}
      >
        {dateFormatted}
      </div>
    );
  }
}

Cell.propTypes = {
  id: PropTypes.number.isRequired,
  cellDay: momentPropTypes.momentObj.isRequired,
  date: momentPropTypes.momentObj.isRequired,
  otherDate: momentPropTypes.momentObj,
  maxDate: momentPropTypes.momentObj,
  dateSelectedNoTimeCallback: PropTypes.func.isRequired,
  keyboardCellCallback: PropTypes.func.isRequired,
  focusOnCallback: PropTypes.func.isRequired,
  focusDate: PropTypes.any.isRequired,
  month: PropTypes.number.isRequired,
  cellFocusedCallback: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
};
export default Cell;
