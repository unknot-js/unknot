"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unknot;

var _kefir = require("kefir");

var _qPrime = require("@standard-library/q-prime");

var _errors = require("./errors");

var _attribute = require("./attribute");

var _attribute2 = _interopRequireDefault(_attribute);

var _className = require("./className");

var _className2 = _interopRequireDefault(_className);

var _events = require("./events");

var _events2 = _interopRequireDefault(_events);

var _style = require("./style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MEMBER_DEFAULTS = {
  attribute: _attribute2.default,
  className: _className2.default,
  events: _events2.default,
  style: _style2.default
};

var domResult = function domResult(e) {
  return e === undefined ? _kefir.Kefir.constantError() : _kefir.Kefir.constant(e);
};

var queryMaybeBy = function queryMaybeBy(sample, finder, selector) {
  return sample.map(function () {
    return finder(selector);
  }).flatMap(domResult).toProperty().skipDuplicates();
};

var reduceFunctionSets = function reduceFunctionSets(element, sets) {
  sets.forEach(function (functions) {
    Object.keys(functions).forEach(function (name) {
      element[name] = functions[name](element);
    });
  });

  return element;
};

function unknot(sample) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$one = _ref.one,
      one = _ref$one === undefined ? _qPrime.queryOne : _ref$one,
      _ref$all = _ref.all,
      all = _ref$all === undefined ? _qPrime.query : _ref$all,
      _ref$member = _ref.member,
      member = _ref$member === undefined ? {} : _ref$member;

  var wrap = function wrap(element) {
    return reduceFunctionSets(element, [MEMBER_DEFAULTS, member]);
  };

  var list = function list(selector) {
    return queryMaybeBy(sample, all, selector);
  };

  var domMaybe = function domMaybe(selector) {
    var element = queryMaybeBy(sample, one, selector);

    return wrap(element);
  };

  var dom = function dom(selector) {
    var element = domMaybe(selector);

    element.onError(function (e) {
      throw new _errors.NotFoundException(selector);
    });

    return element;
  };

  dom.maybe = domMaybe;
  dom.wrap = wrap;

  dom.list = list;

  return dom;
}