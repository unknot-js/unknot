"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unknot;

var _kefir = require("kefir");

var _qPrime = require("@standard-library/q-prime");

var _errors = require("./errors");

var _member = _interopRequireDefault(require("./member"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LIST_DEFAULTS = {};

var domResult = function domResult(e) {
  return e === undefined ? _kefir.Kefir.constantError() : _kefir.Kefir.constant(e);
};

var queryMaybeBy = function queryMaybeBy(sample, finder, selector) {
  return sample.map(function () {
    return finder(selector);
  }).flatMap(domResult).toProperty().skipDuplicates();
};

var reduceFunctionSet = function reduceFunctionSet(functions) {
  return function (element) {
    Object.keys(functions).forEach(function (name) {
      element[name] = functions[name](element);
    });
    return element;
  };
};

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

  var wrap = reduceFunctionSet(_objectSpread({}, _member.default, member));
  var wrapList = reduceFunctionSet(_objectSpread({}, LIST_DEFAULTS, list));

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

  var domList = function domList(selector) {
    var elements = queryMaybeBy(sample, all, selector);
    return wrapList(elements);
  };

  dom.maybe = domMaybe;
  dom.wrap = wrap;
  dom.list = domList;
  dom.wrapList = wrapList;
  return dom;
}