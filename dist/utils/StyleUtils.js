"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.darkTheme = exports.lightTheme = exports.addFocusStyle = void 0;

var addFocusStyle = function addFocusStyle(focused, currentStyle) {
  var style = JSON.parse(JSON.stringify(currentStyle));

  if (focused) {
    style.outline = 'cornflowerblue';
    style.outlineStyle = 'auto';
  } else {
    style.outlineStyle = '';
  }

  return style;
};

exports.addFocusStyle = addFocusStyle;
var white = '#FFFFFF';
var black = '#161617';
var lightTheme = {
  background: white,
  color: black
};
exports.lightTheme = lightTheme;
var darkTheme = {
  background: black,
  color: white
};
exports.darkTheme = darkTheme;