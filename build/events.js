"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _kefir = require("kefir");

var events = function events(element) {
  return function (name) {
    return element.flatMapLatest(function (e) {
      return _kefir.Kefir.fromEvents(e, name);
    });
  };
};

exports.default = events;