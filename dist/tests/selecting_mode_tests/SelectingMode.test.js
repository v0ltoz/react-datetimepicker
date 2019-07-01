"use strict";

var _build = require("enzyme/build");

var _reactBootstrap = require("react-bootstrap");

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-15"));

var _DateTimeRangeContainer = _interopRequireDefault(require("../../DateTimeRangeContainer"));

var _ActiveNotifier = _interopRequireDefault(require("../../date_picker/ActiveNotifier"));

var _Cell = _interopRequireDefault(require("../../calendar/Cell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _build.configure)({
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
}; // let maxDate = moment(start).add(24, "hour");

var applyCallback = function applyCallback(startDate, endDate) {};

var dateTimeRangeContainerSmartMode = (0, _build.mount)(_react.default.createElement(_DateTimeRangeContainer.default, {
  ranges: ranges,
  start: start,
  end: end,
  local: local,
  applyCallback: applyCallback,
  smartMode: true
}, _react.default.createElement(_reactBootstrap.FormControl, {
  id: "formControlsTextB",
  type: "text",
  label: "Text",
  placeholder: "Enter text"
})));
var dateTimeRangeContainer = (0, _build.mount)(_react.default.createElement(_DateTimeRangeContainer.default, {
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
describe('Selecting Mode Changes Tests', function () {
  it('Smart mode starts with Selecting From Only', function () {
    var notifier = dateTimeRangeContainerSmartMode.find(_ActiveNotifier.default);
    expect(notifier.at(0).children().text()).toEqual('Selecting From  ');
    expect(notifier.at(1).children().text()).toEqual('');
  });
  it('Smart mode on select changed to only Selecting To', function () {
    dateTimeRangeContainerSmartMode.find(_Cell.default).at(0).children().props().onClick();
    dateTimeRangeContainerSmartMode.update();
    var notifier = dateTimeRangeContainerSmartMode.find(_ActiveNotifier.default);
    expect(notifier.at(0).children().text()).toEqual('');
    expect(notifier.at(1).children().text()).toEqual('Selecting To  ');
  });
  it('Smart mode on select changed to Selecting From, previously Selecting To ', function () {
    var cellLength = dateTimeRangeContainerSmartMode.find(_Cell.default).length;
    dateTimeRangeContainerSmartMode.find(_Cell.default).at(cellLength - 1).children().props().onClick();
    dateTimeRangeContainerSmartMode.update();
    var notifier = dateTimeRangeContainerSmartMode.find(_ActiveNotifier.default);
    expect(notifier.at(0).children().text()).toEqual('Selecting From  ');
    expect(notifier.at(1).children().text()).toEqual('');
  });
  it('No Smart Mode, both From and To Show', function () {// dateTimeRangeContainer
    //   .find(Cell)
    //   .at(0)
    //   .children()
    //   .props()
    //   .onClick();
    // dateTimeRangeContainerSmartMode.update();
    // let notifier = dateTimeRangeContainerSmartMode.find(ActiveNotifier);
    // expect(
    //   notifier
    //     .at(0)
    //     .children()
    //     .text(),
    // ).toEqual('');
    // expect(
    //   notifier
    //     .at(1)
    //     .children()
    //     .text(),
    // ).toEqual('Selecting To  ');
  });
});