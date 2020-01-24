import React from "react";
import "./style/DateTimeRange.css";
import Ranges from "./ranges/Ranges";
import DatePicker from "./date_picker/DatePicker";
import Fragment from "react-dot-fragment";
import moment from "moment";
import { isValidTimeChange } from "./utils/TimeFunctionUtils";
import { datePicked, pastMaxDate } from "./utils/DateSelectedUtils";

export const ModeEnum = Object.freeze({ start: "start", end: "end" });

export default class DateTimeRangePicker extends React.Component {
  constructor(props) {
    super(props);

    let ranges = {},
      customRange = {},
      rangesOriginal = {};

    if (this.props.ranges == null || !Array.isArray(this.props.ranges)) {
      customRange[
        this.props.translations.customRange
      ] = this.props.translations.customRange;
      Object.assign(ranges, this.props.ranges, customRange);
      rangesOriginal = ranges;
    } else {
      rangesOriginal = this.props.ranges;

      if (Array.isArray(this.props.ranges)) {
        for (let cur in this.props.ranges) {
          let curColumn = this.props.ranges[cur];

          Object.assign(ranges, curColumn.ranges);
        }

        customRange[
          this.props.translations.customRange
        ] = this.props.translations.customRange;
        Object.assign(ranges, customRange);
      }
    }

    this.state = {
      selectedRange: 0,
      selectingModeFrom: true,
      rangesOriginal: rangesOriginal,
      ranges: ranges,
      start: this.props.start,
      startLabel: this.props.start.format(this.getMomentFormat()),
      end: this.props.end,
      endLabel: this.props.end.format(this.getMomentFormat()),
      focusDate: false,
      errorClass: ""
    };
    this.bindToFunctions();
  }

  getMomentFormat() {
    //return this.props.disableTime ? 'DD-MM-YYYY' : 'DD-MM-YYYY HH:mm';
    if (this.props.local && this.props.local.format) {
      return this.props.local.format;
    } else {
      return "DD-MM-YYYY";
    }
  }

  bindToFunctions() {
    this.rangeSelectedCallback = this.rangeSelectedCallback.bind(this);
    this.dateSelectedNoTimeCallback = this.dateSelectedNoTimeCallback.bind(
      this
    );
    this.timeChangeCallback = this.timeChangeCallback.bind(this);
    this.dateTextFieldCallback = this.dateTextFieldCallback.bind(this);
    this.onChangeDateTextHandlerCallback = this.onChangeDateTextHandlerCallback.bind(
      this
    );
    this.changeSelectingModeCallback = this.changeSelectingModeCallback.bind(
      this
    );
    this.applyCallback = this.applyCallback.bind(this);
    this.keyboardCellCallback = this.keyboardCellCallback.bind(this);
    this.focusOnCallback = this.focusOnCallback.bind(this);
    this.cellFocusedCallback = this.cellFocusedCallback.bind(this);
    this.cellDateHover = this.cellDateHover.bind(this);
  }

  componentDidMount() {
    this.setToRangeValue(this.state.start, this.state.end);
  }

  componentDidUpdate(prevProps) {
    if (!this.props.start.isSame(prevProps.start)) {
      this.updateStartEndAndLabels(this.props.start, this.state.end);
    } else if (!this.props.end.isSame(prevProps.end)) {
      this.updateStartEndAndLabels(this.state.start, this.props.end);
    }
  }

  applyCallback() {
    this.applyCallbackDirect(this.state.start, this.state.end);
  }

  applyCallbackDirect(start, end) {
    if (!this.checkMaxDays(start, end)) {
      return false;
    }

    if (this.props.applyCallback) {
      this.props.applyCallback(start, end);
    }

    this.props.changeVisibleState();
  }

  checkMaxDays(startDate, endDate) {
    let { maxDays } = this.props;

    if (maxDays != null && maxDays > 0) {
      let days = Date.daysBetween(startDate, endDate);

      if (days - 1 > this.props.maxDays) {
        this.props.updateErrorClass("error");
        if (this.state.errorClass !== "error")
          this.setState({ errorClass: "error" });
        return false;
      } else {
        this.props.updateErrorClass("");
        if (this.state.errorClass !== "") this.setState({ errorClass: "" });
        return true;
      }
    }

    return true;
  }

