"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unknot;

var _kefir = require("kefir");

var _qPrime = require("@standard-library/q-prime");

var _attribute = require("./lib/attribute");

var _attribute2 = _interopRequireDefault(_attribute);

var _className = require("./lib/className");

var _className2 = _interopRequireDefault(_className);

var _events = require("./lib/events");

var _events2 = _interopRequireDefault(_events);

var _style = require("./lib/style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var domResult = function domResult(e) {
  return e === null ? _kefir.Kefir.constantError() : _kefir.Kefir.constant(e);
};

var DEFAULT_FUNCTIONS = {
  attribute: _attribute2.default,
  className: _className2.default,
  events: _events2.default,
  style: _style2.default
};

function unknot(sample) {
  return function (selector) {
    var element = sample.map(function () {
      return (0, _qPrime.queryOne)(selector);
    }).flatMap(domResult).toProperty();

    Object.keys(DEFAULT_FUNCTIONS).forEach(function (name) {
      element[name] = DEFAULT_FUNCTIONS[name](element);
    });

    return element;
  };
}