"use strict";

var _react = _interopRequireDefault(require("react"));

var _DateTimeRangeContainer = _interopRequireDefault(require("../../DateTimeRangeContainer"));

var _enzyme = require("enzyme");

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-15"));

var _moment = _interopRequireDefault(require("moment"));

var _reactBootstrap = require("react-bootstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact.default()
});
var now = new Date();
var start = (0, _moment.default)(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
var end = (0, _moment.default)(start).add(1, "days").subtract(1, "seconds");
var ranges = {
  "Today Only": [(0, _moment.default)(start), (0, _moment.default)(end)],
  "Yesterday Only": [(0, _moment.default)(start).subtract(1, "days"), (0, _moment.default)(end).subtract(1, "days")],
  "3 Days": [(0, _moment.default)(start).subtract(3, "days"), (0, _moment.default)(end)],
  "5 Days": [(0, _moment.default)(start).subtract(5, "days"), (0, _moment.default)(end)],
  "1 Week": [(0, _moment.default)(start).subtract(7, "days"), (0, _moment.default)(end)],
  "2 Weeks": [(0, _moment.default)(start).subtract(14, "days"), (0, _moment.default)(end)],
  "1 Month": [(0, _moment.default)(start).subtract(1, "months"), (0, _moment.default)(end)],
  "90 Days": [(0, _moment.default)(start).subtract(90, "days"), (0, _moment.default)(end)],
  "1 Year": [(0, _moment.default)(start).subtract(1, "years"), (0, _moment.default)(end)]
};
var local = {
  "format": "DD-MM-YYYY HH:mm",
  "sundayFirst": false // let maxDate = moment(start).add(24, "hour");

};

var applyCallback = function applyCallback(startDate, endDate) {
  console.log(startDate);
  console.log(endDate);
};

var dateTimeRangeContainerExpectedUse = (0, _enzyme.mount)(_react.default.createElement(_DateTimeRangeContainer.default, {
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
var dateTimeRangeContainerNoChildren = (0, _enzyme.mount)(_react.default.createElement(_DateTimeRangeContainer.default, {
  ranges: ranges,
  start: start,
  end: end,
  local: local,
  applyCallback: applyCallback
}));
describe("DateTimeRangeContainer", function () {
  it("Always Renders Div's", function () {
    expect(dateTimeRangeContainerExpectedUse.length).toBeGreaterThan(0);
  });
  it("Always render children Div and Daterange div", function () {
    var wrappingDiv = dateTimeRangeContainerExpectedUse.first().children().children(); // console.log(wrappingDiv.debug());

    expect(wrappingDiv.length).toBeGreaterThan(1);
  });
  it("No Child Present, Children Div Not rendered", function () {
    var wrappingDiv = dateTimeRangeContainerNoChildren.first().children().children();
    expect(wrappingDiv.length).toBe(1);
  });
});