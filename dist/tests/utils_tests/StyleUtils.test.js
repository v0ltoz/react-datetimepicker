"use strict";

var _moment = _interopRequireDefault(require("moment"));

var _StyleUtils = require("../../utils/StyleUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_moment.default.locale('en');

describe('Time Function Utils Tests', function () {
  it('Add Focus Style', function () {
    var styleMock = {
      mock: true
    };
    var style = (0, _StyleUtils.addFocusStyle)(true, styleMock);
    expect(style.outline).toEqual('cornflowerblue');
    expect(style.outlineStyle).toEqual('auto');
  });
  it('No Focus Style', function () {
    var styleMock = {
      mock: true
    };
    var style = (0, _StyleUtils.addFocusStyle)(false, styleMock);
    expect(style.outlineStyle).toEqual('');
  });
});