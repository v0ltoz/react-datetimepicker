"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("../style/DateTimeRange.css");

var _moment = _interopRequireDefault(require("moment"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactMomentProptypes = _interopRequireDefault(require("react-moment-proptypes"));

var _MonthYearSelector = _interopRequireDefault(require("./MonthYearSelector"));

var _CalendarHeader = _interopRequireDefault(require("./CalendarHeader"));

var _CalendarRows = _interopRequireDefault(require("./CalendarRows"));

var _TimeFunctionUtils = require("../utils/TimeFunctionUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Calendar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Calendar, _React$Component);

  function Calendar(props) {
    var _this;

    _classCallCheck(this, Calendar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Calendar).call(this, props));
    _this.state = {
      month: 0,
      year: 0
    };
    _this.changeMonthCallback = _this.changeMonthCallback.bind(_assertThisInitialized(_this));
    _this.changeYearCallback = _this.changeYearCallback.bind(_assertThisInitialized(_this));
    _this.changeMonthArrowsCallback = _this.changeMonthArrowsCallback.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Calendar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateMonthYear();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(previousProps) {
      if (!previousProps.date.isSame(this.props.date) || !previousProps.otherDate.isSame(this.props.otherDate)) {
        this.updateMonthYear();
      }
    }
  }, {
    key: "updateMonthYear",
    value: function updateMonthYear() {
      var newMonth = (0, _TimeFunctionUtils.getMonth)(this.props.date, this.props.otherDate, this.props.mode);
      var newYear = (0, _TimeFunctionUtils.getYear)(this.props.date, this.props.otherDate, this.props.mode);
      this.setState({
        month: newMonth,
        year: newYear
      });
    }
  }, {
    key: "createMonths",
    value: function createMonths() {
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return months;
    }
  }, {
    key: "createYears",
    value: function createYears() {
      var years = []; //Range from 1900 to 25 years into the future

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

      return years;
    }
  }, {
    key: "changeMonthCallback",
    value: function changeMonthCallback(event) {
      for (var i = 0; i < event.target.length; i++) {
        if (event.target[i].value === event.target.value) {
          this.setState({
            month: i
          });
        }
      }
    }
  }, {
    key: "changeMonthArrowsCallback",
    value: function changeMonthArrowsCallback(isPreviousChange, isNextChange) {
      var years = this.createYears();
      var monthLocal = parseInt(this.state.month);
      var yearLocal = parseInt(this.state.year);
      var newMonthYear;

      if (isPreviousChange) {
        newMonthYear = this.getPreviousMonth(monthLocal, yearLocal, years);
      }

      if (isNextChange) {
        newMonthYear = this.getNextMonth(monthLocal, yearLocal, years);
      }

      this.setState({
        year: newMonthYear.yearLocal,
        month: newMonthYear.monthLocal
      });
    }
  }, {
    key: "getPreviousMonth",
    value: function getPreviousMonth(monthLocal, yearLocal, years) {
      var isStartOfMonth = monthLocal === 0;
      var isFirstYear = parseInt(yearLocal) === years[0];

      if (!(isStartOfMonth && isFirstYear)) {
        if (monthLocal === 0) {
          monthLocal = 11;
          yearLocal -= 1;
        } else {
          monthLocal -= 1;
        }
      }

      return {
        monthLocal: monthLocal,
        yearLocal: yearLocal
      };
    }
  }, {
    key: "getNextMonth",
    value: function getNextMonth(monthLocal, yearLocal, years) {
      var isEndOfMonth = monthLocal === 11;
      var isLastYear = parseInt(yearLocal) === years[years.length - 1];

      if (!(isEndOfMonth && isLastYear)) {
        if (monthLocal === 11) {
          monthLocal = 0;
          yearLocal += 1;
        } else {
          monthLocal += 1;
        }
      }

      return {
        monthLocal: monthLocal,
        yearLocal: yearLocal
      };
    }
  }, {
    key: "changeYearCallback",
    value: function changeYearCallback(event) {
      this.setState({
        year: parseInt(event.target.value)
      });
    }
  }, {
    key: "render",
    value: function render() {
      var months = this.createMonths();
      var years = this.createYears();
      var headers;
      var sundayFirst;

      if (this.props.local && this.props.local.sundayFirst) {
        sundayFirst = true;
        headers = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      } else {
        sundayFirst = false;
        headers = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
      }

      var fourtyTwoDays = (0, _TimeFunctionUtils.getFourtyTwoDays)(this.state.month, this.state.year, sundayFirst);
      return _react.default.createElement("div", null, _react.default.createElement(_MonthYearSelector.default, {
        months: months,
        years: years,
        month: this.state.month,
        year: this.state.year,
        changeMonthCallback: this.changeMonthCallback,
        changeYearCallback: this.changeYearCallback,
        changeMonthArrowsCallback: this.changeMonthArrowsCallback
      }), _react.default.createElement(_CalendarHeader.default, {
        headers: headers
      }), _react.default.createElement(_CalendarRows.default, {
        fourtyTwoDays: fourtyTwoDays,
        date: this.props.date,
        mode: this.props.mode,
        otherDate: this.props.otherDate,
        maxDate: this.props.maxDate,
        month: this.state.month,
        year: this.state.year,
        dateSelectedNoTimeCallback: this.props.dateSelectedNoTimeCallback,
        keyboardCellCallback: this.props.keyboardCellCallback,
        focusOnCallback: this.props.focusOnCallback,
        focusDate: this.props.focusDate,
        cellFocusedCallback: this.props.cellFocusedCallback
      }));
    }
  }]);

  return Calendar;
}(_react.default.Component);

Calendar.propTypes = {
  date: _reactMomentProptypes.default.momentObj,
  mode: _propTypes.default.string.isRequired,
  otherDate: _reactMomentProptypes.default.momentObj,
  maxDate: _reactMomentProptypes.default.momentObj,
  dateSelectedNoTimeCallback: _propTypes.default.func.isRequired,
  keyboardCellCallback: _propTypes.default.func.isRequired,
  focusOnCallback: _propTypes.default.func.isRequired,
  focusDate: _propTypes.default.any.isRequired,
  cellFocusedCallback: _propTypes.default.func.isRequired,
  local: _propTypes.default.object
};
var _default = Calendar;
exports.default = _default;