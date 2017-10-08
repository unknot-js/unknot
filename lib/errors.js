const notFoundMessage = (name, selector) =>
  `\u2B07\u2B07\u2B07
unknot: ${name}

Cannot find an element matching \`${selector}\` in the document.

If the element that you are trying to query may not be present, you can use the "maybe" function instead:

  $.maybe("${selector}")`;

function NotFoundException(selector) {
  this.name = "NotFoundException";
  this.message = notFoundMessage(this.name, selector);

  this.toString = () => this.message;
}

export { NotFoundException };
