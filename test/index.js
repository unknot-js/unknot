import test from "tape";
import { Kefir as K } from "kefir";

import { NotFoundException } from "../lib/errors.js";
import unknot from "../lib/index.js";

test("exposes a function", t => {
  const $ = unknot(K.never());

  t.equal(typeof $, "function");
  t.end();
});

test("exposes a maybe function", t => {
  const $ = unknot(K.never());

  t.equal(typeof $.maybe, "function");
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

test("throws when element is not present", t => {
  const $ = unknot(K.constant(true), {
    one: () => null
  });

  t.throws(() => {
    $(".asdf").observe(() => {});
  }, NotFoundException);
  t.end();
});

test("does not throw when element is not present using maybe", t => {
  const $ = unknot(K.constant(true), {
    one: () => null
  });

  t.doesNotThrow(() => {
    $.maybe(".asdf").observe(() => {});
  }, NotFoundException);
  t.end();
});
