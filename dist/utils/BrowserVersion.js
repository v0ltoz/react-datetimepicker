"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFirefoxBelow53 = exports.browserVersion = void 0;

var browserVersion = function browserVersion() {
  var ua = navigator.userAgent,
      tem,
      M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return "IE ".concat(tem[1] || '');
  }

  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
  }

  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
  return M.join(' ');
};

exports.browserVersion = browserVersion;

var isFirefoxBelow53 = function isFirefoxBelow53() {
  var browser = browserVersion();

  if (!browser) {
    return false;
  }

  var browserSplit = browser.split(' ');

  if (browserSplit.length !== 2) {
    return false;
  }

  if (browserSplit[0] !== 'Firefox') {
    return false;
  }

  try {
    var versionNumber = Number.parseInt(browserSplit[1]);

    if (versionNumber <= 52) {
      return true;
    }
  } catch (e) {
    return false;
  }

  return false;
};

exports.isFirefoxBelow53 = isFirefoxBelow53;