import React from 'react';
import './style/DateTimeRange.css';
import Fragment from 'react-dot-fragment';
import moment from 'moment';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import Ranges from './ranges/Ranges';
import DatePicker from './date_picker/DatePicker';
import { isValidTimeChange } from './utils/TimeFunctionUtils';
import { datePicked, pastMaxDate } from './utils/DateSelectedUtils';

export const ModeEnum = Object.freeze({ start: 'start', end: 'end' });
export let momentFormat = 'DD-MM-YYYY HH:mm';

class DateTimeRangePicker extends React.Component {
  constructor(props) {
    super(props);
    let ranges = {};
    let customRange = { 'Custom Range': 'Custom Range' };
    Object.assign(ranges, this.props.ranges, customRange);
    let localMomentFormat = 'DD-MM-YYYY HH:mm';

    if (this.props.local && this.props.local.format) {
      momentFormat = this.props.local.format;
      localMomentFormat = this.props.local.format;
    }

    this.state = {
      selectedRange: 0,
      selectingModeFrom: true,
      ranges: ranges,
      start: this.props.start,
      startLabel: this.props.start.format(localMomentFormat),
      end: this.props.end,
      endLabel: this.props.end.format(localMomentFormat),
      focusDate: false,
      momentFormat: localMomentFormat,
    };
    this.bindToFunctions();
  }

  bindToFunctions() {
    this.rangeSelectedCallback = this.rangeSelectedCallback.bind(this);
    this.dateSelectedNoTimeCallback = this.dateSelectedNoTimeCallback.bind(this);
    this.timeChangeCallback = this.timeChangeCallback.bind(this);
    this.dateTextFieldCallback = this.dateTextFieldCallback.bind(this);
    this.onChangeDateTextHandlerCallback = this.onChangeDateTextHandlerCallback.bind(this);
    this.changeSelectingModeCallback = this.changeSelectingModeCallback.bind(this);
    this.applyCallback = this.applyCallback.bind(this);
    this.keyboardCellCallback = this.keyboardCellCallback.bind(this);
    this.focusOnCallback = this.focusOnCallback.bind(this);
    this.cellFocusedCallback = this.cellFocusedCallback.bind(this);
  }

  componentDidMount() {
    this.setToRangeValue(this.state.start, this.state.end);
  }

  componentDidUpdate(prevProps) {
    if (!this.props.start.isSame(prevProps.start) || !this.props.end.isSame(prevProps.end)) {
      this.updateStartEndAndLabels(this.props.start, this.props.end);
    }
  }

  applyCallback() {
    this.props.applyCallback(this.state.start, this.state.end);
    this.props.changeVisibleState();
  }

  checkAutoApplyActiveApplyIfActive(startDate, endDate) {
    if (this.props.autoApply) {
      this.props.applyCallback(startDate, endDate);
    }
  }

  rangeSelectedCallback(index, value) {
    // If Past Max Date Dont allow update
    let start;
    let end;
    if (value !== 'Custom Range') {
      start = this.state.ranges[value][0];
      end = this.state.ranges[value][1];
      if (pastMaxDate(start, this.props.maxDate, true) || pastMaxDate(end, this.props.maxDate, true)) {
        return false;
      }
    }
    // Else update state to new selected index and update start and end time
    this.setState({ selectedRange: index });
    if (value !== 'Custom Range') {
      this.updateStartEndAndLabels(start, end);
    }
    if (this.props.rangeCallback) {
      this.props.rangeCallback(index, value);
    }

    if (value !== 'Custom Range') {
      this.checkAutoApplyActiveApplyIfActive(start, end);
    }
  }

  setToRangeValue(startDate, endDate) {
    let rangesArray = Object.keys(this.state.ranges).map(key => this.state.ranges[key]);
    for (let i = 0; i < rangesArray.length; i++) {
      if (rangesArray[i] === 'Custom Range') {
        continue;
      } else if (rangesArray[i][0].isSame(startDate, 'minutes') && rangesArray[i][1].isSame(endDate, 'minutes')) {
        this.setState({ selectedRange: i });
        return;
      }
    }
    this.setToCustomRange();
  }

