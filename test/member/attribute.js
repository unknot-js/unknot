import test from "tape";
import { Kefir as K } from "kefir";

import attribute from "../../lib/member/attribute.js";

test("reads an attribute", t => {
  const element = K.constant({ foo: 1 });
  const foo = attribute(element)("foo");

  foo.observe(value => {
    t.equal(value, 1);
    t.end();
  });
});
