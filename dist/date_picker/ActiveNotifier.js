"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("../style/DateTimeRange.css");

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
    value: function getDotDiv(text, style) {
      return _react.default.createElement("div", {
        className: "activeNotifier"
      }, text, " ", _react.default.createElement("span", {
        className: "dot",
        style: {
          backgroundColor: style
        }
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var selectingModeFrom = this.props.selectingModeFrom;
      var mode = this.props.mode;
      var notifier;

      if (selectingModeFrom && mode === "start") {
        notifier = this.getDotDiv("Selecting From ", "#12bc00");
      } else if (!selectingModeFrom && mode === "end") {
        notifier = this.getDotDiv("Selecting To ", "#D70022");
      } else {
        notifier = _react.default.createElement("div", {
          className: "activeNotifier"
        }, " \u200C ");
      }

      return _react.default.createElement("div", null, notifier);
    }
  }]);

  return ActiveNotifier;
}(_react.default.Component);

var _default = ActiveNotifier;
exports.default = _default;