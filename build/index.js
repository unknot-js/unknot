"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unknot;

var _kefir = require("kefir");

var _qPrime = require("@standard-library/q-prime");

var _errors = require("./errors");

function result(subject) {
  return subject === undefined ? _kefir.Kefir.constantError() : _kefir.Kefir.constant(subject);
}

function queryMaybeBy(sample, finder, selector) {
  return sample.map(function () {
    return finder(selector);
  }).flatMap(result).toProperty().skipDuplicates();
}

function reduceFunctionSet(functions) {
  return function (element) {
    Object.keys(functions).forEach(function (name) {
      element[name] = functions[name](element);
    });
    return element;
  };
}

function unknot(sample) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$one = _ref.one,
      one = _ref$one === void 0 ? _qPrime.queryOne : _ref$one,
      _ref$all = _ref.all,
      all = _ref$all === void 0 ? _qPrime.query : _ref$all,
      _ref$member = _ref.member,
      member = _ref$member === void 0 ? {} : _ref$member,
      _ref$list = _ref.list,
      list = _ref$list === void 0 ? {} : _ref$list;

  var wrap = reduceFunctionSet(member);
  var wrapList = reduceFunctionSet(list);

  var maybe = function maybe(selector) {
    var element = queryMaybeBy(sample, one, selector);
    return wrap(element);
  };

  var find = function find(selector) {
    var element = maybe(selector);
    element.onError(function () {
      throw new _errors.NotFoundException(selector);
    });
    return element;
  };

  var select = function select(selector) {
    var elements = queryMaybeBy(sample, all, selector);
    return wrapList(elements);
  };

  find.maybe = maybe;
  find.wrap = wrap;
  find.list = select;
  find.wrapList = wrapList;
  return find;
}