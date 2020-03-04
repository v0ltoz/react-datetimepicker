"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

require("../style/DateTimeRange.css");

var _moment = _interopRequireDefault(require("moment"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactMomentProptypes = _interopRequireDefault(require("react-moment-proptypes"));

var _TimeFunctionUtils = require("../utils/TimeFunctionUtils");

var _StyleUtils = require("../utils/StyleUtils");

var _DateSelectedUtils = require("../utils/DateSelectedUtils");

var _CssClassNameHelper = require("../utils/CssClassNameHelper");

var _DateTimeRangePicker = require("../DateTimeRangePicker");

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

var Cell =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Cell, _React$Component);

  function Cell(props) {
    var _this;

    _classCallCheck(this, Cell);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cell).call(this, props));
    _this.state = {
      style: {}
    };
    _this.mouseEnter = _this.mouseEnter.bind(_assertThisInitialized(_this));
    _this.mouseLeave = _this.mouseLeave.bind(_assertThisInitialized(_this));
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.keyDown = _this.keyDown.bind(_assertThisInitialized(_this));
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Cell, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(oldProps) {
      if (!this.props.date.isSame(oldProps.date) || !this.props.otherDate.isSame(oldProps.otherDate)) {
        this.styleCellNonMouseEnter();
      }

      if (!this.props.cellDay.isSame(oldProps.cellDay)) {
        this.styleCellNonMouseEnter();
      } // If a Cell is Selected
      // If the focusDate is this cell
      // and its not a gray cell
      // Then Focus on this cell


      var cellFocused = false;
      var focusDateIsCellDate = _typeof(this.props.focusDate) === 'object' && this.props.focusDate.isSame(this.props.cellDay, 'day');
      var activeElement = document.activeElement.id;

      if (activeElement && activeElement.indexOf('_cell_') !== -1) {
        cellFocused = true;
      }

      if (cellFocused && focusDateIsCellDate && !this.isCellMonthSameAsPropMonth(this.props.cellDay)) {
        this.cell.focus();
        this.props.focusOnCallback(false);
      }
    }
  }, {
    key: "pastMaxDatePropsChecker",
    value: function pastMaxDatePropsChecker(isCellDateProp, days) {
      if (isCellDateProp) {
        if ((0, _DateSelectedUtils.pastMaxDate)((0, _moment.default)(this.props.date).add(days, 'days'), this.props.maxDate, true)) {
          return true;
        }
      } else {
        if ((0, _DateSelectedUtils.pastMaxDate)((0, _moment.default)(this.props.otherDate).add(days, 'days'), this.props.maxDate, true)) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "keyDown",
    value: function keyDown(e) {
      var componentFocused = document.activeElement === _reactDom.default.findDOMNode(this.cell);

      if (componentFocused && e.keyCode >= 37 && e.keyCode <= 40) {
        e.preventDefault();
        var newDate = (0, _moment.default)(this.props.cellDay); // Check to see if this cell is the date prop

        var isCellDateProp = this.props.cellDay.isSame(this.props.date, 'day');

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

        var isSuccessfulCallback = this.props.keyboardCellCallback(this.props.cellDay, newDate);

        if (isSuccessfulCallback) {
          this.props.focusOnCallback(newDate);
        }
      }
    }
  }, {
    key: "onClick",
    value: function onClick() {
      if ((0, _DateSelectedUtils.pastMaxDate)(this.props.cellDay, this.props.maxDate, false)) {
        return;
      }

      this.props.dateSelectedNoTimeCallback(this.props.cellDay, this.props.mode);
    }
  }, {
    key: "mouseEnter",
    value: function mouseEnter() {
      // If Past Max Date Style Cell Out of Use
      if (this.checkAndSetMaxDateStyle(this.props.cellDay)) {
        return;
      } // If smart mode disabled check cell dates to ensure not past end in start mode and not before start in end mode


      if (!this.props.smartMode && this.nonSmartModePastStartAndEndChecks(this.props.cellDay)) {
        return;
      } // Custom hover cell styling


      if (this.props.style && this.props.style.hoverCell) {
        var style = Object.assign((0, _TimeFunctionUtils.hoverCellStyle)(false, this.props.darkMode), this.props.style.hoverCell);
        return this.setState({
          style: style
        });
      } // Hover Style Cell, Different if inbetween start and end date


      var isDateStart = this.props.date.isSameOrBefore(this.props.otherDate, 'second');

      if ((0, _TimeFunctionUtils.isInbetweenDates)(isDateStart, this.props.cellDay, this.props.date, this.props.otherDate)) {
        this.setState({
          style: (0, _TimeFunctionUtils.hoverCellStyle)(true, this.props.darkMode)
        });
      } else {
        this.setState({
          style: (0, _TimeFunctionUtils.hoverCellStyle)(false, this.props.darkMode)
        });
      }
    }
  }, {
    key: "mouseLeave",
    value: function mouseLeave() {
      this.styleCellNonMouseEnter();
    }
  }, {
    key: "onFocus",
    value: function onFocus() {
      this.props.cellFocusedCallback(this.props.cellDay);
      this.setState({
        focus: true
      });
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      this.setState({
        focus: false
      });
    }
  }, {
    key: "isCellMonthSameAsPropMonth",
    value: function isCellMonthSameAsPropMonth(cellDay) {
      var month = this.props.month;
      var cellDayMonth = cellDay.month();

      if (month !== cellDayMonth) {
        return true;
      }
    }
  }, {
    key: "shouldStyleCellStartEnd",
    value: function shouldStyleCellStartEnd(cellDay, date, otherDate, startCheck, endCheck) {
      var isCellDateProp = cellDay.isSame(date, 'day');
      var isCellOtherDateProp = cellDay.isSame(otherDate, 'day');
      var isDateStart = date.isSameOrBefore(otherDate, 'second');
      var isOtherDateStart = otherDate.isSameOrBefore(date, 'second');

      if (startCheck) {
        return isCellDateProp && isDateStart || isCellOtherDateProp && isOtherDateStart;
      } else if (endCheck) {
        return isCellDateProp && !isDateStart || isCellOtherDateProp && !isOtherDateStart;
      }
    }
  }, {
    key: "checkAndSetMaxDateStyle",
    value: function checkAndSetMaxDateStyle(cellDate) {
      // If Past Max Date Style Cell Out of Use
      if ((0, _DateSelectedUtils.pastMaxDate)(cellDate, this.props.maxDate, false)) {
        this.setState({
          style: (0, _TimeFunctionUtils.invalidStyle)(this.props.darkMode)
        });
        return true;
      }

      return false;
    }
  }, {
    key: "nonSmartModePastStartAndEndChecks",
    value: function nonSmartModePastStartAndEndChecks(cellDate) {
      // If in start mode and cellDate past end date style as unavailable. If in end mode and cellDate before start date style as unavailable
      if (this.props.mode === _DateTimeRangePicker.ModeEnum.start) {
        // We know now the date prop is the start date and the otherDate is the end date in non smart mode
        // If this cell is after end date then invalid cell as this is the start mode
        if (cellDate.isAfter(this.props.otherDate, 'day')) {
          this.setState({
            style: (0, _TimeFunctionUtils.invalidStyle)(this.props.darkMode)
          });
          return true;
        }
      } else if (this.props.mode === _DateTimeRangePicker.ModeEnum.end) {
        // We know now the date prop is the end date and the otherDate is the start date in non smart mode
        // If this cell is before start date then invalid cell as this is the end mode
        if (cellDate.isBefore(this.props.otherDate, 'day')) {
          this.setState({
            style: (0, _TimeFunctionUtils.invalidStyle)(this.props.darkMode)
          });
          return true;
        }
      }

      return false;
    }
  }, {
    key: "styleCellNonMouseEnter",
    value: function styleCellNonMouseEnter() {
      var cellDay = this.props.cellDay;
      var date = this.props.date;
      var otherDate = this.props.otherDate; // If Past Max Date Style Cell Out of Use

      if (this.checkAndSetMaxDateStyle(cellDay)) {
        return;
      } // If smart mode disabled check cell dates to ensure not past end in start mode and not before start in end mode


      if (!this.props.smartMode && this.nonSmartModePastStartAndEndChecks(cellDay)) {
        return;
      } // Anything cellDay month that is before or after the cell prop month style grey


      if (this.isCellMonthSameAsPropMonth(cellDay)) {
        this.setState({
          style: (0, _TimeFunctionUtils.greyCellStyle)(this.props.darkMode)
        });
        return;
      }

      var isDateStart = date.isSameOrBefore(otherDate, 'second');
      var inbetweenDates = (0, _TimeFunctionUtils.isInbetweenDates)(isDateStart, cellDay, date, otherDate);
      var isStart = this.shouldStyleCellStartEnd(cellDay, date, otherDate, true, false);
      var isEnd = this.shouldStyleCellStartEnd(cellDay, date, otherDate, false, true); // If start, end or inbetween date then style according to user input or use default

      if (isStart || isEnd || inbetweenDates) {
        var style;

        if (isStart && this.props.style && this.props.style.fromDate) {
          style = Object.assign((0, _TimeFunctionUtils.startDateStyle)(), this.props.style.fromDate);
        } else if (isStart) {
          style = (0, _TimeFunctionUtils.startDateStyle)();
        } else if (isEnd && this.props.style && this.props.style.toDate) {
          style = Object.assign((0, _TimeFunctionUtils.endDateStyle)(), this.props.style.toDate);
        } else if (isEnd) {
          style = (0, _TimeFunctionUtils.endDateStyle)();
        } else if (inbetweenDates && this.props.style && this.props.style.betweenDates) {
          style = Object.assign((0, _TimeFunctionUtils.inBetweenStyle)(), this.props.style.betweenDates);
        } else {
          style = (0, _TimeFunctionUtils.inBetweenStyle)();
        }

        this.setState({
          style: style
        });
      } else if (inbetweenDates) {
        this.setState({
          style: (0, _TimeFunctionUtils.inBetweenStyle)()
        });
      } else {
        this.setState({
          style: (0, _TimeFunctionUtils.normalCellStyle)(this.props.darkMode)
        });
      }
    }
  }, {
    key: "isStartOrEndDate",
    value: function isStartOrEndDate() {
      var cellDay = this.props.cellDay;
      var date = this.props.date;
      var otherDate = this.props.otherDate;

      if (this.shouldStyleCellStartEnd(cellDay, date, otherDate, true, false) || this.shouldStyleCellStartEnd(cellDay, date, otherDate, false, true)) {
        return true;
      }

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var className = (0, _CssClassNameHelper.getCalendarGridCellClassName)();
      var dateFormatted = this.props.cellDay.format('D');
      var tabIndex = -1;

      if (this.isStartOrEndDate() && !this.isCellMonthSameAsPropMonth(this.props.cellDay)) {
        document.addEventListener('keydown', this.keyDown, false);
        tabIndex = 0;
      } else {
        document.removeEventListener('keydown', this.keyDown, false);
      }

      var style = (0, _StyleUtils.addFocusStyle)(this.state.focus, this.state.style);
      return _react.default.createElement("div", {
        ref: function ref(cell) {
          _this2.cell = cell;
        },
        className: className,
        tabIndex: tabIndex,
        style: style,
        onMouseEnter: this.mouseEnter,
        onMouseLeave: this.mouseLeave,
        onClick: this.onClick,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        id: "row_".concat(this.props.row, "_cell_").concat(this.props.id, "_").concat(this.props.mode)
      }, dateFormatted);
    }
  }]);

  return Cell;
}(_react.default.Component);

Cell.propTypes = {
  id: _propTypes.default.number.isRequired,
  cellDay: _reactMomentProptypes.default.momentObj.isRequired,
  date: _reactMomentProptypes.default.momentObj.isRequired,
  otherDate: _reactMomentProptypes.default.momentObj,
  maxDate: _reactMomentProptypes.default.momentObj,
  dateSelectedNoTimeCallback: _propTypes.default.func.isRequired,
  keyboardCellCallback: _propTypes.default.func.isRequired,
  focusOnCallback: _propTypes.default.func.isRequired,
  focusDate: _propTypes.default.any.isRequired,
  month: _propTypes.default.number.isRequired,
  cellFocusedCallback: _propTypes.default.func.isRequired,
  mode: _propTypes.default.string.isRequired,
  smartMode: _propTypes.default.bool,
  style: _propTypes.default.object,
  darkMode: _propTypes.default.bool
};
var _default = Cell;
exports.default = _default;