import test from "tape";
import { Kefir as K } from "kefir";

import { NotFoundException } from "../lib/errors";
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

test("extends returned stream with member functions", t => {
  const $ = unknot(K.never(), {
    member: {
      bar: () => () => null,
      foo: element => () => element
    }
  });
  const element = $(".asdf");

  t.assert("bar" in element);
  t.assert("foo" in element);
  t.equal(element, element.foo());
  t.end();
});

test("throws when element is not present", t => {
  const $ = unknot(K.constant(true), {
    one: () => undefined
  });

  t.throws(() => {
    $(".asdf").observe(() => {});
  }, new NotFoundException(".asdf"));
  t.end();
});

test("does not throw when element is present", t => {
  const $ = unknot(K.constant(true), {
    one: () => "<element>"
  });

  t.doesNotThrow(() => {
    $(".asdf").observe(() => {});
  }, new NotFoundException(".asdf"));
  t.end();
});

test("does not throw when element is not present using maybe", t => {
  const $ = unknot(K.constant(true), {
    one: () => undefined
  });

  t.doesNotThrow(() => {
    $.maybe(".asdf").observe(() => {});
  }, new NotFoundException(".asdf"));
  t.end();
});
