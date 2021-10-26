"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-15"));

var _moment = _interopRequireDefault(require("moment"));

var _reactBootstrap = require("react-bootstrap");

var _DateTimeRangeContainer = _interopRequireDefault(require("../../DateTimeRangeContainer"));

var _DateTimeRangePicker = require("../../DateTimeRangePicker");

var _RangeButton = _interopRequireDefault(require("../../ranges/RangeButton"));

var _Ranges = _interopRequireDefault(require("../../ranges/Ranges"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact.default()
});
var now = new Date();
var start = (0, _moment.default)(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
var end = (0, _moment.default)(start).add(1, 'days').subtract(1, 'seconds');
var ranges = {
  'Today Only': [(0, _moment.default)(start), (0, _moment.default)(end)],
  'Yesterday Only': [(0, _moment.default)(start).subtract(1, 'days'), (0, _moment.default)(end).subtract(1, 'days')],
  '3 Days': [(0, _moment.default)(start).subtract(3, 'days'), (0, _moment.default)(end)],
  '5 Days': [(0, _moment.default)(start).subtract(5, 'days'), (0, _moment.default)(end)],
  '1 Week': [(0, _moment.default)(start).subtract(7, 'days'), (0, _moment.default)(end)],
  '2 Weeks': [(0, _moment.default)(start).subtract(14, 'days'), (0, _moment.default)(end)],
  '1 Month': [(0, _moment.default)(start).subtract(1, 'months'), (0, _moment.default)(end)],
  '90 Days': [(0, _moment.default)(start).subtract(90, 'days'), (0, _moment.default)(end)],
  '1 Year': [(0, _moment.default)(start).subtract(1, 'years'), (0, _moment.default)(end)]
};
var local = {
  format: 'DD-MM-YYYY HH:mm',
  sundayFirst: false
};

var applyCallback = function applyCallback(startDate, endDate) {
  console.log(startDate);
  console.log(endDate);
};

var indexCallbackRecieved = '';
var valueCallbackRecieved = '';

var rangeCallback = function rangeCallback(index, value) {
  indexCallbackRecieved = index;
  valueCallbackRecieved = value;
};

var dateTimeRangeContainerRangeCallback = (0, _enzyme.mount)(_react.default.createElement(_DateTimeRangeContainer.default, {
  ranges: ranges,
  start: start,
  end: end,
  local: local,
  applyCallback: applyCallback,
  rangeCallback: rangeCallback
}, _react.default.createElement(_reactBootstrap.FormControl, {
  id: "formControlsTextB",
  type: "text",
  label: "Text",
  placeholder: "Enter text"
})));
var dateTimeRangeContainerNoRangeCallback = (0, _enzyme.mount)(_react.default.createElement(_DateTimeRangeContainer.default, {
  ranges: ranges,
  start: start,
  end: end,
  local: local,
  applyCallback: applyCallback
}, _react.default.createElement(_reactBootstrap.FormControl, {
  id: "formControlsTextB",
  type: "text",
  label: "Text",
  placeholder: "Enter text"
})));
describe('Ranges Callback Tests', function () {
  beforeEach(function () {
    indexCallbackRecieved = '';
    valueCallbackRecieved = '';
    rangesMounted = (0, _enzyme.mount)(_react.default.createElement(_Ranges.default, {
      ranges: ranges,
      screenWidthToTheRight: 250,
      selectedRange: 0,
      rangeSelectedCallback: rangeSelectedCallback
    }));
  });
  it('On Click, First Range, Callback occurs, Callback prop set', function () {
    var rangeButtons = dateTimeRangeContainerRangeCallback.find(_RangeButton.default);
    var firstButton = rangeButtons.first();
    firstButton.children().props().onMouseDown();
    expect(indexCallbackRecieved).toEqual(0);
    expect(ranges[valueCallbackRecieved]).toEqual(ranges['Today Only']);
  });
  it('On Click, Last Range, Callback occurs, Callback prop set', function () {
    var rangeButtons = dateTimeRangeContainerRangeCallback.find(_RangeButton.default);
    var lastButton = rangeButtons.last();
    lastButton.children().props().onMouseDown();
    expect(indexCallbackRecieved).toEqual(Object.keys(ranges).length);
    expect(valueCallbackRecieved).toEqual('Custom Range');
  });
  it('"On Click Callback doesnt occur, Callback prop not set', function () {
    var rangeButtons = dateTimeRangeContainerNoRangeCallback.find(_RangeButton.default);
    var firstButton = rangeButtons.first();
    firstButton.children().props().onMouseDown();
    expect(indexCallbackRecieved).toEqual('');
    expect(valueCallbackRecieved).toEqual('');
  });
});

var rangeSelectedCallback = function rangeSelectedCallback(index, label) {
  console.log(index, label);
};

var rangesMounted = (0, _enzyme.mount)(_react.default.createElement(_Ranges.default, {
  ranges: ranges,
  screenWidthToTheRight: 250,
  selectedRange: 0,
  rangeSelectedCallback: rangeSelectedCallback
}));
describe('Ranges Clicked', function () {
  it('Does date range picker add custom date', function () {
    var picker = dateTimeRangeContainerNoRangeCallback.find(_DateTimeRangePicker.DateTimeRangePicker);
    expect(picker.state().ranges['Custom Range']).toEqual('Custom Range');
  });
  it('When initially selected 0 range set to focus if selectedRange is 0', function () {
    expect(rangesMounted.state().viewingIndex).toEqual(0);
    expect(rangesMounted.find(_RangeButton.default).at(0).state()).toEqual({
      style: {
        backgroundColor: '#08c',
        border: '1px solid #f5f5f5',
        borderRadius: '4px',
        color: '#f5f5f5',
        cursor: 'pointer',
        fontSize: '13px',
        marginBottom: '8px',
        marginLeft: '4px',
        marginRight: '4px',
        marginTop: '4px'
      }
    });
  });
  it('When initially selected 2 range set to focus if selectedRange is 2', function () {
    var rangesMounted = (0, _enzyme.mount)(_react.default.createElement(_Ranges.default, {
      ranges: ranges,
      screenWidthToTheRight: 250,
      selectedRange: 2,
      rangeSelectedCallback: rangeSelectedCallback
    }));
    expect(rangesMounted.state().viewingIndex).toEqual(2);
    expect(rangesMounted.find(_RangeButton.default).at(2).state()).toEqual({
      style: {
        backgroundColor: '#08c',
        border: '1px solid #f5f5f5',
        borderRadius: '4px',
        color: '#f5f5f5',
        cursor: 'pointer',
        fontSize: '13px',
        marginBottom: '8px',
        marginLeft: '4px',
        marginRight: '4px',
        marginTop: '4px'
      }
    });
  });
  it('On Click Yesterday (1) Ranges focused state (1) set to true, false everything else', function () {
    var rangesMounted = (0, _enzyme.mount)(_react.default.createElement(_Ranges.default, {
      ranges: ranges,
      screenWidthToTheRight: 250,
      selectedRange: 2,
      rangeSelectedCallback: rangeSelectedCallback
    }));
    var yesterdayButton = rangesMounted.find(_RangeButton.default).at(1);
    yesterdayButton.find('div').first().props().onMouseDown();
    rangesMounted.update();
    var focused = rangesMounted.state().focused;
    var error = false;

    for (var i = 0; i < ranges.length; i++) {
      if (i === 1 && focused[i] === false) {
        error = true;
      } else if (focused[i] === true) {
        error = true;
      }
    }

    expect(error).toEqual(false);
    console.log(rangesMounted.state());
  });
  it('On Click Yesterday (1) Style, tabIndex and viewingIndex on button updates to focused', function () {
    var selectedRange = 1;

    var rangeSelectedCallback = function rangeSelectedCallback(index, value) {
      selectedRange = index;
    };

    var rangesMounted = (0, _enzyme.mount)(_react.default.createElement(_Ranges.default, {
      ranges: ranges,
      screenWidthToTheRight: 250,
      selectedRange: selectedRange,
      rangeSelectedCallback: rangeSelectedCallback
    }));
    var yesterdayButton = rangesMounted.find(_RangeButton.default).at(1);
    yesterdayButton.find('div').first().props().onMouseDown();
    rangesMounted.update();
    yesterdayButton = rangesMounted.find(_RangeButton.default).at(1); // Ensure the button at index 1 (Yesterday) is set to focused and correct tabIndex

    var style = yesterdayButton.find('div').first().props().style;
    expect(style).toEqual({
      backgroundColor: '#08c',
      border: '1px solid #f5f5f5',
      borderRadius: '4px',
      color: '#f5f5f5',
      cursor: 'pointer',
      fontSize: '13px',
      marginBottom: '8px',
      marginLeft: '4px',
      marginRight: '4px',
      marginTop: '4px',
      outline: 'cornflowerblue',
      outlineStyle: 'auto'
    });
    expect(rangesMounted.state().viewingIndex).toEqual(1);
    expect(yesterdayButton.find('div').first().props().tabIndex).toEqual(0); // Ensure all other buttons are not styled as focused or tab indexed in

    rangesMounted.find(_RangeButton.default).forEach(function (button, index) {
      if (index !== 1) {
        var _style = button.find('div').first().props().style;
        expect(_style).toEqual({
          backgroundColor: '#f5f5f5',
          border: '1px solid #f5f5f5',
          borderRadius: '4px',
          color: '#08c',
          cursor: 'pointer',
          fontSize: '13px',
          marginBottom: '8px',
          marginLeft: '4px',
          marginRight: '4px',
          marginTop: '4px',
          outlineStyle: ''
        });
        expect(button.find('div').first().props().tabIndex).toEqual(-1);
      }
    });
  });
  it('On Click Yesterday (1) Range Selected Callback returns correct values', function () {
    var selectedRange = 0;
    var valueCallback, indexCallback;

    var rangeSelectedCallback = function rangeSelectedCallback(index, value) {
      valueCallback = value;
      indexCallback = index;
    };

    var rangesMounted = (0, _enzyme.mount)(_react.default.createElement(_Ranges.default, {
      ranges: ranges,
      screenWidthToTheRight: 250,
      selectedRange: selectedRange,
      rangeSelectedCallback: rangeSelectedCallback
    }));
    var yesterdayButton = rangesMounted.find(_RangeButton.default).at(1);
    yesterdayButton.find('div').first().props().onMouseDown();
    rangesMounted.update();
    expect(valueCallback).toEqual('Yesterday Only');
    expect(indexCallback).toEqual(1);
  });
});