"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("../style/DateTimeRange.css");

var _propTypes = _interopRequireDefault(require("prop-types"));

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

var ActiveNotifier =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ActiveNotifier, _React$Component);

  function ActiveNotifier() {
    _classCallCheck(this, ActiveNotifier);

    return _possibleConstructorReturn(this, _getPrototypeOf(ActiveNotifier).apply(this, arguments));
  }

  _createClass(ActiveNotifier, [{
    key: "getDotDiv",
    value: function getDotDiv(text, style, id) {
      return _react.default.createElement("div", {
        className: "activeNotifier",
        id: id
      }, text, " ", _react.default.createElement("span", {
        className: "dot",
        style: style
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var selectingModeFrom = this.props.selectingModeFrom;
      var mode = this.props.mode;
      var startDotStyle = this.props.style && this.props.style.fromDot ? this.props.style.fromDot : {
        backgroundColor: '#12bc00'
      };
      var endDotStyle = this.props.style && this.props.style.toDot ? this.props.style.toDot : {
        backgroundColor: '#D70022'
      };
      var startNotifierID = 'startNotifierID';
      var endNotifierID = 'endNotifierID';
      var local = this.props.local;

      if (this.props.smartMode) {
        if (selectingModeFrom && mode === 'start') {
          var label = local && local.selectingFrom ? local.selectingFrom : 'Selecting From';
          return this.getDotDiv("".concat(label, " "), startDotStyle, startNotifierID);
        } else if (!selectingModeFrom && mode === 'end') {
          var _label = local && local.selectingTo ? local.selectingTo : 'Selecting To';

          return this.getDotDiv("".concat(_label, " "), endDotStyle, endNotifierID);
        }
      } else {
        if (mode === 'start') {
          var _label2 = local && local.fromDate ? local.fromDate : 'From Date';

          return this.getDotDiv("".concat(_label2, " "), startDotStyle, startNotifierID);
        } else if (mode === 'end') {
          var _label3 = local && local.toDate ? local.toDate : 'To Date';

          return this.getDotDiv("".concat(_label3, " "), endDotStyle, endNotifierID);
        }
      }

      return _react.default.createElement("div", null);
    }
  }]);

  return ActiveNotifier;
}(_react.default.Component);

ActiveNotifier.propTypes = {
  mode: _propTypes.default.string.isRequired,
  selectingModeFrom: _propTypes.default.bool.isRequired,
  smartMode: _propTypes.default.bool,
  style: _propTypes.default.object,
  local: _propTypes.default.object
};
var _default = ActiveNotifier;
exports.default = _default;