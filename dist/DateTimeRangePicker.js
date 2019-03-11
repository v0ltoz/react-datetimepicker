"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTimeRangePicker = exports.momentFormat = exports.ModeEnum = void 0;

var _react = _interopRequireDefault(require("react"));

require("./style/DateTimeRange.css");

var _Ranges = _interopRequireDefault(require("./ranges/Ranges"));

var _DatePicker = _interopRequireDefault(require("./date_picker/DatePicker"));

var _reactDotFragment = _interopRequireDefault(require("react-dot-fragment"));

var _moment = _interopRequireDefault(require("moment"));

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
  "start": "start",
  "end": "end"
});
exports.ModeEnum = ModeEnum;
var momentFormat = "DD-MM-YYYY HH:mm";
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
      "Custom Range": "Custom Range"
    };
    Object.assign(ranges, _this.props.ranges, customRange);

    if (_this.props.local && _this.props.local.format) {
      exports.momentFormat = momentFormat = _this.props.local.format;
    }

    _this.state = {
      selectedRange: 0,
      selectingModeFrom: true,
      ranges: ranges,
      start: _this.props.start,
      startLabel: _this.props.start.format(momentFormat),
      end: _this.props.end,
      endLabel: _this.props.end.format(momentFormat),
      focusDate: false
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
      if (!this.props.start.isSame(prevProps.start)) {
        this.updateStartEndAndLabels(this.props.start, this.state.end);
      } else if (!this.props.end.isSame(prevProps.end)) {
        this.updateStartEndAndLabels(this.state.start, this.props.end);
      }
    }
  }, {
    key: "applyCallback",
    value: function applyCallback() {
      this.props.applyCallback(this.state.start, this.state.end);
      this.props.changeVisibleState();
    }
  }, {
    key: "rangeSelectedCallback",
    value: function rangeSelectedCallback(index, value) {
      // If Past Max Date Dont allow update
      var start;
      var end;

      if (value !== "Custom Range") {
        start = this.state.ranges[value][0];
        end = this.state.ranges[value][1];

        if ((0, _DateSelectedUtils.pastMaxDate)(start, this.props.maxDate, true) || (0, _DateSelectedUtils.pastMaxDate)(end, this.props.maxDate, true)) {
          return false;
        }
      } // Else update state to new selected index and update start and end time


      this.setState({
        selectedRange: index
      });

      if (value !== "Custom Range") {
        this.updateStartEndAndLabels(start, end);
      }
    }
  }, {
    key: "setToRangeValue",
    value: function setToRangeValue(startDate, endDate) {
      var rangesArray = Object.values(this.state.ranges);

      for (var i = 0; i < rangesArray.length; i++) {
        if (rangesArray[i] === "Custom Range") {
          continue;
        } else if (rangesArray[i][0].isSame(startDate, "minutes") && rangesArray[i][1].isSame(endDate, "minutes")) {
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
      var rangesArray = Object.values(this.state.ranges);

      for (var i = 0; i < rangesArray.length; i++) {
        if (rangesArray[i] === "Custom Range") {
          this.setState({
            selectedRange: i
          });
        }
      }
    }
  }, {
    key: "updateStartEndAndLabels",
    value: function updateStartEndAndLabels(newStart, newEnd) {
      this.setState({
        start: newStart,
        startLabel: newStart.format(momentFormat),
        end: newEnd,
        endLabel: newEnd.format(momentFormat)
      });
    }
  }, {
    key: "dateSelectedNoTimeCallback",
    value: function dateSelectedNoTimeCallback(cellDate) {
      var newDates = (0, _DateSelectedUtils.datePicked)(this.state.start, this.state.end, cellDate, this.state.selectingModeFrom);
      var startDate = newDates.startDate;
      var endDate = newDates.endDate;
      var newStart = this.duplicateMomentTimeFromState(startDate, true);
      var newEnd = this.duplicateMomentTimeFromState(endDate, false);
      this.updateStartEndAndLabels(newStart, newEnd);
      this.setToRangeValue(newStart, newEnd);
      this.setState(function (prevState) {
        return {
          selectingModeFrom: !prevState.selectingModeFrom
        };
      });
    }
  }, {
    key: "changeSelectingModeCallback",
    value: function changeSelectingModeCallback(selectingModeFromParam) {
      this.setState({
        selectingModeFrom: selectingModeFromParam
      });
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

      var newDate = [date.year(), date.month(), date.date(), state.hours(), state.minutes()];
      return (0, _moment.default)(newDate);
    }
  }, {
    key: "timeChangeCallback",
    value: function timeChangeCallback(newHour, newMinute, mode) {
      if (mode === "start") {
        this.updateStartTime(newHour, newMinute, mode);
      } else if (mode === "end") {
        this.updateEndTime(newHour, newMinute, mode);
      }
    }
  }, {
    key: "updateStartTime",
    value: function updateStartTime(newHour, newMinute, mode) {
      this.updateTime(this.state.start, newHour, newMinute, mode, "start", "startLabel");
    }
  }, {
    key: "updateEndTime",
    value: function updateEndTime(newHour, newMinute, mode) {
      this.updateTime(this.state.end, newHour, newMinute, mode, "end", "endLabel");
    }
  }, {
    key: "updateTime",
    value: function updateTime(origDate, newHour, newMinute, mode, stateDateToChangeName, stateLabelToChangeName) {
      var date = (0, _moment.default)(origDate);
      date.hours(newHour);
      date.minutes(newMinute); // If Past Max Date Dont allow update

      if ((0, _DateSelectedUtils.pastMaxDate)(date, this.props.maxDate, true)) {
        return false;
      } // If Valid Time Change allow the change else set new start and end times 
      // to be minute ahead/behind the new date


      if ((0, _TimeFunctionUtils.isValidTimeChange)(mode, date, this.state.start, this.state.end)) {
        var _this$setState;

        this.setState((_this$setState = {}, _defineProperty(_this$setState, stateDateToChangeName, date), _defineProperty(_this$setState, stateLabelToChangeName, date.format(momentFormat)), _this$setState));
        this.updateTimeCustomRangeUpdator(stateDateToChangeName, date);
      } else {
        var newDate = (0, _moment.default)(date);

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
  }, {
    key: "updateTimeCustomRangeUpdator",
    value: function updateTimeCustomRangeUpdator(stateDateToChangeName, date) {
      if (stateDateToChangeName === "start") {
        this.setToRangeValue(date, this.state.end);
      } else {
        this.setToRangeValue(this.state.start, date);
      }
    }
  }, {
    key: "dateTextFieldCallback",
    value: function dateTextFieldCallback(mode) {
      if (mode === "start") {
        var newDate = (0, _moment.default)(this.state.startLabel, momentFormat);
        var isValidNewDate = newDate.isValid();
        var isSameOrBeforeEnd = newDate.isSameOrBefore(this.state.end, "minute");
        var isAfterEndDate = newDate.isAfter(this.state.end);
        this.updateDate(mode, newDate, isValidNewDate, isSameOrBeforeEnd, isAfterEndDate, "start", "startLabel");
      } else {
        var _newDate = (0, _moment.default)(this.state.endLabel, momentFormat);

        var _isValidNewDate = _newDate.isValid();

        var isBeforeStartDate = _newDate.isBefore(this.state.start);

        var isSameOrAfterStartDate = _newDate.isSameOrAfter(this.state.start, "minute");

        this.updateDate(mode, _newDate, _isValidNewDate, isSameOrAfterStartDate, isBeforeStartDate, "end", "endLabel");
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
      // if date invalid go into update invalid mode, adds/subtract 1 days from start/stop value


      if (isValidNewDate && isValidDateChange) {
        var _this$setState2;

        this.setState((_this$setState2 = {}, _defineProperty(_this$setState2, stateDateToChangeName, newDate), _defineProperty(_this$setState2, stateLabelToChangeName, newDate.format(momentFormat)), _this$setState2));
        this.updateTimeCustomRangeUpdator(stateDateToChangeName, newDate);
      } else if (isValidNewDate && isInvalidDateChange) {
        this.updateInvalidDate(mode, newDate);
      } else if (!isValidNewDate) {
        this.updateStartEndAndLabels(this.state.start, this.state.end);
      }
    }
  }, {
    key: "updateInvalidDate",
    value: function updateInvalidDate(mode, newDate) {
      if (mode === "start") {
        var newEndDate = (0, _moment.default)(newDate).add(1, "day");
        this.updateLabelsAndRangeValues(newDate, newEndDate);
      } else {
        var newStartDate = (0, _moment.default)(newDate).subtract(1, "day");
        this.updateStartEndAndLabels(newStartDate, newDate);
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
  }, {
    key: "keyboardCellCallback",
    value: function keyboardCellCallback(originalDate, newDate) {
      var startDate;
      var endDate;

      if (originalDate.isSame(this.state.start, "day")) {
        startDate = this.duplicateMomentTimeFromState(newDate, true);
        endDate = (0, _moment.default)(this.state.end);
      } else {
        startDate = (0, _moment.default)(this.state.start);
        endDate = this.duplicateMomentTimeFromState(newDate, false);
        ;
      }

      if (startDate.isBefore(endDate, "day")) {
        this.updateStartEndAndLabels(startDate, endDate);
      } else {
        this.updateStartEndAndLabels(endDate, startDate);
      }
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
      if (date.isSame(this.state.start, "day")) {
        this.changeSelectingModeCallback(true);
      } else if (date.isSame(this.state.end, "day")) {
        this.changeSelectingModeCallback(false);
      }
    }
  }, {
    key: "renderStartDate",
    value: function renderStartDate() {
      return _react.default.createElement(_DatePicker.default, {
        label: "From Date",
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
        local: this.props.local
      });
    }
  }, {
    key: "renderEndDate",
    value: function renderEndDate() {
      return _react.default.createElement(_DatePicker.default, {
        label: "To Date",
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
        enableButtons: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_reactDotFragment.default, null, _react.default.createElement(_Ranges.default, {
        ranges: this.state.ranges,
        selectedRange: this.state.selectedRange,
        rangeSelectedCallback: this.rangeSelectedCallback,
        screenWidthToTheRight: this.props.screenWidthToTheRight
      }), this.renderStartDate(), this.renderEndDate());
    }
  }]);

  return DateTimeRangePicker;
}(_react.default.Component);

exports.DateTimeRangePicker = DateTimeRangePicker;