  rangeSelectedCallback(index, value) {
    // If Past Max Date Dont allow update
    let start;
    let end;
    if (value !== this.props.translations.customRange) {
      start = this.state.ranges[value][0];
      end = this.state.ranges[value][1];
      if (
        pastMaxDate(start, this.props.maxDate, true) ||
        pastMaxDate(end, this.props.maxDate, true)
      ) {
        return false;
      }
      if (!this.checkMaxDays(start, end)) {
        return false;
      }
      if (this.props.rangeCallback) {
        this.props.rangeCallback(value, this.state.ranges[value], {
          start: this.state.ranges[value][0].toDate(),
          end: this.state.ranges[value][1].toDate()
        });
      }
    }
    // Else update state to new selected index and update start and end time
    this.setState({ selectedRange: index });
    if (value !== this.props.translations.customRange) {
      this.updateStartEndAndLabels(start, end);
    }

    if (this.props.autoCloseOnSelection) {
      this.applyCallbackDirect(
        this.state.ranges[value][0].toDate(),
        this.state.ranges[value][1].toDate()
      );
    }
  }

  setToRangeValue(startDate, endDate) {
    if (!this.checkMaxDays(startDate, endDate)) {
      return false;
    }

    let rangesArray = Object.values(this.state.ranges);
    for (let i = 0; i < rangesArray.length; i++) {
      if (rangesArray[i] === this.props.translations.customRange) {
        continue;
      } else if (
        rangesArray[i][0].isSame(startDate, "minutes") &&
        rangesArray[i][1].isSame(endDate, "minutes")
      ) {
        this.setState({ selectedRange: i });

        if (this.props.rangeCallback) {
          this.props.rangeCallback(i, rangesArray[i], {
            start: rangesArray[i][0].toDate(),
            end: rangesArray[i][1].toDate()
          });
        }

        return;
      }
    }
    this.setToCustomRange();
  }

  setToCustomRange() {
    let rangesArray = Object.values(this.state.ranges);
    for (let i = 0; i < rangesArray.length; i++) {
      if (rangesArray[i] === this.props.translations.customRange) {
        this.setState({ selectedRange: i });
      }
    }
  }

  updateStartEndAndLabels(newStart, newEnd) {
    this.setState({
      start: newStart,
      startLabel: newStart.format(this.getMomentFormat()),
      end: newEnd,
      endLabel: newEnd.format(this.getMomentFormat())
    });
  }

  dateSelectedNoTimeCallback(cellDate) {
    if (this.props.maxDays != null && this.props.maxDays === 1) {
      let startDate = moment([
        cellDate.year(),
        cellDate.month(),
        cellDate.date(),
        0,
        0,
        0
      ]);
      let endDate = moment([
        cellDate.year(),
        cellDate.month(),
        cellDate.date(),
        23,
        59,
        59
      ]);

      this.updateStartEndAndLabels(startDate, endDate);

      //eslint-disable-next-line
      this.state.start = startDate;
      //eslint-disable-next-line
      this.state.end = endDate;

      this.setState({
        start: startDate,
        end: endDate,
        selectingModeFrom: false
      });

      this.applyCallback();

      return;
    } else {
      let { start: startToUse, end: endToUse } = this.state,
        newDates;
      if (this.props.useVirtualSelection) {
        if (this.state.selectingModeFrom) {
          endToUse = startToUse.clone();
          newDates = datePicked(
            startToUse,
            endToUse,
            cellDate,
            this.state.selectingModeFrom
          );
        } else {
          if (startToUse > endToUse) {
            let temp = startToUse;
            startToUse = endToUse;
            endToUse = temp;
          }
          newDates = datePicked(
            startToUse,
            endToUse,
            endToUse,
            this.state.selectingModeFrom
          );
        }
      } else {
        newDates = datePicked(
          startToUse,
          endToUse,
          cellDate,
          this.state.selectingModeFrom
        );
      }

      let startDate = newDates.startDate;
      let endDate = newDates.endDate;

      let newStart = this.duplicateMomentTimeFromState(startDate, true);
      let newEnd = this.duplicateMomentTimeFromState(endDate, false);

      this.updateStartEndAndLabels(newStart, newEnd);
      this.setToRangeValue(newStart, newEnd);

      this.setState(prevState => ({
        selectingModeFrom: !prevState.selectingModeFrom
      }));

      if (this.props.autoCloseOnSelection && !this.state.selectingModeFrom) {
        this.setState({
          SelectingStartTime: false,
          SelectingEndTime: false
        });
        this.applyCallbackDirect(newStart, newEnd);
      }
    }
  }

  changeSelectingModeCallback(selectingModeFromParam) {
    this.setState({ selectingModeFrom: selectingModeFromParam });
  }

