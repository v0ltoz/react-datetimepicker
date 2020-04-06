"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("../style/DateTimeRange.css");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _RangeButton = _interopRequireDefault(require("./RangeButton"));

var _DateTimeRangeContainer = require("../DateTimeRangeContainer");

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

var Ranges =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Ranges, _React$Component);

  function Ranges(props) {
    var _this;

    _classCallCheck(this, Ranges);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Ranges).call(this, props));
    var focused = [];
    var ranges = Object.keys(_this.props.ranges).map(function (key) {
      return _this.props.ranges[key];
    });

    for (var i = 0; i < ranges.length; i++) {
      focused.push(false);
    }

    _this.state = {
      viewingIndex: _this.props.selectedRange,
      focused: focused
    };
    _this.viewingIndexChangeCallback = _this.viewingIndexChangeCallback.bind(_assertThisInitialized(_this));
    _this.setFocusedCallback = _this.setFocusedCallback.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Ranges, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      // On Change of Selected Range reset viewing index to be the range index
      if (this.props.selectedRange !== nextProps.selectedRange) {
        this.setState({
          viewingIndex: nextProps.selectedRange
        });
      }
    }
  }, {
    key: "viewingIndexChangeCallback",
    value: function viewingIndexChangeCallback(newIndex) {
      // Allow a new item selected to be made
      var length = this.state.focused.length;

      if (newIndex >= 0 && newIndex < length) {
        this.setState({
          viewingIndex: newIndex
        });
      }
    }
  }, {
    key: "setFocusedCallback",
    value: function setFocusedCallback(index, focusedInput) {
      // Set the focus value of indexed item, focusedInput is true or false
      var focused = this.state.focused;
      focused[index] = focusedInput;
      this.setState({
        focused: focused
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var mobileModeActive = !this.props.noMobileMode; // If no mobile mode prop not set then allow mobile mode

      var mobileModeForce = this.props.forceMobileMode; // If force mobile mode prop is set then force mobile mode

      var displayI = '';

      if (this.props.screenWidthToTheRight < _DateTimeRangeContainer.mobileBreakPoint && mobileModeActive || mobileModeForce) {
        displayI = 'contents';
      } // Map the range index and object name and value to a range button


      return _react.default.createElement("div", {
        className: "rangecontainer",
        style: {
          display: displayI
        }
      }, Object.keys(this.props.ranges).map(function (range, i) {
        return _react.default.createElement(_RangeButton.default, {
          key: i,
          index: i,
          label: range,
          value: _this2.props.ranges[range],
          selectedRange: _this2.props.selectedRange,
          rangeSelectedCallback: _this2.props.rangeSelectedCallback,
          viewingIndex: _this2.state.viewingIndex,
          viewingIndexChangeCallback: _this2.viewingIndexChangeCallback,
          focused: _this2.state.focused,
          setFocusedCallback: _this2.setFocusedCallback,
          style: _this2.props.style
        });
      }));
    }
  }]);

  return Ranges;
}(_react.default.Component);

Ranges.propTypes = {
  ranges: _propTypes.default.object.isRequired,
  screenWidthToTheRight: _propTypes.default.number.isRequired,
  selectedRange: _propTypes.default.number.isRequired,
  rangeSelectedCallback: _propTypes.default.func.isRequired,
  style: _propTypes.default.object,
  noMobileMode: _propTypes.default.bool,
  forceMobileMode: _propTypes.default.bool
};
var _default = Ranges;
exports.default = _default;