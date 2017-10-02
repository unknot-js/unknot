import test from "tape";
import { Kefir as K } from "kefir";

import className from "../../lib/className.js";

test("adds a class", t => {
  var added = null;
  const double = {
    classList: { add: name => (added = name), remove: () => {} }
  };
  const element = K.constant(double);
  const predicate = K.constant(true);

  className(element)("foo", predicate);

  t.equal("foo", added);
  t.end();
});

test("removes a class", t => {
  var removed = null;
  const double = {
    classList: { add: () => {}, remove: name => (removed = name) }
  };
  const element = K.constant(double);
  const predicate = K.constant(false);

  className(element)("foo", predicate);

  t.equal("foo", removed);
  t.end();
});