  setToCustomRange() {
    let rangesArray = Object.keys(this.state.ranges).map(key => this.state.ranges[key]);
    for (let i = 0; i < rangesArray.length; i++) {
      if (rangesArray[i] === 'Custom Range') {
        this.setState({ selectedRange: i });
      }
    }
  }

  updateStartEndAndLabels(newStart, newEnd) {
    this.setState({
      start: newStart,
      startLabel: newStart.format(this.state.momentFormat),
      end: newEnd,
      endLabel: newEnd.format(this.state.momentFormat),
    });
  }

  // Currently called from Cell selection
  dateSelectedNoTimeCallback(cellDate, cellMode) {
    // If in smart mode get the new date selecting mode from the selectingMode (Changes between too and from)
    // If in non smart mode take the new date selecting mode from the callback mode param
    let isSelectingModeFrom;
    if (this.props.smartMode) {
      isSelectingModeFrom = this.state.selectingModeFrom;
    } else if (cellMode === ModeEnum.start) {
      isSelectingModeFrom = true;
    } else {
      isSelectingModeFrom = false;
    }

    // Get the new dates from the dates selected by the user
    let newDates = datePicked(this.state.start, this.state.end, cellDate, isSelectingModeFrom, this.props.smartMode);
    // unpack the new dates and set them
    let startDate = newDates.startDate;
    let endDate = newDates.endDate;
    let newStart = this.duplicateMomentTimeFromState(startDate, true);
    let newEnd = this.duplicateMomentTimeFromState(endDate, false);
    this.updateStartEndAndLabels(newStart, newEnd);
    this.setToRangeValue(newStart, newEnd);
    // If Smart Mode is active change the selecting mode to opposite of what was just pressed
    if (this.props.smartMode) {
      this.setState(prevState => ({
        selectingModeFrom: !prevState.selectingModeFrom,
      }));
    }
    this.checkAutoApplyActiveApplyIfActive(newStart, newEnd);
  }

  changeSelectingModeCallback(selectingModeFromParam) {
    if (this.props.smartMode) {
      this.setState({ selectingModeFrom: selectingModeFromParam });
    }
  }

  duplicateMomentTimeFromState(date, startDate) {
    let state;
    if (startDate) {
      state = this.state.start;
    } else {
      state = this.state.end;
    }
    let newDate = [date.year(), date.month(), date.date(), state.hours(), state.minutes(), state.seconds()];
    return moment(newDate);
  }

  timeChangeCallback(newHour, newMinute, mode) {
    if (mode === 'start') {
      this.updateStartTime(newHour, newMinute, mode);
    } else if (mode === 'end') {
      this.updateEndTime(newHour, newMinute, mode);
    }
  }

  updateStartTime(newHour, newMinute, mode) {
    this.updateTime(this.state.start, newHour, newMinute, mode, 'start', 'startLabel');
  }

  updateEndTime(newHour, newMinute, mode) {
    this.updateTime(this.state.end, newHour, newMinute, mode, 'end', 'endLabel');
  }

