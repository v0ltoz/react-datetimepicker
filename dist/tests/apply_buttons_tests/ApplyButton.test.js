"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-15"));

var _moment = _interopRequireDefault(require("moment"));

var _reactBootstrap = require("react-bootstrap");

var _DateTimeRangeContainer = _interopRequireDefault(require("../../DateTimeRangeContainer"));

var _ApplyCancelButtons = _interopRequireDefault(require("../../date_picker/ApplyCancelButtons"));

var _RangeButton = _interopRequireDefault(require("../../ranges/RangeButton"));

var _Cell = _interopRequireDefault(require("../../calendar/Cell"));

var _MonthYearSelector = _interopRequireDefault(require("../../calendar/MonthYearSelector"));

var _TimeField = _interopRequireDefault(require("../../date_picker/TimeField"));

var _DateField = _interopRequireDefault(require("../../date_picker/DateField"));

var _DateTimeRangePicker = require("../../DateTimeRangePicker");

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
var startDateCallback = '';
var endDateCallback = '';

var applyCallback = function applyCallback(startDate, endDate) {
  startDateCallback = startDate;
  endDateCallback = endDate;
};

var dateTimeRangeContainer = (0, _enzyme.mount)(_react.default.createElement(_DateTimeRangeContainer.default, {
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
var dateTimeRangeContainerAutoApply = (0, _enzyme.mount)(_react.default.createElement(_DateTimeRangeContainer.default, {
  ranges: ranges,
  start: start,
  end: end,
  local: local,
  applyCallback: applyCallback,
  autoApply: true
}, _react.default.createElement(_reactBootstrap.FormControl, {
  id: "formControlsTextB",
  type: "text",
  label: "Text",
  placeholder: "Enter text"
})));
var dateTimeRangeContainerSmartModeAutoApply = (0, _enzyme.mount)(_react.default.createElement(_DateTimeRangeContainer.default, {
  ranges: ranges,
  start: start,
  end: end,
  local: local,
  applyCallback: applyCallback,
  autoApply: true,
  smartMode: true,
  pastSearchFriendly: true
}, _react.default.createElement(_reactBootstrap.FormControl, {
  id: "formControlsTextB",
  type: "text",
  label: "Text",
  placeholder: "Enter text"
})));
describe('Apply Button Tests Non Auto Apply', function () {
  beforeEach(function () {
    startDateCallback = '';
    endDateCallback = '';
    start = (0, _moment.default)(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
    end = (0, _moment.default)(start).add(1, 'days').subtract(1, 'seconds');
  });
  it('Render Apply and Cancel Buttons', function () {
    var applyCancelButtons = dateTimeRangeContainer.find(_ApplyCancelButtons.default);
    var applyButton = applyCancelButtons.find('.applyButton');
    expect(applyButton.text()).toEqual('Apply');
    var cancelButton = applyCancelButtons.find('.cancelButton');
    expect(cancelButton.text()).toEqual('Cancel');
  });
  it('On Click of Apply Button Return Two Dates to Callback', function () {
    var applyCancelButtons = dateTimeRangeContainer.find(_ApplyCancelButtons.default);
    var applyButton = applyCancelButtons.find('.applyButton');
    applyButton.props().onClick();
    expect(startDateCallback).toEqual(start);
    expect(endDateCallback).toEqual(end);
  });
  it('On Click of Apply Button Close Picker', function () {
    dateTimeRangeContainer.setState({
      visible: true
    });
    var applyCancelButtons = dateTimeRangeContainer.find(_ApplyCancelButtons.default);
    var applyButton = applyCancelButtons.find('.applyButton');
    applyButton.props().onClick();
    dateTimeRangeContainer.update();
    var visible = dateTimeRangeContainer.state().visible;
    expect(visible).toEqual(false);
    var picker = dateTimeRangeContainer.find('#daterangepicker');
    expect(picker.props().style.display).toEqual('none');
  });
  it('On Click of Cancel Button Close Picker', function () {
    dateTimeRangeContainer.setState({
      visible: true
    });
    var applyCancelButtons = dateTimeRangeContainer.find(_ApplyCancelButtons.default);
    var cancelButton = applyCancelButtons.find('.cancelButton');
    cancelButton.props().onClick();
    dateTimeRangeContainer.update();
    var visible = dateTimeRangeContainer.state().visible;
    expect(visible).toEqual(false);
    var picker = dateTimeRangeContainer.find('#daterangepicker');
    expect(picker.props().style.display).toEqual('none');
  });
  it('On Click of Range Button Doesnt Call Apply Callback', function () {
    var rangeButton = dateTimeRangeContainer.find(_RangeButton.default).first().find('div').first();
    rangeButton.props().onMouseDown();
    dateTimeRangeContainer.update();
    expect(startDateCallback).toEqual('');
    expect(endDateCallback).toEqual('');
  });
  it('On Click of Date Doesnt Call Apply Callback', function () {
    var firstCalenderCell = dateTimeRangeContainer.find(_Cell.default).first().find('div').first();
    firstCalenderCell.props().onClick();
    dateTimeRangeContainer.update();
    expect(startDateCallback).toEqual('');
    expect(endDateCallback).toEqual('');
  }); // CANT GET THIS TEST TO WORK DOESNT SEEM TO WORK WITH EVENT LISTENERS
  // MANUAL TEST REQUIRED
  // it('On Keyboard Left Press of Date Doesnt Call Apply Callback', () => {
  //   let firstCalenderCellDiv = dateTimeRangeContainer
  //     .find(Cell)
  //     .first()
  //     .find('div')
  //     .first();
  //   firstCalenderCellDiv.props().onClick();
  //   dateTimeRangeContainer.update();
  //   let picker = dateTimeRangeContainer.find(DateTimeRangePicker);
  //   let startDate = picker.state().start;
  //   let firstCalenderCell = dateTimeRangeContainer
  //     .find(Cell)
  //     .first()
  //     .find('div')
  //     .first();
  //
  //   firstCalenderCell.simulate('focus');
  //   firstCalenderCell.simulate('keydown', {
  //     keyCode : 39
  //   });
  //   dateTimeRangeContainer.update();
  //   picker = dateTimeRangeContainer.find(DateTimeRangePicker);
  //   startDate = picker.state().start;
  //   expect(startDateCallback).toEqual('');
  //   expect(endDateCallback).toEqual('');
  // });

  it('On Change of Hour Doesnt Call Apply Callback', function () {
    var hourTimeSelector = dateTimeRangeContainer.find(_TimeField.default).first().find('select').first();
    hourTimeSelector.simulate('change', {
      target: {
        value: '10'
      }
    });
    dateTimeRangeContainer.update();
    hourTimeSelector = dateTimeRangeContainer.find(_TimeField.default).first().find('select').first();
    expect(hourTimeSelector.props().value).toEqual(10);
    expect(startDateCallback).toEqual('');
    expect(endDateCallback).toEqual('');
  });
  it('On Change of Minute Doesnt Call Apply Callback', function () {
    var minuteTimeSelector = dateTimeRangeContainer.find(_TimeField.default).first().find('select').last();
    minuteTimeSelector.simulate('change', {
      target: {
        value: '50'
      }
    });
    dateTimeRangeContainer.update();
    minuteTimeSelector = dateTimeRangeContainer.find(_TimeField.default).first().find('select').last();
    expect(minuteTimeSelector.props().value).toEqual(50);
    expect(startDateCallback).toEqual('');
    expect(endDateCallback).toEqual('');
  });
  it('On Change of From Date Doesnt Call Apply Callback', function () {
    var minuteTimeSelector = dateTimeRangeContainer.find(_DateField.default).first().find(_reactBootstrap.FormControl).first();
    minuteTimeSelector.simulate('focus');
    minuteTimeSelector.simulate('change', {
      target: {
        value: '05-07-2016 23:58'
      }
    });
    minuteTimeSelector.simulate('blur');
    dateTimeRangeContainer.update();
    minuteTimeSelector = dateTimeRangeContainer.find(_DateField.default).first().find(_reactBootstrap.FormControl).first();
    expect(minuteTimeSelector.props().value).toEqual('05-07-2016 23:58');
    var picker = dateTimeRangeContainer.find(_DateTimeRangePicker.DateTimeRangePicker);
    expect(picker.state().startLabel).toEqual('05-07-2016 23:58');
    var newDate = (0, _moment.default)('05-07-2016 23:58', _DateTimeRangePicker.momentFormat);
    expect(picker.state().start).toEqual((0, _moment.default)(newDate));
    expect(startDateCallback).toEqual('');
    expect(endDateCallback).toEqual('');
  });
});
describe('Apply Button Tests Auto Apply Parameter', function () {
  beforeEach(function () {
    startDateCallback = '';
    endDateCallback = '';
    start = (0, _moment.default)(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
    end = (0, _moment.default)(start).add(1, 'days').subtract(1, 'seconds');
    dateTimeRangeContainerAutoApply = (0, _enzyme.mount)(_react.default.createElement(_DateTimeRangeContainer.default, {
      ranges: ranges,
      start: start,
      end: end,
      local: local,
      applyCallback: applyCallback,
      autoApply: true
    }, _react.default.createElement(_reactBootstrap.FormControl, {
      id: "formControlsTextB",
      type: "text",
      label: "Text",
      placeholder: "Enter text"
    })));
    dateTimeRangeContainerSmartModeAutoApply = (0, _enzyme.mount)(_react.default.createElement(_DateTimeRangeContainer.default, {
      ranges: ranges,
      start: start,
      end: end,
      local: local,
      applyCallback: applyCallback,
      autoApply: true,
      smartMode: true
    }, _react.default.createElement(_reactBootstrap.FormControl, {
      id: "formControlsTextB",
      type: "text",
      label: "Text",
      placeholder: "Enter text"
    })));
  });
  it('Render Close Button', function () {
    var applyCancelButtons = dateTimeRangeContainerAutoApply.find(_ApplyCancelButtons.default);
    var applyButton = applyCancelButtons.find('.applyButton');
    expect(applyButton.length).toEqual(0);
    var cancelButton = applyCancelButtons.find('.cancelButton');
    expect(cancelButton.text()).toEqual('Close');
  });
  it('On Click of Close Button Close Picker', function () {
    dateTimeRangeContainerAutoApply.setState({
      visible: true
    });
    var applyCancelButtons = dateTimeRangeContainerAutoApply.find(_ApplyCancelButtons.default);
    var cancelButton = applyCancelButtons.find('.cancelButton');
    cancelButton.props().onClick();
    dateTimeRangeContainerAutoApply.update();
    var visible = dateTimeRangeContainerAutoApply.state().visible;
    expect(visible).toEqual(false);
    var picker = dateTimeRangeContainerAutoApply.find('#daterangepicker');
    expect(picker.props().style.display).toEqual('none');
  });
  it('On Click of Range Button Does Call Apply Callback', function () {
    var rangeButton = dateTimeRangeContainerAutoApply.find(_RangeButton.default).first().find('div').first();
    rangeButton.props().onMouseDown();
    dateTimeRangeContainerAutoApply.update();
    expect(startDateCallback).toEqual(start);
    expect(endDateCallback).toEqual(end);
  });
  it('On Click of Range Button Custom Value Doesnt Call Apply Callback', function () {
    // Done as impossible to set date using custom value it is actually set through
    // the date picker not through ranges
    var rangeButton = dateTimeRangeContainerAutoApply.find(_RangeButton.default).last().find('div').first();
    rangeButton.props().onMouseDown();
    dateTimeRangeContainerAutoApply.update();
    expect(startDateCallback).toEqual('');
    expect(endDateCallback).toEqual('');
  });
  it('On Click of Date Does Call Apply Callback', function () {
    var firstCalenderCell = dateTimeRangeContainerAutoApply.find(_Cell.default).first().find('div').first();
    firstCalenderCell.props().onClick();
    var dateFirstCell = dateTimeRangeContainerAutoApply.find(_Cell.default).first().props().cellDay;
    dateTimeRangeContainerAutoApply.update();
    var startDateCallbackSame = startDateCallback.isSame(dateFirstCell, 'minute');
    var endDateCallbackSame = endDateCallback.isSame(end, 'minute');
    expect(startDateCallbackSame).toEqual(true);
    expect(endDateCallbackSame).toEqual(true);
  }); // CANT GET THIS TEST TO WORK DOESNT SEEM TO WORK WITH EVENT LISTENERS
  // MANUAL TEST REQUIRED
  // it('On Keyboard Left Press of Date Doesnt Call Apply Callback', () => {
  //   let firstCalenderCellDiv = dateTimeRangeContainer
  //     .find(Cell)
  //     .first()
  //     .find('div')
  //     .first();
  //   firstCalenderCellDiv.props().onClick();
  //   dateTimeRangeContainer.update();
  //   let picker = dateTimeRangeContainer.find(DateTimeRangePicker);
  //   let startDate = picker.state().start;
  //   let firstCalenderCell = dateTimeRangeContainer
  //     .find(Cell)
  //     .first()
  //     .find('div')
  //     .first();
  //
  //   firstCalenderCell.simulate('focus');
  //   firstCalenderCell.simulate('keydown', {
  //     keyCode : 39
  //   });
  //   dateTimeRangeContainer.update();
  //   picker = dateTimeRangeContainer.find(DateTimeRangePicker);
  //   startDate = picker.state().start;
  //   expect(startDateCallback).toEqual('');
  //   expect(endDateCallback).toEqual('');
  // });

  it('On Change of Hour Does Call Apply Callback', function () {
    var hourTimeSelector = dateTimeRangeContainerAutoApply.find(_TimeField.default).first().find('select').first();
    hourTimeSelector.simulate('change', {
      target: {
        value: '10'
      }
    });
    dateTimeRangeContainerAutoApply.update(); // Get new selector after update

    hourTimeSelector = dateTimeRangeContainerAutoApply.find(_TimeField.default).first().find('select').first();
    var startExpected = (0, _moment.default)(start).hour(10);
    var startDateCallbackSame = startExpected.isSame(startDateCallback, 'minute');
    var endDateCallbackSame = end.isSame(endDateCallback, 'minute');
    expect(hourTimeSelector.props().value).toEqual(10);
    expect(startDateCallbackSame).toEqual(true);
    expect(endDateCallbackSame).toEqual(true);
  });
  it('On Change of Minute Does Call Apply Callback', function () {
    var minuteTimeSelector = dateTimeRangeContainerAutoApply.find(_TimeField.default).first().find('select').last();
    minuteTimeSelector.simulate('change', {
      target: {
        value: '50'
      }
    });
    dateTimeRangeContainerAutoApply.update();
    minuteTimeSelector = dateTimeRangeContainerAutoApply.find(_TimeField.default).first().find('select').last();
    var startExpected = (0, _moment.default)(start).minute(50);
    var startDateCallbackSame = startExpected.isSame(startDateCallback, 'minute');
    var endDateCallbackSame = end.isSame(endDateCallback, 'minute');
    expect(minuteTimeSelector.props().value).toEqual(50);
    expect(startDateCallbackSame).toEqual(true);
    expect(endDateCallbackSame).toEqual(true);
  });
  it('On Change of From Date Does Call Apply Callback', function () {
    var dateFieldForm = dateTimeRangeContainerAutoApply.find(_DateField.default).first().find(_reactBootstrap.FormControl).first();
    dateFieldForm.simulate('focus');
    dateFieldForm.simulate('change', {
      target: {
        value: '05-07-2016 23:58'
      }
    });
    dateFieldForm.simulate('blur');
    dateTimeRangeContainerAutoApply.update();
    dateFieldForm = dateTimeRangeContainerAutoApply.find(_DateField.default).first().find(_reactBootstrap.FormControl).first();
    expect(dateFieldForm.props().value).toEqual('05-07-2016 23:58');
    var picker = dateTimeRangeContainerAutoApply.find(_DateTimeRangePicker.DateTimeRangePicker);
    expect(picker.state().startLabel).toEqual('05-07-2016 23:58');
    var newDate = (0, _moment.default)('05-07-2016 23:58', _DateTimeRangePicker.momentFormat);
    expect(picker.state().start).toEqual((0, _moment.default)(newDate));
    expect(startDateCallback).toEqual(newDate);
    expect(endDateCallback).toEqual(end);
  });
  it('On Change of From Date Does Call Apply Callback, When From Date is After Original To Date, Smart Mode', function () {
    var newStartDate = (0, _moment.default)(end).add(1, 'day');
    var newStartDateString = newStartDate.format(_DateTimeRangePicker.momentFormat);
    var dateFieldForm = dateTimeRangeContainerSmartModeAutoApply.find(_DateField.default).first().find(_reactBootstrap.FormControl).first();
    dateFieldForm.simulate('focus');
    dateFieldForm.simulate('change', {
      target: {
        value: newStartDateString
      }
    });
    dateFieldForm.simulate('blur');
    dateTimeRangeContainerSmartModeAutoApply.update();
    dateFieldForm = dateTimeRangeContainerSmartModeAutoApply.find(_DateField.default).first().find(_reactBootstrap.FormControl).first();
    expect(dateFieldForm.props().value).toEqual(newStartDateString);
    var picker = dateTimeRangeContainerSmartModeAutoApply.find(_DateTimeRangePicker.DateTimeRangePicker);
    expect(picker.state().startLabel).toEqual(newStartDateString);
    var newDate = (0, _moment.default)(newStartDateString, _DateTimeRangePicker.momentFormat);
    expect(picker.state().start).toEqual((0, _moment.default)(newDate));
    expect(startDateCallback).toEqual(newDate); // because the From date is now after the original To date a new To date
    // will have been calculated. This is +1 day after the new start date

    var newEndDate = (0, _moment.default)(newStartDate).add(1, 'day');
    var endDateCallbackSame = newEndDate.isSame(endDateCallback, 'minute');
    expect(endDateCallbackSame).toEqual(true);
  });
  it('On Change of From Date Doesnt Call Apply Callback, When From Date is After Original To Date,  Non Smart Mode', function () {
    var newStartDate = (0, _moment.default)(end).add(1, 'day');
    var newStartDateString = newStartDate.format(_DateTimeRangePicker.momentFormat);
    var startDateString = (0, _moment.default)(start).format(_DateTimeRangePicker.momentFormat);
    var dateFieldForm = dateTimeRangeContainerAutoApply.find(_DateField.default).first().find(_reactBootstrap.FormControl).first();
    dateFieldForm.simulate('focus');
    dateFieldForm.simulate('change', {
      target: {
        value: newStartDateString
      }
    });
    dateFieldForm.simulate('blur');
    dateTimeRangeContainerAutoApply.update();
    dateFieldForm = dateTimeRangeContainerAutoApply.find(_DateField.default).first().find(_reactBootstrap.FormControl).first();
    expect(dateFieldForm.props().value).toEqual(startDateString);
    var picker = dateTimeRangeContainerAutoApply.find(_DateTimeRangePicker.DateTimeRangePicker);
    expect(picker.state().startLabel).toEqual(startDateString);
    expect(picker.state().start).toEqual((0, _moment.default)(start));
    expect(startDateCallback).toEqual('');
    expect(endDateCallback).toEqual('');
  });
  it('On Change of To Date Does Call Apply Callback. When To Date Change is Before Original From Date, Smart Mode', function () {
    var dateFieldForm = dateTimeRangeContainerSmartModeAutoApply.find(_DateField.default).last().find(_reactBootstrap.FormControl).first();
    dateFieldForm.simulate('focus');
    dateFieldForm.simulate('change', {
      target: {
        value: '05-07-2016 23:58'
      }
    });
    dateFieldForm.simulate('blur');
    dateTimeRangeContainerSmartModeAutoApply.update();
    dateFieldForm = dateTimeRangeContainerSmartModeAutoApply.find(_DateField.default).last().find(_reactBootstrap.FormControl).first();
    expect(dateFieldForm.props().value).toEqual('05-07-2016 23:58');
    var picker = dateTimeRangeContainerSmartModeAutoApply.find(_DateTimeRangePicker.DateTimeRangePicker);
    expect(picker.state().endLabel).toEqual('05-07-2016 23:58');
    var newDate = (0, _moment.default)('05-07-2016 23:58', _DateTimeRangePicker.momentFormat);
    expect(picker.state().end).toEqual((0, _moment.default)(newDate)); // The new End Date is before the original Start date so a new start date will be in the callback
    // This will be the day before the end date as per the rules

    var expectedNewStartDate = (0, _moment.default)(newDate).subtract(1, 'days');
    expect(startDateCallback).toEqual(expectedNewStartDate);
    expect(endDateCallback).toEqual(newDate);
  });
  it('On Change of To Date Doesnt Call Apply Callback. When To Date Change is Before Original From Date, Non Smart Mode', function () {
    var endDateString = (0, _moment.default)(end).format(_DateTimeRangePicker.momentFormat);
    var dateFieldForm = dateTimeRangeContainerAutoApply.find(_DateField.default).last().find(_reactBootstrap.FormControl).first();
    dateFieldForm.simulate('focus');
    dateFieldForm.simulate('change', {
      target: {
        value: '05-07-2016 23:58'
      }
    });
    dateFieldForm.simulate('blur');
    dateTimeRangeContainerAutoApply.update();
    dateFieldForm = dateTimeRangeContainerAutoApply.find(_DateField.default).last().find(_reactBootstrap.FormControl).first();
    expect(dateFieldForm.props().value).toEqual(endDateString);
    var picker = dateTimeRangeContainerAutoApply.find(_DateTimeRangePicker.DateTimeRangePicker);
    expect(picker.state().endLabel).toEqual(endDateString);
    var newDate = (0, _moment.default)(endDateString, _DateTimeRangePicker.momentFormat);
    expect(picker.state().end).toEqual((0, _moment.default)(end));
    expect(startDateCallback).toEqual('');
    expect(endDateCallback).toEqual('');
  });
});