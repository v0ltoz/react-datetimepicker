"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("../style/DateTimeRange.css");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactMomentProptypes = _interopRequireDefault(require("react-moment-proptypes"));

var _reactDotFragment = _interopRequireDefault(require("react-dot-fragment"));

var _StyleUtils = require("../utils/StyleUtils");

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

var ApplyCancelButtons =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ApplyCancelButtons, _React$Component);

  function ApplyCancelButtons(props) {
    var _this;

    _classCallCheck(this, ApplyCancelButtons);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ApplyCancelButtons).call(this, props));
    _this.state = {
      hoverColourApply: '#5cb85c',
      hoverColourCancel: '#fff',
      applyFocus: false,
      cancelFocus: false
    };

    _this.bindToFunctions();

    return _this;
  }

  _createClass(ApplyCancelButtons, [{
    key: "bindToFunctions",
    value: function bindToFunctions() {
      this.mouseEnterApply = this.mouseEnterApply.bind(this);
      this.mouseLeaveApply = this.mouseLeaveApply.bind(this);
      this.mouseEnterCancel = this.mouseEnterCancel.bind(this);
      this.mouseLeaveCancel = this.mouseLeaveCancel.bind(this);
      this.cancelPressed = this.cancelPressed.bind(this);
      this.applyPressed = this.applyPressed.bind(this);
      this.applyOnKeyPress = this.applyOnKeyPress.bind(this);
      this.cancelOnKeyPress = this.cancelOnKeyPress.bind(this);
      this.applyOnFocus = this.applyOnFocus.bind(this);
      this.applyOnBlur = this.applyOnBlur.bind(this);
      this.cancelOnBlur = this.cancelOnBlur.bind(this);
      this.cancelOnFocus = this.cancelOnFocus.bind(this);
    }
  }, {
    key: "mouseEnterApply",
    value: function mouseEnterApply() {
      this.setState({
        hoverColourApply: '#3e8e41'
      });
    }
  }, {
    key: "mouseLeaveApply",
    value: function mouseLeaveApply() {
      this.setState({
        hoverColourApply: '#5cb85c'
      });
    }
  }, {
    key: "mouseEnterCancel",
    value: function mouseEnterCancel() {
      this.setState({
        hoverColourCancel: 'rgb(192, 185, 185)'
      });
    }
  }, {
    key: "mouseLeaveCancel",
    value: function mouseLeaveCancel() {
      this.setState({
        hoverColourCancel: '#fff'
      });
    }
  }, {
    key: "cancelPressed",
    value: function cancelPressed() {
      this.props.changeVisibleState();
    }
  }, {
    key: "applyPressed",
    value: function applyPressed() {
      this.props.applyCallback();
    }
  }, {
    key: "applyOnFocus",
    value: function applyOnFocus() {
      this.setState({
        applyFocus: true
      });
    }
  }, {
    key: "applyOnBlur",
    value: function applyOnBlur() {
      this.setState({
        applyFocus: false
      });
    }
  }, {
    key: "cancelOnFocus",
    value: function cancelOnFocus() {
      this.setState({
        cancelFocus: true
      });
    }
  }, {
    key: "cancelOnBlur",
    value: function cancelOnBlur() {
      this.setState({
        cancelFocus: false
      });
    }
  }, {
    key: "isSpaceBarOrEnterPressed",
    value: function isSpaceBarOrEnterPressed(e) {
      if (e.keyCode === 32 || e.keyCode === 13) {
        return true;
      }

      return false;
    }
  }, {
    key: "applyOnKeyPress",
    value: function applyOnKeyPress(e) {
      if (this.isSpaceBarOrEnterPressed(e)) {
        this.props.applyCallback();
      }
    }
  }, {
    key: "cancelOnKeyPress",
    value: function cancelOnKeyPress(e) {
      if (this.isSpaceBarOrEnterPressed(e)) {
        this.props.changeVisibleState();
      }
    }
  }, {
    key: "renderButton",
    value: function renderButton(className, onMouseEnter, onMouseLeave, onClick, style, onKeyDown, onFocus, onBlur, text) {
      var styleLocal;

      if (text === 'Apply') {
        styleLocal = (0, _StyleUtils.addFocusStyle)(this.state.applyFocus, style);
      } else {
        styleLocal = (0, _StyleUtils.addFocusStyle)(this.state.cancelFocus, style);
      }

      return _react.default.createElement("div", {
        className: className,
        role: "button",
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        onClick: onClick,
        style: styleLocal,
        onKeyDown: onKeyDown,
        tabIndex: 0,
        onFocus: onFocus,
        onBlur: onBlur
      }, text);
    }
  }, {
    key: "getMaxDateBox",
    value: function getMaxDateBox() {
      if (this.props.maxDate) {
        var label = this.props.local && this.props.local.maxDate ? this.props.local.maxDate : 'Max Date';
        return _react.default.createElement("div", {
          className: "maxDateLabel"
        }, label, ": ", this.props.maxDate.format(this.props.local.format));
      }
    }
  }, {
    key: "renderButtons",
    value: function renderButtons() {
      var applyButton;
      var closeButtonText = this.props.local && this.props.local.close ? this.props.local.close : 'Close';

      if (!this.props.autoApply) {
        applyButton = this.renderButton('buttonSeperator applyButton', this.mouseEnterApply, this.mouseLeaveApply, this.applyPressed, {
          backgroundColor: this.state.hoverColourApply
        }, this.applyOnKeyPress, this.applyOnFocus, this.applyOnBlur, this.props.local && this.props.local.apply ? this.props.local.apply : 'Apply');
        closeButtonText = this.props.local && this.props.local.cancel ? this.props.local.cancel : 'Cancel';
      }

      var closeButton = this.renderButton('buttonSeperator cancelButton', this.mouseEnterCancel, this.mouseLeaveCancel, this.cancelPressed, {
        backgroundColor: this.state.hoverColourCancel
      }, this.cancelOnKeyPress, this.cancelOnFocus, this.cancelOnBlur, closeButtonText);
      return _react.default.createElement(_reactDotFragment.default, null, applyButton, !this.props.standalone ? closeButton : null);
    }
  }, {
    key: "render",
    value: function render() {
      var maxDateBox = this.getMaxDateBox();
      var buttons = this.renderButtons();
      var style = undefined;

      if (this.props.standalone) {
        style = {
          position: 'unset',
          float: 'right'
        };
      }

      return _react.default.createElement("div", {
        id: "buttonContainer",
        className: "buttonContainer",
        style: style
      }, maxDateBox, buttons);
    }
  }]);

  return ApplyCancelButtons;
}(_react.default.Component);

ApplyCancelButtons.propTypes = {
  local: _propTypes.default.object,
  maxDate: _reactMomentProptypes.default.momentObj,
  applyCallback: _propTypes.default.func.isRequired,
  changeVisibleState: _propTypes.default.func.isRequired,
  autoApply: _propTypes.default.bool,
  standalone: _propTypes.default.bool
};
var _default = ApplyCancelButtons;
exports.default = _default;