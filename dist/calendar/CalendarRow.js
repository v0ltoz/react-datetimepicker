"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("../style/DateTimeRange.css");

var _reactMomentProptypes = _interopRequireDefault(require("react-moment-proptypes"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Cell = _interopRequireDefault(require("./Cell"));

var _CssClassNameHelper = require("../utils/CssClassNameHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CalendarRow =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CalendarRow, _React$Component);

  function CalendarRow() {
    _classCallCheck(this, CalendarRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(CalendarRow).apply(this, arguments));
  }

  _createClass(CalendarRow, [{
    key: "generateCells",
    value: function generateCells() {
      var cells = [];
      var daysSize = this.props.rowDays.length;

      for (var i = 0; i < daysSize; i++) {
        cells.push(_react.default.createElement(_Cell.default, {
          key: i,
          id: i,
          row: this.props.row,
          cellDay: this.props.rowDays[i],
          date: this.props.date,
          otherDate: this.props.otherDate,
          maxDate: this.props.maxDate,
          month: this.props.month,
          year: this.props.year,
          dateSelectedNoTimeCallback: this.props.dateSelectedNoTimeCallback,
          keyboardCellCallback: this.props.keyboardCellCallback,
          focusOnCallback: this.props.focusOnCallback,
          focusDate: this.props.focusDate,
          cellFocusedCallback: this.props.cellFocusedCallback,
          mode: this.props.mode,
          smartMode: this.props.smartMode,
          style: this.props.style,
          darkMode: this.props.darkMode
        }));
      }

      return cells;
    }
  }, {
    key: "render",
    value: function render() {
      var cells = this.generateCells();
      var className = (0, _CssClassNameHelper.getCalendarGridClassName)();
      return _react.default.createElement("div", {
        className: className
      }, cells);
    }
  }]);

  return CalendarRow;
}(_react.default.Component);

CalendarRow.propTypes = {
  row: _propTypes.default.number.isRequired,
  rowDays: _propTypes.default.array.isRequired,
  date: _reactMomentProptypes.default.momentObj.isRequired,
  otherDate: _reactMomentProptypes.default.momentObj,
  maxDate: _reactMomentProptypes.default.momentObj,
  dateSelectedNoTimeCallback: _propTypes.default.func.isRequired,
  keyboardCellCallback: _propTypes.default.func.isRequired,
  focusOnCallback: _propTypes.default.func.isRequired,
  focusDate: _propTypes.default.any.isRequired,
  year: _propTypes.default.number.isRequired,
  month: _propTypes.default.number.isRequired,
  cellFocusedCallback: _propTypes.default.func.isRequired,
  mode: _propTypes.default.string.isRequired,
  smartMode: _propTypes.default.bool,
  style: _propTypes.default.object,
  darkMode: _propTypes.default.bool
};
var _default = CalendarRow;
exports.default = _default;