"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _kefir = require("kefir");

var events = function events(element) {
  return function (name) {
    var stream = element.flatMapLatest(function (e) {
      return _kefir.Kefir.fromEvents(e, name);
    });

    stream.preventDefault = function () {
      return stream.observe(function (e) {
        return e.preventDefault();
      });
    };

    return stream;
  };
};

var _default = events;
exports.default = _default;