  duplicateMomentTimeFromState(date, startDate) {
    let state;
    if (startDate) {
      state = this.state.start;
    } else {
      state = this.state.end;
    }
    let newDate = [
      date.year(),
      date.month(),
      date.date(),
      startDate
        ? this.state.SelectingStartTime
          ? state.hours()
          : 0
        : this.state.SelectingEndTime
        ? state.hours()
        : 23,
      startDate
        ? this.state.SelectingStartTime
          ? state.minutes()
          : 0
        : this.state.SelectingEndTime
        ? state.hours()
        : 59,
      startDate ? 0 : 59
    ];
    return moment(newDate);
  }

  timeChangeCallback(newHour, newMinute, mode) {
    if (mode === "start") {
      this.setState({ SelectingStartTime: true });
      this.updateStartTime(newHour, newMinute, mode);
    } else if (mode === "end") {
      this.setState({ SelectingEndTime: true });
      this.updateEndTime(newHour, newMinute, mode);
    }
  }

  updateStartTime(newHour, newMinute, mode) {
    this.updateTime(
      this.state.start,
      newHour,
      newMinute,
      mode,
      "start",
      "startLabel"
    );
  }

  updateEndTime(newHour, newMinute, mode) {
    this.updateTime(
      this.state.end,
      newHour,
      newMinute,
      mode,
      "end",
      "endLabel"
    );
  }

  updateTime(
    origDate,
    newHour,
    newMinute,
    mode,
    stateDateToChangeName,
    stateLabelToChangeName
  ) {
    let date = moment(origDate);
    date.hours(newHour);
    date.minutes(newMinute);
    // If Past Max Date Dont allow update
    if (pastMaxDate(date, this.props.maxDate, true)) {
      return false;
    }
    // If Valid Time Change allow the change else set new start and end times
    // to be minute ahead/behind the new date
    if (isValidTimeChange(mode, date, this.state.start, this.state.end)) {
      this.setState({
        [stateDateToChangeName]: date,
        [stateLabelToChangeName]: date.format(this.getMomentFormat())
      });
      this.updateTimeCustomRangeUpdator(stateDateToChangeName, date);
    } else {
      let newDate = moment(date);
      if (mode === "start") {
        newDate.add(1, "minute");
        this.updateStartEndAndLabels(date, newDate);
        this.setToRangeValue(date, newDate);
      } else {
        newDate.subtract(1, "minute");
        this.updateStartEndAndLabels(newDate, date);
        this.setToRangeValue(newDate, date);
      }
    }
  }

  updateTimeCustomRangeUpdator(stateDateToChangeName, date) {
    if (stateDateToChangeName === "start") {
      this.setToRangeValue(date, this.state.end);
    } else {
      this.setToRangeValue(this.state.start, date);
    }
  }

  dateTextFieldCallback(mode) {
    if (mode === "start") {
      let newDate = moment(this.state.startLabel, this.getMomentFormat());
      let isValidNewDate = newDate.isValid();
      let isSameOrBeforeEnd = newDate.isSameOrBefore(this.state.end, "minute");
      let isAfterEndDate = newDate.isAfter(this.state.end);
      this.updateDate(
        mode,
        newDate,
        isValidNewDate,
        isSameOrBeforeEnd,
        isAfterEndDate,
        "start",
        "startLabel"
      );
    } else {
      let newDate = moment(this.state.endLabel, this.getMomentFormat());
      let isValidNewDate = newDate.isValid();
      let isBeforeStartDate = newDate.isBefore(this.state.start);
      let isSameOrAfterStartDate = newDate.isSameOrAfter(
        this.state.start,
        "minute"
      );
      this.updateDate(
        mode,
        newDate,
        isValidNewDate,
        isSameOrAfterStartDate,
        isBeforeStartDate,
        "end",
        "endLabel"
      );
    }
  }

  updateDate(
    mode,
    newDate,
    isValidNewDate,
    isValidDateChange,
    isInvalidDateChange,
    stateDateToChangeName,
    stateLabelToChangeName
  ) {
    // If new date past max date dont allow change
    if (pastMaxDate(newDate, this.props.maxDate, true)) {
      this.updateStartEndAndLabels(this.state.start, this.state.end);
      return false;
    }
    // Else if date valid and date change valid update the date,
    // if date invalid go into update invalid mode, adds/subtract 1 days from start/stop value
    if (isValidNewDate && isValidDateChange) {
      this.setState({
        [stateDateToChangeName]: newDate,
        [stateLabelToChangeName]: newDate.format(this.getMomentFormat())
      });
      if (this.updateTimeUpdator)
        this.updateTimeUpdator(stateDateToChangeName, newDate);
    } else if (isValidNewDate && isInvalidDateChange) {
      this.updateInvalidDate(mode, newDate);
    } else if (!isValidNewDate) {
      this.updateStartEndAndLabels(this.state.start, this.state.end);
    }
  }

