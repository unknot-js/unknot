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

test("exposes a wrap function", t => {
  const $ = unknot(K.never());

  t.equal(typeof $.wrap, "function");
  t.end();
});

test("exposes a list function", t => {
  const $ = unknot(K.never());

  t.equal(typeof $.list, "function");
  t.end();
});

test("exposes a wrapList function", t => {
  const $ = unknot(K.never());

  t.equal(typeof $.wrapList, "function");
  t.end();
});

test("creates a stream", t => {
  const $ = unknot(K.never());
  const element = $(".asdf");

  t.assert(element instanceof K.Property);
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

test("does not repeat an element multiple times", t => {
  const $ = unknot(K.sequentially(1, [true, true]), {
    one: () => "<element>"
  });

  $(".asdf")
    .scan((values, element) => [...values, element], [])
    .last()
    .observe(values => {
      t.deepEqual(values, ["<element>"]);
      t.end();
    });
});

test("queries a node list", t => {
  const $ = unknot(K.constant(true), {
    all: () => ["<element>"]
  });

  $.list(".asdf")
    .scan((values, element) => [...values, element], [])
    .last()
    .observe(values => {
      t.deepEqual(values, [["<element>"]]);
      t.end();
    });
});

test("extends returned stream with list functions", t => {
  const $ = unknot(K.never(), {
    list: {
      barq: () => () => null,
      foos: elements => () => elements
    }
  });
  const elements = $.list(".asdf");

  t.assert("barq" in elements);
  t.assert("foos" in elements);
  t.equal(elements, elements.foos());
  t.end();
});