  updateTime(origDate, newHour, newMinute, mode, stateDateToChangeName, stateLabelToChangeName) {
    let date = moment(origDate);
    date.hours(newHour);
    date.minutes(newMinute);
    // If Past Max Date Dont allow update
    if (pastMaxDate(date, this.props.maxDate, true)) {
      return false;
    }
    // If Valid Time Change allow the change else if in smart mode
    // set new start and end times to be minute ahead/behind the new date
    // else dont allow the change
    if (isValidTimeChange(mode, date, this.state.start, this.state.end)) {
      this.setState({
        [stateDateToChangeName]: date,
        [stateLabelToChangeName]: date.format(this.state.momentFormat),
      });
      this.updateTimeCustomRangeUpdator(stateDateToChangeName, date);
      if (stateDateToChangeName === 'end') {
        this.checkAutoApplyActiveApplyIfActive(this.state.start, date);
      } else {
        this.checkAutoApplyActiveApplyIfActive(date, this.state.end);
      }
    } else if (this.props.smartMode) {
      let newDate = moment(date);
      if (mode === 'start') {
        newDate.add(1, 'minute');
        this.updateStartEndAndLabels(date, newDate);
        this.setToRangeValue(date, newDate);
        this.checkAutoApplyActiveApplyIfActive(date, newDate);
      } else {
        newDate.subtract(1, 'minute');
        this.updateStartEndAndLabels(newDate, date);
        this.setToRangeValue(newDate, date);
        this.checkAutoApplyActiveApplyIfActive(newDate, date);
      }
    } else {
      this.updateStartEndAndLabels(this.state.start, this.state.end);
      this.setToRangeValue(this.state.start, this.state.end);
      this.checkAutoApplyActiveApplyIfActive(this.state.start, this.state.end);
    }
  }

  updateTimeCustomRangeUpdator(stateDateToChangeName, date) {
    if (stateDateToChangeName === 'start') {
      this.setToRangeValue(date, this.state.end);
    } else {
      this.setToRangeValue(this.state.start, date);
    }
  }

  dateTextFieldCallback(mode) {
    if (mode === 'start') {
      let newDate = moment(this.state.startLabel, this.state.momentFormat);
      let isValidNewDate = newDate.isValid();
      let isSameOrBeforeEnd = newDate.isSameOrBefore(this.state.end, 'second');
      let isAfterEndDate = newDate.isAfter(this.state.end);
      this.updateDate(mode, newDate, isValidNewDate, isSameOrBeforeEnd, isAfterEndDate, 'start', 'startLabel');
    } else {
      let newDate = moment(this.state.endLabel, this.state.momentFormat);
      let isValidNewDate = newDate.isValid();
      let isBeforeStartDate = newDate.isBefore(this.state.start);
      let isSameOrAfterStartDate = newDate.isSameOrAfter(this.state.start, 'second');
      this.updateDate(mode, newDate, isValidNewDate, isSameOrAfterStartDate, isBeforeStartDate, 'end', 'endLabel');
    }
  }

  updateDate(
    mode,
    newDate,
    isValidNewDate,
    isValidDateChange,
    isInvalidDateChange,
    stateDateToChangeName,
    stateLabelToChangeName,
  ) {
    // If new date past max date dont allow change
    if (pastMaxDate(newDate, this.props.maxDate, true)) {
      this.updateStartEndAndLabels(this.state.start, this.state.end);
      return false;
    }
    // Else if date valid and date change valid update the date,
    if (isValidNewDate && isValidDateChange) {
      this.setState({
        [stateDateToChangeName]: newDate,
        [stateLabelToChangeName]: newDate.format(this.state.momentFormat),
      });
      this.updateTimeCustomRangeUpdator(stateDateToChangeName, newDate);
      if (stateDateToChangeName === 'end') {
        this.checkAutoApplyActiveApplyIfActive(this.state.start, newDate);
      } else {
        this.checkAutoApplyActiveApplyIfActive(newDate, this.state.end);
      }
    }
    // If new date valid but date change invalid go into update invalid mode,
    // adds/subtract 1 days from start/stop value
    // Only do this if in smart mode though
    else if (isValidNewDate && isInvalidDateChange && this.props.smartMode) {
      this.updateInvalidDate(mode, newDate);
    } else {
      this.updateStartEndAndLabels(this.state.start, this.state.end);
    }
  }

  updateInvalidDate(mode, newDate) {
    if (mode === 'start') {
      let newEndDate = moment(newDate).add(1, 'day');
      this.updateLabelsAndRangeValues(newDate, newEndDate);
      this.checkAutoApplyActiveApplyIfActive(newDate, newEndDate);
    } else {
      let newStartDate = moment(newDate).subtract(1, 'day');
      this.updateStartEndAndLabels(newStartDate, newDate);
      this.checkAutoApplyActiveApplyIfActive(newStartDate, newDate);
    }
  }

