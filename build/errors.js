"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function NotFoundException(selector) {
  this.name = "NotFoundException";
  this.message = "An element matching the selector \"" + selector + "\" was expected, but not found in the document.\n\nIf the element that you are trying to query may not be present, you can use the \"maybe\" function instead:\n\n  $.maybe(\"" + selector + "\")";
}

exports.default = { NotFoundException: NotFoundException };