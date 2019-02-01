"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotFoundException = NotFoundException;

var notFoundMessage = function notFoundMessage(name, selector) {
  return "\u2B07\u2B07\u2B07\nunknot: ".concat(name, "\n\nCannot find an element matching `").concat(selector, "` in the document.\n\nIf the element that you are trying to query may not be present, you can use the \"maybe\" function instead:\n\n  $.maybe(\"").concat(selector, "\")");
};

function NotFoundException(selector) {
  var _this = this;

  this.name = "NotFoundException";
  this.message = notFoundMessage(this.name, selector);

  this.toString = function () {
    return _this.message;
  };
}