  updateInvalidDate(mode, newDate) {
    if (mode === "start") {
      let newEndDate = moment(newDate).add(1, "day");
      this.updateLabelsAndRangeValues(newDate, newEndDate);
    } else {
      let newStartDate = moment(newDate).subtract(1, "day");
      this.updateStartEndAndLabels(newStartDate, newDate);
    }
  }

  updateLabelsAndRangeValues(startDate, endDate) {
    this.updateStartEndAndLabels(startDate, endDate);
    this.setToRangeValue(startDate, endDate);
  }

  onChangeDateTextHandlerCallback(newValue, mode) {
    if (mode === "start") {
      this.setState({
        startLabel: newValue
      });
    } else if (mode === "end") {
      this.setState({
        endLabel: newValue
      });
    }
  }

  keyboardCellCallback(originalDate, newDate) {
    let startDate;
    let endDate;
    if (originalDate.isSame(this.state.start, "day")) {
      startDate = this.duplicateMomentTimeFromState(newDate, true);
      endDate = moment(this.state.end);
    } else {
      startDate = moment(this.state.start);
      endDate = this.duplicateMomentTimeFromState(newDate, false);
    }

    if (startDate.isBefore(endDate, "day")) {
      this.updateStartEndAndLabels(startDate, endDate);
    } else {
      this.updateStartEndAndLabels(endDate, startDate);
    }
  }

  focusOnCallback(date) {
    if (date) {
      this.setState({
        focusDate: date
      });
    } else {
      this.setState({
        focusDate: false
      });
    }
  }

  cellDateHover(date, isFrom) {
    if (this.props.useVirtualSelection) {
      if (this.state.selectingModeFrom) {
        /* this.setState({
                    start: date,
                    end: date
                });

                this.updateStartEndAndLabels(date, date); */
      } else {
        let start = this.state.start;
        /* 
				if (date < start) {
					start = date;
					date = this.state.start;
				} */

        this.setState({
          start: start,
          end: date
        });

        this.updateStartEndAndLabels(start, date);
      }
    }
  }

  cellFocusedCallback(date) {
    if (date.isSame(this.state.start, "day")) {
      this.changeSelectingModeCallback(true);
    } else if (date.isSame(this.state.end, "day")) {
      this.changeSelectingModeCallback(false);
    }
  }

  renderStartDate() {
    return (
      <DatePicker
        calendarStyles={this.props.calendarStyles}
        disableDateBox={this.props.disableDateBox}
        disableTime={this.props.disableTime}
        label={this.props.translations.FromDate}
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
        minDate={this.props.minDate}
        local={this.props.local}
        className={
          this.state.errorClass +
          " " +
          (this.state.selectingModeFrom ? "" : " reduce-opacity") +
          (this.props.rangesOnTheRight ? " right-ranges" : "")
        }
        translations={this.props.translations}
        minYear={this.props.minYear}
        maxYear={this.props.maxYear}
        showCurrentState={this.props.showCurrentState}
        maxDays={this.props.maxDays}
        cellDateHover={this.cellDateHover}
      />
    );
  }

  renderEndDate() {
    return (
      <DatePicker
        calendarStyles={this.props.calendarStyles}
        disableDateBox={this.props.disableDateBox}
        disableTime={this.props.disableTime}
        label={this.props.translations.ToDate}
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
        minDate={this.props.minDate}
        local={this.props.local}
        enableButtons={true}
        className={
          this.state.errorClass +
          (this.state.selectingModeFrom && this.props.maxDays !== 1
            ? " reduce-opacity"
            : "") +
          (this.props.rangesOnTheRight ? " right-ranges" : "")
        }
        translations={this.props.translations}
        singleDay={this.props.maxDays != null && this.props.maxDays === 1}
        minYear={this.props.minYear}
        maxYear={this.props.maxYear}
        showCurrentState={this.props.showCurrentState}
        maxDays={this.props.maxDays}
        cellDateHover={this.cellDateHover}
      />
    );
  }

  render() {
    let ranges = (
      <Ranges
        ranges={this.state.rangesOriginal}
        selectedRange={this.state.selectedRange}
        rangeSelectedCallback={this.rangeSelectedCallback}
        screenWidthToTheRight={this.props.screenWidthToTheRight}
        calendarStyles={this.props.calendarStyles}
      />
    );

    return (
      <Fragment>
        {!this.props.rangesOnTheRight ? ranges : ""}

        {this.props.maxDays == null || this.props.maxDays > 1
          ? this.renderStartDate()
          : ""}
        {this.renderEndDate()}

        {this.props.rangesOnTheRight ? ranges : ""}
      </Fragment>
    );
  }
}
