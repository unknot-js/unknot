"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unknot;

var _kefir = require("kefir");

var _qPrime = require("@standard-library/q-prime");

var _attribute = require("./attribute");

var _attribute2 = _interopRequireDefault(_attribute);

var _className = require("./className");

var _className2 = _interopRequireDefault(_className);

var _events = require("./events");

var _events2 = _interopRequireDefault(_events);

var _style = require("./style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_FUNCTIONS = {
  attribute: _attribute2.default,
  className: _className2.default,
  events: _events2.default,
  style: _style2.default
};

var domResult = function domResult(e) {
  return e === null ? _kefir.Kefir.constantError() : _kefir.Kefir.constant(e);
};

var queryMaybeBy = function queryMaybeBy(sample, selector) {
  return sample.map(function () {
    return (0, _qPrime.queryOne)(selector);
  }).flatMap(domResult).toProperty();
};

var merge = function merge(element, functions) {
  Object.keys(functions).forEach(function (name) {
    element[name] = functions[name](element);
  });

  return element;
};

function unknot(sample) {
  return function (selector) {
    var element = queryMaybeBy(sample, selector);

    return merge(element, DEFAULT_FUNCTIONS);
  };
}