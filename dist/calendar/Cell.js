"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

require("../style/DateTimeRange.css");

var _TimeFunctionUtils = require("../utils/TimeFunctionUtils");

var _moment = _interopRequireDefault(require("moment"));

var _StyleUtils = require("../utils/StyleUtils");

var _DateSelectedUtils = require("../utils/DateSelectedUtils");

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
        this.styleCell();
      }

      if (!this.props.cellDay.isSame(oldProps.cellDay)) {
        this.styleCell();
      } // If a Cell is Selected
      // If the focusDate is this cell
      // and its not a gray cell
      // Then Focus on this cell


      var cellFocused = false;
      var focusDateIsCellDate = _typeof(this.props.focusDate) === "object" && this.props.focusDate.isSame(this.props.cellDay, "day");

      if (document.activeElement.id === "cell") {
        cellFocused = true;
      }

      if (cellFocused && focusDateIsCellDate && !this.shouldStyleCellGrey(this.props.cellDay)) {
        this.cell.focus();
        this.props.focusOnCallback(false);
      }
    }
  }, {
    key: "pastMaxDatePropsChecker",
    value: function pastMaxDatePropsChecker(isCellDateProp, days) {
      if (isCellDateProp) {
        if ((0, _DateSelectedUtils.pastMaxDate)((0, _moment.default)(this.props.date).add(days, "days"), this.props.maxDate, true)) {
          return true;
        }
      } else {
        if ((0, _DateSelectedUtils.pastMaxDate)((0, _moment.default)(this.props.otherDate).add(days, "days"), this.props.maxDate, true)) {
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

        var isCellDateProp = this.props.cellDay.isSame(this.props.date, "day");

        if (e.keyCode === 38) {
          // Up Key
          newDate.subtract(7, "days");
        } else if (e.keyCode === 40) {
          // Down Key
          if (this.pastMaxDatePropsChecker(isCellDateProp, 7)) {
            return;
          }

          newDate.add(7, "days");
        } else if (e.keyCode === 37) {
          // Left Key
          newDate.subtract(1, "days");
        } else if (e.keyCode === 39) {
          // Right Key
          if (this.pastMaxDatePropsChecker(isCellDateProp, 1)) {
            return;
          }

          newDate.add(1, "days");
        }

        this.props.keyboardCellCallback(this.props.cellDay, newDate);
        this.props.focusOnCallback(newDate);
      }
    }
  }, {
    key: "onClick",
    value: function onClick() {
      if ((0, _DateSelectedUtils.pastMaxDate)(this.props.cellDay, this.props.maxDate, false)) {
        return;
      }

      this.props.dateSelectedNoTimeCallback(this.props.cellDay);
    }
  }, {
    key: "mouseEnter",
    value: function mouseEnter() {
      // If Past Max Date Style Cell Out of Use
      if (this.checkAndSetMaxDateStyle(this.props.cellDay)) {
        return;
      } // Hover Style Cell, Different if inbetween start and end date


      var isDateStart = this.props.date.isSameOrBefore(this.props.otherDate, "minute");

      if ((0, _TimeFunctionUtils.isInbetweenDates)(isDateStart, this.props.cellDay, this.props.date, this.props.otherDate)) {
        this.setState({
          "style": (0, _TimeFunctionUtils.hoverCellStyle)(true)
        });
      } else {
        this.setState({
          "style": (0, _TimeFunctionUtils.hoverCellStyle)()
        });
      }
    }
  }, {
    key: "mouseLeave",
    value: function mouseLeave() {
      this.styleCell();
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
    key: "shouldStyleCellGrey",
    value: function shouldStyleCellGrey(cellDay) {
      var month = this.props.month;
      var cellDayMonth = cellDay.month();

      if (month !== cellDayMonth) {
        return true;
      }
    }
  }, {
    key: "shouldStyleCellStartEnd",
    value: function shouldStyleCellStartEnd(cellDay, date, otherDate, startCheck, endCheck) {
      var isCellDateProp = cellDay.isSame(date, "day");
      var isCellOtherDateProp = cellDay.isSame(otherDate, "day");
      var isDateStart = date.isSameOrBefore(otherDate, "minute");
      var isOtherDateStart = otherDate.isSameOrBefore(date, "minute");

      if (startCheck) {
        return isCellDateProp && isDateStart || isCellOtherDateProp && isOtherDateStart;
      } else if (endCheck) {
        return isCellDateProp && !isDateStart || isCellOtherDateProp && !isOtherDateStart;
      }
    }
  }, {
    key: "checkAndSetMaxDateStyle",
    value: function checkAndSetMaxDateStyle(cellDate) {
      if ((0, _DateSelectedUtils.pastMaxDate)(cellDate, this.props.maxDate, false)) {
        this.setState({
          "style": (0, _TimeFunctionUtils.invalidStyle)()
        });
        return true;
      }

      return false;
    }
  }, {
    key: "styleCell",
    value: function styleCell() {
      var cellDay = this.props.cellDay;
      var date = this.props.date;
      var otherDate = this.props.otherDate; // If Past Max Date Style Cell Out of Use

      if (this.checkAndSetMaxDateStyle(cellDay)) {
        return;
      }

      if (this.shouldStyleCellGrey(cellDay)) {
        this.setState({
          "style": (0, _TimeFunctionUtils.greyCellStyle)()
        });
        return;
      }

      var isDateStart = date.isSameOrBefore(otherDate, "minute");
      var inbetweenDates = (0, _TimeFunctionUtils.isInbetweenDates)(isDateStart, cellDay, date, otherDate);

      if (this.shouldStyleCellStartEnd(cellDay, date, otherDate, true, false)) {
        this.setState({
          "style": (0, _TimeFunctionUtils.startDateStyle)()
        });
      } else if (this.shouldStyleCellStartEnd(cellDay, date, otherDate, false, true)) {
        this.setState({
          "style": (0, _TimeFunctionUtils.endDateStyle)()
        });
      } else if (inbetweenDates) {
        this.setState({
          "style": (0, _TimeFunctionUtils.inBetweenStyle)()
        });
      } else {
        this.setState({
          "style": (0, _TimeFunctionUtils.normalCellStyle)()
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

      var dateFormatted = this.props.cellDay.format("D");
      var tabIndex = -1;

      if (this.isStartOrEndDate() && !this.shouldStyleCellGrey(this.props.cellDay)) {
        document.addEventListener("keydown", this.keyDown, false);
        tabIndex = 0;
      } else {
        document.removeEventListener("keydown", this.keyDown, false);
      }

      var style = (0, _StyleUtils.addFocusStyle)(this.state.focus, this.state.style);
      return _react.default.createElement("div", {
        ref: function ref(cell) {
          _this2.cell = cell;
        },
        className: "calendarCell",
        tabIndex: tabIndex,
        style: style,
        onMouseEnter: this.mouseEnter,
        onMouseLeave: this.mouseLeave,
        onClick: this.onClick,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        id: "cell"
      }, dateFormatted);
    }
  }]);

  return Cell;
}(_react.default.Component);

var _default = Cell;
exports.default = _default;