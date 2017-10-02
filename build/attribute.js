"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var attribute = function attribute(element) {
  return function (name) {
    return element.map(function (e) {
      return e[name];
    });
  };
};

exports.default = attribute;