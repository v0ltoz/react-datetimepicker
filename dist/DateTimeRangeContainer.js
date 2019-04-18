"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mobileBreakPoint = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

require("./style/DateTimeRange.css");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactMomentProptypes = _interopRequireDefault(require("react-moment-proptypes"));

var _DateTimeRangePicker = require("./DateTimeRangePicker");

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

var mobileBreakPoint = 680;
exports.mobileBreakPoint = mobileBreakPoint;

var DateTimeRangeContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DateTimeRangeContainer, _React$Component);

  function DateTimeRangeContainer(props) {
    var _this;

    _classCallCheck(this, DateTimeRangeContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateTimeRangeContainer).call(this, props));
    _this.state = {
      visible: false,
      x: 0,
      y: 0,
      screenWidthToTheRight: 0
    };
    _this.resize = _this.resize.bind(_assertThisInitialized(_this));
    _this.onClickContainerHandler = _this.onClickContainerHandler.bind(_assertThisInitialized(_this));
    _this.handleOutsideClick = _this.handleOutsideClick.bind(_assertThisInitialized(_this));
    _this.changeVisibleState = _this.changeVisibleState.bind(_assertThisInitialized(_this));
    _this.keyDown = _this.keyDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DateTimeRangeContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('resize', this.resize);
      document.addEventListener('keydown', this.keyDown, false);
      this.resize();
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      window.removeEventListener('resize', this.resize);
      document.removeEventListener('keydown', this.keyDown, false);
    }
  }, {
    key: "resize",
    value: function resize() {
      var domNode = (0, _reactDom.findDOMNode)(this).children[0];
      var boundingClientRect = domNode.getBoundingClientRect();
      var widthRightOfThis = window.innerWidth - boundingClientRect.x;

      if (widthRightOfThis < mobileBreakPoint) {
        // If in small mode put picker in middle of child
        var childMiddle = boundingClientRect.width / 2;
        var containerMiddle = 144;
        var newY = childMiddle - containerMiddle;
        this.setState({
          x: boundingClientRect.height + 5,
          y: newY,
          screenWidthToTheRight: widthRightOfThis
        });
      } else {
        this.setState({
          x: boundingClientRect.height + 5,
          y: 0,
          screenWidthToTheRight: widthRightOfThis
        });
      }
    }
  }, {
    key: "keyDown",
    value: function keyDown(e) {
      if (e.keyCode === 27) {
        this.setState({
          visible: false
        });
        document.removeEventListener('keydown', this.keyDown, false);
      }
    }
  }, {
    key: "onClickContainerHandler",
    value: function onClickContainerHandler(event) {
      if (!this.state.visible) {
        document.addEventListener('click', this.handleOutsideClick, false);
        document.addEventListener('keydown', this.keyDown, false);
        this.changeVisibleState();
      }
    }
  }, {
    key: "handleOutsideClick",
    value: function handleOutsideClick(e) {
      // ignore clicks on the component itself
      if (this.state.visible) {
        if (this.container.contains(e.target)) {
          return;
        }

        document.removeEventListener('click', this.handleOutsideClick, false);
        this.changeVisibleState();
      }
    }
  }, {
    key: "changeVisibleState",
    value: function changeVisibleState() {
      this.setState(function (prevState) {
        return {
          visible: !prevState.visible
        };
      });
    }
  }, {
    key: "shouldShowPicker",
    value: function shouldShowPicker() {
      if (this.state.visible && this.state.screenWidthToTheRight < mobileBreakPoint) {
        return 'block';
      } else if (this.state.visible) {
        return 'flex';
      } else {
        return 'none';
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var showPicker = this.shouldShowPicker();
      var x = this.state.x;
      var y = this.state.y;
      return _react.default.createElement("div", {
        id: "DateRangePickerContainer",
        className: "daterangepickercontainer",
        onClick: this.onClickContainerHandler,
        ref: function ref(container) {
          _this2.container = container;
        }
      }, this.props.children && _react.default.createElement("div", {
        id: "DateRangePickerChildren"
      }, this.props.children), _react.default.createElement("div", null, _react.default.createElement("div", {
        id: "daterangepicker",
        className: "daterangepicker",
        style: {
          top: x,
          left: y,
          display: showPicker
        }
      }, _react.default.createElement(_DateTimeRangePicker.DateTimeRangePicker, {
        ranges: this.props.ranges,
        start: this.props.start,
        end: this.props.end,
        local: this.props.local,
        applyCallback: this.props.applyCallback,
        changeVisibleState: this.changeVisibleState,
        screenWidthToTheRight: this.state.screenWidthToTheRight,
        maxDate: this.props.maxDate
      }))));
    }
  }]);

  return DateTimeRangeContainer;
}(_react.default.Component);

DateTimeRangeContainer.propTypes = {
  ranges: _propTypes.default.object.isRequired,
  start: _reactMomentProptypes.default.momentObj,
  end: _reactMomentProptypes.default.momentObj,
  local: _propTypes.default.object.isRequired,
  applyCallback: _propTypes.default.func.isRequired,
  maxDate: _reactMomentProptypes.default.momentObj,
  children: _propTypes.default.any
};
var _default = DateTimeRangeContainer;
exports.default = _default;