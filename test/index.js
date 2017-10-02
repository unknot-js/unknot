import test from "tape";
import { Kefir as K } from "kefir";

import unknot from "../index.js";

test("creates a function", t => {
  const $ = unknot(K.never());

  t.equal(typeof $, "function");
  t.end();
});

test("creates a stream", t => {
  const $ = unknot(K.never());
  const element = $(".asdf");

  t.assert(element instanceof K.Property);
  t.end();
});

test("exposes an events function", t => {
  const $ = unknot(K.never());
  const element = $(".asdf");

  t.assert("events" in element);
  t.end();
});

test("exposes an attribute function", t => {
  const $ = unknot(K.never());
  const element = $(".asdf");

  t.assert("attribute" in element);
  t.end();
});

test("exposes a style function", t => {
  const $ = unknot(K.never());
  const element = $(".asdf");

  t.assert("style" in element);
  t.end();
});

test("exposes a className function", t => {
  const $ = unknot(K.never());
  const element = $(".asdf");

  t.assert("className" in element);
  t.end();
});
