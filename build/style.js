"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _kefir = require("kefir");

var _kefirEvolve = require("@standard-library/kefir-evolve");

var _kefirEvolve2 = _interopRequireDefault(_kefirEvolve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assignStyle = function assignStyle(properties, element) {
  var propertyNames = Object.keys(properties);

  propertyNames.forEach(function (name) {
    var value = properties[name];

    if (value !== null) {
      element.style[name] = value;
    } else {
      element.style.removeProperty(name);
    }
  });
};

var style = function style(element) {
  return function (blueprint) {
    return _kefir.Kefir.combine([element, (0, _kefirEvolve2.default)(blueprint, {})]).observe(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          e = _ref2[0],
          s = _ref2[1];

      assignStyle(s, e);
    });
  };
};

exports.default = style;