"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTimeRangePicker = exports.momentFormat = exports.ModeEnum = void 0;

var _react = _interopRequireDefault(require("react"));

require("./style/DateTimeRange.css");

var _reactDotFragment = _interopRequireDefault(require("react-dot-fragment"));

var _moment = _interopRequireDefault(require("moment"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactMomentProptypes = _interopRequireDefault(require("react-moment-proptypes"));

var _Ranges = _interopRequireDefault(require("./ranges/Ranges"));

var _DatePicker = _interopRequireDefault(require("./date_picker/DatePicker"));

var _TimeFunctionUtils = require("./utils/TimeFunctionUtils");

var _DateSelectedUtils = require("./utils/DateSelectedUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ModeEnum = Object.freeze({
  start: 'start',
  end: 'end'
});
exports.ModeEnum = ModeEnum;
var momentFormat = 'DD-MM-YYYY HH:mm';
exports.momentFormat = momentFormat;

var DateTimeRangePicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DateTimeRangePicker, _React$Component);

  function DateTimeRangePicker(props) {
    var _this;

    _classCallCheck(this, DateTimeRangePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateTimeRangePicker).call(this, props));
    var ranges = {};
    var customRange = {
      'Custom Range': 'Custom Range'
    };
    Object.assign(ranges, _this.props.ranges, customRange);
    var localMomentFormat = "DD-MM-YYYY ".concat(_this.props.twelveHoursClock ? 'h:mm A' : 'HH:mm');

    if (_this.props.local && _this.props.local.format) {
      exports.momentFormat = momentFormat = _this.props.local.format;
      localMomentFormat = _this.props.local.format;
    }

    _this.state = {
      selectedRange: _this.props.selectedRange || 0,
      selectingModeFrom: true,
      ranges: ranges,
      start: _this.props.start,
      startLabel: _this.props.start.format(localMomentFormat),
      end: _this.props.end,
      endLabel: _this.props.end.format(localMomentFormat),
      focusDate: false,
      momentFormat: localMomentFormat
    };

    _this.bindToFunctions();

    return _this;
  }

  _createClass(DateTimeRangePicker, [{
    key: "bindToFunctions",
    value: function bindToFunctions() {
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
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setToRangeValue(this.state.start, this.state.end);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var isDifferentMomentObject = !this.props.start.isSame(prevProps.start) || !this.props.end.isSame(prevProps.end);
      var isDifferentTime = this.props.start.format('DD-MM-YYYY HH:mm') !== prevProps.start.format('DD-MM-YYYY HH:mm') || this.props.end.format('DD-MM-YYYY HH:mm') !== prevProps.end.format('DD-MM-YYYY HH:mm');

      if (isDifferentMomentObject || isDifferentTime) {
        this.setState({
          start: this.props.start,
          end: this.props.end
        }, this.updateStartEndAndLabels(this.props.start, this.props.end, true));
      }
    }
  }, {
    key: "applyCallback",
    value: function applyCallback() {
      this.props.applyCallback(this.state.start, this.state.end);
      this.props.changeVisibleState();
    }
  }, {
    key: "checkAutoApplyActiveApplyIfActive",
    value: function checkAutoApplyActiveApplyIfActive(startDate, endDate) {
      if (this.props.autoApply) {
        this.props.applyCallback(startDate, endDate);
      }
    }
  }, {
    key: "rangeSelectedCallback",
    value: function rangeSelectedCallback(index, value) {
      // If Past Max Date Dont allow update
      var start;
      var end;

      if (value !== 'Custom Range') {
        start = this.state.ranges[value][0]();
        end = this.state.ranges[value][1]();

        if ((0, _DateSelectedUtils.pastMaxDate)(start, this.props.maxDate, true) || (0, _DateSelectedUtils.pastMaxDate)(end, this.props.maxDate, true)) {
          return false;
        }
      } // Else update state to new selected index and update start and end time


      this.setState({
        selectedRange: index
      });

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
  }, {
    key: "setToRangeValue",
    value: function setToRangeValue(startDate, endDate) {
      var _this2 = this;

      var rangesArray = Object.keys(this.state.ranges).map(function (key) {
        return _this2.state.ranges[key];
      });

      for (var i = 0; i < rangesArray.length; i++) {
        if (rangesArray[i] === 'Custom Range') {
          continue;
        } else if (rangesArray[i][0]().isSame(startDate, 'minutes') && rangesArray[i][1]().isSame(endDate, 'minutes')) {
          this.setState({
            selectedRange: i
          });
          return;
        }
      }

      this.setToCustomRange();
    }
  }, {
    key: "setToCustomRange",
    value: function setToCustomRange() {
      var _this3 = this;

      var rangesArray = Object.keys(this.state.ranges).map(function (key) {
        return _this3.state.ranges[key];
      });

      for (var i = 0; i < rangesArray.length; i++) {
        if (rangesArray[i] === 'Custom Range') {
          this.setState({
            selectedRange: i
          });
        }
      }
    }
  }, {
    key: "updateStartEndAndLabels",
    value: function updateStartEndAndLabels(newStart, newEnd, updateCalendar) {
      var _this4 = this;

      this.setState({
        start: newStart,
        startLabel: newStart.format(this.state.momentFormat),
        end: newEnd,
        endLabel: newEnd.format(this.state.momentFormat)
      }, function () {
        if (updateCalendar) {
          _this4.updateCalendarRender();
        }
      });
    }
  }, {
    key: "updateCalendarRender",
    value: function updateCalendarRender() {
      this.dateTextFieldCallback("start");
      this.dateTextFieldCallback("end");
    } // Currently called from Cell selection

  }, {
    key: "dateSelectedNoTimeCallback",
    value: function dateSelectedNoTimeCallback(cellDate, cellMode) {
      // If in smart mode get the new date selecting mode from the selectingMode (Changes between too and from)
      // If in non smart mode take the new date selecting mode from the callback mode param
      var isSelectingModeFrom;

      if (this.props.smartMode) {
        isSelectingModeFrom = this.state.selectingModeFrom;
      } else if (cellMode === ModeEnum.start) {
        isSelectingModeFrom = true;
      } else {
        isSelectingModeFrom = false;
      } // Get the new dates from the dates selected by the user


      var newDates = (0, _DateSelectedUtils.datePicked)(this.state.start, this.state.end, cellDate, isSelectingModeFrom, this.props.smartMode); // unpack the new dates and set them

      var startDate = newDates.startDate;
      var endDate = newDates.endDate;
      var newStart = this.duplicateMomentTimeFromState(startDate, true);
      var newEnd = this.duplicateMomentTimeFromState(endDate, false);
      this.updateStartEndAndLabels(newStart, newEnd);
      this.setToRangeValue(newStart, newEnd); // If Smart Mode is active change the selecting mode to opposite of what was just pressed

      if (this.props.smartMode) {
        this.setState(function (prevState) {
          return {
            selectingModeFrom: !prevState.selectingModeFrom
          };
        });
      }

      this.checkAutoApplyActiveApplyIfActive(newStart, newEnd);
    }
  }, {
    key: "changeSelectingModeCallback",
    value: function changeSelectingModeCallback(selectingModeFromParam) {
      if (this.props.smartMode) {
        this.setState({
          selectingModeFrom: selectingModeFromParam
        });
      }
    }
  }, {
    key: "duplicateMomentTimeFromState",
    value: function duplicateMomentTimeFromState(date, startDate) {
      var state;

      if (startDate) {
        state = this.state.start;
      } else {
        state = this.state.end;
      }

      var newDate = [date.year(), date.month(), date.date(), state.hours(), state.minutes(), state.seconds()];
      return (0, _moment.default)(newDate);
    }
  }, {
    key: "timeChangeCallback",
    value: function timeChangeCallback(newHour, newMinute, mode) {
      if (mode === 'start') {
        this.updateStartTime(newHour, newMinute, mode);
      } else if (mode === 'end') {
        this.updateEndTime(newHour, newMinute, mode);
      }
    }
  }, {
    key: "updateStartTime",
    value: function updateStartTime(newHour, newMinute, mode) {
      this.updateTime(this.state.start, newHour, newMinute, mode, 'start', 'startLabel');
    }
  }, {
    key: "updateEndTime",
    value: function updateEndTime(newHour, newMinute, mode) {
      this.updateTime(this.state.end, newHour, newMinute, mode, 'end', 'endLabel');
    }
  }, {
    key: "updateTime",
    value: function updateTime(origDate, newHour, newMinute, mode, stateDateToChangeName, stateLabelToChangeName) {
      var date = (0, _moment.default)(origDate);
      date.hours(newHour);
      date.minutes(newMinute); // If Past Max Date Dont allow update

      if ((0, _DateSelectedUtils.pastMaxDate)(date, this.props.maxDate, true)) {
        return false;
      } // If Valid Time Change allow the change else if in smart mode
      // set new start and end times to be minute ahead/behind the new date
      // else dont allow the change


      if ((0, _TimeFunctionUtils.isValidTimeChange)(mode, date, this.state.start, this.state.end)) {
        var _this$setState;

        this.setState((_this$setState = {}, _defineProperty(_this$setState, stateDateToChangeName, date), _defineProperty(_this$setState, stateLabelToChangeName, date.format(this.state.momentFormat)), _this$setState));
        this.updateTimeCustomRangeUpdator(stateDateToChangeName, date);

        if (stateDateToChangeName === 'end') {
          this.checkAutoApplyActiveApplyIfActive(this.state.start, date);
        } else {
          this.checkAutoApplyActiveApplyIfActive(date, this.state.end);
        }
      } else if (this.props.smartMode) {
        var newDate = (0, _moment.default)(date);

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
  }, {
    key: "updateTimeCustomRangeUpdator",
    value: function updateTimeCustomRangeUpdator(stateDateToChangeName, date) {
      if (stateDateToChangeName === 'start') {
        this.setToRangeValue(date, this.state.end);
      } else {
        this.setToRangeValue(this.state.start, date);
      }
    }
  }, {
    key: "dateTextFieldCallback",
    value: function dateTextFieldCallback(mode) {
      if (mode === 'start') {
        var newDate = (0, _moment.default)(this.state.startLabel, this.state.momentFormat);
        var isValidNewDate = newDate.isValid();
        var isSameOrBeforeEnd = newDate.isSameOrBefore(this.state.end, 'second');
        var isAfterEndDate = newDate.isAfter(this.state.end);
        this.updateDate(mode, newDate, isValidNewDate, isSameOrBeforeEnd, isAfterEndDate, 'start', 'startLabel');
      } else {
        var _newDate = (0, _moment.default)(this.state.endLabel, this.state.momentFormat);

        var _isValidNewDate = _newDate.isValid();

        var isBeforeStartDate = _newDate.isBefore(this.state.start);

        var isSameOrAfterStartDate = _newDate.isSameOrAfter(this.state.start, 'second');

        this.updateDate(mode, _newDate, _isValidNewDate, isSameOrAfterStartDate, isBeforeStartDate, 'end', 'endLabel');
      }
    }
  }, {
    key: "updateDate",
    value: function updateDate(mode, newDate, isValidNewDate, isValidDateChange, isInvalidDateChange, stateDateToChangeName, stateLabelToChangeName) {
      // If new date past max date dont allow change
      if ((0, _DateSelectedUtils.pastMaxDate)(newDate, this.props.maxDate, true)) {
        this.updateStartEndAndLabels(this.state.start, this.state.end);
        return false;
      } // Else if date valid and date change valid update the date,


      if (isValidNewDate && isValidDateChange) {
        var _this$setState2;

        this.setState((_this$setState2 = {}, _defineProperty(_this$setState2, stateDateToChangeName, newDate), _defineProperty(_this$setState2, stateLabelToChangeName, newDate.format(this.state.momentFormat)), _this$setState2));
        this.updateTimeCustomRangeUpdator(stateDateToChangeName, newDate);

        if (stateDateToChangeName === 'end') {
          this.checkAutoApplyActiveApplyIfActive(this.state.start, newDate);
        } else {
          this.checkAutoApplyActiveApplyIfActive(newDate, this.state.end);
        }
      } // If new date valid but date change invalid go into update invalid mode,
      // adds/subtract 1 days from start/stop value
      // Only do this if in smart mode though
      else if (isValidNewDate && isInvalidDateChange && this.props.smartMode) {
          this.updateInvalidDate(mode, newDate);
        } else {
          this.updateStartEndAndLabels(this.state.start, this.state.end);
        }
    }
  }, {
    key: "updateInvalidDate",
    value: function updateInvalidDate(mode, newDate) {
      if (mode === 'start') {
        var newEndDate = (0, _moment.default)(newDate).add(1, 'day');
        this.updateLabelsAndRangeValues(newDate, newEndDate);
        this.checkAutoApplyActiveApplyIfActive(newDate, newEndDate);
      } else {
        var newStartDate = (0, _moment.default)(newDate).subtract(1, 'day');
        this.updateStartEndAndLabels(newStartDate, newDate);
        this.checkAutoApplyActiveApplyIfActive(newStartDate, newDate);
      }
    }
  }, {
    key: "updateLabelsAndRangeValues",
    value: function updateLabelsAndRangeValues(startDate, endDate) {
      this.updateStartEndAndLabels(startDate, endDate);
      this.setToRangeValue(startDate, endDate);
    }
  }, {
    key: "onChangeDateTextHandlerCallback",
    value: function onChangeDateTextHandlerCallback(newValue, mode) {
      if (mode === 'start') {
        this.setState({
          startLabel: newValue
        });
      } else if (mode === 'end') {
        this.setState({
          endLabel: newValue
        });
      }
    }
  }, {
    key: "keyboardCellCallback",
    value: function keyboardCellCallback(originalDate, newDate) {
      var startDate;
      var endDate; // If original date same as start and end date, and not in smart mode
      // Then if cell end called allow new end date. Allow new start if cell start called
      // Done for when the start and end date are the same

      if (originalDate.isSame(this.state.start, 'day') && originalDate.isSame(this.state.end, 'day') && !this.props.smartMode) {
        var activeElement = document.activeElement.id; // If Focused Cell is an end cell

        if (activeElement && activeElement.includes('_cell_') && activeElement.includes('_end')) {
          // Allow a new end date from the date calledback
          startDate = (0, _moment.default)(this.state.start);
          endDate = this.duplicateMomentTimeFromState(newDate, false); // EDGE CASE: Due to Cell focusing issues if Start and End date same
          // due to Key press into each other, if you then press left it always
          // calls it from the end cell so allow the end cell to handle this
          // and switch to start when this occurs

          if (!startDate.isSameOrBefore(endDate, 'second')) {
            startDate = this.duplicateMomentTimeFromState(newDate, true);
            endDate = (0, _moment.default)(this.state.end);
          }
        } else if (activeElement && activeElement.includes('_cell_') && activeElement.includes('_start')) {
          startDate = this.duplicateMomentTimeFromState(newDate, true);
          endDate = (0, _moment.default)(this.state.end);
        }
      }

      if (!startDate && !endDate) {
        // If original is the start date only, then set the start date to the new date
        if (originalDate.isSame(this.state.start, 'day')) {
          startDate = this.duplicateMomentTimeFromState(newDate, true);
          endDate = (0, _moment.default)(this.state.end); //  Not in Smart Mode and Start Date after End Date then invalid change

          if (!this.props.smartMode && startDate.isAfter(endDate, 'second')) {
            return false;
          }
        } // End date only, set the end date to the new date
        else {
            startDate = (0, _moment.default)(this.state.start);
            endDate = this.duplicateMomentTimeFromState(newDate, false); //  Not in Smart Mode and Start Date after End Date then invalid change

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
  }, {
    key: "focusOnCallback",
    value: function focusOnCallback(date) {
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
  }, {
    key: "cellFocusedCallback",
    value: function cellFocusedCallback(date) {
      if (date.isSame(this.state.start, 'day')) {
        this.changeSelectingModeCallback(true);
      } else if (date.isSame(this.state.end, 'day')) {
        this.changeSelectingModeCallback(false);
      }
    }
  }, {
    key: "renderStartDate",
    value: function renderStartDate(local) {
      var label = local && local.fromDate ? local.fromDate : "From Date";
      return _react.default.createElement(_DatePicker.default, {
        label: label,
        date: this.state.start,
        otherDate: this.state.end,
        mode: ModeEnum.start,
        dateSelectedNoTimeCallback: this.dateSelectedNoTimeCallback,
        timeChangeCallback: this.timeChangeCallback,
        dateTextFieldCallback: this.dateTextFieldCallback,
        keyboardCellCallback: this.keyboardCellCallback,
        focusOnCallback: this.focusOnCallback,
        focusDate: this.state.focusDate,
        cellFocusedCallback: this.cellFocusedCallback,
        onChangeDateTextHandlerCallback: this.onChangeDateTextHandlerCallback,
        dateLabel: this.state.startLabel,
        selectingModeFrom: this.state.selectingModeFrom,
        changeSelectingModeCallback: this.changeSelectingModeCallback,
        applyCallback: this.applyCallback,
        maxDate: this.props.maxDate,
        local: this.props.local,
        descendingYears: this.props.descendingYears,
        years: this.props.years,
        pastSearchFriendly: this.props.pastSearchFriendly,
        smartMode: this.props.smartMode,
        style: this.props.style,
        darkMode: this.props.darkMode,
        standalone: this.props.standalone,
        twelveHoursClock: this.props.twelveHoursClock
      });
    }
  }, {
    key: "renderEndDate",
    value: function renderEndDate(local) {
      var label = local && local.toDate ? local.toDate : "To Date";
      return _react.default.createElement(_DatePicker.default, {
        label: label,
        date: this.state.end,
        otherDate: this.state.start,
        mode: ModeEnum.end,
        dateSelectedNoTimeCallback: this.dateSelectedNoTimeCallback,
        timeChangeCallback: this.timeChangeCallback,
        dateTextFieldCallback: this.dateTextFieldCallback,
        keyboardCellCallback: this.keyboardCellCallback,
        focusOnCallback: this.focusOnCallback,
        focusDate: this.state.focusDate,
        cellFocusedCallback: this.cellFocusedCallback,
        onChangeDateTextHandlerCallback: this.onChangeDateTextHandlerCallback,
        dateLabel: this.state.endLabel,
        changeVisibleState: this.props.changeVisibleState,
        selectingModeFrom: this.state.selectingModeFrom,
        changeSelectingModeCallback: this.changeSelectingModeCallback,
        applyCallback: this.applyCallback,
        maxDate: this.props.maxDate,
        local: this.props.local,
        descendingYears: this.props.descendingYears,
        years: this.props.years,
        pastSearchFriendly: this.props.pastSearchFriendly,
        smartMode: this.props.smartMode,
        enableButtons: true,
        autoApply: this.props.autoApply,
        style: this.props.style,
        darkMode: this.props.darkMode,
        standalone: this.props.standalone,
        twelveHoursClock: this.props.twelveHoursClock
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_reactDotFragment.default, null, _react.default.createElement(_Ranges.default, {
        ranges: this.state.ranges,
        selectedRange: this.state.selectedRange,
        rangeSelectedCallback: this.rangeSelectedCallback,
        screenWidthToTheRight: this.props.screenWidthToTheRight,
        style: this.props.style,
        noMobileMode: this.props.noMobileMode,
        forceMobileMode: this.props.forceMobileMode
      }), this.renderStartDate(this.props.local), this.renderEndDate(this.props.local));
    }
  }]);

  return DateTimeRangePicker;
}(_react.default.Component);

exports.DateTimeRangePicker = DateTimeRangePicker;
DateTimeRangePicker.propTypes = {
  ranges: _propTypes.default.object.isRequired,
  start: _reactMomentProptypes.default.momentObj.isRequired,
  end: _reactMomentProptypes.default.momentObj.isRequired,
  local: _propTypes.default.object.isRequired,
  applyCallback: _propTypes.default.func.isRequired,
  rangeCallback: _propTypes.default.func,
  autoApply: _propTypes.default.bool,
  maxDate: _reactMomentProptypes.default.momentObj,
  descendingYears: _propTypes.default.bool,
  years: _propTypes.default.array,
  pastSearchFriendly: _propTypes.default.bool,
  smartMode: _propTypes.default.bool,
  changeVisibleState: _propTypes.default.func.isRequired,
  screenWidthToTheRight: _propTypes.default.number.isRequired,
  style: _propTypes.default.object,
  darkMode: _propTypes.default.bool,
  noMobileMode: _propTypes.default.bool,
  forceMobileMode: _propTypes.default.bool,
  standalone: _propTypes.default.bool,
  twelveHoursClock: _propTypes.default.bool,
  selectedRange: _propTypes.default.number
};