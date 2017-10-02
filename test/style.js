import test from "tape";
import { Kefir as K } from "kefir";

import style from "../lib/style.js";

test("updates a style", t => {
  const double = { style: {} }
  const element = K.constant(double);
  const color = K.constant("red");

  style(element)({ color });

  t.deepEqual({ color: "red" }, double.style);
  t.end();
});

test("removes a rule", t => {
  var removed = false;
  const double = { style: { removeProperty: () => removed = true } }
  const element = K.constant(double);
  const color = K.constant(null);

  style(element)({ color });

  t.ok(removed);
  t.end();
});
