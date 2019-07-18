"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _attribute = _interopRequireDefault(require("./attribute"));

var _className = _interopRequireDefault(require("./className"));

var _events = _interopRequireDefault(require("./events"));

var _style = _interopRequireDefault(require("./style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  attribute: _attribute["default"],
  className: _className["default"],
  events: _events["default"],
  style: _style["default"]
};
exports["default"] = _default;