"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

require("../style/DateTimeRange.css");

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

var RangeButton =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RangeButton, _React$Component);

  function RangeButton(props) {
    var _this;

    _classCallCheck(this, RangeButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RangeButton).call(this, props));
    _this.state = {
      style: "rangebuttonstyle"
    };
    _this.mouseEnter = _this.mouseEnter.bind(_assertThisInitialized(_this));
    _this.mouseLeave = _this.mouseLeave.bind(_assertThisInitialized(_this));
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
    _this.keyDown = _this.keyDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(RangeButton, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var focused = nextProps.focused[nextProps.index]; // If selected index or focused set to selected style

      if (nextProps.index === nextProps.selectedRange || focused) {
        this.setState({
          style: "rangeButtonSelectedStyle"
        });
      } else {
        this.setState({
          style: "rangebuttonstyle"
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var isComponentViewing = this.props.index === this.props.viewingIndex;
      var focused = this.props.focused;
      var focusedOnARange = false;

      for (var i = 0; i < focused.length; i++) {
        if (focused[i] === true) {
          focusedOnARange = true;
          break;
        }
      } // If the component we are currently on is the selected viewing component
      // and we are focused on it according to our focused matrix.
      // Then add an event listener for this button and set it as focused


      if (isComponentViewing && focusedOnARange) {
        document.addEventListener("keydown", this.keyDown, false);
        this.button.focus();
      }
    }
  }, {
    key: "mouseEnter",
    value: function mouseEnter() {
      // Set hover style
      this.setState({
        style: "rangeButtonSelectedStyle"
      });
    }
  }, {
    key: "mouseLeave",
    value: function mouseLeave(focused) {
      var isFocused;

      if (typeof focused === 'boolean') {
        isFocused = focused;
      } else {
        isFocused = this.state.focused;
      }

      var isSelected = this.props.index === this.props.selectedRange; // If not selected and not focused then on mouse leave set to normal style

      if (!isSelected && !isFocused) {
        this.setState({
          style: "rangebuttonstyle"
        });
      }
    }
  }, {
    key: "onFocus",
    value: function onFocus() {
      this.setState({
        focused: true
      });
      this.props.setFocusedCallback(this.props.index, true);
      this.mouseEnter(true);
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      this.setState({
        focused: false
      });
      this.props.setFocusedCallback(this.props.index, false);
      this.mouseLeave(false);
      document.removeEventListener("keydown", this.keyDown, false);
    }
  }, {
    key: "keyDown",
    value: function keyDown(e) {
      var componentFocused = document.activeElement === _reactDom.default.findDOMNode(this.button); // Up Key


      if (e.keyCode === 38 && componentFocused) {
        e.preventDefault();
        this.props.viewingIndexChangeCallback(this.props.index - 1);
      } // Down Key
      else if (e.keyCode === 40 && componentFocused) {
          e.preventDefault();
          this.props.viewingIndexChangeCallback(this.props.index + 1);
        } // Space Bar and Enter
        else if (e.keyCode === 32 || e.keyCode === 13) {
            this.props.rangeSelectedCallback(this.props.index, this.props.label);
          }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var isViewingIndex = this.props.viewingIndex === this.props.index;
      var tabIndex;

      if (isViewingIndex) {
        tabIndex = 0;
      } else {
        tabIndex = -1;
      }

      var focusStyle = {};
      focusStyle = (0, _StyleUtils.addFocusStyle)(this.state.focused, focusStyle);
      return _react.default.createElement("div", {
        ref: function ref(button) {
          _this2.button = button;
        },
        className: this.state.style,
        onMouseEnter: this.mouseEnter,
        onMouseLeave: this.mouseLeave,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        tabIndex: tabIndex,
        style: focusStyle
      }, _react.default.createElement("div", {
        className: "rangebuttontextstyle",
        onClick: function onClick() {
          return _this2.props.rangeSelectedCallback(_this2.props.index, _this2.props.label);
        }
      }, this.props.label));
    }
  }]);

  return RangeButton;
}(_react.default.Component);

var _default = RangeButton;
exports.default = _default;