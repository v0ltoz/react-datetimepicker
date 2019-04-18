"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("../style/DateTimeRange.css");

var _reactBootstrap = require("react-bootstrap");

var _propTypes = _interopRequireDefault(require("prop-types"));

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

var MonthYearSelector =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MonthYearSelector, _React$Component);

  function MonthYearSelector(props) {
    var _this;

    _classCallCheck(this, MonthYearSelector);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MonthYearSelector).call(this, props));
    _this.state = {
      monthFocus: false,
      yearFocus: false
    };
    _this.monthFocus = _this.monthFocus.bind(_assertThisInitialized(_this));
    _this.yearFocus = _this.yearFocus.bind(_assertThisInitialized(_this));
    _this.monthBlur = _this.monthBlur.bind(_assertThisInitialized(_this));
    _this.yearBlur = _this.yearBlur.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MonthYearSelector, [{
    key: "createCalendarMonths",
    value: function createCalendarMonths(months) {
      return this.mapToOption(months);
    }
  }, {
    key: "createYears",
    value: function createYears(years) {
      return this.mapToOption(years);
    }
  }, {
    key: "monthFocus",
    value: function monthFocus() {
      this.setState({
        monthFocus: true
      });
    }
  }, {
    key: "monthBlur",
    value: function monthBlur() {
      this.setState({
        monthFocus: false
      });
    }
  }, {
    key: "yearFocus",
    value: function yearFocus() {
      this.setState({
        yearFocus: true
      });
    }
  }, {
    key: "yearBlur",
    value: function yearBlur() {
      this.setState({
        yearFocus: false
      });
    }
  }, {
    key: "mapToOption",
    value: function mapToOption(variableArray) {
      return variableArray.map(function (varInstance, i) {
        return _react.default.createElement("option", {
          key: i
        }, varInstance);
      });
    }
  }, {
    key: "createGlyph",
    value: function createGlyph(icon, onClickHandler, previous, next) {
      return _react.default.createElement(_reactBootstrap.Glyphicon, {
        glyph: icon,
        style: {
          cursor: 'pointer'
        },
        onClick: function onClick() {
          return onClickHandler(previous, next);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var months = this.createCalendarMonths(this.props.months);
      var years = this.createYears(this.props.years);
      var leftArrow = this.createGlyph('chevron-left', this.props.changeMonthArrowsCallback, true, false);
      var rightArrow = this.createGlyph('chevron-right', this.props.changeMonthArrowsCallback, false, true);
      var monthFocusStyle = {};
      monthFocusStyle = (0, _StyleUtils.addFocusStyle)(this.state.monthFocus, monthFocusStyle);
      var yearFocusStyle = {};
      yearFocusStyle = (0, _StyleUtils.addFocusStyle)(this.state.yearFocus, yearFocusStyle);
      return _react.default.createElement("div", {
        className: "monthYearContainer"
      }, _react.default.createElement("div", {
        className: "multipleContentOnLine leftChevron"
      }, leftArrow), _react.default.createElement("div", {
        className: "multipleContentOnLine",
        onFocus: this.monthFocus,
        onBlur: this.monthBlur,
        style: monthFocusStyle
      }, _react.default.createElement("select", {
        value: this.props.months[this.props.month],
        onChange: this.props.changeMonthCallback
      }, months)), _react.default.createElement("div", {
        className: "multipleContentOnLine",
        onFocus: this.yearFocus,
        onBlur: this.yearBlur,
        style: yearFocusStyle
      }, _react.default.createElement("select", {
        value: this.props.year,
        onChange: this.props.changeYearCallback
      }, years)), _react.default.createElement("div", {
        className: "multipleContentOnLine rightChevron"
      }, rightArrow));
    }
  }]);

  return MonthYearSelector;
}(_react.default.Component);

MonthYearSelector.propTypes = {
  months: _propTypes.default.array.isRequired,
  years: _propTypes.default.array.isRequired,
  month: _propTypes.default.number.isRequired,
  year: _propTypes.default.number.isRequired,
  changeMonthCallback: _propTypes.default.func.isRequired,
  changeYearCallback: _propTypes.default.func.isRequired,
  changeMonthArrowsCallback: _propTypes.default.func.isRequired
};
var _default = MonthYearSelector;
exports.default = _default;