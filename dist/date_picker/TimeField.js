"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("../style/DateTimeRange.css");

var _reactBootstrap = require("react-bootstrap");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactMomentProptypes = _interopRequireDefault(require("react-moment-proptypes"));

var _TimeFunctionUtils = require("../utils/TimeFunctionUtils");

var _StyleUtils = require("../utils/StyleUtils");

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

var TimeField =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TimeField, _React$Component);

  function TimeField(props) {
    var _this;

    _classCallCheck(this, TimeField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TimeField).call(this, props));
    _this.state = {
      hourFocus: false,
      minuteFocus: false
    };
    _this.handleHourChange = _this.handleHourChange.bind(_assertThisInitialized(_this));
    _this.handleMinuteChange = _this.handleMinuteChange.bind(_assertThisInitialized(_this));
    _this.handleMeridiemChange = _this.handleMeridiemChange.bind(_assertThisInitialized(_this));
    _this.hourFocus = _this.hourFocus.bind(_assertThisInitialized(_this));
    _this.minuteFocus = _this.minuteFocus.bind(_assertThisInitialized(_this));
    _this.hourBlur = _this.hourBlur.bind(_assertThisInitialized(_this));
    _this.minuteBlur = _this.minuteBlur.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TimeField, [{
    key: "generateHourSelectValues",
    value: function generateHourSelectValues() {
      var selectValues = [];

      for (var i = this.props.twelveHoursClock ? 1 : 0; i <= (this.props.twelveHoursClock ? 12 : 23); i++) {
        selectValues.push(_react.default.createElement("option", {
          key: i,
          value: i
        }, i));
      }

      return selectValues;
    }
  }, {
    key: "generateMinuteSelectValues",
    value: function generateMinuteSelectValues() {
      var minutes = (0, _TimeFunctionUtils.generateMinutes)();
      var selectValues = [];

      for (var i = 0; i < minutes.length; i++) {
        selectValues.push(_react.default.createElement("option", {
          key: i,
          value: i
        }, minutes[i]));
      }

      return selectValues;
    }
  }, {
    key: "generateMeridiemSelectValues",
    value: function generateMeridiemSelectValues() {
      var selectValues = [_react.default.createElement("option", {
        key: 'am',
        value: 'am'
      }, "AM"), _react.default.createElement("option", {
        key: 'pm',
        value: 'pm'
      }, "PM")];
      return selectValues;
    }
  }, {
    key: "convertHourUsingMeridiem",
    value: function convertHourUsingMeridiem(hour, meridiem) {
      if (meridiem === 'pm' && hour !== 12) {
        return hour + 12;
      } else if (meridiem === 'am' && hour === 12) return 0;else return hour;
    }
  }, {
    key: "handleHourChange",
    value: function handleHourChange(event) {
      this.props.timeChangeCallback(this.props.twelveHoursClock ? this.convertHourUsingMeridiem(parseInt(event.target.value), this.props.date.format('a')) : parseInt(event.target.value), this.props.date.minute(), this.props.mode);
    }
  }, {
    key: "handleMinuteChange",
    value: function handleMinuteChange(event) {
      this.props.timeChangeCallback(this.props.date.hour(), parseInt(event.target.value), this.props.mode);
    }
  }, {
    key: "handleMeridiemChange",
    value: function handleMeridiemChange(event) {
      this.props.timeChangeCallback(this.convertHourUsingMeridiem(parseInt(this.props.date.format('h')), event.target.value), this.props.date.minute(), this.props.mode);
    }
  }, {
    key: "hourFocus",
    value: function hourFocus() {
      this.setState({
        hourFocus: true
      });
    }
  }, {
    key: "hourBlur",
    value: function hourBlur() {
      this.setState({
        hourFocus: false
      });
    }
  }, {
    key: "minuteFocus",
    value: function minuteFocus() {
      this.setState({
        minuteFocus: true
      });
    }
  }, {
    key: "minuteBlur",
    value: function minuteBlur() {
      this.setState({
        minuteFocus: false
      });
    }
  }, {
    key: "renderSelectField",
    value: function renderSelectField(valueInput, onChangeInput, optionsInput, id) {
      var theme = this.props.darkMode ? _StyleUtils.darkTheme : _StyleUtils.lightTheme;
      return _react.default.createElement("select", {
        id: id + '_' + this.props.mode,
        style: theme,
        value: valueInput,
        onChange: onChangeInput
      }, optionsInput);
    }
  }, {
    key: "render",
    value: function render() {
      var glyphColor = this.props.darkMode ? '#FFFFFF' : '#555';
      var hours = this.generateHourSelectValues();
      var minutes = this.generateMinuteSelectValues();
      var meridiems = this.generateMeridiemSelectValues();
      var hour = this.props.twelveHoursClock ? parseInt(this.props.date.format('h')) : this.props.date.hour();
      var minute = this.props.date.minute();
      var meridiem = this.props.date.format('a');
      var hourFocusStyle = {};
      hourFocusStyle = (0, _StyleUtils.addFocusStyle)(this.state.hourFocus, hourFocusStyle);
      var minuteFocusStyle = {};
      minuteFocusStyle = (0, _StyleUtils.addFocusStyle)(this.state.minuteFocus, minuteFocusStyle);
      return _react.default.createElement("div", {
        className: "timeContainer"
      }, _react.default.createElement("div", {
        className: "timeSelectContainer"
      }, _react.default.createElement("div", {
        className: "multipleContentOnLine",
        onFocus: this.hourFocus,
        onBlur: this.hourBlur,
        style: hourFocusStyle
      }, this.renderSelectField(hour, this.handleHourChange, hours, 'Hour')), _react.default.createElement("div", {
        className: "multipleContentOnLine"
      }, ":"), _react.default.createElement("div", {
        className: "multipleContentOnLine",
        onFocus: this.minuteFocus,
        onBlur: this.minuteBlur,
        style: minuteFocusStyle
      }, this.renderSelectField(minute, this.handleMinuteChange, minutes, 'Minutes')), this.props.twelveHoursClock && _react.default.createElement("div", {
        className: "multipleContentOnLine"
      }, this.renderSelectField(meridiem, this.handleMeridiemChange, meridiems, 'Meridiem'))), _react.default.createElement(_reactBootstrap.Glyphicon, {
        style: {
          color: glyphColor
        },
        className: "timeIconStyle",
        glyph: "time"
      }));
    }
  }]);

  return TimeField;
}(_react.default.Component);

TimeField.propTypes = {
  timeChangeCallback: _propTypes.default.func.isRequired,
  mode: _propTypes.default.string.isRequired,
  date: _reactMomentProptypes.default.momentObj,
  darkMode: _propTypes.default.bool,
  twelveHoursClock: _propTypes.default.bool
};
var _default = TimeField;
exports.default = _default;