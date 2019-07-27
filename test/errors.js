import test from "tape";

import { NotFoundException } from "../lib/errors";

test("NotFoundException returns a descriptive message", t => {
  const error = new NotFoundException(".asdf");
  const expected = `\u2B07\u2B07\u2B07
unknot: NotFoundException

Cannot find an element matching \`.asdf\` in the document.

If the element that you are trying to query may not be present, you can use the "maybe" function instead:

  $.maybe(".asdf")`;

  t.equal(expected, error.message);
  t.equal(expected, error.toString());
  t.end();
});
