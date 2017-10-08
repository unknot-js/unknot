function NotFoundException(selector) {
  this.name = "NotFoundException";
  this.message = `An element matching the selector "${selector}" was expected, but not found in the document.

If the element that you are trying to query may not be present, you can use the "maybe" function instead:

  $.maybe("${selector}")`;
}

export { NotFoundException };