  updateLabelsAndRangeValues(startDate, endDate) {
    this.updateStartEndAndLabels(startDate, endDate);
    this.setToRangeValue(startDate, endDate);
  }

  onChangeDateTextHandlerCallback(newValue, mode) {
    if (mode === 'start') {
      this.setState({
        startLabel: newValue,
      });
    } else if (mode === 'end') {
      this.setState({
        endLabel: newValue,
      });
    }
  }

  keyboardCellCallback(originalDate, newDate) {
    let startDate;
    let endDate;
    // If original date same as start and end date, and not in smart mode
    // Then if cell end called allow new end date. Allow new start if cell start called
    // Done for when the start and end date are the same
    if (
      originalDate.isSame(this.state.start, 'day') &&
      originalDate.isSame(this.state.end, 'day') &&
      !this.props.smartMode
    ) {
      let activeElement = document.activeElement.id;
      // If Focused Cell is an end cell
      if (activeElement && activeElement.includes('_cell_') && activeElement.includes('_end')) {
        // Allow a new end date from the date calledback
        startDate = moment(this.state.start);
        endDate = this.duplicateMomentTimeFromState(newDate, false);
        // EDGE CASE: Due to Cell focusing issues if Start and End date same
        // due to Key press into each other, if you then press left it always
        // calls it from the end cell so allow the end cell to handle this
        // and switch to start when this occurs
        if (!startDate.isSameOrBefore(endDate, 'second')) {
          startDate = this.duplicateMomentTimeFromState(newDate, true);
          endDate = moment(this.state.end);
        }
      } else if (activeElement && activeElement.includes('_cell_') && activeElement.includes('_start')) {
        startDate = this.duplicateMomentTimeFromState(newDate, true);
        endDate = moment(this.state.end);
      }
    }

    if (!startDate && !endDate) {
      // If original is the start date only, then set the start date to the new date
      if (originalDate.isSame(this.state.start, 'day')) {
        startDate = this.duplicateMomentTimeFromState(newDate, true);
        endDate = moment(this.state.end);
        //  Not in Smart Mode and Start Date after End Date then invalid change
        if (!this.props.smartMode && startDate.isAfter(endDate, 'second')) {
          return false;
        }
      }
      // End date only, set the end date to the new date
      else {
        startDate = moment(this.state.start);
        endDate = this.duplicateMomentTimeFromState(newDate, false);
        //  Not in Smart Mode and Start Date after End Date then invalid change
        if (!this.props.smartMode && startDate.isAfter(endDate, 'second')) {
          return false;
        }
      }
    }

    if (startDate.isSameOrBefore(endDate, 'second')) {
      this.updateStartEndAndLabels(startDate, endDate);
      this.checkAutoApplyActiveApplyIfActive(startDate, endDate);
    } else {
      this.updateStartEndAndLabels(endDate, startDate);
      this.checkAutoApplyActiveApplyIfActive(endDate, startDate);
    }

    return true;
  }

  focusOnCallback(date) {
    if (date) {
      this.setState({
        focusDate: date,
      });
    } else {
      this.setState({
        focusDate: false,
      });
    }
  }

  cellFocusedCallback(date) {
    if (date.isSame(this.state.start, 'day')) {
      this.changeSelectingModeCallback(true);
    } else if (date.isSame(this.state.end, 'day')) {
      this.changeSelectingModeCallback(false);
    }
  }

