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

var _Label = _interopRequireDefault(require("./Label"));

var _DateField = _interopRequireDefault(require("./DateField"));

var _TimeField = _interopRequireDefault(require("./TimeField"));

var _Calendar = _interopRequireDefault(require("../calendar/Calendar"));

var _ApplyCancelButtons = _interopRequireDefault(require("./ApplyCancelButtons"));

var _ActiveNotifier = _interopRequireDefault(require("./ActiveNotifier"));

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

var DatePicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  function DatePicker() {
    _classCallCheck(this, DatePicker);

    return _possibleConstructorReturn(this, _getPrototypeOf(DatePicker).apply(this, arguments));
  }

  _createClass(DatePicker, [{
    key: "render",
    value: function render() {
      //If button property present display buttons
      var buttons;

      if (this.props.enableButtons) {
        buttons = _react.default.createElement(_ApplyCancelButtons.default, {
          changeVisibleState: this.props.changeVisibleState,
          applyCallback: this.props.applyCallback,
          local: this.props.local,
          maxDate: this.props.maxDate,
          autoApply: this.props.autoApply
        });
      }

      return _react.default.createElement("div", {
        className: "fromDateTimeContainer"
      }, _react.default.createElement("div", {
        className: "fromDateHourContainer"
      }, _react.default.createElement(_Label.default, {
        label: this.props.label
      }), _react.default.createElement(_DateField.default, {
        date: (0, _moment.default)(this.props.date),
        dateTextFieldCallback: this.props.dateTextFieldCallback,
        onChangeDateTextHandlerCallback: this.props.onChangeDateTextHandlerCallback,
        dateLabel: this.props.dateLabel,
        mode: this.props.mode,
        changeSelectingModeCallback: this.props.changeSelectingModeCallback,
        darkMode: this.props.darkMode
      }), _react.default.createElement(_TimeField.default, {
        date: this.props.date,
        timeChangeCallback: this.props.timeChangeCallback,
        mode: this.props.mode,
        darkMode: this.props.darkMode
      })), _react.default.createElement(_Calendar.default, {
        date: this.props.date,
        mode: this.props.mode,
        otherDate: this.props.otherDate,
        maxDate: this.props.maxDate,
        dateSelectedNoTimeCallback: this.props.dateSelectedNoTimeCallback,
        keyboardCellCallback: this.props.keyboardCellCallback,
        focusOnCallback: this.props.focusOnCallback,
        focusDate: this.props.focusDate,
        cellFocusedCallback: this.props.cellFocusedCallback,
        local: this.props.local,
        descendingYears: this.props.descendingYears,
        years: this.props.years,
        pastSearchFriendly: this.props.pastSearchFriendly,
        smartMode: this.props.smartMode,
        style: this.props.style,
        darkMode: this.props.darkMode
      }), _react.default.createElement(_ActiveNotifier.default, {
        selectingModeFrom: this.props.selectingModeFrom,
        mode: this.props.mode,
        smartMode: this.props.smartMode,
        style: this.props.style
      }), buttons);
    }
  }]);

  return DatePicker;
}(_react.default.Component);

DatePicker.propTypes = {
  local: _propTypes.default.object,
  date: _reactMomentProptypes.default.momentObj.isRequired,
  otherDate: _reactMomentProptypes.default.momentObj,
  mode: _propTypes.default.string.isRequired,
  maxDate: _reactMomentProptypes.default.momentObj,
  applyCallback: _propTypes.default.func.isRequired,
  dateSelectedNoTimeCallback: _propTypes.default.func.isRequired,
  keyboardCellCallback: _propTypes.default.func.isRequired,
  cellFocusedCallback: _propTypes.default.func.isRequired,
  focusOnCallback: _propTypes.default.func.isRequired,
  focusDate: _propTypes.default.any.isRequired,
  selectingModeFrom: _propTypes.default.bool.isRequired,
  changeVisibleState: _propTypes.default.func,
  timeChangeCallback: _propTypes.default.func.isRequired,
  changeSelectingModeCallback: _propTypes.default.func.isRequired,
  onChangeDateTextHandlerCallback: _propTypes.default.func.isRequired,
  dateTextFieldCallback: _propTypes.default.func.isRequired,
  dateLabel: _propTypes.default.string.isRequired,
  label: _propTypes.default.string.isRequired,
  descendingYears: _propTypes.default.bool,
  years: _propTypes.default.array,
  pastSearchFriendly: _propTypes.default.bool,
  smartMode: _propTypes.default.bool,
  enableButtons: _propTypes.default.bool,
  autoApply: _propTypes.default.bool,
  style: _propTypes.default.object,
  darkMode: _propTypes.default.bool
};
var _default = DatePicker;
exports.default = _default;