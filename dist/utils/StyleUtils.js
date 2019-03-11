"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addFocusStyle = void 0;

var addFocusStyle = function addFocusStyle(focused, currentStyle) {
  var style = JSON.parse(JSON.stringify(currentStyle));

  if (focused) {
    style.outline = "cornflowerblue";
    style.outlineStyle = "auto";
  } else {
    style.outlineStyle = "";
  }

  return style;
};

exports.addFocusStyle = addFocusStyle;