  renderStartDate(local) {
    let label = (local && local.fromDate) ? local.fromDate : "From Date";
    return (
      <DatePicker
        label={label}
        date={this.state.start}
        otherDate={this.state.end}
        mode={ModeEnum.start}
        dateSelectedNoTimeCallback={this.dateSelectedNoTimeCallback}
        timeChangeCallback={this.timeChangeCallback}
        dateTextFieldCallback={this.dateTextFieldCallback}
        keyboardCellCallback={this.keyboardCellCallback}
        focusOnCallback={this.focusOnCallback}
        focusDate={this.state.focusDate}
        cellFocusedCallback={this.cellFocusedCallback}
        onChangeDateTextHandlerCallback={this.onChangeDateTextHandlerCallback}
        dateLabel={this.state.startLabel}
        selectingModeFrom={this.state.selectingModeFrom}
        changeSelectingModeCallback={this.changeSelectingModeCallback}
        applyCallback={this.applyCallback}
        maxDate={this.props.maxDate}
        local={this.props.local}
        descendingYears={this.props.descendingYears}
        years={this.props.years}
        pastSearchFriendly={this.props.pastSearchFriendly}
        smartMode={this.props.smartMode}
        style={this.props.style}
        darkMode={this.props.darkMode}
        standalone={this.props.standalone}
      />
    );
  }

  renderEndDate(local) {
    let label = (local && local.toDate) ? local.toDate : "To Date";
    return (
      <DatePicker
        label={label}
        date={this.state.end}
        otherDate={this.state.start}
        mode={ModeEnum.end}
        dateSelectedNoTimeCallback={this.dateSelectedNoTimeCallback}
        timeChangeCallback={this.timeChangeCallback}
        dateTextFieldCallback={this.dateTextFieldCallback}
        keyboardCellCallback={this.keyboardCellCallback}
        focusOnCallback={this.focusOnCallback}
        focusDate={this.state.focusDate}
        cellFocusedCallback={this.cellFocusedCallback}
        onChangeDateTextHandlerCallback={this.onChangeDateTextHandlerCallback}
        dateLabel={this.state.endLabel}
        changeVisibleState={this.props.changeVisibleState}
        selectingModeFrom={this.state.selectingModeFrom}
        changeSelectingModeCallback={this.changeSelectingModeCallback}
        applyCallback={this.applyCallback}
        maxDate={this.props.maxDate}
        local={this.props.local}
        descendingYears={this.props.descendingYears}
        years={this.props.years}
        pastSearchFriendly={this.props.pastSearchFriendly}
        smartMode={this.props.smartMode}
        enableButtons
        autoApply={this.props.autoApply}
        style={this.props.style}
        darkMode={this.props.darkMode}
        standalone={this.props.standalone}
      />
    );
  }

  render() {
    return (
      <Fragment>
        <Ranges
          ranges={this.state.ranges}
          selectedRange={this.state.selectedRange}
          rangeSelectedCallback={this.rangeSelectedCallback}
          screenWidthToTheRight={this.props.screenWidthToTheRight}
          style={this.props.style}
          noMobileMode={this.props.noMobileMode}
          forceMobileMode={this.props.forceMobileMode}
        />
        {this.renderStartDate(this.props.local)}
        {this.renderEndDate(this.props.local)}
      </Fragment>
    );
  }
}

DateTimeRangePicker.propTypes = {
  ranges: PropTypes.object.isRequired,
  start: momentPropTypes.momentObj.isRequired,
  end: momentPropTypes.momentObj.isRequired,
  local: PropTypes.object.isRequired,
  applyCallback: PropTypes.func.isRequired,
  rangeCallback: PropTypes.func,
  autoApply: PropTypes.bool,
  maxDate: momentPropTypes.momentObj,
  descendingYears: PropTypes.bool,
  years: PropTypes.array,
  pastSearchFriendly: PropTypes.bool,
  smartMode: PropTypes.bool,
  changeVisibleState: PropTypes.func.isRequired,
  screenWidthToTheRight: PropTypes.number.isRequired,
  style: PropTypes.object,
  darkMode: PropTypes.bool,
  noMobileMode: PropTypes.bool,
  forceMobileMode: PropTypes.bool,
  standalone: PropTypes.bool,
};

export { DateTimeRangePicker };
