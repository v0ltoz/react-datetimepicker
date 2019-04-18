"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("../style/DateTimeRange.css");

var _reactBootstrap = require("react-bootstrap");

var _propTypes = _interopRequireDefault(require("prop-types"));

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

var DateField =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DateField, _React$Component);

  function DateField(props) {
    var _this;

    _classCallCheck(this, DateField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateField).call(this, props));
    _this.onChangeDateTextHandler = _this.onChangeDateTextHandler.bind(_assertThisInitialized(_this));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DateField, [{
    key: "onChangeDateTextHandler",
    value: function onChangeDateTextHandler(event) {
      this.props.onChangeDateTextHandlerCallback(event.target.value, this.props.mode);
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      this.props.dateTextFieldCallback(this.props.mode);
    }
  }, {
    key: "onClick",
    value: function onClick() {
      if (this.props.mode === 'start') {
        this.props.changeSelectingModeCallback(true);
      } else {
        this.props.changeSelectingModeCallback(false);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_reactBootstrap.InputGroup, {
        onClick: this.onClick,
        style: {
          cursor: 'pointer'
        }
      }, _react.default.createElement(_reactBootstrap.InputGroup.Addon, {
        className: "calendarAddon"
      }, _react.default.createElement(_reactBootstrap.Glyphicon, {
        glyph: "calendar"
      })), _react.default.createElement(_reactBootstrap.FormControl, {
        className: "inputDate",
        type: "text",
        value: this.props.dateLabel,
        onChange: this.onChangeDateTextHandler,
        onBlur: this.onBlur
      }));
    }
  }]);

  return DateField;
}(_react.default.Component);

DateField.propTypes = {
  changeSelectingModeCallback: _propTypes.default.func.isRequired,
  mode: _propTypes.default.string.isRequired,
  dateLabel: _propTypes.default.string.isRequired,
  dateTextFieldCallback: _propTypes.default.func.isRequired,
  onChangeDateTextHandlerCallback: _propTypes.default.func.isRequired
};
var _default = DateField;
exports.default = _default;