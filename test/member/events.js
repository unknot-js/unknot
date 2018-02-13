import test from "tape";
import { Kefir as K } from "kefir";
import EventEmitter from "events";

import events from "../../lib/member/events.js";

test("records an event", t => {
  const pool = new EventEmitter();
  const element = K.constant(pool);
  const clicks = events(element)("click");

  clicks.observe(() => {
    t.ok(true);
    t.end();
  });

  pool.emit("click");
});

test("prevents an event", t => {
  var prevented = false;

  const pool = new EventEmitter();
  const element = K.constant(pool);
  const clicks = events(element)("click");

  clicks.preventDefault();

  clicks.observe(() => {
    t.assert(prevented);
    t.end();
  });

  pool.emit("click", { preventDefault: () => prevented = true });
});
