"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var attribute = function attribute(element) {
  return function (name) {
    return element.map(function (e) {
      return e[name];
    });
  };
};

var _default = attribute;
exports["default"] = _default;